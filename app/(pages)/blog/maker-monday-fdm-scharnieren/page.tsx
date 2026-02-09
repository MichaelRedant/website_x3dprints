import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"
import { buildArticleJsonLd } from "@/lib/seo"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"
import BlogFaq from "@/components/BlogFaq"
import { BLOG_FAQ } from "@/content/blog-faq"

const canonical = "https://www.x3dprints.be/blog/maker-monday-fdm-scharnieren/"
const publishedDate = "2025-12-08T08:00:00+01:00"
const dateModified = "2026-02-08"
const faq = BLOG_FAQ["maker-monday-fdm-scharnieren"]

export const metadata: Metadata = {
  title: "Maker Monday #1: FDM scharnieren ontwerpen die echt werken | X3DPrints",
  description:
    "How-to gids voor FDM scharnieren. Materiaalkeuze, oriëntatie, wanddiktes, pin-toleranties en verstevigingen zodat PLA, PETG of TPU scharnieren betrouwbaar openen.",
  alternates: { canonical },
  openGraph: {
    title: "Maker Monday #1: Zo ontwerp je sterke FDM scharnieren",
    description:
      "Van materiaalkeuze tot pin-toleranties: leer hoe X3DPrints scharnieren ontwerpt voor PLA, PETG en TPU zodat ze niet na vijf cycli breken.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: [
      "FDM scharnier ontwerpen",
      "3D print hinge design",
      "PLA PETG scharnier",
      "Maker Monday",
      "Functional 3D design",
    ],
    images: [
      {
        url: "/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "FDM scharnier ontwerp tips van X3DPrints",
      },
    ],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maker Monday: FDM scharnieren die niet breken",
    description:
      "Stap-voor-stap handleiding voor sterke 3D geprinte scharnieren. Materiaal, wanddikte, pinnen, ribs en nabewerking.",
    images: ["/images/og-home.jpg"],
  },
}

const heroStats = [
  { label: "Aanbevolen materiaal", value: "PETG", detail: "Taai, buigt voor het breekt" },
  { label: "Min. wanddikte", value: "2.4 – 3.2 mm", detail: "Afhankelijk van materiaal en impactzone" },
  { label: "Pin speling", value: "+0.20 – 0.40 mm", detail: "PLA het minst, TPU het meest" },
]

const materials = [
  {
    name: "PLA",
    highlights: [
      "Hoge stijfheid en nette looks",
      "Best voor displays, covers en deksels die zelden open gaan",
      "Link: Filament Vrijdag PLA",
    ],
    link: "/blog/filament-vrijdag-pla",
    caution: "Bros bij rotatiekrachten. Niet inzetten voor belast functioneel scharnierwerk.",
  },
  {
    name: "PETG",
    highlights: [
      "Taai en vergevingsgezind",
      "Vangt vibraties op en houdt het buiten vol",
      "Link: Filament Vrijdag PETG",
    ],
    link: "/blog/filament-vrijdag-petg",
    caution: "Zet iets uit tijdens printen. Hou extra speling op pin en socket.",
  },
  {
    name: "TPU",
    highlights: [
      "Voor flex-hinges en snaps",
      "Ideaal als silent damper of geïntegreerde bumper",
      "Link: Filament Vrijdag TPU",
    ],
    link: "/blog/filament-vrijdag-tpu",
    caution: "Gebruik als living hinge of insert, niet als klassieke pin-scharnier.",
  },
]

const orientationNotes = [
  {
    title: "Goed: lagen als ringen",
    detail:
      "Leg de scharniercilinder horizontaal zodat de lagen concentrisch rond de pin lopen. De kracht probeert dan vezels te comprimeren i.p.v. te delamineren.",
  },
  {
    title: "Fout: cilinder verticaal",
    detail:
      "Een verticaal geprinte cilinder schuift de kracht letterlijk tussen de lagen. Zelfs PLA Silk breekt dan na een paar cycli. Draai het model of splits het op.",
  },
]

const wallGuidelines = [
  { material: "PLA", min: "2.4 mm", note: "Extra marge boven de nozzle-regel om brosheid op te vangen." },
  { material: "PETG", min: "2.8 mm", note: "Taai materiaal, maar dikkere wanden voorkomen torsie." },
  { material: "Impactzones", min: "3.2 mm", note: "Voor klemmen of clips die vaak opengaan." },
]

const pinGuidelines = [
  { type: "Kleine doosjes", pin: "2.5 – 3 mm", tolerances: "PLA +0.20 mm, PETG +0.25 mm" },
  { type: "Middelgrote deksels", pin: "3.5 – 4 mm", tolerances: "Zelfde spelingsregels, socket ruimer houden" },
  { type: "Zware covers", pin: "4.5 – 6 mm", tolerances: "PETG +0.30 mm, TPU insert +0.40 mm mogelijk" },
]

const reinforcementTips = [
  {
    title: "Radiale ribs",
    detail: "Ribs van 1–1.2 mm die uit de cilinder vertrekken verhogen de stijfheid met 20–30%.",
  },
  {
    title: "Fillets van 2–4 mm",
    detail: "Rond de aansluiting van cilinder en body af zodat stress zich kan verspreiden.",
  },
  {
    title: "Schouders oversizen",
    detail: "Extra materiaal rond de pinhouder geeft PETG en PLA een buffer tegen torsie.",
  },
]

const finishingTips = [
  {
    title: "Lichte frictie wegwerken",
    detail: "Gebruik 400 grit schuurpapier en draai zachtjes rond de pin. Niet forceren: hitte kan PLA doen smeulen.",
  },
  {
    title: "Temperatuur tuning",
    detail: "PETG iets lager printen vermindert stringing binnen de socket. PLA profiteert van koeling voor strakkere diameters.",
  },
  {
    title: "Droge smeermiddelen",
    detail: "Graphietpoeder of PTFE-stift aanbrengen in dunne laag. Vermijd olie die polymeren aantast.",
  },
]

const lastUpdatedLabel = "Laatst bijgewerkt: 8 februari 2026"

const references = [
  {
    label: "Ultimaker: Design for FFF 3D printing",
    href: "https://ultimaker.com/learn/design-for-fff-3d-printing/",
  },
  {
    label: "Prusa: Material guide (PLA, PETG, TPU)",
    href: "https://help.prusa3d.com/filament-material-guide",
  },
  {
    label: "ISO/ASTM 52900: Additive manufacturing terminology",
    href: "https://www.astm.org/standards/isoastm52900",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "Maker Monday #1: FDM scharnieren ontwerpen die echt werken",
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

export default function MakerMondayFdmScharnierenPage() {
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
                <li className="font-medium text-slate-900">FDM scharnieren ontwerpen</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Maker Monday #1</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Hoe ontwerp je een FDM scharnier dat niet bij de eerste rotatie breekt?
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Een goed scharnier is geen miniatuurdeur. Het faalt niet door filament, maar door ontwerp: slechte oriëntatie,
              te dunne wanden of foute tolerantie. Dit is exact hoe wij scharnieren uit PLA, PETG en TPU laten overleven, cycle
              na cycle.
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/contact?topic=maker-monday-hinges">Plan scharnieradvies</ShimmerButton>
              <Link
                href="/materials"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Bekijk materialen
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Zie prijsimpact
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">
              Gepubliceerd op 8 december 2025 • Deel van de Maker Monday knowledge hub.
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

      <BlogContentOverview locale="nl" />

      <SectionDivider />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 id="hinge-material" className="scroll-mt-28 text-2xl font-semibold text-slate-900">
                1. Kies het juiste materiaal
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Scharnieren falen negen op de tien keer door ontwerp, maar materiaalkeuze bepaalt hoe snel ze breken. Dit zijn de
                regels die we in onze studio hanteren:
              </p>
              <div className="mt-4 space-y-4">
                {materials.map((material) => (
                  <div key={material.name} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-base font-semibold text-slate-900">{material.name}</p>
                      <Link
                        href={material.link}
                        className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
                      >
                        Lees meer
                      </Link>
                    </div>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
                      {material.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                    <p className="mt-2 text-sm font-medium text-amber-600">{material.caution}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-600">
                In de praktijk betekent dit: 90% van de scharnieren printen we in PETG. PLA bewaren we voor cosmetische covers,
                TPU voor flex-snaps of dempers.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 id="hinge-orientation" className="scroll-mt-28 text-2xl font-semibold text-slate-900">
                2. Oriëntatie: lagen loodrecht op de as
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                De grootste fout? Een scharnier rechtop printen omdat dat minder support geeft. De layers worden dan de
                zwakste schakel. Houd je aan deze regels:
              </p>
              <div className="mt-4 space-y-3">
                {orientationNotes.map((note) => (
                  <div key={note.title} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <p className="text-sm font-semibold text-slate-900">{note.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{note.detail}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Print je toch verticaal? Voeg dan inserts of metalen pinnen toe en reken op kortere levensduur.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 id="hinge-walls" className="scroll-mt-28 text-2xl font-semibold text-slate-900">
                3. Wanddiktes die iets verdragen
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Vuistregel: wanddikte = 4x je nozzle. Maar bij scharnieren gaan we ruimer om layer bonding veilig te houden.
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {wallGuidelines.map((item) => (
                  <li key={item.material} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <p className="text-sm font-semibold text-slate-900">
                      {item.material}: <span className="font-normal text-slate-700">{item.min}</span>
                    </p>
                    <p className="mt-1">{item.note}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Te dun? Dan snij je een breekmesje in je ontwerp. Voeg schouders toe of verdik het vlak rond de cilinder.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 id="hinge-pins" className="scroll-mt-28 text-2xl font-semibold text-slate-900">
                4. Pin-diameters en toleranties
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                De verhouding tussen pin en socket bepaalt of je scharnier soepel draait of meteen vastloopt.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-slate-500">
                      <th className="py-2 pr-4">Toepassing</th>
                      <th className="py-2 pr-4">Aanbevolen pin</th>
                      <th className="py-2 pr-4">Toleranties</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {pinGuidelines.map((row) => (
                      <tr key={row.type}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{row.type}</td>
                        <td className="py-3 pr-4">{row.pin}</td>
                        <td className="py-3 pr-4">{row.tolerances}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Voorbeeld: een pin van 3 mm in PLA krijgt een socket van 3.20 mm. In PETG schuiven we naar 3.25 mm omdat het
                materiaal uitzet. TPU living hinges hebben zelfs +0.40 mm nodig. Meer theorie volgt in{" "}
                <Link
                  href="/blog/maker-monday-toleranties-3d-printen"
                  className="font-semibold text-indigo-600 transition hover:text-indigo-500"
                >
                  Maker Monday #3
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 id="hinge-reinforcement" className="scroll-mt-28 text-2xl font-semibold text-slate-900">
                5. Ribs, fillets en schouders
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Scharnieren leven van compressie en torsie. Versterk dus elk contactvlak.
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {reinforcementTips.map((tip) => (
                  <li key={tip.title} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <p className="text-sm font-semibold text-slate-900">{tip.title}</p>
                    <p className="mt-1">{tip.detail}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Tip: voeg ribs toe op de zijde die het eerst belast wordt tijdens openen. Zo krijgt de pin steun voor de
                laaglijnen.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 id="hinge-splitting" className="scroll-mt-28 text-2xl font-semibold text-slate-900">
                6. Splits slim, niet obsessief
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Meer wings betekent niet automatisch sterker. Integendeel: elke interlock moet perfect passen of hij breekt.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                <li>Gebruik een klassieke male-female opbouw.</li>
                <li>Beperk je tot 2–3 tanden per zijde voor makkelijke assemblage.</li>
                <li>Laat een steunvlak onder elke tand zodat de pin niet scheef trekt.</li>
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Living hinges? Vermijd ze in PLA en PETG. Alleen TPU houdt de cycli vol, maar voelt anders aan en vraagt een
                aangepaste geometrie.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 id="hinge-warping" className="scroll-mt-28 text-2xl font-semibold text-slate-900">
                7. Warping en layer cracks door ontwerp
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Warping is geen printerprobleem maar een ontwerpkeuze. Vermijd lange dunne vleugels, vermijd een cilinder zonder
                voet en stop scharnieren niet vlak tegen de rand.
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Oplossingen: sacrificial shoulders, print dichter bij het midden van het bed, en gebruik helper tabs die je na
                het printen wegsnijdt. In Maker Monday #6 duiken we dieper in{" "}
                <Link
                  href="/blog/maker-monday-warping-layer-cracks"
                  className="font-semibold text-indigo-600 transition hover:text-indigo-500"
                >
                  warping en layer cracks
                </Link>
                .
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                <li>Voeg shoulders toe die je later vlak afwerkt.</li>
                <li>Laat voldoende massa onder de cilinder zodat warmte zich kan verdelen.</li>
                <li>Gebruik PETG voor onderdelen die in de buitenrand van het bed terechtkomen.</li>
              </ul>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 id="hinge-finishing" className="scroll-mt-28 text-2xl font-semibold text-slate-900">
                8. Nabewerking en frictiebeheer
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Zelfs met perfecte toleranties kan een scharnier stroef openen. Zo lossen we dat op:
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {finishingTips.map((tip) => (
                  <li key={tip.title} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <p className="text-sm font-semibold text-slate-900">{tip.title}</p>
                    <p className="mt-1">{tip.detail}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Geen agressieve smeermiddelen. Olie tast PLA en TPU aan en trekt stof in je scharnier.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 id="hinge-when" className="scroll-mt-28 text-2xl font-semibold text-slate-900">
                9. Wanneer X3DPrints inschakelen?
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Heb je een kritische scharnier nodig? We kunnen je ontwerp reviewen, materialen testen en combinaties printen:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                <li>Ontwerpreview: wanddikte, ribs, pinverhouding en inserts nalopen.</li>
                <li>PETG productie met gecontroleerde droging voor maximale laaghechting.</li>
                <li>TPU componenten toevoegen voor demping of silent stops.</li>
                <li>Hybride prints: PLA shell met PETG scharnierkern of TPU bussen.</li>
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Project nodig dat om ABS, ASA of nylon vraagt? Onze vaste flow is afgestemd op PLA, PETG en TPU omdat we daar de
                hoogste reproduceerbaarheid halen. Meld het als je een engineering kunststof overweegt; we bekijken of een
                partner-run of hybride opzet zinvol is en koppelen transparant terug.
              </p>
              <p className="mt-4 text-sm text-slate-600">
                We doen geen volledige lak- of polijstafwerking, maar zorgen wel dat je scharnier functioneel, reproduceerbaar
                en klaar voor montage uit de printer komt.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ShimmerButton href="/contact?topic=maker-monday-hinges">Vraag een review aan</ShimmerButton>
                <Link
                  href="/blog/filament-vrijdag-petg"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Lees PETG gids
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section id="hinge-sources" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 id="sources" className="text-2xl font-semibold text-slate-900">Bronnen en referenties</h2>
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

      <BlogContentOverview locale="nl" />

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <GlassCard className="flex flex-col gap-6 border border-white/40 bg-white/85 p-6 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Volgende stap</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Wil je dat we meedenken over je hinge stack?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Deel je STL of STEP, vertel hoe vaak het scharnier opent en in welke omgeving het terechtkomt. We koppelen
                  terug met materiaaladvies, kost en doorlooptijd in lijn met onze{" "}
                  <Link href="/pricing" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                    pricing
                  </Link>{" "}
                  en workflow.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/contact?topic=maker-monday-hinges">Start intake</ShimmerButton>
                <Link href="/3d-printen" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Bekijk de knowledge hub
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <BlogFaq title={faq.title} items={faq.items} />


      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <BlogAuthorNote locale="nl" />

      <BlogReadMore />

    </main>
  )
}






