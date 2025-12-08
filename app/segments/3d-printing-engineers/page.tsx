import type { Metadata } from "next"
import Link from "next/link"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import Faq from "@/components/Faq"
import { SITE, buildLocalBusinessSchema, buildServiceSchema, SchemaOfferInput } from "@/lib/seo"

export const metadata: Metadata = {
  title: "3D printing voor engineers | X3DPrints",
  description:
    "Functional prototypes, jigs en fixtures in PLA Tough+, PETG of TPU. Inclusief DFM-feedback en meetrapporten.",
  alternates: { canonical: "https://www.x3dprints.be/segments/3d-printing-engineers" },
  openGraph: {
    title: "3D printing voor engineers",
    description: "Precisieprints met focus op tolerantie, materiaaladvies en planning voor engineers in België.",
    url: "https://www.x3dprints.be/segments/3d-printing-engineers",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

const engineerHighlights = [
  "Typische tolerantie ±0,2 mm met DFM-feedback voor kritieke maten",
  "PLA Tough+ en PETG voor functionele onderdelen, TPU voor flexibele elementen",
  "Beschikbaarheid van meetrapporten, foto-updates en herhaalbatches",
]

const faqItems = [
  {
    q: "Welke toleranties zijn haalbaar?",
    a: "We mikken standaard op <strong>±0,2 mm</strong> bij FDM. Vermeld kritieke maten in je aanvraag, dan stemmen we orientatie en eventuele nabewerking af.",
  },
  {
    q: "Kunnen jullie meetrapporten of foto-updates delen?",
    a: "Ja. Op verzoek leveren we korte meetrapporten en fotologs zodat product- en QA-teams snel kunnen vrijgeven.",
  },
  {
    q: "Welk materiaal past bij mijn toepassing?",
    a: "<strong>PLA Tough+</strong> is ideaal voor taaie prototypes, <strong>PETG</strong> voor warmte of chemische belasting en <strong>TPU</strong> voor flexibele onderdelen. We adviseren graag mee in je aanvraag.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a.replace(/<[^>]*>/g, ""),
    },
  })),
}

const pageUrl = String(
  metadata.alternates?.canonical ?? `${SITE.url}/segments/3d-printing-engineers`,
)
const pageDescription = metadata.description ?? SITE.description

const serviceOffers: SchemaOfferInput[] = [
  {
    serviceName: "Engineers 3D printing",
    price: "EUR 5",
    description: "Functionele prototypes, jigs en fixtures met DFM-feedback.",
    url: pageUrl,
  },
]

const localBusinessJsonLd = buildLocalBusinessSchema({
  pageUrl,
  description: pageDescription,
  image: "/images/og-home.jpg",
  areaServed: "Gent & Vlaanderen",
  priceRange: "EUR 5 - EUR 49",
})

const serviceJsonLd = buildServiceSchema("3D printing voor engineers", serviceOffers, pageUrl)

export default function EngineersSegmentPage() {
  return (
    <main className="relative overflow-hidden px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100" />
      </div>

      <header className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Segment</p>
        <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          3D printing voor engineers
        </h1>
        <p className="mt-4 text-base text-slate-600">
          Voor jigs, fixtures, behuizingen en functionele prototypes. We denken mee over tolerantie, materiaal en planning.
        </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
            <ShimmerButton href="/contact?material=pla-tough-plus">Vraag een technisch gesprek</ShimmerButton>
            <Link href="/materials" className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm">
              Materialen bekijken
            </Link>
            <Link
              href="/materials#material-suggestion-tool"
              className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm"
            >
              Material Suggestion Tool
            </Link>
          </div>
      </header>

      <section className="mx-auto mt-10 max-w-5xl grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Typische toepassingen</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>Functionele prototypes voor productontwerp</li>
            <li>Jigs en fixtures voor assemblage of testen</li>
            <li>Behuizingen, brackets en custom tooling</li>
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            Afwerking: supportverwijdering en licht ontbramen standaard inbegrepen. Extra nabewerking in overleg.
          </p>
        </GlassCard>

        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Wat je krijgt</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {engineerHighlights.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </section>

      <section className="mx-auto mt-10 max-w-5xl">
        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Links & tools</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>
              <Link href="/viewer" className="font-semibold text-indigo-600 hover:text-indigo-500">
                3D viewer
              </Link>{" "}
              – check oriëntatie en vertex counts voor je offerte
            </li>
            <li>
              <Link href="/blog/hoeveel-kost-3d-printen" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Kostprijs gids
              </Link>{" "}
              – leer hoe timing en materiaal impact hebben
            </li>
            <li>
              <Link href="/blog/pla-vs-petg" className="font-semibold text-indigo-600 hover:text-indigo-500">
                PLA vs PETG
              </Link>{" "}
              – kies het juiste filament voor jouw toepassing
            </li>
          </ul>
        </GlassCard>
      </section>

      <section className="mx-auto mt-12 max-w-4xl">
        <Faq title="FAQ voor engineers" items={faqItems} />
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </main>
  )
}
