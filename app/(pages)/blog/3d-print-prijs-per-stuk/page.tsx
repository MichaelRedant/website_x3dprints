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

const canonical = "https://www.x3dprints.be/blog/3d-print-prijs-per-stuk/"
const datePublished = "2026-02-08"
const dateModified = "2026-02-09"
const pricingHref = "/pricing?utm_source=blog&utm_medium=cta&utm_campaign=prijs-per-stuk"
const materialsHref = "/materials?utm_source=blog&utm_medium=cta&utm_campaign=prijs-per-stuk#material-suggestion-tool"
const viewerHref = "/viewer?utm_source=blog&utm_medium=cta&utm_campaign=prijs-per-stuk"
const contactHref =
  "/contact?material=pla-matte&quote=Prijs%20per%20stuk%20voor%20mijn%203D%20print"
const pricingGuideHref =
  "/blog/3d-print-prijzen-gids?utm_source=blog&utm_medium=internal&utm_campaign=prijs-per-stuk"

export const metadata: Metadata = {
  title: "3D print prijs per stuk: single vs serie | X3DPrints",
  description:
    "3D print prijs per stuk hangt af van setup, printtijd en schaal. Bekijk een tabel met prijsranges en tips om je kost per stuk te verlagen.",
  alternates: { canonical },
  openGraph: {
    title: "3D print prijs per stuk: single vs serie",
    description:
      "Tabel met prijsranges per stuk, uitleg van de kostblokken en tips om je 3D print budget te optimaliseren.",
    url: canonical,
    images: [{ url: "/images/og-blog-nl.svg", width: 1200, height: 630, alt: "3D print prijs per stuk" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D print prijs per stuk: single vs serie",
    description: "Prijs per stuk uitgelegd met tabel en optimalisatietips.",
    images: ["/images/og-blog-nl.svg"],
  },
}

const costBlocks = [
  {
    title: "Setup & slicing",
    description:
      "Intake, slicerinstellingen en supportstrategie kosten tijd, vooral bij prototypes of nieuwe geometrie.",
  },
  {
    title: "Printtijd",
    description:
      "De grootste factor: laaghoogte, infill en support bepalen hoeveel machine-uren nodig zijn.",
  },
  {
    title: "Materiaal",
    description:
      "PLA is het referentieprofiel. PETG, TPU of PC verhogen de prijs per stuk door hogere spoelkost.",
  },
  {
    title: "Nabewerking & QA",
    description:
      "Support verwijderen, lichte afwerking en kwaliteitscheck tellen mee bij elke batch.",
  },
  {
    title: "Logistiek",
    description:
      "Afhalen blijft het meest kostefficiënt. Verzending of levering op maat verhogen het totaal.",
  },
]

const priceRows = [
  {
    label: "1 stuk (prototype)",
    setup: "EUR 10-15",
    print: "EUR 10-15",
    material: "EUR 3-6",
    total: "EUR 25-35",
  },
  {
    label: "10 stuks",
    setup: "EUR 2-4 / stuk",
    print: "EUR 8-12",
    material: "EUR 3-5",
    total: "EUR 13-21",
  },
  {
    label: "50 stuks",
    setup: "EUR 1-2 / stuk",
    print: "EUR 7-10",
    material: "EUR 3-5",
    total: "EUR 11-17",
  },
]

const optimizationTips = [
  "Bundel onderdelen in één batch om setupkosten te delen.",
  "Kies de laaghoogte op basis van zichtvlak, niet overal ultra-fijn.",
  "Gebruik PLA Matte als baseline en stap pas over naar PETG/TPU als het nodig is.",
  "Geef je deadline op voor efficiënte planning en minder spoedkosten.",
]

const faqItems = [
  {
    q: "Waarom is een enkel stuk relatief duur?",
    a: "De setup en planning gebeurt één keer, waardoor de vaste kost op één stuk terechtkomt.",
  },
  {
    q: "Vanaf wanneer daalt de prijs per stuk zichtbaar?",
    a: "Meestal vanaf 5-10 stuks, omdat setup en materiaalverwerking efficiënter worden.",
  },
  {
    q: "Kan ik materiaal besparen om goedkoper te printen?",
    a: "Ja. Minder support, slimme orientatie en lagere infill zorgen voor een lagere kost.",
  },
  {
    q: "Kunnen jullie een prijs per stuk simuleren?",
    a: "Ja. Gebruik de pricing calculator of stuur je bestand voor een exacte analyse.",
  },
]

const references = [
  {
    label: "PrusaSlicer G-code viewer (print time)",
    href: "https://help.prusa3d.com/article/g-code-viewer_78984",
  },
  {
    label: "Ultimaker: Design for FFF 3D printing",
    href: "https://ultimaker.com/learn/design-for-fff-3d-printing/",
  },
  {
    label: "Prusa material guide (PLA, PETG, TPU)",
    href: "https://help.prusa3d.com/filament-material-guide",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "3D print prijs per stuk: single vs serie",
  description:
    "Uitleg van setupkosten, printtijd en schaal met een tabel voor prijs per stuk en optimalisatietips.",
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
  name: "Prijs per stuk berekenen in 4 stappen",
  description: "Bereken je prijs per stuk met de juiste input en schaalvoordelen.",
  inLanguage: "nl-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT4M",
  steps: [
    {
      name: "Definieer aantal en deadline",
      text: "Geef het aantal stuks en de gewenste planning door.",
    },
    {
      name: "Kies materiaal en finish",
      url: materialsHref,
    },
    {
      name: "Analyseer printtijd en support",
      url: viewerHref,
    },
    {
      name: "Vraag een prijsinschatting",
      url: contactHref,
    },
  ],
  toolNames: ["Pricing calculator", "Material Suggestion Tool"],
  supplyNames: ["STL of STEP bestand"],
})

export default function BlogPricePerPiecePage() {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-16 sm:px-8 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_0%,rgba(56,189,248,.18),transparent_70%)]"
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
              <li className="font-medium text-slate-700">Prijs per stuk</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">Pricing guide</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            3D print prijs per stuk: single vs serie
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Het korte antwoord: hoe meer stuks je print, hoe lager de prijs per stuk. Setup en planning blijven
            grotendeels gelijk, terwijl materiaal en printtijd schaalvoordeel krijgen. Gebruik deze tabel en tips om je
            budget snel te sturen.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
            Laatst bijgewerkt: 9 februari 2026
          </p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={pricingHref}
              event={{ action: "cta_click", category: "blog_prijs_per_stuk_top", label: "pricing" }}
            >
              Open pricing calculator
            </ShimmerButton>
            <ShimmerButton
              href={materialsHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_prijs_per_stuk_top", label: "materials_tool" }}
            >
              Kies materiaal
            </ShimmerButton>
            <Link
              href={contactHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              Vraag offerte
            </Link>
          </div>
        </header>

        <BlogContentOverview locale="nl" />

        <section id="prijs-blokken" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Welke kostblokken bepalen prijs per stuk?</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {costBlocks.map((block) => (
                <GlassCard key={block.title} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{block.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{block.description}</p>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="prijs-tabel" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Wat doet schaal met prijs per stuk?</h2>
              <p className="mt-2 text-sm text-slate-600">
                Indicatieve ranges voor een gemiddeld onderdeel. Exacte prijzen volgen na slicer-analyse.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-[720px] text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200/70 text-slate-500">
                      <th className="py-2 pr-4 font-semibold">Aantal</th>
                      <th className="py-2 pr-4 font-semibold">Setup</th>
                      <th className="py-2 pr-4 font-semibold">Printtijd</th>
                      <th className="py-2 pr-4 font-semibold">Materiaal</th>
                      <th className="py-2 pr-4 font-semibold">Indicatie per stuk</th>
                    </tr>
                  </thead>
                  <tbody>
                    {priceRows.map((row) => (
                      <tr key={row.label} className="border-b border-slate-200/70 last:border-0">
                        <td className="py-2 pr-4 font-medium text-slate-900">{row.label}</td>
                        <td className="py-2 pr-4">{row.setup}</td>
                        <td className="py-2 pr-4">{row.print}</td>
                        <td className="py-2 pr-4">{row.material}</td>
                        <td className="py-2 pr-4 font-semibold text-slate-900">{row.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Voor actuele simulaties kan je altijd de{" "}
                <Link href={pricingHref} className="font-semibold text-emerald-600 hover:text-emerald-700">
                  pricing calculator
                </Link>{" "}
                gebruiken.
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Meer context? Lees de{" "}
                <Link href={pricingGuideHref} className="font-semibold text-emerald-600 hover:text-emerald-700">
                  3D print prijzen gids
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>
        </section>

        <section id="prijs-optimalisatie" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Hoe verlaag je prijs per stuk?</h2>
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
                  href={viewerHref}
                  event={{ action: "cta_click", category: "blog_prijs_per_stuk_mid", label: "viewer" }}
                >
                  Upload bestand
                </ShimmerButton>
                <ShimmerButton
                  href={contactHref}
                  className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                  event={{ action: "cta_click", category: "blog_prijs_per_stuk_mid", label: "contact_prefill" }}
                >
                  Vraag offerte
                </ShimmerButton>
              </div>
            </GlassCard>
          </Reveal>
        </section>

        <section id="prijs-faq" className="scroll-mt-28">
          <Faq title="FAQ over 3D print prijs per stuk" items={faqItems} />
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
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Klaar om je prijs per stuk te kennen?</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Stuur je bestand en aantallen door voor een exacte prijsinschatting.
                </p>
              </div>
              <ShimmerButton
                href={contactHref}
                event={{ action: "cta_click", category: "blog_prijs_per_stuk_bottom", label: "contact_prefill" }}
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
