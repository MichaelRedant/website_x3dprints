import type { Metadata } from "next"
import Link from "next/link"
import Catchphrase from "@/components/Catchphrase"
import GlassOrb from "@/components/GlassOrb"
import ShimmerButton from "@/components/ShimmerButton"

export const metadata: Metadata = {
  title: "Pagina niet gevonden | X3DPrints",
  description: "Oeps, deze laag bestaat niet. Keer terug naar de homepagina.",
  robots: { index: false },
}

export default function NotFound() {
  return (
    <main className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 py-24 text-center">
      {/* Decorative background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(99,102,241,.18),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.07]" />

      <div className="relative mb-8">
        <GlassOrb className="h-40 w-40 opacity-40" />
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-5xl font-extrabold text-indigo-600">
          404
        </span>
      </div>
      <Catchphrase className="block text-base font-medium text-indigo-600">Printer klaar, pagina weg</Catchphrase>
      <p className="mt-3 max-w-md text-pretty text-slate-600">
        De pagina die je zocht is verschoven of nooit geprint. Ga terug naar de start of stuur je vraag door.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <ShimmerButton href="/">Terug naar home</ShimmerButton>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition-transform hover:-translate-y-0.5 hover:bg-white/20"
        >
          Contacteer ons
          <span className="i-lucide-arrow-right" aria-hidden />
        </Link>
      </div>
    </main>
  )
}

