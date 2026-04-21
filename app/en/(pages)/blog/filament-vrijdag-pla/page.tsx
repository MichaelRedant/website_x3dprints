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

const canonical = "https://www.x3dprints.be/en/blog/filament-vrijdag-pla/"
const publishedDate = "2025-09-05T08:00:00+02:00"
const dateModified = "2026-02-09"
const faq = BLOG_FAQ_EN["filament-vrijdag-pla"]
const lastUpdatedLabel = "Last updated: 9 February 2026"
const materialsGuideHref =
  "/en/blog/3d-print-materialen-gids?utm_source=blog&utm_medium=internal&utm_campaign=filament-friday-pla"

export const metadata: Metadata = {
  title: "PLA 3D printing: properties, uses and expert tips | X3DPrints",
  description:
    "Filament Friday #1. See when PLA shines, where it fails and how to use variants like Matte, Marble and Wood. Includes settings and comparison to PETG/TPU.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/filament-vrijdag-pla/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/filament-vrijdag-pla/",
    },
  },
  openGraph: {
    title: "PLA 3D printing: properties, uses and expert tips",
    description:
      "X3DPrints Filament Friday. Everything about PLA: properties, applications, limitations and print settings plus comparison to PETG and TPU.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["PLA 3D printing", "Filament Friday", "3D print material"],
    images: [{ url: "/images/og-home-en.svg", width: 1200, height: 630, alt: "PLA filament guidance by X3DPrints" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filament Friday #1: PLA 3D printing guide",
    description: "PLA properties, limits, settings and alternatives from a local 3D print studio.",
    images: ["/images/og-home-en.svg"],
  },
}

const heroStats = [
  { label: "Layer height sweet spot", value: "0.16 mm", detail: "Detail without extreme print time" },
  { label: "Heat resistance", value: "~55 C", detail: "Softens above this; risky in heat" },
  { label: "Typical lead time", value: "2-4 days", detail: "Depends on colour and finish" },
]

const plaVariants = [
  {
    name: "PLA Basic",
    description:
      "Solid colours, affordable and perfect for prototypes and merch where look matters more than function. Available in a set of studio colours.",
    bestFor: ["Sales kits", "Proof-of-concepts", "Interior decor"],
  },
  {
    name: "PLA Matte",
    description:
      "Powdery finish with reduced layer visibility, loved for design objects and branding. Ideal when prints are viewed up close.",
    bestFor: ["Display parts", "Marketing props", "Interior decor"],
  },
  {
    name: "PLA Marble",
    description:
      "Stone-like speckles with soft highlights. Ideal for sculptures, busts and architectural mockups where the material should feel like a small design object.",
    bestFor: ["Statues", "Awards", "Premium gifting"],
  },
  {
    name: "PLA Wood",
    description:
      "Blend with wood fibres for a warm look. Needs lower speeds and tighter slicer tuning, but delivers a tactile result that feels close to wood.",
    bestFor: ["Cosplay accessories", "Retail displays", "Craft-style collectibles"],
  },
]

const printSettings = [
  { label: "Nozzle", value: "200-210 C", note: "Matte or special blends up to 215 C" },
  { label: "Bed", value: "55-60 C", note: "Helps first layer and prevents lifting" },
  { label: "Speed", value: "50-70 mm/s", note: "Go slower (40 mm/s) for wood/marble" },
  { label: "Cooling", value: "100% from layer 3", note: "Keep fan around 60-80% on tough bridges" },
  { label: "Retraction", value: "0.8-1.2 mm", note: "Direct drive. Bowden usually +0.3-0.5 mm baseline" },
]

const whenToUse = [
  "Marketing material, awards, stands and samples with focus on look and feel.",
  "Tabletop minis, props and interior decor where fine detail matters.",
  "Prototypes that mainly show form and have little functional load.",
  "Housings and covers that do not get hot and stay indoors.",
  "Educational projects and workshops where reliability and budget count.",
]

const whenToAvoid = [
  "Parts that live outdoors or get direct sun (car dashboards, shop windows).",
  "Cases that hit above 55 C: production floors, machines or server cabinets.",
  "Parts that take impacts or torsion like clips, clamps and technical hinges.",
  "Objects in contact with chemicals or oily environments (garage, kitchen, production).",
  "Fixtures under continuous stress where creep appears.",
]

const comparisonRows = [
  {
    property: "Printability",
    pla: "Very high: plug and play on most FDM printers.",
    petg: "Medium: needs drying, fan tuning and more experience.",
    tpu: "Low: slow feed, good extruder and profile required.",
  },
  {
    property: "Temperature",
    pla: "Up to roughly 55-60 C before noticeable softening.",
    petg: "Up to roughly 75-80 C with mild flex.",
    tpu: "Up to roughly 70 C as long as it is not under load.",
  },
  {
    property: "Flexibility",
    pla: "Rigid and more brittle on impact.",
    petg: "Tough, slightly giving and less brittle.",
    tpu: "Very flexible, rubber-like behaviour.",
  },
  {
    property: "Outdoor / UV",
    pla: "Not recommended for long outdoor use.",
    petg: "Much better choice for outdoor and humid environments.",
    tpu: "Depends on blend, often sufficient for outdoor use.",
  },
  {
    property: "Finish",
    pla: "Many variants (matte, silk, marble) with high detail fidelity.",
    petg: "Semi-gloss, translucent possible but layer lines a bit more visible.",
    tpu: "Rubber-like look, lines visible.",
  },
  {
    property: "Cost per print",
    pla: "Lowest material cost and often shorter machine hours.",
    petg: "About 20% higher material budget and a bit more tuning.",
    tpu: "Around 30-40% higher, plus longer print time due to lower speed.",
  },
]

const mitigationTips = [
  {
    title: "Prevent heat deformation",
    insight:
      "Do not leave PLA in cars or shop windows. Choose PETG for displays facing the sun or test with a small PLA print and heat exposure before ordering a full batch.",
  },
  {
    title: "Counter impact sensitivity",
    insight: "Add ribs, use at least 3 perimeters and thicken walls (1.6 mm or more). For functional clips choose PETG or TPU.",
  },
  {
    title: "UV and discoloration",
    insight: "Use a protective varnish or set expectations on lifespan. PLA Matte holds up far better indoors than in direct sun.",
  },
  {
    title: "Detail loss at high speeds",
    insight: "Stay at 0.16 mm layers and under 60 mm/s for visible parts. Faster profiles from 70 mm/s are fine for internal parts and concept pieces.",
  },
]

const resourceLinks = [
  { label: "3D printing pillar", href: "/en/3d-printen", description: "Full workflow, materials and FAQ." },
  { label: "Materials library", href: "/en/materials", description: "Swatches and stock status of PLA variants." },
  { label: "Pricing and calculator", href: "/en/pricing", description: "See direct impact of layer height and material choice." },
  { label: "Material Suggestion Tool", href: "/en/materials#material-suggestion-tool", description: "Let the wizard propose a material." },
]

const references = [
  {
    label: "Prusa Knowledge Base - PLA",
    href: "https://help.prusa3d.com/category/pla_204",
    description: "Official guidance on temperature, drying and post-processing.",
  },
  {
    label: "Ultimaker Support - PLA guide",
    href: "https://support.ultimaker.com/hc/en-us/articles/360012015419-About-Ultimaker-PLA",
    description: "Properties, storage and print profiles from an industrial perspective.",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "PLA 3D printing: properties, uses and expert tips",
  description: metadata.description ?? "",
  datePublished: publishedDate,
  dateModified,
  image: "https://www.x3dprints.be/images/og-home-en.svg",
  inLanguage: "en-BE",
})


export default function FilamentFridayPlaEnPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(150%_85%_at_50%_-15%,rgba(147,197,253,0.18),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.07]" />

      <section className="px-6 pb-12 pt-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal className="stacked-content">
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
                <li className="font-medium text-slate-700">Filament Friday</li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-900">PLA</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Filament Friday #1</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              PLA: when to use it, when to avoid it.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              This guide shows where PLA excels, where it fails and how to pick the right variant (Matte, Marble, Wood). Use the settings below as a
              reliable starting point for studio-quality prints.
            </p>
                        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="stacked-actions mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <ShimmerButton href="/en/materials/pla-matte">View PLA Matte</ShimmerButton>
              <Link
                href="/en/materials#material-suggestion-tool"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Material Suggestion Tool
              </Link>
              <Link
                href="/en/pricing"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Pricing & lead times
              </Link>
            </div>
            <p className="mt-4 text-sm text-slate-500">Published 5 September 2025 - part of the Filament Friday series.</p>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="en" />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-4 rounded-3xl border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur sm:grid-cols-3">
          {heroStats.map((stat) => (
            <Reveal key={stat.label}>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{stat.label}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-600">{stat.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {plaVariants.map((variant) => (
            <Reveal key={variant.name}>
              <GlassCard className="h-full border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Variant</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">{variant.name}</h2>
                <p className="mt-2 text-sm text-slate-600">{variant.description}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Best for</p>
                <ul className="mt-1 space-y-1 text-sm text-slate-600">
                  {variant.bestFor.map((use) => (
                    <li key={use} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                      <span>{use}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Settings we use in the studio</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead className="text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="py-2 pr-4">Parameter</th>
                      <th className="py-2 pr-4">Value</th>
                      <th className="py-2 pr-4">Note</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {printSettings.map((setting) => (
                      <tr key={setting.label}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{setting.label}</td>
                        <td className="py-3 pr-4">{setting.value}</td>
                        <td className="py-3 pr-4">{setting.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Running Bambu refills and want to keep multiple PLA colours ready faster? An extra{" "}
                <Link href="/en/shop/bambu-reusable-spool" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Bambu reusable spool
                </Link>{" "}
                is useful as a spare or refill base in that workflow.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">When PLA is a good idea</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {whenToUse.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.05}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">When to avoid PLA</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {whenToAvoid.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">PLA vs PETG vs TPU</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead className="text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="py-2 pr-4">Property</th>
                      <th className="py-2 pr-4">PLA</th>
                      <th className="py-2 pr-4">PETG</th>
                      <th className="py-2 pr-4">TPU</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {comparisonRows.map((row) => (
                      <tr key={row.property}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{row.property}</td>
                        <td className="py-3 pr-4">{row.pla}</td>
                        <td className="py-3 pr-4">{row.petg}</td>
                        <td className="py-3 pr-4">{row.tpu}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Mitigate PLA weaknesses</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {mitigationTips.map((tip) => (
                  <div key={tip.title} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <p className="text-sm font-semibold text-slate-900">{tip.title}</p>
                    <p className="mt-2 text-sm text-slate-600">{tip.insight}</p>
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
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 id="sources" className="text-2xl font-semibold text-slate-900">Sources and references</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Internal links</p>
                  <ul className="mt-2 space-y-2 text-sm text-slate-600">
                    {resourceLinks.map((resource) => (
                      <li key={resource.href}>
                        <Link href={resource.href} className="text-indigo-600 transition hover:text-indigo-500">
                          {resource.label}
                        </Link>
                        <p className="text-xs text-slate-500">{resource.description}</p>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-sm text-slate-600">
                    Need more context? Read the{" "}
                    <Link href={materialsGuideHref} className="font-semibold text-emerald-600 hover:text-emerald-700">
                      3D print materials guide
                    </Link>
                    .
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Sources and references</p>
                  <ul className="mt-2 space-y-2 text-sm text-slate-600">
                    {references.map((ref) => (
                      <li key={ref.href}>
                        <cite className="not-italic"><a
                          href={ref.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 transition hover:text-indigo-500"
                        >
                          {ref.label}
                        </a></cite>
                        <p className="text-xs text-slate-500">{ref.description}</p>
                      </li>
                    ))}
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Need a PLA recommendation?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Send your STL/STEP and context. We will propose the right PLA variant or an alternative if heat or impact are concerns.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact?material=PLA">Ask for PLA advice</ShimmerButton>
                <Link href="/en/pricing" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  View pricing & lead times
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogFaq title={faq.title} items={faq.items} inLanguage="en-BE" mainEntityOfPage={canonical} />


      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <BlogAuthorNote locale="en" />

    </main>
  )
}





