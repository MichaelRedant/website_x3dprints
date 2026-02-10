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

const canonical = "https://www.x3dprints.be/en/blog/3d-print-ontwerp-gids/"
const datePublished = "2026-02-09"
const dateModified = "2026-02-09"
const viewerHref = "/en/viewer?utm_source=blog&utm_medium=cta&utm_campaign=design-guide"
const materialsHref =
  "/en/materials?utm_source=blog&utm_medium=cta&utm_campaign=design-guide#material-suggestion-tool"
const contactHref = "/en/contact?material=pla-matte&quote=Design%20check%20for%20my%203D%20print"

export const metadata: Metadata = {
  title: "3D print design guide 2026: from CAD to print | X3DPrints",
  description:
    "Complete 3D print design guide with design rules, tolerances and workflow. Includes checklist, table and direct links to the viewer and material tool.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/3d-print-ontwerp-gids/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/3d-print-ontwerp-gids/",
    },
  },
  openGraph: {
    title: "3D print design guide 2026",
    description:
      "Design rules, tolerance table and workflow to turn CAD models into printable parts.",
    url: canonical,
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "3D print design guide" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D print design guide 2026",
    description: "Design rules, tolerances and workflow for printable CAD.",
    images: ["/Logo.webp"],
  },
}

const designRules = [
  {
    title: "Wall thickness & ribs",
    description:
      "Build strength with sufficient wall thickness and ribbing. Avoid thin walls on functional parts.",
    link: { href: "/en/blog/maker-monday-wanddiktes-ribs", label: "Read wall thickness guide" },
  },
  {
    title: "Tolerances & fit",
    description:
      "Moving parts need clearance. Account for nozzle width and elephant’s foot.",
    link: { href: "/en/blog/maker-monday-toleranties-3d-printen", label: "Read tolerance guide" },
  },
  {
    title: "Orientation & supports",
    description:
      "Orient parts to keep visible surfaces clean and supports minimal. This saves time and cost.",
    link: { href: "/en/viewer", label: "Check in viewer" },
  },
  {
    title: "Assemblies",
    description:
      "Design parts that are easy to split and assemble, especially for larger prints.",
    link: { href: "/en/blog/3d-print-assemblage-gids", label: "Read assembly guide" },
  },
]

const toleranceRows = [
  {
    situation: "Sliding fit (PLA/PETG)",
    clearance: "0.2-0.3 mm",
    tip: "Use chamfers to compensate elephant’s foot.",
  },
  {
    situation: "Snap-fit or clip",
    clearance: "0.3-0.5 mm",
    tip: "Round corners and test with a small sample print.",
  },
  {
    situation: "Hinge/pin",
    clearance: "0.25-0.35 mm",
    tip: "Orient the pin horizontally for stronger layers.",
  },
  {
    situation: "Heat-set insert",
    clearance: "-0.2 mm vs insert",
    tip: "Use a chamfer and press the insert in while hot.",
  },
]

const workflowSteps = [
  "Start with functional requirements (strength, heat, flexibility).",
  "Model with print orientation in mind to reduce overhangs.",
  "Export STEP for iterations and STL for final slicing.",
  "Check your file in the viewer and plan a test print for critical fits.",
]

const checklistLinks = [
  { label: "3D print design checklist", href: "/en/blog/3d-print-ontwerp-checklist" },
  { label: "Design a printable 3D model", href: "/en/blog/ontwerp-3d-printbaar-model" },
  { label: "3D print assembly guide", href: "/en/blog/3d-print-assemblage-gids" },
]

const faqItems = [
  {
    q: "Which file formats work best?",
    a: "STL is standard for slicing, but STEP is ideal when changes are still expected.",
  },
  {
    q: "How big should a test print be?",
    a: "Focus on critical zones: clips, hinges or mounts. A small test piece saves cost.",
  },
  {
    q: "Can X3DPrints review my design?",
    a: "Yes. We do a quick design review and share advice on wall thickness, orientation and material.",
  },
  {
    q: "What is the biggest cause of failed prints?",
    a: "Thin walls and heavy overhangs without support. A quick viewer check prevents this.",
  },
]

const references = [
  {
    label: "Ultimaker: Design for FFF 3D printing",
    href: "https://ultimaker.com/learn/design-for-fff-3d-printing/",
  },
  {
    label: "Prusa: Print settings in PrusaSlicer",
    href: "https://help.prusa3d.com/category/print-settings_204",
  },
  {
    label: "Bambu Lab wiki: model preparation",
    href: "https://wiki.bambulab.com/en/software/studio",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "3D print design guide 2026",
  description:
    "Design rules, tolerance table and workflow to make CAD models printable.",
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
  name: "Make a 3D printable design in 4 steps",
  description: "From CAD to print: the core steps to avoid errors and reprints.",
  inLanguage: "en-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT6M",
  steps: [
    {
      name: "Define function and material",
      text: "Set strength, heat and look requirements to pick the right design rules.",
    },
    {
      name: "Model with orientation in mind",
      text: "Place critical surfaces to minimise supports.",
    },
    {
      name: "Check in the viewer",
      url: viewerHref,
    },
    {
      name: "Request a design review",
      url: contactHref,
    },
  ],
  toolNames: ["3D viewer", "Material Suggestion Tool"],
  supplyNames: ["STL or STEP file"],
})

export default function BlogDesignGuideEnPage() {
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
              <li className="font-medium text-slate-700">3D print design guide</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">Design pillar</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            3D print design guide: from CAD to printable model
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Print-ready design depends on wall thickness, orientation and tolerances. This guide gives you design rules,
            tables and a workflow to avoid reprints and ship faster.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
            Last updated: 9 February 2026
          </p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={viewerHref}
              event={{ action: "cta_click", category: "blog_design_guide_top", label: "viewer" }}
            >
              Check your model
            </ShimmerButton>
            <ShimmerButton
              href={materialsHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_design_guide_top", label: "materials_tool" }}
            >
              Pick material
            </ShimmerButton>
            <Link
              href={contactHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              Request design review
            </Link>
          </div>
        </header>

        <BlogContentOverview locale="en" />

        <section id="design-rules" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Design rules that make the difference</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {designRules.map((rule) => (
                <GlassCard key={rule.title} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{rule.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{rule.description}</p>
                  <Link
                    href={rule.link.href}
                    className="mt-3 inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    {rule.link.label}
                  </Link>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="design-tolerances" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Tolerance table at a glance</h2>
              <p className="mt-2 text-sm text-slate-600">
                Start with these values and refine them based on test prints and material choice.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-[760px] text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200/70 text-slate-500">
                      <th className="py-2 pr-4 font-semibold">Situation</th>
                      <th className="py-2 pr-4 font-semibold">Recommended clearance</th>
                      <th className="py-2 pr-4 font-semibold">Tip</th>
                    </tr>
                  </thead>
                  <tbody>
                    {toleranceRows.map((row) => (
                      <tr key={row.situation} className="border-b border-slate-200/70 last:border-0">
                        <td className="py-2 pr-4 font-medium text-slate-900">{row.situation}</td>
                        <td className="py-2 pr-4">{row.clearance}</td>
                        <td className="py-2 pr-4">{row.tip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Need more detail? See the{" "}
                <Link href="/en/blog/maker-monday-toleranties-3d-printen" className="font-semibold text-emerald-600 hover:text-emerald-700">
                  Maker Monday tolerance guide
                </Link>{" "}
                for extended tables.
              </p>
            </GlassCard>
          </Reveal>
        </section>

        <section id="design-workflow" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Workflow: from CAD to print</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {workflowSteps.map((step) => (
                  <li key={step} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <ShimmerButton
                  href={viewerHref}
                  event={{ action: "cta_click", category: "blog_design_guide_mid", label: "viewer" }}
                >
                  Upload your file
                </ShimmerButton>
                <ShimmerButton
                  href={contactHref}
                  className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                  event={{ action: "cta_click", category: "blog_design_guide_mid", label: "contact_prefill" }}
                >
                  Request design review
                </ShimmerButton>
              </div>
            </GlassCard>
          </Reveal>
        </section>

        <section id="design-checklist" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Go deeper with these guides</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                {checklistLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="font-semibold text-indigo-600 hover:text-indigo-500">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Prefer a professional review? Use the contact form for quick feedback.
              </p>
            </GlassCard>
          </Reveal>
        </section>

        <section id="design-faq" className="scroll-mt-28">
          <Faq title="FAQ about 3D print design" items={faqItems} />
        </section>

        <section id="design-sources" className="scroll-mt-28">
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
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Ready for a printable version?</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Share your model and use case to receive feedback on wall thickness, orientation and material choice.
                </p>
              </div>
              <ShimmerButton
                href={contactHref}
                event={{ action: "cta_click", category: "blog_design_guide_bottom", label: "contact_prefill" }}
              >
                Start design review
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
