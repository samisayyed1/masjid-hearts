# WordPress handover

This guide is for the developer moving the Masjid Hearts site to WordPress on its own domain. The current site is the reference design: https://samisayyed1.github.io/masjid-hearts/

## What you get

| Item | Where |
| --- | --- |
| All articles as a WordPress import file (posts, categories, excerpts, featured images, custom fields) | `docs/wordpress/masjid-hearts-articles.xml`, and always up to date at `/admin/masjid-hearts-articles.xml` on the live site |
| All home page text, English and Arabic, as structured JSON | `src/content/site/home.en.json`, `home.ar.json` |
| Settings (email, donation link, social links, giving amounts) | `src/content/site/settings.json` |
| Logos (SVG) | `public/brand/`, favicon `public/favicon.svg`, `public/apple-touch-icon.png`, share image `public/og.png` |
| Home page photo | `src/assets/site/masjid-interior.jpg` |
| Markup and styles for each section | `src/components/*.astro`, `src/pages/**`, `src/styles/global.css`, `src/styles/arabic.css` |

To see the exact HTML WordPress should output, run `npm install && npm run build` and open `dist/`. Every page is plain HTML and CSS with a little vanilla JavaScript; nothing depends on Astro at runtime.

## 1. Import the articles

1. Set **Settings → Permalinks** to *Custom structure* `/articles/%postname%/`. The articles then keep their current addresses, so internal links inside articles and any shared links keep working.
2. **Tools → Import → WordPress** (install the importer if asked), upload `masjid-hearts-articles.xml`, assign the author, tick **Download and import file attachments**.
3. Check: 4 posts (at handover), categories Faith, Community, Giving, Masajid; the featured article is sticky.

Field mapping:

| Article field | WordPress |
| --- | --- |
| `title`, body | Post title, content (already rendered to HTML) |
| `summary` | Excerpt (used on cards and as the meta description) |
| `date`, file name | Publish date, slug |
| `category` | Category |
| `cover`, `coverAlt` | Featured image and its alt text |
| `featured` | Sticky post, and custom field `mh_featured` |
| `motif` | Custom field `mh_motif` (`star`, `arch`, `lattice`, `dome`): the drawn pattern cover used when a post has no featured image. The SVG patterns are in `src/components/Cover.astro` |
| `author` | Custom field `mh_author` (display name; defaults to "Masjid Hearts") |
| `draft: true` | Draft status |

## 2. Pages and templates

| URL | Source | Suggested WordPress template |
| --- | --- | --- |
| `/` | `src/components/Home.astro` | `front-page.php` |
| `/ar/` | Same component, `lang="ar"`, `dir="rtl"` | Second front page (or WPML/Polylang). Text in `home.ar.json` |
| `/articles/` | `src/pages/articles/index.astro` | `home.php` / posts page, with topic filter chips |
| `/articles/<slug>/` | `src/pages/articles/[slug].astro` | `single.php` |
| 404 | `src/pages/404.astro` | `404.php` |
| `/rss.xml`, `/sitemap-index.xml` | generated | WordPress feed and an SEO plugin's sitemap |
| `/admin/` | this repo's editing page | Not needed in WordPress (use wp-admin) |

Home page sections, in order: hero, journal (latest featured article plus three more), mission (`#mission`), how it works (`#how`), photo with hadith, monthly giving (`#give`), contact (`#contact`). The keys in `home.en.json` follow the same order, so they map one to one onto ACF fields or block patterns if the text should be editable in wp-admin.

## 3. Behaviour to keep

- **Giving buttons**: go to `donateUrl` when set. While it is empty they link to `/?give=<amount>#contact`, and the contact form pre-writes "I would like to give $X a month…" (`src/components/Contact.astro`).
- **Contact form**: currently posts to `formEndpoint` (e.g. Formspree) or opens the visitor's email app. In WordPress, replace with Contact Form 7, WPForms or Gravity Forms using the same fields: name, email, "What brings you here?" (4 options), message, plus a hidden honeypot field.
- **Reveal on scroll**: elements with `data-reveal` fade up once when they enter the screen (IntersectionObserver in `src/layouts/Base.astro`). Respect `prefers-reduced-motion` as the current CSS does.
- **Article page**: reading progress bar, share links (WhatsApp, X, Facebook, copy link), "Keep reading" (three more articles, same category first).
- **Journal page**: topic filter chips filter cards without reloading.
- **Mobile menu**: `src/components/Header.astro`.
- **Arabic**: right-to-left layout, Amiri and IBM Plex Sans Arabic fonts (`src/styles/arabic.css`), language switch in the header, `hreflang` links between `/` and `/ar/`.

## 4. Design tokens

From `src/styles/global.css` (brand colours from the Masjid Hearts branding guide):

| Token | Value | Use |
| --- | --- | --- |
| `--green` | `#00483D` | Brand green, dark sections, buttons |
| `--green-deep` / `--green-night` | `#00332B` / `#00231E` | Gradients, footer |
| `--gold` | `#CFB083` | Brand gold, accents, primary button on dark |
| `--gold-soft` | `#E7D6B8` | Text on dark |
| `--gold-ink` | `#7A5E33` | Gold for small text on white (passes contrast) |
| `--mist` | `#F1F6F4` | Light section background |
| `--ink` / `--ink-soft` | `#0B2A25` / `#46605A` | Body text |
| `--radius` | `18px` | Cards |
| `--wrap` | `1200px` | Max content width |

Fonts (all open licence, self-hosted from npm `@fontsource`; Google Fonts carries the same families):

- Headings: **Playfair Display** (stand-in for the guide's Bastia Bold; swap in Bastia if a web licence is bought)
- Interface: **Figtree**
- Article body: **Newsreader**
- Arabic: **Amiri** (headings), **IBM Plex Sans Arabic** (text)

## 5. SEO to carry over

Each page sets a title, meta description, canonical URL, Open Graph and Twitter card tags, and JSON-LD (`Organization` site-wide, `Article` plus `BreadcrumbList` on articles). Yoast or Rank Math covers this; keep the article excerpt as the meta description and the featured image as the share image. Set up a redirect from the GitHub Pages address if it has been shared publicly.

## 6. Before going live

- [ ] Contact email, donation link and social links (currently empty in `settings.json`)
- [ ] Contact form delivers to a monitored inbox (send a test)
- [ ] Domain, HTTPS, and the site address in WordPress settings
- [ ] All photos are ones Masjid Hearts has the right to publish
- [ ] Check on a phone and a desktop: menu, giving cards, form, an article page, the Arabic page
