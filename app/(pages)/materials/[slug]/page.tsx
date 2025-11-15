// app/(pages)/materials/[slug]/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import GlassCard from "@/components/GlassCard"
import { MATERIALS } from "@/lib/materials"
import {
  MATERIAL_DETAILS_BY_SLUG,
  MATERIAL_DETAIL_SLUGS,
  type MaterialDetailContent,
} from "@/content/material-details"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const detail = MATERIAL_DETAILS_BY_SLUG[slug]

  if (!detail) {
    return {
      title: "Materiaal niet gevonden | X3DPrints",
      description: "Het gevraagde materiaalprofiel bestaat niet.",
    }
  }

  const canonical = `https://www.x3dprints.be/materials/${detail.slug}`

  return {
    title: detail.seo.title,
    description: detail.seo.description,
    alternates: { canonical },
    openGraph: {
      title: detail.seo.title,
      description: detail.seo.description,
      url: canonical,
      siteName: "X3DPrints",
      locale: "nl_BE",
      images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
  }
}

export function generateStaticParams(): { slug: string }[] {
  return MATERIAL_DETAIL_SLUGS.map((slug) => ({ slug }))
}

function MaterialBreadcrumb({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
      <ol className="flex items-center gap-2">
        <li>
          <Link
            href="/materials"
            className="font-medium text-indigo-600 transition hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Materialen
          </Link>
        </li>
        <li aria-hidden>→</li>
        <li className="font-medium text-slate-700">{current}</li>
      </ol>
    </nav>
  )
}

function SwatchList({
  detail,
}: {
  detail: MaterialDetailContent
}) {
  const material = MATERIALS[detail.key]

  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        Kleuren en varianten
      </h3>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {material.swatches.map((swatch) => {
          const stocked = swatch.inStock === true
          return (
            <div key={swatch.label} className="text-center">
              <div
                className={[
                  "relative h-8 w-8 rounded-full ring-1 ring-slate-200",
                  stocked ? "shadow-sm" : "opacity-70",
                ].join(" ")}
                aria-label={`${swatch.label}${stocked ? " op voorraad" : " op bestelling"}`}
                title={`${swatch.label}${stocked ? " (op voorraad)" : " (op bestelling)"}`}
                style={{ background: swatch.color }}
              >
                {!stocked && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-full"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(135deg, rgba(0,0,0,.18) 0 4px, rgba(0,0,0,0) 4px 8px)",
                    }}
                  />
                )}
              </div>
              <div className="mt-1 text-xs text-slate-500">{swatch.label}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default async function MaterialDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const detail = MATERIAL_DETAILS_BY_SLUG[slug]

  if (!detail) {
    notFound()
  }

  const material = MATERIALS[detail.key]

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: material.name,
    description: detail.seo.description,
    category: "3D printing filament",
    material: material.name,
    brand: { "@type": "Brand", name: "X3DPrints" },
    url: `https://www.x3dprints.be/materials/${detail.slug}`,
    additionalProperty: detail.specs.map((spec) => ({
      "@type": "PropertyValue",
      name: spec.label,
      value: spec.value,
    })),
  }

  const faqJsonLd = detail.faq
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: detail.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null

  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_-20%,rgba(99,102,241,0.18),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.07]" />

      <section className="px-6 pt-14 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <MaterialBreadcrumb current={material.name} />
            <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-indigo-600">
              {detail.heroTagline}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {material.name}
            </h1>
            <p className="mt-4 text-lg text-slate-700">{detail.heroDescription}</p>
            <p className="mt-4 max-w-3xl text-base text-slate-600">{detail.summary}</p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-600">
              {detail.priceIndicator ? (
                <span className="inline-flex items-center rounded-full bg-white/80 px-3 py-1 font-medium text-slate-700 ring-1 ring-slate-200">
                  {detail.priceIndicator}
                </span>
              ) : null}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ShimmerButton href="/contact">Vraag offerte of advies</ShimmerButton>
              <Link
                href="/materials"
                className="inline-flex items-center gap-1 text-sm font-semibold text-slate-700 transition hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                ← Terug naar materialen
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-16">
          <Reveal>
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Waarom dit materiaal kiezen?</h2>
              <p className="mt-3 max-w-3xl text-slate-600">
                {detail.summary}
              </p>
              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {detail.highlights.map((highlight) => (
                  <GlassCard key={highlight.title} className="h-full p-6">
                    <h3 className="text-lg font-semibold text-slate-900">{highlight.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{highlight.description}</p>
                  </GlassCard>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold text-slate-900">Belangrijkste eigenschappen</h2>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  {(material.features || []).map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <SwatchList detail={detail} />
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold text-slate-900">Technische specificaties</h2>
                <dl className="mt-4 space-y-3 text-sm text-slate-600">
                  {detail.specs.map((spec) => (
                    <div key={spec.label} className="flex flex-col gap-1 border-b border-slate-200/70 pb-3 last:border-0 last:pb-0">
                      <dt className="font-medium text-slate-900">{spec.label}</dt>
                      <dd>{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </GlassCard>
            </div>
          </Reveal>

          <Reveal>
            <div className="grid gap-6 lg:grid-cols-2">
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold text-slate-900">Ideaal voor</h2>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  {detail.idealFor.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>

              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold text-slate-900">Printtips van X3DPrints</h2>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  {detail.printTips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>
          </Reveal>

          {detail.faq && detail.faq.length > 0 ? (
            <Reveal>
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold text-slate-900">Veelgestelde vragen</h2>
                <div className="mt-4 space-y-4">
                  {detail.faq.map((item) => (
                    <div key={item.question}>
                      <h3 className="text-base font-semibold text-slate-900">{item.question}</h3>
                      <p className="mt-1 text-sm text-slate-600">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          ) : null}

          <Reveal>
            <GlassCard className="flex flex-col items-start gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Project met {material.name} starten?</h2>
                <p className="mt-2 max-w-xl text-sm text-slate-600">
                  We adviseren je graag over design-aanpassingen en afwerking zodat jouw print perfect aansluit bij de toepassing.
                </p>
              </div>
              <ShimmerButton href="/contact">Plan een gesprek</ShimmerButton>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
    </main>
  )
}
