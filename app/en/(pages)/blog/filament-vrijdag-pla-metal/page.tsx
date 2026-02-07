import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/en/blog/filament-vrijdag-pla-metal/"
const publishedDate = "2025-10-24T08:00:00+02:00"

export const metadata: Metadata = {
  title: "PLA Metal 3D printing: metallic look without the hassle | X3DPrints",
  description:
    "Filament Friday #7. Everything about PLA Metal: metallic sheen, settings, nozzle choice and applications for props, industrial look and design prints.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/filament-vrijdag-pla-metal/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/filament-vrijdag-pla-metal/",
    },
  },
  openGraph: {
    title: "PLA Metal 3D printing: metallic look without conductivity",
    description:
      "PLA Metal explained by X3DPrints: how metallic PLA blends behave, when they are worth it and the settings we use.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["PLA Metal", "Metallic filament", "Filament Friday", "3D print material"],
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "PLA Metal filament guidance by X3DPrints" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filament Friday: PLA Metal 3D printing",
    description: "PLA Metal settings and applications for props, industrial aesthetics and design prints.",
    images: ["/images/og-home.jpg"],
  },
}

const heroStats = [
  { label: "Look & feel", value: "Metal-like, non-conductive", detail: "Ideal for props and industrial aesthetics" },
  { label: "Recommended nozzle", value: "Hardened 0.4-0.6 mm", detail: "Metallic pigments wear brass faster" },
  { label: "Base", value: "PLA matrix", detail: "Prints mostly like PLA, not metal-strong" },
]

const printSettings = [
  { label: "Nozzle", value: "200-220 C", note: "Start at your PLA profile; higher for thicker layers or dark blends" },
  { label: "Bed", value: "55-60 C", note: "Standard PLA bed settings on PEI or glass" },
  { label: "Speed", value: "40-70 mm/s", note: "Slower yields a more even metallic reflection" },
  { label: "Cooling", value: "80-100%", note: "High cooling for sharp edges and text" },
  { label: "Layer height", value: "0.16-0.24 mm", note: "Thinner layers keep gloss tight" },
  { label: "Retraction", value: "0.8-1.2 mm", note: "Keep conservative to limit stringing" },
]

const whenToUse = [
  "Props and decor with an industrial or sci-fi look.",
  "Knobs, dials and panels that should look metallic without weight.",
  "Housings and covers in showroom or trade fair context.",
  "Design objects and interior accents with a metal accent.",
  "Marketing mockups where metal look matters but real metal is overkill.",
]

const whenToAvoid = [
  "Projects that need true metal strength or heat resistance.",
  "Electronics where conductivity is required.",
  "Parts under heavy mechanical load (choose PETG or engineering materials).",
  "Ultra-small details where metallic gloss reveals every flaw.",
]

const comparisonRows = [
  { property: "Printability", pla: "Very high; baseline.", metal: "High; like PLA, watch nozzle and speed.", petg: "Medium; stringing/adhesion need tuning." },
  { property: "Surface", pla: "Matte or gloss, even.", metal: "Metal-like gloss, shows layer lines quickly.", petg: "Semi-gloss, more plastic look.", },
  { property: "Abrasiveness", pla: "Not abrasive.", metal: "Slightly abrasive due to pigment.", petg: "Not abrasive (without fillers).", },
  { property: "Mechanical", pla: "Stiff, rather brittle.", metal: "Similar to PLA, sometimes slightly more brittle.", petg: "Tougher, bends before it breaks.", },
  { property: "Conductivity", pla: "Non-conductive.", metal: "Non-conductive (purely visual).", petg: "Non-conductive.", },
  { property: "Typical uses", pla: "General prototypes, decor.", metal: "Props, industrial aesthetic, displays.", petg: "Functional parts, brackets.", },
]

const mitigationTips = [
  { title: "Limit nozzle wear", insight: "Use a hardened nozzle for frequent PLA Metal jobs and avoid unnecessary high speeds or flow." },
  { title: "Control layer lines", insight: "Print not too thick (0.16-0.2 mm for visible work) and orient faces wisely; metallic gloss highlights lines." },
  { title: "Smart finishing", insight: "Light sanding + satin clear coat can boost the metal look without a full finishing workflow." },
  { title: "Detail vs gloss", insight: "Use clear contours. Metallic pigments can wash out micro detail if it is too fine." },
]

const resourceLinks = [
  { label: "3D printing pillar", href: "/en/3d-printen", description: "Workflow overview, materials and planning." },
  { label: "Materials library", href: "/en/materials", description: "PLA Metal, Marble, Matte and other visuals side by side." },
  { label: "Pricing & calculator", href: "/en/pricing", description: "See how material choice impacts your quote." },
  { label: "Material Suggestion Tool", href: "/en/materials#material-suggestion-tool", description: "Let the wizard help pick a material." },
]

const externalReferences = [
  {
    label: "Prusa - Different nozzle types",
    href: "https://help.prusa3d.com/article/different-nozzle-types_2193",
    description: "Why filled filaments need a hardened nozzle.",
  },
  {
    label: "Prusa - How to smooth & paint prints",
    href: "https://blog.prusa3d.com/how-to-smooth-and-paint-3d-prints_12547/",
    description: "Useful if you want to further finish metallic prints.",
  },
  {
    label: "All3DP - Metal filament guide",
    href: "https://all3dp.com/2/metal-filament-3d-printing/",
    description: "Overview of metal-filled PLA and their behaviour.",
  },
  {
    label: "Bambu Lab - PLA guide",
    href: "https://wiki.bambulab.com/en/filament/pla",
    description: "Baseline PLA settings, applicable to special blends.",
  },
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "PLA Metal 3D printing: metallic look without the hassle",
  description:
    "Filament Friday #7. Learn how PLA Metal works, which settings we use and when metallic PLA blends add real value.",
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

function SectionDivider() {
  return (
    <div className="mx-auto my-10 flex w-full max-w-4xl items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-500">
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-slate-300/0 via-slate-300/60 to-slate-300/0" />
      <span>Filament Friday</span>
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-slate-300/0 via-slate-300/60 to-slate-300/0" />
    </div>
  )
}

export default function FilamentFridayPlaMetalEnPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(160%_90%_at_50%_-20%,rgba(148,163,184,0.22),transparent_75%)]"
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
                <li className="font-medium text-slate-900">PLA Metal</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Filament Friday #7</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              PLA Metal: metallic sheen, PLA simplicity.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Metallic PLA gives you the look without the weight or conductivity. Use this guide to set temps, protect your nozzle and decide when PLA
              Metal is worth it versus basic PLA or PETG.
            </p>
            <div className="stacked-actions mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <ShimmerButton href="/en/materials">Compare PLA visuals</ShimmerButton>
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
            <p className="mt-4 text-sm text-slate-500">Published 24 October 2025 - part of the Filament Friday series.</p>
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
              <h2 className="text-2xl font-semibold text-slate-900">Studio settings for PLA Metal</h2>
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
              <h2 className="text-2xl font-semibold text-slate-900">When to choose PLA Metal</h2>
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
              <h2 className="text-2xl font-semibold text-slate-900">PLA vs PLA Metal vs PETG</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead className="text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="py-2 pr-4">Property</th>
                      <th className="py-2 pr-4">PLA</th>
                      <th className="py-2 pr-4">PLA Metal</th>
                      <th className="py-2 pr-4">PETG</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {comparisonRows.map((row) => (
                      <tr key={row.property}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{row.property}</td>
                        <td className="py-3 pr-4">{row.pla}</td>
                        <td className="py-3 pr-4">{row.metal}</td>
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

      <SectionDivider />

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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Want a metal look for your project?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Share your STL/STEP and desired finish. We will recommend PLA Metal vs other visuals and provide settings, lead time and cost impact.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact?material=PLA">Ask for metal-look advice</ShimmerButton>
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

