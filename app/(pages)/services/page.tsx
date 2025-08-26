// app/(pages)/services/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import {
  Brush, Palette, Printer, Wrench, Layers, Package, Ruler, Box, Sparkles, Puzzle
} from "lucide-react"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"

export const metadata: Metadata = {
  title: "3D Print Services | FDM, nabewerking & montage",
  description:
    "Professionele FDM 3D-printservice voor prototypes en kleine series. Materiaaladvies, nabewerking, inserts en montage. Regio Herzele/Gent.",
  alternates: { canonical: "https://www.x3dprints.be/services" },
  openGraph: {
    title: "3D Print Services",
    description:
      "Van STL/STEP naar strakke, functionele prints. Snel, betaalbaar en consistent, met afwerking op maat.",
    url: "https://www.x3dprints.be/services",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

export default function Page() {
  const services = [
    {
      icon: Printer,
      title: "FDM 3D-printen",
      description:
        "Functionele onderdelen en prototypes. PLA standaard, PETG/TPU/PLA-varianten op aanvraag. Tot ~25×25×25 cm per stuk.",
    },
    {
      icon: Palette,
      title: "Materiaal- & kleuradvies",
      description:
        "We matchen toepassing en omgeving met het juiste filament. Denk aan hitte/UV, flexibiliteit of visuele afwerking.",
    },
    {
      icon: Brush,
      title: "Nabewerking",
      description:
        "Schuren, primen, lakken. Nette visuele afwerking voor showmodellen of eindgebruik.",
    },
    {
      icon: Wrench,
      title: "Montage & kwaliteitscheck",
      description:
        "Samenstellen van onderdelen, passing controleren, en klaarzetten voor directe inzet.",
    },
    {
      icon: Layers,
      title: "DFM-review",
      description:
        "Pragmatisch advies over wanddiktes, infill, oriëntatie en supports om tijd, gewicht en kosten te drukken.",
    },
    {
      icon: Package,
      title: "Kleine series",
      description:
        "Korte doorlooptijden voor batches. Consistente kwaliteit en duidelijke planning.",
    },
    {
      icon: Ruler,
      title: "Inserts & schroefdraad",
      description:
        "Warmte-insert, bus of captive nut voor herhaalbare montage en stevige verbindingen.",
    },
    {
  icon: Box, // i.p.v. Cube
  title: "Modelreparatie (basis)",
  description:
    "Controle op manifold issues, orientatie, support en slicing-correcties. Complexe CAD-opmaak op aanvraag.",
},
  ]

  const useCases = [
    {
      icon: Sparkles,
      title: "Prototyping",
      description:
        "Snel valideren met strakke prototypes. Itereer zonder wachttijden en pas geometrie of materiaal aan per run.",
    },
    {
      icon: Puzzle,
      title: "Jigs & fixtures",
      description:
        "Hulpgereedschap, klemmen en malletjes op maat voor assemblage of test-opstellingen.",
    },
    {
      icon: Package,
      title: "Behuizingen & brackets",
      description:
        "Op maat gemaakte kastjes, houders en scharnierende onderdelen met nette passing.",
    },
    {
      icon: Brush,
      title: "Displays & retail",
      description:
        "POS-materiaal, producthouders en etalageonderdelen die opvallen en exact passen.",
    },
    {
      icon: Ruler,
      title: "Vervangstukken",
      description:
        "Niet-meer-leverbaar onderdeel? We printen een pasvorm-equivalent en testen de montage.",
    },
    {
      icon: Palette,
      title: "Gepersonaliseerd",
      description:
        "Naamplaatjes, gifts en premium decor met PLA Wood/Marble, Silk of Translucent varianten.",
    },
  ]

  const specs = [
    { k: "Formaten", v: "Tot ~25 × 25 × 25 cm per stuk (splitsen mogelijk)" },
    { k: "Layerhoogte", v: "0,12–0,28 mm (afhankelijk van onderdeel)" },
    { k: "Tolerantie", v: "typisch ±0,2 mm (FDM)" },
    { k: "Materialen", v: "PLA (mat/wood/marble/silk/… ), PETG, TPU; andere op aanvraag" },
    { k: "Afwerking", v: "Rauw, geschuurd, geprimed, gelakt; inserts en montage" },
    { k: "Doorlooptijd", v: "meestal 2–5 werkdagen, spoed in overleg" },
  ]

  const faq = [
    {
      q: "Welke 3D-bestanden zijn ideaal?",
      a: "STL of STEP. Voeg context toe: functie, omgeving (hitte/UV), kleur en gewenste afwerking.",
    },
    {
      q: "Welke regio leveren jullie?",
      a: "Herzele/Gent als uitvalsbasis. Verzenden binnen België of afhalen in overleg.",
    },
    {
      q: "Doen jullie nabehandeling en montage?",
      a: "Ja. Schuren, primen en lakken. Inserts, lijmen en basis-assemblage mogelijk.",
    },
    {
      q: "Hoe snel krijg ik een offerte?",
      a: "Meestal binnen 24 uur na je aanvraag met model en korte beschrijving.",
    },
  ]

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  }

  // OfferCatalog voor services (SEO)
  const catalogJsonLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "X3DPrints 3D-printservices",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.description,
        areaServed: "BE",
        provider: { "@type": "LocalBusiness", name: "X3DPrints" },
      },
    })),
  }

  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(99,102,241,.14),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.06]" />

      {/* HERO */}
      <section className="px-6 pt-14 pb-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h1 className="bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
              Services
            </h1>
            <p className="mt-3 max-w-3xl text-slate-600">
              Professionele 3D-printdienst voor prototypes en kleine series, met materiaaladvies, nette afwerking en
              montage. Transparante communicatie en korte lijnen vanuit Herzele.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                href="/contact"
                className="rounded-xl border border-white/20 bg-black px-5 py-3 text-sm font-semibold text-white hover:brightness-110"
              >
                Offerte aanvragen
              </Link>
              <Link
                href="/materials"
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                Materialen & kleuren
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <GlassCard className="h-full p-6 transition-transform hover:-translate-y-1">
                  <s.icon className="h-8 w-8 text-slate-900" aria-hidden />
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{s.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{s.description}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">Waarvoor je 3D-printen inzet</h2>
            <p className="mt-2 max-w-3xl text-slate-600">
              Van engineering tot retail: 3D-printen versnelt ontwikkeling, verlaagt kosten en geeft vrijheid in vorm en kleur.
            </p>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u, i) => (
              <Reveal key={u.title} delay={i * 0.05}>
                <GlassCard className="h-full p-6">
                  <u.icon className="h-7 w-7 text-slate-900" aria-hidden />
                  <h3 className="mt-3 text-base font-semibold text-slate-900">{u.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{u.description}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SPECS + AFWERKING */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
            <Reveal>
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">Specificaties</h2>
                <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                  {specs.map((s) => (
                    <div key={s.k} className="rounded-lg border border-slate-200/70 bg-white/70 p-3">
                      <dt className="text-xs uppercase tracking-wide text-slate-500">{s.k}</dt>
                      <dd className="mt-1 text-sm text-slate-700">{s.v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-xs text-slate-500">
                  Grotere onderdelen worden eventueel opgesplitst en samengevoegd. Vraag gerust naar de beste aanpak.
                </p>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.06}>
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">Afwerking & montage</h2>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                  <li>Schuren, primen en lakken in nette, egale finish</li>
                  <li>Thermische inserts, lijmverbindingen en eenvoudige montage</li>
                  <li>Kleurkeuze in PLA-varianten (Matte, Wood, Marble, Silk, Translucent, …)</li>
                </ul>
                <div className="mt-4">
                  <Link
                    href="/materials"
                    className="inline-flex items-center rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
                  >
                    Kleuren & varianten bekijken
                  </Link>
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">Workflow</h2>
              <ol className="mt-3 list-decimal space-y-1 pl-5 text-slate-600">
                <li>Upload STL/STEP en vermeld toepassing, kleur en gewenste afwerking</li>
                <li>Materiaaladvies en offerte, doorgaans binnen 24 uur</li>
                <li>Productie, kwaliteitscheck en eventuele nabewerking</li>
                <li>Verzending of afhalen in Herzele; factuur digitaal</li>
              </ol>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">Veelgestelde vragen</h2>
              <ul className="mt-3 space-y-3 text-slate-600">
                {faq.map((f) => (
                  <li key={f.q}>
                    <h3 className="font-medium text-slate-900">{f.q}</h3>
                    <p className="mt-1 text-sm">{f.a}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <Link
                  href="/contact"
                  className="rounded-xl border border-white/20 bg-black px-5 py-3 text-sm font-semibold text-white hover:brightness-110"
                >
                  Offerte aanvragen
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogJsonLd) }} />
    </main>
  )
}
