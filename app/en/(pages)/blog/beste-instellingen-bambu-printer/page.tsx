import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"
import { buildArticleJsonLd } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/en/blog/beste-instellingen-bambu-printer/"

export const metadata: Metadata = {
  title: "Best settings for your Bambu printer | X3DPrints Blog",
  description:
    "Use these presets for PLA, PETG and TPU on Bambu printers: temperatures, speeds, retract and calibration. Includes tips for flow, AMS and maintenance.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/beste-instellingen-bambu-printer/",
      en: canonical,
      "x-default": "https://www.x3dprints.be/blog/beste-instellingen-bambu-printer/",
    },
  },
  openGraph: {
    title: "Best settings for your Bambu printer",
    description:
      "Studio-tested settings for PLA, PETG and TPU including flow calibration, AMS tips and maintenance to keep prints flawless.",
    url: canonical,
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "Bambu printer settings" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best settings for your Bambu printer",
    description: "Optimize your Bambu printer with our PLA/PETG/TPU presets, calibration tips and troubleshoot checklist.",
    images: ["/images/og-home.jpg"],
  },
}

const materialPresets = [
  {
    title: "PLA Matte / Tough+",
    bullets: [
      "Nozzle 215 C, bed 60 C, fan 80-100%.",
      "Layer height 0.16-0.24 mm; use 0.2 mm for balance between detail and speed.",
      "Max volumetric flow 20 mm^3/s, speed 160 mm/s outer walls, 220 mm/s infill.",
      "Pressure advance 0.032-0.035, retract 0.8 mm @ 40 mm/s.",
    ],
  },
  {
    title: "PETG",
    bullets: [
      "Nozzle 240-250 C, bed 80-85 C, fan 30-50%.",
      "Layer height 0.2 mm; avoid draft, use enclosure/door closed.",
      "Max volumetric flow 16-18 mm^3/s, speed 120 mm/s outer, 180 mm/s infill.",
      "Pressure advance 0.028-0.032, retract 0.8-1.0 mm @ 35 mm/s.",
    ],
  },
  {
    title: "TPU (95A)",
    bullets: [
      "Nozzle 225-235 C, bed 40-50 C, fan 30-50%.",
      "Layer height 0.2-0.24 mm; keep speeds low to avoid buckling.",
      "Max volumetric flow 8-10 mm^3/s, speed 50-80 mm/s walls/infill.",
      "Disable combing through infill; use direct path travel and gentle retract 0.6-0.8 mm @ 20-25 mm/s.",
    ],
  },
]

const calibrationTips = [
  "Run flow calibration when switching brands/colours, especially for translucent or silk PLA.",
  "Check first-layer squish; Bambu beds can be aggressive—avoid elephants foot by reducing first layer overlap.",
  "AMS: dry filament, use desiccant, and avoid excessive retractions on TPU.",
  "For PETG stringing, dry at 65 C, lower fan and drop nozzle 5 C before tweaking retraction.",
  "Use timelapse/monitoring for long PETG runs; pause to clean nozzle if blobs appear.",
]

const troubleshoot = [
  {
    title: "Layer shifts / ringing",
    body: "Reduce acceleration on tall or flexible parts; ensure belts are tensioned and bed screws are tight.",
  },
  {
    title: "Elephant foot",
    body: "Lower first layer flow/line width, reduce bed temp after first layers, and enable chamfer in the slicer where possible.",
  },
  {
    title: "Under-extrusion",
    body: "Check flow calibration, inspect nozzle for partial clog, and ensure AMS path is smooth (no tangles).",
  },
  {
    title: "Stringing",
    body: "Dry filament, lower nozzle temp, reduce travel through infill, and keep retractions short/controlled.",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "Best settings for your Bambu printer",
  description:
    "Use these presets for PLA, PETG and TPU on Bambu printers: temperatures, speeds, retract and calibration. Includes tips for flow, AMS and maintenance.",
  datePublished: "2024-09-01",
  dateModified: "2024-09-01",
  inLanguage: "en-BE",
})

export default function BambuSettingsBlogEn() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(150%_80%_at_50%_-10%,rgba(99,102,241,0.16),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.08]" />

      <section className="px-6 pb-12 pt-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
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
                <li className="font-medium text-slate-700">Bambu settings</li>
              </ol>
            </nav>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Best settings for your Bambu printer
            </h1>
            <p className="text-lg text-slate-700">
              PLA, PETG and TPU presets we use in the studio, with flow calibration, AMS tips and maintenance to keep your prints consistent.
            </p>
            <div className="flex flex-wrap gap-3">
              <ShimmerButton href="/en/pricing">View pricing</ShimmerButton>
              <Link
                href="/en/materials"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Browse materials
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {materialPresets.map((preset) => (
            <Reveal key={preset.title}>
              <GlassCard className="h-full border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
                <h2 className="text-xl font-semibold text-slate-900">{preset.title}</h2>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {preset.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                      <span>{bullet}</span>
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
              <h2 className="text-2xl font-semibold text-slate-900">Calibration & AMS tips</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {calibrationTips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Troubleshoot checklist</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {troubleshoot.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-2 text-sm text-slate-600">{item.body}</p>
                  </div>
                ))}
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Need tuned settings for your model?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Share your STL/STEP and material. We provide tuned settings or handle the print, with clear lead time and cost.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact">Ask for a settings review</ShimmerButton>
                <Link href="/en/pricing" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  View pricing
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

