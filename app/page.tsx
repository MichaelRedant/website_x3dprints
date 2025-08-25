import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import Catchphrase from "@/components/Catchphrase"

export const metadata: Metadata = {
  title: "3D print service in Herzele | X3DPrints",
  description:
    "Precisie 3D prints voor prototypes en kleine series. Snel, betaalbaar en consistent. PLA als standaard, met PETG, ABS/ASA, Nylon en PA-CF wanneer het project daarom vraagt.",
  alternates: { canonical: "https://www.x3dprints.be/" },
  openGraph: {
    title: "X3DPrints — 3D print service in Herzele",
    description:
      "Van STL/STEP naar strakke, functionele prints. Snelle doorlooptijd, eerlijk materiaaladvies en nette afwerking.",
    url: "https://www.x3dprints.be/",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

export default function HomePage() {
  function icon(shape: ReactNode) {
    return (
      <svg
        aria-hidden
        className="mb-2 h-6 w-6 text-indigo-600"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        {shape}
      </svg>
    )
  }
  const faq = [
    {
      q: "Welke bestanden kan ik uploaden?",
      a: "STL en STEP zijn ideaal. Voeg toepassing, gewenste afwerking en eventuele toleranties toe voor het beste resultaat.",
    },
    {
      q: "Welke levertijd mag ik verwachten?",
      a: "Meestal 2–5 werkdagen, afhankelijk van materiaal, volume en eventuele nabewerking.",
    },
    {
      q: "Wat is het maximale bouwvolume?",
      a: "Tot 20 × 20 × 20 cm per stuk in één geheel. Groter kan door onderdelen te splitsen en te monteren.",
    },
    {
      q: "Is PLA geschikt voor voedselcontact?",
      a: "PLA is niet-toxisch, maar geprinte oppervlakken bevatten micro-poriën. Gebruik alleen met zorg, reinig grondig en vermijd hitte. Vraag naar alternatieven als food-safe cruciaal is.",
    },
  ]

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  }

  return (
    <main className="relative">
      {/* Decorative background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(99,102,241,.18),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.07]" />

      {/* HERO */}
      <section className="px-6 pb-24 pt-20 sm:px-8 lg:px-12 lg:pb-32 lg:pt-28">
        <div className="mx-auto max-w-6xl">
          <Reveal className="max-w-3xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200/40 bg-white/60 px-3 py-1 text-xs text-slate-700 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Snel, precies en betaalbaar
            </span>
            <Catchphrase className="mt-4 block text-base font-medium text-indigo-600 sm:text-lg">
               Betaalbaar 3D printen
            </Catchphrase>
            <h1 className="mt-2 text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              3D-prints die wél kloppen.{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
                Where design meets dimension.
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-slate-600 sm:text-lg">
              X3DPrints is een compacte 3D-printstudio uit Herzele, onderdeel van Xinudesign. Ideaal voor prototypes en
              kleine series met strakke afwerking. PLA is onze standaard, maar we schakelen waar nodig over naar PETG,
              ABS/ASA, Nylon of PA-CF. Levertijd meestal 2–5 werkdagen, transparante offerte vooraf.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <ShimmerButton href="/contact">Offerte aanvragen</ShimmerButton>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300/60 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-800 backdrop-blur transition-transform hover:-translate-y-0.5 hover:bg-white"
              >
                Bekijk portfolio
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-16 grid gap-6 sm:grid-cols-3">
            {[
              {
                k: "Tolerantie",
                v: "±0,2 mm",
                icon: icon(
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 12h16M4 16h16" />
                ),
              },
              {
                k: "Doorlooptijd",
                v: "2–5 werkdagen",
                icon: icon(
                  <>
                    <circle cx={12} cy={12} r={9} />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l2 2" />
                  </>
                ),
              },
              {
                k: "Bouwvolume",
                v: "Tot 25 × 25 × 25 cm",
                icon: icon(
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 16V8l-9-5-9 5v8l9 5 9-5ZM12 3v18M3 8l9 4 9-4"
                  />
                ),
              },
            ].map((item) => (
              <div
                key={item.k}
                className="rounded-2xl border border-slate-200/70 bg-white/70 p-5 text-slate-800 backdrop-blur transition-transform hover:-translate-y-1 hover:shadow-lg"
              >
                {item.icon}
                <div className="text-sm text-slate-500">{item.k}</div>
                <div className="mt-1 text-xl font-semibold">{item.v}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ABOUT */}
      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid items-center gap-12 sm:grid-cols-[1.2fr_.8fr]">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Over X3DPrints</h2>
              <p className="mt-3 text-slate-600">
                Eénpersoonsstudio in bijberoep. Je spreekt rechtstreeks met de maker die ook produceert, test en afwerkt.
                Geen tickets of callcenters, wel korte lijnen, duidelijke afspraken en onderdelen die passen.
              </p>
              <p className="mt-3 text-slate-600">
                Actief in regio Gent, Aalst, Geraardsbergen en Oudenaarde. Van functionele prototypes en kleine series tot
                winkelmateriaal, gepersonaliseerde cadeaus en maatwerk.
              </p>
              <div className="mt-6 flex gap-3">
                <Link
                  href="/services"
                  className="rounded-xl border border-slate-300/60 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-800 transition-transform hover:-translate-y-0.5"
                >
                  Diensten
                </Link>
                <Link
                  href="/materials"
                  className="rounded-xl border border-slate-300/60 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-800 transition-transform hover:-translate-y-0.5"
                >
                  Materialen
                </Link>
              </div>
            </div>
            <div className="justify-self-end">
              <Image src="/Logo.webp" alt="X3DPrints logo" width={220} height={220} className="opacity-90" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* SEGMENTEN: particulieren vs. bedrijven */}
      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Voor wie we printen</h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Geen one-size-fits-all. We print wat jij nodig hebt en denken mee over materiaal en geometrie.
            </p>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-6 transition-transform hover:-translate-y-1 hover:shadow-lg">
              {icon(<circle cx={12} cy={12} r={9} />)}
              <h3 className="text-lg font-semibold text-slate-900">Particulieren</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
                <li>Gepersonaliseerde cadeaus en naamplaatjes</li>
                <li>Decor & design: vazen, lampenkappen, interieurstukken</li>
                <li>Unieke accessoires en mini-sculpturen</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-6 transition-transform hover:-translate-y-1 hover:shadow-lg">
              {icon(<rect x={4} y={4} width={16} height={16} rx={2} />)}
              <h3 className="text-lg font-semibold text-slate-900">Bedrijven</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
                <li>Etalage- en winkelmateriaal, displays en houders</li>
                <li>Bedrijfscadeaus en promotieartikelen</li>
                <li>Prototyping, jigs, fixtures en kleine series</li>
              </ul>
            </div>
          </div>
          <div className="mt-8">
            <Link
              href="/portfolio"
              className="inline-flex items-center rounded-xl border border-slate-300/60 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-800 transition-transform hover:-translate-y-0.5"
            >
              Gallerij bekijken
            </Link>
          </div>
        </div>
      </section>

      {/* PERSONALISATIE */}
      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Personalisatie</h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Maak je ontwerp persoonlijk met namen, initialen of een korte boodschap. Unieke geschenken, herkenbare
              interieurelementen en items met karakter.
            </p>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                t: "Kies ontwerp",
                d: "Vertrek van een bestaand model of een eenvoudige schets.",
                icon: icon(<polygon points="12 3 21 18 3 18" />),
              },
              {
                t: "Personaliseer",
                d: "Voeg tekst, logo of specifieke maatvoering toe.",
                icon: icon(<path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16M4 12h16M4 20h16" />),
              },
              {
                t: "Wij printen",
                d: "Nette afwerking en levering binnen enkele werkdagen.",
                icon: icon(<path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v16H4z" />),
              },
            ].map((s, i) => (
              <Reveal
                key={s.t}
                delay={0.05 * (i + 1)}
                className="rounded-xl border border-slate-200/70 bg-white/70 p-5 transition-transform hover:-translate-y-1 hover:shadow-lg"
              >
                {s.icon}
                <div className="text-base font-semibold text-slate-900">{s.t}</div>
                <div className="mt-1 text-sm text-slate-600">{s.d}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MATERIALEN + KLEUREN & AFWERKING */}
      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Materialen, kleuren & afwerking</h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              PLA voor strakke details en veel kleurkeuze. Voor sterkte, UV of hitte schakelen we naar PETG, ABS/ASA,
              Nylon (PA) of PA-CF. Afwerking kan rauw, geschuurd, geprimed of gelakt; inserts en montage zijn mogelijk.
            </p>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { n: "PLA", u: "Matte, silk, wood, metal, glow en meer varianten.", icon: icon(<circle cx={12} cy={12} r={9} />) },
              { n: "PETG", u: "Sterk, licht flexibel en vocht-/chemie-resistenter.", icon: icon(<rect x={4} y={4} width={16} height={16} rx={2} />) },
              { n: "ABS / ASA", u: "Hitte- en UV-bestendig; beter voor buiten.", icon: icon(<path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M2 12h20" />) },
              { n: "Nylon (PA)", u: "Zeer sterk en slijtvast; industriële toepassingen.", icon: icon(<polygon points="12 2 22 8 12 14 2 8" />) },
              { n: "PA-CF", u: "Nylon met carbon; stijf en licht voor jigs/fixtures.", icon: icon(<path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v16H4z M4 4l16 16" />) },
              { n: "Specials", u: "TPU, vlamvertragend of glas-gevuld op aanvraag.", icon: icon(<path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 6v6l-8 6-8-6V9l8-6z" />) },
            ].map((m, i) => (
              <Reveal
                key={m.n}
                delay={0.05 * (i + 1)}
                className="rounded-xl border border-slate-200/70 bg-white/70 p-5 transition-transform hover:-translate-y-1 hover:shadow-lg"
              >
                {m.icon}
                <div className="text-base font-semibold text-slate-900">{m.n}</div>
                <div className="mt-1 text-sm text-slate-600">{m.u}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WAAROM PLA (compact) */}
      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Waarom we vaak voor PLA kiezen</h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              PLA combineert nette afwerking met een brede kleurkeuze en prettige printbaarheid. Het is biologisch
              afbreekbaar op industriële schaal, niet-toxisch en geschikt voor veel decoratieve en functionele toepassingen.
            </p>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                t: "Duurzaamheid",
                d: "Gemaakt uit hernieuwbare grondstoffen (bv. maïs, suikerriet).",
                icon: icon(<path strokeLinecap="round" strokeLinejoin="round" d="M12 2C7 2 4 6 4 10c0 6 8 12 8 12s8-6 8-12c0-4-3-8-8-8Zm0 0v10" />),
              },
              {
                t: "Veiligheid",
                d: "Niet-toxisch en zonder scherpe dampen bij normaal gebruik.",
                icon: icon(<path strokeLinecap="round" strokeLinejoin="round" d="M12 2 4 5v6c0 5 3.6 9.4 8 11 4.4-1.6 8-6 8-11V5l-8-3Z" />),
              },
              {
                t: "Afwerking",
                d: "Strakke details en levendige kleuren.",
                icon: icon(<path strokeLinecap="round" strokeLinejoin="round" d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5L12 3z" />),
              },
              {
                t: "Toepassing",
                d: "Geschikt voor decor, prototypes en lichte functionele onderdelen.",
                icon: icon(<path strokeLinecap="round" strokeLinejoin="round" d="M21 16V8l-9-5-9 5v8l9 5 9-5ZM12 3v18M3 8l9 4 9-4" />),
              },
              {
                t: "Klantvriendelijk",
                d: "Licht, stevig genoeg en betaalbaar.",
                icon: icon(<path strokeLinecap="round" strokeLinejoin="round" d="M8 14s2 2 4 2 4-2 4-2" />),
              },
            ].map((s, i) => (
              <Reveal
                key={s.t}
                delay={0.05 * (i + 1)}
                className="rounded-2xl border border-slate-200/70 bg-white/70 p-6 transition-transform hover:-translate-y-1 hover:shadow-lg"
              >
                {s.icon}
                <div className="text-base font-semibold text-slate-900">{s.t}</div>
                <div className="mt-1 text-sm text-slate-600">{s.d}</div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Let op bij voedselcontact: reinig grondig, vermijd hitte en overweeg gecertificeerde alternatieven indien
            food-safe essentieel is.
          </p>
        </div>
      </section>

      {/* PRIJZEN & LEVERING */}
      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Prijzen & levering</h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Transparante tarieven op basis van complexiteit, afmetingen, materiaal en afwerking. We communiceren
              vooraf over planning en oplevering.
            </p>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                t: "Prijsopbouw",
                d: "Materiaal, printtijd, afwerking en eventuele montage.",
                icon: icon(<circle cx={12} cy={12} r={9} />),
              },
              {
                t: "Levertijd",
                d: "Gewoonlijk 2–5 werkdagen; spoed in overleg.",
                icon: icon(<><circle cx={12} cy={12} r={9} /><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l2 2" /></>),
              },
              {
                t: "Verzending/afhalen",
                d: "Verzending in BE of afhalen in regio Herzele/Gent.",
                icon: icon(<path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16M14 8l6 4-6 4" />),
              },
            ].map((s, i) => (
              <Reveal
                key={s.t}
                delay={0.05 * (i + 1)}
                className="rounded-2xl border border-slate-200/70 bg-white/70 p-6 transition-transform hover:-translate-y-1 hover:shadow-lg"
              >
                {s.icon}
                <div className="text-base font-semibold text-slate-900">{s.t}</div>
                <div className="mt-1 text-sm text-slate-600">{s.d}</div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex gap-3">
            <Link
              href="/pricing"
              className="rounded-xl border border-slate-300/60 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-800 transition-transform hover:-translate-y-0.5"
            >
              Prijzen bekijken
            </Link>
            <ShimmerButton href="/contact">Vraag je print aan</ShimmerButton>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-32 pt-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white/70 p-8 backdrop-blur sm:p-10">
            <div className="grid gap-6 sm:grid-cols-[1.2fr_.8fr] sm:items-center">
              <div>
                <h2 className="text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Klaar om te printen?
                </h2>
                <p className="mt-2 max-w-prose text-slate-600">
                  Stuur je model door en je krijgt snel een heldere prijs met het beste materiaaladvies voor jouw
                  toepassing.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ShimmerButton href="/contact">Offerte aanvragen</ShimmerButton>
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300/60 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-800 transition-transform hover:-translate-y-0.5"
                  >
                    Gallerij bekijken
                  </Link>
                </div>
              </div>
              <div className="justify-self-end">
                <Image
                  src="/images/next.svg"
                  alt=""
                  width={160}
                  height={160}
                  className="opacity-80 [filter:contrast(1.05)_saturate(1.1)]"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  )
}
