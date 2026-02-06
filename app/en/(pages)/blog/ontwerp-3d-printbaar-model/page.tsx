import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"
import { buildArticleJsonLd } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/en/blog/ontwerp-3d-printbaar-model/"

export const metadata: Metadata = {
  title: "How do you design a 3D printable model? | X3DPrints Blog",
  description:
    "Checklist for printable designs: wall thicknesses, tolerance, orientation, support and file formats. Includes tips for PLA, PETG and TPU.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/ontwerp-3d-printbaar-model/",
      en: canonical,
      "x-default": "https://www.x3dprints.be/blog/ontwerp-3d-printbaar-model/",
    },
  },
  openGraph: {
    title: "How do you design a 3D printable model?",
    description:
      "Full guide with design principles for 3D prints: wall thickness, overhangs, snap-fit, tolerance and export tips.",
    url: canonical,
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "Design a 3D printable model" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "How do you design a 3D printable model?",
    description: "Make your design print-ready: consistent material use, correct orientation, support and file formats.",
    images: ["/images/og-home.jpg"],
  },
}

const fundamentals = [
  {
    title: "Wall thickness & ribs",
    description: "Use 1.2 mm minimum for PLA/PETG (3 perimeters) and 2 mm for TPU. Add ribs or fillets to spread stress.",
  },
  {
    title: "Tolerances",
    description:
      "For fits we default to +0.2 mm. For press-fit or hinges we tune clearance to the material and layer height.",
  },
  {
    title: "Orientation",
    description: "Place critical surfaces vertically for a clean finish, and align forces parallel to the perimeters.",
  },
  {
    title: "Overhang & support",
    description:
      "Limit overhang to 55 degrees. For visible faces a chamfer under 45 degrees looks better than a flat face with support.",
  },
]

const exportChecklist = [
  "Design parametrically in CAD so later tweaks are easy.",
  "Export STL at 0.01 mm resolution for organic shapes; include STEP if parts may still change.",
  "Remove duplicate surfaces and check the mesh for non-manifold edges. Tools like Netfabb or Meshmixer help.",
  "Add a short PDF or quick sketch with critical dimensions and function description.",
]

const materialGuidance = [
  {
    material: "PLA",
    guidance: "Focus on aesthetics: use chamfers, soften sharp corners with small fillets and emboss logos.",
  },
  {
    material: "PETG",
    guidance: "Use thicker walls and round edges. Add extra support pads where the nozzle would otherwise hang in the air.",
  },
  {
    material: "TPU",
    guidance: "Keep wall thickness even so flex stays consistent. Avoid sharp internal corners that start tears.",
  },
]

const snapFitTips = [
  "Use tapered clips with 0.2-0.3 mm clearance per side for PLA, 0.4 mm for PETG.",
  "Add hard stops so clips do not bend further than needed. That keeps them alive longer.",
  "Place the snap-fit along the layer direction for maximum strength. For horizontal clips add ribs.",
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "How do you design a 3D printable model?",
  description:
    "Checklist for printable designs: wall thicknesses, tolerance, orientation, support and file formats. Includes tips for PLA, PETG and TPU.",
  datePublished: "2024-09-01",
  dateModified: "2024-09-01",
  inLanguage: "en-BE",
})

export default function DesignArticleEnPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(150%_85%_at_50%_-15%,rgba(45,212,191,0.18),transparent_70%)]"
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
                <li className="font-medium text-slate-700">Design a 3D printable model</li>
              </ol>
            </nav>
            <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              How do you design a 3D printable model?
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Printable designs come together in five steps: the right wall thickness, proper tolerance, smart orientation, limited support and correct
              file formats. Here are our studio guidelines.
            </p>
            <div className="stacked-actions mt-6 flex flex-wrap gap-3 justify-center sm:justify-start">
              <ShimmerButton href="/en/viewer">Upload your model</ShimmerButton>
              <Link
                href="/en/services"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Design service
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {fundamentals.map((item) => (
            <Reveal key={item.title}>
              <GlassCard className="h-full border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
                <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-3 text-sm text-slate-600">{item.description}</p>
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
                {exportChecklist.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {materialGuidance.map(({ material, guidance }) => (
            <Reveal key={material}>
              <GlassCard className="h-full border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Material</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">{material}</h3>
                <p className="mt-2 text-sm text-slate-600">{guidance}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold text-slate-900">Snap-fit and assembly tips</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {snapFitTips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-slate-500">
                Combine a PLA housing with PETG clips for extra toughness. We are happy to simulate which parts need which material.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold text-slate-900">Request checklist</h2>
              <ol className="mt-4 space-y-3 text-sm text-slate-600">
                <li>1. Add STL/STEP plus a reference image.</li>
                <li>2. Mention material, colour and finish (sanding, priming, painting).</li>
                <li>3. Provide tolerance and assembly info (e.g. fits an M4 screw or PCB of X mm).</li>
                <li>4. Note deadline and delivery option: pickup Herzele, Bpost or personal delivery.</li>
              </ol>
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Let us check your design</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Within one business day we share feedback on material choice and any design tweaks for printability.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact">Request a review</ShimmerButton>
                <Link href="/en/pricing" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  View pricing
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

