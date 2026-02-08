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
  title: "3D printing voor prototypes | X3DPrints",
  description:
    "Snelle 3D-print prototypes vanuit Herzele met DFM-feedback, realistische planning en materiaaladvies voor productteams en makers.",
  alternates: {
    canonical: "https://www.x3dprints.be/segments/3d-printing-prototypes/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/segments/3d-printing-prototypes/",
      "en-BE": "https://www.x3dprints.be/en/segments/3d-printing-prototypes/",
      "x-default": "https://www.x3dprints.be/segments/3d-printing-prototypes/",
    },
  },
  openGraph: {
    title: "3D printing voor prototypes",
    description:
      "Korte iteraties in PLA Matte, PLA Tough+ of PETG met focus op pasvorm, planning en heldere communicatie.",
    url: "https://www.x3dprints.be/segments/3d-printing-prototypes/",
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "3D printing voor prototypes" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printing voor prototypes",
    description:
      "Korte iteraties in PLA Matte, PLA Tough+ of PETG met focus op pasvorm, planning en heldere communicatie.",
    images: ["/Logo.webp"],
  },
}

const pageUrl = String(
  metadata.alternates?.canonical ?? `${SITE.url}/segments/3d-printing-prototypes/`,
)
const pageDescription = metadata.description ?? SITE.description
const lastUpdatedLabel = "Laatst bijgewerkt: 6 februari 2026"

const tocItems = [
  { id: "segment-overview", label: "Wat krijg je op deze prototype-route?" },
  { id: "segment-workflow", label: "Hoe loopt de prototype-workflow?" },
  { id: "segment-compare", label: "Welke materiaalkeuze past bij je sprint?" },
  { id: "segment-links", label: "Welke vervolgstappen zijn slim?" },
  { id: "segment-faq", label: "FAQ voor prototype-aanvragen" },
  { id: "segment-sources", label: "Bronnen en referenties" },
]

const steps = [
  {
    title: "1. Upload STL of STEP",
    copy: "Stuur je bestand met context: doel, testcriteria, kritieke maten en deadline.",
  },
  {
    title: "2. Materiaalkeuze en timing",
    copy: "We kiezen samen PLA Matte, PLA Tough+ of PETG en zetten een realistische planning.",
  },
  {
    title: "3. Print, check en feedback",
    copy: "Je ontvangt prototypes met basis QA-check en duidelijke feedback voor de volgende iteratie.",
  },
]

const highlights = [
  "Layerhoogte 0,12-0,24 mm afhankelijk van detail en snelheid",
  "Typische FDM tolerantie rond +/-0,2 mm met DFM-feedback",
  "Afhaling in Herzele of verzending binnen Belgie",
]

const comparisonRows = [
  {
    aspect: "Snel visueel prototype",
    material: "PLA Matte",
    note: "Beste keuze voor snelle vorm- en fitvalidatie met nette afwerking.",
  },
  {
    aspect: "Functionele test onder belasting",
    material: "PLA Tough+",
    note: "Handig wanneer je meer slagvastheid wil zonder meteen naar engineering blends te gaan.",
  },
  {
    aspect: "Outdoor of hogere temperatuur",
    material: "PETG",
    note: "Betere route bij warmte, UV en intensiever dagelijks gebruik.",
  },
]

const faqItems = [
  {
    q: "Welke bestanden leveren productteams best aan?",
    a: "Bij voorkeur STL of STEP met context over functie, gewenste toleranties en kritieke afmetingen.",
  },
  {
    q: "Kunnen jullie foto-updates of meetrapporten bezorgen?",
    a: "Ja. Op vraag sturen we foto-updates en een korte meetnotitie voor snelle reviewmomenten.",
  },
  {
    q: "Hoe snel zijn prototypes klaar?",
    a: "Meestal binnen enkele werkdagen. Geef sprintdeadlines en volume door zodat planning direct vastligt.",
  },
]

const references = [
  {
    label: "ISO/ASTM additive manufacturing terminology",
    href: "https://www.astm.org/f2997-13r21.html",
  },
  {
    label: "Prusa material guide (PLA, PETG, TPU)",
    href: "https://help.prusa3d.com/filament-material-guide",
  },
  {
    label: "All3DP FDM process explainer",
    href: "https://all3dp.com/2/fdm-3d-printing-explained/",
  },
]

const faqJsonLd = buildFaqPageSchema({
  inLanguage: "nl-BE",
  mainEntityOfPage: pageUrl,
  items: faqItems.map((item) => ({ q: item.q, a: item.a })),
})

const serviceOffers: SchemaOfferInput[] = [
  {
    serviceName: "3D printing voor prototypes",
    price: "EUR 5",
    description: "Snelle iteraties in PLA Matte, PLA Tough+ of PETG met DFM-feedback.",
    url: pageUrl,
  },
]

const localBusinessJsonLd = buildLocalBusinessSchema({
  pageUrl,
  description: pageDescription,
  image: "/Logo.webp",
  areaServed: "Gent & Vlaanderen",
  priceRange: "EUR 5 - EUR 49",
})

const serviceJsonLd = buildServiceSchema(
  "3D printing voor prototypes",
  serviceOffers,
  pageUrl,
  {
    description: pageDescription,
    inLanguage: "nl-BE",
    mainEntityOfPage: pageUrl,
  },
)

const howToJsonLd = buildHowToSchema({
  name: "Prototype aanvragen in 4 stappen",
  description:
    "Kies materiaal, stem planning af en vraag meteen een prototype-offerte met de juiste context.",
  inLanguage: "nl-BE",
  mainEntityOfPage: pageUrl,
  totalTime: "PT3M",
  steps: [
    {
      name: "Voorbereiden van je bestand",
      text: "Verzamel STL of STEP plus testdoel, kritieke maten en deadline.",
    },
    {
      name: "Materiaal kiezen",
      text: "Kies PLA Matte, PLA Tough+ of PETG op basis van gebruik en testbelasting.",
    },
    {
      name: "Prijs en timing afstemmen",
      url: "/pricing?utm_source=segments-prototypes&utm_medium=howto&utm_campaign=prototype-flow",
    },
    {
      name: "Offerte met prefill versturen",
      url: "/contact?material=pla-tough&quote=Prototype%20aanvraag%20met%20functionele%20testfocus",
    },
  ],
  toolNames: ["Material Suggestion Tool"],
  supplyNames: ["STL of STEP bestand"],
})

export default function PrototypeSegmentPage() {
  return (
    <main className="relative overflow-hidden px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-slate-50" />
        <div className="absolute left-10 top-[-20%] h-[24rem] w-[24rem] rounded-full bg-indigo-200/30 blur-[120px]" />
        <div className="absolute bottom-[-30%] right-[-10%] h-[28rem] w-[28rem] rounded-full bg-sky-200/30 blur-[140px]" />
      </div>

      <section id="segment-overview" className="mx-auto max-w-5xl scroll-mt-28">
        <Reveal>
          <header className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Segment</p>
            <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              3D printing voor prototypes
            </h1>
            <p className="mt-4 text-base text-slate-600">
              Snel van idee naar testbaar onderdeel: je krijgt materiaaladvies, realistische timing en directe opvolging in een compacte prototype-flow.
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
              <ShimmerButton
                href="/contact?material=pla-tough&quote=Prototype%20aanvraag%20met%20functionele%20testfocus"
                event={{ action: "cta_click", category: "segments_prototypes", label: "quote_primary" }}
              >
                Offerte aanvragen
              </ShimmerButton>
              <ShimmerButton
                href="/materials#material-suggestion-tool"
                className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                event={{ action: "cta_click", category: "segments_prototypes", label: "material_tool" }}
              >
                Material Suggestion Tool
              </ShimmerButton>
              <Link
                href="/pricing?utm_source=segments-prototypes&utm_medium=hero&utm_campaign=prototype-pricing"
                className="rounded-xl border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm"
              >
                Bekijk prijzen
              </Link>
            </div>
          </header>
          <ContentTableOfContents title="Inhoud" items={tocItems} className="mx-auto mt-6 max-w-2xl" />
        </Reveal>
      </section>

      <section id="segment-workflow" className="mx-auto mt-10 grid max-w-5xl gap-6 scroll-mt-28 lg:grid-cols-2">
        <Reveal>
          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900">Waarom X3DPrints voor prototypes</h2>
            <p className="mt-3 text-sm text-slate-600">
              Als eenmansstudio in bijberoep hou ik de communicatielijn kort. Je krijgt duidelijke statusupdates en advies dat direct bruikbaar is voor je volgende sprint.
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
        </Reveal>

        <Reveal delay={0.06}>
          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900">Prototype workflow</h2>
            <div className="mt-4 space-y-3">
              {steps.map((step) => (
                <div key={step.title} className="rounded-3xl border border-slate-200/70 bg-white/70 p-4 text-sm text-slate-600">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{step.title}</p>
                  <p className="mt-1 text-slate-700">{step.copy}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </Reveal>
      </section>

      <section id="segment-compare" className="mx-auto mt-10 max-w-5xl scroll-mt-28">
        <Reveal>
          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900">Materiaalkeuze per prototype-doel</h2>
            <p className="mt-2 text-sm text-slate-600">
              Gebruik deze snelle matrix om je eerste sprintkeuze te maken en beperk extra iteraties.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-[420px] text-left text-sm text-slate-700">
                <thead>
                  <tr className="border-b border-slate-200/70 text-slate-500">
                    <th className="py-2 pr-4 font-semibold">Doel</th>
                    <th className="py-2 pr-4 font-semibold">Startmateriaal</th>
                    <th className="py-2 pr-4 font-semibold">Opmerking</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.aspect} className="border-b border-slate-200/70 last:border-0">
                      <td className="py-2 pr-4 font-medium text-slate-900">{row.aspect}</td>
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
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/materials/pla-matte" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  PLA Matte detail
                </Link>{" "}
                - snelle visuele prototypes en fit checks.
              </li>
              <li>
                <Link href="/materials/petg" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  PETG detail
                </Link>{" "}
                - functionele tests met hogere belasting.
              </li>
              <li>
                <Link href="/services" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Services
                </Link>{" "}
                - volledig overzicht van workflow, scope en levermodel.
              </li>
              <li>
                <Link href="/pricing" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Prijzen
                </Link>{" "}
                - duidelijke prijsankers vanaf EUR 5.
              </li>
              <li>
                <Link href="/contact?material=pla-tough" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Contact met prefill
                </Link>{" "}
                - start meteen met materiaalcontext.
              </li>
            </ul>
          </GlassCard>
        </Reveal>
      </section>

      <section id="segment-faq" className="mx-auto mt-12 max-w-4xl scroll-mt-28">
        <Faq title="FAQ voor prototypes" items={faqItems} />
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
    </main>
  )
}
