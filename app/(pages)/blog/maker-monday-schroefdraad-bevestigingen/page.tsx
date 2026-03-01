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

const canonical = "https://www.x3dprints.be/blog/maker-monday-schroefdraad-bevestigingen/"
const publishedDate = "2025-11-17T08:00:00+01:00"
const dateModified = "2026-02-08T08:00:00+01:00"
const faq = BLOG_FAQ["maker-monday-schroefdraad-bevestigingen"]

export const metadata: Metadata = {
  title: "Schroefdraad en inserts in 3D prints | Maker Monday #7",
  description:
    "Leer hoe je schroefdraad, heat set inserts, zelftappende schroeven en FDM-bevestigingen correct ontwerpt. Inclusief toleranties, materiaalkeuze en X3DPrints advies.",
  alternates: { canonical },
  openGraph: {
    title: "Maker Monday #7: Schroefdraad & bevestigingen in 3D prints",
    description:
      "De ultieme gids voor geprinte draad, zelftappende schroeven en heat set inserts in PLA, PETG en TPU. Vol met studio-toleranties en ontwerpregels.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: [
      "schroefdraad in 3D prints",
      "heat set inserts",
      "zelftappende schroeven",
      "FDM bevestigingen",
      "schroefgaten PLA PETG TPU",
    ],
    images: [
      {
        url: "/images/og-home-nl.svg",
        width: 1200,
        height: 630,
        alt: "Schroefdraad en inserts in 3D prints",
      },
    ],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maker Monday #7: Schroefdraad & inserts in FDM",
    description:
      "Wanneer gebruik je geprinte draad, zelftappers of heat set inserts? Hier vind je de regels voor PLA, PETG en TPU.",
    images: ["/images/og-home-nl.svg"],
  },
}

const heroStats = [
  { label: "Insert pocket", value: "≥ 2 mm wall", detail: "Materiaal rondom messing insert" },
  { label: "Self-tapper voorboor", value: "M3 -> 2.4 mm", detail: "Voorkomt scheuren in PLA/PETG" },
  { label: "Geprinte draad", value: "M20+", detail: "Clearance +0.15 mm radiaal" },
]

const printedThreadTable = [
  { size: "M10 – M16", clearance: "+0.10 mm", notes: "Alleen PETG; PLA bros, TPU te flexibel" },
  { size: "M20 – M30", clearance: "+0.15 mm", notes: "Layer height ≤ 0.20 mm, snelheid ±35 mm/s" },
  { size: "Buisdraad/props", clearance: "+0.20 mm", notes: "PLA prime voor props, geen belasting" },
]

const selfTappingTable = [
  { screw: "M2.5 Plastite", pilot: "2.0 mm", materials: "PLA/PETG", remark: "Niet loodrecht op layer-lines" },
  { screw: "M3 thread-forming", pilot: "2.4 – 2.5 mm", materials: "PETG ideaal", remark: "PLA enkel licht belast" },
  { screw: "M4 Plastite", pilot: "3.2 – 3.3 mm", materials: "PETG", remark: "Gebruik bosses ≥ Ø8 mm" },
]

const insertTable = [
  { insert: "M2.5", pocket: "Ø3.4 mm", comment: "Perfect in PLA Matte; voeg 0.3 mm chamfer toe" },
  { insert: "M3", pocket: "Ø4.0 mm", comment: "Meest gebruikt; PETG + inserts = serviceable behuizing" },
  { insert: "M4", pocket: "Ø5.2 mm", comment: "Pak PETG voor torsie, PLA enkel licht belast" },
]

const mistakes = [
  "Wanddikte < 2 mm rond een schroefgat -> delaminatie.",
  "Gaten tekenen op nominale maat -> schroef drukt materiaal weg en scheurt PLA.",
  "Schroeven loodrecht op layer-lines plaatsen zonder boss of rib.",
  "Geen tolerantie voorzien: FDM variatie van ±0.1 mm genegeerd.",
  "Impact tools gebruiken op PLA/PETG -> insert of boss scheurt los.",
]

const materialHighlights = [
  {
    name: "PLA",
    detail:
      "Strakke details maar bros. Alleen voor lichte belasting of cosmetische draad. Gebruik inserts vanaf M3. Zie PLA gids.",
    link: "https://www.x3dprints.be/blog/filament-vrijdag-pla",
  },
  {
    name: "PETG",
    detail:
      "Beste allrounder: taai, flexibel genoeg voor zelftappers en sterk genoeg voor inserts. Perfect voor behuizingen, fixtures en machineonderdelen.",
    link: "https://www.x3dprints.be/blog/filament-vrijdag-petg",
  },
  {
    name: "TPU",
    detail:
      "Schroefdraad werkt nauwelijks; gebruik inserts of kliksystemen. Ideaal als flexibele interface of demper naast PETG structuur.",
    link: "https://www.x3dprints.be/blog/filament-vrijdag-tpu",
  },
]

const checklist = [
  "Minimaal 2 mm materiaal rond elk schroefgat; bosses zijn beter dan vlakke wanden.",
  "Boss diameter = 2–2.5× schroefdiameter, hoogte = ≥ 3 lagen.",
  "Insert oriëntatie parallel aan layer-lines zodat de kracht niet dwars op de lagen trekt.",
  "Voorboren volgens tabel; rely niet op “klemmen tot het past”.",
  "PETG voor functionele bevestigingen, PLA enkel cosmetisch, TPU enkel voor inserts/dempers.",
  "Plan tolerantie (±0.1 mm) en vermeld bij intake welk schroeftype je verwacht.",
]

const lastUpdatedLabel = "Laatst bijgewerkt: 8 februari 2026"

const references = [
  { label: "PEM: Threaded inserts for plastics", href: "https://www.pemnet.com/products/fastening-products-for-plastics/" },
  { label: "ISO/ASTM 52900 terminology", href: "https://www.astm.org/standards/isoastm52900" },
  { label: "Ultimaker: Design for FFF 3D printing", href: "https://ultimaker.com/learn/design-for-fff-3d-printing/" },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "Maker Monday #7: Schroefdraad en inserts in 3D prints",
  description: metadata.description ?? "",
  datePublished: publishedDate,
  dateModified,
  image: "https://www.x3dprints.be/images/og-home-nl.svg",
})

function SectionDivider() {
  return (
    <div className="mx-auto my-12 flex w-full max-w-4xl items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-500">
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-indigo-300/0 via-indigo-300/60 to-indigo-300/0" />
      <span>Maker Monday</span>
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-indigo-300/0 via-indigo-300/60 to-indigo-300/0" />
    </div>
  )
}

export default function MakerMondaySchroefdraadBevestigingenPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(180%_90%_at_50%_-20%,rgba(79,70,229,0.14),transparent_75%)]"
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
                    className="font-medium text-indigo-600 transition hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Blog
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-700">Maker Monday</li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-900">Schroefdraad & inserts</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Maker Monday #7</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              De ultieme gids: schroefdraad, inserts en bevestigingen in 3D prints.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Schroefdraad en FDM hoeven geen vijanden te zijn zolang je ontwerpt volgens de regels van het proces. Laagopbouw,
              materiaalkeuze en oriëntatie bepalen of je draad drie cycli overleeft of jarenlang meegaat. In deze Maker Monday
              overlopen we de drie echte strategieën: geprinte schroefdraad, zelftappende schroeven en heat set inserts.
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/contact?topic=maker-monday-fasteners">Vraag bevestigingsadvies</ShimmerButton>
              <Link
                href="/materials"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Materialenoverzicht
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Pricing & lead times
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">Gepubliceerd op 17 november 2025 • Maker Monday knowledge hub.</p>
          </Reveal>
          <div className="mt-10 grid gap-4 rounded-3xl border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur sm:grid-cols-3">
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
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 id="fasteners-printed" className="scroll-mt-28 text-2xl font-semibold text-slate-900">
                1. Geprinte schroefdraad: wanneer wel, wanneer niet?
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Draad printen is prima voor grote diameters of niet-kritieke verbindingen (caps, doppen, prototyping). Kleine
                schroeven (M3-M8) scheuren laaglijnen open, zeker in PLA. Gebruik deze richtlijnen:
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-slate-500">
                      <th className="py-2 pr-4">Maat</th>
                      <th className="py-2 pr-4">Clearance</th>
                      <th className="py-2 pr-4">Notities</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {printedThreadTable.map((row) => (
                      <tr key={row.size}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{row.size}</td>
                        <td className="py-3 pr-4">{row.clearance}</td>
                        <td className="py-3 pr-4">{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Tip: print trager (±35 mm/s), gebruik 0.2 mm layer height en disable agressieve cooling als je PETG draad
                produceert. Voor kritisch draadsysteem? Gebruik inserts.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h3 className="text-xl font-semibold text-slate-900">Materiaalkeuze</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {materialHighlights.map((item) => (
                  <li key={item.name} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                    <p className="mt-1">{item.detail}</p>
                    <Link href={item.link} className="mt-2 inline-flex items-center text-sm font-semibold text-indigo-600 transition hover:text-indigo-500">
                      Lees materiaalfiche
                      <span aria-hidden className="ml-1">-&gt;</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section id="fasteners-sources" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 id="sources" className="text-xl font-semibold text-slate-900">Bronnen en referenties</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {references.map((reference) => (
                  <li key={reference.href} className="rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3">
                    <cite className="not-italic">
                      <a
                        href={reference.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
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

      <BlogContentOverview locale="nl" />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 id="fasteners-selftapping" className="scroll-mt-28 text-2xl font-semibold text-slate-900">
                2. Zelftappende schroeven in FDM
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Zelftappers zijn snel, goedkoop en verrassend betrouwbaar zolang je ontwerp klopt. Kies altijd thread-forming
                varianten (Plastite/PT) zodat je geen spanen creëert. Gebruik onderstaande pilotmaten:
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-slate-500">
                      <th className="py-2 pr-4">Schroef</th>
                      <th className="py-2 pr-4">Voorboordiameter</th>
                      <th className="py-2 pr-4">Materialen</th>
                      <th className="py-2 pr-4">Opmerking</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selfTappingTable.map((row) => (
                      <tr key={row.screw}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{row.screw}</td>
                        <td className="py-3 pr-4">{row.pilot}</td>
                        <td className="py-3 pr-4">{row.materials}</td>
                        <td className="py-3 pr-4">{row.remark}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Zorg voor bosses (diameter ≥ 2× schroef) en schroef nooit met impacttools. Reken op een beperkt aantal cycli;
                moet het vaker los/vast? Gebruik inserts.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 id="fasteners-inserts" className="scroll-mt-28 text-2xl font-semibold text-slate-900">
                3. Heat set inserts: industriële standaard
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Voor behuizingen, fixtures en alles dat serviceable moet blijven, zijn heat set inserts onklopbaar. Messing inserts
                met knurling smelten zichzelf in PETG of PLA en leveren een metalen draad.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-slate-500">
                      <th className="py-2 pr-4">Insert</th>
                      <th className="py-2 pr-4">Gat Ø</th>
                      <th className="py-2 pr-4">Opmerking</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {insertTable.map((row) => (
                      <tr key={row.insert}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{row.insert}</td>
                        <td className="py-3 pr-4">{row.pocket}</td>
                        <td className="py-3 pr-4">{row.comment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Gebruik een soldeerbout of nozzle-tip op 260–300 °C, druk langzaam tot het vlak is, laat afkoelen. Plaats inserts
                altijd zo dat de belastingskracht parallel loopt met de layer-lines. Zo voorkom je scheuren.
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Toch ABS/ASA/nylon nodig voor hitte of chemische bestendigheid? Onze productie draait op PLA/PETG/TPU voor
                snelheid en kwaliteit. Meld je high-temp eisen tijdens de intake; dan bekijken we of een partner-run of hybride
                aanpak logisch is.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h3 className="text-xl font-semibold text-slate-900">Temperatuur & oriëntatie</h3>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                <li>Soldeerbout/nozzle-tip op 260–300 °C.</li>
                <li>Voeg 0.3–0.5 mm chamfer toe zodat de insert zichzelf centreert.</li>
                <li>Druk in één vloeiende beweging en laat het materiaal rondom volledig afkoelen.</li>
                <li>Oriënteer het onderdeel zodat de insert parallel aan de layers belast wordt.</li>
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 id="fasteners-mistakes" className="scroll-mt-28 text-2xl font-semibold text-slate-900">
                4. Veelgemaakte fouten
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {mistakes.map((item) => (
                  <li key={item} className="rounded-2xl border border-slate-100 bg-white/70 p-3">
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 id="fasteners-checklist" className="scroll-mt-28 text-2xl font-semibold text-slate-900">
                5. Checklist voor je CAD
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {checklist.map((item) => (
                  <li key={item} className="rounded-2xl border border-slate-100 bg-white/70 p-3">
                    {item}
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
              <h2 className="text-2xl font-semibold text-slate-900">6. Wanneer X3DPrints inschakelen?</h2>
              <p className="mt-2 text-sm text-slate-600">
                We reviewen dagelijks ontwerpen waar schroefdraad de bottleneck vormt. Laat ons meekijken bij kritieke bevestigingen
                en we optimaliseren bosses, inserts, materiaalkeuze en tolerantie. Typische situaties:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                <li>Behuizingen met herhaaldelijk los/vast schroeven.</li>
                <li>Fixtures of tools die torsie krijgen.</li>
                <li>Sensorhouders voor outdoor gebruik (zie Maker Monday #1 over buitengebruik).</li>
                <li>Omzetting van native CAD naar printbare FDM-versies inclusief boss/inserts.</li>
                <li>Prototyping van nieuwe productlijnen met testprints + schroefproeven.</li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <ShimmerButton href="/contact?topic=maker-monday-fasteners">Plan een consult</ShimmerButton>
                <Link
                  href="/viewer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Upload via viewer
                </Link>
              </div>
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Twijfel je tussen inserts, draad of zelftappers?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Deel je STL of STEP, vertel welk schroeftype je verwacht en hoeveel cycli het moet doorstaan. We koppelen terug
                  met ontwerpaanpassingen, materiaaladvies en een transparante kostinschatting.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/contact?topic=maker-monday-fasteners">Start intake</ShimmerButton>
                <Link href="/3d-printen" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Bekijk knowledge hub
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






