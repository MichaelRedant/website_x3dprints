import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import { buildArticleJsonLd, buildFaqPageSchema } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/blog/3d-printen-valentijn/"
const datePublished = "2025-01-05"
const dateModified = "2026-02-18"
const lastUpdatedLabel = "Laatst bijgewerkt: 18 februari 2026"

export const metadata: Metadata = {
  title: "3D printen voor Valentijn 2026 | X3DPrints Blog",
  description:
    "3D printen voor Valentijn 2026: gepersonaliseerde cadeaus, tafeldecor en lichtobjecten in PLA, Translucent PLA of PETG. Inclusief checklist, materiaalkeuze en FAQ.",
  alternates: { canonical },
  openGraph: {
    title: "3D printen voor Valentijn 2026",
    description:
      "Praktische gids voor gepersonaliseerde Valentijn prints met materiaaladvies, technische richtlijnen en planning.",
    url: canonical,
    type: "article",
    images: [{ url: "/images/og-home-nl.svg", width: 1200, height: 630, alt: "3D geprinte Valentijn decoratie" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printen voor Valentijn 2026",
    description:
      "Gids voor Valentijn 3D prints: materiaalkeuze, checklist en tips voor betrouwbare levering.",
    images: ["/images/og-home-nl.svg"],
  },
}

const materialRows = [
  { material: "PLA Silk/Marble", use: "Luxe gifts, naamhangers, decor", note: "Sterke visuele afwerking voor indoor" },
  { material: "PLA Matte", use: "Subtiele pasteltinten en tafeldecor", note: "Strak oppervlak, stabiele printkwaliteit" },
  { material: "Translucent PLA", use: "Lichtobjecten en lantaarns", note: "Wanddikte 1.6-2 mm voor diffuse gloed" },
  { material: "PETG", use: "Warmere ruimtes of semi-outdoor", note: "Betere hitte- en vochtbestendigheid" },
]

const materialTips = [
  "Kies 0.16-0.20 mm layerhoogte voor fijne tekst en logo-details.",
  "Gebruik minimaal 1.2 mm wanddikte voor hangers en sleutelhangers.",
  "Voor lichtobjecten werkt Translucent PLA met dunne wanden het meest egaal.",
  "Voor buitengebruik of zonbelasting is PETG veiliger dan standaard PLA.",
  "Model is niet inbegrepen in de printprijs: STL/STEP aanleveren of ontwerpservice kiezen.",
]

const useCases = [
  {
    title: "B2B relatiegeschenken",
    body: "Branded gifts, event giveaways en subtiele merkobjecten voor klanten en teams.",
  },
  {
    title: "Retail en etalage",
    body: "Valentijn displays, naamkaartjes en decorstukken voor winkelpresentatie.",
  },
  {
    title: "Persoonlijke cadeaus",
    body: "Unieke naamobjecten, duo-ornamenten en gepersonaliseerde decoratie.",
  },
]

const workflowSteps = [
  {
    title: "1. Briefing",
    body: "Je deelt model, referentie of idee met formaat, kleur en deadline.",
  },
  {
    title: "2. Technische validatie",
    body: "We checken wanddikte, leesbaarheid van tekst en bevestigingspunten.",
  },
  {
    title: "3. Productie",
    body: "Print, kwaliteitscontrole en optioneel lichte nabewerking.",
  },
  {
    title: "4. Levering",
    body: "Afhalen in Herzele of verzending met beschermde verpakking.",
  },
]

const checklist = [
  "Doel: cadeau, display, eventprop of lichtobject.",
  "Materiaal: Silk/Matte, Translucent PLA of PETG.",
  "Personalisatie: naam, logo, tekst en positie.",
  "Afwerking: raw, licht geschuurd of geprimed.",
  "Deadline + leveroptie in aanvraag zetten.",
]

const faqItems = [
  {
    q: "Kunnen jullie gepersonaliseerde Valentijn cadeaus met naam printen?",
    a: "Ja. Je kan STL/STEP aanleveren met naam of logo, of ontwerpservice gebruiken aan EUR 45/uur.",
  },
  {
    q: "Welk materiaal gebruik ik voor een lichtgevend Valentijn item?",
    a: "Translucent PLA is meestal de beste keuze voor zachte lichtspreiding met kleine LED-opstellingen.",
  },
  {
    q: "Is het 3D model inbegrepen in de prijs?",
    a: "Nee. Printservice en ontwerpservice zijn apart. Je levert dus een model aan of laat het uitwerken.",
  },
  {
    q: "Kan ik ook kleine B2B series laten printen voor events?",
    a: "Ja. Kleine series voor relatiegeschenken en eventitems zijn mogelijk met consistente kwaliteit.",
  },
  {
    q: "Hoe vermijd ik last-minute risico voor 14 februari?",
    a: "Door vroeg te plannen. Zo is er ruimte voor technische check en eventueel een proefprint.",
  },
]

const references = [
  { label: "UltiMaker PLA material properties", href: "https://ultimaker.com/materials/pla/" },
  { label: "UltiMaker PETG material properties", href: "https://ultimaker.com/materials/s-series-petg/" },
  { label: "Prusa filament material guide", href: "https://help.prusa3d.com/filament-material-guide" },
  { label: "Autodesk STL export basics", href: "https://help.autodesk.com/view/fusion360/ENU/?guid=GUID-1B6AA02D-B8E5-4F54-ADC7-11C5B900E05F" },
]

const inspirationImages = [
  { src: "/images/portfolio/valentijn2.webp", alt: "3D geprint Valentijn duo decor" },
  { src: "/images/portfolio/valentijn3.webp", alt: "3D geprinte Valentijn hart decoratie" },
  { src: "/images/portfolio/big%20valentijn%20boy%20articulated.webp", alt: "3D geprint articulated Valentijn figuur" },
  { src: "/images/portfolio/vaas-capsule-planter-scaled.webp", alt: "3D geprinte Valentijn vaas decoratie" },
  { src: "/images/portfolio/vaas-spiral-2-3-scaled.webp", alt: "3D geprinte spiraalvaas voor Valentijn setting" },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "3D printen voor Valentijn 2026",
  description: metadata.description ?? "",
  datePublished,
  dateModified,
  image: "https://www.x3dprints.be/images/og-home-nl.svg",
  inLanguage: "nl-BE",
})

const faqJsonLd = buildFaqPageSchema({
  inLanguage: "nl-BE",
  items: faqItems,
})

export default function BlogValentijn() {
  return (
    <main className="relative overflow-clip">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-amber-50" />
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-rose-200/30 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-amber-200/30 blur-3xl" />
      </div>

      <section className="px-6 pb-10 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-700">Seasonal</p>
            <h1 className="mt-2 text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              3D printen voor Valentijn 2026
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-lg text-slate-700">
              Wil je een gepersonaliseerd Valentijn cadeau of branded relatiegeschenk laten printen? Deze gids toont direct
              welke materialen werken, welke technische grenzen belangrijk zijn en hoe je je planning strak houdt richting 14 februari.
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/contact?quote=Valentijn%20print%202026">Plan je Valentijnprints 2026</ShimmerButton>
              <Link
                href="/segments/3d-printing-valentijn"
                className="rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:bg-white"
              >
                Naar Valentijn segment
              </Link>
              <Link
                href="/materials#material-suggestion-tool"
                className="rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:bg-white"
              >
                Material suggestion tool
              </Link>
            </div>
            <nav aria-label="Snelle sectienavigatie" className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
              <Link href="#valentijn-materialen" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                Materialen
              </Link>
              <Link href="#valentijn-toepassingen" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                Toepassingen
              </Link>
              <Link href="#valentijn-planning" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                Planning
              </Link>
              <Link href="#valentijn-faq" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                FAQ
              </Link>
              <Link href="#sources" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                Bronnen
              </Link>
            </nav>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section id="valentijn-materialen" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Materiaalkeuze voor Valentijn prints</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-slate-500">
                      <th className="py-2 pr-4">Materiaal</th>
                      <th className="py-2 pr-4">Gebruik</th>
                      <th className="py-2 pr-4">Notities</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {materialRows.map((row) => (
                      <tr key={row.material}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{row.material}</td>
                        <td className="py-3 pr-4">{row.use}</td>
                        <td className="py-3 pr-4">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {materialTips.map((tip) => (
                  <li key={tip} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-rose-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-700">
                Vergelijk alle filamentopties via{" "}
                <Link href="/materials" className="font-semibold text-rose-700 underline underline-offset-2">
                  materialen
                </Link>
                . Voor visuele gifts werkt Silk/Matte meestal best; voor robuustere toepassingen is PETG vaak logischer.
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.06}>
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold tracking-tight text-slate-900">Design en bestanden</h3>
              <p className="mt-3 text-sm text-slate-700">
                STL of STEP is het startpunt voor productie. Voeg tekst, afmetingen en kleurvoorkeur toe zodat we meteen
                kunnen adviseren op leesbaarheid, support en printoriëntatie.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>Bestanden: STL of STEP.</li>
                <li>Ontwerpservice optioneel: EUR 45/uur.</li>
                <li>Model niet inbegrepen in standaard printprijs.</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/3d-modellen-vinden"
                  className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white"
                >
                  Waar vind je modellen?
                </Link>
                <Link
                  href="/contact?quote=STL%20Valentijn"
                  className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-800 transition hover:bg-rose-100"
                >
                  Stuur je bestand door
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="valentijn-toepassingen" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Toepassingen voor B2B en persoonlijk gebruik</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {useCases.map((item) => (
                  <article key={item.title} className="rounded-2xl border border-slate-200/70 bg-white/80 p-4">
                    <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-700">{item.body}</p>
                  </article>
                ))}
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {inspirationImages.map((img, idx) => (
                  <div
                    key={img.src}
                    className={`overflow-hidden rounded-xl border border-white/70 bg-white/80 shadow-sm ${idx === inspirationImages.length - 1 ? "sm:col-span-2" : ""}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={idx === inspirationImages.length - 1 ? 960 : 640}
                      height={idx === inspirationImages.length - 1 ? 540 : 480}
                      className="h-full w-full object-cover"
                      sizes="(min-width: 1024px) 320px, 100vw"
                      priority={idx === 0}
                    />
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="valentijn-planning" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Planning en doorlooptijd richting 14 februari</h2>
              <p className="mt-3 text-sm text-slate-700">
                Vroege intake geeft ruimte voor technische optimalisatie en voorkomt rush-risico. Dat is belangrijk voor
                gepersonaliseerde items waar tekst en detail foutloos moeten zijn.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {workflowSteps.map((step) => (
                  <div key={step.title} className="rounded-2xl border border-slate-200/70 bg-white/80 p-4">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-900">{step.title}</h3>
                    <p className="mt-2 text-sm text-slate-700">{step.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <ShimmerButton href="/contact?quote=Valentijn%20deadline">Vraag timing en offerte</ShimmerButton>
                <Link
                  href="/pricing"
                  className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white"
                >
                  Bekijk prijzen
                </Link>
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.06}>
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold tracking-tight text-slate-900">Aanvraagchecklist</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {checklist.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="valentijn-faq" className="scroll-mt-28 px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">FAQ: 3D printen voor Valentijn</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                {faqItems.map((item) => (
                  <article key={item.q} className="rounded-xl border border-slate-200/70 bg-white/70 p-4">
                    <h3 className="font-semibold text-slate-800">{item.q}</h3>
                    <p className="mt-1">{item.a}</p>
                  </article>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="valentijn-sources" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 id="sources" className="text-2xl font-bold tracking-tight text-slate-900">
                Bronnen en referenties
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {references.map((reference) => (
                  <li key={reference.href} className="rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3">
                    <cite className="not-italic">
                      <a
                        href={reference.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-rose-700 transition hover:text-rose-600"
                      >
                        {reference.label}
                      </a>
                    </cite>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BlogAuthorNote locale="nl" />
    </main>
  )
}
