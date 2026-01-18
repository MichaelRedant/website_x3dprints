import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/en/blog/maker-monday-snapfits"
const publishedDate = "2025-11-24T08:00:00+01:00"

export const metadata: Metadata = {
  title: "Maker Monday #4: snap-fit clips that do not break | X3DPrints",
  description:
    "Design rules for snap-fit clips in PLA, PETG and TPU. Arm thickness, length, fillets and tolerances so clips keep clicking instead of snapping.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/maker-monday-snapfits",
      en: canonical,
    },
  },
  openGraph: {
    title: "Maker Monday #4: snap-fit clips that do not break",
    description: "Practical snap-fit guidance: dimensions, materials and test protocol for reliable clips.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["Maker Monday", "Snap-fit design", "FDM design"],
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "Snap-fit design" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maker Monday #4: snap-fit clips that do not break",
    description: "Arm sizing, fillets and tolerances for PLA, PETG and TPU snap-fits.",
    images: ["/images/og-home.jpg"],
  },
}

const rules = [
  "Use PETG for most clips; PLA is brittle, TPU for soft catches.",
  "Arm thickness: PLA 2.0-2.4 mm, PETG 2.4-3.0 mm, TPU 3.0+ mm with fillets.",
  "Add 0.15-0.30 mm clearance on the latch depending on material.",
  "Round every corner: fillets of 0.8-2.0 mm at bases and latch tips.",
  "Orient arms so they flex along layer lines, not across them.",
]

const testPlan = [
  "Print a small coupon with the intended clip dimensions.",
  "Check insertion force by hand; adjust clearance before full batch.",
  "Run at least 10 open/close cycles to watch for whitening or cracks.",
  "Use elephant's foot compensation to avoid tight first layers.",
  "For decorative parts, consider PLA Matte with PETG core clip.",
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Maker Monday #4: snap-fit clips that do not break",
  description:
    "Snap-fit design guidance for PLA, PETG and TPU clips with practical dimensions, clearances and a quick test protocol.",
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

export default function MakerMondaySnapfitsEnPage() {
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
                <li className="font-medium text-slate-900">Snap-fits</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Maker Monday #4</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Snap-fit clips that keep clicking instead of snapping.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Snap-fits fail when arms are too thin, tolerances too tight or when layer lines take all the stress. Use these rules of
              thumb to design clips that survive repeated cycles.
            </p>
            <div className="stacked-actions mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <ShimmerButton href="/en/contact?topic=maker-monday-snapfits">Request clip review</ShimmerButton>
              <Link
                href="/en/blog/maker-monday-snapfit-parts"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Deep dive on snap-fit parts
              </Link>
              <Link
                href="/en/materials"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Pick the right material
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">Published 24 November 2025.</p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl grid gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Design rules</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {rules.map((rule) => (
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
              <h2 className="text-2xl font-semibold text-slate-900">Test quickly before production</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {testPlan.map((step) => (
                  <li key={step} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                    <span>{step}</span>
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Need a clip tuned?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Share the use case and we will tune arm thickness, tolerances and material so your clip survives real use.
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <BlogReadMore />
    </main>
  )
}

