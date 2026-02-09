import type { Metadata } from "next"
import Link from "next/link"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import ReadMoreLinks from "@/components/ReadMoreLinks"
import {
  SITE,
  buildFaqPageSchema,
  buildHowToSchema,
  buildLocalBusinessSchema,
  buildServiceSchema,
  SchemaOfferInput,
} from "@/lib/seo"

export const metadata: Metadata = {
  title: "3D printing voor engineers | X3DPrints",
  description:
    "Functionele 3D prints voor engineers met focus op tolerantie, materiaalkeuze en snelle iteraties vanuit Herzele.",
  alternates: {
    canonical: "https://www.x3dprints.be/segments/3d-printing-engineers/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/segments/3d-printing-engineers/",
      "en-BE": "https://www.x3dprints.be/en/segments/3d-printing-engineers/",
      "x-default": "https://www.x3dprints.be/segments/3d-printing-engineers/",
    },
  },
  openGraph: {
    title: "3D printing voor engineers",
    description:
      "Jigs, fixtures en functionele prototypes met korte communicatielijnen en realistische planning.",
    url: "https://www.x3dprints.be/segments/3d-printing-engineers/",
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "3D printing voor engineers" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printing voor engineers",
    description:
      "Functionele onderdelen met duidelijke tolerantierichtlijnen en materiaaladvies.",
    images: ["/Logo.webp"],
  },
}

const pageUrl = String(
  metadata.alternates?.canonical ?? `${SITE.url}/segments/3d-printing-engineers/`,
)
const pageDescription = metadata.description ?? SITE.description
const lastUpdatedLabel = "Laatst bijgewerkt: 7 februari 2026"

const tocItems = [
  { id: "segment-overview", label: "Wat levert dit engineer-traject op?" },
  { id: "segment-workflow", label: "Hoe loopt de technische workflow?" },
  { id: "segment-material-matrix", label: "Welke materiaalkeuze past bij je test?" },
  { id: "segment-links", label: "Welke links versnellen je traject?" },
  { id: "segment-faq", label: "FAQ voor engineers" },
  { id: "segment-sources", label: "Bronnen en referenties" },
]

const workflowSteps = [
  {
    title: "1. Technische intake",
    copy: "Deel STL of STEP, kritieke maten, gebruikscontext en deadline voor een gerichte intake.",
  },
  {
    title: "2. DFM en materiaalroute",
    copy: "We geven feedback op orientatie, wanddikte en steunvlakken en kiezen daarna PLA Tough, PETG of TPU.",
  },
  {
    title: "3. Productie en QA",
    copy: "Je krijgt een printbatch met visuele controle en, indien gevraagd, korte meetnotities voor snelle vrijgave.",
  },
]

const highlights = [
  "Typische FDM-richtlijn rond +/-0,2 mm, afhankelijk van geometrie en orientatie",
  "Snel itereren in kleine en grotere batches zonder overproductie",
  "Duidelijke communicatie door directe lijn met dezelfde operator",
]

const matrixRows = [
  {
    application: "Passing en vormcontrole",
    material: "PLA Matte of PLA Tough",
    note: "Snelle iteratie met nette oppervlakken en lage printtijd.",
  },
  {
    application: "Functionele proef onder belasting",
    material: "PLA Tough of PETG",
    note: "Betere impactweerstand en betrouwbaarder bij herhaald testen.",
  },
  {
    application: "Flexibele onderdelen of dempers",
    material: "TPU",
    note: "Handig voor grip, trillingsdemping en lichte vervorming onder druk.",
  },
]

const faqItems = [
  {
    q: "Welke toleranties zijn realistisch bij FDM?",
    a: "Als startpunt hanteren we vaak +/-0,2 mm. Voor kritieke zones geven we vooraf DFM-feedback en praktische correcties.",
  },
  {
    q: "Kunnen jullie ook meetnotities toevoegen?",
    a: "Ja. Op aanvraag voorzien we kernmaten met korte meetnotities zodat QA en engineering sneller kunnen beslissen.",
  },
  {
    q: "Wat als een eerste versie niet past?",
    a: "Dan plannen we direct een iteratie met aangepaste orientatie, spelingscorrectie of materiaalwissel.",
  },
]

const references = [
  {
    label: "Google Search docs: crawlable links",
    href: "https://developers.google.com/search/docs/crawling-indexing/links-crawlable",
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
    serviceName: "3D printing voor engineers",
    price: "EUR 5",
    description: "Functionele prototypes, jigs en fixtures met materiaaladvies.",
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
  "3D printing voor engineers",
  serviceOffers,
  pageUrl,
  {
    description: pageDescription,
    inLanguage: "nl-BE",
    mainEntityOfPage: pageUrl,
  },
)

const howToJsonLd = buildHowToSchema({
  name: "Technische 3D print aanvraag in 4 stappen",
  description:
    "Vraag snel een functionele print aan met juiste materiaalkeuze, planning en duidelijke intake.",
  inLanguage: "nl-BE",
  mainEntityOfPage: pageUrl,
  totalTime: "PT4M",
  steps: [
    {
      name: "Bestand en context delen",
      text: "Stuur STL of STEP met doel, kritieke maten en deadline.",
    },
    {
      name: "Materiaalroute kiezen",
      text: "Kies PLA Tough, PETG of TPU op basis van belasting en omgeving.",
    },
    {
      name: "Prijs en timing bekijken",
      url: "/pricing?utm_source=segment-engineers&utm_medium=howto&utm_campaign=engineers-flow",
    },
    {
      name: "Aanvraag met prefill versturen",
      url: "/contact?material=pla-tough&quote=Functionele%20prototype%20aanvraag%20met%20tolerantiecontext",
    },
  ],
  toolNames: ["Material Suggestion Tool"],
  supplyNames: ["STL of STEP bestand"],
})

export default function EngineersSegmentPage() {
  return (
    <main className="relative overflow-hidden px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-cyan-50" />
        <div className="absolute left-10 top-[-18%] h-[22rem] w-[22rem] rounded-full bg-cyan-200/30 blur-[120px]" />
      </div>

      <section id="segment-overview" className="mx-auto max-w-5xl scroll-mt-28">
        <Reveal>
          <header className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Segment</p>
            <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              3D printing voor engineers
            </h1>
            <p className="mt-4 text-base text-slate-600">
              Voor jigs, fixtures en functionele prototypes met korte feedbacklussen, materiaaladvies en realistische planning.
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <ShimmerButton
                href="/contact?material=pla-tough&quote=Functionele%20prototype%20aanvraag%20met%20tolerantiecontext"
                event={{ action: "cta_click", category: "segments_engineers", label: "contact_prefill" }}
              >
                Vraag technische offerte
              </ShimmerButton>
              <ShimmerButton
                href="/materials#material-suggestion-tool"
                className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                event={{ action: "cta_click", category: "segments_engineers", label: "material_tool" }}
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
            <h2 className="text-xl font-semibold text-slate-900">Hoe loopt de technische workflow?</h2>
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
            <h2 className="text-xl font-semibold text-slate-900">Waarom deze route werkt voor engineering</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-500" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>
      </section>

      <section id="segment-material-matrix" className="mx-auto mt-10 max-w-5xl scroll-mt-28">
        <Reveal>
          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900">Materiaalkeuze per testdoel</h2>
            <p className="mt-2 text-sm text-slate-600">
              Start met deze matrix en verfijn daarna op basis van wanddikte, orientatie en belasting.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-[440px] text-left text-sm text-slate-700">
                <thead>
                  <tr className="border-b border-slate-200/70 text-slate-500">
                    <th className="py-2 pr-4 font-semibold">Toepassing</th>
                    <th className="py-2 pr-4 font-semibold">Startmateriaal</th>
                    <th className="py-2 pr-4 font-semibold">Richtlijn</th>
                  </tr>
                </thead>
                <tbody>
                  {matrixRows.map((row) => (
                    <tr key={row.application} className="border-b border-slate-200/70 last:border-0">
                      <td className="py-2 pr-4 font-medium text-slate-900">{row.application}</td>
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
                <Link href="/materials/pla-tough" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  PLA Tough materiaalpagina
                </Link>{" "}
                voor snelle functionele iteraties.
              </li>
              <li>
                <Link href="/materials/petg" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  PETG materiaalpagina
                </Link>{" "}
                voor hogere belastbaarheid.
              </li>
              <li>
                <Link href="/blog/pla-vs-petg" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  PLA vs PETG blog
                </Link>{" "}
                met praktische keuzecriteria.
              </li>
              <li>
                <Link href="/blog/maker-monday-toleranties-3d-printen" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Toleranties blog
                </Link>{" "}
                voor snellere iteratiebeslissingen.
              </li>
              <li>
                <Link href="/pricing" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Prijzen
                </Link>{" "}
                om budget en timing vooraf te aligneren.
              </li>
              <li>
                <Link href="/locaties" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Locaties
                </Link>{" "}
                voor afhaling en leveropties.
              </li>
            </ul>
          </GlassCard>
        </Reveal>
      </section>

      <section id="segment-faq" className="mx-auto mt-12 max-w-4xl scroll-mt-28">
        <Faq title="FAQ voor engineers" items={faqItems} />
      </section>

      <ReadMoreLinks pageType="segments" />

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