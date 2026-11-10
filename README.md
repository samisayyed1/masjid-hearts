# Masjid Hearts

The website for Masjid Hearts: a home page, an articles portal ("The Journal") and article pages.

- **Home** `/` — mission, how giving works, the latest articles, monthly giving levels, contact form
- **Journal** `/articles/` — every published article, filterable by topic
- **Article** `/articles/<name>/` — reading layout with share links and related articles
- RSS feed, sitemap and search-engine metadata are generated automatically

Built with [Astro](https://astro.build). The site is plain HTML and CSS once built, so it is fast and can be hosted anywhere.

## Publish an article

See **[PUBLISHING.md](PUBLISHING.md)**. In short: add one Markdown file to `src/content/articles/`, and the site rebuilds and publishes itself.

## Things to fill in

Everything is in [`src/site.config.ts`](src/site.config.ts):

| Setting | What it does | Status |
| --- | --- | --- |
| `email` | Shown in the footer; the contact form opens an email to it | **empty** |
| `formEndpoint` | Optional form service URL so the contact form sends without an email app | empty |
| `donateUrl` | Where the "Give monthly" buttons go. While empty they lead to the contact form | **empty** |
| `social` | Footer links | empty |

Until `email` or `formEndpoint` is set, the contact form tells visitors it is not connected yet.

## Run it on your computer

```bash
npm install
npm run dev      # preview at http://localhost:4321
npm run build    # build into dist/
npm run check    # checks the built site for broken links, missing titles and alt text
```

## Hosting and domain

Every push to `main` builds and deploys to GitHub Pages (`.github/workflows/deploy.yml`). In the repository, **Settings → Pages → Source** must be set to **GitHub Actions**.
When the domain is confirmed, add it under **Settings → Pages → Custom domain**. The site picks up the new address on the next build; no code change is needed.

## Brand

- Colours: green `#00483D`, gold `#CFB083`, white `#FFFFFF` (from the branding guide)
- Logo files: `public/brand/`
- Headings use Playfair Display as the web stand-in for the guide's Bastia Bold. If a licensed Bastia web font is supplied, change `--display` in `src/styles/global.css`.
