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
  title: "3D printing voor marketing en events | X3DPrints",
  description:
    "Props, awards en displaystukken voor activaties en events. Snelle lokale productie met materiaaladvies en campagnegerichte planning.",
  alternates: {
    canonical: "https://www.x3dprints.be/segments/3d-printing-marketing/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/segments/3d-printing-marketing/",
      "en-BE": "https://www.x3dprints.be/en/segments/3d-printing-marketing/",
      "x-default": "https://www.x3dprints.be/segments/3d-printing-marketing/",
    },
  },
  openGraph: {
    title: "3D printing voor marketing en events",
    description:
      "Laat eye-catching props en campagne-assets printen met korte lijnen en duidelijke timing.",
    url: "https://www.x3dprints.be/segments/3d-printing-marketing/",
    images: [{ url: "/images/og-segments-nl.svg", width: 1200, height: 630, alt: "3D printing voor marketing en events" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printing voor marketing en events",
    description: "Campagne-assets met snelle productie en heldere opvolging.",
    images: ["/images/og-segments-nl.svg"],
  },
}

const pageUrl = String(
  metadata.alternates?.canonical ?? `${SITE.url}/segments/3d-printing-marketing/`,
)
const pageDescription = metadata.description ?? SITE.description
const lastUpdatedLabel = "Laatst bijgewerkt: 6 februari 2026"

const tocItems = [
  { id: "segment-overview", label: "Wat levert deze marketing-route op?" },
  { id: "segment-workflow", label: "Hoe loopt de campagne-workflow?" },
  { id: "segment-use-cases", label: "Welke assets printen we het vaakst?" },
  { id: "segment-faq", label: "FAQ voor marketing en events" },
  { id: "segment-sources", label: "Bronnen en referenties" },
]

const workflowSteps = [
  {
    title: "1. Briefing met doel en deadline",
    copy: "Stuur moodboard, afmetingen en campagnekalender zodat timing en scope direct scherp staan.",
  },
  {
    title: "2. Materiaalkeuze en testprint",
    copy: "We kiezen PLA Matte, Silk, Marble of PETG op basis van look, sterkte en eventcontext.",
  },
  {
    title: "3. Productie en levering",
    copy: "Je krijgt statusupdates, kwaliteitscontrole en levering afgestemd op opbouw en activatiedagen.",
  },
]

const useCases = [
  {
    title: "Event props en activaties",
    body: "Fotogenieke props voor stands, beursactivaties en social content met consistente branding.",
  },
  {
    title: "Retail displays",
    body: "Producthouders, shelf-talkers en POS onderdelen die exact passen en snel vervangbaar zijn.",
  },
  {
    title: "Awards en gifts",
    body: "Gepersonaliseerde awards, gifts en premium campaign items in korte oplages.",
  },
]

const faqItems = [
  {
    q: "Welke materialen werken het best voor marketingprops?",
    a: "Voor visuele impact kiezen we vaak PLA Silk of Marble. Voor functionele displaystukken schakelen we sneller naar PETG.",
  },
  {
    q: "Kunnen jullie korte deadlines aan?",
    a: "Ja, zolang de scope en aantallen haalbaar zijn. Deel je eventdatum vroeg zodat planning en fallback-opties mee kunnen.",
  },
  {
    q: "Kunnen we reserveprints voorzien voor events?",
    a: "Ja. Voor kritieke assets plannen we reserve-exemplaren zodat je risico tijdens activaties verlaagt.",
  },
]

const references = [
  {
    label: "Google Search docs: crawlable links",
    href: "https://developers.google.com/search/docs/crawling-indexing/links-crawlable",
  },
  {
    label: "Schema.org Service",
    href: "https://schema.org/Service",
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
    serviceName: "3D printing voor marketing en events",
    price: "EUR 5",
    description: "Props, awards en displays met snelle lokale productie.",
    url: pageUrl,
  },
]

const localBusinessJsonLd = buildLocalBusinessSchema({
  pageUrl,
  description: pageDescription,
  image: "/images/og-segments-nl.svg",
  areaServed: "Gent en Vlaanderen",
  priceRange: "EUR 5 - EUR 49",
})

const serviceJsonLd = buildServiceSchema(
  "3D printing voor marketing en events",
  serviceOffers,
  pageUrl,
  {
    description: pageDescription,
    inLanguage: "nl-BE",
    mainEntityOfPage: pageUrl,
  },
)

const howToJsonLd = buildHowToSchema({
  name: "Marketing assets aanvragen in 4 stappen",
  description: "Vraag campaign-ready 3D prints aan met duidelijke timing en materiaalkeuze.",
  inLanguage: "nl-BE",
  mainEntityOfPage: pageUrl,
  totalTime: "PT3M",
  steps: [
    {
      name: "Briefing sturen",
      text: "Stuur doel, deadline, volume en gewenste uitstraling van je assets.",
    },
    {
      name: "Materiaalroute kiezen",
      text: "Kies PLA Matte, Silk, Marble of PETG op basis van look en gebruik.",
    },
    {
      name: "Prijs en planning checken",
      url: "/pricing?utm_source=segment-marketing&utm_medium=howto&utm_campaign=segment-flow",
    },
    {
      name: "Aanvraag met prefill",
      url: "/contact?material=pla-silk&quote=Marketing%20en%20event%20assets%20aanvraag",
    },
  ],
  toolNames: ["Material Suggestion Tool"],
  supplyNames: ["STL of STEP bestanden"],
})

export default function MarketingSegmentPage() {
  return (
    <main className="relative overflow-hidden px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-amber-50" />
        <div className="absolute left-8 top-[-20%] h-[22rem] w-[22rem] rounded-full bg-amber-200/35 blur-[120px]" />
      </div>

      <section id="segment-overview" className="mx-auto max-w-5xl scroll-mt-28">
        <Reveal>
          <header className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Segment</p>
            <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              3D printing voor marketing en events
            </h1>
            <p className="mt-4 text-base text-slate-600">
              Voor campagneprops, displays en activatie-assets met snelle uitvoering, heldere communicatie en realistische eventplanning.
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <ShimmerButton
                href="/contact?material=pla-silk&quote=Marketing%20en%20event%20assets%20aanvraag"
                event={{ action: "cta_click", category: "segments_marketing", label: "contact_prefill" }}
              >
                Vraag offerte
              </ShimmerButton>
              <ShimmerButton
                href="/materials#material-suggestion-tool"
                className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                event={{ action: "cta_click", category: "segments_marketing", label: "material_tool" }}
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

      <section id="segment-workflow" className="mx-auto mt-10 max-w-5xl scroll-mt-28">
        <Reveal>
          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Hoe loopt de campagne-workflow?</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {workflowSteps.map((step) => (
                <div key={step.title} className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 text-sm text-slate-700">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{step.title}</p>
                  <p className="mt-2">{step.copy}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </Reveal>
      </section>

      <section id="segment-use-cases" className="mx-auto mt-10 max-w-5xl scroll-mt-28">
        <Reveal>
          <h2 className="text-2xl font-semibold text-slate-900">Welke assets printen we het vaakst?</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {useCases.map((item) => (
              <GlassCard key={item.title} className="p-6">
                <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-700">{item.body}</p>
              </GlassCard>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <Link href="/portfolio" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Portfolio bekijken
            </Link>
            <Link href="/blog/3d-printing-marketing-events" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Lees marketing events blog
            </Link>
            <Link href="/pricing" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Check prijsimpact
            </Link>
          </div>
        </Reveal>
      </section>

      <section id="segment-faq" className="mx-auto mt-12 max-w-4xl scroll-mt-28">
        <Faq title="FAQ voor marketing en events" items={faqItems} />
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