import type { Metadata } from "next"
import { Suspense } from "react"

import Container from "@/components/Container"
import SharedModelPreview from "@/components/SharedModelPreview"

export const metadata: Metadata = {
  title: "3D-ontwerp bekijken | X3DPrints",
  description: "Interactieve privépreview van een 3D-ontwerp door X3DPrints.",
  alternates: {
    canonical: "https://www.x3dprints.be/model-preview/",
  },
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nocache: true,
  },
}

export default function ModelPreviewPage() {
  return (
    <main className="relative min-h-screen overflow-hidden py-8 sm:py-12">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[-16rem] h-[34rem] bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_65%)]" />
      <Container className="relative">
        <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-700 dark:text-cyan-300">X3DPrints klantpreview</p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              Bekijk het ontwerp langs alle kanten, controleer de buitenmaten en geef daarna je beslissing door.
            </p>
          </div>
          <a href="https://www.x3dprints.be" className="text-sm font-extrabold text-slate-950 transition hover:text-cyan-700 dark:text-white dark:hover:text-cyan-300">
            X3DPrints.be
          </a>
        </header>
        <Suspense fallback={<div className="min-h-[540px] animate-pulse rounded-[2rem] bg-slate-900" />}>
          <SharedModelPreview />
        </Suspense>
      </Container>
    </main>
  )
}
