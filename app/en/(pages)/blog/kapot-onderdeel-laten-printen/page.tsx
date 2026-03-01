import type { Metadata } from "next"
import Link from "next/link"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"
import { buildArticleJsonLd, buildFaqPageSchema, buildHowToSchema } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/en/blog/kapot-onderdeel-laten-printen/"
const nlCanonical = "https://www.x3dprints.be/blog/kapot-onderdeel-laten-printen/"
const datePublished = "2026-03-01"
const dateModified = "2026-03-01"
const lastUpdatedLabel = "Last updated: March 1, 2026"

const contactHref =
  "/en/contact?material=PETG&quote=Broken%20part%20replacement%20-%20I%20need%20a%20functional%20copy"
const pricingHref = "/en/pricing?utm_source=blog&utm_medium=cta&utm_campaign=broken-part-replacement"
const materialsHref = "/en/materials#material-suggestion-tool"
const servicesHref = "/en/services?utm_source=blog&utm_medium=internal&utm_campaign=broken-part-replacement"
const viewerHref = "/en/viewer?utm_source=blog&utm_medium=internal&utm_campaign=broken-part-replacement"

export const metadata: Metadata = {
  title: "Broken part replacement with 3D printing | X3DPrints",
  description:
    "Need a broken part replacement? This guide covers intake, material choice, pricing baseline and fit checks for reliable 3D printed spare parts.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": nlCanonical,
      "en-BE": canonical,
      "x-default": nlCanonical,
    },
  },
  openGraph: {
    title: "Broken part replacement with 3D printing",
    description:
      "From intake to material choice: how to replace a broken part with a reliable 3D print.",
    url: canonical,
    images: [{ url: "/images/og-blog-en.svg", width: 1200, height: 630, alt: "Broken part replacement guide" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Broken part replacement with 3D printing",
    description: "Practical workflow with fit checks, material choice and pricing context.",
    images: ["/images/og-blog-en.svg"],
  },
}

const decisionCards = [
  {
    title: "OEM part no longer available",
    body:
      "When suppliers stop stocking parts, a functional FDM replacement is often the fastest route.",
    link: { href: "/en/services", label: "View 3D printing service" },
  },
  {
    title: "Faster than waiting for imports",
    body:
      "For one-offs and small batches, printing usually beats slow international sourcing.",
    link: { href: "/en/blog/3d-printen-op-bestelling", label: "Read: 3D printing on demand" },
  },
  {
    title: "Iterate before final run",
    body:
      "You can validate version 1, adjust dimensions, then lock in the final production print.",
    link: { href: "/en/blog/3d-print-offerte-aanvragen", label: "Read: request better quotes" },
  },
]

const processSteps = [
  {
    title: "1. Intake with context",
    body:
      "Share photo, dimensions, loads (heat, vibration, moisture) and mounting setup.",
  },
  {
    title: "2. File check or reverse baseline",
    body:
      "If you already have STL/STEP, we validate directly. Without files we start from practical measurements.",
  },
  {
    title: "3. Material and print strategy",
    body:
      "We select PLA, PETG or TPU based on function, then tune orientation, wall thickness and tolerance.",
  },
  {
    title: "4. Test fit and final run",
    body:
      "For critical parts we start with a fit sample, then schedule final production or a small batch.",
  },
]

const materialRows = [
  {
    material: "PLA Matte",
    bestFor: "Fast prototype fit checks and indoor parts",
    strength: "Stiff, lower heat resistance",
    when: "When speed and low cost matter most",
  },
  {
    material: "PETG",
    bestFor: "Functional parts and light outdoor use",
    strength: "Better heat/moisture behavior than PLA",
    when: "Default choice for durable replacements",
  },
  {
    material: "TPU",
    bestFor: "Dampers, soft clips, flexible fits",
    strength: "Flexible and impact-absorbing",
    when: "When bend or grip is required",
  },
]

const priceTable = [
  { type: "Small clip or holder", size: "~5x5x5 cm", baseline: "from EUR 5", leadTime: "usually 2-4 working days" },
  { type: "Bracket or cover", size: "~10x10x10 cm", baseline: "from EUR 20", leadTime: "usually 2-5 working days" },
  { type: "Larger mounting part", size: "~20x20x20 cm", baseline: "from EUR 49", leadTime: "usually 3-6 working days" },
]

const intakeChecklist = [
  "Photo of the broken part and where it mounts",
  "Rough dimensions and critical fit points (holes, clips, threads)",
  "Load profile: indoor/outdoor, heat, moisture, vibration",
  "Target deadline and quantity",
]

const relatedLinks = [
  { label: "How much does 3D printing cost?", href: "/en/blog/hoeveel-kost-3d-printen" },
  { label: "How to choose the right 3D print material", href: "/en/blog/juiste-3d-print-materiaal" },
  { label: "How long does 3D printing take?", href: "/en/blog/hoe-lang-duurt-3d-printen" },
  { label: "3D print design checklist", href: "/en/blog/3d-print-ontwerp-checklist" },
]

const faqItems = [
  {
    q: "Can I start without a 3D file?",
    a: "Yes. Photos, basic dimensions and use context are enough for an initial feasibility check.",
  },
  {
    q: "Which material is most common for replacement parts?",
    a: "PETG is usually the safe default for functional parts. PLA is faster for test fits, TPU for flexible zones.",
  },
  {
    q: "How quickly can I get a pricing indication?",
    a: "Usually within 24 hours when enough context is provided. STL/STEP speeds this up.",
  },
  {
    q: "Can you scale to a small batch after fit validation?",
    a: "Yes. Once fit is confirmed we can run a repeatable small-batch setup.",
  },
]

const references = [
  {
    label: "Prusa: filament material guide",
    href: "https://help.prusa3d.com/filament-material-guide",
  },
  {
    label: "Ultimaker: design for FFF",
    href: "https://ultimaker.com/learn/design-for-fff-3d-printing/",
  },
  {
    label: "iFixit repair guides",
    href: "https://www.ifixit.com/Guide",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "Broken part replacement with 3D printing",
  description:
    "Practical guide to replace broken parts with 3D printing using intake, material choice, price baselines and fit checks.",
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
  name: "Replace a broken part with 3D printing",
  description:
    "Move from intake to fit validation in four steps to get a reliable replacement quickly.",
  inLanguage: "en-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT5M",
  steps: [
    { name: "Share context and dimensions", text: "Send photo, dimensions and usage context." },
    { name: "Validate file or baseline model", url: viewerHref },
    { name: "Choose material and pricing route", url: pricingHref },
    { name: "Submit prefilled request", url: contactHref },
  ],
  toolNames: ["X3DPrints viewer", "Material Suggestion Tool", "X3DPrints pricing"],
  supplyNames: ["Photo or STL/STEP", "Dimensions and use context"],
})

export default function BrokenPartGuideEnPage() {
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
              <li className="font-medium text-slate-700">Broken part replacement</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">Practical problems</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Broken part replacement with 3D printing: practical workflow
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Short answer: often yes. If you share fit and load context early, a 3D printed replacement can be ready faster than waiting for traditional supply.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={contactHref}
              event={{ action: "cta_click", category: "blog_broken_part_en_top", label: "contact_prefill" }}
            >
              Start replacement intake
            </ShimmerButton>
            <ShimmerButton
              href={materialsHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_broken_part_en_top", label: "materials_tool" }}
            >
              Choose material
            </ShimmerButton>
            <Link
              href={pricingHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              View price baseline
            </Link>
          </div>
        </header>

        <BlogContentOverview locale="en" />

        <section id="when-3d-printing-makes-sense" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">When does 3D printing make sense for broken parts?</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {decisionCards.map((card) => (
                <GlassCard key={card.title} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{card.body}</p>
                  <Link href={card.link.href} className="mt-3 inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                    {card.link.label}
                  </Link>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="replacement-workflow" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Workflow: from broken to working replacement</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {processSteps.map((step) => (
                <GlassCard key={step.title} className="p-6">
                  <h3 className="text-base font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{step.body}</p>
                </GlassCard>
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-600">
              Tip: combine this with the <Link href={viewerHref} className="font-semibold text-indigo-600 hover:text-indigo-500">3D viewer</Link> and the{" "}
              <Link href="/en/blog/3d-print-ontwerp-checklist" className="font-semibold text-indigo-600 hover:text-indigo-500">
                design checklist
              </Link>{" "}
              to prevent avoidable fit issues.
            </p>
          </Reveal>
        </section>

        <section id="material-choice-for-spare-parts" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Material choice for spare parts</h2>
            <p className="mt-2 text-slate-700">
              Start from function, not color. For practical replacements, PETG is often the baseline, as also explained in our{" "}
              <Link href="/en/blog/juiste-3d-print-materiaal" className="font-semibold text-indigo-600 hover:text-indigo-500">
                material selection guide
              </Link>
              .
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200/70 bg-white/80">
              <table className="min-w-full text-left text-sm text-slate-700">
                <caption className="sr-only">Material options for broken part replacement</caption>
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Material</th>
                    <th className="px-4 py-3">Best for</th>
                    <th className="px-4 py-3">Property</th>
                    <th className="px-4 py-3">When to choose</th>
                  </tr>
                </thead>
                <tbody>
                  {materialRows.map((row) => (
                    <tr key={row.material} className="border-t border-slate-200/60">
                      <td className="px-4 py-3 font-semibold text-slate-900">{row.material}</td>
                      <td className="px-4 py-3">{row.bestFor}</td>
                      <td className="px-4 py-3">{row.strength}</td>
                      <td className="px-4 py-3">{row.when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        <section id="price-and-lead-time-snapshot" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Price snapshot and lead times</h2>
            <p className="mt-2 text-slate-700">
              These are planning ranges aligned with the current{" "}
              <Link href="/en/pricing" className="font-semibold text-indigo-600 hover:text-indigo-500">
                pricing page
              </Link>
              . Final quotes depend on file quality and use context.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200/70 bg-white/80">
              <table className="min-w-full text-left text-sm text-slate-700">
                <caption className="sr-only">Indicative pricing for broken part replacement</caption>
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Part type</th>
                    <th className="px-4 py-3">Size</th>
                    <th className="px-4 py-3">Baseline price</th>
                    <th className="px-4 py-3">Typical lead time</th>
                  </tr>
                </thead>
                <tbody>
                  {priceTable.map((row) => (
                    <tr key={row.type} className="border-t border-slate-200/60">
                      <td className="px-4 py-3 font-semibold text-slate-900">{row.type}</td>
                      <td className="px-4 py-3">{row.size}</td>
                      <td className="px-4 py-3">{row.baseline}</td>
                      <td className="px-4 py-3">{row.leadTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        <section id="what-to-send" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">What should you send for fast intake?</h2>
            <GlassCard className="mt-4 p-6">
              <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
                {intakeChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                For deeper context, these existing guides connect directly with this workflow:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {relatedLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="font-semibold text-indigo-600 hover:text-indigo-500">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </section>

        <section id="faq-broken-part" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">FAQ about broken part replacement</h2>
            <div className="mt-4">
              <Faq items={faqItems} />
            </div>
          </Reveal>
        </section>

        <section id="sources" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Sources</h2>
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
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Want us to assess your broken part today?</h2>
              <p className="mt-2 text-slate-700">
                Share photo or STL/STEP and context. You get clear feedback on feasibility, material route and pricing baseline.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <ShimmerButton
                  href={contactHref}
                  event={{ action: "cta_click", category: "blog_broken_part_en_bottom", label: "contact_prefill" }}
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
