# linkk.com.my — study of the live site

Surveyed 2026-09-21 against the live site. Covers the platform, every
interaction and animation, and the full product data.

## 1. Platform

| Layer | What is running |
| --- | --- |
| CMS | WordPress 7.1.1 |
| Theme | **Consultio** (ThemeForest) + `case-theme-core` companion plugin (all `ct_*` widgets) |
| Builder | Elementor 3.34.1 + **Elementor Pro** |
| Shop | WooCommerce 10.4.3 — catalogue mode, no prices, no cart |
| Hero | **Slider Revolution 6.5.2** |
| Forms | Contact Form 7 + **CF7 Multi-Step** (`cf7mls`) |
| Map | **Interactive Geo Maps 1.6.27** drawing through **amCharts 4.10.29** |
| Gallery filter | **Essential Addons for Elementor** — Filterable Gallery |
| Options | Redux 4.5.10 · Site Kit by Google · WP Smush lazy-load |

**JavaScript actually loaded:** jQuery + migrate, Bootstrap, SmartMenus
(dropdowns), Swiper, FlexSlider, Magnific Popup, PhotoSwipe + PhotoSwipe UI,
jquery.zoom, jquery-numerator + Waypoints (counters), progressbar, nice-select,
match-height, js.cookie, Underscore.

## 2. Global chrome

### Navigation

```
Home
About Us                    /about-3/
Our Products         ▼      /our-products/
   Sandwich Bus duct                /sandwich-busduct/
   Non-segregated Phase Product     /non-segregated-phase-product/
Research & Development      /research-development/
Our Support                 /our-support/
Our Projects                /our-projects/
Contact Us                  /contact-2/
Policy & Compliance  ▼      #   ← not clickable itself
   Privacy Policy                   /privacy-policy-2/
   Compliance                       /compliance/
```

- Elementor nav-menu, `e--pointer-underline e--animation-fade` — hovering a top
  level item **fades an underline in** beneath it.
- Submenu indicator is `fa-angle-down`; dropdown is **full-width stretch**.
- Mobile toggle is a **burger**; the dropdown panel is `aria-hidden` until opened.
- **The header does not stick.** No `elementor-sticky` anywhere.
- No back-to-top control, no search, no cart icon.

### Footer
Three columns — company blurb · **Links** · **Get In Touch**. Social: Facebook
(`LinkkBuswaySystemsMSdnBhd`) and LinkedIn (`company/linkk-busway-systems`).
Copyright line: `© 2021 Linkk Busway Systems (M) Sdn Bhd (1018052-D) | Powered
by Equato Solutions`.

## 3. Motion inventory

Everything that moves, and what drives it:

| Motion | Mechanism | Detail |
| --- | --- | --- |
| Hero slides | Slider Revolution | 3 slides, `fullwidth`, grid 1230×800, fade in/out (`o:0`), **arrows on**, **bullets on** (`hephaistos` style, hidden on mobile), progress bar **off**, does **not** pause on hover |
| Scroll entrances | WOW-style classes | `zoomIn` ×5, `flipInY` ×4, `fadeInUp` ×4, `bounceInLeft` ×3 |
| Counters | jquery-numerator + Waypoints | fire once on scroll into view, **2000 ms**, comma delimiter |
| Nav hover | Elementor | underline, fade |
| Product image hover | jquery.zoom | magnifier follows cursor |
| Product image click | PhotoSwipe | full-screen, pinch/swipe, zoom |
| Product thumbnails | FlexSlider | thumbnail carousel under the main image |
| Galleries | Magnific Popup | lightbox on About / R&D photo grids |
| Project filter | EAE Filterable Gallery | isotope-style re-layout on filter click |
| World map | amCharts via Interactive Geo Maps | hoverable country markers |

> **Live bug worth knowing:** every `data-wow-delay` on the site is the literal
> string `"ms"` with no number (66 occurrences) — the delays are invalid, so
> staggering never happens and all animations in a group fire together.

## 4. Home page

1. **Hero** — 3 slides:
   | # | Headline | Sub | Background |
   | - | --- | --- | --- |
   | 1 | Leading Bus duct System Designer | We provide customised solutions for your Power Distribution needs. | `F1-Building.jpg` |
   | 2 | Customise Your Bus duct Systems | We design systems that fits your specific needs. | `Products-2-scaled.jpg` |
   | 3 | Our People, Our Strength | Our teams are committed to excellence and growth. | `About-Us-1-JPG-1.jpg` |
2. **Introduction**
3. **Company introduction video** — YouTube `X2GiccZ9oBA`
4. **Four pillars** (`ct_feature`, layout 4): Customised Solution · Facility ·
   Achievements · Reliability & Recognition
5. **Why choose us** — four counters over the workforce photograph:

   | Counts to | Label |
   | --- | --- |
   | 150+ | Team Members |
   | 20+ | Awards |
   | 5,000+ | Completed Works |
   | 100+ | Client's Feedback |

   *(The "Completed Works" tile ships a server-rendered start value of `4000`
   while animating to `5000` — an authoring slip on the live site. The other
   three start at `1`.)*

## 5. Products

### Structure
`Our Products` splits into two families:
- **Sandwich Bus duct** → 19 components
- **Non-segregated Phase Bus duct** → one explanatory page, no components

### The 19 components

| Product | Page slug | Gallery images |
| --- | --- | --- |
| Feeder | `feeder` | 3 |
| Feeder c/w Plug-in | `plug-in-feeder-assembly` | 7 |
| Feeder with Hanger Rod Support | `feeder-with-hanger-rod-support` | 3 |
| Edgewise Elbow | `edgewise-elbow` | 3 |
| Edgewise Offset Elbow | `edgewise-offset` | 3 |
| Edgewise Tee Elbow | `edgewise-tee` | 2 |
| Flatwise Elbow | `flatwise-elbow` | 3 |
| Flatwise Offset Elbow | `flatwise-offset` | 3 |
| Flatwise Tee Elbow | `flatwise-tee` | 3 |
| Combination Elbow | `combination-elbow` | 2 |
| Reducer | `reducer` | 3 |
| Expansion Unit | `expansion-unit` | 6 |
| Phase Transposition Unit | `phase-transportation` | 3 |
| Tap-Off Unit (TOU) | `tou` | 3 |
| End Feed Cable Box | `end-feed-box` | 3 |
| End Cover | `end-cover` | 2 |
| Flange End | `fe-r1` | 3 |
| Vertical Spring Hanger | `vsh-r1` | 2 |
| Fixed Support | `fixed-support` | 3 |

### What a product page actually contains
Breadcrumb (`Home / Sandwich Busduct / <name>`) · title · gallery (zoom +
PhotoSwipe + FlexSlider thumbs) · category links · Related Products.

**No SKU. No price. No add-to-cart. No attributes. Every description tab is
empty on all 19.** The pages are photographs and a name — nothing more.
Related products are picked **at random by WooCommerce** on each load.

### Category data is inconsistent
Sub-categories are `edgewise` and `flatwise`, but the tagging does not hold up:

- In **both** sub-categories at once: `edgewise-tee`, `flatwise-offset`
- Tagged **edgewise** though orientation-neutral: `reducer`, `end-cover`,
  `fixed-support`, `phase-transportation`, `fe-r1`, `end-feed-box`,
  `feeder-with-hanger-rod-support`
- Tagged **flatwise**: `feeder`, `plug-in-feeder-assembly`
- No sub-category: `combination-elbow`, `expansion-unit`, `tou`, `vsh-r1`

Worth raising with the client before any of it is mirrored.

## 6. Our Projects

- Statement: **"We supply to over 50 countries globally."**
- **amCharts** world map with project markers.
- **45 projects** in a filterable photo grid, with **12 sector filters + All**:
  Public Transportation · Hospital & Assembly Lines · Public Centre &
  Information Technology · Commercial complex · Hotels · Factories ·
  Residential · Office Tower · High Rise Buildings · Mix Development ·
  Data Centre · Others
- Named examples: Male International Airport (Maldives) · Lantau Hospital (HK) ·
  High Speed Rail Station Zuoying (Taiwan) · Brisbane BAC Terminal (Australia) ·
  Singpost Logistics Hub (Singapore) · Belfast City Hospital (N. Ireland) ·
  Selayang Hospital · Proton Factory Shah Alam · Bhumibol Adulyadej Hospital
  (Thailand) · Perodua Assembly Plant · Galtronics (Vietnam) · Changi Prison.
- Four are also full **portfolio case-study pages**: Zuoying, Brisbane, Male,
  Lantau.

## 7. Other pages

- **About Us** — "We are a leading bus duct trunking systems manufacturer." ·
  Our Vision · Our Mission · Our Core Value (Teamwork, Leadership, Passion,
  Health and Safety, +1) · Our People gallery · Our Facilities gallery ·
  Quality Policy · Organisation chart. 72 images, 3 Elementor galleries.
- **Research & Development** — R&D intro · **Our Certificates** (a single
  combined logo strip, `certs-logo-new.jpg` — *no individual certificate PDFs
  are published anywhere on the live site*) · Our Quality Control.
- **Our Support** — Technical Support · Delivery Support · Site Support
  (3 × `ct_fancy_box`).
- **Compliance** — *(absent from our rebuild)*. States the company was
  **established in 2013** and **owns the marketing and manufacturing rights of
  MEGADUCT**; describes low, medium and high voltage busway solutions.
- **Contact Us** — "Get your FREE consultation with our experts." Google Maps
  embed. Address / Tel +603 8727 6080 / Fax +603 8727 8081 /
  customerservice@ and marketing@linkk.com.my.

### The contact form
Single step despite the multi-step plugin being loaded. Five fields, **all
required**:

| Field | Type | Placeholder |
| --- | --- | --- |
| `your-subject` | select | Subject / Enquiry / Others |
| `your-name` | text | Your name* |
| `your-email` | email | Your mail* |
| `your-phone` | text | Phone* |
| `your-message` | **text input, not a textarea** | Message* |

Submit is a `<button>` with a check-circle icon, full width.

## 8. Notes for the rebuild

1. `/compliance/` exists live and is **missing from our LINKK build**, and the
   menu's Privacy Policy points at `/privacy-policy-2/`, not `/privacy-policy/`.
2. "Established 2013" (company) versus MEGADUCT "since 1992" (brand) — both are
   the client's own wording and are not in conflict, but the pages should not
   be allowed to contradict each other.
3. The message field being a single-line `text` input is a genuine usability
   fault on the live site; our rebuild already uses a textarea.
4. Related products being random means there is no stable "next part" path
   through the range.
