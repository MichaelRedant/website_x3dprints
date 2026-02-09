import type { Metadata } from "next"
import Link from "next/link"
import AutoCarousel from "@/components/AutoCarousel"
import GlassCard from "@/components/GlassCard"
import GlassOrb from "@/components/GlassOrb"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import VideoGallery from "@/components/VideoGallery"
import ReadMoreLinks from "@/components/ReadMoreLinks"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import { normalizeLocale } from "@/lib/i18n/locales"
import { localizeHref } from "@/lib/i18n/paths"
import { readdirSync, statSync } from "node:fs"
import path from "node:path"

const NL_METADATA: Metadata = {
  title: "3D print portfolio België | 3D print projecten | X3DPrints",
  description:
    "Bekijk 3D print projecten op maat in België: functionele onderdelen, merchandising en gifts met casefoto’s uit het atelier in Herzele (regio Gent).",
  alternates: {
    canonical: "https://www.x3dprints.be/portfolio/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/portfolio/",
      "en-BE": "https://www.x3dprints.be/en/portfolio/",
      "x-default": "https://www.x3dprints.be/portfolio/",
    },
  },
  openGraph: {
    title: "3D print portfolio België | X3DPrints",
    description:
      "Fotoreeksen en timelapses van 3D printen op maat: prototypes, merchandising en gepersonaliseerde cadeaus met duidelijke casecontext.",
    url: "https://www.x3dprints.be/portfolio/",
    images: [{ url: "/images/portfolio/2d-5-3.webp", width: 1200, height: 630, alt: "Portfolio van 3D print projecten" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D print projecten in België | X3DPrints",
    description:
      "Functionele prototypes, merchandising en gifts: ontdek hoe X3DPrints 3D print projecten op maat oplevert met casefoto’s.",
    images: ["/images/portfolio/2d-5-3.webp"],
  },
}

const EN_METADATA: Metadata = {
  title: "3D printing portfolio & case studies | X3DPrints",
  description:
    "See real-world 3D printing projects: functional parts, merchandising and gifts produced in Herzele (Ghent).",
  alternates: {
    canonical: "https://www.x3dprints.be/en/portfolio/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/portfolio/",
      "en-BE": "https://www.x3dprints.be/en/portfolio/",
      "x-default": "https://www.x3dprints.be/portfolio/",
    },
  },
  openGraph: {
    title: "3D printing portfolio & case studies | X3DPrints",
    description:
      "Photo series and timelapses of custom 3D prints: prototypes, merchandising and personalized gifts from the Herzele studio.",
    url: "https://www.x3dprints.be/en/portfolio/",
    images: [{ url: "/images/portfolio/2d-5-3.webp", width: 1200, height: 630, alt: "3D printing portfolio projects" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printing portfolio & case studies | X3DPrints",
    description:
      "Functional prototypes, merchandising and gifts: see how X3DPrints delivers projects for SMEs, events and designers.",
    images: ["/images/portfolio/2d-5-3.webp"],
  },
}


void EN_METADATA

export const metadata: Metadata = NL_METADATA

const portfolioDir = path.join(process.cwd(), "public/images/portfolio")
const siteUrl = "https://www.x3dprints.be"

const toTitleCase = (value: string) =>
  value
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")

const photoEntries = readdirSync(portfolioDir)
  .filter((file) => /\.(?:png|jpe?g|webp)$/i.test(file))
  .map((file) => {
    const stats = statSync(path.join(portfolioDir, file))
    return { file, mtime: stats.mtimeMs }
  })
  .sort((a, b) => b.mtime - a.mtime)
  .map((entry) => {
    const baseLabel = entry.file
      .replace(/\.[^.]+$/, "")
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
    const cleaned = baseLabel
      .replace(/^(afbeelding|image|img|foto)\s*/i, "")
      .replace(/^\d+$/, "")
      .trim()
    return {
      src: `/images/portfolio/${encodeURIComponent(entry.file)}`,
      label: cleaned,
    }
  })

const PORTFOLIO_COPY_NL = {
  hero: {
    badge: "Portfolio & reviews",
    title: "3D print portfolio met projecten op maat in België.",
    body: "Van articulated octopus tot custom winkelmateriaal: elk project combineert functionele eisen met een strakke afwerking. Bekijk hoe we 3D modellen printen voor prototypes, seriewerk en gepersonaliseerde cadeaus vanuit het atelier in Herzele (regio Gent).",
    ctas: {
      quote: "Offerte aanvragen",
      services: "Bekijk diensten",
      materials: "Materialen & richtlijnen",
      pricing: "Prijsindicaties",
    },
    chips: {
      retail: "Retail cases",
      tabletop: "Tabletop & hobby",
    },
  },
  highlight: {
    title: "Nieuw in de kijker",
    body: "Vijf recente projecten die de veelzijdigheid van 3D-printing tonen.",
  },
  focus: {
    title: "Waar we op focussen",
    items: [
      {
        title: "Functioneel maatwerk",
        description:
          "Houders, adapters en productietools die dagelijks gebruik doorstaan en naadloos aansluiten op bestaande onderdelen.",
      },
      {
        title: "Gepersonaliseerde items",
        description: "Bedrijfs- en eventgifts, awards en interieurstukken met naam, logo of custom lettering.",
      },
      {
        title: "Seriewerk & prototypes",
        description: "Van het eerste teststuk tot short-run productie met gecontroleerde toleranties en kleurafspraak.",
      },
    ],
  },
  stats: [
    { label: "Projecten per jaar", value: "50+ cases" },
    { label: "Materialen", value: "PLA / PETG / TPU / specials" },
    { label: "Bouwvolume", value: "Tot 350 x 320 x 350 mm" },
    { label: "Doorlooptijd", value: "Enkele werkdagen (samen ingepland)" },
  ],
  projects: {
    title: "Welke projecten zie je in deze 3D print portfolio?",
    body: "De galerij bundelt maatwerk voor mkb, retail en agencies: merchandising, interieurstukken, technische prototypes en TPU beschermers. Elk project wordt geprint in huis zodat kwaliteit, kleurmatch en levertijd controleerbaar blijven.",
    links: [
      { label: "Services", href: "/services", text: "voor serieproductie, nabewerking en montage." },
      { label: "Materialen", href: "/materials", text: "zoals PLA Tough, PETG en TPU om juiste eigenschappen te kiezen." },
      { label: "Blog & kennisbank", href: "/blog", text: "met artikels over kostprijs, materiaalkeuze en Bambu X1C instellingen." },
      { label: "Prijsindicaties", href: "/pricing", text: "voor richtprijzen per materiaal en volume." },
      {
        label: "Retail & marketing cases",
        href: "/segments/3d-printing-marketing",
        text: "als inspiratie voor etalages, POS props en displays.",
      },
      {
        label: "Tabletop & hobby series",
        href: "/segments/3d-printing-tabletop",
        text: "met miniatures, terrain en accessoires voor de niche community.",
      },
      {
        label: "Particulieren prints",
        href: "/segments/3d-printing-makers",
        text: "voor functioneel, recreatief of decoratief maatwerk.",
      },
    ],
    cta: {
      intro: "Klaar om te starten? Ga meteen naar",
      linkLabel: "het contactformulier",
      href: "/contact",
      outro: "en vermeld het project dat je in deze portfolio zag.",
    },
  },
  gallery: {
    title: "Fotogalerij van 3D prints",
    body: "Scroll door productshots, prototypes en decorstukken. Klik door voor een vergrote weergave met context zodat elke foto scanbaar blijft voor klanten en zoekmachines.",
  },
  videos: {
    title: "Timelapse video's van 3D print projecten",
    body: "Kijk mee hoe onderdelen laag per laag worden opgebouwd. Alle video's zijn geprint, gefilmd en nabewerkt in de studio van X3DPrints.",
    items: [
      { id: "JRWyFUfqUlM", title: "Funko dude custom", description: "Op maat geprinte Funko-stijl figure met articulatie." },
      { id: "yEN9ZY75pDg", title: "Potloodhouder op aanvraag", description: "Klant-specifieke potloodhouder met strakke afwerking." },
      { id: "ChOJa13HU3E", title: "Lange oorbelhouders", description: "Minimalistische oorbelhouders met extra hoogte voor lange sets." },
      { id: "js1994tDE18", title: "Valentijn articulated boy", description: "Silk PLA articulated Valentijn figuur met flexibele gewrichten." },
      { id: "5OoKjbqdtTw", title: "Carnaval Aalst Badge", description: "Kleurrijke badge-ets in het thema van Carnaval Aalst." },
      { id: "IlWhi3ppB30", title: "Tesla Model 3 center compartiment houder", description: "Functionele houder voor het centrale compartiment van een Tesla Model 3." },
      { id: "ZUqF1z_TqVM", title: "Kerstboom", description: "Decoratieve kerstboom met speelse scharnieren en lichteffecten." },
      { id: "gY0DRwYZ9pw", title: "Pencil holder (klant ontwerp)", description: "Klantgericht pencil holder design on demand." },
      { id: "l3lWZZQe1KU", title: "\"You got this\" desk ornament", description: "Motiverend bureauornament geprint op aanvraag." },
      {
        id: "pEVjhj8Esmo",
        title: "Articulated octopus voor Octopus.be",
        description: "Flexibele octopus voor Octopus.be, direct uit de printer beweegbaar.",
      },
      {
        id: "B-DnVHPTVJE",
        title: "Oorring houder voor Choice Juwelen",
        description: "Eigen ontwerp van een 3D-geprinte houder voor oorbellen.",
      },
      {
        id: "O9MYk5Mgytc",
        title: "Tesla kofferhaak in PETG",
        description: "Stevige haak voor in de Tesla-koffer, geprint in PETG.",
      },
      {
        id: "rRcWkRGwbTo",
        title: "Gepersonaliseerde grafstekker",
        description: "Custom 3D-geprinte grafstekker ontworpen voor een kinderherdenking.",
      },
      {
        id: "o9zBbvayF-4",
        title: "Cartoon figure met naam display",
        description: "Cartoon-personage met gepersonaliseerd naamdisplay uit de 3D-printer.",
      },
      { id: "tVDwEw3Od-8", title: "3D geprinte fleshouder", description: "Praktische fleshouder, laag per laag opgebouwd in PLA." },
      { id: "-CWmBhP_OO0", title: "Wireless mesh houder", description: "Compacte houder voor een draadloze mesh-node met strakke passtukken." },
      { id: "KlYc5fyDMLU", title: "Baby cadeau letter", description: "Persoonlijk kraamcadeau in de vorm van een initiaal." },
      { id: "EomHXEwzXMY", title: "Articulated octopus", description: "Flexibele octopus die direct uit de printer beweegt." },
      { id: "IHAq-qheqpY", title: "Transparante kerstboom", description: "Heldere kerstboom als feestelijke decoratie." },
      { id: "o2TNLro97X4", title: "TPU Samsung S24 Ultra case", description: "Schokbestendige smartphonehoes geprint in TPU." },
      { id: "IMxoScXrRPw", title: "Pray sculpture", description: "Meditatieve sculptuur met fijne details." },
      { id: "RmoQwgCUOcY", title: "Articulated kerstboom", description: "Speelse kerstboom met scharnierende takken." },
      { id: "5R9mFNdQEew", title: "Gehaakte kom", description: "3D-geprinte basis voor een gehaakte kom." },
      { id: "2SWpnls132g", title: "Meditatie sculpture", description: "Rustgevende figuur voor een stille meditatiehoek." },
      { id: "DPUI88Nj9QU", title: "Gepersonaliseerde winkelkar coins", description: "Bedrukte winkelwagenmuntjes als bedrijfsgadget." },
      { id: "B0nTIBoHho0", title: "Baby boy gift", description: "Cadeau voor een pasgeboren jongen, op maat geprint." },
      { id: "0SQdnzZa034", title: "Gehaakte ballonhond", description: "Skelet voor een gehaakte ballonhond." },
      { id: "QtUTEn1gaRw", title: "Zombie hand 'Thing'", description: "Halloweenprop geinspireerd op 'Thing' uit Wednesday." },
      { id: "ek525KTB6rM", title: "QR code met standaard", description: "Staande QR-code voor promoties of menukaarten." },
      { id: "4aZpwYity2w", title: "Zen sculpture", description: "Minimalistische sculptuur voor een rustige sfeer." },
      { id: "Bo0jpv9hnyg", title: "Fidget studs", description: "Klikbare fidget-studs als speels bureauaccessoire." },
      { id: "vOviHFKnqU0", title: "Articulated pompoen", description: "Scharnierende pompoen voor Halloween." },
    ],
  },
  readMore: {
    title: "Bekijk ook deze pagina's",
    intro: "Gebruik deze links om materialen, prijzen en services sneller naast elkaar te leggen.",
    primaryLinks: [
      { label: "Materialen & richtlijnen", href: "/materials" },
      { label: "Prijzen & calculator", href: "/pricing" },
      { label: "3D print service", href: "/services" },
    ],
    secondaryLinks: [
      { label: "Segmenten & cases", href: "/segments" },
      { label: "3D viewer", href: "/viewer" },
      { label: "Offerte aanvragen", href: "/contact" },
    ],
  },
  cta: {
    eyebrow: "Klaar voor het volgende project?",
    title: "Laat ons mee nadenken over materiaal, afwerking en planning.",
    body: "Deel je ontwerpbestanden en ontvang binnen een werkdag een vrijblijvende offerte met advies.",
    primary: "Vraag een offerte aan",
    secondary: "Veelgestelde vragen",
  },
  photo: {
    fallbackLabel: "maatwerk print",
    altSuffix: "maatwerk 3D print uit Herzele",
    info: (index: number, label: string) =>
      `Portfolio beeld ${index}: ${label} geproduceerd door X3DPrints in Herzele.`,
  },
  schema: {
    imageGalleryName: "X3DPrints portfolio fotogalerij",
    imageGalleryDescription: "Fotoreeks van maatwerk 3D prints, merchandising en prototypes geproduceerd in Herzele.",
    portfolioName: "X3DPrints portfolio",
    itemListName: "X3DPrints portfolio items",
    language: "nl-BE",
  },
}

const PORTFOLIO_COPY_EN = {
  hero: {
    badge: "Portfolio & reviews",
    title: "3D printing portfolio with functional parts and branded gifts.",
    body: "From articulated octopus to custom retail assets: each project balances functional requirements with a clean finish. See how we deliver prototypes, short runs and personalized gifts from the studio in Herzele (Ghent region).",
    ctas: {
      quote: "Request a quote",
      services: "View services",
      materials: "Materials and guidelines",
      pricing: "Pricing estimates",
    },
    chips: {
      retail: "Retail cases",
      tabletop: "Tabletop & hobby",
    },
  },
  highlight: {
    title: "New highlights",
    body: "Five recent projects that show the versatility of 3D printing.",
  },
  focus: {
    title: "What we focus on",
    items: [
      {
        title: "Functional custom parts",
        description:
          "Holders, adapters and production tools that stand up to daily use and fit existing parts.",
      },
      {
        title: "Personalized items",
        description: "Company and event gifts, awards and interior pieces with name, logo or custom lettering.",
      },
      {
        title: "Short runs and prototypes",
        description: "From the first test piece to short-run production with controlled tolerances and color match.",
      },
    ],
  },
  stats: [
    { label: "Projects per year", value: "50+ cases" },
    { label: "Materials", value: "PLA / PETG / TPU / specials" },
    { label: "Build volume", value: "Up to 350 x 320 x 350 mm" },
    { label: "Lead time", value: "A few business days (scheduled together)" },
  ],
  projects: {
    title: "Which projects are in this 3D printing portfolio?",
    body: "The gallery groups custom work for SMEs, retail and agencies: merchandising, interior pieces, technical prototypes and TPU protectors. Every project is printed in-house so quality, color match and lead time stay controllable.",
    links: [
      { label: "Services", href: "/services", text: "for series production, finishing and assembly." },
      { label: "Materials", href: "/materials", text: "such as PLA Tough, PETG and TPU to pick the right properties." },
      {
        label: "Blog & knowledge base",
        href: "/blog",
        text: "with articles on cost, material choice and Bambu X1C settings.",
      },
      { label: "Pricing estimates", href: "/pricing", text: "for reference pricing per material and volume." },
      {
        label: "Retail & marketing cases",
        href: "/segments/3d-printing-marketing",
        text: "for window displays, POS props and displays.",
      },
      {
        label: "Tabletop & hobby series",
        href: "/segments/3d-printing-tabletop",
        text: "with miniatures, terrain and accessories for the niche community.",
      },
      {
        label: "Individual prints",
        href: "/segments/3d-printing-makers",
        text: "for functional, recreational or decorative custom work.",
      },
    ],
    cta: {
      intro: "Ready to start? Go straight to",
      linkLabel: "the contact form",
      href: "/contact",
      outro: "and mention the project you saw in this portfolio.",
    },
  },
  gallery: {
    title: "Photo gallery of 3D prints",
    body: "Scroll through product shots, prototypes and decor pieces. Click for a larger view with context so each photo stays scannable for customers and search engines.",
  },
  videos: {
    title: "Timelapse videos of 3D print projects",
    body: "Watch parts being built layer by layer. All videos are printed, filmed and post-processed in the X3DPrints studio.",
    items: [
      { id: "JRWyFUfqUlM", title: "Custom Funko-style figure", description: "Custom printed Funko-style figure with articulation." },
      { id: "yEN9ZY75pDg", title: "Custom pencil holder", description: "Client-specific pencil holder with clean finish." },
      { id: "ChOJa13HU3E", title: "Long earring holders", description: "Minimal earring holders with extra height for long sets." },
      { id: "js1994tDE18", title: "Valentine articulated figure", description: "Silk PLA articulated Valentine figure with flexible joints." },
      { id: "5OoKjbqdtTw", title: "Aalst Carnival badge", description: "Colorful badge etch in the Aalst Carnival theme." },
      { id: "IlWhi3ppB30", title: "Tesla Model 3 center compartment holder", description: "Functional holder for the center compartment of a Tesla Model 3." },
      { id: "ZUqF1z_TqVM", title: "Christmas tree", description: "Decorative tree with playful hinges and light effects." },
      { id: "gY0DRwYZ9pw", title: "Pencil holder (client design)", description: "Client-designed pencil holder produced on demand." },
      { id: "l3lWZZQe1KU", title: "\"You got this\" desk ornament", description: "Motivational desk ornament printed on request." },
      {
        id: "pEVjhj8Esmo",
        title: "Articulated octopus for Octopus.be",
        description: "Flexible octopus for Octopus.be, movable straight off the printer.",
      },
      {
        id: "B-DnVHPTVJE",
        title: "Earring holder for Choice Juwelen",
        description: "Custom 3D printed holder for earrings.",
      },
      {
        id: "O9MYk5Mgytc",
        title: "Tesla trunk hook in PETG",
        description: "Sturdy hook for the Tesla trunk, printed in PETG.",
      },
      {
        id: "rRcWkRGwbTo",
        title: "Personalized grave marker",
        description: "Custom 3D printed marker designed for a child memorial.",
      },
      {
        id: "o9zBbvayF-4",
        title: "Cartoon figure with name display",
        description: "Cartoon character with personalized name display from the 3D printer.",
      },
      { id: "tVDwEw3Od-8", title: "3D printed bottle holder", description: "Practical bottle holder built layer by layer in PLA." },
      { id: "-CWmBhP_OO0", title: "Wireless mesh holder", description: "Compact holder for a wireless mesh node with clean fit." },
      { id: "KlYc5fyDMLU", title: "Baby gift letter", description: "Personalized newborn gift in the shape of an initial." },
      { id: "EomHXEwzXMY", title: "Articulated octopus", description: "Flexible octopus that moves straight off the printer." },
      { id: "IHAq-qheqpY", title: "Transparent Christmas tree", description: "Clear festive tree for seasonal decor." },
      { id: "o2TNLro97X4", title: "TPU Samsung S24 Ultra case", description: "Shock-resistant smartphone case printed in TPU." },
      { id: "IMxoScXrRPw", title: "Pray sculpture", description: "Meditative sculpture with fine detail." },
      { id: "RmoQwgCUOcY", title: "Articulated Christmas tree", description: "Playful tree with hinged branches." },
      { id: "5R9mFNdQEew", title: "Crocheted bowl", description: "3D printed base for a crocheted bowl." },
      { id: "2SWpnls132g", title: "Meditation sculpture", description: "Calming figure for a quiet meditation corner." },
      { id: "DPUI88Nj9QU", title: "Personalized shopping cart coins", description: "Printed shopping cart coins as a company gadget." },
      { id: "B0nTIBoHho0", title: "Baby boy gift", description: "Gift for a newborn boy, printed to order." },
      { id: "0SQdnzZa034", title: "Crocheted balloon dog", description: "Skeleton for a crocheted balloon dog." },
      { id: "QtUTEn1gaRw", title: "Zombie hand 'Thing'", description: "Halloween prop inspired by 'Thing' from Wednesday." },
      { id: "ek525KTB6rM", title: "QR code with stand", description: "Standing QR code for promotions or menus." },
      { id: "4aZpwYity2w", title: "Zen sculpture", description: "Minimal sculpture for a calm atmosphere." },
      { id: "Bo0jpv9hnyg", title: "Fidget studs", description: "Clickable fidget studs as a playful desk accessory." },
      { id: "vOviHFKnqU0", title: "Articulated pumpkin", description: "Hinged pumpkin for Halloween." },
    ],
  },
  readMore: {
    title: "See these pages as well",
    intro: "Use these links to compare materials, pricing and services faster.",
    primaryLinks: [
      { label: "Materials and guidelines", href: "/materials" },
      { label: "Pricing and calculator", href: "/pricing" },
      { label: "3D print service", href: "/services" },
    ],
    secondaryLinks: [
      { label: "Segments & cases", href: "/segments" },
      { label: "3D viewer", href: "/viewer" },
      { label: "Request a quote", href: "/contact" },
    ],
  },
  cta: {
    eyebrow: "Ready for the next project?",
    title: "Let us help with material, finishing and planning.",
    body: "Share your design files and receive a no-obligation quote with advice within one business day.",
    primary: "Request a quote",
    secondary: "Frequently asked questions",
  },
  photo: {
    fallbackLabel: "custom print",
    altSuffix: "custom 3D print from Herzele",
    info: (index: number, label: string) =>
      `Portfolio image ${index}: ${label} produced by X3DPrints in Herzele.`,
  },
  schema: {
    imageGalleryName: "X3DPrints portfolio photo gallery",
    imageGalleryDescription: "Photo series of custom 3D prints, merchandising and prototypes produced in Herzele.",
    portfolioName: "X3DPrints portfolio",
    itemListName: "X3DPrints portfolio items",
    language: "en-BE",
  },
}

const newVideoIds = new Set([
  "JRWyFUfqUlM",
  "yEN9ZY75pDg",
  "ChOJa13HU3E",
  "js1994tDE18",
])

const organizationSchema = {
  "@type": "Organization",
  name: "X3DPrints",
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/og-x3dprints.jpg`,
  },
}

type PageProps = { searchParams?: Promise<{ lang?: string } | undefined>; locale?: string }

export default function Page({ locale }: PageProps) {
  const normalizedLocale = normalizeLocale(locale)
  const copy = normalizedLocale === "en" ? PORTFOLIO_COPY_EN : PORTFOLIO_COPY_NL
  const localize = (href: string) => localizeHref(href, normalizedLocale)
  const isEn = normalizedLocale === "en"
  const tocItems = isEn
    ? [
        { id: "portfolio-stats", label: "What project metrics and capacity do we show?" },
        { id: "portfolio-projects", label: "Which project types are included?" },
        { id: "portfolio-gallery", label: "Photo gallery" },
        { id: "portfolio-videos", label: "Timelapse video gallery" },
        { id: "portfolio-sources", label: "Sources and references" },
      ]
    : [
        { id: "portfolio-stats", label: "Welke projectcijfers en capaciteit tonen we?" },
        { id: "portfolio-projects", label: "Welke projecttypes zitten in de portfolio?" },
        { id: "portfolio-gallery", label: "Fotogalerij" },
        { id: "portfolio-videos", label: "Timelapse videogalerij" },
        { id: "portfolio-sources", label: "Bronnen en referenties" },
      ]
  const references = isEn
    ? [
        { label: "Google image SEO best practices", url: "https://developers.google.com/search/docs/appearance/google-images" },
        { label: "Google video structured data guidelines", url: "https://developers.google.com/search/docs/appearance/structured-data/video" },
        { label: "Schema.org ImageObject", url: "https://schema.org/ImageObject" },
      ]
    : [
        { label: "Google best practices voor afbeeldingen", url: "https://developers.google.com/search/docs/appearance/google-images" },
        { label: "Google richtlijnen voor video structured data", url: "https://developers.google.com/search/docs/appearance/structured-data/video" },
        { label: "Schema.org ImageObject", url: "https://schema.org/ImageObject" },
      ]
  const lastUpdatedLabel = isEn ? "Last updated: February 6, 2026" : "Laatst bijgewerkt: 6 februari 2026"
  const portfolioPath = localizeHref("/portfolio", normalizedLocale)
  const portfolioUrl = `${siteUrl}${portfolioPath}`

  const photos = photoEntries.map((photo, index) => {
    const fallback = `${copy.photo.fallbackLabel} ${index + 1}`
    const label = toTitleCase(photo.label || fallback)
    return {
      src: photo.src,
      alt: `${label} - ${copy.photo.altSuffix}`,
      info: copy.photo.info(index + 1, label),
    }
  })

  const videos = copy.videos.items
  const focusAreas = copy.focus.items
  const stats = copy.stats

  const imageObjects = photos.map((p, index) => {
    const absoluteUrl = `${siteUrl}${p.src}`
    return {
      "@type": "ImageObject",
      "@id": `${portfolioUrl}#image-${index + 1}`,
      contentUrl: absoluteUrl,
      url: absoluteUrl,
      caption: p.alt,
      description: p.info,
      inLanguage: copy.schema.language,
      creditText: "X3DPrints",
      creator: organizationSchema,
      copyrightHolder: organizationSchema,
      representativeOfPage: index === 0,
    }
  })

  const imageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: copy.schema.imageGalleryName,
    description: copy.schema.imageGalleryDescription,
    url: portfolioUrl,
    publisher: organizationSchema,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: imageObjects.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item,
      })),
    },
  }

  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: copy.schema.portfolioName,
    url: portfolioUrl,
    publisher: organizationSchema,
    hasPart: videos.map((video) => ({
      "@type": "VideoObject",
      name: video.title,
      description: video.description,
      thumbnailUrl: `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`,
      embedUrl: `https://www.youtube.com/watch?v=${video.id}`,
    })),
  }

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: copy.schema.itemListName,
    itemListElement: photos.map((photo, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteUrl}${photo.src}`,
      name: photo.alt,
      description: photo.info,
    })),
  }

  return (
    <main className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(56,189,248,0.25),transparent_60%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.12]" />

      <section className="relative px-6 pb-24 pt-20 sm:px-8 lg:px-12">
        <div className="absolute -left-16 top-12 -z-10 hidden md:block">
          <GlassOrb className="h-72 w-72 opacity-35" />
        </div>
        <div className="absolute -right-12 -bottom-20 -z-10 hidden lg:block">
          <GlassOrb className="h-80 w-80 opacity-25" />
        </div>
        <div className="mx-auto max-w-6xl">
          <div className="grid items-start gap-12 lg:grid-cols-[1.2fr_.8fr]">
            <Reveal className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/60 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                {copy.hero.badge}
              </span>
              <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                {copy.hero.title}
              </h1>
              <p className="mt-4 text-pretty text-lg text-slate-700">{copy.hero.body}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ShimmerButton
                  href={localize("/contact")}
                  event={{ action: "cta_click", category: "portfolio_hero", label: "quote" }}
                >
                  {copy.hero.ctas.quote}
                </ShimmerButton>
                <Link
                  href={localize("/services")}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/60 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition-transform hover:-translate-y-0.5 hover:bg-white"
                >
                  {copy.hero.ctas.services}
                </Link>
                <Link
                  href={localize("/materials")}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/50 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition-transform hover:-translate-y-0.5 hover:bg-white"
                >
                  {copy.hero.ctas.materials}
                </Link>
                <Link
                  href={localize("/pricing")}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/50 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
                >
                  {copy.hero.ctas.pricing}
                </Link>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href={localize("/segments/3d-printing-marketing")}
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-900 hover:bg-white"
                >
                  {copy.hero.chips.retail}
                </Link>
                <Link
                  href={localize("/segments/3d-printing-tabletop")}
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/60 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-900 hover:bg-white"
                >
                  {copy.hero.chips.tabletop}
                </Link>
              </div>
              <ContentTableOfContents
                title={isEn ? "Contents" : "Inhoud"}
                items={tocItems}
                className="mt-6 max-w-2xl"
              />
            </Reveal>

            <Reveal delay={0.15} className="grid gap-4">
              <GlassCard className="overflow-hidden border border-white/50 bg-white/70 p-6 shadow-lg backdrop-blur">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{copy.highlight.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{copy.highlight.body}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {videos.slice(0, 5).map((video) => (
                    <li key={video.id} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" aria-hidden />
                      <span>{video.title}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
              <GlassCard className="border border-white/50 bg-white/70 p-6 shadow-lg backdrop-blur">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{copy.focus.title}</h2>
                <div className="mt-4 grid gap-3">
                  {focusAreas.map((item) => (
                    <div key={item.title}>
                      <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                      <p className="text-sm text-slate-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="portfolio-stats" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <GlassCard
                key={stat.label}
                className="border border-white/50 bg-white/70 px-6 py-5 text-center shadow-md backdrop-blur transition-transform hover:-translate-y-1"
              >
                <div className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">{stat.label}</div>
                <div className="mt-2 text-2xl font-semibold text-slate-900">{stat.value}</div>
              </GlassCard>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="portfolio-projects" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{copy.projects.title}</h2>
            <p className="text-base text-slate-600">{copy.projects.body}</p>
            <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
              {copy.projects.links.map((item) => (
                <li key={item.href}>
                  <Link className="font-semibold text-slate-900 underline decoration-slate-300 hover:decoration-slate-600" href={localize(item.href)}>
                    {item.label}
                  </Link>{" "}
                  {item.text}
                </li>
              ))}
              <li>
                {copy.projects.cta.intro}{" "}
                <Link
                  className="font-semibold text-slate-900 underline decoration-slate-300 hover:decoration-slate-600"
                  href={localize(copy.projects.cta.href)}
                >
                  {copy.projects.cta.linkLabel}
                </Link>{" "}
                {copy.projects.cta.outro}
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section id="portfolio-gallery" className="scroll-mt-28 px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{copy.gallery.title}</h2>
            <p className="mt-2 text-slate-600">{copy.gallery.body}</p>
          </Reveal>
          <Reveal className="mt-10">
            <AutoCarousel
              items={photos}
              speed={14}
              visibleCount={4}
              newCount={8}
              itemClass="aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3]"
            />
          </Reveal>
        </div>
      </section>

      <section id="portfolio-videos" className="scroll-mt-28 px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{copy.videos.title}</h2>
            <p className="mt-2 text-slate-600">{copy.videos.body}</p>
          </Reveal>
          <div className="mt-10">
            <VideoGallery videos={videos} highlightIds={Array.from(newVideoIds)} />
          </div>
        </div>
      </section>

      <ReadMoreLinks
        pageType="portfolio"
        title={copy.readMore.title}
        intro={copy.readMore.intro}
      />

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/70 px-8 py-10 text-center shadow-xl backdrop-blur">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-cyan-400/10 to-sky-400/10" aria-hidden />
              <div className="relative">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{copy.cta.eyebrow}</p>
                <h2 className="mt-4 text-2xl font-semibold text-slate-900 sm:text-3xl">{copy.cta.title}</h2>
                <p className="mt-3 text-base text-slate-600">{copy.cta.body}</p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <ShimmerButton
                    href={localize("/contact")}
                    event={{ action: "cta_click", category: "portfolio_cta", label: "contact" }}
                  >
                    {copy.cta.primary}
                  </ShimmerButton>
                  <Link
                    href={localize("/faq")}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/60 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition-transform hover:-translate-y-0.5 hover:bg-white"
                  >
                    {copy.cta.secondary}
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="portfolio-sources" className="scroll-mt-28 px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {isEn ? "Sources and references" : "Bronnen en referenties"}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                {isEn
                  ? "Reference sources used for image and video discoverability standards."
                  : "Referentiebronnen die we gebruiken voor standaarden rond image en video vindbaarheid."}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {references.map((reference) => (
                  <li key={reference.url} className="rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3">
                    <cite className="not-italic">
                      <Link href={reference.url} target="_blank" rel="noreferrer" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        {reference.label}
                      </Link>
                    </cite>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(imageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
    </main>
  )
}
