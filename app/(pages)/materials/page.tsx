// app/(pages)/materials/page.tsx
import type { Metadata } from "next"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import MaterialCard from "@/components/MaterialCard"
import { MATERIALS, MATERIAL_ORDER } from "@/lib/materials"
import FaqPromo from "@/components/FaqPromo"
import GlassCard from "@/components/GlassCard"

export const metadata: Metadata = {
  title: "Materialen (PLA, PETG, TPU) | X3DPrints",
  description:
    "Overzicht van beschikbare filamenten met eigenschappen en voorraad: PLA (Matte, Silk, Marble, Wood, etc.), PETG en TPU. Vraag gratis materiaaladvies.",
  alternates: { canonical: "https://www.x3dprints.be/materials" },
  openGraph: {
    title: "Materialen | X3DPrints",
    description:
      "Materialen voor 3D printen: PLA-varianten, PETG en TPU. Zie eigenschappen, kleuren en beschikbaarheid.",
    url: "https://www.x3dprints.be/materials",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    siteName: "X3DPrints",
    locale: "nl_BE",
  },
  twitter: { card: "summary_large_image" },
}

function slugify(input: string) {
  return input.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

export default function MaterialsPage() {
  const materials = MATERIAL_ORDER.map((key) => {
    const m = MATERIALS[key]
    return {
      key,
      anchorId: slugify(m.name),
      title: m.name,
      description: m.description,
      features: m.features || [],
      swatches: m.swatches.map((s) => ({
        label: s.label,
        fill: s.color,
        inStock: s.inStock,
      })),
    }
  })

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
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Materialen
            </h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Overzicht van onze meest gebruikte filamenten met eigenschappen, kleuropties en voorraad:
              <strong> PLA</strong> (Matte, Tough+, Silk, Marble, Wood, Translucent, enz.),
              <strong> PETG</strong> en <strong>TPU</strong>. Twijfel je? We helpen je kiezen.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2">
          {materials.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.04}>
              <MaterialCard
                anchorId={m.anchorId}
                title={m.title}
                description={m.description}  
                features={m.features}         
                swatches={m.swatches}
              />
            </Reveal>
          ))}
        </div>

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

          <div className="mt-4">
            <ShimmerButton href="/contact">Vraag materiaaladvies</ShimmerButton>
          </div>
        </div>
      </section>

      {/* FAQ / Promo */}
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
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
    </main>
  )
}
