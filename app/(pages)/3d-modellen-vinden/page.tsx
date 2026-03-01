import type { Metadata } from "next"
import Link from "next/link"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import Faq from "@/components/Faq"
import FilamentHeroVisual from "@/components/FilamentHeroVisual"
import GlassCard from "@/components/GlassCard"
import GlassOrb from "@/components/GlassOrb"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import { buildArticleJsonLd, buildFaqPageSchema } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/3d-modellen-vinden/"
const datePublished = "2026-02-06"
const dateModified = "2026-02-06"

export const metadata: Metadata = {
  title: "3D modellen printen: waar vind je goede bestanden? | X3DPrints",
  description:
    "Vind 3D modellen om te printen via Printables, MakerWorld, Thingiverse, MyMiniFactory, Cults en Thangs. Ideaal als je een 3D model wil laten printen in België.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": canonical,
      "en-BE": "https://www.x3dprints.be/en/3d-modellen-vinden/",
      "x-default": canonical,
    },
  },
  openGraph: {
    title: "3D modellen printen: beste bronnen en checks",
    description:
      "Gids met de beste platformen om 3D modellen te downloaden en direct te laten printen, inclusief kwaliteitscheck en materiaaladvies.",
    url: canonical,
    images: [{ url: "/images/og-home.svg", width: 1200, height: 630, alt: "3D modellen vinden" }],
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
    description:
      "Grote community met veel geverifieerde prints, inclusief echte gebruikersfoto's en slicer-notes.",
    notes: [
      "Filter op Printables Verified voor betrouwbaarheid",
      "Controleer comments op materiaal en orientatie",
    ],
    bestFor: "Functionele onderdelen en organizers",
    qualitySignal: "Verified badge + makes",
  },
  {
    name: "MakerWorld (Bambu Lab)",
    url: "https://makerworld.com/",
    badge: "Veel presets",
    description:
      "Veel modellen met 3MF-profielen en uitgewerkte settings, handig voor snelle en consistente output.",
    notes: ["Download bij voorkeur 3MF", "Check remix-info en schaal"],
    bestFor: "Snelle start met duidelijke presets",
    qualitySignal: "3MF-profielen + comments",
  },
  {
    name: "Thingiverse",
    url: "https://www.thingiverse.com/",
    badge: "Klassieker",
    description:
      "Grote bibliotheek met wisselende kwaliteit. Werkt goed als je streng filtert op bewijs van printbaarheid.",
    notes: ["Bekijk Makes als bewijs", "Vermijd listings zonder feedback"],
    bestFor: "Legacy en oudere community ontwerpen",
    qualitySignal: "Aantal makes + actieve commentaren",
  },
  {
    name: "MyMiniFactory",
    url: "https://www.myminifactory.com/",
    badge: "Minis & props",
    description:
      "Sterk in tabletop en prop-designs met vaak duidelijke modelinformatie en licentiecontext.",
    notes: ["Controleer schaal in mm", "Bewaar aankoopbewijs bij betaalde modellen"],
    bestFor: "Tabletop, props en displaystukken",
    qualitySignal: "Designerprofiel + productreviews",
  },
  {
    name: "Cults3D",
    url: "https://cults3d.com/",
    badge: "Mix free/paid",
    description:
      "Combinatie van gratis en betaalde bestanden. Kwaliteit varieert, dus screenshots en feedback zijn cruciaal.",
    notes: ["Download alle onderdelen uit de set", "Bewaar factuur of referentielink"],
    bestFor: "Niche ontwerpen en betaalde bundles",
    qualitySignal: "Reviews + volledigheid van files",
  },
  {
    name: "Thangs",
    url: "https://thangs.com/",
    badge: "Zoekmachine",
    description:
      "Zoekt over meerdere platformen en toont varianten. Ideaal als startpunt voor vergelijkingen.",
    notes: ["Klik door naar de originele bron", "Controleer units (mm/inch)"],
    bestFor: "Vergelijken en alternatieven vinden",
    qualitySignal: "Bronverwijzing + variantvergelijking",
  },
]

const faqItems = [
  {
    q: "Welke link moet ik doorsturen?",
    a: "Stuur de directe modelpagina en vermeld welke onderdelen je exact nodig hebt. Voeg bij varianten ook een screenshot of schaal toe.",
  },
  {
    q: "Mag ik een remix aanleveren?",
    a: "Ja. Stuur je aangepaste STL/3MF of de originele link met duidelijke wijzigingen. Vermeld of supports al mee in het bestand zitten.",
  },
  {
    q: "Kunnen jullie ook het model maken of aanpassen?",
    a: "Ja. We modelleren in Fusion 360 of Tinkercad en passen STL/3MF aan voor schaal, tekst/logo, toleranties en inserts.",
  },
  {
    q: "Welke formaten werken het best?",
    a: "STL en 3MF zijn ideaal. 3MF met presets uit MakerWorld nemen we mee in de intake en stemmen we af op onze printers.",
  },
]

const tocItems = [
  { id: "platformen", label: "Welke platformen werken het best?" },
  { id: "vergelijking", label: "Welke bron kies je voor jouw use-case?" },
  { id: "aanpak", label: "Hoe verwerken wij je model-link?" },
  { id: "modelleren", label: "Wanneer is modelleren slimmer?" },
  { id: "bronnen", label: "Bronnen en referenties" },
  { id: "faq", label: "FAQ over model-links" },
]

const faqJsonLd = buildFaqPageSchema({
  inLanguage: "nl-BE",
  mainEntityOfPage: canonical,
  items: faqItems,
})

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "Waar 3D modellen vinden om te laten printen",
  description:
    "Overzicht van de beste plaatsen om 3D modellen te downloaden (Printables, MakerWorld, Thingiverse, MyMiniFactory, Cults en Thangs) met kwaliteitschecks.",
  datePublished,
  dateModified,
  inLanguage: "nl-BE",
})

const process = [
  "Bestandscheck: we valideren onderdelen, schaal en support-behoefte.",
  "Materiaaladvies: we adviseren PLA, PETG of TPU met een heldere prijsinschatting.",
  "Productieplanning: we printen lokaal in Herzele en stemmen levering of afhaling af.",
]

const modelingPoints = [
  "CAD in Fusion 360 of Tinkercad voor printklare resultaten.",
  "We bewaken wanddikte, toleranties en montagepassing.",
  "Snelle iteraties via screenshots of testprints.",
]

const references = [
  { label: "Printables", url: "https://www.printables.com" },
  { label: "MakerWorld", url: "https://makerworld.com/" },
  { label: "Thingiverse", url: "https://www.thingiverse.com/" },
  { label: "MyMiniFactory", url: "https://www.myminifactory.com/" },
  { label: "Cults3D", url: "https://cults3d.com/" },
  { label: "Thangs", url: "https://thangs.com/" },
]

export default function FindModelsPage() {
  return (
    <main className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(99,102,241,.12),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.06]" />

      <article>
        <section className="px-6 pb-12 pt-14 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <Reveal className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-indigo-600">Gids</p>
                <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                  Waar vind je 3D modellen om te printen?
                </h1>
                <p className="text-lg text-slate-700">
                  Je vindt de meest printklare 3D modellen op Printables en MakerWorld, met Thingiverse, MyMiniFactory,
                  Cults en Thangs als extra bronnen. Wil je een 3D model laten printen? Stuur ons de model-link, wij
                  doen de kwaliteitscheck en printen lokaal in Belgie.
                </p>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
                  Laatst bijgewerkt: 6 februari 2026
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
                <ContentTableOfContents
                  title="Inhoud van deze gids"
                  items={tocItems}
                  className="mt-2 max-w-xl"
                />
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

        <section className="px-6 pb-12 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <Reveal className="mb-6 max-w-3xl">
              <h2 id="platformen" className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Welke platformen leveren de meest printklare 3D modellen?
              </h2>
              <p className="mt-2 text-slate-600">
                Gebruik deze bronnen als startpunt en stuur altijd de exacte modelpagina mee bij je aanvraag.
              </p>
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

        <section className="px-6 pb-12 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <Reveal className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm">
              <h2 id="vergelijking" className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Welke bron kies je best per use-case?
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Deze tabel maakt platformkeuze sneller voor AI-snippets, vergelijkingen en intakegesprekken.
              </p>
              <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                  <caption className="sr-only">Vergelijking van platformen voor printbare 3D modellen</caption>
                  <thead className="bg-slate-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-semibold text-slate-800">
                        Platform
                      </th>
                      <th scope="col" className="px-4 py-3 font-semibold text-slate-800">
                        Beste voor
                      </th>
                      <th scope="col" className="px-4 py-3 font-semibold text-slate-800">
                        Kwaliteitssignaal
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {sources.map((source) => (
                      <tr key={`table-${source.name}`}>
                        <td className="px-4 py-3 align-top">
                          <Link href={source.url} target="_blank" rel="noreferrer" className="font-semibold text-indigo-700 hover:underline">
                            {source.name}
                          </Link>
                        </td>
                        <td className="px-4 py-3 align-top text-slate-700">{source.bestFor}</td>
                        <td className="px-4 py-3 align-top text-slate-700">{source.qualitySignal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-6 pb-12 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <Reveal className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
              <GlassCard className="p-6 sm:p-8">
                <h2 id="aanpak" className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Hoe verwerken wij je model-link in de praktijk?
                </h2>
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
                    Prijzen en levertijden
                  </Link>
                </div>
              </GlassCard>

              <GlassCard className="p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-slate-900">Kleine intake-checklist</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li>- Voeg de link toe met exact welke onderdelen je wil printen.</li>
                  <li>- Noteer gewenste schaal (mm) en eventuele tekst/logo vereisten.</li>
                  <li>- Geef gebruikscontext door (binnen, buiten, hitte, impact).</li>
                  <li>- Voeg screenshot toe als de listing meerdere varianten bevat.</li>
                </ul>
              </GlassCard>
            </Reveal>
          </div>
        </section>

        <section className="px-6 pb-12 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <Reveal className="grid gap-6 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">Ook modelleren</p>
                <h2 id="modelleren" className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Wanneer kies je beter voor modelleren op maat?
                </h2>
                <p className="mt-2 text-sm text-slate-700">
                  We modelleren in Fusion 360 of Tinkercad wanneer een bestaand STL-bestand niet klopt of wanneer je
                  een volledig eigen onderdeel nodig hebt.
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
                <h3 className="text-lg font-semibold text-slate-900">Typische signalen voor maatwerk</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li>- Bestaande STL heeft foute toleranties of te veel supports.</li>
                  <li>- Je wil branding of vormdetails die je online niet vindt.</li>
                  <li>- Assemblagepunten, inserts of schroefdraad moeten exact kloppen.</li>
                  <li>- Je wil eerst testprints en daarna een kleine serie.</li>
                </ul>
              </GlassCard>
            </Reveal>
          </div>
        </section>

        <section className="px-6 pb-12 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <Reveal className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm">
              <h2 id="bronnen" className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Welke bronnen gebruiken we voor deze gids?
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {references.map((reference) => (
                  <li key={reference.url}>
                    <cite className="not-italic">
                      <Link href={reference.url} target="_blank" rel="noreferrer" className="text-indigo-700 hover:underline">
                        {reference.label}
                      </Link>
                    </cite>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section id="faq" className="mx-auto mb-16 max-w-5xl px-6 sm:px-8 lg:px-12">
          <Faq title="FAQ over modellen vinden" items={faqItems} />
        </section>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    </main>
  )
}
