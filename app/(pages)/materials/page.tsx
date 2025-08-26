// app/(pages)/materials/page.tsx
import type { Metadata } from "next"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import MaterialCard from "@/components/MaterialCard"

export const metadata: Metadata = {
  title: "Materialen | X3DPrints",
  description:
    "Overzicht van Bambu-compatibele filamenten: PLA-families (Matte, Basic, Translucent, Silk, Silk Multi-Color, Tough+, Glow, Marble, Sparkle, Metal, Galaxy, Aero, Basic Gradient, PLA-CF, Wood) plus PETG en TPU. Kleuren als swatches.",
  alternates: { canonical: "https://www.x3dprints.be/materials" },
}

export default function MaterialsPage() {
  // Helpers voor gradients en looks
  const g = {
    rainbow: "linear-gradient(90deg,#ef4444,#f59e0b,#22c55e,#06b6d4,#6366f1,#a855f7)",
    sparkle: "linear-gradient(135deg,#0f172a 0%,#14532d 55%,#0f172a 100%)",
    galaxy:
      "radial-gradient(circle at 30% 30%,#a855f7,transparent 40%),radial-gradient(circle at 70% 60%,#22d3ee,transparent 45%),#0b1020",
    metal: "linear-gradient(90deg,#c5ccd4,#8e9aa6,#c5ccd4)",
    bronze: "linear-gradient(90deg,#c08a5a,#8a5b3e,#c08a5a)",
    gunmetal: "linear-gradient(90deg,#4b5563,#6b7280,#374151)",
    marble: "linear-gradient(135deg,#d6d3d1,#9ca3af 55%,#e7e5e4)",
    wood: "linear-gradient(90deg,#7c5e3c,#6a4f33,#7c5e3c)",
    translucent: (c: string) => `linear-gradient(180deg,${c}C0,${c}50)`, // C0≈75% / 50≈31% alpha
  }

  const materials = [
    // ------- PLA families (zonder starter packs) -------
    {
      title: "PLA Tough+",
      description:
        "Taaier dan standaard PLA, behoudt vorm beter bij impact. Voor onderdelen die net iets meer mogen verdragen.",
      features: ["Tough, minder broos", "Strakke finish", "Printvriendelijk"],
      swatches: [
        { label: "Geel", fill: "#f6c20f" },
        { label: "Wit", fill: "#ffffff" },
        { label: "Rood", fill: "#dc2626" },
        { label: "Lichtgrijs", fill: "#cbd5e1" },
        { label: "Blauwgrijs", fill: "#64748b" },
        { label: "Lichtblauw", fill: "#60a5fa" },
        { label: "Zwart", fill: "#000000" },
      ],
    },
    {
      title: "PLA Glow",
      description: "Gloeit in het donker. Laadt op met licht, geeft een helder ‘neon’ effect in low-light.",
      features: ["Glow-in-the-dark", "Decoratief en fun"],
      swatches: [
        { label: "Glow Groen", fill: "#00ff7b" },
        { label: "Glow Geel", fill: "#faff00" },
        { label: "Glow Blauw", fill: "#66e0ff" },
        { label: "Glow Aqua", fill: "#66ffd9" },
        { label: "Glow Orange", fill: "#ffb84d" },
      ],
    },
    {
      title: "PLA Marble",
      description: "Subtiele marmerlook met spikkels. Voor elegante, luxueuze prints.",
      features: ["Matte marmertextuur", "Stijlvolle look"],
      swatches: [
        { label: "Terracotta Marble", fill: "#b9654c" },
        { label: "Marble Grey", fill: g.marble },
        { label: "Marble White", fill: "linear-gradient(135deg,#f3f4f6,#d1d5db 55%,#f9fafb)" },
      ],
    },
    {
      title: "PLA Sparkle",
      description: "PLA met glitterdeeltjes. Subtiel tot opvallend, afhankelijk van kleur en licht.",
      features: ["Glitter-effect", "Diepte in oppervlak"],
      swatches: [
        { label: "Graphite Sparkle", fill: "linear-gradient(135deg,#1f2937,#0b1220)" },
        { label: "Pine Sparkle", fill: "linear-gradient(135deg,#1f3d2b,#0b1220)" },
        { label: "Wine Sparkle", fill: "linear-gradient(135deg,#3b0d18,#0b1220)" },
        { label: "Plum Sparkle", fill: "linear-gradient(135deg,#3d1a54,#0b1220)" },
        { label: "Mustard Sparkle", fill: "linear-gradient(135deg,#a47a1e,#3a2a00)" },
      ],
    },
    {
      title: "PLA Metal",
      description: "Metaalachtige glans zonder conductiviteit. Ideaal voor props of industriële esthetiek.",
      features: ["Metallic glans", "Egale lijnen"],
      swatches: [
        { label: "Steel", fill: g.metal },
        { label: "Copper", fill: "#b87333" },
        { label: "Bronze", fill: g.bronze },
        { label: "Gunmetal", fill: g.gunmetal },
        { label: "Graphite", fill: "linear-gradient(90deg,#1f2937,#374151,#0f172a)" },
      ],
    },
    {
      title: "PLA Galaxy",
      description: "Diepe basiskleuren met micro-glitter voor een ‘deep space’ vibe.",
      features: ["Diepe tinten", "Subtiele glitter"],
      swatches: [
        { label: "Plum Nebula", fill: g.galaxy },
        { label: "Indigo Nebula", fill: "radial-gradient(circle at 35% 40%,#6366f1,transparent 45%),#0b1020" },
        { label: "Teal Nebula", fill: "radial-gradient(circle at 60% 50%,#22d3ee,transparent 45%),#0b1020" },
        { label: "Cosmos Brown", fill: "radial-gradient(circle at 40% 50%,#8b5e34,transparent 45%),#1f2937" },
      ],
    },
    {
      title: "PLA Aero",
      description: "Lichtgewicht PLA-variant met lagere dichtheid. Voor grote, lichte modellen.",
      features: ["Lichtgewicht", "Sneller bruikbare massa"],
      swatches: [
        { label: "Aero White", fill: "linear-gradient(90deg,#f8fafc,#e5e7eb,#f8fafc)" },
        { label: "Aero Grey", fill: "#e5e7eb" },
      ],
    },
    {
      title: "PLA Silk+",
      description: "Zijdeachtige toplaag met sterke reflectie. Perfect voor showpieces en awards.",
      features: ["Zijdeglans", "Diepe kleuren"],
      swatches: [
        { label: "Black", fill: "linear-gradient(90deg,#0b0b0b,#2a2a2a,#0b0b0b)" },
        { label: "Graphite", fill: "linear-gradient(90deg,#434343,#9e9e9e,#434343)" },
        { label: "Silver", fill: "linear-gradient(90deg,#a0a7af,#e5e7eb,#a0a7af)" },
        { label: "White", fill: "linear-gradient(90deg,#f8fafc,#ffffff,#f8fafc)" },
        { label: "Champagne", fill: "linear-gradient(90deg,#c5a572,#f3d79c,#c5a572)" },
        { label: "Copper", fill: "linear-gradient(90deg,#b66a3a,#e3a367,#b66a3a)" },
        { label: "Gold", fill: "linear-gradient(90deg,#a36f00,#f3d36b,#a36f00)" },
        { label: "Red", fill: "linear-gradient(90deg,#7f1d1d,#ef4444,#7f1d1d)" },
        { label: "Green", fill: "linear-gradient(90deg,#065f46,#10b981,#065f46)" },
        { label: "Blue", fill: "linear-gradient(90deg,#1e3a8a,#3b82f6,#1e3a8a)" },
        { label: "Cyan", fill: "linear-gradient(90deg,#006d7e,#22d3ee,#006d7e)" },
        { label: "Magenta", fill: "linear-gradient(90deg,#7b1fa2,#e91e63,#7b1fa2)" },
        { label: "Rose", fill: "linear-gradient(90deg,#be185d,#f472b6,#be185d)" },
        { label: "Sand", fill: "linear-gradient(90deg,#b59f7a,#d6c3a1,#b59f7a)" },
        { label: "Stone", fill: "linear-gradient(90deg,#7f7f7f,#c9c9c9,#7f7f7f)" },
      ],
    },
    {
      title: "PLA Basic Gradient",
      description: "Voorverlopen spoelen met zachte kleurovergangen. Elke print is uniek.",
      features: ["Kleurverloop", "Decoratief"],
      swatches: [
        { label: "Sunset", fill: "linear-gradient(90deg,#f97316,#f43f5e,#8b5cf6)" },
        { label: "Ocean", fill: "linear-gradient(90deg,#22d3ee,#3b82f6,#0ea5e9)" },
        { label: "Lemonade", fill: "linear-gradient(90deg,#fde047,#fca5a5,#fcd34d)" },
        { label: "Aurora", fill: "linear-gradient(90deg,#34d399,#22d3ee,#60a5fa)" },
      ],
    },
    {
      title: "PLA Basic",
      description: "Klassieke PLA-lijn met brede kleurdekking. Voor algemene prints en maquettes.",
      features: ["Veel kleuren", "Betaalbaar"],
      swatches: [
        { label: "White", fill: "#ffffff" },
        { label: "Ivory", fill: "#f5f1e6" },
        { label: "Light Grey", fill: "#d1d5db" },
        { label: "Grey", fill: "#9ca3af" },
        { label: "Black", fill: "#000000" },
        { label: "Brown", fill: "#8b5a3c" },
        { label: "Beige", fill: "#d6c3a1" },
        { label: "Tan", fill: "#c8a46a" },
        { label: "Yellow", fill: "#fde047" },
        { label: "Orange", fill: "#fb923c" },
        { label: "Coral", fill: "#f87171" },
        { label: "Pink", fill: "#f472b6" },
        { label: "Magenta", fill: "#db2777" },
        { label: "Red", fill: "#ef4444" },
        { label: "Maroon", fill: "#7f1d1d" },
        { label: "Purple", fill: "#8b5cf6" },
        { label: "Violet", fill: "#7c3aed" },
        { label: "Indigo", fill: "#4f46e5" },
        { label: "Blue", fill: "#3b82f6" },
        { label: "Sky", fill: "#38bdf8" },
        { label: "Teal", fill: "#14b8a6" },
        { label: "Turquoise", fill: "#06b6d4" },
        { label: "Cyan", fill: "#22d3ee" },
        { label: "Mint", fill: "#86efac" },
        { label: "Green", fill: "#22c55e" },
        { label: "Olive", fill: "#6b8e23" },
        { label: "Lime", fill: "#84cc16" },
      ],
    },
    {
      title: "PLA Matte",
      description: "Matte PLA met lage glans. Verdoezelt layer-lijnen, oogt premium.",
      features: ["Mat oppervlak", "Strakke details"],
      swatches: [
        { label: "White", fill: "#f5f5f5" },
        { label: "Grey", fill: "#a3a3a3" },
        { label: "Black", fill: "#0a0a0a" },
        { label: "Sand", fill: "#c8b69f" },
        { label: "Clay", fill: "#b98a6d" },
        { label: "Terracotta", fill: "#b45309" },
        { label: "Blush", fill: "#e9a6b1" },
        { label: "Burgundy", fill: "#7f1d1d" },
        { label: "Navy", fill: "#1e3a8a" },
        { label: "Blue", fill: "#2563eb" },
        { label: "Teal", fill: "#0f766e" },
        { label: "Pine", fill: "#14532d" },
        { label: "Olive", fill: "#6b8e23" },
        { label: "Lime", fill: "#84cc16" },
        { label: "Yellow", fill: "#facc15" },
        { label: "Orange", fill: "#fb923c" },
        { label: "Red", fill: "#dc2626" },
      ],
    },
    {
      title: "PLA Translucent",
      description: "Halfdoorzichtig PLA voor lichtdoorlatende toepassingen.",
      features: ["Lichtdoorlatend", "Sfeervol"],
      swatches: [
        { label: "Aqua", fill: g.translucent("#7ae5ff") },
        { label: "Cyan", fill: g.translucent("#22d3ee") },
        { label: "Blue", fill: g.translucent("#60a5fa") },
        { label: "Teal", fill: g.translucent("#14b8a6") },
        { label: "Green", fill: g.translucent("#22c55e") },
        { label: "Red", fill: g.translucent("#ef4444") },
        { label: "Magenta", fill: g.translucent("#db2777") },
        { label: "Violet", fill: g.translucent("#8b5cf6") },
        { label: "Opal", fill: g.translucent("#ffffff") },
        { label: "Smoke", fill: g.translucent("#9ca3af") },
      ],
    },
    {
      title: "PLA Silk Multi-Color",
      description: "Zijdeglans met ingebouwde kleurverlopen voor spectaculaire prints.",
      features: ["Kleurverloop", "Hoge glans"],
      swatches: [{ label: "Rainbow", fill: g.rainbow }],
    },
    {
      title: "PLA-CF",
      description:
        "Met carbon gevuld PLA. Stijf en mat; geschikt voor jigs, panelen en functionele delen waar PLA te slap is.",
      features: ["Stijf & licht", "Matte look"],
      swatches: [
        { label: "Forest Green", fill: "#3f6f3f" },
        { label: "Brick Red", fill: "#8b3a3a" },
        { label: "Royal Blue", fill: "#2b6cb0" },
        { label: "Grey", fill: "#4b5563" },
        { label: "Black", fill: "#0b0f12" },
        { label: "Navy", fill: "#1e3a8a" },
        { label: "Purple", fill: "#5b21b6" },
      ],
    },
    {
      title: "PLA Wood",
      description: "PLA met houtdeeltjes. Warme, natuurlijke afwerking. Goed schuurbaar en prima te schilderen.",
      features: ["Natuurlijke look", "Licht geurend bij print"],
      swatches: [
        { label: "Walnut", fill: "#6b4f2a" },
        { label: "Mahogany", fill: "#5b3a24" },
        { label: "Teak", fill: "#7b5838" },
        { label: "Oak", fill: "#9b7a4e" },
        { label: "Desert", fill: "#b99a63" },
      ],
    },

    // ------- Functionele materialen (optioneel) -------
    {
      title: "PETG",
      description:
        "Tougher dan PLA, licht flexibel en beter bestand tegen warmte en chemicaliën. Voor functionele onderdelen.",
      features: ["Functioneel", "Chemisch resistenter", "Vormvast"],
      swatches: [
        { label: "Zwart", fill: "#000000" },
        { label: "Wit", fill: "#ffffff" },
        { label: "Transparant", fill: g.translucent("#e6fbff") },
        { label: "Blauw", fill: "#3b82f6" },
        { label: "Rood", fill: "#ef4444" },
      ],
    },
    {
      title: "TPU",
      description: "Flexibel en slijtvast. Ideaal voor grips, bumpers en demping. Vereist trager printen.",
      features: ["Flexibel", "Schokabsorberend"],
      swatches: [
        { label: "Zwart", fill: "#000000" },
        { label: "Wit", fill: "#ffffff" },
      ],
    },
  ]

  return (
    <main className="relative">
      <section className="px-6 pt-14 pb-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Materialen</h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Volledige Bambu-reeks, zonder starter packs. Kleuren hieronder zijn indicatief. Je kan later per kleur
              <span className="font-semibold"> inStock: true</span> zetten om je voorraad te markeren.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2">
          {materials.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.04}>
              <MaterialCard
                title={m.title}
                description={m.description}
                features={m.features}
                swatches={m.swatches}
              />
            </Reveal>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-6xl rounded-2xl border border-slate-200/70 bg-white/70 p-5 text-sm text-slate-600 backdrop-blur">
          <div className="font-semibold text-slate-900">Legenda</div>
          <div className="mt-2 grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-black" /> <span>Op voorraad (zet <code>inStock: true</code>)</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="relative h-4 w-4 rounded-full"
                style={{ background: "#3b82f6" }}
              >
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
                style={{ background: g.translucent("#7ae5ff") }}
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
