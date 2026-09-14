# MEGADUCT

Corporate website for **MEGADUCT** busduct trunking systems — the busway brand of
LINKK Busway Systems (M) Sdn Bhd (1018052-D), Beranang, Selangor, Malaysia.

A rebuild of the original megaduct.com.my: same company information, products and
project references, rebuilt as a responsive, standards-based static site.

## Pages

| File | Contents |
| --- | --- |
| `index.html` | Hero, certifications, why MEGADUCT, featured products, about, stats, sectors, CTA |
| `about.html` | Company introduction, four-step approach, ASTA / CPRI / KEMA KEUR / PSB certificates, company details |
| `products.html` | All 15 products, filterable by category, each with an image lightbox |
| `projects.html` | Nine project sectors with references, reach statistics, regional breakdown |
| `contact.html` | Enquiry form with validation, full contact details, Google Maps embed |

## Structure

```
index.html  about.html  products.html  projects.html  contact.html
favicon.ico
assets/
  css/style.css   all styling (design tokens at the top of the file)
  js/main.js      nav, scroll reveal, counters, filtering, lightbox, form validation
  img/
    products/     15 product photographs
    site/         logos, banners, certificates, sector and project imagery
scripts/
  check-site.sh   pre-deploy gate (asset paths, exact case, entry point)
package.json    npm scripts (dev / build / preview / check)
vite.config.js  dev server + multi-page build config
```

No framework. The pages are hand-written HTML that run as-is; Vite provides the dev
server and an optional production build. The only external runtime dependency is the
Inter webfont from Google Fonts.

## Getting started

```bash
npm install
npm run dev
```

Opens http://localhost:5173 with live reload — edit any HTML, CSS or JS and the
browser updates immediately.

### Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | Dev server on :5173 with live reload |
| `npm run build` | Optimised production build into `dist/` |
| `npm run preview` | Serve the built `dist/` locally to check it before deploying |
| `npm run check` | Pre-deploy gate — entry point, asset paths, exact-case filenames |

No dependency is needed just to *view* the site: it is plain HTML and any static
server (`python3 -m http.server 8000`) will serve it. Vite is a development
convenience only.

## Deployment

The repository root is the deployable site — `index.html` and `assets/` are served
directly, which is what GitHub Pages currently publishes. `npm run build` is optional:
it writes a minified, cache-busted copy to `dist/` (gitignored) if you would rather
deploy that.

Two things to know if you do deploy `dist/`:

- `vite.config.js` lists every page under `build.rollupOptions.input`. **A new page must
  be added there**, or it will be missing from the build.
- Bundlers rewrite `src` and `href`, but never `data-*` attributes. The product lightbox
  therefore reads each image's own `src` rather than a path in an attribute. Keep it that
  way when adding products.

## Design

Brand colours carried over from the original site:

| Token | Value | Use |
| --- | --- | --- |
| `--red-600` | `#EC1F23` | Primary action, accents, section rules |
| `--blue-600` | `#20409A` | Brand blue from the MEGADUCT logo, links, headings |
| `--navy-800` | `#0B1E45` | Dark sections, footer, hero gradient |

Layout is a 1200px container on a responsive grid, breaking to two columns at 1080px
and one column at 760px. Motion respects `prefers-reduced-motion`.

## Outstanding: enquiry form backend

The contact form is currently **front-end only**. It validates input, then shows a
confirmation message without sending anything — this is deliberate, so the form never
silently drops a real enquiry.

To make it live:

1. Point `action` on `#enquiry-form` in `contact.html` at your mail handler.
   The original site used `email_enquiry.asp`, which requires ASP/IIS hosting. On
   static hosting, use a form service or a small serverless function instead.
2. Remove `data-demo="true"` from the same `<form>` tag. The demo branch in
   `assets/js/main.js` is keyed off that attribute; client-side validation stays.
3. Send a test submission and confirm it reaches `marketing@linkk.com.my` and
   `customerservice@linkk.com.my`.

Add spam protection (honeypot field or CAPTCHA) before going live.

## Content note

All company information, product names, project references and contact details are
taken from the existing megaduct.com.my. Product descriptions on `products.html` are
plain-language summaries of what each component does; **no electrical ratings, current
capacities or test values have been stated anywhere on the site.** Have LINKK's
engineering team supply and approve those before any specification data is published.
