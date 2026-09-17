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

**All eight LINKK pages now run on `assets/css/linkk-2026.css`**, the industrial
design system built on the Home page. The migration is complete:

| Stylesheet | Used by |
| --- | --- |
| `assets/css/style.css` | The eight MEGADUCT pages at the repository root |
| `assets/css/linkk-2026.css` | All eight LINKK pages in `linkk/` |
| `assets/css/linkk.css` | **Nothing.** Superseded by `linkk-2026.css` |

`linkk.css` is no longer referenced by any page. It is kept only so the previous
LINKK design can be diffed against the current one, and can be deleted once that
is no longer useful. `npm run check` does not test it.

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
| `.hero` | `min-height:clamp(560px,84svh,780px)` | 756px / 780px |

Type is a separate system — see **The type scale** below.

Two rules to keep:

- **No ordinary section takes a viewport height.** Only `.hero` has a
  `min-height`, and it is capped at 780px so it does not become a slide on a
  tall monitor.
- **`.mg-stage` plates are absolutely positioned, not grid items.** As grid
  items their square intrinsic ratio fed back into row sizing and silently
  overrode the stage's `aspect-ratio`, rendering a 560x373 box as 560x560.

### The type scale

`assets/css/linkk-2026.css` used to declare **59 distinct font sizes**, nearly
all hardcoded px, including 22 separate heading `clamp()`s and 39 declarations
below 11px. There was no scale: each component invented a size, so the nav was
14px while the topbar links beside it were 10.5px, and the body copy under a
16.6px standfirst was 14px.

Fourteen tokens now carry all of it. **No rule sets a raw px font size** — the
one exception is the `×` glyph on the drawer's close button, which is an icon.

| Token | Clamp | 390 | 768 | 1440 | 1920 |
| --- | --- | --- | --- | --- | --- |
| `--t-display` | `clamp(2.6rem,4.6vw,4.5rem)` | 41.6 | 41.6 | 66.2 | 72 |
| `--t-h1` | `clamp(2.15rem,3.45vw,3.5rem)` | 34.4 | 34.4 | 49.7 | 56 |
| `--t-h2` | `clamp(1.9rem,2.75vw,2.95rem)` | 30.4 | 30.4 | 39.6 | 47.2 |
| `--t-h3` | `clamp(1.4rem,1.95vw,2.05rem)` | 22.4 | 22.4 | 28.1 | 32.8 |
| `--t-h4` | `clamp(1.2rem,1.45vw,1.55rem)` | 19.2 | 19.2 | 20.9 | 24.8 |
| `--t-h5` | `clamp(1.02rem,.85vw,1.15rem)` | 16.3 | 16.3 | 17.2 | 18.4 |
| `--t-body-lg` | `clamp(1.0625rem,1.25vw,1.1875rem)` | 17 | 17 | 18 | 19 |
| `--t-body` | `clamp(1rem,.35vw + .72rem,1.125rem)` | 16 | 16 | 16.6 | 18 |
| `--t-body-sm` | `clamp(.9375rem,.25vw + .78rem,1rem)` | 15 | 15 | 16 | 16 |
| `--t-nav` | `clamp(.9375rem,.08vw + .91rem,1rem)` | — | — | 15.7 | 16 |
| `--t-button` | `clamp(.875rem,.1vw + .84rem,.9375rem)` | 14 | 14 | 14.9 | 15 |
| `--t-label` | `clamp(.75rem,.12vw + .705rem,.8125rem)` | 12 | 12 | 13 | 13 |
| `--t-technical` | `clamp(.71875rem,.1vw + .68rem,.78125rem)` | 11.5 | 11.5 | 12.3 | 12.5 |
| `--t-micro` | `clamp(.6875rem,.08vw + .665rem,.75rem)` | 11 | 11 | 11.8 | 12 |

Barlow Condensed carries display through h4, Barlow carries h5 and everything
you read, IBM Plex Mono carries label/technical/micro.

Leading and tracking are tokens too: `--lh-display` 1.0, `--lh-head` 1.06,
`--lh-head-sm` 1.16, `--lh-head-xs` 1.35, `--lh-body` 1.65, `--lh-body-sm` 1.6,
`--lh-dense` 1.45, `--lh-label` 1.4; `--ls-display` -.018em, `--ls-head`
-.012em, `--ls-label` .14em, `--ls-tech` .12em, `--ls-btn` .04em.

Four rules to keep:

- **Nothing renders below 11px.** `--t-micro` is the floor and is only for
  metadata that is genuinely secondary: index numerals, country codes, status
  chips. Everything a visitor has to read starts at `--t-technical`.
- **Leading belongs to the step, not to the tag.** `h1,h2,h3,h4` get
  `--lh-head-sm`; the `.d*` classes override upward. This matters because
  twelve display-sized elements are `<span>` or `<a>` — `.ind-row .nm`,
  `.cta-tel`, `.lg-mark`, `.foot-tel`, `.cdl-row .big` and friends — so the tag
  rule never reached them and they ran the body's 1.65 at 21-40px.
- **Buttons have one size.** `.head-cta` differs from an in-page `.b` in
  padding only. It used to override `font-size` to 13px, which is why the
  header CTA never matched the page CTAs.
- **No inline type in the markup.** Nine `style="font-size:11px"` attributes on
  Our Products silently outranked the whole system; `grep -n 'style="[^"]*font-size'
  linkk/*.html` should stay empty.

The steps are spaced 1.26-1.45x apart at 1440 (66.2 / 49.7 / 39.6 / 28.1 /
20.9), so hero, section heading and subsection can never be confused. Measure is
held at 60-68`ch`, which lands at roughly 68-72 actual characters in Barlow —
`ch` is the advance of "0", which is wider than the average letter.

### Colour system

`linkk-2026.css` carries the LINKK house atmosphere from `linkk.css` — bright,
white-led, with a pale green-grey tint for alternate bands — on the modern
industrial layout. Dark is used **twice** on the page and nowhere else.

| Token | Value | Used for |
| --- | --- | --- |
| `--section-light` | `#ffffff` | Statistics, Systems we build, Legrand |
| `--page-bg` | `#f7f8f5` | Hero base, Industries, Global projects, `<body>` |
| `--section-soft` | `#f1f4ee` | Top bar, the MEGADUCT breakdown |
| `--section-muted` | `#e8eee5` | Testing — the deepest light tone |
| `--surface` | `#ffffff` | Plates, panels, the header |
| `--text-primary` | `#1d241f` | Headings and key figures (13.4:1 worst case) |
| `--text-secondary` | `#4d564f` | Body copy (6.5:1 worst case) |
| `--text-muted` | `#5f6a61` | Mono labels and numerals (4.78:1 worst case) |
| `--border` | `#dde4da` | Hairlines |
| `--border-soft` | `#e9eee7` | Section seams and inner dividers |
| `--dark-section` | `#202720` | 06 Engineering journey |
| `--dark-section-2` | `#1b211c` | 10 Closing CTA |
| `--dark-deep` | `#171c17` | Footer |
| `--dark-rule` | `#333c33` | Hairlines on dark |
| `--on-dark` / `--on-dark-body` / `--on-dark-muted` | `#ffffff` / `#d6ddd6` / `#a3ada4` | Text on the two dark bands |
| `--linkk-green` | `#6aae2c` | Button fills, dark-section accents |
| `--linkk-green-bright` | `#7cc636` | Hover |
| `--linkk-green-dark` | `#44741a` | Green that is **text or an icon on light** |
| `--linkk-green-soft` | `#eaf4df` | Row hover wash, spec chips |
| `--legrand` | `#e30613` | Sampled from the supplied logo artwork |

The band sequence, top to bottom. Every light-to-light step is under 1.2:1:

| Band | Colour |
| --- | --- |
| top bar | `--section-soft` |
| header | `rgba(255,255,255,.88)` |
| 01 hero | gradient `#fff` → `--page-bg` → `--section-soft` |
| 02 statistics | `--section-light` |
| 03 industries | `--page-bg` |
| 04 one system | `--section-soft` |
| 05 systems we build | `--section-light`, ramping to `--section-muted` |
| 06 journey | **dark** `--dark-section` |
| 07 testing | ramp from `#e3eade` into `--section-muted` |
| 08 projects | `--page-bg` |
| 09 legrand | `--section-light`, ramping to `--section-muted` |
| 10 closing CTA | **dark** `--dark-section-2` |
| footer | `--dark-deep` |

Five rules to keep:

- **Every band is a clean full-width fill.** A band changes on a full-width
  horizontal edge, or on a full-width vertical ramp. Nothing paints a
  background across part of the width. An earlier `.sec--step` device did
  exactly that — a 58%-wide, ~94px-tall block of the neighbouring tone in one
  top corner — and it read as a background that had stopped early rather than
  as a transition. It is retired; the class is kept as a no-op so a stale page
  cannot bring the rectangle back.
- **Dark is the exception, not the default.** Two bands only, and never two in
  a row. A third dark section would put the page back where it was.
- **`--linkk-green` is fill-only on light surfaces** — it reaches 2.9:1 on
  white. Green text and icons on light use `--linkk-green-dark`, the only step
  that clears 4.5:1 on `--section-muted`. On a dark band `--linkk-green` is
  fine at 5.6:1.
- **No hard edge into or out of a dark band.** `.sec--to-dark` fades the light
  section above into `--section-muted`; `.sec--from-dark` fades back out; and
  `.sec--dark` supplies a 3px `--linkk-green` top rule plus its own vertical
  gradient. They are declared as `.sec.sec--to-dark` so they outrank a
  section's own background, which is declared later in the sheet.
  `--to-dark` paints **only the fade** — the top stop is the destination colour
  at zero alpha, so it composes onto `--light`, `--soft` or `--surface` alike
  and every page can approach its dark section the same way. Use the
  destination colour at `0` alpha, never the keyword `transparent`, which
  interpolates through transparent black and greys the middle of the ramp.
- **A band class owns the background; a layout class must not.** `.gp` used to
  set one too, and it silently outranked `.sec--surface` on Our Projects,
  producing two adjacent bands of the same tone.
- **No text carries `opacity` below 1.** Anything that needs to look secondary
  uses `--text-muted`.

Every rendered text node on the home page passes WCAG AA at its own size.
`scripts/` has no checker for this; it was verified in-browser against
computed styles.

### The aspect-ratio trap

`aspect-ratio` on a box **plus `height:100%` on an in-flow child of it** is
circular, and a CSS grid resolves it by sizing the row to the ratio box alone.
Everything after that child is then laid out below the grid item, outside it.

That is what happened to the Products component gallery: each card's row came
out 379px while its content ran to 413px, so the card's bottom hairline was
drawn through the product name and the next row's index numerals landed on the
previous row's text. Three visible symptoms, one cause.

Put the ratio on the image instead — it has a definite width from the column
and nothing circular to resolve:

```css
.comp-media     { position:relative; margin-bottom:12px; }
.comp-media img { width:100%; height:auto; aspect-ratio:1/1; object-fit:contain; }
```

A ratio box whose children are all `position:absolute` is safe, because an
absolutely-positioned child contributes nothing to intrinsic sizing. That is
why `.mg-stage`, `.pfeat-media` and `.vshell` were never affected.

### Geometry and the blend rule

The layout is industrial but not boxed: product renders have no container at
all. Three radii exist — `--r-btn: 5px` (buttons, chips), `--r-sm: 7px` (small
surfaces), `--r-md: 10px` (large media panels) — and most visuals never touch
them. Depth comes from a soft wash plus a contact shadow behind each render,
and the industrial character is carried by linework (datum lines, baselines,
registration marks, index numerals) rather than by enclosure.

**The blend rule. Every product photograph in `assets/` is a JPEG shot on
white with no alpha channel.** They sit directly on tinted sections only
because `mix-blend-mode: multiply` makes their white margin take the section
colour. That is the whole reason the cards could be deleted, and it is fragile
in one specific way:

> Anything between the image and the section background that forms an isolated
> group kills the blend, and the white rectangle comes straight back.

In practice that means **none of the following may appear on the image or any
ancestor up to the section**: `opacity` below 1, `isolation: isolate`,
`filter`, `backdrop-filter`, `will-change: opacity|filter`, `contain: paint`,
or `position` + a non-`auto` `z-index`. Four separate regressions during this
pass came from exactly that list:

| Cause | Symptom |
| --- | --- |
| `z-index: 2` on `.hero .wrap` | Hero render showed a white rectangle. Fixed by moving the green wash into the `background` shorthand so `.wrap` needs no `z-index` |
| `z-index: 1` on `.mg-stage` | Same, in the MEGADUCT section |
| `will-change: opacity` on the plates | Same — it makes the element its own isolated group |
| `[data-reveal]` fading opacity 0→1 | White rectangle *during the transition only*. `[data-reveal="shift"]` and the hero panel's `data-enter` move without fading for this reason |

A white or near-white wash behind a render causes the same visible result by a
different route: multiply against near-white returns near-white. The washes are
therefore faint **dark** lifts, not light ones.

### Logo

`assets/img/site/logo-LINKK.png` (496x136) is the artwork as supplied: glyph
green `#b3cd3d`, wordmark grey `#605c5f`, Legrand red `#e30613`. All eight
LINKK pages use it unmodified, now that the home-page header is light too.

`logo-LINKK-dark.png` is the same file with only the neutral inks flipped for
a dark surface — the wordmark grey becomes `#f1f3f2`, the "A brand of" black
becomes white, and the green and red are untouched. Geometry is
pixel-identical. Nothing uses it at present; it is kept for any future dark
header. Replace both with the vector original if LINKK supply an SVG or EPS.

Home-page-only behaviours live at the end of `assets/js/main.js` and are each
guarded on their own markup, so the other fifteen pages load the file and do
nothing extra:

| Hook | Does |
| --- | --- |
| `.hero [data-enter]` | Hero entrance. Plays on the frame after load, not on scroll — the hero is above the fold, so an observer would fire before first paint or not at all. `.is-ready` on `.hero` drives it; CSS delays stagger it |
| `[data-reveal]` (+ `data-d` 1-5) | Staggered scroll reveal via IntersectionObserver, for everything below the fold |
| `[data-count]` | Number count-up. Groups thousands only if the authored value did — otherwise the year 1992 renders as "1,992" |
| `[data-mg-list]` / `[data-mg-stage]` | MEGADUCT breakdown as an ARIA tablist over a media stage. Roving tabindex, arrow/Home/End keys. `data-media="video"` on a tab surfaces the play button and fires a `mg:play` event |
| `[data-gp-filter]` / `[data-gp-list]` | Project sector filter, built from the rows' own `data-industry` values. Hidden until the script runs, so the no-JS state is the full list |
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

### Internal pages

The Home page is the source of truth for the design system. Internal pages are
built from its components plus the `INTERNAL PAGES` block at the end of
`linkk-2026.css` — page hero (`.phero`), family index (`.findex`), product
feature (`.pfeat`), system flow (`.flow`), component gallery (`.comp`),
applications (`.app-row`) and resources (`.res`). Nothing above that block is
varied per page.

A second block, `INTERNAL PAGES — PART 2`, carries the components the other six
pages needed: company timeline (`.tline`), principles (`.prin`), pull statement
(`.pquote`), workflow rail (`.wf` / `.wf-layout`), capability grid (`.caps`),
project search (`.gp-tools` / `.gp-search`), hero mosaic (`.phero-mosaic`),
video wall (`.vfeat` / `.vrow` / `.vshell`), social strip (`.soc`), contact
details list (`.cdl`), form (`.cform` and `.field`) and map band (`.mapband`).

**All eight LINKK pages are migrated.** Each page has one dominant device of its
own, so no two read the same way:

| Page | Its device | Dark bands |
| --- | --- | --- |
| Home | The MEGADUCT breakdown tablist | 2 |
| Our Products | Family index + 12-component gallery | 2 |
| About Us | Vertical milestone timeline (`.tline`) | 1 |
| R&D | Instrument trace at hero scale + a five-gate flow | 2 |
| Our Support | Eight-stage staggered workflow beside a sticky heading | 1 |
| Our Projects | Sector index that pre-sets a searchable 44-row list | 1 |
| Media | One feature video, three secondary, then resources | 1 |
| Contact Us | Form-led two column, map band with an overlapping card | 0 |

Three hooks are wired for work that does not exist yet:

| Hook | Ready for |
| --- | --- |
| `.pfeat-media` on the Sandwich section | The hardware breakdown video. Same `data-plate` contract as the Home MEGADUCT stage — add a sibling with the same key |
| `[data-comp-grid]` | A component detail page or modal. Each component is already a `<button>` with `data-component`; pressing one fires `comp:open` with the key and name |
| `[data-gp-list]` on Projects | A real project database. The chip row, the count and the search are all built from the rows themselves, so a project is added by adding a row — there is no list to keep in sync. `[data-gp-jump]` elsewhere on the page pre-sets the filter |

### Our Products: content awaiting confirmation

| Item | Status |
| --- | --- |
| **Data Centre Busduct**, **Cast Resin Busduct** | Listed in the family index because the names were supplied, but no specification exists in any source here. Both carry a "spec to be confirmed" state rather than invented copy. Each becomes a full section by copying one `.pfeat` block |
| **Current range** | No ampere or kA rating exists anywhere in the project. The only current figure is "under load up to 5000A" in `research.html`, which is a *test condition*, not a product rating. Not published |
| **Aluminium conductors** | Not mentioned in any source. Only `99.95% minimum copper` is verified |
| **Utilities** sector | Not among the twelve verified sectors. "High Rise & Mixed Development" is used instead |
| **Component purposes** | The one-line purpose under each of the twelve components describes what the fitting does geometrically. These are the only sentences on the page not lifted from existing LINKK copy — worth an engineering read-through |
| **Brochure, datasheets, installation guide, technical drawings** | Do not exist. Listed as pending, not linked. Replace each pending `<div class="res res--pending">` with the `<a class="res">` pattern above it when a file is supplied |

### LINKK internal pages: content conflicts and gaps

Found while rebuilding About, R&D, Support, Projects, Media and Contact. Every
one is **preserved as written** — nothing was resolved by guessing.

| Where | What | Status |
| --- | --- | --- |
| About | **1992 vs 2013.** "Our journey commenced in 1992" / "manufacturing since 1992" against "LINKK Busway Systems (M) Sdn Bhd was established in 2013". Both are stated as fact in current copy | Shown as two separate milestones on the timeline, each saying what it claims. Confirm the intended reading |
| About | **The Legrand date.** No date for the Legrand relationship appears anywhere in this project | The milestone carries a "date to confirm" chip rather than a plausible-looking year. Drop the `--tbc` modifier once confirmed |
| About | **"30+ years"** on the Home page, against 1992 → 2026 = 34 | Home is frozen, so it stands there. The figure is not repeated on About |
| R&D | **Epoxy thickness and pinhole testing** | Neither appears in any source. The verified programme is ten tests and does not include them. Not published |
| R&D | **Aluminium conductors** | Not mentioned anywhere. Only `99.95% minimum copper` is verified |
| R&D | **The five-gate flow** (Material → Manufacture → Test → Verify → Release) | A presentational framing of existing copy — every line under a gate is lifted from the verified test programme or the support page. No new claim, but worth a read-through |
| Projects | **Duplicate references in the source list.** "Customs Headquarters Building, Hong Kong" (Public Centre & IT) vs "Custom Headquarter, Hong Kong" (Office Tower); "PCCW, Hong Kong" vs "PCCW Data Centre, Hong Kong"; "Perodua Assembly Plant" (Hospital & Assembly Lines) vs "Perodua Manufacturing Plant" (Factories) | All four kept verbatim. They may be the same projects listed twice |
| Projects | **"Hospital & Assembly Lines"** mixes hospitals with Proton, Perodua, Galtronics and Singpost | Kept as the source has it. Splitting it would change LINKK's own taxonomy |
| Projects | **"Utilities"** | Not among the twelve verified sectors. Not added |
| Projects | **Country codes** on each row are derived from the country already written beside the project — not new data |
| Projects | **The nine sector photographs** (`project-1..9.jpg`) are labelled against the *MEGADUCT* site's nine sectors, which do not map one-to-one onto LINKK's twelve | Three are used in the hero mosaic with their own labels. No sector row carries one, and no individual project is claimed |
| Media | **Brochure, datasheets, installation guide, technical drawings** | Do not exist. Listed as pending, not linked |
| Contact | **File upload** | Not added. The form posts as `application/x-www-form-urlencoded`, so a file field would be silently dropped. Needs `enctype="multipart/form-data"`, a handler that accepts the part, and a size/type limit — all three together. Until then the form note points people at email |
| Contact | **Project type** and **project country** were added as optional fields. The project-type options are LINKK's own twelve project sectors | Extra POST fields; no backend change needed |

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

1. **Product renders at 1600px+.** Every product shot is 600x600 and renders at
   roughly 490px CSS in the hero panel — only 1.2x on a 2x display. This is the
   most visible shortfall on the page.
2. **Project photography.** Section 08 has a thumbnail slot ready
   (`.gp-thumb`, see the note in the CSS) and uses none, because the existing
   `assets/img/site/project-*.jpg` are 300px wide and do not correspond to the
   six named projects.
3. **Testing.** The temperature-rise and short-circuit rigs. Section 07 carries
   an SVG instrument trace because no testing photograph exists.
4. **MEGADUCT hardware-breakdown video** or an exploded-view viewer. Section 04
   is wired for it — add a sibling to the media stage with the same
   `data-plate` key and `data-media="video"` on the tab.
5. **Factory floor** at Beranang, 2400px wide.

No image on the site has a `srcset`, and none is served as WebP or AVIF.

### LINKK brand assets

The supplied logo artwork is in use on all eight LINKK pages — see the **Logo**
section above. Still missing: the vector original (SVG/EPS), and official
Legrand group artwork for section 09, which currently draws the lockup as a red
square plus the wordmark in Barlow Condensed.

LINKK photography is placeholder: the pages reuse the MEGADUCT product and
banner images already in `assets/`.

### Unused assets

These were part of the original site's chrome and are no longer referenced by
either stylesheet or any page. Safe to delete:

```
assets/img/site/arrow.png        back-top.png    scroll-bg.png
assets/img/site/but-details.png  but_enquiry.png logo-bot.png
assets/img/site/main-img.jpg
```

`main-img.jpg` is the only image in the project wider than 720px (1800x383),
but it is a stock composite with MEGADUCT-blue "BUSDUCT SYSTEM" wordmark baked
into the pixels, so it cannot be used on LINKK either. `about.jpg` is a 300x351
stock photograph of models in hard hats, not LINKK staff, and is deliberately
not used as "our people".

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
