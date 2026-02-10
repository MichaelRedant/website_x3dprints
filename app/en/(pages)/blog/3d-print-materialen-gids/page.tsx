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

const canonical = "https://www.x3dprints.be/en/blog/3d-print-materialen-gids/"
const datePublished = "2026-02-09"
const dateModified = "2026-02-09"
const materialsHref =
  "/en/materials?utm_source=blog&utm_medium=cta&utm_campaign=materials-guide#material-suggestion-tool"
const pricingHref = "/en/pricing?utm_source=blog&utm_medium=cta&utm_campaign=materials-guide"
const contactHref =
  "/en/contact?material=pla-matte&quote=Material%20advice%20for%20my%203D%20print"

export const metadata: Metadata = {
  title: "3D print materials guide 2026: PLA, PETG & TPU | X3DPrints",
  description:
    "Complete 3D print materials guide: compare PLA, PETG, TPU and PC with a matrix, use cases and direct links to the Material Suggestion Tool.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/3d-print-materialen-gids/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/3d-print-materialen-gids/",
    },
  },
  openGraph: {
    title: "3D print materials guide 2026",
    description:
      "Material selection matrix, strength and heat insights plus fast decision rules for your project.",
    url: canonical,
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "3D print materials guide" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D print materials guide 2026",
    description: "Materials matrix, use cases and decision rules for 3D prints.",
    images: ["/Logo.webp"],
  },
}

const decisionSteps = [
  {
    title: "Define the function",
    description:
      "Is it a visual prop, functional part or flexible component? That defines your baseline.",
  },
  {
    title: "Check temperature & environment",
    description:
      "Outdoor, heat or chemicals? PETG or PC might be required. Indoor visuals often stay in PLA.",
  },
  {
    title: "Pick finish and look",
    description:
      "Silk, Marble or Matte for premium visuals; standard PLA for fast and affordable production.",
  },
]

const materialRows = [
  {
    material: "PLA Matte",
    strength: "Rigid, clean finish",
    heat: "Up to ~55°C",
    bestFor: "Branding, interior, prototypes",
  },
  {
    material: "PETG",
    strength: "Tough, chemical resistant",
    heat: "Up to ~80°C",
    bestFor: "Functional, outdoor, enclosures",
  },
  {
    material: "TPU 95A",
    strength: "Flexible, shock absorbing",
    heat: "Up to ~70°C",
    bestFor: "Grips, bumpers, dampers",
  },
  {
    material: "PC / PC FR",
    strength: "Rigid, heat resistant",
    heat: "Up to ~110°C",
    bestFor: "High-temp and safety parts",
  },
]

const finishTips = [
  "PLA Matte delivers premium looks without extra finishing.",
  "Silk and Marble work best for showpieces and awards.",
  "PETG and TPU trade visual perfection for durability.",
  "Use colour samples on larger batches to maintain brand consistency.",
]

const segmentHighlights = [
  {
    title: "Marketing & events",
    description:
      "Visual parts in PLA Matte, Silk or Marble with consistent colour and finish.",
    href: "/en/segments/3d-printing-marketing",
    label: "View marketing segment",
  },
  {
    title: "Prototypes & engineering",
    description:
      "PETG and PC for functional tests and higher temperature load.",
    href: "/en/segments/3d-printing-prototypes",
    label: "View prototype segment",
  },
  {
    title: "Tabletop & retail",
    description:
      "Detail work and durable props with PLA Matte, PETG or TPU.",
    href: "/en/segments/3d-printing-tabletop",
    label: "View tabletop segment",
  },
]

const faqItems = [
  {
    q: "Which materials are kept in stock?",
    a: "PLA Matte, PETG and TPU are our standard base. Specials like Silk, Marble and PC are planned on request.",
  },
  {
    q: "Is PETG always better than PLA?",
    a: "No. PLA is best for clean visuals and fast runs. PETG is for heat and impact resistance.",
  },
  {
    q: "Can I combine materials in one project?",
    a: "Yes. Hybrids (PLA shell + PETG core or TPU inserts) often deliver the best mix of look and function.",
  },
  {
    q: "How fast can I get material advice?",
    a: "Usually within one business day after we receive your use case and file.",
  },
]

const references = [
  {
    label: "Prusa material guide (PLA, PETG, TPU)",
    href: "https://help.prusa3d.com/filament-material-guide",
  },
  {
    label: "Ultimaker: Design for FFF 3D printing",
    href: "https://ultimaker.com/learn/design-for-fff-3d-printing/",
  },
  {
    label: "Bambu Lab material guide",
    href: "https://wiki.bambulab.com/en/filament",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "3D print materials guide 2026",
  description:
    "Matrix and decision rules for PLA, PETG, TPU and PC with fast material selection per project type.",
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
  name: "Pick the right material in 4 steps",
  description: "Make a fast material choice based on function, environment and finish.",
  inLanguage: "en-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT4M",
  steps: [
    {
      name: "Define the use case",
      text: "Note whether it’s visual, functional or flexible work.",
    },
    {
      name: "Compare materials",
      url: materialsHref,
    },
    {
      name: "Check price impact",
      url: pricingHref,
    },
    {
      name: "Request material advice",
      url: contactHref,
    },
  ],
  toolNames: ["Material Suggestion Tool", "Pricing calculator"],
  supplyNames: ["STL or STEP file"],
})

export default function BlogMaterialsGuideEnPage() {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-16 sm:px-8 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_0%,rgba(59,130,246,.18),transparent_70%)]"
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
              <li className="font-medium text-slate-700">3D print materials guide</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">Materials pillar</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            3D print materials guide: choose PLA, PETG or TPU with confidence
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Choose materials based on strength, temperature and finish: PLA for clean visuals, PETG for functional use and
            TPU for flexibility. This guide gives you a matrix, use cases and an advice flow.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
            Last updated: 9 February 2026
          </p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={materialsHref}
              event={{ action: "cta_click", category: "blog_materials_guide_top", label: "materials_tool" }}
            >
              Start material tool
            </ShimmerButton>
            <ShimmerButton
              href={pricingHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_materials_guide_top", label: "pricing" }}
            >
              Check price impact
            </ShimmerButton>
            <Link
              href={contactHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              Request material advice
            </Link>
          </div>
        </header>

        <BlogContentOverview locale="en" />

        <section id="material-choices" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Choose materials in 3 steps</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {decisionSteps.map((step) => (
                <GlassCard key={step.title} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{step.description}</p>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="material-matrix" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Materials matrix: what to pick when?</h2>
              <p className="mt-2 text-sm text-slate-600">
                Use this matrix as a fast shortlist. Specific blends are discussed during intake.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-[760px] text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200/70 text-slate-500">
                      <th className="py-2 pr-4 font-semibold">Material</th>
                      <th className="py-2 pr-4 font-semibold">Strength & feel</th>
                      <th className="py-2 pr-4 font-semibold">Heat/UV</th>
                      <th className="py-2 pr-4 font-semibold">Best for</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materialRows.map((row) => (
                      <tr key={row.material} className="border-b border-slate-200/70 last:border-0">
                        <td className="py-2 pr-4 font-medium text-slate-900">{row.material}</td>
                        <td className="py-2 pr-4">{row.strength}</td>
                        <td className="py-2 pr-4">{row.heat}</td>
                        <td className="py-2 pr-4">{row.bestFor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Need more detail? Explore the{" "}
                <Link href="/en/materials" className="font-semibold text-emerald-600 hover:text-emerald-700">
                  materials library
                </Link>{" "}
                or start the Material Suggestion Tool.
              </p>
            </GlassCard>
          </Reveal>
        </section>

        <section id="material-finish" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Finish and look: how to decide</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {finishTips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <ShimmerButton
                  href={materialsHref}
                  event={{ action: "cta_click", category: "blog_materials_guide_mid", label: "materials_tool" }}
                >
                  Start material tool
                </ShimmerButton>
                <ShimmerButton
                  href={contactHref}
                  className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                  event={{ action: "cta_click", category: "blog_materials_guide_mid", label: "contact_prefill" }}
                >
                  Request advice
                </ShimmerButton>
              </div>
            </GlassCard>
          </Reveal>
        </section>

        <section id="material-segments" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Materials per segment</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {segmentHighlights.map((segment) => (
                <GlassCard key={segment.title} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{segment.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{segment.description}</p>
                  <Link
                    href={segment.href}
                    className="mt-3 inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    {segment.label}
                  </Link>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="material-faq" className="scroll-mt-28">
          <Faq title="FAQ about 3D print materials" items={faqItems} />
        </section>

        <section id="material-sources" className="scroll-mt-28">
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
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Ready to pick the right material?</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Share your use case and deadline to receive tailored advice with price impact.
                </p>
              </div>
              <ShimmerButton
                href={contactHref}
                event={{ action: "cta_click", category: "blog_materials_guide_bottom", label: "contact_prefill" }}
              >
                Start material advice
              </ShimmerButton>
            </GlassCard>
          </Reveal>
        </section>
      </article>

      <ReadMoreLinks pageType="materials" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <BlogAuthorNote locale="en" />
    </main>
  )
}
