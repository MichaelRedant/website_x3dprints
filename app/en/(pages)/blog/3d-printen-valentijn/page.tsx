import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import { buildArticleJsonLd, buildFaqPageSchema } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/en/blog/3d-printen-valentijn/"
const datePublished = "2025-01-05"
const dateModified = "2026-02-18"
const lastUpdatedLabel = "Last updated: February 18, 2026"

export const metadata: Metadata = {
  title: "3D printing for Valentine's Day 2026 | X3DPrints Blog",
  description:
    "3D printing for Valentine's Day 2026: personalized gifts, table decor and light objects in PLA, Translucent PLA or PETG. Includes checklist, material choices and FAQ.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/3d-printen-valentijn/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/3d-printen-valentijn/",
    },
  },
  openGraph: {
    title: "3D printing for Valentine's Day 2026",
    description:
      "Practical guide for personalized Valentine prints with clear material choices, technical limits and planning tips.",
    url: canonical,
    type: "article",
    images: [{ url: "/images/og-home-en.svg", width: 1200, height: 630, alt: "3D printed Valentine decor" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printing for Valentine's Day 2026",
    description:
      "Guide to Valentine 3D prints: material selection, checklist and production planning.",
    images: ["/images/og-home-en.svg"],
  },
}

const materialRows = [
  { material: "PLA Silk/Marble", use: "Premium gifts, name tags, decor", note: "Strong visual finish for indoor use" },
  { material: "PLA Matte", use: "Soft pastel pieces and table decor", note: "Clean surface and stable print behavior" },
  { material: "Translucent PLA", use: "Light objects and lanterns", note: "1.6-2 mm walls for diffuse glow" },
  { material: "PETG", use: "Warmer spaces or semi-outdoor", note: "Higher heat and moisture resistance" },
]

const materialTips = [
  "Use 0.16-0.20 mm layer height for clean text and logo detail.",
  "Use at least 1.2 mm wall thickness for hangers and keychains.",
  "For light objects, Translucent PLA with uniform walls gives the best diffusion.",
  "For outdoor use, PETG is usually safer than standard PLA.",
  "Design file is not included in print-only pricing: provide STL/STEP or use design service.",
]

const useCases = [
  {
    title: "B2B gifts",
    body: "Branded gifts, event giveaways and subtle promo objects for teams and clients.",
  },
  {
    title: "Retail display",
    body: "Valentine displays, name tags and decorative props for storefront presentation.",
  },
  {
    title: "Personal gifts",
    body: "Custom names, duo ornaments and unique decorative gift items.",
  },
]

const workflowSteps = [
  {
    title: "1. Brief",
    body: "Share your model, reference or idea with dimensions, color and deadline.",
  },
  {
    title: "2. Technical validation",
    body: "We check wall thickness, text readability and mounting points.",
  },
  {
    title: "3. Production",
    body: "Printing, quality control and optional light finishing.",
  },
  {
    title: "4. Delivery",
    body: "Pickup in Herzele or protected shipping for fragile parts.",
  },
]

const checklist = [
  "Purpose: gift, display, event prop or light object.",
  "Material: Silk/Matte, Translucent PLA or PETG.",
  "Personalization: name, logo, text and placement.",
  "Finishing level: raw, lightly sanded or primed.",
  "Include deadline and delivery preference in your request.",
]

const faqItems = [
  {
    q: "Can you print personalized Valentine's gifts with names?",
    a: "Yes. You can provide STL/STEP with custom text, or use design service at EUR 45/hour.",
  },
  {
    q: "Which material is best for a glowing Valentine object?",
    a: "Translucent PLA is usually the best choice for soft light diffusion with small LED setups.",
  },
  {
    q: "Is the 3D model included in print pricing?",
    a: "No. Print service and design service are separate. You provide a file or request modeling.",
  },
  {
    q: "Can you produce small B2B series for events?",
    a: "Yes. Short production runs for business gifts and event items are supported with consistent quality.",
  },
  {
    q: "How do I reduce last-minute risk before February 14?",
    a: "Start early so there is room for technical checks and one optional test print.",
  },
]

const references = [
  { label: "UltiMaker PLA material properties", href: "https://ultimaker.com/materials/pla/" },
  { label: "UltiMaker PETG material properties", href: "https://ultimaker.com/materials/s-series-petg/" },
  { label: "Prusa filament material guide", href: "https://help.prusa3d.com/filament-material-guide" },
  { label: "Autodesk STL export basics", href: "https://help.autodesk.com/view/fusion360/ENU/?guid=GUID-1B6AA02D-B8E5-4F54-ADC7-11C5B900E05F" },
]

const inspirationImages = [
  { src: "/images/portfolio/valentijn2.webp", alt: "3D printed Valentine duo decor" },
  { src: "/images/portfolio/valentijn3.webp", alt: "3D printed Valentine heart decor" },
  { src: "/images/portfolio/big%20valentijn%20boy%20articulated.webp", alt: "3D printed articulated Valentine figure" },
  { src: "/images/portfolio/vaas-capsule-planter-scaled.webp", alt: "3D printed Valentine vase decor" },
  { src: "/images/portfolio/vaas-spiral-2-3-scaled.webp", alt: "3D printed spiral vase in Valentine styling" },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "3D printing for Valentine's Day 2026",
  description: metadata.description ?? "",
  datePublished,
  dateModified,
  image: "https://www.x3dprints.be/images/og-home-en.svg",
  inLanguage: "en-BE",
})

const faqJsonLd = buildFaqPageSchema({
  inLanguage: "en-BE",
  items: faqItems,
})

export default function BlogValentineEn() {
  return (
    <main className="relative overflow-clip">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-amber-50" />
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-rose-200/30 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-amber-200/30 blur-3xl" />
      </div>

      <section className="px-6 pb-10 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-700">Seasonal</p>
            <h1 className="mt-2 text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              3D printing for Valentine&apos;s Day 2026
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-lg text-slate-700">
              Need a personalized Valentine gift or branded promo item? This guide covers practical material choices,
              technical constraints and delivery planning so you can avoid deadline stress before February 14.
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/en/contact?quote=Valentine%20print%202026">Plan Valentine prints 2026</ShimmerButton>
              <Link
                href="/en/segments/3d-printing-valentijn"
                className="rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:bg-white"
              >
                Valentine segment
              </Link>
              <Link
                href="/en/materials#material-suggestion-tool"
                className="rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:bg-white"
              >
                Material suggestion tool
              </Link>
            </div>
            <nav aria-label="Quick section navigation" className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
              <Link href="#valentine-materials" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                Materials
              </Link>
              <Link href="#valentine-use-cases" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                Use cases
              </Link>
              <Link href="#valentine-planning" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                Planning
              </Link>
              <Link href="#valentine-faq" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                FAQ
              </Link>
              <Link href="#sources" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                Sources
              </Link>
            </nav>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="en" />

      <section id="valentine-materials" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Material choices for Valentine prints</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-slate-500">
                      <th className="py-2 pr-4">Material</th>
                      <th className="py-2 pr-4">Use case</th>
                      <th className="py-2 pr-4">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {materialRows.map((row) => (
                      <tr key={row.material}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{row.material}</td>
                        <td className="py-3 pr-4">{row.use}</td>
                        <td className="py-3 pr-4">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {materialTips.map((tip) => (
                  <li key={tip} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-rose-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-700">
                Compare options on the{" "}
                <Link href="/en/materials" className="font-semibold text-rose-700 underline underline-offset-2">
                  materials page
                </Link>
                . For premium visual gifts, Silk/Matte usually works best, while PETG is better for tougher use.
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.06}>
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold tracking-tight text-slate-900">Design and file input</h3>
              <p className="mt-3 text-sm text-slate-700">
                STL or STEP gives the cleanest handoff. Include text, dimensions and color intent so we can quickly
                validate readability, supports and print orientation.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>Accepted files: STL and STEP.</li>
                <li>Optional design service: EUR 45/hour.</li>
                <li>Modeling is not included in print-only pricing.</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/en/3d-modellen-vinden"
                  className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white"
                >
                  Where to find models
                </Link>
                <Link
                  href="/en/contact?quote=STL%20Valentine"
                  className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-800 transition hover:bg-rose-100"
                >
                  Send your file
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="valentine-use-cases" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Use cases for business and personal projects</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {useCases.map((item) => (
                  <article key={item.title} className="rounded-2xl border border-slate-200/70 bg-white/80 p-4">
                    <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-700">{item.body}</p>
                  </article>
                ))}
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {inspirationImages.map((img, idx) => (
                  <div
                    key={img.src}
                    className={`overflow-hidden rounded-xl border border-white/70 bg-white/80 shadow-sm ${idx === inspirationImages.length - 1 ? "sm:col-span-2" : ""}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={idx === inspirationImages.length - 1 ? 960 : 640}
                      height={idx === inspirationImages.length - 1 ? 540 : 480}
                      className="h-full w-full object-cover"
                      sizes="(min-width: 1024px) 320px, 100vw"
                      priority={idx === 0}
                    />
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="valentine-planning" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Planning and lead time before February 14</h2>
              <p className="mt-3 text-sm text-slate-700">
                Early planning creates room for technical optimization and reduces rush risk. This matters most for
                personalized pieces where text and detail quality must be stable.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {workflowSteps.map((step) => (
                  <div key={step.title} className="rounded-2xl border border-slate-200/70 bg-white/80 p-4">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-900">{step.title}</h3>
                    <p className="mt-2 text-sm text-slate-700">{step.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <ShimmerButton href="/en/contact?quote=Valentine%20deadline">Request timing and quote</ShimmerButton>
                <Link
                  href="/en/pricing"
                  className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white"
                >
                  View pricing
                </Link>
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.06}>
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold tracking-tight text-slate-900">Request checklist</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {checklist.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="valentine-faq" className="scroll-mt-28 px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">FAQ: 3D printing for Valentine&apos;s Day</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                {faqItems.map((item) => (
                  <article key={item.q} className="rounded-xl border border-slate-200/70 bg-white/70 p-4">
                    <h3 className="font-semibold text-slate-800">{item.q}</h3>
                    <p className="mt-1">{item.a}</p>
                  </article>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="valentine-sources" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 id="sources" className="text-2xl font-bold tracking-tight text-slate-900">
                Sources and references
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {references.map((reference) => (
                  <li key={reference.href} className="rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3">
                    <cite className="not-italic">
                      <a
                        href={reference.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-rose-700 transition hover:text-rose-600"
                      >
                        {reference.label}
                      </a>
                    </cite>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BlogAuthorNote locale="en" />
    </main>
  )
}
