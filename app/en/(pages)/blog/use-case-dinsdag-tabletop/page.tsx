import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/en/blog/use-case-dinsdag-tabletop/"
const publishedDate = "2026-01-20T08:00:00+01:00"

export const metadata: Metadata = {
  title: "Use Case Tuesday #8: tabletop terrain and minis with FDM | X3DPrints",
  description:
    "How to get crisp tabletop prints on FDM: material picks, layer height, kitbashing tips and when resin is a better choice.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/use-case-dinsdag-tabletop/",
      "en-BE": canonical,
      "x-default": "https://www.x3dprints.be/blog/use-case-dinsdag-tabletop/",
    },
  },
  openGraph: {
    title: "Use Case Tuesday #8: tabletop terrain and minis with FDM",
    description: "Crisp FDM minis and terrain with PLA Matte, Silk and PETG plus guidance on painting and basing.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["Tabletop minis", "Terrain", "Use Case Tuesday"],
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "Tabletop 3D prints" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Use Case Tuesday: tabletop minis & terrain",
    description: "Material and print settings for crisp tabletop pieces on FDM.",
    images: ["/images/og-home.jpg"],
  },
}

const materials = [
  { name: "PLA Matte", detail: "Low layer visibility and easy to paint. Best for terrain, busts and larger minis." },
  { name: "PLA Silk+", detail: "For premium pieces and hero models with a satin finish." },
  { name: "PLA Marble/Wood", detail: "Adds texture for statues, ruins and scenic bases." },
  { name: "PETG", detail: "For terrain that will be handled often or used outdoors." },
]

const settings = [
  "Layer height 0.12-0.16 mm for minis; 0.20 mm for terrain to speed up.",
  "3+ perimeters and 10-15% gyroid infill for sturdy parts.",
  "Slow walls (35-45 mm/s) for fine details on faces and small text.",
  "Use small supports and paint-on supports to preserve details.",
]

const whenToUseResin = [
  "28-32 mm figures with lots of micro detail and faces.",
  "Transparent parts that must stay crystal clear.",
  "Parts thinner than 1 mm that need sharp edges.",
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Use Case Tuesday #8: tabletop terrain and minis with FDM",
  description:
    "Settings and material picks for tabletop minis and terrain on FDM, plus when resin is the better fit.",
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

export default function UseCaseTabletopEnPage() {
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
                <li className="font-medium text-slate-900">Tabletop</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Use Case Tuesday #8</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Crisp tabletop terrain and minis with FDM.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Resin is great for tiny figures, but FDM handles terrain, busts and larger minis fast and affordably. Here is how we
              print them cleanly and when we recommend resin instead.
            </p>
            <div className="stacked-actions mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <ShimmerButton href="/en/contact?topic=use-case-tabletop">Plan a tabletop run</ShimmerButton>
              <Link
                href="/en/blog/3d-printen-mini-figuren"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Read miniatures guide
              </Link>
              <Link
                href="/en/materials"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Choose materials
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">Published 20 January 2026.</p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Material picks</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {materials.map((material) => (
                  <li key={material.name} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <p className="text-sm font-semibold text-slate-900">{material.name}</p>
                    <p>{material.detail}</p>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Settings that keep detail</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {settings.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-slate-600">
                Painting? Prime with a thin filler primer and sand lightly. PLA Matte is the best base for brush or airbrush work.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">When to switch to resin</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {whenToUseResin.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-slate-600">
                We focus on FDM for speed and scale. If a project truly needs resin, we will say so and help find the right partner.
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Need minis or terrain printed?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Send the STLs and desired scale. We will propose layer height, material and finishing so you can paint straight
                  away.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact?topic=use-case-tabletop">Book a tabletop run</ShimmerButton>
                <Link href="/en/pricing" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Pricing & lead times
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

