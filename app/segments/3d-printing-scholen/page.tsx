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
  title: "3D printing voor scholen | X3DPrints",
  description:
    "3D print ondersteuning voor scholen met klasprojecten, STEM opdrachten en duidelijke batchplanning vanuit Herzele.",
  alternates: {
    canonical: "https://www.x3dprints.be/segments/3d-printing-scholen/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/segments/3d-printing-scholen/",
      "en-BE": "https://www.x3dprints.be/en/segments/3d-printing-scholen/",
      "x-default": "https://www.x3dprints.be/segments/3d-printing-scholen/",
    },
  },
  openGraph: {
    title: "3D printing voor scholen",
    description:
      "Klasprojecten, STEM-modellen en educatieve batches met praktische materiaalkeuze.",
    url: "https://www.x3dprints.be/segments/3d-printing-scholen/",
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "3D printing voor scholen" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printing voor scholen",
    description:
      "Educatieve 3D prints met batchaanpak, materiaaladvies en duidelijke opvolging.",
    images: ["/Logo.webp"],
  },
}

const pageUrl = String(
  metadata.alternates?.canonical ?? `${SITE.url}/segments/3d-printing-scholen/`,
)
const pageDescription = metadata.description ?? SITE.description
const lastUpdatedLabel = "Laatst bijgewerkt: 7 februari 2026"

const tocItems = [
  { id: "segment-overview", label: "Wat krijg je als school?" },
  { id: "segment-workflow", label: "Hoe loopt een klasbatch?" },
  { id: "segment-use-cases", label: "Welke schooltoepassingen werken goed?" },
  { id: "segment-links", label: "Welke links zijn relevant voor docenten?" },
  { id: "segment-faq", label: "FAQ voor scholen" },
  { id: "segment-sources", label: "Bronnen en referenties" },
]

const workflowSteps = [
  {
    title: "1. Bestanden verzamelen",
    copy: "Verzamel STL of STEP bestanden per leerling, groep of project.",
  },
  {
    title: "2. Batch en materiaalroute",
    copy: "We plannen batches op materiaaltype en leveren waar nodig korte DFM-feedback.",
  },
  {
    title: "3. Labelen en opleveren",
    copy: "Prints worden gegroepeerd en gelabeld zodat je ze direct in de les kan inzetten.",
  },
]

const offerings = [
  {
    title: "STEM-opdrachten",
    copy: "Modellen voor mechanica, topografie of productontwikkeling.",
  },
  {
    title: "Makerspace ondersteuning",
    copy: "Printbatches voor clubs, workshops en projectweken.",
  },
  {
    title: "Klasorganisatie",
    copy: "Naamlabels, organizers en functionele klasaccessoires.",
  },
]

const useCaseRows = [
  {
    project: "Educatieve modellen",
    material: "PLA Matte",
    note: "Nette visuele output voor demonstraties en lesmateriaal.",
  },
  {
    project: "Functionele onderdelen",
    material: "PETG",
    note: "Betere weerstand bij frequent gebruik.",
  },
  {
    project: "Grip en antislip",
    material: "TPU",
    note: "Handig voor voeten, pads en beschermende details.",
  },
]

const faqItems = [
  {
    q: "Welke bestanden leveren leerlingen best aan?",
    a: "STL of STEP is ideaal. Voeg telkens doel, schaal en kritieke maat toe voor snellere verwerking.",
  },
  {
    q: "Kunnen jullie meerdere klasprojecten tegelijk plannen?",
    a: "Ja. We werken met batchplanning per materiaal en deadline zodat de output voorspelbaar blijft.",
  },
  {
    q: "Is extra feedback op ontwerpen mogelijk?",
    a: "Ja, we kunnen korte feedback geven over orientatie, wanddikte en printbaarheid voor de volgende iteratie.",
  },
]

const references = [
  {
    label: "Prusa material guide (PLA, PETG, TPU)",
    href: "https://help.prusa3d.com/filament-material-guide",
  },
  {
    label: "Google Search docs: crawlable links",
    href: "https://developers.google.com/search/docs/crawling-indexing/links-crawlable",
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
    serviceName: "3D printing voor scholen",
    price: "EUR 5",
    description: "Klasprojecten en educatieve batches met duidelijke planning.",
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
  "3D printing voor scholen",
  serviceOffers,
  pageUrl,
  {
    description: pageDescription,
    inLanguage: "nl-BE",
    mainEntityOfPage: pageUrl,
  },
)

const howToJsonLd = buildHowToSchema({
  name: "Schoolbatch opstarten in 4 stappen",
  description:
    "Zet klasprojecten om naar een duidelijke 3D printbatch met materiaalkeuze en planning.",
  inLanguage: "nl-BE",
  mainEntityOfPage: pageUrl,
  totalTime: "PT4M",
  steps: [
    {
      name: "Projectbestanden verzamelen",
      text: "Bundel STL of STEP per klas of groep met aantallen en deadline.",
    },
    {
      name: "Materiaal en batchroute bepalen",
      text: "Kies PLA Matte, PETG of TPU per toepassing en gebruik.",
    },
    {
      name: "Prijs en timing bekijken",
      url: "/pricing?utm_source=segment-scholen&utm_medium=howto&utm_campaign=education-flow",
    },
    {
      name: "Aanvraag met prefill versturen",
      url: "/contact?material=pla-matte&quote=Schoolbatch%20voor%20klasprojecten",
    },
  ],
  toolNames: ["Material Suggestion Tool"],
  supplyNames: ["STL of STEP bestanden"],
})

export default function SchoolsSegmentPage() {
  return (
    <main className="relative overflow-hidden px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-blue-50" />
        <div className="absolute left-8 top-[-18%] h-[22rem] w-[22rem] rounded-full bg-emerald-200/30 blur-[120px]" />
      </div>

      <section id="segment-overview" className="mx-auto max-w-5xl scroll-mt-28">
        <Reveal>
          <header className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Segment</p>
            <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              3D printing voor scholen
            </h1>
            <p className="mt-4 text-base text-slate-600">
              Ondersteuning voor STEM en klasprojecten met duidelijke batchplanning en praktische materiaalkeuze.
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <ShimmerButton
                href="/contact?material=pla-matte&quote=Schoolbatch%20voor%20klasprojecten"
                event={{ action: "cta_click", category: "segments_scholen", label: "contact_prefill" }}
              >
                Vraag educatieve offerte
              </ShimmerButton>
              <ShimmerButton
                href="/materials#material-suggestion-tool"
                className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                event={{ action: "cta_click", category: "segments_scholen", label: "material_tool" }}
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
            <h2 className="text-xl font-semibold text-slate-900">Hoe loopt een klasbatch?</h2>
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
            <h2 className="text-xl font-semibold text-slate-900">Ondersteuning voor klassen en makerspaces</h2>
            <div className="mt-4 space-y-3">
              {offerings.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 text-sm text-slate-700">
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1">{item.copy}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </Reveal>
      </section>

      <section id="segment-use-cases" className="mx-auto mt-10 max-w-5xl scroll-mt-28">
        <Reveal>
          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900">Materiaalkeuze per schooltoepassing</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-[420px] text-left text-sm text-slate-700">
                <thead>
                  <tr className="border-b border-slate-200/70 text-slate-500">
                    <th className="py-2 pr-4 font-semibold">Projecttype</th>
                    <th className="py-2 pr-4 font-semibold">Startmateriaal</th>
                    <th className="py-2 pr-4 font-semibold">Richtlijn</th>
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
            <h2 className="text-xl font-semibold text-slate-900">Handige links voor docenten en coordinators</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li>
                <Link href="/blog/use-case-dinsdag-scholen" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Scholen use-case blog
                </Link>{" "}
                met voorbeelden uit lescontext.
              </li>
              <li>
                <Link href="/blog/3d-printen-voor-beginners" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Beginnersgids
                </Link>{" "}
                voor leerlingen en starters.
              </li>
              <li>
                <Link href="/viewer" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  3D viewer
                </Link>{" "}
                om bestanden vooraf te controleren.
              </li>
              <li>
                <Link href="/locaties" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Locaties
                </Link>{" "}
                voor afhaling en levering.
              </li>
            </ul>
          </GlassCard>
        </Reveal>
      </section>

      <section id="segment-faq" className="mx-auto mt-12 max-w-4xl scroll-mt-28">
        <Faq title="FAQ voor scholen" items={faqItems} />
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
