# [BAKERY NAME] — Kampung Sungai Judah

A storefront website for the community bakery that came out of the **Ekonomi
Rumah Tangga (ERT) Baking Class**, held at Balai Ilmu, Kampung Sungai Judah on
20 July 2026.

This is a **draft for team review**. Most of the wording is real, but the
bakery name, the menu, the prices and the contact details are placeholders.

---

## Look at it

Open `index.html` in a browser. That's it — no install, no build step.

Four pages, all reachable from the top navigation:

| Page | What's on it |
|---|---|
| **Utama** (Home) | Hero, three short blocks, a few featured items, origin story, order call-to-action |
| **Tentang** (About) | The ERT story, the numbers, the equipment, photo gallery |
| **Katalog** (Catalogue) | The price board — 12 items across 3 sections, with the order builder |
| **Hubungi** (Contact) | WhatsApp, socials, address, opening hours, order summary |

---

## Things to look at when you review it

- **The bakery has no name yet.** It says `[BAKERY NAME]` everywhere. Deciding
  this is probably the first thing the team needs to agree on.
- **The menu is invented.** Twelve realistic Malaysian items with made-up
  prices, so the price board looks like a real menu instead of twelve blanks.
  None of it is real. See "Switching to blanks" below.
- **The contact details are fake.** The WhatsApp number is `+60 12-345 6789`.
  The order button works, it just messages a number that doesn't exist.
- **There are only two real photos from the baking class** — the group shot
  outside Balai Ilmu, and the banner. Nobody photographed the bread, the dough,
  the ovens, or anyone baking. **If we can get product photos, the site gets a
  lot better.** That's the biggest gap.

## Try the order builder

1. Go to **Katalog**
2. Tap the `+` next to a few items
3. A bar appears at the bottom with the running total
4. **Semak pesanan** shows the full order on the Contact page
5. **Hantar via WhatsApp** opens WhatsApp with the order already written out

The order survives moving between pages. It clears when you close the tab.

---

## Changing things

**Everything you'd want to edit is in one file: `assets/js/content.js`**

The bakery name, tagline, WhatsApp number, socials, address, opening hours,
every product, every price, all the page wording, the partner credits. It's
commented throughout. You don't need to touch the design files.

### Switching to blanks

Near the top of `content.js`:

```js
const USE_SAMPLE_DATA = true;   // change to false
```

`true` shows the realistic sample menu. `false` shows `[Item Name 01]` style
placeholders instead — use that once you're filling in the real items.

### Replacing a photo

Drop your image into `assets/img/`, then point at it in `content.js`
(look for `ABOUT.photos`). Keep them under about 400 KB each.

---

## Files

```
index.html               the page shell
assets/css/site.css      all the design
assets/js/content.js     <- the only file you need to edit
assets/js/app.js         page switching + the order builder
assets/img/              photos
build_single.py          bundles it all into one file (see below)
dist/                    the bundled output
```

## Rebuilding the shareable link

If you change anything and want to refresh the hosted version:

```bash
python build_single.py
```

That writes `dist/index.html` — one self-contained file with the CSS, the
JavaScript and the photos all embedded. You can e-mail it or put it on a USB
stick and it will work with nothing next to it.

---

## Design notes

Set in **Fraunces** (headlines) and **Archivo** (everything else). Colours are
sampled from the actual ERT banner in the project photos — cream paper, olive
gold, cocoa brown, brick red.

The direction is a **kampung print shop**: paper rather than white, hairline
rules rather than floating cards, a price list set like a hand-painted shop
signboard with dot leaders running to the price, and rubber-stamp badges. It
deliberately avoids the current website defaults — no gradients, no glassy
panels, no rows of identical icon cards.

## Credit

Built for a SULAM community project — Kampung Sungai Judah x Centre for
Continuing Education, Sunway College Kuala Lumpur. Supports SDG 1, 8 and 12.
