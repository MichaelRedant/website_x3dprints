import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/en/blog/use-case-dinsdag-stem/"
const publishedDate = "2026-01-13T08:00:00+01:00"

export const metadata: Metadata = {
  title: "Use Case Tuesday #7: 3D printing for STEM and labs | X3DPrints",
  description:
    "Prints for STEM labs and makerspaces: fixtures, housings and teaching tools. Material advice, tolerance hints and how to plan batches for workshops.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/use-case-dinsdag-stem/",
      en: canonical,
      "x-default": "https://www.x3dprints.be/blog/use-case-dinsdag-stem/",
    },
  },
  openGraph: {
    title: "Use Case Tuesday #7: 3D printing for STEM and labs",
    description: "Robust parts for STEM activities with predictable fits and clear safety choices.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["STEM 3D printing", "Education", "Use Case Tuesday"],
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "STEM 3D printing parts" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Use Case Tuesday: STEM & labs",
    description: "Plan sturdy, classroom-friendly 3D prints for STEM sessions.",
    images: ["/images/og-home.jpg"],
  },
}

const materials = [
  { name: "PLA Matte", detail: "Low-odour, clean look for teaching tools and demo parts." },
  { name: "PETG", detail: "Tougher for jigs, fixtures and housings that see real use." },
  { name: "TPU", detail: "Soft pads, grips and dampers for lab gear." },
]

const tips = [
  "Share the critical fits; we apply Maker Monday tolerance tables for predictable assemblies.",
  "Use rounded edges for safety and to speed up printing.",
  "Bundle models by material to avoid unnecessary spool changes during workshops.",
  "Add labels or engraved text for kit organisation.",
  "Prefer PETG for anything that will be handled roughly or exposed to mild heat.",
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Use Case Tuesday #7: 3D printing for STEM and labs",
  description:
    "Material picks and planning tips for STEM and lab prints with reliable tolerances and classroom-safe finishes.",
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

export default function UseCaseStemEnPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(170%_90%_at_50%_-15%,rgba(59,130,246,0.14),transparent_75%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.08]" />

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
                <li className="font-medium text-slate-700">Use Case Tuesday</li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-900">STEM & labs</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Use Case Tuesday #7</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Sturdy 3D prints for STEM and lab sessions.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Fixtures, housings, grips or demo parts: choose the right filament and tolerances so everything fits first time and
              survives hands-on use.
            </p>
            <div className="stacked-actions mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <ShimmerButton href="/en/contact?topic=use-case-stem">Plan a STEM batch</ShimmerButton>
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
            <p className="mt-6 text-sm text-slate-500">Published 13 January 2026.</p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Material choices</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {materials.map((material) => (
                  <li key={material.name} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <p className="text-sm font-semibold text-slate-900">{material.name}</p>
                    <p>{material.detail}</p>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Planning and safety tips</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {tips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-slate-600">
                Need multiple copies? We can keep profiles locked and repeat batches so every student gets identical parts.
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Need STEM kits printed?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Share files and timelines. We will confirm fits, materials and delivery per class or workshop.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact?topic=use-case-stem">Book production slot</ShimmerButton>
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

