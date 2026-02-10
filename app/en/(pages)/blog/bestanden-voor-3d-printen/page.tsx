import type { Metadata } from "next"
import Link from "next/link"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import BlogContentOverview from "@/components/BlogContentOverview"
import { buildArticleJsonLd, buildFaqPageSchema, buildHowToSchema } from "@/lib/seo"
import BlogAuthorNote from "@/components/BlogAuthorNote"

const canonical = "https://www.x3dprints.be/en/blog/bestanden-voor-3d-printen/"
const nlCanonical = "https://www.x3dprints.be/blog/bestanden-voor-3d-printen/"
const datePublished = "2024-08-01"
const dateModified = "2026-02-09"
const lastUpdatedLabel = "Last updated: 9 February 2026"
const viewerHref = "/en/viewer?utm_source=blog&utm_medium=cta&utm_campaign=files-en"
const pricingHref = "/en/pricing?utm_source=blog&utm_medium=cta&utm_campaign=files-en"
const materialsHref = "/en/materials#material-suggestion-tool"
const locatiesHref = "/en/locaties?utm_source=blog&utm_medium=cta&utm_campaign=files-en"
const contactHref = "/en/contact?material=pla-matte&quote=File%20check%20for%203D%20printing"
const designGuideHref =
  "/en/blog/3d-print-ontwerp-gids?utm_source=blog&utm_medium=internal&utm_campaign=files-en"

export const metadata: Metadata = {
  title: "Which files do you need for 3D printing? | X3DPrints",
  description:
    "STL, STEP or native CAD? This practical guide explains file formats, export checks and context that speeds up your 3D model print quote for 3D printing Gent and Belgium projects.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": nlCanonical,
      "en-BE": canonical,
      "x-default": nlCanonical,
    },
  },
  openGraph: {
    title: "Which files do you need for 3D printing?",
    description:
      "Use this file handoff checklist to avoid delays: format choice, mesh checks, naming and project context.",
    url: canonical,
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "Files for 3D printing" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Which files do you need for 3D printing?",
    description: "Complete STL and STEP checklist for faster 3D print processing.",
    images: ["/Logo.webp"],
  },
}

const formatCards = [
  {
    format: "STL",
    description: "Best for final production when geometry is fixed and ready to print.",
    tips: ["Keep units consistent", "Repair holes and non-manifold geometry before upload"],
  },
  {
    format: "STEP",
    description: "Best when design iterations are still likely and dimensions may need tuning.",
    tips: ["Preserve assembly structure", "Include critical mating faces in your notes"],
  },
  {
    format: "Native CAD + PDF",
    description: "Best for complex projects where tolerances, revisions and interfaces matter.",
    tips: ["Tag revision versions clearly", "Add dimension notes in a short PDF"],
  },
]

const exportChecklist = [
  "Validate watertight meshes and remove stray surfaces.",
  "Use clear filenames with revision and unit naming.",
  "Bundle multi-part projects in a zip with a short readme.",
  "Share critical dimensions and tolerance notes in the briefing.",
]

const contextTips = [
  "Add reference images for orientation and expected finish.",
  "Share your preferred material, or request guidance via the material tool.",
  "State your target deadline and delivery preference up front.",
  "Run a quick visual sanity-check in the viewer before submitting.",
]

const faqItems = [
  {
    q: "Is STL enough for a quote?",
    a: "Yes, for many projects STL is enough when the geometry is final and units are clear.",
  },
  {
    q: "When should we send STEP instead of STL?",
    a: "Send STEP when dimensions, tolerances or fit details may still change before production.",
  },
  {
    q: "What causes most intake delays?",
    a: "Missing context, unclear units and mesh issues usually create extra review rounds.",
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
  headline: "Which files do you need for 3D printing?",
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
  name: "Prepare 3D print files in 4 steps",
  description:
    "Choose the right file format, validate your export and send complete project context for faster intake.",
  inLanguage: "en-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT3M",
  steps: [
    {
      name: "Choose STL or STEP",
      text: "Use STL for fixed geometry and STEP when iterations may still happen.",
    },
    {
      name: "Run mesh and naming checks",
      text: "Confirm watertight geometry, clear units and revision naming.",
    },
    {
      name: "Validate in the 3D viewer",
      url: viewerHref,
    },
    {
      name: "Send prefilled request",
      url: contactHref,
    },
  ],
  toolNames: ["X3DPrints 3D viewer", "Material Suggestion Tool"],
  supplyNames: ["STL or STEP file", "Short project briefing"],
})

export default function FilesArticleEnPage() {
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
              <li className="font-medium text-slate-700">Files for 3D printing</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">File guide</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Which files do you need for 3D printing?
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Quick answer: STL for fixed geometry, STEP for iterative work. A clean 3D model print handoff with context reduces delays, especially in 3D printing Gent project flows.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
            Last updated: February 7, 2026
          </p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton href={viewerHref} event={{ action: "cta_click", category: "blog_files_en_top", label: "viewer" }}>
              Check in viewer
            </ShimmerButton>
            <ShimmerButton
              href={contactHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_files_en_top", label: "contact_prefill" }}
            >
              Request file check
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

        <section id="files-formats" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Which formats work best?</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {formatCards.map((card) => (
                <GlassCard key={card.format} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{card.format}</h3>
                  <p className="mt-2 text-sm text-slate-700">{card.description}</p>
                  <ul className="mt-3 space-y-1 text-xs text-slate-500">
                    {card.tips.map((tip) => (
                      <li key={tip} className="flex items-start gap-2">
                        <span aria-hidden>-</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="files-export" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">How do you export correctly?</h2>
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
                <ShimmerButton href={viewerHref} event={{ action: "cta_click", category: "blog_files_en_mid", label: "viewer" }}>
                  Open viewer
                </ShimmerButton>
                <ShimmerButton
                  href={contactHref}
                  className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                  event={{ action: "cta_click", category: "blog_files_en_mid", label: "contact_prefill" }}
                >
                  Start request
                </ShimmerButton>
              </div>
            </GlassCard>
          </Reveal>
        </section>

        <section id="files-context" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Which extra context helps most?</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {contextTips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Combine this with{" "}
                <Link href="/en/services" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  services
                </Link>{" "}
                and{" "}
                <Link href={materialsHref} className="font-semibold text-indigo-600 hover:text-indigo-500">
                  material advice
                </Link>{" "}
                for faster production decisions. For planning, you can also review{" "}
                <Link href={locatiesHref} className="font-semibold text-indigo-600 hover:text-indigo-500">
                  locations
                </Link>
                .
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

        <section id="files-faq" className="scroll-mt-28">
          <Faq title="FAQ about files for 3D printing" items={faqItems} />
        </section>

        <section id="files-sources" className="scroll-mt-28">
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



