import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/en/blog/maker-monday-wanddiktes-ribs/"
const publishedDate = "2025-11-10T08:00:00+01:00"

export const metadata: Metadata = {
  title: "Maker Monday #2: wall thickness and ribs for FDM parts | X3DPrints",
  description:
    "How to size walls and ribs for PLA, PETG and TPU. Practical tables, rib guidelines and when infill does not replace real walls.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/maker-monday-wanddiktes-ribs/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/maker-monday-wanddiktes-ribs/",
    },
  },
  openGraph: {
    title: "Maker Monday #2: wall thickness and ribs for FDM parts",
    description:
      "Strength starts with walls, not infill. See recommended thicknesses, rib design rules and orientation tips for PLA, PETG and TPU.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["Maker Monday", "Wall thickness", "FDM design"],
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "Wall thickness and ribs" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maker Monday #2: wall thickness and ribs",
    description: "Design rules for strong FDM parts without wasting material on infill.",
    images: ["/images/og-home.jpg"],
  },
}

const wallTable = [
  { material: "PLA", walls: "1.6-2.0 mm", note: "Use for cosmetic parts. Increase if screws are involved." },
  { material: "PETG", walls: "2.4-3.0 mm", note: "Default for functional parts and inserts." },
  { material: "TPU", walls: "3.0-3.6 mm", note: "Flex needs more material to keep shape." },
]

const ribRules = [
  "Ribs 40-60% of wall thickness with fillets of 2-4 mm at the base.",
  "Place ribs opposite screw bosses and hinge barrels to spread load.",
  "Prefer multiple shorter ribs over one tall, thin rib.",
  "Sandwich construction (two walls + infill) beats one thick slab.",
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Maker Monday #2: wall thickness and ribs for FDM parts",
  description:
    "Recommended wall thicknesses and rib design rules for PLA, PETG and TPU, plus why infill cannot replace real walls.",
  datePublished: publishedDate,
  dateModified: publishedDate,
  author: { "@type": "Organization", name: "X3DPrints", url: "https://www.x3dprints.be" },
  publisher: {
    "@type": "Organization",
    name: "X3DPrints",
    url: "https://www.x3dprints.be",
    logo: { "@type": "ImageObject", url: "https://www.x3dprints.be/og-x3dprints.jpg" },
  },
  mainEntityOfPage: canonical,
  url: canonical,
  image: "https://www.x3dprints.be/images/og-home.jpg",
  inLanguage: "en-BE",
}

export default function MakerMondayWallsEnPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(150%_85%_at_50%_-15%,rgba(59,130,246,0.18),transparent_70%)]"
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
                <li className="font-medium text-slate-700">Maker Monday</li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-900">Wall thickness & ribs</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Maker Monday #2</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Strong FDM parts start with walls, not infill.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Use this guide as a checklist before you ever touch infill percentages. Correct wall thickness and rib placement carry
              most of the load and reduce print time.
            </p>
            <div className="stacked-actions mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <ShimmerButton href="/en/contact?topic=maker-monday-walls">Ask for wall review</ShimmerButton>
              <Link
                href="/en/blog/maker-monday-toleranties-3d-printen"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Next: tolerances
              </Link>
              <Link
                href="/en/blog/maker-monday-warping-layer-cracks"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Avoid warping
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">Published 10 November 2025.</p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Recommended wall thickness</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead className="text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="py-2 pr-4">Material</th>
                      <th className="py-2 pr-4">Walls</th>
                      <th className="py-2 pr-4">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {wallTable.map((row) => (
                      <tr key={row.material}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{row.material}</td>
                        <td className="py-3 pr-4">{row.walls}</td>
                        <td className="py-3 pr-4">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Increase walls instead of infill when you need strength. Infill stabilises but does not replace structural shells.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl grid gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Rib design rules</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {ribRules.map((rule) => (
                  <li key={rule} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Orientation and tolerances</h2>
              <p className="mt-2 text-sm text-slate-600">
                Align long ribs with the print direction to avoid wobble. Combine this guide with{" "}
                <Link href="/en/blog/maker-monday-toleranties-3d-printen" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                  Maker Monday #3
                </Link>{" "}
                for clearance values and{" "}
                <Link href="/en/blog/maker-monday-warping-layer-cracks" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                  Maker Monday #6
                </Link>{" "}
                to stop warping on large plates.
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Want a strength review?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Send your model and load case. We will size walls and ribs, propose material and share a quick print time estimate.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact?topic=maker-monday-walls">Book wall/rib review</ShimmerButton>
                <Link href="/en/materials" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Browse materials
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

