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
  title: "3D printing voor modelbouwers | X3DPrints",
  description:
    "Schaalmodellen en diorama onderdelen in PLA Wood, Marble, Silk en PETG met materiaaladvies en nabewerkingstips.",
  alternates: {
    canonical: "https://www.x3dprints.be/segments/3d-printing-modelbouwers/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/segments/3d-printing-modelbouwers/",
      "en-BE": "https://www.x3dprints.be/en/segments/3d-printing-modelbouwers/",
      "x-default": "https://www.x3dprints.be/segments/3d-printing-modelbouwers/",
    },
  },
  openGraph: {
    title: "3D printing voor modelbouwers",
    description:
      "Schaalmodellen, scenery en detailonderdelen met sterke materiaalkeuze en praktische workflow.",
    url: "https://www.x3dprints.be/segments/3d-printing-modelbouwers/",
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "3D printing voor modelbouwers" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printing voor modelbouwers",
    description:
      "Modelbouwprints met detailfocus, materiaaladvies en heldere planning.",
    images: ["/Logo.webp"],
  },
}

const pageUrl = String(
  metadata.alternates?.canonical ?? `${SITE.url}/segments/3d-printing-modelbouwers/`,
)
const pageDescription = metadata.description ?? SITE.description
const lastUpdatedLabel = "Laatst bijgewerkt: 7 februari 2026"

const tocItems = [
  { id: "segment-overview", label: "Wat levert deze modelbouwroute op?" },
  { id: "segment-workflow", label: "Hoe loopt een modelbouwaanvraag?" },
  { id: "segment-materials", label: "Welke materialen passen bij detailwerk?" },
  { id: "segment-links", label: "Welke links helpen je verder?" },
  { id: "segment-faq", label: "FAQ voor modelbouwers" },
  { id: "segment-sources", label: "Bronnen en referenties" },
]

const workflowSteps = [
  {
    title: "1. Bestand en schaal aanleveren",
    copy: "Stuur STL of STEP met schaalverhouding, detailzones en gewenste opleverdatum.",
  },
  {
    title: "2. Materiaalroute en printsetup",
    copy: "We bepalen materiaal, orientatie en laaghoogte voor de beste balans tussen detail en kost.",
  },
  {
    title: "3. Afwerking en oplevering",
    copy: "Na supportverwijdering leveren we onderdelen die direct bruikbaar zijn voor montage en nabewerking.",
  },
]

const materialRows = [
  {
    focus: "Houtlook en maquettegevoel",
    material: "PLA Wood",
    note: "Goed voor warme, natuurlijke uitstraling en lichte nabewerking.",
  },
  {
    focus: "Steenlook of decoratieve structuur",
    material: "PLA Marble of PLA Silk",
    note: "Sterke visuele impact voor diorama en presentatiemodellen.",
  },
  {
    focus: "Functionele modelonderdelen",
    material: "PETG",
    note: "Beter bestand tegen belasting en regelmatige handling.",
  },
]

const useCases = [
  "Schaalmodellen voor architectuur en landschappen",
  "Diorama props en detailonderdelen met strakke toleranties",
  "Modulaire delen voor veilig transport en montage op locatie",
]

const faqItems = [
  {
    q: "Welke laaghoogte raden jullie aan voor detailwerk?",
    a: "Voor zichtbaar detail kiezen we vaak 0,12 tot 0,16 mm. Voor grotere volumes kan 0,2 mm efficiënter zijn.",
  },
  {
    q: "Kunnen grote maquettes in modules?",
    a: "Ja. We kunnen modellen splitsen in logische delen met pasvlakken voor veilig transport en montage.",
  },
  {
    q: "Is nabewerking mogelijk?",
    a: "Ja. Supportverwijdering en lichte ontbraming zijn standaard, extra afwerking stemmen we vooraf af.",
  },
]

const references = [
  {
    label: "Prusa material guide (PLA, PETG, TPU)",
    href: "https://help.prusa3d.com/filament-material-guide",
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
    serviceName: "3D printing voor modelbouwers",
    price: "EUR 5",
    description: "Schaalmodellen en diorama onderdelen met materiaaladvies.",
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
  "3D printing voor modelbouwers",
  serviceOffers,
  pageUrl,
  {
    description: pageDescription,
    inLanguage: "nl-BE",
    mainEntityOfPage: pageUrl,
  },
)

const howToJsonLd = buildHowToSchema({
  name: "Modelbouwaanvraag in 4 stappen",
  description:
    "Vraag schaalmodel onderdelen aan met juiste schaalinfo, materiaalkeuze en planning.",
  inLanguage: "nl-BE",
  mainEntityOfPage: pageUrl,
  totalTime: "PT4M",
  steps: [
    {
      name: "Bestand en schaal doorgeven",
      text: "Stuur STL of STEP met schaalverhouding en gewenste detailzones.",
    },
    {
      name: "Materiaalroute kiezen",
      text: "Kies PLA Wood, PLA Marble, PLA Silk of PETG op basis van look en gebruik.",
    },
    {
      name: "Prijs en timing bekijken",
      url: "/pricing?utm_source=segment-modelbouwers&utm_medium=howto&utm_campaign=modelbouw-flow",
    },
    {
      name: "Aanvraag met prefill versturen",
      url: "/contact?material=pla-wood&quote=Modelbouw%20aanvraag%20met%20detailfocus",
    },
  ],
  toolNames: ["Material Suggestion Tool"],
  supplyNames: ["STL of STEP bestand"],
})

export default function ModelbouwSegmentPage() {
  return (
    <main className="relative overflow-hidden px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-rose-50" />
        <div className="absolute right-[-10%] top-[-18%] h-[22rem] w-[22rem] rounded-full bg-amber-200/30 blur-[120px]" />
      </div>

      <section id="segment-overview" className="mx-auto max-w-5xl scroll-mt-28">
        <Reveal>
          <header className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Segment</p>
            <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              3D printing voor modelbouwers
            </h1>
            <p className="mt-4 text-base text-slate-600">
              Voor schaalmodellen en diorama onderdelen met sterke detailcontrole, materiaaladvies en duidelijke levering.
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <ShimmerButton
                href="/contact?material=pla-wood&quote=Modelbouw%20aanvraag%20met%20detailfocus"
                event={{ action: "cta_click", category: "segments_modelbouwers", label: "contact_prefill" }}
              >
                Start modelbouwaanvraag
              </ShimmerButton>
              <ShimmerButton
                href="/materials#material-suggestion-tool"
                className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                event={{ action: "cta_click", category: "segments_modelbouwers", label: "material_tool" }}
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
            <h2 className="text-xl font-semibold text-slate-900">Hoe loopt een modelbouwaanvraag?</h2>
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
            <h2 className="text-xl font-semibold text-slate-900">Populaire modelbouwtoepassingen</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {useCases.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>
      </section>

      <section id="segment-materials" className="mx-auto mt-10 max-w-5xl scroll-mt-28">
        <Reveal>
          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900">Materiaalkeuze voor modelbouwdetails</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-[440px] text-left text-sm text-slate-700">
                <thead>
                  <tr className="border-b border-slate-200/70 text-slate-500">
                    <th className="py-2 pr-4 font-semibold">Focus</th>
                    <th className="py-2 pr-4 font-semibold">Startmateriaal</th>
                    <th className="py-2 pr-4 font-semibold">Richtlijn</th>
                  </tr>
                </thead>
                <tbody>
                  {materialRows.map((row) => (
                    <tr key={row.focus} className="border-b border-slate-200/70 last:border-0">
                      <td className="py-2 pr-4 font-medium text-slate-900">{row.focus}</td>
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
                om schaal en geometrie vooraf te controleren.
              </li>
              <li>
                <Link href="/blog/ontwerp-3d-printbaar-model" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Ontwerpblog
                </Link>{" "}
                met tips voor printbare details.
              </li>
              <li>
                <Link href="/blog/3d-printen-op-bestelling" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  3D printen op bestelling
                </Link>{" "}
                voor batch- en leveraanpak.
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
        <Faq title="FAQ voor modelbouwers" items={faqItems} />
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