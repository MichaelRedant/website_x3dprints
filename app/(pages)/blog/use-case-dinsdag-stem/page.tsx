import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"

const canonical = "https://www.x3dprints.be/blog/use-case-dinsdag-stem"
const publishedDate = "2026-01-13T08:00:00+01:00"

export const metadata: Metadata = {
  title: "Use Case Dinsdag #8: 3D printen voor makerspaces & STEM-academies",
  description:
    "Bouw veilige, reproduceerbare 3D print workflows voor scholen en makerspaces. Leer materiaalkeuze, instellingen en planning voor PLA, PETG en TPU.",
  alternates: { canonical },
  openGraph: {
    title: "Use Case Dinsdag #8: 3D printen voor STEM",
    description:
      "Voor leerkrachten en fablabs: hoe je PLA Matte, PETG en TPU inzet in onderwijs, welke instellingen werken en hoe je groepen plant.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["3D printen STEM", "3D printen onderwijs", "makerspace workflows", "Use Case Dinsdag"],
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "STEM en makerspace 3D prints" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Use Case Dinsdag: 3D printen voor STEM & makerspaces",
    description:
      "Betrouwbare educatieve workflows met PLA, PETG en TPU. Inclusief instellingen, projectvoorbeelden en tips voor scholen.",
    images: ["/images/og-home.jpg"],
  },
}

const heroStats = [
  { label: "Standaardmateriaal", value: "PLA Matte", detail: "Veilig, geurarm, beginnersproof" },
  { label: "Printerratio", value: "1 per 10-12 leerlingen", detail: "Voor voorspelbare planning" },
  { label: "Workflow", value: "Ontwerp > slice > print", detail: "3 lesmomenten per project" },
]

const fdmReasons = [
  { title: "Budgetvriendelijk", detail: "PLA Matte is betaalbaar en werkt zonder gespecialiseerde PPE." },
  { title: "Snelle iteraties", detail: "Leerlingen zien binnen uren resultaat en passen ontwerpen eenvoudig aan." },
  { title: "Veilig materiaal", detail: "PLA is geurarm en geschikt voor klaslokalen met standaard ventilatie." },
  { title: "Schaalbaar", detail: "Meerdere printers kunnen parallel draaien voor groepsprojecten." },
]

const materials = [
  {
    name: "PLA Matte",
    detail: "95% van educatieve prints: behuizingen, prototypes, gadgets en technische demonstraties.",
    link: { label: "PLA Matte gids", href: "/blog/filament-vrijdag-pla" },
  },
  {
    name: "PETG",
    detail: "Voor robotica, klemmen en onderdelen met warmtebelasting in secundair of hoger onderwijs.",
    link: { label: "PETG gids", href: "/blog/filament-vrijdag-petg" },
  },
  {
    name: "TPU",
    detail: "Flexibele bumpers, wielen en wearables voor gevorderde labs.",
    link: { label: "TPU gids", href: "/blog/filament-vrijdag-tpu" },
  },
  {
    name: "Creatieve PLA blends",
    detail: "Wood, Marble, Metal en Silk+ voor kunst-, STEAM- of designworkshops.",
    link: { label: "PLA Wood gids", href: "/blog/filament-vrijdag-pla-wood" },
    extras: [
      { label: "PLA Marble", href: "/blog/filament-vrijdag-pla-marble" },
      { label: "PLA Metal", href: "/blog/filament-vrijdag-pla-metal" },
      { label: "PLA Silk+", href: "/blog/filament-vrijdag-pla-silk-plus" },
    ],
  },
]

const settings = [
  {
    material: "PLA",
    values: ["Nozzle 215 degC", "Bed 60 degC", "0.20 mm layer height", "Fan 70-100%", "Supports enkel indien nodig"],
    ref: { label: "Bestanden voor 3D printen", href: "/blog/bestanden-voor-3d-printen" },
  },
  {
    material: "PETG",
    values: ["Nozzle 240 degC", "Bed 80 degC", "Fan max 40%", "Let op stringing"],
    ref: { label: "Bambu PETG profiel", href: "https://wiki.bambulab.com/en/materials/petg" },
  },
  {
    material: "TPU",
    values: ["Nozzle 220-240 degC", "Lage snelheid", "Minimale retraction", "Zorg voor gecontroleerde filamentloop"],
  },
]

const workflowSteps = [
  { title: "STL/STEP keuze", detail: "Gebruik STL voor productie, STEP voor herbruikbare ontwerpen." },
  { title: "Viewer upload", detail: "De X3DPrints viewer laat meerdere bestanden en referentiefoto's toe." },
  { title: "Print preset", detail: "PLA preset met 0.20 mm layers en supports uit voorkomt 95% van mislukte prints." },
  { title: "Lesplanning", detail: "Dag 1 ontwerp, dag 2 slicing, dag 3 printresultaten en iteratie." },
  {
    title: "Mislukkingspreventie",
    detail: "Beperk overhang boven 55 graden, adviseer 2 mm wanden en splits grote modellen in blokken.",
  },
]

const stemProjects = [
  { title: "Robotica onderdelen", detail: "Wielen, behuizingen en sensorhouders (PLA of PETG)." },
  { title: "STEAM-kunst", detail: "Sculpturen in PLA Marble of Wood voor kunstacademies en jeugdwerkingen." },
  { title: "Mechanica-lessen", detail: "Tandwielen, katrollen en klemmen voor techniekonderwijs." },
  { title: "Schoolfairs en expos", detail: "Kleine gadgets of designobjecten voor evenementen of opendeurdagen." },
  { title: "Modulaire tools", detail: "Klemmen, organizers en storage helpers voor het lokaal." },
]

const mistakes = [
  { issue: "Te snel naar PETG", fix: "Zorg eerst voor een foutloze PLA workflow; PETG introduceert stringing en extra hitte." },
  {
    issue: "Finishingverwachtingen",
    fix: (
      <>
        FDM is clean genoeg voor prototypes; voor lakwerk of airbrush zie{" "}
        <Link href="/blog/finishing-friday-schuren-primen-lakken" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
          Finishing Friday
        </Link>
        .
      </>
    ),
  },
  {
    issue: "Ontwerpregels overslaan",
    fix: (
      <>
        Herhaal tolerantie-, wand- en overhangregels uit{" "}
        <Link href="/blog/ontwerp-3d-printbaar-model" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
          Hoe ontwerp je een 3D printbaar model
        </Link>
        .
      </>
    ),
  },
  { issue: "Een printer voor 200 leerlingen", fix: "Werk met meerdere printers of plan batches per klasgroep." },
  { issue: "Slechte omgeving", fix: "Hou temperatuur stabiel, ventileer licht en label filamentshelving duidelijk." },
]

const setupTips = [
  "Label elke spool met materiaal en kleur zodat leerlingen niets verwarren.",
  "Houd reserve-nozzles, wipes en basisgereedschap op voorraad.",
  "Kalibreer maandelijks: flow, bed leveling en Z-as onderhoud.",
  "Maak een foutlogboek: elke mislukte print wordt een lesmoment.",
]

const costAdvice = [
  "Gebruik PLA Matte als default voor kost en snelheid.",
  "PETG pas inzetten wanneer functionaliteit het vraagt.",
  "TPU enkel voor specials of gevorderden door langere printtijd.",
  "Plan budgetten via /pricing en bundel bestellingen per kwartaal.",
]

const whenToUse = [
  {
    title: "Kies 3D printen wanneer je",
    bullets: [
      "Snel prototypes wilt tonen aan leerlingen, collega's of directie.",
      "Herhaalbare lesprojecten wilt zonder chemische harsen.",
      "Lichtgewicht objecten zoekt voor veiligheid in de klas.",
      "Unieke texturen (Wood, Marble, Silk+) wilt inzetten zonder lakwerk.",
      "Meerdere varianten wilt testen binnen dezelfde lesweek.",
    ],
  },
  {
    title: "Laat het links liggen wanneer je",
    bullets: [
      "Industriele toleranties onder 0.05 mm nodig hebt.",
      "Objecten vlak naast hittebronnen (>80 degC) wilt plaatsen.",
      "Geen begeleider hebt die printers kan monitoren tijdens de les.",
    ],
  },
]

const ctaLinks = [
  { label: "Materialen", href: "/materials" },
  { label: "Material Suggestion Tool", href: "/materials#material-suggestion-tool" },
  { label: "PLA Matte gids", href: "/blog/filament-vrijdag-pla" },
  { label: "PETG gids", href: "/blog/filament-vrijdag-petg" },
  { label: "TPU gids", href: "/blog/filament-vrijdag-tpu" },
  { label: "Finishing Friday", href: "/blog/finishing-friday-schuren-primen-lakken" },
  { label: "Pricing & offerte", href: "/pricing" },
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Use Case Dinsdag #8: 3D printen voor makerspaces en STEM-academies",
  description:
    "Hoe scholen en makerspaces veilige, schaalbare 3D print workflows opzetten met PLA, PETG en TPU. Inclusief instellingen, projectvoorbeelden en tips.",
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

export default function UseCaseDinsdagStemPage() {
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
                <li className="font-medium text-slate-900">STEM & makerspaces</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Use Case Dinsdag #8</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              3D printen voor makerspaces en STEM-academies: veilig, leerzaam en schaalbaar.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Scholen hebben beperkte lestijd, wisselende leeftijden en vaak maar twee machines die tientallen leerlingen moeten
              bedienen. FDM werkt hier perfect zolang materiaalkeuze, workflow en verwachtingen strak uitgelijnd zijn.
            </p>
            <p className="mt-2 text-lg text-slate-700">
              Deze gids toont hoe je PLA Matte als veilige basis gebruikt, wanneer PETG en TPU wel waarde toevoegen en hoe je
              low-failure workflows bouwt voor leerkrachten en leerlingen.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/contact?topic=use-case-stem">Vraag onderwijsadvies</ShimmerButton>
              <Link
                href="/segments/3d-printing-scholen"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Segment: scholen
              </Link>
              <Link
                href="/viewer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Upload via viewer
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">Gepubliceerd op 13 januari 2026 - Use Case Dinsdag.</p>
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
          {fdmReasons.map((reason) => (
            <Reveal key={reason.title}>
              <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
                <h2 className="text-2xl font-semibold text-slate-900">{reason.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{reason.detail}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">2. Materiaalkeuze per graad of workshop</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {materials.map((material) => (
                  <div key={material.name} className="rounded-2xl border border-slate-100 bg-white/75 p-4">
                    <p className="text-sm font-semibold text-slate-900">{material.name}</p>
                    <p className="mt-2 text-sm text-slate-600">{material.detail}</p>
                    <Link
                      href={material.link.href}
                      className="mt-3 inline-flex items-center text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
                    >
                      {material.link.label}
                      <span aria-hidden className="ml-2">-&gt;</span>
                    </Link>
                    {material.extras && (
                      <div className="mt-2 flex flex-wrap gap-3 text-xs font-semibold text-indigo-600">
                        {material.extras.map((extra) => (
                          <Link key={extra.href} href={extra.href} className="transition hover:text-indigo-500">
                            {extra.label}
                          </Link>
                        ))}
                      </div>
                    )}
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
              <h2 className="text-2xl font-semibold text-slate-900">3. Instellingen die foutmarges beperken</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {settings.map((setting) => (
                  <div key={setting.material} className="rounded-2xl border border-slate-100 bg-white/75 p-4">
                    <p className="text-sm font-semibold text-slate-900">{setting.material}</p>
                    <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-slate-600">
                      {setting.values.map((value) => (
                        <li key={value}>{value}</li>
                      ))}
                    </ul>
                    {setting.ref && (
                      <Link
                        href={setting.ref.href}
                        className="mt-3 inline-flex items-center text-xs font-semibold text-indigo-600 transition hover:text-indigo-500"
                      >
                        {setting.ref.label}
                        <span aria-hidden className="ml-2">-&gt;</span>
                      </Link>
                    )}
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
              <h2 className="text-2xl font-semibold text-slate-900">4. Workflow voor low-failure lessen</h2>
              <div className="mt-4 space-y-3">
                {workflowSteps.map((step) => (
                  <div key={step.title} className="rounded-2xl border border-slate-100 bg-white/75 p-4">
                    <p className="text-sm font-semibold text-slate-900">{step.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{step.detail}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Gebruik de{" "}
                <Link
                  href="/materials#material-suggestion-tool"
                  className="font-semibold text-indigo-600 transition hover:text-indigo-500"
                >
                  Material Suggestion Tool
                </Link>{" "}
                voor snelle materiaalkeuzes en verzamel bestanden in de{" "}
                <Link href="/viewer" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                  uploadviewer
                </Link>{" "}
                zodat elke iteratie dezelfde intake doorloopt.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          {stemProjects.map((project) => (
            <Reveal key={project.title}>
              <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
                <h2 className="text-2xl font-semibold text-slate-900">{project.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{project.detail}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">5. Typische fouten en hoe je ze oplost</h2>
              <div className="mt-4 space-y-3">
                {mistakes.map((mistake) => (
                  <div key={mistake.issue} className="rounded-2xl border border-slate-100 bg-white/75 p-4">
                    <p className="text-sm font-semibold text-slate-900">{mistake.issue}</p>
                    <p className="mt-1 text-sm text-slate-600">{mistake.fix}</p>
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
              <h2 className="text-2xl font-semibold text-slate-900">6. Setup tips voor een duurzame makerspace</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                {setupTips.map((tip) => (
                  <li key={tip}>{tip}</li>
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
              <h2 className="text-2xl font-semibold text-slate-900">7. Kosten en planning realistisch houden</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                {costAdvice.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Raadpleeg{" "}
                <Link href="/pricing" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                  pricing
                </Link>{" "}
                voor pakketprijzen, onderhoud en outsourcing van grote prints.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          {whenToUse.map((block) => (
            <Reveal key={block.title}>
              <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
                <h2 className="text-2xl font-semibold text-slate-900">{block.title}</h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                  {block.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">8. Conclusie: STEM-succes zit in voorspelbaarheid</h2>
              <p className="text-sm text-slate-600">
                Met PLA Matte als veilige basis, gerichte PETG- en TPU-projecten en een vaste workflow wordt 3D printen een
                didactisch hulpmiddel in plaats van een gok. Gebruik segmentinzichten uit{" "}
                <Link
                  href="/segments/3d-printing-scholen"
                  className="font-semibold text-indigo-600 transition hover:text-indigo-500"
                >
                  het scholen-segment
                </Link>{" "}
                en verwijs in de klas naar materiaalblogs zodat leerlingen zelf kunnen bijleren.
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Klaar voor een veilige klasworkflow?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Upload STL of STEP, deel lesdoelen en we stemmen materialen, planning en begeleiding af op jouw STEM-programma.
                </p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-indigo-600">
                  {ctaLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="transition hover:text-indigo-500">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/contact?topic=use-case-stem">Start intake</ShimmerButton>
                <Link href="/viewer" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Upload je bestanden
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
