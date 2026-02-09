import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"
import { buildArticleJsonLd } from "@/lib/seo"
import BlogContentOverview from "@/components/BlogContentOverview"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogFaq from "@/components/BlogFaq"
import { BLOG_FAQ_EN } from "@/content/blog-faq-en"

const canonical = "https://www.x3dprints.be/en/blog/filament-vrijdag-tpu/"
const publishedDate = "2025-09-19T08:00:00+02:00"
const dateModified = "2026-02-08"
const faq = BLOG_FAQ_EN["filament-vrijdag-tpu"]
const lastUpdatedLabel = "Last updated: 8 February 2026"

export const metadata: Metadata = {
  title: "TPU 3D printing: flexible, shock-absorbing parts | X3DPrints",
  description:
    "Filament Friday #3. Learn when TPU beats PLA and PETG, the print settings we use in the studio and how to keep stringing and jams under control.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/filament-vrijdag-tpu/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/filament-vrijdag-tpu/",
    },
  },
  openGraph: {
    title: "TPU 3D printing: flexible, shock-absorbing parts",
    description:
      "X3DPrints explains TPU: when to pick it, studio settings, and how to avoid jams and stringing for flexible bumpers, grips and dampers.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["TPU 3D printing", "Filament Friday", "Flexible filament"],
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "TPU filament guidance by X3DPrints" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filament Friday #3: TPU 3D printing guide",
    description: "TPU properties, settings and use cases for flexible parts from a local 3D print studio.",
    images: ["/images/og-home.jpg"],
  },
}

const heroStats = [
  { label: "Shore hardness", value: "ca. 95A", detail: "Flexible but still controllable" },
  { label: "Nozzle range", value: "215-235 C", detail: "Start around 220 C and tune per brand" },
  { label: "Recommended speed", value: "20-35 mm/s", detail: "Slow and steady for reliable flow" },
]

const printSettings = [
  { label: "Nozzle", value: "215-235 C", note: "Raise slightly only when flow is under-extruding" },
  { label: "Bed", value: "40-60 C", note: "Warmer first layers, let it cool before removal" },
  { label: "Speed", value: "20-35 mm/s", note: "TPU hates haste; slower prints look better" },
  { label: "Cooling", value: "30-60%", note: "Enough for detail, not so much that layers split" },
  { label: "Retraction", value: "0.4-0.8 mm", note: "Keep it minimal to avoid jams in the feeder" },
]

const whenToUse = [
  "Bumpers, sleeves and covers that must absorb shocks.",
  "Soft-touch grips for tools, controllers or handles.",
  "Vibration dampers and feet under devices or machines.",
  "Straps and clips that flex repeatedly without cracking.",
  "Hybrid builds: PETG core plus TPU contact zones.",
]

const whenToAvoid = [
  "Hot environments above roughly 70 C under load.",
  "Ultra precise miniatures where small strings are unacceptable.",
  "Chemical exposure where nylon/ASA is safer.",
  "Printers with long, unreliable Bowden paths.",
]

const comparisonRows = [
  { property: "Printability", pla: "Very high", petg: "Medium", tpu: "Low to medium" },
  { property: "Temperature", pla: "Softens ~55-60 C", petg: "OK to ~80 C", tpu: "Stable but deformable under load" },
  { property: "Impact", pla: "Brittle on impact", petg: "Tough, bends first", tpu: "Absorbs and springs back" },
  { property: "Outdoor/UV", pla: "Indoor only", petg: "Good outdoor choice", tpu: "Blend dependent, often fine" },
  { property: "Finish", pla: "Crisp, many variants", petg: "Semi-gloss", tpu: "Rubber look, visible lines" },
  { property: "Cost per print", pla: "Lowest", petg: "Slightly higher", tpu: "Higher + longer runtimes" },
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
  headline: "TPU 3D printing: flexible, shock-absorbing parts",
  description: metadata.description ?? "",
  datePublished: publishedDate,
  dateModified,
  image: "https://www.x3dprints.be/images/og-home.jpg",
  inLanguage: "en-BE",
})


export default function FilamentFridayTpuEnPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(150%_85%_at_50%_-15%,rgba(99,102,241,0.18),transparent_70%)]"
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
                <li className="font-medium text-slate-900">TPU</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Filament Friday #3</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              TPU: flexible prints that absorb shocks and keep working.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              TPU comes in when a part needs to bend, compress and spring back. This guide shows where it outperforms PLA and PETG,
              the print settings we rely on in the studio, and how to prevent jams and stringing.
            </p>
                        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="stacked-actions mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <ShimmerButton href="/en/contact?material=TPU">Request TPU advice</ShimmerButton>
              <Link
                href="/en/materials/tpu"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                TPU material profile
              </Link>
              <Link
                href="/en/materials#material-suggestion-tool"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Material Suggestion Tool
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">Published 19 September 2025 - part of the Filament Friday series.</p>
          </Reveal>
          <div className="mt-10 grid gap-4 rounded-3xl border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{stat.label}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-600">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BlogContentOverview locale="en" />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">When TPU is the right call</h2>
              <p className="mt-2 text-sm text-slate-600">
                TPU is a thermoplastic polyurethane: rubber-like, resilient and still printable on a Bambu X1C or P1S. It soaks up
                impacts where PLA would snap and PETG would dent. Use it for parts that touch users, absorb energy or clamp gently.
              </p>
              <ul className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                {whenToUse.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm font-semibold text-slate-900">Avoid TPU when:</p>
              <ul className="mt-2 space-y-2 text-sm text-slate-600">
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
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">Studio print settings</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    TPU rewards patience. Keep the filament path short and dry, reduce retractions and do not be afraid to slow
                    down. These ranges are battle-tested on our direct-drive setups.
                  </p>
                </div>
                <Link
                  href="/en/materials/tpu"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-indigo-700"
                >
                  See TPU variants
                </Link>
              </div>
              <div className="mt-6 overflow-x-auto">
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
              <p className="mt-4 text-xs text-slate-500">Dry storage makes the biggest difference for clean TPU prints.</p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
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
              <p className="mt-3 text-sm text-slate-600">
                Need more nuance? Combine this with the PLA and PETG Filament Friday editions to choose per application.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Order TPU at X3DPrints</h2>
              <p className="mt-2 text-sm text-slate-600">
                TPU prints are slower and material costs are higher, but they prevent breakage, returns and noise. Typical requests we
                handle:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                  <span>Protective sleeves for measuring devices, scanners or handheld tools.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                  <span>Soft-touch grips on knobs, levers and fixtures.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                  <span>Feet and pads to dampen vibration and noise.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                  <span>Clamps and clips that must flex often without breaking.</span>
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <ShimmerButton href="/en/contact?material=TPU">Plan a TPU print</ShimmerButton>
                <Link
                  href="/en/pricing"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Pricing & lead times
                </Link>
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Unsure if TPU is needed?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Send your STL/STEP and what the part must survive. We will suggest TPU or a tougher rigid filament if that is
                  smarter.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact?material=TPU">Start a material intake</ShimmerButton>
                <Link href="/en/3d-printen" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Continue reading the 3D printing pillar
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

      <BlogReadMore />
    </main>
  )
}



