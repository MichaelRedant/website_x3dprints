import Link from "next/link"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import ReadMoreLinks from "@/components/ReadMoreLinks"
import {
  getLocalizedCasePipeline,
  getLocalizedCaseStudies,
} from "@/content/case-studies"
import {
  buildFaqPageSchema,
  buildHowToSchema,
  buildItemListSchema,
  buildServiceSchema,
} from "@/lib/seo"

type CasesPageProps = {
  locale: "nl" | "en"
}

type PageCopy = {
  eyebrow: string
  title: string
  intro: string
  lastUpdated: string
  trustCards: { label: string; value: string; detail: string }[]
  quickStartTitle: string
  quickStartIntro: string
  quickStartCards: { title: string; body: string; href: string; cta: string }[]
  liveCasesTitle: string
  liveCasesIntro: string
  publishedPrefix: string
  sectorLabel: string
  materialsLabel: string
  kpiLabel: string
  ctaLabel: string
  liveCasesEmptyTitle: string
  liveCasesEmptyBody: string
  intentBoardTitle: string
  intentBoardIntro: string
  intentHeaders: { intent: string; bestPage: string; nextStep: string }
  intentRows: {
    intent: string
    bestPageLabel: string
    bestPageHref: string
    nextStepLabel: string
    nextStepHref: string
  }[]
  caseTemplateTitle: string
  caseTemplateIntro: string
  templateRows: {
    step: string
    output: string
    seoValue: string
  }[]
  pipelineTitle: string
  pipelineIntro: string
  pipelineHeaders: {
    slot: string
    title: string
    keyword: string
    angle: string
  }
  faqTitle: string
  faqItems: { q: string; a: string }[]
  contactHref: string
  contactLabel: string
  secondaryCtaHref: string
  secondaryCtaLabel: string
  bottomCta: {
    title: string
    body: string
    primaryLabel: string
    primaryHref: string
    secondaryLabel: string
    secondaryHref: string
  }
  howTo: {
    name: string
    description: string
  }
  schemaName: string
  schemaDescription: string
}

const COPY: Record<"nl" | "en", PageCopy> = {
  nl: {
    eyebrow: "Case studies",
    title: "3D print cases met meetbare impact",
    intro:
      "Hier vind je actieve cases en de geplande case-pipeline. Elke case volgt dezelfde structuur: uitdaging, materiaalkeuze, timing/kost, resultaat en duidelijke volgende stap.",
    lastUpdated: "Laatst bijgewerkt: 1 maart 2026",
    trustCards: [
      {
        label: "Live cases",
        value: "6",
        detail: "B2B, repair en lokale impact",
      },
      {
        label: "Case cadence",
        value: "2/maand",
        detail: "Vaste publicatieflow voor continue leadaanvoer",
      },
      {
        label: "Standaard format",
        value: "5 blokken",
        detail: "Consistent en helder voor snelle beslissingen",
      },
    ],
    quickStartTitle: "Snel starten per businessdoel",
    quickStartIntro:
      "Kies de route die het dichtst bij je vraag ligt. Zo kom je direct op de juiste caseflow en vermijd je ruis.",
    quickStartCards: [
      {
        title: "Kapot onderdeel of repair?",
        body: "Start met de repair-flow voor vervangstukken, testfit en materiaalkeuze per belasting.",
        href: "/blog/kapot-onderdeel-laten-printen",
        cta: "Open repair caseflow",
      },
      {
        title: "Retail, POS of eventmateriaal?",
        body: "Gebruik de retail POS case voor mock-up, validatiebatch en pilot naar meerdere locaties.",
        href: "/blog/retail-pos-3d-printen",
        cta: "Open retail POS case",
      },
      {
        title: "Prototype naar kleine reeks?",
        body: "Volg de B2B flow met duidelijke fasegrenzen, versiebeheer en planning.",
        href: "/blog/prototyping-kleine-reeksen-3d-printen",
        cta: "Open B2B caseflow",
      },
    ],
    liveCasesTitle: "Actieve cases",
    liveCasesIntro:
      "Deze cases staan live en zijn intern gekoppeld aan blog, segmenten, services, materialen en pricing.",
    publishedPrefix: "Gepubliceerd",
    sectorLabel: "Sector",
    materialsLabel: "Materialen",
    kpiLabel: "Kernresultaat",
    ctaLabel: "Bekijk case",
    liveCasesEmptyTitle: "Nieuwe cases komen binnenkort live",
    liveCasesEmptyBody:
      "We publiceren cases zodra de inhoud en interne links volledig klaar staan. Bekijk intussen de pipeline hieronder.",
    intentBoardTitle: "Welke case past bij je vraag?",
    intentBoardIntro:
      "Gebruik deze matrix als snelle routekaart van vraag naar concrete actie.",
    intentHeaders: {
      intent: "Vraagtype",
      bestPage: "Beste startpagina",
      nextStep: "Volgende stap",
    },
    intentRows: [
      {
        intent: "Repair / vervangstuk",
        bestPageLabel: "Kapot onderdeel laten printen",
        bestPageHref: "/blog/kapot-onderdeel-laten-printen",
        nextStepLabel: "Start intake",
        nextStepHref: "/contact?topic=repair-intake",
      },
      {
        intent: "B2B prototype en pilot",
        bestPageLabel: "Prototyping kleine reeksen",
        bestPageHref: "/blog/prototyping-kleine-reeksen-3d-printen",
        nextStepLabel: "Bekijk pricing flow",
        nextStepHref: "/pricing",
      },
      {
        intent: "Retail POS en activaties",
        bestPageLabel: "Retail POS 3D printen",
        bestPageHref: "/blog/retail-pos-3d-printen",
        nextStepLabel: "Bekijk services",
        nextStepHref: "/services",
      },
    ],
    caseTemplateTitle: "Case template (herhaalbaar format)",
    caseTemplateIntro:
      "Alle nieuwe cases volgen dit vaste format. Zo blijft de beslisflow helder en actiegericht.",
    templateRows: [
      {
        step: "Uitdaging",
        output: "Context, probleem en doelgroep",
        seoValue: "Snel duidelijk of de aanpak past bij je project",
      },
      {
        step: "Materiaalkeuze",
        output: "Waarom PLA/PETG/TPU in deze context",
        seoValue: "Betere materiaalkeuze en minder herwerk",
      },
      {
        step: "Tijd en kost",
        output: "Richtwaarden met realistische bandbreedte",
        seoValue: "Snellere budgetgo/no-go beslissing",
      },
      {
        step: "Resultaat",
        output: "Meetbaar effect en learnings",
        seoValue: "Meer vertrouwen in de gekozen aanpak",
      },
      {
        step: "Volgende stap",
        output: "CTA naar prefilled contactflow",
        seoValue: "Kortere route van eerste vraag naar intake",
      },
    ],
    pipelineTitle: "Volgende 6 cases op de planning",
    pipelineIntro:
      "Pipeline voor de komende maanden met focus op concrete klantvragen en duidelijke use-cases.",
    pipelineHeaders: {
      slot: "Doelmaand",
      title: "Case onderwerp",
      keyword: "Focus thema",
      angle: "Narratief",
    },
    faqTitle: "FAQ over case studies",
    faqItems: [
      {
        q: "Waarom een aparte cases-pagina naast de blog?",
        a: "Omdat klanten hier vooral voorbeelden en resultaten zoeken. Deze hub bundelt alle commerciële use-cases op 1 plek.",
      },
      {
        q: "Hoe vaak publiceren jullie nieuwe cases?",
        a: "Doelritme: 2 cases per maand, telkens met hetzelfde format en interne links naar money pages.",
      },
      {
        q: "Kan mijn project als case uitgewerkt worden?",
        a: "Ja. Bij intake kunnen we aangeven of je project in het case-format past met focus op materiaalkeuze, timing en impact.",
      },
      {
        q: "Waar start ik als ik iets gelijkaardigs wil laten printen?",
        a: "Gebruik de contactknop hieronder met prefilled context. Dan kunnen we meteen gericht antwoorden.",
      },
    ],
    contactHref: "/contact?topic=case-study-intake",
    contactLabel: "Start case intake",
    secondaryCtaHref: "/materials#material-suggestion-tool",
    secondaryCtaLabel: "Kies materiaal",
    bottomCta: {
      title: "Wil je jouw project als caseflow laten uitwerken?",
      body: "Stuur je context en files. Je krijgt een concreet voorstel met materiaal, timing en volgende stap.",
      primaryLabel: "Start case intake",
      primaryHref: "/contact?topic=case-study-intake",
      secondaryLabel: "Bekijk prijzen",
      secondaryHref: "/pricing",
    },
    howTo: {
      name: "Start een 3D print case intake",
      description:
        "Kies de juiste caseflow, deel context en ontvang snel materiaal- en planningadvies.",
    },
    schemaName: "X3DPrints case studies",
    schemaDescription:
      "Overzicht van case studies en praktijkflows voor 3D print projecten bij X3DPrints.",
  },
  en: {
    eyebrow: "Case studies",
    title: "3D printing cases with measurable impact",
    intro:
      "This hub bundles live cases and the next publication pipeline. Every case follows one structure: challenge, material choice, timing/cost, result and next step.",
    lastUpdated: "Last updated: March 1, 2026",
    trustCards: [
      {
        label: "Live cases",
        value: "6",
        detail: "B2B, repair and local impact",
      },
      {
        label: "Case cadence",
        value: "2/month",
        detail: "Consistent publishing for steady lead flow",
      },
      {
        label: "Standard format",
        value: "5 blocks",
        detail: "Consistent and clear for faster decisions",
      },
    ],
    quickStartTitle: "Start fast by business goal",
    quickStartIntro:
      "Pick the route that matches your request. You land on the right case flow immediately.",
    quickStartCards: [
      {
        title: "Broken part or repair?",
        body: "Start with the repair flow for replacement parts, fit checks and material selection.",
        href: "/en/blog/kapot-onderdeel-laten-printen",
        cta: "Open repair case flow",
      },
      {
        title: "Retail, POS or event assets?",
        body: "Use the retail POS case for mock-up, validation batch and multi-location pilot runs.",
        href: "/en/blog/retail-pos-3d-printen",
        cta: "Open retail POS case",
      },
      {
        title: "Prototype to short run?",
        body: "Follow the B2B flow with clear phase gates, version control and planning.",
        href: "/en/blog/prototyping-kleine-reeksen-3d-printen",
        cta: "Open B2B case flow",
      },
    ],
    liveCasesTitle: "Live cases",
    liveCasesIntro:
      "These cases are live and linked internally to blog, segments, services, materials and pricing.",
    publishedPrefix: "Published",
    sectorLabel: "Sector",
    materialsLabel: "Materials",
    kpiLabel: "Core result",
    ctaLabel: "View case",
    liveCasesEmptyTitle: "New cases are coming soon",
    liveCasesEmptyBody:
      "We publish cases only when content and internal links are fully ready. In the meantime, use the pipeline below.",
    intentBoardTitle: "Which case matches your request?",
    intentBoardIntro:
      "Use this matrix as a fast path from request to concrete action.",
    intentHeaders: {
      intent: "Request type",
      bestPage: "Best entry page",
      nextStep: "Next step",
    },
    intentRows: [
      {
        intent: "Repair / replacement",
        bestPageLabel: "Print a broken part",
        bestPageHref: "/en/blog/kapot-onderdeel-laten-printen",
        nextStepLabel: "Start intake",
        nextStepHref: "/en/contact?topic=repair-intake",
      },
      {
        intent: "B2B prototype and pilot",
        bestPageLabel: "Prototyping short runs",
        bestPageHref: "/en/blog/prototyping-kleine-reeksen-3d-printen",
        nextStepLabel: "Check pricing flow",
        nextStepHref: "/en/pricing",
      },
      {
        intent: "Retail POS and activations",
        bestPageLabel: "Retail POS 3D printing",
        bestPageHref: "/en/blog/retail-pos-3d-printen",
        nextStepLabel: "View services",
        nextStepHref: "/en/services",
      },
    ],
    caseTemplateTitle: "Case template (repeatable format)",
    caseTemplateIntro:
      "Every new case follows this format so the decision path stays clear and action-focused.",
    templateRows: [
      {
        step: "Challenge",
        output: "Context, problem and audience",
        seoValue: "Fast clarity on fit for your project",
      },
      {
        step: "Material choice",
        output: "Why PLA/PETG/TPU for this context",
        seoValue: "Better material decisions with less rework",
      },
      {
        step: "Timing and cost",
        output: "Ranges with realistic bandwidth",
        seoValue: "Faster budget go/no-go decisions",
      },
      {
        step: "Result",
        output: "Measurable impact and learnings",
        seoValue: "More confidence in the chosen approach",
      },
      {
        step: "Next step",
        output: "CTA to prefilled contact route",
        seoValue: "Shorter path from first request to intake",
      },
    ],
    pipelineTitle: "Next 6 planned cases",
    pipelineIntro:
      "Pipeline for the coming months focused on concrete customer questions and clear use-case narratives.",
    pipelineHeaders: {
      slot: "Target month",
      title: "Case topic",
      keyword: "Focus theme",
      angle: "Narrative",
    },
    faqTitle: "Case study FAQ",
    faqItems: [
      {
        q: "Why a dedicated cases page next to the blog?",
        a: "Because visitors here mainly want examples and outcomes. This hub centralizes commercial use-cases in one place.",
      },
      {
        q: "How often do you publish new cases?",
        a: "Target cadence is 2 cases per month, each with the same structure and internal links to money pages.",
      },
      {
        q: "Can my project be turned into a case?",
        a: "Yes. During intake we can check if your project fits the case format with clear material, timing and impact points.",
      },
      {
        q: "Where should I start if I need something similar?",
        a: "Use the contact CTA below with prefilled case context so we can answer directly.",
      },
    ],
    contactHref: "/en/contact?topic=case-study-intake",
    contactLabel: "Start case intake",
    secondaryCtaHref: "/en/materials#material-suggestion-tool",
    secondaryCtaLabel: "Choose material",
    bottomCta: {
      title: "Want your project mapped as a case flow?",
      body: "Share context and files. You get a concrete proposal with material, timing and next action.",
      primaryLabel: "Start case intake",
      primaryHref: "/en/contact?topic=case-study-intake",
      secondaryLabel: "View pricing",
      secondaryHref: "/en/pricing",
    },
    howTo: {
      name: "Start a 3D printing case intake",
      description:
        "Choose the right case flow, share project context and receive fast material and planning guidance.",
    },
    schemaName: "X3DPrints case studies",
    schemaDescription:
      "Overview of case studies and practical 3D printing workflows at X3DPrints.",
  },
}

function toAbsolute(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) return path
  return `https://www.x3dprints.be${path}`
}

function formatPublishedDate(value: string, locale: "nl" | "en") {
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value
  return parsed.toLocaleDateString(locale === "en" ? "en-BE" : "nl-BE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

export default function CasesPage({ locale }: CasesPageProps) {
  const isEn = locale === "en"
  const copy = COPY[locale]
  const canonical = isEn
    ? "https://www.x3dprints.be/en/cases/"
    : "https://www.x3dprints.be/cases/"
  const language = isEn ? "en-BE" : "nl-BE"
  const cases = getLocalizedCaseStudies(locale)
  const pipeline = getLocalizedCasePipeline(locale)
  const trustCards = copy.trustCards.map((card, index) =>
    index === 0 ? { ...card, value: String(cases.length) } : card,
  )

  const itemListJsonLd = buildItemListSchema({
    name: copy.schemaName,
    inLanguage: language,
    items: cases.map((entry) => ({
      name: entry.title,
      description: entry.summary,
      url: entry.href,
    })),
  })

  const faqJsonLd = buildFaqPageSchema({
    inLanguage: language,
    mainEntityOfPage: canonical,
    items: copy.faqItems.map((item) => ({ q: item.q, a: item.a })),
  })

  const howToJsonLd = buildHowToSchema({
    name: copy.howTo.name,
    description: copy.howTo.description,
    inLanguage: language,
    mainEntityOfPage: canonical,
    totalTime: "PT5M",
    steps: [
      {
        name: isEn ? "Choose your closest case flow" : "Kies de caseflow die het dichtst aansluit",
        text: isEn
          ? "Start from repair, retail POS or B2B prototype flow."
          : "Start vanuit repair, retail POS of B2B prototype flow.",
      },
      {
        name: isEn ? "Share context and files" : "Deel context en bestanden",
        url: toAbsolute(copy.contactHref),
      },
      {
        name: isEn ? "Review material and pricing path" : "Bepaal materiaal en pricing-pad",
        url: toAbsolute(copy.secondaryCtaHref),
      },
      {
        name: isEn ? "Lock pilot planning" : "Leg pilot-planning vast",
        url: toAbsolute(isEn ? "/en/pricing" : "/pricing"),
      },
    ],
    toolNames: ["Material Suggestion Tool", "X3DPrints pricing", "X3DPrints contact intake"],
    supplyNames: ["STL/STEP", "Use-case context", "Quantity target"],
  })

  const serviceJsonLd = buildServiceSchema(
    isEn ? "3D printing case studies and pilot flows" : "3D print case studies en pilot-flows",
    [
      {
        serviceName: isEn ? "Case intake" : "Case intake",
        price: "EUR 0",
        description: isEn ? "Project context and feasibility check" : "Projectcontext en haalbaarheidscheck",
        url: toAbsolute(copy.contactHref),
      },
      {
        serviceName: isEn ? "Material advice" : "Materiaaladvies",
        price: "EUR 0",
        description: isEn ? "PLA, PETG and TPU recommendation" : "Advies voor PLA, PETG en TPU",
        url: toAbsolute(copy.secondaryCtaHref),
      },
      {
        serviceName: isEn ? "Pilot planning" : "Pilot planning",
        price: "EUR 0",
        description: isEn ? "Phase plan for prototypes and short runs" : "Faseplanning voor prototypes en kleine reeksen",
        url: toAbsolute(isEn ? "/en/pricing" : "/pricing"),
      },
    ],
    canonical,
    {
      inLanguage: language,
      mainEntityOfPage: canonical,
      description: copy.schemaDescription,
    },
  )

  return (
    <>
      <main className="relative overflow-hidden px-6 pb-16 pt-16 sm:px-8 lg:px-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(130%_60%_at_50%_0%,rgba(16,185,129,.16),transparent_72%)]"
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.08]" />

        <article className="mx-auto max-w-6xl space-y-10">
          <header className="space-y-4">
            <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
              <ol className="flex flex-wrap gap-2">
                <li>
                  <Link href={isEn ? "/en/blog" : "/blog"} className="font-medium text-indigo-600 hover:text-indigo-500">
                    {isEn ? "Blog" : "Blog"}
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-700">{isEn ? "Cases" : "Cases"}</li>
              </ol>
            </nav>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">{copy.eyebrow}</p>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">{copy.title}</h1>
            <p className="max-w-3xl text-lg text-slate-700">{copy.intro}</p>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{copy.lastUpdated}</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ShimmerButton
                href={copy.contactHref}
                event={{ action: "cta_click", category: `cases_${locale}_top`, label: "contact_prefill" }}
              >
                {copy.contactLabel}
              </ShimmerButton>
              <ShimmerButton
                href={copy.secondaryCtaHref}
                className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                event={{ action: "cta_click", category: `cases_${locale}_top`, label: "materials_tool" }}
              >
                {copy.secondaryCtaLabel}
              </ShimmerButton>
            </div>
          </header>

          <section aria-label={isEn ? "Trust signals" : "Trust signalen"}>
            <div className="grid gap-4 rounded-3xl border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur md:grid-cols-3">
              {trustCards.map((card) => (
                <div key={card.label}>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{card.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{card.value}</p>
                  <p className="text-sm text-slate-600">{card.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="quick-start" className="scroll-mt-28">
            <Reveal>
              <h2 className="text-2xl font-semibold text-slate-900">{copy.quickStartTitle}</h2>
              <p className="mt-2 text-slate-700">{copy.quickStartIntro}</p>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {copy.quickStartCards.map((card) => (
                  <GlassCard key={card.title} className="h-full p-6">
                    <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                    <p className="mt-2 text-sm text-slate-700">{card.body}</p>
                    <Link
                      href={card.href}
                      className="mt-4 inline-flex w-full items-center justify-between text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:w-auto sm:justify-start"
                    >
                      {card.cta}
                    </Link>
                  </GlassCard>
                ))}
              </div>
            </Reveal>
          </section>

          <section id="live-cases" className="scroll-mt-28">
            <Reveal>
              <h2 className="text-2xl font-semibold text-slate-900">{copy.liveCasesTitle}</h2>
              <p className="mt-2 text-slate-700">{copy.liveCasesIntro}</p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {cases.length > 0 ? (
                  cases.map((entry) => (
                    <GlassCard key={entry.id} className="h-full p-6">
                      <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                        <span>{copy.publishedPrefix}: {formatPublishedDate(entry.publishedOn, locale)}</span>
                        <span aria-hidden className="hidden sm:inline">-</span>
                        <span>{copy.sectorLabel}: {entry.sector}</span>
                      </div>
                      <h3 className="mt-2 text-lg font-semibold text-slate-900">{entry.title}</h3>
                      <p className="mt-2 text-sm text-slate-700">{entry.summary}</p>
                      <p className="mt-3 text-sm text-slate-700">
                        <span className="font-semibold text-slate-900">{copy.materialsLabel}:</span> {entry.materials.join(", ")}
                      </p>
                      <p className="mt-2 text-sm text-slate-700">
                        <span className="font-semibold text-slate-900">{copy.kpiLabel}:</span> {entry.kpi}
                      </p>
                      <Link
                        href={entry.href}
                        className="mt-4 inline-flex w-full items-center justify-between text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:w-auto sm:justify-start"
                      >
                        {copy.ctaLabel}
                      </Link>
                    </GlassCard>
                  ))
                ) : (
                  <GlassCard className="p-6 md:col-span-2">
                    <h3 className="text-lg font-semibold text-slate-900">{copy.liveCasesEmptyTitle}</h3>
                    <p className="mt-2 text-sm text-slate-700">{copy.liveCasesEmptyBody}</p>
                  </GlassCard>
                )}
              </div>
            </Reveal>
          </section>

          <section id="case-template" className="scroll-mt-28">
            <Reveal>
              <h2 className="text-2xl font-semibold text-slate-900">{copy.caseTemplateTitle}</h2>
              <p className="mt-2 text-slate-700">{copy.caseTemplateIntro}</p>
              <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200/70 bg-white/80">
                <table className="min-w-full text-left text-sm text-slate-700">
                  <caption className="sr-only">{copy.caseTemplateTitle}</caption>
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-4 py-3">{isEn ? "Block" : "Blok"}</th>
                      <th className="px-4 py-3">{isEn ? "Output" : "Output"}</th>
                      <th className="px-4 py-3">{isEn ? "Business impact" : "Businessimpact"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {copy.templateRows.map((row) => (
                      <tr key={row.step} className="border-t border-slate-200/60">
                        <td className="px-4 py-3 font-semibold text-slate-900">{row.step}</td>
                        <td className="px-4 py-3">{row.output}</td>
                        <td className="px-4 py-3">{row.seoValue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </section>

          <section id="intent-matrix" className="scroll-mt-28">
            <Reveal>
              <h2 className="text-2xl font-semibold text-slate-900">{copy.intentBoardTitle}</h2>
              <p className="mt-2 text-slate-700">{copy.intentBoardIntro}</p>
              <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200/70 bg-white/80">
                <table className="min-w-full text-left text-sm text-slate-700">
                  <caption className="sr-only">{copy.intentBoardTitle}</caption>
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-4 py-3">{copy.intentHeaders.intent}</th>
                      <th className="px-4 py-3">{copy.intentHeaders.bestPage}</th>
                      <th className="px-4 py-3">{copy.intentHeaders.nextStep}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {copy.intentRows.map((row) => (
                      <tr key={row.intent} className="border-t border-slate-200/60">
                        <td className="px-4 py-3 font-semibold text-slate-900">{row.intent}</td>
                        <td className="px-4 py-3">
                          <Link href={row.bestPageHref} className="font-semibold text-indigo-600 hover:text-indigo-500">
                            {row.bestPageLabel}
                          </Link>
                        </td>
                        <td className="px-4 py-3">
                          <Link href={row.nextStepHref} className="font-semibold text-emerald-600 hover:text-emerald-700">
                            {row.nextStepLabel}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </section>

          <section id="case-pipeline" className="scroll-mt-28">
            <Reveal>
              <h2 className="text-2xl font-semibold text-slate-900">{copy.pipelineTitle}</h2>
              <p className="mt-2 text-slate-700">{copy.pipelineIntro}</p>
              <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200/70 bg-white/80">
                <table className="min-w-full text-left text-sm text-slate-700">
                  <caption className="sr-only">{copy.pipelineTitle}</caption>
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-4 py-3">{copy.pipelineHeaders.slot}</th>
                      <th className="px-4 py-3">{copy.pipelineHeaders.title}</th>
                      <th className="px-4 py-3">{copy.pipelineHeaders.keyword}</th>
                      <th className="px-4 py-3">{copy.pipelineHeaders.angle}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pipeline.map((entry) => (
                      <tr key={entry.id} className="border-t border-slate-200/60">
                        <td className="px-4 py-3 font-semibold text-slate-900">{entry.targetMonth}</td>
                        <td className="px-4 py-3">{entry.title}</td>
                        <td className="px-4 py-3">{entry.focusKeyword}</td>
                        <td className="px-4 py-3">{entry.angle}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </section>

          <section id="case-bottom-cta" className="scroll-mt-28">
            <Reveal>
              <GlassCard className="p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
                  {isEn ? "Next step" : "Volgende stap"}
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">{copy.bottomCta.title}</h2>
                <p className="mt-2 text-slate-700">{copy.bottomCta.body}</p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <ShimmerButton
                    href={copy.bottomCta.primaryHref}
                    event={{ action: "cta_click", category: `cases_${locale}_bottom`, label: "contact_prefill" }}
                  >
                    {copy.bottomCta.primaryLabel}
                  </ShimmerButton>
                  <Link
                    href={copy.bottomCta.secondaryHref}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50 sm:w-auto"
                  >
                    {copy.bottomCta.secondaryLabel}
                  </Link>
                </div>
              </GlassCard>
            </Reveal>
          </section>

          <section id="faq-cases" className="scroll-mt-28">
            <Reveal>
              <h2 className="text-2xl font-semibold text-slate-900">{copy.faqTitle}</h2>
              <div className="mt-4">
                <Faq items={copy.faqItems} />
              </div>
            </Reveal>
          </section>
        </article>
      </main>

      <ReadMoreLinks pageType="cases" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
    </>
  )
}
