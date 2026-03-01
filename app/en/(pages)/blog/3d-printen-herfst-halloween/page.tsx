import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import { buildArticleJsonLd, buildFaqPageSchema } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/en/blog/3d-printen-herfst-halloween/"
const datePublished = "2025-09-15"
const dateModified = "2026-02-18"
const lastUpdatedLabel = "Last updated: February 18, 2026"

export const metadata: Metadata = {
  title: "3D printing for autumn and Halloween 2026 | X3DPrints Blog",
  description:
    "3D printing for autumn and Halloween 2026: decor, props and display parts in PLA, PETG and TPU. Includes material advice, checklist and FAQ.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/3d-printen-herfst-halloween/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/3d-printen-herfst-halloween/",
    },
  },
  openGraph: {
    title: "3D printing for autumn and Halloween 2026",
    description:
      "Practical Halloween guide with clear material strategy and production planning.",
    url: canonical,
    type: "article",
    images: [{ url: "/images/og-home-en.svg", width: 1200, height: 630, alt: "3D printed Halloween decor" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printing for autumn and Halloween 2026",
    description:
      "Guide for Halloween 3D prints with material choice, technical tips and planning checklist.",
    images: ["/images/og-home-en.svg"],
  },
}

const materialRows = [
  { material: "PLA Matte/Silk", use: "Indoor decor, props and table pieces", note: "Color-strong and clean for visual work" },
  { material: "PETG", use: "Outdoor decor and heavier use", note: "Better moisture and temperature tolerance" },
  { material: "TPU", use: "Flexible details and anti-slip points", note: "Useful for grip and impact zones" },
]

const materialTips = [
  "For outdoor autumn setups, PETG is usually safer than standard PLA.",
  "For indoor visual Halloween pieces, PLA Matte/Silk is often ideal.",
  "Use TPU where flexibility or friction control is required.",
  "Validate mounting points and weight distribution for hanging pieces.",
  "Modeling is not included in print-only pricing: provide STL/STEP or request design service.",
]

const useCases = [
  {
    title: "Retail and horeca",
    body: "Storefront props, table decor and seasonal signage for autumn campaigns.",
  },
  {
    title: "Events and attractions",
    body: "Themed decor, custom props and practical holders for temporary setups.",
  },
  {
    title: "Consumer decor",
    body: "Pumpkin and spooky decor, custom names and unique personalized pieces.",
  },
]

const workflowSteps = [
  {
    title: "1. Intake",
    body: "You share model or reference with size, color and deadline.",
  },
  {
    title: "2. Technical check",
    body: "We validate wall thickness, mounting and indoor/outdoor fit.",
  },
  {
    title: "3. Production",
    body: "Printing, quality control and optional light finishing.",
  },
  {
    title: "4. Delivery",
    body: "Pickup or protected shipping based on your timeline.",
  },
]

const checklist = [
  "Use case: decor, display, event prop or utility part.",
  "Specify indoor or outdoor deployment.",
  "Choose material based on moisture, impact and visual needs.",
  "Define mounting method and load points early.",
  "Share deadline and delivery mode clearly.",
]

const faqItems = [
  {
    q: "Which material works best for outdoor Halloween decor?",
    a: "PETG is usually best for outdoor use due to better resistance to moisture and temperature shifts.",
  },
  {
    q: "Can you produce small event batches?",
    a: "Yes. Small to medium batches for events and activations are supported.",
  },
  {
    q: "Is model design included?",
    a: "No. Provide STL/STEP or request design service at EUR 45/hour.",
  },
  {
    q: "What should I include for a fast quote?",
    a: "Size, color, use case, indoor/outdoor context, quantity and deadline.",
  },
  {
    q: "Can fragile decor pieces be shipped safely?",
    a: "Yes. We use protected packaging and can advise modular design to reduce transport risk.",
  },
]

const references = [
  { label: "UltiMaker PLA material properties", href: "https://ultimaker.com/materials/pla/" },
  { label: "UltiMaker PETG material properties", href: "https://ultimaker.com/materials/s-series-petg/" },
  { label: "Prusa filament material guide", href: "https://help.prusa3d.com/filament-material-guide" },
  { label: "Autodesk STL export basics", href: "https://help.autodesk.com/view/fusion360/ENU/?guid=GUID-1B6AA02D-B8E5-4F54-ADC7-11C5B900E05F" },
]

const inspirationImages = [
  { src: "/images/portfolio/halloween1.webp", alt: "3D printed Halloween decor set 1" },
  { src: "/images/portfolio/Halloween2.webp", alt: "3D printed Halloween decor set 2" },
  { src: "/images/portfolio/Halloween3.webp", alt: "3D printed Halloween decor set 3" },
  { src: "/images/portfolio/Halloween4.webp", alt: "3D printed Halloween decor set 4" },
  { src: "/images/portfolio/Halloween5.webp", alt: "3D printed Halloween decor set 5" },
  { src: "/images/portfolio/Halloween6.webp", alt: "3D printed Halloween decor set 6" },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "3D printing for autumn and Halloween 2026",
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

export default function BlogAutumnHalloweenEn() {
  return (
    <main className="relative overflow-clip">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-50" />
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-orange-200/30 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-amber-200/30 blur-3xl" />
      </div>

      <section className="px-6 pb-10 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-700">Seasonal</p>
            <h1 className="mt-2 text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              3D printing for autumn and Halloween 2026
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-lg text-slate-700">
              Need Halloween props or autumn decor quickly with 3D printing? This guide gives direct material guidance,
              technical constraints and planning structure for predictable execution.
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/en/contact?quote=Halloween%20project%202026">Plan Halloween prints 2026</ShimmerButton>
              <Link
                href="/en/segments/3d-printing-seasonal"
                className="rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:bg-white"
              >
                Seasonal segment
              </Link>
              <Link
                href="/en/materials#material-suggestion-tool"
                className="rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:bg-white"
              >
                Material suggestion tool
              </Link>
            </div>
            <nav aria-label="Quick section navigation" className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
              <Link href="#autumn-materials" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                Materials
              </Link>
              <Link href="#autumn-use-cases" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                Use cases
              </Link>
              <Link href="#autumn-planning" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                Planning
              </Link>
              <Link href="#autumn-faq" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
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

      <section id="autumn-materials" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Material choices for Halloween prints</h2>
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
                    <span className="mt-1 h-2 w-2 rounded-full bg-orange-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-700">
                Combine seasonal visual impact with technical stability via{" "}
                <Link href="/en/materials" className="font-semibold text-orange-700 underline underline-offset-2">
                  materials and guidelines
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.06}>
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold tracking-tight text-slate-900">Files and technical input</h3>
              <p className="mt-3 text-sm text-slate-700">
                STL or STEP is preferred. Include indoor/outdoor context, mounting method and expected load so we can
                recommend the right material and geometry faster.
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
                  href="/en/contact?quote=STL%20halloween"
                  className="rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-800 transition hover:bg-orange-100"
                >
                  Send your file
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="autumn-use-cases" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Use cases for autumn and Halloween</h2>
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

      <section id="autumn-planning" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Planning toward seasonal peak demand</h2>
              <p className="mt-3 text-sm text-slate-700">
                Autumn campaigns and Halloween deadlines often cluster together. Early intake leaves space for technical checks,
                optional test prints and stable delivery windows.
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
                <ShimmerButton href="/en/contact?quote=Halloween%20deadline">Request timing and quote</ShimmerButton>
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

      <section id="autumn-faq" className="scroll-mt-28 px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">FAQ: 3D printing for autumn and Halloween</h2>
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

      <section id="autumn-sources" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
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
                        className="font-semibold text-orange-700 transition hover:text-orange-600"
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
