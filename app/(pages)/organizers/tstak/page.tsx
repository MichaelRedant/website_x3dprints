// app/(pages)/organizers/tstak/page.tsx
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import AutoCarousel from "@/components/AutoCarousel"
import Faq from "@/components/Faq"
import OrganizerBundles from "@/components/OrganizerBundles"
import Reveal from "@/components/Reveal"
import { ORGANIZER_PAGES } from "@/content/organizer-details"
import { buildOrganizerContactHref, buildOrganizerSchemas } from "@/lib/organizers"
import { SITE } from "@/lib/seo"

const PAGE = ORGANIZER_PAGES.tstak
const PAGE_URL = `${SITE.url}/organizers/${PAGE.slug}`

export const metadata: Metadata = {
  title: PAGE.seo.title,
  description: PAGE.seo.description,
  alternates: {
    canonical: PAGE.seo.canonical,
    languages: {
      "nl-BE": PAGE.seo.canonical,
      en: `${SITE.url}/en/organizers/${PAGE.slug}`,
    },
  },
  openGraph: {
    title: PAGE.seo.title,
    description: PAGE.seo.description,
    url: PAGE_URL,
    images: PAGE.seo.ogImage
      ? [{ url: PAGE.seo.ogImage, width: 1200, height: 630, alt: "TSTAK organizer op maat" }]
      : [{ url: "/images/organizers/tstak/tstak1.jpg", width: 1200, height: 900, alt: "TSTAK organizer op maat" }],
    siteName: SITE.name,
    locale: SITE.locale,
  },
  twitter: { card: "summary_large_image" },
}

export default function TstakPage() {
  const contactHref = buildOrganizerContactHref(PAGE.slug)
  const schemas = buildOrganizerSchemas(PAGE, PAGE_URL)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PAGE.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  }

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 lg:py-20">
        <Reveal className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-800 ring-1 ring-cyan-100 dark:bg-[#0f162c] dark:text-cyan-200">
            Stanley / DeWALT TSTAK
          </div>
          <div className="space-y-4">
            <h1 className="text-balance text-4xl font-extrabold text-slate-900 sm:text-5xl">{PAGE.heroTitle}</h1>
            <p className="max-w-3xl text-lg text-slate-700 dark:text-slate-200">{PAGE.heroSubtitle}</p>
            <p className="max-w-3xl text-slate-700 dark:text-slate-200">{PAGE.intro}</p>
            <p className="max-w-3xl text-sm font-semibold text-slate-600 dark:text-slate-300">
              Gericht op professionele teams op locatie en in de camionette: elektro, HVAC, installateurs.
            </p>
            <div className="overflow-hidden rounded-2xl border border-white/60 shadow-lg ring-1 ring-white/60 dark:border-slate-800 dark:ring-0">
              <Image
                src="/images/organizers/tstak/tstak0.jpg"
                alt="TSTAK organizer overzicht in de koffer"
                width={1600}
                height={900}
                priority
                sizes="(min-width: 1280px) 1200px, (min-width: 768px) 90vw, 100vw"
                className="h-auto w-full object-cover"
              />
            </div>
            <div className="flex flex-wrap gap-3 text-sm">
              <a href="#bundles" className="underline decoration-cyan-400 hover:decoration-cyan-700">
                Bundels & presets
              </a>
              <a href="#carousel" className="underline decoration-cyan-400 hover:decoration-cyan-700">
                Foto’s
              </a>
              <a href="#faq" className="underline decoration-cyan-400 hover:decoration-cyan-700">
                FAQ
              </a>
              <Link href="/blog/tool-organizers-3d-printen" className="underline decoration-cyan-400 hover:decoration-cyan-700">
                Organizers blog
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex flex-wrap gap-3">
              <Link href={contactHref} className="no-underline">
                <div className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:brightness-110 dark:bg-cyan-500">
                  Stel jouw TSTAK layout samen
                  <span className="i-lucide-arrow-right" aria-hidden />
                </div>
              </Link>
              <Link
                href="#bundles"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-900 dark:border-slate-700 dark:text-slate-100"
              >
                Ga naar bundels
                <span className="i-lucide-list-checks" aria-hidden />
              </Link>
              <Link
                href="/materials#material-suggestion-tool"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-900 dark:border-slate-700 dark:text-slate-100"
              >
                Bekijk suggestietool
                <span className="i-lucide-sparkles" aria-hidden />
              </Link>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Stil transport, labelzones en modules die blijven zitten.
            </p>
          </div>

          <ul className="grid gap-2 sm:grid-cols-2">
            {PAGE.proofPoints.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 rounded-xl bg-white/70 px-4 py-3 text-sm font-semibold text-slate-800 ring-1 ring-white/60 backdrop-blur dark:bg-[#0B0F1A]/70 dark:text-slate-100 dark:ring-0"
              >
                <span className="i-lucide-check-circle-2 text-cyan-600" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="https://www.dewalt.com/product/dwst17814/tstak%C2%AE-4-compartment-box"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 underline underline-offset-4 hover:text-indigo-900"
          >
            Bekijk TSTAK info
            <span className="i-lucide-external-link" aria-hidden />
          </Link>
        </Reveal>
      </div>

      <section className="bg-gradient-to-b from-white to-slate-50 px-4 py-12 sm:py-16 dark:from-[#050815] dark:to-[#0B0F1A]">
        <div className="mx-auto max-w-6xl space-y-10">
          <Reveal className="grid gap-6 rounded-3xl bg-white/70 p-6 ring-1 ring-white/60 backdrop-blur dark:bg-[#0B0F1A]/70 dark:ring-0 md:grid-cols-[1fr_1fr] md:gap-10">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Wat los je op</p>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Geen rammel in je TSTAK</h2>
              <p className="text-slate-700 dark:text-slate-200">
                Stabiele trays per hoogte, zodat je small parts en handtools gescheiden blijven zonder foam-gedoe.
              </p>
            </div>
            <ul className="grid gap-3">
              {PAGE.pains.map((pain) => (
                <li
                  key={pain}
                  className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white/70 px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm shadow-slate-900/5 dark:border-slate-800 dark:bg-[#0f162c] dark:text-slate-100"
                >
                  <span className="i-lucide-minus-circle text-cyan-600" aria-hidden />
                  {pain}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="rounded-3xl border border-slate-100 bg-white/80 p-6 shadow-lg shadow-slate-900/5 ring-1 ring-white/70 backdrop-blur dark:border-slate-800 dark:bg-[#0B0F1A]/80 dark:ring-0">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Zo werkt het</p>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Indeling zonder meten-stress</h2>
                <p className="mt-2 max-w-2xl text-slate-700 dark:text-slate-200">{PAGE.summary}</p>
              </div>
              <Link
                href={contactHref}
                className="text-sm font-semibold text-cyan-700 underline-offset-4 hover:text-cyan-900 hover:underline dark:text-cyan-200 dark:hover:text-cyan-100"
              >
                Start met jouw TSTAK modelnummer
              </Link>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-4">
              {PAGE.steps.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 text-slate-800 ring-1 ring-white/60 dark:border-slate-800 dark:bg-[#0f162c] dark:text-slate-100"
                >
                  <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-cyan-600 text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <h3 className="text-base font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{step.description}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <section id="bundles">
          <Reveal>
            <OrganizerBundles systemSlug={PAGE.slug} systemName={PAGE.systemName} bundles={PAGE.bundles} />
          </Reveal>
          </section>

          <section id="carousel">
          <Reveal className="rounded-3xl border border-slate-100 bg-white/80 p-6 ring-1 ring-white/70 backdrop-blur dark:border-slate-800 dark:bg-[#0B0F1A]/80 dark:ring-0">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Beelden</p>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">TSTAK layouts</h2>
              </div>
              <Link
                href={contactHref}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-900 dark:border-slate-700 dark:text-slate-100"
              >
                Plan jouw TSTAK
                <span className="i-lucide-arrow-right" aria-hidden />
              </Link>
            </div>
            <AutoCarousel
              visibleCount={3}
              speed={4}
              itemClass="aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3]"
              items={[
                { src: "/images/organizers/tstak/tstak1.jpg", alt: "TSTAK organizer met verdeelde vakken", width: 1600, height: 900 },
                { src: "/images/organizers/tstak/tstak2.jpg", alt: "TSTAK insert voor small parts en bits", width: 1600, height: 900 },
                { src: "/images/organizers/tstak/tstak3.jpeg", alt: "TSTAK low-profile layout met labelzones", width: 1600, height: 900 },
                { src: "/images/organizers/tstak/tstak4.webp", alt: "TSTAK insert met antislip optie", width: 1600, height: 900 },
                { src: "/images/organizers/tstak/tstak5.webp", alt: "TSTAK organizer detail met kleurcode", width: 1600, height: 900 },
                { src: "/images/organizers/tstak/tstak6.webp", alt: "TSTAK layout voor handtools en verbruiksmateriaal", width: 1600, height: 900 },
                { src: "/images/organizers/tstak/tstak7.webp", alt: "TSTAK trays klemvast tegen rammel", width: 1600, height: 900 },
                { src: "/images/organizers/tstak/tstak8.webp", alt: "TSTAK organizer voor servicekits", width: 1600, height: 900 },
                { src: "/images/organizers/tstak/tstak9.webp", alt: "TSTAK insert met labelbare rijen", width: 1600, height: 900 },
                { src: "/images/organizers/tstak/tstak10.webp", alt: "TSTAK low-profile compact indeling", width: 1600, height: 900 },
              ]}
            />
          </Reveal>
          </section>

          <section id="faq">
          <Reveal className="rounded-3xl border border-slate-100 bg-white/80 p-6 ring-1 ring-white/70 backdrop-blur dark:border-slate-800 dark:bg-[#0B0F1A]/80 dark:ring-0">
            <Faq items={PAGE.faq} title="Veelgestelde vragen over TSTAK organizers" className="mt-0" />
          </Reveal>
          </section>

          <Reveal className="rounded-3xl border border-slate-100 bg-white/80 p-6 ring-1 ring-white/70 backdrop-blur dark:border-slate-800 dark:bg-[#0B0F1A]/80 dark:ring-0">
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Orde = minder stress</h2>
              <p className="text-slate-700 dark:text-slate-200">
                Een stille TSTAK-koffer geeft focus: je weet waar elk onderdeel ligt en verliest geen tijd aan zoeken.
              </p>
              <p className="text-slate-700 dark:text-slate-200">
                Een goed georganiseerde koffer vermindert fouten, versnelt interventies en voelt gewoon beter aan op de
                werf.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            schemas.service,
            schemas.offerCatalog,
            faqSchema,
            {
              "@context": "https://schema.org",
              "@type": "ImageObject",
              name: "TSTAK organizer op maat",
              contentUrl: `${SITE.url}${PAGE.seo.ogImage}`,
              thumbnail: `${SITE.url}${PAGE.seo.ogImage}`,
              caption: "TSTAK insert op maat met labelzones en antislip-optie",
            },
            {
              "@context": "https://schema.org",
              "@type": "HowTo",
              name: "Custom TSTAK vak aanvragen",
              description: "Vraag een TSTAK insert op maat aan met foto en modelnummer.",
              step: [
                { "@type": "HowToStep", position: 1, name: "Model delen", text: "Geef het TSTAK modelnummer of foto van de open koffer." },
                { "@type": "HowToStep", position: 2, name: "Maten doorgeven", text: "Binnenmaten in mm indien gekend." },
                { "@type": "HowToStep", position: 3, name: "Tools oplijsten", text: "Small parts, handtools of mix met aantallen." },
                { "@type": "HowToStep", position: 4, name: "Uploaden", text: "Gebruik het contactformulier (TSTAK prefill) om alles te sturen." },
              ],
              tool: ["Foto van de koffer", "Meetlat of schuifmaat"],
              totalTime: "PT10M",
            },
          ]) }}
      />
    </>
  )
}
