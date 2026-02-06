import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"
import { buildArticleJsonLd } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/blog/pla-vs-petg"
const datePublished = "2024-08-25"
const dateModified = "2026-02-04"

export const metadata: Metadata = {
  title: "PLA vs PETG: welke moet je kiezen? | X3DPrints Blog",
  description:
  "Vergelijk PLA en PETG voor jouw 3D print: uiterlijk, sterkte, hittebestendigheid en toepassing. Inclusief praktijkcases en tips om materiaal te kiezen.",
  alternates: { canonical },
  openGraph: {
    title: "PLA vs PETG: welke moet je kiezen?",
    description:  "De ultieme vergelijking tussen PLA en PETG met aandacht voor look, duurzaamheid, temperatuur en kost. Inclusief stappen om materiaal te testen.",
  url: canonical,
    images: [{ url: "/images/filament/petg_1.webp", width: 1200, height: 630, alt: "PLA vs PETG vergelijking" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "PLA vs PETG: welke moet je kiezen?",
    description: "Leer wanneer PLA volstaat en wanneer PETG meerwaarde biedt. Met design- en printtips.",
    images: ["/images/filament/petg_1.webp"],
  },
}

const highlightCards = [
  {
    title: "Look & afwerking",
    pla: "PLA is beschikbaar in matte, silk, marble en wood varianten. Ideaal voor zichtwerk waar kleur, textuur en detail belangrijk zijn.",
    petg: "PETG heeft een semi-glans finish en kan translucent geprint worden. Minder varianten, maar erg geschikt voor functionele prints met een nette look.",
  },
  {
    title: "Temperatuur & outdoor",
    pla: "Begint rond 55–60 °C te vervormen. Geschikt voor interieurs en lichte mechanische toepassingen die niet in de zon of in de auto liggen.",
    petg: "Behoudt vorm tot circa 80 °C en is beter bestand tegen UV en vocht. Geschikt voor kappen, klemmen of onderdelen die buiten of in warmere omgevingen terechtkomen.",
  },
  {
    title: "Mechanische eigenschappen",
    pla: "Stijf en nauwkeurig, maar brosser bij impact. Prima voor prototypes, behuizingen en decoratieve onderdelen.",
    petg: "Taai, licht flexibel en beter chemisch resistent. Ideaal voor clips, brackets, klemmen en onderdelen in functioneel gebruik.",
  },
]


const comparisonTable = [
  { property: "Stijfheid", pla: "Hoog, behoudt scherpe details", petg: "Middel, licht flexibel" },
  { property: "Slagvastheid", pla: "Gemiddeld", petg: "Hoog" },
  { property: "Hittebestendig", pla: "Tot 60 C", petg: "Tot 80 C" },
  { property: "Chemisch resistent", pla: "Beperkt", petg: "Beter bestand tegen oliën en vocht" },
  {
    property: "Oppervlak & detail",
    pla: "Zeer strak en mat mogelijk, ideaal voor visuele modellen",
    petg: "Licht glanzend met goede laaghechting, iets meer stringing mogelijk",
  },
  { property: "Kosten", pla: "Laag (baseline)", petg: "Circa 20 procent hoger" },
]


const useCases = {
  pla: [
    "Designmodellen, awards en merchandising met specifieke kleuren",
    "Prototypes die vooral visueel beoordeeld worden",
    "Behuizingen en gadgets voor indoor gebruik",
    "Architecturale maquettes en decoratieve prints",
  ],
  petg: [
    "Functionele onderdelen die buiten of in vochtige omgevingen leven",
    "Klemmen, houders en brackets die belasting krijgen",
    "Onderdelen in contact met water, detergenten of oliën",
    "Kappen of covers die in de auto of bij machines komen",
  ],
}

const switchingTips = [
  {
    title: "Printinstellingen",
    body: "PETG vraagt 235-250 C nozzle, 70-85 C bed en minder koeling (30-50%). PLA blijft bij 205-220 C met 60 C bed en volle koeling. Gebruik de presets in de slicer en pas retraction aan.",
  },
  {
    title: "Design tweaks",
    body: "Voor PETG voeg je liever fillets toe zodat stress niet op hoeken zit. Voor PLA volstaat 1.2 mm wand, bij PETG ga je gerust naar 1.6 mm voor extra taaiheid.",
  },
  {
    title: "Test prints",
    body: "Print een klein onderdeel in beide materialen om look en sterkte in de praktijk te voelen. Wij kunnen dezelfde G-code in twee materialen draaien zodat je snel vergelijkt.",
  },
]

const faq = [
  {
    q: "Kun je PLA en PETG combineren in één project?",
    a: "Zeker. Gebruik PLA voor zichtbare behuizingen en PETG voor onderdelen met scharnieren, clips of warmtebelasting. We stemmen de pasvorm af zodat beide materialen mooi uitlijnen.",
  },
  {
  q: "Is PETG moeilijker te printen?",
  a: "PETG vraagt drogere opslag en iets lagere koeling dan PLA, maar met correcte instellingen print het zeer stabiel. Hou rekening met een kleine meerkost voor materiaalbehandeling en iets langere finetuning in de slicer.",
},

  {
    q: "Welke materialen adviseren jullie als alternatief?",
    a: "Voor nog meer hittebestendigheid kies ASA of ABS. Voor flexibel werk: TPU (shore 95A). Deze bespreken we tijdens de offerte als jouw toepassing het vraagt.",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "PLA vs PETG: welke moet je kiezen?",
  description:
    "Vergelijk PLA en PETG voor jouw 3D print: uiterlijk, sterkte, hittebestendigheid en toepassing. Inclusief praktijkcases en tips om materiaal te kiezen.",
  datePublished,
  dateModified,
})

export default function BlogPlaVsPetgPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(160%_90%_at_50%_-20%,rgba(99,102,241,0.18),transparent_75%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.08]" />

      <section className="px-6 pb-12 pt-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal className="stacked-content">
            <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
              <ol className="flex flex-wrap gap-2">
                <li>
                  <Link
                    href="/blog"
                    className="font-medium text-indigo-600 transition hover:text-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Blog
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-700">PLA vs PETG</li>
              </ol>
            </nav>
            <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              PLA vs PETG: welke moet je kiezen?
            </h1>
            <p className="mt-4 text-lg text-slate-700">
  PLA blinkt uit in esthetiek en detail, terwijl PETG functionele eisen aankan zoals warmte en impact.
  In dit artikel vergelijken we beide materialen stap voor stap, zodat je gericht kunt kiezen welk filament het best past
  bij jouw 3D print: van zichtwerk tot functionele onderdelen.
</p>

            <div className="stacked-actions mt-6 flex flex-wrap gap-3 justify-center sm:justify-start">
              <ShimmerButton href="/materials">Vergelijk materialen</ShimmerButton>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Vraag advies
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {highlightCards.map((card) => (
            <Reveal key={card.title}>
              <GlassCard className="h-full border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
                <h2 className="text-xl font-semibold text-slate-900">{card.title}</h2>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  <div>
                    <p className="font-semibold text-slate-900">PLA</p>
                    <p>{card.pla}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">PETG</p>
                    <p>{card.petg}</p>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
  <div className="mx-auto max-w-5xl">
    <Reveal>
      <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
        <h2 className="text-2xl font-semibold text-slate-900">Hoe kies je snel tussen PLA en PETG?</h2>
        <p className="mt-3 text-sm text-slate-600">
          Twijfel je tussen PLA en PETG? Gebruik deze compacte beslisgids om snel te bepalen welk materiaal het best past
          bij jouw toepassing.
        </p>

        <ul className="mt-5 space-y-3 text-sm text-slate-700">
          <li className="flex items-start gap-3">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
            <span>
              <strong>Kies PLA</strong> wanneer je vooral een <strong>mooie afwerking, scherpe details</strong> en een
              <strong> specifieke kleur</strong> nodig hebt. Ideaal voor prototypes, behuizingen, maquettes en decoratieve onderdelen.
            </span>
          </li>

          <li className="flex items-start gap-3">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
            <span>
              <strong>Kies PETG</strong> als het onderdeel <strong>buiten</strong> komt, lichte <strong>warmte</strong> moet
              verdragen of mechanische <strong>impact / flexibiliteit</strong> nodig heeft.
            </span>
          </li>

          <li className="flex items-start gap-3">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
            <span>
              PLA is voordeliger en geschikt voor de meeste prints die niet zwaar belast worden. Voor 90% van de visuele en
              indoor-projecten is PLA de beste keuze.
            </span>
          </li>

          <li className="flex items-start gap-3">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
            <span>
              PETG kost iets meer, maar biedt <strong>betere duurzaamheid, UV-bestendigheid</strong> en <strong>chemische weerstand</strong>.
              Ideaal voor functionele onderdelen.
            </span>
          </li>
        </ul>

        <div className="mt-5">
          <Link
            href="/materials"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-indigo-700"
          >
            Bekijk alle materialen
          </Link>
        </div>
      </GlassCard>
    </Reveal>
  </div>
</section>


      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="overflow-x-auto border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Eigenschappen in detail</h2>
              <table className="mt-5 min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                <thead>
                  <tr className="text-xs uppercase tracking-wide text-slate-500">
                    <th className="py-2 pr-4">Eigenschap</th>
                    <th className="py-2 pr-4">PLA</th>
                    <th className="py-2 pr-4">PETG</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {comparisonTable.map((row) => (
                    <tr key={row.property}>
                      <td className="py-3 pr-4 font-medium text-slate-900">{row.property}</td>
                      <td className="py-3 pr-4">{row.pla}</td>
                      <td className="py-3 pr-4">{row.petg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid gap-6 lg:grid-cols-2">
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold text-slate-900">Wanneer kies je PLA?</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {useCases.pla.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold text-slate-900">Wanneer kies je PETG?</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {useCases.petg.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="grid gap-6 border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur lg:grid-cols-3">
              {switchingTips.map((tip) => (
                <div key={tip.title}>
                  <h3 className="text-base font-semibold text-slate-900">{tip.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{tip.body}</p>
                </div>
              ))}
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold text-slate-900">Veelgestelde vragen</h2>
              <div className="mt-4 space-y-4 text-sm text-slate-600">
                {faq.map((item) => (
                  <div key={item.q}>
                    <h3 className="text-base font-semibold text-slate-900">{item.q}</h3>
                    <p className="mt-1">{item.a}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <GlassCard className="flex flex-col gap-6 border border-white/40 bg-white/85 p-6 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Volgende stap</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Laat ons meedenken over jouw materiaalkeuze</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Deel je STL/STEP en vermeld de eisen rond temperatuur, impact en look. We sturen binnen een werkdag advies en prijs.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/contact">Vraag advies</ShimmerButton>
                <Link href="/pricing" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Bekijk tarieven
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <BlogReadMore />

    </main>
  )
}




