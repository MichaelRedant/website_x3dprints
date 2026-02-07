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
  title: "3D printing voor tabletop minis | X3DPrints",
  description:
    "Tabletop minis, scenery en dice towers met scherpe details, materiaaladvies en veilige levering vanuit Herzele.",
  alternates: {
    canonical: "https://www.x3dprints.be/segments/3d-printing-tabletop/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/segments/3d-printing-tabletop/",
      "en-BE": "https://www.x3dprints.be/en/segments/3d-printing-tabletop/",
      "x-default": "https://www.x3dprints.be/segments/3d-printing-tabletop/",
    },
  },
  openGraph: {
    title: "3D printing voor tabletop minis",
    description:
      "Minis, terrain en accessories voor tabletop spelers met duidelijke materiaalkeuze en planning.",
    url: "https://www.x3dprints.be/segments/3d-printing-tabletop/",
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "3D printing voor tabletop minis" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printing voor tabletop minis",
    description:
      "Scherpe details voor miniatures, bases en dice towers met veilige verpakking en levering.",
    images: ["/Logo.webp"],
  },
}

const pageUrl = String(
  metadata.alternates?.canonical ?? `${SITE.url}/segments/3d-printing-tabletop/`,
)
const pageDescription = metadata.description ?? SITE.description
const lastUpdatedLabel = "Laatst bijgewerkt: 7 februari 2026"

const tocItems = [
  { id: "segment-overview", label: "Wat levert deze tabletop-route op?" },
  { id: "segment-workflow", label: "Hoe loopt een miniatures-aanvraag?" },
  { id: "segment-materials", label: "Welke materialen passen bij minis en scenery?" },
  { id: "segment-delivery", label: "Hoe pakken we levering en veiligheid aan?" },
  { id: "segment-faq", label: "FAQ voor tabletop prints" },
  { id: "segment-sources", label: "Bronnen en referenties" },
]

const workflowSteps = [
  {
    title: "1. Bestand en schaal",
    copy: "Stuur STL of STEP met gewenste schaal, base-formaat en detailniveau.",
  },
  {
    title: "2. Materiaal en layerstrategie",
    copy: "We kiezen PLA Matte, PETG of TPU en bepalen layerhoogte op basis van detail en sterkte.",
  },
  {
    title: "3. Print en bescherming",
    copy: "Minis worden gecontroleerd, apart verpakt en verzonden of opgehaald op afspraak.",
  },
]

const materialRows = [
  {
    goal: "Miniatures met scherp detail",
    material: "PLA Matte",
    note: "Nette oppervlakken en goede basis voor primer en verf.",
  },
  {
    goal: "Terrain en functionele accessoires",
    material: "PLA Tough of PETG",
    note: "Steviger bij transport en herhaald gebruik op events.",
  },
  {
    goal: "Gripdelen en antislip voeten",
    material: "TPU",
    note: "Flexibel materiaal voor demping en betere stabiliteit op tafel.",
  },
]

const deliveryPoints = [
  "Afhaling in Herzele op afspraak is mogelijk.",
  "Verzending gebeurt stevig verpakt met scheiding van breekbare onderdelen.",
  "Voor grotere batches stemmen we timing af op je speeldag of eventdatum.",
]

const faqItems = [
  {
    q: "Kunnen jullie ook het model ontwerpen?",
    a: "Je kan STL of STEP aanleveren. Als je ontwerp nodig hebt, bekijken we dit als aparte ontwerpservice.",
  },
  {
    q: "Welke layerhoogte gebruik je voor minis?",
    a: "Voor detailprints kiezen we meestal 0,12 tot 0,16 mm. Voor groter terrain kan 0,2 mm efficiënter zijn.",
  },
  {
    q: "Hoe beschermen jullie kwetsbare onderdelen?",
    a: "Dunne onderdelen verpakken we apart en we adviseren, indien nodig, kleine ontwerpaanpassingen voor extra sterkte.",
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
    serviceName: "3D printing voor tabletop minis",
    price: "EUR 5",
    description: "Miniatures, scenery en accessories met materiaaladvies en veilige levering.",
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
  "3D printing voor tabletop minis",
  serviceOffers,
  pageUrl,
  {
    description: pageDescription,
    inLanguage: "nl-BE",
    mainEntityOfPage: pageUrl,
  },
)

const howToJsonLd = buildHowToSchema({
  name: "Tabletop print aanvragen in 4 stappen",
  description:
    "Vraag miniatures of terrain aan met duidelijke schaal, materiaalkeuze en leverafspraak.",
  inLanguage: "nl-BE",
  mainEntityOfPage: pageUrl,
  totalTime: "PT3M",
  steps: [
    {
      name: "Bestand en schaal delen",
      text: "Stuur STL of STEP met schaal, detailverwachting en aantallen.",
    },
    {
      name: "Materiaal en printinstellingen kiezen",
      text: "Kies PLA Matte, PETG of TPU volgens detail en gebruiksbelasting.",
    },
    {
      name: "Prijs en planning bekijken",
      url: "/pricing?utm_source=segment-tabletop&utm_medium=howto&utm_campaign=tabletop-flow",
    },
    {
      name: "Aanvraag met prefill versturen",
      url: "/contact?material=pla-matte&quote=Tabletop%20miniatures%20aanvraag",
    },
  ],
  toolNames: ["Material Suggestion Tool"],
  supplyNames: ["STL of STEP bestand"],
})

export default function TabletopSegmentPage() {
  return (
    <main className="relative overflow-hidden px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-sky-50" />
        <div className="absolute left-12 top-[-18%] h-[22rem] w-[22rem] rounded-full bg-indigo-200/30 blur-[120px]" />
      </div>

      <section id="segment-overview" className="mx-auto max-w-5xl scroll-mt-28">
        <Reveal>
          <header className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Segment</p>
            <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              3D printing voor tabletop minis
            </h1>
            <p className="mt-4 text-base text-slate-600">
              Voor miniatures, terrain en dice towers met scherpe details, goede materiaalkeuze en veilige levering.
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <ShimmerButton
                href="/contact?material=pla-matte&quote=Tabletop%20miniatures%20aanvraag"
                event={{ action: "cta_click", category: "segments_tabletop", label: "contact_prefill" }}
              >
                Start tabletop aanvraag
              </ShimmerButton>
              <ShimmerButton
                href="/materials#material-suggestion-tool"
                className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                event={{ action: "cta_click", category: "segments_tabletop", label: "material_tool" }}
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
            <h2 className="text-xl font-semibold text-slate-900">Hoe loopt een miniatures-aanvraag?</h2>
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
            <h2 className="text-xl font-semibold text-slate-900">Interne links voor je volgende stap</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li>
                <Link href="/blog/3d-printen-mini-figuren" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Miniaturen blog
                </Link>{" "}
                met concrete tips voor detail en afwerking.
              </li>
              <li>
                <Link href="/blog/ontwerp-3d-printbaar-model" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Ontwerpblog
                </Link>{" "}
                om STL-bestanden printklaar te maken.
              </li>
              <li>
                <Link href="/materials/pla-matte" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  PLA Matte detail
                </Link>{" "}
                als startmateriaal voor minis.
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

      <section id="segment-materials" className="mx-auto mt-10 max-w-5xl scroll-mt-28">
        <Reveal>
          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900">Materiaalkeuze voor minis en scenery</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-[440px] text-left text-sm text-slate-700">
                <thead>
                  <tr className="border-b border-slate-200/70 text-slate-500">
                    <th className="py-2 pr-4 font-semibold">Doel</th>
                    <th className="py-2 pr-4 font-semibold">Startmateriaal</th>
                    <th className="py-2 pr-4 font-semibold">Opmerking</th>
                  </tr>
                </thead>
                <tbody>
                  {materialRows.map((row) => (
                    <tr key={row.goal} className="border-b border-slate-200/70 last:border-0">
                      <td className="py-2 pr-4 font-medium text-slate-900">{row.goal}</td>
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

      <section id="segment-delivery" className="mx-auto mt-10 max-w-5xl scroll-mt-28">
        <Reveal>
          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900">Levering en bescherming</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {deliveryPoints.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>
      </section>

      <section id="segment-faq" className="mx-auto mt-12 max-w-4xl scroll-mt-28">
        <Faq title="FAQ voor tabletop prints" items={faqItems} />
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
