// app/(pages)/organizers/modugrid/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import Faq from "@/components/Faq"
import OrganizerBundles from "@/components/OrganizerBundles"
import AutoCarousel from "@/components/AutoCarousel"
import Reveal from "@/components/Reveal"
import { ORGANIZER_PAGES } from "@/content/organizer-details"
import { buildOrganizerContactHref, buildOrganizerSchemas } from "@/lib/organizers"
import { SITE, buildFaqPageSchema, buildHowToSchema } from "@/lib/seo"

const PAGE = ORGANIZER_PAGES.modugrid
const PAGE_URL = PAGE.seo.canonical

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
      ? [{ url: PAGE.seo.ogImage, width: 1200, height: 630, alt: "Gridfinity organizer op maat" }]
      : [{ url: "/images/organizers/modugrid/ModuGrid2.jpg", width: 1200, height: 900, alt: "Gridfinity organizer op maat" }],
    siteName: SITE.name,
    locale: SITE.locale,
  },
  twitter: { card: "summary_large_image" },
}

export default function ModuGridPage() {
  const contactHref = buildOrganizerContactHref(PAGE.slug)
  const schemas = buildOrganizerSchemas(PAGE, PAGE_URL)
  const carouselItems = [
    { src: "/images/organizers/modugrid/ModuGrid1.jpg", alt: "Gridfinity lade overzicht (gridfinity alternatief)", width: 1200, height: 900 },
    { src: "/images/organizers/modugrid/ModuGrid2.jpg", alt: "Gridfinity lade met schroeven en bits (tool organizer op maat)", width: 1200, height: 900 },
    { src: "/images/organizers/modugrid/ModuGrid3.webp", alt: "Gridfinity lade met bits en schroeven, labelbaar", width: 1200, height: 900 },
    { src: "/images/organizers/modugrid/ModuGrid4.webp", alt: "Gridfinity bakjes voor bureau tools en EDC", width: 1200, height: 900 },
    { src: "/images/organizers/modugrid/ModuGrid5.webp", alt: "Gridfinity detail met labels en antislip", width: 1200, height: 900 },
    { src: "/images/organizers/modugrid/ModuGrid6.webp", alt: "Gridfinity insert met antislip, klaar voor transport", width: 1200, height: 900 },
    { src: "/images/organizers/modugrid/ModuGrid7.webp", alt: "Gridfinity lade tijdens gebruik, snelle toegang", width: 1200, height: 900 },
    { src: "/images/organizers/modugrid/ModuGrid8.webp", alt: "Gridfinity custom vak voor multimeter en probes", width: 1200, height: 900 },
    { src: "/images/organizers/modugrid/ModuGrid9.webp", alt: "Gridfinity baseplate met gemengde bakjes (toolbox inlay op maat)", width: 1200, height: 900 },
    { src: "/images/organizers/modugrid/ModuGrid10.webp", alt: "Gridfinity hobby setup voor verf en miniaturen", width: 1200, height: 900 },
    { src: "/images/organizers/modugrid/ModuGrid11.webp", alt: "Gridfinity lade met tools en labels, gridfinity compatibel", width: 1200, height: 900 },
  ]
  const imageObjects = carouselItems.slice(0, 5).map((img) => ({
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
    name: "Custom Gridfinity vak aanvragen",
    description: "Vraag een custom bakje per tool aan met foto en maten.",
    inLanguage: "nl-BE",
    mainEntityOfPage: PAGE_URL,
    totalTime: "PT10M",
    toolNames: ["Foto", "Meetlat of schuifmaat"],
    url: PAGE_URL,
    steps: [
      { name: "Maak foto", text: "Foto van de tool van bovenaf in open koffer of op papier." },
      { name: "Noteer maten", text: "Lengte, breedte en hoogte (of diameter x hoogte) in millimeter." },
      { name: "Kies positie", text: "Geef aan of de tool plat of rechtop moet liggen." },
      { name: "Aantal stuks", text: "Meld hoeveel identieke tools in dezelfde lade moeten passen." },
      { name: "Stuur door", text: "Upload alles via het contactformulier (prefill Gridfinity)." },
    ],
  })
  const tocItems = [
    { id: "modugrid-overview", label: "Wat is Gridfinity en hoe werkt het?" },
    { id: "bundles", label: "Bundels en presets" },
    { id: "carousel", label: "Foto's van layouts" },
    { id: "faq", label: "FAQ Gridfinity organizers" },
    { id: "modugrid-sources", label: "Bronnen en referenties" },
  ]
  const references = [
    { label: "Gridfinity open-source project", url: "https://gridfinity.xyz/" },
    { label: "GitHub Gridfinity repository", url: "https://github.com/joetesla7/gridfinity" },
    { label: "ISO/ASTM 52900 terminologie", url: "https://www.astm.org/f2997-13r21.html" },
  ]
  const lastUpdatedLabel = "Laatst bijgewerkt: 6 februari 2026"

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 lg:py-20">
        <Reveal className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-800 ring-1 ring-amber-100 dark:bg-[#0f162c] dark:text-amber-200">
            Gridfinity · open-source raster zonder losse bakjes
          </div>

          <div className="space-y-4">
            <h1 className="text-balance text-4xl font-extrabold text-slate-900 sm:text-5xl">{PAGE.heroTitle}</h1>

            <p className="max-w-3xl text-lg text-slate-700 dark:text-slate-200">{PAGE.heroSubtitle}</p>

            <p className="max-w-3xl text-slate-700 dark:text-slate-200">
              {PAGE.intro} Een gridfinity compatibel alternatief als toolbox inlay op maat, gemaakt in Vlaanderen/België
              (regio Gent/Aalst) met focus op pasvorm en snelheid in gebruik.
            </p>
            <p className="max-w-3xl text-slate-700 dark:text-slate-200">
              Elk standaard bakje kan ook custom: stuur foto + maten en we modelleren een eigen pocket met labelrand en antislip,
              zodat elke unieke tool exact past.
            </p>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
            <ContentTableOfContents title="Inhoud" items={tocItems} className="max-w-xl" />

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
            <Link href="/blog/gridfinity-modulair-opslagsysteem" className="underline decoration-amber-400 hover:decoration-amber-700">
              Gridfinity gids
            </Link>
            <a href="#modugrid-sources" className="underline decoration-amber-400 hover:decoration-amber-700">
              Bronnen
            </a>
          </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex flex-wrap gap-3">
              <Link href={contactHref} className="no-underline">
                <div className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 hover:brightness-110 dark:bg-amber-500">
                  Plan een Gridfinity indeling
                  <span className="i-lucide-arrow-right" aria-hidden />
                </div>
              </Link>

              <Link
                href="#bundles"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-amber-400 hover:text-amber-900 dark:border-slate-700 dark:text-slate-100"
              >
                Ga naar bundels
                <span className="i-lucide-layout-grid" aria-hidden />
              </Link>

              <Link
                href="#carousel"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-amber-400 hover:text-amber-900 dark:border-slate-700 dark:text-slate-100"
              >
                Bekijk foto’s
                <span className="i-lucide-image" aria-hidden />
              </Link>
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              We verkopen geen plastic. We verkopen orde en tijdswinst.
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
        </Reveal>

        <section id="modugrid-overview" className="scroll-mt-28">
        <Reveal className="rounded-3xl border border-slate-100 bg-white/80 p-6 ring-1 ring-white/70 backdrop-blur dark:border-slate-800 dark:bg-[#0B0F1A]/80 dark:ring-0">
          <div className="grid gap-4 lg:grid-cols-[1.1fr_.9fr] lg:items-start">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-700">Wat is Gridfinity?</p>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Modulaire basis (gridfinity-stijl) voor bureau, lade of koffer
              </h2>

              <p className="text-slate-700 dark:text-slate-200">
                Gridfinity is een open-source raster van baseplates met modulaire vakken. Je schuift trays en inserts per “grid unit”
                op hun plek, zodat alles strak zit en snel terug te vinden is. Ideaal voor bureaulades, werkbanken,
                servicekoffers en makerspaces: elke tool krijgt een vaste positie zonder rammel.
              </p>

              <p className="text-slate-700 dark:text-slate-200">
                Standaard bakjes zijn snel leverbaar. Heb je een afwijkende tool (multimeter, tang, soldeerbout, verfpotje,
                miniatuurdeel)? Dan maken we een custom vak op dezelfde maatvoering, zodat jouw set toch “klikt” in het systeem.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-800 ring-1 ring-slate-100 dark:bg-[#0f162c] dark:text-slate-100 dark:ring-0">
              <p className="font-semibold text-slate-900 dark:text-white">Toepassingen</p>
              <ul className="mt-2 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="i-lucide-briefcase text-amber-600" aria-hidden />
                  <span>Professioneel: ESD-lades, servicekoffers, meetapparatuur met vaste posities.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="i-lucide-pencil-ruler text-amber-600" aria-hidden />
                  <span>Werkbank: bits, boren, schroeven, drivers en handgereedschap per zone.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="i-lucide-palette text-amber-600" aria-hidden />
                  <span>Hobby: verfpotjes, miniaturen, hobbysnijgereedschap en soldeeraccessoires netjes samen.</span>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>
        </section>
      </div>

      <section className="bg-gradient-to-b from-white to-slate-50 px-4 py-12 sm:py-16 dark:from-[#050815] dark:to-[#0B0F1A]">
        <div className="mx-auto max-w-6xl space-y-10">
          <Reveal className="grid gap-6 rounded-3xl bg-white/70 p-6 ring-1 ring-white/60 backdrop-blur dark:bg-[#0B0F1A]/70 dark:ring-0 md:grid-cols-[1fr_1fr] md:gap-10">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Wat los je op</p>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Rust in je koffer of lade</h2>

              <p className="text-slate-700 dark:text-slate-200">
                Eén samenhangende indeling, geen losse bakjes die verschuiven. Past in lades, bureaus of koffers en blijft
                netjes op zijn plek, ook als je de koffer rechtop zet of meeneemt naar de werf.
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
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Geen STL, geen technische praat</h2>

                <p className="mt-2 max-w-2xl text-slate-700 dark:text-slate-200">
                  {PAGE.summary} Jij levert foto + maten, wij doen de indeling en zorgen dat het netjes past.
                </p>
              </div>

              <Link
                href={contactHref}
                className="text-sm font-semibold text-amber-700 underline-offset-4 hover:text-amber-900 hover:underline dark:text-amber-200 dark:hover:text-amber-100"
              >
                Start met jouw lade/koffer maten
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

          <section id="carousel" className="scroll-mt-28">
            <Reveal className="rounded-3xl border border-slate-100 bg-white/80 p-6 ring-1 ring-white/70 backdrop-blur dark:border-slate-800 dark:bg-[#0B0F1A]/80 dark:ring-0">
              <AutoCarousel
                visibleCount={3}
                speed={4}
                itemClass="aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3]"
                items={carouselItems}
              />
            </Reveal>
          </section>

          <Reveal className="grid gap-6 rounded-3xl border border-slate-100 bg-white/80 p-6 ring-1 ring-white/70 backdrop-blur dark:border-slate-800 dark:bg-[#0B0F1A]/80 dark:ring-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Prijs & afspraken</p>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Duidelijk maatwerk, scherpe focus op pasvorm</h2>

              <p className="text-slate-700 dark:text-slate-200">
                {PAGE.priceCopy} We sturen je vooraf een duidelijke voorstelstructuur, zodat je exact weet wat standaard is en wat custom is.
              </p>

              <ul className="mt-3 grid gap-2 text-sm text-slate-800 dark:text-slate-200 sm:grid-cols-2">
                {PAGE.upsells.map((upsell) => (
                  <li
                    key={upsell}
                    className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 ring-1 ring-slate-100 dark:bg-[#0f162c] dark:ring-0"
                  >
                    <span className="i-lucide-plus-circle text-amber-600" aria-hidden />
                    {upsell}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-600 p-5 text-white shadow-xl">
              <h3 className="text-lg font-semibold">Waarom dit werkt</h3>
              <ul className="space-y-2 text-sm font-semibold leading-6">
                <li className="flex items-center gap-2">
                  <span className="i-lucide-badge-check" aria-hidden />
                  Geen rammel of speling, ook rechtop.
                </li>
                <li className="flex items-center gap-2">
                  <span className="i-lucide-timer-reset" aria-hidden />
                  Tijdswinst: je grijpt exact wat je zoekt.
                </li>
                <li className="flex items-center gap-2">
                  <span className="i-lucide-verified" aria-hidden />
                  Gebaseerd op echte lades en koffers, geen renders-only.
                </li>
              </ul>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href={contactHref}
                  className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/40 transition hover:bg-white/20"
                >
                  Plan een gesprek
                  <span className="i-lucide-arrow-right" aria-hidden />
                </Link>

                <Link
                  href="/materials#material-suggestion-tool"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/0 px-4 py-2 text-sm font-semibold underline underline-offset-4"
                >
                  Vraag advies
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal className="rounded-3xl border border-slate-100 bg-white/80 p-6 ring-1 ring-white/70 backdrop-blur dark:border-slate-800 dark:bg-[#0B0F1A]/80 dark:ring-0">
            <div className="grid gap-4 lg:grid-cols-[1.1fr_.9fr] lg:items-start">
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-700">Custom per tool</p>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Standaard bakjes of eigen vak per tool</h2>

                <p className="text-slate-700 dark:text-slate-200">
                  Gridfinity heeft standaard trays, maar je kan ook per tool een eigen vak laten maken. Zo ligt elke tang,
                  meter of bitset altijd “juist”, zonder dat je moet duwen, proppen of zoeken.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-800 ring-1 ring-slate-100 dark:bg-[#0f162c] dark:text-slate-100 dark:ring-0">
                <p className="font-semibold text-slate-900 dark:text-white">Gegevens die we nodig hebben:</p>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="i-lucide-camera text-amber-600" aria-hidden />
                    <span>Foto van de tool in je koffer of op een blad, van bovenaf.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="i-lucide-ruler text-amber-600" aria-hidden />
                    <span>Belangrijkste maatvoering (L x B x H). Bij ronde tools: diameter x hoogte.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="i-lucide-align-vertical-justify-center text-amber-600" aria-hidden />
                    <span>Hoe de tool moet liggen: plat, rechtop of onder een hoek.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="i-lucide-clipboard-list text-amber-600" aria-hidden />
                    <span>Naam van de tool + aantal stuks die je in dezelfde lade wil.</span>
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
        <section id="faq" className="scroll-mt-28">
          <Reveal className="rounded-3xl border border-slate-100 bg-white/80 p-6 ring-1 ring-white/70 backdrop-blur dark:border-slate-800 dark:bg-[#0B0F1A]/80 dark:ring-0">
            <Faq items={PAGE.faq} title="Veelgestelde vragen over Gridfinity organizers" className="mt-0" />
          </Reveal>
        </section>

        <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-slate-100 bg-slate-900 px-5 py-6 text-white shadow-lg shadow-slate-900/30 dark:border-slate-800">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">Klaar om orde te brengen?</p>
              <h2 className="text-lg font-bold">Stuur je lijst of foto door, wij tekenen de indeling.</h2>
              <p className="mt-1 text-sm text-white/80">
                Eén korte intake is vaak genoeg om je lade of koffer meteen “werk-klaar” te maken.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={contactHref}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5"
              >
                Offerte met Gridfinity prefill
                <span className="i-lucide-arrow-right" aria-hidden />
              </Link>

              <Link
                href="/materials#material-suggestion-tool"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/60"
              >
                Bekijk materialen & grip
              </Link>
            </div>
          </div>
        </div>

        <section id="modugrid-sources" className="scroll-mt-28">
          <Reveal className="mt-8 rounded-3xl border border-slate-100 bg-white/80 p-6 ring-1 ring-white/70 backdrop-blur dark:border-slate-800 dark:bg-[#0B0F1A]/80 dark:ring-0">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Bronnen en referenties</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-200">
              Deze referenties gebruiken we voor terminologie en compatibiliteitskaders rond Gridfinity-workflows.
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            schemas.service,
            schemas.offerCatalog,
            faqSchema,
            ...imageObjects,
            howToSchema,
          ]),
        }}
      />
    </>
  )
}

