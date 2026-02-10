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

const canonical = "https://www.x3dprints.be/blog/3d-print-kosten-besparen/"
const datePublished = "2026-02-08"
const dateModified = "2026-02-09"
const pricingHref = "/pricing?utm_source=blog&utm_medium=cta&utm_campaign=kosten-besparen"
const materialsHref = "/materials?utm_source=blog&utm_medium=cta&utm_campaign=kosten-besparen#material-suggestion-tool"
const viewerHref = "/viewer?utm_source=blog&utm_medium=cta&utm_campaign=kosten-besparen"
const contactHref =
  "/contact?material=pla-matte&quote=Kostenoptimalisatie%20voor%20mijn%203D%20print"
const pricingGuideHref =
  "/blog/3d-print-prijzen-gids?utm_source=blog&utm_medium=internal&utm_campaign=kosten-besparen"

export const metadata: Metadata = {
  title: "3D print kosten besparen: 7 slimme optimalisaties | X3DPrints",
  description:
    "Bespaar op 3D print kosten met slimme keuzes in model, materiaal en batch. Inclusief tabel met impact en snelle CTA's naar pricing.",
  alternates: { canonical },
  openGraph: {
    title: "3D print kosten besparen: 7 slimme optimalisaties",
    description:
      "Tabel met impact per optimalisatie en concrete tips om je 3D print budget te verlagen.",
    url: canonical,
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "3D print kosten besparen" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D print kosten besparen: 7 slimme optimalisaties",
    description: "Optimalisaties om je 3D print budget te verlagen.",
    images: ["/Logo.webp"],
  },
}

const costLevers = [
  {
    title: "Modelgeometrie",
    description:
      "Minder supports, betere oriëntatie en minder overhangs besparen printtijd en nabewerking.",
  },
  {
    title: "Printinstellingen",
    description:
      "Laaghoogte en infill hoeven niet overal maximaal te zijn. Dat scheelt uren en materiaal.",
  },
  {
    title: "Materiaalkeuze",
    description:
      "PLA Matte is het baseline profiel. PETG of TPU kies je pas wanneer het functioneel nodig is.",
  },
  {
    title: "Batching & planning",
    description:
      "Meerdere onderdelen tegelijk printen verlaagt setupkosten en maakt planning efficiënter.",
  },
]

const optimizationRows = [
  {
    label: "Support minimaliseren",
    impact: "Hoog",
    effort: "Middel",
    tip: "Vermijd overhangs > 55° en gebruik chamfers.",
  },
  {
    label: "Laaghoogte slim kiezen",
    impact: "Hoog",
    effort: "Laag",
    tip: "Gebruik 0,2 mm waar detail niet zichtbaar is.",
  },
  {
    label: "Infill beperken",
    impact: "Middel",
    effort: "Laag",
    tip: "Gebruik 10-20% infill tenzij het onderdeel dragend is.",
  },
  {
    label: "Batch printen",
    impact: "Middel",
    effort: "Laag",
    tip: "Combineer onderdelen die samen moeten aankomen.",
  },
  {
    label: "Materiaal baseline",
    impact: "Middel",
    effort: "Laag",
    tip: "Start met PLA Matte en upgrade alleen wanneer nodig.",
  },
]

const quickWins = [
  "Stuur STL of STEP met duidelijke oriëntatie zodat we supports beperken.",
  "Kies een uniform materiaal voor de hele batch zodat we niet hoeven te wisselen.",
  "Bundel kleine onderdelen zodat de machine in één run kan blijven draaien.",
  "Gebruik de pricing calculator om direct de impact te zien.",
]

const faqItems = [
  {
    q: "Wat is de snelste manier om kosten te verlagen?",
    a: "Beperk supports en kies een lagere laaghoogte waar het zichtvlak dat toelaat.",
  },
  {
    q: "Wanneer loont batchen?",
    a: "Vanaf enkele stuks daalt de setupkost per stuk. Vooral bij 5+ stuks merk je het verschil.",
  },
  {
    q: "Kan ik goedkoper printen met een ander materiaal?",
    a: "PLA Matte is het meest budgetvriendelijk. PETG en TPU verhogen de kost door langere printtijd.",
  },
  {
    q: "Kunnen jullie het model aanpassen voor lagere kosten?",
    a: "Ja. We adviseren waar je wanden, ribs of oriëntatie kunt optimaliseren.",
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
  headline: "3D print kosten besparen: 7 slimme optimalisaties",
  description:
    "Bespaartips voor 3D prints met impacttabel en concrete optimalisaties voor printtijd en materiaal.",
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
  name: "3D print kosten besparen in 4 stappen",
  description: "Optimaliseer je model, materiaal en batch om kosten te verlagen.",
  inLanguage: "nl-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT4M",
  steps: [
    {
      name: "Check support en oriëntatie",
      text: "Vermijd overhangs en kies een oriëntatie met minder supports.",
    },
    {
      name: "Kies slimme instellingen",
      text: "Pas laaghoogte en infill aan op zichtvlak en belasting.",
    },
    {
      name: "Kies materiaal baseline",
      url: materialsHref,
    },
    {
      name: "Simuleer de prijs",
      url: pricingHref,
    },
  ],
  toolNames: ["Pricing calculator", "Material Suggestion Tool"],
  supplyNames: ["STL of STEP bestand"],
})

export default function BlogKostenBesparenPage() {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-16 sm:px-8 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_0%,rgba(99,102,241,.18),transparent_70%)]"
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
              <li className="font-medium text-slate-700">Kosten besparen</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">Pricing guide</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            3D print kosten besparen: 7 slimme optimalisaties
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Het korte antwoord: verlaag je kost door support te beperken, een slimme laaghoogte te kiezen en batches te
            plannen. Deze checklist toont de grootste hefbomen zodat je sneller een scherpe prijs krijgt.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
            Laatst bijgewerkt: 9 februari 2026
          </p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={pricingHref}
              event={{ action: "cta_click", category: "blog_kosten_top", label: "pricing" }}
            >
              Open pricing calculator
            </ShimmerButton>
            <ShimmerButton
              href={materialsHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_kosten_top", label: "materials_tool" }}
            >
              Kies materiaal
            </ShimmerButton>
            <Link
              href={viewerHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              Upload je model
            </Link>
          </div>
        </header>

        <BlogContentOverview locale="nl" />

        <section id="kosten-hefbomen" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Welke hefbomen bepalen je kost?</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {costLevers.map((lever) => (
                <GlassCard key={lever.title} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{lever.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{lever.description}</p>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="kosten-tabel" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Impact per optimalisatie in één tabel</h2>
              <p className="mt-2 text-sm text-slate-600">
                Focus op de hefbomen met hoge impact en lage effort voor snelle besparing.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-[720px] text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200/70 text-slate-500">
                      <th className="py-2 pr-4 font-semibold">Optimalisatie</th>
                      <th className="py-2 pr-4 font-semibold">Impact</th>
                      <th className="py-2 pr-4 font-semibold">Effort</th>
                      <th className="py-2 pr-4 font-semibold">Tip</th>
                    </tr>
                  </thead>
                  <tbody>
                    {optimizationRows.map((row) => (
                      <tr key={row.label} className="border-b border-slate-200/70 last:border-0">
                        <td className="py-2 pr-4 font-medium text-slate-900">{row.label}</td>
                        <td className="py-2 pr-4">{row.impact}</td>
                        <td className="py-2 pr-4">{row.effort}</td>
                        <td className="py-2 pr-4">{row.tip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Gebruik de{" "}
                <Link href={pricingHref} className="font-semibold text-emerald-600 hover:text-emerald-700">
                  pricing calculator
                </Link>{" "}
                om impact te simuleren.
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

        <section id="kosten-quickwins" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Snelle wins voor lagere kosten</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {quickWins.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <ShimmerButton
                  href={viewerHref}
                  event={{ action: "cta_click", category: "blog_kosten_mid", label: "viewer" }}
                >
                  Upload bestand
                </ShimmerButton>
                <ShimmerButton
                  href={contactHref}
                  className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                  event={{ action: "cta_click", category: "blog_kosten_mid", label: "contact_prefill" }}
                >
                  Vraag offerte
                </ShimmerButton>
              </div>
            </GlassCard>
          </Reveal>
        </section>

        <section id="kosten-faq" className="scroll-mt-28">
          <Faq title="FAQ over 3D print kosten besparen" items={faqItems} />
        </section>

        <section id="kosten-sources" className="scroll-mt-28">
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
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Klaar om je kosten te optimaliseren?</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Stuur je bestand door en ontvang een scherpe prijs met optimalisatieadvies.
                </p>
              </div>
              <ShimmerButton
                href={contactHref}
                event={{ action: "cta_click", category: "blog_kosten_bottom", label: "contact_prefill" }}
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
