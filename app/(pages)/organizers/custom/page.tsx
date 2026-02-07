// app/(pages)/organizers/custom/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import Faq from "@/components/Faq"
import OrganizerBundles from "@/components/OrganizerBundles"
import Reveal from "@/components/Reveal"
import { ORGANIZER_PAGES } from "@/content/organizer-details"
import { buildOrganizerContactHref, buildOrganizerSchemas } from "@/lib/organizers"
import { SITE, buildFaqPageSchema, buildHowToSchema } from "@/lib/seo"

const PAGE = ORGANIZER_PAGES.custom
const PAGE_URL = `${SITE.url}/organizers/${PAGE.slug}`

export const metadata: Metadata = {
  title: PAGE.seo.title,
  description: PAGE.seo.description,
  alternates: {
    canonical: PAGE.seo.canonical,
    languages: {
      "nl-BE": PAGE.seo.canonical,
      "en-BE": `${SITE.url}/en/organizers/${PAGE.slug}`,
      "x-default": PAGE.seo.canonical,
    },
  },
  openGraph: {
    title: PAGE.seo.title,
    description: PAGE.seo.description,
    url: PAGE_URL,
    images: PAGE.seo.ogImage
      ? [{ url: PAGE.seo.ogImage, width: 1200, height: 630, alt: "Custom toolbox insert op maat" }]
      : [{ url: "/images/organizers/custom/custom1.jpg", width: 1200, height: 900, alt: "Custom toolbox insert op maat" }],
    siteName: SITE.name,
    locale: SITE.locale,
  },
  twitter: { card: "summary_large_image" },
}

export default function CustomOrganizerPage() {
  const contactHref = buildOrganizerContactHref(PAGE.slug)
  const schemas = buildOrganizerSchemas(PAGE, PAGE_URL)
  const faqSchema = buildFaqPageSchema({
    inLanguage: "nl-BE",
    mainEntityOfPage: PAGE_URL,
    items: PAGE.faq,
  })
  const howToSchema = buildHowToSchema({
    name: "Custom toolbox insert aanvragen",
    description: "Stuur een foto, binnenmaten en tool lijst voor een insert op maat.",
    inLanguage: "nl-BE",
    mainEntityOfPage: PAGE_URL,
    totalTime: "PT12M",
    toolNames: ["Foto", "Meetlat of schuifmaat"],
    url: PAGE_URL,
    steps: [
      { name: "Foto maken", text: "Foto van de open koffer, schuim verwijderd." },
      { name: "Maten noteren", text: "Binnenlengte, -breedte, -hoogte (of diameter x hoogte) in mm." },
      { name: "Tools oplijsten", text: "Naam + aantal per tool en gewenste ligging (plat/rechtop)." },
      { name: "Uploaden", text: "Gebruik het contactformulier (custom prefill) om alles te sturen." },
    ],
  })
  const tocItems = [
    { id: "howto", label: "Hoe werkt de custom intake?" },
    { id: "bundles", label: "Welke opties en bundels zijn er?" },
    { id: "faq", label: "FAQ custom inserts" },
    { id: "custom-sources", label: "Bronnen en referenties" },
  ]
  const references = [
    { label: "IKEA Skadis productlijn", url: "https://www.ikea.com/be/nl/search/?q=skadis" },
    { label: "ISO/ASTM 52900 terminologie", url: "https://www.astm.org/f2997-13r21.html" },
    { label: "Prusa materialenoverzicht", url: "https://help.prusa3d.com/article/material-guide_220" },
  ]
  const lastUpdatedLabel = "Laatst bijgewerkt: 6 februari 2026"

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 lg:py-20">
        <Reveal className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-800 ring-1 ring-cyan-100 dark:bg-[#0f162c] dark:text-cyan-200">
            Custom toolbox inserts
          </div>
          <div className="space-y-4">
            <h1 className="text-balance text-4xl font-extrabold text-slate-900 sm:text-5xl">{PAGE.heroTitle}</h1>
            <p className="max-w-3xl text-lg text-slate-700 dark:text-slate-200">{PAGE.heroSubtitle}</p>
            <p className="max-w-3xl text-slate-700 dark:text-slate-200">{PAGE.intro}</p>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
            <ContentTableOfContents title="Inhoud" items={tocItems} className="max-w-xl" />
            <p className="max-w-3xl text-sm font-semibold text-slate-600 dark:text-slate-300">
              Voor hobbyisten én professionals met unieke koffers, pegboards of cases.
            </p>
            <div className="grid gap-2 rounded-2xl border border-slate-100 bg-white/70 p-4 text-sm text-slate-800 ring-1 ring-white/60 backdrop-blur dark:border-slate-800 dark:bg-[#0B0F1A]/70 dark:text-slate-100 dark:ring-0">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">Typische custom cases</div>
              <div className="grid gap-2 sm:grid-cols-2">
                <span className="flex items-center gap-2">
                  <span className="i-lucide-cube" aria-hidden /> Pegboards met magnetische labels
                </span>
                <span className="flex items-center gap-2">
                  <span className="i-lucide-package" aria-hidden /> Geprinte storage boxen en bins
                </span>
                <span className="flex items-center gap-2">
                  <span className="i-lucide-wrench" aria-hidden /> Parametric organizers voor wisselende tools
                </span>
                <span className="flex items-center gap-2">
                  <span className="i-lucide-cpu" aria-hidden /> Electronics/FPV/meetkits op maat
                </span>
                <span className="flex items-center gap-2">
                  <span className="i-lucide-sparkles" aria-hidden /> IKEA Skådis add-ons (haken, bakjes, kabelclips)
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link
                href={contactHref}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:brightness-110 dark:bg-cyan-500"
              >
                Start custom intake
                <span className="i-lucide-arrow-right" aria-hidden />
              </Link>
              <Link
                href="#bundles"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-900 dark:border-slate-700 dark:text-slate-100"
              >
                Ga naar opties
                <span className="i-lucide-list-checks" aria-hidden />
              </Link>
              <Link
                href="#howto"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-900 dark:border-slate-700 dark:text-slate-100"
              >
                Intake stappen
                <span className="i-lucide-sticky-note" aria-hidden />
              </Link>
              <Link
                href="/materials#material-suggestion-tool"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-900 dark:border-slate-700 dark:text-slate-100"
              >
                Bekijk materialen
              </Link>
              <Link
                href="/blog/tool-organizers-3d-printen"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-900 dark:border-slate-700 dark:text-slate-100"
              >
                Organizers blog
                <span className="i-lucide-book-open" aria-hidden />
              </Link>
              <a href="#faq" className="underline decoration-cyan-400 hover:decoration-cyan-700">
                FAQ
              </a>
              <a href="#custom-sources" className="underline decoration-cyan-400 hover:decoration-cyan-700">
                Bronnen
              </a>
            </div>
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
        </Reveal>
      </div>

      <section className="bg-gradient-to-b from-white to-slate-50 px-4 py-12 sm:py-16 dark:from-[#050815] dark:to-[#0B0F1A]">
        <div className="mx-auto max-w-6xl space-y-10">
          <Reveal className="grid gap-6 rounded-3xl bg-white/70 p-6 ring-1 ring-white/60 backdrop-blur dark:bg-[#0B0F1A]/70 dark:ring-0 md:grid-cols-[1fr_1fr] md:gap-10">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Wat los je op</p>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Eindelijk een koffer die klopt</h2>
              <p className="text-slate-700 dark:text-slate-200">
                Geen schuim snijden of random bakjes meer. Eén insert die past bij jouw unieke tools, pegboard of storage box.
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

          <section id="howto" className="scroll-mt-28">
            <Reveal className="rounded-3xl border border-slate-100 bg-white/80 p-6 shadow-lg shadow-slate-900/5 ring-1 ring-white/70 backdrop-blur dark:border-slate-800 dark:bg-[#0B0F1A]/80 dark:ring-0">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Zo werkt het</p>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Parametrisch op maat</h2>
                  <p className="mt-2 max-w-2xl text-slate-700 dark:text-slate-200">{PAGE.summary}</p>
                </div>
                <Link
                  href={contactHref}
                  className="text-sm font-semibold text-cyan-700 underline-offset-4 hover:text-cyan-900 hover:underline dark:text-cyan-200 dark:hover:text-cyan-100"
                >
                  Start met foto + maten
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
          </section>

          <section id="bundles" className="scroll-mt-28">
            <Reveal>
              <OrganizerBundles systemSlug={PAGE.slug} systemName={PAGE.systemName} bundles={PAGE.bundles} />
            </Reveal>
          </section>

          <section id="faq" className="scroll-mt-28">
            <Reveal className="rounded-3xl border border-slate-100 bg-white/80 p-6 ring-1 ring-white/70 backdrop-blur dark:border-slate-800 dark:bg-[#0B0F1A]/80 dark:ring-0">
              <Faq items={PAGE.faq} title="Veelgestelde vragen over custom inserts" className="mt-0" />
            </Reveal>
          </section>

          <Reveal className="rounded-3xl border border-slate-100 bg-white/80 p-6 ring-1 ring-white/70 backdrop-blur dark:border-slate-800 dark:bg-[#0B0F1A]/80 dark:ring-0">
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Orde geeft mentale ruimte</h2>
              <p className="text-slate-700 dark:text-slate-200">
                Eén koffer per taak, één vaste plek per tool. Minder zoeken, minder frustratie, meer focus.
              </p>
              <p className="text-slate-700 dark:text-slate-200">
                Een rustige koffer is een rustige kop. Dat merk je bij elke klus.
              </p>
            </div>
          </Reveal>

          <section id="custom-sources" className="scroll-mt-28">
            <Reveal className="rounded-3xl border border-slate-100 bg-white/80 p-6 ring-1 ring-white/70 backdrop-blur dark:border-slate-800 dark:bg-[#0B0F1A]/80 dark:ring-0">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Bronnen en referenties</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-200">
                Deze referenties gebruiken we om terminologie en systeemkoppelingen op deze pagina actueel te houden.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-100">
                {references.map((reference) => (
                  <li key={reference.url} className="rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3 dark:border-slate-700 dark:bg-[#0f162c]">
                    <cite className="not-italic">
                      <Link href={reference.url} target="_blank" rel="noreferrer" className="font-semibold text-indigo-600 hover:text-indigo-500">
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
            {
              "@context": "https://schema.org",
              "@type": "ImageObject",
              name: "Custom toolbox insert op maat",
              contentUrl: `${SITE.url}${PAGE.seo.ogImage}`,
              thumbnail: `${SITE.url}${PAGE.seo.ogImage}`,
              caption: "Custom toolbox insert met labels en antislip, gemaakt in België",
            },
            howToSchema,
          ]) }}
      />
    </>
  )
}
