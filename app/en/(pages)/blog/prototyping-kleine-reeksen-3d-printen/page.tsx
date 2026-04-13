import type { Metadata } from "next"
import Link from "next/link"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"
import { buildArticleJsonLd, buildFaqPageSchema, buildHowToSchema } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/en/blog/prototyping-kleine-reeksen-3d-printen/"
const nlCanonical = "https://www.x3dprints.be/blog/prototyping-kleine-reeksen-3d-printen/"
const datePublished = "2026-03-01"
const dateModified = "2026-04-12"
const lastUpdatedLabel = "Last updated: April 12, 2026"

const contactHref =
  "/en/contact?material=PETG&quote=B2B%20prototyping%20and%20small%20batch%20-%20I%20need%20fast%20iterations"
const pricingHref =
  "/en/pricing?utm_source=blog&utm_medium=cta&utm_campaign=prototyping-small-batch-3d-printing"
const materialsHref = "/en/materials#material-suggestion-tool"
const servicesHref =
  "/en/services?utm_source=blog&utm_medium=internal&utm_campaign=prototyping-small-batch-3d-printing"
const viewerHref =
  "/en/viewer?utm_source=blog&utm_medium=internal&utm_campaign=prototyping-small-batch-3d-printing"

export const metadata: Metadata = {
  title: "B2B prototyping and small-batch 3D printing | X3DPrints",
  description:
    "From prototype to Short production run: practical B2B guide with phase planning, material choices, pricing ranges and intake for fast iterations.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": nlCanonical,
      "en-BE": canonical,
      "x-default": nlCanonical,
    },
  },
  openGraph: {
    title: "B2B prototyping and small-batch runs",
    description:
      "Practical workflow for product validation and small-batch scaling with 3D printing.",
    url: canonical,
    images: [{ url: "/images/og-blog-en.svg", width: 1200, height: 630, alt: "B2B prototyping and small-batch runs" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "B2B prototyping and small-batch runs",
    description: "Guide for faster iterations, material choices and controlled scaling.",
    images: ["/images/og-blog-en.svg"],
  },
}

const whyCards = [
  {
    title: "Fast iteration without tooling lock-in",
    body:
      "You can validate multiple versions before investing in expensive tooling or fixed production setups.",
    href: "/en/blog/use-case-dinsdag-productontwikkeling",
    label: "Read product development use-case",
  },
  {
    title: "Move from test to Short production run",
    body:
      "After fit and function validation, scale to Short production runs with repeatable settings.",
    href: "/en/blog/3d-print-prijs-per-stuk",
    label: "Read price per part",
  },
  {
    title: "Works for B2B teams",
    body:
      "R&D, engineering and marketing teams use this flow for validation parts, fixtures and pilot batches.",
    href: "/en/segments/3d-printing-prototypes",
    label: "View prototype segment",
  },
]

const phaseRows = [
  {
    phase: "Phase 1 - concept validation",
    goal: "Validate shape and fit quickly",
    material: "PLA Matte",
    output: "1-3 test parts",
  },
  {
    phase: "Phase 2 - functional testing",
    goal: "Validate load, mounting and durability",
    material: "PETG / TPU",
    output: "Small test batch",
  },
  {
    phase: "Phase 3 - Short production run",
    goal: "Repeatable production and planning",
    material: "Use-case based",
    output: "10-100 units (indicative)",
  },
]

const setupChecklist = [
  "Define clear pass/fail criteria per phase",
  "Use strict version naming (v1, v2, v3)",
  "Document settings of the approved iteration",
  "Plan the transition from prototype to pilot batch upfront",
]

const pricingRows = [
  { type: "Prototype run", qty: "1-3 units", range: "from EUR 5/unit", leadTime: "2-4 working days" },
  { type: "Validation batch", qty: "5-20 units", range: "geometry dependent", leadTime: "3-6 working days" },
  { type: "Short production run", qty: "20-100 units", range: "volume dependent", leadTime: "planned slot" },
]

const relatedLinks = [
  { label: "Use Case Tuesday: product development", href: "/en/blog/use-case-dinsdag-productontwikkeling" },
  { label: "Case: custom race bike headset spacer", href: "/en/blog/use-case-dinsdag-headset-spacer-racefiets" },
  { label: "3D printing pricing guide", href: "/en/blog/3d-print-prijzen-gids" },
  { label: "How to choose the right material", href: "/en/blog/juiste-3d-print-materiaal" },
  { label: "How to request a quote", href: "/en/blog/3d-print-offerte-aanvragen" },
]

const faqItems = [
  {
    q: "When should you move from prototype to Short production run?",
    a: "Once fit, function and material choice are stable. Then scaling with fixed settings is most efficient.",
  },
  {
    q: "Which materials are common in B2B flows?",
    a: "PLA Matte for fast concept checks, PETG for functional parts, TPU for flexible sections.",
  },
  {
    q: "How fast can we get a proposal?",
    a: "Usually within 24 hours with clear context and STL/STEP files.",
  },
  {
    q: "Can you run mixed variants in one project?",
    a: "Yes, if intake context and versioning stay structured.",
  },
]

const references = [
  { label: "Prusa filament material guide", href: "https://help.prusa3d.com/filament-material-guide" },
  { label: "Ultimaker design for FFF", href: "https://ultimaker.com/learn/design-for-fff-3d-printing/" },
  { label: "ISO/ASTM additive manufacturing terminology", href: "https://www.astm.org/f2792-12a.html" },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "B2B prototyping and small-batch 3D printing",
  description:
    "Practical guide for B2B teams moving from prototype to Short production run with phased planning and material choices.",
  datePublished,
  dateModified,
  image: "/images/og-blog-en.svg",
  inLanguage: "en-BE",
})

const faqJsonLd = buildFaqPageSchema({
  inLanguage: "en-BE",
  mainEntityOfPage: canonical,
  items: faqItems.map((item) => ({ q: item.q, a: item.a })),
})

const howToJsonLd = buildHowToSchema({
  name: "Move from prototype to Short production run with 3D printing",
  description: "Use a phased workflow to iterate quickly and scale in a controlled way.",
  inLanguage: "en-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT5M",
  steps: [
    { name: "Define phase goals", text: "Set pass/fail criteria for concept and fit validation." },
    { name: "Select material per phase", url: materialsHref },
    { name: "Validate files and variants", url: viewerHref },
    { name: "Start prefilled intake", url: contactHref },
  ],
  toolNames: ["X3DPrints viewer", "Material Suggestion Tool", "X3DPrints pricing"],
  supplyNames: ["STL/STEP", "Versioning", "Test criteria"],
})

export default function PrototypingSmallBatchGuideEnPage() {
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
              <li className="font-medium text-slate-700">B2B prototyping and Short production runs</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">B2B use-cases</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            B2B prototyping and small-batch 3D printing
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Short answer: work in phases. Validate quickly first, run functional tests second, then scale to a Short production run with stable settings.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={contactHref}
              event={{ action: "cta_click", category: "blog_proto_batch_en_top", label: "contact_prefill" }}
            >
              Start B2B intake
            </ShimmerButton>
            <ShimmerButton
              href={materialsHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_proto_batch_en_top", label: "materials_tool" }}
            >
              Choose material
            </ShimmerButton>
            <Link
              href={pricingHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              View price range
            </Link>
          </div>
        </header>

        <BlogContentOverview locale="en" />

        <section id="why-b2b-prototyping" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Why this works for B2B teams</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {whyCards.map((card) => (
                <GlassCard key={card.title} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{card.body}</p>
                  <Link href={card.href} className="mt-3 inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                    {card.label}
                  </Link>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="prototyping-phases" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Phased workflow: prototype to Short production run</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200/70 bg-white/80">
              <table className="min-w-full text-left text-sm text-slate-700">
                <caption className="sr-only">Phased workflow for B2B prototyping and small-batch runs</caption>
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Phase</th>
                    <th className="px-4 py-3">Goal</th>
                    <th className="px-4 py-3">Material</th>
                    <th className="px-4 py-3">Output</th>
                  </tr>
                </thead>
                <tbody>
                  {phaseRows.map((row) => (
                    <tr key={row.phase} className="border-t border-slate-200/60">
                      <td className="px-4 py-3 font-semibold text-slate-900">{row.phase}</td>
                      <td className="px-4 py-3">{row.goal}</td>
                      <td className="px-4 py-3">{row.material}</td>
                      <td className="px-4 py-3">{row.output}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        <section id="small-batch-setup" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">How to set up a stable Short production run</h2>
            <GlassCard className="mt-4 p-6">
              <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
                {setupChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Running multiple variants? Use the{" "}
                <Link href={viewerHref} className="font-semibold text-indigo-600 hover:text-indigo-500">
                  viewer
                </Link>{" "}
                and keep version control strict.
              </p>
            </GlassCard>
          </Reveal>
        </section>

        <section id="cost-and-planning" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Cost and planning snapshot</h2>
            <p className="mt-2 text-slate-700">
              Planning ranges only. Final pricing depends on geometry, material and number of variants.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200/70 bg-white/80">
              <table className="min-w-full text-left text-sm text-slate-700">
                <caption className="sr-only">Pricing ranges for B2B prototyping and small-batch runs</caption>
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Quantity</th>
                    <th className="px-4 py-3">Price range</th>
                    <th className="px-4 py-3">Lead time</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingRows.map((row) => (
                    <tr key={row.type} className="border-t border-slate-200/60">
                      <td className="px-4 py-3 font-semibold text-slate-900">{row.type}</td>
                      <td className="px-4 py-3">{row.qty}</td>
                      <td className="px-4 py-3">{row.range}</td>
                      <td className="px-4 py-3">{row.leadTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        <section id="faq-prototyping" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">FAQ</h2>
            <div className="mt-4">
              <Faq items={faqItems} />
            </div>
          </Reveal>
        </section>

        <section id="sources" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Sources and references</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {references.map((reference) => (
                <li key={reference.href} className="rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3">
                  <cite className="not-italic">
                    <Link href={reference.href} target="_blank" rel="noreferrer" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      {reference.label}
                    </Link>
                  </cite>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">Next step</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Want to launch a prototype or pilot run?</h2>
              <p className="mt-2 text-slate-700">
                Share phase goals and available files. You get a focused proposal for materials, planning and pricing.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <ShimmerButton
                  href={contactHref}
                  event={{ action: "cta_click", category: "blog_proto_batch_en_bottom", label: "contact_prefill" }}
                >
                  Start intake
                </ShimmerButton>
                <Link
                  href={servicesHref}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
                >
                  View service flow
                </Link>
              </div>
              <div className="mt-4 text-sm text-slate-600">
                Continue reading:{" "}
                {relatedLinks.map((item, index) => (
                  <span key={item.href}>
                    <Link href={item.href} className="font-semibold text-indigo-600 hover:text-indigo-500">
                      {item.label}
                    </Link>
                    {index < relatedLinks.length - 1 ? ", " : "."}
                  </span>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </section>
      </article>

      <BlogAuthorNote locale="en" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
    </main>
  )
}
