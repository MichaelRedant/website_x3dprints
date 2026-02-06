import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"
import { buildArticleJsonLd } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/en/blog/hoe-lang-duurt-3d-printen/"
const datePublished = "2024-09-15"
const dateModified = "2026-02-04"

export const metadata: Metadata = {
  title: "How long does 3D printing take? | X3DPrints",
  description:
    "Typical 3D printing lead times from rush to planned batches. See what drives turnaround and how to speed up your job with better files, materials and logistics.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/hoe-lang-duurt-3d-printen/",
      en: canonical,
      "x-default": "https://www.x3dprints.be/blog/hoe-lang-duurt-3d-printen/",
    },
  },
  openGraph: {
    title: "How long does 3D printing take?",
    description:
      "Understand what impacts 3D printing lead time: machine hours, queueing, finishing and shipping. Includes rush tips.",
    url: canonical,
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "How long does 3D printing take" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "How long does 3D printing take?",
    description: "Lead time guide for 3D printing with practical rush tips and planning advice.",
    images: ["/images/og-home.jpg"],
  },
}

const factors = [
  {
    title: "Machine hours",
    description:
      "Layer height, infill and part volume steer pure print time. A small prototype can finish within an hour, while large housings may run across multiple shifts.",
  },
  {
    title: "Queue & preparation",
    description:
      "We batch jobs per material to reduce changeovers. If you share complete files and context up front, your project enters the queue faster.",
  },
  {
    title: "Finishing",
    description:
      "Sanding, assembly or packaging add calendar time. Tell us if raw prints are fine so we can tune the planning accordingly.",
  },
  {
    title: "Logistics",
    description:
      "Pickup in Herzele is fastest. Bpost and personal deliveries are flexible: we will propose the quickest option that fits your budget.",
  },
]

const rushTips = [
  "Send multiple variants in one batch so we can cluster machine hours efficiently.",
  "Pick stocked PLA Matte or PETG colours to avoid delays from material deliveries.",
  "Tell us which parts are critical. We can prioritise those and ship the rest later.",
]

const faq = [
  {
    q: "Can you deliver within 24 hours?",
    a: "Yes for small parts in standard PLA. We plan a rush slot and you pick up in Herzele or we deliver at a surcharge.",
  },
  {
    q: "What slows a project down the most?",
    a: "Missing context (tolerances/finishing), special materials that must be ordered, or extensive finishing such as primer and paint.",
  },
  {
    q: "Can I estimate print time myself?",
    a: "Use the Small/Medium/Large guide prices on the pricing page. For exact timing we need your STL to generate slicer data.",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "How long does 3D printing take?",
  description:
    "Lead time guide for 3D printing: what impacts turnaround, indicative timelines and how to secure rush capacity.",
  datePublished,
  dateModified,
  image: "/images/portfolio/20241030_080710-1.jpg",
  inLanguage: "en-BE",
})

export default function BlogLeadTimesEnPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(160%_90%_at_50%_-20%,rgba(99,102,241,0.18),transparent_75%)]"
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
                <li className="font-medium text-slate-700">3D printing lead times</li>
              </ol>
            </nav>
            <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              How long does 3D printing take?
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Turnaround ranges from express (raw prints within 24 hours) to several weeks (large batches with finishing). Below you will see what
              influences lead time and how to get your project into the queue faster. We print from Herzele (Ghent area) and ship across Belgium—Bpost export to EU/UK on request.
            </p>
            <div className="stacked-actions mt-6 flex flex-wrap gap-3 justify-center sm:justify-start">
              <ShimmerButton href="/en/pricing">View guide prices & timing</ShimmerButton>
              <Link
                href="/en/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Plan delivery
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {factors.map((factor) => (
            <Reveal key={factor.title}>
              <GlassCard className="h-full border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
                <h2 className="text-xl font-semibold text-slate-900">{factor.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{factor.description}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Indicative planning</h2>
              <p className="mt-3 text-sm text-slate-600">
                File checks usually happen the same business day. After that the project is scheduled. Smaller prints are often ready within a few
                days; larger batches or special materials require more buffer. We review your deadline together and reserve machine hours based on
                complexity.
              </p>
              <p className="mt-3 text-xs text-slate-500">
                Tip: send STL/STEP plus context in one go so we avoid extra feedback rounds and can move to production faster.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold text-slate-900">Need it sooner? Do this.</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {rushTips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold text-slate-900">Frequently asked questions</h2>
              <div className="mt-4 space-y-4 text-sm text-slate-600">
                {faq.map((item) => (
                  <div key={item.q}>
                    <h3 className="text-base font-semibold text-slate-900">{item.q}</h3>
                    <p className="mt-1">{item.a}</p>
                  </div>
                ))}
              </div>
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Schedule or rush?</h2>
                <p className="mt-2 text-sm text-slate-600">Share your deadline and we will immediately reserve machine hours or a rush slot.</p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact">Schedule my project</ShimmerButton>
                <Link href="/en/pricing" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Check lead times
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

