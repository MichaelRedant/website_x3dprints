import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/en/blog/use-case-dinsdag-events"
const publishedDate = "2025-12-02T08:00:00+01:00"

export const metadata: Metadata = {
  title: "Use Case Tuesday #2: 3D printing for events and activations | X3DPrints",
  description:
    "Props, signage and giveaways for events. See which materials hold up under spotlights, transport and quick deadlines, plus a checklist per production run.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/use-case-dinsdag-events",
      en: canonical,
    },
  },
  openGraph: {
    title: "Use Case Tuesday #2: 3D printing for events and activations",
    description: "Material and design guidance for event props, giveaways and booth parts with short lead times.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["3D printing events", "Event props", "Use Case Tuesday"],
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "Event props and signage" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Use Case Tuesday: events & activations",
    description: "Which materials survive spotlights, transport and rush timelines? A guide for event work.",
    images: ["/images/og-home.jpg"],
  },
}

const materials = [
  { material: "PLA Matte", note: "Clean look for indoor props and logos; keep away from heat or direct sun." },
  { material: "PLA Silk/Marble/Wood", note: "Premium finishes for statues, awards and limited runs." },
  { material: "PETG Solid/Translucent", note: "Tougher props, lightboxes and parts that travel." },
  { material: "TPU", note: "Flexible parts: straps, feet, anti-rattle pads and safe giveaways." },
]

const checklist = [
  "Lead time and show date: lock machine slots early.",
  "Transport: add ribs and thick walls so parts survive courier runs.",
  "Assembly: integrate inserts for booth builds and re-use.",
  "Lighting: pick PETG Translucent for lightboxes, avoid thin PLA in heat.",
  "Finishing: only sand/paint hero pieces; keep the rest production-fast.",
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Use Case Tuesday #2: 3D printing for events and activations",
  description:
    "Practical guide to materials, finishing and planning for event props, signage and giveaways with short deadlines.",
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

export default function UseCaseEventsEnPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(170%_90%_at_50%_-15%,rgba(16,185,129,0.12),transparent_75%)]"
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
                <li className="font-medium text-slate-900">Events</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Use Case Tuesday #2</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              3D printing for events, activations and booths.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Need props that look good on camera and survive transport? This guide shows the materials, finishes and planning steps
              we use for agencies and event teams.
            </p>
            <div className="stacked-actions mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <ShimmerButton href="/en/contact?topic=use-case-events">Plan an event run</ShimmerButton>
              <Link
                href="/en/materials"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Pick materials
              </Link>
              <Link
                href="/en/portfolio"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                See recent work
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">Published 2 December 2025.</p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Material picks for events</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {materials.map((item) => (
                  <li key={item.material} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <p className="text-sm font-semibold text-slate-900">{item.material}</p>
                    <p>{item.note}</p>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Run checklist</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {checklist.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-slate-600">
                Hero pieces can be sanded or painted; we keep supporting parts production-fast to meet the event date.
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Need props or signage fast?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Share deadline, quantities and reference visuals. We will propose materials, finishing and a realistic delivery
                  schedule.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact?topic=use-case-events">Book production slot</ShimmerButton>
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

