import type { Metadata } from "next"
import Image from "next/image"
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
  title: "3D printing voor Valentijn cadeaus | X3DPrints",
  description:
    "Valentijn gifts en decor op maat in PLA Silk, Matte en Translucent met snelle lokale opvolging en duidelijke planning.",
  alternates: {
    canonical: "https://www.x3dprints.be/segments/3d-printing-valentijn/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/segments/3d-printing-valentijn/",
      "en-BE": "https://www.x3dprints.be/en/segments/3d-printing-valentijn/",
      "x-default": "https://www.x3dprints.be/segments/3d-printing-valentijn/",
    },
  },
  openGraph: {
    title: "3D printing voor Valentijn cadeaus",
    description:
      "Hartdecor, gifts en gepersonaliseerde prints met materiaaladvies en snelle productie.",
    url: "https://www.x3dprints.be/segments/3d-printing-valentijn/",
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "3D printing voor Valentijn cadeaus" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printing voor Valentijn cadeaus",
    description:
      "Gepersonaliseerde valentijnprints met duidelijke materiaalkeuze en timing.",
    images: ["/Logo.webp"],
  },
}

const pageUrl = String(
  metadata.alternates?.canonical ?? `${SITE.url}/segments/3d-printing-valentijn/`,
)
const pageDescription = metadata.description ?? SITE.description
const lastUpdatedLabel = "Laatst bijgewerkt: 7 februari 2026"

const tocItems = [
  { id: "segment-overview", label: "Wat levert deze valentijn-route op?" },
  { id: "segment-workflow", label: "Hoe loopt een valentijn-aanvraag?" },
  { id: "segment-materials", label: "Welke materiaalkeuze past bij gifts en decor?" },
  { id: "segment-gallery", label: "Voorbeelden en inspiratie" },
  { id: "segment-faq", label: "FAQ Valentijn 3D printing" },
  { id: "segment-sources", label: "Bronnen en referenties" },
]

const workflowSteps = [
  {
    title: "1. Idee en personalisatie",
    copy: "Deel je concept, gewenste tekst en deadline voor je valentijncollectie.",
  },
  {
    title: "2. Materiaal en afwerking",
    copy: "Kies PLA Silk, PLA Matte of Translucent voor de gewenste uitstraling.",
  },
  {
    title: "3. Productie en levering",
    copy: "We plannen je run met duidelijke timing en veilige levering of afhaling.",
  },
]

const materialRows = [
  {
    useCase: "Premium gifts",
    material: "PLA Silk",
    note: "Glanzende afwerking met opvallende kleur en detail.",
  },
  {
    useCase: "Zachte minimal look",
    material: "PLA Matte",
    note: "Rustige uitstraling en nette tekstweergave.",
  },
  {
    useCase: "Lichtobjecten en sfeerdecors",
    material: "PLA Translucent",
    note: "Mooi effect bij led-verlichting of kaarssimulatie.",
  },
]

const faqItems = [
  {
    q: "Kunnen jullie ook ontwerpen als ik geen STL of STEP heb?",
    a: "Ja, ontwerp kan als aparte service. Met STL of STEP kunnen we sneller starten met productie.",
  },
  {
    q: "Welke materiaalkeuze geeft de meest luxe uitstraling?",
    a: "Voor luxe kiezen klanten vaak PLA Silk of PLA Marble; voor soberder design werkt PLA Matte goed.",
  },
  {
    q: "Wanneer moet ik aanvragen voor 14 februari?",
    a: "Plan best enkele weken vooraf zodat personalisatie, testprint en levering zonder tijdsdruk kunnen gebeuren.",
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

const gallery = [
  { src: "/images/portfolio/valentijn2.webp", alt: "3D geprint valentijn duo decor" },
  { src: "/images/portfolio/valentijn3.webp", alt: "3D geprint valentijn hart decor" },
  { src: "/images/portfolio/big%20valentijn%20boy%20articulated.webp", alt: "3D geprint articulated valentijn figuur" },
]

const faqJsonLd = buildFaqPageSchema({
  inLanguage: "nl-BE",
  mainEntityOfPage: pageUrl,
  items: faqItems.map((item) => ({ q: item.q, a: item.a })),
})

const serviceOffers: SchemaOfferInput[] = [
  {
    serviceName: "Valentijn 3D printing",
    price: "EUR 5",
    description: "Gepersonaliseerde valentijngifts en decor in meerdere materialen.",
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
  "Valentijn 3D printing",
  serviceOffers,
  pageUrl,
  {
    description: pageDescription,
    inLanguage: "nl-BE",
    mainEntityOfPage: pageUrl,
  },
)

const howToJsonLd = buildHowToSchema({
  name: "Valentijn gift-aanvraag in 4 stappen",
  description:
    "Plan je valentijnprints met juiste materiaalkeuze, timing en prefill contactflow.",
  inLanguage: "nl-BE",
  mainEntityOfPage: pageUrl,
  totalTime: "PT3M",
  steps: [
    {
      name: "Concept en personalisatie delen",
      text: "Stuur je idee met tekst, formaat en gewenste uitstraling.",
    },
    {
      name: "Materiaalroute kiezen",
      text: "Kies PLA Silk, PLA Matte of PLA Translucent volgens look en doel.",
    },
    {
      name: "Prijs en timing bekijken",
      url: "/pricing?utm_source=segment-valentijn&utm_medium=howto&utm_campaign=valentijn-flow",
    },
    {
      name: "Aanvraag met prefill versturen",
      url: "/contact?material=pla-silk&quote=Valentijn%20gift%20aanvraag",
    },
  ],
  toolNames: ["Material Suggestion Tool"],
  supplyNames: ["STL of STEP bestand"],
})

export default function ValentijnSegmentPage() {
  return (
    <main className="relative overflow-hidden px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-red-50" />
        <div className="absolute left-8 top-[-18%] h-[22rem] w-[22rem] rounded-full bg-rose-200/35 blur-[120px]" />
      </div>

      <section id="segment-overview" className="mx-auto max-w-5xl scroll-mt-28">
        <Reveal>
          <header className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Segment</p>
            <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              3D printing voor Valentijn cadeaus
            </h1>
            <p className="mt-4 text-base text-slate-600">
              Voor hartdecor, gepersonaliseerde gifts en kleine campagnes met heldere timing richting 14 februari.
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <ShimmerButton
                href="/contact?material=pla-silk&quote=Valentijn%20gift%20aanvraag"
                event={{ action: "cta_click", category: "segments_valentijn", label: "contact_prefill" }}
              >
                Start valentijn-aanvraag
              </ShimmerButton>
              <ShimmerButton
                href="/materials#material-suggestion-tool"
                className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                event={{ action: "cta_click", category: "segments_valentijn", label: "material_tool" }}
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
            <h2 className="text-xl font-semibold text-slate-900">Hoe loopt een valentijn-aanvraag?</h2>
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
            <h2 className="text-xl font-semibold text-slate-900">Handige vervolgstappen</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li>
                <Link href="/blog/3d-printen-valentijn" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Valentijn blog
                </Link>{" "}
                met concepten en timingtips.
              </li>
              <li>
                <Link href="/pricing" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Prijzen
                </Link>{" "}
                om budget en batchgrootte te bepalen.
              </li>
              <li>
                <Link href="/portfolio" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Portfolio
                </Link>{" "}
                met recente giftvoorbeelden.
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

      <section id="segment-materials" className="mx-auto mt-10 max-w-5xl scroll-mt-28">
        <Reveal>
          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900">Materiaalkeuze voor valentijngifts</h2>
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
                  {materialRows.map((row) => (
                    <tr key={row.useCase} className="border-b border-slate-200/70 last:border-0">
                      <td className="py-2 pr-4 font-medium text-slate-900">{row.useCase}</td>
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

      <section id="segment-gallery" className="mx-auto mt-10 max-w-5xl scroll-mt-28">
        <Reveal>
          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900">Voorbeelden en inspiratie</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {gallery.map((item, idx) => (
                <div
                  key={item.src}
                  className={`overflow-hidden rounded-xl border border-slate-200/70 bg-white/80 shadow ${idx === 0 ? "sm:col-span-2" : ""}`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={idx === 0 ? 960 : 640}
                    height={idx === 0 ? 540 : 480}
                    className="h-full w-full object-cover"
                    sizes="(min-width: 1024px) 640px, 100vw"
                    priority={idx === 0}
                  />
                </div>
              ))}
            </div>
          </GlassCard>
        </Reveal>
      </section>

      <section id="segment-faq" className="mx-auto mt-12 max-w-4xl scroll-mt-28">
        <Faq title="FAQ Valentijn 3D printing" items={faqItems} />
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
