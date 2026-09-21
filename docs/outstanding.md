# Outstanding work and unresolved content

Split out of the README. Everything here needs a decision, a file or a
sign-off from the client before launch.

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
