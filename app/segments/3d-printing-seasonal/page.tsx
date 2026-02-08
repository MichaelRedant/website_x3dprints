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
  title: "Seasonal 3D designs | X3DPrints",
  description:
    "Seizoensgebonden 3D prints voor decor, gifts en eventprops met duidelijke planning en materiaaladvies vanuit Herzele.",
  alternates: {
    canonical: "https://www.x3dprints.be/segments/3d-printing-seasonal/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/segments/3d-printing-seasonal/",
      "en-BE": "https://www.x3dprints.be/en/segments/3d-printing-seasonal/",
      "x-default": "https://www.x3dprints.be/segments/3d-printing-seasonal/",
    },
  },
  openGraph: {
    title: "Seasonal 3D designs",
    description:
      "Van valentijn tot kerst: 3D geprinte decorstukken en gifts met snelle lokale opvolging.",
    url: "https://www.x3dprints.be/segments/3d-printing-seasonal/",
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "Seasonal 3D designs" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seasonal 3D designs",
    description:
      "Seizoensdecor en cadeaus met materiaaladvies en voorspelbare timing.",
    images: ["/Logo.webp"],
  },
}

const pageUrl = String(
  metadata.alternates?.canonical ?? `${SITE.url}/segments/3d-printing-seasonal/`,
)
const pageDescription = metadata.description ?? SITE.description
const lastUpdatedLabel = "Laatst bijgewerkt: 7 februari 2026"

const tocItems = [
  { id: "segment-overview", label: "Wat levert deze seasonal-route op?" },
  { id: "segment-workflow", label: "Hoe plan je seizoensproductie slim?" },
  { id: "segment-campaigns", label: "Welke seizoenscampagnes werken goed?" },
  { id: "segment-links", label: "Welke links geven extra inspiratie?" },
  { id: "segment-faq", label: "FAQ Seasonal 3D designs" },
  { id: "segment-sources", label: "Bronnen en referenties" },
]

const workflowSteps = [
  {
    title: "1. Thema en deadline bepalen",
    copy: "Koppel je campagne aan een duidelijke datum zoals valentijn, pasen, zomer of kerst.",
  },
  {
    title: "2. Materiaal en look kiezen",
    copy: "Kies PLA Silk, PLA Matte, PLA Marble of PETG volgens uitstraling en gebruik.",
  },
  {
    title: "3. Productie en levering afstemmen",
    copy: "We plannen printmomenten en levering zodat je assets tijdig klaarstaan.",
  },
]

const campaignRows = [
  {
    season: "Valentijn en voorjaar",
    focus: "Gifts, naamdecor en tafelstukken",
    blog: "/blog/3d-printen-valentijn",
  },
  {
    season: "Lente en Pasen",
    focus: "Decorsets, lichte displaystukken en eventprops",
    blog: "/blog/3d-printen-lente-pasen",
  },
  {
    season: "Herfst en Halloween",
    focus: "Themadecor, signage en opvallende props",
    blog: "/blog/3d-printen-herfst-halloween",
  },
  {
    season: "Winter en eindejaar",
    focus: "Kerstdecor, relatiegeschenken en feestelijke displays",
    blog: "/blog/3d-printen-winter-kerst-nieuwjaar",
  },
]

const logisticsPoints = [
  "Afhaling op afspraak in Herzele is mogelijk.",
  "Verzending en levering worden afgestemd op je campagneplanning.",
  "Voor breekbare stukken gebruiken we extra beschermde verpakking.",
]

const faqItems = [
  {
    q: "Hoe vroeg plan ik best seizoensdecor?",
    a: "Idealiter enkele weken op voorhand zodat materiaalkeuze, testprint en levering zonder tijdsdruk kunnen gebeuren.",
  },
  {
    q: "Welk materiaal werkt het best voor eventdecor?",
    a: "Binnen kiezen we vaak PLA Silk of PLA Matte. Voor robuust of buitengebruik schakelen we sneller naar PETG.",
  },
  {
    q: "Kunnen jullie ook kleine en grotere oplages met variaties leveren?",
    a: "Ja. We kunnen variaties op tekst, kleur of formaat in dezelfde batch verwerken.",
  },
]

const references = [
  {
    label: "Prusa material guide (PLA, PETG, TPU)",
    href: "https://help.prusa3d.com/article/material-guide_220",
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
    serviceName: "Seasonal 3D designs",
    price: "EUR 5",
    description: "Seizoensdecor, gifts en campagneprops met materiaaladvies.",
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
  "Seasonal 3D designs",
  serviceOffers,
  pageUrl,
  {
    description: pageDescription,
    inLanguage: "nl-BE",
    mainEntityOfPage: pageUrl,
  },
)

const howToJsonLd = buildHowToSchema({
  name: "Seasonal campagneprint in 4 stappen",
  description:
    "Plan seizoensgebonden 3D prints met de juiste materiaalkeuze, timing en prefill aanvraag.",
  inLanguage: "nl-BE",
  mainEntityOfPage: pageUrl,
  totalTime: "PT3M",
  steps: [
    {
      name: "Thema en deadline vastleggen",
      text: "Kies campagneperiode en stel duidelijke opleverdatum in.",
    },
    {
      name: "Materiaalroute bepalen",
      text: "Kies PLA Silk, PLA Matte, PLA Marble of PETG afhankelijk van look en gebruik.",
    },
    {
      name: "Prijs en timing bekijken",
      url: "/pricing?utm_source=segment-seasonal&utm_medium=howto&utm_campaign=seasonal-flow",
    },
    {
      name: "Aanvraag met prefill versturen",
      url: "/contact?material=pla-silk&quote=Seasonal%20campagne%20aanvraag",
    },
  ],
  toolNames: ["Material Suggestion Tool"],
  supplyNames: ["STL of STEP bestand"],
})

export default function SeasonalSegmentPage() {
  return (
    <main className="relative overflow-hidden px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-sky-50" />
        <div className="absolute left-10 top-[-18%] h-[22rem] w-[22rem] rounded-full bg-amber-200/35 blur-[120px]" />
      </div>

      <section id="segment-overview" className="mx-auto max-w-5xl scroll-mt-28">
        <Reveal>
          <header className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Segment</p>
            <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Seasonal 3D designs
            </h1>
            <p className="mt-4 text-base text-slate-600">
              Voor seizoensgebonden decor, gifts en eventprops met snelle lokale opvolging en heldere timing.
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <ShimmerButton
                href="/contact?material=pla-silk&quote=Seasonal%20campagne%20aanvraag"
                event={{ action: "cta_click", category: "segments_seasonal", label: "contact_prefill" }}
              >
                Start seasonal aanvraag
              </ShimmerButton>
              <ShimmerButton
                href="/materials#material-suggestion-tool"
                className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                event={{ action: "cta_click", category: "segments_seasonal", label: "material_tool" }}
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
            <h2 className="text-xl font-semibold text-slate-900">Hoe plan je seizoensproductie slim?</h2>
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
            <h2 className="text-xl font-semibold text-slate-900">Levering en bescherming</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {logisticsPoints.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>
      </section>

      <section id="segment-campaigns" className="mx-auto mt-10 max-w-5xl scroll-mt-28">
        <Reveal>
          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900">Seizoenscampagnes en inspiratie</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-[460px] text-left text-sm text-slate-700">
                <thead>
                  <tr className="border-b border-slate-200/70 text-slate-500">
                    <th className="py-2 pr-4 font-semibold">Periode</th>
                    <th className="py-2 pr-4 font-semibold">Focus</th>
                    <th className="py-2 pr-4 font-semibold">Inspireer je</th>
                  </tr>
                </thead>
                <tbody>
                  {campaignRows.map((row) => (
                    <tr key={row.season} className="border-b border-slate-200/70 last:border-0">
                      <td className="py-2 pr-4 font-medium text-slate-900">{row.season}</td>
                      <td className="py-2 pr-4">{row.focus}</td>
                      <td className="py-2 pr-4">
                        <Link href={row.blog} className="font-semibold text-indigo-600 hover:text-indigo-500">
                          Bekijk blog
                        </Link>
                      </td>
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
                <Link href="/blog/3d-printen-vaderdag-moederdag" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Vaderdag en Moederdag blog
                </Link>{" "}
                voor gift en campagne-inspiratie.
              </li>
              <li>
                <Link href="/blog/3d-printen-back-to-school" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Back to School blog
                </Link>{" "}
                voor education cases en planning.
              </li>
              <li>
                <Link href="/pricing" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Prijzen
                </Link>{" "}
                om budget en timing direct te valideren.
              </li>
              <li>
                <Link href="/locaties" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Locaties
                </Link>{" "}
                voor afhaling en levering in de regio.
              </li>
            </ul>
          </GlassCard>
        </Reveal>
      </section>

      <section id="segment-faq" className="mx-auto mt-12 max-w-4xl scroll-mt-28">
        <Faq title="FAQ Seasonal 3D designs" items={faqItems} />
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
