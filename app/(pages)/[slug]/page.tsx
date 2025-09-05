// app/(pages)/[slug]/page.tsx
import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { readFile } from "fs/promises"
import Link from "next/link"
import { join } from "path"
import type { ReactNode } from "react"

import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import Catchphrase from "@/components/Catchphrase"
import GlassOrb from "@/components/GlassOrb"
import GlassCard from "@/components/GlassCard"
import TiltImage from "@/components/TiltImage"
import Markdown from "@/components/Markdown"
import MiniToc from "@/components/MiniToc"

import { splitMarkdown } from "@/lib/markdown"
import { extractHeadings } from "@/lib/headings"

import {
  getAllLocationSlugs,
  getLocationBySlug,
  buildDefaultRelatedPhrases,
} from "@/lib/locations"
import { keywordSvgDataUri } from "@/lib/svg"
import { buildCityMetaDescription, makeDescriptionFromMarkdown } from "@/lib/seo"

import CtaBlock from "@/components/CtaBlock"
import Faq from "@/components/Faq"


export const revalidate = 86_400 // 24u cache
export const dynamicParams = false

export function generateStaticParams(): Array<{ slug: string }> {
  return getAllLocationSlugs().map((slug) => ({ slug }))
}

/** SEO: verbeterd met unieke descriptions */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const loc = getLocationBySlug(slug)
  if (!loc) return {}

  const keyphrase = `3D printen in ${loc.city}`
  const phrases = loc.relatedPhrases?.length
    ? loc.relatedPhrases
    : buildDefaultRelatedPhrases(loc.city)

  const metaDescription =
    loc.metaDescription ??
    `${keyphrase} door X3DPrints. Snelle, nauwkeurige 3D print service voor prototypes en kleine series in ${loc.city}. Materialen: PLA, PETG, ABS/ASA, TPU.`
  const url = `https://www.x3dprints.be/${loc.slug}`

  // Markdown van deze locatie ophalen (voor een écht unieke snippet)
  let contentMd = ""
  try {
    contentMd = await readFile(
      join(process.cwd(), "content", "locations", `${loc.slug}.md`),
      "utf8",
    )
  } catch {
    // geen markdown? niet erg – val terug op city-fallback
  }

  const finalDescription =
    (loc.metaDescription && loc.metaDescription.trim().length > 0)
      ? loc.metaDescription
      : (contentMd
          ? makeDescriptionFromMarkdown(contentMd, loc.city)
          : buildCityMetaDescription(loc.city))

  // ==== NIEUW: unieke description ====
  // 1) Als je in locations metaDescription meegeeft -> gebruik die
  // 2) Anders proberen we uit de markdown te destilleren (zie stap 4)
  // 3) Als dat faalt, genereren we een nette city-specifieke fallback
  // We vullen mdDescription later onderaan in zodra we contentMd hebben
  const baseMeta = {
    title: {
      default: `${keyphrase} | X3DPrints`,
      template: `%s | X3DPrints`,
    },
    keywords: [keyphrase, ...phrases].join(", "),
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
    openGraph: {
      title: keyphrase,
      url,
      siteName: "X3DPrints",
      type: "website",
      locale: "nl_BE",
      images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: keyphrase }],
    },
    twitter: {
      card: "summary_large_image",
      title: keyphrase,
      images: ["/images/og-home.jpg"],
    },
  } as Metadata

  // We kunnen hier nog geen markdown lezen, dus geven we een voorlopige description terug.
  // De definitieve (unieke) description zetten we in de Page component via <meta> (zie stap 4).
  // Zoekmachines pakken beide; Next Metadata is prima, maar we forceren unieks via client payload.
  return {
    ...baseMeta,
    description:
      loc.metaDescription ??
      `3D printen in ${loc.city} door X3DPrints. Vraag een offerte voor prototypes en kleine series.`,
  }
}

export default async function Page(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug: rawSlug } = await params
  const slug = rawSlug.toLowerCase()
  const loc = getLocationBySlug(slug)
  if (!loc) notFound()

  const keyphrase = `3D printen in ${loc.city}`
  const phrases = loc.relatedPhrases?.length
    ? loc.relatedPhrases
    : buildDefaultRelatedPhrases(loc.city)
  const svgSrc = keywordSvgDataUri(keyphrase)

  // Markdown-inhoud laden
  let contentMd = ""
  try {
    contentMd = await readFile(
      join(process.cwd(), "content", "locations", `${loc.slug}.md`),
      "utf8",
    )
  } catch {
    notFound()
  }

  const mdSections = splitMarkdown(contentMd)
  const tocItems = await extractHeadings(contentMd, [2, 3])

  const finalDescription =
    loc.metaDescription && loc.metaDescription.trim().length > 0
      ? loc.metaDescription
      :
          makeDescriptionFromMarkdown(contentMd, loc.city) ||
          buildCityMetaDescription(loc.city)

  const stripTags = (html: string) =>
    html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim()

  // JSON-LD
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: keyphrase,
    areaServed: { "@type": "City", name: loc.city },
    provider: {
      "@type": "Organization",
      name: "X3DPrints",
      url: "https://www.x3dprints.be",
    },
    url: `https://www.x3dprints.be/${loc.slug}`,
    serviceType: "3D printing",
    keywords: [keyphrase, ...phrases],
  }

  const faqItems = [
    {
      q: `Welke materialen kan ik laten 3D printen in ${loc.city}?`,
      aHtml: `Standaard <strong>PLA Matte</strong>, plus <strong>PETG</strong> en <strong>TPU</strong>. Op aanvraag: ABS/ASA, Nylon of PA-CF. Bekijk <a href="/materials">materialen & richtlijnen</a> voor details.`,
    },
    {
      q: `Wat is de levertijd voor 3D printen in ${loc.city}?`,
      aHtml: `Meestal <strong>2–5 werkdagen</strong>, afhankelijk van complexiteit en oplage. <a href="/contact">Spoed</a> mogelijk in overleg.`,
    },
    {
      q: "Hoe worden de prijzen berekend?",
      aHtml: `Transparant: formaat (<em>Small/Medium/Large/XL</em>), materiaaltoeslag (PLA Plus/PETG/TPU incl. drogen), nabehandeling en aantallen. Zie de tabel op <a href="/pricing">Prijzen</a>.`,
    },
    {
      q: "Wat zijn de maximale bouwvolumes?",
      aHtml: `Tot <strong>25 × 25 × 25 cm</strong> per onderdeel. Grotere onderdelen splitsen we in segmenten met nette passing.`,
    },
    {
      q: "Welke bestandsformaten accepteer je?",
      aHtml: `<strong>STL</strong> of <strong>STEP</strong>. Voeg indien mogelijk een korte toelichting toe: gewenste sterkte, zichtzijde, afwerking, aantallen.`,
    },
    {
      q: "Welke toleranties haal je typisch?",
      aHtml: `Richtwaarde <strong>±0,2 mm</strong> bij PLA/PETG, afhankelijk van geometrie en oriëntatie. Functionele passing? Vermeld dit in je aanvraag.`,
    },
    {
      q: "Bieden jullie ontwerp op maat of aanpassingen?",
      aHtml: `Ja. CAD-aanpassingen en ontwerp op maat aan <strong>€40/uur</strong>. Vraag een voorstel via <a href="/contact">contact</a>.`,
    },
    {
      q: `Kan ik afhalen in plaats van verzending in ${loc.city}?`,
      aHtml: `Afhalen kan op afspraak. Verzending: <strong>&lt; €50 = €7</strong>, <strong>€50–100 = €5</strong>, <strong>&gt; €100 = gratis</strong>. Zie <a href="/pricing">Prijzen</a>.`,
    },
    {
      q: "Hoe zit het met vertrouwelijkheid en IP?",
      aHtml: `Bestanden worden <strong>vertrouwelijk</strong> behandeld en uitsluitend gebruikt voor de offerte/ productie. NDA op aanvraag.`,
    },
    {
      q: "Welke nabehandeling is mogelijk?",
      aHtml: `Schuren, primen en lakken, plus eenvoudige <strong>montage</strong>. Zet je wensen in de aanvraag op <a href="/contact">/contact</a>.`,
    },
  ].map((it) => ({ ...it, aText: stripTags(it.aHtml) }))

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.aText },
    })),
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.x3dprints.be" },
      { "@type": "ListItem", position: 2, name: "Locaties", item: "https://www.x3dprints.be/locaties" },
      { "@type": "ListItem", position: 3, name: loc.city, item: `https://www.x3dprints.be/${loc.slug}` },
    ],
  }

  // Kleine helper om snel consistente outline-icons te renderen
  const icon = (node: ReactNode) => (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="mx-auto mb-2 text-slate-700"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.6">
        {node}
      </g>
    </svg>
  )

  return (
    <main className="relative overflow-clip">
      {/* Achtergrond met orbs, responsief en subtiel */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-teal-50" />
        <div className="absolute -top-32 -left-28 h-[26rem] w-[26rem] rounded-full bg-cyan-200/30 blur-3xl sm:h-[32rem] sm:w-[32rem] md:h-[38rem] md:w-[38rem]" />
        <div className="absolute -bottom-32 -right-28 h-[28rem] w-[28rem] rounded-full bg-teal-200/30 blur-3xl sm:h-[36rem] sm:w-[36rem] md:h-[42rem] md:w-[42rem]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px]" />
      </div>

      {/* Tagline hero */}
      <section className="relative px-6 pb-24 pt-20 sm:px-8 lg:px-12 lg:pb-32 lg:pt-28">
        <div className="absolute right-0 top-0 -z-10 hidden sm:block">
          <GlassOrb className="h-72 w-72 opacity-40" />
        </div>

        <div className="mx-auto max-w-6xl">
          <Reveal className="max-w-3xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-slate-700 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Snel, precies en betaalbaar
            </span>

            <Catchphrase className="mt-4 block text-base font-medium text-indigo-600 sm:text-lg">
              Betaalbaar 3D printen
            </Catchphrase>

            <h1 className="mt-2 bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-balance text-4xl font-extrabold leading-tight tracking-tight text-transparent sm:text-5xl">
              Where design meets dimension.
            </h1>

            <p className="mt-2 text-balance text-lg font-medium text-slate-700">
              3D Prints die kloppen
            </p>

            <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-slate-600 sm:text-lg">
              X3DPrints is een compacte 3D-printstudio uit Herzele, onderdeel van Xinudesign. Ideaal voor prototypes en kleine series met strakke afwerking. PLA is onze standaard, maar we schakelen waar nodig over naar PETG, ABS/ASA, Nylon of PA-CF. Levertijd meestal 2–5 werkdagen, transparante offerte vooraf.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <ShimmerButton href="/contact" aria-label="Offerte aanvragen">
                Offerte aanvragen
              </ShimmerButton>

              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition-transform hover:-translate-y-0.5 hover:bg-white/20"
                aria-label="Bekijk portfolio"
              >
                Bekijk portfolio
              </Link>
            </div>
          </Reveal>

          <TiltImage
  src="/Logo.webp"
  alt="X3DPrints logo"
  width={256}
  height={256}
  className="mx-auto mt-12 w-64"
  priority
/>

          <Reveal delay={0.15} className="mt-16 grid gap-6 sm:grid-cols-3">
            {[
              {
                k: "Tolerantie",
                v: "±0,2 mm",
                icon: icon(
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 12h16M4 16h16" />,
                ),
              },
              {
                k: "Doorlooptijd",
                v: "2–5 werkdagen",
                icon: icon(
                  <>
                    <circle cx={12} cy={12} r={9} />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l2 2" />
                  </>,
                ),
              },
              {
                k: "Bouwvolume",
                v: "Tot 25 × 25 × 25 cm",
                icon: icon(
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 16V8l-9-5-9 5v8l9 5 9-5ZM12 3v18M3 8l9 4 9-4"
                  />,
                ),
              },
            ].map((item) => (
              <GlassCard
                key={item.k}
                className="p-5 text-center transition-transform hover:-translate-y-1"
              >
                {item.icon}
                <div className="text-sm text-slate-500">{item.k}</div>
                <div className="mt-1 text-xl font-semibold text-slate-900">{item.v}</div>
              </GlassCard>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Centrale container met responsieve paddings en max breedte */}
      <section className="px-4 pb-20 pt-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-md lg:max-w-screen-lg">
          {/* Header card */}
          <header
            className="
              relative mx-auto rounded-3xl border border-white/30
              bg-white/40 p-6 sm:p-8 backdrop-blur-xl
              shadow-[0_10px_40px_rgba(0,0,0,0.08)]
              animate-[fadeInUp_.6s_ease_out_0s_both]
              text-center
            "
          >
            <h1
              className="
                font-extrabold tracking-tight
                text-[clamp(1.75rem,4vw,2.5rem)]
                bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700
                bg-clip-text text-transparent
              "
            >
              {keyphrase}
            </h1>

            <p className="mx-auto mt-3 max-w-prose text-pretty text-slate-600">
              Snelle, nauwkeurige 3D print service in {loc.city}. Perfect voor{" "}
              <strong>prototypes</strong> en <strong>kleine series</strong>. Persoonlijk advies, korte doorlooptijden.
            </p>

            <ul className="mx-auto mt-5 grid max-w-2xl gap-2 text-slate-700 sm:grid-cols-2">
              <li className="flex items-start justify-center gap-2 sm:justify-start">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-cyan-400" />
                Materialen: PLA, PETG, ABS/ASA, TPU
              </li>
              <li className="flex items-start justify-center gap-2 sm:justify-start">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-teal-400" />
                Maximale bouwvolumes & hoge resolutie
              </li>
              <li className="flex items-start justify-center gap-2 sm:justify-start">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-cyan-400" />
                Nabehandeling: schuren, primen, lakken
              </li>
              <li className="flex items-start justify-center gap-2 sm:justify-start">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-teal-400" />
                Snelle offerte:{" "}
                <Link
                  href="/contact"
                  className="underline decoration-cyan-500 underline-offset-4 hover:text-slate-900"
                >
                  vraag aan
                </Link>
              </li>
            </ul>

            <div className="mt-6">
              <Link
                href="/contact"
                className="
                  group relative inline-flex items-center gap-2 rounded-2xl px-5 py-3
                  font-semibold text-slate-900
                  ring-1 ring-slate-900/10 bg-white/60 backdrop-blur
                  transition hover:bg-white/80 hover:shadow-lg
                  before:absolute before:inset-0 before:-translate-x-full
                  before:bg-[linear-gradient(110deg,transparent,rgba(255,255,255,.6),transparent)]
                  before:transition-transform before:duration-700 group-hover:before:translate-x-full
                "
                aria-label="Offerte aanvragen"
              >
                Offerte aanvragen
                <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-70" aria-hidden="true">
                  <path
                    d="M5 12h14M13 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>

            <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </header>

          {/* TOC */}
          <MiniToc
  items={tocItems}
  className="mt-8"
  defaultCollapsed
  dismissible
  storageKey={`mini-toc:${loc.slug}`}
/>

          {/* CONTENT (MD) – glassy + centraal + animaties + tabel-scroll */}
          <section className="relative mx-auto mt-6 max-w-3xl">
            <div className="rounded-3xl bg-white/45 p-6 ring-1 ring-white/30 backdrop-blur-xl shadow-glass sm:p-8">
              {mdSections.map((md, i) => (
                <div key={i} className={i > 0 ? "mt-8" : undefined}>
                  <Markdown source={md} className="max-w-none prose-headings:scroll-mt-28" />

                  {/* Interleave: voeg stijlelementen/CTA tussen secties */}
                  {i === 0 && (
                    <div className="mt-8">
                      <GlassCard className="p-5">
                        <p className="text-sm text-slate-700">
                          Snel offerte nodig? Bezorg je STL/STEP via{" "}
                          <Link
                            href="/contact"
                            className="underline decoration-cyan-500 underline-offset-4"
                          >
                            het contactformulier
                          </Link>.
                        </p>
                      </GlassCard>
                    </div>
                  )}

                  {i === 2 && (
                    <div className="mt-8">
                      <Reveal>
                        <div className="flex flex-wrap gap-2">
                          {["PLA Matte", "PETG", "TPU"].map((m) => (
                            <span
                              key={m}
                              className="rounded-full border border-white/30 bg-white/70 px-3 py-1 text-sm text-slate-700 backdrop-blur"
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      </Reveal>
                    </div>
                  )}

                  {i === 5 && <CtaBlock city={loc.city} className="mt-10" />}

                  {/* subtiele divider tussen alle secties behalve de laatste */}
                  {i < mdSections.length - 1 && (
                    <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                  )}
                </div>
              ))}
            </div>

            {/* Soft glow randje bovenaan, purely decorative */}
            <div className="pointer-events-none absolute inset-x-0 -top-1 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </section>

          {/* FAQ */}
          <Faq
            city={loc.city}
            items={faqItems.map(({ q, aHtml }) => ({ q, a: aHtml }))}
            className="mt-14"
          />

          {/* Keyword visual — gecentreerd panel */}
          <div
            className="
              mx-auto mt-8 max-w-3xl overflow-hidden rounded-3xl
              border border-white/30 bg-white/40 p-2 backdrop-blur-xl
              shadow-[0_10px_40px_rgba(0,0,0,0.06)]
              transition-shadow hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]
              animate-[fadeInUp_.6s_ease_out_.1s_both]
            "
          >
            <Image
              src={svgSrc}
              alt={keyphrase}
              width={1200}
              height={630}
              priority
              className="h-auto w-full rounded-2xl"
            />
          </div>

          {/* Interne links — gecentreerde pills (matcht Header.NAV) */}
          <nav
            className="
              mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-3 text-sm
              animate-[fadeIn_.6s_ease_out_.15s_both]
            "
            aria-label="Verder lezen"
          >
            <span className="font-medium text-slate-700">Verder lezen:</span>

            <Link
              href="/services"
              className="rounded-full border border-white/30 bg-white/60 px-4 py-2 text-slate-700 backdrop-blur transition hover:bg-white"
            >
              Services
            </Link>

            <Link
              href="/materials"
              className="rounded-full border border-white/30 bg-white/60 px-4 py-2 text-slate-700 backdrop-blur transition hover:bg-white"
            >
              Materialen & richtlijnen
            </Link>

            <Link
              href="/pricing"
              className="rounded-full border border-white/30 bg-white/60 px-4 py-2 text-slate-700 backdrop-blur transition hover:bg-white"
            >
              Prijzen
            </Link>

            <Link
              href="/portfolio"
              className="rounded-full border border-white/30 bg-white/60 px-4 py-2 text-slate-700 backdrop-blur transition hover:bg-white"
            >
              Portfolio
            </Link>

            <Link
              href="/contact"
              className="rounded-full border border-white/30 bg-white/60 px-4 py-2 text-slate-700 backdrop-blur transition hover:bg-white"
            >
              Contact
            </Link>
          </nav>
          {/* Definitieve, unieke meta description (140–160 chars) */}
          {/* eslint-disable-next-line @next/next/no-head-element */}
          

          {/* JSON-LD */}
          <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
          />
          <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
          <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
          />
        </div>
      </section>

      {/* Keyframes voor subtiele reveals, met reduced-motion respect */}
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes fadeInUp { from { opacity:.0; transform: translateY(8px) } to { opacity:1; transform: translateY(0) } }
          @keyframes fadeIn { from { opacity:.0 } to { opacity:1 } }
          @media (prefers-reduced-motion: reduce) {
            * { animation: none !important; transition: none !important }
          }
        `,
        }}
      />
    </main>
  )
}
