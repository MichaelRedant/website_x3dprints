import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/blog/use-case-dinsdag-tabletop"
const publishedDate = "2025-12-16T08:00:00+01:00"

export const metadata: Metadata = {
  title: "Use Case Dinsdag #4: 3D printen voor tabletop & props",
  description:
    "Handleiding voor miniaturen, terrain en cosplay props met FDM. Leer materiaalkeuze, slicing, splitting en afwerking zodat je prints klaar zijn voor verf of events.",
  alternates: { canonical },
  openGraph: {
    title: "Use Case Dinsdag #4: Tabletop & props 3D printen",
    description:
      "Vergelijk FDM vs SLA, ontdek de beste PLA blends en PETG workflows en krijg tips voor painting, sanding en slimme model-splitsing.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: [
      "3D printen tabletop",
      "miniaturen printen",
      "cosplay props",
      "PLA matte miniatures",
      "Use Case Dinsdag",
    ],
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "3D geprinte tabletop terrain en props" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Use Case Dinsdag: Tabletop & props 3D printen",
    description:
      "FDM miniaturen en cosplay onderdelen met PLA Matte, Marble, Silk en PETG. Inclusief painting- en splittingtips plus Maker Monday verwijzingen.",
    images: ["/images/og-home.jpg"],
  },
}

const heroStats = [
  { label: "Aanbevolen basis", value: "PLA Matte", detail: "Detail + schilderklaar" },
  { label: "Propstructuur", value: "PETG + inserts", detail: "Taai en modulair" },
  { label: "Finishing", value: "220-800 grit + primer", detail: "Zie Finishing Friday" },
]

const fdmVsSla = [
  {
    title: "Wanneer FDM wint",
    items: [
      "Miniaturen vanaf 60-80 mm, bustes en terrain modules.",
      "Cosplay armor en props die licht maar sterk moeten zijn.",
      "Scenery die vaak vervoerd wordt (con tables, DM travel kits).",
      "Decorstukken die profiteren van PLA Marble of Wood textuur.",
    ],
  },
  {
    title: "Wanneer SLA beter is",
    items: [
      "Miniaturen onder 40-50 mm met microdetails.",
      "Display pieces zonder zichtbare layer lines.",
      "Gezichtsfeatures of sieraden die extreme scherpte vragen.",
      "Projecten waar schuren absoluut vermeden moet worden.",
    ],
  },
]

const materialOptions = [
  {
    name: "PLA Matte",
    detail: "Verbergt layer lines, schildert egaal en is rustig te slicen. Ideaal voor minis, terrain en bustes.",
    link: { label: "Lees PLA materiaalblog", href: "/blog/filament-vrijdag-pla" },
  },
  {
    name: "PLA Marble",
    detail: "Steenachtige look voor ruines, standbeelden en dungeon scenery. Scheelt veel paintwerk.",
    link: { label: "Lees PLA Marble blog", href: "/blog/filament-vrijdag-pla-marble" },
  },
  {
    name: "PLA Silk / Silk+",
    detail: "Spiegelglans voor sci-fi props, zwaarden en accenten. Gebruik lagere snelheid en seam control.",
    link: { label: "Lees PLA Silk blog", href: "/blog/filament-vrijdag-pla-silk-plus" },
  },
  {
    name: "PETG",
    detail: "Taai voor props die gedragen of vervoerd worden. Combineer met inserts en ribben voor sterkte.",
    link: { label: "Lees PETG blog", href: "/blog/filament-vrijdag-petg" },
  },
  {
    name: "TPU (optioneel)",
    detail: "Voor straps, flexibele klemmen en demping rond props. Print langzaam en test tolerantie.",
    link: { label: "Lees TPU blog", href: "/blog/filament-vrijdag-tpu" },
  },
]

const designTips = [
  {
    title: "Details vergroten",
    detail:
      "Verdiep engravings, verbreed plooien en schaal resin-STL's naar 120-150 percent. FDM beloont bold details.",
  },
  {
    title: "Layer heights",
    detail:
      "0.16 mm voor minis, 0.12 mm voor bustes, 0.20 mm voor terrain en 0.24-0.28 mm voor grote props. Pas aan per stuk.",
  },
  {
    title: "Seam placement",
    detail: "Gebruik een achter seam of manuele seam-lijn. Concentric top layers werken goed op ronde bustes.",
  },
  {
    title: "Tree supports",
    detail: "Organische of tree supports verwijderen makkelijk zonder details te breken. Zet contactpunten op ruwe zones.",
  },
  {
    title: "Splitting en inserts",
    detail:
      "Snij op natuurlijke lijnen, voeg alignment pins toe en gebruik M3 inserts zoals in Maker Monday #5 voor herhaalbare montage.",
  },
]

const finishingSteps = [
  { step: "Schuren", detail: "220 > 400 > 800 grit. PLA Marble vraagt vaak enkel een lichte sanding." },
  {
    step: "Primer",
    detail: "Gebruik filler primer voor props en een standaard hobbyprimer voor minis. Zie Finishing Friday.",
  },
  { step: "Basecoat", detail: "Acrylverf van Vallejo, Army Painter of Citadel hecht goed op PLA en PETG." },
  { step: "Washes & drybrush", detail: "Layer lines versterken schaduw op terrain. Werk in dunne lagen." },
  { step: "Varnish", detail: "Seal met matte varnish zodat verf beschermd blijft tijdens transport." },
]

const userWorkflows = [
  {
    title: "Dungeon Masters",
    tips: [
      "Print terrain in PLA Matte of Marble en gebruik inserts voor modulaire dungeons.",
      "Bustes op 140-180 percent geven duidelijke NPC referenties.",
      "Combineer scenery met opschaalbare minis zodat alles consistent oogt.",
    ],
    link: { label: "Bekijk tabletop segment", href: "/segments/3d-printing-tabletop" },
  },
  {
    title: "Cosplayers",
    tips: [
      "Kies PETG of PLA Matte voor armor panels en grote props.",
      "Splits onderdelen op armor lijnen en gebruik heat forming (PLA/PETG).",
      "Voeg TPU straps toe voor comfort.",
    ],
    link: { label: "Lees makers segment", href: "/segments/3d-printing-makers" },
  },
  {
    title: "Bordspelontwerpers",
    tips: [
      "Prototype in PLA Matte, finaliseer zichtdelen in Silk of Marble.",
      "Gebruik PETG voor mechanische onderdelen zoals dobbelstenenhouders.",
      "Koppel aan Maker Monday #2 en #3 voor structurele delen.",
    ],
    link: { label: "Bekijk prototypes segment", href: "/segments/3d-printing-prototypes" },
  },
]

const commonMistakes = [
  { issue: "Mini's niet opschalen", fix: "Gebruik 120-150 percent scaling zodat details leesbaar zijn." },
  { issue: "Silk voor minis", fix: "Silk slokt details op. Gebruik het voor props of accenten, niet voor 28 mm figs." },
  {
    issue: "Supports blokkeren details",
    fix: "Stap over op tree supports of stel contact diameter kleiner in. Test een kwart van je model.",
  },
  {
    issue: "Te weinig perimeters",
    fix: "Gebruik 3-4 perimeters voor terrain en props zodat schuren en heat forming veilig kan.",
  },
  {
    issue: "Geen splitting",
    fix: "Grote props zonder splits krommen. Snij ze op armor lijnen en gebruik inserts of sleuven.",
  },
]

const engagementScenarios = [
  {
    title: "Miniaturen & terrain",
    detail: "Bustes, terrain modules en display pieces in PLA Matte, Marble of Wood. Perfect voor DMs en makerspaces.",
  },
  {
    title: "Cosplay en props",
    detail: "PETG onderdelen met inserts, ribbing en post-processing zodat je veilig kunt dragen en transporteren.",
  },
  {
    title: "Events & prototypes",
    detail: "Snelle iteraties voor stands, beurzen of showpieces die extra finishing nodig hebben.",
  },
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Use Case Dinsdag #4: 3D printen voor tabletop & props",
  description:
    "Gids voor FDM miniaturen, terrain en cosplay props met PLA Matte, Marble, Silk en PETG. Inclusief slicing-, splitting- en painting-tips.",
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
      <span>Use Case Dinsdag</span>
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-indigo-300/0 via-indigo-300/60 to-indigo-300/0" />
    </div>
  )
}

export default function UseCaseDinsdagTabletopPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(180%_90%_at_50%_-20%,rgba(59,130,246,0.14),transparent_75%)]"
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
                <li className="font-medium text-slate-700">Use Case Dinsdag</li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-900">Tabletop & props</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Use Case Dinsdag #4</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              3D printen voor tabletop en props: detail, sanding, painting en slimme splits.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Miniaturen en cosplay onderdelen vragen finesse in plaats van brute sterkte. Deze gids toont hoe je FDM inzet voor
              scherpe details, draagbare props en scenery die verf en transport aankan.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/contact?topic=use-case-tabletop">Vraag tabletop-advies</ShimmerButton>
              <Link
                href="/segments/3d-printing-tabletop"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Segment: Tabletop
              </Link>
              <Link
                href="/blog/finishing-friday-schuren-primen-lakken"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Finishing Friday
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">Gepubliceerd op 16 december 2025 - Use Case Dinsdag.</p>
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
          {fdmVsSla.map((block) => (
            <Reveal key={block.title}>
              <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
                <h2 className="text-2xl font-semibold text-slate-900">{block.title}</h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-slate-600">
                  Afwerkingstijd verschilt sterk. Zie{" "}
                  <Link
                    href="/blog/finishing-friday-schuren-primen-lakken"
                    className="font-semibold text-indigo-600 transition hover:text-indigo-500"
                  >
                    Finishing Friday
                  </Link>{" "}
                  voor workloadvergelijking tussen FDM en resin.
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">2. Materiaalkeuze voor minis en props</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {materialOptions.map((material) => (
                  <div key={material.name} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <p className="text-sm font-semibold text-slate-900">{material.name}</p>
                    <p className="mt-2 text-sm text-slate-600">{material.detail}</p>
                    <Link
                      href={material.link.href}
                      className="mt-3 inline-flex items-center text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
                    >
                      {material.link.label}
                      <span aria-hidden className="ml-2">-&gt;</span>
                    </Link>
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
              <h2 className="text-2xl font-semibold text-slate-900">3. Ontwerp- en slicingrichtlijnen</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {designTips.map((tip) => (
                  <li key={tip.title} className="rounded-2xl border border-slate-100 bg-white/70 p-3">
                    <p className="text-sm font-semibold text-slate-900">{tip.title}</p>
                    <p className="mt-1">{tip.detail}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Combineer deze tips met Maker Monday #2 (wanddiktes), #4 (clips & snapfits) en #5 (inserts) zodat props structureel
                kloppen.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">4. Painting workflow voor FDM minis</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {finishingSteps.map((step) => (
                  <div key={step.step} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <p className="text-sm font-semibold text-slate-900">{step.step}</p>
                    <p className="mt-2 text-sm text-slate-600">{step.detail}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Volg{" "}
                <Link
                  href="/blog/finishing-friday-schuren-primen-lakken"
                  className="font-semibold text-indigo-600 transition hover:text-indigo-500"
                >
                  Finishing Friday
                </Link>{" "}
                voor uitgebreide sanding- en primingtips.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3">
          {userWorkflows.map((workflow) => (
            <Reveal key={workflow.title}>
              <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
                <h2 className="text-2xl font-semibold text-slate-900">{workflow.title}</h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                  {workflow.tips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
                <Link
                  href={workflow.link.href}
                  className="mt-4 inline-flex items-center text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
                >
                  {workflow.link.label}
                  <span aria-hidden className="ml-2">-&gt;</span>
                </Link>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">5. Veelvoorkomende fouten</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {commonMistakes.map((mistake) => (
                  <div key={mistake.issue} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <p className="text-sm font-semibold text-slate-900">{mistake.issue}</p>
                    <p className="mt-2 text-sm text-slate-600">{mistake.fix}</p>
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
              <h2 className="text-2xl font-semibold text-slate-900">6. Wanneer X3DPrints inschakeleni</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {engagementScenarios.map((scenario) => (
                  <div key={scenario.title} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <p className="text-sm font-semibold text-slate-900">{scenario.title}</p>
                    <p className="mt-2 text-sm text-slate-600">{scenario.detail}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Check{" "}
                <Link href="/materials" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                  materials
                </Link>{" "}
                en{" "}
                <Link href="/pricing" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                  pricing
                </Link>{" "}
                voor materiaalbeschikbaarheid en kostprijs van bustes, terrain of cosplay onderdelen.
              </p>
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Een tabletop of prop project planneni</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Deel STL of STEP, vermeld schaal en gewenste afwerking en we koppelen terug met slicingadvies, planning en
                  finishingopties.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/contact?topic=use-case-tabletop">Start intake</ShimmerButton>
                <Link href="/viewer" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Upload via viewer
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
