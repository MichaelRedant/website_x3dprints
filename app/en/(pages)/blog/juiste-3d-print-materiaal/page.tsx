import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import { buildArticleJsonLd } from "@/lib/seo"
import BlogContentOverview from "@/components/BlogContentOverview"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogFaq from "@/components/BlogFaq"
import { BLOG_FAQ_EN } from "@/content/blog-faq-en"

const canonical = "https://www.x3dprints.be/en/blog/juiste-3d-print-materiaal/"
const utm = "?utm_source=blog&utm_medium=cta&utm_campaign=right-material"
const pricingHref = `/en/pricing${utm}`
const toolHref = `/en/materials${utm}#material-suggestion-tool`
const contactHref = `/en/contact${utm}`
const publishedDate = "2024-09-10"
const datePublished = "2024-09-10"
const dateModified = "2026-02-08"
const faq = BLOG_FAQ_EN["juiste-3d-print-materiaal"]
const lastUpdatedLabel = "Last updated: 8 February 2026"

export const metadata: Metadata = {
  title: "How do you choose the right 3D print material? | X3DPrints",
  description:
    "Step-by-step guide to pick the right 3D print material for every 3d model print based on environment, use and budget.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/juiste-3d-print-materiaal/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/juiste-3d-print-materiaal/",
    },
  },
  openGraph: {
    title: "Right material for 3D printing: practical decision guide",
    description:
      "Use this guide to decide if PLA Matte, PETG or TPU fits your project. Includes flow, scenarios and links to materials and pricing.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["choose 3D print material", "PLA vs PETG vs TPU", "how-to"],
    images: [
      { url: "/images/filament/pla_matte_Car_PC.webp", width: 1200, height: 630, alt: "Overview of 3D print materials by X3DPrints" },
    ],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "How-to: choose the right 3D print material",
    description: "From PLA Matte to PETG and TPU: how to select the best material for your 3D print job.",
    images: ["/images/filament/pla_matte_Car_PC.webp"],
  },
}

const decisionSteps = [
  {
    title: "Will the object be used indoors or outdoors?",
    detail:
      "Indoors = PLA variants usually suffice. Outdoor or direct sunlight areas require PETG or technical materials for UV and moisture resistance.",
  },
  {
    title: "Does the part face heat or cold?",
    detail:
      "Up to about 55 C PLA stays dimensionally stable; above that we switch to PETG or PA. In freezing temps PETG stays tougher than PLA.",
  },
  {
    title: "Decorative or functional?",
    detail:
      "For visible parts, finish matters (PLA Matte, Silk, Marble). For brackets, enclosures or tooling, mechanical performance leads (PETG or PLA Tough+).",
  },
  {
    title: "Must it be rigid or flexible?",
    detail:
      "Rigid parts = PLA or PETG. Grip, damping or cable management calls for TPU or hybrids with PLA frames and TPU inlays.",
  },
]

const materialMappings = [
  {
    material: "PLA Matte",
    bestFor: ["Marketing & interior", "Hobby projects", "Photoshoot props"],
    why: "Matte finish hides layer lines and looks premium without post-processing. Ideal for indoor visible parts on a tight budget.",
    links: [
      { label: "Filament Friday: PLA", href: "/en/blog/filament-vrijdag-pla" },
      { label: "PLA Matte sheet", href: "/en/materials/pla-matte" },
    ],
  },
  {
    material: "PETG",
    bestFor: ["Functional parts", "Hot or sunny areas", "Outdoor projects"],
    why:
      "PETG stays stable up to roughly 80 C, is tougher than PLA and handles moisture better. Our go-to for car interiors, covers and jig tooling.",
    links: [
      { label: "Filament Friday: PETG", href: "/en/blog/filament-vrijdag-petg" },
      { label: "PETG material page", href: "/en/materials/petg" },
    ],
  },
  {
    material: "TPU",
    bestFor: ["Damping", "Grips", "Flexible holders"],
    why: "TPU (Shore 95A) springs back after impact and adds anti-slip. Perfect for cable holders, bumpers and inserts in combo parts.",
    links: [
      { label: "Filament Friday: TPU", href: "/en/blog/filament-vrijdag-tpu" },
      { label: "TPU sheet", href: "/en/materials/tpu" },
    ],
  },
]

const scenarios = [
  {
    title: "Part inside the car",
    recommendation:
      "Pick PETG or PLA Tough+. PETG stays stable in the sun and near vents. For clips we often use PETG with light infill to absorb stress.",
    links: [
      { label: "Compare PLA vs PETG", href: "/en/blog/pla-vs-petg" },
      { label: "Request PETG advice", href: "/en/contact?material=PETG" },
    ],
  },
  {
    title: "Display for my shop",
    recommendation:
      "PLA Matte for the base, PLA Silk+ or Marble for accents. Combine with PLA Wood or Metal depending on branding. Use the Material Suggestion Tool for variants.",
    links: [
      { label: "Materials library", href: "/en/materials" },
      { label: "PLA Silk+ edition", href: "/en/blog/filament-vrijdag-pla-silk-plus" },
    ],
  },
  {
    title: "Flexible cable holder",
    recommendation:
      "TPU 95A provides tension and grip. For extra structure we print PLA frames with TPU inserts so your clip stays in shape but remains flexible.",
    links: [
      { label: "TPU use cases", href: "/en/blog/use-cases-tpu" },
      { label: "Material Suggestion Tool", href: "/en/materials#material-suggestion-tool" },
    ],
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
  headline: "How do you choose the right 3D print material?",
  description: metadata.description ?? "",
  datePublished,
  dateModified,
  image: "/images/filament/pla_matte_Car_PC.webp",
  inLanguage: "en-BE",
})

export default function RightMaterialGuideEnPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(140%_80%_at_50%_-10%,rgba(34,197,94,0.18),transparent_65%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.08]" />

      <section className="px-6 pb-12 pt-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal className="space-y-4">
            <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
              <ol className="flex flex-wrap gap-2">
                <li>
                  <Link
                    href="/en/blog"
                    className="font-medium text-indigo-600 transition hover:text-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Blog
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-900">Right 3D print material</li>
              </ol>
            </nav>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">How-to</p>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              How do you choose the right 3D print material?
            </h1>
            <p className="text-lg text-slate-700">
              This guide walks you through four decisions: environment, temperature, function and flexibility. We link directly to our material pages,
              pricing and contact so you can decide faster without extra review rounds for any 3d model print workflow.
            </p>
            <div className="flex flex-wrap gap-3">
              <ShimmerButton
                href={pricingHref}
                event={{ action: "cta_click", category: "blog_top", label: "pricing_right_material_en" }}
              >
                View pricing & calculator
              </ShimmerButton>
              <ShimmerButton
                href={toolHref}
                event={{ action: "cta_click", category: "blog_top", label: "tool_right_material_en" }}
              >
                Use the Material Suggestion Tool
              </ShimmerButton>
              <Link
                href="/en/3d-printen"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Go to the 3D printing pillar
              </Link>
              <Link
                href="/en/pricing"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                See price impact
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="en" />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <GlassCard className="flex flex-col gap-4 border border-emerald-100 bg-white/85 p-6 shadow-lg backdrop-blur">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">Next step</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">Check price & pick a material</h2>
              <p className="mt-2 text-sm text-slate-700">
                Open the calculator and prefill material advice in one go. Faster intake, clearer budget.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ShimmerButton
                href={pricingHref}
                event={{ action: "cta_click", category: "blog_mid", label: "pricing_right_material_en_mid" }}
              >
                Go to pricing
              </ShimmerButton>
              <ShimmerButton
                href={toolHref}
                event={{ action: "cta_click", category: "blog_mid", label: "tool_right_material_en_mid" }}
              >
                Start material advice
              </ShimmerButton>
              <Link
                href={contactHref}
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Request a tailored quote
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Step-by-step flow</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">From context to material</h2>
              <p className="mt-2 text-sm text-slate-600">
                Use these questions as a quick checklist. At the end you will know whether PLA Matte, PETG or TPU is the base and whether we need to add
                specials like Silk+, Marble, Wood or Glow.
              </p>
              <ol className="mt-6 space-y-4 text-sm text-slate-700">
                {decisionSteps.map((step, index) => (
                  <li key={step.title} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Step {index + 1}</p>
                    <h3 className="mt-1 text-lg font-semibold text-slate-900">{step.title}</h3>
                    <p className="mt-1">{step.detail}</p>
                  </li>
                ))}
              </ol>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Material mapping</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">When to choose which blend?</h2>
                          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
                {materialMappings.map((item) => (
                  <div key={item.material} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <h3 className="text-lg font-semibold text-slate-900">{item.material}</h3>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Best for</p>
                    <ul className="mt-1 space-y-1 text-sm text-slate-600">
                      {item.bestFor.map((use) => (
                        <li key={use} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                          <span>{use}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-sm text-slate-600">{item.why}</p>
                    <div className="mt-3 flex flex-col gap-2">
                      {item.links.map((link) => (
                        <Link
                          key={`${item.material}-${link.href}`}
                          href={link.href}
                          className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Scenarios</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">What fits your request?</h2>
                          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
                {scenarios.map((scenario) => (
                  <div key={scenario.title} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <h3 className="text-lg font-semibold text-slate-900">{scenario.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{scenario.recommendation}</p>
                    <div className="mt-3 flex flex-col gap-2">
                      {scenario.links.map((link) => (
                        <Link
                          key={`${scenario.title}-${link.href}`}
                          href={link.href}
                          className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Further reading</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Checklists and external sources</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                  <h3 className="text-lg font-semibold text-slate-900">Internal checklists</h3>
                  <ul className="mt-2 space-y-2 text-sm text-slate-600">
                    <li>
                      <Link href="/en/materials#material-suggestion-tool" className="text-indigo-600 transition hover:text-indigo-500">
                        Material Suggestion Tool
                      </Link>
                    </li>
                    <li>
                      <Link href="/en/pricing" className="text-indigo-600 transition hover:text-indigo-500">
                        Pricing & lead times
                      </Link>
                    </li>
                    <li>
                      <Link href="/en/viewer" className="text-indigo-600 transition hover:text-indigo-500">
                        Upload STL/STEP via the viewer
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                  <h3 className="text-lg font-semibold text-slate-900">External sources</h3>
                  <ul className="mt-2 space-y-2 text-sm text-slate-600">
                    <li>
                      <a
                        href="https://wiki.bambulab.com/en/filament/pla-basic"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 transition hover:text-indigo-500"
                      >
                        Bambu Lab PLA guide
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://wiki.bambulab.com/en/filament/petg"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 transition hover:text-indigo-500"
                      >
                        Bambu Lab PETG notes
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://help.prusa3d.com/article/different-nozzle-types_2193"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 transition hover:text-indigo-500"
                      >
                        Prusa: nozzle types
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <GlassCard className="flex flex-col gap-6 border border-white/40 bg-white/85 p-6 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Next step</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Still doubting between two materials?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Share STL or STEP, tell us where the part will be used and we will simulate material and price impact. You get a clear recommendation and
                  backup option so stakeholders can decide.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact">Schedule a call</ShimmerButton>
                <Link href="/en/pricing" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  View pricing & workflow
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>
      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">
          <h2 id="sources" className="text-2xl font-semibold text-slate-900">Sources and references</h2>
          <p className="mt-2 text-sm text-slate-600">Primary references that support the material and workflow guidance in this article.</p>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            {references.map((ref) => (
              <li key={ref.href} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                <a href={ref.href} target="_blank" rel="noreferrer" className="text-base font-semibold text-indigo-600">
                  {ref.label}
                </a>
                <p className="mt-1 text-sm text-slate-600">{ref.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <BlogFaq title={faq.title} items={faq.items} inLanguage="en-BE" />


      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <BlogAuthorNote locale="en" />
    </main>
  )
}


