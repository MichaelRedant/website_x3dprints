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
      "PLA Matte is onze baseline en de meest kostenefficiënte keuze voor prototypes en kleine onderdelen. Materialen zoals PETG of TPU variëren in prijs door hun specifieke eigenschappen, zoals extra taaiheid of flexibiliteit.",
    tip: "Bekijk alle actuele materialen en kleuren in onze materialenlijst.",
    link: { href: "/materials", label: "Materialen vergelijken" },
  },
  {
    title: "Machine-uren",
    description:
      "Het grootste deel van de kostprijs komt van de printtijd. Complexere modellen, hogere resolutie of meer infill verhogen het aantal machine-uren en dus de totale prijs.",
    tip: "Gebruik de prijscalculator om realistische tijds- en kosteninschattingen te krijgen.",
    link: { href: "/pricing", label: "Ga naar pricing & calculator" },
  },
  {
    title: "Modelcomplexiteit",
    description:
      "Sterk overhangende delen of dunne geometrieën kunnen extra ondersteuningsstructuren vereisen. Dit verhoogt printtijd en materiaalverbruik. Voor eenvoudige vormen is de kostprijs meestal lager.",
    tip: "Laad je model in via de viewer om te controleren of er supports nodig zijn.",
    link: { href: "/viewer", label: "STL controleren" },
  },
  {
    title: "Logistiek",
    description:
      "Afhalen in Herzele is gratis. Verzending via Bpost varieert tussen 6 en 25 euro afhankelijk van gewicht en snelheid. Grote prints worden stevig verpakt voor veilig transport.",
    tip: "Combineer meerdere onderdelen in één verzending om kosten te drukken.",
    link: { href: "/pricing", label: "Zie verzendopties" },
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
  {
  q: "Waarom verschillen prijzen tussen verschillende 3D printservices?",
  a: "Elke 3D-printshop werkt met andere machines, materiaalkost, snelheid en kwaliteitsinstellingen. Bij X3DPrints gebruiken we een transparant model gebaseerd op printduur en materiaalverbruik. Dat geeft een eerlijke en voorspelbare prijs."
},
{
  q: "Is 3D printen goedkoper als ik mijn model aanpas?",
  a: "Ja. Kleinere schaal, minder infill, minder overhang of een andere oriëntatie kunnen de printtijd sterk verminderen. Je ziet de impact meteen in onze prijscalculator."
},
{
  q: "Hoe weet ik of mijn model efficiënt geprint kan worden?",
  a: "Onze slicer controleert automatisch de printbaarheid. Na je aanvraag krijg je gratis feedback over wanden, supports en eventuele optimalisaties."
}

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
              <h2 className="text-2xl font-semibold text-slate-900">
  Hoeveel kost 3D printen in de praktijk?
</h2>
<p className="mt-3 text-sm text-slate-600">
  Veel bezoekers zoeken een concreet antwoord op de vraag <strong>&quot;hoeveel kost 3D printen&quot;</strong>. 
  Omdat elk model anders is, werken we met een prijscalculator die automatisch rekening houdt met materiaal, 
  volume, gewicht en printduur. Zo krijg je geen vaste tabelprijzen die niet bij jouw project passen, maar 
  een realistische inschatting op maat.
</p>
<p className="mt-3 text-sm text-slate-600">
  Op de <Link href="/pricing" className="font-semibold text-emerald-600 hover:text-emerald-700">
    pricing-pagina
  </Link> kun je zelf scenario&apos;s testen. Je ziet meteen hoe de kost evolueert wanneer je het model 
  schaalt, een ander materiaal kiest of de instellingen aanpast. Dat maakt het veel eenvoudiger om binnen 
  je budget te blijven en toch de juiste kwaliteit te kiezen.
</p>
<div className="mt-4">
  <Link
    href="/pricing"
    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-emerald-700"
  >
    Gebruik de prijscalculator
  </Link>
</div>
<p className="mt-3 text-sm text-slate-600">
  Hieronder zie je drie veelvoorkomende categorieën als sales-ready richtprijs, identiek aan de{" "}
  <Link href="/pricing" className="font-semibold text-emerald-600 hover:text-emerald-700">prijspagina</Link>. Richtprijzen
  op basis van PLA Matte, circa 25% infill en 200% marge (x3) op de basiskost. Exacte prijs volgt na STL-analyse in de{" "}
  <Link href="/pricing" className="font-semibold text-emerald-600 hover:text-emerald-700">prijscalculator</Link>.
</p>


              <div className="mt-5 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <tbody className="divide-y divide-slate-100">

  
  <tr>
    <td className="py-3 pr-4 font-semibold text-slate-900">Small</td>
    <td className="py-3 pr-4">ca. 5 x 5 x 5 cm - PLA Matte (standaard) - ~50 g</td>
    <td className="py-3 pr-4">~50 g</td>
    <td className="py-3 pr-4">~2 uur</td>
    <td className="py-3 pr-4 font-medium text-slate-900">EUR 4.93 / stuk</td>
  </tr>

  <tr>
    <td className="py-3 pr-4 font-semibold text-slate-900">Medium</td>
    <td className="py-3 pr-4">ca. 10 x 10 x 10 cm - PLA Matte (standaard) - ~200 g</td>
    <td className="py-3 pr-4">~200 g</td>
    <td className="py-3 pr-4">~6.5 uur</td>
    <td className="py-3 pr-4 font-medium text-slate-900">EUR 19.17 / stuk</td>
  </tr>

  <tr>
    <td className="py-3 pr-4 font-semibold text-slate-900">Large</td>
    <td className="py-3 pr-4">ca. 20 x 20 x 20 cm - PLA Matte (standaard) - ~500 g</td>
    <td className="py-3 pr-4">~500 g</td>
    <td className="py-3 pr-4">~15 uur</td>
    <td className="py-3 pr-4 font-medium text-slate-900">EUR 47.48 / stuk</td>
  </tr>
</tbody>

                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
  Deze richtprijzen gelden voor PLA Matte met standaardinstellingen. Grotere of zwaardere modellen gebruiken meer materiaal 
  en kosten daardoor meer. Voor de meest nauwkeurige berekening gebruik je best de 
  <Link href="/pricing" className="font-semibold text-emerald-600 hover:text-emerald-700"> prijscalculator</Link>.
</p>

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
                  <li>Noteer deadline en leveroptie: afhalen, persoonlijke levering (EV, zones) of pakketdienst.</li>
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
