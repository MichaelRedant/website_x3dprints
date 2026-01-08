import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/blog/filament-vrijdag-pla-marble"
const publishedDate = "2025-10-10T08:00:00+02:00"

export const metadata: Metadata = {
  title: "PLA Marble 3D printen: steenlook zonder gewicht | X3DPrints",
  description:
    "Filament Vrijdag #5. Alles over PLA Marble: varianten, instellingen en use cases voor interieur, retail en cosplay – plus waarom finishing meestal overbodig is.",
  alternates: { canonical },
  openGraph: {
    title: "PLA Marble 3D printen: steenlook zonder gewicht",
    description:
      "PLA Marble uitgelegd door X3DPrints: blends, printinstellingen, troubleshooting en wanneer je beter een ander materiaal kiest.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["Filament Vrijdag", "PLA Marble", "Speciale PLA", "Design props"],
    images: [
      {
        url: "/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "PLA Marble advies door X3DPrints",
      },
    ],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filament Vrijdag #5: PLA Marble 3D printen",
    description: "Steenlook zonder gewicht: PLA Marble varianten, instellingen en toepassingen vanuit de X3DPrints studio.",
    images: ["/images/og-home.jpg"],
  },
}

const heroStats = [
  { label: "Layerhoogte", value: "0.16-0.28 mm", detail: "Grotere lagen = uitgesproken textuur" },
  { label: "Nozzleadvies", value: "0.4-0.6 mm", detail: "0.6 mm vlakt laaglijnen extra af" },
  { label: "Beste cases", value: "Interieur · Cosplay · Retail", detail: "Esthetiek primeert, niet sterkte" },
]

const marbleVariants = [
  {
    name: "PLA Marble Classic",
    description: "Subtiele spikkels in wit/grijs. Onze default voor sokkels, vazen en naamplaten in brandingprojecten.",
    bestFor: ["Interieurdecor", "Sokkels", "Premium give-aways"],
  },
  {
    name: "PLA Concrete / Stone",
    description: "Grovere korrel voor een betonlook. Laat architecturale modellen en displays zwaar ogen zonder massa.",
    bestFor: ["Architectuurmaquettes", "Retail displays", "Conceptmock-ups"],
  },
  {
    name: "PLA Granite Blend",
    description: "Meer contrast en kleurspatten. Populair voor cosplay armor en showpieces die op afstand moeten knallen.",
    bestFor: ["Cosplay armor", "Event props", "Beursdecor"],
  },
  {
    name: "PLA Marble Light",
    description: "Minimalistische Scandinavische tint die perfect past in lifestyle shoots en modern retailmeubilair.",
    bestFor: ["Lifestyle rekwisieten", "Retailprops", "Design prototypes"],
  },
]

const printSettings = [
  { label: "Nozzle", value: "195-215 degC", note: "Ga hoger voor donkere blends of 0.6 mm nozzle" },
  { label: "Bed", value: "55-60 degC", note: "PEI + lijmstift volstaat, nauwelijks warping" },
  { label: "Snelheid", value: "45-80 mm/s", note: "Langzamer voor strakke patronen op zichtvlakken" },
  { label: "Koeling", value: "80-100%", note: "Hou details crisp en voorkom pigmentophoping" },
  { label: "Layerhoogte", value: "0.16-0.28 mm", note: "Experimenteer; hogere lagen benadrukken de stone-look" },
  { label: "Retraction", value: "0.8-1.2 mm", note: "Microstringing vermijden bij pigmentrijke blends" },
]

const whenToUse = [
  "Interieurdecor en lifestyle props waar gewicht ongewenst is.",
  "Cosplay armor, props en accessoires die visueel zwaar moeten ogen.",
  "Retail- en beursdisplays die een luxueus, natuursteenachtig gevoel vragen.",
  "Architecturale modellen en mock-ups die klanten moeten overtuigen.",
  "Design prototypes en presentaties waar esthetiek primeert op sterkte.",
]

const whenToAvoid = [
  "Functionele onderdelen met impact of torsie – kies PETG of nylon.",
  "Outdoor projecten in direct zonlicht of nabij warmtebronnen.",
  "Dunne clips of flexibele onderdelen (dan kies je TPU of PETG).",
  "Budgetcases waar standaard PLA voldoende is.",
]

const comparisonRows = [
  {
    property: "Printgemak",
    marble: "Hoog; PLA-profiel met subtiele tweaks.",
    matte: "Zeer hoog; meest vergevingsgezind.",
    petg: "Gemiddeld; vraagt drogen en kalme snelheid.",
  },
  {
    property: "Layerlijnen",
    marble: "Pigmenten camoufleren lijnen van nature.",
    matte: "Diffuse finish vermindert lijnen sterk.",
    petg: "Zichtbaar tenzij profiel perfect getuned is.",
  },
  {
    property: "Detail",
    marble: "Zeer goed bij 0.16-0.2 mm lagen.",
    matte: "Goed; scherpe hoeken blijven behouden.",
    petg: "Gemiddeld; hoeken worden iets ronder.",
  },
  {
    property: "Temperatuur",
    marble: "PLA-basis blijft laag (vermijd >55 degC).",
    matte: "Ook PLA, dus dezelfde limieten.",
    petg: "Tot ca. 80 degC bruikbaar.",
  },
  {
    property: "Look & feel",
    marble: "Stone-like met diffuse highlights.",
    matte: "Ultra clean, egaal.",
    petg: "Semi-glans, functioneel.",
  },
]

const mitigationTips = [
  {
    title: "Pigmentophoping rond details",
    insight: "Verlaag snelheid of verhoog nozzletemperatuur licht zodat contouren vloeiender worden.",
  },
  {
    title: "Onregelmatige textuur",
    insight: "Vermijd variable layer height, hou cooling consistent en probeer een 0.6 mm nozzle.",
  },
  {
    title: "Microstringing",
    insight: "Retraction iets verhogen, filament droog bewaren en indien nodig nozzle 5 degC lager zetten.",
  },
]

const resourceLinks = [
  { label: "PLA materialen", href: "/materials/pla", description: "Bekijk alle PLA varianten, inclusief Marble en Matte." },
  { label: "3D printen pillar", href: "/3d-printen", description: "Workflow, materialen en typische studio cases." },
  { label: "Material Suggestion Tool", href: "/materials#material-suggestion-tool", description: "Laat de wizard je materiaalkeuze bevestigen." },
  { label: "Prijzen & calculator", href: "/pricing", description: "Zie hoe materiaalkeuze de offerte beïnvloedt." },
]

const externalReferences = [
  {
    label: "Bambu Lab PLA materiaalhandleiding",
    href: "https://wiki.bambulab.com/en/filament/pla",
    description: "Officiële baseline voor PLA-profielen op X1/P1 printers (ook bruikbaar voor Marble).",
  },
  {
    label: "Prusa – Painting & post-processing PLA",
    href: "https://help.prusa3d.com",
    description: "Handleiding voor wie Marble nadien nog wil schilderen.",
  },
  {
    label: "MatterHackers – Specialty PLA blends",
    href: "https://www.matterhackers.com/articles",
    description: "Overzicht van visuele PLA varianten zoals Marble, Concrete en Sparkle.",
  },
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "PLA Marble 3D printen: steenlook zonder gewicht",
  description:
    "Filament Vrijdag #5 van X3DPrints. Leer wat PLA Marble is, hoe je het print en wanneer je het inzet voor designprops, retail en cosplay.",
  datePublished: publishedDate,
  dateModified: publishedDate,
  author: {
    "@type": "Organization",
    name: "X3DPrints",
    url: "https://www.x3dprints.be",
  },
  publisher: {
    "@type": "Organization",
    name: "X3DPrints",
    url: "https://www.x3dprints.be",
    logo: {
      "@type": "ImageObject",
      url: "https://www.x3dprints.be/og-x3dprints.jpg",
    },
  },
  mainEntityOfPage: canonical,
  url: canonical,
  image: "https://www.x3dprints.be/images/og-home.jpg",
}

function SectionDivider() {
  return (
    <div className="mx-auto my-10 flex w-full max-w-4xl items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-500">
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-slate-200/0 via-slate-200/60 to-slate-200/0" />
      <span>Filament Vrijdag</span>
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-slate-200/0 via-slate-200/60 to-slate-200/0" />
    </div>
  )
}

export default function FilamentVrijdagPlaMarblePage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(160%_90%_at_50%_-20%,rgba(148,163,184,0.2),transparent_75%)]"
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
                <li className="font-medium text-slate-900">PLA Marble</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Filament Vrijdag #5</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              PLA Marble en esthetische materialen: steenlook zonder gewicht.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Marble filament is de snelste manier om een luxueuze steenlook te krijgen zonder kilo&apos;s materiaal of finishing. De pigmenten camoufleren laaglijnen, breken licht diffuus en laten props
              er meteen premium uitzien. In deze editie delen we de blends die het vaakst door de studio lopen, de instellingen die hun textuur laten stralen en de projecten waarvoor dit filament een echte meerwaarde is.
            </p>
            <div className="stacked-actions mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <ShimmerButton href="/contact?material=PLA%20Marble">Plan een PLA Marble print</ShimmerButton>
              <Link
                href="/materials/pla"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Bekijk PLA varianten
              </Link>
              <Link
                href="/materials#material-suggestion-tool"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Material Suggestion Tool
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">Gepubliceerd op 10 oktober 2025 – Vorige Filament Vrijdag: PLA Wood (26 september 2025).</p>
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
              <h2 className="text-2xl font-semibold text-slate-900">Wat is PLA Marble precies?</h2>
              <p className="mt-3 text-sm text-slate-600">
                PLA Marble is standaard PLA waarin minerale pigmenten gesuspendeerd zijn. Tijdens het printen ontstaan microvariaties die laaglijnen verbergen en licht diffuus laten breken. Het voelt niet aan als steen, maar oogt verrassend authentiek.
              </p>
              <p className="mt-3 text-sm text-slate-600">
                Printgemak blijft vergelijkbaar met PLA. Gebruik je het <Link href="https://wiki.bambulab.com/en/filament/pla" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline underline-offset-4">Bambu Lab PLA profiel</Link>{" "}
                als baseline (X1/P1), dan zit je meteen goed. Wij kiezen vaak voor een 0.6 mm nozzle zodat de textuur zachter wordt en pigmenten minder ophopen.
              </p>
              <p className="mt-3 text-sm text-slate-600">
                Marble scoort vooral in interieurdecor, designobjecten, cosplay props en retaildisplays: looks boven brute sterkte.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Waarom designers PLA Marble kiezen</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" aria-hidden />
                  <span>Layerlijnen verdwijnen door pigmentvariaties. Finishing is zelden nodig.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" aria-hidden />
                  <span>Lichtgewicht alternatief voor steen, ideaal voor sokkels en props.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" aria-hidden />
                  <span>PLA-basis blijft rigide en detailvast – goed voor scherpe geometrie.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" aria-hidden />
                  <span>Luxueuze look zonder laklaag: visueel klaar zodra de print uit de machine komt.</span>
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
              <h2 className="text-2xl font-semibold text-slate-900">Varianten die wekelijks uit onze printers rollen</h2>
              <p className="mt-2 text-sm text-slate-600">De blend bepaal je op basis van brand, afstand en lichtscenario. Vier favorieten:</p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {marbleVariants.map((variant) => (
                  <div key={variant.name} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-slate-300/80 to-slate-500/80" aria-hidden />
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
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" aria-hidden />
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

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">Printinstellingen die textuur en detail behouden</h2>
                  <p className="mt-2 text-sm text-slate-600">Deze reeks is onze baseline voor Bambu, Prusa en Creality. Pas gerust aan per machine.</p>
                </div>
                <Link
                  href="/materials#material-suggestion-tool"
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-slate-700"
                >
                  Laat de wizard beslissen
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
              <p className="mt-4 text-xs text-slate-500">Extra tip: kies een 0.6 mm nozzle als je een zachte, minder gelaagde look wil.</p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Wanneer wel of niet inzetten?</h2>
              <div>
                <p className="text-sm font-semibold text-slate-900">PLA Marble is perfect voor:</p>
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
                <p className="text-sm font-semibold text-slate-900">Kies beter iets anders wanneer:</p>
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
          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Veelvoorkomende issues en oplossingen</h2>
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
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">PLA Marble vs PLA Matte vs PETG</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-slate-500">
                      <th className="py-2 pr-4">Eigenschap</th>
                      <th className="py-2 pr-4">PLA Marble</th>
                      <th className="py-2 pr-4">PLA Matte</th>
                      <th className="py-2 pr-4">PETG</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {comparisonRows.map((row) => (
                      <tr key={row.property}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{row.property}</td>
                        <td className="py-3 pr-4">{row.marble}</td>
                        <td className="py-3 pr-4">{row.matte}</td>
                        <td className="py-3 pr-4">{row.petg}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Wil je verdiepen in nabewerking? Lees{" "}
                <Link href="/blog/finishing-friday-schuren-primen-lakken" className="text-indigo-600 underline underline-offset-4">
                  Finishing Friday
                </Link>{" "}
                waarin we uitleggen waarom resin workflows meer finishing vragen en we bij FDM focussen op nette basisprints.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Kostprijs, snelheid en verwachtingen</h2>
              <p className="mt-2 text-sm text-slate-600">
                PLA Marble ligt iets hoger in kost door pigmenten en omdat we rustiger printen. Het gaat hier om esthetiek; de waarde zit in hoe het object eruitziet zonder extra lakwerk.
              </p>
              <ul className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                <li className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Planningstip</p>
                  <p className="mt-2">Bundel Marble jobs per run zodat kleurconsistentie en textuur gelijk blijven.</p>
                </li>
                <li className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Sales insight</p>
                  <p className="mt-2">Verkoop Marble op storytelling: luxueuze look, licht gewicht en klaar zonder finishing.</p>
                </li>
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Impact op budget? Check de <Link href="/pricing" className="text-indigo-600 underline underline-offset-4">pricing pagina</Link> en vergelijk met PLA Matte of PETG runs.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Wanneer PLA Marble bestellen?</h2>
              <p className="mt-2 text-sm text-slate-600">Je kiest PLA Marble zodra het object moet uitstralen, niet ondergaan:</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" aria-hidden />
                  <span>Podium- en displaystukken voor retail en beurzen</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" aria-hidden />
                  <span>Interieurprops zoals sokkels, ornamenten en sculpturale objecten</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" aria-hidden />
                  <span>Cosplay onderdelen die visueel zwaar moeten ogen maar licht moeten blijven</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" aria-hidden />
                  <span>Esthetische prototypes voor marketingpresentaties</span>
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <ShimmerButton href="/contact?material=PLA%20Marble">Vraag PLA Marble advies</ShimmerButton>
                <Link
                  href="/materials/pla"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  PLA library bekijken
                </Link>
              </div>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Interne resources</h2>
              <div className="mt-4 grid gap-4">
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
              <h2 className="text-2xl font-semibold text-slate-900">Bronnen en verder lezen</h2>
              <p className="mt-2 text-sm text-slate-600">Zelf experimenteren? Start hier:</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {externalReferences.map((ref) => (
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Steenlook zonder gewicht voor je volgende campagne?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Stuur STL of STEP door, vermeld Marble en vertel waar het stuk komt te staan. We koppelen er een eerlijk materiaal- en prijsadvies aan. Soms is PLA Matte of PETG logischer – dan zeggen we dat ook.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/contact?material=PLA%20Marble">Start PLA Marble intake</ShimmerButton>
                <Link href="/pricing" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Bekijk tarieven & opties
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
