import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"
import { buildArticleJsonLd } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/en/blog/filament-vrijdag-pc-fr/"
const lastUpdatedLabel = "Last updated: 8 February 2026"

const publishedDate = "2026-01-23T08:00:00+01:00" // Friday, January 2026
const dateModified = "2026-02-08"

export const metadata: Metadata = {
  title: "Filament Friday: PC FR (UL94 V-0) 3D printing | X3DPrints",
  description:
    "PC FR flame-retardant polycarbonate for enclosures with safety requirements. Settings, drying and when to choose PC FR vs standard PC or PETG.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/filament-vrijdag-pc-fr/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/filament-vrijdag-pc-fr/",
    },
  },
  openGraph: {
    title: "PC FR 3D printing: UL94 V-0 without the drama",
    description:
      "Filament Friday: flame-rated polycarbonate (PC FR), studio settings, drying routine and decision criteria vs PC and PETG.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["PC FR filament", "flame-retardant 3D printing", "UL94 V-0", "Filament Friday"],
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "PC FR 3D printing advice" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filament Friday: PC FR (UL94 V-0) filament",
    description:
      "When to pick PC FR: drying, settings, design guidance and when standard PC or PETG is enough.",
    images: ["/images/og-home.jpg"],
  },
}

const heroStats = [
  { label: "Flame rating", value: "UL94 V-0", detail: "Self-extinguishing within seconds" },
  { label: "Nozzle / bed", value: "260-280 ?C / 90-110 ?C", detail: "Enclosure + glue stick + brim" },
  { label: "Drying", value: "8h @ 80 ?C", detail: "Keep in drybox during the print" },
]

const whenToUse = [
  "Electronics enclosures that must meet flame ratings (UL94 V-0).",
  "Rail cabinets, PSU covers and control panels near heat sources.",
  "Industrial or automotive brackets needing heat + flame retardancy + UV resistance.",
  "Cases where PETG lacks temperature headroom and standard PC lacks a UL rating.",
]

const whenToAvoid = [
  "Budget jobs without flame risk: PETG or PC is cheaper.",
  "Printers without an enclosure: warping/delamination is very likely.",
  "Very thin walls and sharp corners; designs must avoid stress risers.",
  "Timelines without room for drying and adhesion tuning.",
]

const printSettings = [
  { label: "Nozzle", value: "260-280 ?C", note: "Start ~265 ?C; bump up for thick walls." },
  { label: "Bed", value: "90-110 ?C + glue stick", note: "Textured PEI or garolite with brim." },
  { label: "Speed", value: "30-55 mm/s", note: "Lower accel to keep layer bonding strong." },
  { label: "Cooling", value: "0-15%", note: "Just enough for bridges; too much causes cracks." },
  { label: "Drying", value: "8h @ 80 ?C", note: "Leave in drybox while printing to avoid matte/bubbly layers." },
  { label: "Chamber", value: "Warm, enclosed", note: "20-30 ?C chamber cuts warping risk." },
]

const comparisonRows = [
  { label: "Flame retardant", pc: "No", pcfr: "Yes, UL94 V-0" },
  { label: "Glass transition", pc: "~110 ?C", pcfr: "~110 ?C" },
  { label: "Transparency", pc: "Transparent / Clear Black", pcfr: "Semi-transparent; black/gray/white" },
  { label: "Use case", pc: "Outdoor, machine covers, diffusers", pcfr: "Electronics, rail enclosures, safety critical" },
  { label: "Price", pc: "???", pcfr: "???+" },
]

const references = [
  {
    label: "Bambu Lab PC FR filament guide",
    href: "https://wiki.bambulab.com/en/filament/pc-fr",
    description: "Official nozzle/bed advice and plate compatibility for PC FR.",
  },
  {
    label: "UL94 V-0 (Wikipedia)",
    href: "https://en.wikipedia.org/wiki/UL_94",
    description: "What UL94 V-0 means and how the test is performed.",
  },
  {
    label: "Polycarbonate (Wikipedia)",
    href: "https://en.wikipedia.org/wiki/Polycarbonate",
    description: "Material properties and typical applications of polycarbonate.",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "Filament Friday: PC FR (UL94 V-0) 3D printing",
  description: metadata.description ?? "",
  datePublished: publishedDate,
  dateModified,
  image: "https://www.x3dprints.be/images/og-home.jpg",
  inLanguage: "en-BE",
})


function SectionDivider() {
  return (
    <div className="mx-auto my-10 flex w-full max-w-4xl items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-500">
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-indigo-300/0 via-indigo-300/60 to-indigo-300/0" />
      <span>Filament Friday</span>
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-indigo-300/0 via-indigo-300/60 to-indigo-300/0" />
    </div>
  )
}

export default function FilamentFridayPcFrEnPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(150%_80%_at_50%_-20%,rgba(79,70,229,0.22),transparent_75%)]"
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
                <li className="font-medium text-slate-900">PC FR (UL94 V-0)</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Filament Friday</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              PC FR 3D printing: flame-rated and industrially robust.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              PC FR is our pick when UL94 V-0 is mandatory. You get PC-level heat and UV resistance plus certified flame
              retardancy. This edition shares settings, design guidance and how PC FR compares to standard PC and PETG.
            </p>
                        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="stacked-actions mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <ShimmerButton href="/en/contact?material=PC%20FR">Plan a PC FR run</ShimmerButton>
              <Link
                href="/en/materials/pc-fr"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                PC FR material profile
              </Link>
              <Link
                href="/en/blog/filament-vrijdag-pc"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Read the PC edition
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">Published 23 January 2026.</p>
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

      <SectionDivider />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">When to choose PC FR</h2>
              <p className="mt-3 text-sm text-slate-600">
                PC FR is built for safety-critical parts: it self-extinguishes, stays dimensionally stable around 110 ?C and
                tolerates UV. Think PSU covers, rail cabinets and electronics near heat. If flame rating is not required, stay with{" "}
                <Link href="/en/blog/filament-vrijdag-pc" className="text-indigo-600 underline underline-offset-4">
                  standard PC
                </Link>{" "}
                or consider{" "}
                <Link href="/en/blog/filament-vrijdag-petg" className="text-indigo-600 underline underline-offset-4">
                  PETG
                </Link>{" "}
                to reduce cost and lead time.
              </p>
              <div className="mt-4 grid gap-2">
                <p className="text-sm font-semibold text-slate-900">PC FR is a fit when:</p>
                <ul className="mt-2 space-y-2 text-sm text-slate-600">
                  {whenToUse.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <p className="text-sm font-semibold text-slate-900">Pick something else when:</p>
                <ul className="mt-2 space-y-2 text-sm text-slate-600">
                  {whenToAvoid.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.08}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Studio settings for PC FR</h2>
              <p className="mt-2 text-sm text-slate-600">
                Start here and fine-tune per model. PC FR is sensitive to cooling; keep the chamber warm and avoid sudden airflow.
              </p>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                {printSettings.map((setting) => (
                  <div key={setting.label} className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                    <dt className="text-xs uppercase tracking-[0.3em] text-slate-500">{setting.label}</dt>
                    <dd className="mt-2 text-xl font-semibold text-slate-900">{setting.value}</dd>
                    <p className="text-sm text-slate-600">{setting.note}</p>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-xs text-slate-500">
                External refs:{" "}
                <Link
                  href="https://wiki.bambulab.com/en/filament/pc-fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 underline underline-offset-4"
                >
                  Bambu PC FR guide
                </Link>{" "}
                and{" "}
                <Link
                  href="https://www.ul.com/resources/flame-rating-ul-94"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 underline underline-offset-4"
                >
                  UL94 overview
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">PC FR vs PC</h2>
              <p className="mt-2 text-sm text-slate-600">
                Bottom line: choose PC FR when safety or compliance is key. Choose PC when transparency and lower cost matter
                without a UL rating. Both hold form around 110 ?C.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-[320px] text-sm text-slate-700">
                  <thead>
                    <tr className="text-left text-slate-500">
                      <th className="py-2 pr-4 font-semibold">Aspect</th>
                      <th className="py-2 pr-4 font-semibold">PC</th>
                      <th className="py-2 pr-4 font-semibold">PC FR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row) => (
                      <tr key={row.label} className="border-t border-slate-200/70">
                        <td className="py-2 pr-4 font-medium text-slate-900">{row.label}</td>
                        <td className="py-2 pr-4">{row.pc}</td>
                        <td className="py-2 pr-4">{row.pcfr}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/en/blog/filament-vrijdag-pc"
                  className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
                >
                  Read the PC edition
                </Link>
                <Link
                  href="/en/materials/pc"
                  className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
                >
                  PC material profile
                </Link>
                <Link
                  href="/en/materials/pc-fr"
                  className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
                >
                  PC FR material profile
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-6">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Resources & next steps</h2>
              <ul className="mt-3 space-y-3 text-sm text-slate-600">
                <li>
                  <Link href="/en/pricing" className="font-semibold text-emerald-600 transition hover:text-emerald-700">
                    Pricing & calculator
                  </Link>{" "}
                  ? see price impact of PC FR vs PC (higher kg price + drying time).
                </li>
                <li>
                  <Link
                    href="/en/materials#material-suggestion-tool"
                    className="font-semibold text-emerald-600 transition hover:text-emerald-700"
                  >
                    Material Suggestion Tool
                  </Link>{" "}
                  ? let the wizard decide if PC FR is truly needed.
                </li>
                <li>
                  <Link href="/en/blog/hoeveel-kost-3d-printen" className="font-semibold text-emerald-600 transition hover:text-emerald-700">
                    Cost guide
                  </Link>{" "}
                  ? understand why premium materials add lead time.
                </li>
              </ul>
            </GlassCard>
          </Reveal>
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Sources</h2>
              <ul className="mt-3 space-y-3 text-sm text-slate-600">
                {references.map((ref) => (
                  <li key={ref.href} className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                    <Link
                      href={ref.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-semibold text-indigo-600 transition hover:text-indigo-500"
                    >
                      {ref.label}
                    </Link>
                    <p className="mt-1">{ref.description}</p>
                  </li>
                ))}
              </ul>
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Need PC FR? Let?s plan it together.</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Share STL/STEP and any safety requirements. We will confirm whether PC FR, standard PC or PETG fits best,
                  with price and timing plus an honest alternative where possible.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact?material=PC%20FR">Start PC FR intake</ShimmerButton>
                <Link href="/en/materials/pc-fr" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  View PC FR material
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>
      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Sources and references</h2>
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <BlogReadMore />
    </main>
  )
}



