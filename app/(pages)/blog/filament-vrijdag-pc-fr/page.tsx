import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/blog/filament-vrijdag-pc-fr"
const publishedDate = "2026-01-23T08:00:00+01:00" // vrijdag in januari

export const metadata: Metadata = {
  title: "Filament Vrijdag: PC FR (UL94 V-0) 3D printen | X3DPrints",
  description:
    "PC FR vlamvertragend filament voor industriële behuizingen. Leer instellingen, droogtijd en wanneer PC FR loont tegenover standaard PC of PETG.",
  alternates: { canonical },
  openGraph: {
    title: "PC FR 3D printen: UL94 V-0 zonder drama",
    description:
      "Filament Vrijdag over PC FR: flame retardant polycarbonaat, instellingen, drogen en besliscriteria tegenover PC en PETG.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: [
      "PC FR filament",
      "vlamvertragend 3D printen",
      "UL94 V-0",
      "Filament Vrijdag",
    ],
    images: [
      { url: "/images/og-home.jpg", width: 1200, height: 630, alt: "PC FR 3D print advies" },
    ],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filament Vrijdag: PC FR (UL94 V-0) filament",
    description:
      "Wanneer kies je PC FR? Tips over drogen, printen, design en wanneer PC of PETG beter past.",
    images: ["/images/og-home.jpg"],
  },
}

const heroStats = [
  { label: "Flame rating", value: "UL94 V-0", detail: "Zelfdovend binnen seconden" },
  { label: "Temperatuur", value: "260-280 °C", detail: "Bed 90-110 °C, enclosure verplicht" },
  { label: "Droogtijd", value: "8u @ 80 °C", detail: "Warm bewaren tijdens de print" },
]

const whenToUse = [
  "Behuizingen die aan brandnormen moeten voldoen (UL94 V-0).",
  "Rail-kasten, PSU covers en elektronica in krappe kasten met hittebronnen.",
  "Industrie- of automotive brackets die hitte + vlamvertragend + UV nodig hebben.",
  "Projecten waar PETG tekortschiet qua temperatuur en PC net geen certificatie biedt.",
]

const whenToAvoid = [
  "Budgetprints zonder vlamrisico: PETG of PC volstaat en is goedkoper.",
  "Open printers zonder enclosure: warping en delaminatie zijn gegarandeerd.",
  "Zeer dunne wanden en scherpe hoeken; ontwerp moet spanningen vermijden.",
  "Deadlines zonder tijd voor drogen of bed-adhesie tuning.",
]

const printSettings = [
  { label: "Nozzle", value: "260-280 °C", note: "Begin op 265 °C, verhoog bij dikke wanden." },
  { label: "Bed", value: "90-110 °C + lijmstick", note: "Textured PEI of garolite met brim." },
  { label: "Snelheid", value: "30-55 mm/s", note: "Lagere acceleratie voor laaghechting." },
  { label: "Koeling", value: "0-15 %", note: "Alleen voor bridges; te veel koeling = scheuren." },
  { label: "Droog", value: "8u @ 80 °C", note: "Laat in drybox tijdens de run, anders matte lagen." },
  { label: "Omgeving", value: "Gesloten kamer", note: "20-30 °C chamber minimaliseert spanning." },
]

const comparisonRows = [
  { label: "Vlamvertragend", pc: "Nee", pcfr: "Ja, UL94 V-0" },
  { label: "Glasovergang", pc: "~110 °C", pcfr: "~110 °C" },
  { label: "Transparantie", pc: "Transparant / Helder Zwart", pcfr: "Halftransparant, zwart/grijs/wit" },
  { label: "Use case", pc: "Outdoor, machinecovers, diffusers", pcfr: "Elektronica, rail-kasten, safety" },
  { label: "Prijs", pc: "€€€", pcfr: "€€€+" },
]

const externalReferences = [
  {
    label: "Bambu Lab PC FR filament specs",
    href: "https://wiki.bambulab.com/en/filament/pc-fr",
    description: "Officiële nozzle/bed-adviezen en plaatcompatibiliteit voor PC FR.",
  },
  {
    label: "UL94 V-0 (Wikipedia)",
    href: "https://en.wikipedia.org/wiki/UL_94",
    description: "Wat UL94 V-0 inhoudt en hoe de test wordt uitgevoerd.",
  },
  {
    label: "Polycarbonaat (Wikipedia)",
    href: "https://en.wikipedia.org/wiki/Polycarbonate",
    description: "Eigenschappen van polycarbonaat en toepassingsdomeinen.",
  },
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Filament Vrijdag: PC FR (UL94 V-0) 3D printen",
  description:
    "PC FR vlamvertragend polycarbonaat voor industriële behuizingen. Instellingen, droogtijd, use cases en alternatieven.",
  datePublished: publishedDate,
  author: { "@type": "Organization", name: "X3DPrints", url: "https://www.x3dprints.be" },
  publisher: {
    "@type": "Organization",
    name: "X3DPrints",
    url: "https://www.x3dprints.be",
    logo: { "@type": "ImageObject", url: "https://www.x3dprints.be/og-x3dprints.jpg" },
  },
  mainEntityOfPage: canonical,
  dateModified: "2026-02-04T11:15:50+01:00",
  url: canonical,
  image: "https://www.x3dprints.be/images/og-home.jpg",
}

type PageProps = { searchParams?: Promise<Record<string, string | string[] | undefined>>; params?: Promise<Record<string, string | string[] | undefined>> }

function SectionDivider() {
  return (
    <div className="mx-auto my-10 flex w-full max-w-4xl items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-500">
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-indigo-300/0 via-indigo-300/60 to-indigo-300/0" />
      <span>Filament Vrijdag</span>
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-indigo-300/0 via-indigo-300/60 to-indigo-300/0" />
    </div>
  )
}

export default function FilamentVrijdagPcFrPage({}: PageProps) {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(150%_80%_at_50%_-20%,rgba(79,70,229,0.22),transparent_75%)]"
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
                <li className="font-medium text-slate-900">PC FR (UL94 V-0)</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Filament Vrijdag</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              PC FR 3D printen: vlamvertragend en industrieel robuust.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              PC FR is onze keuze wanneer UL94 V-0 verplicht is. Het combineert de hitte- en UV-bestendigheid van PC met
              gecertificeerde vlamvertraging. In deze editie krijg je instellingen, design-aanpak en hoe PC FR zich verhoudt
              tot standaard PC en PETG.
            </p>
            <div className="stacked-actions mt-6 flex flex-wrap justify-center gap-3 sm:justify-start">
              <ShimmerButton href="/contact?material=PC%20FR">Plan een PC FR run</ShimmerButton>
              <Link
                href="/materials/pc-fr"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                PC FR materiaalprofiel
              </Link>
              <Link
                href="/blog/filament-vrijdag-pc"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Lees de PC editie
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">Gepubliceerd op 23 januari 2026.</p>
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
              <h2 className="text-2xl font-semibold text-slate-900">Wanneer kies je PC FR?</h2>
              <p className="mt-3 text-sm text-slate-600">
                PC FR is gebouwd voor safety-critical onderdelen: het dooft zichzelf, blijft vormvast rond 110 °C en kan UV
                verdragen. Denk aan PSU covers, rail-kasten en elektronica in machines. Als vlamvertraging géén eis is, blijf bij{" "}
                <Link href="/blog/filament-vrijdag-pc" className="text-indigo-600 underline underline-offset-4">
                  standaard PC
                </Link>{" "}
                of overweeg <Link href="/blog/filament-vrijdag-petg" className="text-indigo-600 underline underline-offset-4">PETG</Link>{" "}
                om kosten en doorlooptijd te verlagen.
              </p>
              <div className="mt-4 grid gap-2">
                <p className="text-sm font-semibold text-slate-900">PC FR is zinvol als:</p>
                <ul className="mt-2 space-y-2 text-sm text-slate-600">
                  {whenToUse.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <p className="text-sm font-semibold text-slate-900">Kies iets anders wanneer:</p>
                <ul className="mt-2 space-y-2 text-sm text-slate-600">
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

          <Reveal delay={0.08}>
            <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Studio-instellingen voor PC FR</h2>
              <p className="mt-2 text-sm text-slate-600">
                Start hier en finetune per model. PC FR is gevoeliger voor koeling; houd de behuizing warm en vermijd plotselinge
                airflow.
              </p>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                {printSettings.map((setting) => (
                  <div key={setting.label} className="rounded-2xl border border-slate-100 bg-white/60 p-4">
                    <dt className="text-xs uppercase tracking-[0.3em] text-slate-500">{setting.label}</dt>
                    <dd className="mt-2 text-xl font-semibold text-slate-900">{setting.value}</dd>
                    <p className="text-sm text-slate-600">{setting.note}</p>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-xs text-slate-500">
                Externe referenties:{" "}
                <Link
                  href="https://wiki.bambulab.com/en/filament/pc-fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 underline underline-offset-4"
                >
                  Bambu PC FR guide
                </Link>{" "}
                en{" "}
                <Link
                  href="https://www.ul.com/resources/flame-rating-ul-94"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 underline underline-offset-4"
                >
                  UL94 uitleg
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">PC FR vs PC</h2>
              <p className="mt-2 text-sm text-slate-600">
                De kern: kies PC FR als veiligheid of compliance primeert. Kies PC als je transparantie en lagere prijs belangrijk
                vindt zonder UL-rating. Beide blijven maatvast rond 110 °C.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-[320px] text-sm text-slate-700">
                  <thead>
                    <tr className="text-left text-slate-500">
                      <th className="py-2 pr-4 font-semibold">Aspect</th>
                      <th className="py-2 pr-4 font-semibold">PC</th>
                      <th className="py-2 pr-4 font-semibold">PC FR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row) => (
                      <tr key={row.label} className="border-t border-slate-200/70">
                        <td className="py-2 pr-4 font-medium text-slate-900">{row.label}</td>
                        <td className="py-2 pr-4">{row.pc}</td>
                        <td className="py-2 pr-4">{row.pcfr}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/blog/filament-vrijdag-pc"
                  className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
                >
                  Lees de PC editie
                </Link>
                <Link
                  href="/materials/pc"
                  className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
                >
                  PC materiaalprofiel
                </Link>
                <Link
                  href="/materials/pc-fr"
                  className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
                >
                  PC FR materiaalprofiel
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-6">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Resources & volgende stappen</h2>
              <ul className="mt-3 space-y-3 text-sm text-slate-600">
                <li>
                  <Link href="/pricing" className="font-semibold text-emerald-600 transition hover:text-emerald-700">
                    Pricing & calculator
                  </Link>{" "}
                  – zie prijsimpact van PC FR versus PC (hogere kg-prijs + droogtijd).
                </li>
                <li>
                  <Link href="/materials#material-suggestion-tool" className="font-semibold text-emerald-600 transition hover:text-emerald-700">
                    Material Suggestion Tool
                  </Link>{" "}
                  – laat de wizard beslissen of PC FR echt nodig is.
                </li>
                <li>
                  <Link href="/blog/hoeveel-kost-3d-printen" className="font-semibold text-emerald-600 transition hover:text-emerald-700">
                    Kostenblog
                  </Link>{" "}
                  – begrijp waarom premium materialen extra leadtime vragen.
                </li>
              </ul>
            </GlassCard>
          </Reveal>
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Bronnen</h2>
              <ul className="mt-3 space-y-3 text-sm text-slate-600">
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">PC FR nodig? We plannen het samen.</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Deel STL/STEP, vermeld normeringen of brandvereisten en we adviseren of PC FR, standaard PC of PETG volstaat.
                  Je krijgt prijs, timing en een eerlijk alternatief indien mogelijk.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/contact?material=PC%20FR">Start PC FR intake</ShimmerButton>
                <Link href="/materials/pc-fr" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Bekijk PC FR materiaal
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








