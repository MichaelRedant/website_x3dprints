// app/(pages)/materials/[slug]/page.tsx
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import GlassCard from "@/components/GlassCard"
import ReadMoreLinks from "@/components/ReadMoreLinks"
import { materialsByLocale, type MaterialKey, type MaterialInfo } from "@/lib/materials"
import { normalizeLocale } from "@/lib/i18n/locales"
import { localizeHref } from "@/lib/i18n/paths"
import {
  MATERIAL_DETAILS_BY_SLUG,
  MATERIAL_DETAIL_SLUGS,
} from "@/content/material-details"
import { MATERIAL_DETAILS_BY_SLUG_EN } from "@/content/material-details-en"
import {
  materialGalleryByLocale,
  type MaterialGalleryItem,
} from "@/content/material-gallery"

type SearchParams = { lang?: string }

type PageProps = {
  params: Promise<{ slug: string }>
  searchParams?: Promise<SearchParams | undefined>
  locale?: string
}

export async function generateMetadata({ params, locale }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const normalizedLocale = normalizeLocale(locale)
  const isEn = normalizedLocale === "en"
  const detail = isEn
    ? MATERIAL_DETAILS_BY_SLUG_EN[slug] ?? MATERIAL_DETAILS_BY_SLUG[slug]
    : MATERIAL_DETAILS_BY_SLUG[slug]

  if (!detail) {
    return {
      title: isEn ? "Material not found | X3DPrints" : "Materiaal niet gevonden | X3DPrints",
      description: isEn
        ? "The requested material profile does not exist."
        : "Het gevraagde materiaalprofiel bestaat niet.",
    }
  }

  const canonicalBase = isEn
    ? "https://www.x3dprints.be/en/materials"
    : "https://www.x3dprints.be/materials"
  const canonical = `${canonicalBase}/${detail.slug}`

  return {
    title: detail.seo.title,
    description: detail.seo.description,
    alternates: {
      canonical,
      languages: {
        "nl-BE": `https://www.x3dprints.be/materials/${detail.slug}`,
        en: `https://www.x3dprints.be/en/materials/${detail.slug}`,
      },
    },
    openGraph: {
      title: detail.seo.title,
      description: detail.seo.description,
      url: canonical,
      siteName: "X3DPrints",
      locale: isEn ? "en_BE" : "nl_BE",
      images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
  }
}

export function generateStaticParams(): { slug: string }[] {
  return MATERIAL_DETAIL_SLUGS.map((slug) => ({ slug }))
}

const DETAIL_COPY_NL = {
  breadcrumbLabel: "Materialen",
  backLabel: "Terug naar materialen",
  backIcon: "<-",
  swatches: {
    title: "Kleuren en varianten",
    inStock: "op voorraad",
    onRequest: "op bestelling",
  },
  sections: {
    why: "Waarom dit materiaal kiezen?",
    features: "Belangrijkste eigenschappen",
    specs: "Technische specificaties",
    idealFor: "Ideaal voor",
    printTips: "Printtips van X3DPrints",
    faq: "Veelgestelde vragen",
  },
  filamentFridayLabel: "Filament Vrijdag",
  filamentFridayCta: "Lees de Filament Vrijdag editie",
  project: {
    titlePrefix: "Project met",
    titleSuffix: " starten?",
    body:
      "We adviseren je graag over design-aanpassingen en afwerking zodat jouw print perfect aansluit bij de toepassing.",
    cta: "Plan een gesprek",
  },
  readMore: {
    titlePrefix: "Meer over",
    intro: "Vergelijk materialen, bekijk prijzen en start je aanvraag met de juiste info.",
    primary: {
      materials: "Materialen overzicht",
      pricing: "Prijzen & calculator",
      quote: "Offerte aanvragen",
    },
    secondary: {
      services: "3D print service",
      portfolio: "Portfolio",
      tool: "Material Suggestion Tool",
    },
  },
}

const DETAIL_COPY_EN = {
  breadcrumbLabel: "Materials",
  backLabel: "Back to materials",
  backIcon: "<-",
  swatches: {
    title: "Colors and variants",
    inStock: "in stock",
    onRequest: "on request",
  },
  sections: {
    why: "Why choose this material?",
    features: "Key properties",
    specs: "Technical specifications",
    idealFor: "Ideal for",
    printTips: "X3DPrints print tips",
    faq: "Frequently asked questions",
  },
  filamentFridayLabel: "Filament Friday",
  filamentFridayCta: "Read the Filament Friday edition",
  project: {
    titlePrefix: "Start a project with",
    titleSuffix: "?",
    body:
      "We are happy to advise on design tweaks and finishing so your print fits the application perfectly.",
    cta: "Plan a call",
  },
  readMore: {
    titlePrefix: "More about",
    intro: "Compare materials, check pricing and start your request with the right info.",
    primary: {
      materials: "Materials overview",
      pricing: "Pricing and calculator",
      quote: "Request a quote",
    },
    secondary: {
      services: "3D print service",
      portfolio: "Portfolio",
      tool: "Material Suggestion Tool",
    },
  },
}

const FILAMENT_FRIDAY_LINKS_NL: Partial<
  Record<
    MaterialKey,
    {
      title: string
      description: string
      href: string
    }
  >
> = {
  PLA_BASIC: {
    title: "Filament Vrijdag #1: PLA 3D printen",
    description:
      "Verdiep je in PLA varianten, typische instellingen en wanneer je beter voor PETG of TPU kiest.",
    href: "/blog/filament-vrijdag-pla",
  },
  PETG: {
    title: "Filament Vrijdag #2: PETG 3D printen",
    description:
      "Hoe we PETG tunen voor outdoor onderdelen, welke instellingen werken en waar je rekening mee houdt.",
    href: "/blog/filament-vrijdag-petg",
  },
  TPU: {
    title: "Filament Vrijdag #3: TPU 3D printen",
    description:
      "Alles over flexibele TPU prints: hardwaretips, instellingen en typische toepassingen.",
    href: "/blog/filament-vrijdag-tpu",
  },
  PLA_WOOD: {
    title: "Filament Vrijdag #4: PLA Wood & special materials",
    description:
      "Checklist voor hout gevulde filamenten met instellingen, nabewerking en alternatieve blends.",
    href: "/blog/filament-vrijdag-pla-wood",
  },
  PLA_MARBLE: {
    title: "Filament Vrijdag #5: PLA Marble & esthetische materialen",
    description:
      "Wanneer stone-look filamenten uitblinken, hoe je ze fijn print en wanneer je beter doorschakelt.",
    href: "/blog/filament-vrijdag-pla-marble",
  },
  PLA_GLOW: {
    title: "Filament Vrijdag #6: PLA Glow",
    description:
      "Diepgaande gids over glow-in-the-dark pigmenten, nozzlekeuzes en designcases waar glow werkt.",
    href: "/blog/filament-vrijdag-pla-glow",
  },
  PLA_METAL: {
    title: "Filament Vrijdag #7: PLA Metal",
    description:
      "Leer hoe metallic PLA zich gedraagt, hoe je de glans onder controle houdt en welke nozzles je nodig hebt.",
    href: "/blog/filament-vrijdag-pla-metal",
  },
  PLA_SILK_PLUS: {
    title: "Filament Vrijdag #8: PLA Silk+",
    description:
      "Wanneer je Silk+ inzet voor premium zichtwerk, welke instellingen wij gebruiken en hoe je glans combineert met leesbaarheid.",
    href: "/blog/filament-vrijdag-pla-silk-plus",
  },
  PC: {
    title: "Filament Vrijdag #5: polycarbonaat (PC)",
    description:
      "Polycarbonaat 3D printen met droge spoelen, gesloten printers en realistische verwachtingen over leadtime.",
    href: "/blog/filament-vrijdag-pc",
  },
}

const FILAMENT_FRIDAY_LINKS_EN: Partial<
  Record<
    MaterialKey,
    {
      title: string
      description: string
      href: string
    }
  >
> = {
  PLA_BASIC: {
    title: "Filament Friday #1: PLA 3D printing",
    description:
      "Deep dive into PLA variants, typical settings and when PETG or TPU is the better choice.",
    href: "/blog/filament-vrijdag-pla",
  },
  PETG: {
    title: "Filament Friday #2: PETG 3D printing",
    description:
      "How we tune PETG for outdoor parts, which settings work and what to watch for.",
    href: "/blog/filament-vrijdag-petg",
  },
  TPU: {
    title: "Filament Friday #3: TPU 3D printing",
    description:
      "All about flexible TPU prints: hardware tips, settings and typical applications.",
    href: "/blog/filament-vrijdag-tpu",
  },
  PLA_WOOD: {
    title: "Filament Friday #4: PLA Wood and special materials",
    description:
      "Checklist for wood-filled filaments with settings, post-processing and alternative blends.",
    href: "/blog/filament-vrijdag-pla-wood",
  },
  PLA_MARBLE: {
    title: "Filament Friday #5: PLA Marble and aesthetic materials",
    description:
      "When stone-look filaments shine, how to print them cleanly and when to switch materials.",
    href: "/blog/filament-vrijdag-pla-marble",
  },
  PLA_GLOW: {
    title: "Filament Friday #6: PLA Glow",
    description:
      "Deep dive on glow-in-the-dark pigments, nozzle choices and design cases where glow works.",
    href: "/blog/filament-vrijdag-pla-glow",
  },
  PLA_METAL: {
    title: "Filament Friday #7: PLA Metal",
    description:
      "Learn how metallic PLA behaves, how to control sheen and which nozzles you need.",
    href: "/blog/filament-vrijdag-pla-metal",
  },
  PLA_SILK_PLUS: {
    title: "Filament Friday #8: PLA Silk+",
    description:
      "When to use Silk+ for premium visual parts, which settings we use and how to balance shine with readability.",
    href: "/blog/filament-vrijdag-pla-silk-plus",
  },
  PC: {
    title: "Filament Friday #5: Polycarbonate (PC)",
    description:
      "Polycarbonate 3D printing with dried spools, enclosed printers and realistic lead time expectations.",
    href: "/blog/filament-vrijdag-pc",
  },
}

function MaterialBreadcrumb({
  current,
  href,
  label,
}: {
  current: string
  href: string
  label: string
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
      <ol className="flex items-center gap-2">
        <li>
          <Link
            href={href}
            className="font-medium text-indigo-600 transition hover:text-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            {label}
          </Link>
        </li>
        <li aria-hidden>&gt;</li>
        <li className="font-medium text-slate-700">{current}</li>
      </ol>
    </nav>
  )
}

function SwatchList({
  material,
  labels,
}: {
  material: MaterialInfo
  labels: { title: string; inStock: string; onRequest: string }
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        {labels.title}
      </h3>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {material.swatches.map((swatch) => {
          const stocked = swatch.inStock === true
          const stockLabel = stocked ? labels.inStock : labels.onRequest
          return (
            <div key={swatch.label} className="text-center">
              <div
                className={[
                  "relative h-8 w-8 rounded-full ring-1 ring-slate-200",
                  stocked ? "shadow-sm" : "opacity-70",
                ].join(" ")}
                aria-label={`${swatch.label} ${stockLabel}`}
                title={`${swatch.label} (${stockLabel})`}
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

function MaterialGallery({
  items,
}: {
  items?: MaterialGalleryItem[]
}) {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item, index) => (
        <figure
          key={item.src}
          className="group overflow-hidden rounded-2xl border border-slate-200/70 bg-white/70 shadow-sm"
        >
          <div className="relative aspect-[4/3]">
            <Image
              src={`/images/filament/${item.src}`}
              alt={item.alt}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.02]"
              sizes="(min-width: 1024px) 45vw, (min-width: 640px) 50vw, 100vw"
              priority={index === 0}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/30 via-slate-900/0 to-transparent opacity-0 transition group-hover:opacity-100"
            />
          </div>
          {item.caption ? (
            <figcaption className="px-4 pb-4 pt-3 text-sm text-slate-600">
              {item.caption}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  )
}

export default async function MaterialDetailPage({ params, locale }: PageProps) {
  const { slug } = await params
  const normalizedLocale = normalizeLocale(locale)
  const isEn = normalizedLocale === "en"
  const languageCode = isEn ? "en-BE" : "nl-BE"
  const copy = isEn ? DETAIL_COPY_EN : DETAIL_COPY_NL
  const localize = (href: string) => localizeHref(href, normalizedLocale)

  const detail = isEn
    ? MATERIAL_DETAILS_BY_SLUG_EN[slug] ?? MATERIAL_DETAILS_BY_SLUG[slug]
    : MATERIAL_DETAILS_BY_SLUG[slug]

  if (!detail) {
    notFound()
  }

  const materialsMap = materialsByLocale(normalizedLocale)
  const material = materialsMap[detail.key]
  const galleryItems = materialGalleryByLocale(normalizedLocale)[detail.key]
  const contactHref = localize(`/contact?material=${encodeURIComponent(material.name)}`)
  const filamentFridayLinks = isEn ? FILAMENT_FRIDAY_LINKS_EN : FILAMENT_FRIDAY_LINKS_NL
  const filamentFriday = detail.filamentFriday ?? filamentFridayLinks[detail.key]

  const pageUrl = isEn
    ? `https://www.x3dprints.be/en/materials/${detail.slug}`
    : `https://www.x3dprints.be/materials/${detail.slug}`

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: material.name,
    description: detail.seo.description,
    category: "3D printing filament",
    material: material.name,
    brand: { "@type": "Brand", name: "X3DPrints" },
    url: pageUrl,
    inLanguage: languageCode,
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
        inLanguage: languageCode,
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

  const projectTitle = `${copy.project.titlePrefix} ${material.name}${copy.project.titleSuffix}`
  const readMoreTitle = `${copy.readMore.titlePrefix} ${material.name}`

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
            <MaterialBreadcrumb current={material.name} href={localize("/materials")} label={copy.breadcrumbLabel} />
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

            {galleryItems && galleryItems.length > 0 ? (
              <div className="mt-10">
                <MaterialGallery items={galleryItems} />
              </div>
            ) : null}

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ShimmerButton href={contactHref}>{isEn ? "Request a quote or advice" : "Vraag offerte of advies"}</ShimmerButton>
              <Link
                href={localize("/materials")}
                className="inline-flex items-center gap-1 text-sm font-semibold text-slate-700 transition hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                <span aria-hidden>{copy.backIcon}</span>
                {copy.backLabel}
              </Link>
            </div>
            {filamentFriday ? (
              <div className="mt-8 w-full">
                <GlassCard className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-indigo-500">{copy.filamentFridayLabel}</p>
                  <h2 className="mt-3 text-2xl font-semibold text-slate-900">{filamentFriday.title}</h2>
                  <p className="mt-2 text-sm text-slate-600">{filamentFriday.description}</p>
                  <div className="mt-4">
                    <Link
                      href={localize(filamentFriday.href)}
                      className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
                    >
                      {copy.filamentFridayCta}
                      <span aria-hidden>-&gt;</span>
                    </Link>
                  </div>
                </GlassCard>
              </div>
            ) : null}
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-16">
          <Reveal>
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">{copy.sections.why}</h2>
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
                <h2 className="text-xl font-semibold text-slate-900">{copy.sections.features}</h2>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  {(material.features || []).map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <SwatchList material={material} labels={copy.swatches} />
                </div>
              </GlassCard>

              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold text-slate-900">{copy.sections.specs}</h2>
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
                <h2 className="text-xl font-semibold text-slate-900">{copy.sections.idealFor}</h2>
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
                <h2 className="text-xl font-semibold text-slate-900">{copy.sections.printTips}</h2>
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
                <h2 className="text-xl font-semibold text-slate-900">{copy.sections.faq}</h2>
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
                <h2 className="text-xl font-semibold text-slate-900">{projectTitle}</h2>
                <p className="mt-2 max-w-xl text-sm text-slate-600">
                  {copy.project.body}
                </p>
              </div>
              <ShimmerButton href={contactHref}>{copy.project.cta}</ShimmerButton>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <ReadMoreLinks
        title={readMoreTitle}
        intro={copy.readMore.intro}
        primaryLinks={[
          { label: copy.readMore.primary.materials, href: localize("/materials") },
          { label: copy.readMore.primary.pricing, href: localize("/pricing") },
          { label: copy.readMore.primary.quote, href: contactHref },
        ]}
        secondaryLinks={[
          { label: copy.readMore.secondary.services, href: localize("/services") },
          { label: copy.readMore.secondary.portfolio, href: localize("/portfolio") },
          { label: copy.readMore.secondary.tool, href: localize("/materials#material-suggestion-tool") },
        ]}
      />

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
