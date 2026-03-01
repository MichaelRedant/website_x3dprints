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

const canonical = "https://www.x3dprints.be/en/blog/hoe-3d-print-je-onderdelen-voor-buitengebruik/"
const publishedDate = "2025-11-21T08:00:00+01:00"
const dateModified = "2026-02-08"
const faq = BLOG_FAQ_EN["hoe-3d-print-je-onderdelen-voor-buitengebruik"]
const lastUpdatedLabel = "Last updated: 8 February 2026"

export const metadata: Metadata = {
  title: "How to 3D print parts for outdoor use | X3DPrints",
  description:
    "How-to guide for garden, facade, bikes and sensors. Learn why PLA fails outdoors, when to pick PETG or TPU, and how to mount parts for long-term use.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/hoe-3d-print-je-onderdelen-voor-buitengebruik/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/hoe-3d-print-je-onderdelen-voor-buitengebruik/",
    },
  },
  openGraph: {
    title: "Outdoor 3D printing: materials, mounting and design",
    description:
      "Practical guide for outdoor 3D prints. From PETG and TPU to hybrid builds and mounting tips for garden, facade, sensors and car interior.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["3D print outdoor", "PETG", "TPU", "outdoor projects"],
    images: [{ url: "/images/og-home-en.svg", width: 1200, height: 630, alt: "Outdoor 3D print advice by X3DPrints" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "How-to: 3D print parts for outdoor use",
    description: "Materials, mounting and design rules so your prints survive sun, rain and vibration.",
    images: ["/images/og-home-en.svg"],
  },
}

const attachmentTips = [
  {
    title: "Screw holes with clearance",
    detail:
      "Add 0.2-0.3 mm margin for PETG, 0.3-0.5 mm for PLA covers and 0.1-0.2 mm for TPU. This lets material expand without cracking.",
  },
  {
    title: "Brass inserts and hardware",
    detail:
      "Use inserts or captive nuts for parts under tension or frequent assembly. Screws straight into plastic loosen outdoors quickly.",
  },
  {
    title: "Lugs and snap fits",
    detail:
      "Let parts anchor mechanically via lugs or dovetails. You spread the load and avoid visible screws.",
  },
  {
    title: "Drainage and chamfers",
    detail: "Add chamfers or drain holes so water can escape. Standing water accelerates degradation and algae growth.",
  },
]

const bestPractices = [
  {
    title: "UV and weather",
    description:
      "PETG is more UV-stable than PLA but not immortal. Avoid critical details sitting in direct sunlight all day or shield them with covers.",
  },
  {
    title: "Heat management",
    description:
      "South-facing facades or dashboards reach 50-70 C. PLA fails there; PETG and TPU stay usable but prefer airflow.",
  },
  {
    title: "Redundant mounting",
    description:
      "Use at least two mounting points or a rail. Single screw points tear out faster due to wind and vibration.",
  },
]

const scenarioMatrix = [
  { application: "Garden sensor or weather station", material: "PETG", reason: "Moisture and UV resistance, stays dimensionally stable up to ~80 C." },
  { application: "Facade part or decor", material: "PLA cover + PETG core", reason: "Exterior aesthetics, but strong core for mounting." },
  { application: "Bike mount or clamp", material: "TPU or PETG", reason: "TPU for grip; PETG for a stiff base or plate." },
  { application: "Car interior", material: "PETG", reason: "Holds shape at elevated temperatures behind glass." },
  { application: "Vibration-prone components", material: "TPU", reason: "Damps vibration and distributes load around screws." },
]

const externalResources = [
  {
    label: "Bambu Lab PETG guide",
    href: "https://wiki.bambulab.com/en/filament/petg",
    description: "Official PETG parameters including drying advice and AMS tips.",
  },
  {
    label: "Prusa: preparing prints for outdoor use",
    href: "https://help.prusa3d.com/article/how-to-prepare-prints-for-outdoor-use_2175",
    description: "Extra notes about painting, UV coatings and material choice.",
  },
  {
    label: "Ultimaker: PETG vs PLA comparison",
    href: "https://support.makerbot.com/s/article/1667336228714",
    description: "Comparison of PLA vs PETG on heat and moisture resistance.",
  },
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
  headline: "How to 3D print parts for outdoor use?",
  description: metadata.description ?? "",
  datePublished: publishedDate,
  dateModified,
  image: "https://www.x3dprints.be/images/og-home-en.svg",
  inLanguage: "en-BE",
})


export default function OutdoorPrintingGuideEnPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(110%_60%_at_50%_-10%,rgba(16,185,129,0.18),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.08]" />

      <section className="px-6 pt-16 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-600">How-to guide</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              How to 3D print parts for outdoor use?
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Outdoor 3D prints seem simple until sun, rain and temperature swings get involved. This guide shows which materials hold up, how to mount
              without cracks and where PLA still plays a role without early failure.
            </p>
                        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/en/contact?material=PETG">Plan an outdoor print</ShimmerButton>
              <Link
                href="/en/materials"
                className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5"
              >
                View materials
              </Link>
              <Link
                href="/en/pricing"
                className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5"
              >
                Check prices & calculator
              </Link>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              Published 21 November 2025 - Part of the X3DPrints knowledge hub with links to material blogs and production approach.
            </p>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="en" />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Why PLA almost always fails outdoors</h2>
              <p className="mt-3 text-sm text-slate-600">
                PLA is fantastic for interiors, displays and prototypes, but outside it breaks down quickly. UV light attacks the polymer, moisture
                creeps into micro cracks and around 55 degrees C PLA softens. A sunny facade or car interior reaches that easily.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>- Glass transition around 55-60 degrees C: dashboards, greenhouses and dark facades reach that easily.</li>
                <li>- UV causes discoloration and brittleness within weeks.</li>
                <li>- Temperature swings create micro cracks, especially near screw points.</li>
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Want to try anyway? Read the{" "}
                <Link href="/en/blog/filament-vrijdag-pla" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  PLA blog
                </Link>{" "}
                first for all warnings about heat and UV. Use PLA only as a decorative cover that slides over a PETG core.
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">PETG: the reliable outdoor choice</h2>
              <p className="mt-3 text-sm text-slate-600">
                PETG combines toughness with chemical resistance and stays dimensionally stable up to roughly 80 degrees C. Ideal for enclosures,
                sensors, garden lighting and bike clamps that stay outside.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>- Better UV and moisture resistance than PLA.</li>
                <li>- Bends before it breaks, great for clamps or sensor mounts.</li>
                <li>- Available in translucent variants for lighting.</li>
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Typical use: sensor housings, garden lights, brackets on bikes or facades and vehicle elements without extreme heat. Dive deeper in the{" "}
                <Link href="/en/blog/filament-vrijdag-petg" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  PETG blog
                </Link>{" "}
                for studio settings and drying tips.
              </p>
              <p className="mt-4 text-xs text-slate-500">
                Extra reading:{" "}
                <Link
                  href="https://wiki.bambulab.com/en/filament/petg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 underline"
                >
                  Bambu Lab PETG guide
                </Link>{" "}
                about moisture management and AMS profiles.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">TPU: grip, damping and tolerance</h2>
              <p className="mt-3 text-sm text-slate-600">
                Flexible parts outdoors? TPU absorbs vibration, adds grip and seals. Perfect for cable glands, sleeves, gaskets and rubber-like clamps
                around tubes or downpipes.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>- Stays elastic in the elements as long as walls are not extremely thin.</li>
                <li>- Pairs well with PETG frames for hybrid clamps.</li>
                <li>- Depending on the blend, UV stable enough for outdoors.</li>
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                More examples and settings in{" "}
                <Link href="/en/blog/filament-vrijdag-tpu" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Filament Friday: TPU
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Hybrid builds: PLA + PETG + TPU</h2>
              <p className="mt-3 text-sm text-slate-600">Sometimes you want the PLA Matte or Marble look outside with the certainty of PETG. Split roles:</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>- PLA cover as the visible part, PETG core for strength.</li>
                <li>- TPU inserts for clamping force or vibration damping.</li>
                <li>- PETG base with PLA Marble ornaments you can swap easily.</li>
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Example: facade sensor with PLA Matte cover, PETG body and TPU cable glands. That way you combine aesthetics and function without the
                assembly failing after six months.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">How do you mount outdoor parts?</h2>
              <p className="mt-3 text-sm text-slate-600">Picking the right filament is step one; most failures come from mounting. Follow these practices:</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {attachmentTips.map((tip) => (
                  <div key={tip.title} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <h3 className="text-base font-semibold text-slate-900">{tip.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{tip.detail}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3">
          {bestPractices.map((practice, index) => (
            <Reveal key={practice.title} delay={index * 0.05}>
              <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">Best practice</p>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{practice.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{practice.description}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Material choice per scenario</h2>
              <p className="mt-2 text-sm text-slate-600">Use this overview as a starting point. Exact choice depends on size, mounting and budget.</p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-slate-500">
                      <th className="py-2 pr-4">Application</th>
                      <th className="py-2 pr-4">Best material</th>
                      <th className="py-2 pr-4">Why</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {scenarioMatrix.map((row) => (
                      <tr key={row.application}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{row.application}</td>
                        <td className="py-3 pr-4">{row.material}</td>
                        <td className="py-3 pr-4">{row.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Still unsure? Use the{" "}
                <Link href="/en/materials#material-suggestion-tool" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Material Suggestion Tool
                </Link>{" "}
                or request tailored advice right away.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">What does an outdoor-ready project cost?</h2>
              <p className="mt-3 text-sm text-slate-600">
                Outdoor prints usually mean PETG or TPU, thicker walls and inserts. That mainly increases machine hours. Check the{" "}
                <Link href="/en/materials" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  materials overview
                </Link>{" "}
                and the{" "}
                <Link href="/en/pricing" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  pricing & calculator
                </Link>{" "}
                to see material impact.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li>- PETG and TPU print slower than PLA, so more machine hours.</li>
                <li>- Inserts, ribs or redundancy add print time but prevent service calls later.</li>
                <li>- We tune wall thickness and infill to use: thicker where load sits, lighter where it is just visible.</li>
              </ul>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">External resources</h2>
              <p className="mt-2 text-sm text-slate-600">Want to read more? These sources back up our recommendations:</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {externalResources.map((resource) => (
                  <li key={resource.href} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <Link
                      href={resource.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-semibold text-indigo-600 transition hover:text-indigo-500"
                    >
                      {resource.label}
                    </Link>
                    <p className="mt-1">{resource.description}</p>
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
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-500">Next step</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Want to be sure your design survives outdoors?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Upload your STL/STEP and tell us how the part will be used (sun, vibration, mounting). We send a clear proposal with material choice,
                  mounting tips and budget indication.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact?topic=outdoor-printing">Plan outdoor advice</ShimmerButton>
                <Link href="/en/viewer" className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-500">
                  Upload files via the viewer
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
                <cite className="not-italic"><a href={ref.href} target="_blank" rel="noreferrer" className="text-base font-semibold text-indigo-600">
                  {ref.label}
                </a></cite>
                <p className="mt-1 text-sm text-slate-600">{ref.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <BlogFaq title={faq.title} items={faq.items} inLanguage="en-BE" mainEntityOfPage={canonical} />


      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <BlogAuthorNote locale="en" />

    </main>
  )
}





