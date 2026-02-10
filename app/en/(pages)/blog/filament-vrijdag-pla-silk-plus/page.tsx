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

const canonical = "https://www.x3dprints.be/en/blog/filament-vrijdag-pla-silk-plus/"
const publishedDate = "2025-10-31T08:00:00+02:00"
const dateModified = "2026-02-08"
const faq = BLOG_FAQ_EN["filament-vrijdag-pla-silk-plus"]
const lastUpdatedLabel = "Last updated: 8 February 2026"

export const metadata: Metadata = {
  title: "PLA Silk+ 3D printing: high gloss without drama | X3DPrints",
  description:
    "Filament Friday. All about PLA Silk+: silky gloss, stronger blend than classic silk PLA, settings and applications for branding, props and displays.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/filament-vrijdag-pla-silk-plus/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/filament-vrijdag-pla-silk-plus/",
    },
  },
  openGraph: {
    title: "PLA Silk+ 3D printing: gloss, colour and surprising strength",
    description:
      "PLA Silk+ explained by X3DPrints: properties, print settings, typical use cases and how it compares to standard PLA and other aesthetic filaments.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["PLA Silk 3D printing", "PLA Silk+", "Filament Friday", "glossy filament"],
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "PLA Silk+ filament guidance by X3DPrints" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filament Friday: PLA Silk+ 3D printing",
    description: "PLA Silk+ properties, settings and practical advice for brand objects, displays and decorative prints.",
    images: ["/images/og-home.jpg"],
  },
}

const heroStats = [
  { label: "Surface", value: "Silky high gloss", detail: "Ideal for visible work and premium branding" },
  { label: "Blend", value: "Reinforced silk PLA", detail: "Tougher than classic silk variants" },
  { label: "Recommended use", value: "Display and brand objects", detail: "When look and colour are as important as form" },
]

const printSettings = [
  { label: "Nozzle", value: "205-225 C", note: "Start near your PLA profile; go higher for extra gloss and thicker layers" },
  { label: "Bed", value: "55-60 C", note: "Standard PLA settings on PEI usually work fine" },
  { label: "Speed", value: "40-60 mm/s", note: "Slightly slower than PLA for stable gloss and better layer bonding" },
  { label: "Cooling", value: "60-100%", note: "More cooling for detail, less for adhesion" },
  { label: "Layer height", value: "0.16-0.24 mm", note: "Thinner layers give smoother reflections on visible faces" },
  { label: "Retraction", value: "0.8-1.2 mm", note: "Keep slightly lower than standard PLA to limit stringing" },
]

const whenToUse = [
  "Logo blocks, awards, plinths and brand objects where gloss is part of the concept.",
  "Showcase prototypes for marketing and sales that need a premium feel.",
  "Cosplay parts and props that must suggest luxury or futuristic materials.",
  "Interior accents and small decor pieces that reflect light nicely.",
]

const whenToAvoid = [
  "Functional brackets or clips under load; choose PETG or engineering materials.",
  "Outdoor projects in direct sun where PLA heat limits apply.",
  "Extremely small embossed details; silk sheen can soften micro detail.",
  "Ultra-budget jobs where standard PLA meets the brief.",
]

const mitigationTips = [
  { title: "Stringing control", insight: "Lower retraction slightly vs PLA and keep filament dry; drop nozzle a few degrees if wisps appear." },
  { title: "Gloss consistency", insight: "Avoid too-high speeds; 40-50 mm/s keeps sheen even across flat areas." },
  { title: "Layer lines on curves", insight: "Use 0.16-0.2 mm layers on highly visible curves; align layer direction with reflections when possible." },
  { title: "Adhesion vs detail", insight: "Reduce fan on first layers, then ramp to 80-100% for crisp edges and text." },
]

const resourceLinks = [
  { label: "3D printing pillar", href: "/en/3d-printen", description: "Workflow, materials and typical studio cases." },
  { label: "Materials library", href: "/en/materials", description: "See PLA Silk+, Matte, Marble and other visuals." },
  { label: "Material Suggestion Tool", href: "/en/materials#material-suggestion-tool", description: "Wizard to confirm your material choice." },
  { label: "Pricing & calculator", href: "/en/pricing", description: "See cost/lead impact of Silk+ vs base PLA." },
]

const references = [
  {
    label: "Bambu Lab - PLA guide",
    href: "https://wiki.bambulab.com/en/filament/pla",
    description: "Baseline PLA profile to adapt for Silk+.",
  },
  {
    label: "Prusa - Smoothing and painting prints",
    href: "https://blog.prusa3d.com/how-to-smooth-and-paint-3d-prints_12547/",
    description: "If you plan to clear coat or paint over Silk+.",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "PLA Silk+ 3D printing: high gloss without drama",
  description: metadata.description ?? "",
  datePublished: publishedDate,
  dateModified,
  image: "https://www.x3dprints.be/images/og-home.jpg",
  inLanguage: "en-BE",
})


export default function FilamentFridayPlaSilkPlusEnPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(160%_90%_at_50%_-20%,rgba(248,180,255,0.2),transparent_75%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.08]" />

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
                <li className="font-medium text-slate-900">PLA Silk+</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Filament Friday</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              PLA Silk+: shine without the headaches.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Silk+ delivers glossy, saturated prints that hold up better than classic silk. Here is how to set it up, when to use it, and when a different
              filament makes more sense.
            </p>
                        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="stacked-actions mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <ShimmerButton href="/en/materials">See PLA visuals</ShimmerButton>
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
            <p className="mt-4 text-sm text-slate-500">Published 31 October 2025 - part of the Filament Friday series.</p>
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
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Settings for PLA Silk+</h2>
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
              <h2 className="text-2xl font-semibold text-slate-900">When Silk+ shines</h2>
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
              <h2 className="text-2xl font-semibold text-slate-900">When to avoid Silk+</h2>
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Need a glossy finish for your brand piece?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Share your STL/STEP and target look. We will advise Silk+ vs Matte/Marble and provide settings, lead time and cost impact.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact?material=PLA">Ask for Silk+ advice</ShimmerButton>
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






