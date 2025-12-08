import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"

const canonical = "https://www.x3dprints.be/blog/filament-vrijdag-pla-wood"
const publishedDate = "2025-09-26T08:00:00+02:00"

export const metadata: Metadata = {
  title: "Wood filament 3D printen: PLA Wood en specials | X3DPrints",
  description:
    "Filament Vrijdag #4. Alles over PLA Wood en speciale PLA filamenten: instellingen, toepassingen, nabewerking en vergelijking met andere aesthetic blends.",
  alternates: { canonical },
  openGraph: {
    title: "Wood filament 3D printen: PLA Wood en specials",
    description:
      "PLA Wood uitgelegd door X3DPrints: instellingen, toepassingen, beperkingen en tips voor esthetische prints met hout, marble of silk blends.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["PLA Wood", "Wood filament", "Filament Vrijdag", "PLA specials"],
    images: [
      {
        url: "/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "PLA Wood advies door X3DPrints",
      },
    ],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filament Vrijdag #4: PLA Wood en specials",
    description:
      "Wood filament voor design, props en interieur. Leer hoe PLA Wood en andere special blends zich gedragen in de studio.",
    images: ["/images/og-home.jpg"],
  },
}

const heroStats = [
  { label: "Samenstelling", value: "ca. 70% PLA / 30% hout", detail: "Fijn houtpoeder in een PLA-matrix" },
  { label: "Nozzle bereik", value: "190-240 degC", detail: "Bambu PLA Wood draait stabiel rond 220 degC" },
  { label: "Bedtemperatuur", value: "35-45 degC", detail: "Lage bedtemperatuur voor makkelijke release" },
]

const woodAndSpecialVariants = [
  {
    name: "PLA Wood",
    description:
      "PLA gemengd met houtpoeder voor een warme textuur en subtiele kleurvariaties. Voelt minder plastiekerig aan en kan licht geschuurd worden.",
    bestFor: ["Interieurdecor", "Awards en trofeeen", "Packaging mock-ups"],
  },
  {
    name: "PLA Marble",
    description:
      "Minerale flakes leveren een steeneffect met zachte highlights. Ideaal voor sculpturen, bustes en architecturale maquettes.",
    bestFor: ["Beelden en bustes", "Architectuurmodellen", "Premium displays"],
  },
  {
    name: "PLA Silk & Dual Color",
    description:
      "Hoge glans en depth-effect in de lagen. Minder structureel dan basis PLA, maar visueel extreem dankbaar voor branding en showpieces.",
    bestFor: ["Retailprops", "Logo objecten", "Giveaways"],
  },
  {
    name: "PLA Specials (Galaxy, Glow, Metal)",
    description:
      "Metallic flakes, glitter of glow-in-the-dark pigment. Perfect wanneer een object moet opvallen in licht of duister.",
    bestFor: ["Merchandising", "Cosplay", "Limited editions"],
  },
]

const printSettings = [
  { label: "Nozzle", value: "200-220 degC", note: "Start rond 210 degC voor PLA Wood, verfijn per merk" },
  { label: "Bed", value: "35-45 degC", note: "Licht verwarmd bed plus lijm of PEI textuur" },
  { label: "Snelheid", value: "35-60 mm/s", note: "Rustig houden om verkleuring en stringing te vermijden" },
  { label: "Nozzle diameter", value: "0.4-0.6 mm", note: "Grotere nozzle verkleint kans op clogs" },
  { label: "Koeling", value: "60-100%", note: "Meer koeling voor scherpe details, minder bij dikke lagen" },
]

const whenToUse = [
  "Designobjecten waar materiaalbeleving even belangrijk is als de vorm.",
  "Interieurstukken, signage en brandingprops met een natuurlijke uitstraling.",
  "Beelden, bustes en mock-ups waar hout of marmer gesuggereerd moet worden.",
  "Aesthetic prints voor socials, beursstanden en portfolioshoots.",
  "Packaging- en retailconcepten waar klanten het eindgevoel willen ervaren.",
]

const whenToAvoid = [
  "Functionele onderdelen die mechanisch belast worden.",
  "Omgevingen boven 55 degC (auto dashboards, productievloeren).",
  "Projecten met agressieve chemicalien of zware impact.",
  "Technische toepassingen waar maatvastheid onder belasting cruciaal is.",
  "Budgetcases waar standaard PLA volstaat.",
]
const comparisonRows = [
  {
    property: "Focus",
    plaBasic: "Balans tussen prijs, detail en snelheid.",
    plaWood: "Look & feel, warme textuur, tactiliteit.",
    plaSpecials: "Visueel effect (glans, sparkles, glow).",
  },
  {
    property: "Mechanische sterkte",
    plaBasic: "Referentiepunt voor lichte toepassingen.",
    plaWood: "Iets brozer door houtdeeltjes, vooral esthetisch.",
    plaSpecials: "Gelijkaardig aan PLA, Silk kan iets zwakker zijn.",
  },
  {
    property: "Printgemak",
    plaBasic: "Zeer hoog, vergevingsgezind.",
    plaWood: "Gemiddeld; vraagt nozzle zorg en temperatuurcontrole.",
    plaSpecials: "Gemiddeld tot hoog; Silk/Metal vragen extra tuning.",
  },
  {
    property: "Nozzle slijtage",
    plaBasic: "Laag, messing nozzle volstaat.",
    plaWood: "Gemiddeld; houtdeeltjes kunnen slijten op termijn.",
    plaSpecials: "Galaxy/Metal zijn abrasiever, hardened nozzle aangeraden.",
  },
  {
    property: "Nabewerking",
    plaBasic: "Schuren en primen mogelijk, neutrale basis.",
    plaWood: "Uitstekend schuur- en beitsbaar, voelt als hout.",
    plaSpecials: "Silk vooral raw display, minder geschikt voor schuren.",
  },
  {
    property: "Kost per print",
    plaBasic: "Laagste materiaalprijs.",
    plaWood: "Hoger filamentbudget en tragere runtimes.",
    plaSpecials: "Hoger, vaak voor kleine premium runs.",
  },
]

const mitigationTips = [
  {
    title: "Verstoppingen voorkomen",
    insight:
      "Gebruik 0.4-0.6 mm nozzles, print niet onnodig heet en purge tussen jobs met standaard PLA om houtdeeltjes te verwijderen.",
  },
  {
    title: "Verbrande spots vermijden",
    insight:
      "Zie je donkere stippen? Verlaag temperatuur stap voor stap en beperk lange retractions, anders karamelliseert de wood mix in de nozzle.",
  },
  {
    title: "Layerlijnen camoufleren",
    insight:
      "Combineer 0.16 mm layers met rustige snelheden en voldoende koeling. Voor Marble en Silk bepaalt de orientatie hoe het licht speelt.",
  },
  {
    title: "Nabewerking",
    insight:
      "PLA Wood laat zich schuren en licht beitsen. Test op een reststuk en vermijd agressieve producten: de PLA basis blijft gevoelig.",
  },
]

const resourceLinks = [
  { label: "3D printen pillar", href: "/3d-printen", description: "Workflow, materialen en typische toepassingen." },
  {
    label: "Materialenbibliotheek",
    href: "/materials",
    description: "Swatches en stockstatus voor PLA Wood, Marble, Silk en andere specials.",
  },
  { label: "PLA Wood materiaalfiche", href: "/materials/pla-wood", description: "Studio instellingen en kleuren voor PLA Wood." },
  { label: "Prijzen & calculator", href: "/pricing", description: "Zie impact van langere runtimes en speciale filamenten." },
]

const externalReferences = [

  {
    label: "Bambu Lab PLA Wood TDS",
    href: "https://store.bblcdn.com/s4/default/6fda0ae88e5a4e66bb5d58f2968eee42/Bambus_PLA_Wood_Technical_Data_Sheet.pdf",
    description: "Aanbevolen temperaturen, mechanische eigenschappen en droogadvies.",
  },
  {
    label: "3DSourced Wood Filament Guide",
    href: "https://www.3dsourced.com/3d-printer-materials/wood-3d-printing-printer-filament/",
    description: "Achtergrond over samenstelling en typische toepassingen.",
  },
  {
    label: "MatterHackers: post-process wood filament",
    href: "https://www.matterhackers.com/articles/how-to-post-process-wood-infused-3d-filament",
    description: "Praktische tips rond schuren, beitsen en afwerken.",
  },
  {
    label: "Obico: how to print in wood filament",
    href: "https://www.obico.io/nl-NL/blog/how-to-print-in-wood-filament-tips-and-tricks/",
    description: "Richtlijnen rond temperatuur, bedsettings en opslag.",
  },
]

const upcomingPosts = [
  { label: "Filament vergelijking: PLA vs PETG vs TPU", href: "/blog" },
  { label: "Use cases: hoe klanten PLA Wood inzetten", href: "/blog" },
  { label: "Finishing Friday: schuren, primen, lakken", href: "/blog/finishing-friday-schuren-primen-lakken" },
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Wood filament 3D printen: PLA Wood en specials",
  description:
    "Filament Vrijdag #4 van X3DPrints. Leer wanneer PLA Wood en speciale PLA filamenten zinvol zijn, welke instellingen werken en hoe je ze inzet voor esthetische 3D prints.",
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
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-amber-300/0 via-amber-300/60 to-amber-300/0" />
      <span>Filament Vrijdag</span>
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-amber-300/0 via-amber-300/60 to-amber-300/0" />
    </div>
  )
}

export default function FilamentVrijdagPlaWoodPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(160%_90%_at_50%_-20%,rgba(245,158,11,0.18),transparent_75%)]"
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
                <li className="font-medium text-slate-900">PLA Wood & specials</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Filament Vrijdag #4</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Wood filament 3D printen: PLA Wood en speciale PLA blends.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              PLA Wood en specials zijn de speeltuin voor designers en marketeers die met textuur en licht willen spelen. Geen brute functionele onderdelen,
              wel stukken die in een etalage, foto of interieur moeten scoren. Deze editie bundelt studio-instellingen, besliscriteria en nabewerkingstips,
              gebaseerd op de Bambu PLA Wood technical data sheet en eigen projecten.
            </p>
            <div className="stacked-actions mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <ShimmerButton href="/contact?material=PLA%20Wood">Plan een PLA Wood print</ShimmerButton>
              <Link
                href="/materials/pla-wood"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Bekijk PLA Wood fiche
              </Link>
              <Link
                href="/materials#material-suggestion-tool"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Material Suggestion Tool
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">Gepubliceerd op 26 september 2025 - Vorige Filament Vrijdag: TPU (19 september 2025).</p>
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
              <h2 className="text-2xl font-semibold text-slate-900">Wat is PLA Wood precies?</h2>
              <p className="mt-3 text-sm text-slate-600">
                Wood filament is een PLA matrix gevuld met houtdeeltjes. Denk aan gerecycleerd zaagsel dat gemengd wordt met PLA korrels en daarna geextrudeerd.
                De Bambu PLA Wood fiche vermeldt een nozzletemperatuur van 190-240 degC en een bedtemperatuur van 35-45 degC. Dat lage bed maakt het eenvoudig
                om prints te lossen zonder kromtrekken.
              </p>
              <p className="mt-3 text-sm text-slate-600">
                Omdat het nog steeds PLA is, blijft wood filament vormvast zolang je wegblijft van hoge temperaturen. De houtdeeltjes zorgen voor kleurvariaties
                en een tactiel gevoel. Ideaal voor maquettes, awards en branding props waar materiaalbeleving telt.
              </p>
              <p className="mt-3 text-sm text-slate-600">
                In de studio combineren we PLA Wood vaak met andere specials. Een houten voet met marble sculptuur en silk logo is een klassieker voor podia,
                campagnes en limited editions.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Wanneer kies je PLA Wood of specials?</h2>
              <div>
                <p className="text-sm font-semibold text-slate-900">Kies PLA Wood/specials wanneer:</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {whenToUse.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" aria-hidden />
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
                  <h2 className="text-2xl font-semibold text-slate-900">Studio-instellingen uit de praktijk</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Deze bandbreedtes vertrekken vanuit Bambu PLA Wood maar vertalen net zo goed naar Prusa, Creality of Voron. Houd filament droog en purge na
                    langere runs met standaard PLA zodat houtdeeltjes niet in de nozzle achterblijven.
                  </p>
                </div>
                <Link
                  href="/materials#material-suggestion-tool"
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-amber-600"
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
                Droogadvies: 55 degC gedurende 8 uur (volgens Bambu TDS) of gebruik een filament dryer/AMS met droogfunctie. Droog filament verkleint de kans op
                stringing en kleurverschillen.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-6">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Special blends die wekelijks uit de printers rollen</h2>
              <p className="mt-2 text-sm text-slate-600">
                In de studio leveren we zelden een enkel materiaal. Vaak draaien we collecties waarbij hout, marble, silk en glow elkaar aanvullen. Zo krijgt een
                award set een houten voet, marmeren sculptuur en silk accentlogo.
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Op de <Link href="/materials" className="text-indigo-600 underline underline-offset-4">materialenpagina</Link> zie je welke varianten en kleuren klaarstaan en welke op bestelling binnenkomen.
              </p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {woodAndSpecialVariants.map((variant) => (
                  <div key={variant.name} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-amber-500/80 to-slate-700/80" aria-hidden />
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
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" aria-hidden />
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
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
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
          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">PLA basic vs PLA Wood vs specials</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-slate-500">
                      <th className="py-2 pr-4">Eigenschap</th>
                      <th className="py-2 pr-4">PLA basic</th>
                      <th className="py-2 pr-4">PLA Wood</th>
                      <th className="py-2 pr-4">PLA specials</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {comparisonRows.map((row) => (
                      <tr key={row.property}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{row.property}</td>
                        <td className="py-3 pr-4">{row.plaBasic}</td>
                        <td className="py-3 pr-4">{row.plaWood}</td>
                        <td className="py-3 pr-4">{row.plaSpecials}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Nog geen zicht op het grotere plaatje? Combineer deze blog met de <Link href="/blog/filament-vrijdag-pla" className="text-indigo-600 underline underline-offset-4">PLA editie</Link>, de <Link href="/blog/filament-vrijdag-petg" className="text-indigo-600 underline underline-offset-4">PETG editie</Link> en de <Link href="/blog/filament-vrijdag-tpu" className="text-indigo-600 underline underline-offset-4">TPU editie</Link>.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Kostprijs en businessrealiteit</h2>
              <p className="mt-2 text-sm text-slate-600">
                PLA Wood, Marble of Silk kosten meer per kilo dan basis PLA en draaien vaak trager om de afwerking tot zijn recht te laten komen. Het resultaat
                is meer machine-uren en iets meer voorbereiding, ook al is het onderdeel klein.
              </p>
              <ul className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                <li className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Planningstip</p>
                  <p className="mt-2">
                    Bundel specials per project. Een batch van awards in dezelfde materialenset is efficienter dan losse bestellingen met telkens andere
                    filamentwissels.
                  </p>
                </li>
                <li className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Sales insight</p>
                  <p className="mt-2">
                    Positioneer PLA Wood en specials als upgrade op basis PLA. De meerwaarde zit in merkbeleving, fotografie en hoe het object in de handen van
                    de eindklant aanvoelt.
                  </p>
                </li>
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Op de <Link href="/pricing" className="text-indigo-600 underline underline-offset-4">pricing pagina</Link> zie je hoe materiaalkeuze, laaghoogte en printtijd in de offerte doorwerken.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Wanneer PLA Wood bestellen bij X3DPrints?</h2>
              <p className="mt-2 text-sm text-slate-600">
                PLA Wood komt vooral in beeld wanneer je iets zoekt dat warm, tactiel en merkgetrouw is. Dit zijn typische cases uit de studio:
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" aria-hidden />
                  <span>Custom awards en trofeeen die niet als catalogusproduct mogen aanvoelen.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" aria-hidden />
                  <span>Interieurobjecten, signage of displays met een natuurlijke uitstraling.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" aria-hidden />
                  <span>Brandingprops voor video, fotografie en social content.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" aria-hidden />
                  <span>Concepten voor packaging, POS materiaal en retailmeubilair.</span>
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <ShimmerButton href="/contact?material=PLA%20Wood">Start PLA Wood intake</ShimmerButton>
                <Link
                  href="/materials/pla-wood"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Check PLA Wood voorraad
                </Link>
              </div>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Filament Vrijdag cluster</h2>
              <p className="mt-2 text-sm text-slate-600">
                Met PLA, PETG, TPU en nu PLA Wood & specials staat de basis van de materiaalcluster rond 3D printen. Deze blogs linken naar elkaar, de pillarpagina
                en de materialenbibliotheek zodat zowel klanten als Google vlot hun weg vinden.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" aria-hidden />
                  <Link href="/blog/filament-vrijdag-pla" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                    Filament Vrijdag #1: PLA 3D printen
                  </Link>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" aria-hidden />
                  <Link href="/blog/filament-vrijdag-petg" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                    Filament Vrijdag #2: PETG 3D printen
                  </Link>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" aria-hidden />
                  <Link href="/blog/filament-vrijdag-tpu" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                    Filament Vrijdag #3: TPU 3D printen
                  </Link>
                </li>
                {upcomingPosts.map((item) => (
                  <li key={item.label} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" aria-hidden />
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
              <h2 className="text-2xl font-semibold text-slate-900">Bronnen en verder lezen</h2>
              <p className="mt-2 text-sm text-slate-600">
                Wil je zelf verder experimenteren, dan zijn dit goede vertrekpunten. We verwijzen er ook naar in onze interne documentatie rond wood filament 3D
                printen.
              </p>
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Twijfel tussen basic PLA en specials?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Deel STL of STEP, vertel hoe en waar het stuk gebruikt wordt en we koppelen er een eerlijk voorstel aan. Soms is PLA Wood de juiste upgrade,
                  soms houdt basis PLA je budget gewoon strakker.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/contact?material=PLA%20Wood">Start Filament Vrijdag intake</ShimmerButton>
                <Link href="/3d-printen" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Lees verder op de 3D printen pagina
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    </main>
  )
}
