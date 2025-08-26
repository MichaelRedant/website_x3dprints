"use client"

import Reveal from "./Reveal"
import GlassCard from "./GlassCard"
import ShimmerButton from "./ShimmerButton"

export type MaterialCardProps = {
  title: string
  description: string
  features: readonly string[]
  delay?: number
}

export default function MaterialCard({
  title,
  description,
  features,
  delay = 0,
}: MaterialCardProps) {
  return (
    <Reveal delay={delay} className="h-full">
      <GlassCard className="flex h-full flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold leading-tight">{title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          <ul className="mt-4 list-disc space-y-1 pl-4 text-sm">
            {features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <ShimmerButton href="/contact" className="w-full justify-center">
            Vraag offerte
          </ShimmerButton>
        </div>
      </GlassCard>
    </Reveal>
  )
}

