# MEGADUCT + LINKK

Two corporate websites for **LINKK Busway Systems (M) Sdn Bhd** (1018052-D),
Beranang, Selangor, Malaysia — served from one project, with a switcher in the
header that moves between them.

| Site | Lives at | Brand | Stylesheet |
| --- | --- | --- | --- |
| **MEGADUCT** | repository root | MEGADUCT red + blue, Archivo / Inter | `assets/css/style.css` |
| **LINKK** | `linkk/` | LINKK green, Poppins / Roboto | `assets/css/linkk-2026.css` |

MEGADUCT is the busduct product brand; LINKK is the company that makes it and
holds the MEGADUCT trademark. Content follows megaduct.com.my and linkk.com.my
respectively — **the live sites are the source of truth for copy.**

No framework. The pages are hand-written HTML that run as-is; Vite provides the
dev server and an optional production build.

## Getting started

```bash
npm install
npm run dev
```

Opens http://localhost:5173 on the MEGADUCT home page; LINKK is at
`/linkk/index.html`, or one click away on the switcher.

> **Node 20.19+ or 22.12+ is required.** Vite 8 runs on rolldown, whose native
> binding declares that range. On an older Node, npm silently skips the binding
> and Vite fails with `Cannot find native binding` — upgrade Node, delete
> `node_modules` and `package-lock.json`, and reinstall.

| Command | Does |
| --- | --- |
| `npm run dev` | Dev server on :5173 with live reload |
| `npm run build` | Optimised production build of both sites into `dist/` |
| `npm run preview` | Serve the built `dist/` before deploying |
| `npm run check` | Pre-deploy gate — entry point, asset paths, exact-case filenames |

No dependency is needed just to *view* either site — any static server
(`python3 -m http.server 8000`) will serve them.

## Structure

```
index.html  about.html  products.html  research.html          ← MEGADUCT (8 pages)
support.html  projects.html  media.html  contact.html
linkk/
  index.html  about.html  products.html  research.html        ← LINKK (12 pages)
  support.html  projects.html  media.html  contact.html
  sandwich-busduct.html  non-segregated-phase-product.html
  privacy-policy.html  part-*.html                            ← + 19 component pages
assets/
  css/style.css        MEGADUCT design system
  css/linkk-2026.css   LINKK design system
  css/linkk.css        superseded, referenced by nothing — kept only for diffing
  js/main.js           shared: nav, drawer, filtering, lightbox, validation, video
  img/  cert/
scripts/check-site.sh  pre-deploy gate
vite.config.js         dev server + multi-page build config
```

## Three rules that will bite you

**1. A new page must be added in three places** — the file itself, both sites
(or the switcher 404s), and `build.rollupOptions.input` in `vite.config.js` (or
it is missing from the build). `npm run check` catches the first two.

**2. The switcher points each half at the same filename on the other site**
(`/products.html` ⇄ `/linkk/products.html`), so it only works while both sites
share those filenames.

**3. Bundlers rewrite `src` and `href`, never `data-*`.** The product lightbox
therefore reads each image's own `src`, not a path in an attribute. Keep it that
way when adding products.

## Deployment

The repository root is the deployable site — `index.html`, `linkk/` and
`assets/` are served directly, which is what GitHub Pages publishes.
`npm run build` is optional: it writes a minified, cache-busted copy of **both
sites** to `dist/`.

Run `npm run check` before pushing.

## Blockers before launch

| | |
| --- | --- |
| **Enquiry form has no backend** | Both sites. Validates, then confirms without sending — deliberate, so it never silently drops a real enquiry. Point `action` at a handler and remove `data-demo="true"`. Add spam protection. |
| **No electrical ratings are published** | Deliberate. One exception: "temperature rise testing up to 5000A" on R&D, which LINKK publishes itself. Needs engineering sign-off. |
| **Product copy is ours, not the client's** | The 19 component pages carry written descriptions; the live site's are all empty. Needs an engineering read-through. |
| **1992 vs 2013 vs 2010** | Three founding years appear in the client's own copy. All preserved as written. Needs a decision. |
| **`/compliance/` is missing** | Exists on the live LINKK site and is not in this build. |
| **Project sector filter is missing** | The live site filters 45 projects by 12 sectors; ours groups 44 by region with no filter. |

Full detail — every unresolved item, content conflict, missing asset and pending
file — is in [docs/outstanding.md](docs/outstanding.md).

## Documentation

| Document | What is in it |
| --- | --- |
| [docs/design-system.md](docs/design-system.md) | Stylesheets, type scale, colour, geometry, logo, product renders, motion, image protection |
| [docs/build-history.md](docs/build-history.md) | The four passes that rebuilt LINKK against the live site, and what each changed |
| [docs/outstanding.md](docs/outstanding.md) | Everything awaiting a client decision, file or sign-off |
| [docs/linkk-live-site-study.md](docs/linkk-live-site-study.md) | Study of the live linkk.com.my — platform, every interaction, all 19 products |

## Content note

Company information, product names, project references and contact details come
from megaduct.com.my and linkk.com.my. Product descriptions are plain-language
summaries of what each component does, written here — have LINKK's engineering
team approve them, and supply any specification data, before publishing.
