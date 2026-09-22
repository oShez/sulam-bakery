/* ==========================================================================
   CONTENT FILE  —  EDIT EVERYTHING HERE
   --------------------------------------------------------------------------
   This is the only file you need to touch to update the website.
   Nothing here affects the layout or the design — it is all just text.

   Anything written like [THIS] is a placeholder waiting to be replaced.
   ========================================================================== */


/* --------------------------------------------------------------------------
   1.  THE BIG SWITCH
   --------------------------------------------------------------------------
   true   = show the realistic sample menu (good for presenting to people)
   false  = show blank placeholders instead (good once you have real items)
   -------------------------------------------------------------------------- */

const USE_SAMPLE_DATA = true;


/* --------------------------------------------------------------------------
   2.  THE BAKERY
   -------------------------------------------------------------------------- */

const BRAND = {
  // Replace [BAKERY NAME] with the real name once your team decides on one.
  name:       "[BAKERY NAME]",
  descriptor: "Ekonomi Rumah Tangga · Kampung Sungai Judah",
  since:      "2026",
  tagline:    "Roti, kek dan kuih dibakar setiap pagi di Kampung Sungai Judah."
};


/* --------------------------------------------------------------------------
   3.  CONTACT DETAILS
   --------------------------------------------------------------------------
   whatsappNumber must be digits only, with the country code and NO "+".
   Malaysia starts with 60. So 012-345 6789  becomes  60123456789
   -------------------------------------------------------------------------- */

const CONTACT = {
  whatsappNumber:  "60123456789",            // [REPLACE] digits only
  whatsappDisplay: "+60 12-345 6789",        // [REPLACE] how it looks on screen
  email:           "hello@example.com",      // [REPLACE]
  instagram:       "https://instagram.com/", // [REPLACE]
  facebook:        "https://facebook.com/",  // [REPLACE]
  tiktok:          "https://tiktok.com/",    // [REPLACE]

  addressLines: [
    "Balai Ilmu, Kampung Sungai Judah",
    "Pulau Carey, 42960 Kuala Langat",
    "Selangor Darul Ehsan"
  ],

  hours: [
    { day: "Isnin – Khamis", time: "8:00 pagi – 5:00 petang" },
    { day: "Jumaat",         time: "8:00 pagi – 12:00 tengah hari" },
    { day: "Sabtu",          time: "8:00 pagi – 1:00 petang" },
    { day: "Ahad",           time: "Tutup" }
  ],

  // Shown in small print under the order button.
  orderNote: "Pesanan kek dan biskut balang: sila tempah 3 hari lebih awal."
};


/* --------------------------------------------------------------------------
   4.  HOME PAGE
   -------------------------------------------------------------------------- */

const HOME = {
  heroKicker:  "Sejak 20 Julai 2026",
  heroTitle:   "Dibakar di kampung,\nuntuk kampung.",
  heroBody:    "Fourteen of us learned to bake here — proper dough, proper "
             + "ovens, proper hands. What started as a training class is now "
             + "a kitchen that opens most mornings.",
  heroCtaText: "Lihat harga",

  heroCaption: "Balai Ilmu, Kampung Sungai Judah — 20 Julai 2026",

  // The three short blocks under the hero.
  pillars: [
    {
      no:    "01",
      title: "Adunan tangan",
      body:  "Every dough is mixed, kneaded and shaped by hand before it goes "
           + "anywhere near the oven. No shortcuts, no premix."
    },
    {
      no:    "02",
      title: "Bakar pagi",
      body:  "We bake early so the roti is still warm when the first orders "
           + "go out. Whatever is left at closing goes home with the village."
    },
    {
      no:    "03",
      title: "Milik kampung",
      body:  "The ovens, the mixers and the freezers belong to Kampung Sungai "
           + "Judah. Every ringgit spent here stays in the village."
    }
  ],

  featuredTitle: "Yang laris pagi ini",
  featuredNote:  "Harga penuh di halaman katalog.",

  storyKicker: "Asal usul",
  storyTitle:  "It began with one class.",
  storyBody:   "On 20 July 2026, fourteen people from Kampung Sungai Judah sat "
             + "down at Balai Ilmu with professional bakers and learned how to "
             + "prepare dough, knead it, shape it and decorate it. The "
             + "instructors went home that evening. The electric ovens, the "
             + "dough mixers, the freezers and the ingredients stayed.\n\n"
             + "That is the whole point. A class you attend once teaches you "
             + "something. A kitchen you own lets you keep going.",
  storyCta:    "Baca kisah penuh",

  orderKicker: "Nak pesan?",
  orderTitle:  "WhatsApp is the fastest way.",
  orderBody:   "Pick what you want from the catalogue, and the site will write "
             + "the message for you. Or just message us directly — we reply "
             + "between 8am and 5pm."
};


/* --------------------------------------------------------------------------
   5.  ABOUT PAGE
   -------------------------------------------------------------------------- */

const ABOUT = {
  kicker: "Tentang kami",
  title:  "Fourteen people, one kitchen, and a village that owns it.",
  lede:   "This bakery came out of the Ekonomi Rumah Tangga baking class held "
        + "at Balai Ilmu, Kampung Sungai Judah on 20 July 2026.",

  sections: [
    {
      heading: "Siapa kami",
      body: "Kampung Sungai Judah is a Mah Meri village on Pulau Carey, "
          + "Selangor. The Mah Meri are one of the Orang Asli communities of "
          + "Peninsular Malaysia, known for their wood carving, their weaving "
          + "and a long relationship with the coast and the forest.\n\n"
          + "Most of what the village earns has come from fishing, "
          + "small-scale farming and craft. This kitchen is a new line — a "
          + "way of turning early mornings into income without anyone having "
          + "to leave the village to do it."
    },
    {
      heading: "Kelas itu",
      body: "Professional instructors ran a full day of hands-on training in "
          + "bread and pastry work: preparing dough, kneading, shaping and "
          + "decorating. Fourteen community members took part.\n\n"
          + "The class was organised under SULAM by the Centre for Continuing "
          + "Education, Sunway College Kuala Lumpur, as part of a one-year "
          + "collaboration with Kampung Sungai Judah."
    },
    {
      heading: "Apa yang tinggal",
      body: "Training on its own fades. So the programme left the equipment "
          + "behind as well — electric ovens, dough mixers, freezers and a "
          + "starting stock of baking ingredients.\n\n"
          + "That equipment is what makes this a bakery rather than a memory "
          + "of a workshop. It belongs to the village."
    }
  ],

  // The numbers strip.
  facts: [
    { figure: "14",       label: "peserta kelas" },
    { figure: "20.07.26", label: "hari pertama" },
    { figure: "4",        label: "jenis peralatan" },
    { figure: "1",        label: "dapur kampung" }
  ],

  equipment: ["Ketuhar elektrik", "Pengadun doh", "Peti sejuk beku", "Bahan bakeri"],

  photos: [
    { src: "assets/img/ert-group.jpg",
      caption: "Peserta kelas ERT di hadapan Balai Ilmu — 20 Julai 2026" },
    { src: "assets/img/ert-banner.jpg",
      caption: "Kampung Sungai Judah Ekonomi Rumah Tangga Baking Class" },
    { src: "assets/img/kampung.jpg",
      caption: "Jalan kampung, Pulau Carey" }
  ]
};


/* --------------------------------------------------------------------------
   6.  THE MENU  —  SAMPLE VERSION
   --------------------------------------------------------------------------
   Shown when USE_SAMPLE_DATA is true, above.
   price is a plain number in ringgit. Use 4.5 not "RM 4.50".
   unit is the small text after the price. Leave "" for none.
   -------------------------------------------------------------------------- */

const MENU_SAMPLE = [
  {
    section: "Roti & Buns",
    note:    "Dibakar setiap pagi",
    items: [
      { name: "Roti Putih",      desc: "Plain white loaf, soft crumb, sliced on request.",       price: 4.50,  unit: "seketul" },
      { name: "Roti Kelapa",     desc: "Sweet bun filled with grated coconut and gula melaka.",  price: 1.20,  unit: "sebiji" },
      { name: "Bun Sosej",       desc: "Soft bun wrapped around a chicken sausage.",             price: 2.00,  unit: "sebiji" },
      { name: "Roti Manis Susu", desc: "Milk bun brushed with butter, best while still warm.",   price: 1.50,  unit: "sebiji" }
    ]
  },
  {
    section: "Kek & Pastri",
    note:    "Tempah 3 hari lebih awal",
    items: [
      { name: "Kek Marble",     desc: "Butter and cocoa marbled together, baked in a loaf tin.", price: 18.00, unit: "sebiji" },
      { name: "Kek Pisang",     desc: "Banana cake made with fruit from the village.",           price: 15.00, unit: "sebiji" },
      { name: "Karipap Pusing", desc: "Spiral curry puff, potato and chicken filling.",          price: 1.00,  unit: "sebiji" },
      { name: "Puff Sardin",    desc: "Flaky puff pastry with sardine and onion.",               price: 1.80,  unit: "sebiji" }
    ]
  },
  {
    section: "Kuih & Biskut",
    note:    "Ikut musim",
    items: [
      { name: "Kuih Bakar",    desc: "Baked pandan custard kuih, crisp top, soft centre.",    price: 1.00,  unit: "sekeping" },
      { name: "Kuih Lapis",    desc: "Steamed layer cake, pulled apart one layer at a time.",  price: 1.20,  unit: "sekeping" },
      { name: "Tart Nanas",    desc: "Pineapple tarts rolled by hand.",                        price: 25.00, unit: "sebalang" },
      { name: "Biskut Mazola", desc: "Crumbly corn oil biscuits, an old kampung recipe.",      price: 20.00, unit: "sebalang" }
    ]
  }
];


/* --------------------------------------------------------------------------
   7.  THE MENU  —  BLANK VERSION
   --------------------------------------------------------------------------
   Shown when USE_SAMPLE_DATA is false. Fill these in with your real items.
   -------------------------------------------------------------------------- */

const MENU_BLANK = [
  {
    section: "[Section One]",
    note:    "[short note]",
    items: [
      { name: "[Item Name 01]", desc: "[One line describing this item.]", price: 0, unit: "" },
      { name: "[Item Name 02]", desc: "[One line describing this item.]", price: 0, unit: "" },
      { name: "[Item Name 03]", desc: "[One line describing this item.]", price: 0, unit: "" },
      { name: "[Item Name 04]", desc: "[One line describing this item.]", price: 0, unit: "" }
    ]
  },
  {
    section: "[Section Two]",
    note:    "[short note]",
    items: [
      { name: "[Item Name 05]", desc: "[One line describing this item.]", price: 0, unit: "" },
      { name: "[Item Name 06]", desc: "[One line describing this item.]", price: 0, unit: "" },
      { name: "[Item Name 07]", desc: "[One line describing this item.]", price: 0, unit: "" },
      { name: "[Item Name 08]", desc: "[One line describing this item.]", price: 0, unit: "" }
    ]
  },
  {
    section: "[Section Three]",
    note:    "[short note]",
    items: [
      { name: "[Item Name 09]", desc: "[One line describing this item.]", price: 0, unit: "" },
      { name: "[Item Name 10]", desc: "[One line describing this item.]", price: 0, unit: "" },
      { name: "[Item Name 11]", desc: "[One line describing this item.]", price: 0, unit: "" },
      { name: "[Item Name 12]", desc: "[One line describing this item.]", price: 0, unit: "" }
    ]
  }
];


/* --------------------------------------------------------------------------
   8.  CATALOGUE PAGE WORDING
   -------------------------------------------------------------------------- */

const CATALOGUE = {
  kicker: "Senarai harga",
  title:  "Papan Harga",
  lede:   "Tap the plus signs to build an order. When you are done, send it "
        + "straight to our WhatsApp — the message writes itself.",
  footnote: "Harga boleh berubah mengikut harga bahan. Semua harga dalam Ringgit Malaysia."
};


/* --------------------------------------------------------------------------
   9.  CONTACT PAGE WORDING
   -------------------------------------------------------------------------- */

const CONTACT_PAGE = {
  kicker: "Hubungi kami",
  title:  "Come by, or just message.",
  lede:   "The kitchen is at Balai Ilmu in Kampung Sungai Judah. WhatsApp is "
        + "the quickest way to reach us — we answer during opening hours."
};


/* --------------------------------------------------------------------------
   10. PARTNERS & FOOTER
   -------------------------------------------------------------------------- */

const PARTNERS = {
  intro: "Established through the Ekonomi Rumah Tangga programme",
  marks: [
    { name: "Centre for Continuing Education", sub: "Sunway College Kuala Lumpur" },
    { name: "Sunway College",                  sub: "Kuala Lumpur" },
    { name: "Jeffrey Cheah Foundation",        sub: "Nurturing the Seeds of Wisdom" }
  ],
  sdgs: [
    { no: "1",  label: "No Poverty",                      color: "#E5243B" },
    { no: "8",  label: "Decent Work and Economic Growth", color: "#A21942" },
    { no: "12", label: "Responsible Consumption",         color: "#BF8B2E" }
  ],
  sdgNote: "Menyokong Matlamat Pembangunan Mampan PBB"
};

const FOOTER = {
  // [REPLACE] with your group / student names / lecturer if you want credit.
  credit:   "A SULAM community project · Kampung Sungai Judah × Sunway College Kuala Lumpur",
  colophon: "Set in Fraunces and Archivo."
};
