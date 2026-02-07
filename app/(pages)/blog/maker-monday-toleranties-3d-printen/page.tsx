import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/blog/maker-monday-toleranties-3d-printen/"
const publishedDate = "2025-10-20T08:00:00+02:00"

export const metadata: Metadata = {
  title: "Maker Monday #3: Toleranties voor 3D printen | X3DPrints",
  description:
    "Realistische FDM toleranties voor PLA, PETG en TPU. Leer hoeveel speling je nodig hebt voor pen-gat, klikverbindingen, scharnieren en glijdende onderdelen.",
  alternates: { canonical },
  openGraph: {
    title: "Maker Monday #3: Hoeveel speling heb je nodig per materiaal?",
    description:
      "Studio-geteste toleranties voor PLA, PETG en TPU. Tabellen voor pen-gat, snapfits en glijdende onderdelen, plus slicer-invloeden.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: [
      "tolerantie 3D printen",
      "FDM tolerances",
      "speling PLA PETG TPU",
      "ontwerpregels FDM",
      "clearance 3D printen",
    ],
    images: [
      {
        url: "/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Grafiek met 3D print toleranties",
      },
    ],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maker Monday: Toleranties voor PLA, PETG en TPU",
    description:
      "Checklist voor FDM speling: pen-gat, snapfits, schuiven en scharnieren. Inclusief slicer tips en testprints.",
    images: ["/images/og-home.jpg"],
  },
}

const heroStats = [
  { label: "Baseline speling", value: "Â±0.15 mm", detail: "PLA glijdend" },
  { label: "PETG klik", value: "+0.30 mm", detail: "Extra ruimte voor zwelling" },
  { label: "TPU snap", value: "+0.60 mm", detail: "Flexibele onderdelen" },
]

const toleranceTable = [
  {
    material: "PLA",
    sliding: "+0.15 mm",
    click: "+0.20 mm",
    peg: "+0.20 â€“ 0.25 mm",
    hinge: "+0.20 mm",
    snap: "+0.25 mm",
  },
  {
    material: "PETG",
    sliding: "+0.25 mm",
    click: "+0.30 mm",
    peg: "+0.30 â€“ 0.35 mm",
    hinge: "+0.25 mm",
    snap: "+0.35 mm",
  },
  {
    material: "TPU",
    sliding: "+0.40 mm",
    click: "+0.50 mm",
    peg: "+0.50 mm",
    hinge: "+0.40 mm",
    snap: "+0.60 mm",
  },
]

const clearanceUseCases = [
  { use: "Schuifmechanisme", pla: "0.20 mm", petg: "0.30 mm", tpu: "0.40 â€“ 0.50 mm" },
  { use: "Rotatie / scharnier", pla: "0.20 mm", petg: "0.25 mm", tpu: "0.40 mm" },
  { use: "Sliding cover / rail", pla: "0.20 mm", petg: "0.30 mm", tpu: "0.40 mm" },
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Maker Monday #3: Toleranties voor 3D printen",
  description:
    "Hoeveel speling heb je nodig bij FDM? Bekijk de studio-toleranties voor PLA, PETG en TPU inclusief pen-gat, klikverbindingen en slicerfactoren.",
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

export default function MakerMondayTolerantiesPage() {
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
                <li className="font-medium text-slate-900">Toleranties voor FDM</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Maker Monday #3</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Toleranties voor 3D printen: hoeveel speling heb je nodig per materiaal?
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              FDM is exact genoeg zolang je weet waar de grenzen liggen. De printer is repliceerbaar, niet micrometernauwkeurig.
              Hier vind je de studio-geteste toleranties voor PLA, PETG en TPU, plus tips om slicer invloeden onder controle te
              houden.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/contact?topic=maker-monday-tolerances">Vraag tolerantie-review</ShimmerButton>
              <Link
                href="/materials"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Bekijk materialen
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Zie prijsimpact
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">
              Gepubliceerd op 20 oktober 2025 â€¢ Deel van de Maker Monday knowledge hub.
            </p>
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
              <h2 className="text-2xl font-semibold text-slate-900">1. Waarom tolerantie cruciaal is</h2>
              <p className="mt-2 text-sm text-slate-600">
                FDM-resultaten worden beÃ¯nvloed door extrusiebreedte, koeling, krimp, flow en slicer-rounding. Zelfs met een
                perfecte Bambu X1C, Prusa MK4 of Voron 2.4 zie je variaties van Â±0.10 tot 0.20 mm rond elke maat. Daarom moet je
                tolerantie inbouwen, niet hopen dat de slicer het oplost. Onthoud ook: interne maten worden kleiner, externe
                maten groter.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">2. Basisregel: interne vs externe maten</h2>
              <p className="mt-2 text-sm text-slate-600">
                Een gat van 10.00 mm print vaak als 9.80â€“9.90 mm. Een pen van 10.00 mm landt eerder op 10.10â€“10.20 mm. Daardoor
                is speling essentieel. Ontwerp altijd met een offset die aansluit bij het materiaal. Je kan de pen verkleinen,
                het gat vergroten of beide. De tabellen hieronder geven onze baseline.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">3. Toleranties per materiaal</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-slate-500">
                      <th className="py-2 pr-4">Materiaal</th>
                      <th className="py-2 pr-4">Glijdend</th>
                      <th className="py-2 pr-4">Klik</th>
                      <th className="py-2 pr-4">Pen-gat</th>
                      <th className="py-2 pr-4">Scharnier</th>
                      <th className="py-2 pr-4">Snapfit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {toleranceTable.map((row) => (
                      <tr key={row.material}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{row.material}</td>
                        <td className="py-3 pr-4">{row.sliding}</td>
                        <td className="py-3 pr-4">{row.click}</td>
                        <td className="py-3 pr-4">{row.peg}</td>
                        <td className="py-3 pr-4">{row.hinge}</td>
                        <td className="py-3 pr-4">{row.snap}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Versterk deze cijfers met de materiaalartikels:{" "}
                <Link href="/blog/filament-vrijdag-pla" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                  PLA
                </Link>
                ,{" "}
                <Link href="/blog/filament-vrijdag-petg" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                  PETG
                </Link>{" "}
                en{" "}
                <Link href="/blog/filament-vrijdag-tpu" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                  TPU
                </Link>
                .
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Werk je met ABS, ASA of nylon? Onze standaard flow focust op PLA, PETG en TPU omdat we daar snelle, reproduceerbare
                resultaten leveren. Geef tijdens de intake aan als je een high-temp kunststof nodig hebt; we bekijken of een partner
                of hybride traject zinvol is en communiceren helder over impact op planning en budget.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">4. Clearance voor bewegende delen</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-slate-500">
                      <th className="py-2 pr-4">Toepassing</th>
                      <th className="py-2 pr-4">PLA</th>
                      <th className="py-2 pr-4">PETG</th>
                      <th className="py-2 pr-4">TPU</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {clearanceUseCases.map((row) => (
                      <tr key={row.use}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{row.use}</td>
                        <td className="py-3 pr-4">{row.pla}</td>
                        <td className="py-3 pr-4">{row.petg}</td>
                        <td className="py-3 pr-4">{row.tpu}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Voor scharnieren verwijzen we naar{" "}
                <Link
                  href="/blog/maker-monday-fdm-scharnieren"
                  className="font-semibold text-indigo-600 transition hover:text-indigo-500"
                >
                  Maker Monday #1
                </Link>
                . Voor wanddiktes en ribs zie{" "}
                <Link
                  href="/blog/maker-monday-wanddiktes-ribs"
                  className="font-semibold text-indigo-600 transition hover:text-indigo-500"
                >
                  Maker Monday #2
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">5. Slicer-factoren</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                <li>
                  <span className="font-semibold">Line width:</span> een 0.4 mm nozzle print vaak 0.42â€“0.48 mm breed.
                  Houd hier rekening mee bij CAD-maten.
                </li>
                <li>
                  <span className="font-semibold">Elephant&apos;s foot:</span> eerste lagen zwellen iets. Voeg een 0.3 mm
                  chamfer toe, beperk first layer width of activeer koeling vroeger.
                </li>
                <li>
                  <span className="font-semibold">Hole compensation:</span> slicers zoals OrcaSlicer kunnen gaten corrigeren,
                  maar lossen geen fout ontwerp op. Gebruik het als fine-tuning.
                </li>
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Test je instellingen altijd op kleine fit blocks voordat je een volledige assembly print.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">6. Vermijd deze fouten</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li className="rounded-2xl border border-slate-100 bg-white/70 p-3">Gaten tekenen op 3.00 mm zonder speling.</li>
                <li className="rounded-2xl border border-slate-100 bg-white/70 p-3">Snapfits zonder fillets of rib-ondersteuning.</li>
                <li className="rounded-2xl border border-slate-100 bg-white/70 p-3">Te strakke PETG-assemblies die uitzetten en klemmen.</li>
                <li className="rounded-2xl border border-slate-100 bg-white/70 p-3">Assemblies ontwerpen zonder rekening met slicer rounding.</li>
                <li className="rounded-2xl border border-slate-100 bg-white/70 p-3">Wanddiktes gebruiken die geen veelvoud zijn van de nozzle.</li>
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Combineer tolerantie met de wand- en ribregels uit Maker Monday #2 zodat je geometrie slicer-proof wordt.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">7. Test prints zijn geen luxe</h2>
              <p className="mt-2 text-sm text-slate-600">
                We draaien altijd een tolerance tower (5â€“10 varianten), fit cubes of pin gauge tests voordat we een kritieke
                assembly printen. Zo ontdek je meteen welke spelingswaarde de sweet spot is voor jouw materiaal, nozzle en
                slicerinstellingen.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">8. Praktische scenario&apos;s</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                <li>Behuizing met schroefgaten: PLA +0.20 mm, PETG +0.30 mm.</li>
                <li>Twee delen die klikken: PLA +0.25 mm, PETG +0.30 mm, TPU +0.50 mm.</li>
                <li>Draaibare onderdelen: PLA +0.20 mm, PETG +0.25 mm, TPU +0.40 mm.</li>
                <li>Strakke inserts of moeren: 0.10â€“0.20 mm negatieve tolerantie en bekijk{" "}
                  <Link
                    href="/blog/maker-monday-schroefdraad-inserts"
                    className="font-semibold text-indigo-600 transition hover:text-indigo-500"
                  >
                    Maker Monday #5
                  </Link>{" "}
                  binnenkort.
                </li>
              </ul>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">9. Wanneer X3DPrints inschakelen?</h2>
              <p className="mt-2 text-sm text-slate-600">
                Laat ons meekijken wanneer je ontwerp beweegt, klikt, scharniert of PETG/TPU combineert. We optimaliseren
                speling, wanddiktes, oriÃ«ntatie en materiaalkeuze zodat je assembly in Ã©Ã©n keer klopt.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ShimmerButton href="/contact?topic=maker-monday-tolerances">Plan een review</ShimmerButton>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Bekijk pricing & workflow
                </Link>
              </div>
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Twijfel je over een klik, scharnier of insert?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Deel je STL of STEP, vermeld het materiaal en de toepassing. We koppelen de juiste tolerantie, wanddikte en
                  kost terug in lijn met onze{" "}
                  <Link href="/pricing" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                    pricing
                  </Link>{" "}
                  en workflow.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/contact?topic=maker-monday-tolerances">Start intake</ShimmerButton>
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





