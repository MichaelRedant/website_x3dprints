import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"
import { buildArticleJsonLd } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/en/blog/filament-vrijdag-petg/"
const publishedDate = "2025-09-12T08:00:00+02:00"
const dateModified = "2026-02-08"
const lastUpdatedLabel = "Last updated: 8 February 2026"

export const metadata: Metadata = {
  title: "PETG 3D printing: settings, use cases and pitfalls | X3DPrints",
  description:
    "Filament Friday #2. Learn why PETG is our go-to for functional parts, the settings we use, and how to avoid stringing and warping.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/filament-vrijdag-petg/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/filament-vrijdag-petg/",
    },
  },
  openGraph: {
    title: "PETG 3D printing: settings, use cases and pitfalls",
    description:
      "X3DPrints Filament Friday. Properties, applications, limits and shop-tested settings for PETG, plus when to pick PLA or TPU instead.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["PETG 3D printing", "Filament Friday", "3D print material"],
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "PETG filament guidance by X3DPrints" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filament Friday #2: PETG guide",
    description: "PETG properties, settings, applications and fixes for stringing, warping and adhesion.",
    images: ["/images/og-home.jpg"],
  },
}

const heroStats = [
  { label: "Nozzle range", value: "235-250 C", detail: "Depends on colour and brand" },
  { label: "Bed range", value: "70-85 C", detail: "Higher for large flat parts" },
  { label: "Typical lead time", value: "3-5 days", detail: "Includes drying and tuning" },
]

const petgPros = [
  "Tough and slightly flexible; resists impact better than PLA.",
  "Handles heat up to ~80 C, making it suitable for cars and near machines.",
  "Better moisture and UV resistance than PLA, so more reliable outdoors.",
  "Translucent options for lighting and covers.",
]

const petgCons = [
  "Strings more easily; demands tuned retraction and fan control.",
  "Needs dry storage; moisture causes blobs and poor layer bonding.",
  "Less detail sharpness than PLA, especially on tiny text or logos.",
  "Bridging can be trickier; sometimes slower cooling is needed.",
]

const settings = [
  { label: "Nozzle", value: "235-245 C", note: "Darker colours and translucent often towards 245-250 C" },
  { label: "Bed", value: "75-85 C", note: "Use the higher end for large base layers to fight warping" },
  { label: "Speed", value: "45-65 mm/s", note: "Drop to 40 mm/s for translucent or high-detail parts" },
  { label: "Cooling", value: "30-60%", note: "Lower fan for layer adhesion; increase only on bridges" },
  { label: "Retraction", value: "0.8-1.4 mm", note: "Fine-tune per printer; avoid excessive retracts to limit stringing" },
]

const whenToUse = [
  "Functional brackets, fixtures and covers that see heat or stress.",
  "Bike mounts, housings and car interior parts.",
  "Outdoor enclosures and signage with moderate UV exposure.",
  "Parts that need translucency (light guides, covers).",
]

const whenToAvoid = [
  "Ultra-fine visual models where PLA Matte wins on sharpness.",
  "High-heat zones beyond ~80 C (engine bay, sustained sun on black parts).",
  "Elastic parts; TPU is better for grip or damping.",
  "Ultra-fast turnaround when drying time is not available.",
]

const troubleshooting = [
  {
    title: "Stringing everywhere",
    insight:
      "Dry filament at 65 C before printing. Reduce nozzle temp by 5 C, increase retraction slightly and lower fan to improve layer bonding.",
  },
  {
    title: "Corners lifting or warping",
    insight:
      "Raise bed to 80-85 C, add a brim and slow first layer. Check for drafts; enclosure helps. Keep surfaces clean (no fingerprints).",
  },
  {
    title: "Gloss uneven or blobs",
    insight:
      "Dry longer (4-6h), enable wipe and coasting if available, and avoid overcooling. For translucent parts, slower speeds reduce artifacts.",
  },
]

const resourceLinks = [
  { label: "PLA vs PETG comparison", href: "/en/blog/pla-vs-petg", description: "Quick decision guide between the two." },
  { label: "Materials library", href: "/en/materials", description: "Swatches and stock status of PETG colours." },
  { label: "Material Suggestion Tool", href: "/en/materials#material-suggestion-tool", description: "Wizard to pick the right filament." },
  { label: "Pricing & calculator", href: "/en/pricing", description: "See impact of PETG on machine hours and cost." },
]

const references = [
  {
    label: "Bambu Lab PETG guide",
    href: "https://wiki.bambulab.com/en/filament/petg",
    description: "Official settings, drying and AMS tips.",
  },
  {
    label: "Prusa: PETG handbook",
    href: "https://help.prusa3d.com/article/petg-material-guide_200152",
    description: "Notes on bed adhesion, cooling and part cooling balance.",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "PETG 3D printing: settings, use cases and pitfalls",
  description: metadata.description ?? "",
  datePublished: publishedDate,
  dateModified,
  image: "https://www.x3dprints.be/images/og-home.jpg",
  inLanguage: "en-BE",
})


export default function FilamentFridayPetgEnPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(150%_85%_at_50%_-15%,rgba(59,130,246,0.18),transparent_70%)]"
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
                <li className="font-medium text-slate-900">PETG</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Filament Friday #2</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              PETG: tough prints that survive heat and outdoor use.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              PETG is our default for functional parts that face heat, stress or weather. Use this guide to set temperatures, avoid stringing and decide
              when PETG beats PLA or TPU.
            </p>
                        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="stacked-actions mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <ShimmerButton href="/en/contact?material=PETG">Ask PETG advice</ShimmerButton>
              <Link
                href="/en/materials/petg"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                View PETG sheet
              </Link>
              <Link
                href="/en/pricing"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Pricing & calculator
              </Link>
            </div>
            <p className="mt-4 text-sm text-slate-500">Published 12 September 2025 - part of the Filament Friday series.</p>
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
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Why choose PETG?</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {petgPros.map((pro) => (
                  <li key={pro} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.05}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">When PETG is a bad fit</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {petgCons.map((con) => (
                  <li key={con} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" aria-hidden />
                    <span>{con}</span>
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
              <h2 className="text-2xl font-semibold text-slate-900">Studio settings for PETG</h2>
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
                    {settings.map((setting) => (
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
              <h2 className="text-2xl font-semibold text-slate-900">When to pick PETG</h2>
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
              <h2 className="text-2xl font-semibold text-slate-900">When to avoid PETG</h2>
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
              <h2 className="text-2xl font-semibold text-slate-900">Fix common PETG issues</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {troubleshooting.map((tip) => (
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
              <h2 className="text-2xl font-semibold text-slate-900">Sources and references</h2>
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Want studio PETG settings for your model?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Share STL/STEP and the environment (heat, outdoor, load). We will advise PETG or an alternative with clear temps and lead time.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact?material=PETG">Request PETG tuning</ShimmerButton>
                <Link href="/en/blog/pla-vs-petg" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Compare PLA vs PETG
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



