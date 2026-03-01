import type { Metadata } from "next"
import Link from "next/link"
import Catchphrase from "@/components/Catchphrase"
import GlassOrb from "@/components/GlassOrb"
import ShimmerButton from "@/components/ShimmerButton"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"

export const metadata: Metadata = {
  title: "Pagina niet gevonden | X3DPrints",
  description: "Oeps, deze laag bestaat niet. Keer terug naar de homepagina of vraag snel een offerte.",
  robots: { index: false },
  openGraph: {
    title: "404 | Pagina niet gevonden",
    description: "Deze pagina bestaat niet. Terug naar home of vraag een offerte.",
    url: "https://www.x3dprints.be/404",
    images: [{ url: "/images/og-home.svg", width: 1200, height: 630 }],
    siteName: "X3DPrints",
    locale: "nl_BE",
  },
  twitter: { card: "summary_large_image" },
}

export default function NotFound() {
  return (
    <main className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 py-20 sm:py-24">
      {/* Background / grid + soft blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-teal-50" />
        <div className="absolute -top-28 -left-24 h-[22rem] w-[22rem] rounded-full bg-cyan-200/30 blur-3xl sm:h-[28rem] sm:w-[28rem]" />
        <div className="absolute -bottom-28 -right-24 h-[24rem] w-[24rem] rounded-full bg-teal-200/30 blur-3xl sm:h-[30rem] sm:w-[30rem]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px]" />
      </div>

      {/* Badge + big 404 */}
      <div className="relative mb-6 sm:mb-8">
        <GlassOrb className="h-40 w-40 opacity-40" aria-hidden />
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-5xl font-extrabold tracking-tight text-indigo-600">
          404
        </span>
      </div>

      <Reveal className="text-center">
        <Catchphrase className="block text-base font-medium text-indigo-600">Printer klaar, pagina weg</Catchphrase>
        <h1 className="mt-2 text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Deze laag ontbreekt in de stack.
        </h1>
        <p className="mt-3 max-w-xl text-pretty text-slate-600">
          De pagina die je zocht is verschoven, hernoemd of nooit geprint. Ga terug naar de start of stuur je vraag door —
          je krijgt snel een helder antwoord.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <ShimmerButton href="/" aria-label="Terug naar home">Terug naar home</ShimmerButton>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition-transform hover:-translate-y-0.5 hover:bg-white/20"
            aria-label="Contacteer ons"
          >
            Contacteer ons
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden className="opacity-70">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </Reveal>

      {/* Helpful links */}
      <div className="mt-10 w-full max-w-3xl">
        <Reveal>
          <GlassCard className="p-6 sm:p-7">
            <h2 className="text-sm font-semibold text-slate-900">Misschien zocht je dit:</h2>
            <nav className="mt-3 grid gap-2 sm:grid-cols-2">
              {[
                { href: "/services", label: "Services" },
                { href: "/materials", label: "Materialen & richtlijnen" },
                { href: "/pricing", label: "Prijzen" },
                { href: "/portfolio", label: "Portfolio" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group inline-flex items-center justify-between rounded-xl border border-white/30 bg-white/60 px-4 py-2 text-sm text-slate-700 backdrop-blur transition hover:bg-white"
                >
                  <span>{l.label}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-60 transition group-hover:translate-x-0.5" aria-hidden>
                    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              ))}
            </nav>
          </GlassCard>
        </Reveal>
      </div>

      {/* Small style helper for reduced-motion + subtle fade */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes floatup { from { opacity:.0; transform: translateY(6px) } to { opacity:1; transform: translateY(0) } }
          .shadow-glass { box-shadow: 0 10px 40px rgba(0,0,0,0.08) }
          @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important } }
        `,
        }}
      />
    </main>
  )
}
