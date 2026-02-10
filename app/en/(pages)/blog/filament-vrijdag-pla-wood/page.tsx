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

const canonical = "https://www.x3dprints.be/en/blog/filament-vrijdag-pla-wood/"
const publishedDate = "2025-09-26T08:00:00+02:00"
const dateModified = "2026-02-08"
const faq = BLOG_FAQ_EN["filament-vrijdag-pla-wood"]
const lastUpdatedLabel = "Last updated: 8 February 2026"

export const metadata: Metadata = {
  title: "Wood filament 3D printing: PLA Wood and specials | X3DPrints",
  description:
    "Filament Friday #4. Everything about PLA Wood and special PLA filaments: settings, applications, finishing and comparison with other aesthetic blends.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/filament-vrijdag-pla-wood/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/filament-vrijdag-pla-wood/",
    },
  },
  openGraph: {
    title: "Wood filament 3D printing: PLA Wood and specials",
    description:
      "PLA Wood explained by X3DPrints: settings, applications, limitations and tips for aesthetic prints with wood, marble or silk blends.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["PLA Wood", "Wood filament", "Filament Friday", "PLA specials"],
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "PLA Wood advice by X3DPrints" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filament Friday #4: PLA Wood and specials",
    description:
      "Wood filament for design, props and interior. Learn how PLA Wood and other special blends behave in the studio.",
    images: ["/images/og-home.jpg"],
  },
}

const heroStats = [
  { label: "Composition", value: "ca. 70% PLA / 30% wood", detail: "Fine wood powder in a PLA matrix" },
  { label: "Nozzle range", value: "190-240 C", detail: "Bambu PLA Wood runs stable around 220 C" },
  { label: "Bed temperature", value: "35-45 C", detail: "Low bed temp for easy release" },
]

const woodAndSpecialVariants = [
  {
    name: "PLA Wood",
    description:
      "PLA mixed with wood powder for a warm texture and subtle colour variations. Feels less plasticky and can be lightly sanded.",
    bestFor: ["Interior decor", "Awards and trophies", "Packaging mockups"],
  },
  {
    name: "PLA Marble",
    description: "Mineral flakes create a stone effect with soft highlights. Ideal for sculptures, busts and architectural maquettes.",
    bestFor: ["Statues and busts", "Architecture models", "Premium displays"],
  },
  {
    name: "PLA Silk & Dual Color",
    description:
      "High gloss and depth effect in the layers. Less structural than base PLA but visually superb for branding and showpieces.",
    bestFor: ["Retail props", "Logo objects", "Giveaways"],
  },
  {
    name: "PLA Specials (Galaxy, Glow, Metal)",
    description: "Metallic flakes, glitter or glow-in-the-dark pigment. Perfect when an object must stand out in light or dark.",
    bestFor: ["Merchandising", "Cosplay", "Limited editions"],
  },
]

const printSettings = [
  { label: "Nozzle", value: "200-220 C", note: "Start ~210 C for PLA Wood, fine-tune per brand" },
  { label: "Bed", value: "35-45 C", note: "Lightly heated bed plus glue or PEI texture" },
  { label: "Speed", value: "35-60 mm/s", note: "Keep it gentle to avoid discoloration and stringing" },
  { label: "Nozzle diameter", value: "0.4-0.6 mm", note: "Larger nozzle reduces clog risk" },
  { label: "Cooling", value: "60-100%", note: "More cooling for sharp details, less on thick layers" },
]

const whenToUse = [
  "Design objects where material feel matters as much as form.",
  "Interior pieces, signage and branding props with a natural look.",
  "Statues, busts and mockups that suggest wood or marble.",
  "Aesthetic prints for socials, trade shows and portfolio shoots.",
  "Packaging and retail concepts where clients want to feel the end result.",
]

const whenToAvoid = [
  "Functional parts under mechanical load.",
  "Environments above 55 C (car dashboards, production floors).",
  "Projects with aggressive chemicals or heavy impact.",
  "Technical uses where dimensional stability under load is crucial.",
  "Budget cases where standard PLA suffices.",
]

const comparisonRows = [
  { property: "Focus", plaBasic: "Balance of price, detail and speed.", plaWood: "Look & feel, warm texture, tactility.", plaSpecials: "Visual effect (gloss, sparkles, glow)." },
  { property: "Mechanical strength", plaBasic: "Baseline for light uses.", plaWood: "Slightly more brittle due to wood, mainly aesthetic.", plaSpecials: "Similar to PLA; Silk can be a bit weaker." },
  { property: "Printability", plaBasic: "Very high, forgiving.", plaWood: "Medium; needs nozzle care and temperature control.", plaSpecials: "Medium to high; Silk/Metal need extra tuning." },
  { property: "Nozzle wear", plaBasic: "Low, brass nozzle is fine.", plaWood: "Medium; wood particles can wear over time.", plaSpecials: "Galaxy/Metal are more abrasive, hardened nozzle recommended." },
  { property: "Finishing", plaBasic: "Sanding and priming possible, neutral base.", plaWood: "Excellent for sanding and light staining, feels like wood.", plaSpecials: "Silk mainly for raw display, less ideal for sanding." },
  { property: "Cost per print", plaBasic: "Lowest material price.", plaWood: "Higher filament cost and slower runtimes.", plaSpecials: "Higher, often for small premium runs.", },
]

const mitigationTips = [
  {
    title: "Prevent clogs",
    insight: "Use 0.4-0.6 mm nozzles, avoid excessive temps and purge between jobs with standard PLA to clear wood particles.",
  },
  {
    title: "Avoid burnt spots",
    insight: "See dark specks? Lower temperature step by step and limit long retractions, otherwise the wood mix caramelizes in the nozzle.",
  },
  {
    title: "Hide layer lines",
    insight: "Combine 0.16 mm layers with moderate speeds and enough cooling. For Marble and Silk, orientation controls how light plays.",
  },
  {
    title: "Finishing",
    insight: "PLA Wood can be sanded and lightly stained. Test on a scrap piece and avoid aggressive products: the PLA base stays sensitive.",
  },
]

const resourceLinks = [
  { label: "3D printing pillar", href: "/en/3d-printen", description: "Workflow, materials and typical use cases." },
  { label: "Materials library", href: "/en/materials", description: "Swatches and stock for PLA Wood, Marble, Silk and other specials." },
  { label: "PLA Wood sheet", href: "/en/materials/pla-wood", description: "Studio settings and colours for PLA Wood." },
  { label: "Pricing & calculator", href: "/en/pricing", description: "See impact of longer runtimes and special filaments." },
]

const references = [
  {
    label: "Bambu Lab PLA Wood TDS",
    href: "https://store.bblcdn.com/s4/default/6fda0ae88e5a4e66bb5d58f2968eee42/Bambus_PLA_Wood_Technical_Data_Sheet.pdf",
    description: "Recommended temperatures, mechanical properties and drying advice.",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "Wood filament 3D printing: PLA Wood and specials",
  description: metadata.description ?? "",
  datePublished: publishedDate,
  dateModified,
  image: "https://www.x3dprints.be/images/og-home.jpg",
  inLanguage: "en-BE",
})


export default function FilamentFridayPlaWoodEnPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(150%_85%_at_50%_-15%,rgba(190,155,103,0.18),transparent_70%)]"
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
                <li className="font-medium text-slate-900">PLA Wood</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Filament Friday #4</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Wood filament: warm textures without paint.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Use this guide to print PLA Wood and other special blends reliably: nozzle temps, clog prevention, when to choose it and when a basic PLA or
              Silk/Marble is a better call.
            </p>
                        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="stacked-actions mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <ShimmerButton href="/en/materials/pla-wood">View PLA Wood sheet</ShimmerButton>
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
                Pricing & calculator
              </Link>
            </div>
            <p className="mt-4 text-sm text-slate-500">Published 26 September 2025 - part of the Filament Friday series.</p>
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
          {woodAndSpecialVariants.map((variant) => (
            <Reveal key={variant.name}>
              <GlassCard className="h-full border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Variant</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">{variant.name}</h2>
                <p className="mt-2 text-sm text-slate-600">{variant.description}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Best for</p>
                <ul className="mt-1 space-y-1 text-sm text-slate-600">
                  {variant.bestFor.map((use) => (
                    <li key={use} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
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
              <h2 className="text-2xl font-semibold text-slate-900">Settings we use for wood and specials</h2>
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
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">When to choose PLA Wood or specials</h2>
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
              <h2 className="text-2xl font-semibold text-slate-900">When to avoid them</h2>
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
              <h2 className="text-2xl font-semibold text-slate-900">PLA Basic vs Wood vs Specials</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead className="text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="py-2 pr-4">Property</th>
                      <th className="py-2 pr-4">PLA Basic</th>
                      <th className="py-2 pr-4">PLA Wood</th>
                      <th className="py-2 pr-4">PLA Specials</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {comparisonRows.map((row) => (
                      <tr key={row.property}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{row.property}</td>
                        <td className="py-3 pr-4">{row.plaBasic}</td>
                        <td className="py-3 pr-4">{row.plaWood}</td>
                        <td className="py-3 pr-4">{row.plaSpecials}</td>
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
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Mitigate common issues</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                {mitigationTips.map((tip) => (
                  <div key={tip.title} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <p className="text-sm font-semibold text-slate-900">{tip.title}</p>
                    <p className="mt-2">{tip.insight}</p>
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Need a wood or special finish?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Share your STL/STEP and target vibe. We will advise PLA Wood, Marble, Silk or a metallic/glow variant with clear settings and lead time.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact?material=PLA">Request material advice</ShimmerButton>
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





