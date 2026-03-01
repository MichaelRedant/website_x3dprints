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

const canonical = "https://www.x3dprints.be/en/blog/finishing-friday-schuren-primen-lakken/"
const publishedDate = "2025-10-03T08:00:00+02:00"
const dateModified = "2026-02-08"
const faq = BLOG_FAQ_EN["finishing-friday-schuren-primen-lakken"]
const lastUpdatedLabel = "Last updated: 8 February 2026"

export const metadata: Metadata = {
  title: "Finishing Friday: sanding, priming and painting 3D prints | X3DPrints",
  description:
    "How far should you go with sanding, primer and paint? Practical guidance from a production studio so you know when a clean FDM print is enough and when extra finish makes sense.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/finishing-friday-schuren-primen-lakken/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/finishing-friday-schuren-primen-lakken/",
    },
  },
  openGraph: {
    title: "Finishing Friday: sanding, priming and painting 3D prints",
    description:
      "Step-by-step finishing guide: remove supports, sand, prime and paint. Learn the effort involved and when X3DPrints keeps parts unpainted for speed.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["Finishing 3D prints", "Sanding 3D prints", "Painting 3D prints"],
    images: [{ url: "/images/og-home-en.svg", width: 1200, height: 630, alt: "Finishing 3D prints" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Finishing Friday: sanding, priming and painting 3D prints",
    description: "Realistic finishing workflow plus why many FDM jobs do not need paint.",
    images: ["/images/og-home-en.svg"],
  },
}

const steps = [
  { title: "Support removal", body: "Careful removal with flush cutters and deburring tools to avoid scarring visible faces." },
  { title: "Dry sanding", body: "Start with 220-320 grit to knock down layer lines; move to 400-600 for matte filaments." },
  { title: "Filler & primer", body: "High-build primer for deep lines, thin filler for local defects. Multiple light coats work best." },
  { title: "Wet sanding", body: "600-800 grit between primer coats to keep surfaces even without overheating PLA/PETG." },
  { title: "Paint & clear", body: "Thin coats with proper flash time. Clear coat only when parts will be handled often." },
]

const whenToFinish = [
  "Awards, statues or props that need a uniform surface.",
  "Retail displays and signage seen from close-up.",
  "Tabletop models where paint brings the miniature to life.",
  "Prototypes shown to stakeholders where print lines distract.",
]

const whenNotToFinish = [
  "Functional parts in PETG/TPU that already perform without cosmetics.",
  "Outdoor parts where paint would fail before the filament does.",
  "Projects with tight lead times where sanding would delay delivery.",
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
  headline: "Finishing Friday: sanding, priming and painting 3D prints",
  description: metadata.description ?? "",
  datePublished: publishedDate,
  dateModified,
  image: "https://www.x3dprints.be/images/og-home-en.svg",
  inLanguage: "en-BE",
})


export default function FinishingFridayEnPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(150%_85%_at_50%_-15%,rgba(59,130,246,0.16),transparent_70%)]"
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
                <li className="font-medium text-slate-700">Finishing Friday</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Finishing Friday</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Sanding, priming and painting 3D prints: what is realistic?
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Clean FDM prints already solve most business problems. When cosmetics matter, this guide shows the real effort behind
              finishing so you can decide whether to paint or keep parts production-fast.
            </p>
                        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="stacked-actions mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <ShimmerButton href="/en/contact?topic=finishing">Plan finishing advice</ShimmerButton>
              <Link
                href="/en/pricing"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Pricing & lead times
              </Link>
              <Link
                href="/en/3d-printen"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                3D printing pillar
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">Published 3 October 2025 - Finishing Friday series.</p>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="en" />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">When finishing adds value</h2>
              <p className="mt-2 text-sm text-slate-600">
                Sanding and paint cost time. We recommend them when appearance is part of the deliverable or when paint protects
                small details during handling.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {whenToFinish.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">When to keep the raw print</h2>
              <p className="mt-2 text-sm text-slate-600">
                Most PETG and TPU jobs ship unpainted for speed and durability. A clean, well-oriented print often outperforms a
                rushed paint job.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {whenNotToFinish.map((item) => (
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
              <h2 className="text-2xl font-semibold text-slate-900">The finishing workflow, step by step</h2>
              <p className="mt-2 text-sm text-slate-600">
                This is what it takes to turn a raw print into a painted piece. Plan enough lead time; each step benefits from thin
                coats and patience.
              </p>
              <ol className="mt-4 space-y-4">
                {steps.map((step, index) => (
                  <li key={step.title} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold text-indigo-600">{index + 1}.</span>
                      <h3 className="text-base font-semibold text-slate-900">{step.title}</h3>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{step.body}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-sm text-slate-600">
                Want to DIY? Start with PLA Matte or PETG Matte prints at 0.16 mm layer height. That reduces sanding time
                dramatically.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Cost & planning impact</h2>
              <p className="mt-2 text-sm text-slate-600">
                Finishing adds labor, drying time and extra materials. Expect a higher price and a longer lead time compared to
                raw prints. For seasonal campaigns we often split: visible hero parts get paint, the rest stays production-fast.
              </p>
              <Link
                href="/en/pricing"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
              >
                See pricing impact
                <span aria-hidden>-&gt;</span>
              </Link>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Order finishing at X3DPrints</h2>
              <p className="mt-2 text-sm text-slate-600">
                Share photos or references of the desired finish. We will confirm feasibility, colour matching and the timeline
                before locking in production slots.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <ShimmerButton href="/en/contact?topic=finishing">Book finishing</ShimmerButton>
                <Link
                  href="/en/materials"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Browse materials
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Need a finishing plan?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Tell us where the parts will be used. We will advise whether raw prints, light sanding or full paint is the best
                  fit and reflect that in the quote.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact?topic=finishing">Start finishing intake</ShimmerButton>
                <Link href="/en/viewer" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Upload STL/STEP
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





