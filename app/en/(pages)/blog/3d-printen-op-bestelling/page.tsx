import type { Metadata } from "next"
import Link from "next/link"
import BlogReadMore from "@/components/BlogReadMore"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import { buildArticleJsonLd, buildFaqPageSchema, buildHowToSchema } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/en/blog/3d-printen-op-bestelling/"
const nlCanonical = "https://www.x3dprints.be/blog/3d-printen-op-bestelling/"
const datePublished = "2024-05-20"
const dateModified = "2026-02-07"
const pricingHref = "/en/pricing?utm_source=blog&utm_medium=cta&utm_campaign=order-on-demand-en"
const materialsHref = "/en/materials#material-suggestion-tool"
const viewerHref = "/en/viewer?utm_source=blog&utm_medium=cta&utm_campaign=order-on-demand-en"
const contactHref =
  "/en/contact?material=pla-matte&quote=3D%20printing%20on%20demand%20request"

export const metadata: Metadata = {
  title: "3D printing on demand | X3DPrints",
  description:
    "Practical guide to ordering 3D prints on demand with clear intake, production planning and repeat-order workflow.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": nlCanonical,
      "en-BE": canonical,
      "x-default": nlCanonical,
    },
  },
  openGraph: {
    title: "3D printing on demand: intake to delivery",
    description:
      "Learn what to send, how planning works and how to speed up repeat orders.",
    url: canonical,
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "3D printing on demand" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printing on demand",
    description: "Order flow with intake, production milestones and delivery options.",
    images: ["/Logo.webp"],
  },
}

const tocItems = [
  { id: "order-process", label: "How does the order flow work?" },
  { id: "order-briefing", label: "What info speeds up quoting?" },
  { id: "order-repeat", label: "How do repeat orders stay efficient?" },
  { id: "order-faq", label: "FAQ about ordering" },
  { id: "order-sources", label: "Sources and references" },
]

const steps = [
  {
    title: "1. Intake with files and context",
    body: "Send STL or STEP, target quantities, deadline and use case for fast review.",
    link: { label: "Open 3D viewer", href: viewerHref },
  },
  {
    title: "2. Material route and planning",
    body: "We map material, print strategy and timing based on detail, strength and budget.",
    link: { label: "Choose material", href: materialsHref },
  },
  {
    title: "3. Production and delivery",
    body: "After approval we schedule production and confirm pickup or delivery timing.",
    link: { label: "Check pricing", href: pricingHref },
  },
]

const briefingChecklist = [
  "STL or STEP file with clear version naming",
  "Preferred material and color, or request guidance",
  "Target quantity and deadline",
  "Delivery preference: pickup, shipping or planned drop-off",
]

const repeatTips = [
  "Keep stable project naming and revision tracking.",
  "Batch smaller parts to reduce setup overhead.",
  "Store critical dimensions and tolerance notes per project.",
  "Use consistent material profiles when output consistency matters.",
]

const faqItems = [
  {
    q: "How fast do we receive a quote?",
    a: "In most cases within one business day when files and context are complete.",
  },
  {
    q: "Can we run a test print before full batch production?",
    a: "Yes. A test part is often the fastest way to validate fit and finish before scaling.",
  },
  {
    q: "How do repeat orders get faster over time?",
    a: "With stable project naming and version references, planning and setup become much faster.",
  },
]

const references = [
  {
    label: "Google Search docs: crawlable links",
    href: "https://developers.google.com/search/docs/crawling-indexing/links-crawlable",
  },
  {
    label: "All3DP FDM process explainer",
    href: "https://all3dp.com/2/fdm-3d-printing-explained/",
  },
  {
    label: "Prusa material guide",
    href: "https://help.prusa3d.com/article/material-guide_220",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "3D printing on demand",
  description:
    "Practical guide to ordering 3D prints on demand with intake, material choices and repeat-order strategy.",
  datePublished,
  dateModified,
  image: "/Logo.webp",
  inLanguage: "en-BE",
})

const faqJsonLd = buildFaqPageSchema({
  inLanguage: "en-BE",
  mainEntityOfPage: canonical,
  items: faqItems.map((item) => ({ q: item.q, a: item.a })),
})

const howToJsonLd = buildHowToSchema({
  name: "Order 3D printing on demand in 4 steps",
  description:
    "Start a 3D print order with complete intake, material alignment and delivery planning.",
  inLanguage: "en-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT3M",
  steps: [
    {
      name: "Share files and context",
      text: "Send STL or STEP, quantities, timeline and use case.",
    },
    {
      name: "Align material and planning",
      url: materialsHref,
    },
    {
      name: "Review pricing baseline",
      url: pricingHref,
    },
    {
      name: "Submit prefilled request",
      url: contactHref,
    },
  ],
  toolNames: ["Material Suggestion Tool", "X3DPrints 3D viewer"],
  supplyNames: ["STL or STEP file"],
})

export default function OrderArticleEnPage() {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-16 sm:px-8 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(130%_60%_at_50%_0%,rgba(16,185,129,.16),transparent_72%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.08]" />

      <article className="mx-auto max-w-5xl space-y-10">
        <header className="space-y-4">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link href="/en/blog" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Blog
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="font-medium text-slate-700">3D printing on demand</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">Ordering guide</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            3D printing on demand: intake to delivery
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Short version: clean intake data speeds up everything. Send the right context and your project moves faster.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
            Last updated: February 7, 2026
          </p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={contactHref}
              event={{ action: "cta_click", category: "blog_order_en_top", label: "contact_prefill" }}
            >
              Start order
            </ShimmerButton>
            <ShimmerButton
              href={materialsHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_order_en_top", label: "materials" }}
            >
              Material Suggestion Tool
            </ShimmerButton>
            <Link
              href={viewerHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              Check model in viewer
            </Link>
          </div>
          <ContentTableOfContents title="Contents" items={tocItems} className="max-w-2xl" />
        </header>

        <section id="order-process" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">How does the order flow work?</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {steps.map((step) => (
                <GlassCard key={step.title} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{step.body}</p>
                  <Link href={step.link.href} className="mt-3 inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                    {step.link.label}
                  </Link>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="order-briefing" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">What info speeds up quoting?</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {briefingChecklist.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <ShimmerButton
                  href={pricingHref}
                  event={{ action: "cta_click", category: "blog_order_en_mid", label: "pricing" }}
                >
                  Review pricing
                </ShimmerButton>
                <ShimmerButton
                  href={contactHref}
                  className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                  event={{ action: "cta_click", category: "blog_order_en_mid", label: "contact_prefill" }}
                >
                  Request quote
                </ShimmerButton>
              </div>
            </GlassCard>
          </Reveal>
        </section>

        <section id="order-repeat" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">How do repeat orders stay efficient?</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {repeatTips.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Check{" "}
                <Link href="/en/services" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  services
                </Link>{" "}
                and{" "}
                <Link href="/en/locaties" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  locations
                </Link>{" "}
                for fulfillment options.
              </p>
            </GlassCard>
          </Reveal>
        </section>

        <section id="order-faq" className="scroll-mt-28">
          <Faq title="FAQ about ordering 3D printing" items={faqItems} />
        </section>

        <section id="order-sources" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Sources and references</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {references.map((reference) => (
                  <li key={reference.href} className="rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3">
                    <cite className="not-italic">
                      <a
                        href={reference.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        {reference.label}
                      </a>
                    </cite>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </section>
      </article>

      <BlogReadMore />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
    </main>
  )
}
