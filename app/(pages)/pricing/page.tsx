// app/(pages)/pricing/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2, Clock3, MapPin, Wallet } from "lucide-react"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import PriceEstimator from "@/components/PriceEstimator"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import { GRAMS_PER_TIER, calcUnitPrice, type Quality, type Tier } from "@/lib/pricing"
import type { MaterialKey } from "@/lib/materials"
import FaqPromo from "@/components/FaqPromo"
import ReadMoreLinks from "@/components/ReadMoreLinks"
import { normalizeLocale } from "@/lib/i18n/locales"
import { localizeHref } from "@/lib/i18n/paths"
import {
  buildFaqPageSchema,
  buildLocalBusinessSchema,
  buildOfferCatalog,
  buildServiceSchema,
  type SchemaOfferInput,
} from "@/lib/seo"

const NL_METADATA: Metadata = {
  title: "3D print prijs en prijzen 3D printen | X3DPrints",
  description:
    "Wat kost 3D printen? Bekijk je 3D print prijs vanaf EUR 5 (small), EUR 20 (medium) en EUR 49 (large), inclusief materiaalkeuze en heldere offerte binnen 24 uur.",
  alternates: {
    canonical: "https://www.x3dprints.be/pricing/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/pricing/",
      "en-BE": "https://www.x3dprints.be/en/pricing/",
      "x-default": "https://www.x3dprints.be/pricing/",
    },
  },
  openGraph: {
    title: "3D print prijs: wat kost 3D printen?",
    description:
      "Kosten 3D printen: vanaf EUR 5 (small), EUR 20 (medium) en EUR 49 (large). Gebruik de calculator voor actuele simulaties in België.",
    url: "https://www.x3dprints.be/pricing/",
    images: [{ url: "/images/portfolio/2d-6-1-1.webp", width: 1200, height: 630, alt: "Prijzen voor 3D printen" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D print prijs en kosten",
    description:
      "Indicatieve kosten 3D printen voor prototypes en series. Gebruik de calculator om impact van materiaal en grootte te zien.",
    images: ["/images/portfolio/2d-6-1-1.webp"],
  },
}

const EN_METADATA: Metadata = {
  title: "3D Printing Prices | X3DPrints",
  description:
    "3D printing prices from EUR 5 (small), EUR 20 (medium) and EUR 49 (large). PLA, PETG and TPU with a clear quote within 24 hours.",
  alternates: {
    canonical: "https://www.x3dprints.be/en/pricing/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/pricing/",
      "en-BE": "https://www.x3dprints.be/en/pricing/",
      "x-default": "https://www.x3dprints.be/pricing/",
    },
  },
  openGraph: {
    title: "3D printing prices",
    description:
      "3D printing from EUR 5 (small), EUR 20 (medium) and EUR 49 (large). PLA, PETG and TPU. Delivery across Belgium.",
    url: "https://www.x3dprints.be/en/pricing/",
    images: [{ url: "/images/portfolio/2d-6-1-1.webp", width: 1200, height: 630, alt: "3D printing prices" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printing prices",
    description:
      "Indicative rates for prototypes and small to large batches. Materials: PLA (standard), PLA+ variants, PETG and TPU. Delivery across Belgium.",
    images: ["/images/portfolio/2d-6-1-1.webp"],
  },
}


void EN_METADATA

export const metadata: Metadata = NL_METADATA

const PRICING_COPY_NL = {
  hero: {
    title: "Prijzen 3D printen",
    body:
      "Zoek je een snelle 3D print prijs? Richtprijzen: kleine prints starten rond EUR 5, medium rond EUR 20 en grotere stukken rond EUR 49. PLA Matte is standaard; PLA+ varianten, PETG en TPU zijn beschikbaar voor extra look of performance. Droogbehandeling voor PETG/TPU is inbegrepen. Klaar om te bestellen? Vraag meteen je offerte.",
    ctas: {
      quote: "Offerte aanvragen",
      materials: "Materialen & kleuren",
      blog: "Kostenblog",
      tool: "Material Suggestion Tool",
    },
  },
  tiers: {
    baseMaterialLabel: "PLA Matte (standaard)",
    priceLabel: (price: number) => `EUR ${price.toFixed(2)} / stuk`,
    summary:
      "Richtprijzen bij standaard kwaliteit: Small ~ EUR 5, Medium ~ EUR 20, Large ~ EUR 49. Grotere of zwaardere modellen vergen meer materiaal en tijd.",
    note: "Exacte prijs volgt na modelanalyse; we stemmen levering en afwerking af op jouw use-case.",
    items: [
      {
        name: "Small" as Tier,
        size: "ca. 5 x 5 x 5 cm",
        notes: "Kleine onderdelen, clips, testgeometrie.",
      },
      {
        name: "Medium" as Tier,
        size: "ca. 10 x 10 x 10 cm",
        notes: "Prototypes, kleine behuizingen, decor.",
      },
      {
        name: "Large" as Tier,
        size: "ca. 20 x 20 x 20 cm",
        notes: "Grotere delen, brackets, jigs.",
      },
    ],
  },
  mods: {
    material: {
      title: "Materiaal-opslagen",
      items: [
        { label: "PLA+ / specials (Silk, Wood, Marble, Translucent)", mod: "+20%" },
        { label: "PETG (incl. droogbehandeling)", mod: "+20%" },
        { label: "TPU (incl. droogbehandeling)", mod: "+30%" },
      ],
      note: "PETG/TPU worden vooraf gedroogd voor optimale kwaliteit. Deze behandeling is meegerekend.",
    },
    quality: {
      title: "Kwaliteit (layerhoogte)",
      items: [
        { label: "Standaard layerhoogte (0,2-0,28 mm)", mod: "0%" },
        { label: "Fijn (~ 0,16 mm)", mod: "+15%" },
        { label: "Ultra (~ 0,12 mm)", mod: "+25%" },
      ],
      note: "Kies standaard voor functionele prints. Fijner voor visueel werk of strakkere rondingen.",
    },
  },
  shipping: {
    title: "Verzending & levering",
    items: [
      { k: "Persoonlijke levering", v: "Elektrische wagen, veilig voor grote of breekbare prints. Zie zones hieronder." },
      { k: "Afhalen", v: "Gratis (regio Herzele/Gent, in overleg)" },
      { k: "Pakketdienst", v: "Op aanvraag via pakketdienst, afhankelijk van formaat/gewicht." },
    ],
    deliveryTitle: "Persoonlijke levering (EV)",
    zones: [
      { k: "Zone 1 tot 25 km (EV)", v: "Standaard 48-72u: EUR 15" },
      { k: "Zone 2  25-50 km (EV)", v: "Standaard: EUR 30" },
      { k: "Zone 3  50-75 km (EV)", v: "Standaard: EUR 45" },
      { k: "Verder dan 75 km", v: "Maatwerkprijs of pakketdienst, in overleg" },
      { k: "Vertrekpunt", v: "Afstanden gerekend vanaf Herzele (heen en terug)" },
    ],
  },
  design: {
    title: "Ontwerpservice",
    items: [
      { k: "Eigen ontwerp (STL/STEP)", v: "Gratis beoordeling + offerte" },
      { k: "Ontwerp op maat", v: "EUR 45/uur (incl. digitaal voorbeeld voor productie)" },
    ],
    note: "Voor CAD-hertekenen of complexe aanpassingen stemmen we de aanpak vooraf af.",
  },
  cta: {
    title: "Offerte nodig?",
    body: "Upload STL/STEP met een korte beschrijving. Je krijgt snel een voorstel met materiaaladvies, prijs en levertermijn.",
    primary: "Offerte aanvragen",
    secondary: "Services bekijken",
  },
  readMore: {
    title: "Verder verkennen?",
    intro: "Leg prijzen naast materialen, services en voorbeelden voor een snelle beslissing.",
    primary: [
      { label: "3D print service", href: "/services" },
      { label: "Materialen & looks", href: "/materials" },
      { label: "Contact & offerte", href: "/contact" },
    ],
    secondary: [
      { label: "Portfolio", href: "/portfolio" },
      { label: "Segments & cases", href: "/segments" },
      { label: "Material Suggestion Tool", href: "/materials#material-suggestion-tool" },
      { label: "Kostprijs gids", href: "/blog/hoeveel-kost-3d-printen" },
    ],
  },
  faqPromo: {
    title: "Vragen over 3D printen?",
    intro: "Antwoorden over materialen, levertijden, prijzen en onze werkwijze.",
    ctaLabel: "Bekijk de FAQ",
    qaItems: [
      { q: "Welke materialen printen jullie?", a: "Standaard PLA Matte, plus PETG en TPU. Op aanvraag ABS/ASA, Nylon, PA-CF." },
      { q: "Wat is de gebruikelijke doorlooptijd?", a: "Doorgaans enkele werkdagen, afhankelijk van complexiteit en oplage." },
      { q: "Hoe vraag ik een offerte aan?", a: "Bezorg je STL/STEP en korte context via het formulier. Je krijgt snel prijs en timing." },
      { q: "Kan ik al starten zonder exacte materiaalkeuze?", a: "Ja. Start met PLA Matte als basis; wij adviseren daarna of PETG/TPU of specials beter passen." },
    ],
  },
  schema: {
    catalogName: "X3DPrints indicatieve 3D-printtarieven",
  },
}

const PRICING_COPY_EN = {
  hero: {
    title: "3D printing pricing",
    body:
      "Guideline pricing: small prints start around EUR 5, medium around EUR 20 and larger parts around EUR 49. PLA Matte is standard; PLA+ variants, PETG and TPU are available for extra look or performance. Drying for PETG/TPU is included. Ready to order? Request a quote right away.",
    ctas: {
      quote: "Request a quote",
      materials: "Materials & colors",
      blog: "Cost guide",
      tool: "Material Suggestion Tool",
    },
  },
  tiers: {
    baseMaterialLabel: "PLA Matte (standard)",
    priceLabel: (price: number) => `EUR ${price.toFixed(2)} / piece`,
    summary:
      "Guideline prices at standard quality: Small ~ EUR 5, Medium ~ EUR 20, Large ~ EUR 49. Larger or heavier models require more material and time.",
    note: "Final pricing follows after a model check; we align delivery and finish with your use case.",
    items: [
      {
        name: "Small" as Tier,
        size: "approx. 5 x 5 x 5 cm",
        notes: "Small parts, clips, test geometry.",
      },
      {
        name: "Medium" as Tier,
        size: "approx. 10 x 10 x 10 cm",
        notes: "Prototypes, small enclosures, decor.",
      },
      {
        name: "Large" as Tier,
        size: "approx. 20 x 20 x 20 cm",
        notes: "Larger parts, brackets, jigs.",
      },
    ],
  },
  mods: {
    material: {
      title: "Material surcharges",
      items: [
        { label: "PLA+ / specials (Silk, Wood, Marble, Translucent)", mod: "+20%" },
        { label: "PETG (incl. drying)", mod: "+20%" },
        { label: "TPU (incl. drying)", mod: "+30%" },
      ],
      note: "PETG/TPU are dried before printing for optimal quality. This is included.",
    },
    quality: {
      title: "Quality (layer height)",
      items: [
        { label: "Standard layer height (0.2-0.28 mm)", mod: "0%" },
        { label: "Fine (~ 0.16 mm)", mod: "+15%" },
        { label: "Ultra (~ 0.12 mm)", mod: "+25%" },
      ],
      note: "Choose standard for functional prints. Finer works well for visual work or smoother curves.",
    },
  },
  shipping: {
    title: "Shipping and delivery",
    items: [
      { k: "Personal delivery", v: "Electric vehicle, safe for large or fragile prints. See zones below." },
      { k: "Pickup", v: "Free (Herzele/Ghent region, by arrangement)" },
      { k: "Parcel service", v: "On request via carrier, depending on size and weight." },
    ],
    deliveryTitle: "Personal delivery (EV)",
    zones: [
      { k: "Zone 1 up to 25 km (EV)", v: "Standard 48-72h: EUR 15" },
      { k: "Zone 2  25-50 km (EV)", v: "Standard: EUR 30" },
      { k: "Zone 3  50-75 km (EV)", v: "Standard: EUR 45" },
      { k: "Beyond 75 km", v: "Custom quote or carrier shipping, by arrangement" },
      { k: "Starting point", v: "Distances calculated from Herzele (round trip)" },
    ],
  },
  design: {
    title: "Design services",
    items: [
      { k: "Your own design (STL/STEP)", v: "Free review + quote" },
      { k: "Custom design", v: "EUR 45/hour (incl. digital preview for production)" },
    ],
    note: "For CAD redraws or complex edits, we align the approach first.",
  },
  cta: {
    title: "Need a quote?",
    body: "Upload STL/STEP with a short description. You get a fast proposal with material advice, price and lead time.",
    primary: "Request a quote",
    secondary: "View services",
  },
  readMore: {
    title: "Keep exploring?",
    intro: "Pair pricing with materials, services and examples to decide faster.",
    primary: [
      { label: "3D print service", href: "/en/services" },
      { label: "Materials & looks", href: "/en/materials" },
      { label: "Contact & quote", href: "/en/contact" },
    ],
    secondary: [
      { label: "Portfolio", href: "/en/portfolio" },
      { label: "Segments & cases", href: "/en/segments" },
      { label: "Material Suggestion Tool", href: "/en/materials#material-suggestion-tool" },
      { label: "Cost guide", href: "/en/blog/hoeveel-kost-3d-printen" },
    ],
  },
  faqPromo: {
    title: "Questions about 3D printing?",
    intro: "Answers about materials, lead times, pricing and how we work.",
    ctaLabel: "View the FAQ",
    qaItems: [
      { q: "Which materials do you print?", a: "Standard PLA Matte, plus PETG and TPU. ABS/ASA, Nylon, PA-CF on request." },
      { q: "What is the usual lead time?", a: "Typically a few business days, depending on complexity and quantity." },
      { q: "How do I request a quote?", a: "Send your STL/STEP and short context via the form. You get pricing and timing quickly." },
      { q: "Can I start without choosing a material yet?", a: "Yes. Start from PLA Matte as baseline; we can then advise PETG/TPU or specials." },
    ],
  },
  schema: {
    catalogName: "X3DPrints indicative 3D printing pricing",
  },
}

type PageProps = { searchParams?: Promise<{ lang?: string } | undefined> }

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams
  const normalizedLocale = normalizeLocale(params?.lang)
  const isEn = normalizedLocale === "en"
  const copy = isEn ? PRICING_COPY_EN : PRICING_COPY_NL
  const localize = (href: string) => localizeHref(href, normalizedLocale)
  const pageUrl = isEn ? "https://www.x3dprints.be/en/pricing/" : "https://www.x3dprints.be/pricing/"
  const pageDescription = isEn ? EN_METADATA.description ?? "" : NL_METADATA.description ?? ""
  const tocItems = isEn
    ? [
        { id: "pricing-overview", label: "How are the guideline prices structured?" },
        { id: "pricing-modifiers", label: "How do materials and quality affect price?" },
        { id: "pricing-estimator", label: "How can I estimate my project quickly?" },
        { id: "pricing-shipping", label: "What are delivery and design costs?" },
        { id: "pricing-faq", label: "FAQ and quote next step" },
        { id: "pricing-sources", label: "Sources and references" },
        { id: "pricing-fastpath", label: "What is the fastest quote path?" },
      ]
    : [
        { id: "pricing-overview", label: "Hoe zijn de richtprijzen opgebouwd?" },
        { id: "pricing-modifiers", label: "Welke impact hebben materiaal en kwaliteit?" },
        { id: "pricing-estimator", label: "Hoe maak je snel een schatting?" },
        { id: "pricing-shipping", label: "Wat kosten levering en ontwerpwerk?" },
        { id: "pricing-faq", label: "FAQ en offerte-stap" },
        { id: "pricing-sources", label: "Bronnen en referenties" },
        { id: "pricing-fastpath", label: "Wat is de snelste offerte-route?" },
      ]
  const references = isEn
    ? [
        { label: "Prusa material guide (PLA, PETG, TPU)", url: "https://help.prusa3d.com/filament-material-guide" },
        { label: "All3DP FDM cost factors", url: "https://all3dp.com/2/3d-printing-cost-calculator-great-web-tools/" },
        { label: "Bambu Lab filament overview", url: "https://wiki.bambulab.com/en/filament-acc/filament/overview" },
      ]
    : [
        { label: "Prusa materiaalgids (PLA, PETG, TPU)", url: "https://help.prusa3d.com/filament-material-guide" },
        { label: "All3DP over kostfactoren bij FDM", url: "https://all3dp.com/2/3d-printing-cost-calculator-great-web-tools/" },
        { label: "Bambu Lab filamentoverzicht", url: "https://wiki.bambulab.com/en/filament-acc/filament/overview" },
      ]
  const lastUpdatedLabel = isEn ? "Last updated: February 6, 2026" : "Laatst bijgewerkt: 6 februari 2026"

  const baseMaterial: MaterialKey = "PLA_MATTE"
  const baseQuality: Quality = "Standaard"
  const tierDefs = copy.tiers.items
  const tiers = tierDefs.map((t) => {
    const grams = GRAMS_PER_TIER[t.name]
    const price = calcUnitPrice(t.name, baseMaterial, baseQuality)
    return {
      ...t,
      base: copy.tiers.baseMaterialLabel,
      grams,
      price,
      priceLabel: copy.tiers.priceLabel(price),
    }
  })

  const quickPathCopy = isEn
    ? {
        title: "Fastest quote path per project size",
        intro:
          "Pick your closest tier and jump to contact with a prefilled pricing context. You can still refine material, finish and quantity afterwards.",
        subtitle: "Final step",
        cta: "Start this quote path",
      }
    : {
        title: "Snelste offerte-route per projectgrootte",
        intro:
          "Kies de dichtstbijzijnde klasse en spring met vooraf ingevulde prijscontext naar contact. Materiaal, afwerking en aantallen verfijnen we daarna samen.",
        subtitle: "Laatste stap",
        cta: "Start deze offerte-route",
      }
  const heroFacts = isEn
    ? [
        { icon: Wallet, label: "Baseline rates", value: "EUR 5, EUR 20, EUR 49" },
        { icon: Clock3, label: "Quote response", value: "Usually within 24 hours" },
        { icon: MapPin, label: "Coverage", value: "Herzele, Ghent and all of Belgium" },
      ]
    : [
        { icon: Wallet, label: "Richtprijzen", value: "EUR 5, EUR 20, EUR 49" },
        { icon: Clock3, label: "Offerteantwoord", value: "Meestal binnen 24 uur" },
        { icon: MapPin, label: "Dekking", value: "Herzele, Gent en heel Belgie" },
      ]
  const heroTrustPoints = isEn
    ? [
        "Clear 3D print price model for prototypes and small to large batches",
        "Material-linked cost logic for PLA, PETG and TPU",
        "Fast route from estimate to quote-ready contact",
      ]
    : [
        "Duidelijk 3D print prijsmodel voor prototypes en kleine reeksen",
        "Materiaalgebonden kostenlogica voor PLA, PETG en TPU",
        "Snelle route van schatting naar offerteklare aanvraag",
      ]
  const tiersLead = isEn
    ? "These guideline tiers are optimized for quick decisions around 3D printing cost and feasibility."
    : "Deze richtklassen zijn geoptimaliseerd voor snelle beslissingen rond kosten 3D printen en haalbaarheid."
  const estimatorLead = isEn
    ? "Use the estimator first, then open the fastest quote path at the bottom for direct conversion."
    : "Gebruik eerst de calculator en open onderaan de snelste offerte-route voor directe conversie."

  const buildTierQuoteHref = (tierName: Tier) => {
    const summary = isEn
      ? `Pricing path: ${tierName} in PLA Matte baseline`
      : `Prijsroute: ${tierName} in PLA Matte basis`
    return localize(`/contact?material=PLA_MATTE&quote=${encodeURIComponent(summary)}`)
  }

  const pricingOffers: SchemaOfferInput[] = tiers.map((tier) => ({
    serviceName: `3D print - ${tier.name}`,
    price: `EUR ${tier.price.toFixed(2)}`,
    description: `${tier.size} · ${tier.base}`,
    url: pageUrl,
  }))

  const offerCatalog = buildOfferCatalog(copy.schema.catalogName, pricingOffers)
  const faqJsonLd = buildFaqPageSchema({
    items: copy.faqPromo.qaItems,
    inLanguage: isEn ? "en-BE" : "nl-BE",
    mainEntityOfPage: pageUrl,
  })
  const localBusinessJsonLd = buildLocalBusinessSchema({
    pageUrl,
    description: pageDescription,
    image: "/images/portfolio/2d-6-1-1.webp",
    priceRange: "EUR 5 - EUR 49",
    areaServed: "BE",
    offersName: copy.schema.catalogName,
    offers: pricingOffers,
  })
  const serviceJsonLd = buildServiceSchema(
    isEn ? "3D printing pricing and quotes" : "3D print prijzen en offertes",
    pricingOffers,
    pageUrl,
    {
      description: pageDescription,
      inLanguage: isEn ? "en-BE" : "nl-BE",
      mainEntityOfPage: pageUrl,
    },
  )

  return (
    <main className="relative">
      {/* BG */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(99,102,241,.14),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.06]" />

      {/* HERO */}
      <section className="px-6 pt-14 pb-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <Reveal>
              <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                {copy.hero.title}
              </h1>
              <p className="mt-3 max-w-3xl text-slate-600">{copy.hero.body}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ShimmerButton
                  href={localize("/contact")}
                  event={{ action: "cta_click", category: "pricing_hero", label: "quote" }}
                >
                  {copy.hero.ctas.quote}
                </ShimmerButton>
                <Link
                  href="#pricing-estimator"
                  className="inline-flex items-center rounded-xl border border-slate-200/80 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                >
                  {isEn ? "Estimate first" : "Eerst snel schatten"}
                </Link>
              </div>
              <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600">
                <Link href={localize("/materials")} className="font-medium text-indigo-600 transition hover:text-indigo-500">
                  {copy.hero.ctas.materials}
                </Link>
                <Link href={localize("/blog/hoeveel-kost-3d-printen")} className="font-medium text-indigo-600 transition hover:text-indigo-500">
                  {copy.hero.ctas.blog}
                </Link>
                <Link href={localize("/materials#material-suggestion-tool")} className="font-medium text-indigo-600 transition hover:text-indigo-500">
                  {copy.hero.ctas.tool}
                </Link>
              </p>
              <ContentTableOfContents
                title={isEn ? "Contents" : "Inhoud"}
                items={tocItems}
                className="mt-6 max-w-2xl"
              />
            </Reveal>
            <Reveal delay={0.05}>
              <GlassCard className="p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  {isEn ? "Pricing snapshot" : "Prijs-snapshot"}
                </p>
                <ul className="mt-4 space-y-3">
                  {heroFacts.map((fact) => (
                    <li key={fact.label} className="flex gap-3 rounded-2xl border border-slate-200/70 bg-white/75 p-3">
                      <fact.icon className="mt-0.5 h-5 w-5 text-indigo-600" aria-hidden />
                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-500">{fact.label}</p>
                        <p className="text-sm font-semibold text-slate-900">{fact.value}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <ul className="mt-5 space-y-2 text-sm text-slate-600">
                  {heroTrustPoints.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" aria-hidden />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="#pricing-fastpath"
                  className="mt-5 inline-flex items-center text-sm font-semibold text-indigo-700 transition hover:text-indigo-600"
                >
                  {isEn ? "Jump to fastest quote route" : "Ga naar snelste offerte-route"} <span className="ml-1" aria-hidden>-&gt;</span>
                </Link>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TIERS */}
      <section id="pricing-overview" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              {isEn ? "Price structure" : "Prijsstructuur"}
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {isEn ? "How are guideline prices built?" : "Hoe zijn de richtprijzen opgebouwd?"}
            </h2>
            <p className="mt-2 text-slate-600">
              {isEn
                ? "Base rates are linked to size tier, material and quality level. Use this table as a planning baseline."
                : "Basistarieven hangen samen met grootteklasse, materiaal en kwaliteitsniveau. Gebruik deze tabel als planningsbasis."}
            </p>
            <p className="mt-2 text-sm text-slate-600">{tiersLead}</p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tiers.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.06}>
                <GlassCard className="h-full border-slate-200/70 bg-white/80 p-6 shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition hover:-translate-y-1">
                  <div className="text-xs uppercase tracking-wide text-slate-500">{t.name}</div>
                  <div className="mt-1 text-lg font-semibold text-slate-900">{t.priceLabel}</div>
                  <div className="mt-1 text-sm text-slate-700">{t.size}</div>
                  <div className="mt-1 text-sm text-slate-500">
                    {t.base} - ~{t.grams}g
                  </div>
                  <p className="mt-3 text-sm text-slate-600">{t.notes}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
          <div className="mt-4 space-y-1 text-xs text-slate-600">
            <p>{copy.tiers.summary}</p>
            <p>{copy.tiers.note}</p>
          </div>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200/70 bg-white/80">
            <table className="min-w-full text-left text-sm text-slate-700">
              <caption className="sr-only">
                {isEn ? "3D printing base price table per size tier" : "Basistabel met 3D-printprijzen per grootteklasse"}
              </caption>
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">{isEn ? "Tier" : "Klasse"}</th>
                  <th className="px-4 py-3">{isEn ? "Size" : "Afmeting"}</th>
                  <th className="px-4 py-3">{isEn ? "Material baseline" : "Materiaalbasis"}</th>
                  <th className="px-4 py-3">{isEn ? "Guideline price" : "Richtprijs"}</th>
                </tr>
              </thead>
              <tbody>
                {tiers.map((tier) => (
                  <tr key={`table-${tier.name}`} className="border-t border-slate-200/60">
                    <td className="px-4 py-3 font-semibold text-slate-900">{tier.name}</td>
                    <td className="px-4 py-3">{tier.size}</td>
                    <td className="px-4 py-3">{tier.base}</td>
                    <td className="px-4 py-3">{tier.priceLabel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* MODIFIERS */}
      <section id="pricing-modifiers" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">{copy.mods.material.title}</h2>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {copy.mods.material.items.map((m) => (
                    <li
                      key={m.label}
                      className="flex items-center justify-between rounded-lg border border-slate-200/70 bg-white/70 px-3 py-2"
                    >
                      <span>{m.label}</span>
                      <span className="font-semibold">{m.mod}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-slate-500">{copy.mods.material.note}</p>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.06}>
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">{copy.mods.quality.title}</h2>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {copy.mods.quality.items.map((m) => (
                    <li
                      key={m.label}
                      className="flex items-center justify-between rounded-lg border border-slate-200/70 bg-white/70 px-3 py-2"
                    >
                      <span>{m.label}</span>
                      <span className="font-semibold">{m.mod}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-slate-500">{copy.mods.quality.note}</p>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ESTIMATOR */}
      <section id="pricing-estimator" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                {isEn ? "Estimate your 3D print cost in 1 minute" : "Schat je 3D print kost in 1 minuut"}
              </h2>
              <p className="mt-2 text-sm text-slate-600">{estimatorLead}</p>
              <div className="mt-4">
                <PriceEstimator locale={normalizedLocale} />
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* SHIPPING & DESIGN */}
      <section id="pricing-shipping" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">{copy.shipping.title}</h2>
                <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                  {copy.shipping.items.map((s) => (
                    <div key={s.k} className="rounded-lg border border-slate-200/70 bg-white/70 p-3">
                      <dt className="text-xs uppercase tracking-wide text-slate-500">{s.k}</dt>
                      <dd className="mt-1 text-sm text-slate-700">{s.v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-4 rounded-xl border border-dashed border-teal-200 bg-white/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">{copy.shipping.deliveryTitle}</p>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {copy.shipping.zones.map((z) => (
                      <div key={z.k} className="rounded-lg border border-white/60 bg-white/80 p-3 shadow-sm">
                        <div className="text-sm font-semibold text-slate-800">{z.k}</div>
                        <div className="mt-1 text-sm text-slate-700">{z.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.06}>
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">{copy.design.title}</h2>
                <dl className="mt-3 grid gap-3">
                  {copy.design.items.map((d) => (
                    <div key={d.k} className="rounded-lg border border-slate-200/70 bg-white/70 p-3">
                      <dt className="text-xs uppercase tracking-wide text-slate-500">{d.k}</dt>
                      <dd className="mt-1 text-sm text-slate-700">{d.v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-3 text-xs text-slate-500">{copy.design.note}</p>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </section>

      <ReadMoreLinks
        pageType="pricing"
        title={copy.readMore.title}
        intro={copy.readMore.intro}
      />

      {/* CTA */}
      <section className="px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="p-8 sm:p-10">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{copy.cta.title}</h2>
              <p className="mt-2 max-w-prose text-slate-600">{copy.cta.body}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <ShimmerButton
                  href={localize("/contact")}
                  event={{ action: "cta_click", category: "pricing_cta", label: "contact" }}
                >
                  {copy.cta.primary}
                </ShimmerButton>
                <Link
                  href={localize("/services")}
                  className="inline-flex items-center text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
                >
                  {copy.cta.secondary}
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="pricing-faq" className="scroll-mt-28 px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="overflow-hidden p-8 sm:p-10">
              <FaqPromo
                className="mt-10"
                title={copy.faqPromo.title}
                intro={copy.faqPromo.intro}
                ctaLabel={copy.faqPromo.ctaLabel}
                qaItems={copy.faqPromo.qaItems}
                href={localize("/faq")}
              />
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="pricing-sources" className="scroll-mt-28 px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-slate-900">{isEn ? "Sources and references" : "Bronnen en referenties"}</h2>
              <p className="mt-2 text-sm text-slate-600">
                {isEn
                  ? "These references are used for pricing assumptions and material-related cost behavior."
                  : "Deze bronnen gebruiken we voor prijsaannames en materiaalgerelateerd kostgedrag."}
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

      <section id="pricing-fastpath" className="scroll-mt-28 px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">{quickPathCopy.subtitle}</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{quickPathCopy.title}</h2>
            <p className="mt-2 text-slate-600">{quickPathCopy.intro}</p>
          </Reveal>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {tiers.map((tier, index) => (
              <Reveal key={`quick-${tier.name}`} delay={index * 0.05}>
                <GlassCard className="h-full border-slate-200/70 bg-white/85 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{tier.name}</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{tier.priceLabel}</p>
                  <p className="mt-1 text-sm text-slate-600">{tier.size}</p>
                  <p className="mt-3 text-sm text-slate-600">{tier.notes}</p>
                  <div className="mt-4">
                    <ShimmerButton
                      href={buildTierQuoteHref(tier.name)}
                      event={{ action: "cta_click", category: "pricing_fastpath", label: tier.name.toLowerCase() }}
                      className="w-full justify-center"
                    >
                      {quickPathCopy.cta}
                    </ShimmerButton>
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalog) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
    </main>
  )
}

