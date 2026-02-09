import type { Metadata } from "next"
import Link from "next/link"
import BlogReadMore from "@/components/BlogReadMore"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import { buildArticleJsonLd, buildFaqPageSchema, buildHowToSchema } from "@/lib/seo"
import BlogAuthorNote from "@/components/BlogAuthorNote"

const canonical = "https://www.x3dprints.be/en/blog/pla-vs-petg/"
const nlCanonical = "https://www.x3dprints.be/blog/pla-vs-petg/"
const datePublished = "2024-08-25"
const dateModified = "2026-02-08"
const lastUpdatedLabel = "Last updated: 8 February 2026"
const contactHref =
  "/en/contact?material=pla-matte&quote=PLA%20vs%20PETG%20material%20advice%20request"
const materialsHref = "/en/materials#material-suggestion-tool"
const pricingHref = "/en/pricing?utm_source=blog&utm_medium=cta&utm_campaign=pla-vs-petg-en"

export const metadata: Metadata = {
  title: "PLA vs PETG: which material should you choose? | X3DPrints",
  description:
    "Compare PLA and PETG on finish, strength, heat resistance and cost to choose the right material faster for 3D model print projects in 3D printing Gent and Belgium workflows.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": nlCanonical,
      "en-BE": canonical,
      "x-default": nlCanonical,
    },
  },
  openGraph: {
    title: "PLA vs PETG: which material should you choose?",
    description:
      "Hands-on comparison with use-case matrix and fast decision criteria.",
    url: canonical,
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "PLA vs PETG comparison" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "PLA vs PETG: which material should you choose?",
    description: "Material guide with clear decision support for your print.",
    images: ["/Logo.webp"],
  },
}

const tocItems = [
  { id: "material-difference", label: "What is the real difference?" },
  { id: "material-matrix", label: "Which matrix helps quick selection?" },
  { id: "material-use-cases", label: "When should you use each material?" },
  { id: "material-faq", label: "FAQ about PLA and PETG" },
  { id: "material-sources", label: "Sources and references" },
]

const compareCards = [
  {
    title: "Look and finish",
    pla: "PLA supports many finish styles including matte, silk and marble.",
    petg: "PETG usually has a cleaner gloss and fits functional parts with visual requirements.",
  },
  {
    title: "Temperature and environment",
    pla: "PLA works well for indoor applications with limited heat load.",
    petg: "PETG performs better under heat, moisture and tougher operating conditions.",
  },
  {
    title: "Mechanical behavior",
    pla: "PLA is stiffer and often ideal for crisp visual prototypes.",
    petg: "PETG is tougher and better for clips, holders and functional assemblies.",
  },
]

const comparisonRows = [
  { property: "Detail and visual quality", pla: "Very strong", petg: "Good" },
  { property: "Impact resistance", pla: "Medium", petg: "High" },
  { property: "Heat resistance", pla: "Lower", petg: "Higher" },
  { property: "Outdoor suitability", pla: "Limited", petg: "Stronger" },
  { property: "Print accessibility", pla: "Very accessible", petg: "Needs slightly more tuning" },
  { property: "Cost level", pla: "Baseline", petg: "Usually higher" },
]

const useCases = {
  pla: [
    "Visual prototypes and presentation parts",
    "Decorative pieces with high detail priority",
    "Indoor components with lower mechanical stress",
  ],
  petg: [
    "Functional parts with higher load",
    "Parts exposed to warmer or humid conditions",
    "Clips, brackets and holders with longer service life",
  ],
}

const faqItems = [
  {
    q: "Can PLA and PETG be combined in one project?",
    a: "Yes. PLA is often used for visible sections, PETG for functional and load-bearing sections.",
  },
  {
    q: "When is PETG worth the extra cost?",
    a: "PETG usually pays off when heat, impact or long-term durability matter.",
  },
  {
    q: "How can we choose quickly between them?",
    a: "Start from function and environment, then validate with the material tool and model-specific advice.",
  },
]

const references = [
  {
    label: "Prusa material guide (PLA, PETG, TPU)",
    href: "https://help.prusa3d.com/filament-material-guide",
  },
  {
    label: "All3DP FDM process explainer",
    href: "https://all3dp.com/2/fdm-3d-printing-explained/",
  },
  {
    label: "Google Search docs: crawlable links",
    href: "https://developers.google.com/search/docs/crawling-indexing/links-crawlable",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "PLA vs PETG: which material should you choose?",
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
  name: "Choose PLA vs PETG in 4 steps",
  description:
    "Pick between PLA and PETG using function, environment, budget and model-based validation.",
  inLanguage: "en-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT3M",
  steps: [
    {
      name: "Define the use case",
      text: "Clarify whether visual quality, durability or heat performance is primary.",
    },
    {
      name: "Use the material matrix",
      text: "Compare both materials across key technical dimensions.",
    },
    {
      name: "Check cost impact",
      url: pricingHref,
    },
    {
      name: "Request prefilled advice",
      url: contactHref,
    },
  ],
  toolNames: ["Material Suggestion Tool"],
  supplyNames: ["STL or STEP file"],
})

export default function BlogPlaVsPetgEnPage() {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-16 sm:px-8 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(130%_60%_at_50%_0%,rgba(99,102,241,.16),transparent_72%)]"
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
              <li className="font-medium text-slate-700">PLA vs PETG</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">Material guide</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            PLA vs PETG: which material should you choose?
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Short answer: PLA is usually strongest for visual quality, PETG is usually stronger for functional stress in a 3D model print setup, including 3D printing Gent use cases.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
            Last updated: February 7, 2026
          </p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={materialsHref}
              event={{ action: "cta_click", category: "blog_pla_petg_en_top", label: "materials" }}
            >
              Material Suggestion Tool
            </ShimmerButton>
            <ShimmerButton
              href={contactHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_pla_petg_en_top", label: "contact_prefill" }}
            >
              Request material advice
            </ShimmerButton>
            <Link
              href={pricingHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              Review price impact
            </Link>
          </div>
          <ContentTableOfContents title="Contents" items={tocItems} className="max-w-2xl" />
        </header>

        <section id="material-difference" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">What is the real difference?</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {compareCards.map((card) => (
                <GlassCard key={card.title} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                  <div className="mt-3 space-y-2 text-sm text-slate-700">
                    <p>
                      <span className="font-semibold text-slate-900">PLA:</span> {card.pla}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-900">PETG:</span> {card.petg}
                    </p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="material-matrix" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Which matrix helps quick selection?</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-[620px] text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200/70 text-slate-500">
                      <th className="py-2 pr-4 font-semibold">Property</th>
                      <th className="py-2 pr-4 font-semibold">PLA</th>
                      <th className="py-2 pr-4 font-semibold">PETG</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row) => (
                      <tr key={row.property} className="border-b border-slate-200/70 last:border-0">
                        <td className="py-2 pr-4 font-medium text-slate-900">{row.property}</td>
                        <td className="py-2 pr-4">{row.pla}</td>
                        <td className="py-2 pr-4">{row.petg}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </Reveal>
        </section>

        <section id="material-use-cases" className="scroll-mt-28">
          <Reveal>
            <div className="grid gap-4 md:grid-cols-2">
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold text-slate-900">When should you choose PLA?</h2>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {useCases.pla.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold text-slate-900">When should you choose PETG?</h2>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {useCases.petg.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>
                        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <ShimmerButton
                href={materialsHref}
                event={{ action: "cta_click", category: "blog_pla_petg_en_mid", label: "materials" }}
              >
                Open material tool
              </ShimmerButton>
              <ShimmerButton
                href={contactHref}
                className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                event={{ action: "cta_click", category: "blog_pla_petg_en_mid", label: "contact_prefill" }}
              >
                Discuss your model
              </ShimmerButton>
            </div>
          </Reveal>
        </section>

        <section id="material-faq" className="scroll-mt-28">
          <Faq title="FAQ about PLA and PETG" items={faqItems} />
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
      </article>

      <BlogAuthorNote locale="en" />


      <BlogReadMore />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
    </main>
  )
}


