// app/(pages)/materials/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import { MATERIALS, MATERIAL_ORDER, MATERIAL_SLUGS } from "@/lib/materials"
import MaterialGrid from "@/components/MaterialGrid"
import FaqPromo from "@/components/FaqPromo"
import GlassCard from "@/components/GlassCard"
import { MATERIAL_DETAILS } from "@/content/material-details"
import MaterialSuggestionTool from "@/components/MaterialSuggestionTool"
import { buildLocalBusinessSchema, buildOfferCatalog, buildServiceSchema, SchemaOfferInput } from "@/lib/seo"
import ReadMoreLinks from "@/components/ReadMoreLinks"

export const metadata: Metadata = {
  title: "Materialen voor 3D printen (PLA, PETG, TPU) | X3DPrints",
  description:
    "Materialen voor 3D printen in Vlaanderen: PLA Matte/Silk/Wood, PETG, TPU en specials. Bekijk eigenschappen, voorraad en vraag gratis materiaaladvies.",
  alternates: { canonical: "https://www.x3dprints.be/materials" },
  openGraph: {
    title: "Materialen voor 3D printen | X3DPrints",
    description:
      "Materialen voor 3D printen: PLA-varianten, PETG en TPU met kleuren, specs en voorraadstatus.",
    url: "https://www.x3dprints.be/materials",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    siteName: "X3DPrints",
    locale: "nl_BE",
  },
  twitter: { card: "summary_large_image" },
}

export default function MaterialsPage() {
  const materials = MATERIAL_ORDER.map((key) => {
    const m = MATERIALS[key]
    const slug = MATERIAL_SLUGS[key]
    const detail = MATERIAL_DETAILS[key]

    return {
      key,
      anchorId: slug,
      slug,
      title: m.name,
      description: m.description,
      features: m.features || [],
      swatches: m.swatches.map((s) => ({
        label: s.label,
        fill: s.color,
        inStock: s.inStock,
      })),
      faq: detail?.faq?.slice(0, 2) ?? [],
    }
  })

  const materialOffers: SchemaOfferInput[] = [
    {
      serviceName: "Material suggestion call",
      price: "EUR 0",
      description: "Gratis advies over welk filament (PLA, PETG of TPU) past bij jouw toepassing.",
    },
    {
      serviceName: "Material sample + test run",
      price: "EUR 15",
      description: "Kleine testprint met twee materiaalstalen en een kort afvalrapport.",
    },
    {
      serviceName: "Material guidance & ordering",
      price: "EUR 0",
      description: "We bestellen de juiste filamentspecificatie en begeleiden je met pre-production checks.",
    },
  ]

  // JSON-LD: ItemList van materialen (naam + beschrijving)
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Materialen voor 3D printen",
    itemListElement: materials.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://www.x3dprints.be/materials#${m.anchorId}`,
      item: {
        "@type": "Product",
        name: m.title,
        description: m.description || undefined,
        brand: { "@type": "Brand", name: "X3DPrints" },
        category: "3D printing filament",
      },
    })),
  }

  const faqEntities = materials.flatMap((material) =>
    material.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  )

  const faqJsonLd =
    faqEntities.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqEntities,
        }
      : null

  const pageDescription = metadata.description ?? ""
  const canonicalUrl =
    typeof metadata.openGraph?.url === "string"
      ? metadata.openGraph.url
      : typeof metadata.alternates?.canonical === "string"
      ? metadata.alternates.canonical
      : "https://www.x3dprints.be/materials"
  const catalogJsonLd = buildOfferCatalog("Materialen advies en samples", materialOffers)

  const localBusinessJsonLd = buildLocalBusinessSchema({
    pageUrl: canonicalUrl,
    description: pageDescription,
    image: "/images/og-home.jpg",
    priceRange: "EUR 0 - EUR 15",
    areaServed: "BE",
  })

  const serviceJsonLd = buildServiceSchema("Filament materiaaladvies", materialOffers, canonicalUrl)

  return (
    <main className="relative">
      {/* decor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(99,102,241,.14),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.07]" />

      <section className="px-6 pt-14 pb-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Materialen voor 3D printen
            </h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Overzicht van onze meest gebruikte filamenten met eigenschappen, kleuropties en voorraad:
              <strong> PLA</strong> (Matte, Tough+, Silk, Marble, Wood, Translucent, enz.),
              <strong> PETG</strong> en <strong>TPU</strong>. Twijfel je? Beantwoord vijf vragen in de{" "}
              <Link href="#material-suggestion-tool" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Material Suggestion Tool
              </Link>{" "}
              en je krijgt meteen drie opties met prijsimpact.
            </p>
          </Reveal>
        </div>
      </section>


      <section
        id="material-suggestion-tool"
        className="px-6 pb-16 sm:px-8 lg:px-12"
        aria-label="Material Suggestion Tool"
      >
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-500">Waarom deze tool?</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Sneller naar de juiste materiaalkeuze voor 3D printen</h2>
                <p className="mt-3 text-sm text-slate-600">
                  Bezoekers willen weten welk filament best past, hoe het eruitziet, of het buiten kan en wat dat doet met de prijs.
                  Deze tool combineert die antwoorden met onze voorraaddata en toont maximaal drie opties: aanbevolen, budgetvriendelijk
                  en premium look. Elke optie linkt meteen naar een offerteaanvraag n de materialenbibliotheek.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                    <span>Welk materiaal is het beste voor mijn project?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                    <span>Wat is het verschil tussen PLA, PETG, Silk, Wood, Tough?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                    <span>Welke look kan ik verwachten? Kan dit buiten hangen?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                    <span>Duidelijk over prijsimpact: budget vs. high-end blends.</span>
                  </li>
                </ul>
                <p className="mt-4 text-sm text-slate-600">
                  Resultaat klaar? We sturen je meteen door naar{" "}
                  <Link href="/pricing" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    prijzen & calculator
                  </Link>{" "}
                  of naar de juiste{" "}
                  <Link href="/blog/juiste-3d-print-materiaal" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    how-to gids
                  </Link>
                  . Zo blijft de flow richting offerte kort.
                </p>
              </GlassCard>
            </Reveal>
            <Reveal delay={0.05}>
              <GlassCard className="h-full border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Uitkomst</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Wat je te zien krijgt voor je 3D printen-project</h2>
                <p className="mt-3 text-sm text-slate-600">
                  Beantwoord alle vijf vragen en je krijgt maximaal drie opties:
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                    <span>Een aanbevolen materiaal met argumenten en kleuren.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                    <span>Een budgetvriendelijk alternatief.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                    <span>Een premium look keuze met prijsimpact.</span>
                  </li>
                </ul>
                <p className="mt-4 text-sm text-slate-600">
                  Elk resultaat bevat directe links naar voorbeelden en een offerteaanvraag met het materiaal al ingevuld.
                </p>
              </GlassCard>
            </Reveal>
          </div>
          <MaterialSuggestionTool />
        </div>
      </section>


      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <MaterialGrid materials={materials} />

        {/* Legenda + CTA */}
        <div className="mx-auto mt-10 max-w-6xl rounded-2xl border border-slate-200/70 bg-white/70 p-5 text-sm text-slate-600 backdrop-blur">
          <div className="font-semibold text-slate-900">Legenda</div>
          <div className="mt-2 grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-black" /> <span>Op voorraad</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative h-4 w-4 rounded-full bg-slate-400">
                <span
                  className="absolute inset-0 rounded-full"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(135deg, rgba(0,0,0,.08) 0 4px, rgba(0,0,0,0) 4px 8px)",
                  }}
                />
              </span>
              <span>Op bestelling</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="h-4 w-4 rounded-full"
                style={{ background: "linear-gradient(180deg,#7ae5ffc0,#7ae5ff50)" }}
              />
              <span>Translucent/glow-achtige looks</span>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <ShimmerButton href="/contact">Vraag materiaaladvies</ShimmerButton>
            <p className="text-xs text-slate-500">
              Eerst wat research doen? Check bovenaan de{" "}
              <Link href="#material-suggestion-tool" className="font-semibold text-slate-900 underline decoration-slate-300 hover:decoration-slate-600">
                Material Suggestion Tool
              </Link>{" "}
              en lees de{" "}
              <Link href="/blog" className="font-semibold text-slate-900 underline decoration-slate-300 hover:decoration-slate-600">
                blog & kennisbank
              </Link>{" "}
              voor materiaalvergelijkingen zoals PLA vs PETG.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ / Promo */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="overflow-hidden p-8 sm:p-10">
              <FaqPromo className="mt-10" />
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <ReadMoreLinks
        title="Verder met materialen?"
        intro="Vergelijk toepassingen, bekijk prijzen en start meteen met een offerte-aanvraag."
        primaryLinks={[
          { label: "3D print service", href: "/services" },
          { label: "Prijzen & calculator", href: "/pricing" },
          { label: "Offerte aanvragen", href: "/contact" },
        ]}
        secondaryLinks={[
          { label: "Portfolio", href: "/portfolio" },
          { label: "Segmenten & cases", href: "/segments" },
          { label: "Material Suggestion Tool", href: "/materials#material-suggestion-tool" },
        ]}
      />



      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </main>
  )
}
