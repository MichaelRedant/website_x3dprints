import type { Metadata } from "next"
import Link from "next/link"
import BlogReadMore from "@/components/BlogReadMore"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import { buildArticleJsonLd, buildFaqPageSchema, buildHowToSchema } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/en/blog/3d-printen-in-de-buurt/"
const nlCanonical = "https://www.x3dprints.be/blog/3d-printen-in-de-buurt/"
const datePublished = "2024-07-01"
const dateModified = "2026-02-08"
const lastUpdatedLabel = "Last updated: 8 February 2026"
const contactHref =
  "/en/contact?material=pla-matte&quote=Local%203D%20printing%20project%20request"
const pricingHref = "/en/pricing?utm_source=blog&utm_medium=cta&utm_campaign=local-3d-printing-en"
const locatiesHref = "/en/locaties?utm_source=blog&utm_medium=cta&utm_campaign=local-3d-printing-en"

export const metadata: Metadata = {
  title: "Local 3D printing near Ghent, Aalst and Dendermonde | X3DPrints",
  description:
    "Local 3D printing service from Herzele for 3D printing Gent, Aalst and Dendermonde projects, including 3D model print checks, pickup and delivery.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": nlCanonical,
      "en-BE": canonical,
      "x-default": nlCanonical,
    },
  },
  openGraph: {
    title: "Local 3D printing: Ghent, Aalst and Dendermonde",
    description:
      "See how local production, pickup and delivery work for fast project execution.",
    url: canonical,
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "Local 3D printing" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Local 3D printing near you",
    description: "Short project loops with local production and clear delivery options.",
    images: ["/Logo.webp"],
  },
}

const tocItems = [
  { id: "local-cities", label: "Which regions does this cover?" },
  { id: "local-workflow", label: "How does local collaboration work?" },
  { id: "local-logistics", label: "Which delivery options are available?" },
  { id: "local-faq", label: "FAQ about local 3D printing" },
  { id: "local-sources", label: "Sources and references" },
]

const cityCards = [
  {
    city: "Ghent",
    info: "Useful for agencies, makers and schools where 3D printing Gent projects need short feedback loops.",
    examples: "Retail displays, campaign props and student project parts.",
  },
  {
    city: "Aalst",
    info: "Short distance from Herzele with easy part batching and quick pickups.",
    examples: "Functional components, assembly helpers and custom tooling.",
  },
  {
    city: "Dendermonde",
    info: "Regular route planning plus shipping options when that fits better.",
    examples: "Campaign assets, prototypes and short-run batches.",
  },
]

const processSteps = [
  "Send STL or STEP with context and target deadline.",
  "Get material, timing and budget guidance within one business day.",
  "Choose pickup, shipping or scheduled drop-off.",
  "Reuse setup for repeat work and consistent output.",
]

const logisticsRows = [
  {
    option: "Pickup",
    speed: "Fastest once the batch is ready",
    note: "Best for local iterations and quick review cycles.",
  },
  {
    option: "Shipping",
    speed: "Depends on courier lead time",
    note: "Useful when physical pickup is less practical.",
  },
  {
    option: "Scheduled drop-off",
    speed: "Aligned with project timing",
    note: "Good for larger campaign batches and multi-box orders.",
  },
]

const faqItems = [
  {
    q: "Can local rush projects be scheduled quickly?",
    a: "Yes. With complete intake data and clean files we can usually schedule fast.",
  },
  {
    q: "What is the main benefit of local collaboration?",
    a: "Faster alignment, shorter communication loops and lower delivery uncertainty.",
  },
  {
    q: "Can recurring deliveries be planned?",
    a: "Yes. For repeat projects we can align recurring delivery windows with your workflow.",
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
    href: "https://help.prusa3d.com/filament-material-guide",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "Local 3D printing near Ghent, Aalst and Dendermonde",
  description: metadata.description ?? "",
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
  name: "Start a local 3D printing project in 4 steps",
  description:
    "Launch a local project with fast intake, material alignment and delivery planning.",
  inLanguage: "en-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT3M",
  steps: [
    {
      name: "Share file and context",
      text: "Send STL or STEP with a short project brief and deadline.",
    },
    {
      name: "Align material route",
      url: "/en/materials#material-suggestion-tool",
    },
    {
      name: "Review pricing and delivery",
      url: pricingHref,
    },
    {
      name: "Submit local request with prefill",
      url: contactHref,
    },
  ],
  toolNames: ["Material Suggestion Tool", "X3DPrints 3D viewer"],
  supplyNames: ["STL or STEP file"],
})

export default function LocalArticleEnPage() {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-16 sm:px-8 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_0%,rgba(99,102,241,.18),transparent_72%)]"
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
              <li className="font-medium text-slate-700">Local 3D printing</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">Local service</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Local 3D printing: Ghent, Aalst and Dendermonde
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Local production shortens feedback cycles. Fast alignment from briefing to delivery saves calendar time, from 3D model print validation to shipping 3D print parts.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
            Last updated: February 7, 2026
          </p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={contactHref}
              event={{ action: "cta_click", category: "blog_local_en_top", label: "contact_prefill" }}
            >
              Start local project
            </ShimmerButton>
            <ShimmerButton
              href="/en/materials#material-suggestion-tool"
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_local_en_top", label: "materials" }}
            >
              Material Suggestion Tool
            </ShimmerButton>
            <Link
              href={locatiesHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              View locations
            </Link>
          </div>
          <ContentTableOfContents title="Contents" items={tocItems} className="max-w-2xl" />
        </header>

        <section id="local-cities" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Which regions does this cover?</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {cityCards.map((card) => (
                <GlassCard key={card.city} className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{card.city}</p>
                  <p className="mt-2 text-sm text-slate-700">{card.info}</p>
                  <p className="mt-2 text-xs text-slate-500">Examples: {card.examples}</p>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="local-workflow" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">How does local collaboration work?</h2>
              <ol className="mt-4 space-y-2 text-sm text-slate-700">
                {processSteps.map((step, index) => (
                  <li key={step} className="flex items-start gap-2">
                    <span className="font-semibold text-slate-900">{index + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
                          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-5 flex flex-wrap gap-3">
                <ShimmerButton
                  href={pricingHref}
                  event={{ action: "cta_click", category: "blog_local_en_mid", label: "pricing" }}
                >
                  Review pricing
                </ShimmerButton>
                <ShimmerButton
                  href={contactHref}
                  className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                  event={{ action: "cta_click", category: "blog_local_en_mid", label: "contact_prefill" }}
                >
                  Request quote
                </ShimmerButton>
              </div>
            </GlassCard>
          </Reveal>
        </section>

        <section id="local-logistics" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Which delivery options are available?</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-[520px] text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200/70 text-slate-500">
                      <th className="py-2 pr-4 font-semibold">Option</th>
                      <th className="py-2 pr-4 font-semibold">Speed</th>
                      <th className="py-2 pr-4 font-semibold">Guideline</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logisticsRows.map((row) => (
                      <tr key={row.option} className="border-b border-slate-200/70 last:border-0">
                        <td className="py-2 pr-4 font-medium text-slate-900">{row.option}</td>
                        <td className="py-2 pr-4">{row.speed}</td>
                        <td className="py-2 pr-4">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Also check{" "}
                <Link href="/en/services" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  services
                </Link>{" "}
                and{" "}
                <Link href="/en/portfolio" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  portfolio
                </Link>{" "}
                for local use cases.
              </p>
            </GlassCard>
          </Reveal>
        </section>

        <section id="local-faq" className="scroll-mt-28">
          <Faq title="FAQ about local 3D printing" items={faqItems} />
        </section>

        <section id="local-sources" className="scroll-mt-28">
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


