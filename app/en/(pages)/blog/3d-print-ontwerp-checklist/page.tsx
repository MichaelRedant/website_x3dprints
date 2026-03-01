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

const canonical = "https://www.x3dprints.be/en/blog/3d-print-ontwerp-checklist/"
const datePublished = "2026-02-08"
const dateModified = "2026-02-09"
const materialsHref =
  "/en/materials?utm_source=blog&utm_medium=cta&utm_campaign=design-checklist#material-suggestion-tool"
const pricingHref = "/en/pricing?utm_source=blog&utm_medium=cta&utm_campaign=design-checklist"
const viewerHref = "/en/viewer?utm_source=blog&utm_medium=cta&utm_campaign=design-checklist"
const contactHref = "/en/contact?material=pla-tough&quote=Design%20check%20for%203D%20print"
const designGuideHref =
  "/en/blog/3d-print-ontwerp-gids?utm_source=blog&utm_medium=internal&utm_campaign=design-checklist"

export const metadata: Metadata = {
  title: "3D print design checklist: print-ready model | X3DPrints",
  description:
    "Design checklist for print-ready 3D models: wall thickness, overhang, tolerances and assembly. Includes a reference table and quick CTAs.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/3d-print-ontwerp-checklist/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/3d-print-ontwerp-checklist/",
    },
  },
  openGraph: {
    title: "3D print design checklist: print-ready model",
    description:
      "Checklist with reference values for wall thickness, overhang, tolerance and assembly so your model prints cleanly.",
    url: canonical,
    images: [{ url: "/images/og-blog-en.svg", width: 1200, height: 630, alt: "3D print design checklist" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D print design checklist: print-ready model",
    description: "Make your model print-ready with this design checklist.",
    images: ["/images/og-blog-en.svg"],
  },
}

const checklistItems = [
  {
    title: "Wall thickness & ribs",
    description:
      "Use consistent walls and add ribs where loads increase. This prevents delamination.",
  },
  {
    title: "Overhangs & support",
    description:
      "Keep overhangs to ±55° so prints stay faster and cleaner.",
  },
  {
    title: "Tolerances & fit",
    description:
      "Add extra clearance for moving parts or they will fuse together.",
  },
  {
    title: "Holes & fastening",
    description:
      "Slightly oversize holes and plan inserts or screws where the part must work.",
  },
  {
    title: "Orientation & show surface",
    description:
      "Place the show surface upward and keep seams on hidden zones for a premium look.",
  },
  {
    title: "Assembly & batching",
    description:
      "Split large models, add alignment pins and plan parts that must arrive together in one batch.",
  },
]

const guidelineRows = [
  {
    label: "Minimum wall thickness",
    plaPetg: "≥ 1.2 mm",
    tpu: "≥ 2.0 mm",
    reason: "Keeps walls stable and prevents break lines.",
  },
  {
    label: "Overhang without support",
    plaPetg: "≤ 55°",
    tpu: "≤ 45°",
    reason: "Limits sagging and post-processing.",
  },
  {
    label: "Clearance for moving parts",
    plaPetg: "0.2–0.4 mm",
    tpu: "0.4–0.6 mm",
    reason: "Prevents jammed hinges or clips.",
  },
  {
    label: "Hole compensation",
    plaPetg: "+0.2–0.3 mm",
    tpu: "+0.4–0.5 mm",
    reason: "Ensures bolts and pins fit smoothly.",
  },
  {
    label: "Rib thickness",
    plaPetg: "0.6–1.0 mm",
    tpu: "1.0–1.4 mm",
    reason: "Extra stiffness without excessive weight.",
  },
]

const assemblyTips = [
  "Split large parts and add alignment pins for quick alignment.",
  "Use heat-set inserts or captive nuts for repeatable assembly.",
  "Plan test prints of critical interfaces to validate fit.",
  "Bundle parts that must arrive together in one quote.",
]

const faqItems = [
  {
    q: "What is the fastest way to avoid print issues?",
    a: "Use the checklist: correct wall thickness, limited overhangs, enough clearance and clear orientation.",
  },
  {
    q: "When should I choose PLA Tough+ instead of PETG?",
    a: "PLA Tough+ is ideal for indoor prototypes and stiff clamps. PETG performs better with UV, moisture and heat.",
  },
  {
    q: "How much clearance do I need for moving parts?",
    a: "For PLA/PETG use 0.2–0.4 mm, for TPU 0.4–0.6 mm depending on scale.",
  },
  {
    q: "Can you review my design?",
    a: "Yes. Send your STL/STEP via the viewer and mention your use case for tailored advice.",
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
  headline: "3D print design checklist: print-ready model",
  description:
    "Design checklist with wall thickness, overhang and tolerance guidance so your model is print-ready.",
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
  name: "3D print design check in 4 steps",
  description: "Check wall thickness, overhang, tolerances and assembly for a print-ready model.",
  inLanguage: "en-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT4M",
  steps: [
    {
      name: "Check wall thickness and ribs",
      text: "Ensure walls are thick enough and reinforce where needed.",
    },
    {
      name: "Review overhangs and supports",
      text: "Limit overhangs or add supports where required.",
    },
    {
      name: "Set clearance and fit",
      text: "Add sufficient clearance for moving parts.",
    },
    {
      name: "Plan assembly and quote",
      url: contactHref,
    },
  ],
  toolNames: ["X3DPrints 3D viewer", "Material Suggestion Tool"],
  supplyNames: ["STL or STEP file"],
})

export default function BlogDesignChecklistEnPage() {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-16 sm:px-8 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_0%,rgba(16,185,129,.18),transparent_70%)]"
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
              <li className="font-medium text-slate-700">Design checklist</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">Design checklist</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            3D print design checklist: print-ready model
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Short answer: a print-ready model has consistent walls, limited overhangs, correct tolerances and a clear
            assembly strategy. Use this checklist to avoid reprints and plan faster.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
            Last updated: 9 February 2026
          </p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={viewerHref}
              event={{ action: "cta_click", category: "blog_design_checklist_top", label: "viewer" }}
            >
              Upload your model
            </ShimmerButton>
            <ShimmerButton
              href={materialsHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_design_checklist_top", label: "materials_tool" }}
            >
              Pick material
            </ShimmerButton>
            <Link
              href={pricingHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              Check pricing
            </Link>
          </div>
        </header>

        <BlogContentOverview locale="en" />

        <section id="ontwerp-checklist" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">The 6 checks for print-ready models</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {checklistItems.map((item) => (
                <GlassCard key={item.title} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{item.description}</p>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="ontwerp-tabel" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Reference values in one table</h2>
              <p className="mt-2 text-sm text-slate-600">
                These are starting values for FDM prints. We refine them based on scale, nozzle and use case.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-[720px] text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200/70 text-slate-500">
                      <th className="py-2 pr-4 font-semibold">Check</th>
                      <th className="py-2 pr-4 font-semibold">PLA/PETG</th>
                      <th className="py-2 pr-4 font-semibold">TPU</th>
                      <th className="py-2 pr-4 font-semibold">Why</th>
                    </tr>
                  </thead>
                  <tbody>
                    {guidelineRows.map((row) => (
                      <tr key={row.label} className="border-b border-slate-200/70 last:border-0">
                        <td className="py-2 pr-4 font-medium text-slate-900">{row.label}</td>
                        <td className="py-2 pr-4">{row.plaPetg}</td>
                        <td className="py-2 pr-4">{row.tpu}</td>
                        <td className="py-2 pr-4">{row.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Unsure? Use the{" "}
                <Link href={materialsHref} className="font-semibold text-emerald-600 hover:text-emerald-700">
                  Material Suggestion Tool
                </Link>{" "}
                or request a design check.
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Need more detail? Read the{" "}
                <Link href={designGuideHref} className="font-semibold text-emerald-600 hover:text-emerald-700">
                  3D print design guide
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>
        </section>

        <section id="ontwerp-assemblage" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Assembly and repeatability</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {assemblyTips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <ShimmerButton
                  href={contactHref}
                  event={{ action: "cta_click", category: "blog_design_checklist_mid", label: "contact_prefill" }}
                >
                  Request design check
                </ShimmerButton>
                <ShimmerButton
                  href={viewerHref}
                  className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                  event={{ action: "cta_click", category: "blog_design_checklist_mid", label: "viewer" }}
                >
                  Upload file
                </ShimmerButton>
              </div>
            </GlassCard>
          </Reveal>
        </section>

        <section id="ontwerp-faq" className="scroll-mt-28">
          <Faq title="FAQ about 3D print design" items={faqItems} />
        </section>

        <section id="ontwerp-sources" className="scroll-mt-28">
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
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Ready to get your design checked?</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Send your file and we will give targeted feedback on wall thickness, supports and material choice.
                </p>
              </div>
              <ShimmerButton
                href={contactHref}
                event={{ action: "cta_click", category: "blog_design_checklist_bottom", label: "contact_prefill" }}
              >
                Start design check
              </ShimmerButton>
            </GlassCard>
          </Reveal>
        </section>
      </article>

      <ReadMoreLinks pageType="services" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <BlogAuthorNote locale="en" />
    </main>
  )
}
