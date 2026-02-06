import type { Metadata } from "next"
import Link from "next/link"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import Faq from "@/components/Faq"
import Reveal from "@/components/Reveal"
import FilamentHeroVisual from "@/components/FilamentHeroVisual"
import GlassOrb from "@/components/GlassOrb"

export const metadata: Metadata = {
  title: "Where to find 3D models to print | X3DPrints",
  description:
    "Find 3D models ready for printing: Printables, MakerWorld, Thingiverse, MyMiniFactory, Cults and Thangs. Tips on quality and how to send the link so we can print locally in Belgium.",
  alternates: {
    canonical: "https://www.x3dprints.be/en/3d-modellen-vinden/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/3d-modellen-vinden/",
      en: "https://www.x3dprints.be/en/3d-modellen-vinden/",
      "x-default": "https://www.x3dprints.be/3d-modellen-vinden/",
    },
  },
  openGraph: {
    title: "Where to find 3D models to print",
    description:
      "Guide to the best platforms to download 3D models: share links, assess quality and get them printed at X3DPrints.",
    url: "https://www.x3dprints.be/en/3d-modellen-vinden/",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "Find 3D models" }],
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
    description: "Large community, clear quality labels, many verified prints with photos and settings.",
    notes: ["Filter on 'Printables Verified' for reliable files", "Check comments for material and orientation tips"],
  },
  {
    name: "MakerWorld (Bambu Lab)",
    url: "https://makerworld.com/",
    badge: "Plenty of presets",
    description: "Lots of models with Bambu AMS profiles and exact slicer settings.",
    notes: ["Download the 3MF file for presets", "Check remix info (scale/supports)"],
  },
  {
    name: "Thingiverse",
    url: "https://www.thingiverse.com/",
    badge: "Classic",
    description: "Very large library; quality varies. Pay extra attention to comments and remixes.",
    notes: ["Use 'Makes' to confirm printability", "Avoid models without photos or comments"],
  },
  {
    name: "MyMiniFactory",
    url: "https://www.myminifactory.com/",
    badge: "Minis & props",
    description: "Strong in tabletop, props and decor. Often clear info and paid/patreon options.",
    notes: ["Check scale (mm) and supports", "Keep proof of purchase for paid models"],
  },
  {
    name: "Cults3D",
    url: "https://cults3d.com/",
    badge: "Mix free/paid",
    description: "Paid and free models with variable quality. Read screenshots and reviews carefully.",
    notes: ["Download all parts (STL/OBJ)", "Keep invoice or link for reference"],
  },
  {
    name: "Thangs",
    url: "https://thangs.com/",
    badge: "Search engine",
    description: "Searches across multiple platforms and shows variants. Handy for alternatives.",
    notes: ["Click through to the source for details", "Watch units (mm/inch)"],
  },
]

const faqItems = [
  {
    q: "Which link should I send?",
    a: "Send the direct model page link and note which parts you need. Add a screenshot or desired scale if relevant.",
  },
  {
    q: "Can I submit a remix?",
    a: "Yes. Send your edited STL/3MF or a link to the original plus your changes. Mention if supports are baked in.",
  },
  {
    q: "Can you create or adjust the model?",
    a: "Yes. We model in Fusion 360 or Tinkercad and can adapt existing STL/3MF (scale, text/logo, tolerances, inserts). You receive a printable file plus a material and planning proposal.",
  },
  {
    q: "Which formats work best?",
    a: "STL and 3MF are ideal. 3MF with presets from MakerWorld are imported and tuned for our printers.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",

    mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
}

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",

  headline: "Where to find 3D models to print",
  description:
    "Overview of the best places to download 3D models (Printables, MakerWorld, Thingiverse, MyMiniFactory, Cults, Thangs) plus quality tips for X3DPrints.",
  datePublished: "2025-07-22",
  dateModified: "2026-02-06",
  inLanguage: "en-BE",
  author: { "@type": "Organization", name: "X3DPrints" },
  mainEntityOfPage: "https://www.x3dprints.be/en/3d-modellen-vinden/",
}

const process = [
  "File check: multiple parts, supports included and which scale applies?",
  "Material & price: we recommend PLA/PETG/TPU and share rough pricing and planning.",
  "Production: we print locally in Herzele and schedule delivery or pickup in Flanders.",
]

const modelingPoints = [
  "CAD in Fusion 360 or Tinkercad for print-ready results.",
  "We handle wall thickness, supports and tolerances.",
  "Fast iterations with screenshots or quick test prints.",
]

export default function FindModelsPage() {
  return (
    <main className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(99,102,241,.12),transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.06]" />

      <section className="px-6 pb-14 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-indigo-600">Guide</p>
              <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                Where to find 3D models to print?
              </h1>
              <p className="text-lg text-slate-700">
                Choose a model on Printables, MakerWorld, Thingiverse, MyMiniFactory, Cults or Thangs and share the link. We check scale, material and printability and print locally in Belgium.
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

      <section className="px-6 pb-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6 max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Best places to start</h2>
            <p className="mt-2 text-slate-600">Use the links below and share the exact model page.</p>
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

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">How we process your link</h2>
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
                  Pricing & lead times
                </Link>
              </div>
            </GlassCard>

            <GlassCard className="p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-slate-900">Quick checklist</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>- Add the link plus which parts you need (if it&apos;s a set).</li>
                <li>- Note desired scale (mm) and whether text/logo must stay.</li>
                <li>- Tell us if it&apos;s for indoor/outdoor use and which colour/look you want.</li>
                <li>- Add a screenshot when the model has multiple variants.</li>
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid gap-6 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">We model too</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Didn&apos;t find the right model?</h2>
              <p className="mt-2 text-sm text-slate-700">
                We model in Fusion 360 or Tinkercad. Perfect when an existing STL is wrong or you need something fully custom. You get a printable STL/STEP plus advice on orientation, supports and material.
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
              <h3 className="text-lg font-semibold text-slate-900">When to choose modeling?</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>- Existing STL has wrong tolerances or too many supports.</li>
                <li>- You want branding (logo/text) or custom features you can&apos;t find online.</li>
                <li>- Assembly points, inserts or threads must be exact.</li>
                <li>- You want to iterate with test prints then run a small batch.</li>
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto mb-16 max-w-5xl">
        <Faq title="FAQ on finding models" items={faqItems} />
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    </main>
  )
}

