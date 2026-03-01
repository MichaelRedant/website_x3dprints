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

const canonical = "https://www.x3dprints.be/en/blog/3d-print-kosten-besparen/"
const datePublished = "2026-02-08"
const dateModified = "2026-02-09"
const pricingHref = "/en/pricing?utm_source=blog&utm_medium=cta&utm_campaign=save-costs"
const materialsHref = "/en/materials?utm_source=blog&utm_medium=cta&utm_campaign=save-costs#material-suggestion-tool"
const viewerHref = "/en/viewer?utm_source=blog&utm_medium=cta&utm_campaign=save-costs"
const contactHref = "/en/contact?material=pla-matte&quote=Cost%20optimisation%20for%20my%203D%20print"
const pricingGuideHref =
  "/en/blog/3d-print-prijzen-gids?utm_source=blog&utm_medium=internal&utm_campaign=save-costs"

export const metadata: Metadata = {
  title: "Save 3D print costs: 7 smart optimisations | X3DPrints",
  description:
    "Save on 3D print costs with smart choices in model, material and batching. Includes an impact table and quick links to pricing.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/3d-print-kosten-besparen/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/3d-print-kosten-besparen/",
    },
  },
  openGraph: {
    title: "Save 3D print costs: 7 smart optimisations",
    description:
      "Impact table and practical tips to lower your 3D printing budget.",
    url: canonical,
    images: [{ url: "/images/og-blog-en.svg", width: 1200, height: 630, alt: "Save 3D print costs" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Save 3D print costs: 7 smart optimisations",
    description: "Optimisations to lower your 3D printing budget.",
    images: ["/images/og-blog-en.svg"],
  },
}

const costLevers = [
  {
    title: "Model geometry",
    description:
      "Fewer supports, better orientation and fewer overhangs save print time and post-processing.",
  },
  {
    title: "Print settings",
    description:
      "Layer height and infill do not need to be maxed out everywhere. That saves hours and material.",
  },
  {
    title: "Material choice",
    description:
      "PLA Matte is the baseline profile. Choose PETG or TPU only when functionally required.",
  },
  {
    title: "Batching & planning",
    description:
      "Printing multiple parts together lowers setup cost and makes planning more efficient.",
  },
]

const optimizationRows = [
  {
    label: "Minimise supports",
    impact: "High",
    effort: "Medium",
    tip: "Avoid overhangs above 55° and use chamfers.",
  },
  {
    label: "Choose layer height smartly",
    impact: "High",
    effort: "Low",
    tip: "Use 0.2 mm where detail is not visible.",
  },
  {
    label: "Limit infill",
    impact: "Medium",
    effort: "Low",
    tip: "Use 10-20% infill unless the part is load-bearing.",
  },
  {
    label: "Batch prints",
    impact: "Medium",
    effort: "Low",
    tip: "Combine parts that must arrive together.",
  },
  {
    label: "Baseline material",
    impact: "Medium",
    effort: "Low",
    tip: "Start with PLA Matte and upgrade only when needed.",
  },
]

const quickWins = [
  "Share STL or STEP with a clear orientation so we can minimise supports.",
  "Pick one material for the full batch to avoid swaps.",
  "Bundle small parts so the machine can keep running in one job.",
  "Use the pricing calculator to see impact immediately.",
]

const faqItems = [
  {
    q: "What is the fastest way to lower costs?",
    a: "Reduce supports and pick a lower layer height where the visible surface allows it.",
  },
  {
    q: "When does batching pay off?",
    a: "From a few pieces onward the setup cost per part drops. You notice it most at 5+ pieces.",
  },
  {
    q: "Can I print cheaper with a different material?",
    a: "PLA Matte is the most budget-friendly. PETG and TPU cost more due to longer print time.",
  },
  {
    q: "Can you adjust the model to lower costs?",
    a: "Yes. We can propose design tweaks such as chamfers, ribs or support-friendly splits.",
  },
]

const references = [
  {
    label: "Ultimaker: Design for FFF 3D printing",
    href: "https://ultimaker.com/learn/design-for-fff-3d-printing/",
  },
  {
    label: "Prusa material guide (PLA, PETG, TPU)",
    href: "https://help.prusa3d.com/filament-material-guide",
  },
  {
    label: "Bambu Studio documentation",
    href: "https://wiki.bambulab.com/en/software/bambu-studio",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "Save 3D print costs: 7 smart optimisations",
  description:
    "Practical levers to reduce 3D printing costs with an impact table and quick wins.",
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
  name: "Reduce 3D print costs in 4 steps",
  description: "Lower your 3D printing cost by optimising geometry, settings and batching.",
  inLanguage: "en-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT4M",
  steps: [
    {
      name: "Minimise supports",
      text: "Avoid steep overhangs and use chamfers where possible.",
    },
    {
      name: "Optimise print settings",
      text: "Adjust layer height and infill based on visible surfaces.",
    },
    {
      name: "Confirm material choice",
      url: materialsHref,
    },
    {
      name: "Batch parts and request a quote",
      url: contactHref,
    },
  ],
  toolNames: ["Pricing calculator", "Material Suggestion Tool"],
  supplyNames: ["STL or STEP file", "Quantities"],
})

export default function BlogSaveCostsEnPage() {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-16 sm:px-8 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_0%,rgba(99,102,241,.18),transparent_70%)]"
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
              <li className="font-medium text-slate-700">Save costs</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">Pricing guide</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Save 3D print costs: 7 smart optimisations
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Short answer: cut costs by reducing supports, choosing smart layer heights and batching parts. This checklist
            shows the biggest levers so you can get a sharper price faster.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
            Last updated: 9 February 2026
          </p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={pricingHref}
              event={{ action: "cta_click", category: "blog_kosten_top", label: "pricing" }}
            >
              Open pricing calculator
            </ShimmerButton>
            <ShimmerButton
              href={materialsHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_kosten_top", label: "materials_tool" }}
            >
              Pick material
            </ShimmerButton>
            <Link
              href={viewerHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              Upload your model
            </Link>
          </div>
        </header>

        <BlogContentOverview locale="en" />

        <section id="kosten-hefbomen" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Which levers set your cost?</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {costLevers.map((lever) => (
                <GlassCard key={lever.title} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{lever.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{lever.description}</p>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="kosten-tabel" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Impact per optimisation in one table</h2>
              <p className="mt-2 text-sm text-slate-600">
                Focus on levers with high impact and low effort for quick savings.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-[720px] text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200/70 text-slate-500">
                      <th className="py-2 pr-4 font-semibold">Optimisation</th>
                      <th className="py-2 pr-4 font-semibold">Impact</th>
                      <th className="py-2 pr-4 font-semibold">Effort</th>
                      <th className="py-2 pr-4 font-semibold">Tip</th>
                    </tr>
                  </thead>
                  <tbody>
                    {optimizationRows.map((row) => (
                      <tr key={row.label} className="border-b border-slate-200/70 last:border-0">
                        <td className="py-2 pr-4 font-medium text-slate-900">{row.label}</td>
                        <td className="py-2 pr-4">{row.impact}</td>
                        <td className="py-2 pr-4">{row.effort}</td>
                        <td className="py-2 pr-4">{row.tip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Use the{" "}
                <Link href={pricingHref} className="font-semibold text-emerald-600 hover:text-emerald-700">
                  pricing calculator
                </Link>{" "}
                to simulate impact.
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

        <section id="kosten-quickwins" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Quick wins for lower costs</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {quickWins.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <ShimmerButton
                  href={viewerHref}
                  event={{ action: "cta_click", category: "blog_kosten_mid", label: "viewer" }}
                >
                  Upload file
                </ShimmerButton>
                <ShimmerButton
                  href={contactHref}
                  className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                  event={{ action: "cta_click", category: "blog_kosten_mid", label: "contact_prefill" }}
                >
                  Request quote
                </ShimmerButton>
              </div>
            </GlassCard>
          </Reveal>
        </section>

        <section id="kosten-faq" className="scroll-mt-28">
          <Faq title="FAQ about saving 3D print costs" items={faqItems} />
        </section>

        <section id="kosten-sources" className="scroll-mt-28">
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
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Ready to optimise your costs?</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Send your file and receive a sharp price with optimisation advice.
                </p>
              </div>
              <ShimmerButton
                href={contactHref}
                event={{ action: "cta_click", category: "blog_kosten_bottom", label: "contact_prefill" }}
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
