// app/(pages)/pricing/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import PriceEstimator from "@/components/PriceEstimator"
import { GRAMS_PER_TIER, calcUnitPrice, type Tier } from "@/lib/pricing"
import type { MaterialKey } from "@/lib/materials"
import FaqPromo from "@/components/FaqPromo"

export const metadata: Metadata = {
  title: "Prijzen 3D printen | X3DPrints",
  description:
    "Transparante prijzen voor 3D printen in PLA (standaard), met opties voor PLA+ varianten, PETG en TPU. Droogbehandeling voor PETG/TPU inbegrepen. Offerte binnen 24 uur.",
  alternates: { canonical: "https://www.x3dprints.be/pricing" },
  openGraph: {
    title: "Prijzen 3D printen",
    description:
      "Indicatieve tarieven voor prototypes en kleine series. Materialen: PLA (standaard), PLA+ varianten, PETG en TPU. Levering in heel België.",
    url: "https://www.x3dprints.be/pricing",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

export default function Page() {
  // Indicatieve prijzen berekend via filamentkost
  const baseMaterial: MaterialKey = "PLA_MATTE"
  const tierDefs: Array<{ name: Tier; size: string; notes: string }> = [
    {
      name: "Small",
      size: "ca. 5 x 5 x 5 cm",
      notes: "Kleine onderdelen, clips, testgeometrie.",
    },
    {
      name: "Medium",
      size: "ca. 10 x 10 x 10 cm",
      notes: "Prototypes, kleine behuizingen, decor.",
    },
    {
      name: "Large",
      size: "ca. 20 x 20 x 20 cm",
      notes: "Grotere delen, brackets, jigs.",
    },
  ]

  const tiers = tierDefs.map((t) => {
    const grams = GRAMS_PER_TIER[t.name]
    const price = calcUnitPrice(t.name, baseMaterial, "Standaard")
    return {
      ...t,
      base: "PLA Matte (standaard)",
      grams,
      price,
      priceLabel: `EUR ${price.toFixed(2)} / stuk`,
    }
  })

  // Opslagen (ten opzichte van PLA Matte)
  const materialMods = [
    { label: "PLA+ / specials (Silk, Wood, Marble, Translucent)", mod: "+20%" },
    { label: "PETG (incl. droogbehandeling)", mod: "+20%" },
    { label: "TPU (incl. droogbehandeling)", mod: "+30%" },
  ]

  // Kwaliteit/fijnere layers (optioneel)
  const qualityMods = [
    { label: "Standaard layerhoogte (0,2-0,28 mm)", mod: "0%" },
    { label: "Fijn (~ 0,16 mm)", mod: "+15%" },
    { label: "Ultra (~ 0,12 mm)", mod: "+25%" },
  ]

  const deliveryZones = [
    { k: "Zone 1 tot 25 km (EV)", v: "Standaard 48-72u: EUR 15" },
    { k: "Zone 2  25-50 km (EV)", v: "Standaard: EUR 30" },
    { k: "Zone 3  50-75 km (EV)", v: "Standaard: EUR 45" },
    { k: "Verder dan 75 km", v: "Maatwerkprijs of pakketdienst, in overleg" },
    { k: "Vertrekpunt", v: "Afstanden gerekend vanaf Herzele (heen en terug)" },
  ]

  const shipping = [
    { k: "Persoonlijke levering", v: "Elektrische wagen, veilig voor grote of breekbare prints. Zie zones hieronder." },
    { k: "Afhalen", v: "Gratis (regio Herzele/Gent, in overleg)" },
    { k: "Pakketdienst", v: "Op aanvraag via pakketdienst, afhankelijk van formaat/gewicht." },
  ]

  const design = [
    { k: "Eigen ontwerp (STL/STEP)", v: "Gratis beoordeling + offerte" },
    { k: "Ontwerp op maat", v: "EUR 45/uur (incl. digitaal voorbeeld voor productie)" },
  ]

// JSON-LD: OfferCatalog met indicatieve prijzen
  const offerCatalog = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "X3DPrints indicatieve 3D-printtarieven",
    itemListElement: tiers.map((t) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: `3D print - ${t.name}`,
        description: `${t.size} - ${t.base}`,
        areaServed: "BE",
        provider: { "@type": "LocalBusiness", name: "X3DPrints" },
      },
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "EUR",
        price: String(t.price),
      },
    })),
  }

  return (
    <main className="relative">
      {/* BG */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(99,102,241,.14),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.06]" />

      {/* HERO */}
      <section className="px-6 pt-14 pb-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Prijzen 3D printen
            </h1>
            <p className="mt-3 max-w-3xl text-slate-600">
              Sales-ready prijzen: kleine prints starten rond EUR 5, medium cases rond EUR 20 en grotere stukken rond
              EUR 49. PLA Matte is standaard; PLA+ varianten, PETG en TPU zijn beschikbaar voor extra look
              of performance. Droogbehandeling voor PETG/TPU is inbegrepen. Klaar om te bestellen? Vraag meteen je
              offerte.
            </p>
            <div className="mt-6 flex gap-3">
              <ShimmerButton href="/contact">Offerte aanvragen</ShimmerButton>
              <Link
                href="/materials"
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                Materialen & kleuren
              </Link>
              <Link
                href="/blog/hoeveel-kost-3d-printen"
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                Kostenblog
              </Link>
              <Link
                href="/materials#material-suggestion-tool"
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                Material Suggestion Tool
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TIERS */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tiers.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.06}>
                <GlassCard className="h-full p-6 transition-transform hover:-translate-y-1">
                  <div className="text-xs uppercase tracking-wide text-slate-500">{t.name}</div>
                  <div className="mt-1 text-lg font-semibold text-slate-900">{t.priceLabel}</div>
                  <div className="mt-1 text-sm text-slate-700">{t.size}</div>
                  <div className="mt-1 text-sm text-slate-500">
                    {t.base} - ~{t.grams}g
                  </div>
                  <p className="mt-3 text-sm text-slate-600">{t.notes}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
          <div className="mt-4 space-y-1 text-xs text-slate-600">
            <p>
              Richtprijzen bij standaard kwaliteit: Small ~ EUR 5, Medium ~ EUR 20, Large ~ EUR 49. Grotere of zwaardere
              modellen vergen meer materiaal en tijd.
            </p>
            <p>Exacte prijs volgt na modelanalyse; we stemmen levering en afwerking af op jouw use-case.</p>
          </div>
        </div>
      </section>

      {/* MODIFIERS */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">Materiaal-opslagen</h2>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {materialMods.map((m) => (
                    <li
                      key={m.label}
                      className="flex items-center justify-between rounded-lg border border-slate-200/70 bg-white/70 px-3 py-2"
                    >
                      <span>{m.label}</span>
                      <span className="font-semibold">{m.mod}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-slate-500">
                  PETG/TPU worden vooraf gedroogd voor optimale kwaliteit. Deze behandeling is meegerekend.
                </p>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.06}>
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">Kwaliteit (layerhoogte)</h2>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {qualityMods.map((m) => (
                    <li
                      key={m.label}
                      className="flex items-center justify-between rounded-lg border border-slate-200/70 bg-white/70 px-3 py-2"
                    >
                      <span>{m.label}</span>
                      <span className="font-semibold">{m.mod}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-slate-500">
                  Kies standaard voor functionele prints. Fijner voor visueel werk of strakkere rondingen.
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ESTIMATOR */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="p-6">
             
              <div className="mt-4">
                <PriceEstimator />
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* SHIPPING & DESIGN */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">Verzending & levering</h2>
                <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                  {shipping.map((s) => (
                    <div key={s.k} className="rounded-lg border border-slate-200/70 bg-white/70 p-3">
                      <dt className="text-xs uppercase tracking-wide text-slate-500">{s.k}</dt>
                      <dd className="mt-1 text-sm text-slate-700">{s.v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-4 rounded-xl border border-dashed border-teal-200 bg-white/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-teal-700">Persoonlijke levering (EV)</p>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {deliveryZones.map((z) => (
                      <div key={z.k} className="rounded-lg border border-white/60 bg-white/80 p-3 shadow-sm">
                        <div className="text-sm font-semibold text-slate-800">{z.k}</div>
                        <div className="mt-1 text-sm text-slate-700">{z.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.06}>
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">Ontwerpservice</h2>
                <dl className="mt-3 grid gap-3">
                  {design.map((d) => (
                    <div key={d.k} className="rounded-lg border border-slate-200/70 bg-white/70 p-3">
                      <dt className="text-xs uppercase tracking-wide text-slate-500">{d.k}</dt>
                      <dd className="mt-1 text-sm text-slate-700">{d.v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-3 text-xs text-slate-500">
                  Voor CAD-hertekenen of complexe aanpassingen stemmen we de aanpak vooraf af.
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="p-8 sm:p-10">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Offerte nodig?</h2>
              <p className="mt-2 max-w-prose text-slate-600">
                Upload STL/STEP met een korte beschrijving. Je krijgt snel een voorstel met materiaaladvies, prijs en levertermijn.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <ShimmerButton href="/contact">Offerte aanvragen</ShimmerButton>
                <Link
                  href="/services"
                  className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
                >
                  Services bekijken
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
            <section className="px-6 pb-20 sm:px-8 lg:px-12">
              <div className="mx-auto max-w-6xl">
                <Reveal>
                  <GlassCard className="overflow-hidden p-8 sm:p-10">
                    <FaqPromo className="mt-10" />
                  </GlassCard>
                </Reveal>
              </div>
            </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalog) }}
      />
    </main>
  )
}
