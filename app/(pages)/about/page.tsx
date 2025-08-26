import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import Parallax from "@/components/Parallax"
import TiltCard from "@/components/TiltCard"
import Counter from "@/components/Counter"
import GlassOrb from "@/components/GlassOrb"
import GlassCard from "@/components/GlassCard"

export const metadata: Metadata = {
  title: "Over X3DPrints | 3D-printstudio in Herzele",
  description:
    "Maak kennis met X3DPrints: compacte 3D-printstudio in Herzele voor prototypes en kleine series. Rechtstreeks contact, eerlijk materiaaladvies en nette afwerking.",
  alternates: { canonical: "https://www.x3dprints.be/over" },
  openGraph: {
    title: "Over X3DPrints",
    description:
      "Compacte 3D-printstudio in Herzele. PLA als standaard, met PETG, ABS/ASA, Nylon en PA-CF wanneer het project dat vraagt.",
    url: "https://www.x3dprints.be/over",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Over X3DPrints",
    url: "https://www.x3dprints.be/over",
    mainEntityOfPage: "https://www.x3dprints.be/over",
    breadcrumb: "Home > Over",
  }

  return (
    <main className="relative">
      {/* Decorative bg */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(99,102,241,.14),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.06]" />

      {/* HERO / INTRO */}
      <section className="relative px-6 pt-14 pb-10 sm:px-8 lg:px-12">
        <div className="absolute right-0 top-0 -z-10 hidden sm:block">
          <GlassOrb className="h-64 w-64 opacity-40" />
        </div>
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid items-center gap-8 sm:grid-cols-[1.3fr_.7fr]">
            <div className="max-w-3xl">
              <h1 className="bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                Over X3DPrints
              </h1>
              <p className="mt-3 text-slate-600">
                X3DPrints is een éénpersoons 3D-printstudio in bijberoep, gevestigd in Herzele en onderdeel van
                Xinudesign. Je spreekt rechtstreeks met de maker die ook produceert, test en afwerkt. Geen tickets,
                wel korte lijnen en onderdelen die gewoon passen.
              </p>
              <p className="mt-3 text-slate-600">
                Ideaal voor prototypes en kleine series. PLA is onze standaard voor strak detail, en waar nodig
                schakelen we over naar PETG, ABS/ASA, Nylon (PA) of PA-CF. We leveren vooral in de regio Gent, Aalst,
                Geraardsbergen en Oudenaarde.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/materials"
                  className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
                >
                  Materialen
                </Link>
                <Link
                  href="/services"
                  className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
                >
                  Diensten
                </Link>
                <Link
                  href="/contact"
                  className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Parallax hero visual */}
            <Parallax offset={28} className="justify-self-end">
              <Image
                src="/Logo.webp"
                alt="X3DPrints"
                width={260}
                height={260}
                className="h-32 w-auto opacity-95 sm:h-40 md:h-48"
                priority
              />
            </Parallax>
          </Reveal>
        </div>
      </section>

      {/* STATS / COUNTERS */}
      <section className="px-6 pb-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid gap-4 sm:grid-cols-3">
            {/* Bouwvolume */}
            <GlassCard className="p-5 text-center">
              <div className="text-xs uppercase tracking-wide text-slate-500">Bouwvolume</div>
              <div className="mt-1 text-2xl font-semibold text-slate-900">
                <Counter to={25} suffix=" cm" />
              </div>
              <div className="text-xs text-slate-500">per zijde (in één geheel)</div>
            </GlassCard>

            {/* Doorlooptijd */}
            <GlassCard className="p-5 text-center">
              <div className="text-xs uppercase tracking-wide text-slate-500">Doorlooptijd</div>
              <div className="mt-1 text-2xl font-semibold text-slate-900">
                <Counter to={5} prefix="2–" suffix=" d" />
              </div>
              <div className="text-xs text-slate-500">afhankelijk van project</div>
            </GlassCard>

            {/* Tolerantie */}
            <GlassCard className="p-5 text-center">
              <div className="text-xs uppercase tracking-wide text-slate-500">Tolerantie</div>
              <div className="mt-1 text-2xl font-semibold text-slate-900">
                <Counter to={0.2} prefix="±" suffix=" mm" decimals={1} locale="nl-BE" />
              </div>
              <div className="text-xs text-slate-500">typisch voor FDM</div>
            </GlassCard>
          </Reveal>
        </div>
      </section>


      {/* USP CARDS met 3D tilt */}
      <section className="px-6 pb-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { t: "Korte lijnen", d: "Snel feedback op STL/STEP en duidelijke afspraken." },
              { t: "Consistente kwaliteit", d: "Gekalibreerde FDM-setup en kwaliteitscheck voor levering." },
              { t: "Afwerking op maat", d: "Rauw, geschuurd, geprimed of gelakt; inserts en montage mogelijk." },
            ].map((u, i) => (
              <Reveal key={u.t} delay={0.05 * (i + 1)}>
                <TiltCard>
                  <GlassCard className="p-6">
                    <h3 className="text-lg font-semibold text-slate-900">{u.t}</h3>
                    <p className="mt-1 text-slate-600">{u.d}</p>
                  </GlassCard>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WAT EN HOE (tilt + reveal) */}
      <section className="px-6 pb-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid gap-8 sm:grid-cols-2">
            <TiltCard>
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">Wat we doen</h2>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-600">
                  <li>Prototyping en kleine series</li>
                  <li>Winkelmateriaal: displays, houders en POS-oplossingen</li>
                  <li>Gepersonaliseerde items en cadeaus</li>
                  <li>Herstel en maatwerkonderdelen</li>
                </ul>
              </GlassCard>
            </TiltCard>

            <TiltCard>
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">Hoe we werken</h2>
                <ol className="mt-3 list-decimal space-y-1 pl-5 text-slate-600">
                  <li>Upload je STL/STEP met toepassing en gewenste afwerking</li>
                  <li>Eerlijk materiaaladvies en transparante offerte</li>
                  <li>Productie, kwaliteitscheck en eventuele nabewerking</li>
                  <li>Verzending in BE of afhalen in regio Herzele/Gent</li>
                </ol>
                <p className="mt-3 text-sm text-slate-500">Levertijd meestal 2–5 werkdagen; spoed in overleg.</p>
              </GlassCard>
            </TiltCard>
          </Reveal>
        </div>
      </section>

      {/* MATERIALEN & SPECIFICS */}
      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">Materialen & specificaties</h2>
              <div className="mt-3 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Materialen</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
                    <li>PLA (standaard, veel kleuren en varianten)</li>
                    <li>PETG (sterker, vocht- en chemie-resistenter)</li>
                    <li>ABS / ASA (hitte- en UV-bestendig)</li>
                    <li>Nylon (PA) en PA-CF (stijf/sterk; jigs/fixtures)</li>
                    <li>TPU (flexibel) op aanvraag</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Specs</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
                    <li>Bouwvolume tot 25 × 25 × 25 cm per stuk</li>
                    <li>Layerhoogte 0,12–0,28 mm</li>
                    <li>Afwerking</li>
                  </ul>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/materials"
                  className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
                >
                  Alle materialen
                </Link>
                <Link
                  href="/pricing"
                  className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
                >
                  Prijzen & levering
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="overflow-hidden p-8 sm:p-10">
              <div className="grid gap-6 sm:grid-cols-[1.2fr_.8fr] sm:items-center">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Samen iets moois maken?</h2>
                  <p className="mt-2 max-w-prose text-slate-600">
                    Stuur je model door en ontvang snel een heldere prijs met het beste materiaaladvies voor jouw toepassing.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href="/contact"
                      className="rounded-xl border border-white/20 bg-black px-5 py-3 text-sm font-semibold text-white hover:brightness-110"
                    >
                      Offerte aanvragen
                    </Link>
                    <Link
                      href="/portfolio"
                      className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
                    >
                      Portfolio
                    </Link>
                  </div>
                </div>
                <Parallax offset={18} className="justify-self-end">
                  <div className="justify-self-end">
                    <GlassOrb className="h-40 w-40 opacity-90" />
                  </div>
                </Parallax>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  )
}
