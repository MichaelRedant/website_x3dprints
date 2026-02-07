import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/en/blog/use-case-dinsdag-retail-displays/"
const publishedDate = "2025-12-23T08:00:00+01:00"

export const metadata: Metadata = {
  title: "Use Case Tuesday #5: retail displays and signage | X3DPrints",
  description:
    "Retail asks for aesthetics and reliability. See which filaments fit shelves, window displays and lighted signage plus tips on mounting and transport.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/use-case-dinsdag-retail-displays/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/use-case-dinsdag-retail-displays/",
    },
  },
  openGraph: {
    title: "Use Case Tuesday #5: retail displays and signage",
    description: "Material picks and design tips for in-store displays, mounts and premium props.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["Retail displays", "Signage", "Use Case Tuesday"],
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "Retail display props" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Use Case Tuesday: retail displays",
    description: "Pick the right filament for signage, shelving props and lightboxes with reliable mounts.",
    images: ["/images/og-home.jpg"],
  },
}

const materials = [
  { name: "PLA Matte", detail: "Uniform look for logos and close-up props." },
  { name: "PLA Silk/Marble/Wood", detail: "Premium finishes for showcases and limited editions." },
  { name: "PETG Solid/Matte/Translucent", detail: "Tougher for shelves, mounts and lit elements." },
  { name: "TPU", detail: "Anti-slip feet, soft pads and vibration control." },
]

const tips = [
  "Add inserts for shelf mounts so displays can be reused.",
  "Keep wall thickness 2.4-3.0 mm on structural parts; use ribs instead of heavy infill.",
  "For window displays in sun, prefer PETG over PLA to avoid softening.",
  "Use PETG Translucent with 0.8-1.2 mm walls for light diffusion.",
  "Plan packaging: separate fragile finishes and include spare pads/feet.",
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Use Case Tuesday #5: retail displays and signage",
  description:
    "Material and design guidance for 3D printed retail displays, signage and mounts that look premium and survive stores.",
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

export default function UseCaseRetailEnPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(170%_90%_at_50%_-15%,rgba(249,115,22,0.12),transparent_75%)]"
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
                <li className="font-medium text-slate-900">Retail displays</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Use Case Tuesday #5</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Retail displays that look premium and survive the floor.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Combine premium finishes with robust mounting. This guide shows which filaments to choose and how to design displays
              that handle shop use, transport and lighting.
            </p>
            <div className="stacked-actions mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <ShimmerButton href="/en/contact?topic=use-case-retail">Plan a retail run</ShimmerButton>
              <Link
                href="/en/materials"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Pick finishes
              </Link>
              <Link
                href="/en/portfolio"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                See references
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">Published 23 December 2025.</p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Material picks</h2>
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
              <h2 className="text-2xl font-semibold text-slate-900">Design and logistics</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {tips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                    <span>{tip}</span>
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Need displays or signage?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Share dimensions, store conditions and desired finish. We will propose materials, mounting and packaging so the
                  pieces arrive show-ready.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact?topic=use-case-retail">Book production slot</ShimmerButton>
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

