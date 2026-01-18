import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/en/blog/use-case-dinsdag-interieur"
const publishedDate = "2025-12-09T08:00:00+01:00"

export const metadata: Metadata = {
  title: "Use Case Tuesday #3: 3D printing for interior and decor | X3DPrints",
  description:
    "How to use 3D printing for interior pieces: vases, lighting, wall accents and custom fixtures. Material finishes, sizing tips and when to combine with other crafts.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/use-case-dinsdag-interieur",
      en: canonical,
    },
  },
  openGraph: {
    title: "Use Case Tuesday #3: 3D printing for interior and decor",
    description: "Finishes and materials for interior objects with a premium look, plus assembly and finishing guidance.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["Interior 3D printing", "Decor objects", "Use Case Tuesday"],
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "Interior decor 3D prints" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Use Case Tuesday: interior & decor",
    description: "Material and finish picks for premium interior 3D prints.",
    images: ["/images/og-home.jpg"],
  },
}

const finishes = [
  { name: "PLA Matte", detail: "Soft, powdery look with low layer visibility. Great for close-up pieces and wall accents." },
  { name: "PLA Marble/Wood", detail: "Adds natural texture for statues, planters and warm decor." },
  { name: "PLA Silk+", detail: "High sheen for statement pieces, awards or lighting accents." },
  { name: "PETG Translucent", detail: "For light diffusers and lamp shades that need heat resistance." },
]

const assembly = [
  "Plan wall thickness (2.0-2.4 mm for decor, 2.4-3.0 mm if load-bearing).",
  "Hide layer seams on less visible faces; orient for the best viewing angle.",
  "Integrate inserts or keyholes for mounting instead of printing fragile hooks.",
  "If painting, start from PLA Matte at 0.16 mm layers to minimise sanding.",
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Use Case Tuesday #3: 3D printing for interior and decor",
  description:
    "Material and finish guidance for premium interior and decor objects, including assembly and mounting tips.",
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

export default function UseCaseInteriorEnPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(170%_90%_at_50%_-15%,rgba(147,51,234,0.12),transparent_75%)]"
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
                <li className="font-medium text-slate-900">Interior</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Use Case Tuesday #3</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Premium interior pieces with 3D printing.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              From lamp shades to wall art and custom fixtures: pick the right finish and mounting approach so pieces look intentional
              and last.
            </p>
            <div className="stacked-actions mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <ShimmerButton href="/en/contact?topic=use-case-interior">Plan an interior piece</ShimmerButton>
              <Link
                href="/en/materials"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Pick a finish
              </Link>
              <Link
                href="/en/portfolio"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                View projects
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">Published 9 December 2025.</p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Finishes that feel premium</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {finishes.map((finish) => (
                  <li key={finish.name} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <p className="text-sm font-semibold text-slate-900">{finish.name}</p>
                    <p>{finish.detail}</p>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Assembly and mounting tips</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {assembly.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-slate-600">
                Need light diffusion? PETG Translucent with a 0.8-1.2 mm wall works well for shades; keep bulbs LED and cool.
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Working on a concept?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Send sketches or STL/STEP. We will propose the best finish, wall thickness and mounting hardware for a premium
                  result.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact?topic=use-case-interior">Book an interior run</ShimmerButton>
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

