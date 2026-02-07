import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/en/blog/filament-vrijdag-pc/"
const publishedDate = "2025-12-15T08:00:00+01:00"

export const metadata: Metadata = {
  title: "Filament Friday: polycarbonate (PC) 3D printing | X3DPrints",
  description:
    "PC filament under the microscope. Heat resistant, UV resistant, but demanding on drying and printer setup. Learn when polycarbonate makes sense for your project.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/filament-vrijdag-pc/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/filament-vrijdag-pc/",
    },
  },
  openGraph: {
    title: "Polycarbonate 3D printing: strong parts, critical setup",
    description:
      "X3DPrints Filament Friday. Deep-dive on PC filament: pros/cons, settings, costs, drying time and alternatives.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["polycarbonate 3D printing", "PC filament settings", "PC filament drying", "Filament Friday"],
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "Polycarbonate 3D printing advice by X3DPrints" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filament Friday: polycarbonate (PC) 3D printing",
    description: "Pros/cons, drying, settings and cost considerations for PC filament.",
    images: ["/images/og-home.jpg"],
  },
}

const heroStats = [
  { label: "Heat resistance", value: "~110-120 C", detail: "Outperforms PLA/PETG in heat" },
  { label: "Drying time", value: "6-12h at 80 C", detail: "Critical for layer bonding" },
  { label: "Typical lead time", value: "5-8 days", detail: "Includes drying and tuning" },
]

const printSettings = [
  { label: "Nozzle", value: "260-285 C", note: "Depends on brand; needs all-metal hotend" },
  { label: "Bed", value: "100-115 C", note: "Enclosure strongly recommended" },
  { label: "Chamber", value: "40-60 C", note: "Helps adhesion and reduces warping" },
  { label: "Speed", value: "35-60 mm/s", note: "Slower for tall parts to control warping" },
  { label: "Cooling", value: "0-20%", note: "Minimal fan to keep layers fused" },
  { label: "Retraction", value: "0.6-1.0 mm", note: "Short and conservative to avoid jams at high temp" },
]

const pros = [
  "High heat resistance versus PLA/PETG.",
  "Tough and dimensionally stable when printed correctly.",
  "Good UV resistance, suitable for outdoor housings.",
  "Clear/translucent options for light pipes and covers.",
]

const cons = [
  "Requires enclosure, high temps and aggressive drying.",
  "More warping risk on large, flat parts.",
  "Higher material and operating cost than PLA/PETG.",
  "Odor and fume considerations; ventilation advised.",
]

const whenToUse = [
  "Under-hood automotive parts away from direct flame.",
  "Outdoor enclosures and fixtures exposed to sun/heat.",
  "Functional brackets and tooling that face sustained temperature.",
  "Light guides or protective covers needing clarity and heat performance.",
]

const whenToAvoid = [
  "Budget projects where PETG suffices.",
  "Thin cosmetic parts where PLA looks better and heat is low.",
  "Printers without enclosure or all-metal hotend.",
  "Jobs with extreme chemical exposure (consider ASA/ABS/PA blends).",
]

const costNotes = [
  "Material is pricier and requires drying cycles, adding prep time.",
  "Higher nozzle/bed temps increase energy use versus PLA/PETG.",
  "Warp mitigation (brims, rafts, slower speeds) adds machine hours.",
  "Fail risk on large parts is higher; factor test prints into budgets.",
]

const alternatives = [
  { material: "PETG", reason: "For heat up to ~80 C with easier printing and lower cost." },
  { material: "ASA/ABS", reason: "If you need UV and better heat than PETG, but easier than PC (still needs enclosure)." },
  { material: "PA-CF", reason: "For stiff, strong parts at higher temps; requires hardened nozzle and enclosure." },
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Filament Friday: polycarbonate (PC) 3D printing",
  description:
    "PC filament guide: when to use it, required settings, drying, cost considerations and alternatives. Part of Filament Friday.",
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

export default function FilamentFridayPcEnPage() {
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
                <li className="font-medium text-slate-900">Polycarbonate (PC)</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Filament Friday</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Polycarbonate: when do you really need it?
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              PC is powerful but demanding. This guide covers required hardware, drying, settings, when PC is worth it, and when PETG/ASA may be smarter.
            </p>
            <div className="stacked-actions mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <ShimmerButton href="/en/contact?material=PC">Ask PC advice</ShimmerButton>
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
            <p className="mt-4 text-sm text-slate-500">Published 15 December 2025 - part of the Filament Friday series.</p>
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
              <h2 className="text-2xl font-semibold text-slate-900">PC settings we use</h2>
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
              <h2 className="text-2xl font-semibold text-slate-900">Pros of PC</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {pros.map((item) => (
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
              <h2 className="text-2xl font-semibold text-slate-900">Cons and constraints</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {cons.map((item) => (
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
              <h2 className="text-2xl font-semibold text-slate-900">When PC makes sense</h2>
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
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">When to pick an alternative</h2>
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
              <h2 className="text-2xl font-semibold text-slate-900">Cost and risk notes</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {costNotes.map((note) => (
                  <li key={note} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                    <span>{note}</span>
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
              <h2 className="text-2xl font-semibold text-slate-900">Alternatives to consider</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {alternatives.map((alt) => (
                  <li key={alt.material} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                    <span>
                      <strong>{alt.material}</strong>: {alt.reason}
                    </span>
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Is PC the right choice?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Share your STL/STEP and environment details. We will confirm if PC is worth it or propose PETG/ASA/PA with clear lead times and costs.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact?material=PC">Ask for a PC recommendation</ShimmerButton>
                <Link href="/en/pricing" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  View pricing & calculator
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
