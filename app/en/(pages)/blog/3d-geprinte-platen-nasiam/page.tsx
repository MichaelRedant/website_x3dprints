import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"
import { buildArticleJsonLd } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/en/blog/3d-geprinte-platen-nasiam/"
const publishedDate = "2025-11-04T08:00:00+01:00"
const dateModified = "2026-02-08"
const lastUpdatedLabel = "Last updated: 8 February 2026"

export const metadata: Metadata = {
  title: "Case: 3D printed plates for Nasiam | X3DPrints",
  description:
    "How we produced custom 3D printed plates for Nasiam: material choice, lead time and finishing decisions for a branded set.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/3d-geprinte-platen-nasiam/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/3d-geprinte-platen-nasiam/",
    },
  },
  openGraph: {
    title: "Case: 3D printed plates for Nasiam",
    description: "Branded plates printed in PLA Matte with fast turnaround. Lessons learned on finishing and packaging.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["Case study", "3D printed plates", "Branding"],
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "3D printed plates for Nasiam" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case: 3D printed plates for Nasiam",
    description: "Material, finishing and logistics for a branded 3D printed plate set.",
    images: ["/images/og-home.jpg"],
  },
}

const highlights = [
  "Material: PLA Matte in a warm neutral tone for a soft, ceramic-like look.",
  "Lead time: design review + production within one week for the first batch.",
  "Finishing: raw matte finish, no paint needed thanks to low layer visibility.",
  "Packaging: separated plates with foam inserts to avoid scuffing during delivery.",
]

const lessons = [
  "Matte PLA gives a ceramic feel without post-processing. Perfect for branded props and displays.",
  "Lock tolerances on interlocking parts early; we shared small test coupons before printing the full set.",
  "Plan photography: we printed a few spare units for the shoot while the rest stayed packaged.",
  "For future runs, colour matching can be fine-tuned with dedicated PLA Matte pigments.",
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
  headline: "Case: 3D printed plates for Nasiam",
  description: metadata.description ?? "",
  datePublished: publishedDate,
  dateModified,
  image: "https://www.x3dprints.be/images/og-home.jpg",
  inLanguage: "en-BE",
})


export default function NasiamPlatesEnPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(150%_85%_at_50%_-15%,rgba(99,102,241,0.16),transparent_70%)]"
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
                <li className="font-medium text-slate-700">Case</li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-900">Nasiam plates</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Case study</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              3D printed plates for Nasiam: warm matte look, fast delivery.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Nasiam wanted branded plates with a soft, ceramic feel for photography and display. We used PLA Matte, kept layer lines
              discreet and delivered the first batch within a week.
            </p>
                        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="stacked-actions mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <ShimmerButton href="/en/contact?topic=case-nasiam">Plan a branded print</ShimmerButton>
              <Link
                href="/en/materials/pla-matte"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                View PLA Matte
              </Link>
              <Link
                href="/en/portfolio"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                See more cases
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">Published 4 November 2025.</p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl grid gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Project highlights</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {highlights.map((item) => (
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
              <h2 className="text-2xl font-semibold text-slate-900">Lessons for similar projects</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {lessons.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-slate-600">
                Need a different finish? We can sand and paint hero pieces, but PLA Matte already delivers a premium look without
                extra lead time.
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Want branded props like this?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Share your logo, colour reference and quantity. We will propose materials, finishing and packaging that match your
                  brand.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact?topic=case-nasiam">Book a branded print run</ShimmerButton>
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



