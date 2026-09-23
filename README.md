# Roti Home Made Kampung Sg Judah

The website for a community bakery in Kampung Sungai Judah, Pulau Carey — run
by seven bakers who learned at a baking class held at Balai Ilmu on
20 July 2026.

**Live site: https://oshez.github.io/sulam-bakery/**

A SULAM community project with the Centre for Continuing Education,
Sunway College.

---

## Looking at it

Open `index.html` in a browser. No install, no build step.

Four pages, in English and Bahasa Melayu:

| Page | What's on it |
|---|---|
| **Home / Utama** | The bakers, what makes the bread, both products, the story, how to order |
| **About / Tentang** | The village, the class, the equipment, photos, project credits |
| **Menu** | Both breads with photographs, prices, and the order builder |
| **Order / Pesan** | WhatsApp numbers, hours, delivery, payment, and your order summary |

Switch language with the **EN / BM** buttons in the top corner. The choice is
remembered in that browser.

## The order builder

On the Menu page, tap `+` on a bread. A bar appears at the bottom with the
running total. **Send order on WhatsApp** opens WhatsApp with the whole order
already written out, addressed to Encik Azmi.

---

## Changing things

**Everything you'd want to edit is in `assets/js/content.js`.** It is
commented throughout, and you do not need to touch the design files.

The site is bilingual, so most text looks like this:

```js
{ en: "Made fresh daily", ms: "Dibuat segar setiap hari" }
```

Edit both halves. To change which language the site opens in, edit the line
near the top:

```js
const DEFAULT_LANG = "en";   // or "ms"
```

### Publishing a change

```bash
git add -A && git commit -m "Update prices" && git push
```

The live site updates about a minute later.

---

## Still outstanding

- **Prices.** RM3.50 and RM3.00 come from the current poster, which marks them
  as promotional. Replace them when the updated price list arrives.
- **Student names.** `CREDITS` in `content.js` still holds a placeholder for
  the full class list.
- **Instagram and TikTok.** The accounts exist but the handles need confirming
  with G4 and G7. Set them in `CONTACT` and the buttons appear automatically.
- **Photographs.** The two product photos are cropped from the bakery's own
  poster. Better photographs of the bread, and any photographs of the baking
  itself, would improve the site a great deal.
- **A logo**, if one is wanted.

---

## Files

```
index.html               the page shell
assets/css/site.css      all the design
assets/js/content.js     <- the only file you need to edit
assets/js/app.js         page switching, language, order builder
assets/img/              photographs
make_qr.py               regenerates the QR code
build_single.py          bundles everything into one file
```

`python make_qr.py` writes `bakery-qr.png` for the live URL. Pass a different
URL as an argument if the site ever moves.

`python build_single.py` writes `dist/index.html` — one self-contained file
with the CSS, JavaScript and photographs embedded, which works with nothing
beside it.

---

## Design notes

Set in **Fraunces** for headings and **Archivo** for everything else. The
colours are sampled from the baking class banner — cream paper, olive gold,
cocoa brown, brick red.

The direction is a kampung print shop: paper rather than white, hairline rules
rather than floating cards, dot leaders running from each bread to its price,
and rubber-stamp badges. It avoids the usual website defaults — no gradients,
no glassy panels, no rows of identical icon cards.
