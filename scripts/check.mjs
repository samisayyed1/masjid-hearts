// Fails the build if the generated site has a broken internal link, a page without a title,
// description or exactly one <h1>, or an image without alt text.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dist = 'dist';
const base = (process.env.BASE_PATH || '/').replace(/\/$/, '');
const pages = [];
const walk = (dir) => readdirSync(dir).forEach((f) => { const p = join(dir, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && pages.push(p); });
walk(dist);

const problems = [];
let links = 0;
for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  const where = page.slice(dist.length);
  if (!/<title>[^<]{10,}<\/title>/.test(html)) problems.push(`${where}: missing or short <title>`);
  if (!/<meta name="description" content="[^"]{40,}"/.test(html)) problems.push(`${where}: missing or short meta description`);
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) problems.push(`${where}: ${h1} <h1> elements (expected 1)`);
  for (const img of html.match(/<img\b[^>]*>/g) || []) if (!/\balt="[^"]/.test(img)) problems.push(`${where}: image without alt text`);
  for (const [, href] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|data:|#|\/\/)/.test(href)) continue;
    links++;
    let path = href.split('#')[0].split('?')[0];
    if (base && path.startsWith(base)) path = path.slice(base.length);
    else if (base) { problems.push(`${where}: link ${href} is missing the base path ${base}`); continue; }
    const file = join(dist, path);
    if (!(existsSync(file) && (statSync(file).isFile() || existsSync(join(file, 'index.html'))))) problems.push(`${where}: broken link ${href}`);
  }
}
console.log(`Checked ${pages.length} pages and ${links} internal links.`);
if (problems.length) { console.error(`${problems.length} problem(s):\n` + problems.map((p) => ' - ' + p).join('\n')); process.exit(1); }
console.log('No problems found.');
