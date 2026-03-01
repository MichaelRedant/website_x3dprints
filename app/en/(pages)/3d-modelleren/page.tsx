import type { Metadata } from "next"
import Link from "next/link"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"

export const metadata: Metadata = {
  title: "3D modeling for print | Fusion 360, Tinkercad, Blender",
  description:
    "Print-ready 3D modeling for every 3d model print workflow. Fusion 360 for precise parts, Tinkercad for quick concepts and Blender for the occasional organic shape.",
  alternates: {
    canonical: "https://www.x3dprints.be/en/3d-modelleren/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/3d-modelleren/",
      "en-BE": "https://www.x3dprints.be/en/3d-modelleren/",
      "x-default": "https://www.x3dprints.be/3d-modelleren/",
    },
  },
  openGraph: {
    title: "3D modeling for 3D prints | X3DPrints",
    description:
      "Designs that print well: Fusion 360 for precision, Tinkercad for fast iterations and occasionally Blender for organic forms.",
    url: "https://www.x3dprints.be/en/3d-modelleren/",
    images: [{ url: "/images/og-home.svg", width: 1200, height: 630 }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

export default function Page() {
  const tocItems = [
    { id: "modeling-tooling", label: "Which tools do we use for 3D modeling?" },
    { id: "modeling-workflow", label: "How does the workflow run from idea to print?" },
    { id: "modeling-sources", label: "Sources and references" },
  ]
  const references = [
    { label: "Autodesk Fusion 360 overview", url: "https://www.autodesk.com/products/fusion-360/overview" },
    { label: "Tinkercad by Autodesk", url: "https://www.tinkercad.com/" },
    { label: "Blender Foundation", url: "https://www.blender.org/" },
  ]
  const lastUpdatedLabel = "Last updated: February 6, 2026"
  const tooling = [
    {
      title: "Autodesk Fusion 360",
      subtitle: "For technical parts and fit",
      bullets: [
        "Parametric design for dimensionally accurate parts and assemblies.",
        "Rapid DFM checks for wall thickness, tolerances and assembly.",
        "Ideal for brackets, housings, jigs and prototype parts in PETG or PLA.",
      ],
    },
    {
      title: "Tinkercad",
      subtitle: "For quick concepts and simple forms",
      bullets: [
        "Quickly sketch ideas with primitives or edit existing STLs.",
        "Perfect for personalised gadgets, small clips or visual mockups.",
        "Short lead time because we can jump straight to slicing.",
      ],
    },
    {
      title: "Blender",
      subtitle: "For organic shapes (occasionally)",
      bullets: [
        "Used sparingly for soft curves or organic sculpt details.",
        "Great when visual appeal matters more than strict tolerances.",
        "We test printability and switch to Fusion 360 for precision when needed.",
      ],
    },
  ]

  const process = [
    {
      title: "From idea to printable model",
      body:
        "We start with the goal of the part: assembly, look & feel or proof of concept. Then we lock in critical dimensions and materials so the CAD model remains printable.",
    },
    {
      title: "Pragmatic DFM checks",
      body:
        "We define wall thickness, support strategy and strength per part. I align on which side is visible and choose layer height and infill that fit the use case.",
    },
    {
      title: "Iterate in small steps",
      body:
        "Short feedback rounds with screenshots or quick test prints. Every iteration updates the CAD parameters so the model is ready for slicing and production.",
    },
  ]

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",

    headline: "3D modeling for 3D printing",
    description:
      "How X3DPrints creates 3D models with Autodesk Fusion 360, Tinkercad and Blender for print-ready results.",
    author: { "@type": "Person", name: "X3DPrints" },
    datePublished: "2025-07-10",
  dateModified: "2026-02-06",
  inLanguage: "en-BE",
    mainEntityOfPage: "https://www.x3dprints.be/en/3d-modelleren/",
  }

  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(99,102,241,.16),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.07]" />

      <section className="px-6 pb-12 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="stacked-content">
            <p className="text-sm font-semibold text-indigo-600">3D modeling for 3D printing</p>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Print-ready CAD models with the right tools.
            </h1>
            <p className="mt-3 max-w-3xl text-pretty text-slate-600">
              I create 3D models that are immediately ready for FDM printing. Fusion 360 for technical accuracy, Tinkercad for quick concepts and Blender only when organic shapes are needed. Your file stays printable without surprises in the slicer.
              This is ideal when you need a 3d model print for functional parts or rapid iteration.
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="stacked-actions mt-6 flex flex-wrap gap-3 justify-center sm:justify-start">
              <ShimmerButton href="/en/contact">Plan a 3D model</ShimmerButton>
              <Link
                href="/en/portfolio"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/20 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:bg-white/40"
              >
                View portfolio
              </Link>
              <Link
                href="/en/materials#material-suggestion-tool"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/20 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:bg-white/40"
              >
                Material Suggestion Tool
              </Link>
            </div>
            <ContentTableOfContents title="Contents" items={tocItems} className="mt-6 max-w-2xl" />
          </Reveal>
        </div>
      </section>

      <section id="modeling-tooling" className="scroll-mt-28 px-6 pb-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Tool stack for printable models</h2>
            <p className="mt-2 max-w-3xl text-slate-600">
              For each project we choose the fastest path to a printable result: parametric where fit matters, rapid concept tooling where iteration speed matters.
            </p>
          </Reveal>
          <Reveal className="grid gap-6 sm:grid-cols-3">
            {tooling.map((tool) => (
              <GlassCard
                key={tool.title}
                className="group h-full border-white/50 bg-gradient-to-br from-white/85 to-white/60 p-6 shadow-sm ring-1 ring-white/60"
              >
                <div className="text-xs font-semibold uppercase tracking-wide text-indigo-600">{tool.title}</div>
                <div className="mt-1 text-lg font-bold text-slate-900">{tool.subtitle}</div>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
                  {tool.bullets.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="modeling-workflow" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
            <GlassCard className="border-white/50 bg-gradient-to-br from-white/85 to-white/60 p-6 shadow-sm ring-1 ring-white/60">
              <p className="text-sm font-semibold text-indigo-600">Workflow</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Designing for strong prints.
              </h2>
              <p className="mt-3 text-slate-600">
                I combine CAD with slice experience: every fillet, chamfer or reinforcement is chosen with printability in mind. That avoids support overkill and keeps the fit intact.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-white/70 p-4 shadow-sm ring-1 ring-slate-200/60">
                  <div className="text-sm font-semibold text-slate-900">Input</div>
                  <p className="mt-1 text-sm text-slate-600">Sketch, reference photo, or STEP/STL. We note critical dimensions and use case.</p>
                </div>
                <div className="rounded-xl bg-white/70 p-4 shadow-sm ring-1 ring-slate-200/60">
                  <div className="text-sm font-semibold text-slate-900">Output</div>
                  <p className="mt-1 text-sm text-slate-600">Printable STL/STEP + advice on orientation, supports and material choice.</p>
                </div>
              </div>
            </GlassCard>

            <div className="grid gap-4">
              {process.map((item) => (
                <GlassCard
                  key={item.title}
                  className="border-white/50 bg-white/80 p-5 shadow-sm ring-1 ring-white/60"
                >
                  <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
                </GlassCard>
              ))}
              <div className="flex flex-wrap gap-3">
                <ShimmerButton href="/en/contact">Request a model</ShimmerButton>
                <Link
                  href="/en/segments"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/60 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-white"
                >
                  View segments
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="modeling-sources" className="scroll-mt-28 px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="border-white/50 bg-white/85 p-6 ring-1 ring-white/60">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Sources and references</h2>
              <p className="mt-2 text-sm text-slate-600">
                We use these references to keep tooling and terminology up to date.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {references.map((reference) => (
                  <li key={reference.url} className="rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3">
                    <cite className="not-italic">
                      <Link href={reference.url} target="_blank" rel="noreferrer" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        {reference.label}
                      </Link>
                    </cite>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    </main>
  )
}
