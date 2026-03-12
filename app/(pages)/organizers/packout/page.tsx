// app/(pages)/organizers/packout/page.tsx
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import AutoCarousel from "@/components/AutoCarousel"
import Faq from "@/components/Faq"
import OrganizerBundles from "@/components/OrganizerBundles"
import Reveal from "@/components/Reveal"
import { ORGANIZER_PAGES } from "@/content/organizer-details"
import { buildOrganizerContactHref, buildOrganizerSchemas } from "@/lib/organizers"
import { SITE, buildFaqPageSchema, buildHowToSchema } from "@/lib/seo"

const PAGE = ORGANIZER_PAGES.packout
const PAGE_URL = PAGE.seo.canonical
const CAROUSEL_ITEMS = [
  { src: "/images/organizers/milwaukee/milwaukee2.webp", alt: "Milwaukee Packout organizer met verdeelde vakken", width: 1600, height: 900 },
  { src: "/images/organizers/milwaukee/milwaukee3.webp", alt: "Packout inlay voor bits en schroeven, klemvast", width: 1600, height: 900 },
  { src: "/images/organizers/milwaukee/milwaukee4.webp", alt: "Packout batterij- en laderinlay zonder rammel", width: 1600, height: 900 },
  { src: "/images/organizers/milwaukee/milwaukee5.webp", alt: "Packout low-profile organizer met labelzones", width: 1600, height: 900 },
  { src: "/images/organizers/milwaukee/milwaukee6.webp", alt: "Packout compact organizer met antislip optie", width: 1600, height: 900 },
  { src: "/images/organizers/milwaukee/milwaukee7.webp", alt: "Packout layout voor servicewagen, geen losse onderdelen", width: 1600, height: 900 },
  { src: "/images/organizers/milwaukee/milwaukee8.webp", alt: "Packout inlay met kleurcode en labelbare rijen", width: 1600, height: 900 },
  { src: "/images/organizers/milwaukee/milwaukee9.webp", alt: "Packout organizer met mix van accu’s en handtools", width: 1600, height: 900 },
  { src: "/images/organizers/milwaukee/milwaukee10.webp", alt: "Packout low-profile compact voor kleinverbruik", width: 1600, height: 900 },
]

export const metadata: Metadata = {
  title: PAGE.seo.title,
  description: PAGE.seo.description,
  alternates: {
    canonical: PAGE.seo.canonical,
    languages: {
      "nl-BE": PAGE.seo.canonical,
      "en-BE": `${SITE.url}/en/organizers/${PAGE.slug}/`,
      "x-default": PAGE.seo.canonical,
    },
  },
  openGraph: {
    title: PAGE.seo.title,
    description: PAGE.seo.description,
    url: PAGE_URL,
    images: PAGE.seo.ogImage
      ? [{ url: PAGE.seo.ogImage, width: 1200, height: 630, alt: "Packout organizer op maat" }]
      : [{ url: CAROUSEL_ITEMS[0].src, width: CAROUSEL_ITEMS[0].width, height: CAROUSEL_ITEMS[0].height, alt: CAROUSEL_ITEMS[0].alt }],
    siteName: SITE.name,
    locale: SITE.locale,
  },
  twitter: { card: "summary_large_image" },
}

export default function PackoutPage() {
  const contactHref = buildOrganizerContactHref(PAGE.slug)
  const schemas = buildOrganizerSchemas(PAGE, PAGE_URL)
  const imageObjects = CAROUSEL_ITEMS.slice(0, 5).map((img) => ({
    "@context": "https://schema.org",
    "@type": "ImageObject",
    name: img.alt,
    contentUrl: `${SITE.url}${img.src}`,
    thumbnail: `${SITE.url}${img.src}`,
    caption: img.alt,
    width: img.width,
    height: img.height,
  }))
  const faqSchema = buildFaqPageSchema({
    inLanguage: "nl-BE",
    mainEntityOfPage: PAGE_URL,
    items: PAGE.faq,
  })
  const howToSchema = buildHowToSchema({
    name: "Custom Packout vak aanvragen",
    description: "Vraag een Packout insert op maat aan met foto en modelnummer.",
    inLanguage: "nl-BE",
    mainEntityOfPage: PAGE_URL,
    totalTime: "PT10M",
    toolNames: ["Foto van de koffer", "Meetlat of schuifmaat"],
    url: PAGE_URL,
    steps: [
      { name: "Model delen", text: "Geef het Packout modelnummer of foto van de open koffer." },
      { name: "Maten doorgeven", text: "Binnenmaten in mm indien gekend." },
      { name: "Tools oplijsten", text: "Accu's, opladers, bits, handtools met aantallen." },
      { name: "Uploaden", text: "Gebruik het contactformulier (Packout prefill) om alles te sturen." },
    ],
  })
  const tocItems = [
    { id: "packout-overview", label: "Wat lost een Packout indeling op?" },
    { id: "bundles", label: "Bundels en presets" },
    { id: "faq", label: "FAQ Packout organizers" },
    { id: "carousel", label: "Foto's van Packout layouts" },
    { id: "packout-sources", label: "Bronnen en referenties" },
  ]
  const references = [
    { label: "Milwaukee PACKOUT systeem", url: "https://www.milwaukeetool.eu/en-eu/milwaukee/packout/" },
    { label: "Milwaukee Packout organizers", url: "https://www.milwaukeetool.eu/en-eu/storage/packout/packout-organisers/" },
    { label: "ISO/ASTM 52900 terminologie", url: "https://www.astm.org/f2997-13r21.html" },
  ]
  const lastUpdatedLabel = "Laatst bijgewerkt: 6 februari 2026"

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 lg:py-20">
        <Reveal className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-800 ring-1 ring-amber-100 dark:bg-[#0f162c] dark:text-amber-200">
            Milwaukee Packout
          </div>
          <div className="space-y-4">
            <h1 className="text-balance text-4xl font-extrabold text-slate-900 sm:text-5xl">{PAGE.heroTitle}</h1>
            <p className="max-w-3xl text-lg text-slate-700 dark:text-slate-200">{PAGE.heroSubtitle}</p>
            <p className="max-w-3xl text-slate-700 dark:text-slate-200">{PAGE.intro}</p>
            <p className="max-w-3xl text-sm font-semibold text-slate-600 dark:text-slate-300">
              Gericht op professionals: serviceploegen, installateurs, techniekers.
            </p>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
            <ContentTableOfContents title="Inhoud" items={tocItems} className="max-w-xl" />
            <div className="overflow-hidden rounded-2xl border border-white/60 shadow-lg ring-1 ring-white/60 dark:border-slate-800 dark:ring-0">
              <Image
                src="/images/organizers/milwaukee/milwaukee1.webp"
                alt="Milwaukee Packout organizer in gebruik op de werf"
                width={1600}
                height={900}
                priority
                sizes="(min-width: 1280px) 1200px, (min-width: 768px) 90vw, 100vw"
                className="h-auto w-full object-cover"
              />
            </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <a href="#bundles" className="underline decoration-amber-400 hover:decoration-amber-700">
              Bundels & presets
            </a>
            <a href="#carousel" className="underline decoration-amber-400 hover:decoration-amber-700">
              Foto’s
            </a>
            <a href="#faq" className="underline decoration-amber-400 hover:decoration-amber-700">
              FAQ
            </a>
            <Link href="/blog/tool-organizers-3d-printen" className="underline decoration-amber-400 hover:decoration-amber-700">
              Organizers blog
            </Link>
            <a href="#packout-sources" className="underline decoration-amber-400 hover:decoration-amber-700">
              Bronnen
            </a>
          </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex flex-wrap gap-3">
              <Link href={contactHref} className="no-underline">
                <div className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:brightness-110 dark:bg-amber-500">
                  Stel jouw Packout layout samen
                  <span className="i-lucide-arrow-right" aria-hidden />
                </div>
              </Link>
              <Link
                href="#bundles"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-amber-400 hover:text-amber-900 dark:border-slate-700 dark:text-slate-100"
              >
                Ga naar bundels
                <span className="i-lucide-list-checks" aria-hidden />
              </Link>
              <Link
                href="/materials#material-suggestion-tool"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-amber-400 hover:text-amber-900 dark:border-slate-700 dark:text-slate-100"
              >
                Bekijk suggestietool
                <span className="i-lucide-sparkles" aria-hidden />
              </Link>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Rust in je Packout: klemvast, labelbaar, geen rammel.
            </p>
          </div>

          <ul className="grid gap-2 sm:grid-cols-2">
            {PAGE.proofPoints.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 rounded-xl bg-white/70 px-4 py-3 text-sm font-semibold text-slate-800 ring-1 ring-white/60 backdrop-blur dark:bg-[#0B0F1A]/70 dark:text-slate-100 dark:ring-0"
              >
                <span className="i-lucide-check-circle-2 text-amber-600" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="https://www.milwaukeetool.eu/en-eu/storage/packout/packout-organisers/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 underline underline-offset-4 hover:text-amber-900"
          >
            Bekijk Milwaukee Packout organizers
            <span className="i-lucide-external-link" aria-hidden />
          </Link>
        </Reveal>
      </div>

      <section className="bg-gradient-to-b from-white to-slate-50 px-4 py-12 sm:py-16 dark:from-[#050815] dark:to-[#0B0F1A]">
        <div className="mx-auto max-w-6xl space-y-10">
          <Reveal className="grid gap-6 rounded-3xl bg-white/70 p-6 ring-1 ring-white/60 backdrop-blur dark:bg-[#0B0F1A]/70 dark:ring-0 md:grid-cols-[1fr_1fr] md:gap-10">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Wat los je op</p>
              <h2 id="packout-overview" className="scroll-mt-28 text-2xl font-bold text-slate-900 dark:text-white">Rust in je Packout</h2>
              <p className="text-slate-700 dark:text-slate-200">
                Geen losse bakjes of schuim die snel kapot gaat. Je krijgt een vaste indeling die tegen transport kan.
              </p>
            </div>
            <ul className="grid gap-3">
              {PAGE.pains.map((pain) => (
                <li
                  key={pain}
                  className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm shadow-slate-900/5 dark:border-slate-800 dark:bg-[#0f162c] dark:text-slate-100"
                >
                  <span className="i-lucide-minus-circle text-amber-600" aria-hidden />
                  {pain}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="rounded-3xl border border-slate-100 bg-white/80 p-6 shadow-lg shadow-slate-900/5 ring-1 ring-white/70 backdrop-blur dark:border-slate-800 dark:bg-[#0B0F1A]/80 dark:ring-0">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Zo werkt het</p>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Geen schuim snijden, wel pasvorm</h2>
                <p className="mt-2 max-w-2xl text-slate-700 dark:text-slate-200">{PAGE.summary}</p>
              </div>
              <Link
                href={contactHref}
                className="text-sm font-semibold text-amber-700 underline-offset-4 hover:text-amber-900 hover:underline dark:text-amber-200 dark:hover:text-amber-100"
              >
                Start met jouw Packout modelnummer
              </Link>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-4">
              {PAGE.steps.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 text-slate-800 ring-1 ring-white/60 dark:border-slate-800 dark:bg-[#0f162c] dark:text-slate-100"
                >
                  <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-amber-600 text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <h3 className="text-base font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{step.description}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <section id="bundles" className="scroll-mt-28">
            <Reveal>
              <OrganizerBundles systemSlug={PAGE.slug} systemName={PAGE.systemName} bundles={PAGE.bundles} />
            </Reveal>
          </section>

          <section id="faq" className="scroll-mt-28">
            <Reveal className="rounded-3xl border border-slate-100 bg-white/80 p-6 ring-1 ring-white/70 backdrop-blur dark:border-slate-800 dark:bg-[#0B0F1A]/80 dark:ring-0">
              <Faq items={PAGE.faq} title="Veelgestelde vragen over Packout organizers" className="mt-0" />
            </Reveal>
          </section>

          <section id="carousel" className="scroll-mt-28">
            <Reveal className="rounded-3xl border border-slate-100 bg-white/80 p-6 ring-1 ring-white/70 backdrop-blur dark:border-slate-800 dark:bg-[#0B0F1A]/80 dark:ring-0">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Beelden</p>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Packout layouts in actie</h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">Foto’s volgen; deze carousel is alvast klaar.</p>
              </div>
              <Link
                href={contactHref}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-amber-400 hover:text-amber-900 dark:border-slate-700 dark:text-slate-100"
              >
                Plan jouw Packout
                <span className="i-lucide-arrow-right" aria-hidden />
              </Link>
            </div>
            <AutoCarousel
              visibleCount={3}
              speed={4}
              itemClass="aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3]"
              items={CAROUSEL_ITEMS}
            />
            </Reveal>
          </section>

          <Reveal className="rounded-3xl border border-slate-100 bg-white/80 p-6 ring-1 ring-white/70 backdrop-blur dark:border-slate-800 dark:bg-[#0B0F1A]/80 dark:ring-0">
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Rust in je hoofd, sneller werken</h2>
              <p className="text-slate-700 dark:text-slate-200">
                Een Packout die niet rammelt geeft focus op de werf: minder zoeken, minder fouten, minder frustratie.
                Elke tray heeft zijn plek, zodat je in- en uitpakt zonder nadenken.
              </p>
              <p className="text-slate-700 dark:text-slate-200">
                Orde in je koffer = rust in je hoofd. Dat voel je bij elke interventie en bij elke rit naar de volgende
                klant.
              </p>
            </div>
          </Reveal>

          <section id="packout-sources" className="scroll-mt-28">
            <Reveal className="rounded-3xl border border-slate-100 bg-white/80 p-6 ring-1 ring-white/70 backdrop-blur dark:border-slate-800 dark:bg-[#0B0F1A]/80 dark:ring-0">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Bronnen en referenties</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-200">
                Deze referenties gebruiken we voor systeemnamen, compatibiliteit en terminologie op deze Packout-pagina.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-100">
                {references.map((reference) => (
                  <li key={reference.url} className="rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3 dark:border-slate-700 dark:bg-[#0f162c]">
                    <cite className="not-italic">
                      <Link href={reference.url} target="_blank" rel="noreferrer" className="font-semibold text-amber-600 hover:text-amber-500">
                        {reference.label}
                      </Link>
                    </cite>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            schemas.service,
            schemas.offerCatalog,
            faqSchema,
            ...imageObjects,
            howToSchema,
          ]) }}
      />
    </>
  )
}

