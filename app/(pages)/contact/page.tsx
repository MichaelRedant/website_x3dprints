// app/(pages)/contact/page.tsx
import type { Metadata } from "next"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import GlassOrb from "@/components/GlassOrb"
import ContactForm from "@/components/ContactForm"

export const metadata: Metadata = {
  title: "Contact | X3DPrints",
  description:
    "Vraag een offerte aan voor 3D printen: prototypes of kleine series. Snel, duidelijk en zonder onzin. Regio Herzele/Gent.",
  alternates: { canonical: "https://www.x3dprints.be/contact" },
}

export default function ContactPage() {
  return (
    <main className="relative">
      {/* decor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(99,102,241,.18),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.07]" />

      <section className="relative px-6 pb-24 pt-20 sm:px-8 lg:px-12 lg:pb-32 lg:pt-28">
        <div className="absolute right-6 top-8 -z-10 hidden sm:block">
          <GlassOrb className="h-60 w-60 opacity-40" />
        </div>

        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-8 max-w-2xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Offerte of vraag? Laat maar komen.
            </h1>
            <p className="mt-3 text-lg text-slate-600">
              STL link, korte context en gewenst materiaal volstaan. Je krijgt snel een heldere prijs en timing.
            </p>
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
            <Reveal>
              <GlassCard className="p-6 sm:p-8">
                <h2 className="text-xl font-semibold text-slate-900">Contactformulier</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Vul zo concreet mogelijk in. Voeg link(s) naar STL/STEP toe in het bericht.
                </p>
                <div className="mt-6">
                  <ContactForm />
                </div>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.08}>
              <GlassCard className="p-6 sm:p-8">
                <h2 className="text-xl font-semibold text-slate-900">Direct</h2>
                <div className="mt-3 space-y-3 text-sm text-slate-700">
                  <p>
                    <span className="block text-slate-500">E-mail</span>
                    <a className="font-medium underline decoration-slate-300 hover:decoration-slate-600" href="mailto:michael@xinudesign.be">
                      michael@xinudesign.be
                    </a>
                  </p>
                  <p>
                    <span className="block text-slate-500">Regio</span>
                    Herzele — leveringen in groot Gent/Aalst mogelijk
                  </p>
                  <p>
                    <span className="block text-slate-500">Bestanden</span>
                    STL, STEP. Voeg de link, tolerantie of afwerking toe in je beschrijving.
                  </p>
                  <div className="pt-2">
                    <h3 className="text-sm font-semibold text-slate-900">Handig om te vermelden</h3>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
                      <li>Toepassing en omgeving (binnen/buiten, warmte/UV)</li>
                      <li>Gewenst materiaal (PLA, PETG, TPU, …) en kleur</li>
                      <li>Afwerking: rauw, geschuurd, geprimed, gelakt</li>
                      <li>Aantal stuks en gewenste leverdatum</li>
                    </ul>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  )
}
