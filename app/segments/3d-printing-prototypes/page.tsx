import type { Metadata } from "next"
import Link from "next/link"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import Faq from "@/components/Faq"
import { SITE, buildLocalBusinessSchema, buildServiceSchema, SchemaOfferInput } from "@/lib/seo"

export const metadata: Metadata = {
  title: "3D printing voor prototypes | X3DPrints",
  description:
    "Snelle iteraties met 3D print prototypes vanuit Herzele. PLA Matte, PLA Tough+ en PETG met feedback over DFM, tolerantie en planning.",
  alternates: { canonical: "https://www.x3dprints.be/segments/3d-printing-prototypes/", languages: { "nl-BE": "https://www.x3dprints.be/segments/3d-printing-prototypes/", en: "https://www.x3dprints.be/en/segments/3d-printing-prototypes/", "x-default": "https://www.x3dprints.be/segments/3d-printing-prototypes/", }, },
  openGraph: {
    title: "3D printing voor prototypes",
    description:
      "Krijg strakke prototypes in PLA, PLA Tough+ of PETG. Korte lijnen, DFM-feedback en tooling zoals de Material Suggestion Tool.",
    url: "https://www.x3dprints.be/segments/3d-printing-prototypes/",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

const steps = [
  { title: "1. Upload je STL/STEP", copy: "Gebruik de viewer of mail je bestand met korte context. Vertel wat je wil testen." },
  { title: "2. Materiaal & planning", copy: "We adviseren PLA Matte voor design, PLA Tough+ voor functionele tests, PETG voor buitengebruik." },
  { title: "3. Productie & feedback", copy: "Binnen enkele werkdagen tonen we foto’s of video’s; we meten kritieke maten steekproefsgewijs na." },
]

const highlights = [
  "Layerhoogte 0,12-0,24 mm voor detail versus snelheid",
  "Typische tolerantie ±0,2 mm met DFM-feedback",
  "Lokale afhaling of verzending binnen België",
]

const faqItems = [
  {
    q: "Welke bestanden leveren productteams best aan?",
    a: "Bij voorkeur <strong>STL</strong> of <strong>STEP</strong> met context over functie, gewenste toleranties en eventuele kritieke afmetingen.",
  },
  {
    q: "Kunnen jullie foto's of meetrapporten bezorgen?",
    a: "Ja. Op verzoek sturen we foto-updates en korte meetrapporten zodat stakeholders sneller feedback kunnen geven.",
  },
  {
    q: "Hoe snel zijn prototypes klaar?",
    a: "Meestal binnen enkele werkdagen. Geef sprintdeadlines en reserveprints door zodat we de planning meteen vastleggen.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",

  inLanguage: ["nl-BE", "en-BE"],
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a.replace(/<[^>]*>/g, "") },
  })),
}

const pageUrl = String(
  metadata.alternates?.canonical ?? `${SITE.url}/segments/3d-printing-prototypes`,
)
const pageDescription = metadata.description ?? SITE.description

const serviceOffers: SchemaOfferInput[] = [
  {
    serviceName: "Prototypes 3D printing",
    price: "EUR 5",
    description: "Snelle iteraties in PLA Matte, PLA Tough+ of PETG met DFM-feedback.",
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

const serviceJsonLd = buildServiceSchema("3D printing voor prototypes", serviceOffers, pageUrl)

export default function PrototypeSegmentPage() {
  return (
    <main className="relative overflow-hidden px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-slate-50" />
        <div className="absolute left-10 top-[-20%] h-[24rem] w-[24rem] rounded-full bg-indigo-200/30 blur-[120px]" />
        <div className="absolute bottom-[-30%] right-[-10%] h-[28rem] w-[28rem] rounded-full bg-sky-200/30 blur-[140px]" />
      </div>

      <header className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Segment</p>
        <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          3D printing voor prototypes
        </h1>
        <p className="mt-4 text-base text-slate-600">
          Snelle iteraties, eerlijke timings en persoonlijke begeleiding vanuit Herzele. Gebruik deze pagina als startpunt voor je volgende sprint.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
          <ShimmerButton href="/contact?material=pla-tough-plus" event={ { action: "cta_click", category: "segments_prototypes", label: "quote" } }> Offerte aanvragen</ShimmerButton>
          <Link href="/materials#material-suggestion-tool" className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm">
            Material Suggestion Tool
          </Link>
        </div>
      </header>

      <section className="mx-auto mt-10 max-w-5xl grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Waarom X3DPrints</h2>
          <p className="mt-3 text-sm text-slate-600">
            Als éénmansstudio in bijberoep reageer ik snel en denk ik mee over haalbaarheid. We stemmen planning en materiaal samen af zodat jouw demo of reviewmoment vlot verloopt.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Stappenplan</h2>
          <div className="mt-4 space-y-3">
            {steps.map((step) => (
              <div key={step.title} className="rounded-3xl border border-slate-200/70 bg-white/70 p-4 text-sm text-slate-600">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{step.title}</p>
                <p className="mt-1 text-slate-700">{step.copy}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      <section className="mx-auto mt-10 max-w-5xl space-y-4">
        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Handige links</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>
              <Link href="/blog/pla-vs-petg" className="font-semibold text-indigo-600 hover:text-indigo-500">
                PLA vs PETG
              </Link>{" "}
              – materiaalvergelijking voor prototypes
            </li>
            <li>
              <Link href="/blog/hoeveel-kost-3d-printen" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Hoeveel kost 3D printen?
              </Link>{" "}
              – leer hoe we pricing inschatten
            </li>
            <li>
              <Link href="/viewer" className="font-semibold text-indigo-600 hover:text-indigo-500">
                3D viewer
              </Link>{" "}
              – controleer je STL/OBJ/GLB voordat je een offerte aanvraagt
            </li>
          </ul>
        </GlassCard>
      </section>

      <section className="mx-auto mt-12 max-w-4xl">
        <Faq title="FAQ voor prototypes" items={faqItems} />
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
