import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"
import { buildArticleJsonLd } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/en/blog/maker-monday-snapfit-parts/"
const publishedDate = "2025-12-01T08:00:00+01:00"
const dateModified = "2026-02-08"
const lastUpdatedLabel = "Last updated: 8 February 2026"

export const metadata: Metadata = {
  title: "Maker Monday #8: snap-fit parts that keep clicking | X3DPrints",
  description:
    "Deep dive into snap-fit parts: cantilever, annular and torsion clips, arm sizing, groove design and a 5-step test protocol.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/maker-monday-snapfit-parts/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/maker-monday-snapfit-parts/",
    },
  },
  openGraph: {
    title: "Maker Monday #8: snap-fit parts that keep clicking",
    description: "How to design snap-fit parts in PLA, PETG and TPU with reliable tolerances and arm geometry.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["Maker Monday", "Snap-fit parts", "FDM design"],
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "Snap-fit parts" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maker Monday #8: snap-fit parts",
    description: "Design snap-fit parts that survive multiple cycles with PETG, PLA or TPU.",
    images: ["/images/og-home.jpg"],
  },
}

const snapTypes = [
  {
    name: "Cantilever clips",
    detail: "Single arm that flexes to engage. Great for enclosures and covers. Keep arms short and add fillets.",
  },
  {
    name: "Annular snaps",
    detail: "Rings or lids that snap over a groove. Needs uniform clearance and solid hoop strength.",
  },
  {
    name: "Torsion snaps",
    detail: "Arms that twist instead of bending. Useful when space is tight but needs generous fillets.",
  },
]

const geometry = [
  "Arm thickness: PETG 2.4-3.0 mm, PLA 2.0-2.4 mm (decorative), TPU 3.0+ mm.",
  "Groove depth 60-70% of arm height with chamfers to guide insertion.",
  "Fillets everywhere stress collects: 1.0-2.0 mm on arms and groove edges.",
  "Start with +0.20 mm clearance on the latch for PETG, +0.15 mm for PLA, +0.30 mm for TPU.",
]

const testSteps = [
  "Print a small snap coupon in the final material.",
  "Check insertion force and adjust clearance before the real part.",
  "Run at least 10 snap cycles while watching for whitening or cracks.",
  "Add elephant's foot compensation to protect groove clearance.",
  "Lock orientation so layer lines run along the arm length.",
]

const references = [
  {
    label: "Autodesk: STL file format",
    href: "https://help.autodesk.com/cloudhelp/2014/ENU/Alias/files/GUID-8ABFA3B8-204B-44E0-A50B-BA4C1C3F9BE8.htm",
    description: "STL basics and export context for 3D printing workflows.",
  },
  {
    label: "Prusa: Material guide",
    href: "https://help.prusa3d.com/filament-material-guide",
    description: "Overview of PLA, PETG and TPU material behaviour and print considerations.",
  },
  {
    label: "UltiMaker PLA material properties",
    href: "https://ultimaker.com/materials/pla/",
    description: "PLA characteristics, storage tips and baseline print guidance.",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "Maker Monday #8: snap-fit parts that keep clicking",
  description: metadata.description ?? "",
  datePublished: publishedDate,
  dateModified,
  image: "https://www.x3dprints.be/images/og-home.jpg",
  inLanguage: "en-BE",
})


export default function MakerMondaySnapfitPartsEnPage() {
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
                <li className="font-medium text-slate-900">Snap-fit parts</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Maker Monday #8</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Snap-fit parts that click every time.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Use this as your quick-start for designing cantilever, annular and torsion snaps in PLA, PETG and TPU. Geometry,
              clearances and testing in one place.
            </p>
                        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="stacked-actions mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <ShimmerButton href="/en/contact?topic=maker-monday-snapfits">Request snap-fit review</ShimmerButton>
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
                Tolerance tables
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">Published 1 December 2025.</p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          {snapTypes.map((type) => (
            <Reveal key={type.name}>
              <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
                <h2 className="text-xl font-semibold text-slate-900">{type.name}</h2>
                <p className="mt-2 text-sm text-slate-600">{type.detail}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Geometry that survives</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {geometry.map((item) => (
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
              <h2 className="text-2xl font-semibold text-slate-900">Test protocol</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {testSteps.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Need snap-fit guidance?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Share STL/STEP and the number of cycles it must survive. We will propose the best arm geometry and material.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact?topic=maker-monday-snapfits">Book snap-fit review</ShimmerButton>
                <Link href="/en/pricing" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Pricing & lead times
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>
      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Sources and references</h2>
          <p className="mt-2 text-sm text-slate-600">Primary references that support the material and workflow guidance in this article.</p>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            {references.map((ref) => (
              <li key={ref.href} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                <a href={ref.href} target="_blank" rel="noreferrer" className="text-base font-semibold text-indigo-600">
                  {ref.label}
                </a>
                <p className="mt-1 text-sm text-slate-600">{ref.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <BlogReadMore />
    </main>
  )
}



