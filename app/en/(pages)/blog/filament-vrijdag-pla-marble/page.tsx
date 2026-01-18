import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/en/blog/filament-vrijdag-pla-marble"
const publishedDate = "2025-10-10T08:00:00+02:00"

export const metadata: Metadata = {
  title: "PLA Marble 3D printing: stone look without weight | X3DPrints",
  description:
    "Filament Friday #5. All about PLA Marble: variants, settings and use cases for interior, retail and cosplay - plus why finishing is often unnecessary.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/filament-vrijdag-pla-marble",
      en: canonical,
    },
  },
  openGraph: {
    title: "PLA Marble 3D printing: stone look without weight",
    description:
      "PLA Marble explained by X3DPrints: blends, print settings, troubleshooting and when to pick another material.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["Filament Friday", "PLA Marble", "Special PLA", "Design props"],
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "PLA Marble advice by X3DPrints" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filament Friday #5: PLA Marble 3D printing",
    description: "Stone look without weight: PLA Marble variants, settings and applications from the X3DPrints studio.",
    images: ["/images/og-home.jpg"],
  },
}

const heroStats = [
  { label: "Layer height", value: "0.16-0.28 mm", detail: "Higher layers = more pronounced texture" },
  { label: "Nozzle advice", value: "0.4-0.6 mm", detail: "0.6 mm softens layer lines further" },
  { label: "Best cases", value: "Interior | Cosplay | Retail", detail: "Aesthetics first, not strength" },
]

const marbleVariants = [
  {
    name: "PLA Marble Classic",
    description: "Subtle speckles in white/grey. Our default for plinths, vases and nameplates in branding projects.",
    bestFor: ["Interior decor", "Plinths", "Premium giveaways"],
  },
  {
    name: "PLA Concrete / Stone",
    description: "Coarser grain for a concrete look. Makes architectural models and displays feel heavy without mass.",
    bestFor: ["Architecture maquettes", "Retail displays", "Concept mockups"],
  },
  {
    name: "PLA Granite Blend",
    description: "More contrast and colour flecks. Popular for cosplay armour and showpieces that need to pop at a distance.",
    bestFor: ["Cosplay armour", "Event props", "Trade show decor"],
  },
  {
    name: "PLA Marble Light",
    description: "Minimal Scandinavian tint that fits lifestyle shoots and modern retail furniture.",
    bestFor: ["Lifestyle props", "Retail props", "Design prototypes"],
  },
]

const printSettings = [
  { label: "Nozzle", value: "195-215 C", note: "Go higher for darker blends or 0.6 mm nozzle" },
  { label: "Bed", value: "55-60 C", note: "PEI + glue stick is enough; barely any warping" },
  { label: "Speed", value: "45-80 mm/s", note: "Slower for crisp patterns on visible faces" },
  { label: "Cooling", value: "80-100%", note: "Keep details crisp and prevent pigment build-up" },
  { label: "Layer height", value: "0.16-0.28 mm", note: "Experiment; higher layers emphasise stone look" },
  { label: "Retraction", value: "0.8-1.2 mm", note: "Avoid microstringing on pigment-rich blends" },
]

const whenToUse = [
  "Interior decor and lifestyle props where weight is unwanted.",
  "Cosplay armour, props and accessories that must look heavy.",
  "Retail and trade show displays that need a luxurious, stone-like feel.",
  "Architectural models and mockups that must convince clients.",
  "Design prototypes and presentations where aesthetics trump strength.",
]

const whenToAvoid = [
  "Functional parts with impact or torsion - pick PETG or nylon.",
  "Outdoor projects in direct sun or near heat sources.",
  "Thin clips or flexible parts (choose TPU or PETG).",
  "Budget cases where standard PLA is enough.",
]

const comparisonRows = [
  { property: "Printability", marble: "High; PLA profile with minor tweaks.", matte: "Very high; most forgiving.", petg: "Medium; needs drying and calm speeds." },
  { property: "Layer lines", marble: "Pigments naturally hide lines.", matte: "Diffuse finish reduces lines strongly.", petg: "Visible unless profile is dialed." },
  { property: "Detail", marble: "Very good at 0.16-0.2 mm layers.", matte: "Good; sharp corners stay crisp.", petg: "Average; corners get slightly rounder." },
  { property: "Temperature", marble: "PLA base stays low (avoid >55 C).", matte: "Also PLA, same limits.", petg: "Usable up to ~80 C.", },
  { property: "Look & feel", marble: "Stone-like with diffuse highlights.", matte: "Ultra clean, even.", petg: "Semi-gloss, functional.", },
]

const mitigationTips = [
  { title: "Pigment build-up around details", insight: "Lower speed or raise nozzle temp slightly so contours flow smoother." },
  { title: "Irregular texture", insight: "Avoid variable layer height, keep cooling consistent and try a 0.6 mm nozzle." },
  { title: "Microstringing", insight: "Increase retraction a bit, keep filament dry and, if needed, drop nozzle 5 C." },
]

const resourceLinks = [
  { label: "PLA materials", href: "/en/materials/pla", description: "See all PLA variants, including Marble and Matte." },
  { label: "3D printing pillar", href: "/en/3d-printen", description: "Workflow, materials and typical studio cases." },
  { label: "Material Suggestion Tool", href: "/en/materials#material-suggestion-tool", description: "Let the wizard confirm your material choice." },
  { label: "Pricing & calculator", href: "/en/pricing", description: "See how material choice impacts the quote." },
]

const externalReferences = [
  {
    label: "Bambu Lab PLA material guide",
    href: "https://wiki.bambulab.com/en/filament/pla",
    description: "Official baseline for PLA profiles on X1/P1 printers (works for Marble too).",
  },
  {
    label: "Prusa - Painting & post-processing PLA",
    href: "https://help.prusa3d.com",
    description: "Finishing tips if you still want to coat or paint Marble parts.",
  },
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "PLA Marble 3D printing: stone look without weight",
  description:
    "PLA Marble guide: variants, settings, troubleshooting and when to use it. Part of the Filament Friday series by X3DPrints.",
  datePublished: publishedDate,
  dateModified: publishedDate,
  author: { "@type": "Organization", name: "X3DPrints", url: "https://www.x3dprints.be" },
  publisher: {
    "@type": "Organization",
    name: "X3DPrints",
    url: "https://www.x3dprints.be",
    logo: { "@type": "ImageObject", url: "https://www.x3dprints.be/og-x3dprints.jpg" },
  },
  mainEntityOfPage: canonical,
  url: canonical,
  image: "https://www.x3dprints.be/images/og-home.jpg",
  inLanguage: "en-BE",
}

export default function FilamentFridayPlaMarbleEnPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(150%_85%_at_50%_-15%,rgba(148,163,184,0.22),transparent_70%)]"
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
                <li className="font-medium text-slate-900">PLA Marble</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Filament Friday #5</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              PLA Marble: stone look without the weight.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Use this guide to print PLA Marble confidently: which blends to pick, how to set temps, and how to avoid texture issues or stringing.
            </p>
            <div className="stacked-actions mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <ShimmerButton href="/en/materials/pla">See PLA variants</ShimmerButton>
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
            <p className="mt-4 text-sm text-slate-500">Published 10 October 2025 - part of the Filament Friday series.</p>
          </Reveal>
        </div>
      </section>

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
          {marbleVariants.map((variant) => (
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
              <h2 className="text-2xl font-semibold text-slate-900">Settings for PLA Marble</h2>
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
              <h2 className="text-2xl font-semibold text-slate-900">When PLA Marble shines</h2>
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
              <h2 className="text-2xl font-semibold text-slate-900">When to avoid it</h2>
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
              <h2 className="text-2xl font-semibold text-slate-900">PLA Marble vs PLA Matte vs PETG</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead className="text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="py-2 pr-4">Property</th>
                      <th className="py-2 pr-4">PLA Marble</th>
                      <th className="py-2 pr-4">PLA Matte</th>
                      <th className="py-2 pr-4">PETG</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {comparisonRows.map((row) => (
                      <tr key={row.property}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{row.property}</td>
                        <td className="py-3 pr-4">{row.marble}</td>
                        <td className="py-3 pr-4">{row.matte}</td>
                        <td className="py-3 pr-4">{row.petg}</td>
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
              <h2 className="text-2xl font-semibold text-slate-900">Resources and references</h2>
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
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">External references</p>
                  <ul className="mt-2 space-y-2 text-sm text-slate-600">
                    {externalReferences.map((ref) => (
                      <li key={ref.href}>
                        <a
                          href={ref.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 transition hover:text-indigo-500"
                        >
                          {ref.label}
                        </a>
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Need a stone-look finish?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Share your STL/STEP and target look. We will advise Marble vs Matte vs PETG, with clear settings, lead time and cost impact.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact?material=PLA">Ask for marble advice</ShimmerButton>
                <Link href="/en/pricing" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  View pricing & lead times
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <BlogReadMore />
    </main>
  )
}
