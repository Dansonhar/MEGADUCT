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

MEGADUCT files sit at the root, LINKK files in `linkk/`.

**LINKK now follows the information architecture of `linkk.com.my` page for
page.** Every page opens on a full-width photo banner with the title over it,
which is the live site's signature and what makes it recognisable.

| File | LINKK — sections, in the live site's order |
| --- | --- |
| `index.html` | 3-slide hero · Introduction · company introduction video · Why choose us (4 strengths + 4 figures over the workforce photograph) |
| `about.html` | Banner · "We are a leading bus duct trunking systems manufacturer" + the workforce photograph whole · Vision · Mission · Core Value (5) · Our People (10-photo gallery + the company photograph whole) · Our Facilities (12-photo gallery) · Quality Policy (3 cards) · Organisation Chart, drawn in the page |
| `products.html` | Banner · Sandwich Bus duct · Non-segregated Phase Bus duct. Two blocks, as on the live site |
| `sandwich-busduct.html` | Banner · About Product · Advantages · the 19-part catalogue, each card linking to its own page |
| `part-*.html` | **19 component pages** — banner with breadcrumb, gallery with thumbnails, related products, CTA to engineering |
| `non-segregated-phase-product.html` | Banner · product explanation with the real photograph · Key Offer |
| `research.html` | Banner · R&D introduction beside the facility photograph · What We Do (3 cards) · Our Certificates (9-authority grid, the certification-body logos, link to the published files) · Quality Control with the 12-photo testing gallery |
| `support.html` | Banner · the support statement · Technical / Delivery / Site Support |
| `projects.html` | Banner · "We supply to over 50 countries globally" · the reach map with 23 project markers · regions · sector filters · the 44-project photo grid |
| `media.html` | Banner · the four films · downloadable certificates · social channels |
| `contact.html` | Banner · consultation photograph + enquiry form · map · address / telephone / email |
| `privacy-policy.html` | Banner · the live site's policy and terms of use, verbatim |

MEGADUCT keeps its own eight pages at the root, unchanged by this pass.

**Media is not on the live site.** It is kept because it holds real material —
the four published films and the four type-test certificates — but it is
secondary and nothing on it is invented.

## Brand realignment

The 2026 redesign had drifted a long way from `linkk.com.my`. It was pulled
back in one pass, keeping the layout and replacing the identity. **The live site
is the source of truth for copy**: where it and this site disagreed, the live
wording won.

| | Was | Now | Source |
| --- | --- | --- | --- |
| Accent green | `#6aae2c` (cool grass) | `#97b63b` / `#b3cd3d` | Sampled from `logo-LINKK.png`; the live theme uses `#839e34` |
| Headings | Barlow Condensed | **Poppins** | The live site's heading face |
| Body | Barlow | **Roboto** | The live site's body face |
| Hero | "Power Distribution, Engineered to Scale." | "Leading Bus duct System Designer" | Live hero |
| Hero visual | Product render | The Beranang factory | Live slider |
| Footer | One address row | Three columns: company, links, get in touch | Live footer |

Sections restored from the live homepage, which the redesign had dropped:
**Introduction**, the **four pillars** (Customised Solution, Facility,
Achievements, Reliability & Recognition) and **Why choose us** with the four
published counters (150+ team members, 20+ awards, 5,000+ completed works, 100+
client's feedback).

Because the display face changed from a condensed to a geometric sans, the
heading steps were cut by roughly a fifth and every leading token was loosened;
see **The type scale**.

### The visual reset

A second pass removed the dark bands and the gradients; see **Colour system**.

### The structural rebuild

A third pass rebuilt the LINKK pages around the live site's own structure,
because the previous ones had kept the layout and changed only the skin. The
audit that drove it, page by page:

| Page | What was missing | What had been invented | Real assets restored |
| --- | --- | --- | --- |
| Home | the 3-slide hero, the introduction video | stats band, industries, MEGADUCT breakdown, product families, journey rail, R&D band, projects index, Legrand band, closing CTA | 3 slider photographs, 4 counter icons |
| About | the 10-photo people gallery, the 12-photo facilities gallery, the organisation chart, the quality policy, the 5 core-value icons | stats band, a dated timeline, "Two regions, one factory", Legrand band, CTA | 22 photographs, the chart, 5 icons |
| Our Products | — | a 4-family index with two families the client has not confirmed, a system-flow rail, an applications list, a documents section, CTA | 2 family photographs |
| Sandwich | the 19-card catalogue linking to component pages | a text-only parts list | 19 component renders |
| Component pages | **all 19** | — | ~60 gallery renders |
| R&D | the certification-body logos, the 12-photo testing gallery | an SVG instrument trace, a 10-item QC list, a 5-gate flow, a conductor feature | the logo strip, 12 photographs |
| Our Support | — | an 8-stage workflow, 6 capabilities, a getting-started block, CTA | the banner photograph |
| Our Projects | **all 44 project photographs** | a stats band, sector index rows, a text-table presentation | 44 photographs |
| Contact | the consultation photograph, the three detail columns | an editorial definition list | 2 photographs |

163 images were available on the live site; 152 were pulled back, downscaled
and recompressed from 70MB to 18MB, and they live in `assets/img/linkk/`.

**Two things could not be taken, and are flagged rather than faked.**

1. The 19 component pages carry **no descriptions and no specifications** on the
   live site: every WooCommerce description tab is empty. The pages are
   image-first and say which family the part belongs to. Nothing is invented to
   fill them.
2. WooCommerce picks **related products at random** on every page load. The
   component pages use the next three parts in catalogue order instead, so the
   links are stable and a visitor can walk the range.

### The revision pass

A fourth pass answered six specific notes from the client.

**The reach map is drawn now.** The live site renders it with amCharts through
the Interactive Geo Maps plugin, which is not part of this build — but the
plugin's own configuration is in the page, and it carries the eighteen country
codes and the twenty-three named projects with their coordinates. So the map is
drawn here instead: `assets/img/linkk/map/world.svg` is Natural Earth's
public-domain 110m country outlines on the same Miller projection theirs uses,
with those eighteen countries picked out, and the project dots are HTML buttons
positioned by the same projection over the top. Dots that would overlap are one
dot naming each site, so Singapore's three projects share a marker rather than
sitting on top of each other. Four of the eighteen — Singapore, Hong Kong,
Bahrain and the Maldives — have no landmass at 110m; they carry dots instead of
fill. `Equity Tower, Indonesia` is plotted at 6.2°S: the client's own map data
has it at 6.2°N, which puts Jakarta in the Bay of Bengal.

**The organisation chart is drawn in the page.** It was the client's PowerPoint
export — bevelled orange and turquoise boxes in a PNG, unreadable below about
900px, unselectable and unsearchable. Same structure, same names and titles, in
the site's own type, reflowing to one column on a phone, and read by a screen
reader as the nested list it is. The four departments' lists start on the same
line because the director boxes share a minimum height, and each tier's
connector is drawn by its outer nodes so it starts and stops on their centres
at any width. The CFO sits beside the Managing Director rather than between the
board and the four directors: the source has the CFO on the board's rail, not
above the directors, and stacking it above them would have claimed a reporting
line the chart does not show.

**The Why-choose-us card is glass, not a white box.** It was opaque white and
it covered four of the six people in the photograph behind it. It is now a
diagonal tint from `.82` to `.70` and back to `.78` over `blur(12px)
saturate(1.7) brightness(1.02)` — the saturation lift is what keeps the green
and navy uniforms behind it reading as colour rather than as grey shapes. A lit
top edge and left edge, two inset rules, a specular sweep across the top-left
corner on `::after`, and an feTurbulence grain at 4.5% on `::before`, because a
frosted sheet is not perfectly smooth. Browsers without `backdrop-filter` get a
denser tint and no blur. The copy steps down one notch to match: the label to
`#3b4a16`, the paragraphs to `#3b433d`. Measured on the rendered page with the
card's own text hidden, the darkest place it ever sits on is a 189-grey — 5.5:1
for the paragraphs, 5.2:1 for the label, 9.0:1 for the headings, at 1440, 1024,
768 and 390. The scrim behind it was re-cut at the
same time: light across the left where the card sits, ramping at 58% to keep
the four white figures above 4.5:1 (measured 4.74–4.90 for the small labels).

**Nobody is cropped through the head any more.** `.pbanner img` takes a
`--focus` set per page, because a 1920×340 strip shows barely a third of a 3:2
photograph and the default centre crop ran straight through the back row on the
group shots. Support and Projects also get `.pbanner--people`, a taller frame.
About's banner is the HQ photograph now: its workforce shot is 300-odd people
filling the frame top to bottom and no strip can hold it, so it runs whole,
uncropped, in the page instead — as does the portrait company photograph, which
`.ppl-band` used to force into 16:7 and cut off at the knees. The photo
galleries moved from 4:3 to 3:2, which is what every photograph in them
actually is; 4:3 was trimming 11% off each side, and on the team photographs
that is a person.

**R&D is not a list of lists any more.** It opens on the R&D facility
photograph beside the introduction, What We Do is three numbered cards, and the
nine certification authorities are one grid — they used to be a bullet list and
a counter row carrying the same nine numbers twice. The published certificates
link through to the Media page.

**The footer carries the live site's devices.** Four columns rather than three,
green headings with a rule under them, a chevron on every link, an icon against
every line of the office details, and both published email addresses. The
routes are split into Links and Our Products, which is what fills the row.

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

White is the page and one light grey alternates the bands; there are no dark
surfaces and no gradient fills anywhere. LINKK green is an accent and never a
background. Type is Poppins (display) + Roboto (UI and body) + IBM Plex Mono
(technical labels). Geometry is understated rather than square: 6/10/14px radii,
hairline rules, almost no cards, and product renders with no container at all.

### Desktop scale

The system is tuned for 1440x900, 1536x864 and 1920x1080. Ordinary sections size
from their content; only the hero is height-constrained.

| Token / rule | Value | At 1440 / 1920 |
| --- | --- | --- |
| `--wrap` | `1280px` | fixed |
| `--flow` | `clamp(22px,2.2vw,32px)` | 32px / 32px |
| `.sec` padding-block | `clamp(48px,4.6vw,78px)` | 66px / 78px |
| `.hero` | `min-height:clamp(440px,62svh,600px)` | 558px / 600px |

Both the section rhythm and the hero came down in this pass. The old 81px
padding was set for a page with two dark bands breaking it up; on an all-light
page the same padding reads as the sections having drifted apart. The hero was
`84svh` — 756px on a 900px laptop, so the Introduction never appeared without a
scroll. 62svh puts the top of the next section just at the fold.

Two rules to keep:

- **No ordinary section takes a viewport height.** Only `.hero` has a
  `min-height`, and it is capped at 600px so it does not become a slide on a
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

The heading steps have been cut twice. First when the display face moved from
Barlow Condensed to Poppins, because a geometric sans sets far wider than a
condensed one: the old 66px hero wrapped where a 50px one does not. Then again
in the visual reset, by a further ~12%, because the page read as stretched — a
50px section heading over 16px body is a magazine spread, not a manufacturer's
website. The steps stay 1.19-1.29x apart at 1440, which is enough separation
once the headings are this close to the body.

| Token | Clamp | 390 | 768 | 1440 | 1920 |
| --- | --- | --- | --- | --- | --- |
| `--t-display` | `clamp(1.95rem,3.1vw,2.95rem)` | 31.2 | 31.2 | 44.6 | 47.2 |
| `--t-h1` | `clamp(1.65rem,2.4vw,2.35rem)` | 26.4 | 26.4 | 34.6 | 37.6 |
| `--t-h2` | `clamp(1.45rem,1.95vw,2rem)` | 23.2 | 23.2 | 28.1 | 32 |
| `--t-h3` | `clamp(1.1875rem,1.4vw,1.5rem)` | 19 | 19 | 20.2 | 24 |
| `--t-h4` | `clamp(1.05rem,1.18vw,1.15rem)` | 16.8 | 16.8 | 17 | 18.4 |
| `--t-h5` | `clamp(1.02rem,.85vw,1.15rem)` | 16.3 | 16.3 | 17.2 | 18.4 |
| `--t-body-lg` | `clamp(1.0625rem,1.25vw,1.1875rem)` | 17 | 17 | 18 | 19 |
| `--t-body` | `clamp(1rem,.35vw + .72rem,1.125rem)` | 16 | 16 | 16.6 | 18 |
| `--t-body-sm` | `clamp(.9375rem,.25vw + .78rem,1rem)` | 15 | 15 | 16 | 16 |
| `--t-nav` | `clamp(.875rem,.06vw + .85rem,.9375rem)` | 14 | 14 | 14.5 | 15 |
| `--t-button` | `clamp(.8125rem,.09vw + .79rem,.875rem)` | 13 | 13 | 13.6 | 14 |
| `--t-label` | `clamp(.75rem,.12vw + .705rem,.8125rem)` | 12 | 12 | 13 | 13 |
| `--t-technical` | `clamp(.71875rem,.1vw + .68rem,.78125rem)` | 11.5 | 11.5 | 12.3 | 12.5 |
| `--t-micro` | `clamp(.6875rem,.08vw + .665rem,.75rem)` | 11 | 11 | 11.8 | 12 |

Poppins carries display through h4, Roboto carries h5 and everything you read,
IBM Plex Mono carries label/technical/micro.

Leading and tracking are tokens too: `--lh-display` 1.12, `--lh-head` 1.2,
`--lh-head-sm` 1.3, `--lh-head-xs` 1.45, `--lh-body` 1.65, `--lh-body-sm` 1.6,
`--lh-dense` 1.45, `--lh-label` 1.4; `--ls-display` -.022em, `--ls-head`
-.01em, `--ls-label` .14em, `--ls-tech` .12em, `--ls-btn` .04em.

**Two of the clamps have a boundary rather than a preference behind them.**
`--t-h3`'s floor is 19px exactly, because below 19px a heading falls into the
band that needs body leading (>=1.42) and h3 carries `--lh-head` at 1.2.
`--t-h4`'s ceiling is 18.4px for the mirror-image reason: it carries 1.45
leading, which is too loose once a heading passes 19px. Move either and the
type audit fails at 390 or 1920.

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

The palette is the live site's: `linkk.com.my` is built on `#ffffff` and
`#f9f9f9` with green used only as an accent, and this is that palette. **There
are no dark surfaces anywhere on the site** — not the hero, not a content band,
not the footer — and no gradient fills. Every band is a flat colour.

| Token | Value | Used for |
| --- | --- | --- |
| `--page-bg` / `--section-light` / `--surface` | `#ffffff` | The page, white bands, panels, inputs |
| `--section-soft` | `#f5f6f2` | The alternating light grey band |
| `--section-muted` | `#eef1eb` | The closing CTA and the map surround — one deeper step |
| `--text-primary` | `#1b1e1c` | Headings and key figures (14.7:1 worst case) |
| `--text-secondary` | `#545d56` | Body copy (5.99:1 worst case) |
| `--text-muted` | `#646d66` | Mono labels and numerals (4.70:1 worst case) |
| `--border` | `#e1e5df` | Hairlines |
| `--border-soft` | `#ecefe9` | Section seams and inner dividers |
| `--linkk-green` | `#97b63b` | Button fills, the active nav rule, 2px ticks |
| `--linkk-green-bright` | `#b3cd3d` | The logo mark exactly — hover |
| `--linkk-green-dark` | `#556b1f` | Green **text** on a light surface (5.25:1 on `--section-muted`) |
| `--linkk-green-soft` | `#eff4de` | Selection, pressed filter chip, form notice |
| `--legrand` | `#e30613` | Sampled from the supplied logo artwork |

The greens are sampled, not chosen: `#b3cd3d` is the logo mark in
`logo-LINKK.png` and `#839e34` is the live site's UI green.

**Green is an accent and nothing else** — buttons, the active nav underline,
small labels, a key numeral, a 2px tick under a heading. It is never a section
background, never a gradient and never a large fill.

Bands alternate white → grey down every page and the closing CTA takes the one
deeper grey, so a page ends on a step rather than on a slab. Two same-tone bands
in a row get a hairline; adjacent siblings only, so a band that follows a
different tone is not given a redundant rule.

| Page | Band sequence |
| --- | --- |
| Home | hero photograph → Introduction `#fff` → video grey → Why choose us (photograph) |
| About | banner → intro `#fff` → vision/mission grey → values `#fff` → people grey → facilities `#fff` → quality grey → chart `#fff` |
| Our Products | banner → sandwich `#fff` → NSPB grey |
| Sandwich | banner → about `#fff` → advantages grey → catalogue `#fff` |
| Component page | banner → product `#fff` → related grey |
| NSPB | banner → product `#fff` → key offer grey |
| R&D | banner → intro `#fff` → certificates grey → quality control `#fff` |
| Our Support | banner → statement and the three cards `#fff` |
| Our Projects | banner → reach `#fff` → the grid grey |
| Media | banner → films `#fff` → documents grey → channels `#fff` |
| Contact | banner → enquiry `#fff` → map `#eef1eb` → details `#fff` |
| Privacy | banner → policy `#fff` |

The footer is `#ffffff` on every page, with a `--border` top rule. The page
banners are photographs with a flat `rgba(16,19,22,.58)` scrim — measured, not
chosen: see **Motion and alignment**.

#### What was removed, and why

The previous sheet was a dark-and-gradient system. Each of these was defensible
on its own; together they are what made an ordinary manufacturer's site read as
a generated concept rather than a designed one.

| Removed | What it was |
| --- | --- |
| `.sec--dark` | Two full near-black bands — the Home journey and every page's closing CTA — each with a 3px green top rule, a three-stop vertical gradient and an inverted engineering grid over the top |
| `.sec--to-dark` / `.sec--from-dark` | Vertical ramps on the light bands either side of a dark one. With flat bands they have nothing to soften, and a partially-filled ramp on an otherwise flat page was itself the "missing background block" it looked like |
| `.why` overlay | A full-bleed factory photograph behind a near-black overlay held at .86–.94 alpha so white body copy could clear 4.5:1 on it. The photograph is now a photograph, in the layout, at its own brightness |
| Hero washes | A green radial across the top right, a three-stop diagonal gradient, a masked 78px engineering grid and a white radial "light pool" behind the product — four decorative layers under one headline and one photograph |
| Product stage washes | A soft dark radial behind every render on every page. They existed because the renders were white-background JPEGs multiplied into a tinted section; they carry real alpha now |
| Guide lines and ticks | Floating vertical datum lines and "measurement ticks" beside the renders — drawing annotations on pages that are not drawings |
| `.hero-scroll` | A SCROLL cue with a green line sweeping across it forever in the corner of the page |
| The dark footer | A near-black slab the closing CTA used to run into while the CTA was dark too. White now, separated from the CTA's grey by a rule. The `--dark-*` and `--on-dark-*` tokens were deleted rather than left declared and unused, so nothing can quietly start painting on a dark ground again |
| `.eyebrow .idx` | The running section number (`01`, `02`, …). Not on the live site, and numbering ordinary corporate bands is what made the page read as a systems diagram. Hidden, not deleted — the markup keeps the span |

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

### Geometry, and why there is no blend rule any more

The layout is industrial but not boxed: product renders have no container at
all. Three radii exist — `--r-btn: 6px` (buttons, chips, inputs), `--r-sm: 10px`
(thumbnails, menus), `--r-md: 14px` (large media panels, photographs) — and most
visuals never touch them. They were 5/7/10px, which left every surface reading as
a hard rectangle; nothing here is a pill and nothing is over 14px.

**The blend rule is retired.** Every product photograph in `assets/` was
originally a JPEG shot on white with no alpha channel, and the whole of the
previous system was built around `mix-blend-mode: multiply` making that white
margin take the section colour — which is what let the cards be deleted. It was
fragile in one specific way: anything between the image and the section
background that formed an isolated group killed the blend and the white
rectangle came straight back. `opacity` below 1, `isolation: isolate`, `filter`,
`backdrop-filter`, `will-change`, `contain: paint`, or `position` with a
non-`auto` `z-index` all did it, and four separate regressions came from that
list.

The renders in `assets/img/products/cut/` carry **real alpha** now, so none of
that applies: an image with a transparent background sits on any surface, inside
any stacking context, with any opacity, and stays correct. The constraint is
gone from the codebase and the rules that worked around it went with it — the
faint dark "lift" washes behind every render existed only because a near-white
wash would multiply back to near-white, and with real alpha there is nothing to
lift.

If a white-background JPEG is ever added back to a tinted band, cut it instead of
blending it.

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

## Product renders

The fifteen component shots were supplied as 600x600 JPEGs photographed on
white. LINKK now uses **trimmed PNG cut-outs with a real alpha channel**, in
`assets/img/products/cut/`. The original JPEGs stay where they are — the
MEGADUCT site at the repo root still uses them, and nothing there changed.

**Why cut-outs.** The white background used to be removed at render time with
`mix-blend-mode: multiply`, which only works once the file has decoded and
which several browsers drop while an ancestor is composited. That is what the
split-second white rectangle was. Baking the transparency into the file removes
the mechanism rather than the symptom: there is no longer any blend mode on any
product image, on any page.

**How they are made.** `scratchpad/cutout.mjs` decodes the PNG, flood-fills
inward **from the border** over near-white pixels, and keys only what that fill
reaches — so white and pale-grey parts *inside* a product (the silver plates on
a joint set, for one) are never touched. Edge pixels get proportional alpha
from their own whiteness and are un-multiplied, so the cut-out carries no pale
halo onto a dark band. The result is then trimmed to the content bounding box
plus a 2.5% margin and posterised to 5 bits per channel with ordered dithering,
which is invisible at these sizes and worth about 38% of the file.

Two sizes are written: the full trimmed size (~570px long side) for hero and
feature stages, and a `-sm` variant capped at 400px for the 287px component
grid. Fully warmed with a cold cache, `linkk/products.html` transfers 1205 KB
against 1055 KB for the untouched MEGADUCT products page.

**How large a render reads is now set in CSS, not by the file.** The supplied
JPEGs carried their own white margin, which was doing double duty as padding —
once it was trimmed away the products filled their boxes edge to edge and read
as much too big. The widths below put each one back at the size it was before
the trim, to within 1%, while the box still hugs the render so every rule meets
its edge. Change these if a product should read larger or smaller; do not put
the margin back into the image.

| Rule | Width | Render before trim | Now |
| --- | --- | --- | --- |
| `.comp-media img` | 88% | ~255px | 252px |
| `.fam-media` | 67% | 428px | 430px |
| `.pfeat-media` (and `.pfeat-cap`, which must match) | 68% | 351px | 353px |
| `.phero-stage img` | 82% | 467px | 465px |
| `.mg-stage` | 83% | 512px | 511px |

**Trimming is also what fixed the alignment.** A 600x600 image dropped into a
wide container with `object-fit: contain` paints as a square in the middle, so
every rule, guide and caption anchored to the container pointed at empty space.
Measured gap between the container edge and where the render actually painted:

| Stage | Before | After |
| --- | --- | --- |
| `.pfeat-media` (R&D) | 105px a side | **0** |
| `.mg-stage` (Home) | 153px | 37px |
| `.phero-stage` (inner pages) | 62-78px | **0** |
| `.fam-media` (Home) | 62-107px | **0** |

Three changes got there: the images carry no dead margin now; `.phero-stage img`
and `.fam-media img` dropped their imposed `aspect-ratio` so the box hugs the
render; and `.pfeat-media` takes `--plate-ar` from the markup, set per instance
to the ratio of the plate it holds — it needs a ratio because its plates are
`position:absolute` and cannot size the box themselves. `.mg-stage` keeps a
fixed 3/2 for the same reason and cannot go to zero: one box holds six plates
of different shapes.

**The caption baseline.** `.comp` is a `<button>`, and Chrome's UA rendering
centres a button's content in its box. As a stretched grid item, any cell whose
purpose line did not wrap sat half the leftover height lower than its
neighbours — two of the twelve product names were 12.8px off the row baseline.
Declaring the button an explicit column flex container overrides it. A smaller
bug sat underneath: `.comp-media` is a `<span>` and computed to `display:inline`,
so its `margin-bottom:12px` was dropped and the image sat on the text baseline,
where the descender varied with the column's sub-pixel width. It is
`display:block` now. All twelve captions land on one offset.

**Contact shadows are gone.** Six rules drew an elliptical shadow under a
render: `.hero-panel::after`, `.phero-stage::after`, `.fam-media::after`, and a
second gradient layer inside `.mg-plate::before`, `.pfeat-stage::before` and
`.comp-media::before`. `.phero-stage::after` was the one that survived the
first pass and kept a shadow under the product on every inner page. The faint
dark *wash* behind each render stays.

**Image warming.** `main.js` upgrades every remaining lazy image to eager once
the page has loaded and the browser is idle, four at a time, calling `decode()`
on each. Measured on `linkk/products.html` with a cold cache: 1 of 12 component
images complete at load, **12 of 12 complete 1.2s later without scrolling**.
Skipped when `navigator.connection` reports Save-Data or a 2G-class connection.

## Motion and alignment

**Photographic banners carry their own contrast.** Twelve banners range from a
near-black product shot to a white sky, so the title cannot rely on the
photograph. The scrim was set by measuring: at `rgba(16,19,22,.46)` the
brightest banner left white type on a 145-grey — 3.1:1, which clears the
large-text threshold and nothing else, and the breadcrumb above the title is
small text. At `.58` the worst banner on the site measures **4.56:1** and the
best 5.48:1. Same method for the Why-choose-us figures over the workforce
photograph: worst measured background 4.92:1.

The probe that did this (`scratchpad/px.mjs`) hides the text, screenshots the
element's box and scans every second pixel for the brightest one. Two things
about it are worth keeping:

- `Page.captureScreenshot` with `captureBeyondViewport` **drops negative
  `z-index` pseudo-elements**. The scrim vanished and every sample came back
  pure white. Scroll the element into view and take an ordinary viewport
  screenshot instead.
- Chrome returns the screenshot as RGB (colour type 2), not RGBA. A decoder
  that assumes 4 bytes per pixel reads pure red, green and blue and looks
  plausible enough to believe.

**`--linkk-green-dark` is for green text on a LIGHT surface.** The counters'
"+" suffix kept it when the band became a photograph and measured 2.7:1 — the
figures read as "150" with a smudge after them. On a dark ground the step is
`--linkk-green-bright`.

**`transform` replaces `translate`, it does not compose with it.** Both play
buttons were centred with the individual `translate: -50% -50%` property and
then scaled on hover with `transform: translate(-50%,-50%) scale(...)`. The two
are separate properties and both apply, so the hover shifted the button a
second time and it appeared to grow towards the top left. They now scale with
the individual `scale` property, which composes with `translate` and scales
about the centre. Measured centre drift on hover: **0.0px**.

**The scroll rails.** Home's engineering journey and the Products system flow
are one function, `scrollRail()`, so they cannot drift apart. Two things were
wrong:

- `.jrn-track` used `grid-auto-columns: minmax(210px,1fr)`. Six stages need
  1260px and the content column is 1224px at 1440, so the track overflowed by
  36px — the script read that as the mobile swipe rail and lit every stage at
  once. **The journey never animated on a desktop.** The minimum is 184px now,
  which fits down to the 1180 breakpoint, below which it is meant to scroll.
- Progress was measured from the *section*, so a tall one stretched the fill:
  it began as the section peeked in at the bottom of the window and finished
  only once the section was most of the way past. It is measured from the rail
  now, over a fixed 40% of a viewport height.

Measured at 1440x900, both rails identical:

| | Rail position |
| --- | --- |
| Section enters view | rail at 1051px (below the fold) |
| Fill starts | rail at 640px — 70% down the screen |
| Fill completes | rail at 280px — 30% down, section still fully in view |
| Section leaves view | rail at −380px |

**Alignment.** `.pfeat` and `.fam-row` are `align-items: start`, not `center` —
centring floated the render against a taller copy column so the heading and the
top of the product never met. Two deliberate offsets were also removed because
they read as mistakes rather than as composition: the alternating indent on
every second workflow stage (`.wf-step:nth-child(even) .wf-body`), which put
eight headings on two different left edges, and the downward nudge on the
second family row's copy.

**`order: -1` on an element that is already first does nothing.** Two
alternating layouts had never alternated, at any width, since they were
written:

| Rule | What it was meant to do | What it did |
| --- | --- | --- |
| `.fam-row:nth-child(even) .fam-media{order:-1}` | Mirror every second product-family row on Home | `.fam-media` is already the first child in the markup, so this asked it to move ahead of something it was already ahead of. Both rows rendered media-left |
| `.pfeat--right .pfeat-stage{order:-1}` | Put the render on the right in a `--right` feature block | Same defect. Every `--right` block on Our Products, R&D and Our Support rendered identically to a `--left` one |

Both are `order: 2` now, which pushes the media to the end of the row. If you
add a new mirrored layout, check the DOM order first — the modifier has to move
the element it is *not* already next to.

**The rail steps no longer dim.** A pending stage used to sit at `opacity: .42`,
which was legible against a near-black band and is not against a light one: at
.42 the body copy is 1.9:1 on the grey band, and the opacity that would clear
4.5:1 is .90 — a dim you cannot see. The step's state is carried entirely by its
dot and by the line filling between dots, so stages you have not reached yet are
simply readable.

**Hover states are states, not animations.** `.ind-row` and `.findex-row` each
ran three mechanics at once: the padding grew by 9px so the whole list below
shifted down, a pale green panel wiped in from the left over half a second, and
the numeral, the name and the reference list each slid right by a different
distance. Both now tint the band, show a green rule at the left edge and take
the green on the name — no reflow, no wipe, no sliding text. The product renders
that used to lift and scale under the cursor (`.hero-panel`, `.mg-plate`,
`.fam-media`) no longer move at all; they are photographs, not controls.

**Duplicated figures.** Home, About and Our Projects each carried a three-item
fact rail in the hero *and* a five-item stats band immediately beneath it,
repeating two or three of the same numbers at two different sizes within one
screen. The rails are gone; the band is the larger and more complete of the two.

**Other alignment fixes in the visual reset.** The About timeline's node sat on
the last digit of each year (`1992`, `2013`) because the year is right-aligned to
the rail and the 9px node is centred *on* it — the year column now has 16px of
right padding. `.mg-cap` was 9% narrower than `.mg-stage`, so the rule under the
MEGADUCT render stopped short of the image above it. `.mg-list` was pulled up to
64px left and 54px down so the section would "read as layered", which in practice
left a gap down the right edge and started the list where nothing else on the
page starts. The `.phero-rail` was a wrapping flex row, so three items on Our
Support and R&D did not fit one line and the third dropped to a row of its own;
it is an auto-fit grid now. Contact's hero was `align-items: center` with a
details list taller than the copy beside it, so the list started *above* the
breadcrumb — `.phero-grid--top` aligns that one page to the top.

## Image protection

Images on **both** sites cannot be dragged out of the page, and right-click is
suppressed over them. Two pieces:

- `assets/js/main.js` — one delegated `dragstart` listener and one
  `contextmenu` listener, both walking up from the event target to find an
  `<img>` or `<picture>`. Walking up is what catches a drag started on a
  `<figure>` or on a link wrapping an image.
- Both stylesheets — `-webkit-user-drag:none`, `user-select:none` and
  `-webkit-touch-callout:none` on `img, picture`. The CSS alone covers Chrome
  and Safari; the listener is what covers Firefox.

No `draggable="false"` attributes were added: there are 83 `<img>` tags across
19 pages, and the listener covers anything added later for free.

Right-click is blocked **over images only**. Suppressing it document-wide would
take Copy, Paste and the spell-checker away from the enquiry form.

This is a deterrent, not protection. The files are still served over HTTP and
stay reachable through view-source, devtools and the network tab, and the CSS
`background-image` on `.why` was never draggable in the first place. Anything
that genuinely must not be copied should not be published.

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

### Conflicts in the live site's own copy

Found when `linkk.com.my` was adopted as the source of truth. These are the
client's, not this project's, and all are **published as written**.

| Where | What |
| --- | --- |
| Home | "established in 2013" sits three paragraphs above "Since our beginning in 1992" and "With 30 years of track record" |
| Our Support | "have been established since **2010**" — a third founding year, against 2013 on Home and Contact and 1992 on About |
| Home | The Introduction says "completed 5,000 projects"; the Achievements pillar says "over 5000 projects"; the counter is set to 5,000 |
| Site-wide | **"Bus duct", "Busduct" and "busway"** are all used, sometimes in the same paragraph. Product and navigation names here follow the live site's two-word "Bus duct"; running prose keeps "busduct" |
| Our Support | Carries Consultio theme demo content: a "Natalia Duke (Chairman and founder)" testimonial and the phone number "540-325-1523". **Not copied** |
| Research & Development | Carries theme lorem: "Praesent feugiat sem mattis.", "A wonderful serenity.", "Premium services for you.", "Set a link back to photo." **Not copied** |
| Privacy Policy | Square-bracket placeholders survive in the published text — "Latest update: [September 2025]", "Publishing Director: [Linkk Busway Systems (M) Sdn Bhd]" — and a security-report link points at `linkk.com`, not `linkk.com.my`. Reproduced verbatim; all three need the client's attention |
| Contact | Three email addresses are published: `my-ber-sm-cs-linkk@legrand.com` (footer), `customerservice@linkk.com.my` and `marketing@linkk.com.my`. The Legrand address is used as primary here |

Two questions that earlier passes had flagged as unresolvable are now answered
by the live site and have been published: **temperature rise testing up to
5000A** ("Our current transformer generates up to 5000A", R&D page) and the
**NSPB ratings** (up to 6300A, 400V-38kV, 20-100kA symmetrical, 2300mm maximum
straight section).

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

Four photographs were taken from the company's own live site during the brand
realignment and are now in `assets/img/site/`, resized and recompressed:

| File | From | Used on |
| --- | --- | --- |
| `photo-factory.jpg` (1920x1279) | `MG_0001-1` | Home hero |
| `photo-team.jpg` (1920x1280) | `MG_0190-1` | Home, behind **Why choose us** |
| `photo-people.jpg` (1600x1067) | `MG_0300` | About, **Our people** |
| `photo-products.jpg` (1600x1067) | `Products-2` | NSPB sub-page hero |

`photo-people.jpg` replaced an empty slot that had been left deliberately blank,
because the only people image in the project (`about.jpg`, 300x351) was stock
photography of models in hard hats and could not be captioned "our people".

Still needed, in priority order:

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
5. **Factory floor** at Beranang, 2400px wide. The exterior is now covered by
   `photo-factory.jpg`; the shop floor is not.

No image on the site has a `srcset`, and none is served as WebP or AVIF. The
four photographs above are the heaviest assets in the build — `photo-team.jpg`
alone is 496 kB.

### LINKK brand assets

The supplied logo artwork is in use on all eight LINKK pages — see the **Logo**
section above. Still missing: the vector original (SVG/EPS), and official
Legrand group artwork for section 09, which currently draws the lockup as a red
square plus the wordmark in Barlow Condensed.

Product and sector imagery is still reused from MEGADUCT; the four photographs
listed under **LINKK photography** are the company's own.

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
