import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"

import { buildArticleJsonLd } from "@/lib/seo"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"
import BlogFaq from "@/components/BlogFaq"
import { BLOG_FAQ } from "@/content/blog-faq"

const canonical = "https://www.x3dprints.be/blog/filament-vrijdag-tpu/"
const publishedDate = "2025-09-19T08:00:00+02:00"
const dateModified = "2026-02-09"
const faq = BLOG_FAQ["filament-vrijdag-tpu"]
const materialsGuideHref =
  "/blog/3d-print-materialen-gids?utm_source=blog&utm_medium=internal&utm_campaign=filament-vrijdag-tpu"

export const metadata: Metadata = {
  title: "TPU 3D Printen: Flexibel, sterk en schokdempend | X3DPrints",
  description:
    "Filament Vrijdag #3. Alles over TPU: flexibel filament voor bumpers, grips en demping. Instellingen, toepassingen en vergelijking met PLA en PETG.",
  alternates: { canonical },
  openGraph: {
    title: "TPU 3D Printen: Flexibel, sterk en schokdempend",
    description:
      "TPU uitgelegd door X3DPrints: wanneer je flexibele onderdelen nodig hebt, welke instellingen werken en waar de grenzen liggen.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["TPU 3D printen", "Filament Vrijdag", "3D print materiaal"],
    images: [
      {
        url: "/images/og-home-nl.svg",
        width: 1200,
        height: 630,
        alt: "TPU filament advies door X3DPrints",
      },
    ],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filament Vrijdag #3: TPU 3D Printen gids",
    description:
      "TPU eigenschappen, instellingen en typische toepassingen voor flexibele, schokdempende onderdelen. Uitgelegd door een lokale 3D print studio.",
    images: ["/images/og-home-nl.svg"],
  },
}

const heroStats = [
  { label: "Shore hardheid", value: "ca. 95A", detail: "Flexibel maar nog goed stuurbaar" },
  { label: "Nozzle bereik", value: "215-235 C", detail: "Start rond 220 C en verfijn per merk" },
  { label: "Aanbevolen snelheid", value: "20-35 mm/s", detail: "Rustig houden voor consistente flow" },
]

const tpuVariants = [
  {
    name: "TPU 95A",
    description:
      "Standaard blend: stevig genoeg voor gecontroleerd printen, flexibel genoeg voor bumpers en grips.",
    bestFor: ["Bumpers", "Protective sleeves", "Ergonomische grips"],
  },
  {
    name: "TPU Soft (lager dan 95A)",
    description:
      "Zachter en rubberachtiger gevoel. Complexer om te printen, maar ideaal wanneer demping primeert.",
    bestFor: ["Dempers", "Voetjes", "Pakkingachtige onderdelen"],
  },
  {
    name: "TPU blends",
    description: "Hybride blends voor extra chemische weerstand of net een andere tactile feel.",
    bestFor: ["Industrieel maatwerk", "OEM requests", "Specifieke niche toepassingen"],
  },
]

const printSettings = [
  { label: "Nozzle", value: "215-235 C", note: "Start rond 220 C en verhoog alleen als flow achterloopt" },
  { label: "Bed", value: "40-60 C", note: "Warm voor hechting, koel om onderdelen makkelijk los te maken" },
  { label: "Snelheid", value: "20-35 mm/s", note: "TPU haat haast: liever traag en voorspelbaar" },
  { label: "Koeling", value: "30-60%", note: "Net genoeg voor detail zonder layer bonding te verzwakken" },
  { label: "Retraction", value: "0.4-0.8 mm", note: "Minimaal houden om jams in de extruder te vermijden" },
]

const whenToUse = [
  "Onderdelen die impact of schokken moeten opvangen.",
  "Bumpers, covers en beschermhoezen rond toestellen of sensoren.",
  "Grips, handgrepen en ergonomische hulpen die comfortabel moeten aanvoelen.",
  "Voetjes en dempers onder toestellen om trillingen en geluid te beperken.",
  "Klemmen of clips die herhaaldelijk gebogen worden zonder te breken.",
]

const whenToAvoid = [
  "Ultra nauwkeurige miniaturen waar elke string storend is.",
  "Structuren die extreem maatvast moeten blijven onder belasting.",
  "Zeer hoge temperaturen of agressieve chemicalien (dan richting nylon of ASA).",
  "Printers met een onbetrouwbare filamentbaan of lange Bowden setup.",
]

const comparisonRows = [
  {
    property: "Printgemak",
    pla: "Zeer hoog; quasi plug-and-play.",
    petg: "Gemiddeld; vraagt tuning rond stringing en bedhechting.",
    tpu: "Laag tot gemiddeld; filamentpad en snelheid zijn cruciaal.",
  },
  {
    property: "Temperatuur",
    pla: "Wordt zacht rond 55-60 C.",
    petg: "Blijft bruikbaar tot circa 80 C.",
    tpu: "Zelf redelijk temperatuurstabiel, maar vervormbaar onder druk.",
  },
  {
    property: "Taaiheid",
    pla: "Eerder bros bij impact.",
    petg: "Buigt of vervormt voor het breekt.",
    tpu: "Extreem taai; rekt en veert terug zonder barsten.",
  },
  {
    property: "Buiten / vocht",
    pla: "Veroudert en vervormt sneller buiten.",
    petg: "Heel geschikt voor buiten en vochtige omgevingen.",
    tpu: "Vaak ok buiten, afhankelijk van blend en toepassing.",
  },
  {
    property: "Afwerking",
    pla: "Strak, veel decoratieve varianten.",
    petg: "Semi-glans, lichte stringing wanneer profiel niet klopt.",
    tpu: "Rubber look, printlijnen zichtbaar maar functioneel onopvallend.",
  },
  {
    property: "Kost per print",
    pla: "Laagste materiaalprijs en kortste printtijd.",
    petg: "Iets duurder en meestal rustiger geprint.",
    tpu: "Materiaal is duurder en prints duren langer door lagere snelheid.",
  },
]

const mitigationTips = [
  {
    title: "Filamentbaan controleren",
    insight:
      "Houd de filamentbaan zo recht en kort mogelijk. Direct drive of een omgebouwde Bowden voorkomt knikken in het filament.",
  },
  {
    title: "Stringing en oozing beperken",
    insight:
      "Verlaag nozzle temperatuur in kleine stappen, vermijd agressieve retraction en houd spools droog. Liever een beetje stringing dan onderextrusie.",
  },
  {
    title: "Dimensionale nauwkeurigheid",
    insight:
      "Hou rekening met terugveer. Voor pasvormen is een testprint met kritieke maten geen luxe, zeker bij koppelingen of sleeves.",
  },
  {
    title: "Bedhechting en verwijderen",
    insight:
      "Gebruik een licht getextureerd bed of een dunne lijmlaag. Laat het bed afkoelen voordat je onderdelen losmaakt om scheuren te vermijden.",
  },
]

const resourceLinks = [
  { label: "3D printen pillar", href: "/3d-printen", description: "Overzicht van workflow, materiaalkeuzes en cases." },
  { label: "TPU materiaalfiche", href: "/materials/tpu", description: "Swatches, voorraad en FAQ voor TPU prints." },
  {
    label: "Prijzen en calculator",
    href: "/pricing",
    description: "Zie de impact van lage printsnelheid en extra machine-uren op je budget.",
  },
  {
    label: "Material Suggestion Tool",
    href: "/materials#material-suggestion-tool",
    description: "Laat de wizard beslissen tussen PLA, PETG en TPU op basis van je toepassing.",
  },
]

const references = [
  {
    label: "Prusa Knowledge Base - Flexibele materialen",
    href: "https://help.prusa3d.com/category/flexible-materials_210",
    description: "Richtlijnen voor TPU: snelheden, retraction en hardwaretips.",
  },
  {
    label: "Ultimaker Support - TPU 95A",
    href: "https://support.ultimaker.com/hc/en-us/articles/360011982059-About-Ultimaker-TPU-95A",
    description: "Eigenschappen en aanbevolen toepassingen voor een typische 95A TPU.",
  },
  {
    label: "MatterHackers - TPU filament guide",
    href: "https://www.matterhackers.com/articles/how-to-succeed-when-printing-with-flexible-filament",
    description: "Praktische gids voor flexibel filament, inclusief troubleshooting.",
  },

]

const upcomingPosts = [
  { label: "Filament Vrijdag #4: PLA Wood & specials (26 september 2025)", href: "/blog/filament-vrijdag-pla-wood" },
  { label: "Filament Vergelijking: welk filament kies je?", href: "/blog" },
  { label: "Use cases: hoe klanten TPU in de praktijk inzetten", href: "/blog/use-cases-tpu" },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "TPU 3D Printen: Flexibel, sterk en schokdempend",
  description: "Filament Vrijdag #3 van X3DPrints. Leer wanneer TPU slimmer is dan PLA of PETG, welke instellingen werken en hoe je het inzet voor flexibele onderdelen.",
  datePublished: publishedDate,
  dateModified,
  image: "https://www.x3dprints.be/images/og-home-nl.svg",
})



const lastUpdatedLabel = "Laatst bijgewerkt: 9 februari 2026"

function SectionDivider() {
  return (
    <div className="mx-auto my-10 flex w-full max-w-4xl items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-500">
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-indigo-300/0 via-indigo-300/60 to-indigo-300/0" />
      <span>Filament Vrijdag</span>
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-indigo-300/0 via-indigo-300/60 to-indigo-300/0" />
    </div>
  )
}

export default function FilamentVrijdagTpuPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(160%_90%_at_50%_-20%,rgba(79,70,229,0.18),transparent_75%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.08]" />

      <section className="px-6 pb-12 pt-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal className="stacked-content">
            <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
              <ol className="flex flex-wrap gap-2">
                <li>
                  <Link
                    href="/blog"
                    className="font-medium text-indigo-600 transition hover:text-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Blog
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-700">Filament Vrijdag</li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-900">TPU 3D printen</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Filament Vrijdag #3</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              TPU 3D printen: flexibel, schokdempend en verrassend robuust.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              TPU haal je erbij wanneer onderdelen mogen buigen, indrukken en terugveren zonder op te geven. Denk aan bumpers,
              grips, sleeves en dempers. Het print anders dan PLA of PETG en beloont geduld met onderdelen die in de praktijk
              veel miserie uitsparen. In deze Filament Vrijdag tonen we waar TPU schittert, welke instellingen we gebruiken en
              wanneer je beter bij een hard materiaal blijft.
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="stacked-actions mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <ShimmerButton href="/contact?material=TPU">Vraag TPU advies</ShimmerButton>
              <Link
                href="/materials/tpu"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Bekijk TPU fiche
              </Link>
              <Link
                href="/materials#material-suggestion-tool"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Material Suggestion Tool
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">
              Gepubliceerd op 19 september 2025 - Vorige Filament Vrijdag: PETG (12 september 2025).
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 rounded-3xl border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{stat.label}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-600">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <SectionDivider />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Wat is TPU eigenlijk?</h2>
              <p className="mt-3 text-sm text-slate-600">
                TPU staat voor thermoplastisch polyurethaan. Het combineert rubberachtige eigenschappen met de mogelijkheid om
                te smelten en extruderen. Prints buigen, rekken en keren daarna terug naar hun originele vorm.
              </p>
              <p className="mt-3 text-sm text-slate-600">
                In onze studio werken we vooral met blends rond shore 95A. Die zijn zacht genoeg voor bumpers en grips maar nog
                makkelijk bestuurbaar op een direct-drive printer zoals de Bambu X1C of P1S. Ook AMS runs blijven voorspelbaar
                zolang het filament droog blijft.
              </p>
              <p className="mt-3 text-sm text-slate-600">
                TPU absorbeert klappen en vibraties waar PLA of PETG breken of vervormen. Het is dus perfect als buffer tussen
                harde onderdelen en de buitenwereld.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Wanneer kies je voor TPU?</h2>
              <div>
                <p className="text-sm font-semibold text-slate-900">TPU is de juiste keuze wanneer:</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {whenToUse.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <p className="text-sm font-semibold text-slate-900">Kies beter een ander materiaal wanneer:</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {whenToAvoid.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">Printinstellingen uit de studio</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    TPU print je trager en met minder retraction dan PLA of PETG. Onderstaande bandbreedtes gebruiken we op de
                    Bambu X1C. Ze vertalen goed naar andere printers zolang de filamentbaan strak en kort gehouden wordt.
                  </p>
                </div>
                <Link
                  href="/materials#material-suggestion-tool"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-indigo-700"
                >
                  Laat de wizard materiaal kiezen
                </Link>
              </div>
              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                {printSettings.map((setting) => (
                  <div key={setting.label} className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                    <dt className="text-xs uppercase tracking-[0.3em] text-slate-500">{setting.label}</dt>
                    <dd className="mt-2 text-xl font-semibold text-slate-900">{setting.value}</dd>
                    <p className="text-sm text-slate-600">{setting.note}</p>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs text-slate-500">
                TPU profiteert sterk van droge opslag. Een paar uur in een filament dryer of AMS met droogfunctie doet wonderen.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-6">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">TPU varianten in de praktijk</h2>
              <p className="mt-2 text-sm text-slate-600">
                Niet elke TPU voelt hetzelfde aan. De ene blend is net stevig genoeg om grip te geven, de andere hangt dichter
                tegen echt rubber aan. In de studio houden we 95A standaard op stock en vullen we aan met zachtere of speciale
                blends op aanvraag.
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Op de{" "}
                <Link href="/materials/tpu" className="text-indigo-600 underline underline-offset-4">
                  TPU materiaalfiche
                </Link>{" "}
                zie je welke varianten en kleuren we standaard klaar hebben en hoe snel we specials kunnen bestellen.
              </p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {tpuVariants.map((variant) => (
                  <div key={variant.name} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-500/80 to-emerald-500/80" aria-hidden />
                      <div>
                        <h3 className="text-base font-semibold text-slate-900">{variant.name}</h3>
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Studio verified</p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-slate-600">{variant.description}</p>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Best voor</p>
                    <ul className="mt-2 space-y-1 text-sm text-slate-600">
                      {variant.bestFor.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Veelvoorkomende issues en hoe we ze opvangen</h2>
              <div className="mt-4 space-y-4 text-sm text-slate-600">
                {mitigationTips.map((tip) => (
                  <div key={tip.title}>
                    <h3 className="text-base font-semibold text-slate-900">{tip.title}</h3>
                    <p className="mt-1">{tip.insight}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">PLA vs PETG vs TPU</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-slate-500">
                      <th className="py-2 pr-4">Eigenschap</th>
                      <th className="py-2 pr-4">PLA</th>
                      <th className="py-2 pr-4">PETG</th>
                      <th className="py-2 pr-4">TPU</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {comparisonRows.map((row) => (
                      <tr key={row.property}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{row.property}</td>
                        <td className="py-3 pr-4">{row.pla}</td>
                        <td className="py-3 pr-4">{row.petg}</td>
                        <td className="py-3 pr-4">{row.tpu}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Meer nuance nodig? Combineer deze blog met de PETG editie en de PLA Filament Vrijdag om per onderdeel de juiste
                keuze te maken.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Kostprijs, snelheid en verwachtingen</h2>
              <p className="mt-2 text-sm text-slate-600">
                TPU zelf is duurder dan standaard PLA en wordt trager geprint. Je betaalt dus vooral voor machine-uren, droogtijd
                en specialistische setup. Dat is logisch als je weet hoeveel schade een goede bumper of demper kan voorkomen.
              </p>
              <ul className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                <li className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Planningstip</p>
                  <p className="mt-2">
                    Bundel TPU onderdelen in een projectbatch. Zo kunnen we een profiel volledig op TPU optimaliseren en verlies
                    je geen tijd aan wissels.
                  </p>
                </li>
                <li className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Sales insight</p>
                  <p className="mt-2">
                    Positioneer TPU als risicobeperking: minder breuk, minder retouren, betere user experience. Dat maakt de
                    meerprijs verdedigbaar in elk project.
                  </p>
                </li>
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Op de{" "}
                <Link href="/pricing" className="text-indigo-600 underline underline-offset-4">
                  pricing pagina
                </Link>{" "}
                zie je hoe materiaalkeuze, snelheid en nabewerking doorwerken in de uiteindelijke offerte.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Wanneer TPU bestellen bij X3DPrints?</h2>
              <p className="mt-2 text-sm text-slate-600">
                TPU komt bijna altijd in beeld wanneer er iets beschermd, gedempt of comfortabel gemaakt moet worden. Typische cases:
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                  <span>Beschermhoezen rond meetapparatuur, handheld devices of sensoren.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                  <span>Soft-touch grips op knoppen, hendels of tools.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                  <span>Voetjes en pads onder toestellen om trillingen en lawaai te beperken.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                  <span>Klemmen of click systemen die vaak gebogen worden en toch moeten blijven werken.</span>
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <ShimmerButton href="/contact?material=TPU">Plan een TPU print</ShimmerButton>
                <Link
                  href="/materials/tpu"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Check TPU voorraad
                </Link>
              </div>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Filament Vrijdag roadmap</h2>
              <p className="mt-2 text-sm text-slate-600">
                Met PLA, PETG en nu TPU staat de basis van de materiaalcluster. Volgende afleveringen bouwen verder met specials
                en vergelijkingen zodat klanten de juiste keuze maken.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {upcomingPosts.map((item) => (
                  <li key={item.label} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                    <Link href={item.href} className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Interne resources</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {resourceLinks.map((resource) => (
                  <div key={resource.href} className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{resource.label}</p>
                    <p className="mt-2 text-sm text-slate-600">{resource.description}</p>
                    <Link
                      href={resource.href}
                      className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
                    >
                      Naar {resource.label}
                      <span aria-hidden>-&gt;</span>
                    </Link>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Meer context? Lees de{" "}
                <Link href={materialsGuideHref} className="font-semibold text-emerald-600 hover:text-emerald-700">
                  3D print materialen gids
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 id="sources" className="text-2xl font-semibold text-slate-900">Bronnen en referenties</h2>
              <p className="mt-2 text-sm text-slate-600">
                Wil je zelf nog dieper in TPU duiken, dan zijn dit goede vertrekpunten. Combineer ze met de praktijkervaring uit
                deze blog en je komt snel tot stabiele profielen.
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {references.map((ref) => (
                  <li key={ref.href} className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                    <cite className="not-italic">
                      <Link
                        href={ref.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base font-semibold text-indigo-600 transition hover:text-indigo-500"
                      >
                        {ref.label}
                      </Link>
                    </cite>
                    <p className="mt-1">{ref.description}</p>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <GlassCard className="flex flex-col gap-6 border border-white/40 bg-white/85 p-6 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Volgende stap</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Twijfel je of TPU nodig is?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Stuur STL of STEP door, vertel wat het onderdeel moet overleven en we koppelen er een eerlijk materiaaladvies
                  aan. Desnoods is het geen TPU en zeggen we dat ook gewoon.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/contact?material=TPU">Start materiaal intake</ShimmerButton>
                <Link href="/3d-printen" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Lees verder op de 3D printen pagina
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <BlogFaq title={faq.title} items={faq.items} mainEntityOfPage={canonical} />


      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <BlogAuthorNote locale="nl" />


    </main>
  )
}









