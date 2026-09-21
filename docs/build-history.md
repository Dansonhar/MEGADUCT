# Build history — how the LINKK site reached its current form

Split out of the README. This is the record of the four passes that rebuilt
LINKK against the live site. Nothing here is needed to run or deploy the
project — see the README for that.

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

