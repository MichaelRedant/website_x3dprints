import type { Metadata } from "next"
import Link from "next/link"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import BlogContentOverview from "@/components/BlogContentOverview"
import { buildArticleJsonLd, buildFaqPageSchema, buildHowToSchema } from "@/lib/seo"
import BlogAuthorNote from "@/components/BlogAuthorNote"

const canonical = "https://www.x3dprints.be/en/blog/ontwerp-3d-printbaar-model/"
const nlCanonical = "https://www.x3dprints.be/blog/ontwerp-3d-printbaar-model/"
const datePublished = "2024-05-01"
const dateModified = "2026-02-08"
const lastUpdatedLabel = "Last updated: 8 February 2026"
const viewerHref = "/en/viewer?utm_source=blog&utm_medium=cta&utm_campaign=design-printable-en"
const pricingHref = "/en/pricing?utm_source=blog&utm_medium=cta&utm_campaign=design-printable-en"
const materialsHref = "/en/materials#material-suggestion-tool"
const contactHref = "/en/contact?material=pla-matte&quote=Design%20review%20for%20printable%20model"

export const metadata: Metadata = {
  title: "How do you design a 3D printable model? | X3DPrints",
  description:
    "Use this practical checklist for wall thickness, tolerance, orientation and export settings so your 3D model print workflow is ready faster for 3D printing Gent and Belgium projects.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": nlCanonical,
      "en-BE": canonical,
      "x-default": nlCanonical,
    },
  },
  openGraph: {
    title: "How do you design a 3D printable model?",
    description:
      "Design guide for printable geometry with rules for wall thickness, snap-fits, tolerances and handoff.",
    url: canonical,
    images: [{ url: "/images/og-blog-en.svg", width: 1200, height: 630, alt: "Design a 3D printable model" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "How do you design a 3D printable model?",
    description: "From CAD to print with practical design rules that reduce failed prints.",
    images: ["/images/og-blog-en.svg"],
  },
}

const fundamentals = [
  {
    title: "Wall thickness and structural strength",
    description:
      "For many FDM applications, 1.2 mm is a strong baseline. Heavier use cases often need extra wall thickness.",
  },
  {
    title: "Tolerance and fit",
    description:
      "Define fit intent early: loose, fixed or snap-fit. This prevents rework after your first test print.",
  },
  {
    title: "Orientation and load paths",
    description:
      "Choose orientation based on critical surfaces and force direction to balance visual quality and strength.",
  },
  {
    title: "Overhang and support strategy",
    description:
      "Reduce aggressive overhangs and use chamfers where possible to lower support volume and cleanup effort.",
  },
]

const exportChecklist = [
  "Validate mesh integrity and remove open or duplicate surfaces.",
  "Use consistent units and clear revision naming conventions.",
  "Provide STL for production, STEP when revisions remain possible.",
  "Include key dimensions or assembly notes in a short project brief.",
]

const materialGuidance = [
  {
    material: "PLA",
    guidance: "Great for visual quality and crisp details in indoor use cases.",
  },
  {
    material: "PETG",
    guidance: "Stronger fit for parts that see more impact, heat or moisture.",
  },
  {
    material: "TPU",
    guidance: "Best for flexible parts, but needs more uniform wall sections and tuned geometry.",
  },
]

const designMatrixRows = [
  { focus: "Visual detail", guideline: "Prioritize orientation and clean external surfaces.", risk: "Layer lines on show faces" },
  { focus: "Mechanical fit", guideline: "Reserve tolerance early and validate mating areas.", risk: "Press-fit too tight or too loose" },
  { focus: "Support strategy", guideline: "Limit overhang angles and add chamfers where possible.", risk: "Post-processing overhead" },
  { focus: "Repeatability", guideline: "Keep naming and revision flow consistent per project.", risk: "Version mix-ups in production" },
]

const faqItems = [
  {
    q: "How early should printability be considered?",
    a: "From your first CAD iteration. Early printability checks prevent downstream redesign loops.",
  },
  {
    q: "What causes most reprints?",
    a: "Tolerance mistakes, weak wall areas and unclear orientation choices are the most common reasons.",
  },
  {
    q: "Can we request a design review before production?",
    a: "Yes, a short review often catches print risks early and speeds up final production planning.",
  },
]

const references = [
  {
    label: "All3DP FDM process explainer",
    href: "https://all3dp.com/2/fdm-3d-printing-explained/",
  },
  {
    label: "Prusa material guide",
    href: "https://help.prusa3d.com/filament-material-guide",
  },
  {
    label: "Google Search docs: crawlable links",
    href: "https://developers.google.com/search/docs/crawling-indexing/links-crawlable",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "How do you design a 3D printable model?",
  description: metadata.description ?? "",
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
  name: "Prepare a printable model in 4 steps",
  description:
    "Review design rules, export clean files and request a fast design check before production.",
  inLanguage: "en-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT4M",
  steps: [
    {
      name: "Check design fundamentals",
      text: "Validate wall thickness, tolerances and orientation against your functional requirements.",
    },
    {
      name: "Export clean files",
      text: "Send STL or STEP with clear units, revision naming and key dimensions.",
    },
    {
      name: "Validate model in viewer",
      url: viewerHref,
    },
    {
      name: "Send prefilled review request",
      url: contactHref,
    },
  ],
  toolNames: ["X3DPrints 3D viewer", "Material Suggestion Tool"],
  supplyNames: ["STL or STEP file", "Design notes"],
})

export default function DesignArticleEnPage() {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-16 sm:px-8 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(130%_60%_at_50%_0%,rgba(45,212,191,.16),transparent_72%)]"
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
              <li className="font-medium text-slate-700">Design a 3D printable model</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-600">Design guide</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            How do you design a 3D printable model?
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Short answer: printability starts in CAD. A few core rules can prevent failed prints and extra iterations in every 3D model print pipeline, including 3D printing Gent projects.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
            Last updated: February 7, 2026
          </p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton href={viewerHref} event={{ action: "cta_click", category: "blog_design_en_top", label: "viewer" }}>
              Check your model
            </ShimmerButton>
            <ShimmerButton
              href={contactHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_design_en_top", label: "contact_prefill" }}
            >
              Request design review
            </ShimmerButton>
            <Link
              href={pricingHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              Review pricing anchors
            </Link>
          </div>
        </header>

      <BlogContentOverview locale="en" />

        <section id="design-basics" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Which design rules should you check first?</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {fundamentals.map((item) => (
                <GlassCard key={item.title} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{item.description}</p>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="design-export" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">How do you make your model print-ready?</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {exportChecklist.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
                          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-5 flex flex-wrap gap-3">
                <ShimmerButton href={viewerHref} event={{ action: "cta_click", category: "blog_design_en_mid", label: "viewer" }}>
                  Open viewer
                </ShimmerButton>
                <ShimmerButton
                  href={contactHref}
                  className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                  event={{ action: "cta_click", category: "blog_design_en_mid", label: "contact_prefill" }}
                >
                  Start review
                </ShimmerButton>
              </div>
            </GlassCard>
          </Reveal>
        </section>

        <section id="design-material" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Which choices change per material?</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {materialGuidance.map((item) => (
                <GlassCard key={item.material} className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{item.material}</p>
                  <p className="mt-2 text-sm text-slate-700">{item.guidance}</p>
                </GlassCard>
              ))}
            </div>
            <GlassCard className="mt-4 p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-slate-900">Design risk matrix</h3>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-[620px] text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200/70 text-slate-500">
                      <th className="py-2 pr-4 font-semibold">Focus area</th>
                      <th className="py-2 pr-4 font-semibold">Guideline</th>
                      <th className="py-2 pr-4 font-semibold">Common risk</th>
                    </tr>
                  </thead>
                  <tbody>
                    {designMatrixRows.map((row) => (
                      <tr key={row.focus} className="border-b border-slate-200/70 last:border-0">
                        <td className="py-2 pr-4 font-medium text-slate-900">{row.focus}</td>
                        <td className="py-2 pr-4">{row.guideline}</td>
                        <td className="py-2 pr-4">{row.risk}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
            <p className="mt-4 text-sm text-slate-600">
              Combine this with{" "}
              <Link href={materialsHref} className="font-semibold text-indigo-600 hover:text-indigo-500">
                material advice
              </Link>{" "}
              and{" "}
              <Link href="/en/services" className="font-semibold text-indigo-600 hover:text-indigo-500">
                services
              </Link>{" "}
              to submit production-ready intake files.
            </p>
          </Reveal>
        </section>

        <section id="design-faq" className="scroll-mt-28">
          <Faq title="FAQ about printable design" items={faqItems} />
        </section>

        <section id="design-sources" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 id="sources" className="text-2xl font-semibold text-slate-900">Sources and references</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {references.map((reference) => (
                  <li key={reference.href} className="rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3">
                    
                      <cite className="not-italic"><a
                        href={reference.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        {reference.label}
                      </a></cite>
                    
                  </li>
                ))}
              </ul>
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



