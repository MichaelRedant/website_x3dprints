import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/blog/maker-monday-schroefdraad-inserts"
const publishedDate = "2025-11-03T08:00:00+01:00"

export const metadata: Metadata = {
  title: "Maker Monday #5: Schroefdraad, inserts en bevestigingen in 3D prints | X3DPrints",
  description:
    "Ultieme gids voor schroefdraad 3D printen: ontwerpregels voor schroefgaten, heat-set inserts, bosses en moeren in PLA, PETG en TPU.",
  alternates: { canonical },
  openGraph: {
    title: "Maker Monday #5: Schroefdraad & inserts in FDM",
    description:
      "Leer hoe je schroefgaten, heat-set inserts en bosses ontwerpt voor PLA, PETG en TPU. Plus slicer tips en materiaaladvies.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: [
      "schroefdraad 3D printen",
      "heat set inserts",
      "3D print bevestiging",
      "thread design FDM",
      "schroefgaten FDM",
    ],
    images: [
      {
        url: "/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "FDM schroefdraad en inserts voorbeeld",
      },
    ],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maker Monday: Schroefdraad & inserts in 3D prints",
    description:
      "Ontwerpregels voor schroefgaten, heat-set inserts en bosses in PLA, PETG en TPU. Inclusief test- en orientatietips.",
    images: ["/images/og-home.jpg"],
  },
}

const heroStats = [
  { label: "Heat-set dikte", value: "≥ 2 mm", detail: "Materiaal rondom insert" },
  { label: "Boss diameter", value: "2.5× schroef", detail: "Voor zelftappers" },
  { label: "Hole offset", value: "+0.2 mm", detail: "CAD versus print" },
]

const holeTable = [
  { screw: "M2", drill: "1.6 mm", cad: "1.8 – 1.9 mm" },
  { screw: "M3", drill: "2.5 mm", cad: "2.8 – 3.0 mm" },
  { screw: "M4", drill: "3.3 mm", cad: "3.6 – 3.8 mm" },
  { screw: "M5", drill: "4.2 mm", cad: "4.5 – 4.7 mm" },
]

const wallThickness = [
  { material: "PLA", value: "≥ 2.0 mm" },
  { material: "PETG", value: "≥ 2.4 mm" },
  { material: "TPU", value: "≥ 3.0 mm" },
]

const insertGuidelines = [
  "Houd minimaal 1.5 – 2.5 mm materiaal rondom de insert-pocket.",
  "Voeg bovenaan een chamfer van 0.3 – 0.5 mm toe zodat de insert zichzelf centreert.",
  "Hou de pocketdiameter dicht bij de datasheet; voeg enkel 0.1 – 0.2 mm toe voor PETG expansie.",
  "Plaats inserts niet dwars op layer-lines zonder extra steun: print een boss of rib erachter.",
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Maker Monday #5: De ultieme gids voor schroefdraad, inserts en bevestigingen in 3D prints",
  description:
    "Praktische regels voor schroefgaten, self-tapping screws, heat-set inserts, bosses en geprinte draad in PLA, PETG en TPU.",
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
      url: "https://www.x3dprints.be/images/og-home.jpg",
    },
  },
  mainEntityOfPage: canonical,
  url: canonical,
  image: "https://www.x3dprints.be/images/og-home.jpg",
}

function SectionDivider() {
  return (
    <div className="mx-auto my-12 flex w-full max-w-4xl items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-500">
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-indigo-300/0 via-indigo-300/60 to-indigo-300/0" />
      <span>Maker Monday</span>
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-indigo-300/0 via-indigo-300/60 to-indigo-300/0" />
    </div>
  )
}

export default function MakerMondaySchroefdraadInsertsPage() {
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
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Maker Monday #5</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              De ultieme gids: schroefdraad, inserts en bevestigingen in 3D prints.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Schroeven en inserts lijken triviaal, maar in FDM zijn ze de nummer-één oorzaak van breuken. Te dunne wanden, de
              verkeerde draad of geen fillet rond een schroefgat zorgen ervoor dat een onderdeel het begeeft. Deze gids toont hoe
              je bevestigingen ontwerpt die standhouden in PLA, PETG en TPU.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/contact?topic=maker-monday-fasteners">Vraag bevestigingsadvies</ShimmerButton>
              <Link
                href="/materials"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Materialen
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Zie prijsimpact
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">Gepubliceerd op 3 november 2025 • Maker Monday knowledge hub.</p>
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

      <SectionDivider />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">1. Print geen fijne draad tenzij het moet</h2>
              <p className="mt-2 text-sm text-slate-600">
                Kleine FDM-draad smelt samen, verliest scherpte en breekt na enkele cycli. Gebruik geprinte draad enkel voor grote
                diameters (M20+), props of onderdelen die weinig belasting zien. Voor echte bevestigingen kies je metalen
                schroeven, inserts of ingesloten moeren.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">2. Schroefgaten ontwerpen</h2>
              <p className="mt-2 text-sm text-slate-600">
                Gaten komen kleiner uit dan getekend. Gebruik daarom deze CAD-diameters en combineer ze met de tolerantieregels
                uit{" "}
                <Link
                  href="/blog/maker-monday-toleranties-3d-printen"
                  className="font-semibold text-indigo-600 transition hover:text-indigo-500"
                >
                  Maker Monday #3
                </Link>
                .
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-slate-500">
                      <th className="py-2 pr-4">Schroef</th>
                      <th className="py-2 pr-4">Boordiameter</th>
                      <th className="py-2 pr-4">CAD diameter</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {holeTable.map((row) => (
                      <tr key={row.screw}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{row.screw}</td>
                        <td className="py-3 pr-4">{row.drill}</td>
                        <td className="py-3 pr-4">{row.cad}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Zorg ook voor voldoende wanddikte rond elk gat:{" "}
                <Link
                  href="/blog/maker-monday-wanddiktes-ribs"
                  className="font-semibold text-indigo-600 transition hover:text-indigo-500"
                >
                  Maker Monday #2
                </Link>{" "}
                legt uit waarom. Plaats 2-4 mm fillets rond schroefzones zodat spanning zich kan verspreiden.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">3. Wanddiktes rond schroefzones</h2>
              <p className="mt-2 text-sm text-slate-600">Onderstaande minimumwaarden voorkomen dat je wand scheurt.</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {wallThickness.map((item) => (
                  <li key={item.material} className="rounded-2xl border border-slate-100 bg-white/70 p-3">
                    <span className="font-semibold text-slate-900">{item.material}:</span> {item.value}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">Onder deze waarden draait een schroef alles los of breekt de wand.</p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">4. Self-tapping screws</h2>
              <p className="mt-2 text-sm text-slate-600">
                Kies Plastite/PT-schroeven of brede flankhoeken. Draai traag in, zorg voor voldoende materiaal en gebruik ze voor
                lage tot middelhoog belaste PLA of PETG onderdelen. Reken niet op eindeloze cycli: plan een boss of insert als je
                vaker wilt demonteren.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">5. Heat-set inserts</h2>
              <p className="mt-2 text-sm text-slate-600">
                Brass heat-set inserts in PETG zijn onze standaard voor functionele prototypes. Volg deze regels:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                {insertGuidelines.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                PLA kan inserts aan zolang de belasting licht blijft en de omgeving koel is. Voor fixtures, machineonderdelen of
                behuizingen blijft PETG de veiligste keuze.
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Moet je absoluut naar ABS, ASA of nylon? Geef het mee bij je aanvraag. We houden onze coreflow bewust bij PLA,
                PETG en TPU voor snelheid en voorspelbaarheid, maar kunnen altijd bekijken of een partner of hybride aanpak past
                bij je eisenpakket.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">6. Moeren insluiten</h2>
              <p className="mt-2 text-sm text-slate-600">
                Pauzeer de print, plaats een moer in een hex pocket (0.2 mm clearance) en print verder. Dit werkt uitstekend voor
                M3-M6 zolang je 2.0 mm (PLA), 2.4 mm (PETG) of 3.0 mm (TPU) materiaal rondom voorziet. Zorg dat de pocket diep
                genoeg is zodat de moer niet meedraait.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">7. Geprinte schroefdraad wanneer nodig</h2>
              <p className="mt-2 text-sm text-slate-600">
                Buisverbindingen, potdeksels en caps vanaf M20 kunnen prima geprint worden, bij voorkeur in PETG. Print iets
                hotter (240-250 °C), beperk koeling, gebruik lage snelheid en verhoog je perimeter count. PLA draad dient vooral
                voor visuele toepassingen.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">8. Oriëntatie en bosses</h2>
              <p className="mt-2 text-sm text-slate-600">
                Zorg dat de schroefkracht parallel loopt met de layers. Print schroefzones liefst verticaal of voeg bosses toe
                zodat de schroef haaks op voldoende materiaal staat. Richtlijn: boss diameter ≈ schroefdiameter × 2.5 en hoogte
                van minstens drie lagen. Ribs achter de boss verdelen trekspanning.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">9. Checklist vooraf</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                <li>Past het materiaal bij de belasting (PLA vs PETG vs TPU)?</li>
                <li>Voldoen wanddiktes en fillets aan de richtlijnen?</li>
                <li>Klopt de tolerantie volgens Maker Monday #3?</li>
                <li>Is de oriëntatie logisch en lopen krachten parallel aan de layers?</li>
                <li>Heb je een insert of boss nodig om de belasting te dragen?</li>
              </ul>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">10. Wanneer X3DPrints inschakelen?</h2>
              <p className="mt-2 text-sm text-slate-600">
                Heb je een kritisch bevestigingspunt, moet de draad perfect passen of combineer je inserts met PETG/TPU? Wij
                helpen met ontwerpoptimalisatie, pocketmaatvoering, schroefdraadstrategieën en materiaaladvies. Check{" "}
                <Link href="/pricing" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                  pricing
                </Link>{" "}
                en{" "}
                <Link href="/materials" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                  materialen
                </Link>{" "}
                voor onze aanpak.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ShimmerButton href="/contact?topic=maker-monday-fasteners">Plan een review</ShimmerButton>
                <Link
                  href="/viewer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Upload STL/STEP
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <SectionDivider />

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <GlassCard className="flex flex-col gap-6 border border-white/40 bg-white/85 p-6 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Volgende stap</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Twijfel je over een insert of indrukmoer?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Deel je ontwerp, aantal cycli en gewenste materiaal. We koppelen meteen terug met de juiste bevestigingsstrategie
                  en doorlooptijd.
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <BlogReadMore />

    </main>
  )
}




