// app/(pages)/pricing/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import PriceGuide from "@/components/PriceGuide"
import PriceEstimator from "@/components/PriceEstimator"
import LeadTimeStatus from "@/components/LeadTimeStatus"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import ReadMoreLinks from "@/components/ReadMoreLinks"
import { DEFAULT_DESIGN_RATE_EUR_PER_HOUR, GRAMS_PER_TIER, SHIPPING_RATES_EUR, type Tier } from "@/lib/pricing"
import { GUIDE_TABLE_MATERIALS, guideMaterialLabel, guideUnitPrice } from "@/lib/price-guide"
import { localizeHref } from "@/lib/i18n/paths"
import {
  buildBreadcrumbSchema,
  buildFaqPageSchema,
  buildLocalBusinessSchema,
  buildOfferCatalog,
  buildServiceSchema,
  type SchemaOfferInput,
} from "@/lib/seo"
import { SCAN_PRICES, formatScanPrice } from "@/lib/scanning-prices"

export const metadata: Metadata = {
  title: "3D print en 3D scan prijzen in Belgie | X3DPrints",
  description:
    "Heldere 3D print en 3D scan prijzen in Belgie: printen vanaf EUR 5 en 3D scanning vanaf EUR 45. Richtprijzen, prijswijzer en offerte.",
  alternates: {
    canonical: "https://www.x3dprints.be/pricing/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/pricing/",
      "en-BE": "https://www.x3dprints.be/en/pricing/",
      "x-default": "https://www.x3dprints.be/pricing/",
    },
  },
  openGraph: {
    title: "3D print en 3D scan prijzen in Belgie | X3DPrints",
    description:
      "Kosten voor 3D printen en 3D scanning: printen vanaf EUR 5, scan + mesh vanaf EUR 45. Gebruik de prijswijzer of vraag een offerte aan.",
    url: "https://www.x3dprints.be/pricing/",
    images: [{ url: "/images/og-pricing-nl.svg", width: 1200, height: 630, alt: "Prijzen voor 3D printen" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D print prijs in Belgie",
    description:
      "Richtprijzen voor onderdelen, prototypes, cadeaus en maatwerk. Bereken in vier stappen wat je stuk ongeveer kost, met materiaaladvies.",
    images: ["/images/og-pricing-nl.svg"],
  },
}

// Publieke prijzen zijn naar beneden afgerond: hele euro's tonen zonder decimalen.
const formatEurNl = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(2).replace(".", ","))
const formatEurEn = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(2))

const TIERS: Tier[] = ["Small", "Medium", "Large"]

const COPY = {
  nl: {
    breadcrumbHome: "Home",
    breadcrumbPage: "Prijzen",
    hero: {
      title: "Prijzen 3D printen en 3D scannen",
      intro:
        "Beantwoord vier korte vragen en je ziet meteen wat je stuk ongeveer kost, met mijn materiaaladvies erbij. Daarna bekijk ik je aanvraag zelf en krijg je een offerte met één eindprijs.",
      facts: (small: string) => [
        { k: "Klein onderdeel", v: `± EUR ${small}` },
        { k: "3D scan", v: "vanaf EUR 45" },
        { k: "Ontwerp", v: `EUR ${DEFAULT_DESIGN_RATE_EUR_PER_HOUR} per uur` },
        { k: "Afhalen", v: "gratis, 24 op 7" },
      ],
      primary: "Bereken je prijs",
      secondary: "Meteen een offerte vragen",
      updated: "Laatst bijgewerkt: 4 oktober 2026",
      toc: "Op deze pagina",
    },
    guide: {
      title: "Bereken je richtprijs in vier stappen",
      intro:
        "Vertel waarvoor je het stuk gebruikt, dan kies ik het materiaal. Je krijgt twee of drie prijzen naast elkaar: een basisversie, mijn advies en waar het zin heeft een premiumversie.",
      advanced: "Liever alles zelf instellen? Open de uitgebreide calculator",
    },
    table: {
      title: "Wat kost 3D printen?",
      answer: (s: string, m: string, l: string) =>
        `Een klein stuk in PLA Matte kost ongeveer EUR ${s}, een middelgroot stuk ongeveer EUR ${m} en een groot stuk ongeveer EUR ${l}. Hoe sterker of hittebestendiger het materiaal, hoe hoger de prijs. Hieronder zie je de richtprijs per stuk voor de materialen die ik het vaakst gebruik.`,
      caption: "Kosten 3D printen: richtprijs per stuk volgens formaat en materiaal, bij standaard laagdikte",
      sizeHeader: "Formaat",
      sizes: {
        Small: { name: "Klein", detail: "tot ± 5 cm" },
        Medium: { name: "Middelgroot", detail: "tot ± 10 cm" },
        Large: { name: "Groot", detail: "tot ± 20 cm" },
      } satisfies Record<Tier, { name: string; detail: string }>,
      grams: (g: number) => `± ${g} g`,
      note:
        "Richtprijzen, naar beneden afgerond, zonder verzending. Het echte gewicht en de printtijd ken ik pas als ik je bestand zie. Daarom valt de offerte meestal lager uit.",
    },
    factors: {
      title: "Wat bepaalt de prijs?",
      intro: "Vier dingen, en ik reken ze alle vier open uit in je offerte.",
      items: [
        { k: "Materiaal", v: "Elk materiaal heeft zijn eigen prijs per kilo. PLA en PETG zijn het voordeligst, technische materialen zoals PC of nylon met koolstofvezel het duurst." },
        { k: "Gewicht en formaat", v: "Meer volume is meer filament. Een hol of slim ontworpen stuk weegt vaak veel minder dan je denkt." },
        { k: "Printtijd en laagdikte", v: "Een fijnere laag geeft een mooiere afwerking, maar de printer doet er langer over." },
        { k: "Aantal", v: "Bij grotere aantallen kan ik de prijs verder optimaliseren. Vermeld het aantal gewoon in je aanvraag." },
      ],
      groupsTitle: "Materialen in drie prijsklassen",
      groups: [
        { label: "PLA (Matte, Basic, Silk, Wood, Marble ...), PETG, ABS, ASA", mod: "Basisprijs" },
        { label: "TPU (flexibel), PC", mod: "Hoger" },
        { label: "Vezelversterkt (CF/GF) en nylon", mod: "Hoogst" },
      ],
      drying:
        "Materiaal dat vooraf gedroogd moet worden (PETG, TPU, PC, houtlook) krijgt een kleine droogtoeslag per opdracht. Dat zit al in de prijswijzer.",
      materialsLink: "Alle materialen en kleuren bekijken",
    },
    scan: {
      title: "Wat kost 3D scannen?",
      intro:
        "Het vooronderzoek is gratis: op basis van foto's en maten zeg ik eerst of scannen de beste weg is. Soms is opmeten en natekenen sneller en nauwkeuriger. Het afgesproken scanbestand zit altijd in de prijs.",
      caption: "Prijzen voor 3D scannen, per scan",
      colService: "Scan",
      colWhat: "Waarvoor",
      colPrice: "Prijs",
      more: "Meer over 3D scannen",
    },
    extras: {
      title: "Ontwerp, verzending en afhalen",
      designTitle: "Ontwerp en CAD",
      design: [
        { k: "Eigen bestand (STL, STEP, 3MF)", v: "Gratis nagekeken" },
        { k: "Ontwerp op maat", v: `EUR ${DEFAULT_DESIGN_RATE_EUR_PER_HOUR} per uur` },
        { k: "Natekenen na scan of opmeting", v: `EUR ${DEFAULT_DESIGN_RATE_EUR_PER_HOUR} per uur` },
      ],
      designNote: "Ontwerpwerk reken ik één keer aan, niet per geprint stuk.",
      shippingTitle: "Verzending en afhalen",
      pickup: { k: "Afhalen", v: "Gratis, 24 op 7 in de beveiligde afhaalbox in Herzele" },
      zoneLabel: (fromKg: number, toKg: number) => (fromKg === 0 ? `Verzending tot ${toKg} kg` : `Verzending ${fromKg} tot ${toKg} kg`),
      heavy: { k: "Verzending boven 10 kg", v: "Op aanvraag" },
    },
    approach: {
      title: "Hoe ik tot je offerte kom",
      steps: [
        { k: "Je stuurt wat je hebt", v: "Een bestand, foto's met maten of een beschrijving. Een link naar je bestand volstaat." },
        { k: "Ik bekijk het zelf", v: "Ik controleer of het printbaar is, kies het materiaal en zeg eerlijk als iets anders beter werkt." },
        { k: "Je krijgt één eindprijs", v: "Zonder verrassingen achteraf. Meestal onder de richtprijs van de prijswijzer." },
      ],
      same: "Particulieren en bedrijven betalen dezelfde prijs. Btw niet toegepast (kleineondernemersregeling).",
      cta: "Vraag je offerte aan",
    },
    faq: {
      title: "Veelgestelde vragen over prijzen",
      items: (s: string, m: string, l: string) => [
        {
          q: "Hoeveel kost 3D printen?",
          a: `Een klein stuk in PLA Matte kost ongeveer EUR ${s}, een middelgroot stuk ongeveer EUR ${m} en een groot stuk ongeveer EUR ${l}. De prijs hangt af van materiaal, gewicht, printtijd en aantal. Met de prijswijzer op deze pagina zie je in vier stappen wat jouw stuk ongeveer kost.`,
        },
        {
          q: "Waarom verschilt mijn offerte van de prijswijzer?",
          a: "De prijswijzer rekent met gemiddelden en bewust ruim. Zodra ik je bestand of je stuk bekeken heb, ken ik het echte gewicht en de printtijd. Meestal valt de offerte dan lager uit.",
        },
        {
          q: "Welk materiaal moet ik kiezen?",
          a: "Dat hangt af van waar het stuk terechtkomt. Voor binnen volstaat PLA vaak, PETG kan beter tegen warmte, ASA is gemaakt voor buiten en TPU voor stukken die moeten buigen. In de prijswijzer kies je het gebruik en krijg je mijn advies erbij.",
        },
        {
          q: "Reken je btw aan?",
          a: "Nee. X3DPrints valt onder de kleineondernemersregeling, dus er wordt geen btw aangerekend. Particulieren en bedrijven betalen dezelfde prijs.",
        },
        {
          q: "Wat kost 3D scannen?",
          a: "Het vooronderzoek is gratis. Een scan kost vanaf EUR 45 en het afgesproken scanbestand zit erbij. Scannen en ontwerpwerk reken ik één keer aan, niet per geprint stuk.",
        },
        {
          q: "Wat kost verzending?",
          a: "Afhalen is gratis, 24 op 7 in de beveiligde afhaalbox in Herzele. Verzenden kost EUR 7,50 tot 2 kg, EUR 8 tot 5 kg en EUR 9 tot 10 kg. Zwaardere pakketten op aanvraag.",
        },
        {
          q: "Hoe snel is mijn print klaar?",
          a: "Meestal binnen enkele werkdagen, afhankelijk van de complexiteit en het aantal. De actuele levertijd staat bovenaan deze pagina.",
        },
        {
          q: "Krijg ik een betere prijs bij grotere aantallen?",
          a: "Bij grotere aantallen kan ik de prijs verder optimaliseren. Vermeld het aantal in je aanvraag, dan reken ik het voor je uit.",
        },
      ],
      more: "Alle veelgestelde vragen",
    },
    sources: {
      title: "Bronnen",
      intro: "Materiaaleigenschappen en kostfactoren in deze pagina steunen op deze bronnen.",
      items: [
        { label: "Bambu Lab filamentoverzicht", url: "https://wiki.bambulab.com/en/filament-acc/filament/overview" },
        { label: "Prusa materiaalgids (PLA, PETG, TPU)", url: "https://help.prusa3d.com/filament-material-guide" },
        { label: "All3DP over kostfactoren bij FDM", url: "https://all3dp.com/2/3d-printing-cost-calculator-great-web-tools/" },
      ],
    },
    readMore: {
      title: "Verder lezen",
      intro: "Leg de prijzen naast materialen, voorbeelden en de manier waarop ik werk.",
    },
    toc: [
      { id: "pricing-estimator", label: "Bereken je richtprijs" },
      { id: "pricing-overview", label: "Wat kost 3D printen?" },
      { id: "pricing-modifiers", label: "Wat bepaalt de prijs?" },
      { id: "pricing-scanning", label: "Wat kost 3D scannen?" },
      { id: "pricing-shipping", label: "Ontwerp, verzending en afhalen" },
      { id: "pricing-approach", label: "Hoe ik tot je offerte kom" },
      { id: "pricing-faq", label: "Veelgestelde vragen" },
      { id: "pricing-sources", label: "Bronnen" },
    ],
    schema: {
      catalogName: "X3DPrints richtprijzen 3D printen en 3D scannen",
      serviceName: "3D print prijzen en offertes",
      intake: { name: "3D scan vooronderzoek", description: "Gratis haalbaarheidscheck op basis van foto's, afmetingen en gewenste output." },
      offer: (size: string, material: string) => `3D print ${size} in ${material}`,
    },
  },
  en: {
    breadcrumbHome: "Home",
    breadcrumbPage: "Pricing",
    hero: {
      title: "3D printing and 3D scanning pricing",
      intro:
        "Answer four short questions and you instantly see what your part roughly costs, with my material advice included. I then review your request myself and you get a quote with one final price.",
      facts: (small: string) => [
        { k: "Small part", v: `± EUR ${small}` },
        { k: "3D scan", v: "from EUR 45" },
        { k: "Design", v: `EUR ${DEFAULT_DESIGN_RATE_EUR_PER_HOUR} per hour` },
        { k: "Pickup", v: "free, 24/7" },
      ],
      primary: "Work out your price",
      secondary: "Request a quote right away",
      updated: "Last updated: October 4, 2026",
      toc: "On this page",
    },
    guide: {
      title: "Work out your guide price in four steps",
      intro:
        "Tell me what the part is for and I choose the material. You get two or three prices side by side: a basic version, my advice and, where it makes sense, a premium version.",
      advanced: "Prefer to set everything yourself? Open the detailed calculator",
    },
    table: {
      title: "What does 3D printing cost?",
      answer: (s: string, m: string, l: string) =>
        `A small part in PLA Matte costs about EUR ${s}, a medium part about EUR ${m} and a large part about EUR ${l}. The stronger or more heat resistant the material, the higher the price. Below is the guide price per piece for the materials I use most.`,
      caption: "3D printing prices: guide price per piece by size and material, at standard layer height",
      sizeHeader: "Size",
      sizes: {
        Small: { name: "Small", detail: "up to ± 5 cm" },
        Medium: { name: "Medium", detail: "up to ± 10 cm" },
        Large: { name: "Large", detail: "up to ± 20 cm" },
      } satisfies Record<Tier, { name: string; detail: string }>,
      grams: (g: number) => `± ${g} g`,
      note:
        "Guide prices, rounded down, excluding shipping. I only know the real weight and print time once I see your file, which is why the quote usually comes out lower.",
    },
    factors: {
      title: "What determines the price?",
      intro: "Four things, and I spell out all four in your quote.",
      items: [
        { k: "Material", v: "Every material has its own price per kilo. PLA and PETG are the most affordable, technical materials such as PC or carbon fibre nylon the most expensive." },
        { k: "Weight and size", v: "More volume means more filament. A hollow or well designed part often weighs much less than you expect." },
        { k: "Print time and layer height", v: "A finer layer gives a nicer finish, but the printer takes longer." },
        { k: "Quantity", v: "For larger quantities I can optimise the price further. Just mention the quantity in your request." },
      ],
      groupsTitle: "Materials in three price classes",
      groups: [
        { label: "PLA (Matte, Basic, Silk, Wood, Marble ...), PETG, ABS, ASA", mod: "Base price" },
        { label: "TPU (flexible), PC", mod: "Higher" },
        { label: "Fibre reinforced (CF/GF) and nylon", mod: "Highest" },
      ],
      drying:
        "Materials that need drying first (PETG, TPU, PC, wood fill) get a small drying surcharge per order. The price guide already includes it.",
      materialsLink: "See all materials and colours",
    },
    scan: {
      title: "What does 3D scanning cost?",
      intro:
        "The feasibility check is free: based on photos and dimensions I first tell you whether scanning is the best route. Sometimes measuring and redrawing is faster and more accurate. The agreed scan file is always included.",
      caption: "3D scanning prices, per scan",
      colService: "Scan",
      colWhat: "Best for",
      colPrice: "Price",
      more: "More about 3D scanning",
    },
    extras: {
      title: "Design, shipping and pickup",
      designTitle: "Design and CAD",
      design: [
        { k: "Your own file (STL, STEP, 3MF)", v: "Checked for free" },
        { k: "Custom design", v: `EUR ${DEFAULT_DESIGN_RATE_EUR_PER_HOUR} per hour` },
        { k: "Redrawing after scan or measuring", v: `EUR ${DEFAULT_DESIGN_RATE_EUR_PER_HOUR} per hour` },
      ],
      designNote: "Design work is charged once, not per printed piece.",
      shippingTitle: "Shipping and pickup",
      pickup: { k: "Pickup", v: "Free, 24/7 from the secure pickup box in Herzele" },
      zoneLabel: (fromKg: number, toKg: number) => (fromKg === 0 ? `Shipping up to ${toKg} kg` : `Shipping ${fromKg} to ${toKg} kg`),
      heavy: { k: "Shipping above 10 kg", v: "On request" },
    },
    approach: {
      title: "How I get to your quote",
      steps: [
        { k: "You send what you have", v: "A file, photos with dimensions or a description. A link to your file is enough." },
        { k: "I review it myself", v: "I check whether it prints well, choose the material and tell you honestly if something else works better." },
        { k: "You get one final price", v: "No surprises afterwards. Usually below the guide price from the price guide." },
      ],
      same: "Individuals and businesses pay the same price. No VAT charged (Belgian small business scheme).",
      cta: "Request your quote",
    },
    faq: {
      title: "Pricing questions",
      items: (s: string, m: string, l: string) => [
        {
          q: "How much does 3D printing cost?",
          a: `A small part in PLA Matte costs about EUR ${s}, a medium part about EUR ${m} and a large part about EUR ${l}. The price depends on material, weight, print time and quantity. The price guide on this page shows in four steps what your part roughly costs.`,
        },
        {
          q: "Why does my quote differ from the price guide?",
          a: "The price guide works with averages and estimates on the generous side. Once I have seen your file or your part, I know the real weight and print time. The quote then usually comes out lower.",
        },
        {
          q: "Which material should I choose?",
          a: "It depends on where the part ends up. PLA is often fine indoors, PETG handles heat better, ASA is made for outdoor use and TPU for parts that need to flex. In the price guide you pick the use and get my advice with it.",
        },
        {
          q: "Do you charge VAT?",
          a: "No. X3DPrints falls under the Belgian small business scheme, so no VAT is charged. Individuals and businesses pay the same price.",
        },
        {
          q: "What does 3D scanning cost?",
          a: "The feasibility check is free. A scan starts from EUR 45 and includes the agreed scan file. Scanning and design work are charged once, not per printed piece.",
        },
        {
          q: "What does shipping cost?",
          a: "Pickup is free, 24/7 from the secure pickup box in Herzele. Shipping costs EUR 7.50 up to 2 kg, EUR 8 up to 5 kg and EUR 9 up to 10 kg. Heavier parcels on request.",
        },
        {
          q: "How fast is my print ready?",
          a: "Usually within a few working days, depending on complexity and quantity. The current lead time is shown at the top of this page.",
        },
        {
          q: "Do I get a better price for larger quantities?",
          a: "For larger quantities I can optimise the price further. Mention the quantity in your request and I will work it out for you.",
        },
      ],
      more: "All frequently asked questions",
    },
    sources: {
      title: "Sources",
      intro: "Material properties and cost factors on this page are based on these sources.",
      items: [
        { label: "Bambu Lab filament overview", url: "https://wiki.bambulab.com/en/filament-acc/filament/overview" },
        { label: "Prusa material guide (PLA, PETG, TPU)", url: "https://help.prusa3d.com/filament-material-guide" },
        { label: "All3DP FDM cost factors", url: "https://all3dp.com/2/3d-printing-cost-calculator-great-web-tools/" },
      ],
    },
    readMore: {
      title: "Further reading",
      intro: "Put the prices next to materials, examples and the way I work.",
    },
    toc: [
      { id: "pricing-estimator", label: "Work out your guide price" },
      { id: "pricing-overview", label: "What does 3D printing cost?" },
      { id: "pricing-modifiers", label: "What determines the price?" },
      { id: "pricing-scanning", label: "What does 3D scanning cost?" },
      { id: "pricing-shipping", label: "Design, shipping and pickup" },
      { id: "pricing-approach", label: "How I get to your quote" },
      { id: "pricing-faq", label: "Frequently asked questions" },
      { id: "pricing-sources", label: "Sources" },
    ],
    schema: {
      catalogName: "X3DPrints guide prices for 3D printing and 3D scanning",
      serviceName: "3D printing pricing and quotes",
      intake: { name: "3D scan feasibility check", description: "Free feasibility check based on photos, dimensions and desired output." },
      offer: (size: string, material: string) => `3D print ${size} in ${material}`,
    },
  },
}

const resolveLocaleOverride = (props: unknown): "nl" | "en" => {
  if (typeof props !== "object" || props === null) return "nl"
  const localeOverride = (props as { localeOverride?: unknown }).localeOverride
  return localeOverride === "en" ? "en" : "nl"
}

export default function Page(props: unknown) {
  const locale = resolveLocaleOverride(props)
  const isEn = locale === "en"
  const copy = COPY[locale]
  const fmt = isEn ? formatEurEn : formatEurNl
  const localize = (href: string) => localizeHref(href, locale)
  const siteUrl = "https://www.x3dprints.be"
  const pageUrl = isEn ? `${siteUrl}/en/pricing/` : `${siteUrl}/pricing/`

  // Eén bron: alle bedragen op de pagina komen uit lib/pricing via de prijswijzer-helpers.
  const priceTable = TIERS.map((tier) => ({
    tier,
    grams: GRAMS_PER_TIER[tier],
    prices: GUIDE_TABLE_MATERIALS.map((material) => ({ material, price: guideUnitPrice(material, tier) })),
  }))
  const [small, medium, large] = TIERS.map((tier) => fmt(guideUnitPrice("PLA_MATTE", tier)))
  const faqItems = copy.faq.items(small, medium, large)

  const shippingRows = [
    copy.extras.pickup,
    ...SHIPPING_RATES_EUR.map((rate, i) => ({
      k: copy.extras.zoneLabel(i === 0 ? 0 : SHIPPING_RATES_EUR[i - 1].maxGrams / 1000, rate.maxGrams / 1000),
      v: `EUR ${fmt(rate.priceEur)}`,
    })),
    copy.extras.heavy,
  ]

  const pricingOffers: SchemaOfferInput[] = [
    ...priceTable.flatMap((row) =>
      row.prices
        .filter((p) => p.material === "PLA_MATTE" || p.material === "PETG")
        .map((p) => ({
          serviceName: copy.schema.offer(copy.table.sizes[row.tier].name.toLowerCase(), guideMaterialLabel(p.material)),
          price: `EUR ${p.price}`,
          description: `${copy.table.sizes[row.tier].detail}, ${copy.table.grams(row.grams)}`,
          url: pageUrl,
        })),
    ),
    { serviceName: copy.schema.intake.name, price: "EUR 0", description: copy.schema.intake.description, url: pageUrl },
    ...SCAN_PRICES.map((item) => ({
      serviceName: isEn ? item.labelEn : item.labelNl,
      price: formatScanPrice(item.price),
      description: isEn ? item.descriptionEn : item.descriptionNl,
      url: pageUrl,
    })),
  ]
  const pageDescription = isEn
    ? "3D printing and 3D scanning prices in Belgium with a step-by-step price guide and material advice."
    : String(metadata.description ?? "")

  const offerCatalog = buildOfferCatalog(copy.schema.catalogName, pricingOffers)
  const faqJsonLd = buildFaqPageSchema({ items: faqItems, inLanguage: isEn ? "en-BE" : "nl-BE", mainEntityOfPage: pageUrl })
  const localBusinessJsonLd = buildLocalBusinessSchema({
    pageUrl,
    description: pageDescription,
    image: isEn ? "/images/og-pricing-en.svg" : "/images/og-pricing-nl.svg",
    priceRange: "EUR 5 - EUR 250+",
    areaServed: "BE",
    offersName: copy.schema.catalogName,
    offers: pricingOffers,
  })
  const serviceJsonLd = buildServiceSchema(copy.schema.serviceName, pricingOffers, pageUrl, {
    description: pageDescription,
    inLanguage: isEn ? "en-BE" : "nl-BE",
    mainEntityOfPage: pageUrl,
  })
  const breadcrumbJsonLd = buildBreadcrumbSchema({
    id: `${pageUrl}#breadcrumb`,
    inLanguage: isEn ? "en-BE" : "nl-BE",
    items: [
      { name: copy.breadcrumbHome, url: isEn ? `${siteUrl}/en/` : `${siteUrl}/` },
      { name: copy.breadcrumbPage, url: pageUrl },
    ],
  })

  const sectionTitle = "text-balance text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
  const sectionLede = "mt-3 max-w-[65ch] text-base leading-7 text-slate-600"

  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[40rem] bg-[radial-gradient(90%_60%_at_20%_0%,rgba(99,102,241,.14),transparent_70%),radial-gradient(60%_50%_at_90%_10%,rgba(16,185,129,.10),transparent_70%)]"
      />

      {/* HERO */}
      <section className="px-6 pt-12 pb-10 sm:px-8 sm:pt-16 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
          <Reveal>
            <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
              <ol className="flex items-center gap-2">
                <li>
                  <Link href={localize("/")} className="transition hover:text-slate-900">
                    {copy.breadcrumbHome}
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-slate-700">
                  {copy.breadcrumbPage}
                </li>
              </ol>
            </nav>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">{copy.hero.title}</h1>
            <p className="mt-4 max-w-[60ch] text-lg leading-8 text-slate-600">{copy.hero.intro}</p>

            <dl className="mt-8 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-5 border-y border-slate-200/80 py-5 sm:grid-cols-4">
              {copy.hero.facts(small).map((fact) => (
                <div key={fact.k}>
                  <dt className="text-sm text-slate-500">{fact.k}</dt>
                  <dd className="mt-1 text-lg font-semibold tabular-nums text-slate-900">{fact.v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <ShimmerButton href="#pricing-estimator" event={{ action: "cta_click", category: "pricing_hero", label: "guide" }}>
                {copy.hero.primary}
              </ShimmerButton>
              <Link
                href={localize("/contact")}
                className="text-sm font-semibold text-indigo-600 underline-offset-4 transition hover:text-indigo-500 hover:underline"
              >
                {copy.hero.secondary}
              </Link>
            </div>
            <LeadTimeStatus locale={locale} className="mt-8 max-w-2xl" />
            <p className="mt-4 text-sm text-slate-500">{copy.hero.updated}</p>
          </Reveal>

          <Reveal delay={0.05} className="hidden lg:block">
            <ContentTableOfContents title={copy.hero.toc} items={copy.toc} className="lg:sticky lg:top-28" />
          </Reveal>
        </div>
      </section>

      {/* PRIJSWIJZER */}
      <section id="pricing-estimator" className="relative isolate scroll-mt-24 overflow-hidden bg-slate-950 py-16 sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_18%,rgba(16,185,129,0.24),transparent_32%),radial-gradient(circle_at_88%_6%,rgba(6,182,212,0.22),transparent_30%),linear-gradient(135deg,#020617,#0f172a_55%,#042f2e)]"
        />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent" />
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">{copy.guide.title}</h2>
            <p className="mt-3 max-w-[62ch] text-base leading-7 text-slate-300">{copy.guide.intro}</p>
          </div>
          <div className="mt-10">
            <PriceGuide locale={locale} />
          </div>
          <details className="group mt-8 rounded-3xl border border-slate-700/70 bg-slate-950/40">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-sm font-semibold text-slate-200 transition hover:text-white [&::-webkit-details-marker]:hidden">
              {copy.guide.advanced}
              <span aria-hidden className="text-lg text-emerald-300 transition group-open:rotate-45">+</span>
            </summary>
            <div className="px-3 pb-3 sm:px-4 sm:pb-4">
              <PriceEstimator locale={locale} />
            </div>
          </details>
        </div>
      </section>

      {/* PRIJSTABEL */}
      <section id="pricing-overview" className="scroll-mt-24 px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className={sectionTitle}>{copy.table.title}</h2>
            <p className={sectionLede}>{copy.table.answer(small, medium, large)}</p>
          </Reveal>
          <p aria-hidden className="mt-10 text-sm font-medium text-slate-600">{copy.table.caption}</p>
          <div className="mt-3 overflow-x-auto rounded-3xl border border-slate-200/80 bg-white/80 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
            <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
              <caption className="sr-only">{copy.table.caption}</caption>
              <thead>
                <tr className="border-b border-slate-200/80 text-slate-500">
                  <th scope="col" className="px-5 py-4 font-medium">
                    {copy.table.sizeHeader}
                  </th>
                  {GUIDE_TABLE_MATERIALS.map((material) => (
                    <th key={material} scope="col" className="whitespace-nowrap px-4 py-4 text-right font-medium sm:px-5">
                      {guideMaterialLabel(material)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {priceTable.map((row) => (
                  <tr key={row.tier} className="border-b border-slate-100 last:border-0">
                    <th scope="row" className="px-4 py-4 font-normal sm:px-5">
                      <span className="block font-semibold text-slate-900">{copy.table.sizes[row.tier].name}</span>
                      <span className="block text-slate-500">
                        {copy.table.sizes[row.tier].detail}, {copy.table.grams(row.grams)}
                      </span>
                    </th>
                    {row.prices.map((p) => (
                      <td key={p.material} className="whitespace-nowrap px-4 py-4 text-right text-base font-semibold tabular-nums text-slate-900 sm:px-5">
                        EUR {fmt(p.price)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-[70ch] text-sm leading-6 text-slate-500">{copy.table.note}</p>
        </div>
      </section>

      {/* PRIJSFACTOREN */}
      <section id="pricing-modifiers" className="scroll-mt-24 px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <Reveal>
            <h2 className={sectionTitle}>{copy.factors.title}</h2>
            <p className={sectionLede}>{copy.factors.intro}</p>
            <dl className="mt-8 space-y-6">
              {copy.factors.items.map((item) => (
                <div key={item.k} className="grid gap-1 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
                  <dt className="font-semibold text-slate-900">{item.k}</dt>
                  <dd className="leading-7 text-slate-600">{item.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)] sm:p-8">
              <h3 className="text-lg font-semibold text-slate-900">{copy.factors.groupsTitle}</h3>
              <ul className="mt-4 divide-y divide-slate-100">
                {copy.factors.groups.map((group) => (
                  <li key={group.label} className="flex items-baseline justify-between gap-4 py-3 text-sm">
                    <span className="text-slate-700">{group.label}</span>
                    <span className="shrink-0 font-semibold text-slate-900">{group.mod}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-6 text-slate-500">{copy.factors.drying}</p>
              <Link
                href={localize("/materials")}
                className="mt-5 inline-flex text-sm font-semibold text-indigo-600 underline-offset-4 transition hover:text-indigo-500 hover:underline"
              >
                {copy.factors.materialsLink}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3D SCANNEN */}
      <section id="pricing-scanning" className="scroll-mt-24 border-t border-slate-200/70 px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className={sectionTitle}>{copy.scan.title}</h2>
            <p className={sectionLede}>{copy.scan.intro}</p>
          </Reveal>
          <div className="mt-10 overflow-x-auto rounded-3xl border border-slate-200/80 bg-white/80 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
            <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
              <caption className="sr-only">{copy.scan.caption}</caption>
              <thead>
                <tr className="border-b border-slate-200/80 text-slate-500">
                  <th scope="col" className="px-5 py-4 font-medium">{copy.scan.colService}</th>
                  <th scope="col" className="px-5 py-4 font-medium">{copy.scan.colWhat}</th>
                  <th scope="col" className="px-5 py-4 text-right font-medium">{copy.scan.colPrice}</th>
                </tr>
              </thead>
              <tbody>
                {SCAN_PRICES.map((item) => (
                  <tr key={item.key} className="border-b border-slate-100 last:border-0">
                    <th scope="row" className="px-5 py-4 font-semibold text-slate-900">{isEn ? item.labelEn : item.labelNl}</th>
                    <td className="px-5 py-4 text-slate-600">{isEn ? item.descriptionEn : item.descriptionNl}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-right text-base font-semibold tabular-nums text-slate-900">EUR {item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link
            href={localize("/3d-scannen")}
            className="mt-5 inline-flex text-sm font-semibold text-indigo-600 underline-offset-4 transition hover:text-indigo-500 hover:underline"
          >
            {copy.scan.more}
          </Link>
        </div>
      </section>

      {/* ONTWERP, VERZENDING, AFHALEN */}
      <section id="pricing-shipping" className="scroll-mt-24 px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className={sectionTitle}>{copy.extras.title}</h2>
          </Reveal>
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{copy.extras.designTitle}</h3>
              <dl className="mt-4 divide-y divide-slate-200/80 border-y border-slate-200/80">
                {copy.extras.design.map((row) => (
                  <div key={row.k} className="flex items-baseline justify-between gap-4 py-3 text-sm">
                    <dt className="text-slate-700">{row.k}</dt>
                    <dd className="shrink-0 font-semibold tabular-nums text-slate-900">{row.v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-sm text-slate-500">{copy.extras.designNote}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{copy.extras.shippingTitle}</h3>
              <dl className="mt-4 divide-y divide-slate-200/80 border-y border-slate-200/80">
                {shippingRows.map((row) => (
                  <div key={row.k} className="flex items-baseline justify-between gap-4 py-3 text-sm">
                    <dt className="text-slate-700">{row.k}</dt>
                    <dd className="text-right font-semibold tabular-nums text-slate-900">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* WERKWIJZE */}
      <section id="pricing-approach" className="scroll-mt-24 px-6 pb-20 sm:px-8 lg:px-12">
        <div className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/80 p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-12">
          {/* Werkt in licht en donker: de achtergrond volgt de globale bg-white-remap, de gloed blijft transparant. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_0%_0%,rgba(99,102,241,0.14),transparent_70%),radial-gradient(50%_70%_at_100%_100%,rgba(16,185,129,0.14),transparent_70%)]"
          />
          <Reveal>
            <h2 className={sectionTitle}>{copy.approach.title}</h2>
            <ol className="mt-10 grid gap-8 md:grid-cols-3">
              {copy.approach.steps.map((step, i) => (
                <li key={step.k}>
                  <span className="text-sm font-semibold tabular-nums text-indigo-600">{i + 1}</span>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{step.k}</p>
                  <p className="mt-2 leading-7 text-slate-600">{step.v}</p>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-slate-200/80 pt-8">
              <ShimmerButton href={localize("/contact")} event={{ action: "cta_click", category: "pricing_cta", label: "contact" }}>
                {copy.approach.cta}
              </ShimmerButton>
              <p className="max-w-md text-sm leading-6 text-slate-600">{copy.approach.same}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="pricing-faq" className="scroll-mt-24 px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <Reveal>
            <h2 className={sectionTitle}>{copy.faq.title}</h2>
            <Link
              href={localize("/faq")}
              className="mt-5 inline-flex text-sm font-semibold text-indigo-600 underline-offset-4 transition hover:text-indigo-500 hover:underline"
            >
              {copy.faq.more}
            </Link>
          </Reveal>
          <div className="divide-y divide-slate-200/80 border-y border-slate-200/80">
            {faqItems.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-base font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base font-semibold">{item.q}</h3>
                  <span aria-hidden className="mt-0.5 text-lg leading-none text-indigo-500 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-[65ch] leading-7 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ReadMoreLinks pageType="pricing" title={copy.readMore.title} intro={copy.readMore.intro} />

      {/* BRONNEN */}
      <section id="pricing-sources" className="scroll-mt-24 px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-xl font-semibold text-slate-900">{copy.sources.title}</h2>
          <p className="mt-2 text-sm text-slate-600">{copy.sources.intro}</p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {copy.sources.items.map((source) => (
              <li key={source.url}>
                <cite className="not-italic">
                  <Link
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-indigo-600 underline-offset-4 hover:text-indigo-500 hover:underline"
                  >
                    {source.label}
                  </Link>
                </cite>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalog) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
    </main>
  )
}
