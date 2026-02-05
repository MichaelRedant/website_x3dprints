// app/(pages)/materials/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import { MATERIAL_ORDER, MATERIAL_SLUGS, materialsByLocale } from "@/lib/materials"
import MaterialGrid from "@/components/MaterialGrid"
import FaqPromo from "@/components/FaqPromo"
import GlassCard from "@/components/GlassCard"
import OrganizerCta from "@/components/OrganizerCta"
import { MATERIAL_DETAILS } from "@/content/material-details"
import MaterialSuggestionToolLoader from "@/components/MaterialSuggestionToolLoader"
import { buildLocalBusinessSchema, buildOfferCatalog, buildServiceSchema, SchemaOfferInput } from "@/lib/seo"
import ReadMoreLinks from "@/components/ReadMoreLinks"
import { normalizeLocale } from "@/lib/i18n/locales"
import { localizeHref } from "@/lib/i18n/paths"

export const metadata: Metadata = {
  title: "Materialen voor 3D printen (PLA, PETG, TPU) | X3DPrints",
  description:
    "Materialen voor 3D printen in Vlaanderen: PLA Matte/Silk/Wood, PETG, TPU en specials. Bekijk eigenschappen, voorraad en vraag gratis materiaaladvies.",
  alternates: {
    canonical: "https://www.x3dprints.be/materials/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/materials/",
      en: "https://www.x3dprints.be/en/materials/",
      "x-default": "https://www.x3dprints.be/materials/",
    },
  },
  openGraph: {
    title: "Materialen voor 3D printen | X3DPrints",
    description:
      "Materialen voor 3D printen: PLA-varianten, PETG en TPU met kleuren, specs en voorraadstatus.",
    url: "https://www.x3dprints.be/materials/",
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "X3DPrints" }],
    siteName: "X3DPrints",
    locale: "nl_BE",
  },
  twitter: { card: "summary_large_image" },
}

type PageProps = { searchParams?: Promise<{ lang?: string } | undefined>; locale?: string }

export default function MaterialsPage({ locale }: PageProps) {
  const normalizedLocale = normalizeLocale(locale)
  const isEn = normalizedLocale === "en"
  const localize = (href: string) => localizeHref(href, normalizedLocale)
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
          "Overzicht van onze meest gebruikte filamenten met eigenschappen, kleuropties en voorraad: PLA (Matte, Tough+, Silk, Marble, Wood, Translucent, enz.), PETG en TPU. Twijfel je? Beantwoord vijf vragen in de Material Suggestion Tool en je krijgt meteen drie opties met prijsimpact.",
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

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: isEn ? "Choose 3D printing material with the Material Suggestion Tool" : "Kies 3D-printmateriaal via de Material Suggestion Tool",
    description: isEn
      ? "Answer five short questions to get three material options (recommended, budget, premium look) with price impact and direct quote links."
      : "Beantwoord vijf korte vragen en krijg drie materiaalopties (aanbevolen, budget, premium look) met prijsimpact en directe offerte-links.",
    totalTime: "PT2M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: isEn ? "Open the tool" : "Open de tool",
        url: toolUrl,
        itemListElement: [
          { "@type": "HowToDirection", text: isEn ? "Scroll to the Material Suggestion Tool" : "Scroll naar de Material Suggestion Tool" },
        ],
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: isEn ? "Answer 5 questions" : "Beantwoord 5 vragen",
        itemListElement: [
          { "@type": "HowToTip", text: isEn ? "Indicate indoor/outdoor use and look preference" : "Geef binnen/buitengebruik en gewenste look aan" },
          { "@type": "HowToTip", text: isEn ? "Mention tolerance or flexibility needs" : "Vermeld tolerantie of nood aan flexibiliteit" },
        ],
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: isEn ? "Review 3 options" : "Bekijk 3 opties",
        itemListElement: [
          { "@type": "HowToDirection", text: isEn ? "Compare recommended, budget and premium look" : "Vergelijk aanbevolen, budget en premium look" },
        ],
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: isEn ? "Request a quote" : "Vraag een offerte",
        itemListElement: [
          { "@type": "HowToDirection", text: isEn ? "Click the preferred option to prefill the contact form" : "Klik op je keuze om het contactformulier vooraf te vullen" },
        ],
      },
    ],
    tool: [
      { "@type": "HowToTool", name: isEn ? "STL/STEP/3MF file (optional)" : "STL/STEP/3MF-bestand (optioneel)" },
      { "@type": "HowToTool", name: isEn ? "Material Suggestion Tool" : "Material Suggestion Tool" },
    ],
    url: toolUrl,
  }

  const faqEntities = materials.flatMap((material) =>
    material.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  )

  const faqJsonLd =
    faqEntities.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",

          inLanguage: ["nl-BE", "en-BE"],
          mainEntity: faqEntities,
        }
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
    : "https://www.x3dprints.be/materials"
  const catalogJsonLd = buildOfferCatalog(copy.catalogName, materialOffers)

  const localBusinessJsonLd = buildLocalBusinessSchema({
    pageUrl: canonicalUrl,
    description: pageDescription,
    image: "/images/portfolio/20241024_081839-1.jpg",
    priceRange: "EUR 0 - EUR 15",
    areaServed: "BE",
  })

  const serviceJsonLd = buildServiceSchema(copy.serviceName, materialOffers, canonicalUrl)

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
          </Reveal>
        </div>
      </section>


      <section
        id="material-suggestion-tool"
        className="px-6 pb-16 sm:px-8 lg:px-12"
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


      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <MaterialGrid materials={materials} />

        {/* Legenda + CTA */}
        <div className="mx-auto mt-10 max-w-6xl rounded-2xl border border-slate-200/70 bg-white/70 p-5 text-sm text-slate-600 backdrop-blur">
          <div className="font-semibold text-slate-900">{copy.legendTitle}</div>
          <div className="mt-2 grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-black" /> <span>{copy.legendInStock}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative h-4 w-4 rounded-full bg-slate-400">
                <span
                  className="absolute inset-0 rounded-full"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(135deg, rgba(0,0,0,.08) 0 4px, rgba(0,0,0,0) 4px 8px)",
                  }}
                />
              </span>
              <span>{copy.legendBackorder}</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="h-4 w-4 rounded-full"
                style={{ background: "linear-gradient(180deg,#7ae5ffc0,#7ae5ff50)" }}
              />
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
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="overflow-hidden p-8 sm:p-10">
              <FaqPromo className="mt-10" href={localize("/faq")} {...(faqPromoProps ?? {})} />
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <ReadMoreLinks
        title={copy.readMoreTitle}
        intro={copy.readMoreIntro}
        primaryLinks={[
          { label: copy.readMorePrimary.services, href: localize("/services") },
          { label: copy.readMorePrimary.pricing, href: localize("/pricing") },
          { label: copy.readMorePrimary.quote, href: localize("/contact") },
        ]}
        secondaryLinks={[
          { label: copy.readMoreSecondary.portfolio, href: localize("/portfolio") },
          { label: copy.readMoreSecondary.segments, href: localize("/segments") },
          { label: copy.readMoreSecondary.tool, href: localize("/materials#material-suggestion-tool") },
          { label: copy.readMoreSecondary.findModels, href: localize("/3d-modellen-vinden") },
        ]}
      />



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
