/* ==========================================================================
   CONTENT FILE  —  EDIT EVERYTHING HERE
   --------------------------------------------------------------------------
   This is the only file you need to touch to update the website.
   Nothing here affects the layout or the design — it is all just text.

   The site is bilingual. Anything written like
       { en: "Fresh bread", ms: "Roti segar" }
   has an English version and a Malay version. Edit both.

   Answers from Ms Nabilah, 23 September 2026, are applied throughout and
   marked with their question code, e.g. [A1].
   ========================================================================== */


/* --------------------------------------------------------------------------
   1.  LANGUAGE                                                          [F5]
   --------------------------------------------------------------------------
   Which language the site opens in.  "en" = English,  "ms" = Bahasa Melayu.
   Visitors can switch with the button in the top corner either way.
   -------------------------------------------------------------------------- */

const DEFAULT_LANG = "en";


/* --------------------------------------------------------------------------
   2.  THE BAKERY                                                   [A1] [E3]
   -------------------------------------------------------------------------- */

const BRAND = {
  name:       "Roti Home Made",
  nameFull:   "Roti Home Made Kampung Sg Judah",
  descriptor: "Kampung Sungai Judah · Pulau Carey",
  since:      "2026"
};


/* --------------------------------------------------------------------------
   3.  CONTACT DETAILS                                         [C1] … [C8]
   --------------------------------------------------------------------------
   number must be digits only, country code first, no "+".
   012-345 6789  becomes  60123456789
   -------------------------------------------------------------------------- */

const CONTACT = {
  // Orders go to the first person listed. Both are shown on the order page.
  whatsapp: [
    { person: "Encik Azmi", number: "601126438474", display: "+60 11-2643 8474" },
    { person: "Ms Sophie",  number: "60192482843",  display: "+60 19-248 2843" }
  ],

  // [C3] No e-mail address — confirmed to remove it.

  // [C4] Instagram and TikTok accounts exist, but the handles still need to be
  // confirmed with G4 (Instagram) and G7 (TikTok). Fill them in and they will
  // appear on the order page automatically. Leave as null to hide them.
  instagram: null,   // e.g. "https://instagram.com/rotihomemade"
  tiktok:    null,   // e.g. "https://tiktok.com/@rotihomemade"
  facebook:  null,

  // [C5] Confirmed correct.
  addressLines: [
    "Balai Ilmu, Kampung Sungai Judah",
    "Pulau Carey, 42960 Kuala Langat",
    "Selangor Darul Ehsan"
  ],

  // [C2] [C6] Taking orders 8am–6pm. Baked to order, not a walk-in shop.
  hours:      { en: "8:00am – 6:00pm, daily", ms: "8:00 pagi – 6:00 petang, setiap hari" },
  orderBasis: { en: "By order only",          ms: "Hanya melalui tempahan" },

  // [C7] Delivery available.
  delivery:   { en: "Delivery available",     ms: "Penghantaran tersedia" },

  // [C8] Payment methods.
  payment:    { en: "DuitNow QR or bank transfer", ms: "QR DuitNow atau pindahan bank" },

  // [B6] Three days' notice.  [B7] No minimum order.
  leadTime: {
    en: "Please order three days ahead. There is no minimum — one loaf is fine.",
    ms: "Sila tempah tiga hari lebih awal. Tiada pesanan minimum — satu biji pun boleh."
  },

  // [B8] Stated plainly. No certification is claimed.
  halal: {
    en: "No halal certification at this time. The bread is prepared by Muslim and Orang Asli members of the community.",
    ms: "Tiada sijil halal buat masa ini. Roti disediakan oleh ahli komuniti Muslim dan Orang Asli."
  }
};


/* --------------------------------------------------------------------------
   4.  THE MENU                                                [B1] … [B5]
   --------------------------------------------------------------------------
   Only bread for now, and no categories — both confirmed.

   NOTE ON PRICES: RM3.50 and RM3.00 come from the current poster, which
   labels them "harga promosi hari ini sahaja". Ms Nabilah is sending an
   updated price list — replace the numbers below when it arrives.
   -------------------------------------------------------------------------- */

const MENU = [
  {
    name:  "Roti Sosej",
    price: 3.50,
    img:   "assets/img/roti-sosej.jpg",
    unit:  { en: "each", ms: "sebiji" },
    tag:   null,
    desc: {
      en: "Soft bread wrapped around a whole sausage, finished with chilli sauce, mayonnaise and spring onion.",
      ms: "Roti lembut berbalut sosej penuh, disiram sos cili, mayonis dan daun bawang."
    }
  },
  {
    name:  "Roti Keju",
    price: 3.00,
    img:   "assets/img/roti-keju.jpg",
    unit:  { en: "each", ms: "sebiji" },
    tag:   { en: "Limited edition", ms: "Edisi terhad" },
    desc: {
      en: "Layered bread baked until golden, with cheese folded through every layer.",
      ms: "Roti berlapis dibakar sehingga keperangan, dengan keju di setiap lapisan."
    }
  }
];


/* --------------------------------------------------------------------------
   5.  NAVIGATION
   -------------------------------------------------------------------------- */

const NAV = {
  home:      { en: "Home",  ms: "Utama" },
  about:     { en: "About", ms: "Tentang" },
  catalogue: { en: "Menu",  ms: "Menu" },
  contact:   { en: "Order", ms: "Pesan" }
};


/* --------------------------------------------------------------------------
   6.  HOME PAGE
   -------------------------------------------------------------------------- */

const HOME = {
  heroKicker: { en: "Kampung Sungai Judah", ms: "Kampung Sungai Judah" },

  heroTitle: {
    en: "Baked fresh,\nevery single day.",
    ms: "Dibuat segar,\nsetiap hari."
  },

  heroBody: {
    en: "Seven bakers in Kampung Sungai Judah, making soft bread with generous filling. Order on WhatsApp and we will deliver it to you.",
    ms: "Tujuh orang pembakar di Kampung Sungai Judah, menghasilkan roti lembut dengan inti yang banyak. Pesan melalui WhatsApp dan kami hantar kepada anda."
  },

  heroCta:  { en: "See the menu", ms: "Lihat menu" },
  heroCta2: { en: "Our story",    ms: "Kisah kami" },

  heroCaption: {
    en: "The bakers at Balai Ilmu, Kampung Sungai Judah",
    ms: "Pembakar di Balai Ilmu, Kampung Sungai Judah"
  },

  // The rotated stamp on the hero photo. The year comes from BRAND.since.
  sinceStamp: { en: "Since", ms: "Sejak" },

  pillars: [
    {
      no: "01",
      title: { en: "Made fresh daily", ms: "Dibuat segar setiap hari" },
      body: {
        en: "Every loaf is baked the day it goes out. Nothing sits on a shelf waiting for a buyer.",
        ms: "Setiap biji roti dibakar pada hari ia dihantar. Tiada yang tersimpan lama menunggu pembeli."
      }
    },
    {
      no: "02",
      title: { en: "Soft bread, generous filling", ms: "Roti lembut, inti banyak" },
      body: {
        en: "Soft inside, filled properly, and popular with everyone who has tried it.",
        ms: "Lembut di dalam, intinya banyak, dan digemari ramai yang telah mencubanya."
      }
    },
    {
      no: "03",
      title: { en: "Made in the village", ms: "Dibuat di kampung" },
      body: {
        en: "Baked by seven people from Kampung Sungai Judah, in their own kitchen, with their own ovens.",
        ms: "Dibakar oleh tujuh orang dari Kampung Sungai Judah, di dapur sendiri, dengan ketuhar sendiri."
      }
    }
  ],

  featuredTitle: { en: "Available now",          ms: "Available hari ini" },
  featuredNote:  { en: "Order three days ahead", ms: "Tempah tiga hari lebih awal" },
  featuredCta:   { en: "Full menu and prices",   ms: "Menu dan harga penuh" },

  storyKicker: { en: "How it started", ms: "Asal usul" },
  storyTitle:  { en: "It began with one baking class.", ms: "Bermula dengan satu kelas membakar." },
  storyBody: {
    en: "On 20 July 2026, people from Kampung Sungai Judah sat down at Balai Ilmu with professional bakers and learned to prepare dough, knead it, shape it and decorate it. The instructors went home that evening. The electric ovens, the dough mixers and the freezers stayed.\n\nSeven of them are still baking. What you see on the menu is what came out of that.",
    ms: "Pada 20 Julai 2026, penduduk Kampung Sungai Judah berkumpul di Balai Ilmu bersama pembakar profesional untuk belajar menyediakan doh, menguli, membentuk dan menghias. Tenaga pengajar pulang pada petang itu. Ketuhar elektrik, pengadun doh dan peti sejuk beku kekal di sini.\n\nTujuh daripada mereka masih membakar sehingga kini. Apa yang ada dalam menu ini adalah hasilnya."
  },
  storyCta: { en: "Read the full story", ms: "Baca kisah penuh" },

  orderKicker: { en: "Ordering", ms: "Cara pesan" },
  orderTitle:  { en: "WhatsApp is the fastest way.", ms: "WhatsApp cara paling cepat." },
  orderBody: {
    en: "Choose what you want from the menu and this site will write the message for you. We take orders from 8am to 6pm, and we deliver.",
    ms: "Pilih apa yang anda mahu dari menu dan laman ini akan menulis mesejnya untuk anda. Kami menerima tempahan dari 8 pagi hingga 6 petang, dan kami menghantar."
  },

  thanks: {
    en: "Thank you for supporting local produce.",
    ms: "Terima kasih kerana menyokong produk tempatan."
  }
};


/* --------------------------------------------------------------------------
   7.  ABOUT PAGE                                                  [E1] [E2]
   -------------------------------------------------------------------------- */

const ABOUT = {
  kicker: { en: "About us", ms: "Tentang kami" },
  title: {
    en: "Seven bakers, one village kitchen.",
    ms: "Tujuh pembakar, satu dapur kampung."
  },
  lede: {
    en: "Roti Home Made grew out of a baking class held at Balai Ilmu, Kampung Sungai Judah, on 20 July 2026.",
    ms: "Roti Home Made bermula daripada kelas membakar yang diadakan di Balai Ilmu, Kampung Sungai Judah, pada 20 Julai 2026."
  },

  sections: [
    {
      heading: { en: "Who we are", ms: "Siapa kami" },
      body: {
        en: "Kampung Sungai Judah is a Mah Meri village on Pulau Carey, Selangor. The Mah Meri are one of the Orang Asli communities of Peninsular Malaysia, known for their wood carving, their weaving, and a long relationship with the coast and the forest.\n\nMost of what the village earns has come from fishing, small-scale farming and craft. This kitchen is a new line of work — a way of turning early mornings into income without anyone having to leave the village to do it.",
        ms: "Kampung Sungai Judah ialah sebuah perkampungan Mah Meri di Pulau Carey, Selangor. Masyarakat Mah Meri merupakan salah satu komuniti Orang Asli di Semenanjung Malaysia, terkenal dengan ukiran kayu, anyaman, serta hubungan yang lama dengan laut dan hutan.\n\nSebahagian besar pendapatan kampung datang daripada menangkap ikan, pertanian kecil-kecilan dan kraf tangan. Dapur ini merupakan bidang baharu — cara mengubah waktu pagi menjadi pendapatan tanpa perlu meninggalkan kampung."
      }
    },
    {
      heading: { en: "The class", ms: "Kelas itu" },
      body: {
        en: "Professional instructors ran a full day of hands-on training in bread and pastry work: preparing dough, kneading, shaping and decorating.\n\nThe class was organised under SULAM by the Centre for Continuing Education, Sunway College, as part of a one-year collaboration with Kampung Sungai Judah.",
        ms: "Tenaga pengajar profesional mengendalikan latihan amali sepanjang hari dalam kerja roti dan pastri: menyediakan doh, menguli, membentuk dan menghias.\n\nKelas ini dianjurkan di bawah SULAM oleh Centre for Continuing Education, Sunway College, sebagai sebahagian daripada kerjasama setahun dengan Kampung Sungai Judah."
      }
    },
    {
      heading: { en: "What stayed behind", ms: "Apa yang tinggal" },
      body: {
        en: "Training on its own fades. So the programme left the equipment as well — electric ovens, dough mixers, freezers and a starting stock of baking ingredients.\n\nThat equipment is what makes this a bakery rather than the memory of a workshop. It belongs to the village.",
        ms: "Latihan semata-mata akan hilang begitu sahaja. Justeru program ini turut meninggalkan peralatannya — ketuhar elektrik, pengadun doh, peti sejuk beku dan bekalan bahan bakeri permulaan.\n\nPeralatan itulah yang menjadikan ini sebuah bakeri, bukan sekadar kenangan sebuah bengkel. Ia milik kampung."
      }
    }
  ],

  facts: [
    { figure: "7",        label: { en: "bakers",          ms: "pembakar" } },
    { figure: "2",        label: { en: "kinds of bread",  ms: "jenis roti" } },
    { figure: "20.07.26", label: { en: "first day",       ms: "hari pertama" } },
    { figure: "1",        label: { en: "village kitchen", ms: "dapur kampung" } }
  ],

  equipmentTitle: { en: "The equipment", ms: "Peralatan" },
  equipment: [
    { en: "Electric ovens",  ms: "Ketuhar elektrik" },
    { en: "Dough mixers",    ms: "Pengadun doh" },
    { en: "Freezers",        ms: "Peti sejuk beku" },
    { en: "Baking supplies", ms: "Bahan bakeri" }
  ],

  photos: [
    {
      src: "assets/img/ert-group.jpg",
      caption: {
        en: "The baking class at Balai Ilmu, Kampung Sungai Judah — 20 July 2026",
        ms: "Kelas membakar di Balai Ilmu, Kampung Sungai Judah — 20 Julai 2026"
      }
    },
    {
      src: "assets/img/poster.jpg",
      caption: {
        en: "The bakery's own poster for its current bread",
        ms: "Poster bakeri untuk roti terkini"
      }
    },
    {
      src: "assets/img/kampung.jpg",
      caption: { en: "Kampung Sungai Judah, Pulau Carey", ms: "Kampung Sungai Judah, Pulau Carey" }
    }
  ]
};


/* --------------------------------------------------------------------------
   8.  MENU PAGE
   -------------------------------------------------------------------------- */

const CATALOGUE = {
  kicker: { en: "Menu and prices", ms: "Menu dan harga" },
  title:  { en: "What we bake",    ms: "Roti kami" },
  lede: {
    en: "Only bread for now, baked to order. Add what you want and send the order straight to our WhatsApp — the message writes itself.",
    ms: "Buat masa ini roti sahaja, dibakar mengikut tempahan. Tambah apa yang anda mahu dan hantar terus ke WhatsApp kami — mesejnya ditulis sendiri."
  },
  footnote: {
    en: "Prices are from our current poster and may change. All prices in Malaysian Ringgit.",
    ms: "Harga diambil daripada poster semasa dan boleh berubah. Semua harga dalam Ringgit Malaysia."
  }
};


/* --------------------------------------------------------------------------
   9.  ORDER PAGE
   -------------------------------------------------------------------------- */

const CONTACT_PAGE = {
  kicker: { en: "Order from us",       ms: "Pesan daripada kami" },
  title:  { en: "Send us a message.",  ms: "Hantar mesej kepada kami." },
  lede: {
    en: "We bake to order from the kitchen at Balai Ilmu in Kampung Sungai Judah, and we deliver. WhatsApp is the quickest way to reach us.",
    ms: "Kami membakar mengikut tempahan dari dapur di Balai Ilmu, Kampung Sungai Judah, dan kami menghantar. WhatsApp cara paling pantas untuk menghubungi kami."
  },
  labels: {
    whatsapp: { en: "WhatsApp",     ms: "WhatsApp" },
    address:  { en: "Address",      ms: "Alamat" },
    hours:    { en: "Order hours",  ms: "Waktu tempahan" },
    basis:    { en: "How we bake",  ms: "Cara tempahan" },
    delivery: { en: "Delivery",     ms: "Penghantaran" },
    payment:  { en: "Payment",      ms: "Pembayaran" },
    halal:    { en: "Halal",        ms: "Halal" }
  }
};


/* --------------------------------------------------------------------------
   10. ORDER BUILDER WORDING
   -------------------------------------------------------------------------- */

const ORDER = {
  title:    { en: "Your order", ms: "Pesanan anda" },
  clear:    { en: "Clear",      ms: "Kosongkan" },
  total:    { en: "Total",      ms: "Jumlah" },
  empty: {
    en: "Nothing selected yet. Go to the menu and pick what you would like.",
    ms: "Belum ada pilihan. Pergi ke menu dan pilih apa yang anda mahu."
  },
  send:     { en: "Send order on WhatsApp", ms: "Hantar pesanan di WhatsApp" },
  review:   { en: "Review order",  ms: "Semak pesanan" },
  selected:    { en: "items selected", ms: "item dipilih" },
  selectedOne: { en: "item selected",  ms: "item dipilih" },
  add:      { en: "Add",    ms: "Tambah" },
  remove:   { en: "Remove", ms: "Kurangkan" },

  // The WhatsApp message itself.
  msgIntro: { en: "Hello! I would like to order:", ms: "Salam! Saya nak tempah:" },
  msgTotal: { en: "Total",     ms: "Jumlah" },
  msgName:  { en: "My name:",  ms: "Nama saya:" },
  msgWhen:  { en: "Collection or delivery date:", ms: "Tarikh ambil atau hantar:" },
  msgEmpty: { en: "Hello! I would like to ask about your bread.", ms: "Salam! Saya nak tanya pasal roti." }
};


/* --------------------------------------------------------------------------
   11. PARTNERS AND CREDITS                                  [E4] [E5] [F1]
   -------------------------------------------------------------------------- */

const PARTNERS = {
  intro: {
    en: "Established through a SULAM community programme",
    ms: "Ditubuhkan melalui program komuniti SULAM"
  },
  // [E5] Only CCE Sunway College is to be credited.
  marks: [
    { name: "Centre for Continuing Education", sub: "Sunway College" }
  ],
  // [E4] Confirmed to keep.
  sdgs: [
    { no: "1",  color: "#E5243B", label: { en: "No Poverty", ms: "Tiada Kemiskinan" } },
    { no: "8",  color: "#A21942", label: { en: "Decent Work and Economic Growth", ms: "Pekerjaan Wajar dan Pertumbuhan Ekonomi" } },
    { no: "12", color: "#BF8B2E", label: { en: "Responsible Consumption", ms: "Penggunaan Bertanggungjawab" } }
  ],
  sdgNote: {
    en: "Supporting the United Nations Sustainable Development Goals",
    ms: "Menyokong Matlamat Pembangunan Mampan Pertubuhan Bangsa-Bangsa Bersatu"
  }
};

const CREDITS = {
  title: { en: "Project credits", ms: "Penghargaan projek" },
  // [F1] Group members, from the MPU project proposal (section 4.0).
  lines: [
    { role:  { en: "Built by Diploma in Information Technology students",
               ms: "Dibina oleh pelajar Diploma Teknologi Maklumat" },
      names: "Mohammad Ali Mehdi Shirazi · Mohammad Danish Bin Zaidi · Shim Xin Yee · " +
             "Samantha Chok Zi Kay · Lau Jun Sin · Tan Xian Chuan · Edwin Tan Yong Shen · " +
             "Wana Ye Thwe · Jayden Ryan Jit Singh · San Jie Fung · Liew Khai Lik" },
    { role:  { en: "With",        ms: "Bersama" },
      names: "Ms. Norsafizar · Mr. Sairolazmi · Ms. Syamim" },
    { role:  { en: "Advised by",  ms: "Diselia oleh" },
      names: "Assoc. Prof. Dr. Yazilmiwati Yaacob · Mr. Mohamed Nadzri" }
  ]
};

const FOOTER = {
  credit: {
    en: "A SULAM community project · Kampung Sungai Judah × Centre for Continuing Education, Sunway College",
    ms: "Projek komuniti SULAM · Kampung Sungai Judah × Centre for Continuing Education, Sunway College"
  },
  colophon: { en: "Set in Fraunces and Archivo.", ms: "Menggunakan fon Fraunces dan Archivo." }
};
