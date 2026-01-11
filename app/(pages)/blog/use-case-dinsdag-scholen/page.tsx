import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/blog/use-case-dinsdag-scholen"
const publishedDate = "2025-12-09T08:00:00+01:00"

export const metadata: Metadata = {
  title: "Use Case Dinsdag #3: 3D printen voor scholen",
  description:
    "Bouw een veilige 3D printworkflow voor leerkrachten en leerlingen. Deze gids behandelt materiaalkeuze, low-failure slicerprofielen en samenwerking met X3DPrints.",
  alternates: { canonical },
  openGraph: {
    title: "Use Case Dinsdag #3: 3D printen voor scholen",
    description:
      "Onderwijs heeft voorspelbare workflows nodig. Leer wanneer PLA, PETG of TPU werkt, hoe je lessen opbouwt en hoe X3DPrints ondersteunt.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: [
      "3D printen scholen",
      "3D printen onderwijs",
      "Veilige 3D printmaterialen",
      "Use Case Dinsdag",
      "PLA scholen",
    ],
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "3D printen in het onderwijs" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Use Case Dinsdag: 3D printen voor scholen",
    description:
      "Gids voor veilige materialen, grote prints en low-failure workflows in het onderwijs. Inclusief checklist en samenwerkingsopties.",
    images: ["/images/og-home.jpg"],
  },
}

const heroStats = [
  { label: "Basisfilament", value: "PLA Matte", detail: "Geurarm en fouttolerant" },
  { label: "Low-failure set-up", value: "0.4 mm nozzle", detail: "0.2 mm layers, 60 degC bed" },
  { label: "Doelgroep", value: "Lager tot hoger", detail: "Workflow schaalt mee" },
]

const materialTable = [
  {
    material: "PLA Matte",
    why: "Biobased, geurarm, veel kleuren, werkt op lage temperatuur",
    use: "Standaard voor alle graden",
  },
  {
    material: "PETG",
    why: "Taai en hittetolerant maar stringt en vraagt droogtebeheer",
    use: "Enkel bij technische richtingen of hoger onderwijs",
  },
  {
    material: "TPU",
    why: "Flexibel maar traag en foutgevoelig",
    use: "Alleen onder begeleiding of als showcase",
  },
]

const workflowSteps = [
  {
    title: "Centraliseer slicing",
    detail:
      "Werk met een vaste laptop en profiel voor PLA Matte. Vermijd dat elke leerling eigen temps en supports gebruikt.",
  },
  {
    title: "Standaardiseer ontwerpregels",
    detail:
      "Gebruik printbare samenvatting van Maker Monday #2 (wanddiktes), #3 (toleranties), #4 (clips) en #6 (warping).",
  },
  {
    title: "Low-failure preset",
    detail: "PLA Matte, 0.4 mm nozzle, 0.2 mm layer height, 60 degC bed, 10-15 percent infill, auto supports.",
  },
  {
    title: "Remix over scratch",
    detail: "Laat leerlingen bestaande STL's aanpassen in Tinkercad i.p.v. alles vanaf nul te bouwen.",
  },
]

const educationUseCases = [
  {
    level: "Lagere school",
    items: ["Naamplaatjes en sleutelhangers", "Bordspelonderdelen", "Miniatuurstructuren en bouwpakketten"],
    material: "PLA Matte",
  },
  {
    level: "Secundair (STEM, techniek, kunst)",
    items: ["Tandwielen en mechanica", "Custom behuizingen", "Architectuur- of designprototypes"],
    material: "PLA Matte, PETG voor techniek",
  },
  {
    level: "Hoger onderwijs",
    items: ["Iteratieve prototypes", "Ergonomiestudies", "Fit testing en functionele onderdelen"],
    material: "PLA Matte, PETG en onder begeleiding TPU",
  },
]

const troubleshooting = [
  {
    issue: "Prints lossen van het bed",
    fix: "Bed reinigen met IPA, eerste laag 0.22 mm, eventueel brim toevoegen en bed opnieuw levelen.",
  },
  {
    issue: "Warping bij educatieve projecten",
    fix: "Vermijd massieve blokken, voeg holtes en ribs toe en splits grote onderdelen. Zie Maker Monday #6.",
  },
  {
    issue: "Prints duren langer dan een les",
    fix: "Verlaag infill, gebruik 0.28 mm draft layers voor mock-ups en groepeer kleine onderdelen in batches.",
  },
  {
    issue: "Verstopte hotends door vreemd filament",
    fix: "Verban ABS, nylon en goedkope silk blends. Blijf bij PLA Matte voor het curriculum.",
  },
]

const collaboration = [
  {
    title: "Lesmateriaal en workflows",
    detail: "Wij leveren checklists, profielen en trainingssessies zodat de faalratio laag blijft.",
  },
  {
    title: "Grote of kritieke prints",
    detail: "Outsource lange of PETG/TPU prints zodat lessen verder kunnen zonder wachttijd.",
  },
  {
    title: "Prototypebegeleiding",
    detail: "Coaching rond tolerantie, wanddiktes en materiaalkeuze voor ontwerpopleidingen.",
  },
  {
    title: "Budgetzekerheid",
    detail: "Gebruik /pricing voor offertes en dossierindiening en verwijs docenten naar /materials voor referentie.",
  },
]

const planningTips = [
  {
    title: "Ken je printerratio",
    detail: "Plan maximaal 10-12 leerlingen per printer. Voorzie wachtrijlabels zodat iedereen weet wanneer zijn model aan de beurt is.",
  },
  {
    title: "Gebruik een printplanner",
    detail: "Werk met een gedeelde spreadsheet of whiteboard met kolommen voor ingestuurd, gesliced, geprint en afgewerkt.",
  },
  {
    title: "Batch prints buiten de lesuren",
    detail: "Laat langere jobs 's nachts of tijdens studieperiodes lopen zodat de printer tijdens de les vrij is voor demo's.",
  },
  {
    title: "Spoolbeheer en voorraad",
    detail: "Label elke PLA Matte-spool met resterend gewicht en reserveer een sealed box voor PETG zodat hij droog blijft.",
  },
]

const maintenanceChecklist = [
  {
    title: "Dagelijkse routine",
    detail: "Reinig het bed met IPA, verwijder strings rond de nozzle en controleer of ventilatoren vrij draaien.",
  },
  {
    title: "Wekelijkse check",
    detail: "Run een automatische calibratie, controleer de Z-as geleiders en log firmware-updates zodat klassen op dezelfde versie zitten.",
  },
  {
    title: "Per trimester",
    detail: "Vervang nozzles, verifieer flow-rate met een kalibratieblok en documenteer onderhoud in een gedeelde map.",
  },
]

const lessonFramework = [
  {
    title: "Fase 1 - Observatie",
    detail: "Analyseer bestaande objecten of STL's. Koppel inzichten aan Maker Monday #2 (wanddiktes) en #3 (toleranties).",
  },
  {
    title: "Fase 2 - Remix",
    detail: "Leerlingen passen bestaande modellen aan in Tinkercad of Fusion. Focus op kleine iteraties i.p.v. blanco canvas.",
  },
  {
    title: "Fase 3 - Prototyping",
    detail: "Batch prints in PLA Matte, gebruik de low-failure preset en laat leerlingen zelf supports verwijderen onder toezicht.",
  },
  {
    title: "Fase 4 - Reflectie",
    detail: "Documenteer wat werkte, wat faalde en link terug naar Maker Monday #6 (warping) of #4 (snapfits) voor verdieping.",
  },
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Use Case Dinsdag #3: 3D printen voor scholen",
  description:
    "Handleiding voor onderwijsinstellingen over veilige materialen, low-failure workflows en samenwerking met X3DPrints.",
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

export default function UseCaseDinsdagScholenPage() {
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
                <li className="font-medium text-slate-900">Scholen</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Use Case Dinsdag #3</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              3D printen voor scholen: veilige materialen, grote prints en low-failure workflows.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Onderwijsinstellingen hebben weinig lestijd, beperkte ventilatie en leerlingen die nog geen FDM-experts zijn. Deze
              gids toont hoe je een voorspelbare workflow opzet, welke materialen veilig werken en wanneer je externe hulp
              inschakelt.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/contact-topic=use-case-scholen">Vraag schooladvies</ShimmerButton>
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
            <p className="mt-6 text-sm text-slate-500">Gepubliceerd op 9 december 2025 - Use Case Dinsdag.</p>
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
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">1. Materiaalkeuze voor scholen</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-slate-500">
                      <th className="py-2 pr-4">Materiaal</th>
                      <th className="py-2 pr-4">Waarom</th>
                      <th className="py-2 pr-4">Gebruik</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {materialTable.map((row) => (
                      <tr key={row.material}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{row.material}</td>
                        <td className="py-3 pr-4">{row.why}</td>
                        <td className="py-3 pr-4">{row.use}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <p>
                  <span className="font-semibold">PLA Matte</span> blijft de standaard: geurarm, fouttolerant en meteen bruikbaar
                  voor lagere en secundaire scholen. Leer meer in de{" "}
                  <Link href="/blog/filament-vrijdag-pla" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                    PLA materiaalblog
                  </Link>
                  .
                </p>
                <p>
                  <span className="font-semibold">PETG</span> hoort thuis bij technische richtingen of hoger onderwijs. Het is
                  taaier maar stringt sneller en vraagt drogere opslag. Zie{" "}
                  <Link
                    href="/blog/filament-vrijdag-petg"
                    className="font-semibold text-indigo-600 transition hover:text-indigo-500"
                  >
                    PETG materiaalblog
                  </Link>
                  .
                </p>
                <p>
                  <span className="font-semibold">TPU</span> is enkel voor begeleide projecten. Het vereist trage prints en verhoogt
                  de foutkans. Lees meer in{" "}
                  <Link
                    href="/blog/filament-vrijdag-tpu"
                    className="font-semibold text-indigo-600 transition hover:text-indigo-500"
                  >
                    TPU materiaalblog
                  </Link>
                  .
                </p>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">2. Workflowprincipes</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {workflowSteps.map((step) => (
                  <li key={step.title} className="rounded-2xl border border-slate-100 bg-white/70 p-3">
                    <p className="text-sm font-semibold text-slate-900">{step.title}</p>
                    <p className="mt-1">{step.detail}</p>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">3. Toepassingen per onderwijsniveau</h2>
              <div className="mt-4 space-y-4 text-sm text-slate-600">
                {educationUseCases.map((block) => (
                  <div key={block.level} className="rounded-2xl border border-slate-100 bg-white/70 p-3">
                    <p className="text-sm font-semibold text-slate-900">{block.level}</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <p className="mt-2 text-xs uppercase tracking-[0.25em] text-slate-500">Materiaal: {block.material}</p>
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
              <h2 className="text-2xl font-semibold text-slate-900">4. Veelvoorkomende problemen en oplossingen</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {troubleshooting.map((item) => (
                  <div key={item.issue} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <p className="text-sm font-semibold text-slate-900">{item.issue}</p>
                    <p className="mt-2 text-sm text-slate-600">{item.fix}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Voor veiligheid blijft PLA het best binnen slecht verluchte klaslokalen. Raadpleeg ook de{" "}
                <Link
                  href="https://wiki.bambulab.com/en/filament/material-safety"
                  className="font-semibold text-indigo-600 transition hover:text-indigo-500"
                >
                  Bambu Lab materiaalveiligheidsgids
                </Link>{" "}
                voor extra richtlijnen.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">5. Samenwerken met X3DPrints</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {collaboration.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-2 text-sm text-slate-600">{item.detail}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Grote prints of PETG trajecten outsourcen- Gebruik{" "}
                <Link href="/pricing" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                  pricing
                </Link>{" "}
                voor budgetaanvragen en verwijs collega-leerkrachten naar{" "}
                <Link href="/materials" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                  materials
                </Link>{" "}
                voor materiaalreferenties.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">6. Printercapaciteit en planning</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {planningTips.map((tip) => (
                  <li key={tip.title} className="rounded-2xl border border-slate-100 bg-white/70 p-3">
                    <p className="text-sm font-semibold text-slate-900">{tip.title}</p>
                    <p className="mt-1">{tip.detail}</p>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">7. Onderhoud en veiligheid</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {maintenanceChecklist.map((item) => (
                  <li key={item.title} className="rounded-2xl border border-slate-100 bg-white/70 p-3">
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-1">{item.detail}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Combineer dit met de{" "}
                <Link
                  href="https://wiki.bambulab.com/en/filament/material-safety"
                  className="font-semibold text-indigo-600 transition hover:text-indigo-500"
                >
                  Bambu Lab veiligheidsgids
                </Link>{" "}
                zodat directie en preventiedienst dezelfde richtlijnen hanteren.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">8. Lesstructuur en evaluatie</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {lessonFramework.map((item) => (
                  <li key={item.title} className="rounded-2xl border border-slate-100 bg-white/70 p-3">
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-1">{item.detail}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Koppel elke fase aan leerdoelen en laat leerlingen reflecties posten in een gedeeld document. Zo bouw je bewijs op
                voor STEM-dossiers en inspectie.
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Een schoolworkflow zonder frustratie-</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Deel je lessituatie, filamentkeuze en printerpark. We helpen met profielen, lesmateriaal of nemen kritieke prints
                  over zodat leerlingen resultaat zien.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/contact-topic=use-case-scholen">Plan een intake</ShimmerButton>
                <Link href="/viewer" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Upload bestanden
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
