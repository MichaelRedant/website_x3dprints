import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"

const canonical = "https://www.x3dprints.be/blog/beste-instellingen-bambu-printer"

export const metadata: Metadata = {
  title: "Beste instellingen voor jouw Bambu printer | X3DPrints Blog",
  description:
    "Gebruik deze presets voor PLA, PETG en TPU op Bambu printers: temperaturen, snelheden, retract en kalibratie. Inclusief tips voor flow, AMS en onderhoud.",
  alternates: { canonical },
  openGraph: {
    title: "Beste instellingen voor jouw Bambu printer",
    description:
      "Studio-geteste instellingen voor PLA, PETG en TPU inclusief flow kalibratie, AMS tips en onderhoud zodat je prints foutloos uit de Bambu komt.",
    url: canonical,
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "Bambu printer instellingen" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Beste instellingen voor jouw Bambu printer",
    description:
      "Optimaliseer je Bambu printer met onze PLA/PETG/TPU presets, kalibratietips en troubleshoot-checklist.",
    images: ["/images/og-home.jpg"],
  },
}

const materialPresets = [
  {
    title: "PLA Matte / Tough+",
    bullets: [
      "Nozzle 215 C, bed 60 C, fan 80-100%.",
      "Layer hoogte 0.16-0.24 mm; gebruik 0.2 mm voor balans tussen detail en snelheid.",
      "Max volumetric flow 20 mm^3/s, snelheid 160 mm/s outer walls, 220 mm/s infill.",
      "Pressure advance 0.032-0.035, retract 0.8 mm @ 40 mm/s.",
    ],
  },
  {
    title: "PETG",
    bullets: [
      "Nozzle 240 C, bed 80 C, fan 30-40% om layer bonding te sparen.",
      "Layer hoogte 0.2-0.28 mm; kies 0.24 mm voor sterke behuizingen.",
      "Volumetric flow 14 mm^3/s, snelheid 120 mm/s outer walls, 180 mm/s infill.",
      "Retract 0.6 mm @ 30 mm/s, pressure advance 0.028, filament vooraf drogen.",
    ],
  },
  {
    title: "TPU (shore 95A)",
    bullets: [
      "Nozzle 235 C, bed 45 C, fan 50%.",
      "Snelheid max 30 mm/s, 20 mm/s buitenwanden om stringing te beperken.",
      "Retract 0.4 mm @ 20 mm/s, pressure advance 0.015.",
      "Gebruik AMS alleen met droger filament; anders spool achterop met korte PTFE.",
    ],
  },
]

const settingTable = [
  { param: "Nozzle temp", pla: "215 C", petg: "240 C", tpu: "235 C" },
  { param: "Bed temp", pla: "60 C", petg: "80 C", tpu: "45 C" },
  { param: "Fan", pla: "80-100%", petg: "30-40%", tpu: "50%" },
  { param: "Layer hoogte", pla: "0.16-0.24 mm", petg: "0.2-0.28 mm", tpu: "0.2 mm" },
  { param: "Volumetric flow", pla: "20 mm^3/s", petg: "14 mm^3/s", tpu: "8 mm^3/s" },
  { param: "Retract", pla: "0.8 mm @ 40 mm/s", petg: "0.6 mm @ 30 mm/s", tpu: "0.4 mm @ 20 mm/s" },
  { param: "Pressure advance", pla: "0.032-0.035", petg: "0.028", tpu: "0.015" },
]

const calibrationSteps = [
  "Loop eerst de automatische flow calibration in Bambu Studio, maar verifieer met een enkele-wall print voor kritieke toleranties.",
  "Voer een bed-level en nozzle sweep uit na elke nozzlewissel of transport. Kleine afwijkingen veroorzaken zichtbare Z-banding.",
  "Voor multi-color AMS runs: stel per slot de juiste materiaal preset in en activeer humidity reminders zodat filament droog blijft.",
  "Gebruik de built-in timelapse alleen na controle van fan strips; extra vibratie kan ringing verergeren. Pas accel/jerk aan in Expert mode indien nodig.",
]

const troubleshooting = [
  {
    title: "Stringing of blobs",
    body: "Verlaag nozzle temp in stappen van 5 C, beperk flow en zet een minimale retract van 0.6 mm. Activeer wipe tower alleen wanneer je meerdere materialen draait.",
  },
  {
    title: "Elephant foot",
    body: "Zet bed temp 5 C lager voor de eerste lagen en activeer chamfer compensation (0.3 mm) in Bambu Studio.",
  },
  {
    title: "AMS jams",
    body: "Controleer of spoelen vrij draaien, reinig PTFE buizen, en stel filament diameter op 1.75 mm vast. Gebruik drybox voor hygroscopische materialen.",
  },
]

const faq = [
  {
    q: "Moet ik de standaard templates aanpassen?",
    a: "Ja, treat de Fab presets als startpunt. Voor visueel werk verlaag je snelheid en verhoog je fan; voor mechanisch werk verhoog je temperatuur en verlaag je fan.",
  },
  {
    q: "Hoe ga ik om met variabele lagen?",
    a: "Gebruik adaptive layers in Bambu Studio maar leg de minima vast (0.14 mm voor PLA) en controleer reistijden; machine-uren blijven de grootste kost.",
  },
  {
    q: "Wanneer vervang ik de nozzle?",
    a: "Na abrasive filamenten (CF, Glow) inspecteer visueel. Wij vervangen standaard na 4-5 kg of wanneer dimensionele afwijkingen >0.1 mm optreden.",
  },
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Beste instellingen voor jouw Bambu printer",
  description:
    "Studio-geteste instellingen voor PLA, PETG en TPU op Bambu printers inclusief kalibratie, AMS tips en troubleshooting.",
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
      url: "https://www.x3dprints.be/Logo.webp",
    },
  },
  mainEntityOfPage: canonical,
  url: canonical,
}

export default function BambuSettingsPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(150%_85%_at_50%_-15%,rgba(59,130,246,0.2),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.07]" />

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
                <li className="font-medium text-slate-700">Beste instellingen Bambu printer</li>
              </ol>
            </nav>
            <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Beste instellingen voor jouw Bambu printer
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Gebruik deze presets voor PLA, PETG en TPU om het meeste uit je Bambu te halen. De instellingen zijn getest op productieprinters en sluiten aan bij de materialen die we dagelijks inzetten.
            </p>
            <div className="stacked-actions mt-6 flex flex-wrap gap-3 justify-center sm:justify-start">
              <ShimmerButton href="/materials">Materialen vergelijken</ShimmerButton>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Bekijk services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {materialPresets.map((preset) => (
            <Reveal key={preset.title}>
              <GlassCard className="h-full border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
                <h2 className="text-xl font-semibold text-slate-900">{preset.title}</h2>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  {preset.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                      <span>{bullet}</span>
                    </li>
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
            <GlassCard className="overflow-x-auto border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Snel overzicht van kerninstellingen</h2>
              <table className="mt-5 min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                <thead>
                  <tr className="text-xs uppercase tracking-wide text-slate-500">
                    <th className="py-2 pr-4">Parameter</th>
                    <th className="py-2 pr-4">PLA</th>
                    <th className="py-2 pr-4">PETG</th>
                    <th className="py-2 pr-4">TPU</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {settingTable.map((row) => (
                    <tr key={row.param}>
                      <td className="py-3 pr-4 font-medium text-slate-900">{row.param}</td>
                      <td className="py-3 pr-4">{row.pla}</td>
                      <td className="py-3 pr-4">{row.petg}</td>
                      <td className="py-3 pr-4">{row.tpu}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold text-slate-900">Kalibratiestappen</h2>
              <ol className="mt-4 space-y-3 text-sm text-slate-600">
                {calibrationSteps.map((step, index) => (
                  <li key={step} className="flex gap-3">
                    <span className="font-semibold text-slate-900">{index + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="grid gap-6 border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur md:grid-cols-3">
              {troubleshooting.map((tip) => (
                <div key={tip.title}>
                  <h3 className="text-base font-semibold text-slate-900">{tip.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{tip.body}</p>
                </div>
              ))}
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold text-slate-900">Veelgestelde vragen</h2>
              <div className="mt-4 space-y-4 text-sm text-slate-600">
                {faq.map((item) => (
                  <div key={item.q}>
                    <h3 className="text-base font-semibold text-slate-900">{item.q}</h3>
                    <p className="mt-1">{item.a}</p>
                  </div>
                ))}
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Printen wij jouw onderdelen?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Lever STL/STEP en noteer je materiaalvoorkeur. We sturen binnen een werkdag een voorstel inclusief eventuele design-optimalisaties.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/contact">Plan een gesprek</ShimmerButton>
                <Link href="/pricing" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Bekijk prijzen
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
