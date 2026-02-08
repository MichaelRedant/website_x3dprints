import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"
import { buildArticleJsonLd } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/blog/filament-vrijdag-pla-glow/"
const publishedDate = "2025-10-17T08:00:00+02:00"
const dateModified = "2026-02-08"

export const metadata: Metadata = {
  title: "PLA Glow 3D printen: lichtgevende prints zonder batterij | X3DPrints",
  description:
    "Filament Vrijdag #6. Alles over PLA Glow: glow-in-the-dark PLA eigenschappen, instellingen, nozzlekeuze en toepassingen voor interieur, design en cosplay.",
  alternates: { canonical },
  openGraph: {
    title: "PLA Glow 3D printen: lichtgevende prints zonder batterij",
    description:
      "PLA Glow uitgelegd door X3DPrints: hoe glow-in-the-dark PLA werkt, welke instellingen wij gebruiken en wanneer glow echt meerwaarde biedt.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["PLA Glow", "Glow in the dark filament", "Filament Vrijdag", "3D print materiaal"],
    images: [
      {
        url: "/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "PLA Glow filament advies door X3DPrints",
      },
    ],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filament Vrijdag: PLA Glow 3D printen",
    description: "PLA Glow instellingen, nozzlekeuze en toepassingen voor interieur, signage, design en cosplay.",
    images: ["/images/og-home.jpg"],
  },
}

const heroStats = [
  {
    label: "Aanbevolen nozzle",
    value: "Hardened 0.4-0.6 mm",
    detail: "Glow pigment is licht abrasief",
  },
  {
    label: "Materiaalbasis",
    value: "PLA + fosforescent pigment",
    detail: "Gedraagt zich grotendeels als PLA",
  },
  {
    label: "Typische toepassingen",
    value: "Signage · props · veiligheid",
    detail: "Glow moet waarde toevoegen",
  },
]

const printSettings = [
  { label: "Nozzle", value: "205-220 degC", note: "Start rond je PLA-profiel, hoger voor grotere nozzles" },
  { label: "Bed", value: "55-60 degC", note: "PEI of glas met lijm, net als standaard PLA" },
  { label: "Snelheid", value: "40-70 mm/s", note: "Iets trager voor consistente glow en minder slijtage" },
  { label: "Koeling", value: "80-100%", note: "Hou tekst/logo’s strak" },
  { label: "Layerhoogte", value: "0.16-0.28 mm", note: "Grotere lagen = sterkere glow en zachtere look" },
  { label: "Retraction", value: "0.8-1.2 mm", note: "Conservatief houden om stringing te beperken" },
]

const whenToUse = [
  "Cosplay props, armor en accessoires die in het donker moeten opvallen.",
  "Interieuraccenten zoals nachtlichtjes, subtiele glow-details of signalisatie.",
  "Marketing- en eventprops waar glow een duidelijk wow-effect geeft.",
  "Veiligheids- of aanduidingselementen (nooduitgangpijlen, markers, keycaps).",
  "Logo’s en belettering die in schemer of avondlicht extra karakter krijgen.",
]

const whenToAvoid = [
  "Functionele brackets of machineonderdelen waar glow geen waarde toevoegt.",
  "Projecten met hoge mechanische belasting – gebruik PETG of TPU.",
  "Extreem kleine details: pigment kan microdetail maskeren.",
  "Cases die langdurig in direct zonlicht liggen (glow degradeert sneller bij UV).",
]

const comparisonRows = [
  {
    property: "Printgemak",
    pla: "Zeer hoog; standaardprofiel.",
    glow: "Hoog; als PLA, let op abrasiviteit.",
    petg: "Gemiddeld; meer tuning nodig.",
  },
  {
    property: "Abrasiviteit",
    pla: "Niet abrasief.",
    glow: "Licht abrasief door pigment.",
    petg: "Niet abrasief (zonder fillers).",
  },
  {
    property: "Glow / zichtbaarheid",
    pla: "Geen.",
    glow: "Sterke glow na belichting, afhankelijk van pigment en wanddikte.",
    petg: "Geen, tenzij speciale blend.",
  },
  {
    property: "Temperatuurresistentie",
    pla: "Wordt zacht rond 55-60 degC.",
    glow: "Zelfde orde als PLA.",
    petg: "Tot ca. 80 degC bruikbaar.",
  },
  {
    property: "Typische toepassingen",
    pla: "Prototypes, decor, marketingprops.",
    glow: "Cosplay, signage, playful design.",
    petg: "Functionele onderdelen, outdoor.",
  },
  {
    property: "Hardware-eisen",
    pla: "Messing nozzle volstaat.",
    glow: "Hardened nozzle aanbevolen.",
    petg: "Messing nozzle ok, drogen aanbevolen.",
  },
]

const mitigationTips = [
  {
    title: "Abrasie onder controle houden",
    insight:
      "Gebruik een geharde nozzle als je frequent glow print en vermijd extreem hoge snelheden. Bundel glow-jobs zodat hardwarewissels beperkt blijven.",
  },
  {
    title: "Glow-intensiteit maximaliseren",
    insight:
      "Voorzie 2-3 perimeterwanden en een voldoende dikke infill zodat pigment genoeg licht kan vasthouden. Laad prints op met een sterke lichtbron of UV-lamp.",
  },
  {
    title: "Stringing en ruwe oppervlakken verminderen",
    insight:
      "Hou filament droog, pas retraction in kleine stappen aan en verlaag indien nodig de nozzletemperatuur met 5 degC.",
  },
  {
    title: "Leesbaarheid van tekst en logo’s",
    insight:
      "Vermijd superkleine letterhoogtes; pigmenten maken microdetail minder scherp dan effen PLA. Werk met duidelijke contrasten.",
  },
]

const resourceLinks = [
  { label: "3D printen pillar", href: "/3d-printen", description: "Workflow, materialen en typische projecten." },
  { label: "Materialenbibliotheek", href: "/materials", description: "PLA Glow, Marble, Matte en andere visuals in één overzicht." },
  { label: "Prijzen en calculator", href: "/pricing", description: "Zie de impact van materiaalkeuze op je offerte." },
  { label: "Material Suggestion Tool", href: "/materials#material-suggestion-tool", description: "Laat de wizard een voorstel doen." },
]

const references = [
  {
    label: "Bambu Lab – PLA gids",
    href: "https://wiki.bambulab.com/en/filament/pla",
    description: "Baseline instellingen voor PLA (incl. glow-opmerkingen) op X1/P1 printers.",
  },
  {
    label: "How Glow-in-the-Dark Filament Works",
    href: "https://3dbeginnerzone.com/3d-printing-basics/how-glow-in-the-dark-filament-works/",
    description: "Uitleg over strontiumaluminaat pigment en het opladen van glow prints.",
  },
  {
    label: "Tips for 3D Printing Glow PLA",
    href: "https://www.microcenter.com/site/mc-news/article/how-to-print-with-glow-pla.aspx",
    description: "Praktische nozzle-, snelheid- en opslagadviezen.",
  },
  {
    label: "Prusa – Different nozzle types",
    href: "https://help.prusa3d.com/article/different-nozzle-types_2193",
    description: "Waarom abrasieve filamenten (zoals PLA Glow) een geharde nozzle vragen.",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "PLA Glow 3D printen: lichtgevende prints zonder batterij",
  description: "Filament Vrijdag #6. Leer hoe PLA Glow werkt, welke instellingen je gebruikt en wanneer glow-in-the-dark PLA echt waarde toevoegt.",
  datePublished: publishedDate,
  dateModified,
  image: "https://www.x3dprints.be/images/og-home.jpg",
})



const lastUpdatedLabel = "Laatst bijgewerkt: 8 februari 2026"

function SectionDivider() {
  return (
    <div className="mx-auto my-10 flex w-full max-w-4xl items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-500">
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-indigo-300/0 via-indigo-300/60 to-indigo-300/0" />
      <span>Filament Vrijdag</span>
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-indigo-300/0 via-indigo-300/60 to-indigo-300/0" />
    </div>
  )
}

export default function FilamentVrijdagPlaGlowPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(160%_90%_at_50%_-20%,rgba(79,70,229,0.22),transparent_75%)]"
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
                <li className="font-medium text-slate-900">PLA Glow</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Filament Vrijdag #6</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              PLA Glow 3D printen: wanneer lichtgevende filamenten zinvol zijn.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              PLA Glow is de eenvoudigste manier om een lichtgevend effect toe te voegen zonder elektronica. De pigmenten slaan licht op en geven dit langzaam terug. Ideaal voor props, signage en veiligheidstoepassingen, zolang glow echt waarde
              toevoegt. In deze editie delen we de instellingen, hardwaretips en use cases die wekelijks in de studio passeren.
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="stacked-actions mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <ShimmerButton href="/contact?material=PLA%20Glow">Vraag PLA Glow advies</ShimmerButton>
              <Link
                href="/materials"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Materialen bibliotheek
              </Link>
              <Link
                href="/3d-printen"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Terug naar pillar
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">Gepubliceerd op 17 oktober 2025 – na PLA Marble & specials.</p>
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

      <SectionDivider />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Wat is PLA Glow precies?</h2>
              <p className="mt-3 text-sm text-slate-600">
                Glow-in-the-dark PLA bevat fosforescerende deeltjes (meestal strontiumaluminaat) die lichtenergie opslaan en later afgeven. Mechanisch blijft het PLA: rigide, detailrijk, maar niet hittebestendig. Pigment zorgt voor een licht
                ruwe filamentoppervlakte en slijt messing nozzles sneller, vandaar het advies om geharde nozzles te gebruiken bij regelmatige glow runs.
              </p>
              <p className="mt-3 text-sm text-slate-600">
                Werk je met Bambu-printers? De{" "}
                <Link href="https://wiki.bambulab.com/en/filament/pla" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline underline-offset-4">
                  Bambu Lab PLA gids
                </Link>{" "}
                vermeldt expliciet dat glow-filament meer wrijving geeft in AMS Lite setups en raadt aan om de extruder en nozzle geregeld te inspecteren.
              </p>
              <p className="mt-3 text-sm text-slate-600">Gebruik glow als het concept er beter van wordt, niet omdat het toevallig kan.</p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Wanneer wel of niet inzetten?</h2>
              <div>
                <p className="text-sm font-semibold text-slate-900">PLA Glow is perfect voor:</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {whenToUse.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
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

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">Printinstellingen voor PLA Glow</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Vertrek van je PLA-profiel en tweak vooral nozzle, snelheid en koeling. Onderstaande ranges gebruiken we op Bambu X1C, maar vertalen vlot naar Prusa, Creality en Voron.
                  </p>
                </div>
                <Link
                  href="/materials#material-suggestion-tool"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-indigo-700"
                >
                  Laat de wizard mee denken
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
              <p className="mt-4 text-xs text-slate-500">Combineer glow-jobs om nozzlewissels te beperken en slijtage te spreiden.</p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Issues en oplossingen</h2>
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
              <h2 className="text-2xl font-semibold text-slate-900">PLA vs PLA Glow vs PETG</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-slate-500">
                      <th className="py-2 pr-4">Eigenschap</th>
                      <th className="py-2 pr-4">PLA</th>
                      <th className="py-2 pr-4">PLA Glow</th>
                      <th className="py-2 pr-4">PETG</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {comparisonRows.map((row) => (
                      <tr key={row.property}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{row.property}</td>
                        <td className="py-3 pr-4">{row.pla}</td>
                        <td className="py-3 pr-4">{row.glow}</td>
                        <td className="py-3 pr-4">{row.petg}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Combineer deze blog met de{" "}
                <Link href="/blog/filament-vrijdag-pla" className="text-indigo-600 underline underline-offset-4">
                  PLA editie
                </Link>{" "}
                en{" "}
                <Link href="/blog/filament-vrijdag-petg" className="text-indigo-600 underline underline-offset-4">
                  PETG aflevering
                </Link>{" "}
                om de volledige materiaalrange te begrijpen.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-6">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">PLA Glow in de praktijk</h2>
              <p className="mt-2 text-sm text-slate-600">Glow is geen gimmick wanneer je het doelgericht inzet:</p>
              <ul className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                <li className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Interieur & design</p>
                  <p className="mt-2">Accentdetails in lampenkappen, wanddecor of logo-inlays die in schemerlicht tot leven komen.</p>
                </li>
                <li className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Cosplay & props</p>
                  <p className="mt-2">Runen, panel lines en symbolen die oplichten tijdens shoots of op donkere conventievloeren.</p>
                </li>
                <li className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Signage & veiligheid</p>
                  <p className="mt-2">Pijlen en markers die ook zonder stroom zichtbaar blijven.</p>
                </li>
                <li className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Marketing & events</p>
                  <p className="mt-2">Giveaways en displays met een echt “lichtmoment” zonder extra elektronica.</p>
                </li>
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Wanneer PLA Glow bestellen?</h2>
              <p className="mt-2 text-sm text-slate-600">Typische verzoeken in de studio:</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                  <span>Cosplayonderdelen met glow runen, symbolen of accenten.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                  <span>Interieurprops (nachtlichtjes, signage) die overdag subtiel en ’s avonds zichtbaar moeten zijn.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                  <span>Veiligheidsmarkeringen of keycaps die in het donker terug te vinden zijn.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                  <span>Eventprops met een opvallend glow-moment zonder batterijen.</span>
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <ShimmerButton href="/contact?material=PLA%20Glow">Plan een PLA Glow print</ShimmerButton>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Bekijk tarieven & calculator
                </Link>
              </div>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Filament Vrijdag roadmap</h2>
              <p className="mt-2 text-sm text-slate-600">
                Glow past in dezelfde SEO-cluster als PLA, PETG, TPU en special materials. Vanaf elke blog linken we naar de 3D printen pillar, materialen, pricing en contact zodat zowel bezoekers als Google de volledige context zien.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                  <Link href="/blog/filament-vrijdag-pla" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                    Filament Vrijdag #1: PLA 3D printen
                  </Link>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                  <Link href="/blog/filament-vrijdag-petg" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                    Filament Vrijdag #2: PETG 3D printen
                  </Link>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                  <Link href="/blog/filament-vrijdag-tpu" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                    Filament Vrijdag #3: TPU 3D printen
                  </Link>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                  <Link
                    href="/blog/filament-vrijdag-pla-wood"
                    className="font-semibold text-indigo-600 transition hover:text-indigo-500"
                  >
                    Filament Vrijdag #4: PLA Wood & specials
                  </Link>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                  <Link
                    href="/blog/filament-vrijdag-pla-marble"
                    className="font-semibold text-indigo-600 transition hover:text-indigo-500"
                  >
                    Filament Vrijdag #5: PLA Marble & esthetische materialen
                  </Link>
                </li>
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

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
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Bronnen en referenties</h2>
              <p className="mt-2 text-sm text-slate-600">
                Wil je zelf experimenteren met glow filament, dan zijn dit betrouwbare startpunten met concrete instellingen en hardwaretips.
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {references.map((ref) => (
                  <li key={ref.href} className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                    <Link
                      href={ref.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-semibold text-indigo-600 transition hover:text-indigo-500"
                    >
                      {ref.label}
                    </Link>
                    <p className="mt-1">{ref.description}</p>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <GlassCard className="flex flex-col gap-6 border border-white/40 bg-white/85 p-6 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Volgende stap</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Twijfel je tussen Marble, Glow of gewoon PLA?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Deel STL of STEP, vertel waar het onderdeel terechtkomt en we koppelen er een eerlijk advies aan. Soms is PLA Glow perfect, soms is PLA Marble of Matte visueel sterker en budgettair slimmer.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/contact?material=PLA%20Glow">Start materiaal intake</ShimmerButton>
                <Link href="/pricing" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Bekijk tarieven & workflow
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <BlogReadMore />

    </main>
  )
}









