import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
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
      <section className="px-6 pb-16 pt-14 sm:px-8 lg:px-12 lg:pb-24">
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
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <ShimmerButton href="/contact">Offerte aanvragen</ShimmerButton>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300/60 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-800 backdrop-blur hover:bg-white"
              >
                Bekijk portfolio
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-12 grid gap-5 sm:grid-cols-3">
            {[
              { k: "Tolerantie", v: "±0,2 mm" },
              { k: "Doorlooptijd", v: "2–5 werkdagen" },
              { k: "Bouwvolume", v: "Tot 25 × 25 × 25 cm" },
            ].map((item) => (
              <div
                key={item.k}
                className="rounded-2xl border border-slate-200/70 bg-white/70 p-5 text-slate-800 backdrop-blur"
              >
                <div className="text-sm text-slate-500">{item.k}</div>
                <div className="mt-1 text-xl font-semibold">{item.v}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ABOUT */}
      <section className="px-6 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid items-center gap-8 sm:grid-cols-[1.2fr_.8fr]">
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
                  className="rounded-xl border border-slate-300/60 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-800"
                >
                  Diensten
                </Link>
                <Link
                  href="/materials"
                  className="rounded-xl border border-slate-300/60 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-800"
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
      <section className="px-6 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Voor wie we printen</h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Geen one-size-fits-all. We print wat jij nodig hebt en denken mee over materiaal en geometrie.
            </p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-6">
              <h3 className="text-lg font-semibold text-slate-900">Particulieren</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
                <li>Gepersonaliseerde cadeaus en naamplaatjes</li>
                <li>Decor & design: vazen, lampenkappen, interieurstukken</li>
                <li>Unieke accessoires en mini-sculpturen</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-6">
              <h3 className="text-lg font-semibold text-slate-900">Bedrijven</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
                <li>Etalage- en winkelmateriaal, displays en houders</li>
                <li>Bedrijfscadeaus en promotieartikelen</li>
                <li>Prototyping, jigs, fixtures en kleine series</li>
              </ul>
            </div>
          </div>
          <div className="mt-5">
            <Link
              href="/portfolio"
              className="inline-flex items-center rounded-xl border border-slate-300/60 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-800"
            >
              Gallerij bekijken
            </Link>
          </div>
        </div>
      </section>

      {/* PERSONALISATIE */}
      <section className="px-6 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Personalisatie</h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Maak je ontwerp persoonlijk met namen, initialen of een korte boodschap. Unieke geschenken, herkenbare
              interieurelementen en items met karakter.
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { t: "Kies ontwerp", d: "Vertrek van een bestaand model of een eenvoudige schets." },
              { t: "Personaliseer", d: "Voeg tekst, logo of specifieke maatvoering toe." },
              { t: "Wij printen", d: "Nette afwerking en levering binnen enkele werkdagen." },
            ].map((s, i) => (
              <Reveal key={s.t} delay={0.05 * (i + 1)} className="rounded-xl border border-slate-200/70 bg-white/70 p-5">
                <div className="text-base font-semibold text-slate-900">{s.t}</div>
                <div className="mt-1 text-sm text-slate-600">{s.d}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MATERIALEN + KLEUREN & AFWERKING */}
      <section className="px-6 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Materialen, kleuren & afwerking</h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              PLA voor strakke details en veel kleurkeuze. Voor sterkte, UV of hitte schakelen we naar PETG, ABS/ASA,
              Nylon (PA) of PA-CF. Afwerking kan rauw, geschuurd, geprimed of gelakt; inserts en montage zijn mogelijk.
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { n: "PLA", u: "Matte, silk, wood, metal, glow en meer varianten." },
              { n: "PETG", u: "Sterk, licht flexibel en vocht-/chemie-resistenter." },
              { n: "ABS / ASA", u: "Hitte- en UV-bestendig; beter voor buiten." },
              { n: "Nylon (PA)", u: "Zeer sterk en slijtvast; industriële toepassingen." },
              { n: "PA-CF", u: "Nylon met carbon; stijf en licht voor jigs/fixtures." },
              { n: "Specials", u: "TPU, vlamvertragend of glas-gevuld op aanvraag." },
            ].map((m, i) => (
              <Reveal key={m.n} delay={0.05 * (i + 1)} className="rounded-xl border border-slate-200/70 bg-white/70 p-5">
                <div className="text-base font-semibold text-slate-900">{m.n}</div>
                <div className="mt-1 text-sm text-slate-600">{m.u}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WAAROM PLA (compact) */}
      <section className="px-6 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Waarom we vaak voor PLA kiezen</h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              PLA combineert nette afwerking met een brede kleurkeuze en prettige printbaarheid. Het is biologisch
              afbreekbaar op industriële schaal, niet-toxisch en geschikt voor veel decoratieve en functionele toepassingen.
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { t: "Duurzaamheid", d: "Gemaakt uit hernieuwbare grondstoffen (bv. maïs, suikerriet)." },
              { t: "Veiligheid", d: "Niet-toxisch en zonder scherpe dampen bij normaal gebruik." },
              { t: "Afwerking", d: "Strakke details en levendige kleuren." },
              { t: "Toepassing", d: "Geschikt voor decor, prototypes en lichte functionele onderdelen." },
              { t: "Klantvriendelijk", d: "Licht, stevig genoeg en betaalbaar." },
            ].map((s, i) => (
              <Reveal key={s.t} delay={0.05 * (i + 1)} className="rounded-2xl border border-slate-200/70 bg-white/70 p-6">
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
      <section className="px-6 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Prijzen & levering</h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Transparante tarieven op basis van complexiteit, afmetingen, materiaal en afwerking. We communiceren
              vooraf over planning en oplevering.
            </p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { t: "Prijsopbouw", d: "Materiaal, printtijd, afwerking en eventuele montage." },
              { t: "Levertijd", d: "Gewoonlijk 2–5 werkdagen; spoed in overleg." },
              { t: "Verzending/afhalen", d: "Verzending in BE of afhalen in regio Herzele/Gent." },
            ].map((s, i) => (
              <Reveal key={s.t} delay={0.05 * (i + 1)} className="rounded-2xl border border-slate-200/70 bg-white/70 p-6">
                <div className="text-base font-semibold text-slate-900">{s.t}</div>
                <div className="mt-1 text-sm text-slate-600">{s.d}</div>
              </Reveal>
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            <Link
              href="/pricing"
              className="rounded-xl border border-slate-300/60 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-800"
            >
              Prijzen bekijken
            </Link>
            <ShimmerButton href="/contact">Vraag je print aan</ShimmerButton>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20 pt-6 sm:px-8 lg:px-12">
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
                <div className="mt-5 flex flex-wrap gap-3">
                  <ShimmerButton href="/contact">Offerte aanvragen</ShimmerButton>
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300/60 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-800"
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
