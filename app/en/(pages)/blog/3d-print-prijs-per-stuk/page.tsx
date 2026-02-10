import type { Metadata } from "next"
import Link from "next/link"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import ReadMoreLinks from "@/components/ReadMoreLinks"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import { buildArticleJsonLd, buildFaqPageSchema, buildHowToSchema } from "@/lib/seo"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"

const canonical = "https://www.x3dprints.be/en/blog/3d-print-prijs-per-stuk/"
const datePublished = "2026-02-08"
const dateModified = "2026-02-09"
const pricingHref = "/en/pricing?utm_source=blog&utm_medium=cta&utm_campaign=price-per-part"
const materialsHref = "/en/materials?utm_source=blog&utm_medium=cta&utm_campaign=price-per-part#material-suggestion-tool"
const viewerHref = "/en/viewer?utm_source=blog&utm_medium=cta&utm_campaign=price-per-part"
const contactHref = "/en/contact?material=pla-matte&quote=Price%20per%20part%20for%20my%203D%20print"
const pricingGuideHref =
  "/en/blog/3d-print-prijzen-gids?utm_source=blog&utm_medium=internal&utm_campaign=price-per-part"

export const metadata: Metadata = {
  title: "3D print price per part: single vs batch | X3DPrints",
  description:
    "3D print price per part depends on setup, print time and scale. See a table with price ranges and tips to lower your cost per part.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/3d-print-prijs-per-stuk/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/3d-print-prijs-per-stuk/",
    },
  },
  openGraph: {
    title: "3D print price per part: single vs batch",
    description:
      "Price ranges per part, explanation of the cost blocks and tips to optimise your 3D printing budget.",
    url: canonical,
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "3D print price per part" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D print price per part: single vs batch",
    description: "Price per part explained with a table and optimisation tips.",
    images: ["/Logo.webp"],
  },
}

const costBlocks = [
  {
    title: "Setup & slicing",
    description:
      "Intake, slicer settings and support strategy take time, especially for prototypes or new geometry.",
  },
  {
    title: "Print time",
    description:
      "The biggest driver: layer height, infill and supports determine machine hours.",
  },
  {
    title: "Material",
    description:
      "PLA is the baseline. PETG, TPU or PC raise the price per part because of higher spool cost.",
  },
  {
    title: "Post-processing & QA",
    description:
      "Support removal, light finishing and quality checks count for every batch.",
  },
  {
    title: "Logistics",
    description:
      "Pickup is the most cost-efficient option. Shipping or custom delivery increases the total.",
  },
]

const priceRows = [
  {
    label: "1 part (prototype)",
    setup: "EUR 10-15",
    print: "EUR 10-15",
    material: "EUR 3-6",
    total: "EUR 25-35",
  },
  {
    label: "10 parts",
    setup: "EUR 2-4 / part",
    print: "EUR 8-12",
    material: "EUR 3-5",
    total: "EUR 13-21",
  },
  {
    label: "50 parts",
    setup: "EUR 1-2 / part",
    print: "EUR 7-10",
    material: "EUR 3-5",
    total: "EUR 11-17",
  },
]

const optimizationTips = [
  "Bundle parts in one batch to share setup costs.",
  "Choose layer height based on visible surfaces, not ultra-fine everywhere.",
  "Use PLA Matte as the baseline and switch to PETG/TPU only when needed.",
  "Share your deadline for efficient planning and fewer rush fees.",
]

const faqItems = [
  {
    q: "Why is a single part relatively expensive?",
    a: "Setup and planning happen once, so the fixed cost lands on a single piece.",
  },
  {
    q: "When does the price per part drop noticeably?",
    a: "Typically from 5-10 parts, because setup and material processing become more efficient.",
  },
  {
    q: "Can I save material to print cheaper?",
    a: "Yes. Less support, smart orientation and lower infill reduce cost.",
  },
  {
    q: "Can you simulate a price per part?",
    a: "Yes. Use the pricing calculator or send your file for an exact analysis.",
  },
]

const references = [
  {
    label: "PrusaSlicer G-code viewer (print time)",
    href: "https://help.prusa3d.com/article/g-code-viewer_78984",
  },
  {
    label: "Ultimaker: Design for FFF 3D printing",
    href: "https://ultimaker.com/learn/design-for-fff-3d-printing/",
  },
  {
    label: "Prusa material guide (PLA, PETG, TPU)",
    href: "https://help.prusa3d.com/filament-material-guide",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "3D print price per part: single vs batch",
  description:
    "Breakdown of setup costs, print time and scale with a table for price per part and optimisation tips.",
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
  name: "Calculate price per part in 4 steps",
  description: "Calculate your price per part with the right inputs and scale advantages.",
  inLanguage: "en-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT4M",
  steps: [
    {
      name: "Define quantity and deadline",
      text: "Share the number of parts and the desired schedule.",
    },
    {
      name: "Choose material and finish",
      url: materialsHref,
    },
    {
      name: "Analyse print time and supports",
      url: viewerHref,
    },
    {
      name: "Request a price estimate",
      url: contactHref,
    },
  ],
  toolNames: ["Pricing calculator", "Material Suggestion Tool"],
  supplyNames: ["STL or STEP file"],
})

export default function BlogPricePerPieceEnPage() {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-16 sm:px-8 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_0%,rgba(56,189,248,.18),transparent_70%)]"
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
              <li className="font-medium text-slate-700">Price per part</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">Pricing guide</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            3D print price per part: single vs batch
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Short answer: the more pieces you print, the lower the price per part. Setup and planning stay mostly the
            same, while material and print time benefit from scale. Use this table and tips to steer your budget fast.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
            Last updated: 9 February 2026
          </p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={pricingHref}
              event={{ action: "cta_click", category: "blog_prijs_per_stuk_top", label: "pricing" }}
            >
              Open pricing calculator
            </ShimmerButton>
            <ShimmerButton
              href={materialsHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_prijs_per_stuk_top", label: "materials_tool" }}
            >
              Pick material
            </ShimmerButton>
            <Link
              href={contactHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              Request quote
            </Link>
          </div>
        </header>

        <BlogContentOverview locale="en" />

        <section id="prijs-blokken" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Which cost blocks shape the price per part?</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {costBlocks.map((block) => (
                <GlassCard key={block.title} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{block.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{block.description}</p>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="prijs-tabel" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">What does scale do to price per part?</h2>
              <p className="mt-2 text-sm text-slate-600">
                Indicative ranges for an average part. Exact prices follow after slicer analysis.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-[720px] text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200/70 text-slate-500">
                      <th className="py-2 pr-4 font-semibold">Quantity</th>
                      <th className="py-2 pr-4 font-semibold">Setup</th>
                      <th className="py-2 pr-4 font-semibold">Print time</th>
                      <th className="py-2 pr-4 font-semibold">Material</th>
                      <th className="py-2 pr-4 font-semibold">Indicative per-part price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {priceRows.map((row) => (
                      <tr key={row.label} className="border-b border-slate-200/70 last:border-0">
                        <td className="py-2 pr-4 font-medium text-slate-900">{row.label}</td>
                        <td className="py-2 pr-4">{row.setup}</td>
                        <td className="py-2 pr-4">{row.print}</td>
                        <td className="py-2 pr-4">{row.material}</td>
                        <td className="py-2 pr-4 font-semibold text-slate-900">{row.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                For live simulations you can always use the{" "}
                <Link href={pricingHref} className="font-semibold text-emerald-600 hover:text-emerald-700">
                  pricing calculator
                </Link>
                .
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Want the full breakdown? Read the{" "}
                <Link href={pricingGuideHref} className="font-semibold text-emerald-600 hover:text-emerald-700">
                  3D print pricing guide
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>
        </section>

        <section id="prijs-optimalisatie" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">How do you lower the price per part?</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {optimizationTips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <ShimmerButton
                  href={viewerHref}
                  event={{ action: "cta_click", category: "blog_prijs_per_stuk_mid", label: "viewer" }}
                >
                  Upload file
                </ShimmerButton>
                <ShimmerButton
                  href={contactHref}
                  className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                  event={{ action: "cta_click", category: "blog_prijs_per_stuk_mid", label: "contact_prefill" }}
                >
                  Request quote
                </ShimmerButton>
              </div>
            </GlassCard>
          </Reveal>
        </section>

        <section id="prijs-faq" className="scroll-mt-28">
          <Faq title="FAQ about 3D print price per part" items={faqItems} />
        </section>

        <section id="prijs-sources" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 id="sources" className="text-2xl font-semibold text-slate-900">Sources and references</h2>
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

        <section>
          <Reveal>
            <GlassCard className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Next step</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Ready to know your price per part?</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Send your file and quantities for an exact price estimate.
                </p>
              </div>
              <ShimmerButton
                href={contactHref}
                event={{ action: "cta_click", category: "blog_prijs_per_stuk_bottom", label: "contact_prefill" }}
              >
                Start quote
              </ShimmerButton>
            </GlassCard>
          </Reveal>
        </section>
      </article>

      <ReadMoreLinks pageType="pricing" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <BlogAuthorNote locale="en" />
    </main>
  )
}
