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

const canonical = "https://www.x3dprints.be/en/blog/use-case-dinsdag-auto-fiets/"
const publishedDate = "2025-11-25T08:00:00+01:00"
const dateModified = "2026-02-08"
const faq = BLOG_FAQ_EN["use-case-dinsdag-auto-fiets"]
const lastUpdatedLabel = "Last updated: 8 February 2026"

export const metadata: Metadata = {
  title: "Use Case Tuesday #1: 3D printing for cars and bikes | X3DPrints",
  description:
    "Which parts can you safely 3D print for cars and bikes? Material advice (PLA/PETG/TPU), design checks against heat and vibration, plus what not to print.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/use-case-dinsdag-auto-fiets/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/use-case-dinsdag-auto-fiets/",
    },
  },
  openGraph: {
    title: "Use Case Tuesday #1: 3D printing for cars and bikes",
    description:
      "Application guide for mounts, clamps and housings on vehicles. Includes material comparison, design checklist and do/don't list.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["3D printing bike accessories", "3D printing car mounts", "Use Case Tuesday"],
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "3D printed car and bike parts" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Use Case Tuesday: cars & bikes",
    description: "Which car and bike accessories work with FDM? Material and design guidance from X3DPrints.",
    images: ["/images/og-home.jpg"],
  },
}

const materials = [
  { material: "PLA", note: "Only for indoor or shaded parts. Brittle under vibration and soft above ~55 C." },
  { material: "PETG", note: "Default for mounts and housings. Handles 75-80 C and outdoor use." },
  { material: "TPU", note: "For pads, straps and anti-rattle parts. Flexible and abrasion-friendly." },
]

const designChecks = [
  "Tolerances: PETG +0.25 mm, TPU +0.40 mm on sliding fits. See Maker Monday #3.",
  "Wall thickness: 2.4-3.0 mm in PETG, ribs behind screw bosses. See Maker Monday #2.",
  "Fillets of 2-4 mm on stress points; chamfer bases to fight warping.",
  "Use heat-set inserts or thread-forming screws instead of bare holes.",
  "Respect sunlight and heat: avoid PLA on dashboards or near engines.",
]

const doNotPrint = [
  "Safety-critical parts (brakes, steering, seat rails).",
  "Objects touching hot engines or exhausts.",
  "Long PLA brackets in direct sun.",
  "Zones exposed to oil/fuel where ABS/nylon are safer.",
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
  headline: "Use Case Tuesday #1: 3D printing for cars and bikes",
  description: metadata.description ?? "",
  datePublished: publishedDate,
  dateModified,
  image: "https://www.x3dprints.be/images/og-home.jpg",
  inLanguage: "en-BE",
})


export default function UseCaseAutoBikeEnPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(170%_90%_at_50%_-15%,rgba(59,130,246,0.16),transparent_75%)]"
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
                <li className="font-medium text-slate-700">Use Case Tuesday</li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-900">Cars & bikes</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Use Case Tuesday #1</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Reliable 3D printed accessories for cars and bikes.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Mounts, housings and anti-rattle parts need to survive heat, UV and vibration. This guide shows which parts print well,
              which material to pick and when to skip 3D printing.
            </p>
                        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="stacked-actions mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <ShimmerButton href="/en/contact?topic=use-case-auto-fiets">Request project advice</ShimmerButton>
              <Link
                href="/en/materials"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Materials overview
              </Link>
              <Link
                href="/en/pricing"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Pricing & lead times
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">Published 25 November 2025 - Use Case Tuesday.</p>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="en" />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl grid gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Material picks</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {materials.map((item) => (
                  <li key={item.material} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <p className="text-sm font-semibold text-slate-900">{item.material}</p>
                    <p>{item.note}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-slate-600">
                Need flex zones? Combine PETG cores with TPU pads or straps. Decorative interior pieces can be PLA Matte but keep
                them out of direct sun.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Design checklist</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {designChecks.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Example applications</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                  <span>Phone, GPS and dashcam mounts in PETG with TPU pads.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                  <span>Sensor housings, cable guides and baggage hooks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                  <span>AirTag/tracker enclosures for bikes with TPU straps.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                  <span>Anti-rattle pads between panels or racks.</span>
                </li>
              </ul>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">What not to print</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {doNotPrint.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-slate-600">
                Need ABS/ASA/nylon? We will say so during the intake and point you to a suitable partner if that is safer.
              </p>
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Need a mount or clamp printed?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Share STL/STEP and the environment (sun, heat, vibration). We reply with material advice, planning and price.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact?topic=use-case-auto-fiets">Start intake</ShimmerButton>
                <Link href="/en/3d-printen" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  See the knowledge hub
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





