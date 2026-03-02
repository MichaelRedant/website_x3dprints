import type { Metadata } from "next"
import Link from "next/link"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import ReadMoreLinks from "@/components/ReadMoreLinks"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import { getCaseDetailBySlug, getCaseDetailSlugs, type CaseLocale } from "@/content/case-details"
import { getCaseStudyBySlug, isCaseStudyLive } from "@/content/case-studies"
import { buildArticleJsonLd, buildFaqPageSchema, buildServiceSchema } from "@/lib/seo"

const BASE_URL = "https://www.x3dprints.be"

type CaseDetailParams = {
  slug: string
  locale: CaseLocale
}

function toAbsoluteUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) return path
  return `${BASE_URL}${path}`
}

function getCaseUrls(slug: string) {
  return {
    nl: `/cases/${slug}/`,
    en: `/en/cases/${slug}/`,
  }
}

function formatDate(value: string, locale: CaseLocale) {
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value
  return parsed.toLocaleDateString(locale === "en" ? "en-BE" : "nl-BE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

function buildRobots(isLive: boolean): Metadata["robots"] {
  if (isLive) {
    return {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    }
  }

  return {
    index: false,
    follow: false,
    noarchive: true,
    nocache: true,
  }
}

export function getCaseStaticParams() {
  return getCaseDetailSlugs().map((slug) => ({ slug }))
}

export function getCaseDetailMetadata({ slug, locale }: CaseDetailParams): Metadata {
  const detail = getCaseDetailBySlug(slug)
  if (!detail) {
    return {
      robots: { index: false, follow: false },
    }
  }

  const copy = detail.locale[locale]
  const isEn = locale === "en"
  const urls = getCaseUrls(slug)
  const canonicalPath = isEn ? urls.en : urls.nl
  const canonical = toAbsoluteUrl(canonicalPath)
  const nlUrl = toAbsoluteUrl(urls.nl)
  const enUrl = toAbsoluteUrl(urls.en)

  const caseStudy = getCaseStudyBySlug(slug)
  const publishAt = caseStudy?.publishAt ?? detail.publishAt
  const isLive = caseStudy ? isCaseStudyLive(caseStudy) : false
  const image = isEn ? "/images/og-cases-en.svg" : "/images/og-cases-nl.svg"

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical,
      languages: {
        "nl-BE": nlUrl,
        "en-BE": enUrl,
        "x-default": nlUrl,
      },
    },
    robots: buildRobots(isLive),
    openGraph: {
      title: copy.ogTitle,
      description: copy.ogDescription,
      url: canonical,
      type: "article",
      publishedTime: publishAt,
      modifiedTime: publishAt,
      locale: isEn ? "en_BE" : "nl_BE",
      siteName: "X3DPrints",
      images: [{ url: image, width: 1200, height: 630, alt: copy.ogTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.ogTitle,
      description: copy.ogDescription,
      images: [image],
    },
  }
}

export function renderCaseDetail({ slug, locale }: CaseDetailParams) {
  const detail = getCaseDetailBySlug(slug)
  if (!detail) return null

  const copy = detail.locale[locale]
  const isEn = locale === "en"
  const urls = getCaseUrls(slug)
  const canonicalPath = isEn ? urls.en : urls.nl
  const canonical = toAbsoluteUrl(canonicalPath)
  const publishAt = getCaseStudyBySlug(slug)?.publishAt ?? detail.publishAt
  const isLive = (() => {
    const study = getCaseStudyBySlug(slug)
    if (!study) return false
    return isCaseStudyLive(study)
  })()
  const publishDateLabel = formatDate(publishAt, locale)
  const caseHubHref = isEn ? "/en/cases" : "/cases"
  const contactHref = isEn
    ? `/en/contact?topic=${encodeURIComponent(detail.contactTopic)}&material=${encodeURIComponent(detail.contactMaterial)}`
    : `/contact?topic=${encodeURIComponent(detail.contactTopic)}&material=${encodeURIComponent(detail.contactMaterial)}`
  const materialHref = isEn ? "/en/materials#material-suggestion-tool" : "/materials#material-suggestion-tool"
  const language = isEn ? "en-BE" : "nl-BE"

  const articleJsonLd = buildArticleJsonLd({
    canonical,
    headline: copy.heroTitle,
    description: copy.metaDescription,
    datePublished: publishAt,
    dateModified: publishAt,
    image: isEn ? "/images/og-cases-en.svg" : "/images/og-cases-nl.svg",
    inLanguage: language,
    authorType: "Organization",
  })

  const faqJsonLd = buildFaqPageSchema({
    inLanguage: language,
    mainEntityOfPage: canonical,
    items: copy.faqItems.map((item) => ({
      q: item.question,
      a: item.answer,
    })),
  })

  const serviceJsonLd = buildServiceSchema(
    detail.serviceName[locale],
    [
      {
        serviceName: isEn ? "Case intake" : "Case intake",
        price: "EUR 0",
        description: isEn ? "Project context and feasibility check" : "Projectcontext en haalbaarheidscheck",
        url: toAbsoluteUrl(contactHref),
      },
      {
        serviceName: isEn ? "Material advice" : "Materiaaladvies",
        price: "EUR 0",
        description: isEn ? "Selection for PLA, PETG and TPU" : "Advies voor PLA, PETG en TPU",
        url: toAbsoluteUrl(materialHref),
      },
    ],
    canonical,
    {
      inLanguage: language,
      mainEntityOfPage: canonical,
      description: detail.serviceDescription[locale],
    },
  )

  return (
    <>
      <main className="relative overflow-hidden px-6 pb-16 pt-16 sm:px-8 lg:px-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(130%_60%_at_50%_0%,rgba(16,185,129,.16),transparent_72%)]"
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.08]" />

        <article className="mx-auto max-w-5xl space-y-8">
          <header className="space-y-4">
            <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
              <ol className="flex flex-wrap gap-2">
                <li>
                  <Link href={caseHubHref} className="font-medium text-indigo-600 hover:text-indigo-500">
                    {isEn ? "Cases" : "Cases"}
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-700">{copy.breadcrumbLabel}</li>
              </ol>
            </nav>

            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">{copy.eyebrow}</p>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">{copy.heroTitle}</h1>
            <p className="text-lg text-slate-700">{copy.heroIntro}</p>

            <div className="flex flex-wrap gap-3 text-sm text-slate-600">
              <span>
                {isEn ? "Scheduled publication" : "Geplande publicatie"}: <strong className="text-slate-900">{publishDateLabel}</strong>
              </span>
              <span aria-hidden>-</span>
              <span>
                {isEn ? "Status" : "Status"}:{" "}
                <strong className={isLive ? "text-emerald-700" : "text-amber-700"}>{isLive ? (isEn ? "Live" : "Live") : "Scheduled"}</strong>
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              <ShimmerButton href={contactHref}>{copy.ctaPrimaryLabel}</ShimmerButton>
              <ShimmerButton
                href={materialHref}
                className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              >
                {copy.ctaSecondaryLabel}
              </ShimmerButton>
            </div>

            {!isLive ? (
              <GlassCard className="p-5">
                <p className="text-sm text-slate-700">
                  {isEn
                    ? "This case is already prepared and will be indexed after publication."
                    : "Deze case staat klaar en wordt pas geïndexeerd na publicatie."}
                </p>
              </GlassCard>
            ) : null}
          </header>

          <section className="grid gap-4 md:grid-cols-2">
            <Reveal>
              <GlassCard className="h-full p-6">
                <h2 className="text-xl font-semibold text-slate-900">{copy.challengeTitle}</h2>
                <p className="mt-3 text-sm text-slate-700">{copy.challengeBody}</p>
              </GlassCard>
            </Reveal>
            <Reveal delay={0.08}>
              <GlassCard className="h-full p-6">
                <h2 className="text-xl font-semibold text-slate-900">{copy.approachTitle}</h2>
                <p className="mt-3 text-sm text-slate-700">{copy.approachBody}</p>
              </GlassCard>
            </Reveal>
          </section>

          <section className="rounded-3xl border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
            <h2 className="text-2xl font-semibold text-slate-900">{copy.impactTitle}</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {copy.impactBullets.map((bullet) => (
                <li key={bullet} className="flex gap-2">
                  <span aria-hidden className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-500" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-3xl border border-slate-200/70 bg-white/80 p-6">
            <h2 className="text-2xl font-semibold text-slate-900">{isEn ? "Related links" : "Relevante links"}</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {copy.links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:border-slate-300 hover:bg-slate-50"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </section>

          <section id="faq" className="scroll-mt-28">
            <h2 className="text-2xl font-semibold text-slate-900">{copy.faqTitle}</h2>
            <div className="mt-4">
              <Faq items={copy.faqItems.map((item) => ({ q: item.question, a: item.answer }))} />
            </div>
          </section>
        </article>
      </main>

      <ReadMoreLinks pageType="cases" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
    </>
  )
}
