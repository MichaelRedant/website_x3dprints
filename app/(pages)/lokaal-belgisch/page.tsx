import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import GlassOrb from "@/components/GlassOrb"
import ShimmerButton from "@/components/ShimmerButton"
import Catchphrase from "@/components/Catchphrase"

import { buildLocalBusinessSchema, SITE } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Lokaal & 100% Belgisch 3D printen | X3DPrints Herzele",
  description:
    "Herzeelse handelaar en 100% Belgische 3D printstudio. Korte keten, duidelijke afspraken en lid van Werkgroep Ondernemend Herzele. Vraag je offerte.",
  alternates: { canonical: "https://www.x3dprints.be/lokaal-belgisch/" },
  openGraph: {
    title: "Lokaal & Belgisch 3D printen | X3DPrints",
    description:
      "X3DPrints is een Herzeelse handelaar en 100% Belgische 3D printstudio. Korte keten, duidelijke afspraken en trotse partner van Werkgroep Ondernemend Herzele.",
    url: "https://www.x3dprints.be/lokaal-belgisch",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

export default function Page() {
  const values = [
    {
      title: "Herzeelse handelaar",
      desc: "Atelier in Provincieweg 34a (Borsbeke). Je spreekt de maker zelf, zonder tussenlagen of callcenters.",
    },
    {
      title: "100% Belgisch",
      desc: "Facturatie, productie en service vanuit België. Geen dropshipping of anonieme fulfillment buiten de landsgrenzen.",
    },
    {
      title: "Korte keten",
      desc: "Levering in Vlaanderen, afhalen op afspraak in Herzele. Minder transportkilometers en snellere feedbackloops.",
    },
    {
      title: "Eerlijke afspraken",
      desc: "Duidelijke prijzen, realistische planningen en geen loze beloftes. We plannen samen binnen haalbare marges.",
    },
    {
      title: "Belgische waarden",
      desc: "Betrouwbaarheid, vakmanschap en no-nonsense communicatie. We bouwen duurzame relaties met klanten en verenigingen.",
    },
    {
      title: "Werkgroep Ondernemend Herzele",
      desc: "Trots lid van de werkgroep. We investeren in lokale samenwerkingen, events en zichtbaarheid voor Herzeelse ondernemers.",
    },
    {
      title: "Betalen met Heuro",
      desc: "X3DPrints aanvaardt de Herzeelse Euro (Heuro) zodat je lokaal betaalt en het budget in de regio blijft circuleren.",
    },
  ]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Lokaal & Belgisch 3D printen",
    url: "https://www.x3dprints.be/lokaal-belgisch",
    description:
      "X3DPrints is een Herzeelse handelaar en 100% Belgische 3D printstudio. Korte keten, duidelijke afspraken en lid van Werkgroep Ondernemend Herzele.",
    inLanguage: "nl-BE",
    about: [
      { "@type": "Thing", name: "Herzele", description: "Herzeelse handelaar, lokale 3D printservice" },
      { "@type": "Thing", name: "Belgische 3D printstudio" },
      { "@type": "Thing", name: "Werkgroep Ondernemend Herzele" },
    ],
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  }

  const localBusinessJsonLd = buildLocalBusinessSchema({
    pageUrl: "https://www.x3dprints.be/lokaal-belgisch",
    description:
      "Herzeelse handelaar en 100% Belgische 3D printstudio met korte keten, duidelijke afspraken en lid van Werkgroep Ondernemend Herzele.",
    areaServed: "BE",
  })

  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(45,212,191,.14),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.06]" />

      <section className="relative px-6 pb-16 pt-14 sm:px-8 lg:px-12 lg:pb-24">
        <div className="absolute right-0 top-0 -z-10 hidden sm:block">
          <GlassOrb className="h-64 w-64 opacity-40" />
        </div>
        <div className="mx-auto max-w-6xl">
          <Reveal className="max-w-4xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-100/80 bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Lokaal verankerd in Herzele
            </span>
            <Catchphrase className="mt-4 block text-base font-semibold text-emerald-600 sm:text-lg">
              Belgische 3D prints, korte lijnen
            </Catchphrase>
            <h1 className="mt-2 text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Herzeelse handelaar & 100% Belgische 3D-printstudio.
            </h1>
            <p className="mt-3 text-balance text-lg font-semibold text-slate-700">
              Eén aanspreekpunt, korte keten en duidelijke afspraken.
            </p>
            <p className="mt-5 max-w-3xl text-pretty text-base leading-7 text-slate-600 sm:text-lg">
              X3DPrints produceert in Herzele (Borsbeke) en levert in heel Vlaanderen. Als Herzeelse handelaar en trotse
              deelnemer van de{" "}
              <Link
                href="https://www.herzele.be/werkgroep-ondernemend-herzele"
                target="_blank"
                rel="noreferrer"
                prefetch={false}
                className="font-semibold text-emerald-700 underline decoration-emerald-200 hover:decoration-emerald-500"
              >
                Werkgroep Ondernemend Herzele
              </Link>{" "}
              werken we met Belgische partners, transparante prijzen en realistische timings. Geen outsourcing of dropshipping –
              alles blijft lokaal en verankerd in{" "}
              <Link
                href="https://www.herzele.be"
                target="_blank"
                rel="noreferrer"
                prefetch={false}
                className="font-semibold text-emerald-700 underline decoration-emerald-200 hover:decoration-emerald-500"
              >
                Herzele
              </Link>
              .
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ShimmerButton href="/contact">Offerte aanvragen</ShimmerButton>
              <Link
                href="/materials"
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-100/70 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
              >
                Materialen & richtlijnen
              </Link>
              <Link
                href="/locaties"
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-100/70 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
              >
                Lokale leveringszones
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6 max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Wat lokaal betekent</h2>
            <p className="mt-2 text-slate-600">
              Lokale verankering gaat verder dan een adres in Herzele. We bouwen aan een korte keten, heldere communicatie
              en samenwerkingen met Belgische partners zodat je sneller feedback krijgt en de economie mee versterkt.
            </p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((item) => (
              <Reveal key={item.title}>
                <GlassCard className="h-full border-white/40 bg-gradient-to-br from-white/80 to-white/50 p-5 shadow-lg ring-1 ring-white/60">
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Belgische waarden, elke dag</h2>
              <p className="text-slate-600">
                Elk project vertrekt vanuit betrouwbaarheid, klare taal en zorg voor afwerking. We plannen realistisch,
                communiceren open en blijven binnen onze beloftes. Transparante offertes, duidelijke levertermijnen en
                eerlijke feedback horen daarbij.
              </p>
              <ul className="grid gap-2 sm:grid-cols-2 sm:gap-3">
                {[
                  "Transparante prijzen zonder verrassingen",
                  "Afhalen in Herzele of levering in Vlaanderen",
                  "Belgische facturatie en support",
                  "Snelle feedback rechtstreeks met de maker",
                  "Samenwerken met lokale verenigingen en kmo&apos;s",
                  "Respect voor planning, ook bij spoed",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-slate-700">
                    <span aria-hidden className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-400" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <ShimmerButton href="/contact">Plan een gesprek</ShimmerButton>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-100/70 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Bekijk services
                </Link>
              </div>
            </div>
            <GlassCard className="border-white/40 bg-gradient-to-br from-white/80 to-white/50 p-6 shadow-lg ring-1 ring-white/60">
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
                Werkgroep Ondernemend Herzele
              </p>
              <h3 className="mt-2 text-xl font-bold text-slate-900">Samenwerken in eigen regio</h3>
              <p className="mt-2 text-sm text-slate-700">
                X3DPrints is een trots lid van de Werkgroep Ondernemend Herzele. We delen kennis, versterken lokale
                initiatieven en zorgen dat Herzeelse ondernemers elkaar sneller vinden. Het resultaat: korte lijnen,
                betrouwbare partners en zichtbare impact in de streek.
              </p>
              <p className="mt-3 text-sm text-slate-700">
                Betalen kan ook met de{" "}
                <Link
                  href="https://www.herzele.be/heuro"
                  target="_blank"
                  rel="noreferrer"
                  prefetch={false}
                  className="font-semibold text-emerald-700 underline decoration-emerald-200 hover:decoration-emerald-500"
                >
                  Herzeelse Euro (Heuro)
                </Link>
                . Zo blijft de waarde van je project in de lokale gemeenschap circuleren.
              </p>
              <p className="mt-3 text-sm text-slate-700">
                We koppelen lokale projecten aan Belgische materialen en diensten. Van scholen en makers tot bedrijven en
                verenigingen: iedereen krijgt dezelfde no-nonsense begeleiding.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/locaties"
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-100/70 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Bekijk lokale pagina&apos;s
                </Link>
                <Link
                  href="/blog/3d-printen-in-de-buurt"
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-100/70 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Lees hoe we lokaal leveren
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard className="overflow-hidden border-white/30 bg-gradient-to-br from-white/80 to-white/50 p-8 shadow-xl ring-1 ring-white/60 sm:p-10">
              <div className="grid gap-6 sm:grid-cols-[1.1fr_.9fr] sm:items-center">
                <div>
                  <h2 className="text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    Start je lokaal 3D printproject
                  </h2>
                  <p className="mt-2 max-w-prose text-slate-600">
                    Deel je STL/STEP, toepassing en gewenste timing. We koppelen een Belgische planning aan heldere prijzen
                    en een leveroptie die past: afhalen in Herzele of levering in Vlaanderen.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <ShimmerButton href="/contact">Offerte aanvragen</ShimmerButton>
                    <Link
                      href="/materials#material-suggestion-tool"
                      className="inline-flex items-center gap-2 rounded-xl border border-emerald-100/70 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                    >
                      Material Suggestion Tool
                    </Link>
                  </div>
                </div>
                <div className="justify-self-end">
                  <GlassOrb className="h-40 w-40 opacity-80" />
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
    </main>
  )
}
