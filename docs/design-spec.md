# Boneshakers Website — Design Spec

Source of truth for the site's design. Mirrors the shared doc
(https://claude.ai/artifact/4MiwVUGMbNNmZeFQizv277) as of 2026-10-22; if the two
disagree, update this file and say so in the commit. Implementation notes at the
end record decisions made while building.

## Overview

The new site is a fun, character-led front door for Boneshakers. It should feel
like the studio's merch and art rather than a generic tattoo-studio template.
One skull, a small menu, and a mascot who keeps turning up as you browse.

**Goals**

- Make the brand memorable in the first five seconds with an animated skull intro.
- Get visitors to the right place fast: an artist, tattoo booking, piercings, or the shop.
- Stay simple. Each screen has one focal point, a limited palette and a short menu.
- Leave room for booking, piercing booking and the shop, which don't exist yet.

**What changes from the previous build.** The old site was a single long
scrolling page with a gold accent (#d4a84b), Bebas Neue and Space Mono. This spec
moves to separate pages for each menu item and to the studio's own navy, grey and
slate colours. Monochrome line-art characters do most of the visual work. The
password gate and the consent form stay as they are.

## Brand and visual direction

The look is bold black-and-white illustration on a calm, flat background, with
one thing to look at per screen. It should be playful and a bit irreverent,
tattoo-adjacent without shouting "tattoo studio".

| Reference | What we take from it | How it shows up |
| --- | --- | --- |
| "Explore the Space" landing page | A simple menu, an interactive layout and a slow-moving background | Small text menu top right; illustrations drift or react to the cursor |
| Lightning-eyes portrait | A single focal point on a dark textured ground; fun rather than aggressive | Every page has one hero illustration centred on a grainy dark background |
| Skull logo | The mark already used on most products | Home page centrepiece, favicon, loader and footer |
| Punk skeleton guitarist | The studio character; possibly several versions doing odd things | Turns up on inner pages and reacts to the visitor (see Characters) |

**Principles**

1. **One focal point per screen.** If two things compete, cut one.
2. **Limited palette.** Black, off-white and the three studio colours. No gradients or extra accent colours.
3. **Illustration over photography** for the frame of the site. Photos are kept for artist portfolios and piercing jewellery.
4. **Movement with a purpose.** Slow, looping, and reactive to the visitor. Nothing flashes or autoplays sound.
5. **Lots of space.** Short copy, generous margins, a small menu.

## Colour palette

The palette is the studio's own: the two business-card colours and the wall
colour, plus black and off-white for the line art. The hex values below are
estimated from the moodboard swatches, so check them against the print files
before launch.

| Token | Name | Hex (approx.) | Source | Use |
| --- | --- | --- | --- | --- |
| `--ink` | Ink black | #0A0A0A | Line art | Illustration lines, body text on light panels |
| `--bone` | Bone white | #F2EFE8 | Line art fill | Illustration fills, text on dark backgrounds |
| `--navy` | Studio navy | #03032B | Business cards and studio | Main page background |
| `--sage` | Studio grey | #74766B | Business cards and studio | Secondary text, dividers, hover states, muted panels |
| `--slate` | Wall slate | #43546C | Studio walls | Accent: active menu item, links, buttons, focus rings |

**Rules**

- Navy is the default background, with a light film-grain texture at 3–5% opacity, as in the lightning-eyes reference.
- Slate is the only colour for interactive things (buttons, active menu item, links). Use it as a fill or underline with bone text on top, never as text on navy (about 2.5:1 contrast).
- Slate and grey also appear as colour fields, echoing the moodboard swatches: overlapping flat circles behind each page's focal illustration, one slate panel per page, and palette-coloured card shadows, tags and doodles. *(Added 2026-10-22 at the studio's request for more of their palette.)*
- Bone white text on navy is the main pairing. Grey text on navy is only for small labels and must pass WCAG AA at its size.
- The illustrations stay black and white. Any colour comes from the background behind them.

## Typography and illustration style

The type stays quiet so the illustrations carry the personality. Use a chunky
display face for the few big words and a typewriter-style mono for everything
else. The mono echoes the moodboard's own lettering.

| Role | Font | Size (desktop / mobile) | Notes |
| --- | --- | --- | --- |
| Display | Bebas Neue (already loaded) or a heavier outlined face like the "Explore the Space" title | 96 / 56 px | Page titles only, uppercase, one per page |
| Heading | Bebas Neue | 40 / 28 px | Section headings |
| Menu | Bebas Neue, uppercase | 22–30 px (scales with width), 0.06em tracking | Top-right menu and wordmark. Enlarged from 12 px mono on 2026-10-22 so the menu is a feature |
| Body | Space Mono | 15 / 14 px, 1.7 line height | Max 65 characters per line |
| Label | Space Mono | 11 px | Prices, captions, form labels |

**Illustration style**

- Bold black outlines of an even weight, with flat white or bone fills. No shading beyond solid black areas.
- Rubber-hose, cartoon-skeleton proportions to match the guitarist: big heads, bendy limbs, chunky shoes.
- Every illustration is supplied as layered SVG so its parts (jaw, eyes, arms, guitar) can be animated on their own.
- Each illustration sits on a bone-white sticker shape with a black outline when placed on navy, so the black lines don't disappear into the background.

## Characters and logo

The skull is the logo and the punk skeleton is the mascot. The logo stays still
and dependable; the mascot moves around and misbehaves.

**Skull logo**

- The studio's own skull (three-quarter view, from the moodboard) is the logo. Hand-drawn front-facing skulls can appear as extra artwork (doodles, the mascot's head, small moments like the enquiry confirmation) but never replace it.
- Appears on the home page (large and centred), in the loader, as the favicon, and in the footer.
- Idle behaviour on the home page: the eyes follow the cursor (or tilt with the phone on mobile), with a slow blink every 6–10 seconds.
- Clicking the skull plays a short rattle or jaw-chatter, then it settles.

**Punk skeleton ("the mascot")**

There's one character with several poses. Each page gets its own version doing
something related to that page:

| Page | Mascot pose | Interaction |
| --- | --- | --- |
| The Team | Posing for a photo with a camera flash | Flash fires when you hover an artist |
| About Us | Leaning on the studio door, arms crossed | Nods when scrolled into view |
| Tattoos | Holding a tattoo machine, mid-buzz | Buzz wobble on hover over "Book" |
| Piercings | Wincing with a ring through the nose | Flinches when a price is hovered |
| Shop | Wearing studio merch, guitar on back | Waves when an item is added to the basket |
| 404 page | Lost, holding a map upside down | Turns the map over on click |

The table is a starting brief for whoever draws the poses, not a final list.
Easter eggs (for example, the guitarist doing a solo after 30 seconds idle) are
welcome but optional.

## Opening sequence and home page

The home page is the skull and nothing else, apart from a small menu in the top
right. The opening animation gets the skull there in under 3 seconds.

**Opening sequence (first visit only)**

1. 0–0.4 s: a navy screen with the grain texture fading in.
2. 0.4–1.8 s: the skull rolls in from off-screen left like a bowling ball, rotating, and bounces once.
3. 1.8–2.4 s: it rights itself with a wobble, jaw chattering.
4. 2.4–2.8 s: the menu fades in top right and the eyes start following the cursor.

**Rules**

- Skippable with a click or any key. It plays once per session (stored in session storage), so later visits to the home page show the finished state.
- If the visitor has asked for reduced motion, skip the roll and fade the skull in over 300 ms.
- No sound.

**Home page layout**

- Skull centred, about 40% of the viewport height.
- Menu top right: THE TEAM · ABOUT · TATTOOS · PIERCINGS · SHOP, in the display face (see Typography). It gets a navy backing with a slate rule once the page scrolls.
- Wordmark "BONESHAKERS" small and top left, or as a single line under the skull. Pick one during design.
- Background: navy, grain, and an optional slow drifting layer of small doodles (stars, lightning bolts, daggers) at low opacity, like the moving background in the space reference.
- Footer line at the bottom edge: address, Instagram, opening hours, all in 11 px grey.
- On mobile, the menu becomes a single "MENU" label top right that opens a full-screen list. The skull stays centred.

## Navigation and site map

The menu has five items, always in this order: The Team, About, Tattoos,
Piercings, Shop. The skull or wordmark always links back home.

```
                        Home (skull + menu, intro on first visit)
                                         |
     +-------------+-------------+-------+-------+-------------+
     |             |             |               |             |
 The Team       About Us      Tattoos        Piercings ----> Shop
 artist cards   story         how booking    price list     merch teaser
 page/artist    photos        works, deposit jewellery      coming soon
 socials        map, hours    consent form   aftercare      Instagram
     |                           |               |             |
     +------- Book ------------- + ---- Book ----+           later
                                 |                             |
              Enquiry form (exists today; every Book button)   Online store*
                                 |
                            replaced by
                                 |
              Online tattoo and piercing booking*

 * not built yet, added after launch
```

The Piercings jewellery upgrades link across to the Shop. The password page and
consent form sit outside the menu and work as they do today.

## Page specs

Every inner page shares one template: the menu top right, a big display title,
the page's mascot pose as the focal point, then the content in a single column.

**The Team** (`/team`, then `/team/[artist]`)

- Index: one card per artist with a black-and-white portrait or illustrated avatar, their name and their style tags (for example "Blackwork", "Neo-trad"). The card lifts and the mascot's camera flashes on hover.
- Artist page: a short bio, their specialities, a portfolio grid (photos open full-screen in a lightbox), links to Instagram and TikTok, and a "Book with [name]" button.

**About Us** (`/about`)

- The studio's story and history, values, photos of the studio (where the slate walls show), and a map with the address and opening hours.
- Reuses the previous About and FAQ content as a starting point.

**Tattoos** (`/tattoos`)

- How booking works: consultation, deposit, aftercare, and a link to the consent form.
- A "Book a tattoo" button. Until online booking exists, it links to the enquiry form, or to the artist's Instagram DMs if the studio prefers.
- Aftercare guidance and FAQs.

**Piercings** (`/piercings`)

- A piercing price list as a simple two-column table (piercing, price including basic jewellery).
- Jewellery upgrades that link through to the matching Shop category.
- Aftercare guidance and age and ID policy.
- A "Book a piercing" button that goes to an enquiry form for now, and to the booking form later.

**Shop** (`/shop`)

- For now, a teaser page: a merch preview, "coming soon" and an Instagram link.
- Later, product grids for merch and jewellery, product pages and a basket (see Out of scope).

**Shared pieces**: the menu, the footer, an enquiry form (exists already), the
consent form (exists already, unchanged), and a 404 page.

## Interaction and motion

The motion should feel hand-drawn and a bit wobbly, never slick. It responds to
the visitor rather than running for its own sake.

| Element | Behaviour | Timing |
| --- | --- | --- |
| Background doodles | Drift slowly with a slight parallax against the cursor or scroll | 40–60 s loop |
| Skull eyes | Follow the cursor; blink | Blink every 6–10 s |
| Mascot | An idle loop (bob, tap foot) plus the page's reaction (see Characters) | Idle loop 2–4 s |
| Menu items | The letters jitter by 1–2 px on hover; the active item sits on a slate underline | 150 ms |
| Page transitions | The skull rolls across the screen as a wipe between pages | 500 ms |
| Content | Fades up by 16 px as it scrolls into view | 400 ms, eased |
| Buttons | A slight sticker-peel tilt on hover and a press-down on click | 120 ms |

**Rules**

- If the visitor has asked for reduced motion, turn off parallax, drifting, the rolling wipe and idle loops. Hover feedback becomes a colour change only.
- Animate with CSS transforms and opacity only, and keep every page usable before the animation code loads.
- Hand-drawn wobble can be added with a stepped "boil" (2–3 frames of slightly different line work at 8 fps) on the mascot and skull.

## Out of scope for launch

Three features on the moodboard don't exist yet. The launch site has a
placeholder for each so they can be added later without a redesign.

| Feature | Launch placeholder | Later | Depends on |
| --- | --- | --- | --- |
| Online tattoo booking | "Book" goes to the enquiry form or the artist's Instagram | An embedded booking tool or a custom deposit flow | Choosing a booking provider; deposit policy |
| Piercing booking form | Enquiry form with a piercing picker | A booking form with time slots | The same booking provider |
| Online shop | Teaser page | A merch and jewellery store with a basket and checkout | Choosing a platform (for example Shopify Lite or Stripe), stock and shipping |

## Open questions for the studio

- [ ] Exact brand colours: do the business-card print files have hex or Pantone values?
- [ ] Who draws the mascot poses and the skull animation parts, and will they deliver layered SVG?
- [ ] Which artists go on The Team, and do we have bios, portraits and portfolio photos for each?
- [ ] Should "Book" go to the enquiry form or to Instagram DMs until booking exists?
- [ ] Piercing price list and aftercare text.
- [ ] Display font: keep Bebas Neue or licence a chunkier face?
- [ ] Should the password gate stay up until launch?

## Implementation notes

Decisions made while building to this spec. Keep these in step with the code.

- **Tokens** live in `assets/css/studio.css` (`--ink`, `--bone`, `--navy`, `--sage`, `--slate`).
  The studio grey fails AA as small text on navy (about 4.3:1), so text uses
  `--sage-text` (#8D8F83, about 5.8:1); `--sage` itself is for rules and panels.
- **Focus rings** are bone with a slate halo, because slate alone is under the
  3:1 non-text contrast minimum on navy.
- **Wordmark**: top left on every page with the skull mark beside it (the "pick one" choice above). The desktop menu collapses to MENU below 920 px.
- **Skull logo**: `components/SkullLogo.vue` renders the studio's skull, traced
  from the moodboard into `assets/art/skull-logo.ts` (silhouette, ink and eye
  layers). The eyes glance and blink; the jaw hinges open below the mouth line.
  `public/skull-logo.svg` (also the favicon) is the static version used in the
  footer and page wipe. Swap the paths for the original vector file when we get it.
- **Extra skulls and mascot**: `components/SkullDoodle.vue` (front-facing skull)
  and `components/MascotSkeleton.vue` are hand-drawn stand-ins in the moodboard's
  style, built in layers so the artist's final SVGs can replace them.
- **Palette fields**: `.swatches` (circles behind the focal illustration) and
  `.panel` (slate section; re-tunes muted text for contrast) in `studio.css`.
- **Content** (artists, prices, hours, FAQs) lives in `utils/studio.ts`. Values
  carried over from the previous build are placeholders: the address, phone
  number and social links still need real values, and empty social links are
  hidden rather than linked to `#`.
- **Enquiry form** is `/enquire`. Book buttons pass `?service=` (and `?artist=`),
  and piercing enquiries get a piercing picker. Both extra fields are emailed.
- **Shop mascot** waves when a merch preview tile is hovered, until a basket exists.
- **Legacy pages**: `/password` and `/consent` keep the old gold styles from
  `assets/css/main.css` and render without the studio layout.
