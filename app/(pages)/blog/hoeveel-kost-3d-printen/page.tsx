import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"

const canonical = "https://www.x3dprints.be/blog/hoeveel-kost-3d-printen"

export const metadata: Metadata = {
  title: "Hoeveel kost 3D printen? | X3DPrints Blog",
  description:
    "Ontdek welke factoren de prijs van 3D printen bepalen: materiaal, machine-uren, afwerking en logistiek. Inclusief voorbeeldberekening en link naar de prijscalculator.",
  alternates: { canonical },
  openGraph: {
    title: "Hoeveel kost 3D printen?",
    description:
      "Volledige breakdown van materiaalprijs, machine-uren, afwerking en logistiek. Gebruik onze prijscalculator en vraag een offerte.",
    url: canonical,
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "Kostprijs 3D printen" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hoeveel kost 3D printen?",
    description: "Strategische gids om de kostprijs van 3D prints in te schatten, inclusief voorbeeldberekening.",
    images: ["/images/og-home.jpg"],
  },
}

const costFactors = [
  {
    title: "Materiaal",
    description:
      "PLA Matte is onze baseline. Speciale blends zoals Silk, Carbon of Wood vragen 15-30 procent opslag vanwege duurdere spoelen en hogere slijtage.",
    tip: "Check de materialenpagina om kleuropties en voorraden te zien.",
    link: { href: "/materials", label: "Materialen vergelijken" },
  },
  {
    title: "Machine-uren",
    description:
      "Fijnere laaghoogtes, extra infill of support verhogen de printtijd. Het grootste deel van de kostprijs komt uit deze machine-uren.",
    tip: "Gebruik de prijscalculator om Small/Medium/Large scenario&rsquo;s te vergelijken.",
    link: { href: "/pricing", label: "Ga naar pricing & calculator" },
  },
  {
    title: "Nabewerking",
    description:
      "Schuren, primen of lakken voegen manuren en verbruiksmateriaal toe. Voor zichtwerk zoals awards of interieurstukken plannen we een aparte afwerkingsfase.",
    tip: "Beschrijf gewenste finishing in het formulier zodat we ze mee offreren.",
    link: { href: "/contact", label: "Vraag finishing advies" },
  },
  {
    title: "Logistiek",
    description:
      "Afhalen in Herzele is gratis. Bpost/levering varieert tussen 6 en 25 euro afhankelijk van gewicht en snelheid.",
    tip: "Combineer meerdere onderdelen in een zending om verzendkost te drukken.",
    link: { href: "/pricing", label: "Zie verzendopties" },
  },
]

const scenarios = [
  {
    name: "Small prototype",
    specs: "PLA Matte, 5 x 5 x 5 cm, 0.2 mm layer",
    weight: "35 g",
    time: "1.2 h",
    estimate: "EUR 18 - 25",
  },
  {
    name: "Medium behuizing",
    specs: "PLA Tough+, 12 x 9 x 6 cm, 0.2 mm layer",
    weight: "140 g",
    time: "4 h",
    estimate: "EUR 55 - 75",
  },
  {
    name: "Functioneel PETG deel",
    specs: "PETG, 18 x 12 x 4 cm, 0.24 mm layer",
    weight: "220 g",
    time: "5.5 h",
    estimate: "EUR 80 - 110",
  },
]

const faq = [
  {
    q: "Hoe snel krijg ik een exacte offerte?",
    a: "Binnen 1 werkdag na ontvangst van STL/STEP, inclusief materiaalkeuze en levering. We sturen altijd feedback op kritieke vlakken zoals wanddikte of orientatie.",
  },
  {
    q: "Wat als ik meerdere stuks bestel?",
    a: "We groeperen prints per materiaal en machine. Dat levert volumekorting op zodra de setupkosten verdeeld worden over meerdere onderdelen.",
  },
  {
    q: "Kan ik zelf een printtijd inschatten?",
    a: "Ja. Gebruik de Small/Medium/Large richtprijzen op de pricing pagina. Voor precieze timing hebben we je model nodig zodat we slicer-data kunnen analyseren.",
  },
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Hoeveel kost 3D printen?",
  description:
    "Volledige gids over de kostprijs van 3D printen, inclusief materiaalprijzen, machine-uren, nabewerking en logistiek.",
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

export default function BlogCostPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(160%_90%_at_50%_-20%,rgba(56,178,172,0.18),transparent_70%)]"
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
                <li className="font-medium text-slate-700">Hoeveel kost 3D printen?</li>
              </ol>
            </nav>
            <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Hoeveel kost 3D printen?
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              De totale kost van een 3D print is een optelsom van materiaal, machine-uren, eventuele nabewerking en logistiek.
              In dit artikel tonen we hoe wij prijzen berekenen, inclusief voorbeelden en tips om budget te optimaliseren.
            </p>
            <div className="stacked-actions mt-6 flex flex-wrap gap-3 justify-center sm:justify-start">
              <ShimmerButton href="/pricing">Gebruik de prijscalculator</ShimmerButton>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Vraag offerte
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-2">
          {costFactors.map((factor) => (
            <Reveal key={factor.title}>
              <GlassCard className="h-full border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Kostenfactor</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">{factor.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{factor.description}</p>
                <p className="mt-3 text-xs font-medium text-slate-500">Tip: {factor.tip}</p>
                <Link
                  href={factor.link.href}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
                >
                  {factor.link.label}
                  <span aria-hidden>-&gt;</span>
                </Link>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="overflow-hidden border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Voorbeeldberekening</h2>
              <p className="mt-3 text-sm text-slate-600">
                Deze scenario&rsquo;s tonen hoe materiaal, gewicht en machine-uren samen de kostprijs bepalen. Gebruik ze als startpunt
                en stuur je model door voor een exacte analyse.
              </p>
              <div className="mt-5 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-slate-500">
                      <th className="py-2 pr-4">Case</th>
                      <th className="py-2 pr-4">Specificaties</th>
                      <th className="py-2 pr-4">Gewicht</th>
                      <th className="py-2 pr-4">Printtijd</th>
                      <th className="py-2 pr-4">Indicatie</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {scenarios.map((scenario) => (
                      <tr key={scenario.name}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{scenario.name}</td>
                        <td className="py-3 pr-4">{scenario.specs}</td>
                        <td className="py-3 pr-4">{scenario.weight}</td>
                        <td className="py-3 pr-4">{scenario.time}</td>
                        <td className="py-3 pr-4 font-medium text-slate-900">{scenario.estimate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-2">
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold text-slate-900">Checklist voor je aanvraag</h2>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li>Voeg STL/STEP toe en vermeld of prototypes nog aangepast mogen worden.</li>
                  <li>Geef gewenste materiaal, kleur en afwerking mee (bijvoorbeeld PLA Matte wit, gezandstraald).</li>
                  <li>Noteer deadline en leveroptie: afhalen, Bpost of persoonlijke levering.</li>
                  <li>Bij functionele onderdelen: deel belastingsinfo of omgeving (temperatuur, UV, chemie).</li>
                </ul>
              </GlassCard>
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold text-slate-900">Direct doorpakken</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Gebruik de tool op de pricing-pagina voor een snelle indicatie en upload daarna je bestanden via de viewer of het contactformulier.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                  >
                    Naar pricing
                  </Link>
                  <Link
                    href="/viewer"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                  >
                    STL uploaden
                  </Link>
                </div>
              </GlassCard>
            </div>
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Stuur je bestanden door</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Je ontvangt gratis feedback over materiaalkeuze en design tweaks zodat de prijs perfect bij de toepassing past.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/contact">Plan een gesprek</ShimmerButton>
                <Link
                  href="/pricing"
                  className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
                >
                  Bekijk tarieven
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
