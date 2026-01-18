import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/en/blog/filament-vrijdag-pla-glow"
const publishedDate = "2025-10-17T08:00:00+02:00"

export const metadata: Metadata = {
  title: "PLA Glow 3D printing: light-up prints without batteries | X3DPrints",
  description:
    "Filament Friday #6. Everything about PLA Glow: glow-in-the-dark properties, settings, nozzle choice and applications for interior, design and cosplay.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/filament-vrijdag-pla-glow",
      en: canonical,
    },
  },
  openGraph: {
    title: "PLA Glow 3D printing: light-up prints without batteries",
    description:
      "PLA Glow explained by X3DPrints: how glow-in-the-dark PLA works, the settings we use and when glow truly adds value.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["PLA Glow", "Glow in the dark filament", "Filament Friday", "3D print material"],
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "PLA Glow filament advice by X3DPrints" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filament Friday: PLA Glow 3D printing",
    description: "PLA Glow settings, nozzle choice and applications for interior, signage, design and cosplay.",
    images: ["/images/og-home.jpg"],
  },
}

const heroStats = [
  { label: "Recommended nozzle", value: "Hardened 0.4-0.6 mm", detail: "Glow pigment is slightly abrasive" },
  { label: "Material base", value: "PLA + phosphorescent pigment", detail: "Behaves mostly like PLA" },
  { label: "Typical uses", value: "Signage | props | safety", detail: "Glow should add clear value" },
]

const printSettings = [
  { label: "Nozzle", value: "205-220 C", note: "Start around your PLA profile, higher for larger nozzles" },
  { label: "Bed", value: "55-60 C", note: "PEI or glass with glue, same as standard PLA" },
  { label: "Speed", value: "40-70 mm/s", note: "Slightly slower for consistent glow and less wear" },
  { label: "Cooling", value: "80-100%", note: "Keep text/logos crisp" },
  { label: "Layer height", value: "0.16-0.28 mm", note: "Higher layers = stronger glow and softer look" },
  { label: "Retraction", value: "0.8-1.2 mm", note: "Keep conservative to limit stringing" },
]

const whenToUse = [
  "Cosplay props, armour and accessories that must stand out in the dark.",
  "Interior accents like night lights, subtle glow details or signage.",
  "Marketing and event props where glow gives a clear wow effect.",
  "Safety or indication elements (exit arrows, markers, keycaps).",
  "Logos and lettering that gain character in dusk or evening light.",
]

const whenToAvoid = [
  "Functional brackets or machine parts where glow adds no value.",
  "Projects with high mechanical load - use PETG or TPU.",
  "Extremely small details: pigment can mask micro detail.",
  "Cases exposed to long-term direct sun (glow degrades faster under UV).",
]

const comparisonRows = [
  { property: "Printability", pla: "Very high; standard profile.", glow: "High; like PLA, note abrasiveness.", petg: "Medium; more tuning needed." },
  { property: "Abrasiveness", pla: "Not abrasive.", glow: "Slightly abrasive due to pigment.", petg: "Not abrasive (without fillers)." },
  { property: "Glow / visibility", pla: "None.", glow: "Strong glow after charging, depends on pigment and wall thickness.", petg: "None unless special blend.", },
  { property: "Heat resistance", pla: "Softens around 55-60 C.", glow: "Same order as PLA.", petg: "Usable up to ~80 C.", },
  { property: "Typical applications", pla: "Prototypes, decor, marketing props.", glow: "Cosplay, signage, playful design.", petg: "Functional parts, outdoor.", },
  { property: "Hardware needs", pla: "Brass nozzle is fine.", glow: "Hardened nozzle recommended.", petg: "Standard nozzle ok.", },
]

const mitigationTips = [
  { title: "Limit nozzle wear", insight: "Use a hardened nozzle for regular glow jobs and avoid unnecessary high speeds or flow." },
  { title: "Keep glow consistent", insight: "Use thicker walls for stronger glow, avoid tiny infill patterns that break up the glow." },
  { title: "Reduce stringing", insight: "Dry filament, keep retraction modest and lower temp 3-5 C if you see wisps." },
]

const resourceLinks = [
  { label: "3D printing pillar", href: "/en/3d-printen", description: "Workflow, materials and planning." },
  { label: "Materials library", href: "/en/materials", description: "Compare PLA Glow with other specials and base PLA." },
  { label: "Material Suggestion Tool", href: "/en/materials#material-suggestion-tool", description: "Wizard to confirm if glow is worth it." },
  { label: "Pricing & calculator", href: "/en/pricing", description: "See impact of glow on runtime and cost." },
]

const externalReferences = [
  {
    label: "Bambu Lab - PLA guide",
    href: "https://wiki.bambulab.com/en/filament/pla",
    description: "Baseline PLA settings you can adapt for glow blends.",
  },
  {
    label: "All3DP - Glow filament guide",
    href: "https://all3dp.com",
    description: "General tips on glow pigments and charging behaviour.",
  },
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "PLA Glow 3D printing: light-up prints without batteries",
  description:
    "PLA Glow guide: properties, settings, nozzle choice and when to use glow-in-the-dark. Part of Filament Friday.",
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

export default function FilamentFridayPlaGlowEnPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(150%_85%_at_50%_-15%,rgba(74,222,128,0.14),transparent_70%)]"
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
                <li className="font-medium text-slate-900">PLA Glow</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Filament Friday #6</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              PLA Glow: add light without wiring.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              When glow adds value, it is great. This guide shows how to print glow-in-the-dark PLA reliably, keep the glow even and know when another
              filament is a better choice.
            </p>
            <div className="stacked-actions mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <ShimmerButton href="/en/materials/pla">Compare PLA blends</ShimmerButton>
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
            <p className="mt-4 text-sm text-slate-500">Published 17 October 2025 - part of the Filament Friday series.</p>
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
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Settings for PLA Glow</h2>
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
              <h2 className="text-2xl font-semibold text-slate-900">Where glow makes sense</h2>
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
              <h2 className="text-2xl font-semibold text-slate-900">When to avoid glow</h2>
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
              <h2 className="text-2xl font-semibold text-slate-900">PLA vs PLA Glow vs PETG</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead className="text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="py-2 pr-4">Property</th>
                      <th className="py-2 pr-4">PLA</th>
                      <th className="py-2 pr-4">PLA Glow</th>
                      <th className="py-2 pr-4">PETG</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {comparisonRows.map((row) => (
                      <tr key={row.property}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{row.property}</td>
                        <td className="py-3 pr-4">{row.pla}</td>
                        <td className="py-3 pr-4">{row.glow}</td>
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
              <h2 className="text-2xl font-semibold text-slate-900">Fix common issues</h2>
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Want glow that actually pops?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Share your STL/STEP and context. We will confirm if PLA Glow is right or recommend an alternative, with clear temps, lead time and cost.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact?material=PLA">Ask for glow advice</ShimmerButton>
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
