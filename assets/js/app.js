/* ==========================================================================
   app.js — rendering, routing and the WhatsApp order builder.

   You should not need to edit this file.
   All wording, prices and contact details live in content.js
   ========================================================================== */

(function () {
  "use strict";

  /* ---------------------------------------------------------------- utils */

  var MENU = (typeof USE_SAMPLE_DATA !== "undefined" && USE_SAMPLE_DATA)
    ? MENU_SAMPLE
    : MENU_BLANK;

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function money(n) { return Number(n || 0).toFixed(2); }

  /* Turn "a\n\nb" into two <p> blocks. */
  function paras(text) {
    return String(text || "").split(/\n{2,}/)
      .map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
  }

  function id(si, ii) { return si + "-" + ii; }

  function itemAt(key) {
    var p = String(key).split("-");
    var sec = MENU[+p[0]];
    return sec ? sec.items[+p[1]] : null;
  }

  /* ----------------------------------------------------------------- cart */

  var CART_KEY = "sjb-cart";
  var cart = {};

  try {
    var raw = sessionStorage.getItem(CART_KEY);
    if (raw) cart = JSON.parse(raw) || {};
  } catch (e) { cart = {}; }

  function saveCart() {
    try { sessionStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {}
  }

  function cartLines() {
    var out = [];
    Object.keys(cart).forEach(function (k) {
      var qty = cart[k], it = itemAt(k);
      if (!it || qty < 1) return;
      out.push({ key: k, name: it.name, qty: qty, price: it.price, amount: it.price * qty });
    });
    return out;
  }

  function cartCount() {
    return cartLines().reduce(function (a, l) { return a + l.qty; }, 0);
  }

  function cartTotal() {
    return cartLines().reduce(function (a, l) { return a + l.amount; }, 0);
  }

  function setQty(key, qty) {
    qty = Math.max(0, Math.min(99, qty));
    if (qty === 0) delete cart[key]; else cart[key] = qty;
    saveCart();
    syncRow(key);
    syncTray();
    syncSummary();
  }

  function clearCart() {
    var keys = Object.keys(cart);
    cart = {};
    saveCart();
    keys.forEach(syncRow);
    syncTray();
    syncSummary();
  }

  /* --------------------------------------------------- whatsapp order link */

  function waHref() {
    var lines = cartLines();
    var msg;

    if (!lines.length) {
      msg = "Salam! Saya nak tanya pasal produk bakeri.";
    } else {
      msg = "Salam! Saya nak tempah:\n\n";
      lines.forEach(function (l) {
        msg += "• " + l.qty + " x " + l.name + " — RM " + money(l.amount) + "\n";
      });
      msg += "\nJumlah: RM " + money(cartTotal()) + "\n\n";
      msg += "Nama saya: \nMasa nak ambil: ";
    }

    return "https://wa.me/" + encodeURIComponent(CONTACT.whatsappNumber) +
           "?text=" + encodeURIComponent(msg);
  }

  /* -------------------------------------------------------- shared pieces */

  function priceCell(it) {
    var unit = it.unit ? '<span class="row__unit">' + esc(it.unit) + "</span>" : "";
    return '<div><span class="row__price"><span class="cur">RM</span>' +
           money(it.price) + "</span>" + unit + "</div>";
  }

  function rowHTML(it, key, withQty) {
    var qty = cart[key] || 0;
    var stepper = "";

    if (withQty) {
      stepper =
        '<div class="qty" data-empty="' + (qty === 0) + '">' +
          '<button type="button" data-act="dec" data-key="' + key + '" ' +
            'aria-label="Kurangkan ' + esc(it.name) + '">&minus;</button>' +
          '<span class="qty__n" data-qty="' + key + '">' + qty + "</span>" +
          '<button type="button" data-act="inc" data-key="' + key + '" ' +
            'aria-label="Tambah ' + esc(it.name) + '">+</button>' +
        "</div>";
    }

    return '<div class="row" data-row="' + key + '" data-active="' + (qty > 0) + '">' +
      '<div class="row__line">' +
        '<span class="row__name">' + esc(it.name) + "</span>" +
        '<span class="row__leader"></span>' +
      "</div>" +
      priceCell(it) +
      '<p class="row__desc">' + esc(it.desc) + "</p>" +
      stepper +
    "</div>";
  }

  function plateHTML(photo, stamp) {
    return '<figure class="plate">' +
      (stamp ? '<span class="stamp plate__stamp">' + esc(stamp) + "</span>" : "") +
      '<div class="plate__frame">' +
        '<img src="' + esc(photo.src) + '" alt="' + esc(photo.caption) + '" loading="lazy">' +
      "</div>" +
      '<figcaption class="plate__caption">' + esc(photo.caption) + "</figcaption>" +
    "</figure>";
  }

  function partnersHTML() {
    return '<section class="band band--tight band--ruled">' +
      '<div class="wrap">' +
        '<p class="partners__intro">' + esc(PARTNERS.intro) + "</p>" +
        '<div class="partners__marks">' +
          PARTNERS.marks.map(function (m) {
            return '<div class="mark">' +
              '<span class="mark__name">' + esc(m.name) + "</span>" +
              '<span class="mark__sub">' + esc(m.sub) + "</span>" +
            "</div>";
          }).join("") +
        "</div>" +
        '<div class="sdgs">' +
          PARTNERS.sdgs.map(function (s) {
            return '<div class="sdg">' +
              '<span class="sdg__no" style="background:' + esc(s.color) + '">' + esc(s.no) + "</span>" +
              '<span class="sdg__label">' + esc(s.label) + "</span>" +
            "</div>";
          }).join("") +
        "</div>" +
        '<p class="sdgs__note">' + esc(PARTNERS.sdgNote) + "</p>" +
      "</div>" +
    "</section>";
  }

  /* ------------------------------------------------------------ home view */

  function viewHome() {
    var featured = MENU.map(function (sec, si) {
      return { it: sec.items[0], key: id(si, 0) };
    }).filter(function (f) { return f.it; });

    return '' +
    '<section class="hero"><div class="wrap"><div class="hero__grid">' +
      "<div>" +
        '<p class="kicker">' + esc(HOME.heroKicker) + "</p>" +
        '<h1 class="hero__title">' + esc(HOME.heroTitle) + "</h1>" +
        '<p class="hero__body">' + esc(HOME.heroBody) + "</p>" +
        '<div class="hero__actions">' +
          '<a class="btn" href="#/catalogue">' + esc(HOME.heroCtaText) +
            ' <span class="arrow" aria-hidden="true">&rarr;</span></a>' +
          '<a class="btn btn--ghost" href="#/about">Kisah kami</a>' +
        "</div>" +
      "</div>" +
      plateHTML({ src: ABOUT.photos[0].src, caption: HOME.heroCaption }, "Sejak " + BRAND.since) +
    "</div></div></section>" +

    '<section class="band band--tight"><div class="wrap"><div class="pillars">' +
      HOME.pillars.map(function (p) {
        return '<article class="pillar">' +
          '<span class="pillar__no">' + esc(p.no) + "</span>" +
          "<h3>" + esc(p.title) + "</h3>" +
          "<p>" + esc(p.body) + "</p>" +
        "</article>";
      }).join("") +
    "</div></div></section>" +

    '<section class="band band--tight"><div class="wrap wrap--tight featured">' +
      '<div class="featured__head">' +
        "<h2>" + esc(HOME.featuredTitle) + "</h2>" +
        '<span class="featured__note">' + esc(HOME.featuredNote) + "</span>" +
      "</div>" +
      featured.map(function (f) { return rowHTML(f.it, f.key, false); }).join("") +
      '<p style="margin-top:2rem">' +
        '<a class="btn btn--ghost" href="#/catalogue">Papan harga penuh ' +
        '<span class="arrow" aria-hidden="true">&rarr;</span></a></p>' +
    "</div></section>" +

    '<section class="band band--deep"><div class="wrap"><div class="story__grid">' +
      "<div>" +
        '<p class="kicker">' + esc(HOME.storyKicker) + "</p>" +
        "<h2>" + esc(HOME.storyTitle) + "</h2>" +
        '<div class="story__body" style="margin-top:1.6rem">' + paras(HOME.storyBody) + "</div>" +
        '<p style="margin-top:2rem">' +
          '<a class="btn btn--ghost" href="#/about">' + esc(HOME.storyCta) +
          ' <span class="arrow" aria-hidden="true">&rarr;</span></a></p>' +
      "</div>" +
      plateHTML(ABOUT.photos[1]) +
    "</div></div></section>" +

    '<section class="band band--ink"><div class="wrap"><div class="cta__grid">' +
      "<div>" +
        '<p class="kicker">' + esc(HOME.orderKicker) + "</p>" +
        "<h2>" + esc(HOME.orderTitle) + "</h2>" +
        '<p class="lede" style="margin-top:1.4rem">' + esc(HOME.orderBody) + "</p>" +
      "</div>" +
      "<div>" +
        '<a class="cta__num" href="' + waHref() + '" target="_blank" rel="noopener">' +
          esc(CONTACT.whatsappDisplay) + "</a><br>" +
        '<a class="btn btn--wa" href="' + waHref() + '" target="_blank" rel="noopener">' +
          'WhatsApp kami <span class="arrow" aria-hidden="true">&rarr;</span></a>' +
      "</div>" +
    "</div></div></section>" +

    partnersHTML();
  }

  /* ----------------------------------------------------------- about view */

  function viewAbout() {
    return '' +
    '<section class="band"><div class="wrap wrap--tight">' +
      '<p class="kicker">' + esc(ABOUT.kicker) + "</p>" +
      "<h1>" + esc(ABOUT.title) + "</h1>" +
      '<p class="lede" style="margin-top:1.8rem;max-width:52ch">' + esc(ABOUT.lede) + "</p>" +
    "</div></section>" +

    '<section class="band band--tight"><div class="wrap">' +
      plateHTML(ABOUT.photos[0], "20.07.2026") +
    "</div></section>" +

    '<section class="band band--tight"><div class="wrap"><div class="facts">' +
      ABOUT.facts.map(function (f) {
        return '<div class="fact">' +
          '<span class="fact__figure">' + esc(f.figure) + "</span>" +
          '<span class="fact__label">' + esc(f.label) + "</span>" +
        "</div>";
      }).join("") +
    "</div></div></section>" +

    '<section class="band band--tight"><div class="wrap">' +
      ABOUT.sections.map(function (s, i) {
        var extra = "";
        if (i === ABOUT.sections.length - 1) {
          extra = '<ul class="taglist">' +
            ABOUT.equipment.map(function (e) { return "<li>" + esc(e) + "</li>"; }).join("") +
          "</ul>";
        }
        return '<div class="prose__grid">' +
          "<h3>" + esc(s.heading) + "</h3>" +
          '<div class="prose__body">' + paras(s.body) + extra + "</div>" +
        "</div>";
      }).join("") +
    "</div></section>" +

    '<section class="band band--deep"><div class="wrap"><div class="gallery">' +
      ABOUT.photos.map(function (p) { return plateHTML(p); }).join("") +
    "</div></div></section>" +

    partnersHTML();
  }

  /* ------------------------------------------------------- catalogue view */

  function viewCatalogue() {
    return '' +
    '<section class="band"><div class="wrap wrap--tight">' +
      '<div class="board__head">' +
        "<div>" +
          '<p class="kicker">' + esc(CATALOGUE.kicker) + "</p>" +
          "<h1>" + esc(CATALOGUE.title) + "</h1>" +
        "</div>" +
        '<span class="stamp">Harga ' + esc(BRAND.since) + "</span>" +
      "</div>" +

      '<p class="lede" style="margin-bottom:3.4rem">' + esc(CATALOGUE.lede) + "</p>" +

      MENU.map(function (sec, si) {
        return '<section class="boardsec">' +
          '<div class="boardsec__head">' +
            '<h2 class="boardsec__title">' + esc(sec.section) + "</h2>" +
            '<span class="boardsec__note">' + esc(sec.note) + "</span>" +
          "</div>" +
          sec.items.map(function (it, ii) { return rowHTML(it, id(si, ii), true); }).join("") +
        "</section>";
      }).join("") +

      '<p class="board__foot">' + esc(CATALOGUE.footnote) + "</p>" +
    "</div></section>" +

    partnersHTML();
  }

  /* --------------------------------------------------------- contact view */

  function viewContact() {
    return '' +
    '<section class="band"><div class="wrap"><div class="contact__grid">' +
      "<div>" +
        '<p class="kicker">' + esc(CONTACT_PAGE.kicker) + "</p>" +
        "<h1>" + esc(CONTACT_PAGE.title) + "</h1>" +
        '<p class="lede" style="margin-top:1.6rem">' + esc(CONTACT_PAGE.lede) + "</p>" +

        '<div class="deets" style="margin-top:2.6rem">' +
          '<div class="deet"><span class="deet__k">WhatsApp</span>' +
            '<span class="deet__v"><a href="' + waHref() + '" target="_blank" rel="noopener">' +
            esc(CONTACT.whatsappDisplay) + "</a></span></div>" +
          '<div class="deet"><span class="deet__k">E-mel</span>' +
            '<span class="deet__v"><a href="mailto:' + esc(CONTACT.email) + '">' +
            esc(CONTACT.email) + "</a></span></div>" +
          '<div class="deet"><span class="deet__k">Alamat</span>' +
            '<span class="deet__v">' + CONTACT.addressLines.map(esc).join("<br>") + "</span></div>" +
        "</div>" +

        '<div class="socials">' +
          '<a href="' + esc(CONTACT.instagram) + '" target="_blank" rel="noopener">Instagram</a>' +
          '<a href="' + esc(CONTACT.facebook) + '" target="_blank" rel="noopener">Facebook</a>' +
          '<a href="' + esc(CONTACT.tiktok) + '" target="_blank" rel="noopener">TikTok</a>' +
        "</div>" +

        '<h3 style="margin-top:3rem;margin-bottom:1rem">Waktu buka</h3>' +
        '<ul class="hours">' +
          CONTACT.hours.map(function (h) {
            var closed = /tutup/i.test(h.time);
            return '<li data-closed="' + closed + '"><span>' + esc(h.day) + "</span>" +
              '<span class="leader"></span><span class="t">' + esc(h.time) + "</span></li>";
          }).join("") +
        "</ul>" +
      "</div>" +

      '<div id="summary"></div>' +
    "</div></div></section>" +

    partnersHTML();
  }

  /* -------------------------------------------------------- order summary */

  function summaryHTML() {
    var lines = cartLines();
    var body;

    if (!lines.length) {
      body = '<p class="summary__empty">Tiada pesanan lagi. ' +
             'Pergi ke <a href="#/catalogue">papan harga</a> dan pilih apa yang anda nak.</p>';
    } else {
      body =
        '<ul class="summary__list">' +
          lines.map(function (l) {
            return "<li>" +
              '<span class="n">' + l.qty + "&times;</span>" +
              "<span>" + esc(l.name) + "</span>" +
              '<span class="leader"></span>' +
              '<span class="amt">RM ' + money(l.amount) + "</span>" +
            "</li>";
          }).join("") +
        "</ul>" +
        '<div class="summary__total">' +
          '<span class="k">Jumlah</span>' +
          '<span class="v">RM ' + money(cartTotal()) + "</span>" +
        "</div>";
    }

    return '<aside class="summary">' +
      '<div class="summary__head">' +
        '<span class="summary__title">Pesanan anda</span>' +
        (lines.length ? '<button type="button" class="linkbare" data-act="clear">Kosongkan</button>' : "") +
      "</div>" +
      body +
      '<a class="btn btn--wa" href="' + waHref() + '" target="_blank" rel="noopener">' +
        "Hantar pesanan via WhatsApp</a>" +
      '<p class="summary__note">' + esc(CONTACT.orderNote) + "</p>" +
    "</aside>";
  }

  function syncSummary() {
    var el = document.getElementById("summary");
    if (el) el.innerHTML = summaryHTML();
  }

  /* ------------------------------------------------------------- the tray */

  function syncTray() {
    var tray = document.getElementById("tray");
    if (!tray) return;

    var n = cartCount();
    var open = n > 0;

    tray.setAttribute("data-open", String(open));
    tray.setAttribute("aria-hidden", String(!open));
    document.body.setAttribute("data-tray", String(open));

    if (!open) {
      document.body.style.paddingBottom = "";
      return;
    }

    tray.querySelector("[data-tray-count]").textContent = n + " item dipilih";
    tray.querySelector("[data-tray-total]").textContent = "RM " + money(cartTotal());
    tray.querySelector("[data-tray-wa]").setAttribute("href", waHref());

    padForTray();
  }

  /* The tray's height changes with how the buttons wrap, so measure it rather
     than guessing — otherwise it covers the bottom of the page on a phone. */
  function padForTray() {
    var tray = document.getElementById("tray");
    if (!tray || tray.getAttribute("data-open") !== "true") return;

    /* Set it now, so a background tab (where rAF never fires) is still correct. */
    document.body.style.paddingBottom = tray.offsetHeight + "px";

    /* Then again once the browser has settled, in case fonts shifted the wrap. */
    requestAnimationFrame(function () {
      if (tray.getAttribute("data-open") === "true") {
        document.body.style.paddingBottom = tray.offsetHeight + "px";
      }
    });
  }

  /* Update one row in place so the page does not jump. */
  function syncRow(key) {
    var row = document.querySelector('[data-row="' + key + '"]');
    if (!row) return;
    var qty = cart[key] || 0;
    var n = row.querySelector('[data-qty="' + key + '"]');
    if (n) n.textContent = qty;
    var box = row.querySelector(".qty");
    if (box) box.setAttribute("data-empty", String(qty === 0));
    row.setAttribute("data-active", String(qty > 0));
  }

  /* -------------------------------------------------------------- routing */

  var ROUTES = {
    "/":          { title: "Utama",   render: viewHome },
    "/about":     { title: "Tentang", render: viewAbout },
    "/catalogue": { title: "Katalog", render: viewCatalogue },
    "/contact":   { title: "Hubungi", render: viewContact }
  };

  function currentPath() {
    var h = location.hash.replace(/^#/, "");
    return ROUTES[h] ? h : "/";
  }

  function route(firstLoad) {
    var path = currentPath();
    document.getElementById("app").innerHTML =
      '<div class="view is-active">' + ROUTES[path].render() + "</div>";
    document.title = BRAND.name + " — " + ROUTES[path].title;

    Array.prototype.forEach.call(document.querySelectorAll("[data-route]"), function (a) {
      if (a.getAttribute("data-route") === path) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });

    syncTray();
    syncSummary();

    if (!firstLoad) window.scrollTo(0, 0);
  }

  /* --------------------------------------------------------------- chrome */

  function chrome() {
    var links = [
      { href: "#/",          path: "/",          label: "Utama" },
      { href: "#/about",     path: "/about",     label: "Tentang" },
      { href: "#/catalogue", path: "/catalogue", label: "Katalog" },
      { href: "#/contact",   path: "/contact",   label: "Hubungi" }
    ];

    var navHTML = links.map(function (l) {
      return '<a href="' + l.href + '" data-route="' + l.path + '">' + esc(l.label) + "</a>";
    }).join("");

    var wordmark =
      '<a class="wordmark" href="#/">' +
        '<span class="wordmark__name">' + esc(BRAND.name) + "</span>" +
        '<span class="wordmark__sub">' + esc(BRAND.descriptor) + "</span>" +
      "</a>";

    document.getElementById("masthead").innerHTML =
      '<div class="wrap masthead__inner">' + wordmark +
        '<nav class="nav" aria-label="Utama">' + navHTML + "</nav>" +
      "</div>";

    document.getElementById("footer").innerHTML =
      '<div class="wrap">' +
        '<div class="footer__top">' + wordmark +
          '<nav class="footer__nav" aria-label="Footer">' + navHTML + "</nav>" +
        "</div>" +
        '<div class="footer__bottom">' +
          "<span>" + esc(FOOTER.credit) + "</span>" +
          "<span>" + esc(FOOTER.colophon) + "</span>" +
        "</div>" +
      "</div>";

    document.getElementById("tray").innerHTML =
      '<div class="wrap tray__inner">' +
        "<div>" +
          "<span class=\"tray__count\" data-tray-count>0 item dipilih</span><br>" +
          "<span class=\"tray__total\" data-tray-total>RM 0.00</span>" +
        "</div>" +
        '<div class="tray__actions">' +
          '<button type="button" class="linkbare" data-act="clear">Kosongkan</button>' +
          '<a class="btn btn--ghost" href="#/contact">Semak pesanan</a>' +
          '<a class="btn btn--wa" data-tray-wa href="#" target="_blank" rel="noopener">' +
            'Hantar via WhatsApp <span class="arrow" aria-hidden="true">&rarr;</span></a>' +
        "</div>" +
      "</div>";
  }

  /* --------------------------------------------------------------- events */

  document.addEventListener("click", function (ev) {
    var btn = ev.target.closest && ev.target.closest("[data-act]");
    if (!btn) return;

    var act = btn.getAttribute("data-act");
    if (act === "clear") { clearCart(); return; }

    var key = btn.getAttribute("data-key");
    if (!key) return;

    var qty = cart[key] || 0;
    setQty(key, act === "inc" ? qty + 1 : qty - 1);
  });

  window.addEventListener("hashchange", function () { route(false); });
  window.addEventListener("resize", padForTray);

  /* ----------------------------------------------------------------- boot */

  chrome();
  route(true);
})();
