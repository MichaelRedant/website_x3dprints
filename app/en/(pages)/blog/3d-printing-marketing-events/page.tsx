import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/en/blog/3d-printing-marketing-events"

export const metadata: Metadata = {
  title: "3D printing for marketing & events | X3DPrints Blog",
  description:
    "Discover how 3D printing amplifies campaigns: props, awards and merch with short lead times. Includes planning tips, material advice and KPI ideas.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/3d-printing-marketing-events",
      en: canonical,
    },
  },
  openGraph: {
    title: "3D printing for marketing & events",
    description: "Guide for marketers to use 3D printing strategically: from briefing to logistics and measurement.",
    url: canonical,
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "3D printing marketing props" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printing for marketing & events",
    description: "Plan eye-catching props and awards with a local 3D print partner. Tips on timing, materials and ROI.",
    images: ["/images/og-home.jpg"],
  },
}

const personaHighlights = [
  {
    title: "Brand & campaign managers",
    copy:
      "Small, targeted runs for activations, roadshows or launches. Think awards, photobooth props, sampling tools and premium leave-behinds that make your brand story tangible.",
  },
  {
    title: "Event agencies",
    copy: "Modular builds for pop-ups and trade fairs. Replaceable parts when venues differ, rapid iterations between shows.",
  },
  {
    title: "Content teams",
    copy: "Hero props for shoots and UGC campaigns. Lightweight pieces that travel well and match your colour palette.",
  },
]

const planningTips = [
  {
    title: "Briefing",
    detail:
      "Share brand colours (HEX/RGB), desired look (matte, silk, translucent), quantities and reuse expectations. Add a moodboard to speed up design choices.",
  },
  {
    title: "Timing",
    detail:
      "Standard PLA/PETG props ship within days. Allow extra buffer for paint/finishing or modular builds. Batch by colour to save time.",
  },
  {
    title: "Logistics",
    detail:
      "EV delivery in zones near Herzele or parcel service. Fragile parts ship in foam with labels. Consider spares for events that tour.",
  },
]

const kpiIdeas = [
  "Track UGC posts/mentions that include the prop",
  "Measure dwell time/engagement at the booth with/without the prop",
  "Include QR/NFC to connect offline prop to campaign landing",
  "Calculate cost per impression vs. traditional print items",
]

const materialSuggestions = [
  {
    title: "PLA Matte / Silk",
    body: "Clean look for awards, nameplates, photo props. Silk for high gloss; Matte for premium, soft finish.",
  },
  {
    title: "Translucent PLA",
    body: "Great for light-through effects, logos with LEDs, or glowing podium elements.",
  },
  {
    title: "PETG / TPU",
    body: "PETG for parts that travel or face heat; TPU for soft-touch grips or flexible clips in modular builds.",
  },
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "3D printing for marketing & events",
  description:
    "How to use 3D printing for marketing and events: props, awards, merch, with planning, materials, logistics and KPIs.",
  author: { "@type": "Organization", name: "X3DPrints" },
  publisher: {
    "@type": "Organization",
    name: "X3DPrints",
    logo: { "@type": "ImageObject", url: "https://www.x3dprints.be/Logo.webp" },
  },
  mainEntityOfPage: canonical,
  url: canonical,
  image: "https://www.x3dprints.be/images/og-home.jpg",
  inLanguage: "en-BE",
}

export default function MarketingEventsBlogEn() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_-10%,rgba(99,102,241,0.12),transparent_65%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.07]" />

      <section className="px-6 pb-12 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">Use cases</p>
            <h1 className="mt-2 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              3D printing for marketing & events
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Plan props, awards and merch with short lead times. Align on brand colours, finish and logistics so your campaign assets arrive ready to go.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/en/contact?topic=marketing-events">Plan a campaign prop</ShimmerButton>
              <Link
                href="/en/segments/3d-printing-marketing"
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                View marketing segment
              </Link>
              <Link
                href="/en/pricing"
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                See pricing
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Who benefits most?</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {personaHighlights.map((persona) => (
                  <div key={persona.title} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <p className="text-sm font-semibold text-slate-900">{persona.title}</p>
                    <p className="mt-2 text-sm text-slate-600">{persona.copy}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl grid gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Planning playbook</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {planningTips.map((tip) => (
                  <li key={tip.title} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                    <span>
                      <strong>{tip.title}:</strong> {tip.detail}
                    </span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.06}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Materials that work for events</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                {materialSuggestions.map((item) => (
                  <div key={item.title}>
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-1">{item.body}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Measure impact</h2>
              <p className="mt-2 text-sm text-slate-600">
                Tie props to campaign KPIs so you can defend budget next quarter.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {kpiIdeas.map((idea) => (
                  <li key={idea} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                    <span>{idea}</span>
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Want a prop ready for your next event?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Share your STL/STEP or a reference. We will propose materials, timing and delivery so you can brief stakeholders with confidence.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact?topic=marketing-events">Plan my prop</ShimmerButton>
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
