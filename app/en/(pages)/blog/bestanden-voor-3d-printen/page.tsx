import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"
import { buildArticleJsonLd } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/en/blog/bestanden-voor-3d-printen/"

export const metadata: Metadata = {
  title: "Which files do you need for 3D printing? | X3DPrints Blog",
  description:
    "STL, STEP or native CAD? Learn which format to use for 3D printing, what resolution to export and how to submit a complete request.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/bestanden-voor-3d-printen/",
      en: canonical,
      "x-default": "https://www.x3dprints.be/blog/bestanden-voor-3d-printen/",
    },
  },
  openGraph: {
    title: "Which files do you need for 3D printing?",
    description:
      "Full guide on file formats, export settings and mesh checks for 3D printing. Includes checklist and upload tips.",
    url: canonical,
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "Files for 3D printing" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Which files do you need for 3D printing?",
    description: "Checklist for STL/STEP export, mesh repair and documentation so your request can be processed immediately.",
    images: ["/images/og-home.jpg"],
  },
}

const formatCards = [
  {
    format: "STL",
    description:
      "Ideal for final production. Export with enough resolution (0.01-0.05 mm). Check for non-manifold edges and duplicate faces before you upload.",
    tips: ["Choose Binary STL to keep files compact", "Split moving parts into separate STLs"],
  },
  {
    format: "STEP",
    description:
      "Perfect when iterations are expected. We can tweak dimensions, check wall thickness and review tolerance in STEP or native CAD.",
    tips: ["Export at assembly level so the reference origin stays intact", "Remove irrelevant bodies such as sketch helpers"],
  },
  {
    format: "Native CAD + PDF",
    description:
      "For complex projects we prefer the original CAD plus a PDF with dimensions. That keeps mating surfaces and interfaces correct.",
    tips: ["Use clear layer names", "Add a material list or BOM when multiple parts belong together"],
  },
]

const exportSteps = [
  "Check if the model is watertight (no holes). Tools: Fusion Inspect, SolidWorks Check, Meshmixer.",
  "Remove flipped normals and stray triangles to avoid print artefacts.",
  "Lock units: export in millimetre and include it in the filename (e.g. bracket-mm-v03.stl).",
  "Zip multiple files together and add a short readme with context (material, quantities, deadline).",
]

const documentationTips = [
  "Add reference images or renders so we understand the required orientation and look.",
  "Write tolerance notes (e.g. hole for M3 screw: 2.9 mm) directly in the message or on a PDF.",
  "Use the viewer to share links to large cloud files (Dropbox/Drive) to avoid email limits.",
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "Which files do you need for 3D printing?",
  description:
    "STL, STEP or native CAD? Learn which format to use for 3D printing, what resolution to export and how to submit a complete request.",
  datePublished: "2024-09-01",
  dateModified: "2024-09-01",
  inLanguage: "en-BE",
})

export default function FilesArticleEnPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(150%_85%_at_50%_-15%,rgba(16,185,129,0.18),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.07]" />

      <section className="px-6 pb-12 pt-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal className="stacked-content">
            <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
              <ol className="flex flex-wrap gap-2">
                <li>
                  <Link
                    href="/en/blog"
                    className="font-medium text-indigo-600 transition hover:text-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Blog
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-700">Files for 3D printing</li>
              </ol>
            </nav>
            <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Which files do you need for 3D printing?
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Send STL for production and STEP when you expect changes. This guide shows how to export, check and document your files for a fast quote.
            </p>
            <div className="stacked-actions mt-6 flex flex-wrap gap-3 justify-center sm:justify-start">
              <ShimmerButton href="/en/viewer">Upload now</ShimmerButton>
              <Link
                href="/en/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Request a design review
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {formatCards.map((card) => (
            <Reveal key={card.format}>
              <GlassCard className="h-full border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Format</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">{card.format}</h2>
                <p className="mt-2 text-sm text-slate-600">{card.description}</p>
                <ul className="mt-3 space-y-1.5 text-xs text-slate-500">
                  {card.tips.map((tip) => (
                    <li key={tip} className="flex gap-2">
                      <span aria-hidden>-</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Export checklist</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {exportSteps.map((step) => (
                  <li key={step} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold text-slate-900">Documentation and communication</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {documentationTips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-slate-500">
                The more complete your info, the faster we can confirm pricing and lead time. Feel free to add a short video or photo of the intended use.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <GlassCard className="flex flex-col gap-6 border border-white/40 bg-white/85 p-6 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Next step</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Drop your files</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Use the viewer for STL/STEP. We review and share feedback on material, orientation and price.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/viewer">Upload now</ShimmerButton>
                <Link href="/en/services" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Explore design service
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <BlogReadMore />
    </main>
  )
}

