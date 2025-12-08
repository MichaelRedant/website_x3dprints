import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"

const canonical = "https://www.x3dprints.be/blog/filament-vrijdag-petg"
const publishedDate = "2025-09-12T08:00:00+02:00"

export const metadata: Metadata = {
  title: "PETG 3D Printen: Sterk, taai en outdoor proof | X3DPrints",
  description:
    "Filament Vrijdag #2. Alles over PETG: wanneer je overschakelt van PLA, instellingen, buitentoepassingen en vergelijking met TPU.",
  alternates: { canonical },
  openGraph: {
    title: "PETG 3D Printen: Sterk, taai en outdoor proof",
    description:
      "PETG uitgelegd door X3DPrints: eigenschappen, printinstellingen, typische toepassingen en wanneer je beter TPU of ASA kiest.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: ["PETG 3D printen", "Filament Vrijdag", "3D print materiaal"],
    images: [
      {
        url: "/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "PETG filament advies door X3DPrints",
      },
    ],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filament Vrijdag #2: PETG 3D Printen gids",
    description: "PETG eigenschappen, instellingen en buitentoepassingen uitgelegd door een lokale 3D print studio.",
    images: ["/images/og-home.jpg"],
  },
}

const heroStats = [
  { label: "Glasovergang", value: "circa 80 C", detail: "Blijft vormvast in auto's en onder spotlights" },
  { label: "Nozzle bereik", value: "235-250 C", detail: "CF en dikke delen draaien richting 250 C" },
  { label: "Doorlooptijd", value: "3-5 werkdagen", detail: "Filament drogen plus kwaliteitscheck" },
]

const petgVariants = [
  {
    name: "PETG Solid",
    description: "Semi-glanzende afwerking met hoge taaiheid. Studio baseline voor brackets, kappen en prototypes.",
    bestFor: ["Machine covers", "Assemblagehulpen", "Retail fixtures"],
  },
  {
    name: "PETG Matte",
    description: "Combineert de look van PLA Matte met de duurzaamheid van PETG. Minder glare, meer grip.",
    bestFor: ["Design displays", "Hand-held tools", "Behuizingen met grip"],
  },
  {
    name: "PETG Translucent",
    description: "Laat licht door zonder te breken. Ideaal voor led behuizingen en signage.",
    bestFor: ["Signage", "Mood lighting", "Indicator windows"],
  },
  {
    name: "PETG CF Blend",
    description: "Micro carbon vezels voor extra stijfheid en hogere temperatuurtolerantie.",
    bestFor: ["Jigs & fixtures", "Drone onderdelen", "Hitteshields"],
  },
]

const printSettings = [
  { label: "Nozzle", value: "235-250 C", note: "Start op 240 C, verhoog voor snellere prints of CF" },
  { label: "Bed", value: "75-85 C", note: "Gebruik PEI plus lijmstick zodat onderdelen toch lossen" },
  { label: "Snelheid", value: "45-60 mm/s", note: "Trager dan PLA voor consistente laaghechting" },
  { label: "Koeling", value: "25-40%", note: "Alleen bij bruggen hoger, anders verzwakken lagen" },
  { label: "Retraction", value: "0.8-1.0 mm", note: "Licht lager dan PLA om blobs te vermijden" },
]

const whenToUse = [
  "Functionele onderdelen die impact of torsie krijgen.",
  "Projecten die buiten of nabij zon, spots of motorwarmte staan.",
  "Behuizingen en covers in productie- of retailomgevingen.",
  "Clips, brackets en montagestukken waar PLA te bros blijkt.",
  "Hybride projecten waar een PLA shell een PETG kern beschermt.",
]

const whenToAvoid = [
  "Temperaturen boven 90 C of vlak naast motorblokken (denk aan ASA of PC).",
  "Ultra precieze miniaturen waar elke string zichtbaar stoort.",
  "Rubberachtige onderdelen die permanente flexibiliteit vragen (kies TPU).",
  "Applicaties met agressieve chemicalien of olien waar ABS of nylon sterker presteert.",
]

const comparisonRows = [
  {
    property: "Printgemak",
    pla: "Zeer hoog; plug-and-play.",
    petg: "Gemiddeld; vraagt tuning rond stringing en bedhechting.",
    tpu: "Laag; trage feed en cleane filamentbaan nodig.",
  },
  {
    property: "Temperatuur",
    pla: "Wordt zacht rond 55-60 C.",
    petg: "Blijft bruikbaar tot ca. 80 C.",
    tpu: "Stabiel tot ca. 70 C zolang het niet samengedrukt wordt.",
  },
  {
    property: "Taaiheid",
    pla: "Eerder bros bij impact.",
    petg: "Buigt of vervormt voor het breekt.",
    tpu: "Sterk en vervormbaar; bijna onbreekbaar.",
  },
  {
    property: "Buiten / vocht",
    pla: "Veroudert en vervormt sneller.",
    petg: "Heel geschikt voor buitengebruik en vocht.",
    tpu: "Vaak ok buiten, afhankelijk van blend.",
  },
  {
    property: "Afwerking",
    pla: "Strak, veel decoratieve varianten.",
    petg: "Semi glans, iets meer stringing als profiel niet klopt.",
    tpu: "Rubberlook met zichtbare lijnen.",
  },
  {
    property: "Kost per print",
    pla: "Laagste materiaalprijs en kortste printtijd.",
    petg: "Iets duurder en meestal rustiger geprint.",
    tpu: "Duurder en trager door beperkte snelheid.",
  },
]

const mitigationTips = [
  {
    title: "Stringing beperken",
    insight: "Verhoog retraction stapsgewijs, verlaag nozzle temperatuur en bewaar spools in een drybox.",
  },
  {
    title: "Hechting controleren",
    insight: "Gebruik een scheidingslaag zoals lijmstift of textuur PEI zodat PETG het printbed niet beschadigt.",
  },
  {
    title: "Layer bonding maximaliseren",
    insight: "Laat de fan nooit volle bak draaien; 25-40 procent houdt lagen warm genoeg om in elkaar te vloeien.",
  },
  {
    title: "Transparante prints",
    insight: "Kies dikkere lagen, weinig infill patronen en gladde buitenwanden voor een diffuse lichtlook.",
  },
]

const resourceLinks = [
  { label: "3D printen pillar", href: "/3d-printen", description: "Workflow, materiaalkeuzes en FAQ." },
  { label: "PETG materiaalfiche", href: "/materials/petg", description: "Swatches, voorraad en FAQ voor PETG." },
  { label: "Prijzen en calculator", href: "/pricing", description: "Zie de impact van PETG runtijd op budget." },
  { label: "Material Suggestion Tool", href: "/materials#material-suggestion-tool", description: "Laat de wizard een voorstel doen." },
]

const externalReferences = [
  {
    label: "Prusa Knowledge Base - PETG",
    href: "https://help.prusa3d.com/category/petg_207",
    description: "Instellingen, troubleshooting en droogadvies voor PETG.",
  },
  {
    label: "Ultimaker Support - PETG",
    href: "https://support.ultimaker.com/hc/en-us/articles/360012016039-About-Ultimaker-PETG",
    description: "Eigenschappen en aanbevolen toepassingen vanuit een professioneel perspectief.",
  },
  {
    label: "MatterHackers PETG Guide",
    href: "https://www.matterhackers.com/articles/petg-filament-3d-printing-guide",
    description: "Praktische gids rond instellingen, sterkte en gebruik buiten.",
  },

]

const upcomingPosts = [
  { label: "Filament Vrijdag #3: TPU 3D printen (19 september 2025)", href: "/blog/filament-vrijdag-tpu" },
  { label: "Filament Vrijdag #4: PLA Wood & specials (26 september 2025)", href: "/blog/filament-vrijdag-pla-wood" },
  { label: "Filament Vergelijking: welk filament kies je?", href: "/blog" },
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "PETG 3D Printen: Sterk, taai en outdoor proof",
  description:
    "Filament Vrijdag #2 van X3DPrints. Leer wanneer PETG slimmer is dan PLA, welke instellingen werken en hoe je het inzet voor functionele onderdelen.",
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
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-emerald-300/0 via-emerald-300/60 to-emerald-300/0" />
      <span>Filament Vrijdag</span>
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-emerald-300/0 via-emerald-300/60 to-emerald-300/0" />
    </div>
  )
}

export default function FilamentVrijdagPetgPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(160%_90%_at_50%_-20%,rgba(16,185,129,0.2),transparent_75%)]"
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
                <li className="font-medium text-slate-900">PETG 3D printen</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Filament Vrijdag #2</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              PETG 3D printen: wanneer PLA niet langer volstaat.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              PETG is de logische stap na PLA: het is taaier, verdraagt meer warmte en voelt zich thuis in vochtige of
              outdoor omgevingen. In deze aflevering tonen we waar PETG echt verschil maakt, hoe we het stabiel printen op de
              Bambu X1C en wanneer je toch beter TPU of ASA inzet.
            </p>
            <div className="stacked-actions mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <ShimmerButton href="/contact?material=PETG">Vraag PETG advies</ShimmerButton>
              <Link
                href="/materials/petg"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Bekijk PETG fiche
              </Link>
              <Link
                href="/materials#material-suggestion-tool"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Material Suggestion Tool
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">
              Gepubliceerd op 12 september 2025 - Volgende Filament Vrijdag: TPU (19 september 2025).
            </p>
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
              <h2 className="text-2xl font-semibold text-slate-900">Wat maakt PETG anders?</h2>
              <p className="mt-3 text-sm text-slate-600">
                PETG (Polyethylene Terephthalate Glycol) is een aangepaste PET die minder bros en veel printvriendelijker is
                dan ABS maar een stuk taaier dan PLA. Het blijft stabiel tot ongeveer 80 C, verdraagt vocht en UV en buigt
                eerst voor het breekt.
              </p>
              <p className="mt-3 text-sm text-slate-600">
                Werk je zelf? Gebruik het{" "}
                <Link
                  href="https://wiki.bambulab.com/en/materials/petg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 underline underline-offset-4"
                >
                  Bambu Lab PETG profiel
                </Link>{" "}
                als vertrekpunt zodat AMS runs en droge opslag meteen goed zitten.
              </p>
              <p className="mt-3 text-sm text-slate-600">
                Nog twijfel tussen materialen? De{" "}
                <Link href="/materials#material-suggestion-tool" className="text-indigo-600 underline underline-offset-4">
                  Material Suggestion Tool
                </Link>{" "}
                geeft je in twee klikken een voorstel en stuurt je naar de juiste CTA.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Wanneer wel of niet inzetten?</h2>
              <div>
                <p className="text-sm font-semibold text-slate-900">Kies PETG wanneer:</p>
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

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">Printinstellingen uit de studio</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Onderstaande bandbreedtes gebruiken we op de Bambu X1C. Ze vertalen makkelijk naar Prusa, Creality of
                    Voron zolang je rekening houdt met airflow en nozzle diameter.
                  </p>
                </div>
                <Link
                  href="/materials#material-suggestion-tool"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-emerald-700"
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
              <p className="mt-4 text-xs text-slate-500">Droog AMS spools minstens 6 uur op 65 C om stringing onder controle te houden.</p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-6">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Varianten die wekelijks uit de printer rollen</h2>
              <p className="mt-2 text-sm text-slate-600">
                PETG draait niet alleen om brute kracht. Met de juiste blend maak je behuizingen en displays die zowel stevig als esthetisch zijn.
              </p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {petgVariants.map((variant) => (
                  <div key={variant.name} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-emerald-500/80 to-indigo-500/80" aria-hidden />
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
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
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
              <h2 className="text-2xl font-semibold text-slate-900">PLA vs PETG vs TPU</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-slate-500">
                      <th className="py-2 pr-4">Eigenschap</th>
                      <th className="py-2 pr-4">PLA</th>
                      <th className="py-2 pr-4">PETG</th>
                      <th className="py-2 pr-4">TPU</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {comparisonRows.map((row) => (
                      <tr key={row.property}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{row.property}</td>
                        <td className="py-3 pr-4">{row.pla}</td>
                        <td className="py-3 pr-4">{row.petg}</td>
                        <td className="py-3 pr-4">{row.tpu}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Meer nuance nodig? Lees ook de{" "}
                <Link href="/blog/pla-vs-petg" className="text-indigo-600 underline underline-offset-4">
                  PLA versus PETG vergelijking
                </Link>{" "}
                en hou de TPU editie van Filament Vrijdag in de gaten.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Kostprijs en planning in het echt</h2>
              <p className="mt-2 text-sm text-slate-600">
                PETG filament is iets duurder dan PLA, maar het echte verschil zit in machine-uren. We printen warmer en
                rustiger, dus de runtime neemt toe. Dat is prima zolang het in je planning vervat zit.
              </p>
              <ul className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                <li className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Planningstip</p>
                  <p className="mt-2">Bundel PETG jobs zodat we het filament maar een keer hoeven te drogen.</p>
                </li>
                <li className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Sales insight</p>
                  <p className="mt-2">Positioneer PETG als functioneel bewezen en combineer het met PLA covers voor zichtwerk.</p>
                </li>
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Op de{" "}
                <Link href="/pricing" className="text-indigo-600 underline underline-offset-4">
                  pricing pagina
                </Link>{" "}
                zie je hoe printtijd, materiaal en nabewerking in de offerte belanden.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Wanneer PETG bestellen bij X3DPrints?</h2>
              <p className="mt-2 text-sm text-slate-600">
                Kies PETG zodra een onderdeel meer moet verdragen dan alleen een mooie look. Deze situaties zien we bijna wekelijks:
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                  <span>Brackets, houders en fixtures rond machines of werkbanken.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                  <span>Onderdelen die in voertuigen, etalages of bij spotlights staan.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                  <span>Outdoor elementen zoals sensorhouders, tuinaccessoires of retail props.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                  <span>Projecten waar PLA prototypes goedgekeurd zijn maar de finale versie robuuster moet zijn.</span>
                </li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <ShimmerButton href="/contact?material=PETG">Plan een PETG print</ShimmerButton>
                <Link
                  href="/materials/petg"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Check voorraad
                </Link>
              </div>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Filament Vrijdag roadmap</h2>
              <p className="mt-2 text-sm text-slate-600">
                De reeks bouwt een SEO-cluster op rond materialen. Elke vrijdag linken we terug naar de pillar, materialen en pricing zodat crawlers en klanten alles vinden.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {upcomingPosts.map((item) => (
                  <li key={item.label} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
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

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Bronnen en verder lezen</h2>
              <p className="mt-2 text-sm text-slate-600">
                Combineer deze blog met betrouwbare documentatie. Zo bouw je autoriteit op richting Google en geef je klanten transparant advies.
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Twijfel tussen PLA, PETG of TPU?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Deel STL of STEP, vertel waar het onderdeel terechtkomt en we koppelen er een eerlijk materiaaladvies aan.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/contact?material=PETG">Start materiaal intake</ShimmerButton>
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
