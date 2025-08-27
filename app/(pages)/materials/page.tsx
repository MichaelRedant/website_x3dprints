// app/(pages)/materials/page.tsx
import type { Metadata } from "next"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import MaterialCard from "@/components/MaterialCard"
import { MATERIALS, MATERIAL_ORDER } from "@/lib/materials"

export const metadata: Metadata = {
  title: "Materialen | X3DPrints",
  description:
    "Overzicht van beschikbare filamenten (PLA, PETG, TPU) met voorraad-indicatie.",
  alternates: { canonical: "https://www.x3dprints.be/materials" },
}

export default function MaterialsPage() {

  const materials = MATERIAL_ORDER.map((key) => {
    const m = MATERIALS[key]
    return {
      title: m.name,
      description: m.description,
      features: m.features,
      swatches: m.swatches.map((s) => ({
        label: s.label,
        fill: s.color,
        inStock: s.inStock,
      })),
    }
  })


  return (
    <main className="relative">
      <section className="px-6 pt-14 pb-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Materialen
            </h1>
            <p className="mt-3 max-w-2xl text-slate-600">

              Volledige Bambu-reeks, zonder starter packs. Kleuren zijn indicatief.
              Voorraad aangeduid met <span className="font-semibold">inStock: true</span>.

            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2">
          {materials.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.04}>
              <MaterialCard title={m.title} swatches={m.swatches} />
            </Reveal>
          ))}
        </div>

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
    </main>
  )
}

