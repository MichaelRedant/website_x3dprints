import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/en/blog/3d-printen-op-bestelling"

export const metadata: Metadata = {
  title: "3D printing on demand | X3DPrints",
  description:
    "How ordering 3D prints at X3DPrints works: from intake to delivery, with examples and tips for repeat orders.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/3d-printen-op-bestelling",
      en: canonical,
    },
  },
  openGraph: {
    title: "3D printing on demand: process and tips",
    description:
      "Learn how to start a 3D print order, what info we need and how we communicate about planning, updates and delivery.",
    url: canonical,
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "3D printing on demand" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printing on demand",
    description: "Step-by-step guide to ordering 3D prints from X3DPrints, including pricing, examples and follow-up.",
    images: ["/images/og-home.jpg"],
  },
}

const steps = [
  {
    title: "Request & intake",
    body: "Send STL/STEP, quantities, deadline and any reference photos. Within one business day you get feedback and a price estimate.",
    link: { label: "Upload via viewer", href: "/en/viewer" },
  },
  {
    title: "Production & updates",
    body: "After approval we schedule the print slot. You can receive email updates (photo or short video) if you like. Adjustments are possible before we start.",
    link: { label: "Check materials", href: "/en/materials" },
  },
  {
    title: "Delivery & aftercare",
    body: "Pickup in Herzele, Bpost, or personal delivery in Ghent/Aalst. Invoice + repeat number so you can reorder easily later.",
    link: { label: "Plan delivery", href: "/en/contact" },
  },
]

const reorders = [
  "We keep slicer profiles and G-code (with approval) so repeat orders stay identical.",
  "Use the order number or project name in new requests; we immediately know which settings to use.",
  "Combine several small orders into one batch for better pricing and a shorter queue.",
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",

  inLanguage: ["nl-BE", "en-BE"],
  headline: "3D printing on demand",
  description: "Explanation of the ordering process at X3DPrints: intake, production, delivery and repeat jobs.",
  author: { "@type": "Organization", name: "X3DPrints", url: "https://www.x3dprints.be" },
  publisher: {
    "@type": "Organization",
    name: "X3DPrints",
    url: "https://www.x3dprints.be",
    logo: { "@type": "ImageObject", url: "https://www.x3dprints.be/Logo.webp" },
  },
  mainEntityOfPage: canonical,
  url: canonical,
  inLanguage: "en-BE",
}

export default function OrderArticleEnPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(150%_85%_at_50%_-15%,rgba(190,24,93,0.16),transparent_70%)]"
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
                <li className="font-medium text-slate-700">3D printing on demand</li>
              </ol>
            </nav>
            <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              3D printing on demand: from briefing to delivery
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              How to organise an order at X3DPrints: what information we need, what to expect and how we make repeat jobs easier.
            </p>
            <div className="stacked-actions mt-6 flex flex-wrap gap-3 justify-center sm:justify-start">
              <ShimmerButton href="/en/contact">Start an order</ShimmerButton>
              <Link
                href="/en/pricing"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                View pricing & steps
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <Reveal key={step.title}>
              <GlassCard className="h-full border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Step</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">{step.title}</h2>
                <p className="mt-3 text-sm text-slate-600">{step.body}</p>
                <Link
                  href={step.link.href}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
                >
                  {step.link.label}
                  <span aria-hidden>-&gt;</span>
                </Link>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">What we need in your briefing</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>Files: STL/STEP plus a reference image or sketch.</li>
                <li>Material and colour preference, desired finish (raw, sanded, painted).</li>
                <li>Number of pieces and target deadline (and whether there is flexibility).</li>
                <li>Delivery option: pickup, Bpost, personal drop-off.</li>
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Repeat orders & subscriptions</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {reorders.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-slate-500">
                Idea: bundle monthly merchandising or maintenance parts in one batch. You benefit from a shorter queue and sharper pricing.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <GlassCard className="flex flex-col gap-6 border border-white/40 bg-white/85 p-6 text-center shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:text-left">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Next step</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Ready to place your order?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Within one business day you get a concrete proposal and we discuss how often you want to repeat.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact">Start an order</ShimmerButton>
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
