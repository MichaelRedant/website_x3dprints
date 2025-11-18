import type { Metadata } from "next"
import Link from "next/link"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"

export const metadata: Metadata = {
  title: "3D printing voor marketing & events | X3DPrints",
  description:
    "Showpieces, awards en activatieprops in PLA Silk+, Marble of Translucent. Lokale productie vanuit Herzele met flexibele planning.",
  alternates: { canonical: "https://www.x3dprints.be/segments/3d-printing-marketing" },
  openGraph: {
    title: "3D printing voor marketing & events",
    description:
      "Laat eye-catching props en giveaways printen met korte lijnen. Ideaal voor activaties, retail displays en events in België.",
    url: "https://www.x3dprints.be/segments/3d-printing-marketing",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

const steps = [
  {
    title: "1. Creative briefing",
    copy: "Stuur je render, moodboard of campagnebeschrijving. We bekijken afmetingen, bevestiging en deadlines.",
  },
  {
    title: "2. Materiaal & afwerking",
    copy: "Voor luxelooks kiezen we PLA Silk+ of Marble; voor lichte props PLA Matte. We stemmen kleuren en lichtdoorlaatbaarheid af.",
  },
  {
    title: "3. Productie & logistiek",
    copy: "Je krijgt statusupdates en foto’s. Levering of afhaling plannen we samen, zodat jij focust op de activatie.",
  },
]

const highlights = [
  "Trofeeën, awards en displaystukken tot 300 mm hoogte",
  "Translucente en silk-filamenten voor premium look",
  "Reserveprints mogelijk voor roadshows of tours",
  "Planning afgestemd op campagnekalender",
]

export default function MarketingSegmentPage() {
  return (
    <main className="relative overflow-hidden px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-amber-50" />
        <div className="absolute left-6 top-[-15%] h-[20rem] w-[20rem] rounded-full bg-amber-200/30 blur-[110px]" />
        <div className="absolute right-0 bottom-[-20%] h-[26rem] w-[26rem] rounded-full bg-rose-200/40 blur-[140px]" />
      </div>

      <header className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Segment</p>
        <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          3D printing voor marketing & events
        </h1>
        <p className="mt-4 text-base text-slate-600">
          Props, giveaways en instore displays vanuit een éénmansstudio in Herzele. Je krijgt transparante timings, materiaaladvies en snelle updates zonder agency-lagen.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
          <ShimmerButton href="/contact?material=PLA%20Silk%2B">Vraag offerte of advies</ShimmerButton>
          <Link
            href="/materials#material-suggestion-tool"
            className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm"
          >
            Material Suggestion Tool
          </Link>
        </div>
      </header>

      <section className="mx-auto mt-10 max-w-5xl grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Typische realisaties</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>3D-geprinte awards of perskits voor campagne launches</li>
            <li>Merchandising props (sleutelhangers, badges, miniaturen)</li>
            <li>Retail displays of POS-elementen met magneten of inserts</li>
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            Licht schuren en supportverwijdering inbegrepen. Extra nabewerking of lakwerk kan via partners op aanvraag.
          </p>
        </GlassCard>

        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Aanpak in 3 stappen</h2>
          <div className="mt-4 space-y-3">
            {steps.map((step) => (
              <div
                key={step.title}
                className="rounded-3xl border border-slate-200/70 bg-white/70 p-4 text-sm text-slate-600"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{step.title}</p>
                <p className="mt-1 text-slate-700">{step.copy}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      <section className="mx-auto mt-10 max-w-5xl grid gap-6 lg:grid-cols-2">
        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Waarom marketeers kiezen voor X3DPrints</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Handige links</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>
              <Link href="/portfolio" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Portfolio
              </Link>{" "}
              – zie realisaties voor events en marketingteams
            </li>
            <li>
              <Link href="/blog/3d-printing-marketing-events" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Blog: 3D printing voor marketing & events
              </Link>{" "}
              – stap-voor-stap gids met KPIs en materiaalkeuze
            </li>
            <li>
              <Link href="/blog/hoeveel-kost-3d-printen" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Hoeveel kost 3D printen?
              </Link>{" "}
              – inzicht in budgetten en doorlooptijden
            </li>
            <li>
              <Link href="/blog/3d-printen-in-de-buurt" className="font-semibold text-indigo-600 hover:text-indigo-500">
                3D printen in de buurt
              </Link>{" "}
              – waarom lokale productie handig is bij strakke deadlines
            </li>
          </ul>
        </GlassCard>
      </section>
    </main>
  )
}
