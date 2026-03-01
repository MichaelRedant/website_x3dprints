import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import { buildArticleJsonLd, buildFaqPageSchema } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/en/blog/3d-printen-vaderdag-moederdag/"
const datePublished = "2025-04-30"
const dateModified = "2026-02-18"
const lastUpdatedLabel = "Last updated: February 18, 2026"

export const metadata: Metadata = {
  title: "Father's Day and Mother's Day 2026 3D printing | X3DPrints Blog",
  description:
    "3D printing for Father's Day and Mother's Day 2026: personalized gifts, keychains and desk items in PLA, PETG and TPU. Includes material strategy, checklist and FAQ.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/3d-printen-vaderdag-moederdag/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/3d-printen-vaderdag-moederdag/",
    },
  },
  openGraph: {
    title: "Father's Day and Mother's Day 2026 3D printing",
    description:
      "Practical guide for personalized gifts with clear material choices and planning toward May and June deadlines.",
    url: canonical,
    type: "article",
    images: [{ url: "/images/og-home-en.svg", width: 1200, height: 630, alt: "3D printed Father's Day and Mother's Day gifts" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Father's Day and Mother's Day 2026 3D printing",
    description:
      "Guide for 3D printed gifts with material selection, checklist and planning for May-June 2026.",
    images: ["/images/og-home-en.svg"],
  },
}

const materialRows = [
  { material: "PLA Silk/Matte", use: "Name gifts and decorative pieces", note: "Strong indoor visual finish" },
  { material: "PETG", use: "Keychains and robust desk items", note: "Better wear resistance for daily use" },
  { material: "TPU", use: "Anti-slip pads and flexible details", note: "Extra grip and damping" },
]

const materialTips = [
  "Silk PLA suits premium glossy gifts, Matte PLA gives a softer visual style.",
  "For keychains and tougher handling, PETG is usually the better option.",
  "Use TPU for anti-slip contact points on smooth desk surfaces.",
  "Keep text depth at least 0.6 mm for stable readability.",
  "Modeling is not included in print-only pricing: provide STL/STEP or use design service.",
]

const useCases = [
  {
    title: "B2B gift runs",
    body: "Personalized small branded batches for teams, events and client gifting.",
  },
  {
    title: "Personal gifts",
    body: "Custom keychains, desk pieces and name-based gift items for parents.",
  },
  {
    title: "Small series",
    body: "Consistent production batches with controlled color and finish quality.",
  },
]

const workflowSteps = [
  {
    title: "1. Brief",
    body: "Share model or reference with dimensions, color and deadline.",
  },
  {
    title: "2. Technical check",
    body: "We validate text readability, wall thickness and material fit.",
  },
  {
    title: "3. Production",
    body: "Printing, quality control and optional light finishing.",
  },
  {
    title: "4. Delivery",
    body: "Pickup in Herzele or protected shipping based on your timeline.",
  },
]

const checklist = [
  "Item type: keychain, nameplate, desk item or decor.",
  "Material strategy: PLA for look, PETG for strength, TPU for grip.",
  "Personalization details: names, initials, logos and placement.",
  "Required finishing: raw, lightly sanded or primed.",
  "Share deadline and delivery preference clearly.",
]

const faqItems = [
  {
    q: "Can you print multiple names in one batch?",
    a: "Yes. Provide a list or separate STL/STEP files. We batch per color for consistency.",
  },
  {
    q: "Which material is best for keychains?",
    a: "PETG is typically best for daily use because it handles wear better than standard PLA.",
  },
  {
    q: "Is design included in print pricing?",
    a: "No. You provide STL/STEP or choose design service at EUR 45/hour.",
  },
  {
    q: "Can you support small B2B gift series?",
    a: "Yes. Small and medium runs for events or gifting campaigns are supported.",
  },
  {
    q: "How should I plan for May and June deadlines?",
    a: "Start early so technical checks, optional test prints and delivery remain predictable.",
  },
]

const references = [
  { label: "UltiMaker PLA material properties", href: "https://ultimaker.com/materials/pla/" },
  { label: "UltiMaker PETG material properties", href: "https://ultimaker.com/materials/s-series-petg/" },
  { label: "Prusa filament material guide", href: "https://help.prusa3d.com/filament-material-guide" },
  { label: "Autodesk STL export basics", href: "https://help.autodesk.com/view/fusion360/ENU/?guid=GUID-1B6AA02D-B8E5-4F54-ADC7-11C5B900E05F" },
]

const inspirationImages = [
  { src: "/images/portfolio/vaas-tetrahex-ripple-2-scaled.webp", alt: "Personalized vase gift" },
  { src: "/images/portfolio/moederdag.webp", alt: "Desk gift for parents day" },
  { src: "/images/portfolio/vaas-spiral-2-3-scaled.webp", alt: "Silk PLA decorative gift" },
  { src: "/images/portfolio/vaas-capsule-planter-scaled.webp", alt: "Small decorative gift concept" },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "Father's Day and Mother's Day 2026 3D printing",
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

export default function ParentsDayBlogEn() {
  return (
    <main className="relative overflow-clip">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-sky-50" />
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-pink-200/30 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-sky-200/30 blur-3xl" />
      </div>

      <section className="px-6 pb-10 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-700">Seasonal</p>
            <h1 className="mt-2 text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Father&apos;s Day and Mother&apos;s Day 2026 3D printing
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-lg text-slate-700">
              Need personalized gifts for Father&apos;s Day or Mother&apos;s Day? This guide gives immediate material and
              planning guidance so you can deliver reliably toward May and June 2026.
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/en/contact?quote=Parents%20Day%202026">Plan your 2026 gift run</ShimmerButton>
              <Link
                href="/en/segments/3d-printing-vaderdag-moederdag"
                className="rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:bg-white"
              >
                Parents day segment
              </Link>
              <Link
                href="/en/materials#material-suggestion-tool"
                className="rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:bg-white"
              >
                Material suggestion tool
              </Link>
            </div>
            <nav aria-label="Quick section navigation" className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
              <Link href="#parents-materials" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                Materials
              </Link>
              <Link href="#parents-use-cases" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                Use cases
              </Link>
              <Link href="#parents-planning" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                Planning
              </Link>
              <Link href="#parents-faq" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
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

      <section id="parents-materials" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Material strategy for gift prints</h2>
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
                For a fast material decision flow, use{" "}
                <Link href="/en/materials" className="font-semibold text-rose-700 underline underline-offset-2">
                  materials and guidelines
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.06}>
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold tracking-tight text-slate-900">File input and prep</h3>
              <p className="mt-3 text-sm text-slate-700">
                STL or STEP is recommended. Share quantity, color and personalization rules to reduce revision cycles and
                keep output consistent.
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
                  href="/en/contact?quote=STL%20gift"
                  className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-800 transition hover:bg-rose-100"
                >
                  Send your file
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="parents-use-cases" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Use cases for personal and B2B gifting</h2>
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
                    className={`overflow-hidden rounded-xl border border-white/70 bg-white/80 shadow-sm ${idx === 0 ? "sm:col-span-2" : ""}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={idx === 0 ? 960 : 640}
                      height={idx === 0 ? 540 : 480}
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

      <section id="parents-planning" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Planning toward May and June</h2>
              <p className="mt-3 text-sm text-slate-700">
                Early intake reduces last-minute risk for personalized items and leaves room for technical checks and optional
                test prints where required.
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
                <ShimmerButton href="/en/contact?quote=Parents%20Day%20deadline">Request timing and quote</ShimmerButton>
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

      <section id="parents-faq" className="scroll-mt-28 px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">FAQ: 3D printing for Father&rsquo;s and Mother&rsquo;s Day</h2>
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

      <section id="parents-sources" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
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
