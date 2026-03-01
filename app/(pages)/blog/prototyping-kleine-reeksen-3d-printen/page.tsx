import type { Metadata } from "next"
import Link from "next/link"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"
import { buildArticleJsonLd, buildFaqPageSchema, buildHowToSchema } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/blog/prototyping-kleine-reeksen-3d-printen/"
const enCanonical = "https://www.x3dprints.be/en/blog/prototyping-kleine-reeksen-3d-printen/"
const datePublished = "2026-03-01"
const dateModified = "2026-03-01"
const lastUpdatedLabel = "Laatst bijgewerkt: 1 maart 2026"

const contactHref =
  "/contact?material=PETG&quote=B2B%20prototyping%20en%20kleine%20reeks%20-%20ik%20wil%20snelle%20iteratie"
const pricingHref =
  "/pricing?utm_source=blog&utm_medium=cta&utm_campaign=prototyping-kleine-reeksen-3d-printen"
const materialsHref = "/materials#material-suggestion-tool"
const servicesHref =
  "/services?utm_source=blog&utm_medium=internal&utm_campaign=prototyping-kleine-reeksen-3d-printen"
const viewerHref =
  "/viewer?utm_source=blog&utm_medium=internal&utm_campaign=prototyping-kleine-reeksen-3d-printen"

export const metadata: Metadata = {
  title: "B2B prototyping en kleine reeksen met 3D printen | X3DPrints",
  description:
    "Van prototype naar kleine reeks: praktische B2B gids met fase-aanpak, materiaalkeuze, kostenrange en intake voor snelle iteraties.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": canonical,
      "en-BE": enCanonical,
      "x-default": canonical,
    },
  },
  openGraph: {
    title: "B2B prototyping en kleine reeksen",
    description:
      "Praktische workflow voor productontwikkeling, validatie en kleine series met 3D printen.",
    url: canonical,
    images: [{ url: "/images/og-blog-nl.svg", width: 1200, height: 630, alt: "B2B prototyping en kleine reeksen" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "B2B prototyping en kleine reeksen",
    description: "Gids voor iteraties, materiaalkeuze en schaalbare kleine series.",
    images: ["/images/og-blog-nl.svg"],
  },
}

const whyCards = [
  {
    title: "Snelle iteratie zonder tooling",
    body:
      "Je kan versies sneller valideren zonder eerst te investeren in dure matrijzen of vaste tooling.",
    href: "/blog/use-case-dinsdag-productontwikkeling",
    label: "Lees productontwikkeling use-case",
  },
  {
    title: "Van test naar kleine serie",
    body:
      "Na fit- en functietests schaal je gecontroleerd op naar kleine reeksen met dezelfde parameters.",
    href: "/blog/3d-print-prijs-per-stuk",
    label: "Lees prijs per stuk",
  },
  {
    title: "Praktisch voor B2B teams",
    body:
      "R&D, engineering en marketingteams gebruiken deze flow voor validation parts, testfixtures en pilot runs.",
    href: "/segments/3d-printing-prototypes",
    label: "Bekijk prototype segment",
  },
]

const phaseRows = [
  {
    phase: "Fase 1 - conceptvalidatie",
    goal: "Snel vorm en passing checken",
    material: "PLA Matte",
    output: "1-3 teststukken",
  },
  {
    phase: "Fase 2 - functionele test",
    goal: "Belasting, montage en duurzaamheid valideren",
    material: "PETG / TPU",
    output: "Kleine testbatch",
  },
  {
    phase: "Fase 3 - kleine reeks",
    goal: "Herhaalbare productie en planning",
    material: "Materiaal per use-case",
    output: "10-100 stuks (indicatief)",
  },
]

const setupChecklist = [
  "Definieer per fase duidelijke pass/fail criteria",
  "Werk met versiebeheer in bestandsnamen (v1, v2, v3)",
  "Documenteer materiaal en settings van de goedgekeurde iteratie",
  "Plan meteen de stap van prototype naar kleine reeks",
]

const pricingRows = [
  { type: "Prototype run", qty: "1-3 stuks", range: "vanaf EUR 5/stuk", leadTime: "2-4 werkdagen" },
  { type: "Validatiebatch", qty: "5-20 stuks", range: "afhankelijk van geometrie", leadTime: "3-6 werkdagen" },
  { type: "Kleine reeks", qty: "20-100 stuks", range: "volumeafhankelijk", leadTime: "op planning" },
]

const relatedLinks = [
  { label: "Use Case Dinsdag: productontwikkeling", href: "/blog/use-case-dinsdag-productontwikkeling" },
  { label: "3D print prijzen gids", href: "/blog/3d-print-prijzen-gids" },
  { label: "Juiste 3D print materiaal", href: "/blog/juiste-3d-print-materiaal" },
  { label: "3D print offerte aanvragen", href: "/blog/3d-print-offerte-aanvragen" },
]

const faqItems = [
  {
    q: "Wanneer ga je van prototype naar kleine reeks?",
    a: "Zodra passing, functie en materiaalkeuze stabiel zijn. Dan is opschalen met dezelfde instellingen het meest efficient.",
  },
  {
    q: "Welke materialen gebruiken jullie in B2B flows?",
    a: "Vaak PLA Matte voor snelle conceptchecks, PETG voor functionele delen en TPU voor flexibele zones.",
  },
  {
    q: "Hoe snel krijgen we een voorstel?",
    a: "Meestal binnen 24 uur met duidelijke context en een STL/STEP file.",
  },
  {
    q: "Kunnen jullie ook mixed runs doen (meerdere varianten)?",
    a: "Ja. We kunnen varianten parallel plannen zolang de intake en versiebeheer helder zijn.",
  },
]

const references = [
  { label: "Prusa filament material guide", href: "https://help.prusa3d.com/filament-material-guide" },
  { label: "Ultimaker design for FFF", href: "https://ultimaker.com/learn/design-for-fff-3d-printing/" },
  { label: "ISO/ASTM additive manufacturing terminology", href: "https://www.astm.org/f2792-12a.html" },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "B2B prototyping en kleine reeksen met 3D printen",
  description:
    "Praktische gids voor B2B teams om van prototype naar kleine reeks te gaan met duidelijke fases en materiaalkeuze.",
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
  name: "Van prototype naar kleine reeks met 3D printen",
  description: "Gebruik een gefaseerde aanpak om snel te itereren en daarna gecontroleerd op te schalen.",
  inLanguage: "nl-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT5M",
  steps: [
    { name: "Definieer fase 1 doelen", text: "Leg pass/fail criteria vast voor concept- en fitchecks." },
    { name: "Kies materiaal per fase", url: materialsHref },
    { name: "Controleer files en varianten", url: viewerHref },
    { name: "Start prefilled intake", url: contactHref },
  ],
  toolNames: ["X3DPrints viewer", "Material Suggestion Tool", "X3DPrints pricing"],
  supplyNames: ["STL/STEP", "Versiebeheer", "Testcriteria"],
})

export default function PrototypingSmallBatchGuidePage() {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-16 sm:px-8 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(130%_60%_at_50%_0%,rgba(16,185,129,.16),transparent_72%)]"
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
              <li className="font-medium text-slate-700">B2B prototyping en kleine reeksen</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">B2B use-cases</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            B2B prototyping en kleine reeksen met 3D printen
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Kort antwoord: werk in duidelijke fases. Eerst snel valideren, daarna functioneel testen, en pas dan opschalen naar een kleine reeks met stabiele parameters.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={contactHref}
              event={{ action: "cta_click", category: "blog_proto_batch_top", label: "contact_prefill" }}
            >
              Start B2B intake
            </ShimmerButton>
            <ShimmerButton
              href={materialsHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_proto_batch_top", label: "materials_tool" }}
            >
              Kies materiaal
            </ShimmerButton>
            <Link
              href={pricingHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              Bekijk prijsrange
            </Link>
          </div>
        </header>

        <BlogContentOverview locale="nl" />

        <section id="waarom-b2b-prototyping" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Waarom deze aanpak werkt voor B2B</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {whyCards.map((card) => (
                <GlassCard key={card.title} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{card.body}</p>
                  <Link href={card.href} className="mt-3 inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                    {card.label}
                  </Link>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="fases-prototyping" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Fase-aanpak: van prototype naar kleine reeks</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200/70 bg-white/80">
              <table className="min-w-full text-left text-sm text-slate-700">
                <caption className="sr-only">Fase-aanpak voor B2B prototyping en kleine series</caption>
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Fase</th>
                    <th className="px-4 py-3">Doel</th>
                    <th className="px-4 py-3">Materiaal</th>
                    <th className="px-4 py-3">Output</th>
                  </tr>
                </thead>
                <tbody>
                  {phaseRows.map((row) => (
                    <tr key={row.phase} className="border-t border-slate-200/60">
                      <td className="px-4 py-3 font-semibold text-slate-900">{row.phase}</td>
                      <td className="px-4 py-3">{row.goal}</td>
                      <td className="px-4 py-3">{row.material}</td>
                      <td className="px-4 py-3">{row.output}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        <section id="setup-kleine-reeks" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Setup voor een stabiele kleine reeks</h2>
            <GlassCard className="mt-4 p-6">
              <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
                {setupChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Werk je met meerdere varianten? Gebruik de{" "}
                <Link href={viewerHref} className="font-semibold text-indigo-600 hover:text-indigo-500">
                  viewer
                </Link>{" "}
                en houd versiebeheer strak per model.
              </p>
            </GlassCard>
          </Reveal>
        </section>

        <section id="kosten-en-planning" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Kosten en planning</h2>
            <p className="mt-2 text-slate-700">
              Richtwaarden voor planning. Exacte prijzen hangen af van geometrie, materiaal en aantal varianten.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200/70 bg-white/80">
              <table className="min-w-full text-left text-sm text-slate-700">
                <caption className="sr-only">Richtprijzen voor B2B prototyping en kleine reeksen</caption>
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Aantal</th>
                    <th className="px-4 py-3">Prijsrange</th>
                    <th className="px-4 py-3">Doorlooptijd</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingRows.map((row) => (
                    <tr key={row.type} className="border-t border-slate-200/60">
                      <td className="px-4 py-3 font-semibold text-slate-900">{row.type}</td>
                      <td className="px-4 py-3">{row.qty}</td>
                      <td className="px-4 py-3">{row.range}</td>
                      <td className="px-4 py-3">{row.leadTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        <section id="faq-prototyping" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">FAQ</h2>
            <div className="mt-4">
              <Faq items={faqItems} />
            </div>
          </Reveal>
        </section>

        <section id="sources" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Bronnen en referenties</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {references.map((reference) => (
                <li key={reference.href} className="rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3">
                  <cite className="not-italic">
                    <Link href={reference.href} target="_blank" rel="noreferrer" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      {reference.label}
                    </Link>
                  </cite>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">Volgende stap</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Wil je een prototype- of pilot run opstarten?</h2>
              <p className="mt-2 text-slate-700">
                Deel je doelen per fase en de beschikbare files. Je krijgt snel een voorstel voor materiaal, planning en kosten.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <ShimmerButton
                  href={contactHref}
                  event={{ action: "cta_click", category: "blog_proto_batch_bottom", label: "contact_prefill" }}
                >
                  Start intake
                </ShimmerButton>
                <Link
                  href={servicesHref}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
                >
                  Bekijk serviceflow
                </Link>
              </div>
              <div className="mt-4 text-sm text-slate-600">
                Verder lezen:{" "}
                {relatedLinks.map((item, index) => (
                  <span key={item.href}>
                    <Link href={item.href} className="font-semibold text-indigo-600 hover:text-indigo-500">
                      {item.label}
                    </Link>
                    {index < relatedLinks.length - 1 ? ", " : "."}
                  </span>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </section>
      </article>

      <BlogAuthorNote locale="nl" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
    </main>
  )
}
