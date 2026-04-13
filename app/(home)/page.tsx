import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { Clock3, MapPin, Target } from "lucide-react"
import Reveal from "@/components/Reveal"
import Parallax from "@/components/Parallax"
import FilamentHeroVisual from "@/components/FilamentHeroVisual"
import ShimmerButton from "@/components/ShimmerButton"
import Catchphrase from "@/components/Catchphrase"
import GlassOrb from "@/components/GlassOrb"
import GlassCard from "@/components/GlassCard"
import GoogleReviewHighlights from "@/components/GoogleReviewHighlights"
import HeroTrustBar, { type HeroTrustItem } from "@/components/HeroTrustBar"
import LeadTimeStatus from "@/components/LeadTimeStatus"
import QuickContactActions from "@/components/QuickContactActions"
import MaterialSwatches, { type Swatch } from "@/components/MaterialSwatches"
import AutoCarousel from "@/components/AutoCarousel"
import { localizeHref } from "@/lib/i18n/paths"
import { buildFaqPageSchema } from "@/lib/seo"
import { existsSync, readdirSync, statSync } from "node:fs"
import path from "node:path"

type CarouselPhoto = {
  src: string
  alt: string
}

const NL_METADATA: Metadata = {
  title: "3D printen op maat voor bedrijven en particulieren | X3DPrints",
  description:
    "Van onderdelen en organizers tot prototypes, etalage-items, fidget toys en beeldjes. Lokale 3D printservice in Belgie met snelle opvolging.",
  alternates: {
    canonical: "https://www.x3dprints.be/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/",
      "en-BE": "https://www.x3dprints.be/en/",
      "x-default": "https://www.x3dprints.be/",
    },
  },
  openGraph: {
    title: "3D printen op maat voor bedrijven en particulieren | X3DPrints",
    description:
      "Onderdelen, organizers, prototypes, etalage-items, fidget toys en beeldjes. Snel en lokaal geprint in Belgie.",
    url: "https://www.x3dprints.be/",
    images: [{ url: "/images/og-home-nl.svg", width: 1200, height: 630, alt: "3D print service van X3DPrints" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printen op maat voor bedrijven en particulieren | X3DPrints",
    description: "3D printservice in Belgie voor onderdelen, organizers, prototypes, etalage-items en meer.",
    images: ["/images/og-home-nl.svg"],
  },
}

const EN_METADATA: Metadata = {
  title: "Custom 3D printing for businesses and individuals | X3DPrints",
  description:
    "From replacement parts and organizers to prototypes, retail items, fidget toys and figurines. Local production in Belgium with fast communication.",
  alternates: {
    canonical: "https://www.x3dprints.be/en/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/",
      "en-BE": "https://www.x3dprints.be/en/",
      "x-default": "https://www.x3dprints.be/",
    },
  },
  openGraph: {
    title: "Custom 3D printing for businesses and individuals | X3DPrints",
    description:
      "Replacement parts, organizers, prototypes, retail items, fidget toys and figurines. Printed fast and local in Belgium.",
    url: "https://www.x3dprints.be/en/",
    images: [{ url: "/images/og-home-en.svg", width: 1200, height: 630, alt: "3D printing service by X3DPrints" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom 3D printing for businesses and individuals | X3DPrints",
    description: "3D printing in Belgium for parts, organizers, prototypes, retail items and more.",
    images: ["/images/og-home-en.svg"],
  },
}
void EN_METADATA

export const metadata: Metadata = NL_METADATA

const portfolioDir = path.join(process.cwd(), "public/images/portfolio")
const organizerSpotlightPhoto: CarouselPhoto = {
  src: "/images/organizers/modugrid/ModuGrid10.webp",
  alt: "Tool organizer op maat",
}
const FIXED_PRIORITY_PORTFOLIO_FILE_NAMES = new Set(["hoornaarval2.webp", "hornaarval.webp", "funko_image.webp"])
const FIXED_PRIORITY_CAROUSEL_SLOTS = [
  {
    files: ["hoornaarval2.webp", "hornaarval.webp"],
    altNl: "Selectieve hoornaarval in 3D print voor monitoring en bescherming",
    altEn: "Selective 3D printed hornet trap for monitoring and protection",
  },
  {
    files: ["funko_image.webp"],
    altNl: "3D geprinte Funko-style figuur op maat",
    altEn: "Custom 3D printed Funko-style figurine",
  },
] as const

const toPortfolioTitle = (value: string) =>
  value
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")

const latestPortfolioPhotos = (() => {
  try {
    const portfolioEntries = readdirSync(portfolioDir)
      .filter((file) => /\.webp$/i.test(file))
      .map((file) => ({ file, mtime: statSync(path.join(portfolioDir, file)).mtimeMs }))
      .sort((a, b) => b.mtime - a.mtime)

    const sanitizedPortfolioEntries = portfolioEntries.filter(({ file }) => {
      const normalizedFileName = file.toLowerCase()
      if (FIXED_PRIORITY_PORTFOLIO_FILE_NAMES.has(normalizedFileName)) return false
      if (normalizedFileName === "back2school (1).webp") return false
      return true
    })

    const portfolioPhotos = sanitizedPortfolioEntries
      .slice(0, 19)
      .map(({ file }, index) => {
        const baseLabel = file
          .replace(/\.[^.]+$/, "")
          .replace(/[-_]+/g, " ")
          .replace(/\s+/g, " ")
          .trim()
        const cleaned = baseLabel
          .replace(/^(afbeelding|image|img|foto)\s*/i, "")
          .replace(/^\d+$/, "")
          .trim()
        return {
          src: `/images/portfolio/${encodeURIComponent(file)}`,
          alt: cleaned ? toPortfolioTitle(cleaned) : `Portfolio ontwerp ${index + 1}`,
        }
      })

    return [organizerSpotlightPhoto, ...portfolioPhotos].slice(0, 20)
  } catch {
    return []
  }
})()

const getFixedPriorityPortfolioPhotos = (isEn: boolean) => {
  const photos: CarouselPhoto[] = []
  for (const slot of FIXED_PRIORITY_CAROUSEL_SLOTS) {
    const matchedFile = slot.files.find((fileName) => existsSync(path.join(portfolioDir, fileName)))
    if (!matchedFile) {
      continue
    }
    photos.push({
      src: `/images/portfolio/${encodeURIComponent(matchedFile)}`,
      alt: isEn ? slot.altEn : slot.altNl,
    })
  }
  return photos
}

const SEASONAL_CAROUSEL_PHOTOS: Record<string, CarouselPhoto[]> = {
  "/valentijn-3d-printen": [
    {
      src: "/images/portfolio/big%20valentijn%20boy%20articulated.webp",
      alt: "3D geprinte articulated Valentijn figuur",
    },
  ],
  "/blog/3d-printen-vaderdag-moederdag": [
    { src: "/images/portfolio/vaderdag.webp", alt: "3D geprinte Vaderdag sleutelhangers" },
    { src: "/images/portfolio/vaderdag2.webp", alt: "3D geprinte Vaderdag desk items" },
    { src: "/images/portfolio/vaderdag3.webp", alt: "3D geprint gepersonaliseerd Vaderdag cadeau" },
    { src: "/images/portfolio/moederdag.webp", alt: "3D geprint Moederdag cadeau in Silk PLA" },
    { src: "/images/portfolio/moederdag2.webp", alt: "3D geprinte Moederdag organizer set" },
    { src: "/images/portfolio/moederdag3.webp", alt: "3D geprint Moederdag naamcadeau" },
  ],
  "/blog/3d-printen-back-to-school": [
    { src: "/images/portfolio/back2school%20(1).webp", alt: "Back to School set met pennenhouder en naamplaat" },
    { src: "/images/portfolio/back2school%20(2).webp", alt: "Gepersonaliseerde bureau organizer voor school" },
    { src: "/images/portfolio/back2school%20(3).webp", alt: "Back to School kit met labels en houder" },
  ],
  "/blog/3d-printen-winter-kerst-nieuwjaar": [
    { src: "/images/portfolio/XmasBalls.webp", alt: "3D geprinte kerstdecor set 1" },
    { src: "/images/portfolio/XmasBalls2.webp", alt: "3D geprinte kerstdecor set 2" },
    { src: "/images/portfolio/XmasDoorTrim.webp", alt: "3D geprinte kerstdecor set 3" },
    { src: "/images/portfolio/XmasScene.webp", alt: "3D geprinte kerstdecor set 4" },
    { src: "/images/portfolio/xmasTree.webp", alt: "3D geprinte kerstdecor set 5" },
    { src: "/images/portfolio/IMG-20241106-WA0000.webp", alt: "3D geprinte kerstdecor set 6" },
  ],
  "/blog/3d-printen-lente-pasen": [
    { src: "/images/portfolio/easter1.webp", alt: "3D geprinte paasdecor set met eieren en hangers" },
    { src: "/images/portfolio/Easter2.webp", alt: "3D geprinte paashangers in pastelkleuren" },
    { src: "/images/portfolio/Easter3.webp", alt: "3D geprinte paasornamenten voor tafeldecoratie" },
    { src: "/images/portfolio/Easter4.webp", alt: "3D geprinte translucent paaslantaarn" },
    { src: "/images/portfolio/Easter5.webp", alt: "3D geprinte combinatie van paasdecor en seizoensdisplay" },
  ],
  "/blog/3d-printen-zomer": [
    { src: "/images/portfolio/summer1.webp", alt: "3D geprinte zomerdecor set 1" },
    { src: "/images/portfolio/Summer2.webp", alt: "3D geprinte zomerdecor set 2" },
    { src: "/images/portfolio/Summer3.webp", alt: "3D geprinte zomerdecor set 3" },
    { src: "/images/portfolio/Summer4.webp", alt: "3D geprinte zomerdecor set 4" },
    { src: "/images/portfolio/Summer5.webp", alt: "3D geprinte zomerdecor set 5" },
    { src: "/images/portfolio/Summer6.webp", alt: "3D geprinte zomerdecor set 6" },
    { src: "/images/portfolio/Summer7.webp", alt: "3D geprinte zomerdecor set 7" },
  ],
  "/blog/3d-printen-herfst-halloween": [
    { src: "/images/portfolio/halloween1.webp", alt: "3D geprinte Halloween decor set 1" },
    { src: "/images/portfolio/Halloween2.webp", alt: "3D geprinte Halloween decor set 2" },
    { src: "/images/portfolio/Halloween3.webp", alt: "3D geprinte Halloween decor set 3" },
    { src: "/images/portfolio/Halloween4.webp", alt: "3D geprinte Halloween decor set 4" },
    { src: "/images/portfolio/Halloween5.webp", alt: "3D geprinte Halloween decor set 5" },
    { src: "/images/portfolio/Halloween6.webp", alt: "3D geprinte Halloween decor set 6" },
  ],
}

const mergePhotosWithoutDuplicates = (photos: CarouselPhoto[]) => {
  const seen = new Set<string>()
  return photos.filter((photo) => {
    if (seen.has(photo.src)) {
      return false
    }
    seen.add(photo.src)
    return true
  })
}

const getOutOfSeasonPhotoSources = (activeSeasonHref: string) => {
  const outOfSeasonSources = new Set<string>()
  for (const [seasonHref, seasonPhotos] of Object.entries(SEASONAL_CAROUSEL_PHOTOS)) {
    if (seasonHref === activeSeasonHref) continue
    for (const photo of seasonPhotos) {
      outOfSeasonSources.add(photo.src.toLowerCase())
    }
  }
  return outOfSeasonSources
}

const getSeasonKeyFromHref = (seasonHref: string) => {
  if (seasonHref === "/valentijn-3d-printen") return "valentine"
  if (seasonHref === "/blog/3d-printen-vaderdag-moederdag") return "parents"
  if (seasonHref === "/blog/3d-printen-back-to-school") return "back-to-school"
  if (seasonHref === "/blog/3d-printen-winter-kerst-nieuwjaar") return "winter"
  if (seasonHref === "/blog/3d-printen-lente-pasen") return "spring"
  if (seasonHref === "/blog/3d-printen-zomer") return "summer"
  return "autumn"
}

const SEASON_KEYWORDS: Record<string, string[]> = {
  valentine: ["valentijn", "valentine"],
  parents: ["vaderdag", "moederdag", "father", "mother"],
  "back-to-school": ["back2school", "back-to-school"],
  winter: ["xmas", "kerst", "winter", "christmas", "newyear", "nieuwjaar", "holiday"],
  spring: ["easter", "pasen", "lente", "spring"],
  summer: ["summer", "zomer"],
  autumn: ["halloween", "herfst", "autumn", "fall"],
}

const isOutOfSeasonByKeyword = (photoSrc: string, activeSeasonHref: string) => {
  const normalizedSrc = decodeURIComponent(photoSrc).toLowerCase()
  const activeSeasonKey = getSeasonKeyFromHref(activeSeasonHref)
  const matchedSeasons = Object.entries(SEASON_KEYWORDS)
    .filter(([, keywords]) => keywords.some((keyword) => normalizedSrc.includes(keyword)))
    .map(([seasonKey]) => seasonKey)

  if (matchedSeasons.length === 0) {
    return false
  }
  return !matchedSeasons.includes(activeSeasonKey)
}

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
    badge: "3D printservice op maat in Belgie",
    catchphrase: "Van idee tot afgewerkt 3D product, snel en lokaal geprint",
    title: "3D printen op aanvraag voor bedrijven en particulieren.",
    subtitle: "Functioneel of creatief: gemaakt om te gebruiken en op te vallen",
    intro:
      "X3DPrints print op maat voor bedrijven en particulieren in Belgie. Van onderdelen, organizers en prototypes tot etalage-items, fidget toys en beeldjes. Jij brengt het idee of model, ik verzorg materiaaladvies, print en afwerking met snelle, duidelijke opvolging.",
    ctas: {
      quote: "Offerte aanvragen",
      consumerAdvice: "Diensten voor bedrijven",
      organizers: "Tool organizers",
      knowledge: "Cases & toepassingen",
      guide: "Kennisbank",
      tool: "Advies voor particulieren",
    },
  },
  heroStats: [
    { label: "Tolerantie", value: "0,2 mm" },
    { label: "Doorlooptijd", value: "Enkele werkdagen (in overleg)" },
    { label: "Bouwvolume", value: "Tot 35 x 32 x 35 cm" },
  ],
  portfolioCarousel: {
    kicker: "Recente 3D print projecten",
    title: "Voorbeeldontwerpen uit ons 3D print atelier",
    body: "Een representatieve mix van maatwerk, seizoensprints en functionele onderdelen. Zie wat mogelijk is voor jouw idee en vraag snel een offerte op maat aan.",
    cta: "Bekijk alle 3D print projecten",
  },
  local: {
    kicker: "Lokaal & 100% Belgisch",
    title: "Herzeelse handelaar, verankerd in Vlaanderen.",
    body:
      "We produceren in Herzele en leveren in Vlaanderen. Als lid van de Werkgroep Ondernemend Herzele werken we met Belgische partners, transparante prijzen en korte lijnen.",
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
      "Actief in regio Gent, Aalst, Geraardsbergen en Oudenaarde. We printen alles van functionele onderdelen, organizers en prototypes tot etalage-items, gadgets en persoonlijke stukken voor bedrijven en particulieren.",
    ctas: {
      services: "Diensten",
      materials: "Materialen",
    },
  },
  organizers: {
    kicker: "Tool organizers op maat",
    title: "Perfect georganiseerde gereedschapskoffers, op maat van jouw systeem.",
    body:
      "Eén hub met organizers voor Gridfinity, Packout, TSTAK en custom koffers. Geen STL's of losse bakjes: vaste layouts, labelbaar en fit per ladehoogte. Gridfinity krijgt extra aandacht: open-source raster, hyper-flexibel en volledig op maat te printen.",
    pains: ["Schroeven door elkaar", "Lege ruimte in koffers", "Tijdverlies bij zoeken", "Slecht overzicht"],
    solutions: ["Klemvaste trays zonder rammel", "Labelzones en kleurcodes", "Antislip optioneel", "Pasvorm per ladehoogte"],
    ctas: {
      primary: "Bekijk organizers",
      secondary: "Vraag je indeling aan",
    },
    badge: "Print-on-demand in België · Gridfinity/Packout/TSTAK/custom",
  },
  segments: {
    title: "Voor welke bedrijven we printen",
    body:
      "We ondersteunen teams die snel willen itereren of functionele onderdelen nodig hebben. Van productontwikkeling tot retail en onderhoud: je krijgt een lokale 3D print service in Belgie die mee denkt met je toepassing.",
    cards: [
      {
        title: "Bedrijven",
        items: [
          "Prototypes voor productontwikkeling",
          "Jigs, fixtures en hulpmallen",
          "Displays, houders en POS-materiaal",
          "Korte reeksen en onderdelen op maat",
        ],
      },
      {
        title: "Particulieren",
        items: [
          "Gepersonaliseerde cadeaus en naamplaatjes",
          "Decor & design: vazen, lampenkappen, interieurstukken",
          "Unieke accessoires en mini-sculpturen",
        ],
      },
    ],
    ctas: {
      gallery: "Galerij bekijken",
      start: "Start je B2B printproject",
    },
    tags: ["Prototypes & productontwikkeling", "Jigs, fixtures & tooling", "Korte reeksen & onderdelen op maat"],
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
  findModels: {
    kicker: "Nog geen ontwerp?",
    title: "Vind snel 3D modellen om te printen.",
    body:
      "Kies een model op Printables, MakerWorld, Thingiverse, MyMiniFactory, Cults of Thangs en stuur de link. Wij checken schaal, materiaal en printbaarheid zodat je 3D model veilig en lokaal in Belgie geprint wordt.",
    ctas: {
      browse: "Waar vind je 3D modellen?",
      send: "Stuur je model-link",
    },
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
      "Kies een model op Printables, MakerWorld, Thingiverse, MyMiniFactory, Cults of Thangs en stuur de link. Wij checken schaal, materiaal en printbaarheid en printen het lokaal in Belgie.",
    ctaPrimary: "Waar vind je 3D modellen?",
    ctaSecondary: "Stuur je model-link",
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
    title: "Prijs, planning & levering voor B2B",
    body:
      "Je krijgt een duidelijke offerte op basis van functie, afmetingen, materiaal en afwerking. We stemmen planning op voorhand af en adviseren waar je ontwerp sneller of kostenefficiënter kan zonder kwaliteitsverlies.",
    cards: [
      {
        title: "Prijsopbouw",
        description:
          "Materiaal, printtijd, afwerking en eventuele montage. We sturen op kost-efficiëntie voor bedrijven.",
      },
      {
        title: "Levertijd",
        description: "Planning in overleg, vaak binnen enkele werkdagen. Spoed is mogelijk voor kritieke deadlines.",
      },
      {
        title: "Verzending/afhalen",
        description: "Verzending in BE of afhalen in regio Herzele/Gent.",
      },
    ],
    ctas: {
      pricing: "Prijzen bekijken",
      request: "Vraag je B2B offerte",
    },
  },
  closing: {
    title: "Klaar om je onderdeel te laten printen?",
    body:
      "Stuur je model of use-case door en je ontvangt snel een duidelijke B2B-offerte met materiaaladvies en realistische timing.",
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
      q: "Kunnen jullie ook Korte reeksen voor bedrijven produceren?",
      a: "Ja. Naast prototypes en enkelstuks produceren we ook Korte reeksen voor functionele toepassingen, interne tooling en eindgebruik.",
    },
    {
      q: "Wat kost 3D printen voor bedrijven?",
      a: "De prijs hangt af van functie, geometrie, materiaal, printtijd en afwerking. Je krijgt meestal binnen 24 uur een heldere offerte met advies.",
    },
    {
      q: "Wat is het maximale bouwvolume?",
      a: "Tot 35 x 32 x 35 cm per onderdeel. Grotere onderdelen kunnen we opdelen en nadien functioneel assembleren.",
    },
  ],
}

const HOME_COPY_EN = {
  hero: {
    badge: "Custom 3D printing service in Belgium",
    catchphrase: "From idea to finished 3D product, printed fast and local",
    title: "3D printing on demand for businesses and individuals.",
    subtitle: "Functional or creative: made to use, made to stand out",
    intro:
      "X3DPrints delivers custom 3D printing for businesses and private clients in Belgium. From replacement parts, organizers and prototypes to retail items, fidget toys and figurines. You bring the idea or model, I handle material guidance, printing and finishing with fast, clear communication.",
    ctas: {
      quote: "Request a quote",
      consumerAdvice: "Business services",
      organizers: "Tool organizers",
      knowledge: "Cases & use cases",
      guide: "Knowledge base",
      tool: "Advice for individuals",
    },
  },
  heroStats: [
    { label: "Tolerance", value: "0.2 mm" },
    { label: "Lead time", value: "A few business days (by agreement)" },
    { label: "Build volume", value: "Up to 35 x 32 x 35 cm" },
  ],
  portfolioCarousel: {
    kicker: "Recent 3D printing projects",
    title: "Showcase designs from our 3D printing studio",
    body: "A representative mix of custom work, seasonal prints and functional parts. See what is possible for your idea and request a tailored quote fast.",
    cta: "View all 3D printing projects",
  },
  local: {
    kicker: "Local & 100% Belgian",
    title: "Herzele-based, rooted in Flanders.",
    body:
      "We produce in Herzele and deliver across Flanders. As a member of the Werkgroep Ondernemend Herzele we work with Belgian partners, transparent pricing and direct communication.",
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
      "Active in the Ghent, Aalst, Geraardsbergen and Oudenaarde region. We print everything from functional parts, organizers and prototypes to retail items, gadgets and personalized pieces for businesses and individuals.",
    ctas: {
      services: "Services",
      materials: "Materials",
    },
  },
  organizers: {
    kicker: "Tool organizers, not loose bins",
    title: "Sell order, not plastic.",
    body:
      "One hub with organizers for Gridfinity, Packout, TSTAK and custom cases. No STLs or loose cups: fixed layouts, label-ready and tuned to tray height. Gridfinity gets extra spotlight: open-source grid, hyper flexible and fully custom per tool.",
    pains: ["Fasteners mixed up", "Wasted space in cases", "Time lost searching", "Poor overview on site"],
    solutions: ["Snug trays, no rattle", "Label zones and color cues", "Optional anti-slip", "Fit tuned to drawer height"],
    ctas: {
      primary: "Explore organizers",
      secondary: "Request your layout",
    },
    badge: "Print-on-demand in Belgium · Gridfinity/Packout/TSTAK/custom",
  },
  segments: {
    title: "Business teams we support",
    body:
      "We support teams that need fast iteration or functional parts. From product development to retail and maintenance, you get a local Belgian 3D printing partner that designs for practical use.",
    cards: [
      {
        title: "Businesses",
        items: [
          "Prototypes for product development",
          "Jigs, fixtures and tooling aids",
          "Displays, holders and POS parts",
          "Short runs and custom replacement parts",
        ],
      },
      {
        title: "Individuals",
        items: [
          "Personalized gifts and nameplates",
          "Decor & design: vases, lampshades, interior pieces",
          "Unique accessories and mini sculptures",
        ],
      },
    ],
    ctas: {
      gallery: "View gallery",
      start: "Start your B2B print project",
    },
    tags: ["Prototypes & product development", "Jigs, fixtures & tooling", "Short runs & custom parts"],
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
  findModels: {
    kicker: "No design yet?",
    title: "Quickly find a 3D model to print.",
    body:
      "Pick a model on Printables, MakerWorld, Thingiverse, MyMiniFactory, Cults or Thangs and share the link. We check scale, material and printability and print it locally in Belgium.",
    ctas: {
      browse: "Where to find 3D models?",
      send: "Send your model link",
    },
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
      "Pick a model on Printables, MakerWorld, Thingiverse, MyMiniFactory, Cults or Thangs and share the link. We check scale, material and printability and print it locally in Belgium.",
    ctaPrimary: "Where to find 3D models?",
    ctaSecondary: "Send your model link",
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
    title: "Pricing, planning & delivery for B2B",
    body:
      "You get a clear quote based on function, geometry, material and finishing. We align planning up front and advise where your part can be faster or more cost-efficient without quality loss.",
    cards: [
      {
        title: "Pricing breakdown",
        description: "Material, print time, finishing and any assembly. We optimize for business cost-efficiency.",
      },
      {
        title: "Lead time",
        description: "Planned together and often delivered within a few business days. Rush is possible for critical deadlines.",
      },
      {
        title: "Shipping/pickup",
        description: "Shipping within BE or pickup in the Herzele/Ghent region.",
      },
    ],
    ctas: {
      pricing: "See pricing",
      request: "Request your B2B quote",
    },
  },
  closing: {
    title: "Ready to print your part?",
    body:
      "Send your model or use case and you will receive a clear B2B quote with material guidance and realistic timing.",
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
      q: "Can you also produce short runs for businesses?",
      a: "Yes. Besides prototypes and single parts, we also produce short runs for functional use, internal tooling and end-use parts.",
    },
    {
      q: "How is B2B pricing determined?",
      a: "Pricing depends on function, geometry, material, print time and finishing. You usually receive a clear quote within 24 hours.",
    },
    {
      q: "What is the maximum build volume?",
      a: "Up to 35 x 32 x 35 cm per part. Larger parts can be split and assembled with functional fit.",
    },
  ],
}

const resolveLocaleOverride = (props: unknown): "nl" | "en" => {
  if (typeof props !== "object" || props === null) {
    return "nl"
  }
  const localeOverride = (props as { localeOverride?: unknown }).localeOverride
  return localeOverride === "en" ? "en" : "nl"
}

export default function HomePage(props: unknown) {
  const normalizedLocale = resolveLocaleOverride(props)
  const isEn = normalizedLocale === "en"
  const localize = (href: string) => localizeHref(href, normalizedLocale)
  const copy = isEn ? HOME_COPY_EN : HOME_COPY_NL
  const seasonCta = getSeasonCta(new Date(), isEn)
  const outOfSeasonPhotoSources = getOutOfSeasonPhotoSources(seasonCta.href)
  const nonSeasonalPortfolioPhotos = latestPortfolioPhotos.filter(
    (photo) =>
      !outOfSeasonPhotoSources.has(photo.src.toLowerCase()) &&
      !isOutOfSeasonByKeyword(photo.src, seasonCta.href),
  )
  const seasonCarouselPhotos = SEASONAL_CAROUSEL_PHOTOS[seasonCta.href] ?? []
  const fixedPriorityPortfolioPhotos = getFixedPriorityPortfolioPhotos(isEn)
  const homeCarouselPhotos = mergePhotosWithoutDuplicates([
    ...seasonCarouselPhotos,
    ...fixedPriorityPortfolioPhotos,
    ...nonSeasonalPortfolioPhotos,
  ]).slice(0, 20)
  const heroTrustFacts: HeroTrustItem[] = isEn
    ? [
        { icon: MapPin, label: "Local studio & region", value: "Herzele, Ghent and all of Flanders" },
        { icon: Clock3, label: "Response speed", value: "First response usually within 24 hours" },
        { icon: Target, label: "Use-case focus", value: "Prototypes, tooling and custom parts" },
      ]
    : [
        { icon: MapPin, label: "Lokale studio & regio", value: "Herzele, Gent en heel Vlaanderen" },
        { icon: Clock3, label: "Reactiesnelheid", value: "Eerste antwoord meestal binnen 24 uur" },
        { icon: Target, label: "Use-case focus", value: "Prototypes, tooling en onderdelen op maat" },
      ]
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
  const faqJsonLd = buildFaqPageSchema({
  inLanguage: isEn ? "en-BE" : "nl-BE",
  items: copy.faq,
})

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
            <LeadTimeStatus locale={normalizedLocale} className="mt-6 max-w-2xl" />
            <div className="stacked-actions mt-10 flex flex-wrap items-center gap-3 justify-center sm:justify-start">
              <ShimmerButton
                href={localize("/contact")}
                event={{ action: "cta_click", category: "home_hero", label: "quote" }}
              >
                {copy.hero.ctas.quote}
              </ShimmerButton>
              <Link
                href={localize("/services")}
                className="inline-flex items-center gap-2 rounded-xl border border-indigo-100/70 bg-indigo-50/80 px-5 py-3 text-sm font-semibold text-indigo-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-50"
              >
                {copy.hero.ctas.consumerAdvice}
              </Link>
              <Link
                href={localize("/organizers")}
                className="inline-flex items-center gap-2 rounded-xl border border-indigo-100/70 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-white"
              >
                {copy.hero.ctas.organizers}
              </Link>
              <Link
                href={localize("/portfolio")}
                className="inline-flex items-center gap-2 rounded-xl border border-indigo-100/70 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-white"
              >
                {copy.hero.ctas.knowledge}
              </Link>
              <Link
                href={localize("/blog")}
                className="inline-flex items-center gap-2 rounded-xl border border-indigo-100/70 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-white"
              >
                {copy.hero.ctas.guide}
              </Link>
              <Link
                href={localize("/cases")}
                className="inline-flex items-center gap-2 rounded-xl border border-indigo-100/70 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-white"
              >
                {isEn ? "Case studies" : "Case studies"}
              </Link>
              <Link
                href={localize("/segments/3d-printing-makers")}
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
            <QuickContactActions
              locale={normalizedLocale}
              trackingCategory="home_hero"
              showQuote={false}
              className="mt-4 justify-center sm:justify-start"
            />
          </Reveal>

          <Reveal delay={0.15} className="mt-12">
            <HeroTrustBar items={heroTrustFacts} />
          </Reveal>
        </div>
      </section>

      {homeCarouselPhotos.length > 0 ? (
        <section className="px-6 pb-14 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-indigo-600">{copy.portfolioCarousel.kicker}</p>
                <h2 className="mt-2 text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {copy.portfolioCarousel.title}
                </h2>
                <p className="mt-2 text-sm text-slate-600 sm:text-base">{copy.portfolioCarousel.body}</p>
              </div>
              <Link
                href={localize("/portfolio")}
                className="inline-flex items-center justify-center rounded-xl border border-indigo-100/70 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
              >
                {copy.portfolioCarousel.cta}
              </Link>
            </Reveal>
            <Reveal delay={0.08} className="mt-8">
              <AutoCarousel
                items={homeCarouselPhotos}
                speed={10}
                visibleCount={4}
                newCount={Math.min(seasonCarouselPhotos.length, homeCarouselPhotos.length)}
                premium
                itemClass="aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3]"
              />
            </Reveal>
          </div>
        </section>
      ) : null}

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
                    {copy.local.body}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <ShimmerButton
                      href={localize("/lokaal-belgisch")}
                      event={{ action: "cta_click", category: "home_local", label: "lokaal-belgisch" }}
                    >
                      {copy.local.ctas.primary}
                    </ShimmerButton>
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

      {/* REVIEWS */}
      <section className="px-6 pb-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GoogleReviewHighlights locale={normalizedLocale} variant="full" />
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
              <Image
                src="/Logo.webp"
                alt="X3DPrints logo"
                width={220}
                height={220}
                className="opacity-90"
                sizes="(min-width:1024px) 220px, 40vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ORGANIZERS SALES SECTION */}
      <section id="organizers" className="relative overflow-hidden px-6 py-20 sm:px-8 lg:px-12">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_20%_20%,rgba(51,65,85,0.24),transparent),radial-gradient(50%_50%_at_80%_10%,rgba(148,163,184,0.2),transparent),radial-gradient(45%_45%_at_50%_90%,rgba(245,158,11,0.14),transparent)]" />
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-800 drop-shadow-[0_0_10px_rgba(255,255,255,.45)]">
                {copy.organizers.kicker}
              </p>
              <h2 className="text-balance text-3xl font-extrabold text-slate-900 sm:text-4xl">
                {copy.organizers.title}
              </h2>
              <p className="max-w-3xl text-lg text-slate-800">{copy.organizers.body}</p>
              <div className="flex flex-wrap gap-2">
                {["Gridfinity", "Packout", "TSTAK", "Custom inserts"].map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-slate-800 ring-1 ring-slate-200/70 backdrop-blur dark:bg-[#111827]/90 dark:text-slate-100 dark:ring-slate-600/60"
                  >
                    <span className="i-lucide-sparkle text-amber-600 dark:text-amber-300" aria-hidden />
                    {chip}
                  </span>
                ))}
              </div>
              <div className="grid gap-3 pt-2 sm:grid-cols-2">
                {(normalizedLocale === "nl"
                  ? [
                      {
                        label: "Gridfinity (open-source)",
                        desc: "Raster van 42 mm, hyper-flexibel en volledig te customizen per tool.",
                        href: "/organizers/modugrid",
                        highlight: true,
                      },
                      {
                        label: "Milwaukee Packout inlays",
                        desc: "Klemvaste trays voor professionals en servicewagens.",
                        href: "/organizers/packout",
                      },
                      {
                        label: "Stanley / DeWALT TSTAK inserts",
                        desc: "Rust in je koffer: slimme indelingen voor bits, batterijen en klein materiaal.",
                        href: "/organizers/tstak",
                      },
                      {
                        label: "Custom toolbox & pegboard",
                        desc: "Parametrische inserts, labels en specials wanneer niets standaard past.",
                        href: "/organizers/custom",
                      },
                    ]
                  : [
                      {
                        label: "Gridfinity (open-source)",
                        desc: "42 mm grid, hyper-flexible and tailored per tool.",
                        href: "/organizers/modugrid",
                        highlight: true,
                      },
                      {
                        label: "Milwaukee Packout inlays",
                        desc: "Rattle-free trays for pros and service vans.",
                        href: "/organizers/packout",
                      },
                      {
                        label: "Stanley / DeWALT TSTAK inserts",
                        desc: "Calm, labelled layouts for bits, batteries and small parts.",
                        href: "/organizers/tstak",
                      },
                      {
                        label: "Custom toolbox & pegboard",
                        desc: "Parametric inserts, labels and specials when nothing off-the-shelf fits.",
                        href: "/organizers/custom",
                      },
                    ]
                ).map((item) => (
                  <Link
                    key={item.href}
                    href={localize(item.href)}
                    className={`group inline-flex flex-col gap-1 rounded-2xl border border-slate-200/80 bg-white/85 px-4 py-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:bg-white dark:border-slate-700 dark:bg-[#111827] ${
                      item.highlight ? "ring-2 ring-amber-300 dark:ring-amber-400/80" : ""
                    }`}
                  >
                    <span className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                      <span className="i-lucide-arrow-up-right text-amber-600 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-amber-300" />
                      {item.label}
                    </span>
                    <span className="text-xs text-slate-700 dark:text-slate-300">{item.desc}</span>
                  </Link>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 pt-1">
                <ShimmerButton
                  href={localize("/organizers")}
                  event={{ action: "cta_click", category: "home_organizers", label: "organizers" }}
                >
                  {copy.organizers.ctas.primary}
                </ShimmerButton>
                <Link
                  href={localize("/contact?material=organizers")}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white/85 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-white dark:border-slate-700 dark:bg-[#111827]"
                >
                  {copy.organizers.ctas.secondary}
                </Link>
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-600">
                {copy.organizers.badge}
              </p>
            </div>
            <GlassCard className="group border-slate-200/70 bg-gradient-to-br from-white/95 via-slate-50/85 to-amber-50/65 p-6 shadow-2xl shadow-slate-900/10 ring-1 ring-white/70 transition-transform hover:-translate-y-1 dark:border-slate-700 dark:bg-[radial-gradient(140%_140%_at_20%_10%,rgba(148,163,184,0.2),transparent),radial-gradient(120%_120%_at_80%_0%,rgba(245,158,11,0.16),transparent),#0f172a] dark:ring-0">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.26em] text-amber-700 dark:text-amber-200">
                <span className="i-lucide-wrench" aria-hidden />
                Bundels & aanpak
              </div>
              <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                Eén hub, vier systemen
              </h3>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
                Eén centrale hub: Gridfinity, Packout, TSTAK en custom inserts. Jij kiest je systeem, wij leveren klemvaste trays die stil liggen en meteen inzetbaar zijn.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-800 dark:text-slate-200">
                {copy.organizers.solutions.map((sol) => (
                  <li key={sol} className="flex items-center gap-2">
                    <span className="i-lucide-check-circle-2 text-emerald-600" aria-hidden />
                    {sol}
                  </li>
                ))}
              </ul>
              <div className="mt-5 grid gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 dark:text-slate-300">
                <span className="rounded-xl bg-slate-900 px-3 py-2 text-[11px] font-bold text-white shadow-sm ring-1 ring-white/10 dark:bg-amber-500/90">
                  Geen rammel · Geen losse bakjes · Layouts die passen in je koffer
                </span>
                <span className="rounded-xl bg-white/80 px-3 py-2 text-[11px] font-semibold text-slate-800 ring-1 ring-white/60 dark:bg-[#0f162c] dark:text-slate-100 dark:ring-0">
                  Prefill contact: kies systeem, voeg foto&apos;s toe, wij tekenen de indeling
                </span>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={localize("/organizers")}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300/80 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Naar de hub
                </Link>
                <Link
                  href={localize("/materials#material-suggestion-tool")}
                  className="inline-flex items-center gap-2 rounded-xl border border-amber-200/80 bg-amber-50/60 px-4 py-2 text-sm font-semibold text-amber-900 transition hover:-translate-y-0.5 hover:bg-amber-50 dark:border-amber-300/40 dark:bg-amber-400/10 dark:text-amber-100"
                >
                  Vraag materiaaladvies
                </Link>
              </div>
            </GlassCard>
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
                  <ShimmerButton
                    href={localize("/3d-modellen-vinden")}
                    event={{ action: "cta_click", category: "home_printables", label: "models-guide" }}
                  >
                    {copy.printables.ctaPrimary}
                  </ShimmerButton>
                  <Link
                    href={localize("/contact?quote=Link%20naar%203D%20model")}
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
            <ShimmerButton
              href={localize("/contact")}
              event={{ action: "cta_click", category: "home_pricing", label: "request" }}
            >
              {copy.pricing.ctas.request}
            </ShimmerButton>
          </div>
        </div>
      </section>

      {/* FAQ CONTENT (visible + schema-aligned) */}
      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {isEn ? "Frequently asked questions" : "Veelgestelde vragen"}
            </h2>
            <p className="mt-2 max-w-3xl text-slate-600">
              {isEn
                ? "Common questions from business and private clients about files, lead times, pricing and production capacity."
                : "Veelgestelde vragen van bedrijven en particulieren over bestanden, levertijd, prijs en productiecapaciteit."}
            </p>
          </Reveal>
          <div className="grid gap-3">
            {copy.faq.map((item) => (
              <details
                key={item.q}
                className="rounded-2xl border border-white/50 bg-gradient-to-br from-white/85 to-white/60 p-5 shadow-sm ring-1 ring-white/50"
              >
                <summary className="cursor-pointer list-none text-base font-semibold text-slate-900">
                  {item.q}
                </summary>
                <p className="mt-2 text-sm text-slate-600 sm:text-base">{item.a}</p>
              </details>
            ))}
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
                    <ShimmerButton
                      href={localize("/contact")}
                      event={{ action: "cta_click", category: "home_closing", label: "quote" }}
                    >
                      {copy.closing.ctas.quote}
                    </ShimmerButton>
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




