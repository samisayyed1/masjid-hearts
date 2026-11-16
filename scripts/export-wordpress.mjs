// Exports every article to a WordPress import file (WXR), so the journal can move to WordPress in one step:
// WordPress admin → Tools → Import → WordPress → upload docs/wordpress/masjid-hearts-articles.xml
// Run: npm run export:wordpress
import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, basename, dirname, resolve } from 'node:path';
import { parse as parseYaml } from 'yaml';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';

const REPO = process.env.GITHUB_REPOSITORY || 'samisayyed1/masjid-hearts';
const RAW = `https://raw.githubusercontent.com/${REPO}/main/`;
const SITE = ((process.env.SITE_URL || 'https://samisayyed1.github.io') + (process.env.BASE_PATH ?? '/masjid-hearts')).replace(/\/$/, '');
const dir = 'src/content/articles';
const outDir = process.argv.includes('--out') ? process.argv[process.argv.indexOf('--out') + 1] : 'docs/wordpress';
const settings = JSON.parse(readFileSync('src/content/site/settings.json', 'utf8'));
const en = JSON.parse(readFileSync('src/content/site/home.en.json', 'utf8'));

const md = await createMarkdownProcessor();
const cdata = (s = '') => `<![CDATA[${String(s).replaceAll(']]>', ']]]]><![CDATA[>')}]]>`;
const esc = (s = '') => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const wpDate = (d) => new Date(d).toISOString().replace('T', ' ').slice(0, 19);
const rfc822 = (d) => new Date(d).toUTCString();
// A repository file path, relative to the article, as a public URL WordPress can download.
const fileUrl = (rel) => RAW + resolve(dir, rel).slice(process.cwd().length + 1).split('/').map(encodeURIComponent).join('/');

const files = readdirSync(dir).filter((f) => f.endsWith('.md')).sort();
const posts = [];
for (const f of files) {
  const src = readFileSync(join(dir, f), 'utf8');
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error(`${f}: no front matter`);
  const data = parseYaml(m[1]) || {};
  let { code: html } = await md.render(m[2]);
  // Images inside the article body: point them at the repository so the importer can fetch them.
  html = html.replace(/(<img[^>]+src=")(?!https?:|\/)([^"]+)"/g, (_, a, p) => `${a}${fileUrl(p)}"`);
  posts.push({ slug: basename(f, '.md'), data, html });
}

const cats = [...new Set(posts.map((p) => p.data.category).filter(Boolean))];
const author = 'masjidhearts';
let id = 100;
const items = [];
for (const p of posts) {
  const d = p.data;
  const postId = ++id;
  const metas = [];
  let attachment = '';
  if (d.cover) {
    const attId = ++id;
    const url = fileUrl(d.cover);
    metas.push(['_thumbnail_id', attId]);
    attachment = `
  <item>
    <title>${cdata(d.coverAlt || d.title)}</title>
    <wp:post_id>${attId}</wp:post_id>
    <wp:post_date>${cdata(wpDate(d.date))}</wp:post_date>
    <wp:post_name>${cdata(slugify(p.slug + '-cover'))}</wp:post_name>
    <wp:status>${cdata('inherit')}</wp:status>
    <wp:post_parent>${postId}</wp:post_parent>
    <wp:post_type>${cdata('attachment')}</wp:post_type>
    <wp:attachment_url>${cdata(url)}</wp:attachment_url>
    <wp:postmeta><wp:meta_key>${cdata('_wp_attachment_image_alt')}</wp:meta_key><wp:meta_value>${cdata(d.coverAlt || '')}</wp:meta_value></wp:postmeta>
  </item>`;
  }
  // Fields with no WordPress equivalent are kept as custom fields, so a theme can use them.
  metas.push(['mh_motif', d.motif || 'star'], ['mh_featured', d.featured ? '1' : '0'], ['mh_author', d.author || settings.name]);
  if (d.updated) metas.push(['mh_updated', String(d.updated)]);
  items.push(`
  <item>
    <title>${cdata(d.title)}</title>
    <link>${esc(`${SITE}/articles/${p.slug}/`)}</link>
    <pubDate>${rfc822(d.date)}</pubDate>
    <dc:creator>${cdata(author)}</dc:creator>
    <description></description>
    <content:encoded>${cdata(p.html)}</content:encoded>
    <excerpt:encoded>${cdata(d.summary)}</excerpt:encoded>
    <wp:post_id>${postId}</wp:post_id>
    <wp:post_date>${cdata(wpDate(d.date))}</wp:post_date>
    <wp:post_date_gmt>${cdata(wpDate(d.date))}</wp:post_date_gmt>
    <wp:comment_status>${cdata('closed')}</wp:comment_status>
    <wp:ping_status>${cdata('closed')}</wp:ping_status>
    <wp:post_name>${cdata(p.slug)}</wp:post_name>
    <wp:status>${cdata(d.draft ? 'draft' : 'publish')}</wp:status>
    <wp:post_parent>0</wp:post_parent>
    <wp:menu_order>0</wp:menu_order>
    <wp:post_type>${cdata('post')}</wp:post_type>
    <wp:is_sticky>${d.featured ? 1 : 0}</wp:is_sticky>
    ${d.category ? `<category domain="category" nicename="${esc(slugify(d.category))}">${cdata(d.category)}</category>` : ''}
${metas.map(([k, v]) => `    <wp:postmeta><wp:meta_key>${cdata(k)}</wp:meta_key><wp:meta_value>${cdata(v)}</wp:meta_value></wp:postmeta>`).join('\n')}
  </item>${attachment}`);
}

const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<!-- Masjid Hearts articles for WordPress. Import: Tools → Import → WordPress. Tick "Download and import file attachments". -->
<rss version="2.0"
  xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:wfw="http://wellformedweb.org/CommentAPI/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:wp="http://wordpress.org/export/1.2/">
<channel>
  <title>${esc(settings.name)}</title>
  <link>${esc(SITE)}</link>
  <description>${esc(en.meta.tagline)}</description>
  <language>en-GB</language>
  <wp:wxr_version>1.2</wp:wxr_version>
  <wp:base_site_url>${esc(SITE)}</wp:base_site_url>
  <wp:base_blog_url>${esc(SITE)}</wp:base_blog_url>
  <wp:author><wp:author_id>1</wp:author_id><wp:author_login>${cdata(author)}</wp:author_login><wp:author_email>${cdata(settings.email || '')}</wp:author_email><wp:author_display_name>${cdata(settings.name)}</wp:author_display_name></wp:author>
${cats.map((c, i) => `  <wp:category><wp:term_id>${i + 1}</wp:term_id><wp:category_nicename>${cdata(slugify(c))}</wp:category_nicename><wp:category_parent>${cdata('')}</wp:category_parent><wp:cat_name>${cdata(c)}</wp:cat_name></wp:category>`).join('\n')}
${items.join('\n')}
</channel>
</rss>
`;
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'masjid-hearts-articles.xml'), xml);
console.log(`Exported ${posts.length} article(s) in ${cats.length} categories to ${outDir}/masjid-hearts-articles.xml`);
