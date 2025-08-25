import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import Catchphrase from "@/components/Catchphrase"

export const metadata: Metadata = {
  title: "3D print service in Gent | X3DPrints",
  description:
    "Precisie 3D prints voor prototypes en kleine series. Snel, betaalbaar en consistent. Materialen: PLA, PETG, ABS, ASA, Nylon, PA-CF en meer.",
  alternates: { canonical: "https://www.x3dprints.be/" },
  openGraph: {
    title: "X3DPrints — 3D print service in Gent",
    description:
      "Van STL/STEP naar strakke, functionele prints. Snelle doorlooptijd, materiaaladvies en nabewerking.",
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
      a: "STL en STEP zijn ideaal. Voeg tolerantie-info en gewenste materiaaleigenschappen toe voor het beste resultaat.",
    },
    {
      q: "Welke levertijd mag ik verwachten?",
      a: "Meestal 2–5 werkdagen afhankelijk van materiaal, volume en nabehandeling.",
    },
    {
      q: "Doen jullie nabewerkingen?",
      a: "Ja. Schuren, primen, lakken en eenvoudige montage. Vermeld dit bij je aanvraag.",
    },
    {
      q: "Materiaalkeuze?",
      a: "PLA, PETG, ABS, ASA, Nylon/PA en met carbon gevuld (PA-CF). We adviseren op basis van toepassing en omgeving.",
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
              Where Design Meets Dimension
            </Catchphrase>
            <h1 className="mt-2 text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              PLA prints die wél kloppen.{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
                Van model naar functioneel onderdeel.
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-slate-600 sm:text-lg">
              Van prototypes tot kleine series. Specialist in PLA met consistente kwaliteit. Materiaaladvies voor andere
              filamenten en nabewerking mogelijk.
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
              { k: "Materialen", v: "PLA (focus), PETG, ABS, ASA" },
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
          <Reveal className="max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Over X3DPrints</h2>
            <p className="mt-2 text-slate-600">
              X3DPrints maakt deel uit van Xinu in Herzele. Ons doel? 3D prints betaalbaar en makkelijk beschikbaar maken.
              We printen vooral PLA op een Bambu FDM-printer, maar ondersteunen ook andere materialen.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section className="px-6 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Wat je van ons krijgt</h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              Betrouwbare prints, glasheldere communicatie en advies dat niet voelt als verkoopspraat.
            </p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                t: "Nauwkeurigheid",
                d: "Strakke toleranties en consistente kwaliteit. Geen warping-horror.",
              },
              {
                t: "Materiaaladvies",
                d: "We matchen je toepassing met het juiste filament. Sterkte, hitte, UV of food-safe.",
              },
              {
                t: "Snelle doorloop",
                d: "Korte productietijd en pragmische planning. Spoed? Gewoon even melden.",
              },
              {
                t: "Nabewerking",
                d: "Schuren, primen, lakken en eenvoudige montage. Zodat het er ook uit ziet.",
              },
              {
                t: "Kleine series",
                d: "Ideaal voor validatie, jigs, behuizingen en functionele onderdelen.",
              },
              {
                t: "Transparante prijs",
                d: "Duidelijke offertes zonder kleine lettertjes. Je weet waar je aan toe bent.",
              },
            ].map((f, i) => (
              <Reveal key={f.t} delay={0.05 * (i + 1)} className="rounded-2xl border border-slate-200/70 bg-white/70 p-6">
                <h3 className="text-lg font-semibold text-slate-900">{f.t}</h3>
                <p className="mt-1 text-slate-600">{f.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MATERIALS */}
      <section className="px-6 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Materialen</h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              PLA is onze specialiteit voor prototypes met strak detail. Andere filamenten zijn beschikbaar wanneer de
              toepassing dat vraagt.
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { n: "PLA", u: "Matte, silk, wood, metal, glow en meer varianten." },
              { n: "PETG", u: "Sterk, licht flexibel, vocht- en chemie-resistenter." },
              { n: "ABS / ASA", u: "Hitte- en UV-bestendig, goed voor outdoor." },
              { n: "Nylon (PA)", u: "Heel sterk, slijtvast, industriële toepassingen." },
              { n: "PA-CF", u: "Nylon met carbon. Stijf, licht, functionele jigs/fixtures." },
              { n: "Specials", u: "TPU, glas-gevuld, vlamvertragend… op aanvraag." },
            ].map((m, i) => (
              <Reveal key={m.n} delay={0.05 * (i + 1)} className="rounded-xl border border-slate-200/70 bg-white/70 p-5">
                <div className="text-base font-semibold text-slate-900">{m.n}</div>
                <div className="mt-1 text-sm text-slate-600">{m.u}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS / TIMELINE */}
      <section className="px-6 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Zo werken we</h2>
          </Reveal>
          <ol className="relative ms-4 space-y-6 border-s-l border-slate-200 pl-6">
            {[
              { t: "Upload je model", d: "STL/STEP + context: toepassing, maat, gewenste afwerking." },
              { t: "Materiaal & prijs", d: "We adviseren het juiste filament en sturen een duidelijke offerte." },
              { t: "Productie", d: "Printen, kwaliteitscheck en eventuele nabewerking." },
              { t: "Levering/afhalen", d: "Verzending of ophalen in Gent. Factuur digitaal, uiteraard." },
            ].map((s, i) => (
              <Reveal key={s.t} delay={0.05 * (i + 1)} className="relative">
                <span className="absolute -start-[29px] top-1.5 grid h-3.5 w-3.5 place-items-center rounded-full bg-indigo-500 ring-4 ring-white" />
                <h3 className="text-base font-semibold text-slate-900">{`${i + 1}. ${s.t}`}</h3>
                <p className="text-slate-600">{s.d}</p>
              </Reveal>
            ))}
          </ol>
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
                    href="/pricing"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300/60 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-800"
                  >
                    Prijzen bekijken
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
