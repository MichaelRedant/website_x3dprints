import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import { buildArticleJsonLd } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/blog/maker-monday-warping-layer-cracks/"
const publishedDate = "2025-11-10T08:00:00+01:00"
const dateModified = "2026-02-08"

export const metadata: Metadata = {
  title: "Maker Monday #6: Warping, layer cracks en bridging voorkomen | X3DPrints",
  description:
    "80% van printproblemen ontstaat in CAD. Leer hoe je warping, layer cracks en slechte bridging voorkomt met slimme ontwerpkeuzes voor PLA, PETG en TPU.",
  alternates: { canonical },
  openGraph: {
    title: "Maker Monday #6: Warping & layer cracks via ontwerp tackelen",
    description:
      "Ontdek hoe je hoeken, wanden en overspanningen ontwerpt zodat PLA, PETG en TPU niet warpen of scheuren. Inclusief checklist.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: [
      "warping 3D printen voorkomen",
      "layer adhesion tips",
      "bridging FDM ontwerp",
      "ontwerpregels FDM",
      "layer cracks",
    ],
    images: [
      {
        url: "/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Illustratie warping en layer cracks in FDM",
      },
    ],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maker Monday: Warping & layer cracks voorkomen",
    description:
      "Checklist om warping, layer cracks en slechte bridging te vermijden via CAD-ontwerp. PLA, PETG en TPU design rules.",
    images: ["/images/og-home.jpg"],
  },
}

const heroStats = [
  { label: "Chamfer hoeken", value: "1–3 mm", detail: "Minder warping hefboom" },
  { label: "Bridge limiet", value: "≤ 25 mm", detail: "Daarboven segmenteren" },
  { label: "Perimeter advies", value: "≥ 4", detail: "Beter shell-effect" },
]

const warpingDesignTips = [
  {
    title: "Vermijd massieve blokken",
    detail: "Gebruik holtes of ribstructuren. Massieve volumes trekken harder krom door interne spanning.",
  },
  {
    title: "Chamfer of rond hoeken",
    detail: "1–3 mm chamfer of afgeronde hoek neemt de hefboom weg die hoeken omhoog trekt.",
  },
  {
    title: "Splits grote onderdelen",
    detail: "Modules van <150 mm warpen minder dan één blok van 250 mm. Voeg slimme verbindingen toe.",
  },
  {
    title: "Gebruik logische wanddiktes",
    detail: "Ontwerp volgens Maker Monday #2: veelvouden van nozzle en enkel extra dik waar het echt moet.",
  },
]

const layerCrackTips = [
  "Oriënteer de part zodat layers parallel lopen aan de hoofdbelasting.",
  "Gebruik ribs (1–1.2 mm dik, 3–10 mm hoog) en fillets om spanning te spreiden.",
  "Verhoog perimeters tot 4+ om een sterk shell-effect te creëren.",
  "Vermijd lange, dunne wanden zonder ondersteuning of breek ze op in segmenten.",
  "Kies PETG voor kritieke onderdelen; PLA is bros en TPU is voor flexibele zones.",
]

const bridgingTips = [
  "Beperk overspanningen tot 25 mm of segmenteer ze in kleinere bruggen.",
  "Gebruik bogen of arch-vormen i.p.v. vlakke daken.",
  "Voorzie ribbing of een lichte boog onder dunne bovenlagen.",
  "Verplaats kritieke uitsparingen weg uit bridgezones.",
  "Gebruik PLA voor bridging; PETG stringt sneller, TPU is te flexibel.",
]

const clearanceTable = [
  { material: "PLA", warping: "Laag", bridging: "Beste", layerAdhesion: "Stijf, bros" },
  { material: "PETG", warping: "Matig", bridging: "Gemiddeld", layerAdhesion: "Taai, fav voor structureel" },
  { material: "TPU", warping: "Verwaarloosbaar", bridging: "Nauwelijks", layerAdhesion: "Flexibel, moeilijk te scheuren" },
]

const checklistItems = [
  {
    title: "Warping",
    points: [
      "Hoeken afgerond of gechamferd?",
      "Massieve volumes vervangen door holtes/ribs?",
      "Grote onderdelen gesplitst in modules?",
    ],
  },
  {
    title: "Layer adhesion",
    points: [
      "Oriëntatie afgestemd op belasting?",
      "Voldoende wanddikte + ribs aanwezig?",
      "Perimeter count verhoogd waar nodig?",
    ],
  },
  {
    title: "Bridging",
    points: [
      "Overspanningen kort en opgesplitst?",
      "Boogvormen i.p.v. vlakke daken?",
      "Cruciale features verplaatst buiten de bridge?",
    ],
  },
]

const lastUpdatedLabel = "Laatst bijgewerkt: 8 februari 2026"

const tocItems = [
  { id: "warping-cad", label: "Warping begint in CAD" },
  { id: "warping-material", label: "Materiaalgedrag" },
  { id: "warping-layer-cracks", label: "Layer cracks voorkomen" },
  { id: "warping-bridge", label: "Bridging verbeteren" },
  { id: "warping-checklist", label: "Ontwerp-checklist" },
  { id: "warping-when", label: "Wanneer X3DPrints helpt" },
  { id: "warping-sources", label: "Bronnen en referenties" },
]

const references = [
  {
    label: "Prusa: Warping in FFF/FDM prints",
    href: "https://help.prusa3d.com/article/warping_1775",
  },
  {
    label: "Ultimaker: Design for FFF 3D printing",
    href: "https://ultimaker.com/learn/design-for-fff-3d-printing/",
  },
  {
    label: "Prusa: Material guide (PLA, PETG, TPU)",
    href: "https://help.prusa3d.com/filament-material-guide",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "Maker Monday #6: Hoe voorkom je warping, layer cracks en slechte bridging door ontwerpkeuzes?",
  description: metadata.description ?? "",
  datePublished: publishedDate,
  dateModified,
  image: "https://www.x3dprints.be/images/og-home.jpg",
})

function SectionDivider() {
  return (
    <div className="mx-auto my-12 flex w-full max-w-4xl items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-500">
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-indigo-300/0 via-indigo-300/60 to-indigo-300/0" />
      <span>Maker Monday</span>
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-indigo-300/0 via-indigo-300/60 to-indigo-300/0" />
    </div>
  )
}

export default function MakerMondayWarpingLayerCracksPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(180%_90%_at_50%_-20%,rgba(79,70,229,0.14),transparent_75%)]"
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
                    className="font-medium text-indigo-600 transition hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Blog
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-700">Maker Monday</li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-900">Warping & layer cracks</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Maker Monday #6</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Hoe voorkom je warping, layer cracks en slechte bridging door ontwerpkeuzes?
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              80% van printproblemen ontstaat in CAD, niet op de printer. Hoeken die loskomen, wanden die scheuren of bruggen die
              doorzakken zijn meestal het gevolg van foute geometrie. Deze gids leert je hoe je via ontwerpkeuzes warping, layer
              cracks en slechte bridging voorkomt.
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <ContentTableOfContents title="Inhoud" items={tocItems} className="max-w-2xl" />
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/contact?topic=maker-monday-warping">Vraag ontwerp-review</ShimmerButton>
              <Link
                href="/materials"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Materialen
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Zie prijsimpact
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">
              Gepubliceerd op 10 november 2025 • Deel van de Maker Monday knowledge hub.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 rounded-3xl border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{stat.label}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-600">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[3fr_2fr]">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 id="warping-cad" className="scroll-mt-28 text-2xl font-semibold text-slate-900">
                1. Warping begint in de CAD
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Warping ontstaat doordat buitenlagen sneller afkoelen dan de kern. PLA warpt het minst, PETG wat meer, TPU bijna
                niet. Pas je geometrie hierop aan:
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {warpingDesignTips.map((tip) => (
                  <li key={tip.title} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <p className="text-sm font-semibold text-slate-900">{tip.title}</p>
                    <p className="mt-1">{tip.detail}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Zie{" "}
                <Link
                  href="/blog/maker-monday-wanddiktes-ribs"
                  className="font-semibold text-indigo-600 transition hover:text-indigo-500"
                >
                  Maker Monday #2
                </Link>{" "}
                voor details over wand- en ribontwerp. Grote PETG panelen? Splits ze en voeg chamfers toe zodat de spanning kan
                ontsnappen.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h3 id="warping-material" className="scroll-mt-28 text-xl font-semibold text-slate-900">
                Materiaalgedrag
              </h3>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-slate-500">
                      <th className="py-2 pr-4">Materiaal</th>
                      <th className="py-2 pr-4">Warping</th>
                      <th className="py-2 pr-4">Bridging</th>
                      <th className="py-2 pr-4">Layer adhesion</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {clearanceTable.map((row) => (
                      <tr key={row.material}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{row.material}</td>
                        <td className="py-3 pr-4">{row.warping}</td>
                        <td className="py-3 pr-4">{row.bridging}</td>
                        <td className="py-3 pr-4">{row.layerAdhesion}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Kies materiaal bewust: PLA voor bridging en esthetiek, PETG voor structurele delen, TPU voor flexibele applicaties.
                Heb je ABS/ASA/nylon nodig? Geef dat mee in je aanvraag; onze coreflow draait op PLA/PETG/TPU voor
                reproduceerbaarheid, maar we bekijken graag partneroplossingen.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 id="warping-layer-cracks" className="scroll-mt-28 text-2xl font-semibold text-slate-900">
                2. Layer cracks voorkomen
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Layer cracks ontstaan door trek dwars op de layers, te dunne wanden of overshooting cooling. Volg deze regels:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {layerCrackTips.map((tip) => (
                  <li key={tip} className="rounded-2xl border border-slate-100 bg-white/70 p-3">
                    {tip}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Combineer dit met de toleranties uit{" "}
                <Link
                  href="/blog/maker-monday-toleranties-3d-printen"
                  className="font-semibold text-indigo-600 transition hover:text-indigo-500"
                >
                  Maker Monday #3
                </Link>{" "}
                zodat pen-gat of snapfits niet extra stress op de layers zetten. Clips of snapfits? Check{" "}
                <Link
                  href="/blog/maker-monday-snapfits"
                  className="font-semibold text-indigo-600 transition hover:text-indigo-500"
                >
                  Maker Monday #4
                </Link>{" "}
                voor bijkomende richtlijnen.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h3 className="text-xl font-semibold text-slate-900">Oriëntatievoorbeeld</h3>
              <p className="mt-2 text-sm text-slate-600">
                Een wandbeugel die neerwaartse last draagt, print je zo dat de layers parallel lopen aan de neerwaartse trekkracht.
                Moet de beugel naar buiten buigen? Draai het onderdeel zodat de buiging in X/Y zit en niet in Z. Denk altijd in
                functies, niet in “hoe het model eruit ziet”.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 id="warping-bridge" className="scroll-mt-28 text-2xl font-semibold text-slate-900">
                3. Bridging verbeteren
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Slechte bridging is geen slicerfout maar een ontwerpkeuze. Gebruik deze richtlijnen:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {bridgingTips.map((tip) => (
                  <li key={tip} className="rounded-2xl border border-slate-100 bg-white/70 p-3">
                    {tip}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                PLA is de veilige bridging-keuze. PETG vereist lagere snelheid en droger filament, TPU is enkel geschikt als je de
                bridge ondersteunt met een flexibele kern. Zet gaten en details weg van het midden van een overspanning.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h3 className="text-xl font-semibold text-slate-900">Bridge ontwerpvoorbeeld</h3>
              <p className="mt-2 text-sm text-slate-600">
                Een 40 mm vlak dak resulteert in doorzakking. Door het dak in drie segmenten te verdelen (3 × 13 mm) met ribbing
                eronder, blijft alles strak. Je verbruikt iets meer materiaal, maar voorkomt support removal en nabehandeling.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 id="warping-checklist" className="scroll-mt-28 text-2xl font-semibold text-slate-900">
                4. Ontwerp-checklist
              </h2>
              <div className="mt-4 space-y-4">
                {checklistItems.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                      {item.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 id="warping-when" className="scroll-mt-28 text-2xl font-semibold text-slate-900">
                5. Wanneer X3DPrints inschakelen?
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Laat ons meekijken als je onderdeel groter is dan 150 mm, bridging zones niet kan vermijden of als vorige prints
                al scheuren vertoonden. We optimaliseren wandopbouw, ribbing, oriëntatie en materiaalkeuze zodat je project
                betrouwbaar uit de printer komt.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                <li>Wandopbouw en ribbing afstemmen op het gebruik.</li>
                <li>Oriëntatie kiezen zodat krachten parallel lopen aan de layers.</li>
                <li>Materiaaladvies (PLA, PETG, TPU) op basis van je toepassing.</li>
                <li>Slicerprofielen finetunen voor bridging en cooling.</li>
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Overweeg je ABS, ASA of nylon? Onze productie is afgestemd op PLA, PETG en TPU voor maximale reproduceerbaarheid.
                Vermeld high-temp noden bij je aanvraag; we bekijken graag of een partner- of hybride traject past en koppelen
                transparant terug.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ShimmerButton href="/contact?topic=maker-monday-warping">Plan een consult</ShimmerButton>
                <Link
                  href="/materials"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Bekijk materialen
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Zie pricing
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="warping-sources" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Bronnen en referenties</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {references.map((reference) => (
                  <li key={reference.href} className="rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3">
                    <cite className="not-italic">
                      <a
                        href={reference.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-indigo-600 transition hover:text-indigo-500"
                      >
                        {reference.label}
                      </a>
                    </cite>
                  </li>
                ))}
              </ul>
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Ontwerp je een groot onderdeel of tricky bridge?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Deel STL/STEP, vermeld materiaalvoorkeur en gebruik. We koppelen terug met de juiste ontwerpaanpassingen,
                  planning en kost volgens onze workflow.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/contact?topic=maker-monday-warping">Start intake</ShimmerButton>
                <Link href="/3d-printen" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Bekijk knowledge hub
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






