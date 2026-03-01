import type { Metadata } from "next"
import Link from "next/link"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import ReadMoreLinks from "@/components/ReadMoreLinks"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import { buildArticleJsonLd, buildFaqPageSchema, buildHowToSchema } from "@/lib/seo"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"

const canonical = "https://www.x3dprints.be/blog/3d-print-prijzen-gids/"
const datePublished = "2026-02-09"
const dateModified = "2026-02-09"
const pricingHref = "/pricing?utm_source=blog&utm_medium=cta&utm_campaign=prijzen-gids"
const materialsHref = "/materials?utm_source=blog&utm_medium=cta&utm_campaign=prijzen-gids#material-suggestion-tool"
const viewerHref = "/viewer?utm_source=blog&utm_medium=cta&utm_campaign=prijzen-gids"
const contactHref =
  "/contact?material=pla-matte&quote=Prijsindicatie%20voor%20mijn%203D%20print"

export const metadata: Metadata = {
  title: "3D print prijzen gids 2026: kosten & voorbeelden | X3DPrints",
  description:
    "Complete gids over 3D print prijzen in 2026: kostblokken, prijsranges per projecttype en concrete tips om je prijs per stuk te verlagen.",
  alternates: { canonical },
  openGraph: {
    title: "3D print prijzen gids 2026",
    description:
      "Kostgids met prijsankers, kostblokken en optimalisaties om je 3D print budget te sturen.",
    url: canonical,
    images: [{ url: "/images/og-blog-nl.svg", width: 1200, height: 630, alt: "3D print prijzen gids" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D print prijzen gids 2026",
    description: "Prijsankers, kostfactoren en tips om je budget te beheren.",
    images: ["/images/og-blog-nl.svg"],
  },
}

const costBlocks = [
  {
    title: "Materiaal",
    description:
      "PLA Matte is het prijsanker voor zichtwerk. PETG, TPU en specials verhogen de kost door duurder filament en extra planning.",
    link: { href: "/materials", label: "Bekijk materialen" },
  },
  {
    title: "Printtijd",
    description:
      "Laaghoogte, infill en supports bepalen machine-uren. Meer detail betekent langere printtijd en hogere prijs.",
    link: { href: "/pricing", label: "Simuleer printtijd" },
  },
  {
    title: "Setup & voorbereiding",
    description:
      "Bestandcontrole, slicer-instellingen en supportstrategie kosten tijd, vooral bij nieuwe geometrie of prototypes.",
    link: { href: "/viewer", label: "Check je model" },
  },
  {
    title: "Nabewerking",
    description:
      "Support removal, lichte finishing en kwaliteitscontrole tellen mee per batch. Extra afwerking verhoogt de prijs.",
    link: { href: "/contact", label: "Vraag afwerkingsadvies" },
  },
  {
    title: "Logistiek & planning",
    description:
      "Afhalen in Herzele is het meest kostefficiënt. Spoed of verzending verandert de prijsrange.",
    link: { href: "/contact", label: "Plan levering" },
  },
]

const priceAnchors = [
  {
    label: "Prototype",
    size: "1-2 stuks, <10 cm",
    material: "PLA Matte",
    printTime: "2-4 uur",
    price: "EUR 10-25",
  },
  {
    label: "Kleine serie",
    size: "10-25 stuks",
    material: "PLA Matte / PETG",
    printTime: "6-12 uur",
    price: "EUR 8-18 per stuk",
  },
  {
    label: "Branding prop",
    size: "20-30 cm",
    material: "PLA Silk / Marble",
    printTime: "8-14 uur",
    price: "EUR 45-120",
  },
  {
    label: "Functioneel onderdeel",
    size: "10-20 cm",
    material: "PETG / TPU",
    printTime: "5-10 uur",
    price: "EUR 25-60",
  },
]

const optimizationTips = [
  "Combineer onderdelen in één printbatch om setupkosten te delen.",
  "Gebruik enkel hoge resolutie op zichtvlakken die het nodig hebben.",
  "Vermijd onnodige supports door slimme orientatie of lichte chamfers.",
  "Start met PLA Matte en upgrade pas naar PETG/TPU wanneer de use case dit vereist.",
  "Deel je deadline vroeg zodat planning en kost stabiel blijven.",
]

const segmentHighlights = [
  {
    title: "Prototypes & R&D",
    description:
      "Snelle iteraties met duidelijke prijsankers voor productteams en engineers.",
    href: "/segments/3d-printing-prototypes",
    label: "Bekijk prototype segment",
  },
  {
    title: "Marketing & events",
    description:
      "Branding props en displays met zichtwerk-materialen en strakke deadlines.",
    href: "/segments/3d-printing-marketing",
    label: "Bekijk marketing segment",
  },
  {
    title: "Tabletop & hobby",
    description:
      "Miniaturen en terrain met detailniveau en prijs per batch afgestemd op campagnes.",
    href: "/segments/3d-printing-tabletop",
    label: "Bekijk tabletop segment",
  },
]

const faqItems = [
  {
    q: "Kan ik een prijs krijgen zonder definitief bestand?",
    a: "Ja. Met afmetingen, toepassing en gewenste materialen geven we een betrouwbare prijsrange.",
  },
  {
    q: "Wat verlaagt de prijs het meest?",
    a: "Minder supports, een slim georienteerd model en batching leveren meestal de grootste winst.",
  },
  {
    q: "Wanneer wordt PETG of TPU echt nodig?",
    a: "Bij outdoor use cases, mechanische belasting of wanneer flexibiliteit een must is.",
  },
  {
    q: "Is er een minimum orderwaarde?",
    a: "Nee. Kleine prints zijn mogelijk, maar de setupkosten wegen relatief zwaarder door.",
  },
]

const references = [
  {
    label: "Ultimaker: Design for FFF 3D printing",
    href: "https://ultimaker.com/learn/design-for-fff-3d-printing/",
  },
  {
    label: "PrusaSlicer G-code viewer (print time)",
    href: "https://help.prusa3d.com/article/g-code-viewer_78984",
  },
  {
    label: "Prusa material guide (PLA, PETG, TPU)",
    href: "https://help.prusa3d.com/filament-material-guide",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "3D print prijzen gids 2026",
  description:
    "Overzicht van kostblokken, prijsankers per projecttype en optimalisatietips voor 3D printen.",
  datePublished,
  dateModified,
  image: "/images/og-blog-nl.svg",
  inLanguage: "nl-BE",
})

const faqJsonLd = buildFaqPageSchema({
  inLanguage: "nl-BE",
  mainEntityOfPage: canonical,
  items: faqItems.map((item) => ({ q: item.q, a: item.a })),
})

const howToJsonLd = buildHowToSchema({
  name: "3D print prijsinschatting in 4 stappen",
  description:
    "Bepaal snel je budget op basis van materiaal, printtijd, batch en levering.",
  inLanguage: "nl-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT4M",
  steps: [
    {
      name: "Bepaal toepassing en formaat",
      text: "Omschrijf het gebruik (prototype, marketing, functioneel) en deel afmetingen of volume.",
    },
    {
      name: "Kies basismateriaal",
      url: materialsHref,
    },
    {
      name: "Check printtijd en supports",
      url: viewerHref,
    },
    {
      name: "Vraag een gerichte offerte",
      url: contactHref,
    },
  ],
  toolNames: ["X3DPrints pricing calculator", "Material Suggestion Tool"],
  supplyNames: ["STL of STEP bestand"],
})

export default function BlogPricingGuidePage() {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-16 sm:px-8 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_0%,rgba(16,185,129,.18),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.08]" />

      <article className="mx-auto max-w-5xl space-y-10">
        <header className="space-y-4">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link href="/blog" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Blog
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="font-medium text-slate-700">3D print prijzen gids</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">Pricing pillar</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            3D print prijzen gids: wat kost een print in 2026?
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            3D print prijzen starten vanaf EUR 10, maar de echte kost hangt af van materiaal, printtijd, batchgrootte en planning.
            Deze gids geeft prijsankers, optimalisaties en de snelste route naar een offerte.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
            Laatst bijgewerkt: 9 februari 2026
          </p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={pricingHref}
              event={{ action: "cta_click", category: "blog_prijzen_gids_top", label: "pricing" }}
            >
              Open pricing calculator
            </ShimmerButton>
            <ShimmerButton
              href={materialsHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_prijzen_gids_top", label: "materials_tool" }}
            >
              Kies materiaal
            </ShimmerButton>
            <Link
              href={contactHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              Vraag prijsindicatie
            </Link>
          </div>
        </header>

        <BlogContentOverview locale="nl" />

        <section id="prijs-kostblokken" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Welke kostblokken sturen je prijs?</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {costBlocks.map((block) => (
                <GlassCard key={block.title} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{block.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{block.description}</p>
                  <Link
                    href={block.link.href}
                    className="mt-3 inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    {block.link.label}
                  </Link>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="prijs-ankers" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Prijsankers per projecttype</h2>
              <p className="mt-2 text-sm text-slate-600">
                Indicatieve ranges gebaseerd op studio-data. Definitieve prijs volgt na slicer-analyse.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-[720px] text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200/70 text-slate-500">
                      <th className="py-2 pr-4 font-semibold">Type</th>
                      <th className="py-2 pr-4 font-semibold">Formaat</th>
                      <th className="py-2 pr-4 font-semibold">Materiaal</th>
                      <th className="py-2 pr-4 font-semibold">Printtijd</th>
                      <th className="py-2 pr-4 font-semibold">Prijsrange</th>
                    </tr>
                  </thead>
                  <tbody>
                    {priceAnchors.map((row) => (
                      <tr key={row.label} className="border-b border-slate-200/70 last:border-0">
                        <td className="py-2 pr-4 font-medium text-slate-900">{row.label}</td>
                        <td className="py-2 pr-4">{row.size}</td>
                        <td className="py-2 pr-4">{row.material}</td>
                        <td className="py-2 pr-4">{row.printTime}</td>
                        <td className="py-2 pr-4 font-semibold text-slate-900">{row.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Tip: start met de{" "}
                <Link href={pricingHref} className="font-semibold text-emerald-600 hover:text-emerald-700">
                  pricing calculator
                </Link>{" "}
                voor een snelle simulatie.
              </p>
            </GlassCard>
          </Reveal>
        </section>

        <section id="prijs-optimalisatie" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Hoe verlaag je de prijs per stuk?</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {optimizationTips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <ShimmerButton
                  href={pricingHref}
                  event={{ action: "cta_click", category: "blog_prijzen_gids_mid", label: "pricing" }}
                >
                  Simuleer je kost
                </ShimmerButton>
                <ShimmerButton
                  href={contactHref}
                  className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                  event={{ action: "cta_click", category: "blog_prijzen_gids_mid", label: "contact_prefill" }}
                >
                  Vraag exacte offerte
                </ShimmerButton>
              </div>
            </GlassCard>
          </Reveal>
        </section>

        <section id="prijs-segmenten" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Waar komt deze prijsgids het vaakst van pas?</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {segmentHighlights.map((segment) => (
                <GlassCard key={segment.title} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{segment.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{segment.description}</p>
                  <Link
                    href={segment.href}
                    className="mt-3 inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    {segment.label}
                  </Link>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="prijs-faq" className="scroll-mt-28">
          <Faq title="FAQ over 3D print prijzen" items={faqItems} />
        </section>

        <section id="prijs-sources" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 id="sources" className="text-2xl font-semibold text-slate-900">Bronnen en referenties</h2>
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

        <section>
          <Reveal>
            <GlassCard className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Volgende stap</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Klaar om je prijs te verfijnen?</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Stuur je bestand en toepassing door, dan krijg je een prijs met materiaaladvies en planning.
                </p>
              </div>
              <ShimmerButton
                href={contactHref}
                event={{ action: "cta_click", category: "blog_prijzen_gids_bottom", label: "contact_prefill" }}
              >
                Start offerte
              </ShimmerButton>
            </GlassCard>
          </Reveal>
        </section>
      </article>

      <ReadMoreLinks pageType="pricing" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <BlogAuthorNote locale="nl" />
    </main>
  )
}
