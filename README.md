# MEGADUCT + LINKK

Two corporate websites for **LINKK Busway Systems (M) Sdn Bhd** (1018052-D),
Beranang, Selangor, Malaysia — served from one project, with a switcher in the
header that moves between them.

| Site | Lives at | Brand | Stylesheet |
| --- | --- | --- | --- |
| **MEGADUCT** | repository root | MEGADUCT red + blue, Archivo / Inter | `assets/css/style.css` |
| **LINKK** | `linkk/` | LINKK green, "a brand of Legrand", Poppins | `assets/css/linkk.css` |

MEGADUCT is the busduct product brand; LINKK is the company that makes it and
holds the MEGADUCT trademark. Content follows megaduct.com.my and linkk.com.my
respectively.

## The brand switcher

Every page of both sites carries the same control, in three places: the top bar,
the mobile drawer (under "Switch site"), and the footer.

```
┌───────────┬──────────────┐
│ MEGADUCT  │  LINKK  NEW  │        ← the active site is filled in
└───────────┴──────────────┘
```

**Each half points at the same page on the other site**, so the visitor keeps
their place: `/products.html` ⇄ `/linkk/products.html`. That only works while both
sites have the same eight filenames.

> **Adding a page means adding it to both sites**, or the switcher will send
> people to a 404 from one of them. `npm run check` catches this — it resolves
> every local link on every page and fails on a miss.

## Pages

The same eight on each site. MEGADUCT files sit at the root, LINKK files in `linkk/`.

| File | MEGADUCT | LINKK |
| --- | --- | --- |
| `index.html` | Hero, stats, products, sectors, CTA | Light hero, stats, what we do, products, support |
| `about.html` | Company introduction, approach, certificates | Who we are, vision, mission, people, quality policy |
| `products.html` | All 15 components, filterable, with lightbox | Sandwich bus duct, NSPB, components, certifications |
| `research.html` | R&D, quality-control programme, certificate tally | Same, in LINKK's wording |
| `support.html` | Technical / delivery / site support, four steps | Same |
| `projects.html` | Nine sectors with references and reach stats | Twelve sectors, full project list by country |
| `media.html` | Social channels + video wall | Same |
| `contact.html` | Enquiry form, contact details, map | Same |

## Structure

```
index.html  about.html  products.html  research.html          ← MEGADUCT
support.html  projects.html  media.html  contact.html
linkk/
  index.html  about.html  products.html  research.html        ← LINKK
  support.html  projects.html  media.html  contact.html
assets/
  css/style.css   MEGADUCT — design tokens at the top of the file
  css/linkk.css   LINKK — same class vocabulary, its own tokens + an
                  overrides block; see "Two stylesheets" below
  js/main.js      shared by both sites: nav, drawer, filtering, lightbox,
                  form validation, video facade
  img/products/   15 product photographs
  img/site/       logos, banners, certificates, sector imagery
  cert/           the four certificate PDFs
scripts/
  check-site.sh   pre-deploy gate (asset paths, exact case, entry point)
package.json    npm scripts (dev / build / preview / check)
vite.config.js  dev server + multi-page build config
```

No framework. The pages are hand-written HTML that run as-is; Vite provides the
dev server and an optional production build. The only external runtime
dependencies are the Google Fonts (Archivo + Inter on MEGADUCT, Poppins on LINKK)
and the YouTube thumbnails on the media pages.

## Getting started

```bash
npm install
npm run dev
```

Opens http://localhost:5173 on the MEGADUCT home page; LINKK is at
http://localhost:5173/linkk/index.html, or one click away on the switcher.

> **Node 20.19+ or 22.12+ is required.** Vite 8 is built on rolldown, whose
> native binding declares that engine range. On an older Node, npm silently skips
> the binding as an unmet optional dependency and Vite then fails with
> `Cannot find native binding`. If you hit that: upgrade Node, delete
> `node_modules` and `package-lock.json`, and reinstall.

### Scripts

| Command | Does |
| --- | --- |
| `npm run dev` | Dev server on :5173 with live reload |
| `npm run build` | Optimised production build of both sites into `dist/` |
| `npm run preview` | Serve the built `dist/` locally before deploying |
| `npm run check` | Pre-deploy gate — entry point, asset paths, exact-case filenames |

No dependency is needed just to *view* either site: they are plain HTML and any
static server (`python3 -m http.server 8000`) will serve them.

## Three stylesheets

`linkk/index.html` has been rebuilt on a new industrial design system,
`assets/css/linkk-2026.css`. **It is the target system for the whole LINKK
site**; the other seven LINKK pages still load `linkk.css` and are unchanged.
Migrate them one at a time by swapping the stylesheet link and re-authoring the
page body against the new components.

Until that happens the LINKK Home page deliberately looks different from the
rest of the LINKK site. That is expected, not a bug.

### The 2026 system in one paragraph

Dark charcoal-green (`--carbon`) dominates, warm white (`--paper`) carries the
product, steel grey carries structure, and LINKK green is an accent — never a
background. Type is Barlow Condensed (display) + Barlow (UI) + IBM Plex Mono
(technical labels). Geometry is square: 2px radii, hairline rules, no cards.
Sections are numbered `01`–`10` by the mono eyebrow.

### Desktop scale

The system is tuned for 1440x900, 1536x864 and 1920x1080. Ordinary sections size
from their content and land at roughly one viewport; only the hero is
height-constrained.

| Token / rule | Value | At 1440 / 1920 |
| --- | --- | --- |
| `--wrap` | `1280px` | fixed |
| `.sec` padding-block | `clamp(56px,5.6vw,96px)` | 81px / 96px |
| `.d1` hero | `clamp(3.25rem,5vw,4.75rem)` | 72px / 76px |
| `.d2` section | `clamp(2.3rem,3.5vw,3.4rem)` | 50px / 54px |
| `.d3` | `clamp(1.65rem,2.3vw,2.3rem)` | 33px / 37px |
| `body` | `16.5px` | fixed |
| `.hero` | `min-height:clamp(560px,84svh,780px)` | 756px / 780px |

Two rules to keep:

- **No ordinary section takes a viewport height.** Only `.hero` has a
  `min-height`, and it is capped at 780px so it does not become a slide on a
  tall monitor.
- **`.mg-stage` plates are absolutely positioned, not grid items.** As grid
  items their square intrinsic ratio fed back into row sizing and silently
  overrode the stage's `aspect-ratio`, rendering a 560x373 box as 560x560.

Home-page-only behaviours live at the end of `assets/js/main.js` and are each
guarded on their own markup, so the other fifteen pages load the file and do
nothing extra:

| Hook | Does |
| --- | --- |
| `[data-reveal]` (+ `data-d` 1-5) | Staggered scroll reveal via IntersectionObserver |
| `[data-count]` | Number count-up. Groups thousands only if the authored value did — otherwise the year 1992 renders as "1,992" |
| `[data-mg-list]` / `[data-mg-stage]` | MEGADUCT component breakdown; each button's `data-plate` selects a real product photograph |
| `[data-journey]` | Scroll-linked progress on the process timeline; auto-completes when the track becomes a mobile swipe rail |
| `.trace-path` | Measures its own length so the CSS dash animation draws it exactly |

All of it is disabled under `prefers-reduced-motion`, and `.no-js` on `<html>`
keeps every revealed element visible if the script never runs.

## Two stylesheets, one class vocabulary

`linkk.css` began as a copy of `style.css` and uses **exactly the same class
names**, so page structure is interchangeable between the sites. It differs in two
places only:

1. **The `:root` token block** — colours, fonts, radii, shadows.
2. **An overrides block at the end**, under `LINKK overrides`. This is what stops
   LINKK looking like a recoloured MEGADUCT: Poppins instead of Archivo, a light
   top bar instead of a dark one, pill buttons, larger radii, a light hero
   (`.hero--light`) where MEGADUCT opens on a dark photograph.

A change to a *shared component* — a card, the footer, the drawer — has to be made
in both files. A change to *brand* should only touch tokens or the overrides block.

### Design tokens

| | MEGADUCT | LINKK |
| --- | --- | --- |
| Primary | `--red` `#e4131a` | `--green` `#8cc63f`, `--green-700` `#517a1c` |
| Secondary | `--blue` `#1c3f9c` | `--legrand` `#e2001a` (parent mark only) |
| Dark surface | `--navy` `#0a1733` | `--navy` `#18211b` |
| Display type | Archivo 700/800 | Poppins 600/700 |
| Button radius | 10px | pill |

Layout is a 1280px container. Both sites collapse the navigation to the drawer at
**1150px** — eight tabs plus a logo and a call-to-action will not fit on one row
below that, and a wrapped nav bar reads as broken. Motion respects
`prefers-reduced-motion`.

## Media page

**Social channels** — four cards per site, linking to:

| Platform | Account |
| --- | --- |
| Facebook | `facebook.com/LinkkBuswaySystemsMSdnBhd` |
| YouTube | `@linkkmegaduct` |
| Instagram | `@linkkbusway` |
| LinkedIn | `linkk-busway-systems` |

**Video wall** — the four videos on the YouTube channel. Each ships as a still plus
a play button, *not* an iframe. Nothing is requested from YouTube until the visitor
clicks, so the page loads fast and sets no third-party cookies on arrival. The
handler in `main.js` then swaps in a `youtube-nocookie.com` player set to autoplay.

To add a video, copy a `.vcard` block and change the 11-character YouTube ID in all
three places it appears:

```html
<button class="vframe" type="button" data-video="VIDEO_ID" data-title="Title"
        aria-label="Play video: Title">
  <img src="https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg" alt=""
       width="1280" height="720" loading="lazy">
  <span class="vplay"></span>
</button>
```

Thumbnails load from YouTube rather than being copied into `assets/`, so they stay
in step if the channel's artwork changes.

## Deployment

The repository root is the deployable site — `index.html`, `linkk/` and `assets/`
are served directly, which is what GitHub Pages publishes. `npm run build` is
optional: it writes a minified, cache-busted copy of **both sites** to `dist/`.

Two things to know if you deploy `dist/`:

- `vite.config.js` lists every page under `build.rollupOptions.input`, MEGADUCT and
  LINKK. **A new page must be added there**, or it will be missing from the build.
- Bundlers rewrite `src` and `href`, but never `data-*` attributes. The product
  lightbox therefore reads each image's own `src` rather than a path in an
  attribute. Keep it that way when adding products.

## Outstanding

### Enquiry form backend

The contact form on **both** sites is front-end only. It validates input, then shows
a confirmation without sending anything — deliberate, so it never silently drops a
real enquiry. To make it live:

1. Point `action` on `#enquiry-form` at your mail handler. The original site used
   `email_enquiry.asp`, which needs ASP/IIS. On static hosting, use a form service
   or a small serverless function.
2. Remove `data-demo="true"` from the same `<form>` tag. The demo branch in
   `main.js` is keyed off that attribute; client-side validation stays.
3. Test that submissions reach `marketing@linkk.com.my` and
   `customerservice@linkk.com.my`.

Add spam protection (honeypot or CAPTCHA) before going live. **Do both sites.**

### LINKK Home: content awaiting approval

Five things the redesign brief asked for are **not published**, because they do
not appear anywhere in verified LINKK content and the rules above forbid
inventing specifications:

| Item | Status |
| --- | --- |
| **400A–6300A** current range | No rating exists in any source here. The hero rail and stats band are built to take it — add one `<li>` / one `.stat`. |
| **Cast Resin Busduct** | Not a documented family. Section 05 takes another `<article>` when it is. |
| **Data Centre Busduct** | "Data Centre" is a verified *project sector*, not a product family. |
| **Utilities** industry | Not among the twelve verified sectors. "High-Rise & Mixed Use" is used instead. |
| **Healthcare** label | Used as a plain-language name for the verified "Hospital & Assembly Lines" sector. The projects listed under it are real hospitals. |

### LINKK photography

The design works around an asset library that cannot carry it. Needed, in
priority order:

1. **Hero plate** — a MEGADUCT run shot for a dark background, 2400px wide.
   The current hero uses a 600x600 studio shot on white inside a light panel.
2. **Factory floor** — manufacturing at Beranang, 2400px wide.
3. **Testing** — the temperature rise / short circuit rigs. Section 07 currently
   carries an SVG instrument trace because no testing photograph exists.
4. **Installed runs on site** — for the projects section, which is currently
   typographic only.
5. **Product renders at 1600px+** — the existing set is 600x600.

### LINKK brand assets

There is no LINKK logo file in `assets/`. The lockup in the header is drawn in
inline SVG — two rounded squares plus the wordmark and a "a brand of Legrand" line
— defined by `.brand-linkk` in `linkk.css` and repeated in each `linkk/*.html`
header and drawer. **Replace it with the real artwork when you have it**; nothing
else depends on that markup.

LINKK photography is also placeholder: the pages reuse the MEGADUCT product and
banner images already in `assets/`.

### Unused assets

These were part of the original site's chrome and are no longer referenced by
either stylesheet or any page. Safe to delete:

```
assets/img/site/arrow.png        back-top.png    scroll-bg.png
assets/img/site/but-details.png  but_enquiry.png logo-bot.png
assets/img/site/main-img.jpg
```

## Content note

Company information, product names, project references and contact details come
from megaduct.com.my and linkk.com.my. Product descriptions are plain-language
summaries of what each component does.

**No electrical ratings, current capacities or test values are stated anywhere**,
with one exception: the R&D pages state a *testing capability* of "temperature rise
testing up to 5000A", which LINKK publishes on its own site. Have LINKK's
engineering team approve that, and supply and approve any further specification
data, before it is published.

The two sites also disagree on a date, as their sources do: LINKK was incorporated
in **2013**, while manufacturing under MEGADUCT began in **1992**. The MEGADUCT site
says "since 1992"; the LINKK site says "journey commenced 1992, company established
2013". Confirm the wording LINKK wants.
