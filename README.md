# Masjid Hearts

The website for Masjid Hearts: a home page, an articles portal ("The Journal") and article pages.

- **Home** `/` — mission, how giving works, the latest articles, monthly giving levels, contact form
- **Journal** `/articles/` — every published article, filterable by topic
- **Article** `/articles/<name>/` — reading layout with share links and related articles
- **Arabic home** `/ar/`
- **Admin** `/admin/` — editing links, setup checklist and WordPress export (hidden from search engines)
- RSS feed, sitemap and search-engine metadata are generated automatically

Built with [Astro](https://astro.build). The site is plain HTML and CSS once built, so it is fast and can be hosted anywhere.

## Edit the site (no code)

Articles, thumbnails, settings and every line of home page text are edited in the browser with Pages CMS. The site's **`/admin/`** page is the starting point: it links to the editor, lists what is still to fill in, and offers the WordPress export.

- **[EDITING.md](EDITING.md)**: how editing works, and what each section of the editor contains
- **[PUBLISHING.md](PUBLISHING.md)**: writing articles in detail
- **[WORDPRESS.md](WORDPRESS.md)**: handover guide for moving the site to WordPress

Settings still to fill in (in the editor under *Site settings*, or `src/content/site/settings.json`): **contact email**, **donation page link**, optional form service URL and social links. Until the email or form URL is set, the contact form tells visitors it is not connected yet.

## Run it on your computer

```bash
npm install
npm run dev      # preview at http://localhost:4321
npm run build    # build into dist/
npm run check    # checks the built site for broken links, missing titles and alt text
npm run validate # checks the editable content files (also runs before every build)
npm run export:wordpress  # writes docs/wordpress/masjid-hearts-articles.xml
npm run cms      # regenerates the editor layout (.pages.yml)
```

## Hosting and domain

Every push to `main` builds and deploys to GitHub Pages (`.github/workflows/deploy.yml`). In the repository, **Settings → Pages → Source** must be set to **GitHub Actions**.
When the domain is confirmed, add it under **Settings → Pages → Custom domain**. The site picks up the new address on the next build; no code change is needed.

## Brand

- Colours: green `#00483D`, gold `#CFB083`, white `#FFFFFF` (from the branding guide)
- Logo files: `public/brand/`
- Headings use Playfair Display as the web stand-in for the guide's Bastia Bold. If a licensed Bastia web font is supplied, change `--display` in `src/styles/global.css`.
