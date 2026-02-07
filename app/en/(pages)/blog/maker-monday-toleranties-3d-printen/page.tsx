import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/en/blog/maker-monday-toleranties-3d-printen/"
const publishedDate = "2025-11-17T08:00:00+01:00"

export const metadata: Metadata = {
  title: "Maker Monday #3: tolerances for 3D printing | X3DPrints",
  description:
    "Clearance tables for sliding fits, press fits, snap-fits and hinges in PLA, PETG and TPU. Includes slicer notes on elephant’s foot and hole compensation.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/maker-monday-toleranties-3d-printen/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/maker-monday-toleranties-3d-printen/",
    },
  },
  openGraph: {
    title: "Maker Monday #3: tolerances for 3D printing",
    description: "How much clearance to add for common fits in PLA, PETG and TPU, plus slicer tweaks for predictable results.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["Maker Monday", "3D print tolerances", "Clearance tables"],
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "3D print tolerances" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maker Monday #3: tolerances for 3D printing",
    description: "Practical clearance tables for PLA, PETG and TPU fits.",
    images: ["/images/og-home.jpg"],
  },
}

const toleranceRows = [
  { fit: "Sliding fit", pla: "+0.15 mm", petg: "+0.20 mm", tpu: "+0.30 mm" },
  { fit: "Pin/axle rotation", pla: "+0.15 mm", petg: "+0.25 mm", tpu: "+0.35 mm" },
  { fit: "Press fit (light)", pla: "+0.05 mm", petg: "+0.10 mm", tpu: "+0.20 mm" },
  { fit: "Snap-fit arms", pla: "+0.15 mm", petg: "+0.25 mm", tpu: "+0.35 mm" },
  { fit: "Heat-set insert pocket", pla: "+0.20 mm", petg: "+0.25 mm", tpu: "+0.30 mm" },
]

const slicerTips = [
  "Enable elephant's foot compensation (0.15-0.25 mm) so first layers do not steal your clearance.",
  "Use horizontal hole compensation for critical bores instead of scaling the whole model.",
  "Print a two-piece test coupon before sending a full batch.",
  "Keep layer height at 0.16-0.20 mm for parts with many fits; coarse layers distort holes.",
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Maker Monday #3: tolerances for 3D printing",
  description:
    "Clearance values for common fits in PLA, PETG and TPU, with slicer settings to keep tolerances predictable.",
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

export default function MakerMondayTolerancesEnPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(150%_85%_at_50%_-15%,rgba(99,102,241,0.18),transparent_70%)]"
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
                <li className="font-medium text-slate-900">Tolerances</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Maker Monday #3</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Tolerances for FDM: start values you can trust.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Stop guessing clearances. These baseline values cover sliding fits, pins, press fits and snap-fits in PLA, PETG and
              TPU, plus the slicer tweaks that keep them consistent.
            </p>
            <div className="stacked-actions mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <ShimmerButton href="/en/contact?topic=maker-monday-tolerances">Ask a tolerance review</ShimmerButton>
              <Link
                href="/en/blog/maker-monday-snapfits"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Next: snap-fits
              </Link>
              <Link
                href="/en/blog/maker-monday-fdm-scharnieren"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Hinges guide
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">Published 17 November 2025.</p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Baseline clearances</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead className="text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="py-2 pr-4">Fit</th>
                      <th className="py-2 pr-4">PLA</th>
                      <th className="py-2 pr-4">PETG</th>
                      <th className="py-2 pr-4">TPU</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {toleranceRows.map((row) => (
                      <tr key={row.fit}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{row.fit}</td>
                        <td className="py-3 pr-4">{row.pla}</td>
                        <td className="py-3 pr-4">{row.petg}</td>
                        <td className="py-3 pr-4">{row.tpu}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Test your own machine with a small coupon. These values assume a well-tuned direct drive printer with 0.4 mm nozzle.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Slicer adjustments</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {slicerTips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Combine with other Maker Mondays</h2>
              <p className="mt-2 text-sm text-slate-600">
                Tolerances only work if walls and ribs are sized correctly and parts do not warp. Pair this guide with{" "}
                <Link href="/en/blog/maker-monday-wanddiktes-ribs" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                  Maker Monday #2
                </Link>{" "}
                and{" "}
                <Link href="/en/blog/maker-monday-warping-layer-cracks" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                  Maker Monday #6
                </Link>
                .
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Have parts with tight fits?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Send the critical dimensions and we will propose clearances, test coupons and the best material for smooth
                  assembly.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact?topic=maker-monday-tolerances">Book tolerance check</ShimmerButton>
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

