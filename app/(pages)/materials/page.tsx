// app/(pages)/materials/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2, Clock3, Layers3, MapPin } from "lucide-react"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import { MATERIAL_ORDER, MATERIAL_SLUGS, materialsByLocale } from "@/lib/materials"
import MaterialGrid from "@/components/MaterialGrid"
import FaqPromo from "@/components/FaqPromo"
import GlassCard from "@/components/GlassCard"
import OrganizerCta from "@/components/OrganizerCta"
import { MATERIAL_DETAILS } from "@/content/material-details"
import MaterialSuggestionToolLoader from "@/components/MaterialSuggestionToolLoader"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import {
  buildFaqPageSchema,
  buildHowToSchema,
  buildLocalBusinessSchema,
  buildOfferCatalog,
  buildServiceSchema,
  SchemaOfferInput,
} from "@/lib/seo"
import ReadMoreLinks from "@/components/ReadMoreLinks"
import { normalizeLocale } from "@/lib/i18n/locales"
import { localizeHref } from "@/lib/i18n/paths"

export const metadata: Metadata = {
  title: "3D print materialen en 3D print materiaal kiezen | X3DPrints",
  description:
    "Vergelijk 3D print materialen in Vlaanderen: PLA Matte/Silk/Wood, PETG, TPU en specials. Kies het juiste 3D print materiaal op basis van sterkte, look en prijsimpact.",
  alternates: {
    canonical: "https://www.x3dprints.be/materials/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/materials/",
      "en-BE": "https://www.x3dprints.be/en/materials/",
      "x-default": "https://www.x3dprints.be/materials/",
    },
  },
  openGraph: {
    title: "3D print materialen | PLA, PETG en TPU bij X3DPrints",
    description:
      "3D print materiaal kiezen: vergelijk PLA-varianten, PETG en TPU met kleuren, specs, voorraadstatus en advies.",
    url: "https://www.x3dprints.be/materials/",
    images: [{ url: "/images/filament/petg_1.webp", width: 1200, height: 630, alt: "Materialen voor 3D printen bij X3DPrints" }],
    siteName: "X3DPrints",
    locale: "nl_BE",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D print materialen | X3DPrints",
    description:
      "Vergelijk 3D print materiaal: PLA-varianten, PETG en TPU met kleuren, specs en voorraadstatus.",
    images: ["/images/filament/petg_1.webp"],
  },
}

type PageProps = { searchParams?: Promise<{ lang?: string } | undefined>; locale?: string }

export default function MaterialsPage({ locale }: PageProps) {
  const normalizedLocale = normalizeLocale(locale)
  const isEn = normalizedLocale === "en"
  const localize = (href: string) => localizeHref(href, normalizedLocale)
  const tocItems = isEn
    ? [
        { id: "material-suggestion-tool", label: "How does the Material Suggestion Tool work?" },
        { id: "materials-library", label: "Which 3D printing materials are available?" },
        { id: "materials-compare", label: "How do key materials compare?" },
        { id: "materials-faq", label: "FAQ and next steps" },
        { id: "materials-sources", label: "Sources and references" },
      ]
    : [
        { id: "material-suggestion-tool", label: "Hoe werkt de Material Suggestion Tool?" },
        { id: "materials-library", label: "Welke 3D-printmaterialen zijn beschikbaar?" },
        { id: "materials-compare", label: "Hoe vergelijken de kernmaterialen?" },
        { id: "materials-faq", label: "FAQ en volgende stappen" },
        { id: "materials-sources", label: "Bronnen en referenties" },
      ]
  const references = isEn
    ? [
        { label: "Prusa material guide (PLA, PETG, TPU)", url: "https://help.prusa3d.com/article/material-guide_220" },
        { label: "Bambu Lab filament guide", url: "https://wiki.bambulab.com/en/filament-acc/filament/overview" },
        { label: "All3DP PLA vs PETG comparison", url: "https://all3dp.com/2/pla-vs-petg-differences-compared/" },
      ]
    : [
        { label: "Prusa materiaalgids (PLA, PETG, TPU)", url: "https://help.prusa3d.com/article/material-guide_220" },
        { label: "Bambu Lab filamentgids", url: "https://wiki.bambulab.com/en/filament-acc/filament/overview" },
        { label: "All3DP vergelijking PLA vs PETG", url: "https://all3dp.com/2/pla-vs-petg-differences-compared/" },
      ]
  const lastUpdatedLabel = isEn ? "Last updated: February 6, 2026" : "Laatst bijgewerkt: 6 februari 2026"
  const materialsMap = materialsByLocale(normalizedLocale)
  const materials = MATERIAL_ORDER.map((key) => {
    const m = materialsMap[key]
    const slug = MATERIAL_SLUGS[key]
    const detail = MATERIAL_DETAILS[key]

    return {
      key,
      anchorId: slug,
      slug,
      title: m.name,
      description: m.description,
      features: m.features || [],
      swatches: m.swatches.map((s) => ({
        label: s.label,
        fill: s.color,
        inStock: s.inStock,
      })),
      faq: isEn ? [] : detail?.faq?.slice(0, 2) ?? [],
    }
  })

  const copy = isEn
    ? {
        heroTitle: "Materials for 3D printing",
        heroIntro:
          "Overview of our most-used filaments with properties, colour options and stock: PLA (Matte, Tough+, Silk, Marble, Wood, Translucent, etc.), PETG and TPU. Not sure? Answer five questions in the Material Suggestion Tool and you get three options with price impact right away.",
        materialListName: "Materials for 3D printing",
        suggestionLink: "Material Suggestion Tool",
        whyLabel: "Why this tool?",
        whyTitle: "Get to the right material faster",
        whyBody:
          "People want to know which filament fits best, how it looks, whether it survives outdoors and what it does to price. This tool combines those answers with our stock data and shows up to three options: recommended, budget friendly and premium look. Each option links directly to a quote request and the materials library.",
        whyBullets: [
          "Which material is best for my project?",
          "What is the difference between PLA, PETG, Silk, Wood, Tough?",
          "What look can I expect? Can this go outside?",
          "Clear price impact: budget vs high-end blends.",
        ],
        whyFooterIntro: "Result ready? We send you straight to",
        whyFooterPricing: "pricing & calculator",
        whyFooterGuide: "the how-to guide",
        outcomeLabel: "Outcome",
        outcomeTitle: "What you get for your 3D print project",
        outcomeLead: "Answer all five questions and you'll see up to three options:",
        outcomeBullets: [
          "One recommended material with reasons and colours.",
          "A budget-friendly alternative.",
          "A premium look choice with price impact.",
        ],
        outcomeFooter:
          "Each result contains direct links to examples and a quote request with the material prefilled.",
        legendTitle: "Legend",
        legendInStock: "In stock",
        legendBackorder: "On request",
        legendTranslucent: "Translucent/glow-style looks",
        adviceCta: "Ask for material advice",
        researchLead: "Want to research first?",
        researchTool: "Material Suggestion Tool",
        researchBlog: "blog & knowledge base",
        readMoreTitle: "Continue with materials?",
        readMoreIntro: "Compare use cases, check pricing and start a quote right away.",
        readMorePrimary: {
          services: "3D print service",
          pricing: "Pricing & calculator",
          quote: "Request a quote",
        },
        readMoreSecondary: {
          portfolio: "Portfolio",
          segments: "Segments & cases",
          tool: "Material Suggestion Tool",
          findModels: "Find 3D models",
        },
        catalogName: "Material advice and samples",
        serviceName: "Filament material advice",
      }
    : {
        heroTitle: "Materialen voor 3D printen",
        heroIntro:
          "Hier vergelijk je het juiste 3D print materiaal voor jouw toepassing: PLA (Matte, Tough+, Silk, Marble, Wood, Translucent, enz.), PETG en TPU, inclusief eigenschappen, kleuropties en voorraad. Twijfel je? Beantwoord vijf vragen in de Material Suggestion Tool en je krijgt meteen drie opties met prijsimpact.",
        materialListName: "Materialen voor 3D printen",
        suggestionLink: "Material Suggestion Tool",
        whyLabel: "Waarom deze tool?",
        whyTitle: "Sneller naar de juiste materiaalkeuze voor 3D printen",
        whyBody:
          "Bezoekers willen weten welk filament best past, hoe het eruitziet, of het buiten kan en wat dat doet met de prijs. Deze tool combineert die antwoorden met onze voorraaddata en toont maximaal drie opties: aanbevolen, budgetvriendelijk en premium look. Elke optie linkt meteen naar een offerteaanvraag en de materialenbibliotheek.",
        whyBullets: [
          "Welk materiaal is het beste voor mijn project?",
          "Wat is het verschil tussen PLA, PETG, Silk, Wood, Tough?",
          "Welke look kan ik verwachten? Kan dit buiten hangen?",
          "Duidelijk over prijsimpact: budget vs. high-end blends.",
        ],
        whyFooterIntro: "Resultaat klaar? We sturen je meteen door naar",
        whyFooterPricing: "prijzen & calculator",
        whyFooterGuide: "how-to gids",
        outcomeLabel: "Uitkomst",
        outcomeTitle: "Wat je te zien krijgt voor je 3D printen-project",
        outcomeLead: "Beantwoord alle vijf vragen en je krijgt maximaal drie opties:",
        outcomeBullets: [
          "Een aanbevolen materiaal met argumenten en kleuren.",
          "Een budgetvriendelijk alternatief.",
          "Een premium look keuze met prijsimpact.",
        ],
        outcomeFooter:
          "Elk resultaat bevat directe links naar voorbeelden en een offerteaanvraag met het materiaal al ingevuld.",
        legendTitle: "Legenda",
        legendInStock: "Op voorraad",
        legendBackorder: "Op bestelling",
        legendTranslucent: "Translucent/glow-achtige looks",
        adviceCta: "Vraag materiaaladvies",
        researchLead: "Eerst wat research doen?",
        researchTool: "Material Suggestion Tool",
        researchBlog: "blog & kennisbank",
        readMoreTitle: "Verder met materialen?",
        readMoreIntro: "Vergelijk toepassingen, bekijk prijzen en start meteen met een offerte-aanvraag.",
        readMorePrimary: {
          services: "3D print service",
          pricing: "Prijzen & calculator",
          quote: "Offerte aanvragen",
        },
        readMoreSecondary: {
          portfolio: "Portfolio",
          segments: "Segmenten & cases",
          tool: "Material Suggestion Tool",
          findModels: "3D modellen vinden",
        },
        catalogName: "Materialen advies en samples",
        serviceName: "Filament materiaaladvies",
      }

  const comparisonCopy = isEn
    ? {
        title: "Quick material comparison for real projects",
        intro:
          "Use this table for faster material decisions on quote-ready projects. Final choice still depends on your geometry, wall thickness and print direction.",
        caption: "3D printing material comparison for use case, outdoor use and price impact",
        headers: {
          material: "Material",
          bestFor: "Best for",
          outdoor: "Outdoor",
          flexibility: "Flexibility",
          priceImpact: "Price impact",
        },
        ctaPrimary: "Request material advice",
        ctaSecondary: "View pricing",
      }
    : {
        title: "Snelle materiaalvergelijking voor echte projecten",
        intro:
          "Gebruik deze tabel om sneller een materiaalkeuze te maken voor offerteklare projecten. De definitieve keuze hangt nog af van je geometrie, wanddikte en printoriëntatie.",
        caption: "Vergelijking van 3D-printmaterialen op use-case, outdoor gebruik en prijsimpact",
        headers: {
          material: "Materiaal",
          bestFor: "Beste voor",
          outdoor: "Outdoor",
          flexibility: "Flexibiliteit",
          priceImpact: "Prijsimpact",
        },
        ctaPrimary: "Vraag materiaaladvies",
        ctaSecondary: "Bekijk pricing",
      }

  const comparisonRows = isEn
    ? [
        { material: "PLA Matte", bestFor: "Prototypes, indoor fixtures, visual models", outdoor: "Limited", flexibility: "Rigid", priceImpact: "Base" },
        { material: "PLA Tough+", bestFor: "Functional parts with higher impact resistance", outdoor: "Moderate", flexibility: "Semi-rigid", priceImpact: "+10-20%" },
        { material: "PETG", bestFor: "Outdoor parts, brackets, utility parts", outdoor: "Strong", flexibility: "Semi-rigid", priceImpact: "+20%" },
        { material: "TPU", bestFor: "Grips, bumpers, flexible interfaces", outdoor: "Strong", flexibility: "Flexible", priceImpact: "+30%" },
        { material: "PLA Silk/Marble", bestFor: "Premium visual props and gifts", outdoor: "Limited", flexibility: "Rigid", priceImpact: "+20%" },
      ]
    : [
        { material: "PLA Matte", bestFor: "Prototypes, indoor onderdelen, visuele modellen", outdoor: "Beperkt", flexibility: "Stijf", priceImpact: "Basis" },
        { material: "PLA Tough+", bestFor: "Functionele onderdelen met hogere impactweerstand", outdoor: "Matig", flexibility: "Semi-stijf", priceImpact: "+10-20%" },
        { material: "PETG", bestFor: "Outdoor onderdelen, brackets, utility parts", outdoor: "Sterk", flexibility: "Semi-stijf", priceImpact: "+20%" },
        { material: "TPU", bestFor: "Grips, bumpers, flexibele interfaces", outdoor: "Sterk", flexibility: "Flexibel", priceImpact: "+30%" },
        { material: "PLA Silk/Marble", bestFor: "Premium visuele props en gifts", outdoor: "Beperkt", flexibility: "Stijf", priceImpact: "+20%" },
      ]
  const heroFacts = isEn
    ? [
        { icon: Layers3, label: "Material options", value: `${materials.length}+ active material profiles` },
        { icon: Clock3, label: "Advice speed", value: "Material route in about 2 minutes" },
        { icon: MapPin, label: "Production context", value: "Local 3D print service in Belgium" },
      ]
    : [
        { icon: Layers3, label: "Materiaalopties", value: `${materials.length}+ actieve materiaalprofielen` },
        { icon: Clock3, label: "Advies-snelheid", value: "Materiaalroute in ongeveer 2 minuten" },
        { icon: MapPin, label: "Productiecontext", value: "Lokale 3D print service in Belgie" },
      ]
  const heroTrustPoints = isEn
    ? [
        "Built for practical 3D model printing and quote-ready decisions",
        "Direct links from material advice to pricing and contact",
        "Keyword-focused around 3D print materials, PETG, TPU and PLA variants",
      ]
    : [
        "Gebouwd voor praktisch 3D model printen en offerteklare beslissingen",
        "Directe links van materiaaladvies naar pricing en contact",
        "Keyword-focus op 3D print materiaal, PETG, TPU en PLA-varianten",
      ]
  const libraryLead = isEn
    ? "Compare all major 3D printing material profiles before finalizing your quote route."
    : "Vergelijk alle belangrijke 3D-printmateriaalprofielen voor je de offerte-route finaliseert."

  const faqPromoProps = isEn
    ? {
        title: "Questions about 3D printing?",
        intro: "Answers about materials, lead times, pricing and how we work.",
        ctaLabel: "View the FAQ",
        ctaAriaLabel: "Go to the frequently asked questions",
        qaItems: [
          { q: "Which materials do you print?", a: "Standard PLA Matte, plus PETG and TPU. On request ABS/ASA, Nylon, PA-CF." },
          { q: "What is the usual lead time?", a: "Typically a few working days, depending on complexity and batch size." },
          { q: "How do I request a quote?", a: "Send your STL/STEP and short context via the form. You receive price and timing fast." },
        ],
        tagline: "Clear answers. No buzzword bingo.",
      }
    : undefined

  const materialOffers: SchemaOfferInput[] = isEn
    ? [
        {
          serviceName: "Material suggestion call",
          price: "EUR 0",
          description: "Free advice on which filament (PLA, PETG or TPU) fits your application.",
        },
        {
          serviceName: "Material sample + test run",
          price: "EUR 15",
          description: "Small test print with two material swatches and a short waste report.",
        },
        {
          serviceName: "Material guidance & ordering",
          price: "EUR 0",
          description: "We order the right filament specification and guide you through pre-production checks.",
        },
      ]
    : [
        {
          serviceName: "Material suggestion call",
          price: "EUR 0",
          description: "Gratis advies over welk filament (PLA, PETG of TPU) past bij jouw toepassing.",
        },
        {
          serviceName: "Material sample + test run",
          price: "EUR 15",
          description: "Kleine testprint met twee materiaalstalen en een kort afvalrapport.",
        },
        {
          serviceName: "Material guidance & ordering",
          price: "EUR 0",
          description: "We bestellen de juiste filamentspecificatie en begeleiden je met pre-production checks.",
        },
      ]

  // JSON-LD: ItemList van materialen (naam + beschrijving)
  const pageBase = isEn ? "https://www.x3dprints.be/en/materials" : "https://www.x3dprints.be/materials"
  const toolUrl = `${pageBase}#material-suggestion-tool`

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: copy.materialListName,
    itemListElement: materials.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${pageBase}#${m.anchorId}`,
      item: {
        "@type": "Product",
        name: m.title,
        description: m.description || undefined,
        brand: { "@type": "Brand", name: "X3DPrints" },
        category: "3D printing filament",
      },
    })),
  }

  const howToJsonLd = buildHowToSchema({
    name: isEn ? "Choose 3D printing material with the Material Suggestion Tool" : "Kies 3D-printmateriaal via de Material Suggestion Tool",
    description: isEn
      ? "Answer five short questions to get three material options (recommended, budget, premium look) with price impact and direct quote links."
      : "Beantwoord vijf korte vragen en krijg drie materiaalopties (aanbevolen, budget, premium look) met prijsimpact en directe offerte-links.",
    inLanguage: isEn ? "en-BE" : "nl-BE",
    mainEntityOfPage: pageBase,
    totalTime: "PT2M",
    url: toolUrl,
    steps: [
      {
        name: isEn ? "Open the tool" : "Open de tool",
        url: toolUrl,
        directions: [isEn ? "Scroll to the Material Suggestion Tool" : "Scroll naar de Material Suggestion Tool"],
      },
      {
        name: isEn ? "Answer 5 questions" : "Beantwoord 5 vragen",
        tips: [
          isEn ? "Indicate indoor/outdoor use and look preference" : "Geef binnen/buitengebruik en gewenste look aan",
          isEn ? "Mention tolerance or flexibility needs" : "Vermeld tolerantie of nood aan flexibiliteit",
        ],
      },
      {
        name: isEn ? "Review 3 options" : "Bekijk 3 opties",
        directions: [isEn ? "Compare recommended, budget and premium look" : "Vergelijk aanbevolen, budget en premium look"],
      },
      {
        name: isEn ? "Request a quote" : "Vraag een offerte",
        directions: [
          isEn
            ? "Click the preferred option to prefill the contact form"
            : "Klik op je keuze om het contactformulier vooraf te vullen",
        ],
      },
    ],
    toolNames: ["Material Suggestion Tool"],
    supplyNames: [isEn ? "STL/STEP/3MF file (optional)" : "STL/STEP/3MF-bestand (optioneel)"],
  })

  const faqItems = materials.flatMap((material) =>
    material.faq.map((item) => ({
      question: item.question,
      answer: item.answer,
    })),
  )

  const faqJsonLd = faqItems.length
    ? buildFaqPageSchema({
        items: faqItems,
        inLanguage: isEn ? "en-BE" : "nl-BE",
        mainEntityOfPage: pageBase,
      })
    : null

  const pageDescription = isEn
    ? "3D printing materials in Flanders: PLA Matte/Silk/Wood, PETG, TPU and specials. See properties, colours and stock, and get free material advice."
    : metadata.description ?? ""
  const canonicalUrl = isEn
    ? "https://www.x3dprints.be/en/materials"
    : typeof metadata.openGraph?.url === "string"
    ? metadata.openGraph.url
    : typeof metadata.alternates?.canonical === "string"
    ? metadata.alternates.canonical
    : "https://www.x3dprints.be/materials/"
  const catalogJsonLd = buildOfferCatalog(copy.catalogName, materialOffers)

  const localBusinessJsonLd = buildLocalBusinessSchema({
    pageUrl: canonicalUrl,
    description: pageDescription,
    image: "/images/portfolio/20241024_081839-1.jpg",
    priceRange: "EUR 0 - EUR 15",
    areaServed: "BE",
  })

  const serviceJsonLd = buildServiceSchema(copy.serviceName, materialOffers, canonicalUrl, {
    description: pageDescription,
    inLanguage: isEn ? "en-BE" : "nl-BE",
    mainEntityOfPage: canonicalUrl,
  })

  return (
    <main className="relative">
      {/* decor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(99,102,241,.14),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.07]" />

      <section className="px-6 pt-14 pb-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <Reveal>
              <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                {copy.heroTitle}
              </h1>
              <p className="mt-3 max-w-2xl text-slate-600">
                {copy.heroIntro}{" "}
                <Link href="#material-suggestion-tool" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  {copy.suggestionLink}
                </Link>
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ShimmerButton
                  href="#material-suggestion-tool"
                  event={{ action: "cta_click", category: "materials_hero", label: "tool" }}
                >
                  {copy.suggestionLink}
                </ShimmerButton>
                <Link
                  href={localize("/pricing")}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
                >
                  {isEn ? "View pricing first" : "Eerst pricing bekijken"}
                </Link>
                <Link
                  href={localize("/contact")}
                  className="inline-flex items-center justify-center text-sm font-semibold text-indigo-700 transition hover:text-indigo-600"
                >
                  {isEn ? "Request material quote" : "Vraag materiaalofferte"} <span aria-hidden className="ml-1">-&gt;</span>
                </Link>
              </div>
              <ContentTableOfContents
                title={isEn ? "Contents" : "Inhoud"}
                items={tocItems}
                className="mt-6 max-w-2xl"
              />
            </Reveal>
            <Reveal delay={0.05}>
              <GlassCard className="p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  {isEn ? "Material snapshot" : "Materiaal-snapshot"}
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
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </section>


      <section
        id="material-suggestion-tool"
        className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12"
        aria-label="Material Suggestion Tool"
      >
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-500">{copy.whyLabel}</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">{copy.whyTitle}</h2>
                <p className="mt-3 text-sm text-slate-600">{copy.whyBody}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  {copy.whyBullets.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-slate-600">
                  {copy.whyFooterIntro}{" "}
                  <Link href={localize("/pricing")} className="font-semibold text-indigo-600 hover:text-indigo-500">
                    {copy.whyFooterPricing}
                  </Link>{" "}
                  {isEn ? "or to the" : "of naar de"}{" "}
                  <Link href={localize("/blog/juiste-3d-print-materiaal")} className="font-semibold text-indigo-600 hover:text-indigo-500">
                    {copy.whyFooterGuide}
                  </Link>
                  . {isEn ? "That keeps the flow to a quote short." : "Zo blijft de flow richting offerte kort."}
                </p>
              </GlassCard>
            </Reveal>
            <Reveal delay={0.05}>
              <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">{copy.outcomeLabel}</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">{copy.outcomeTitle}</h2>
                <p className="mt-3 text-sm text-slate-600">{copy.outcomeLead}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  {copy.outcomeBullets.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-slate-600">
                  {copy.outcomeFooter}
                </p>
              </GlassCard>
            </Reveal>
          </div>
          <MaterialSuggestionToolLoader />
        </div>
      </section>


      <section id="materials-library" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto mb-6 max-w-6xl">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              {isEn ? "Material library" : "Materiaalbibliotheek"}
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {isEn ? "Which materials can you choose for 3D printing?" : "Welke materialen kies je voor 3D printen?"}
            </h2>
            <p className="mt-2 text-slate-600">
              {isEn
                ? "Compare filament properties, stock and visual finish before requesting your quote."
                : "Vergelijk filament-eigenschappen, voorraad en visuele afwerking voor je offerte-aanvraag."}
            </p>
            <p className="mt-2 text-sm text-slate-600">{libraryLead}</p>
          </Reveal>
        </div>
        <MaterialGrid materials={materials} />

        <div id="materials-compare" className="scroll-mt-28 mx-auto mt-10 max-w-6xl rounded-2xl border border-slate-200/70 bg-white/80 p-5">
          <h2 className="text-xl font-semibold text-slate-900">{comparisonCopy.title}</h2>
          <p className="mt-2 text-sm text-slate-600">{comparisonCopy.intro}</p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200/70 bg-white/90">
            <table className="min-w-full text-left text-sm text-slate-700">
              <caption className="sr-only">{comparisonCopy.caption}</caption>
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">{comparisonCopy.headers.material}</th>
                  <th className="px-4 py-3">{comparisonCopy.headers.bestFor}</th>
                  <th className="px-4 py-3">{comparisonCopy.headers.outdoor}</th>
                  <th className="px-4 py-3">{comparisonCopy.headers.flexibility}</th>
                  <th className="px-4 py-3">{comparisonCopy.headers.priceImpact}</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.material} className="border-t border-slate-200/70">
                    <td className="px-4 py-3 font-semibold text-slate-900">{row.material}</td>
                    <td className="px-4 py-3">{row.bestFor}</td>
                    <td className="px-4 py-3">{row.outdoor}</td>
                    <td className="px-4 py-3">{row.flexibility}</td>
                    <td className="px-4 py-3">{row.priceImpact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <ShimmerButton
              href={localize("/contact?material=PETG")}
              event={{ action: "cta_click", category: "materials_compare", label: "advice" }}
            >
              {comparisonCopy.ctaPrimary}
            </ShimmerButton>
            <Link
              href={localize("/pricing")}
              className="inline-flex items-center rounded-xl border border-slate-200/80 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              {comparisonCopy.ctaSecondary}
            </Link>
          </div>
        </div>

        {/* Legenda + CTA */}
        <div className="mx-auto mt-10 max-w-6xl rounded-2xl border border-slate-200/70 bg-white/70 p-5 text-sm text-slate-600 backdrop-blur">
          <div className="font-semibold text-slate-900">{copy.legendTitle}</div>
          <div className="mt-2 grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-black" /> <span>{copy.legendInStock}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-[repeating-linear-gradient(135deg,rgba(15,23,42,0.32)_0_3px,rgba(148,163,184,0.72)_3px_6px)]" />
              <span>{copy.legendBackorder}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-[linear-gradient(180deg,rgba(122,229,255,0.75),rgba(122,229,255,0.35))]" />
              <span>{copy.legendTranslucent}</span>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <ShimmerButton
              href={localize("/contact")}
              event={{ action: "cta_click", category: "materials_hero", label: "contact" }}
            >
              {copy.adviceCta}
            </ShimmerButton>
            <p className="text-xs text-slate-500">
              {copy.researchLead} {isEn ? "Check the" : "Check bovenaan de"}{" "}
              <Link href="#material-suggestion-tool" className="font-semibold text-slate-900 underline decoration-slate-300 hover:decoration-slate-600">
                {copy.researchTool}
              </Link>{" "}
              {isEn ? "and read the" : "en lees de"}{" "}
              <Link href={localize("/blog")} className="font-semibold text-slate-900 underline decoration-slate-300 hover:decoration-slate-600">
                {copy.researchBlog}
              </Link>{" "}
              {isEn ? "for comparisons like PLA vs PETG." : "voor materiaalvergelijkingen zoals PLA vs PETG."}
            </p>
          </div>
        </div>
      </section>

      <div className="px-6 pb-12 sm:px-8 lg:px-12">
        <OrganizerCta locale={isEn ? "en" : "nl"} />
      </div>

      {/* FAQ / Promo */}
      <section id="materials-faq" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="overflow-hidden p-8 sm:p-10">
              <FaqPromo className="mt-10" href={localize("/faq")} {...(faqPromoProps ?? {})} />
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <ReadMoreLinks
        pageType="materials"
        title={copy.readMoreTitle}
        intro={copy.readMoreIntro}
      />



      <section id="materials-sources" className="scroll-mt-28 px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-slate-900">{isEn ? "Sources and references" : "Bronnen en referenties"}</h2>
              <p className="mt-2 text-sm text-slate-600">
                {isEn
                  ? "We use these references for baseline material behavior and comparison data."
                  : "We gebruiken deze bronnen als basis voor materiaaleigenschappen en vergelijkingen."}
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

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </main>
  )
}

