import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/blog/maker-monday-snapfits"
const publishedDate = "2025-10-27T08:00:00+01:00"

export const metadata: Metadata = {
  title: "Maker Monday #4: Printbare clips, klemmen en snapfits | X3DPrints",
  description:
    "Leer hoe je FDM clips en snapfits ontwerpt: materiaalkeuze, wanddiktes, tolerantie en ribben voor PLA, PETG en TPU. Studio-geteste tips voor duurzame klemmen.",
  alternates: { canonical },
  openGraph: {
    title: "Maker Monday #4: Zo ontwerp je betrouwbare 3D geprinte snapfits",
    description:
      "Richtlijnen voor FDM clips en klemmen: wanddiktes, flex-oriëntatie, tolerantie en materiaalkeuze voor PLA, PETG en TPU.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: [
      "3D print snapfit ontwerpen",
      "FDM clips design",
      "PETG snapfit",
      "PLA snapfit tolerantie",
      "flexure design",
    ],
    images: [
      {
        url: "/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "3D geprinte clip en snapfit voorbeelden",
      },
    ],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maker Monday #4: Printbare clips & snapfits",
    description:
      "Materiaalkeuze, wanddiktes, oriëntatie en tolerantie voor PLA, PETG en TPU clips. Inclusief testmethodes en ribs.",
    images: ["/images/og-home.jpg"],
  },
}

const heroStats = [
  { label: "Aanbevolen PETG wand", value: "2.0 mm", detail: "Flexibele arm voor dagelijkse cycli" },
  { label: "Snapfit speling", value: "+0.30 mm", detail: "Baseline voor PETG clips" },
  { label: "Arm lengte", value: "15-25 mm", detail: "Voor standaard snapfits" },
]

const armThickness = [
  { material: "PLA", min: "1.2 mm", strong: "1.6 mm", heavy: "2.0 mm (met risico op breuk)" },
  { material: "PETG", min: "1.4 mm", strong: "2.0 mm", heavy: "2.4 mm" },
  { material: "TPU", min: "2.0 mm", strong: "2.4 mm", heavy: "3.0 mm" },
]

const tolerances = [
  { material: "PLA", snap: "+0.25 mm", glide: "+0.15 mm" },
  { material: "PETG", snap: "+0.30 mm", glide: "+0.25 mm" },
  { material: "TPU", snap: "+0.50 mm", glide: "+0.40 mm" },
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Maker Monday #4: Hoe ontwerp je printbare clips, klemmen en snapfits?",
  description:
    "Handleiding voor FDM clips: materiaalkeuze, wanddiktes, tolerantie, ribs en testmethodes voor PLA, PETG en TPU.",
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

export default function MakerMondaySnapfitsPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(180%_90%_at_50%_-20%,rgba(79,70,229,0.14),transparent_75%)]"
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
                <li className="font-medium text-slate-900">Snapfits & clips</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Maker Monday #4</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Hoe ontwerp je printbare clips, klemmen en snapfits?
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Snapfits falen meestal door ontwerp, niet door het printproces. Te dunne armen, verkeerde oriëntatie, geen fillets
              of foutieve tolerantie zorgen ervoor dat een clip na twee cycli breekt. Deze gids toont hoe wij PLA, PETG en TPU
              klemmen wél betrouwbaar maken.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/contact?topic=maker-monday-snapfits">Vraag clip-review</ShimmerButton>
              <Link
                href="/materials"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Materialen
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Zie prijsimpact
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">Gepubliceerd op 27 oktober 2025 • Deel van Maker Monday.</p>
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
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">1. Materiaalkeuze: 50% van je succes</h2>
              <p className="mt-2 text-sm text-slate-600">
                Kies het materiaal dat past bij de flex en cycli. Gebruik{" "}
                <Link href="/blog/filament-vrijdag-pla" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                  PLA
                </Link>{" "}
                voor nette covers en kleine klikpinnetjes die zelden bewegen. Schakel naar{" "}
                <Link href="/blog/filament-vrijdag-petg" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                  PETG
                </Link>{" "}
                voor klemmen en snapfits met echte veerweg.{" "}
                <Link href="/blog/filament-vrijdag-tpu" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                  TPU
                </Link>{" "}
                is dan weer ideaal voor anti-tril klemmen en soft latches. Het materiaal bepaalt hoeveel wanddikte, tolerantie en
                oriëntatie je nodig hebt.
              </p>
              <p className="mt-4 text-sm text-slate-600">
                Toch een ABS, ASA of nylon vraagstuk? Laat het weten tijdens de intake. Onze productie draait op PLA, PETG en TPU
                voor maximale consistentie, maar we denken graag mee of een partner-run of hybride oplossing met engineering
                kunststoffen zinvol is.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">2. Oriëntatie: buig in X/Y, niet in Z</h2>
              <p className="mt-2 text-sm text-slate-600">
                Clips breken wanneer de buigkracht de layer-lines uit elkaar trekt. Leg de clip zo neer dat de flex-arm in de X/Y
                richting buigt. De lagen lopen dan mee en de arm gedraagt zich als een veer. Staat de arm rechtop in Z, dan breekt
                hij na twee cycli. Dit volgt dezelfde logica als{" "}
                <Link
                  href="/blog/maker-monday-fdm-scharnieren"
                  className="font-semibold text-indigo-600 transition hover:text-indigo-500"
                >
                  Maker Monday #1
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
              <h2 className="text-2xl font-semibold text-slate-900">3. Wanddiktes en lengtes voor clip-armen</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-slate-500">
                      <th className="py-2 pr-4">Materiaal</th>
                      <th className="py-2 pr-4">Minimale wand</th>
                      <th className="py-2 pr-4">Sterke wand</th>
                      <th className="py-2 pr-4">Zware belasting</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {armThickness.map((row) => (
                      <tr key={row.material}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{row.material}</td>
                        <td className="py-3 pr-4">{row.min}</td>
                        <td className="py-3 pr-4">{row.strong}</td>
                        <td className="py-3 pr-4">{row.heavy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Hou arm lengtes tussen 10-15 mm voor lichte clips, 15-25 mm voor standaard snapfits en 25-40 mm voor klemmen met
                echte flex. Korter dan 10 mm? Dan concentreer je alle stress op de basis. Combineer dit met de wand- en ribregels
                uit{" "}
                <Link
                  href="/blog/maker-monday-wanddiktes-ribs"
                  className="font-semibold text-indigo-600 transition hover:text-indigo-500"
                >
                  Maker Monday #2
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">4. Geometrie van een betrouwbare snapfit</h2>
              <p className="mt-2 text-sm text-slate-600">
                Een haakhoek van 15-25° zorgt voor een gecontroleerde klik. Voeg 1-2 mm fillet aan de binnenkant van de haak en
                2-4 mm fillet aan de basis van de arm. Voorzie een duidelijke schouder waar de clip tegen stopt. Zonder deze
                details breekt de arm exact op de overgang.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">5. Toleranties voor snapfits</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-slate-500">
                      <th className="py-2 pr-4">Materiaal</th>
                      <th className="py-2 pr-4">Snapfit speling</th>
                      <th className="py-2 pr-4">Glijdende fit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {tolerances.map((row) => (
                      <tr key={row.material}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{row.material}</td>
                        <td className="py-3 pr-4">{row.snap}</td>
                        <td className="py-3 pr-4">{row.glide}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Deze waarden zijn afgeleid van{" "}
                <Link
                  href="/blog/maker-monday-toleranties-3d-printen"
                  className="font-semibold text-indigo-600 transition hover:text-indigo-500"
                >
                  Maker Monday #3
                </Link>
                . Zonder speling breekt elke clip, zeker in PLA. PETG heeft +0.30 mm nodig om zwelling op te vangen en TPU zelfs
                +0.50 mm zodat de arm kan terugveren zonder te schuren.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">6. Ribs voor extra sterkte</h2>
              <p className="mt-2 text-sm text-slate-600">
                Ribs geven stijfheid zonder massa. Hou de ribdikte rond 1.0-1.2 mm, gebruik 2 mm fillets aan de basis en plaats
                ribs langs de arm (halverwege) in plaats van vlak bij de voet. Een rib die te dicht bij de basis staat, maakt de
                arm stijf en breekbaar. Verspreid verstevigingen zodat stress zich kan verdelen.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">7. Waarom PLA vaak faalt</h2>
              <p className="mt-2 text-sm text-slate-600">
                PLA is stijf en gedetailleerd maar bros. Micro-cracks aan de basis, warmteopbouw tijdens klikken en beperkte
                buiging zorgen voor snelle breuk. Gebruik het alleen voor clips die zelden buigen. Voor functionele klemmen kies
                je PETG of TPU.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">8. Wanneer TPU beter is</h2>
              <p className="mt-2 text-sm text-slate-600">
                TPU is perfect voor bundelklemmen, dempers, flexstrips en soft latches. Hou rekening met hogere wrijving: ontwerp
                ruime speling en zorg dat de geometrie de rek opvangt in plaats van scherpe klikhaken. Combineer desnoods een PETG
                basis met TPU inserts voor grip.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">9. Testen voor de finale print</h2>
              <p className="mt-2 text-sm text-slate-600">
                Voer altijd een mini-test uit: print een clip op 20-30% schaal met identieke parameters, voer een flex-test tot
                10-15° en test de clip op het doelobject. Zo vang je tolerantie- of oriëntatiefouten voordat je een volledige
                serie print.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">10. Wanneer X3DPrints inschakelen?</h2>
              <p className="mt-2 text-sm text-slate-600">
                Laat ons meekijken als je clip mechanisch kritiek is, PETG of TPU combineert, of als de klem naadloos moet klikken.
                We optimaliseren wanddiktes, tolerantie, oriëntatie en materiaalkeuze zodat je ontwerp meteen slaagt. Meer weten
                over aanpak en tarieven? Check{" "}
                <Link href="/pricing" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                  pricing
                </Link>{" "}
                of{" "}
                <Link href="/materials" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                  materialen
                </Link>
                .
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ShimmerButton href="/contact?topic=maker-monday-snapfits">Plan een gesprek</ShimmerButton>
                <Link
                  href="/3d-printen"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Bekijk knowledge hub
                </Link>
              </div>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Bonus: checklists & vervolg</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                <li>Focus eerst op wanddiktes en ribs (Maker Monday #2), daarna op tolerantie (Maker Monday #3).</li>
                <li>Zorg dat elke clip minstens 3 perimeterlijnen bevat voor consistente buiging.</li>
                <li>Gebruik de testmethodes hierboven en log welke speling werkt voor jouw printer.</li>
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <SectionDivider />

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <GlassCard className="flex flex-col gap-6 border border-white/40 bg-white/85 p-6 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Volgende stap</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Wil je dat we jouw clip mee optimaliseren?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Stuur STL of STEP, vertel hoe vaak de clip moet klikken en waar hij gemonteerd wordt. We koppelen materiaal, 
                  tolerantie en kost terug volgens onze workflow.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/contact?topic=maker-monday-snapfits">Start intake</ShimmerButton>
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
