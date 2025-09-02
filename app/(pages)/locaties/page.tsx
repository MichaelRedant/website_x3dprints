// app/locaties/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import GlassOrb from "@/components/GlassOrb"
import { getAllLocationSlugs, getLocationBySlug } from "@/lib/locations"

export const revalidate = 60 * 60 * 6 // 6u heropbouw

export const metadata: Metadata = {
  title: "3D printen per stad | X3DPrints",
  description:
    "Overzicht van lokale landingspagina’s: 3D printen per stad. Snel intern linken en meteen naar je regio navigeren.",
  alternates: { canonical: "https://www.x3dprints.be/locaties" },
  openGraph: {
    title: "3D printen per stad",
    description:
      "Overzicht van lokale landingspagina’s: 3D printen per stad. Snel intern linken en meteen naar je regio navigeren.",
    url: "https://www.x3dprints.be/locaties",
    siteName: "X3DPrints",
    type: "website",
    locale: "nl_BE",
  },
  robots: { index: true, follow: true, "max-snippet": -1 },
}

export default function Page() {
  // Lijst bouwen en sorteren
  const slugs = getAllLocationSlugs()
  const locations = slugs
    .map((slug) => ({ slug, city: getLocationBySlug(slug)?.city ?? slug }))
    .sort((a, b) => a.city.localeCompare(b.city, "nl"))

  // Groeperen op initiaal
  const grouped: Record<string, { slug: string; city: string }[]> = {}
  for (const loc of locations) {
    const k = (loc.city?.[0] ?? "#").toUpperCase()
    if (!grouped[k]) grouped[k] = []
    grouped[k].push(loc)
  }
  const letters = Object.keys(grouped).sort()

  // JSON-LD ItemList (cap op 100)
  const itemList = locations.slice(0, 100).map((loc, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `https://www.x3dprints.be/${loc.slug}`,
    name: `3D printen in ${loc.city}`,
  }))

  return (
    <main className="relative overflow-clip px-4 pb-20 pt-12 sm:px-6 lg:px-8">
      {/* Achtergrond: zachte gradient + stippenraster + orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-teal-50" />
        <div className="absolute -top-32 -left-28 h-[26rem] w-[26rem] rounded-full bg-cyan-200/30 blur-3xl sm:h-[32rem] sm:w-[32rem]" />
        <div className="absolute -bottom-32 -right-28 h-[28rem] w-[28rem] rounded-full bg-teal-200/30 blur-3xl sm:h-[36rem] sm:w-[36rem]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px]" />
      </div>

      {/* HERO */}
      <header
        className="
          mx-auto grid max-w-5xl grid-cols-1 items-center gap-6 rounded-3xl
          border border-white/30 bg-white/50 p-6 sm:grid-cols-[1.3fr,0.7fr] sm:p-8
          backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)]
          animate-[fadeInUp_.6s_ease_out_0s_both]
        "
      >
        <div className="text-center sm:text-left">
          <p className="text-xs font-semibold tracking-wide text-teal-700">Lokale landingspagina’s</p>
          <h1 className="mt-2 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
            3D printen per stad
          </h1>
          <p className="mx-auto mt-3 max-w-prose text-slate-600 sm:mx-0">
            Vind je lokale pagina en vraag snel je offerte aan. Compact overzicht, sterke interne linking, en bots die
            vrolijk meelezen.
          </p>

          {/* Snelle letter-index */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            {letters.map((l) => (
              <a
                key={l}
                href={`#letter-${l}`}
                className="rounded-full border border-white/30 bg-white/70 px-3 py-1.5 text-xs text-slate-700 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-slate-900"
              >
                {l}
              </a>
            ))}
          </div>
        </div>

        {/* Visual: GlassOrb met lichte drift-animatie */}
        <div
          className="
            relative mx-auto hidden aspect-square w-48 items-center justify-center overflow-visible rounded-2xl
            ring-1 ring-white/30 sm:flex md:w-56
          "
          aria-hidden
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-300/20 via-transparent to-cyan-300/25" />
          <div className="animate-[float_7s_ease-in-out_infinite]">
            <div className="animate-[slowSpin_22s_linear_infinite]">
              <GlassOrb className="h-40 w-40 md:h-48 md:w-48" />
            </div>
          </div>
          <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        </div>
      </header>

      {/* OVERZICHT */}
      <section
        className="
          mx-auto mt-10 max-w-5xl rounded-3xl border border-white/30 bg-white/60 p-6 sm:p-8
          backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.06)]
        "
      >
        {/* Top 12 uitgelicht als glass-pills */}
        {locations.length > 0 && (
          <div className="animate-[fadeIn_.6s_ease_out_.05s_both]">
            <h2 className="text-sm font-semibold text-slate-900">Aanbevolen steden</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {locations.slice(0, 12).map((loc) => (
                <li key={loc.slug}>
                  <Link
                    href={`/${loc.slug}`}
                    className="rounded-full border border-white/30 bg-white/70 px-3 py-1.5 text-xs text-slate-700 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-slate-900"
                  >
                    3D printen in {loc.city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Alfabetische secties, met subtiele stagger via index delay */}
        <div className="mt-8 space-y-8">
          {letters.map((l, idx) => (
            <div
              key={l}
              id={`letter-${l}`}
              className="scroll-mt-24"
              style={{ animationDelay: `${Math.min(idx * 50, 300)}ms` }}
            >
              <div className="mb-3 text-xs font-semibold tracking-wider text-slate-500">{l}</div>
              <ul
                className="
                  grid grid-cols-1 gap-2
                  sm:grid-cols-2
                  md:grid-cols-3
                  lg:grid-cols-4
                "
              >
                {grouped[l].map((loc) => (
                  <li key={loc.slug} className="animate-[fadeIn_.6s_ease_out_.05s_both]">
                    <Link
                      href={`/${loc.slug}`}
                      className="inline-block rounded-full border border-white/30 bg-white/70 px-3 py-1.5 text-xs text-slate-700 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-slate-900"
                    >
                      3D printen in {loc.city}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: itemList,
          }),
        }}
      />

      {/* Keyframes + reduced-motion respect */}
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes fadeInUp { from { opacity:.0; transform: translateY(8px) } to { opacity:1; transform: translateY(0) } }
          @keyframes fadeIn { from { opacity:.0 } to { opacity:1 } }
          @keyframes slowSpin { to { transform: rotate(360deg) } }
          @keyframes float { 0%,100% { transform: translateY(-4px) } 50% { transform: translateY(4px) } }

          @media (prefers-reduced-motion: reduce) {
            * { animation: none !important; transition: none !important }
          }
        `,
        }}
      />
    </main>
  )
}
