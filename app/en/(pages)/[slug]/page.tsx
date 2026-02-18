// app/en/(pages)/[slug]/page.tsx
import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { readFile } from "fs/promises"
import Link from "next/link"
import { join } from "path"

import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import GlassCard from "@/components/GlassCard"
import Markdown from "@/components/Markdown"
import MiniToc from "@/components/MiniToc"
import Faq from "@/components/Faq"
import GoogleReviewHighlights from "@/components/GoogleReviewHighlights"

import { renderMarkdown, splitMarkdown } from "@/lib/markdown"
import { extractHeadings } from "@/lib/headings"
import { getLocationBySlug, getEnglishLocationSlugs } from "@/lib/locations"
import { keywordSvgDataUri } from "@/lib/svg"
import {
  SITE,
  buildLocationMetaDescription,
  buildLocationMetaTitle,
  buildFaqPageSchema,
  buildBreadcrumbSchema,
  buildLocalBusinessSchema,
  clampToWords,
  normalizeMetaDescription,
} from "@/lib/seo"

export const revalidate = 86_400 // 24h

function stripLeadingH1(markdown: string) {
  return markdown.replace(/^\s*#\s+.*(?:\r?\n)+/, "").trimStart()
}

function firstParagraph(text: string) {
  const para = text.split(/\n{2,}/).find((p) => p.trim().length > 0)
  return para ? para.replace(/\s+/g, " ").trim() : ""
}

function buildSeoDescription(markdown: string, city: string) {
  const fallback = buildLocationMetaDescription(city, "en")
  const normalized = stripLeadingH1(markdown)
  const para = firstParagraph(normalized)
  if (para) return normalizeMetaDescription(clampToWords(para, 158), fallback)
  return fallback
}

export function generateStaticParams(): Array<{ slug: string }> {
  return getEnglishLocationSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const loc = getLocationBySlug(slug)
  if (!loc) return {}

  const url = `https://www.x3dprints.be/en/${loc.slug}`
  let contentMd = ""
  try {
    contentMd = await readFile(join(process.cwd(), "content", "en", "locations", `${loc.slug}.md`), "utf8")
  } catch {
    return {}
  }

  const description = buildSeoDescription(contentMd, loc.city)
  const keyphrase = `3D printing in ${loc.city}`
  const keywordPhrases = [
    keyphrase,
    `3D print service ${loc.city}`,
    `3D model print ${loc.city}`,
    `Rapid prototyping ${loc.city}`,
  ]
  const seoTitle = buildLocationMetaTitle(loc.city, "en")

  return {
    title: seoTitle,
    description,
    keywords: keywordPhrases.join(", "),
    alternates: {
      canonical: url,
      languages: {
      "nl-BE": `https://www.x3dprints.be/${loc.slug}`,
      "en-BE": url,
      "x-default": `https://www.x3dprints.be/${loc.slug}`,
      },
    },
    robots: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
    openGraph: {
      title: seoTitle,
      description,
      url,
      siteName: "X3DPrints",
      type: "website",
      locale: "en_BE",
      images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: keyphrase }],
    },
    twitter: { card: "summary_large_image", title: seoTitle, description, images: ["/images/og-home.jpg"] },
  }
}

export default async function LocationEnPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const loc = getLocationBySlug(slug)
  if (!loc) notFound()

  let contentMd = ""
  try {
    contentMd = await readFile(join(process.cwd(), "content", "en", "locations", `${loc.slug}.md`), "utf8")
  } catch {
    notFound()
  }

  const keyphrase = `3D printing in ${loc.city}`
  const pageUrl = `https://www.x3dprints.be/en/${loc.slug}`
  const pageDescription = buildSeoDescription(contentMd, loc.city)
  const keywordPhrases = [
    keyphrase,
    `3D print service ${loc.city}`,
    `3D model print ${loc.city}`,
    `Rapid prototyping ${loc.city}`,
  ]
  const contentMdNormalized = stripLeadingH1(contentMd)
  const mdSections = splitMarkdown(contentMdNormalized)
  const contentHtml = await renderMarkdown(contentMdNormalized)
  const htmlSections = contentHtml.split(/\s*<hr\s*\/?>\s*/i).filter(Boolean)
  const sectionHtml =
    htmlSections.length === mdSections.length
      ? htmlSections
      : await Promise.all(mdSections.map((md) => renderMarkdown(md)))
  const tocItems = await extractHeadings(contentMdNormalized, [2, 3])
  const svgSrc = keywordSvgDataUri(keyphrase)

  const faqItems = [
    { q: `Which materials can I order in ${loc.city}?`, a: "Standard: PLA Matte, PETG and TPU. On request: ABS/ASA, Nylon or PA-CF. See the materials overview." },
    { q: "What are the usual lead times?", a: "Typically a few working days after approval. Rush possible on request; shipping or pickup from Herzele." },
    { q: "How do you price a print?", a: "Transparent: size (Small/Medium/Large/XL), material surcharge, finishing and quantity. See the pricing page." },
    { q: "What build volume can you handle?", a: "Up to 35 x 32 x 35 cm per part. Larger parts are split into segments with clean joints." },
    { q: "Which file formats do you accept?", a: "STL or STEP. Add context: strength, visible face, finish, quantities." },
  ]

  const stats = [
    { label: "Tolerance", value: "+/-0.2 mm" },
    { label: "Lead time", value: "Usually a few working days" },
    { label: "Build volume", value: "Up to 35 x 32 x 35 cm" },
  ]

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: keyphrase,
    description: pageDescription,
    inLanguage: "en-BE",
    areaServed: [{ "@type": "Place", name: loc.city }, { "@type": "Place", name: "Belgium" }],
    provider: { "@type": "Organization", name: "X3DPrints", url: "https://www.x3dprints.be" },
    url: pageUrl,
    serviceType: "3D printing",
    keywords: keywordPhrases,
  }

  const localBusinessJsonLd = buildLocalBusinessSchema({
    pageUrl,
    description: pageDescription,
    image: "/Logo.webp",
    inLanguage: "en-BE",
    areaServed: `${loc.city}, Belgium`,
  })

  const faqJsonLd = buildFaqPageSchema({
    inLanguage: "en-BE",
    mainEntityOfPage: pageUrl,
    items: faqItems.map((item) => ({ q: item.q, a: item.a })),
  })

  const breadcrumbJsonLd = buildBreadcrumbSchema({
    id: `${pageUrl}#breadcrumb`,
    inLanguage: "en-BE",
    items: [
      { name: "Home", url: "https://www.x3dprints.be/en/" },
      { name: "Locations", url: "https://www.x3dprints.be/en/locaties/" },
      { name: loc.city, url: pageUrl },
    ],
  })

  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: keyphrase,
    description: pageDescription,
    url: pageUrl,
    inLanguage: "en-BE",
    about: [{ "@type": "Place", name: loc.city }],
  }

  return (
    <main className="relative overflow-clip px-4 pb-20 pt-12 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-teal-50" />
        <div className="absolute -top-32 -left-28 h-[26rem] w-[26rem] rounded-full bg-cyan-200/30 blur-3xl sm:h-[32rem] sm:w-[32rem]" />
        <div className="absolute -bottom-32 -right-28 h-[28rem] w-[28rem] rounded-full bg-teal-200/30 blur-3xl sm:h-[36rem] sm:w-[36rem]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px]" />
      </div>

      <section className="relative px-6 pb-16 pt-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-700">Local 3D printing</p>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">{keyphrase}</h1>
            <p className="text-lg text-slate-700">
              X3DPrints prints from Herzele (between Ghent and Aalst) for {loc.city} and the wider region. Send STL/STEP, choose PLA, PETG or TPU and get a clear proposal with planning. Lead time is usually just a few working days.
            </p>
            <div className="flex flex-wrap gap-3">
              <ShimmerButton href="/en/contact">Request a quote</ShimmerButton>
              <Link
                href="/en/3d-printen"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                How it works
              </Link>
              <Link
                href="/en/materials"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Materials & colours
              </Link>
            </div>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">Last updated: February 7, 2026</p>
          </Reveal>

          <Reveal delay={0.1} className="mt-8 grid gap-4 rounded-3xl border border-white/30 bg-white/70 p-6 shadow-lg backdrop-blur sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{stat.label}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{stat.value}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-xl font-semibold text-slate-900">Address & contact</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>{SITE.address.street}, {SITE.address.postalCode} {SITE.address.locality}</li>
                <li>{SITE.phone}</li>
                <li>
                  <a href="mailto:michael@xinudesign.be" className="text-indigo-600 underline underline-offset-4">michael@xinudesign.be</a>
                </li>
                <li>Pickup in Herzele, shipping across Flanders.</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-3">
                <ShimmerButton href="/en/contact">Plan a call</ShimmerButton>
                <Link href="/en/pricing" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Pricing & lead times
                </Link>
              </div>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-xl font-semibold text-slate-900">Use cases</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>Functional parts, fixtures and housings.</li>
                <li>Prototypes and small to large series for product teams.</li>
                <li>Displays, props and marketing assets.</li>
                <li>Education and labs needing fast prototypes.</li>
              </ul>
              <div className="mt-4">
                <Image src={svgSrc} alt={keyphrase} width={1200} height={630} className="h-auto w-full rounded-2xl border border-white/40" />
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GoogleReviewHighlights
              locale="en"
              variant="compact"
              city={loc.city}
              seed={loc.slug}
            />
          </Reveal>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-lg">
          <MiniToc items={tocItems} className="mb-6" defaultCollapsed dismissible storageKey={`mini-toc:${loc.slug}:en`} />
          <div className="rounded-3xl border border-white/30 bg-white/70 p-6 shadow-lg backdrop-blur sm:p-8">
            {sectionHtml.map((html, i) => (
              <div key={i} className={i > 0 ? "mt-10" : undefined}>
                <Markdown html={html} className="max-w-none prose-headings:scroll-mt-28" />
                {i < sectionHtml.length - 1 && <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />}
              </div>
            ))}
          </div>

          <Faq
            city={loc.city}
            items={faqItems.map((item) => ({
              q: item.q,
              a: item.a,
            }))}
            className="mt-12"
          />

          <nav className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-3 text-sm" aria-label="Read more">
            <span className="font-semibold text-slate-700">Read more:</span>
            <Link href="/en/3d-printen" className="rounded-full border border-white/30 bg-white/60 px-4 py-2 text-slate-700 backdrop-blur transition hover:bg-white">
              3D printing pillar
            </Link>
            <Link href="/en/materials" className="rounded-full border border-white/30 bg-white/60 px-4 py-2 text-slate-700 backdrop-blur transition hover:bg-white">
              Materials
            </Link>
            <Link href="/en/pricing" className="rounded-full border border-white/30 bg-white/60 px-4 py-2 text-slate-700 backdrop-blur transition hover:bg-white">
              Pricing
            </Link>
            <Link href="/en/portfolio" className="rounded-full border border-white/30 bg-white/60 px-4 py-2 text-slate-700 backdrop-blur transition hover:bg-white">
              Portfolio
            </Link>
            <Link href="/en/contact" className="rounded-full border border-white/30 bg-white/60 px-4 py-2 text-slate-700 backdrop-blur transition hover:bg-white">
              Contact
            </Link>
          </nav>

          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
        </div>
      </section>
    </main>
  )
}
