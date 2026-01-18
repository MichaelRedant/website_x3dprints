import type { Metadata } from "next"
import Link from "next/link"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import Faq from "@/components/Faq"
import Reveal from "@/components/Reveal"
import FilamentHeroVisual from "@/components/FilamentHeroVisual"
import GlassOrb from "@/components/GlassOrb"

export const metadata: Metadata = {
  title: "3D modellen vinden om te laten printen | X3DPrints",
  description:
    "Vind 3D modellen die klaar zijn voor print: Printables, MakerWorld, Thingiverse, MyMiniFactory, Cults en Thangs. Tips over kwaliteit en hoe je de link doorstuurt zodat wij lokaal kunnen printen.",
  alternates: { canonical: "https://www.x3dprints.be/3d-modellen-vinden" },
  openGraph: {
    title: "Waar 3D modellen vinden om te laten printen",
    description:
      "Gids met de beste platformen om 3D modellen te downloaden: links delen, kwaliteit controleren en direct laten printen bij X3DPrints.",
    url: "https://www.x3dprints.be/3d-modellen-vinden",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "3D modellen vinden" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

const sources = [
  {
    name: "Printables.com",
    url: "https://www.printables.com",
    badge: "Aanrader",
    description: "Grote community, duidelijke kwaliteitslabels, veel geverifieerde prints met foto's en instellingen.",
    notes: ["Filter op 'Printables Verified' voor betrouwbare bestanden", "Check comments voor materiaal- en oriëntatietips"],
  },
  {
    name: "MakerWorld (Bambu Lab)",
    url: "https://makerworld.com/",
    badge: "Veel presets",
    description: "Veel modellen met Bambu AMS-profielen en exacte slicer-instellingen.",
    notes: ["Download het 3MF-bestand voor presets", "Check remix-info (schaal/support)"],
  },
  {
    name: "Thingiverse",
    url: "https://www.thingiverse.com/",
    badge: "Klassieker",
    description: "Zeer grote bibliotheek; kwaliteit varieert. Let extra op comments en remixes.",
    notes: ["Bekijk 'Makes' voor bewijs van printbaarheid", "Vermijd modellen zonder foto's of comments"],
  },
  {
    name: "MyMiniFactory",
    url: "https://www.myminifactory.com/",
    badge: "Minis & props",
    description: "Sterk in tabletop, props en decor. Vaak duidelijke info en paid/patreon opties.",
    notes: ["Controleer schaal (mm) en supports", "Bewaar koopbewijs voor betaalde modellen"],
  },
  {
    name: "Cults3D",
    url: "https://cults3d.com/",
    badge: "Mix free/paid",
    description: "Betaalde en gratis modellen met variabele kwaliteit. Screenshots en reviews goed nalezen.",
    notes: ["Download alle onderdelen (STL/OBJ)", "Bewaar factuur of link voor referentie"],
  },
  {
    name: "Thangs",
    url: "https://thangs.com/",
    badge: "Zoekmachine",
    description: "Zoekt door meerdere platformen en toont varianten. Handig om alternatieven te vinden.",
    notes: ["Klik door naar de bron voor detailinfo", "Let op units (mm/inch)"],
  },
]

const faqItems = [
  {
    q: "Welke link moet ik doorsturen?",
    a: "Stuur de directe pagina-link van het model en noteer welke onderdelen je nodig hebt. Voeg eventueel een screenshot of gewenste schaal toe.",
  },
  {
    q: "Mag ik een remix aanleveren?",
    a: "Ja. Stuur je aangepaste STL/3MF mee of een link naar het originele model + jouw wijzigingen. Vermeld of supports al in het bestand zitten.",
  },
  {
    q: "Kunnen jullie ook het model maken of aanpassen?",
    a: "Ja. We modelleren in Fusion 360 of Tinkercad en passen bestaande STL/3MF aan (schaal, tekst/logo, toleranties, inserts). Je krijgt een printbaar bestand en een voorstel voor materiaal en planning.",
  },
  {
    q: "Welke formaten werken het best?",
    a: "STL en 3MF zijn ideaal. 3MF met presets uit MakerWorld nemen we over en stemmen we af op onze printers.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
}

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Waar 3D modellen vinden om te laten printen",
  description:
    "Overzicht van de beste plaatsen om 3D modellen te downloaden (Printables, MakerWorld, Thingiverse, MyMiniFactory, Cults, Thangs) plus kwaliteitstips voor X3DPrints.",
  inLanguage: "nl-BE",
  author: { "@type": "Organization", name: "X3DPrints" },
  mainEntityOfPage: "https://www.x3dprints.be/3d-modellen-vinden",
}

const process = [
  "Bestandscheck: meerdere onderdelen, zitten supports erin en welke schaal geldt?",
  "Materiaal & prijs: we adviseren PLA/PETG/TPU en delen richtprijzen en planning.",
  "Productie: we printen lokaal in Herzele en plannen levering of afhalen in Vlaanderen.",
]

const modelingPoints = [
  "CAD in Fusion 360 of Tinkercad voor printbare resultaten.",
  "We denken mee over wanddikte, supports en toleranties.",
  "Snelle iteraties met screenshots of testprints.",
]

export default function FindModelsPage() {
  return (
    <main className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(99,102,241,.12),transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.06]" />

      <section className="px-6 pb-14 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-indigo-600">Gids</p>
              <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                Waar vind je 3D modellen om te laten printen?
              </h1>
              <p className="text-lg text-slate-700">
                Kies een model op Printables, MakerWorld, Thingiverse, MyMiniFactory, Cults of Thangs en stuur de link. Wij checken schaal, materiaal en printbaarheid en printen lokaal in Belgie.
              </p>
              <div className="flex flex-wrap gap-3">
                <ShimmerButton href="/contact?quote=Link%20naar%203D%20model">Stuur je link</ShimmerButton>
                <Link
                  href="/materials#material-suggestion-tool"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Material Suggestion Tool
                </Link>
              </div>
            </div>
            <GlassCard className="overflow-hidden border-white/60 bg-white/70 p-6 shadow-lg ring-1 ring-white/70">
              <div className="relative flex h-full min-h-[260px] items-center justify-center">
                <div className="hidden w-full max-w-[360px] md:block">
                  <FilamentHeroVisual className="w-full" />
                </div>
                <div className="flex w-full justify-center md:hidden">
                  <GlassOrb className="h-40 w-40 opacity-70" />
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6 max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">De beste plekken om te starten</h2>
            <p className="mt-2 text-slate-600">Gebruik de links hieronder en stuur de exacte modelpagina door.</p>
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-3">
            {sources.map((source) => (
              <Reveal key={source.name}>
                <GlassCard className="h-full p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-lg font-semibold text-slate-900">{source.name}</div>
                      <div className="mt-0.5 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                        {source.badge}
                      </div>
                    </div>
                    <Link
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Open <span aria-hidden>-&gt;</span>
                    </Link>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">{source.description}</p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-700">
                    {source.notes.map((note) => (
                      <li key={note} className="flex items-start gap-2">
                        <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Hoe wij je link verwerken</h2>
              <ol className="mt-3 space-y-2 text-sm text-slate-700">
                {process.map((step, index) => (
                  <li key={step}>
                    {index + 1}. {step}
                  </li>
                ))}
              </ol>
              <div className="mt-4 flex flex-wrap gap-3">
                <ShimmerButton href="/contact?quote=Link%20naar%203D%20model">Deel je model</ShimmerButton>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:-translate-y-0.5"
                >
                  Prijzen & levertijden
                </Link>
              </div>
            </GlassCard>

            <GlassCard className="p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-slate-900">Kleine checklist</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>- Voeg de link toe, plus welke onderdelen je wil (als het een set is).</li>
                <li>- Noteer gewenste schaal (mm) en of tekst/logo moet blijven staan.</li>
                <li>- Geef door of het binnen/buiten gebruikt wordt en welke kleur/look je wil.</li>
                <li>- Stuur een screenshot mee wanneer het model meerdere varianten heeft.</li>
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid gap-6 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">Ook modelleren</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Geen passend model gevonden?</h2>
              <p className="mt-2 text-sm text-slate-700">
                We modelleren zelf in Fusion 360 of Tinkercad. Ideaal als een bestaand model niet klopt of je iets volledig op maat wil. Je krijgt een printbaar STL/STEP met advies over orientatie, support en materiaal.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {modelingPoints.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-indigo-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-3">
                <ShimmerButton href="/3d-modelleren">Ontdek 3D-modelleren</ShimmerButton>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Vraag een model aan
                </Link>
              </div>
            </div>
            <GlassCard className="border-white/40 bg-gradient-to-br from-white/80 to-white/60 p-6 shadow-lg ring-1 ring-white/60">
              <h3 className="text-lg font-semibold text-slate-900">Wanneer kiezen voor modelleren?</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>- Bestaande STL heeft foute toleranties of te veel supports.</li>
                <li>- Je wil branding (logo/tekst) of maatwerk dat je nergens vindt.</li>
                <li>- Assemblagepunten, inserts of schroefdraad moeten exact kloppen.</li>
                <li>- Je wil itereren met testprints en daarna een kleine serie.</li>
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto mb-16 max-w-5xl">
        <Faq title="FAQ over modellen vinden" items={faqItems} />
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    </main>
  )
}
