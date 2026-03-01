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

const canonical = "https://www.x3dprints.be/blog/filament-vrijdag-pla-metal/"
const publishedDate = "2025-10-24T08:00:00+02:00"
const dateModified = "2026-02-08"
const faq = BLOG_FAQ["filament-vrijdag-pla-metal"]

export const metadata: Metadata = {
  title: "PLA Metal 3D printen: metaalachtige look zonder gedoe | X3DPrints",
  description:
    "Filament Vrijdag #7. Alles over PLA Metal: metallic glans, instellingen, nozzlekeuze en toepassingen voor props, industriële look en designprints.",
  alternates: { canonical },
  openGraph: {
    title: "PLA Metal 3D printen: metaalachtige look zonder conductiviteit",
    description:
      "PLA Metal uitgelegd door X3DPrints: hoe metallic PLA-blends werken, wanneer ze interessant zijn en welke instellingen wij gebruiken.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["PLA Metal", "Metallic filament", "Filament Vrijdag", "3D print materiaal"],
    images: [
      {
        url: "/images/og-home-nl.svg",
        width: 1200,
        height: 630,
        alt: "PLA Metal filament advies door X3DPrints",
      },
    ],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filament Vrijdag: PLA Metal 3D printen",
    description: "PLA Metal instellingen en toepassingen voor props, industriële esthetiek en designprints.",
    images: ["/images/og-home-nl.svg"],
  },
}

const heroStats = [
  {
    label: "Look & feel",
    value: "Metaalachtig, niet geleidend",
    detail: "Ideaal voor props en industriële esthetiek",
  },
  {
    label: "Aanbevolen nozzle",
    value: "Hardened 0.4-0.6 mm",
    detail: "Metallic pigmenten slijten messing sneller",
  },
  {
    label: "Basis",
    value: "PLA-matrix",
    detail: "Print grotendeels als PLA, geen metaalsterkte",
  },
]

const printSettings = [
  { label: "Nozzle", value: "200-220 degC", note: "Start bij je PLA-profiel; hoger bij dikkere lagen of donkere blends" },
  { label: "Bed", value: "55-60 degC", note: "Standaard PLA-bedinstellingen op PEI of glas" },
  { label: "Snelheid", value: "40-70 mm/s", note: "Trager geeft een egalere metallic reflectie" },
  { label: "Koeling", value: "80-100%", note: "Veel koeling voor scherpe randen en tekst" },
  { label: "Layerhoogte", value: "0.16-0.24 mm", note: "Dunne lagen houden glans strak" },
  { label: "Retraction", value: "0.8-1.2 mm", note: "Conservatief houden om stringing te beperken" },
]

const whenToUse = [
  "Props en decorstukken met een industriële of sci-fi look.",
  "Knoppen, dials en panelen die op metaal mogen lijken zonder gewicht.",
  "Behuizingen en covers in showroom- of beurscontext.",
  "Designobjecten en interieuraccenten met een metalen accent.",
  "Marketingmock-ups waarbij metaallook belangrijk is, maar echt metaal overkill is.",
]

const whenToAvoid = [
  "Projecten waar echte metaalsterkte of hittebestendigheid nodig is.",
  "Elektronica waar conductiviteit vereist is.",
  "Onderdelen met zware mechanische belasting (kies PETG of technische materialen).",
  "Ultra-kleine details waar metallic glans elk foutje blootlegt.",
]

const comparisonRows = [
  {
    property: "Printgemak",
    pla: "Zeer hoog; baseline.",
    metal: "Hoog; als PLA, maar let op nozzle en snelheid.",
    petg: "Gemiddeld; stringing/bedhechting vragen tuning.",
  },
  {
    property: "Oppervlak",
    pla: "Mat of glanzend, egaal.",
    metal: "Metaalachtige glans, toont snel laaglijnen.",
    petg: "Semi-glans, plastischer look.",
  },
  {
    property: "Abrasiviteit",
    pla: "Niet abrasief.",
    metal: "Licht abrasief door pigment.",
    petg: "Niet abrasief (zonder fillers).",
  },
  {
    property: "Mechanische eigenschappen",
    pla: "Stijf, eerder bros.",
    metal: "Vergelijkbaar met PLA, soms iets brosser.",
    petg: "Taaier, buigt eerder dan breekt.",
  },
  {
    property: "Conductiviteit",
    pla: "Niet geleidend.",
    metal: "Niet geleidend (puur visueel).",
    petg: "Niet geleidend.",
  },
  {
    property: "Typische toepassingen",
    pla: "Algemene prototypes, decor.",
    metal: "Props, industriële esthetiek, displays.",
    petg: "Functionele onderdelen, brackets.",
  },
]

const mitigationTips = [
  {
    title: "Nozzle slijtage beperken",
    insight: "Gebruik een geharde nozzle bij regelmatige PLA Metal jobs en vermijd onnodig hoge snelheden of flow.",
  },
  {
    title: "Layerlijnen onder controle houden",
    insight: "Print niet te dik (0.16-0.2 mm voor zichtwerk) en oriënteer zichtvlakken slim; metallic glans benadrukt elk lijntje.",
  },
  {
    title: "Nabewerking slim inzetten",
    insight: "Licht schuren + satijnlak kan de metaallook versterken zonder volledig finishing traject.",
  },
  {
    title: "Detail versus glans",
    insight: "Gebruik duidelijke contouren. Metalen pigmenten kunnen microdetail wegblazen als het te klein is.",
  },
]

const resourceLinks = [
  { label: "3D printen pillar", href: "/3d-printen", description: "Overzicht van workflow, materialen en planning." },
  { label: "Materialenbibliotheek", href: "/materials", description: "PLA Metal, Marble, Matte en andere visuals naast elkaar." },
  { label: "Prijzen & calculator", href: "/pricing", description: "Zie hoe materiaalkeuze de offerte beïnvloedt." },
  { label: "Material Suggestion Tool", href: "/materials#material-suggestion-tool", description: "Laat de wizard mee kiezen." },
]

const references = [
  {
    label: "Prusa – Different nozzle types",
    href: "https://help.prusa3d.com/article/different-nozzle-types_2193",
    description: "Waarom gevulde filamenten een geharde nozzle vragen.",
  },
  {
    label: "Prusa – How to smooth & paint prints",
    href: "https://blog.prusa3d.com/how-to-smooth-and-paint-3d-prints_12547/",
    description: "Interessant voor wie metallic prints extra wil afwerken.",
  },
  {
    label: "All3DP – Metal filament guide",
    href: "https://all3dp.com/2/metal-filament-3d-printing/",
    description: "Overzicht van metaal-gevulde PLA’s en hun gedrag.",
  },
  {
    label: "Bambu Lab – PLA gids",
    href: "https://wiki.bambulab.com/en/filament/pla",
    description: "Baseline instellingen voor PLA, bruikbaar voor special blends.",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "PLA Metal 3D printen: metaalachtige look zonder gedoe",
  description: "Filament Vrijdag #7. Leer hoe PLA Metal werkt, welke instellingen wij gebruiken en wanneer metallic PLA-blends echt meerwaarde bieden.",
  datePublished: publishedDate,
  dateModified,
  image: "https://www.x3dprints.be/images/og-home-nl.svg",
})



const lastUpdatedLabel = "Laatst bijgewerkt: 8 februari 2026"

function SectionDivider() {
  return (
    <div className="mx-auto my-10 flex w-full max-w-4xl items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-500">
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-slate-300/0 via-slate-300/60 to-slate-300/0" />
      <span>Filament Vrijdag</span>
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-slate-300/0 via-slate-300/60 to-slate-300/0" />
    </div>
  )
}

export default function FilamentVrijdagPlaMetalPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(160%_90%_at_50%_-20%,rgba(148,163,184,0.22),transparent_75%)]"
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
                <li className="font-medium text-slate-900">PLA Metal</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Filament Vrijdag #7</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              PLA Metal 3D printen: metaalachtige glans zonder conductiviteit.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Metallic PLA is ideaal wanneer een onderdeel eruit moet zien als metaal, maar je geen zin hebt in de kost, het gewicht of de verwerking van echte metalen. In deze editie bekijken we hoe metallic pigmenten zich gedragen, welke
              hardwarekeuzes slim zijn en wanneer je toch beter PLA Matte, Marble of PETG inzet.
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="stacked-actions mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <ShimmerButton href="/contact?material=PLA%20Metal">Vraag PLA Metal advies</ShimmerButton>
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
            <p className="mt-6 text-sm text-slate-500">Gepubliceerd op 24 oktober 2025 – esthetische tak van Filament Vrijdag.</p>
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
              <h2 className="text-2xl font-semibold text-slate-900">Wat is PLA Metal precies?</h2>
              <p className="mt-3 text-sm text-slate-600">
                PLA Metal is een PLA-matrix met metallic pigmenten of fijne metaaldeeltjes. Het levert een glanzend, metal-like oppervlak, maar blijft een kunststof: niet geleidend, niet lasbaar, mechanisch vergelijkbaar met PLA. Het doel is
                een visueel effect, niet technische metaalvervanging.
              </p>
              <p className="mt-3 text-sm text-slate-600">
                Voor nozzlekeuze verwijs ik graag naar de{" "}
                <Link
                  href="https://help.prusa3d.com/article/different-nozzle-types_2193"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 underline underline-offset-4"
                >
                  Prusa uitleg over verschillende nozzles
                </Link>{" "}
                – hier lees je waarom gevulde filamenten beter draaien op geharde nozzles. Voor baseline PLA settings blijft de{" "}
                <Link
                  href="https://wiki.bambulab.com/en/filament/pla"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 underline underline-offset-4"
                >
                  Bambu PLA gids
                </Link>{" "}
                een prima startpunt.
              </p>
              <p className="mt-3 text-sm text-slate-600">Gebruik PLA Metal wanneer het verhaal visueel baat heeft bij metaallook, niet “omdat het kan”.</p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Wanneer wel of niet inzetten?</h2>
              <div>
                <p className="text-sm font-semibold text-slate-900">PLA Metal is perfect voor:</p>
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
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">Printinstellingen voor metallic PLA</h2>
                  <p className="mt-2 text-sm text-slate-600">Gebruik dit als startpunt en stem af op je machine en filamentmerk.</p>
                </div>
                <Link
                  href="/materials#material-suggestion-tool"
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-800 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-slate-900"
                >
                  Laat de wizard helpen
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
              <p className="mt-4 text-xs text-slate-500">Plaats metallic jobs geclusterd in de planning om hardwarewissels te beperken.</p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

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
              <h2 className="text-2xl font-semibold text-slate-900">PLA vs PLA Metal vs PETG</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-slate-500">
                      <th className="py-2 pr-4">Eigenschap</th>
                      <th className="py-2 pr-4">PLA</th>
                      <th className="py-2 pr-4">PLA Metal</th>
                      <th className="py-2 pr-4">PETG</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {comparisonRows.map((row) => (
                      <tr key={row.property}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{row.property}</td>
                        <td className="py-3 pr-4">{row.pla}</td>
                        <td className="py-3 pr-4">{row.metal}</td>
                        <td className="py-3 pr-4">{row.petg}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Voor diepere materiaalkeuzes: lees ook de{" "}
                <Link href="/blog/filament-vrijdag-pla" className="text-indigo-600 underline underline-offset-4">
                  PLA aflevering
                </Link>{" "}
                en de{" "}
                <Link href="/blog/filament-vrijdag-petg" className="text-indigo-600 underline underline-offset-4">
                  PETG aflevering
                </Link>
                .
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
              <h2 className="text-2xl font-semibold text-slate-900">PLA Metal in de praktijk</h2>
              <p className="mt-2 text-sm text-slate-600">
                Glow, Marble, Metal... ze spelen allemaal in op het visuele verhaal. Voor metallic filamenten is licht, reflectie en contrast cruciaal.
              </p>
              <ul className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                <li className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Props & sci-fi</p>
                  <p className="mt-2">Panel lines, greephandles en behuizingen die realistisch ogen op video of podium.</p>
                </li>
                <li className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Industriële look</p>
                  <p className="mt-2">
                    Conceptmock-ups voor machines en interfaces waar stakeholders “metaal” willen zien zonder CNC-traject.
                  </p>
                </li>
                <li className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Interieur & retail</p>
                  <p className="mt-2">Logo’s, sokkels en accenten met metaallook voor winkels, showrooms of beurzen.</p>
                </li>
                <li className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Marketingmock-ups</p>
                  <p className="mt-2">
                    Presentaties waarin je varianten wilt tonen: Matte, Marble, Metal naast elkaar geeft klanten houvast.
                  </p>
                </li>
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Wanneer PLA Metal bestellen?</h2>
              <p className="mt-2 text-sm text-slate-600">
                Kies metallic PLA wanneer de look van metaal deel uitmaakt van het concept, niet als gimmick. Typische cases:
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                  <span>Props voor events, video of theater met mechanische of high-tech esthetiek.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                  <span>Industriële mock-ups of demo-opstellingen rond machines en user interfaces.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                  <span>Interieur- en retailtoepassingen waar metaallook de branding versterkt.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                  <span>Designcases waar je verschillende esthetische filamenten naast elkaar wil tonen.</span>
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <ShimmerButton href="/contact?material=PLA%20Metal">Plan een PLA Metal print</ShimmerButton>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Bekijk tarieven
                </Link>
              </div>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Filament Vrijdag roadmap</h2>
              <p className="mt-2 text-sm text-slate-600">
                PLA Metal sluit aan bij de esthetische tak van Filament Vrijdag. Vanuit elke aflevering linken we naar de 3D printen pillar, materialenbibliotheek, pricing en contact zodat zowel bezoekers als zoekmachines de volledige context zien.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-700" aria-hidden />
                  <Link href="/blog/filament-vrijdag-pla" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                    Filament Vrijdag #1: PLA
                  </Link>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-700" aria-hidden />
                  <Link href="/blog/filament-vrijdag-petg" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                    Filament Vrijdag #2: PETG
                  </Link>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-700" aria-hidden />
                  <Link href="/blog/filament-vrijdag-pla-wood" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                    Filament Vrijdag #4: PLA Wood & specials
                  </Link>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-700" aria-hidden />
                  <Link
                    href="/blog/filament-vrijdag-pla-marble"
                    className="font-semibold text-indigo-600 transition hover:text-indigo-500"
                  >
                    Filament Vrijdag #5: PLA Marble
                  </Link>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-700" aria-hidden />
                  <Link href="/blog/filament-vrijdag-pla-glow" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                    Filament Vrijdag #6: PLA Glow
                  </Link>
                </li>
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
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 id="sources" className="text-2xl font-semibold text-slate-900">Bronnen en referenties</h2>
              <p className="mt-2 text-sm text-slate-600">
                Wil je zelf experimenteren met metallic PLA, dan zijn dit degelijke vertrekpunten met concrete nozzle- en settingstips.
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Twijfel je tussen Matte, Marble, Metal of iets functioneels?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Deel STL of STEP, vertel of het stuk vooral moet werken, opvallen of beide, en we koppelen er een eerlijk materiaaladvies aan. Soms is PLA Metal perfect, soms is PLA Matte of PETG budgettair slimmer.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/contact?material=PLA%20Metal">Start materiaal intake</ShimmerButton>
                <Link href="/pricing" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Bekijk tarieven & workflow
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









