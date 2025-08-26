import type { Metadata } from "next"

import Container from "@/components/Container"
import MaterialCard from "@/components/MaterialCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"

const materials = [
  {
    title: "PLA",
    description: "Betaalbaar bioplastic voor prototypes en decoratieve prints.",
    features: [
      "Scherpe details",
      "Milieuvriendelijk",
      "Snelle levertijd",
    ],
  },
  {
    title: "PETG",
    description: "Sterk en licht flexibel voor functionele onderdelen.",
    features: [
      "Hoge slagvastheid",
      "Temperatuurbestendig",
      "Glad oppervlak",
    ],
  },
  {
    title: "ABS",
    description: "Robuust materiaal voor technische toepassingen en outdoor gebruik.",
    features: [
      "Hittebestendig",
      "Nabewerking mogelijk",
      "Professionele kwaliteit",
    ],
  },
  {
    title: "Resin",
    description: "Ultieme precisie voor miniaturen en productiemodellen.",
    features: [
      "Haarscherpe details",
      "Glad als gegoten",
      "Perfect voor masters",
    ],
  },
] as const

export const metadata: Metadata = {
  title: "Materialen",
  description: "Ontdek PLA, PETG, ABS en Resin voor jouw 3D-print project.",
}

export default function Page() {
  return (
    <Container className="py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Materialen</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Elk project vraagt om het juiste materiaal. Kies uit onze meest gebruikte opties
        en profiteer van persoonlijk advies voor jouw toepassing.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {materials.map((material, index) => (
          <MaterialCard key={material.title} {...material} delay={index * 0.1} />
        ))}
      </div>
      <Reveal delay={0.4} className="mt-16 text-center">
        <p className="text-muted-foreground">
          Twijfel je over de beste keuze? We denken graag met je mee.
        </p>
        <div className="mt-4 flex justify-center">
          <ShimmerButton href="/contact">Vraag persoonlijk advies</ShimmerButton>
        </div>
      </Reveal>
    </Container>
  )
}

