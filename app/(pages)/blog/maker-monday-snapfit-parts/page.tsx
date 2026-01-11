import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"

const canonical = "https://www.x3dprints.be/blog/maker-monday-snapfit-parts"
const publishedDate = "2026-01-10T08:00:00+01:00"

export const metadata: Metadata = {
  title: "Maker Monday #8: Snap-fit parts die blijven klikken | X3DPrints",
  description:
    "Ontwerp snap-fit parts en behuizingen die niet breken. Types (cantilever, torsie, annular), tolerantie per materiaal, arm-diktes, ribbing en testprotocol.",
  alternates: { canonical },
  openGraph: {
    title: "Maker Monday #8: Snap-fit parts die blijven klikken",
    description:
      "Complete gids voor klikverbindingen in PLA, PETG en TPU: arm-lengtes, fillets, clearance, orientatie en testplan. Inclusief interne checklists en externe referentie.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: [
      "snap fit parts",
      "snapfits 3d printen",
      "PLA snapfit",
      "PETG clips",
      "TPU dempers",
      "FDM ontwerp richtlijnen",
    ],
    images: [
      {
        url: "/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Maker Monday snap-fit parts",
      },
    ],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maker Monday #8: Snap-fit parts die blijven klikken",
    description:
      "Hoe ontwerp je snap-fit clips voor PLA, PETG en TPU? Types, toleranties, arm-diktes, ribbing en testplan in \u00e9\u00e9n gids.",
    images: ["/images/og-home.jpg"],
  },
}

const heroStats = [
  { label: "Clearance", value: "PLA +0.15 mm", detail: "Radiaal, op nominale maat" },
  { label: "Arm-dikte", value: "0.8-1.1 x nozzle", detail: "PETG cantilever clips" },
  { label: "Fillet", value: "0.8-1.2 mm", detail: "Aan armwortel om stress te spreiden" },
]

const snapfitTypes = [
  {
    title: "Cantilever snap-fits",
    body:
      "Klassieke arm die naar buiten buigt. Beste keuze voor behuizingen met beperkte ruimte. Kies PETG voor functionele belasting; PLA enkel cosmetisch.",
    checklist: [
      "Arm-dikte = 0.8-1.1 x nozzle width",
      "Arm-lengte = 8-12 x dikte voor lage spanning",
      "Fillet 0.8-1.2 mm aan de wortel",
    ],
  },
  {
    title: "Torsie / living hinge snaps",
    body:
      "Korte, brede armen die torsie opnemen. Handig voor clip-in covers of kabelklemmen. Print in PETG of TPU; PLA breekt snel bij herhaald buigen.",
    checklist: [
      "Wanddikte 2.0-2.4 mm rond de torsiezone",
      "Gebruik ribs dwars op de arm om rotatie te beperken",
      "Combineer met chamfered lead-ins voor soepel klikken",
    ],
  },
  {
    title: "Annular / ring snaps",
    body:
      "Ronde clips voor potjes of buisvormige onderdelen. Plaats de locking bead in een chamfered groove en kies PETG om stress te verdelen over de ring.",
    checklist: [
      "Groefdiepte 0.6-0.8 mm bij PLA, 0.8-1.0 mm bij PETG",
      "Lead-in chamfer 30-45 graden",
      "Vermijd scherpe binnenhoeken; voeg 0.8 mm fillets toe",
    ],
  },
]

const clearanceTable = [
  { material: "PLA", cantilever: "+0.15 mm radiaal", annular: "+0.10 mm", notes: "Gebruik fillets, geen scherpe hoeken" },
  { material: "PETG", cantilever: "+0.20 mm radiaal", annular: "+0.15 mm", notes: "Beste mix van taai en flexibel" },
  { material: "TPU (95A)", cantilever: "+0.30 mm radiaal", annular: "+0.25 mm", notes: "Gebruik korte armen, werkt als demper" },
]

const failureModes = [
  "Armen scheuren bij de wortel door geen fillet of te korte arm (spanweken te hoog).",
  "Clip breekt na twee cycli omdat PLA gebruikt is voor een functionele, vaak gedemonteerde behuizing.",
  "Elephant&apos;s foot vult de groove; clearance is weg en de clip past niet.",
  "Layer-lines staan loodrecht op de buigrichting waardoor delaminatie optreedt.",
  "Geen lead-in: gebruikers forceren het onderdeel en wrikken het kapot.",
]

const testChecklist = [
  "Print een halve snap op 0.20 mm layer height en check fit voor je het hele product print.",
  "Meet elephant&apos;s foot en corrigeer via chamfer (0.2-0.3 mm) of slicer compensation.",
  "Test 10 cycli met de hand; voel of de arm terugveert en luister naar beginnende scheuren.",
  "Beoordeel in twee prints met verschillende arm-diktes (bijv. 0.9 mm en 1.1 mm) om de sweet spot te vinden.",
  "Noteer materiaal, nozzle, layer height en orientatie; koppel findings terug in CAD zodat toekomstige runs voorspelbaar zijn.",
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Maker Monday #8: Snap-fit parts die blijven klikken",
  description:
    "Ontwerp snap-fit onderdelen voor PLA, PETG en TPU met juiste clearance, fillets, arm-diktes en testprotocol. Bevat interne links naar wanddikte- en tolerantiegidsen.",
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

export default function MakerMondaySnapfitPartsPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(180%_90%_at_50%_-20%,rgba(99,102,241,0.15),transparent_75%)]"
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
                <li className="font-medium text-slate-900">Snap-fit parts</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Maker Monday #8</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Snap-fit parts die echt blijven klikken (en niet na twee keer breken).
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Snap-fit parts zijn fantastisch voor snelle montage, maar alleen als je de buigzone, clearance en orientatie
              klopt. In deze Maker Monday bouwen we voort op de clip-richtlijnen uit editie #4 en combineren we ze met
              tolerantie- en wanddiktedata uit #2 en #3. Zo krijg je behuizingen en covers die herhaalbaar klikken in PLA,
              PETG of TPU.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/contact?topic=maker-monday-snapfits">Vraag snap-fit review</ShimmerButton>
              <Link
                href="/materials"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Materialenoverzicht
              </Link>
              <Link
                href="/contact?material=PETG"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Plan een PETG run
              </Link>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {heroStats.map(({ label, value, detail }) => (
                <GlassCard key={label} className="space-y-1 rounded-2xl border border-indigo-100/70 bg-white/80 p-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500">{label}</div>
                  <div className="text-xl font-bold text-slate-900">{value}</div>
                  <p className="text-sm text-slate-600">{detail}</p>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <SectionDivider />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-6">
            <Reveal className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Types</p>
              <h2 className="text-2xl font-bold text-slate-900">Drie snap-fit families en wanneer je ze inzet</h2>
              <p className="text-slate-700">
                Kies het type snap-fit op basis van richting van belasting en hoeveel cycli je verwacht. Cantilever arms zijn
                ideaal voor covers, torsieclips voor klemmen en annular snaps voor ronde potjes of buisverbindingen. Test
                altijd met dezelfde orientatie als de productieprint.
              </p>
            </Reveal>
            <div className="grid gap-4 md:grid-cols-2">
              {snapfitTypes.map((item) => (
                <GlassCard key={item.title} className="rounded-2xl border border-slate-100 bg-white/80 p-5">
                  <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                  <p className="mt-2 text-sm text-slate-600">{item.body}</p>
                  <ul className="mt-3 space-y-1 text-sm text-slate-600">
                    {item.checklist.map((line) => (
                      <li key={line} className="flex gap-2">
                        <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              ))}
              <GlassCard className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-5 md:col-span-2">
                <div className="text-sm font-semibold text-indigo-700">Ori\u00ebntatie cheat</div>
                <p className="mt-2 text-sm text-indigo-800">
                  Zet de buigzone parallel aan de layer-lines (arm ligt in het XY-vlak). Zo voorkom je delaminatie. Gebruik
                  4-5 perimeters voor clips in PLA en 3-4 perimeters in PETG; infill levert weinig buigstijfheid.
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-indigo-700">
                  <Link href="/blog/maker-monday-wanddiktes-ribs" className="underline underline-offset-4">
                    Maker Monday #2
                  </Link>
                  <Link href="/blog/maker-monday-toleranties-3d-printen" className="underline underline-offset-4">
                    Maker Monday #3
                  </Link>
                  <Link href="/blog/maker-monday-warping-layer-cracks" className="underline underline-offset-4">
                    Maker Monday #6
                  </Link>
                </div>
              </GlassCard>
            </div>
            <GlassCard className="rounded-2xl border border-slate-100 bg-white/80 p-5">
              <div className="text-sm font-semibold text-slate-900">Fusion 360 workflow voor snap-fits</div>
              <p className="mt-2 text-sm text-slate-700">
                Wij modelleren snap-fits bijna altijd in Fusion 360. Zo houden we de spelingen parametrisch en kunnen we snel itereren
                zonder STL-remix. Hanteer deze aanpak:
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li className="flex gap-2">
                  <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  <span>
                    Gebruik <strong>user parameters</strong> voor `arm_thickness`, `clearance` en `fillet_root`. Zo pas je per materiaal aan:
                    PLA: clearance 0.15; PETG: 0.20; TPU: 0.30.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  <span>
                    Teken de arm in een <strong>schets in XY</strong> (parallel aan layers). Gebruik Extrude met taper -1 to -2 graden voor
                    lead-ins in plaats van achteraf chamfers te boetseren.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  <span>
                    Zet een <strong>fillet aan de wortel</strong> met de parameter `fillet_root`. Combineer met een rib (Sweep) dwars op de arm voor
                    torsiestijfheid. Houd de rib dikte 0.8-1.2 mm.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  <span>
                    Gebruik <strong>Combine (Cut)</strong> of Interference check tussen cover en base om de groove-diepte te meten. Voeg daarna 0.1-0.2 mm
                    extra clearance via een parameter zodat elephant&apos;s foot ruimte krijgt.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  <span>
                    Maak een <strong>configuratie voor testclips</strong>: split body zodat je een halve clip apart kan exporteren. Zo print je twee varianten
                    (0.9 mm en 1.1 mm arm) zonder je hoofdmodel te vervuilen.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  <span>
                    Plaats <strong>Joint Origin</strong> of Construction Planes op de lock-feature. Handig om de arm snel te alignen, of om later een insert of
                    schroefgat (Maker Monday #5/#7) te positioneren.
                  </span>
                </li>
              </ul>
              <p className="mt-3 text-xs text-slate-500">
                Pro-tip: houd de timeline clean en markeer snapshots na elke fit-test. Zo kan je mislukkingen vergelijken zonder CAD-chaos.
              </p>
            </GlassCard>
          </div>

          <aside className="space-y-4">
            <GlassCard className="rounded-2xl border border-slate-100 bg-white/80 p-5">
              <div className="text-sm font-semibold text-slate-900">Clearance per materiaal</div>
              <p className="mt-2 text-sm text-slate-600">
                Startwaarden voor de locking features. Combineer met de tolerantie-richtlijnen uit Maker Monday #3 en corrigeer
                voor elephant&apos;s foot bij brede bases.
              </p>
              <div className="mt-4 space-y-3">
                {clearanceTable.map((row) => (
                  <div key={row.material} className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
                    <div className="flex items-center justify-between text-sm font-semibold text-slate-900">
                      <span>{row.material}</span>
                      <span className="text-xs uppercase tracking-[0.15em] text-indigo-500">Snap-fit</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-700">Cantilever: {row.cantilever}</p>
                    <p className="text-sm text-slate-700">Annular: {row.annular}</p>
                    <p className="mt-1 text-xs text-slate-500">{row.notes}</p>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5">
              <div className="text-sm font-semibold text-amber-800">Externe referentie</div>
              <p className="mt-2 text-sm text-amber-800">
                Wil je nog dieper duiken? Hubs publiceerde een sterke samenvatting van snap-fit ontwerprichtlijnen voor 3D
                printing.
              </p>
              <Link
                href="https://www.hubs.com/knowledge-base/how-design-snap-fit-joints-3d-printing/"
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-amber-900 underline underline-offset-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                Naar Hubs gids
              </Link>
            </GlassCard>
          </aside>
        </div>
      </section>

      <SectionDivider />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-8">
          <Reveal className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Checklist</p>
            <h2 className="text-2xl font-bold text-slate-900">Veelgemaakte fouten en hoe je ze voorkomt</h2>
            <p className="text-slate-700">
              Snap-fit parts falen vaak op dezelfde punten. Gebruik onderstaande lijst tijdens CAD-review en eerste testprint.
            </p>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            <GlassCard className="rounded-2xl border border-rose-100 bg-rose-50/70 p-5">
              <div className="text-sm font-semibold text-rose-800">Typische faalmodi</div>
              <ul className="mt-3 space-y-2 text-sm text-rose-900">
                {failureModes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
            <GlassCard className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5">
              <div className="text-sm font-semibold text-emerald-800">Testplan in 5 stappen</div>
              <ul className="mt-3 space-y-2 text-sm text-emerald-900">
                {testChecklist.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Volgende stappen</p>
            <h2 className="text-2xl font-bold text-slate-900">Van testclip naar productierun</h2>
            <p className="text-slate-700">
              Combineer deze richtlijnen met de wanddikte- en tolerantiechecklists uit Maker Monday #2 en #3. Voor behuizingen
              die vaak open moeten, kies PETG of TPU voor de clips en PLA Matte voor de cover. Gebruik inserts of zelftappers
              (zie Maker Monday #5 en #7) als een deel van de constructie schroefbaar moet blijven.
            </p>
            <div className="flex flex-wrap gap-3">
              <ShimmerButton href="/contact?topic=maker-monday-snapfits">Upload je model</ShimmerButton>
              <Link
                href="/blog/maker-monday-toleranties-3d-printen"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-white"
              >
                Lees Maker Monday #3
              </Link>
              <Link
                href="/contact?material=TPU"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-white"
              >
                Vraag TPU sample
              </Link>
            </div>
          </div>
          <GlassCard className="rounded-2xl border border-slate-100 bg-white/80 p-5">
            <div className="text-sm font-semibold text-slate-900">Interne links</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>
                <Link className="underline underline-offset-4" href="/materials">
                  Materialenbibliotheek
                </Link>
              </li>
              <li>
                <Link className="underline underline-offset-4" href="/materials#material-suggestion-tool">
                  Material Suggestion Tool
                </Link>
              </li>
              <li>
                <Link className="underline underline-offset-4" href="/segments/3d-printing-valentijn">
                  Segment: cadeau- en seizoensprints
                </Link>
              </li>
              <li>
                <Link className="underline underline-offset-4" href="/contact">
                  Offerteformulier
                </Link>
              </li>
            </ul>
            <p className="mt-3 text-xs text-slate-500">
              Werk je voor een lokaal bedrijf in Erpe-Mere of Gent? Voeg de segmentlink en materiaalkeuze toe in het formulier,
              dan kunnen we sneller terugkoppelen.
            </p>
          </GlassCard>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </main>
  )
}
