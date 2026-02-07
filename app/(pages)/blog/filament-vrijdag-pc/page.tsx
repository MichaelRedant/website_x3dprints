import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/blog/filament-vrijdag-pc/"
const publishedDate = "2025-12-15T08:00:00+01:00"

export const metadata: Metadata = {
  title: "Filament Vrijdag: polycarbonaat (PC) 3D printen | X3DPrints",
  description:
    "PC filament onder de loep. Hittevast, UV-bestendig, maar veeleisend qua droogtijd en printerinstellingen. Leer wanneer polycarbonaat zinvol is voor jouw project.",
  alternates: { canonical },
  openGraph: {
    title: "Polycarbonaat 3D printen: sterke onderdelen, kritische aanpak",
    description:
      "Filament Vrijdag van X3DPrints. Diepgaande gids over PC filament: voor- en nadelen, instellingen, kosten, droogtijd en alternatieven.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: [
      "polycarbonaat 3D printen",
      "PC filament instellingen",
      "PC filament drogen",
      "Filament Vrijdag",
    ],
    images: [
      {
        url: "/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Polycarbonaat 3D printadvies door X3DPrints",
      },
    ],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filament Vrijdag: polycarbonaat (PC) filament",
    description:
      "Alles over PC filament: hittebestendig, UV-proof en hongerig naar droogtijd. Praktische tips van X3DPrints.",
    images: ["/images/og-home.jpg"],
  },
}

const heroStats = [
  {
    label: "Temperatuur",
    value: "260-285 deg C",
    detail: "Bed 100-110 deg C, gesloten printer en lijmstick verplicht",
  },
  {
    label: "Droogtijd",
    value: "8u @ 80 deg C",
    detail: "Elke run opnieuw drogen voor consistente sterkte",
  },
  {
    label: "Toepassing",
    value: "Hitte + mechanische belasting",
    detail: "Outdoor brackets, machinecovers, LED diffusers",
  },
]

const printSettings = [
  {
    label: "Nozzle",
    value: "260-285 deg C",
    note: "Stabiele flow zonder oververhitting. Gebruik een geharde nozzle als je additieven gebruikt.",
  },
  {
    label: "Bed",
    value: "100-110 deg C",
    note: "Textured PEI met lijmstick of garolite. Zonder adhesive laat PC los.",
  },
  {
    label: "Snelheid",
    value: "30-60 mm/s",
    note: "Trager voor dikke wanden; snelle afdrukken geven meer warping.",
  },
  {
    label: "Koeling",
    value: "0-15 %",
    note: "Alleen een zuchtje lucht voor bridging. Te veel koeling breekt lagen.",
  },
  {
    label: "Retraction",
    value: "0.6-0.8 mm",
    note: "Beperk retracts. PC wordt snel stroperig en stringt als het nat is.",
  },
  {
    label: "Omgeving",
    value: "Gesloten + 30 deg C",
    note: "Verwarmde behuizing of tent beperkt spanningen en scheurvorming.",
  },
]

const whenToUse = [
  "Functionele onderdelen die continu hoger dan 80 deg C zien, zoals motorcovers en lampbehuizingen.",
  "Outdoor brackets die UV, regen en wisselende temperaturen moeten doorstaan.",
  "Ondersteuningen voor elektronica waar brandwerendheid en taaiheid belangrijk zijn.",
  "Industrieel zichtwerk dat helder of smoked moet blijven, bijvoorbeeld diffusers of inspectievensters.",
]

const whenToAvoid = [
  "Budgetprojecten: PC filament is duurder, print trager en vraagt nabewerking.",
  "Open printers zonder enclosure. Warping en scheuren volgen onvermijdelijk.",
  "Projecten met strakke deadlines: droogtijd + tuning verlengen de doorlooptijd.",
  "Onderste structuren met dunne wanden; PC wil liever stevige wanden en afgeronde hoeken.",
]

const mitigationTips = [
  {
    title: "Droog, droog, droog",
    insight:
      "PC filament zuigt vocht in uren op. Wij drogen elke spoel minstens acht uur en bewaren het warm in een drybox tijdens het printen. Nat PC veroorzaakt bubbels, matte wanden en slechte laaghechting.",
  },
  {
    title: "Temperatuurtraject plannen",
    insight:
      "Werk met een temp tower per leverancier. Te heet geeft stringing en verkleuring, te koud resulteert in de bekende laminaire scheuren. Documenteer Nozzle 260/270/280 deg C versus bedhechting.",
  },
  {
    title: "Opspanning en lijm",
    insight:
      "Gebruik een brede brim, lijmstick en indien mogelijk een magnetische plaat die je kan buigen. PC krimpt hard bij afkoelen; zonder adhesive trek je het hele stuk los tijdens de print.",
  },
  {
    title: "Design voor PC",
    insight:
      "Vermijd scherpe hoeken, voeg filet toe en plan uniforme wanddiktes. PC houdt niet van plots variÃ«ren tussen dikke en dunne secties. Als je het toch nodig hebt, anneal dan na het printen.",
  },
]

const comparisonRows = [
  {
    property: "Temperatuurbestendigheid",
    pla: "Tot ~60 deg C voor PLA Tough.",
    petg: "Tot ~80 deg C.",
    pc: "~110 deg C glasovergang, kan hoger bij annealing.",
  },
  {
    property: "UV-weerstand",
    pla: "Lage UV-resistentie.",
    petg: "Goed, maar verkleurt na jaren.",
    pc: "Uitstekend. Geschikt voor permanente outdoor hardware.",
  },
  {
    property: "Droogtijd",
    pla: "Niet kritisch.",
    petg: "1-2 uur aanbevolen.",
    pc: "Minstens 8 uur + drybox tijdens de print.",
  },
  {
    property: "Printsnelheid",
    pla: "Hoger, 80-120 mm/s mogelijk.",
    petg: "Gemiddeld 60-80 mm/s.",
    pc: "30-60 mm/s voor betrouwbare hechting.",
  },
  {
    property: "Prijs per kg",
    pla: "Betaalbaar.",
    petg: "Gemiddeld.",
    pc: "Het duurst in onze bibliotheek.",
  },
]

const resourceLinks = [
  {
    label: "PC materiaalprofiel",
    href: "/materials/pc",
    description: "Volledige specs, FAQ en gallery voor polycarbonaat in onze materialenbibliotheek.",
  },
  {
    label: "Materialen overzicht",
    href: "/materials",
    description: "Vergelijk PC met PETG, PLA-CF en TPU in Ã©Ã©n oogopslag.",
  },
  {
    label: "Pricing & calculator",
    href: "/pricing",
    description: "Zie de impact van droogtijd en premium materiaal op de offerte.",
  },
  {
    label: "Material Suggestion Tool",
    href: "/materials#material-suggestion-tool",
    description: "Laat de wizard aftoetsen of PC nodig is of dat PETG het redt.",
  },
]

const externalReferences = [
  {
    label: "Bambu Lab PC handleiding",
    href: "https://wiki.bambulab.com/en/filament/pc",
    description: "OfficiÃ«le richtlijnen rond nozzletemperatuur, bedhechting en compatibele platen.",
  },
  {
    label: "Bambu Lab filament guideline",
    href: "https://wiki.bambulab.com/en/general/filament-guide-material-table",
    description: "Tabel met materiaalcombinaties, aanbevolen plates en snelheidlimieten.",
  },
  {
    label: "Simplify3D polycarbonate guide",
    href: "https://www.simplify3d.com/support/materials-guide/polycarbonate/",
    description: "Algemene referentie rond materiaaleigenschappen, shrink en nabewerking.",
  },
  {
    label: "Engineered PC design tips",
    href: "https://markforged.com/resources/blog/polycarbonate-design-considerations",
    description: "Insights over geometrie, ribben en post-processing bij PC onderdelen.",
  },
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Filament Vrijdag: polycarbonaat (PC) 3D printen",
  description:
    "Polycarbonaat 3D printen uitgelegd door X3DPrints: droogtijd, instellingen, toepassingen en do's & don'ts.",
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
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-sky-300/0 via-sky-300/60 to-sky-300/0" />
      <span>Filament Vrijdag</span>
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-sky-300/0 via-sky-300/60 to-sky-300/0" />
    </div>
  )
}

export default function FilamentVrijdagPcPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(160%_90%_at_50%_-20%,rgba(59,130,246,0.2),transparent_75%)]"
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
                <li className="font-medium text-slate-900">Polycarbonaat (PC)</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Filament Vrijdag</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Polycarbonaat 3D printen: hittebestendig en onverbiddelijk eerlijk.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              PC filament belooft hittebestendige, taaie onderdelen en helder materiaal voor lampen of covers. Maar het vraagt
              droogdiscipline, een gesloten printer en realistische verwachtingen. Deze blog verzamelt onze studio-notities,
              SEO-zoekwoorden zoals {"â€œpolycarbonaat 3D printenâ€"} en {"â€œPC filament drogenâ€"} en koppelt ze aan concrete cases.
            </p>
            <div className="stacked-actions mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <ShimmerButton href="/contact?material=PC">Vraag PC advies</ShimmerButton>
              <Link
                href="/materials/pc"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Bekijk PC materiaalprofiel
              </Link>
              <Link
                href="/materials"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Vergelijk met andere filamenten
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">
              Gepubliceerd op 15 december 2025. Onderdeel van de Filament Vrijdag reeks rond functionele materialen.
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
              <h2 className="text-2xl font-semibold text-slate-900">Wat mag je verwachten van PC filament?</h2>
              <p className="mt-3 text-sm text-slate-600">
                Polycarbonaat is bekend uit spuitgietproducten: helmen, machinecovers en automotive clips. In 3D printvorm krijg
                je een semi-transparant materiaal met hoge slagvastheid, een glasovergang rond 110 deg C en degelijke
                UV-bestendigheid. Ideaal voor {"â€œPC filament Gentâ€"} en {"â€œpolycarbonaat 3D print serviceâ€"} zoekopdrachten waarbij
                betrouwbaarheid primeert boven snelheid.
              </p>
              <p className="mt-3 text-sm text-slate-600">
                De keerzijde: PC stringt als het nat is, klampt zich graag los van het printbed en laat geen fouten toe in
                design. We plannen elk project met extra marge voor droogtijd, kalibratie en eventueel annealing. Dat maakt PC
                duurder, maar je koopt er wel een langere levensduur en temperatuurbestendigheid mee.
              </p>
              <p className="mt-3 text-sm text-slate-600">
                Wil je zelf testen, start dan met de{" "}
                <Link
                  href="https://wiki.bambulab.com/en/filament/pc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 underline underline-offset-4"
                >
                  PC handleiding van Bambu Lab
                </Link>{" "}
                en de{" "}
                <Link
                  href="https://www.simplify3d.com/support/materials-guide/polycarbonate/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 underline underline-offset-4"
                >
                  Simplify3D guide
                </Link>{" "}
                voor extra context over shrink en nabewerking.
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.1}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Wanneer kies je PC (en wanneer niet)?</h2>
              <div>
                <p className="text-sm font-semibold text-slate-900">PC is zinvol als:</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {whenToUse.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" aria-hidden />
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
                  <h2 className="text-2xl font-semibold text-slate-900">PC filament instellingen uit de studio</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Dit is ons vertrekpunt voor polycarbonaat op Bambu en Prusa printers met enclosure. Afwijkingen zijn
                    normaal: onderdelen met dikke wanden vragen hogere nozzletemperaturen en een langere soak time op het bed.
                  </p>
                </div>
                <Link
                  href="/materials#material-suggestion-tool"
                  className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-sky-700"
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
              <p className="mt-4 text-xs text-slate-500">
                Zoekwoorden zoals {"â€œPC filament instellingenâ€"} scoren alleen als je eerlijk bent over de randvoorwaarden: een
                enclosure, droge spoelen en adhesiecontrole. Zonder dat trio blijft PC frustratie.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <Reveal>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Veelvoorkomende issues en realistische oplossingen</h2>
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
              <h2 className="text-2xl font-semibold text-slate-900">PLA, PETG of PC?</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-slate-500">
                      <th className="py-2 pr-4">Eigenschap</th>
                      <th className="py-2 pr-4">PLA</th>
                      <th className="py-2 pr-4">PETG</th>
                      <th className="py-2 pr-4">PC</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {comparisonRows.map((row) => (
                      <tr key={row.property}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{row.property}</td>
                        <td className="py-3 pr-4">{row.pla}</td>
                        <td className="py-3 pr-4">{row.petg}</td>
                        <td className="py-3 pr-4">{row.pc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-slate-600">
                Meer weten? Lees de{" "}
                <Link href="/blog/filament-vrijdag-petg" className="text-indigo-600 underline underline-offset-4">
                  PETG editie
                </Link>{" "}
                voor een lichtere outdoor optie of bekijk{" "}
                <Link href="/blog/filament-vrijdag-pla" className="text-indigo-600 underline underline-offset-4">
                  Filament Vrijdag: PLA
                </Link>{" "}
                voor basisprototypes.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">PC in praktijkcases</h2>
              <p className="mt-2 text-sm text-slate-600">
                Enkele scenario{"'"}s uit projecten in Gent en Vlaanderen waar PC het verschil maakt:
              </p>
              <ul className="mt-4 grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
                <li className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Machinecovers</p>
                  <p className="mt-2">
                    Transparante vensters voor CNC en food-equipment waar chemicaliÃ«n en hete dampen samenkomen. PC levert taalbare
                    onderdelen die dagelijks schoonmaken overleven.
                  </p>
                </li>
                <li className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Outdoor brackets</p>
                  <p className="mt-2">
                    Zonwering, camera- en sensorbeugels die permanent buiten hangen. PC verslaat PLA en PETG qua UV en hitte zolang
                    het ontwerp spanningsvrij is.
                  </p>
                </li>
                <li className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">LED diffusers</p>
                  <p className="mt-2">
                    Helder zwart of volledig transparant voor custom verlichting. PC blijft helder en vormt mooie rook-effecten
                    zonder te vergelen.
                  </p>
                </li>
                <li className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Tooling onderdelen</p>
                  <p className="mt-2">
                    Montagehulpstukken naast warmere machines. PC houdt schroefdraad goed vast en vervormt minder tijdens
                    langdurige belasting.
                  </p>
                </li>
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-6">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Interne resources en vervolg</h2>
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
                Kritische bronnen voor wie {"â€œPC filament settingsâ€"} of {"â€œpolycarbonate drying timeâ€"} wil uitdiepen:
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Twijfel je nog tussen PETG, PC of PLA-CF?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Deel STL of STEP, vertel de omgeving (buiten, motor, chemie) en we koppelen er eerlijk materiaaladvies aan.
                  Soms wint PC, soms volstaat PETG met een coating en spaar je dagen productie- en droogtijd.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/contact?material=PC">Start PC intake</ShimmerButton>
                <Link href="/pricing" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Bekijk tarieven en werkwijze
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






