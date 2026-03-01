import type { Metadata } from "next"
import Link from "next/link"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import Faq from "@/components/Faq"
import FilamentHeroVisual from "@/components/FilamentHeroVisual"
import GlassCard from "@/components/GlassCard"
import GlassOrb from "@/components/GlassOrb"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import { buildArticleJsonLd, buildFaqPageSchema } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/en/3d-modellen-vinden/"
const datePublished = "2026-02-06"
const dateModified = "2026-02-06"

export const metadata: Metadata = {
  title: "Where to find 3D models to print | X3DPrints",
  description:
    "Find print-ready 3D models on Printables, MakerWorld, Thingiverse, MyMiniFactory, Cults and Thangs. We validate scale and printability, then print locally in Belgium.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/3d-modellen-vinden/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/3d-modellen-vinden/",
    },
  },
  openGraph: {
    title: "Where to find 3D models to print",
    description:
      "Guide to the best platforms for downloadable 3D models with quality checks and local production guidance.",
    url: canonical,
    images: [{ url: "/images/og-home.svg", width: 1200, height: 630, alt: "Find 3D models" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

const sources = [
  {
    name: "Printables.com",
    url: "https://www.printables.com",
    badge: "Recommended",
    description:
      "Large community with many validated prints, including real-world photos and practical slicer notes.",
    notes: ["Filter on Printables Verified", "Check comments for material and orientation hints"],
    bestFor: "Functional parts and organizers",
    qualitySignal: "Verified badge + user makes",
  },
  {
    name: "MakerWorld (Bambu Lab)",
    url: "https://makerworld.com/",
    badge: "Preset rich",
    description:
      "Many models include 3MF profiles and ready-to-run settings for repeatable print output.",
    notes: ["Prefer 3MF where available", "Check remix notes and scale"],
    bestFor: "Fast starts with known settings",
    qualitySignal: "3MF profile + active comments",
  },
  {
    name: "Thingiverse",
    url: "https://www.thingiverse.com/",
    badge: "Classic",
    description:
      "Huge library with mixed quality. Works best when you filter by proof and recent feedback.",
    notes: ["Use Makes as proof", "Avoid listings without feedback"],
    bestFor: "Legacy community files",
    qualitySignal: "Makes volume + comment quality",
  },
  {
    name: "MyMiniFactory",
    url: "https://www.myminifactory.com/",
    badge: "Minis & props",
    description:
      "Strong source for tabletop and props, often with clearer model details and licensing context.",
    notes: ["Verify scale in mm", "Keep purchase proof for paid files"],
    bestFor: "Tabletop, props and decorative prints",
    qualitySignal: "Designer profile + reviews",
  },
  {
    name: "Cults3D",
    url: "https://cults3d.com/",
    badge: "Free + paid",
    description:
      "Mix of free and paid models with variable quality, so screenshots and comments matter more.",
    notes: ["Download all model parts", "Keep invoice or model link for reference"],
    bestFor: "Niche designs and paid bundles",
    qualitySignal: "Review depth + file completeness",
  },
  {
    name: "Thangs",
    url: "https://thangs.com/",
    badge: "Search engine",
    description:
      "Cross-platform search with model variants, useful for comparison before selecting one source.",
    notes: ["Open the original source page", "Check unit system (mm/inch)"],
    bestFor: "Comparing options quickly",
    qualitySignal: "Source mapping + variant indexing",
  },
]

const faqItems = [
  {
    q: "Which link should I send?",
    a: "Send the direct model page and specify the exact parts you need. For variants, include a screenshot and preferred scale.",
  },
  {
    q: "Can I submit a remix?",
    a: "Yes. Send your edited STL/3MF or the original link with clear change notes. Mention if supports are already baked in.",
  },
  {
    q: "Can you design or adapt the model?",
    a: "Yes. We model in Fusion 360 or Tinkercad and adapt STL/3MF for scale, text/logo, tolerances and inserts.",
  },
  {
    q: "Which formats are best?",
    a: "STL and 3MF are ideal. If a model has a working 3MF profile, we can use that as part of intake and tuning.",
  },
]

const tocItems = [
  { id: "platforms", label: "Which platforms work best?" },
  { id: "comparison", label: "Which source fits your use-case?" },
  { id: "process", label: "How do we process your model link?" },
  { id: "modeling", label: "When is custom modeling better?" },
  { id: "references", label: "References and sources" },
  { id: "faq", label: "FAQ on model links" },
]

const faqJsonLd = buildFaqPageSchema({
  inLanguage: "en-BE",
  mainEntityOfPage: canonical,
  items: faqItems,
})

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "Where to find 3D models to print",
  description:
    "Practical overview of the best places to download 3D models (Printables, MakerWorld, Thingiverse, MyMiniFactory, Cults and Thangs) with quality checks.",
  datePublished,
  dateModified,
  inLanguage: "en-BE",
})

const process = [
  "File review: we validate parts, scale and support needs.",
  "Material advice: we recommend PLA, PETG or TPU with clear pricing context.",
  "Production planning: we print locally in Herzele and align delivery or pickup.",
]

const modelingPoints = [
  "CAD in Fusion 360 or Tinkercad for production-ready geometry.",
  "We validate wall thickness, tolerances and fit.",
  "Fast iterations through screenshots or quick test prints.",
]

const references = [
  { label: "Printables", url: "https://www.printables.com" },
  { label: "MakerWorld", url: "https://makerworld.com/" },
  { label: "Thingiverse", url: "https://www.thingiverse.com/" },
  { label: "MyMiniFactory", url: "https://www.myminifactory.com/" },
  { label: "Cults3D", url: "https://cults3d.com/" },
  { label: "Thangs", url: "https://thangs.com/" },
]

export default function FindModelsPage() {
  return (
    <main className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(99,102,241,.12),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.06]" />

      <article>
        <section className="px-6 pb-12 pt-14 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <Reveal className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-indigo-600">Guide</p>
                <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                  Where can you find 3D models to print?
                </h1>
                <p className="text-lg text-slate-700">
                  The most print-ready files are usually on Printables and MakerWorld, with Thingiverse, MyMiniFactory,
                  Cults and Thangs as secondary sources. Send us the model link and we handle validation plus local
                  production in Belgium.
                </p>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
                  Last updated: February 6, 2026
                </p>
                <div className="flex flex-wrap gap-3">
                  <ShimmerButton href="/en/contact?quote=Link%20to%203D%20model">Send your link</ShimmerButton>
                  <Link
                    href="/en/materials#material-suggestion-tool"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                  >
                    Material Suggestion Tool
                  </Link>
                </div>
                <ContentTableOfContents
                  title="Guide contents"
                  items={tocItems}
                  className="mt-2 max-w-xl"
                />
              </div>
              <GlassCard className="overflow-hidden border-white/60 bg-white/70 p-6 shadow-lg ring-1 ring-white/70">
                <div className="relative flex h-full min-h-[260px] items-center justify-center">
                  <div className="hidden w-full max-w-[360px] md:block">
                    <FilamentHeroVisual className="w-full" />
                  </div>
                  <div className="flex w-full justify-center md:hidden">
                    <GlassOrb className="h-40 w-40 opacity-70" />
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </section>

        <section className="px-6 pb-12 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-6 max-w-3xl">
              <h2 id="platforms" className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Which platforms usually provide the most print-ready files?
              </h2>
              <p className="mt-2 text-slate-600">
                Start with these sources and include the exact model page in your request.
              </p>
            </Reveal>
            <div className="grid gap-5 lg:grid-cols-3">
              {sources.map((source) => (
                <Reveal key={source.name}>
                  <GlassCard className="h-full p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-lg font-semibold text-slate-900">{source.name}</div>
                        <div className="mt-0.5 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                          {source.badge}
                        </div>
                      </div>
                      <Link
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Open <span aria-hidden>-&gt;</span>
                      </Link>
                    </div>
                    <p className="mt-3 text-sm text-slate-600">{source.description}</p>
                    <ul className="mt-3 space-y-2 text-sm text-slate-700">
                      {source.notes.map((note) => (
                        <li key={note} className="flex items-start gap-2">
                          <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-12 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <Reveal className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm">
              <h2 id="comparison" className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Which source should you pick for your use-case?
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Structured table format improves quick extraction for AI overviews and intake decisions.
              </p>
              <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                  <caption className="sr-only">Comparison of 3D model platforms by use-case and quality signal</caption>
                  <thead className="bg-slate-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-semibold text-slate-800">
                        Platform
                      </th>
                      <th scope="col" className="px-4 py-3 font-semibold text-slate-800">
                        Best for
                      </th>
                      <th scope="col" className="px-4 py-3 font-semibold text-slate-800">
                        Quality signal
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {sources.map((source) => (
                      <tr key={`table-${source.name}`}>
                        <td className="px-4 py-3 align-top">
                          <Link href={source.url} target="_blank" rel="noreferrer" className="font-semibold text-indigo-700 hover:underline">
                            {source.name}
                          </Link>
                        </td>
                        <td className="px-4 py-3 align-top text-slate-700">{source.bestFor}</td>
                        <td className="px-4 py-3 align-top text-slate-700">{source.qualitySignal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-6 pb-12 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <Reveal className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
              <GlassCard className="p-6 sm:p-8">
                <h2 id="process" className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  How do we process your model link step by step?
                </h2>
                <ol className="mt-3 space-y-2 text-sm text-slate-700">
                  {process.map((step, index) => (
                    <li key={step}>
                      {index + 1}. {step}
                    </li>
                  ))}
                </ol>
                <div className="mt-4 flex flex-wrap gap-3">
                  <ShimmerButton href="/en/contact?quote=Link%20to%203D%20model">Share your model</ShimmerButton>
                  <Link
                    href="/en/pricing"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:-translate-y-0.5"
                  >
                    Pricing and lead times
                  </Link>
                </div>
              </GlassCard>

              <GlassCard className="p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-slate-900">Quick intake checklist</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li>- Add the link and specify exact parts to print.</li>
                  <li>- Include desired scale (mm) and branding constraints.</li>
                  <li>- Share use context (indoor, outdoor, heat, impact).</li>
                  <li>- Add a screenshot if the listing has multiple variants.</li>
                </ul>
              </GlassCard>
            </Reveal>
          </div>
        </section>

        <section className="px-6 pb-12 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <Reveal className="grid gap-6 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">Modeling support</p>
                <h2 id="modeling" className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  When is custom modeling the better route?
                </h2>
                <p className="mt-2 text-sm text-slate-700">
                  We model in Fusion 360 or Tinkercad when existing STL files are not reliable enough or when your part
                  requires custom constraints.
                </p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {modelingPoints.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-indigo-500" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-3">
                  <ShimmerButton href="/en/3d-modelleren">Explore 3D modeling</ShimmerButton>
                  <Link
                    href="/en/contact"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                  >
                    Request a model
                  </Link>
                </div>
              </div>
              <GlassCard className="border-white/40 bg-gradient-to-br from-white/80 to-white/60 p-6 shadow-lg ring-1 ring-white/60">
                <h3 className="text-lg font-semibold text-slate-900">Typical signals for custom work</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li>- Existing STL has tolerance issues or excessive supports.</li>
                  <li>- You need brand details or geometry not available online.</li>
                  <li>- Threads, inserts or mating points must fit exactly.</li>
                  <li>- You want test-print iteration before a small to large batch.</li>
                </ul>
              </GlassCard>
            </Reveal>
          </div>
        </section>

        <section className="px-6 pb-12 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <Reveal className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm">
              <h2 id="references" className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Which sources back this guide?
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {references.map((reference) => (
                  <li key={reference.url}>
                    <cite className="not-italic">
                      <Link href={reference.url} target="_blank" rel="noreferrer" className="text-indigo-700 hover:underline">
                        {reference.label}
                      </Link>
                    </cite>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section id="faq" className="mx-auto mb-16 max-w-5xl px-6 sm:px-8 lg:px-12">
          <Faq title="FAQ on finding models" items={faqItems} />
        </section>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    </main>
  )
}
