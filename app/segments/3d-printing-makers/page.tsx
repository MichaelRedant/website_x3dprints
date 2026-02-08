import type { Metadata } from "next"
import Link from "next/link"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import {
  SITE,
  buildFaqPageSchema,
  buildHowToSchema,
  buildLocalBusinessSchema,
  buildServiceSchema,
  SchemaOfferInput,
} from "@/lib/seo"

export const metadata: Metadata = {
  title: "3D printing voor makers en hobbyisten | X3DPrints",
  description:
    "3D print service voor makers en hobbyisten met persoonlijk advies, materiaalkeuze en snelle opvolging vanuit Herzele.",
  alternates: {
    canonical: "https://www.x3dprints.be/segments/3d-printing-makers/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/segments/3d-printing-makers/",
      "en-BE": "https://www.x3dprints.be/en/segments/3d-printing-makers/",
      "x-default": "https://www.x3dprints.be/segments/3d-printing-makers/",
    },
  },
  openGraph: {
    title: "3D printing voor makers en hobbyisten",
    description:
      "Custom onderdelen, cosplay props en repair prints met heldere planning en materiaaladvies.",
    url: "https://www.x3dprints.be/segments/3d-printing-makers/",
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "3D printing voor makers en hobbyisten" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printing voor makers en hobbyisten",
    description:
      "Van cosplay tot repair parts: snelle lokale 3D prints met direct overleg.",
    images: ["/Logo.webp"],
  },
}

const pageUrl = String(
  metadata.alternates?.canonical ?? `${SITE.url}/segments/3d-printing-makers/`,
)
const pageDescription = metadata.description ?? SITE.description
const lastUpdatedLabel = "Laatst bijgewerkt: 7 februari 2026"

const tocItems = [
  { id: "segment-overview", label: "Wat krijg je als maker bij X3DPrints?" },
  { id: "segment-workflow", label: "Hoe loopt je aanvraag van idee tot print?" },
  { id: "segment-use-cases", label: "Welke projecten printen we vaak?" },
  { id: "segment-links", label: "Welke links helpen je sneller vooruit?" },
  { id: "segment-faq", label: "FAQ voor makers en hobbyisten" },
  { id: "segment-sources", label: "Bronnen en referenties" },
]

const workflowSteps = [
  {
    title: "1. Projectcontext delen",
    copy: "Stuur STL of STEP, doel van het onderdeel en gewenste look of afwerking.",
  },
  {
    title: "2. Materiaal en printstrategie",
    copy: "Samen kiezen we PLA Matte, PLA Tough, PETG of TPU op basis van sterkte, detail en gebruik.",
  },
  {
    title: "3. Productie en levering",
    copy: "Je krijgt duidelijke statusupdates en kiest voor afhaling of veilige verzending.",
  },
]

const useCaseRows = [
  {
    project: "Cosplay props en accessoires",
    material: "PLA Matte of PLA Tough",
    note: "Goede balans tussen detail, afwerking en betaalbare iteraties.",
  },
  {
    project: "Repair parts en functionele houders",
    material: "PETG",
    note: "Sterker bij warmte en intensiever dagelijks gebruik.",
  },
  {
    project: "Gripdelen en dempers",
    material: "TPU",
    note: "Flexibel materiaal voor comfort en schokdemping.",
  },
]

const quickWins = [
  "Direct contact met dezelfde maker die print en opvolgt",
  "Snelle iteraties in kleine en grotere oplages zonder overbodige complexiteit",
  "Praktisch materiaaladvies zonder overbodige vaktaal",
]

const faqItems = [
  {
    q: "Welke bestanden moet ik aanleveren?",
    a: "Een STL of STEP is meestal voldoende. Voeg afmetingen, gebruikscontext en referentiefoto toe voor sneller advies.",
  },
  {
    q: "Kunnen jullie ook kleine ontwerpaanpassingen doen?",
    a: "Ja, kleine tweaks zijn mogelijk. Grotere CAD-aanpassingen gebeuren als aparte ontwerpservice.",
  },
  {
    q: "Hoe snel kan mijn print klaar zijn?",
    a: "Dat hangt af van volume, materiaal en planning. Je krijgt altijd een realistische timing voordat productie start.",
  },
]

const references = [
  {
    label: "Prusa material guide (PLA, PETG, TPU)",
    href: "https://help.prusa3d.com/article/material-guide_220",
  },
  {
    label: "All3DP FDM process explainer",
    href: "https://all3dp.com/2/fdm-3d-printing-explained/",
  },
  {
    label: "Google Search docs: crawlable links",
    href: "https://developers.google.com/search/docs/crawling-indexing/links-crawlable",
  },
]

const faqJsonLd = buildFaqPageSchema({
  inLanguage: "nl-BE",
  mainEntityOfPage: pageUrl,
  items: faqItems.map((item) => ({ q: item.q, a: item.a })),
})

const serviceOffers: SchemaOfferInput[] = [
  {
    serviceName: "3D printing voor makers en hobbyisten",
    price: "EUR 5",
    description: "Custom onderdelen, cosplay props en repair prints met materiaaladvies.",
    url: pageUrl,
  },
]

const localBusinessJsonLd = buildLocalBusinessSchema({
  pageUrl,
  description: pageDescription,
  image: "/Logo.webp",
  areaServed: "Gent en Vlaanderen",
  priceRange: "EUR 5 - EUR 49",
})

const serviceJsonLd = buildServiceSchema(
  "3D printing voor makers en hobbyisten",
  serviceOffers,
  pageUrl,
  {
    description: pageDescription,
    inLanguage: "nl-BE",
    mainEntityOfPage: pageUrl,
  },
)

const howToJsonLd = buildHowToSchema({
  name: "Makers-aanvraag in 4 stappen",
  description:
    "Vraag snel een custom print aan voor hobbyprojecten met duidelijke materiaalroute en planning.",
  inLanguage: "nl-BE",
  mainEntityOfPage: pageUrl,
  totalTime: "PT3M",
  steps: [
    {
      name: "Project en bestand delen",
      text: "Stuur STL of STEP met korte beschrijving van je project en gewenste look.",
    },
    {
      name: "Materiaal bepalen",
      text: "Kies PLA Matte, PLA Tough, PETG of TPU volgens gebruik en afwerking.",
    },
    {
      name: "Prijs en timing bekijken",
      url: "/pricing?utm_source=segment-makers&utm_medium=howto&utm_campaign=makers-flow",
    },
    {
      name: "Aanvraag met prefill versturen",
      url: "/contact?material=pla-matte&quote=Makers%20aanvraag%20voor%20custom%20onderdeel",
    },
  ],
  toolNames: ["Material Suggestion Tool"],
  supplyNames: ["STL of STEP bestand"],
})

export default function MakersSegmentPage() {
  return (
    <main className="relative overflow-hidden px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-cyan-50" />
        <div className="absolute right-[-8%] top-[-18%] h-[22rem] w-[22rem] rounded-full bg-emerald-200/35 blur-[120px]" />
      </div>

      <section id="segment-overview" className="mx-auto max-w-5xl scroll-mt-28">
        <Reveal>
          <header className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Segment</p>
            <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              3D printing voor makers en hobbyisten
            </h1>
            <p className="mt-4 text-base text-slate-600">
              Van cosplay en modelbouw tot repair parts: je krijgt persoonlijk advies, snelle opvolging en een heldere materiaalkeuze.
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <ShimmerButton
                href="/contact?material=pla-matte&quote=Makers%20aanvraag%20voor%20custom%20onderdeel"
                event={{ action: "cta_click", category: "segments_makers", label: "contact_prefill" }}
              >
                Start je aanvraag
              </ShimmerButton>
              <ShimmerButton
                href="/materials#material-suggestion-tool"
                className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                event={{ action: "cta_click", category: "segments_makers", label: "material_tool" }}
              >
                Material Suggestion Tool
              </ShimmerButton>
              <Link
                href="/services"
                className="rounded-xl border border-slate-300/70 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm"
              >
                Bekijk services
              </Link>
            </div>
          </header>
          <ContentTableOfContents title="Inhoud" items={tocItems} className="mx-auto mt-6 max-w-2xl" />
        </Reveal>
      </section>

      <section id="segment-workflow" className="mx-auto mt-10 grid max-w-5xl gap-6 scroll-mt-28 lg:grid-cols-2">
        <Reveal>
          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900">Hoe loopt je aanvraag van idee tot print?</h2>
            <div className="mt-4 space-y-3">
              {workflowSteps.map((step) => (
                <div key={step.title} className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 text-sm text-slate-700">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{step.title}</p>
                  <p className="mt-2">{step.copy}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </Reveal>

        <Reveal delay={0.06}>
          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900">Waarom makers voor deze route kiezen</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {quickWins.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>
      </section>

      <section id="segment-use-cases" className="mx-auto mt-10 max-w-5xl scroll-mt-28">
        <Reveal>
          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900">Populaire projecttypes en materiaalkeuze</h2>
            <p className="mt-2 text-sm text-slate-600">
              Deze tabel helpt je snel starten. Daarna verfijnen we volgens detailniveau, sterkte en afwerking.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-[440px] text-left text-sm text-slate-700">
                <thead>
                  <tr className="border-b border-slate-200/70 text-slate-500">
                    <th className="py-2 pr-4 font-semibold">Projecttype</th>
                    <th className="py-2 pr-4 font-semibold">Startmateriaal</th>
                    <th className="py-2 pr-4 font-semibold">Waarom</th>
                  </tr>
                </thead>
                <tbody>
                  {useCaseRows.map((row) => (
                    <tr key={row.project} className="border-b border-slate-200/70 last:border-0">
                      <td className="py-2 pr-4 font-medium text-slate-900">{row.project}</td>
                      <td className="py-2 pr-4">{row.material}</td>
                      <td className="py-2 pr-4">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </Reveal>
      </section>

      <section id="segment-links" className="mx-auto mt-10 max-w-5xl scroll-mt-28">
        <Reveal>
          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900">Handige vervolgstappen</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li>
                <Link href="/viewer" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  3D viewer
                </Link>{" "}
                om schaal en orientatie vooraf te checken.
              </li>
              <li>
                <Link href="/blog/ontwerp-3d-printbaar-model" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Ontwerpblog
                </Link>{" "}
                met praktische tips voor printbare modellen.
              </li>
              <li>
                <Link href="/blog/3d-printen-voor-beginners" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Beginnersgids
                </Link>{" "}
                voor snellere start en minder iteraties.
              </li>
              <li>
                <Link href="/materials" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Materialenoverzicht
                </Link>{" "}
                om alternatieven naast PLA te vergelijken.
              </li>
              <li>
                <Link href="/locaties" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Locaties
                </Link>{" "}
                voor afhaling en leveropties in de regio.
              </li>
            </ul>
          </GlassCard>
        </Reveal>
      </section>

      <section id="segment-faq" className="mx-auto mt-12 max-w-4xl scroll-mt-28">
        <Faq title="FAQ voor makers en hobbyisten" items={faqItems} />
      </section>

      <section id="segment-sources" className="mx-auto mt-12 max-w-5xl scroll-mt-28">
        <Reveal>
          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900">Bronnen en referenties</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {references.map((reference) => (
                <li key={reference.href} className="rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3">
                  <cite className="not-italic">
                    <a
                      href={reference.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      {reference.label}
                    </a>
                  </cite>
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
    </main>
  )
}
