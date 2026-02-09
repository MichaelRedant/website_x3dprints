import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import Faq from "@/components/Faq"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import { SITE, buildFaqPageSchema, buildServiceSchema, type SchemaOfferInput } from "@/lib/seo"

type SegmentData = {
  title: string
  summary: string
  material: string
}

const SEGMENTS: Record<string, SegmentData> = {
  "3d-printing-prototypes": {
    title: "3D Printing For Prototypes",
    summary:
      "Fast concept validation, fit checks, and iteration runs for product teams and makers.",
    material: "petg",
  },
  "3d-printing-back-to-school": {
    title: "3D Printing For Back-to-School 2026",
    summary:
      "Classroom models, STEM demos, and practical teaching props with realistic planning for August-September 2026.",
    material: "pla-matte",
  },
  "3d-printing-marketing": {
    title: "3D Printing For Marketing",
    summary:
      "Event props, branded objects, and campaign visuals designed for speed and consistency.",
    material: "pla-silk",
  },
  "3d-printing-makers": {
    title: "3D Printing For Makers",
    summary:
      "Functional parts and small runs for hobby, repair, and custom one-off projects.",
    material: "pla-matte",
  },
  "3d-printing-tabletop": {
    title: "3D Printing For Tabletop",
    summary:
      "Miniatures, terrain parts, and accessories tuned for detail and repeatability.",
    material: "pla-basic",
  },
  "3d-printing-engineers": {
    title: "3D Printing For Engineers",
    summary:
      "Technical housings, fit-critical parts, and pilot batches for engineering workflows.",
    material: "petg",
  },
  "3d-printing-modelbouwers": {
    title: "3D Printing For Model Builders",
    summary:
      "Scale model parts and custom details with clean surfaces and predictable lead times.",
    material: "pla-basic",
  },
  "3d-printing-scholen": {
    title: "3D Printing For Schools And STEM",
    summary:
      "Educational parts, tactile learning models, and practical class support for STEM.",
    material: "pla-matte",
  },
  "3d-printing-vaderdag-moederdag": {
    title: "3D Printing For Father's & Mother's Day 2026",
    summary:
      "Father's Day and Mother's Day gift runs with personalized finishing options for May-June 2026.",
    material: "pla-silk",
  },
  "3d-printing-valentijn": {
    title: "3D Printing For Valentine 2026 Campaigns",
    summary:
      "Short-run seasonal products and promo gifts for January and February 2026 launches.",
    material: "pla-silk",
  },
  "3d-printing-seasonal": {
    title: "3D Printing For Seasonal Campaigns 2026",
    summary:
      "Holiday and seasonal campaign production for 2026 retail, marketing, and events.",
    material: "pla-silk",
  },
}

const tocItems = [
  { id: "segment-overview", label: "What this segment needs" },
  { id: "segment-workflow", label: "Workflow and planning" },
  { id: "segment-next", label: "Recommended next steps" },
  { id: "segment-faq", label: "Frequently asked questions" },
  { id: "segment-sources", label: "Sources and references" },
]

const references = [
  {
    label: "ISO/ASTM additive manufacturing vocabulary",
    href: "https://www.iso.org/standard/69669.html",
  },
  {
    label: "NIST additive manufacturing research",
    href: "https://www.nist.gov/el/intelligent-systems-division-73500/additive-manufacturing",
  },
  {
    label: "ASTM AM standards overview",
    href: "https://www.astm.org/industry/additive-manufacturing.html",
  },
]

const lastUpdatedLabel = "Last updated: February 9, 2026"

export function generateStaticParams(): Array<{ slug: string }> {
  return Object.keys(SEGMENTS).map((slug) => ({ slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params
  const segment = SEGMENTS[slug]
  if (!segment) return {}

  const canonical = `${SITE.url}/en/segments/${slug}/`
  const nlCanonical = `${SITE.url}/segments/${slug}/`
  const title = `${segment.title} | X3DPrints`

  return {
    title,
    description: segment.summary,
    alternates: {
      canonical,
      languages: {
        "nl-BE": nlCanonical,
        "en-BE": canonical,
        "x-default": nlCanonical,
      },
    },
    openGraph: {
      title,
      description: segment.summary,
      url: canonical,
      type: "website",
      locale: "en_BE",
      images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: title }],
      siteName: "X3DPrints",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: segment.summary,
      images: ["/images/og-home.jpg"],
    },
  }
}

export default async function SegmentDetailEnPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const segment = SEGMENTS[slug]
  if (!segment) notFound()

  const pageUrl = `${SITE.url}/en/segments/${slug}/`
  const faqItems = [
    {
      q: "Which materials are most used for this segment?",
      a: `Most teams start with PLA Matte, PETG or PLA Silk. For this page we often suggest <a href="/en/materials/${segment.material}">${segment.material.toUpperCase()}</a>.`,
    },
    {
      q: "What lead time should I expect?",
      a: "Most requests are planned within a few business days depending on quantity and finishing requirements.",
    },
    {
      q: "Can we request design support too?",
      a: "Yes. You can send STL/STEP files or ask for design support via the contact form for scoped assistance.",
    },
  ]

  const faqJsonLd = buildFaqPageSchema({
    inLanguage: "en-BE",
    mainEntityOfPage: pageUrl,
    items: faqItems.map((item) => ({
      q: item.q,
      a: item.a.replace(/<[^>]*>/g, ""),
    })),
  })

  const serviceOffers: SchemaOfferInput[] = [
    {
      serviceName: segment.title,
      price: "EUR 5",
      description: segment.summary,
      url: pageUrl,
    },
  ]
  const serviceJsonLd = buildServiceSchema(segment.title, serviceOffers, pageUrl, {
    description: segment.summary,
    inLanguage: "en-BE",
    mainEntityOfPage: pageUrl,
  })

  return (
    <main className="relative overflow-clip px-6 pb-24 pt-14 sm:px-8 lg:px-12">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-indigo-50" />
      </div>

      <section id="segment-overview" className="mx-auto max-w-5xl scroll-mt-28">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">Segment detail</p>
          <h1 className="mt-2 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            {segment.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-700">{segment.summary}</p>
          <p className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ShimmerButton href={`/en/contact?material=${segment.material}`}>Plan your project</ShimmerButton>
            <Link
              href="/en/materials#material-suggestion-tool"
              className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
            >
              Material suggestion tool
            </Link>
          </div>
          <ContentTableOfContents title="Contents" items={tocItems} className="mt-6 max-w-2xl" />
        </Reveal>
      </section>

      <section className="mx-auto mt-8 grid max-w-5xl gap-6 lg:grid-cols-2">
        <Reveal>
          <div id="segment-workflow" className="scroll-mt-28">
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Workflow</h2>
              <ol className="mt-4 space-y-2 text-sm text-slate-700">
                <li>1. Send STL/STEP + use-case context.</li>
                <li>2. Confirm material, quality level and quantity.</li>
                <li>3. Receive proposal and realistic planning.</li>
                <li>4. We produce, QA-check and deliver.</li>
              </ol>
            </GlassCard>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <div id="segment-next" className="scroll-mt-28">
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Next links</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>
                  <Link href="/en/services" className="font-semibold text-indigo-700 underline">
                    View services
                  </Link>
                </li>
                <li>
                  <Link href="/en/blog" className="font-semibold text-indigo-700 underline">
                    Read blog guides
                  </Link>
                </li>
                <li>
                  <Link href="/en/portfolio" className="font-semibold text-indigo-700 underline">
                    See portfolio examples
                  </Link>
                </li>
                <li>
                  <Link href="/en/contact" className="font-semibold text-indigo-700 underline">
                    Contact the studio
                  </Link>
                </li>
              </ul>
            </GlassCard>
          </div>
        </Reveal>
      </section>

      <section id="segment-faq" className="mx-auto mt-10 max-w-5xl scroll-mt-28">
        <Faq title="Frequently asked questions" items={faqItems} />
      </section>

      <section id="segment-sources" className="mx-auto mt-10 max-w-5xl scroll-mt-28">
        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Sources and references</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            {references.map((reference) => (
              <li key={reference.href}>
                <cite className="not-italic">
                  <a
                    href={reference.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-indigo-700 underline decoration-indigo-300 underline-offset-4 hover:text-indigo-500"
                  >
                    {reference.label}
                  </a>
                </cite>
              </li>
            ))}
          </ul>
        </GlassCard>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  )
}
