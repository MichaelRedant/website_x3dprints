import type { Metadata } from "next"
import Image from "next/image"
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
  title: "Vaderdag en Moederdag 3D printing | X3DPrints",
  description:
    "Gepersonaliseerde 3D geprinte gifts voor Vaderdag en Moederdag met snelle lokale productie en materiaaladvies.",
  alternates: {
    canonical: "https://www.x3dprints.be/segments/3d-printing-vaderdag-moederdag/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/segments/3d-printing-vaderdag-moederdag/",
      "en-BE": "https://www.x3dprints.be/en/segments/3d-printing-vaderdag-moederdag/",
      "x-default": "https://www.x3dprints.be/segments/3d-printing-vaderdag-moederdag/",
    },
  },
  openGraph: {
    title: "Vaderdag en Moederdag 3D printing",
    description:
      "Custom gifts zoals sleutelhangers, desk-items en naamdecor in PLA Silk, Matte of PETG.",
    url: "https://www.x3dprints.be/segments/3d-printing-vaderdag-moederdag/",
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "Vaderdag en Moederdag 3D printing" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaderdag en Moederdag 3D printing",
    description:
      "Gepersonaliseerde gifts met snelle planning en heldere materiaalkeuze.",
    images: ["/Logo.webp"],
  },
}

const pageUrl = String(
  metadata.alternates?.canonical ?? `${SITE.url}/segments/3d-printing-vaderdag-moederdag/`,
)
const pageDescription = metadata.description ?? SITE.description
const lastUpdatedLabel = "Laatst bijgewerkt: 7 februari 2026"

const tocItems = [
  { id: "segment-overview", label: "Wat levert deze gift-route op?" },
  { id: "segment-workflow", label: "Hoe loopt een Vaderdag of Moederdag aanvraag?" },
  { id: "segment-ideas", label: "Welke giftformats werken het best?" },
  { id: "segment-gallery", label: "Voorbeelden en inspiratie" },
  { id: "segment-faq", label: "FAQ Vaderdag en Moederdag" },
  { id: "segment-sources", label: "Bronnen en referenties" },
]

const workflowSteps = [
  {
    title: "1. Idee en personalisatie",
    copy: "Deel naam, boodschap, formaat en gewenste deadline voor je giftreeks.",
  },
  {
    title: "2. Materiaal en afwerking",
    copy: "We kiezen PLA Silk, PLA Matte of PETG op basis van look, sterkte en budget.",
  },
  {
    title: "3. Productie en levering",
    copy: "Je krijgt heldere timing en levering of afhaling afgestemd op je campagneplanning.",
  },
]

const giftRows = [
  {
    giftType: "Sleutelhangers en tags",
    material: "PLA Silk of PETG",
    note: "Sterk genoeg voor dagelijks gebruik met visuele impact.",
  },
  {
    giftType: "Desk-items en naamplaatjes",
    material: "PLA Matte",
    note: "Nette tekstweergave en rustige premium uitstraling.",
  },
  {
    giftType: "Antislip pads en details",
    material: "TPU",
    note: "Handig voor grip onder houders en accessoires.",
  },
]

const faqItems = [
  {
    q: "Kunnen jullie elk ontwerp personaliseren met naam of tekst?",
    a: "Ja. We kunnen naamvarianten in batches verwerken zolang leesbaarheid en formaat goed zijn afgestemd.",
  },
  {
    q: "Welk materiaal kies ik voor premium cadeaus?",
    a: "PLA Silk voor glans, PLA Matte voor zachte look en PETG voor extra robuustheid bij gebruiksitems.",
  },
  {
    q: "Hoe vroeg plan ik best voor mei en juni?",
    a: "Idealiter enkele weken op voorhand zodat personalisatie, testprint en levering zonder tijdsdruk gebeuren.",
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
  { src: "/images/portfolio/vaderdag.webp", alt: "3D geprinte Vaderdag sleutelhangers" },
  { src: "/images/portfolio/vaderdag2.webp", alt: "Gepersonaliseerde desk-items voor Vaderdag" },
  { src: "/images/portfolio/vaderdag3.webp", alt: "Vaderdag naamplaatje in 3D print" },
  { src: "/images/portfolio/moederdag.webp", alt: "Moederdag gift in PLA Silk" },
  { src: "/images/portfolio/moederdag2.webp", alt: "Moederdag organizer set met personalisatie" },
  { src: "/images/portfolio/moederdag3.webp", alt: "Gepersonaliseerde Moederdag print" },
]

const faqJsonLd = buildFaqPageSchema({
  inLanguage: "nl-BE",
  mainEntityOfPage: pageUrl,
  items: faqItems.map((item) => ({ q: item.q, a: item.a })),
})

const serviceOffers: SchemaOfferInput[] = [
  {
    serviceName: "Vaderdag en Moederdag 3D printing",
    price: "EUR 5",
    description: "Gepersonaliseerde gifts met materiaaladvies en snelle lokale productie.",
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
  "Vaderdag en Moederdag 3D printing",
  serviceOffers,
  pageUrl,
  {
    description: pageDescription,
    inLanguage: "nl-BE",
    mainEntityOfPage: pageUrl,
  },
)

const howToJsonLd = buildHowToSchema({
  name: "Vaderdag en Moederdag gift-aanvraag in 4 stappen",
  description:
    "Plan gepersonaliseerde gifts met juiste materiaalkeuze, timing en prefill contactaanvraag.",
  inLanguage: "nl-BE",
  mainEntityOfPage: pageUrl,
  totalTime: "PT3M",
  steps: [
    {
      name: "Giftidee en personalisatie delen",
      text: "Stuur je idee, naamvarianten en gewenst formaat.",
    },
    {
      name: "Materiaalroute kiezen",
      text: "Kies PLA Silk, PLA Matte of PETG volgens look en gebruik.",
    },
    {
      name: "Prijs en timing bekijken",
      url: "/pricing?utm_source=segment-vaderdag-moederdag&utm_medium=howto&utm_campaign=gift-flow",
    },
    {
      name: "Aanvraag met prefill versturen",
      url: "/contact?material=pla-silk&quote=Vaderdag%20en%20Moederdag%20gift%20aanvraag",
    },
  ],
  toolNames: ["Material Suggestion Tool"],
  supplyNames: ["STL of STEP bestand"],
})

export default function ParentsDaySegmentPage() {
  return (
    <main className="relative overflow-hidden px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-amber-50" />
        <div className="absolute left-8 top-[-18%] h-[22rem] w-[22rem] rounded-full bg-rose-200/35 blur-[120px]" />
      </div>

      <section id="segment-overview" className="mx-auto max-w-5xl scroll-mt-28">
        <Reveal>
          <header className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Segment</p>
            <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Vaderdag en Moederdag 3D printing
            </h1>
            <p className="mt-4 text-base text-slate-600">
              Voor gepersonaliseerde gifts zoals sleutelhangers, desk-items en naamdecor met snelle planning rond mei en juni.
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <ShimmerButton
                href="/contact?material=pla-silk&quote=Vaderdag%20en%20Moederdag%20gift%20aanvraag"
                event={{ action: "cta_click", category: "segments_parentsday", label: "contact_prefill" }}
              >
                Start gift-aanvraag
              </ShimmerButton>
              <ShimmerButton
                href="/materials#material-suggestion-tool"
                className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                event={{ action: "cta_click", category: "segments_parentsday", label: "material_tool" }}
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
            <h2 className="text-xl font-semibold text-slate-900">Hoe loopt een Vaderdag of Moederdag aanvraag?</h2>
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
            <h2 className="text-xl font-semibold text-slate-900">Giftformats en materiaalkeuze</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-[440px] text-left text-sm text-slate-700">
                <thead>
                  <tr className="border-b border-slate-200/70 text-slate-500">
                    <th className="py-2 pr-4 font-semibold">Type gift</th>
                    <th className="py-2 pr-4 font-semibold">Startmateriaal</th>
                    <th className="py-2 pr-4 font-semibold">Richtlijn</th>
                  </tr>
                </thead>
                <tbody>
                  {giftRows.map((row) => (
                    <tr key={row.giftType} className="border-b border-slate-200/70 last:border-0">
                      <td className="py-2 pr-4 font-medium text-slate-900">{row.giftType}</td>
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

      <section id="segment-ideas" className="mx-auto mt-10 max-w-5xl scroll-mt-28">
        <Reveal>
          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900">Handige vervolgstappen</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li>
                <Link href="/blog/3d-printen-vaderdag-moederdag" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Vaderdag en Moederdag blog
                </Link>{" "}
                met praktische inspiratie.
              </li>
              <li>
                <Link href="/pricing" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Prijzen
                </Link>{" "}
                om batchbudget en timing te plannen.
              </li>
              <li>
                <Link href="/portfolio" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Portfolio
                </Link>{" "}
                met voorbeelden van custom runs.
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

      <section id="segment-gallery" className="mx-auto mt-10 max-w-5xl scroll-mt-28">
        <Reveal>
          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900">Voorbeelden en inspiratie</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
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
                    sizes="(min-width: 1024px) 320px, 100vw"
                    priority={idx === 0}
                  />
                </div>
              ))}
            </div>
          </GlassCard>
        </Reveal>
      </section>

      <section id="segment-faq" className="mx-auto mt-12 max-w-4xl scroll-mt-28">
        <Faq title="FAQ Vaderdag en Moederdag" items={faqItems} />
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