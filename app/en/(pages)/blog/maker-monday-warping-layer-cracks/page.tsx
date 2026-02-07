import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/en/blog/maker-monday-warping-layer-cracks/"
const publishedDate = "2025-12-22T08:00:00+01:00"

export const metadata: Metadata = {
  title: "Maker Monday #6: prevent warping, layer cracks and poor bridges | X3DPrints",
  description:
    "Design tips to avoid warping and layer cracks: chamfers, ribs, split parts and bridge rules for PLA, PETG and TPU.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/maker-monday-warping-layer-cracks/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/maker-monday-warping-layer-cracks/",
    },
  },
  openGraph: {
    title: "Maker Monday #6: prevent warping, layer cracks and poor bridges",
    description: "Practical design moves that stop warping and layer splits on large FDM parts.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["Maker Monday", "Warping", "Layer cracks"],
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "Prevent warping in FDM" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maker Monday #6: prevent warping and layer cracks",
    description: "Design rules for stable FDM prints and better bridges.",
    images: ["/images/og-home.jpg"],
  },
}

const antiWarping = [
  "Use generous chamfers on the base to reduce internal stress.",
  "Split very large parts into smaller panels and add mechanical joins.",
  "Increase walls before infill; heavy infill shrinks and lifts corners.",
  "Keep sharp corners to a minimum; radius or chamfer them.",
  "Orient tall, thin walls so they do not catch airflow and cool unevenly.",
]

const bridging = [
  "Design bridges under 6-8 mm where possible; add ribs otherwise.",
  "Use arch shapes instead of flat bridges when you can influence the geometry.",
  "Add sacrificial tabs to anchor the first strands of a long bridge.",
  "Lower bridge speed and fan in the slicer if geometry must stay as-is.",
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Maker Monday #6: prevent warping, layer cracks and poor bridges",
  description:
    "Design strategies to stop warping and layer cracks on FDM prints, plus bridge guidelines to keep overhangs crisp.",
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

export default function MakerMondayWarpingEnPage() {
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
                <li className="font-medium text-slate-900">Warping & layer cracks</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Maker Monday #6</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Stop warping and layer cracks before they start.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Warping is a design and process problem. Use these geometry tweaks and bridging rules to keep large PLA, PETG and TPU
              parts flat and intact.
            </p>
            <div className="stacked-actions mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <ShimmerButton href="/en/contact?topic=maker-monday-warping">Ask warping review</ShimmerButton>
              <Link
                href="/en/blog/maker-monday-wanddiktes-ribs"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Wall & rib rules
              </Link>
              <Link
                href="/en/blog/maker-monday-toleranties-3d-printen"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Tolerance tables
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">Published 22 December 2025.</p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Design moves against warping</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {antiWarping.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Better bridging</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {bridging.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-slate-600">
                If geometry cannot change, slow bridges, increase fan and consider splitting the part to print the bridge flat.
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Battling a tricky part?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Show us the model and environment. We will propose splits, chamfers and materials to keep it flat—and tell you if a
                  different process is safer.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact?topic=maker-monday-warping">Book warping check</ShimmerButton>
                <Link href="/en/pricing" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Pricing & lead times
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

