import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"

export const metadata: Metadata = {
  title: "3D modelleren voor print | Fusion 360, Tinkercad, Blender",
  description:
    "3D modelleren op maat van 3D-printen. Fusion 360 voor technische onderdelen, Tinkercad voor snelle concepten en Blender voor organische vormen.",
  alternates: { canonical: "https://www.x3dprints.be/3d-modelleren" },
  openGraph: {
    title: "3D modelleren voor 3D prints | X3DPrints",
    description:
      "Ontwerpen die printbaar zijn: Fusion 360 voor precisie, Tinkercad voor snelle iteraties en af en toe Blender voor organische vormen.",
    url: "https://www.x3dprints.be/3d-modelleren",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

export default function Page() {
  const tooling = [
    {
      title: "Autodesk Fusion 360",
      subtitle: "Voor technische onderdelen en passing",
      bullets: [
        "Parametrisch ontwerp voor maatvaste onderdelen en samenstellingen.",
        "Snelle DFM-checks voor wanddikte, toleranties en montage.",
        "Ideaal voor beugels, behuizingen, jigs en proto-onderdelen in PETG of PLA.",
      ],
    },
    {
      title: "Tinkercad",
      subtitle: "Voor snelle concepten en eenvoudige vormen",
      bullets: [
        "Snel ideetjes uitwerken met basisvormen of bestaande STL's bewerken.",
        "Perfect voor gepersonaliseerde gadgets, kleine klemmetjes of visuele mockups.",
        "Korte doorlooptijd doordat we meteen naar slicing kunnen.",
      ],
    },
    {
      title: "Blender",
      subtitle: "Voor organische vormen (sporadisch)",
      bullets: [
        "Wordt beperkt ingezet voor zachte curves of organische sculpt details.",
        "Handig wanneer een visueel statement belangrijker is dan strikte passing.",
        "We testen printbaarheid en breiden zo nodig uit naar Fusion 360 voor nauwkeurigheid.",
      ],
    },
  ]

  const process = [
    {
      title: "Van idee naar printbaar model",
      body:
        "We starten met het doel van het onderdeel: montage, look & feel, of een proof of concept. Daarna leggen we kritische maten en materiaalkeuzes vast zodat het CAD-model printbaar blijft.",
    },
    {
      title: "Pragmatische DFM-checks",
      body:
        "Wanddikte, supportstrategie en sterkte bepalen we per onderdeel. Ik stem af welke zijde zichtwerk is en kies layerhoogte en infill die bij je gebruik passen.",
    },
    {
      title: "Itereren in kleine stappen",
      body:
        "Korte feedbackrondes met screenshots of snelle testprints. Bij elke iteratie updaten we de CAD-parameters zodat het model klaar is voor slicing en serieproductie.",
    },
  ]

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",

    inLanguage: ["nl-BE", "en-BE"],
    headline: "3D modelleren voor 3D-printen",
    description:
      "Uitleg over hoe X3DPrints 3D-modellen maakt met Autodesk Fusion 360, Tinkercad en Blender voor printbare resultaten.",
    author: { "@type": "Person", name: "X3DPrints" },
    inLanguage: "nl-BE",
    mainEntityOfPage: "https://www.x3dprints.be/3d-modelleren",
  }

  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(99,102,241,.16),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.07]" />

      <section className="px-6 pb-12 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="stacked-content">
            <p className="text-sm font-semibold text-indigo-600">3D modelleren voor 3D-printen</p>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Printbare CAD-modellen met de juiste software.
            </h1>
            <p className="mt-3 max-w-3xl text-pretty text-slate-600">
              Ik maak 3D-modellen die meteen klaar zijn voor FDM-printen. Fusion 360 gebruik ik voor technische nauwkeurigheid,
              Tinkercad voor snelle concepten en Blender slechts occasioneel voor organische vormen. Zo blijft je bestand geschikt
              voor slicing zonder verrassingen.
            </p>
            <div className="stacked-actions mt-6 flex flex-wrap gap-3 justify-center sm:justify-start">
              <ShimmerButton href="/contact">Plan een 3D-model</ShimmerButton>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/20 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:bg-white/40"
              >
                Bekijk portfolio
              </Link>
              <Link
                href="/materials#material-suggestion-tool"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/20 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:bg-white/40"
              >
                Material Suggestion Tool
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid gap-6 sm:grid-cols-3">
            {tooling.map((tool) => (
              <GlassCard
                key={tool.title}
                className="group h-full border-white/50 bg-gradient-to-br from-white/85 to-white/60 p-6 shadow-sm ring-1 ring-white/60"
              >
                <div className="text-xs font-semibold uppercase tracking-wide text-indigo-600">{tool.title}</div>
                <div className="mt-1 text-lg font-bold text-slate-900">{tool.subtitle}</div>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
                  {tool.bullets.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
            <GlassCard className="border-white/50 bg-gradient-to-br from-white/85 to-white/60 p-6 shadow-sm ring-1 ring-white/60">
              <p className="text-sm font-semibold text-indigo-600">Werkwijze</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Gericht ontwerpen voor sterke prints.
              </h2>
              <p className="mt-3 text-slate-600">
                Ik combineer CAD met slice-ervaring: elke afronding, fillet of versteviging is gekozen met printbaarheid in het achterhoofd. Zo vermijden we support-overkill en blijft de passing behouden.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-white/70 p-4 shadow-sm ring-1 ring-slate-200/60">
                  <div className="text-sm font-semibold text-slate-900">Input</div>
                  <p className="mt-1 text-sm text-slate-600">Schets, referentiefoto, of STEP/STL. We noteren kritieke maten en gebruiksscenario.</p>
                </div>
                <div className="rounded-xl bg-white/70 p-4 shadow-sm ring-1 ring-slate-200/60">
                  <div className="text-sm font-semibold text-slate-900">Output</div>
                  <p className="mt-1 text-sm text-slate-600">Printbaar STL/STEP + adviezen voor orientatie, supports en materiaalkeuze.</p>
                </div>
              </div>
            </GlassCard>

            <div className="grid gap-4">
              {process.map((item) => (
                <GlassCard
                  key={item.title}
                  className="border-white/50 bg-white/80 p-5 shadow-sm ring-1 ring-white/60"
                >
                  <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
                </GlassCard>
              ))}
              <div className="flex flex-wrap gap-3">
                <ShimmerButton href="/contact">Vraag een model aan</ShimmerButton>
                <Link
                  href="/segments"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/60 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Bekijk segmenten
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    </main>
  )
}
