import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/blog/use-case-dinsdag-productontwikkeling/"
const publishedDate = "2025-12-23T08:00:00+01:00"

export const metadata: Metadata = {
  title: "Use Case Dinsdag #5: 3D printen voor productontwikkeling",
  description:
    "Van form study modellen tot high-fidelity prototypes. Leer hoe je PLA, PETG en hybride constructies inzet voor snelle productontwikkeling.",
  alternates: { canonical },
  openGraph: {
    title: "Use Case Dinsdag #5: Productontwikkeling met 3D printing",
    description:
      "Gids voor ondernemers en R&D teams: prototypefasen, hybride aanpak, toleranties, inserts en testchecklists met PLA, PETG en esthetische blends.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: [
      "3D printen voor productontwikkeling",
      "rapid prototyping",
      "FDM prototyping",
      "Use Case Dinsdag",
      "low-volume productie",
    ],
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "Productontwikkeling prototypes" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Use Case Dinsdag: Productontwikkeling 3D printen",
    description: "Van idee naar marktklare prototypes met PLA, PETG en hybride constructies.",
    images: ["/images/og-home.jpg"],
  },
}

const heroStats = [
  { label: "Form study", value: "PLA Matte", detail: "Snel en ergonomisch" },
  { label: "Engineering", value: "PETG + inserts", detail: "Taai en testbaar" },
  { label: "Presentation", value: "Silk/Marble", detail: "Pitch-ready finish" },
]

const prototypePhases = [
  {
    title: "Fase 1 - Form study",
    material: "PLA Matte of PLA Basic",
    why: "Goedkoop, snel en licht. Perfect voor ergonomie en lay-outs.",
    examples: ["Handheld sensors", "Afstandsbedieningen", "Verpakkingsconcepten", "Machinecovers"],
    link: { label: "Lees PLA blog", href: "/blog/filament-vrijdag-pla" },
  },
  {
    title: "Fase 2 - Functioneel",
    material: "PETG of PLA shell + PETG kern",
    why: "Taai, warmtebestendig en geschikt voor schroeven of inserts.",
    examples: ["Clips en brackets", "Machine-interfaces", "Scharnierende delen"],
    link: { label: "Lees PETG blog", href: "/blog/filament-vrijdag-petg" },
  },
  {
    title: "Fase 3 - High-fidelity",
    material: "PLA Silk+, Marble of Wood",
    why: "Premium look voor pitches, stands en board demo's.",
    examples: ["Showcase prototypes", "Architecturale modellen", "Pitch props"],
    link: { label: "PLA Silk blog", href: "/blog/filament-vrijdag-pla-silk-plus" },
    extraLinks: [
      { label: "PLA Marble", href: "/blog/filament-vrijdag-pla-marble" },
      { label: "PLA Wood", href: "/blog/filament-vrijdag-pla-wood" },
    ],
  },
]

const hybridApproaches = [
  {
    title: "PLA shell + PETG kern",
    detail: "Esthetische buitenkant met een sterke binnenstructuur. Ideaal voor covers, handhelds en faceplates.",
  },
  {
    title: "PETG frame + TPU details",
    detail: "Structurele ruggengraat met grip of flexibele demping voor knoppen en straps.",
  },
  {
    title: "PLA Matte top + inserts",
    detail: "Strakke look met herhaalbare demontage dankzij M3/M4 heat-set inserts.",
  },
  {
    title: "Material Suggestion Tool",
    detail: "Gebruik de tool om combinaties te testen en CTA's naar /contact te automatiseren.",
    cta: { label: "Open Material Suggestion Tool", href: "/materials#material-suggestion-tool" },
  },
]

const designRules = [
  {
    title: "Wanddiktes & ribben",
    detail:
      "PLA 1.6-2 mm, PETG 1.6-2.4 mm, ribben 0.8-1.2 mm. Fillets rond hoekovergangen. Zie Maker Monday #2 over wanddiktes en ribs.",
    link: { label: "Maker Monday #2", href: "/blog/maker-monday-wanddiktes-ribs" },
  },
  {
    title: "Toleranties",
    detail:
      "PLA 0.2-0.3 mm, PETG 0.3-0.4 mm, TPU 0.5-0.8 mm. Bouw altijd een fitment block voor montagezones.",
    link: { label: "Maker Monday #3", href: "/blog/maker-monday-toleranties-3d-printen" },
  },
  {
    title: "Bevestiging",
    detail:
      "Gebruik M3/M4 heat-set inserts in PETG, snapfits enkel in PETG/TPU en verzink magneten in PLA Marble of Silk.",
    link: { label: "Maker Monday #5", href: "/blog/maker-monday-schroefdraad-bevestigingen" },
  },
  {
    title: "Segmentatie",
    detail:
      "Splits op natuurlijke panelen of modules. Je krijgt minder warping, kortere prints en sneller iteraties op subassemblies.",
  },
]

const testChecklist = [
  { title: "Montage & demontage", detail: "Controleer screw bosses, klikverbindingen en herhaalbaarheid met inserts." },
  { title: "Functionele belasting", detail: "Simuleer vallen, torsie, hitte en herhaald openklikken voordat je finale print." },
  {
    title: "Productievertaling",
    detail: "Denk aan draft angles, uniforme wanddiktes en ruimte voor PCB's of kabelmanagement.",
  },
]

const costTips = [
  "Cluster onderdelen per materiaal (PLA voor vorm, PETG voor functionaliteit).",
  "Houd covers hol met interne ribben om materiaal te sparen.",
  "Gebruik lagere infill voor niet-structurele delen.",
  "Plan iteraties in batches zodat feedback cycli korter worden.",
  "Raadpleeg /pricing voor kosteninschattingen per fase.",
]

const reasonsToPartner = [
  {
    title: "Snelle doorlooptijd",
    detail: "PLA vormmodellen binnen 2-4 dagen, PETG engineering prototypes in 3-5 dagen.",
  },
  {
    title: "Functionele expertise",
    detail: "Mee nadenken over ribben, inserts en materiaalcombinaties zodat testen representatief zijn.",
  },
  {
    title: "Visuele impact",
    detail: "Silk+, Marble en Matte opties voor beurzen, sales demo's en board presentaties.",
  },
  {
    title: "Schakel naar productie",
    detail: "We begeleiden richting harsprints, silicone molds of CNC zodra je MVP staat.",
  },
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Use Case Dinsdag #5: 3D printen voor productontwikkeling",
  description:
    "Van form study modellen tot high-fidelity prototypes met PLA, PETG en hybride constructies. Inclusief ontwerpregels en testchecklist.",
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

export default function UseCaseDinsdagProductontwikkelingPage() {
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
                <li className="font-medium text-slate-900">Productontwikkeling</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Use Case Dinsdag #5</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              3D printen voor productontwikkeling: van idee naar marktklare prototypes.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Productteams moeten vorm, ergonomie, sterkte en visuele impact tegelijk beoordelen. Deze gids toont hoe je PLA, PETG
              en esthetische blends combineert tot een iteratief traject dat beslissingen versnelt.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/contact?topic=use-case-productontwikkeling">Vraag productadvies</ShimmerButton>
              <Link
                href="/segments/3d-printing-prototypes"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Segment: prototypes
              </Link>
              <Link
                href="/materials"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Materialenoverzicht
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">Gepubliceerd op 23 december 2025 - Use Case Dinsdag.</p>
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
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3">
          {prototypePhases.map((phase) => (
            <Reveal key={phase.title}>
              <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{phase.title}</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">{phase.material}</h2>
                <p className="mt-2 text-sm text-slate-600">{phase.why}</p>
                <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-600">
                  {phase.examples.map((example) => (
                    <li key={example}>{example}</li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-indigo-600">
                  <Link href={phase.link.href} className="transition hover:text-indigo-500">
                    {phase.link.label}
                  </Link>
                  {phase.extraLinks?.map((extra) => (
                    <Link key={extra.href} href={extra.href} className="transition hover:text-indigo-500">
                      {extra.label}
                    </Link>
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">2. Hybride prototyping</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {hybridApproaches.map((approach) => (
                  <div key={approach.title} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <p className="text-sm font-semibold text-slate-900">{approach.title}</p>
                    <p className="mt-2 text-sm text-slate-600">{approach.detail}</p>
                    {approach.cta ? (
                      <Link
                        href={approach.cta.href}
                        className="mt-3 inline-flex items-center text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
                      >
                        {approach.cta.label}
                        <span aria-hidden className="ml-2">-&gt;</span>
                      </Link>
                    ) : null}
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
              <h2 className="text-2xl font-semibold text-slate-900">3. Ontwerpregels voor prototypes</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {designRules.map((rule) => (
                  <li key={rule.title} className="rounded-2xl border border-slate-100 bg-white/70 p-3">
                    <p className="text-sm font-semibold text-slate-900">{rule.title}</p>
                    <p className="mt-1">{rule.detail}</p>
                    {rule.link ? (
                      <Link
                        href={rule.link.href}
                        className="mt-2 inline-flex items-center text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
                      >
                        {rule.link.label}
                        <span aria-hidden className="ml-2">-&gt;</span>
                      </Link>
                    ) : null}
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
              <h2 className="text-2xl font-semibold text-slate-900">4. Testfase checklist</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {testChecklist.map((item) => (
                  <li key={item.title} className="rounded-2xl border border-slate-100 bg-white/70 p-3">
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-1">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">5. Kostenoptimalisatie voor productteams</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                {costTips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Combineer iteraties met{" "}
                <Link href="/pricing" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                  pricing
                </Link>{" "}
                zodat budgetten voorspelbaar blijven, en verwijs stakeholders naar{" "}
                <Link href="/blog/finishing-friday-schuren-primen-lakken" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                  Finishing Friday
                </Link>{" "}
                voor nabewerkingsworkloads.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">6. Waarom productteams X3DPrints kiezen</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {reasonsToPartner.map((reason) => (
                  <div key={reason.title} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <p className="text-sm font-semibold text-slate-900">{reason.title}</p>
                    <p className="mt-2 text-sm text-slate-600">{reason.detail}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Klaar voor volgende stappen zoals harsprints of silicone molds? We koppelen je door zodra het prototype aangeeft
                dat detail of volume daarom vraagt.
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Een prototype-iteratie plannen?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Deel CAD, doelstellingen per fase en deadlines. We adviseren over materiaalkeuzes, hybride build-ups en
                  testscenario&apos;s zodat je sneller valideert.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/contact?topic=use-case-productontwikkeling">Start intake</ShimmerButton>
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





