// /app/(pages)/[slug]/page.tsx
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
import CtaBlock from "@/components/CtaBlock"
import Faq from "@/components/Faq"

import { splitMarkdown } from "@/lib/markdown"
import { extractHeadings } from "@/lib/headings"
import {
  getAllLocationSlugs,
  getLocationBySlug,
  buildDefaultRelatedPhrases,
} from "@/lib/locations"
import { keywordSvgDataUri } from "@/lib/svg"
import {
  buildCityMetaDescription,
  makeDescriptionFromMarkdown,
  SITE,
} from "@/lib/seo"

export const revalidate = 86_400 // 24h

export function generateStaticParams(): Array<{ slug: string }> {
  return getAllLocationSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params
  const loc = getLocationBySlug(slug)
  if (!loc) return {}

  const keyphrase = `3D printen in ${loc.city}`
  const phrases = loc.relatedPhrases?.length
    ? loc.relatedPhrases
    : buildDefaultRelatedPhrases(loc.city)
  const url = `https://www.x3dprints.be/${loc.slug}`

  // Try to read markdown to craft a unique description
  let contentMd = ""
  try {
    contentMd = await readFile(
      join(process.cwd(), "content", "locations", `${loc.slug}.md`),
      "utf8",
    )
  } catch {}

  const description =
    (loc.metaDescription && loc.metaDescription.trim()) ||
    (contentMd ? makeDescriptionFromMarkdown(contentMd, loc.city) : buildCityMetaDescription(loc.city))

  return {
    title: { default: `${keyphrase} | X3DPrints`, template: `%s | X3DPrints` },
    description,
    keywords: [keyphrase, ...(phrases || [])].join(", "),
    alternates: { canonical: url },
    robots: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
    openGraph: {
      title: keyphrase,
      description,
      url,
      siteName: "X3DPrints",
      type: "website",
      locale: "nl_BE",
      images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: keyphrase }],
    },
    twitter: { card: "summary_large_image", title: keyphrase, description, images: ["/images/og-home.jpg"] },
  }
}

export default async function Page(
  { params }: { params: Promise<{ slug: string }> },
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

  // Load markdown content for the page body
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

  const stripTags = (html: string) => html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim()

  const servicedAreas = loc.servicedAreas?.length
    ? loc.servicedAreas
    : [
        `${loc.city} centrum`,
        `${loc.city} industriezone`,
        `${loc.city} en omliggende deelgemeenten`,
        "Afhalen Provincieweg 34a, 9552 Herzele",
        "Levering in Vlaanderen",
      ]

  const sectors = loc.sectors?.length
    ? loc.sectors
    : [
        `Prototyping en productteams in ${loc.city}`,
        `Fixtures/tooling voor maakbedrijven rond ${loc.city}`,
        `Displays/props voor marketing en events in ${loc.city}`,
        `Onderwijs en makers in ${loc.city}`,
      ]

  // Hero variant selection per city for unique wording
  const heroVariants = [
    (city: string) => ({
      title: `3D printen in ${city}: prototypes, tools en props.`,
      subtitle: `Lokale service voor prototypes, fixtures, behuizingen en zichtwerk in ${city}.`,
    }),
    (city: string) => ({
      title: `3D prints op maat in ${city} voor makers en bedrijven.`,
      subtitle: `Van rapid prototyping tot kleine series in ${city} en omgeving, met persoonlijk advies.`,
    }),
    (city: string) => ({
      title: `${city}: 3D print service voor functionele onderdelen en designwerk.`,
      subtitle: `PLA, PETG of TPU, afgestemd op jouw project in ${city} en snel geleverd.`,
    }),
    (city: string) => ({
      title: `Laat je 3D modellen printen in ${city} met korte lijnen.`,
      subtitle: `Snelle feedback, transparante prijzen en levering richting ${city} en Vlaanderen.`,
    }),
  ]
  const variantIndex = loc.city
    .split("")
    .map((c) => c.charCodeAt(0))
    .reduce((sum, code) => sum + code, 0) % heroVariants.length
  const heroContent = heroVariants[variantIndex](loc.city)

  // JSON-LD blocks
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: keyphrase,
    areaServed: [{ "@type": "City", name: loc.city }, { "@type": "State", name: "Oost-Vlaanderen" }],
    provider: { "@type": "Organization", name: "X3DPrints", url: "https://www.x3dprints.be" },
    url: `https://www.x3dprints.be/${loc.slug}`,
    serviceType: "3D printing",
    keywords: [keyphrase, ...phrases],
  }

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "X3DPrints",
    url: "https://www.x3dprints.be",
    image: "https://www.x3dprints.be/og-x3dprints.jpg",
    telephone: SITE.phone,
    hasMap: "https://www.google.com/maps/search/?api=1&query=Provincieweg+34a+9552+Herzele",
    geo: {
      "@type": "GeoCoordinates",
      latitude: 50.8839,
      longitude: 3.8932,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    areaServed: loc.city,
    sameAs: SITE.sameAs,
  }

  const faqItems = [
    { q: `Welke materialen kan ik laten 3D printen in ${loc.city}?`, aHtml: `Standaard <strong>PLA Matte</strong>, plus <strong>PETG</strong> en <strong>TPU</strong>. Op aanvraag: ABS/ASA, Nylon of PA-CF. Bekijk <a href="/materials">materialen & richtlijnen</a>.` },
    { q: `Wat is de levertijd voor 3D printen in ${loc.city}?`, aHtml: `Meestal <strong>enkele werkdagen</strong>, afhankelijk van complexiteit en oplage. <a href="/contact">Spoed</a> mogelijk in overleg.` },
    { q: "Hoe worden de prijzen berekend?", aHtml: `Transparant: formaat (<em>Small/Medium/Large/XL</em>), materiaaltoeslag, nabehandeling en aantallen. Zie <a href="/pricing">Prijzen</a>.` },
    { q: "Wat zijn de maximale bouwvolumes?", aHtml: `Tot <strong>35 x 32 x 35 cm</strong> per onderdeel. Grotere onderdelen splitsen we in segmenten met nette passing.` },
    { q: "Welke bestandsformaten accepteer je?", aHtml: `<strong>STL</strong> of <strong>STEP</strong>. Voeg toelichting toe: gewenste sterkte, zichtzijde, afwerking, aantallen.` },
    { q: "Welke toleranties haal je typisch?", aHtml: `Richtwaarde <strong>+/-0,2 mm</strong> bij PLA/PETG, afhankelijk van geometrie en orientatie. Functionele passing? Vermeld dit in je aanvraag.` },
    { q: "Bieden jullie ontwerp op maat of aanpassingen?", aHtml: `Ja. CAD-aanpassingen en ontwerp op maat aan <strong>EUR 45/uur</strong>. Vraag een voorstel via <a href="/contact">contact</a>.` },
    { q: `Kan ik afhalen i.p.v. verzending in ${loc.city}?`, aHtml: `Afhalen kan op afspraak. Verzending: <strong>&lt; EUR 50 = EUR 7</strong>, <strong>EUR 50-100 = EUR 5</strong>, <strong>&gt; EUR 100 = gratis</strong>. Zie <a href="/pricing">Prijzen</a>.` },
  ].map((it) => ({ ...it, aText: stripTags(it.aHtml) }))

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.aText } })),
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

  const icon = (node: ReactNode) => (
    <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden className="mx-auto mb-2 text-slate-700">
      <g fill="none" stroke="currentColor" strokeWidth="1.6">{node}</g>
    </svg>
  )

  return (
    <main className="relative overflow-clip">
      {/* subtle background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-teal-50" />
        <div className="absolute -top-32 -left-28 h-[26rem] w-[26rem] rounded-full bg-cyan-200/30 blur-3xl sm:h-[32rem] sm:w-[32rem] md:h-[38rem] md:w-[38rem]" />
        <div className="absolute -bottom-32 -right-28 h-[28rem] w-[28rem] rounded-full bg-teal-200/30 blur-3xl sm:h-[36rem] sm:w-[36rem] md:h-[42rem] md:w-[42rem]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px]" />
      </div>

      {/* hero */}
      <section className="relative px-6 pb-24 pt-20 sm:px-8 lg:px-12 lg:pb-32 lg:pt-28">
        <div className="absolute right-0 top-0 -z-10 hidden sm:block">
          <GlassOrb className="h-72 w-72 opacity-40" />
        </div>

        <div className="mx-auto max-w-6xl">
          <Reveal className="max-w-3xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-slate-700 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Lokale 3D print service in {loc.city}
            </span>

            <Catchphrase className="mt-4 block text-base font-medium text-indigo-600 sm:text-lg">
              3D printen in {loc.city}
            </Catchphrase>

            <h1 className="mt-2 text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              {heroContent.title}
            </h1>

            <p className="mt-2 text-balance text-lg font-medium text-slate-700">
              {heroContent.subtitle}
            </p>

            <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-slate-600 sm:text-lg">
              X3DPrints print vanuit Herzele (tussen Gent en Aalst) voor {loc.city} en omgeving. Stuur je STL/STEP, kies
              PLA, PETG of TPU en ontvang een voorstel met planning. Doorlooptijd meestal enkele werkdagen na akkoord.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <ShimmerButton href="/contact" aria-label="Offerte aanvragen">Offerte aanvragen</ShimmerButton>
              <Link href="/portfolio" className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition-transform hover:-translate-y-0.5 hover:bg-white/20" aria-label="Bekijk portfolio">Bekijk portfolio</Link>
            </div>
          </Reveal>

          <TiltImage src="/Logo.webp" alt="X3DPrints logo" width={256} height={256} className="mx-auto mt-12 w-64" priority />

          <Reveal delay={0.15} className="mt-16 grid gap-6 sm:grid-cols-3">
            {[
              { k: "Tolerantie", v: "+/-0,2 mm", icon: icon(<path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 12h16M4 16h16" />) },
              { k: "Doorlooptijd", v: "Afspraak in overleg (meestal enkele werkdagen)", icon: icon(<><circle cx={12} cy={12} r={9} /><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l2 2" /></>) },
              { k: "Bouwvolume", v: "Tot 35 x 32 x 35 cm", icon: icon(<path strokeLinecap="round" strokeLinejoin="round" d="M21 16V8l-9-5-9 5v8l9 5 9-5M12 3v18M3 8l9 4 9-4" />) },
            ].map((item) => (
              <GlassCard key={item.k} className="p-5 text-center transition-transform hover:-translate-y-1">
                {item.icon}
                <div className="text-sm text-slate-500">{item.k}</div>
                <div className="mt-1 text-xl font-semibold text-slate-900">{item.v}</div>
              </GlassCard>
            ))}
          </Reveal>
        </div>
      </section>

      {/* NAP + servicegebied */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="grid gap-6 p-6 sm:grid-cols-[1.1fr_0.9fr] sm:p-8">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Adres en contact</h2>
                <div className="mt-3 space-y-2 text-sm text-slate-700">
                  <p className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                    <span>{SITE.address.street}, {SITE.address.postalCode} {SITE.address.locality}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                    <span>{SITE.phone}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                    <a href="mailto:michael@xinudesign.be" className="underline decoration-slate-300 hover:decoration-slate-600">
                      michael@xinudesign.be
                    </a>
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                    <span>Serviced areas: {loc.city}, Gent, Aalst en Vlaanderen (afhalen in Herzele, levering op aanvraag).</span>
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <ShimmerButton href="/contact">Offerte aanvragen</ShimmerButton>
                  <Link href="/3d-printen" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600">
                    Hoe 3D printen werkt <span aria-hidden>-&gt;</span>
                  </Link>
                </div>
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-slate-900">Serviced areas</h3>
                  <ul className="mt-2 flex flex-wrap gap-2 text-xs text-slate-700">
                    {servicedAreas.map((area) => (
                      <li key={area} className="rounded-full border border-slate-200/70 bg-white/80 px-3 py-1">
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">Handige links</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li><Link className="hover:text-slate-900" href="/pricing">Prijzen & voorbeelden</Link></li>
                  <li><Link className="hover:text-slate-900" href="/materials">Materialen & richtlijnen</Link></li>
                  <li><Link className="hover:text-slate-900" href="/viewer">STL/STEP viewer</Link></li>
                  <li><Link className="hover:text-slate-900" href="/portfolio">Portfolio</Link></li>
                </ul>
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-slate-900">Typische sectoren</h3>
                  <ul className="mt-2 space-y-2 text-xs text-slate-700">
                    {sectors.map((sector) => (
                      <li key={sector} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden />
                        <span>{sector}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* content */}
      <section className="px-4 pb-20 pt-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-screen-md lg:max-w-screen-lg">
          <header className="relative mx-auto rounded-3xl border border-white/30 bg-white/40 p-6 sm:p-8 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] animate-[fadeInUp_.6s_ease_out_0s_both] text-center">
            <h1 className="font-extrabold tracking-tight text-[clamp(1.75rem,4vw,2.5rem)] text-slate-900">{keyphrase}</h1>
            <p className="mx-auto mt-3 max-w-prose text-pretty text-slate-600">Snelle, nauwkeurige 3D print service in {loc.city}. Perfect voor <strong>prototypes</strong> en <strong>kleine series</strong>. Persoonlijk advies, korte doorlooptijden.</p>
            <ul className="mx-auto mt-5 grid max-w-2xl gap-2 text-slate-700 sm:grid-cols-2">
              <li className="flex items-start justify-center gap-2 sm:justify-start"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-cyan-400" />Materialen: PLA, PETG, ABS/ASA, TPU</li>
              <li className="flex items-start justify-center gap-2 sm:justify-start"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-teal-400" />Maximale bouwvolumes & hoge resolutie</li>
              <li className="flex items-start justify-center gap-2 sm:justify-start"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-cyan-400" />Nabehandeling: schuren, primen, lakken</li>
              <li className="flex items-start justify-center gap-2 sm:justify-start"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-teal-400" />Snelle offerte: <Link href="/contact" className="underline decoration-cyan-500 underline-offset-4 hover:text-slate-900">vraag aan</Link></li>
            </ul>
            <div className="mt-6">
              <Link href="/contact" className="group relative inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold text-slate-900 ring-1 ring-slate-900/10 bg-white/60 backdrop-blur transition hover:bg-white/80 hover:shadow-lg before:absolute before:inset-0 before:-translate-x-full before:bg-[linear-gradient(110deg,transparent,rgba(255,255,255,.6),transparent)] before:transition-transform before:duration-700 group-hover:before:translate-x-full" aria-label="Offerte aanvragen">
                Offerte aanvragen
                <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-70" aria-hidden>
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
            <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </header>

          <MiniToc items={tocItems} className="mt-8" defaultCollapsed dismissible storageKey={`mini-toc:${loc.slug}`} />

          <section className="relative mx-auto mt-6 max-w-3xl">
            <div className="rounded-3xl bg-white/45 p-6 ring-1 ring-white/30 backdrop-blur-xl shadow-glass sm:p-8">
              {mdSections.map((md, i) => (
                <div key={i} className={i > 0 ? "mt-8" : undefined}>
                  <Markdown source={md} className="max-w-none prose-headings:scroll-mt-28" />
                  {i === 0 && (
                    <div className="mt-8"><GlassCard className="p-5"><p className="text-sm text-slate-700">Snel offerte nodig? Bezorg je STL/STEP via <Link href="/contact" className="underline decoration-cyan-500 underline-offset-4">het contactformulier</Link>.</p></GlassCard></div>
                  )}
                  {i === 2 && (
                    <div className="mt-8"><Reveal><div className="flex flex-wrap gap-2">{["PLA Matte", "PETG", "TPU"].map((m) => (<span key={m} className="rounded-full border border-white/30 bg-white/70 px-3 py-1 text-sm text-slate-700 backdrop-blur">{m}</span>))}</div></Reveal></div>
                  )}
                  {i === 5 && <CtaBlock city={loc.city} className="mt-10" />}
                  {i < mdSections.length - 1 && (<div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />)}
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-x-0 -top-1 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </section>

          {/* local FAQ */}
          <Faq city={loc.city} items={faqItems.map(({ q, aHtml }) => ({ q, a: aHtml }))} className="mt-14" />

          {/* keyword visual */}
          <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-3xl border border-white/30 bg-white/40 p-2 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] animate-[fadeInUp_.6s_ease_out_.1s_both]">
            <Image src={svgSrc} alt={keyphrase} width={1200} height={630} priority className="h-auto w-full rounded-2xl" />
          </div>

          {/* internal links */}
          <nav className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-3 text-sm animate-[fadeIn_.6s_ease_out_.15s_both]" aria-label="Verder lezen">
            <span className="font-medium text-slate-700">Verder lezen:</span>
            <Link href="/3d-printen" className="rounded-full border border-white/30 bg-white/60 px-4 py-2 text-slate-700 backdrop-blur transition hover:bg-white">3D printen (overzicht)</Link>
            <Link href="/locaties" className="rounded-full border border-white/30 bg-white/60 px-4 py-2 text-slate-700 backdrop-blur transition hover:bg-white">Locaties</Link>
            <Link href="/services" className="rounded-full border border-white/30 bg-white/60 px-4 py-2 text-slate-700 backdrop-blur transition hover:bg-white">Services</Link>
            <Link href="/materials" className="rounded-full border border-white/30 bg-white/60 px-4 py-2 text-slate-700 backdrop-blur transition hover:bg-white">Materialen & richtlijnen</Link>
            <Link href="/pricing" className="rounded-full border border-white/30 bg-white/60 px-4 py-2 text-slate-700 backdrop-blur transition hover:bg-white">Prijzen</Link>
            <Link href="/portfolio" className="rounded-full border border-white/30 bg-white/60 px-4 py-2 text-slate-700 backdrop-blur transition hover:bg-white">Portfolio</Link>
            <Link href="/contact" className="rounded-full border border-white/30 bg-white/60 px-4 py-2 text-slate-700 backdrop-blur transition hover:bg-white">Contact</Link>
          </nav>

          {/* JSON-LD */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
        </div>
      </section>

      {/* keyframes for subtle reveals */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInUp { from { opacity:.0; transform: translateY(8px) } to { opacity:1; transform: translateY(0) } }
        @keyframes fadeIn { from { opacity:.0 } to { opacity:1 } }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important } }
      ` }} />
    </main>
  )
}
