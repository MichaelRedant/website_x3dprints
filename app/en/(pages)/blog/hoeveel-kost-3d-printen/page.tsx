import type { Metadata } from "next"
import Link from "next/link"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import ReadMoreLinks from "@/components/ReadMoreLinks"
import { buildArticleJsonLd } from "@/lib/seo"
import BlogContentOverview from "@/components/BlogContentOverview"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogFaq from "@/components/BlogFaq"
import { BLOG_FAQ_EN } from "@/content/blog-faq-en"

const canonical = "https://www.x3dprints.be/en/blog/hoeveel-kost-3d-printen/"
const utm = "?utm_source=blog&utm_medium=cta&utm_campaign=how-much-3d-printing-cost"
const datePublished = "2024-10-01"
const dateModified = "2026-02-09"
const faq = BLOG_FAQ_EN["hoeveel-kost-3d-printen"]
const lastUpdatedLabel = "Last updated: 9 February 2026"
const pricingHref = `/en/pricing${utm}`
const contactHref = `/en/contact${utm}`
const materialsHref = `/en/materials${utm}#material-suggestion-tool`
const pricingGuideHref =
  "/en/blog/3d-print-prijzen-gids?utm_source=blog&utm_medium=internal&utm_campaign=how-much-3d-printing-cost"

export const metadata: Metadata = {
  title: "How much does 3D printing cost? | X3DPrints Blog",
  description:
    "See what drives 3D printing cost for each 3d model print: material, machine hours, finishing and logistics. Includes example calculation and link to the pricing calculator.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/hoeveel-kost-3d-printen/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/hoeveel-kost-3d-printen/",
    },
  },
  openGraph: {
    title: "How much does 3D printing cost?",
    description:
      "Full breakdown of material price, machine hours, finishing and logistics. Use our pricing calculator and request a quote.",
    url: canonical,
    images: [{ url: "/images/og-pricing-en.svg", width: 1200, height: 630, alt: "3D printing cost breakdown" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "How much does 3D printing cost?",
    description: "Strategic guide to estimating 3D print costs, including an example calculation.",
    images: ["/images/og-pricing-en.svg"],
  },
}

const costFactors = [
  {
    title: "Material",
    description:
      "PLA Matte is our baseline and the most cost-efficient choice for prototypes and small parts. Materials like PETG or TPU differ in price because of added toughness or flexibility.",
    tip: "See all current materials and colours in our materials list.",
    link: { href: "/en/materials", label: "Compare materials" },
  },
  {
    title: "Machine hours",
    description:
      "Most of the cost comes from print time. Complex models, higher resolution or more infill increase machine hours and total cost.",
    tip: "Use the pricing calculator for realistic time and cost estimates.",
    link: { href: "/en/pricing", label: "Go to pricing & calculator" },
  },
  {
    title: "Model complexity",
    description:
      "Heavy overhangs or thin geometries can require extra supports. That raises print time and material use. Simple shapes are usually cheaper.",
    tip: "Load your model in the viewer to see if supports are needed.",
    link: { href: "/en/viewer", label: "Check STL" },
  },
  {
    title: "Logistics",
    description:
      "Pickup in Herzele is free. Bpost shipping ranges from ~€6 to €25 depending on weight and speed. Large prints are packed securely for transport.",
    tip: "Combine parts in one shipment to reduce cost.",
    link: { href: "/en/pricing", label: "See shipping options" },
  },
]


const references = [
  {
    label: "Autodesk: STL file format",
    href: "https://help.autodesk.com/cloudhelp/2014/ENU/Alias/files/GUID-8ABFA3B8-204B-44E0-A50B-BA4C1C3F9BE8.htm",
    description: "STL basics and export context for 3D printing workflows.",
  },
  {
    label: "Prusa: Material guide",
    href: "https://help.prusa3d.com/filament-material-guide",
    description: "Overview of PLA, PETG and TPU material behaviour and print considerations.",
  },
  {
    label: "UltiMaker PLA material properties",
    href: "https://ultimaker.com/materials/pla/",
    description: "PLA characteristics, storage tips and baseline print guidance.",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "How much does 3D printing cost?",
  description: metadata.description ?? "",
  datePublished,
  dateModified,
  image: "/images/og-pricing-en.svg",
  inLanguage: "en-BE",
})

export default function CostArticleEn() {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-14 sm:px-8 lg:px-12">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(99,102,241,.12),transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.08]" />

      <article className="mx-auto max-w-5xl space-y-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">Pricing guide</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">How much does 3D printing cost?</h1>
          <p className="text-lg text-slate-700">
            A clear breakdown of what drives price for every 3d model print: material choice, machine hours, complexity, finishing and logistics. Use it to budget realistically before you request a quote.
          </p>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton href={pricingHref} event={{ action: "cta_click", category: "blog_top", label: "pricing_cost_en" }}>
              View pricing & calculator
            </ShimmerButton>
            <Link
              href={contactHref}
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/20 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/40"
            >
              Request a tailored quote
            </Link>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {costFactors.map((factor) => (
            <GlassCard key={factor.title} className="p-6">
              <h2 className="text-lg font-semibold text-slate-900">{factor.title}</h2>
              <p className="mt-2 text-sm text-slate-700">{factor.description}</p>
              <p className="mt-2 text-xs text-slate-500">{factor.tip}</p>
              <Link href={factor.link.href} className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                {factor.link.label} <span aria-hidden>?</span>
              </Link>
            </GlassCard>
          ))}
        </section>

      <BlogContentOverview locale="en" />

        <section className="rounded-2xl border border-emerald-100 bg-white/85 p-6 shadow-lg backdrop-blur">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">Next step</p>
              <h2 className="text-xl font-semibold text-slate-900">Check price and pick a material</h2>
              <p className="text-sm text-slate-700">Test your model in the calculator and prefill material advice in one go.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ShimmerButton href={pricingHref} event={{ action: "cta_click", category: "blog_mid", label: "pricing_cost_en_mid" }}>
                Open pricing
              </ShimmerButton>
              <ShimmerButton
                href={materialsHref}
                event={{ action: "cta_click", category: "blog_mid", label: "materials_tool_cost_en_mid" }}
              >
                Material suggestion tool
              </ShimmerButton>
            </div>
          </div>
        </section>
        <p className="text-sm text-slate-600">
          Want the full breakdown? Read the{" "}
          <Link href={pricingGuideHref} className="font-semibold text-emerald-600 hover:text-emerald-700">
            3D print pricing guide
          </Link>
          .
        </p>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900">Example cost scenarios</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-4">
                <p className="text-sm font-semibold text-slate-900">Small: keychain or clip</p>
                <p className="mt-1">PLA Matte, ~30-60 min print, minimal supports. ~€5-€9 ex. shipping.</p>
              </div>
              <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-4">
                <p className="text-sm font-semibold text-slate-900">Medium: enclosure 10x10x8 cm</p>
                <p className="mt-1">PLA or PETG, ~3-5 h print, light supports. ~€20-€35 depending on material and finish.</p>
              </div>
              <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-4">
                <p className="text-sm font-semibold text-slate-900">Large: decor piece 20x20x20 cm</p>
                <p className="mt-1">PLA Matte/Silk, ~10-18 h print, support-heavy if overhangs. ~€49-€95 depending on complexity and infill.</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900">What speeds up quoting?</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>- STL/STEP + requested material/colour.</li>
              <li>- Application and any critical dimensions/tolerances.</li>
              <li>- Finish level: raw, light deburr, or do you need primer/paint (via partners)?</li>
              <li>- Deadline and delivery preference (pickup Herzele / Bpost / local drop-off).</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-3">
              <ShimmerButton href="/en/contact?quote=Pricing%20request">Share project details</ShimmerButton>
              <Link href="/en/materials#material-suggestion-tool" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:-translate-y-0.5 hover:bg-white">
                Material Suggestion Tool
              </Link>
            </div>
          </GlassCard>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {faq.items.map((item) => (
            <GlassCard key={item.q} className="p-5">
              <h3 className="text-base font-semibold text-slate-900">{item.q}</h3>
              <p className="mt-2 text-sm text-slate-700">{item.a}</p>
            </GlassCard>
          ))}
        </section>

        <ReadMoreLinks
          title="Next up"
          primaryLinks={[
            { label: "Lead times for 3D printing", href: "/en/blog/hoe-lang-duurt-3d-printen" },
            { label: "PLA vs PETG comparison", href: "/en/blog/pla-vs-petg" },
            { label: "Find ready-to-print 3D models", href: "/en/3d-modellen-vinden" },
          ]}
          secondaryLinks={[]}
        />
      </article>
      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">
          <h2 id="sources" className="text-2xl font-semibold text-slate-900">Sources and references</h2>
          <p className="mt-2 text-sm text-slate-600">Primary references that support the material and workflow guidance in this article.</p>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            {references.map((ref) => (
              <li key={ref.href} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                <cite className="not-italic"><a href={ref.href} target="_blank" rel="noreferrer" className="text-base font-semibold text-indigo-600">
                  {ref.label}
                </a></cite>
                <p className="mt-1 text-sm text-slate-600">{ref.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <BlogFaq title={faq.title} items={faq.items} inLanguage="en-BE" mainEntityOfPage={canonical} />


      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <BlogAuthorNote locale="en" />
    </main>
  )
}







