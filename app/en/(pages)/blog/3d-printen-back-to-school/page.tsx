import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import VideoGallery from "@/components/VideoGallery"
import { buildArticleJsonLd, buildFaqPageSchema } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/en/blog/3d-printen-back-to-school/"
const datePublished = "2025-07-15"
const dateModified = "2026-02-18"
const lastUpdatedLabel = "Last updated: February 18, 2026"

export const metadata: Metadata = {
  title: "Back to School 2026: 3D printing for school | X3DPrints Blog",
  description:
    "3D printing for Back to School 2026: pen holders, nameplates, organizers and STEM models in PLA, PETG and TPU. Includes material strategy, checklist and FAQ.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/3d-printen-back-to-school/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/3d-printen-back-to-school/",
    },
  },
  openGraph: {
    title: "Back to School 2026: 3D printing for school",
    description:
      "Practical guide for educational and personalized school prints with clear material and timing choices.",
    url: canonical,
    type: "article",
    images: [{ url: "/images/og-home-en.svg", width: 1200, height: 630, alt: "Back to School 3D prints" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Back to School 2026: 3D printing for school",
    description:
      "Guide for Back to School 3D prints with material strategy, checklist and delivery planning.",
    images: ["/images/og-home-en.svg"],
  },
}

const materialRows = [
  { material: "PLA Matte", use: "Nameplates and visual organizers", note: "Readable text and clean finish" },
  { material: "PETG", use: "Robust school parts and holders", note: "Stronger for daily handling" },
  { material: "TPU", use: "Anti-slip pads and flexible clips", note: "Better grip and damping" },
]

const materialTips = [
  "PLA Matte is often best for clear text and neat school-facing visuals.",
  "PETG is better for heavily used or load-bearing school parts.",
  "Use TPU where grip and flexibility matter, such as anti-slip contact points.",
  "Keep text depth at least 0.6 mm for reliable readability.",
  "Modeling is not included in print-only pricing: provide STL/STEP or request design service.",
]

const useCases = [
  {
    title: "Schools and STEM",
    body: "Teaching models, class-use parts and practical custom learning aids.",
  },
  {
    title: "Desk organization",
    body: "Name labels, pen holders and organizers for students and staff.",
  },
  {
    title: "Small batches",
    body: "Multi-name or multi-class production with consistent color and finish quality.",
  },
]

const workflowSteps = [
  {
    title: "1. Brief",
    body: "You share model or reference with dimensions, color and deadline.",
  },
  {
    title: "2. Technical check",
    body: "We validate material choice, readability and mechanical fit.",
  },
  {
    title: "3. Production",
    body: "Printing, quality checks and optional light finishing.",
  },
  {
    title: "4. Delivery",
    body: "Pickup in Herzele or planned shipping.",
  },
]

const checklist = [
  "Project type: nameplate, organizer, STEM model or accessory.",
  "Material strategy: PLA, PETG or TPU based on use case.",
  "Personalization input: names, logos or class IDs in one file set.",
  "Finishing preference: raw, lightly sanded or primed.",
  "Clearly define deadline and delivery method.",
]

const faqItems = [
  {
    q: "Which material do you recommend for school use?",
    a: "PLA Matte for readable labels and visual parts, PETG for stronger daily-use parts, TPU for anti-slip or flex zones.",
  },
  {
    q: "Can you print multiple names in one batch?",
    a: "Yes. Provide a name list or separate STL/STEP files; we batch efficiently and consistently.",
  },
  {
    q: "Is model design included in print pricing?",
    a: "No. You provide STL/STEP, or request design service at EUR 45/hour.",
  },
  {
    q: "Can you produce educational STEM models?",
    a: "Yes. Both visual teaching models and practical educational parts are supported.",
  },
  {
    q: "How should I plan for August and September deadlines?",
    a: "Start early so material selection, optional test prints and delivery stay under control.",
  },
]

const references = [
  { label: "UltiMaker PLA material properties", href: "https://ultimaker.com/materials/pla/" },
  { label: "UltiMaker PETG material properties", href: "https://ultimaker.com/materials/s-series-petg/" },
  { label: "Prusa filament material guide", href: "https://help.prusa3d.com/filament-material-guide" },
  { label: "Autodesk STL export basics", href: "https://help.autodesk.com/view/fusion360/ENU/?guid=GUID-1B6AA02D-B8E5-4F54-ADC7-11C5B900E05F" },
]

const inspirationImages = [
  { src: "/images/portfolio/back2school%20(1).webp", alt: "Back to School set with pen holder and nameplate" },
  { src: "/images/portfolio/back2school%20(2).webp", alt: "Personalized school desk organizer" },
  { src: "/images/portfolio/back2school%20(3).webp", alt: "Back to School kit with labels and holder" },
]

const videos = [
  {
    id: "JRWyFUfqUlM",
    title: "Funko dude custom",
    description: "Personalized desk figure for school or workspace context.",
  },
  {
    id: "yEN9ZY75pDg",
    title: "Pencil holder on request",
    description: "Custom PLA Matte pen holder based on practical use.",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "Back to School 2026: 3D printing for school",
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

export default function BlogBackToSchoolEn() {
  return (
    <main className="relative overflow-clip">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-lime-50 via-white to-amber-50" />
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-lime-200/30 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-amber-200/30 blur-3xl" />
      </div>

      <section className="px-6 pb-10 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-700">Seasonal</p>
            <h1 className="mt-2 text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Back to School 2026: 3D printing for school
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-lg text-slate-700">
              Need school materials or educational models via 3D printing? This guide gives direct material and planning
              guidance for August and September 2026 without last-minute surprises.
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/en/contact?quote=Back%20to%20School%202026">Plan school prints 2026</ShimmerButton>
              <Link
                href="/en/segments/3d-printing-back-to-school"
                className="rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:bg-white"
              >
                Back to School segment
              </Link>
              <Link
                href="/en/materials#material-suggestion-tool"
                className="rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:bg-white"
              >
                Material suggestion tool
              </Link>
            </div>
            <nav aria-label="Quick section navigation" className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
              <Link href="#school-materials" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                Materials
              </Link>
              <Link href="#school-use-cases" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                Use cases
              </Link>
              <Link href="#school-planning" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                Planning
              </Link>
              <Link href="#school-faq" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
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

      <section id="school-materials" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Material strategy for school prints</h2>
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
                    <span className="mt-1 h-2 w-2 rounded-full bg-lime-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-700">
                For fast visual-versus-functional decisions, use{" "}
                <Link href="/en/materials" className="font-semibold text-lime-700 underline underline-offset-2">
                  materials and guidelines
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.06}>
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold tracking-tight text-slate-900">Files and request input</h3>
              <p className="mt-3 text-sm text-slate-700">
                STL or STEP is recommended. Share class names, quantities and color codes in one brief so batch production
                remains efficient and consistent.
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
                  href="/en/contact?quote=STL%20school%20project"
                  className="rounded-full border border-lime-200 bg-lime-50 px-4 py-2 text-sm font-semibold text-lime-800 transition hover:bg-lime-100"
                >
                  Send your file
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="school-use-cases" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Use cases for Back to School projects</h2>
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

      <section id="school-planning" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Planning for August and September deadlines</h2>
              <p className="mt-3 text-sm text-slate-700">
                Early intake reduces peak-pressure risk and leaves room for technical checks on readability, fit and material
                suitability, especially for class-level or multi-batch orders.
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
                <ShimmerButton href="/en/contact?quote=Back%20to%20School%20deadline">Request timing and quote</ShimmerButton>
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

      <section id="school-video" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900">Video</h2>
                  <p className="text-sm text-slate-700">Desk buddies and organizers in real use (light embed).</p>
                </div>
                <Link
                  href="https://youtube.com/watch?v=JRWyFUfqUlM&list=PLx3dprints"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-lime-700 underline decoration-lime-200 underline-offset-2"
                >
                  Open YouTube
                </Link>
              </div>
              <div className="mt-4">
                <VideoGallery videos={videos} highlightIds={videos.map((video) => video.id)} />
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="school-faq" className="scroll-mt-28 px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">FAQ: Back to School 3D printing</h2>
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

      <section id="school-sources" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
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
                        className="font-semibold text-lime-700 transition hover:text-lime-600"
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
