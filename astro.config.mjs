import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL and BASE_PATH are set by the GitHub Pages workflow.
// With a custom domain, GitHub sets them to the domain and "/" automatically.
const site = process.env.SITE_URL || 'https://samisayyed1.github.io';
const base = process.env.BASE_PATH || '/';

// Articles are written with links like "/articles/..." or "/#give". This adds the base path
// so the same links work on a GitHub Pages sub-folder and on a custom domain.
const prefix = base.replace(/\/$/, '');
function rehypeBaseLinks() {
  const walk = (node) => {
    if (node.tagName === 'a' && typeof node.properties?.href === 'string' && /^\/(?!\/)/.test(node.properties.href)) {
      node.properties.href = prefix + node.properties.href;
    }
    node.children?.forEach(walk);
  };
  return (tree) => walk(tree);
}

export default defineConfig({
  markdown: { rehypePlugins: [rehypeBaseLinks] },
  site,
  base,
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
});
