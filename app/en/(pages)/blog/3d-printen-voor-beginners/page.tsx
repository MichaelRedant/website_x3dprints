import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"
import { buildArticleJsonLd } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/en/blog/3d-printen-voor-beginners/"
const utm = "?utm_source=blog&utm_medium=cta&utm_campaign=beginners"
const pricingHref = `/en/pricing${utm}`
const viewerHref = `/en/viewer${utm}`
const contactHref = `/en/contact${utm}`
const datePublished = "2024-08-20"
const dateModified = "2026-02-04"

export const metadata: Metadata = {
  title: "3D printing for beginners | X3DPrints",
  description:
    "Beginner's guide to 3D printing: pick materials, prepare files, avoid common mistakes and see how X3DPrints guides you through your first print.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/3d-printen-voor-beginners/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/3d-printen-voor-beginners/",
    },
  },
  openGraph: {
    title: "3D printing for beginners",
    description:
      "Step-by-step guide to getting your first 3D print made: materials, files, examples and guidance from Herzele.",
    url: canonical,
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "3D printing for beginners" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printing for beginners",
    description:
      "Practical guide for anyone starting with 3D printing. Includes tips, mistakes to avoid and coaching options.",
    images: ["/images/og-home.jpg"],
  },
}

const beginnerSteps = [
  "Define the goal: prototype, decor, functional part or merchandising. The goal decides material and finishing.",
  "Pick material: PLA for design, PETG for functionality, TPU for flexibility. Check the materials page for all options.",
  "Gather files: STL for production, STEP if you expect changes. Add reference photos or sketches.",
  "Request a quote with context (quantity, deadline, finishing) and we will guide you through each step.",
]

const pitfalls = [
  "Walls thinner than 1.2 mm break easily. Add ribs or fillets.",
  "Fits that are too tight. Allow 0.2-0.3 mm clearance for PLA/PETG.",
  "No orientation note. Tell us which face is visible so we place supports smartly.",
  "Forgetting finishing. Specify if you want raw, sanded or painted; it affects price and planning.",
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "3D printing for beginners",
  description:
    "Beginner guide with steps, material choices and common pitfalls. Includes tips for coaching and guidance.",
  datePublished,
  dateModified,
  image: "/images/portfolio/20241024_081839-1.jpg",
  inLanguage: "en-BE",
})

export default function BeginnersArticleEnPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(150%_85%_at_50%_-15%,rgba(52,211,153,0.18),transparent_70%)]"
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
                <li className="font-medium text-slate-700">3D printing for beginners</li>
              </ol>
            </nav>
            <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Starting with 3D printing? Here is your playbook.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Whether you are a student, marketer or maker: with a solid file and clear context you get a professional result fast. We coach in English, ship across Belgium, and can hand over source files for your internal teams.
            </p>
            <div className="stacked-actions mt-6 flex flex-wrap gap-3 justify-center sm:justify-start">
              <ShimmerButton href={viewerHref} event={{ action: "cta_click", category: "blog_top", label: "viewer_beginners_en" }}>
                Upload your first model
              </ShimmerButton>
              <Link
                href={contactHref}
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Request guidance
              </Link>
              <Link
                href={pricingHref}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm hover:-translate-y-0.5 hover:bg-emerald-100"
              >
                View pricing
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Beginner steps</h2>
              <ol className="mt-4 space-y-3 text-sm text-slate-600">
                {beginnerSteps.map((step, index) => (
                  <li key={step} className="flex gap-3">
                    <span className="font-semibold text-slate-900">{index + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {[
            {
              title: "Beginner-friendly material",
              body: "PLA Matte delivers crisp results and comes in many colours. Use PETG and TPU later for functional needs.",
              link: { href: "/en/materials", label: "Browse materials" },
            },
            {
              title: "Files and viewer",
              body: "Upload STL/STEP via the viewer, even from your phone. Add notes so we know what matters.",
              link: { href: "/en/viewer", label: "Open viewer" },
            },
            {
              title: "Training / coaching",
              body: "We offer short 1-on-1 guidance during your project: settings, finishing, maintenance. Handy if you plan to invest in hardware yourself.",
              link: { href: "/en/contact", label: "Request coaching" },
            },
          ].map((item) => (
            <Reveal key={item.title}>
              <GlassCard className="h-full border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{item.body}</p>
                <Link
                  href={item.link.href}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
                >
                  {item.link.label}
                  <span aria-hidden>-&gt;</span>
                </Link>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Common mistakes</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {pitfalls.map((pitfall) => (
                  <li key={pitfall} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" aria-hidden />
                    <span>{pitfall}</span>
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
            <GlassCard className="flex flex-col gap-6 border border-white/40 bg-white/85 p-6 text-center shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:text-left">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Next step</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Want to nail your first print together?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  We will check your file, advise material and share tips so your project is right the first time.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact">Ask for advice</ShimmerButton>
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

