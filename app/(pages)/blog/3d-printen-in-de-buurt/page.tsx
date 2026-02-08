import type { Metadata } from "next"
import Link from "next/link"
import BlogReadMore from "@/components/BlogReadMore"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import { buildArticleJsonLd, buildFaqPageSchema, buildHowToSchema } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/blog/3d-printen-in-de-buurt/"
const enCanonical = "https://www.x3dprints.be/en/blog/3d-printen-in-de-buurt/"
const datePublished = "2024-07-01"
const dateModified = "2026-02-07"
const contactHref = "/contact?material=pla-matte&quote=Lokaal%203D%20printen%20project%20in%20de%20buurt"
const pricingHref = "/pricing?utm_source=blog&utm_medium=cta&utm_campaign=in-de-buurt"
const locatiesHref = "/locaties?utm_source=blog&utm_medium=cta&utm_campaign=in-de-buurt"

export const metadata: Metadata = {
  title: "3D printen in de buurt | Gent, Aalst en Dendermonde | X3DPrints",
  description:
    "Lokale 3D print service Belgie vanuit Herzele voor projecten in Gent, Aalst en Dendermonde, inclusief 3D model printen, levering en afhaling.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": canonical,
      "en-BE": enCanonical,
      "x-default": canonical,
    },
  },
  openGraph: {
    title: "3D printen in de buurt: Gent, Aalst en Dendermonde",
    description:
      "Lees hoe lokale productie, afhaling en levering werken voor snelle 3D printprojecten.",
    url: canonical,
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "3D printen in de buurt" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printen in de buurt",
    description: "Lokale productie met snelle route van briefing tot levering.",
    images: ["/Logo.webp"],
  },
}

const tocItems = [
  { id: "local-cities", label: "Voor welke regio's is dit relevant?" },
  { id: "local-workflow", label: "Hoe verloopt lokaal samenwerken?" },
  { id: "local-logistics", label: "Welke leveropties heb je?" },
  { id: "local-faq", label: "FAQ over 3D printen in de buurt" },
  { id: "local-sources", label: "Bronnen en referenties" },
]

const cityCards = [
  {
    city: "Gent",
    info: "Voor agencies, makers en scholen met snelle afhaling of levering op afspraak en vlot 3D model printen.",
    examples: "Retail displays, eventprops en studentenprojecten.",
  },
  {
    city: "Aalst",
    info: "Korte afstand vanuit Herzele met vlotte batching van meerdere 3D print onderdelen.",
    examples: "Functionele onderdelen, montagehulpen en custom tooling.",
  },
  {
    city: "Dendermonde",
    info: "Regelmatige leverroutes plus verzending wanneer dat sneller past.",
    examples: "Campaign assets, prototypes en korte series.",
  },
]

const processSteps = [
  "Stuur STL of STEP met projectcontext en deadline.",
  "Krijg binnen 1 werkdag een voorstel voor materiaal, timing en budget.",
  "Kies afhaling, verzending of levering op maat.",
  "Plan vervolgjobs met dezelfde setup voor consistente output.",
]

const logisticsRows = [
  {
    option: "Afhalen",
    speed: "Snelst zodra batch klaar is",
    note: "Ideaal voor lokale iteraties en korte feedbackloops.",
  },
  {
    option: "Verzending",
    speed: "Afhankelijk van transportdienst",
    note: "Handig wanneer fysieke afhaling niet haalbaar is.",
  },
  {
    option: "Levering op maat",
    speed: "Volgens planning",
    note: "Interessant voor grotere campagnes of meerdere collis.",
  },
]

const faqItems = [
  {
    q: "Kunnen jullie snel schakelen voor lokale spoedprojecten?",
    a: "Ja, met volledige briefing en juiste bestanden kunnen we vaak direct plannen.",
  },
  {
    q: "Wat is het voordeel van lokaal samenwerken?",
    a: "Kortere communicatielijnen, snellere afstemming en minder risico op logistieke vertraging.",
  },
  {
    q: "Doen jullie ook vaste levermomenten voor terugkerende projecten?",
    a: "Ja, voor repeat-jobs kunnen we vaste momenten voorzien op basis van planning.",
  },
]

const references = [
  {
    label: "Google Search docs: crawlable links",
    href: "https://developers.google.com/search/docs/crawling-indexing/links-crawlable",
  },
  {
    label: "All3DP FDM process explainer",
    href: "https://all3dp.com/2/fdm-3d-printing-explained/",
  },
  {
    label: "Prusa material guide",
    href: "https://help.prusa3d.com/article/material-guide_220",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "3D printen in de buurt: Gent, Aalst en Dendermonde",
  description:
    "Lokale gids voor 3D printen in de buurt met praktische info over levering, afhaling en workflow.",
  datePublished,
  dateModified,
  image: "/Logo.webp",
  inLanguage: "nl-BE",
})

const faqJsonLd = buildFaqPageSchema({
  inLanguage: "nl-BE",
  mainEntityOfPage: canonical,
  items: faqItems.map((item) => ({ q: item.q, a: item.a })),
})

const howToJsonLd = buildHowToSchema({
  name: "Lokaal 3D printproject opstarten in 4 stappen",
  description:
    "Zet een lokaal project op met snelle intake, materiaalkeuze en levering die past bij je timing.",
  inLanguage: "nl-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT3M",
  steps: [
    {
      name: "Bestand en context delen",
      text: "Stuur STL of STEP met korte projectbriefing en deadline.",
    },
    {
      name: "Materiaalroute bepalen",
      url: "/materials#material-suggestion-tool",
    },
    {
      name: "Prijs en leveroptie checken",
      url: pricingHref,
    },
    {
      name: "Lokaal project met prefill starten",
      url: contactHref,
    },
  ],
  toolNames: ["Material Suggestion Tool", "X3DPrints 3D viewer"],
  supplyNames: ["STL of STEP bestand"],
})

export default function LocalArticlePage() {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-16 sm:px-8 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_0%,rgba(99,102,241,.18),transparent_72%)]"
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
              <li className="font-medium text-slate-700">3D printen in de buurt</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">Local service</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            3D printen in de buurt: Gent, Aalst en Dendermonde
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Lokaal werken verkort je feedbackloop. Met korte lijnen tussen briefing en levering win je tijd op je hele project,
            van 3D model printen tot het snel uitleveren van 3D print onderdelen.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
            Laatst bijgewerkt: 7 februari 2026
          </p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={contactHref}
              event={{ action: "cta_click", category: "blog_local_top", label: "contact_prefill" }}
            >
              Start lokaal project
            </ShimmerButton>
            <ShimmerButton
              href="/materials#material-suggestion-tool"
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_local_top", label: "materials" }}
            >
              Material Suggestion Tool
            </ShimmerButton>
            <Link
              href={locatiesHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              Bekijk locaties
            </Link>
          </div>
          <ContentTableOfContents title="Inhoud" items={tocItems} className="max-w-2xl" />
        </header>

        <section id="local-cities" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Voor welke regio&apos;s is dit relevant?</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {cityCards.map((card) => (
                <GlassCard key={card.city} className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{card.city}</p>
                  <p className="mt-2 text-sm text-slate-700">{card.info}</p>
                  <p className="mt-2 text-xs text-slate-500">Voorbeelden: {card.examples}</p>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="local-workflow" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Hoe verloopt lokaal samenwerken?</h2>
              <ol className="mt-4 space-y-2 text-sm text-slate-700">
                {processSteps.map((step, index) => (
                  <li key={step} className="flex items-start gap-2">
                    <span className="font-semibold text-slate-900">{index + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-5 flex flex-wrap gap-3">
                <ShimmerButton
                  href={pricingHref}
                  event={{ action: "cta_click", category: "blog_local_mid", label: "pricing" }}
                >
                  Bekijk pricing
                </ShimmerButton>
                <ShimmerButton
                  href={contactHref}
                  className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                  event={{ action: "cta_click", category: "blog_local_mid", label: "contact_prefill" }}
                >
                  Vraag offerte
                </ShimmerButton>
              </div>
            </GlassCard>
          </Reveal>
        </section>

        <section id="local-logistics" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Welke leveropties heb je?</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-[520px] text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200/70 text-slate-500">
                      <th className="py-2 pr-4 font-semibold">Optie</th>
                      <th className="py-2 pr-4 font-semibold">Snelheid</th>
                      <th className="py-2 pr-4 font-semibold">Richtlijn</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logisticsRows.map((row) => (
                      <tr key={row.option} className="border-b border-slate-200/70 last:border-0">
                        <td className="py-2 pr-4 font-medium text-slate-900">{row.option}</td>
                        <td className="py-2 pr-4">{row.speed}</td>
                        <td className="py-2 pr-4">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Bekijk ook{" "}
                <Link href="/services" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  services
                </Link>{" "}
                en{" "}
                <Link href="/portfolio" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  portfolio
                </Link>{" "}
                voor lokale use-cases.
              </p>
            </GlassCard>
          </Reveal>
        </section>

        <section id="local-faq" className="scroll-mt-28">
          <Faq title="FAQ over 3D printen in de buurt" items={faqItems} />
        </section>

        <section id="local-sources" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Bronnen en referenties</h2>
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
      </article>

      <BlogReadMore />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
    </main>
  )
}
