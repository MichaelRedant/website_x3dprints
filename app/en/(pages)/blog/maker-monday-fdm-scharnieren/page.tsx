import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/en/blog/maker-monday-fdm-scharnieren/"
const publishedDate = "2025-11-03T08:00:00+01:00"

export const metadata: Metadata = {
  title: "Maker Monday #1: designing FDM hinges that keep working | X3DPrints",
  description:
    "Engineering guide for 3D printed hinges: material choice, pin tolerances, wall thickness and orientation so parts survive more than two rotations.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/maker-monday-fdm-scharnieren/",
      en: canonical,
      "x-default": "https://www.x3dprints.be/blog/maker-monday-fdm-scharnieren/",
    },
  },
  openGraph: {
    title: "Maker Monday #1: FDM hinge design rules",
    description:
      "How to design hinges in PLA, PETG and TPU. Includes pin clearances, ribs, inserts and orientation tips to avoid cracks.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["Maker Monday", "3D printed hinges", "FDM design"],
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "FDM hinge design" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maker Monday #1: FDM hinge design rules",
    description: "Pin tolerances, wall thickness and material advice for reliable 3D printed hinges.",
    images: ["/images/og-home.jpg"],
  },
}

const tips = [
  {
    title: "Pick the right filament",
    detail:
      "Use PETG for most functional hinges because it flexes before breaking. PLA is fine for decorative lids. TPU works for soft snap hinges.",
  },
  {
    title: "Mind pin clearance",
    detail: "Start around +0.25 mm clearance in PETG, +0.15 mm in PLA, +0.35 mm in TPU. Test with a small coupon first.",
  },
  {
    title: "Wall thickness and ribs",
    detail: "Use at least 2.4-3.0 mm walls around the barrel and add ribs behind screw points to spread load.",
  },
  {
    title: "Orientation matters",
    detail: "Print hinges so layer lines run along the hinge length. Avoid loading parts only on layer adhesion.",
  },
  {
    title: "Use inserts for screws",
    detail: "Heat-set inserts or thread-forming screws avoid cracked bosses. See Maker Monday #5 for details.",
  },
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Maker Monday #1: designing FDM hinges that keep working",
  description:
    "Guide for reliable 3D printed hinges with PETG, PLA and TPU. Includes pin tolerances, wall thickness and orientation tips.",
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

export default function MakerMondayHingesEnPage() {
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
                <li className="font-medium text-slate-900">FDM hinges</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Maker Monday #1</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Design hinges that survive more than two rotations.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Most broken hinges fail because of material choice, clearance or orientation. This Maker Monday collects the starting
              values we use in the studio so your next hinge closes smoothly instead of cracking.
            </p>
            <div className="stacked-actions mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <ShimmerButton href="/en/contact?topic=maker-monday-hinges">Request a hinge review</ShimmerButton>
              <Link
                href="/en/materials"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Materials overview
              </Link>
              <Link
                href="/en/blog/maker-monday-toleranties-3d-printen"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Next: tolerances
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">Published 3 November 2025.</p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          {tips.map((tip) => (
            <Reveal key={tip.title}>
              <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
                <h2 className="text-xl font-semibold text-slate-900">{tip.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{tip.detail}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <GlassCard className="flex flex-col gap-6 border border-white/40 bg-white/85 p-6 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Next step</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Need a hinge tuned?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Send STL/STEP plus context. We check clearance, walls and inserts, then propose material and orientation.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact?topic=maker-monday-hinges">Start a hinge check</ShimmerButton>
                <Link href="/en/pricing" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  View pricing & lead times
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

