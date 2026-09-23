/* ==========================================================================
   app.js — rendering, routing, language switching and the WhatsApp order.

   You should not need to edit this file.
   All wording, prices and contact details live in content.js
   ========================================================================== */

(function () {
  "use strict";

  /* -------------------------------------------------------------- language */

  var LANG_KEY = "sjb-lang";
  var LANG = DEFAULT_LANG;

  try {
    var savedLang = localStorage.getItem(LANG_KEY);
    if (savedLang === "en" || savedLang === "ms") LANG = savedLang;
  } catch (e) {}

  /* Translate. Accepts a {en, ms} pair or a plain string. */
  function t(v) {
    if (v == null) return "";
    if (typeof v === "string") return v;
    return v[LANG] != null ? v[LANG] : (v.en || "");
  }

  function setLang(next) {
    if (next !== "en" && next !== "ms") return;
    LANG = next;
    try { localStorage.setItem(LANG_KEY, next); } catch (e) {}
    document.documentElement.lang = next;
    chrome();
    route(true);
  }

  /* ---------------------------------------------------------------- utils */

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function money(n) { return Number(n || 0).toFixed(2); }

  function paras(text) {
    return String(text || "").split(/\n{2,}/)
      .map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
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
      var qty = cart[k], it = MENU[+k];
      if (!it || qty < 1) return;
      out.push({ key: k, name: it.name, qty: qty, amount: it.price * qty });
    });
    return out;
  }

  function cartCount() { return cartLines().reduce(function (a, l) { return a + l.qty; }, 0); }
  function cartTotal() { return cartLines().reduce(function (a, l) { return a + l.amount; }, 0); }

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
      msg = t(ORDER.msgEmpty);
    } else {
      msg = t(ORDER.msgIntro) + "\n\n";
      lines.forEach(function (l) {
        msg += "• " + l.qty + " x " + l.name + " — RM " + money(l.amount) + "\n";
      });
      msg += "\n" + t(ORDER.msgTotal) + ": RM " + money(cartTotal()) + "\n\n";
      msg += t(ORDER.msgName) + " \n" + t(ORDER.msgWhen) + " ";
    }

    return "https://wa.me/" + encodeURIComponent(CONTACT.whatsapp[0].number) +
           "?text=" + encodeURIComponent(msg);
  }

  /* -------------------------------------------------------- shared pieces */

  /* One product, with its photograph. */
  function productHTML(it, i, withQty) {
    var qty = cart[i] || 0;
    var tag = it.tag ? '<span class="prod__tag">' + esc(t(it.tag)) + "</span>" : "";

    var stepper = "";
    if (withQty) {
      stepper =
        '<div class="qty" data-empty="' + (qty === 0) + '">' +
          '<button type="button" data-act="dec" data-key="' + i + '" ' +
            'aria-label="' + esc(t(ORDER.remove) + " " + it.name) + '">&minus;</button>' +
          '<span class="qty__n" data-qty="' + i + '">' + qty + "</span>" +
          '<button type="button" data-act="inc" data-key="' + i + '" ' +
            'aria-label="' + esc(t(ORDER.add) + " " + it.name) + '">+</button>' +
        "</div>";
    }

    return '<article class="prod" data-row="' + i + '" data-active="' + (qty > 0) + '">' +
      '<div class="prod__shot">' +
        '<img src="' + esc(it.img) + '" alt="' + esc(it.name) + '" loading="lazy">' +
      "</div>" +
      '<div class="prod__body">' +
        '<div class="prod__line">' +
          '<h3 class="prod__name">' + esc(it.name) + "</h3>" +
          '<span class="prod__leader"></span>' +
          '<span class="prod__price"><span class="cur">RM</span>' + money(it.price) + "</span>" +
        "</div>" +
        '<p class="prod__unit">' + esc(t(it.unit)) + tag + "</p>" +
        '<p class="prod__desc">' + esc(t(it.desc)) + "</p>" +
        stepper +
      "</div>" +
    "</article>";
  }

  function plateHTML(photo, stamp) {
    return '<figure class="plate">' +
      (stamp ? '<span class="stamp plate__stamp">' + esc(stamp) + "</span>" : "") +
      '<div class="plate__frame">' +
        '<img src="' + esc(photo.src) + '" alt="' + esc(t(photo.caption)) + '" loading="lazy">' +
      "</div>" +
      '<figcaption class="plate__caption">' + esc(t(photo.caption)) + "</figcaption>" +
    "</figure>";
  }

  function partnersHTML() {
    return '<section class="band band--tight band--ruled">' +
      '<div class="wrap">' +
        '<p class="partners__intro">' + esc(t(PARTNERS.intro)) + "</p>" +
        '<div class="partners__marks partners__marks--single">' +
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
              '<span class="sdg__label">' + esc(t(s.label)) + "</span>" +
            "</div>";
          }).join("") +
        "</div>" +
        '<p class="sdgs__note">' + esc(t(PARTNERS.sdgNote)) + "</p>" +
      "</div>" +
    "</section>";
  }

  function creditsHTML() {
    return '<section class="band band--tight"><div class="wrap wrap--tight">' +
      '<h2 class="credits__title">' + esc(t(CREDITS.title)) + "</h2>" +
      '<dl class="credits">' +
        CREDITS.lines.map(function (l) {
          return "<dt>" + esc(t(l.role)) + "</dt><dd>" + esc(l.names) + "</dd>";
        }).join("") +
      "</dl>" +
    "</div></section>";
  }

  /* ------------------------------------------------------------ home view */

  function viewHome() {
    return '' +
    '<section class="hero"><div class="wrap"><div class="hero__grid">' +
      "<div>" +
        '<p class="kicker">' + esc(t(HOME.heroKicker)) + "</p>" +
        '<h1 class="hero__title">' + esc(t(HOME.heroTitle)) + "</h1>" +
        '<p class="hero__body">' + esc(t(HOME.heroBody)) + "</p>" +
        '<div class="hero__actions">' +
          '<a class="btn" href="#/catalogue">' + esc(t(HOME.heroCta)) +
            ' <span class="arrow" aria-hidden="true">&rarr;</span></a>' +
          '<a class="btn btn--ghost" href="#/about">' + esc(t(HOME.heroCta2)) + "</a>" +
        "</div>" +
      "</div>" +
      plateHTML({ src: ABOUT.photos[0].src, caption: HOME.heroCaption }, t(HOME.sinceStamp) + " " + BRAND.since) +
    "</div></div></section>" +

    '<section class="band band--tight"><div class="wrap"><div class="pillars">' +
      HOME.pillars.map(function (p) {
        return '<article class="pillar">' +
          '<span class="pillar__no">' + esc(p.no) + "</span>" +
          "<h3>" + esc(t(p.title)) + "</h3>" +
          "<p>" + esc(t(p.body)) + "</p>" +
        "</article>";
      }).join("") +
    "</div></div></section>" +

    '<section class="band band--tight"><div class="wrap wrap--tight">' +
      '<div class="featured__head">' +
        "<h2>" + esc(t(HOME.featuredTitle)) + "</h2>" +
        '<span class="featured__note">' + esc(t(HOME.featuredNote)) + "</span>" +
      "</div>" +
      '<div class="prodlist">' +
        MENU.map(function (it, i) { return productHTML(it, i, false); }).join("") +
      "</div>" +
      '<p style="margin-top:2.2rem">' +
        '<a class="btn btn--ghost" href="#/catalogue">' + esc(t(HOME.featuredCta)) +
        ' <span class="arrow" aria-hidden="true">&rarr;</span></a></p>' +
    "</div></section>" +

    '<section class="band band--deep"><div class="wrap"><div class="story__grid">' +
      "<div>" +
        '<p class="kicker">' + esc(t(HOME.storyKicker)) + "</p>" +
        "<h2>" + esc(t(HOME.storyTitle)) + "</h2>" +
        '<div class="story__body" style="margin-top:1.6rem">' + paras(t(HOME.storyBody)) + "</div>" +
        '<p style="margin-top:2rem">' +
          '<a class="btn btn--ghost" href="#/about">' + esc(t(HOME.storyCta)) +
          ' <span class="arrow" aria-hidden="true">&rarr;</span></a></p>' +
      "</div>" +
      plateHTML(ABOUT.photos[1]) +
    "</div></div></section>" +

    '<section class="band band--ink"><div class="wrap"><div class="cta__grid">' +
      "<div>" +
        '<p class="kicker">' + esc(t(HOME.orderKicker)) + "</p>" +
        "<h2>" + esc(t(HOME.orderTitle)) + "</h2>" +
        '<p class="lede" style="margin-top:1.4rem">' + esc(t(HOME.orderBody)) + "</p>" +
      "</div>" +
      "<div>" +
        CONTACT.whatsapp.map(function (w) {
          return '<a class="cta__num" href="https://wa.me/' + esc(w.number) + '" target="_blank" rel="noopener">' +
            esc(w.display) + "<small>" + esc(w.person) + "</small></a>";
        }).join("") +
        '<a class="btn btn--wa" href="' + waHref() + '" target="_blank" rel="noopener">' +
          esc(t(ORDER.send)) + ' <span class="arrow" aria-hidden="true">&rarr;</span></a>' +
      "</div>" +
    "</div></div></section>" +

    '<section class="band band--tight"><div class="wrap">' +
      '<p class="thanks">' + esc(t(HOME.thanks)) + "</p>" +
    "</div></section>" +

    partnersHTML();
  }

  /* ----------------------------------------------------------- about view */

  function viewAbout() {
    return '' +
    '<section class="band"><div class="wrap wrap--tight">' +
      '<p class="kicker">' + esc(t(ABOUT.kicker)) + "</p>" +
      "<h1>" + esc(t(ABOUT.title)) + "</h1>" +
      '<p class="lede" style="margin-top:1.8rem;max-width:52ch">' + esc(t(ABOUT.lede)) + "</p>" +
    "</div></section>" +

    '<section class="band band--tight"><div class="wrap">' +
      plateHTML(ABOUT.photos[0], "20.07.2026") +
    "</div></section>" +

    '<section class="band band--tight"><div class="wrap"><div class="facts">' +
      ABOUT.facts.map(function (f) {
        return '<div class="fact">' +
          '<span class="fact__figure">' + esc(f.figure) + "</span>" +
          '<span class="fact__label">' + esc(t(f.label)) + "</span>" +
        "</div>";
      }).join("") +
    "</div></div></section>" +

    '<section class="band band--tight"><div class="wrap">' +
      ABOUT.sections.map(function (s, i) {
        var extra = "";
        if (i === ABOUT.sections.length - 1) {
          extra = '<ul class="taglist">' +
            ABOUT.equipment.map(function (e) { return "<li>" + esc(t(e)) + "</li>"; }).join("") +
          "</ul>";
        }
        return '<div class="prose__grid">' +
          "<h3>" + esc(t(s.heading)) + "</h3>" +
          '<div class="prose__body">' + paras(t(s.body)) + extra + "</div>" +
        "</div>";
      }).join("") +
    "</div></section>" +

    '<section class="band band--deep"><div class="wrap"><div class="gallery">' +
      ABOUT.photos.map(function (p) { return plateHTML(p); }).join("") +
    "</div></div></section>" +

    creditsHTML() +
    partnersHTML();
  }

  /* --------------------------------------------------------------- menu */

  function viewCatalogue() {
    return '' +
    '<section class="band"><div class="wrap wrap--tight">' +
      '<div class="board__head">' +
        "<div>" +
          '<p class="kicker">' + esc(t(CATALOGUE.kicker)) + "</p>" +
          "<h1>" + esc(t(CATALOGUE.title)) + "</h1>" +
        "</div>" +
        '<span class="stamp">' + esc(t(HOME.featuredNote)) + "</span>" +
      "</div>" +

      '<p class="lede" style="margin-bottom:3rem">' + esc(t(CATALOGUE.lede)) + "</p>" +

      '<div class="prodlist">' +
        MENU.map(function (it, i) { return productHTML(it, i, true); }).join("") +
      "</div>" +

      '<p class="board__foot">' + esc(t(CATALOGUE.footnote)) + "<br>" +
        esc(t(CONTACT.leadTime)) + "</p>" +
    "</div></section>" +

    partnersHTML();
  }

  /* ---------------------------------------------------------- order view */

  function viewContact() {
    var L = CONTACT_PAGE.labels;

    function deet(label, value) {
      return '<div class="deet"><span class="deet__k">' + esc(label) + "</span>" +
             '<span class="deet__v">' + value + "</span></div>";
    }

    var links = [
      { url: CONTACT.instagram, name: "Instagram" },
      { url: CONTACT.tiktok,    name: "TikTok" },
      { url: CONTACT.facebook,  name: "Facebook" }
    ].filter(function (s) { return s.url; });

    var socials = links.length
      ? '<div class="socials">' + links.map(function (s) {
          return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.name) + "</a>";
        }).join("") + "</div>"
      : "";

    return '' +
    '<section class="band"><div class="wrap"><div class="contact__grid">' +
      "<div>" +
        '<p class="kicker">' + esc(t(CONTACT_PAGE.kicker)) + "</p>" +
        "<h1>" + esc(t(CONTACT_PAGE.title)) + "</h1>" +
        '<p class="lede" style="margin-top:1.6rem">' + esc(t(CONTACT_PAGE.lede)) + "</p>" +

        '<div class="deets" style="margin-top:2.6rem">' +
          deet(t(L.whatsapp), CONTACT.whatsapp.map(function (w) {
            return '<a href="https://wa.me/' + esc(w.number) + '" target="_blank" rel="noopener">' +
                   esc(w.display) + "</a> <em>" + esc(w.person) + "</em>";
          }).join("<br>")) +
          deet(t(L.hours),    esc(t(CONTACT.hours))) +
          deet(t(L.basis),    esc(t(CONTACT.orderBasis))) +
          deet(t(L.delivery), esc(t(CONTACT.delivery))) +
          deet(t(L.payment),  esc(t(CONTACT.payment))) +
          deet(t(L.address),  CONTACT.addressLines.map(esc).join("<br>")) +
          deet(t(L.halal),    esc(t(CONTACT.halal))) +
        "</div>" +
        socials +
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
      body = '<p class="summary__empty">' + esc(t(ORDER.empty)) + "</p>";
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
          '<span class="k">' + esc(t(ORDER.total)) + "</span>" +
          '<span class="v">RM ' + money(cartTotal()) + "</span>" +
        "</div>";
    }

    return '<aside class="summary">' +
      '<div class="summary__head">' +
        '<span class="summary__title">' + esc(t(ORDER.title)) + "</span>" +
        (lines.length ? '<button type="button" class="linkbare" data-act="clear">' +
          esc(t(ORDER.clear)) + "</button>" : "") +
      "</div>" +
      body +
      '<a class="btn btn--wa" href="' + waHref() + '" target="_blank" rel="noopener">' +
        esc(t(ORDER.send)) + "</a>" +
      '<p class="summary__note">' + esc(t(CONTACT.leadTime)) + "</p>" +
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

    if (!open) { document.body.style.paddingBottom = ""; return; }

    tray.querySelector("[data-tray-count]").textContent = n + " " + t(n === 1 ? ORDER.selectedOne : ORDER.selected);
    tray.querySelector("[data-tray-total]").textContent = "RM " + money(cartTotal());
    tray.querySelector("[data-tray-wa]").setAttribute("href", waHref());

    padForTray();
  }

  /* Measure the tray rather than guessing, so it never covers the page. */
  function padForTray() {
    var tray = document.getElementById("tray");
    if (!tray || tray.getAttribute("data-open") !== "true") return;
    document.body.style.paddingBottom = tray.offsetHeight + "px";
    requestAnimationFrame(function () {
      if (tray.getAttribute("data-open") === "true") {
        document.body.style.paddingBottom = tray.offsetHeight + "px";
      }
    });
  }

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
    "/":          { key: "home",      render: viewHome },
    "/about":     { key: "about",     render: viewAbout },
    "/catalogue": { key: "catalogue", render: viewCatalogue },
    "/contact":   { key: "contact",   render: viewContact }
  };

  function currentPath() {
    var h = location.hash.replace(/^#/, "");
    return ROUTES[h] ? h : "/";
  }

  function route(keepScroll) {
    var path = currentPath();
    document.getElementById("app").innerHTML =
      '<div class="view is-active">' + ROUTES[path].render() + "</div>";

    document.title = BRAND.nameFull + " — " + t(NAV[ROUTES[path].key]);

    Array.prototype.forEach.call(document.querySelectorAll("[data-route]"), function (a) {
      if (a.getAttribute("data-route") === path) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });

    syncTray();
    syncSummary();

    if (!keepScroll) window.scrollTo(0, 0);
  }

  /* --------------------------------------------------------------- chrome */

  function chrome() {
    var links = [
      { href: "#/",          path: "/",          label: NAV.home },
      { href: "#/about",     path: "/about",     label: NAV.about },
      { href: "#/catalogue", path: "/catalogue", label: NAV.catalogue },
      { href: "#/contact",   path: "/contact",   label: NAV.contact }
    ];

    var navHTML = links.map(function (l) {
      return '<a href="' + l.href + '" data-route="' + l.path + '">' + esc(t(l.label)) + "</a>";
    }).join("");

    var wordmark =
      '<a class="wordmark" href="#/">' +
        '<span class="wordmark__name">' + esc(BRAND.name) + "</span>" +
        '<span class="wordmark__sub">' + esc(BRAND.descriptor) + "</span>" +
      "</a>";

    var langSwitch =
      '<div class="langsw" role="group" aria-label="Language">' +
        '<button type="button" data-lang="en" aria-pressed="' + (LANG === "en") + '">EN</button>' +
        '<button type="button" data-lang="ms" aria-pressed="' + (LANG === "ms") + '">BM</button>' +
      "</div>";

    document.getElementById("masthead").innerHTML =
      '<div class="wrap masthead__inner">' + wordmark +
        '<div class="masthead__right">' +
          '<nav class="nav" aria-label="Main">' + navHTML + "</nav>" +
          langSwitch +
        "</div>" +
      "</div>";

    document.getElementById("footer").innerHTML =
      '<div class="wrap">' +
        '<div class="footer__top">' + wordmark +
          '<nav class="footer__nav" aria-label="Footer">' + navHTML + "</nav>" +
        "</div>" +
        '<div class="footer__bottom">' +
          "<span>" + esc(t(FOOTER.credit)) + "</span>" +
          "<span>" + esc(t(FOOTER.colophon)) + "</span>" +
        "</div>" +
      "</div>";

    document.getElementById("tray").innerHTML =
      '<div class="wrap tray__inner">' +
        "<div>" +
          '<span class="tray__count" data-tray-count></span><br>' +
          '<span class="tray__total" data-tray-total>RM 0.00</span>' +
        "</div>" +
        '<div class="tray__actions">' +
          '<button type="button" class="linkbare" data-act="clear">' + esc(t(ORDER.clear)) + "</button>" +
          '<a class="btn btn--ghost" href="#/contact">' + esc(t(ORDER.review)) + "</a>" +
          '<a class="btn btn--wa" data-tray-wa href="#" target="_blank" rel="noopener">' +
            esc(t(ORDER.send)) + ' <span class="arrow" aria-hidden="true">&rarr;</span></a>' +
        "</div>" +
      "</div>";
  }

  /* --------------------------------------------------------------- events */

  document.addEventListener("click", function (ev) {
    if (!ev.target.closest) return;

    var langBtn = ev.target.closest("[data-lang]");
    if (langBtn) { setLang(langBtn.getAttribute("data-lang")); return; }

    var btn = ev.target.closest("[data-act]");
    if (!btn) return;

    var act = btn.getAttribute("data-act");
    if (act === "clear") { clearCart(); return; }

    var key = btn.getAttribute("data-key");
    if (key == null) return;

    setQty(key, (cart[key] || 0) + (act === "inc" ? 1 : -1));
  });

  window.addEventListener("hashchange", function () { route(false); });
  window.addEventListener("resize", padForTray);

  /* ----------------------------------------------------------------- boot */

  document.documentElement.lang = LANG;
  chrome();
  route(true);
})();
