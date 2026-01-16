import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import Reveal from "@/components/Reveal"
import Parallax from "@/components/Parallax"
import FilamentHeroVisual from "@/components/FilamentHeroVisual"
import ShimmerButton from "@/components/ShimmerButton"
import Catchphrase from "@/components/Catchphrase"
import GlassOrb from "@/components/GlassOrb"
import GlassCard from "@/components/GlassCard"
import MaterialSwatches, { type Swatch } from "@/components/MaterialSwatches"
import { normalizeLocale } from "@/lib/i18n/locales"
import { localizeHref } from "@/lib/i18n/paths"


const NL_METADATA: Metadata = {
  title: "3D printen in Belgie | X3DPrints Herzele",
  description:
    "Precisie 3D printen in Belgie en Vlaanderen. Snelle oplevering vanuit Herzele met advies over PLA, PETG, ABS/ASA, Nylon en PA-CF voor prototypes, displays en functionele onderdelen.",
  alternates: {
    canonical: "https://www.x3dprints.be/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/",
      en: "https://www.x3dprints.be/en",
    },
  },
  openGraph: {
    title: "X3DPrints - 3D print service in Belgie",
    description:
      "Van STL/STEP naar strakke 3D prints in Belgie. Lokale begeleiding, kortere doorlooptijd en duurzame afwerking voor projecten in Gent, Aalst en de rest van Vlaanderen.",
    url: "https://www.x3dprints.be/",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

export const EN_METADATA: Metadata = {
  title: "3D printing in Belgium | X3DPrints Herzele",
  description:
    "Precision 3D printing in Belgium and Flanders. Fast turnaround from Herzele with advice on PLA, PETG, ABS/ASA, Nylon and PA-CF for prototypes, displays and functional parts.",
  alternates: {
    canonical: "https://www.x3dprints.be/en",
    languages: {
      "nl-BE": "https://www.x3dprints.be/",
      en: "https://www.x3dprints.be/en",
    },
  },
  openGraph: {
    title: "X3DPrints - 3D print service in Belgium",
    description:
      "From STL/STEP to clean 3D prints in Belgium. Local guidance, shorter lead times and durable finishing for projects in Ghent, Aalst and across Flanders.",
    url: "https://www.x3dprints.be/en",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

export const metadata: Metadata = NL_METADATA

function getSeasonCta(date: Date, isEn: boolean) {
  const MS_IN_DAY = 86_400_000
  const isWithinWindow = (target: Date, daysBefore: number, daysAfter: number) => {
    const diff = target.getTime() - date.getTime()
    return diff <= daysAfter * MS_IN_DAY && diff >= -daysBefore * MS_IN_DAY
  }
  const getNthWeekday = (month: number, weekday: number, n: number) => {
    // month is 1-12, weekday 0=Sun..6=Sat
    const first = new Date(Date.UTC(date.getUTCFullYear(), month - 1, 1))
    const firstWeekday = first.getUTCDay()
    const offset = (weekday - firstWeekday + 7) % 7
    const day = 1 + offset + 7 * (n - 1)
    return new Date(Date.UTC(date.getUTCFullYear(), month - 1, day))
  }

  const month = date.getUTCMonth() + 1 // 1-12
  const day = date.getUTCDate()
  const after = (m: number, d: number) => month > m || (month === m && day >= d)
  const before = (m: number, d: number) => month < m || (month === m && day <= d)
  // Belgie: Moederdag = 2e zondag mei, Vaderdag = 2e zondag juni (uitgezonderd Antwerpen)
  const mothersDay = getNthWeekday(5, 0, 2)
  const fathersDay = getNthWeekday(6, 0, 2)

  const isValentijnWindow = (month === 1 && day >= 15) || (month === 2 && day <= 16)
  const isParentsWindow =
    isWithinWindow(mothersDay, 21, 1) || isWithinWindow(fathersDay, 21, 1) // 3 weken ervoor t/m dag zelf
  const isBackToSchoolWindow = month === 8 || month === 9
  if (isValentijnWindow) {
    return { label: isEn ? "Valentine gifts" : "Valentijn cadeaus", href: "/valentijn-3d-printen" }
  }
  if (isParentsWindow) {
    return { label: isEn ? "Mother's Day & Father's Day" : "Vaderdag & Moederdag", href: "/blog/3d-printen-vaderdag-moederdag" }
  }
  if (isBackToSchoolWindow) {
    return { label: "Back to School", href: "/blog/3d-printen-back-to-school" }
  }
  if (after(11, 11) || before(2, 10)) {
    return { label: isEn ? "Winter & holidays" : "Winter, Kerst & Nieuwjaar", href: "/blog/3d-printen-winter-kerst-nieuwjaar" }
  }
  if (after(2, 11) && before(5, 10)) {
    return { label: isEn ? "Spring & Easter" : "Lente & Pasen", href: "/blog/3d-printen-lente-pasen" }
  }
  if (after(5, 11) && before(9, 10)) {
    return { label: isEn ? "Summer decor" : "Zomer decor", href: "/blog/3d-printen-zomer" }
  }
  return { label: isEn ? "Autumn & Halloween" : "Herfst & Halloween", href: "/blog/3d-printen-herfst-halloween" }
}

const HOME_COPY_NL = {
  hero: {
    badge: "Lokale 3D print service in Vlaanderen",
    catchphrase: "3D printen voor Gent, Aalst en Vlaanderen",
    title: "Belgische 3D prints op maat vanuit Herzele.",
    subtitle: "Engineeringkwaliteit, transparante prijzen en korte lijnen",
    intro:
      "X3DPrints is een Belgische 3D-printstudio uit Herzele, vlak bij Gent. We begeleiden makers, engineers en bedrijven door elke stap van hun 3D printproject in Belgie: van STL/STEP-check en materiaaladvies tot verzending. Als eenpersoonsstudio plannen we in samenspraak, meestal binnen enkele werkdagen afhankelijk van complexiteit en planning.",
    ctas: {
      quote: "Offerte aanvragen",
      consumerAdvice: "Particulieren advies",
      segments: "Segmenten",
      knowledge: "Kennisbank",
      guide: "3D printen gids",
      tool: "Material Suggestion Tool (retail & hobby)",
    },
  },
  heroStats: [
    { label: "Tolerantie", value: "0,2 mm" },
    { label: "Doorlooptijd", value: "Enkele werkdagen (in overleg)" },
    { label: "Bouwvolume", value: "Tot 35 x 32 x 35 cm" },
  ],
  local: {
    kicker: "Lokaal & 100% Belgisch",
    title: "Herzeelse handelaar, verankerd in Vlaanderen.",
    bodyStart:
      "We produceren in Herzele en leveren in Vlaanderen. Als lid van de Werkgroep Ondernemend Herzele werken we met Belgische partners, transparante prijzen en korte lijnen. Betalen kan ook met de ",
    linkLabel: "Herzeelse Euro (Heuro)",
    bodyEnd: ".",
    ctas: {
      primary: "Bekijk onze lokale aanpak",
      secondary: "Gemeente Herzele",
    },
  },
  about: {
    title: "Over X3DPrints",
    body1:
      "Eenpersoonsstudio in bijberoep. Je schakelt een Belgische 3D print service in met rechtstreeks contact met de maker die ook produceert, test en afwerkt. Geen tickets of callcenters, wel korte lijnen, duidelijke afspraken en onderdelen die passen.",
    body2:
      "Actief in regio Gent, Aalst, Geraardsbergen en Oudenaarde. Van functionele prototypes en kleine series tot winkelmateriaal, gepersonaliseerde cadeaus en maatwerk. Zo leveren we 3D prints voor Vlaanderen die perfect aansluiten bij jouw toepassing.",
    ctas: {
      services: "Diensten",
      materials: "Materialen",
    },
  },
  segments: {
    title: "Voor wie we printen",
    body:
      "Geen one-size-fits-all. We printen wat jij nodig hebt en denken mee over materiaal en geometrie. Zo maak je gebruik van een lokale 3D print service in Belgie en Vlaanderen die mee bouwt aan jouw product.",
    cards: [
      {
        title: "Particulieren",
        items: [
          "Gepersonaliseerde cadeaus en naamplaatjes",
          "Decor & design: vazen, lampenkappen, interieurstukken",
          "Unieke accessoires en mini-sculpturen",
        ],
      },
      {
        title: "Bedrijven",
        items: [
          "Etalage- en winkelmateriaal, displays en houders",
          "Bedrijfscadeaus en promotieartikelen",
          "Prototyping, jigs, fixtures en kleine series",
        ],
      },
    ],
    ctas: {
      gallery: "Galerij bekijken",
      start: "Start je Belgisch 3D printproject",
    },
    tags: ["Retail & marketing props", "Tabletop & hobby runs", "Particulieren prints"],
  },
  personalization: {
    title: "Personalisatie",
    body:
      "Maak je ontwerp persoonlijk met namen, initialen of een korte boodschap. Unieke geschenken, herkenbare interieurelementen en items met karakter, rechtstreeks 3D geprint in Belgie.",
    steps: [
      {
        title: "Kies ontwerp",
        description: "Vertrek van een bestaand model of een eenvoudige schets.",
      },
      {
        title: "Personaliseer",
        description: "Voeg tekst, logo of specifieke maatvoering toe.",
      },
      {
        title: "Wij printen",
        description: "Nette afwerking en levering binnen enkele werkdagen.",
      },
    ],
  },
  materials: {
    title: "Materialen, kleuren & afwerking",
    body:
      "PLA voor strakke details en nette afwerking. Voor sterkte, UV of hitte schakelen we naar PETG, PC, ABS/ASA, Nylon (PA) of PA-CF. Afwerking kan rauw, geschuurd, geprimed of gelakt. Hieronder een greep uit wat we vaak printen in Belgie",
    linkLabel: "Alle varianten bekijken",
    cardLinkLabel: "Alle kleuren & varianten",
    spotlight: [
      {
        title: "PLA Matte (standaard)",
        blurb:
          "Mat oppervlak met strakke details. Ideaal voor prototypes en nette visuele stukken die lokaal worden geprint.",
        swatches: [
          { label: "Zwart", fill: "#0a0a0a", inStock: true },
          { label: "Wit", fill: "#ffffff", inStock: true },
          { label: "Blauw", fill: "#2563eb", inStock: true },
          { label: "Geel", fill: "#facc15", inStock: true },
          { label: "Groen", fill: "#16a34a", inStock: true },
          { label: "Rood", fill: "#dc2626", inStock: true },
          { label: "Grijs", fill: "#9ca3af" },
          { label: "Oranje", fill: "#fb923c" },
        ],
      },
      {
        title: "PLA Wood & Marble",
        blurb: "Decoratieve texturen met hout- of marmerlook. Voor props, decor en premium accenten in Belgie.",
        swatches: [
          { label: "Wood Brown", fill: "linear-gradient(90deg,#7c5e3c,#6a4f33,#7c5e3c)", inStock: true },
          { label: "Marble Grey", fill: "linear-gradient(135deg,#d6d3d1,#9ca3af 55%,#e7e5e4)", inStock: true },
          { label: "Marble White", fill: "linear-gradient(135deg,#f3f4f6,#d1d5db 55%,#f9fafb)" },
        ],
      },
      {
        title: "PETG",
        blurb:
          "Tougher dan PLA, licht flexibel en beter bestand tegen warmte en chemie. Voor functionele onderdelen die tegen een stoot kunnen.",
        swatches: [
          { label: "Geel", fill: "#FFD00B", inStock: true },
          { label: "Oranje", fill: "#F75403", inStock: true },
          { label: "Groen", fill: "#00AE42", inStock: true },
          { label: "Rood", fill: "#EB3A3A", inStock: true },
          { label: "Blauw", fill: "#002E96", inStock: true },
          { label: "Zwart", fill: "#000000", inStock: true },
          { label: "Wit", fill: "#FFFFFF", inStock: true },
          { label: "Transparant", fill: "linear-gradient(180deg,#E6FBFFC0,#E6FBFF50)", inStock: true },
          { label: "Cream", fill: "#F9DFB9", inStock: true },
          { label: "Lime Green", fill: "#6EE53C", inStock: true },
          { label: "Forest Green", fill: "#39541A", inStock: true },
          { label: "Lake Blue", fill: "#1F79E5", inStock: true },
          { label: "Peanut Brown", fill: "#875718", inStock: true },
          { label: "Grijs", fill: "#ADB1B2", inStock: true },
          { label: "Donkergrijs", fill: "#515151", inStock: true },
        ],
      },
      {
        title: "PC (Polycarbonaat)",
        blurb:
          "Voor onderdelen die continu zon, olie of hitte zien. PC blijft strak tot ongeveer 110 graden en vraagt wel 8u drogen maar levert premium functionaliteit.",
        swatches: [
          { label: "Transparant", fill: "linear-gradient(180deg,#E6FBFFC0,#E6FBFF50)", inStock: true },
          { label: "Helder Zwart", fill: "linear-gradient(180deg,#1b1b1f,#050505)", inStock: true },
          { label: "Zwart", fill: "#000000", inStock: true },
        ],
      },
      {
        title: "TPU",
        blurb:
          "Flexibel en slijtvast. Ideaal voor grips, bumpers en demping. Trager te printen, maar perfect voor duurzame toepassingen.",
        swatches: [{ label: "Zwart", fill: "#000000", inStock: true }],
      },
      {
        title: "Meer varianten op bestelling",
        blurb:
          "Silk, Translucent, Galaxy, Metal, Glow, PLA-CF, Aero, Basic Gradient en meer. Vraag advies voor jouw Belgische 3D print.",
        swatches: [
          { label: "Silk Gold", fill: "linear-gradient(90deg,#a36f00,#f3d36b,#a36f00)" },
          { label: "Translucent Aqua", fill: "linear-gradient(180deg,#7ae5ffc0,#7ae5ff50)" },
          { label: "Galaxy", fill: "radial-gradient(circle at 35% 40%,#6366f1,transparent 45%),#0b1020" },
          { label: "Metal Steel", fill: "linear-gradient(90deg,#c5ccd4,#8e9aa6,#c5ccd4)" },
          { label: "Glow Green", fill: "#00ff7b" },
          { label: "PLA-CF", fill: "linear-gradient(135deg,#0f172a,#1f2937)" },
        ],
      },
    ],
  },
  printables: {
    kicker: "Nog geen ontwerp",
    body:
      "Browse de Printables.com bibliotheek voor kant-en-klare modellen en stuur de link door. Wij checken licentie, schaal en materiaal en printen het lokaal in Belgie.",
    ctaPrimary: "Stuur je Printables link",
    ctaSecondary: "Open Printables.com",
  },
  pla: {
    title: "Waarom we vaak voor PLA kiezen",
    body:
      "PLA combineert nette afwerking met een brede kleurkeuze en prettige printbaarheid. Het is industrieel composteerbaar, niet-toxisch en geschikt voor veel decoratieve en functionele toepassingen.",
    cards: [
      {
        title: "Duurzaamheid",
        description: "Gemaakt uit hernieuwbare grondstoffen (bv. mais, suikerriet).",
      },
      {
        title: "Veiligheid",
        description: "Niet-toxisch en zonder scherpe dampen bij normaal gebruik.",
      },
      {
        title: "Afwerking",
        description: "Strakke details en levendige kleuren.",
      },
      {
        title: "Toepassing",
        description: "Geschikt voor decor, prototypes en lichte functionele onderdelen.",
      },
      {
        title: "Klantvriendelijk",
        description: "Licht, stevig genoeg en betaalbaar.",
      },
    ],
    note:
      "Let op bij voedselcontact: reinig grondig, vermijd hitte en overweeg gecertificeerde alternatieven indien food-safe essentieel is.",
  },
  pricing: {
    title: "Prijzen & levering",
    body:
      "Transparante tarieven op basis van complexiteit, afmetingen, materiaal en afwerking. We communiceren vooraf over planning en oplevering en helpen je kiezen wat het beste werkt voor jouw 3D print in Belgie.",
    cards: [
      {
        title: "Prijsopbouw",
        description:
          "Materiaal, printtijd, afwerking en eventuele montage. We denken mee over optimalisatie voor Belgisch 3D printen.",
      },
      {
        title: "Levertijd",
        description: "We mikken op oplevering binnen enkele werkdagen; spoed kan in overleg voor klanten in Belgie.",
      },
      {
        title: "Verzending/afhalen",
        description: "Verzending in BE of afhalen in regio Herzele/Gent.",
      },
    ],
    ctas: {
      pricing: "Prijzen bekijken",
      request: "Vraag je print aan",
    },
  },
  closing: {
    title: "Klaar om te 3D printen",
    body:
      "Stuur je model door en je krijgt snel een heldere prijs met het beste materiaaladvies voor jouw toepassing, rechtstreeks van een Belgische 3D print partner.",
    ctas: {
      quote: "Offerte aanvragen",
      gallery: "Galerij bekijken",
    },
  },
  faq: [
    {
      q: "Welke bestanden kan ik uploaden?",
      a: "STL en STEP zijn ideaal. Voeg toepassing, gewenste afwerking en eventuele toleranties toe voor het beste resultaat.",
    },
    {
      q: "Welke levertijd mag ik verwachten?",
      a: "Vaak enkele werkdagen, afhankelijk van planning, materiaal en eventuele nabewerking. We stemmen de planning samen af.",
    },
    {
      q: "Wat is het maximale bouwvolume?",
      a: "Tot 20 x 20 x 20 cm per stuk in een geheel. Groter kan door onderdelen te splitsen en te monteren.",
    },
    {
      q: "Is PLA geschikt voor voedselcontact?",
      a: "PLA is niet-toxisch, maar geprinte oppervlakken bevatten micro-porien. Gebruik alleen met zorg, reinig grondig en vermijd hitte. Vraag naar alternatieven als food-safe cruciaal is.",
    },
  ],
}

const HOME_COPY_EN = {
  hero: {
    badge: "Local 3D print service in Flanders",
    catchphrase: "3D printing for Ghent, Aalst and Flanders",
    title: "Custom 3D prints from Herzele, Belgium.",
    subtitle: "Engineering-grade output, transparent pricing and direct communication",
    intro:
      "X3DPrints is a Belgian 3D printing studio in Herzele, near Ghent. We guide makers, engineers and businesses through every step of a 3D print project in Belgium: from STL/STEP checks and material advice to shipping. As a one-person studio, we plan together and deliver in a few business days depending on complexity and schedule.",
    ctas: {
      quote: "Request a quote",
      consumerAdvice: "Advice for individuals",
      segments: "Segments",
      knowledge: "Knowledge base",
      guide: "3D printing guide",
      tool: "Material Suggestion Tool (retail & hobby)",
    },
  },
  heroStats: [
    { label: "Tolerance", value: "0.2 mm" },
    { label: "Lead time", value: "A few business days (by agreement)" },
    { label: "Build volume", value: "Up to 35 x 32 x 35 cm" },
  ],
  local: {
    kicker: "Local & 100% Belgian",
    title: "Herzele-based, rooted in Flanders.",
    bodyStart:
      "We produce in Herzele and deliver across Flanders. As a member of the Werkgroep Ondernemend Herzele we work with Belgian partners, transparent pricing and direct communication. You can also pay with the ",
    linkLabel: "Herzele Euro (Heuro)",
    bodyEnd: ".",
    ctas: {
      primary: "See our local approach",
      secondary: "Municipality of Herzele",
    },
  },
  about: {
    title: "About X3DPrints",
    body1:
      "One-person studio (part-time). You work directly with the maker who prints, tests and finishes every part. No tickets or call centers, just direct communication, clear commitments and parts that fit.",
    body2:
      "Active in the Ghent, Aalst, Geraardsbergen and Oudenaarde region. From functional prototypes and small series to retail props, personalized gifts and custom parts. We deliver 3D prints for Flanders that fit your use case.",
    ctas: {
      services: "Services",
      materials: "Materials",
    },
  },
  segments: {
    title: "Who we print for",
    body:
      "No one-size-fits-all. We print what you need and think along on material and geometry. That means a local 3D print service in Belgium and Flanders that helps build your product.",
    cards: [
      {
        title: "Individuals",
        items: [
          "Personalized gifts and nameplates",
          "Decor & design: vases, lampshades, interior pieces",
          "Unique accessories and mini sculptures",
        ],
      },
      {
        title: "Businesses",
        items: [
          "Retail and window displays, holders and fixtures",
          "Corporate gifts and promo items",
          "Prototyping, jigs, fixtures and small series",
        ],
      },
    ],
    ctas: {
      gallery: "View gallery",
      start: "Start your Belgian 3D print project",
    },
    tags: ["Retail & marketing props", "Tabletop & hobby runs", "Consumer prints"],
  },
  personalization: {
    title: "Personalization",
    body:
      "Make your design personal with names, initials or a short message. Unique gifts, recognizable interior elements and characterful items, 3D printed locally in Belgium.",
    steps: [
      {
        title: "Pick a design",
        description: "Start from an existing model or a simple sketch.",
      },
      {
        title: "Personalize",
        description: "Add text, logo or specific dimensions.",
      },
      {
        title: "We print",
        description: "Clean finishing and delivery within a few business days.",
      },
    ],
  },
  materials: {
    title: "Materials, colors & finishing",
    body:
      "PLA for clean detail and tidy finishing. For strength, UV or heat we move to PETG, PC, ABS/ASA, Nylon (PA) or PA-CF. Finishing can be raw, sanded, primed or painted. Below is a selection of what we often print in Belgium",
    linkLabel: "View all variants",
    cardLinkLabel: "All colors & variants",
    spotlight: [
      {
        title: "PLA Matte (standard)",
        blurb:
          "Matte surface with crisp detail. Ideal for prototypes and clean visual pieces printed locally.",
        swatches: [
          { label: "Black", fill: "#0a0a0a", inStock: true },
          { label: "White", fill: "#ffffff", inStock: true },
          { label: "Blue", fill: "#2563eb", inStock: true },
          { label: "Yellow", fill: "#facc15", inStock: true },
          { label: "Green", fill: "#16a34a", inStock: true },
          { label: "Red", fill: "#dc2626", inStock: true },
          { label: "Gray", fill: "#9ca3af" },
          { label: "Orange", fill: "#fb923c" },
        ],
      },
      {
        title: "PLA Wood & Marble",
        blurb: "Decorative textures with wood or marble look. For props, decor and premium accents in Belgium.",
        swatches: [
          { label: "Wood Brown", fill: "linear-gradient(90deg,#7c5e3c,#6a4f33,#7c5e3c)", inStock: true },
          { label: "Marble Grey", fill: "linear-gradient(135deg,#d6d3d1,#9ca3af 55%,#e7e5e4)", inStock: true },
          { label: "Marble White", fill: "linear-gradient(135deg,#f3f4f6,#d1d5db 55%,#f9fafb)" },
        ],
      },
      {
        title: "PETG",
        blurb:
          "Tougher than PLA, slightly flexible and more resistant to heat and chemicals. For functional parts that take a hit.",
        swatches: [
          { label: "Yellow", fill: "#FFD00B", inStock: true },
          { label: "Orange", fill: "#F75403", inStock: true },
          { label: "Green", fill: "#00AE42", inStock: true },
          { label: "Red", fill: "#EB3A3A", inStock: true },
          { label: "Blue", fill: "#002E96", inStock: true },
          { label: "Black", fill: "#000000", inStock: true },
          { label: "White", fill: "#FFFFFF", inStock: true },
          { label: "Transparent", fill: "linear-gradient(180deg,#E6FBFFC0,#E6FBFF50)", inStock: true },
          { label: "Cream", fill: "#F9DFB9", inStock: true },
          { label: "Lime Green", fill: "#6EE53C", inStock: true },
          { label: "Forest Green", fill: "#39541A", inStock: true },
          { label: "Lake Blue", fill: "#1F79E5", inStock: true },
          { label: "Peanut Brown", fill: "#875718", inStock: true },
          { label: "Gray", fill: "#ADB1B2", inStock: true },
          { label: "Dark Gray", fill: "#515151", inStock: true },
        ],
      },
      {
        title: "PC (Polycarbonate)",
        blurb:
          "For parts exposed to sun, oil or heat. PC stays stable up to around 110C and requires drying, but delivers premium performance.",
        swatches: [
          { label: "Transparent", fill: "linear-gradient(180deg,#E6FBFFC0,#E6FBFF50)", inStock: true },
          { label: "Clear Black", fill: "linear-gradient(180deg,#1b1b1f,#050505)", inStock: true },
          { label: "Black", fill: "#000000", inStock: true },
        ],
      },
      {
        title: "TPU",
        blurb:
          "Flexible and wear-resistant. Ideal for grips, bumpers and damping. Slower to print, but perfect for durable use.",
        swatches: [{ label: "Black", fill: "#000000", inStock: true }],
      },
      {
        title: "More variants on request",
        blurb:
          "Silk, Translucent, Galaxy, Metal, Glow, PLA-CF, Aero, Basic Gradient and more. Ask for advice for your Belgian 3D print.",
        swatches: [
          { label: "Silk Gold", fill: "linear-gradient(90deg,#a36f00,#f3d36b,#a36f00)" },
          { label: "Translucent Aqua", fill: "linear-gradient(180deg,#7ae5ffc0,#7ae5ff50)" },
          { label: "Galaxy", fill: "radial-gradient(circle at 35% 40%,#6366f1,transparent 45%),#0b1020" },
          { label: "Metal Steel", fill: "linear-gradient(90deg,#c5ccd4,#8e9aa6,#c5ccd4)" },
          { label: "Glow Green", fill: "#00ff7b" },
          { label: "PLA-CF", fill: "linear-gradient(135deg,#0f172a,#1f2937)" },
        ],
      },
    ],
  },
  printables: {
    kicker: "No design yet",
    body:
      "Browse the Printables.com library for ready-to-print models and send the link. We check license, scale and material and print locally in Belgium.",
    ctaPrimary: "Send your Printables link",
    ctaSecondary: "Open Printables.com",
  },
  pla: {
    title: "Why we often pick PLA",
    body:
      "PLA combines clean finishing with a wide color range and predictable printability. It is industrially compostable, non-toxic and suitable for many decorative and functional applications.",
    cards: [
      {
        title: "Sustainability",
        description: "Made from renewable feedstocks (e.g. corn, sugarcane).",
      },
      {
        title: "Safety",
        description: "Non-toxic and without harsh fumes in normal use.",
      },
      {
        title: "Finish",
        description: "Crisp detail and vivid colors.",
      },
      {
        title: "Use cases",
        description: "Suitable for decor, prototypes and light functional parts.",
      },
      {
        title: "Customer-friendly",
        description: "Lightweight, strong enough and affordable.",
      },
    ],
    note:
      "Food contact note: clean thoroughly, avoid heat and consider certified alternatives if food-safe is essential.",
  },
  pricing: {
    title: "Pricing & delivery",
    body:
      "Transparent rates based on complexity, size, material and finishing. We align on schedule up front and help you choose what works best for your 3D print in Belgium.",
    cards: [
      {
        title: "Pricing breakdown",
        description: "Material, print time, finishing and any assembly. We help optimize for Belgian 3D printing.",
      },
      {
        title: "Lead time",
        description: "We aim for delivery within a few business days; rush is possible by agreement in Belgium.",
      },
      {
        title: "Shipping/pickup",
        description: "Shipping within BE or pickup in the Herzele/Ghent region.",
      },
    ],
    ctas: {
      pricing: "See pricing",
      request: "Request your print",
    },
  },
  closing: {
    title: "Ready to 3D print?",
    body:
      "Send your model and you will get a clear price with the best material advice for your use case, directly from a Belgian 3D print partner.",
    ctas: {
      quote: "Request a quote",
      gallery: "View gallery",
    },
  },
  faq: [
    {
      q: "Which files can I upload?",
      a: "STL and STEP are ideal. Add the use case, desired finish and any tolerances for the best result.",
    },
    {
      q: "What lead time can I expect?",
      a: "Often a few business days, depending on schedule, material and any post-processing. We align the planning together.",
    },
    {
      q: "What is the maximum build volume?",
      a: "Up to 20 x 20 x 20 cm per piece as a single part. Larger is possible by splitting and assembling.",
    },
    {
      q: "Is PLA suitable for food contact?",
      a: "PLA is non-toxic, but printed surfaces contain micro-pores. Use with care, clean thoroughly and avoid heat. Ask for alternatives if food-safe is critical.",
    },
  ],
}

export default function HomePage({ searchParams }: { searchParams?: { lang?: string } }) {
  const locale = normalizeLocale(searchParams?.lang)
  const isEn = locale === "en"
  const localize = (href: string) => localizeHref(href, locale)
  const copy = isEn ? HOME_COPY_EN : HOME_COPY_NL
  const seasonCta = getSeasonCta(new Date(), isEn)
  function icon(shape: ReactNode) {
    return (
      <svg
        aria-hidden
        className="mb-2 h-6 w-6 text-indigo-600"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        {shape}
      </svg>
    )
  }
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  }

  return (
    <main className="relative">
      {/* Decorative background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(99,102,241,.18),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.07]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-gradient-to-b from-white via-white/80 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-32 -z-10 hidden h-80 w-80 rounded-full bg-gradient-to-br from-indigo-300/40 via-purple-300/30 to-transparent blur-3xl sm:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 bottom-10 -z-10 hidden h-64 w-64 rounded-full bg-gradient-to-tl from-emerald-200/40 via-sky-200/30 to-transparent blur-2xl md:block"
      />

      {/* HERO */}
      <section className="relative px-6 pb-24 pt-20 sm:px-8 lg:px-12 lg:pb-32 lg:pt-28">
        <Parallax
          mode="page"
          range={520}
          offset={260}
          className="pointer-events-none absolute right-16 top-8 -z-10 hidden lg:block"
        >
          <FilamentHeroVisual className="h-[23rem] w-[23rem] opacity-70 dark:opacity-50" />
        </Parallax>
        <div className="mx-auto max-w-6xl">
          <Reveal className="max-w-3xl stacked-content">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100/80 bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              {copy.hero.badge}
            </span>
            <Catchphrase className="mt-4 block text-base font-semibold text-indigo-600 sm:text-lg">
              {copy.hero.catchphrase}
            </Catchphrase>
            <h1 className="mt-2 text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              {copy.hero.title}
            </h1>
            <p className="mt-3 text-balance text-lg font-semibold text-slate-700">
              {copy.hero.subtitle}
            </p>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-slate-600 sm:text-lg">
              {copy.hero.intro}
            </p>
            <div className="stacked-actions mt-10 flex flex-wrap items-center gap-3 justify-center sm:justify-start">
              <ShimmerButton href={localize("/contact")}>{copy.hero.ctas.quote}</ShimmerButton>
              <Link
                href={localize("/contact?material=PLA_MATTE")}
                className="inline-flex items-center gap-2 rounded-xl border border-indigo-100/70 bg-indigo-50/80 px-5 py-3 text-sm font-semibold text-indigo-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-50"
              >
                {copy.hero.ctas.consumerAdvice}
              </Link>
              <Link
                href={localize("/segments")}
                className="inline-flex items-center gap-2 rounded-xl border border-indigo-100/70 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-white"
              >
                {copy.hero.ctas.segments}
              </Link>
              <Link
                href={localize("/blog")}
                className="inline-flex items-center gap-2 rounded-xl border border-indigo-100/70 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-white"
              >
                {copy.hero.ctas.knowledge}
              </Link>
              <Link
                href={localize("/3d-printen")}
                className="inline-flex items-center gap-2 rounded-xl border border-indigo-100/70 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-white"
              >
                {copy.hero.ctas.guide}
              </Link>
              <Link
                href={localize("/materials#material-suggestion-tool")}
                className="inline-flex items-center gap-2 rounded-xl border border-indigo-100/70 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-white"
              >
                {copy.hero.ctas.tool}
              </Link>
              <Link
                href={localize(seasonCta.href)}
                className="inline-flex items-center gap-2 rounded-xl border border-indigo-100/70 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-white"
              >
                {seasonCta.label}
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-16 grid gap-6 sm:grid-cols-3">
            {[
              {
                ...copy.heroStats[0],
                icon: icon(<path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 12h16M4 16h16" />),
              },
              {
                ...copy.heroStats[1],
                icon: icon(
                  <>
                    <circle cx={12} cy={12} r={9} />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l2 2" />
                  </>
                ),
              },
              {
                ...copy.heroStats[2],
                icon: icon(
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 16V8l-9-5-9 5v8l9 5 9-5ZM12 3v18M3 8l9 4 9-4"
                  />
                ),
              },
            ].map((item) => (
            <GlassCard
              key={item.label}
              className="group border-white/40 bg-gradient-to-br from-white/80 to-white/40 p-5 text-center shadow-lg ring-1 ring-white/60 transition-transform hover:-translate-y-1 dark:border-[#0F203C] dark:bg-[radial-gradient(140%_140%_at_20%_10%,rgba(0,230,255,0.08),transparent),radial-gradient(120%_120%_at_80%_0%,rgba(215,38,61,0.07),transparent),#0B0F1A] dark:ring-0 dark:shadow-[0_18px_50px_rgba(0,0,0,0.55),0_0_0_1px_rgba(0,230,255,0.15)]"
            >
              <div className="flex items-center justify-center text-indigo-600 dark:text-[#00E6FF]">
                {item.icon}
              </div>
              <div className="text-sm font-medium text-slate-500 dark:text-slate-100">{item.label}</div>
              <div className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">{item.value}</div>
            </GlassCard>
            ))}
          </Reveal>
        </div>
      </section>

      {/* LOKAAL */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="border-white/40 bg-gradient-to-br from-white/85 to-white/60 p-6 shadow-lg ring-1 ring-white/60">
              <div className="grid gap-4 sm:grid-cols-[1.2fr_.8fr] sm:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">{copy.local.kicker}</p>
                  <h2 className="mt-1 text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    {copy.local.title}
                  </h2>
                  <p className="mt-2 text-sm text-slate-700 sm:text-base">
                    {copy.local.bodyStart}
                    <Link
                      href="https://www.herzele.be/heuro"
                      target="_blank"
                      rel="noreferrer"
                      prefetch={false}
                      className="font-semibold text-indigo-700 underline decoration-indigo-200 hover:decoration-indigo-500"
                    >
                      {copy.local.linkLabel}
                    </Link>
                    {copy.local.bodyEnd}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <ShimmerButton href={localize("/lokaal-belgisch")}>{copy.local.ctas.primary}</ShimmerButton>
                    <Link
                      href="https://www.herzele.be"
                      target="_blank"
                      rel="noreferrer"
                      prefetch={false}
                      className="inline-flex items-center gap-2 rounded-xl border border-indigo-100/70 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-white"
                    >
                      {copy.local.ctas.secondary}
                    </Link>
                  </div>
                </div>
                <div className="justify-self-end">
                  <GlassOrb className="h-36 w-36 opacity-70" />
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* ABOUT */}
      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid items-center gap-12 sm:grid-cols-[1.2fr_.8fr]">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{copy.about.title}</h2>
              <p className="mt-3 text-slate-600">
                {copy.about.body1}
              </p>
              <p className="mt-3 text-slate-600">
                {copy.about.body2}
              </p>
              
              <div className="mt-6 flex gap-3">
                <Link
                  href={localize("/services")}
                  className="rounded-xl border border-indigo-100/70 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-white"
                >
                  {copy.about.ctas.services}
                </Link>
                <Link
                  href={localize("/materials")}
                  className="rounded-xl border border-indigo-100/70 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-white"
                >
                  {copy.about.ctas.materials}
                </Link>
              </div>
            </div>
            <div className="justify-self-end">
              <Image src="/Logo.webp" alt="X3DPrints logo" width={220} height={220} className="opacity-90" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* SEGMENTEN: particulieren vs. bedrijven */}
      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{copy.segments.title}</h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              {copy.segments.body}
            </p>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {copy.segments.cards.map((card, index) => (
              <GlassCard
                key={card.title}
                className="group border-white/40 bg-gradient-to-br from-white/80 to-white/40 p-6 shadow-lg ring-1 ring-white/60 transition-transform hover:-translate-y-1"
              >
                {index === 0
                  ? icon(<circle cx={12} cy={12} r={9} />)
                  : icon(<rect x={4} y={4} width={16} height={16} rx={2} />)}
                <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
                  {card.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={localize("/portfolio")}
              className="inline-flex items-center rounded-xl border border-indigo-100/70 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-white"
            >
              {copy.segments.ctas.gallery}
            </Link>
            <Link
              href={localize("/contact")}
              className="inline-flex items-center gap-2 rounded-xl border border-indigo-200/60 bg-indigo-50/60 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-white"
            >
              {copy.segments.ctas.start}
            </Link>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href={localize("/segments/3d-printing-marketing")}
              className="inline-flex items-center gap-2 rounded-full border border-indigo-100/70 bg-white/60 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-white"
            >
              {copy.segments.tags[0]}
            </Link>
            <Link
              href={localize("/segments/3d-printing-tabletop")}
              className="inline-flex items-center gap-2 rounded-full border border-indigo-100/70 bg-white/60 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-white"
            >
              {copy.segments.tags[1]}
            </Link>
            <Link
              href={localize("/segments/3d-printing-makers")}
              className="inline-flex items-center gap-2 rounded-full border border-indigo-100/70 bg-white/60 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-white"
            >
              {copy.segments.tags[2]}
            </Link>
          </div>
        </div>
      </section>

      {/* PERSONALISATIE */}
      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{copy.personalization.title}</h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              {copy.personalization.body}
            </p>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-3">
            {copy.personalization.steps.map((step, index) => (
              <Reveal key={step.title} delay={0.05 * (index + 1)}>
                <GlassCard className="group border-white/40 bg-gradient-to-br from-white/80 to-white/40 p-5 shadow-lg ring-1 ring-white/60 transition-transform hover:-translate-y-1">
                  {index === 0 && icon(<polygon points="12 3 21 18 3 18" />)}
                  {index === 1 && icon(<path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16M4 12h16M4 20h16" />)}
                  {index === 2 && icon(<path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v16H4z" />)}
                  <div className="text-base font-semibold text-slate-900">{step.title}</div>
                  <div className="mt-1 text-sm text-slate-600">{step.description}</div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MATERIALEN (homepage spotlight in dezelfde stijl) */}
      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {copy.materials.title}
            </h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              {copy.materials.body}{" "}
              <Link href={localize("/materials")} className="underline decoration-slate-300 hover:decoration-slate-500">
                {copy.materials.linkLabel}
              </Link>
              .
            </p>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {copy.materials.spotlight.map((material) => (
              <Reveal key={material.title}>
                <GlassCard className="group border-white/40 bg-gradient-to-br from-white/80 to-white/40 p-5 shadow-lg ring-1 ring-white/60 transition-transform hover:-translate-y-1">
                  <div className="text-base font-semibold text-slate-900">{material.title}</div>
                  <p className="mt-1 text-sm text-slate-600">{material.blurb}</p>
                  <MaterialSwatches colors={material.swatches as Swatch[]} />
                  <Link
                    href={localize("/materials")}
                    className="mt-3 inline-block text-xs font-medium text-slate-700 underline decoration-slate-300 hover:decoration-slate-500"
                  >
                    {copy.materials.cardLinkLabel}
                  </Link>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRINTABLES CALL-TO-ACTION (lager op de pagina) */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="border-white/50 bg-gradient-to-br from-white/85 to-white/60 p-5 shadow-lg ring-1 ring-white/60">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">{copy.printables.kicker}</p>
                  <p className="mt-1 text-sm text-slate-700 sm:text-base">
                    {copy.printables.body}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <ShimmerButton href={localize("/contact?source=printables")}>{copy.printables.ctaPrimary}</ShimmerButton>
                  <Link
                    href="https://www.printables.com/"
                    target="_blank"
                    rel="noreferrer"
                    prefetch={false}
                    className="inline-flex items-center gap-2 rounded-xl border border-indigo-100/70 bg-white/70 px-4 py-2.5 text-sm font-semibold text-indigo-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                  >
                    {copy.printables.ctaSecondary}
                  </Link>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* WAAROM PLA (compact) */}
      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{copy.pla.title}</h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              {copy.pla.body}
            </p>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {copy.pla.cards.map((card, index) => (
              <Reveal key={card.title} delay={0.05 * (index + 1)}>
                <GlassCard className="group border-white/40 bg-gradient-to-br from-white/80 to-white/40 p-6 shadow-lg ring-1 ring-white/60 transition-transform hover:-translate-y-1">
                  {index === 0 &&
                    icon(
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 2C7 2 4 6 4 10c0 6 8 12 8 12s8-6 8-12c0-4-3-8-8-8Zm0 0v10"
                      />
                    )}
                  {index === 1 &&
                    icon(
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 2 4 5v6c0 5 3.6 9.4 8 11 4.4-1.6 8-6 8-11V5l-8-3Z"
                      />
                    )}
                  {index === 2 &&
                    icon(
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5L12 3z"
                      />
                    )}
                  {index === 3 &&
                    icon(
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 16V8l-9-5-9 5v8l9 5 9-5ZM12 3v18M3 8l9 4 9-4"
                      />
                    )}
                  {index === 4 && icon(<path strokeLinecap="round" strokeLinejoin="round" d="M8 14s2 2 4 2 4-2 4-2" />)}
                  <div className="text-base font-semibold text-slate-900">{card.title}</div>
                  <div className="mt-1 text-sm text-slate-600">{card.description}</div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-500">{copy.pla.note}</p>
        </div>
      </section>

      {/* PRIJZEN & LEVERING */}
      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{copy.pricing.title}</h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              {copy.pricing.body}
            </p>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {copy.pricing.cards.map((card, index) => (
              <Reveal key={card.title} delay={0.05 * (index + 1)}>
                <GlassCard className="group border-white/40 bg-gradient-to-br from-white/80 to-white/40 p-6 shadow-lg ring-1 ring-white/60 transition-transform hover:-translate-y-1">
                  {index === 0 && icon(<circle cx={12} cy={12} r={9} />)}
                  {index === 1 &&
                    icon(
                      <>
                        <circle cx={12} cy={12} r={9} />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l2 2" />
                      </>
                    )}
                  {index === 2 && icon(<path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16M14 8l6 4-6 4" />)}
                  <div className="text-base font-semibold text-slate-900">{card.title}</div>
                  <div className="mt-1 text-sm text-slate-600">{card.description}</div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex gap-3">
            <Link
              href={localize("/pricing")}
              className="rounded-xl border border-indigo-100/70 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-white"
            >
              {copy.pricing.ctas.pricing}
            </Link>
            <ShimmerButton href={localize("/contact")}>{copy.pricing.ctas.request}</ShimmerButton>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-32 pt-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="overflow-hidden border-white/30 bg-gradient-to-br from-white/80 to-white/50 p-8 shadow-xl ring-1 ring-white/60 sm:p-10">
              <div className="grid gap-6 sm:grid-cols-[1.2fr_.8fr] sm:items-center">
                <div>
                  <h2 className="text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    {copy.closing.title}
                  </h2>
                  <p className="mt-2 max-w-prose text-slate-600">
                    {copy.closing.body}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <ShimmerButton href={localize("/contact")}>{copy.closing.ctas.quote}</ShimmerButton>
                    <Link
                      href={localize("/portfolio")}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition-transform hover:-translate-y-0.5 hover:bg-white/20"
                    >
                      {copy.closing.ctas.gallery}
                    </Link>
                  </div>
                </div>
                <div className="justify-self-end">
                  <GlassOrb className="h-40 w-40 opacity-90" />
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* FAQ JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  )
}
