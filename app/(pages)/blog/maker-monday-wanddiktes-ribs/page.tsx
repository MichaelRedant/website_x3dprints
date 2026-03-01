import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import { buildArticleJsonLd } from "@/lib/seo"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"
import BlogFaq from "@/components/BlogFaq"
import { BLOG_FAQ } from "@/content/blog-faq"

const canonical = "https://www.x3dprints.be/blog/maker-monday-wanddiktes-ribs/"
const publishedDate = "2025-10-13T08:00:00+02:00"
const dateModified = "2026-02-09T08:00:00+02:00"
const faq = BLOG_FAQ["maker-monday-wanddiktes-ribs"]

export const metadata: Metadata = {
  title: "Maker Monday #2: Wanddiktes, ribs en verstevigingen voor FDM | X3DPrints",
  description:
    "How-to gids over wanddikte 3D printen. Leer hoe je PLA, PETG en TPU onderdelen ontwerpt met juiste wall thickness, ribs en oriëntatie zodat functionele FDM prints standhouden.",
  alternates: { canonical },
  openGraph: {
    title: "Maker Monday #2: Wanddiktes & ribs voor functionele FDM onderdelen",
    description:
      "Ontwerpregels voor FDM: wanddikte tabellen, rib-guidelines, box designs en materiaalkeuze voor PLA, PETG en TPU.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: [
      "wanddikte 3D printen",
      "FDM wall thickness",
      "ribs versterken 3D print",
      "functionele onderdelen FDM",
      "Maker Monday",
    ],
    images: [
      {
        url: "/images/og-home-nl.svg",
        width: 1200,
        height: 630,
        alt: "Diagram van 3D geprinte rib-structuur",
      },
    ],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maker Monday: Wanddiktes & ribs voor FDM",
    description:
      "Checklist voor wanddiktes, ribs en verstevigingen zodat jouw PLA, PETG of TPU onderdelen functioneel blijven.",
    images: ["/images/og-home-nl.svg"],
  },
}

const heroStats = [
  { label: "Minimum wand", value: "≥ 1.6 mm", detail: "3 perimeterlijnen bij 0.4 mm nozzle" },
  { label: "Rib dikte", value: "1.2 – 1.6 mm", detail: "Met fillets van 2-4 mm" },
  { label: "Box design", value: "Shell + rib + shell", detail: "Verdubbelt torsiestijfheid" },
]

const wallMatrix = [
  { material: "PLA", light: "1.6 mm", functional: "2.4 mm", heavy: "3.2 mm" },
  { material: "PETG", light: "1.6 mm", functional: "2.8 mm", heavy: "3.6 mm" },
  { material: "TPU", light: "2.0 mm", functional: "3.2 mm", heavy: "4.0 mm" },
]

const ribGuidelines = [
  { title: "Dikte", detail: "1.2–1.6 mm voor standaard 0.4 mm nozzle (3-4 lijnen)." },
  { title: "Hoogte", detail: "Minstens 3x de dikte voor merkbare winst." },
  { title: "Hoek", detail: "45–60° en volg de krachtlijn voor beste resultaat." },
  { title: "Fillet", detail: "2–4 mm radius waar rib en wand samenkomen." },
]

const reinforcementTechniques = [
  { name: "Gussets", description: "Driehoekige verstevigingen die flex in hoeken verminderen. Ideaal voor L-brackets en voeten." },
  { name: "Sweep ribs", description: "Ribs die de curve van een behuizing volgen. Perfect voor shells en cosplayonderdelen." },
  { name: "Sandwich shells", description: "Twee buitenwanden met ribstructuur ertussen voor dashboards, covers en panelen." },
]

const lastUpdatedLabel = "Laatst bijgewerkt: 9 februari 2026"
const designGuideHref =
  "/blog/3d-print-ontwerp-gids?utm_source=blog&utm_medium=internal&utm_campaign=maker-monday-wanddiktes-ribs"

const references = [
  { label: "Ultimaker: Design for FFF 3D printing", href: "https://ultimaker.com/learn/design-for-fff-3d-printing/" },
  { label: "Prusa: Materials overview", href: "https://help.prusa3d.com/es/materials" },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "Maker Monday #2: Wanddiktes, ribs en verstevigingen voor FDM",
  description: metadata.description ?? "",
  datePublished: publishedDate,
  dateModified,
  image: "https://www.x3dprints.be/images/og-home-nl.svg",
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

export default function MakerMondayWanddiktesRibsPage() {
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
                <li className="font-medium text-slate-900">Wanddiktes & ribs</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Maker Monday #2</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Wanddiktes, ribs en verstevigingen: zo overleven functionele FDM onderdelen.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              FDM is sterk zolang je het ontwerpt als FDM. Ontwerpen voor gietwerk of freesdelen levert te dunne wanden,
              verkeerde krachtsverdeling en delaminatie op. In deze gids delen we de wanddiktes, rib-richtlijnen en
              oriëntatie-keuzes die wij toepassen voor PLA, PETG en TPU.
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/contact?topic=maker-monday-walls">Vraag ontwerpreview</ShimmerButton>
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
              Gepubliceerd op 13 oktober 2025 • Deel van de Maker Monday knowledge hub voor engineers.
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
              <h2 id="walls-basics" className="scroll-mt-28 text-2xl font-semibold text-slate-900">
                1. Wanddiktes: de basis van sterkte
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Minstens drie perimeterlijnen (1.2 mm bij een 0.4 mm nozzle) is het startpunt. Voor functionele onderdelen gaan
                we verder volgens deze tabel:
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-slate-500">
                      <th className="py-2 pr-4">Materiaal</th>
                      <th className="py-2 pr-4">Licht gebruik</th>
                      <th className="py-2 pr-4">Functioneel</th>
                      <th className="py-2 pr-4">Zware belasting</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {wallMatrix.map((row) => (
                      <tr key={row.material}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{row.material}</td>
                        <td className="py-3 pr-4">{row.light}</td>
                        <td className="py-3 pr-4">{row.functional}</td>
                        <td className="py-3 pr-4">{row.heavy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                PLA is stijf maar bros: extra wand verlaagt het risico op layer cracks. PETG heeft meer &quot;give&quot; en vraagt
                dikkere wanden om torsie te weerstaan. TPU is flexibel, dus wanddikte bepaalt letterlijk de stijfheid. Meer
                materiaal rondom kritieke zones zorgt voor voorspelbare prints.
              </p>
              <p className="mt-4 text-sm text-slate-600">
                Versterk deze keuzes met de materiaalartikels:{" "}
                <Link href="/blog/filament-vrijdag-pla" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                  PLA
                </Link>
                ,{" "}
                <Link href="/blog/filament-vrijdag-petg" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                  PETG
                </Link>{" "}
                en{" "}
                <Link href="/blog/filament-vrijdag-tpu" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                  TPU
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 id="walls-infill" className="scroll-mt-28 text-2xl font-semibold text-slate-900">
                2. Infill is geen wondermiddel
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Wanden dragen de last, niet het infillpatroon. Een onderdeel met 1 mm wand en 60% infill faalt sneller dan een
                onderdeel met 3 mm wand en 15% infill. Gebruik infill alleen doelgericht:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li className="rounded-2xl border border-slate-100 bg-white/70 p-3">
                  Compressieonderdelen: infill helpt krachten over een groter oppervlak te spreiden.
                </li>
                <li className="rounded-2xl border border-slate-100 bg-white/70 p-3">
                  Grote panelen die niet mogen torderen: vul 15-25% gyroid of cubic om resonantie te verminderen.
                </li>
                <li className="rounded-2xl border border-slate-100 bg-white/70 p-3">
                  PETG onderdelen onder hitte: infill tegen delaminatie, maar alleen in combinatie met voldoende wand.
                </li>
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Focus dus op de wanddikte en ribben. Infill is ondersteunend, geen vervanger.
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
              <h2 id="walls-ribs" className="scroll-mt-28 text-2xl font-semibold text-slate-900">
                3. Ribs: gratis sterkte zonder massa
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Ribs voegen materiaal toe waar je het nodig hebt. Volg deze richtlijnen:
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {ribGuidelines.map((item) => (
                  <li key={item.title} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-1">{item.detail}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Ribs zijn essentieel bij covers, clips, behuizingen, brackets en alles wat torsie ziet. Eén brede rib werkt beter
                dan vier dunne. Combineer ribs met 2-4 mm fillets zodat spanningen geleidelijk afnemen.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 id="walls-box" className="scroll-mt-28 text-2xl font-semibold text-slate-900">
                4. Box design & shell layering
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Een doosstructuur (wand + rib + wand) sluit perfect aan bij hoe FDM lagen krachten verdelen. Denk aan:
              </p>
              <pre className="mt-4 rounded-2xl bg-slate-900/90 px-4 py-3 text-sm text-emerald-200">
{`[wand 2.4 mm] + [ribs intern] + [wand 2.4 mm]`}
              </pre>
              <p className="mt-4 text-sm text-slate-600">
                Je creëert zo een gesloten box die zowel druk als torsie aan kan. Vergeet de binnenste ribben niet te verbinden
                met fillets of chamfers zodat krachtlijnen logisch doorlopen.
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
              <h2 id="walls-stress" className="scroll-mt-28 text-2xl font-semibold text-slate-900">
                5. Overgangen en stresszones
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Scherpe binnenhoeken en abrupte dikteveranderingen concentreren spanning. Vermijd 90° binnenhoeken zonder fillet,
                dun-naar-dik overgangen zonder taper en lange flaps met minimale ondersteuning. Gebruik in de plaats:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                <li>Fillets van 3-6 mm radius in functionele onderdelen.</li>
                <li>Chamfers van 45° om krachten te spreiden.</li>
                <li>Tapers die geleidelijk naar dikkere zones groeien.</li>
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Deze keuzes sluiten aan bij toekomstige{" "}
                <Link
                  href="/blog/maker-monday-toleranties-3d-printen"
                  className="font-semibold text-indigo-600 transition hover:text-indigo-500"
                >
                  Maker Monday #3
                </Link>{" "}
                waar we tolerantie en pasvorm uitdiepen.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 id="walls-orientation" className="scroll-mt-28 text-2xl font-semibold text-slate-900">
                6. Oriëntatie bepaalt levensduur
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Lagen zijn sterk in compressie en druk over de breedte, maar zwak in Z-trek en torsie dwars op de layer-lines.
                Daarom:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                <li>Print brackets zo dat de kracht in X/Y loopt.</li>
                <li>Print covers met de langste zijde op het bed voor minimale warping.</li>
                <li>Print scharnieren zoals we uitleggen in{" "}
                  <Link
                    href="/blog/maker-monday-fdm-scharnieren"
                    className="font-semibold text-indigo-600 transition hover:text-indigo-500"
                  >
                    Maker Monday #1
                  </Link>
                  , zodat de cilinderwand in X/Y ligt.
                </li>
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Warping of layer cracks door verkeerde oriëntatie? We tackelen die in{" "}
                <Link
                  href="/blog/maker-monday-warping-layer-cracks"
                  className="font-semibold text-indigo-600 transition hover:text-indigo-500"
                >
                  Maker Monday #6
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
              <h2 id="walls-reinforcement" className="scroll-mt-28 text-2xl font-semibold text-slate-900">
                7. Verstevigingsmethodes die werken
              </h2>
              <p className="mt-2 text-sm text-slate-600">Combineer wand en ribs met deze technieken:</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {reinforcementTechniques.map((tech) => (
                  <li key={tech.name} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <p className="text-sm font-semibold text-slate-900">{tech.name}</p>
                    <p className="mt-1">{tech.description}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Werk altijd in veelvouden van je nozzle (0.4 mm) en hou wanden dikker dan 1 mm. Dunne flenzen gedragen zich als
                scheermesjes en geven slicers onvoldoende consistentie.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 id="walls-fouten" className="scroll-mt-28 text-2xl font-semibold text-slate-900">
                8. Fouten die we dagelijks zien
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li className="rounded-2xl border border-slate-100 bg-white/70 p-3">0.8 mm wanden op hulzen groter dan 150 mm.</li>
                <li className="rounded-2xl border border-slate-100 bg-white/70 p-3">Clips met scherpe hoeken zonder fillet.</li>
                <li className="rounded-2xl border border-slate-100 bg-white/70 p-3">Holtes die dunner zijn dan twee lijnen en dus niet printbaar.</li>
                <li className="rounded-2xl border border-slate-100 bg-white/70 p-3">Overhang &gt;55° zonder steunvlak of rib.</li>
                <li className="rounded-2xl border border-slate-100 bg-white/70 p-3">Wanddiktes die geen veelvoud zijn van de nozzle-diameter.</li>
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Vermijd deze valkuilen en combineer ze met de tolerantie-checklist uit Maker Monday #3 om je CAD direct slicer-proof te maken.
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
              <h2 id="walls-materials" className="scroll-mt-28 text-2xl font-semibold text-slate-900">
                9. Materiaalkeuze voor structurele sterkte
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Wanddikte en ribdesign zijn één helft van het verhaal. Kies ook het juiste materiaal:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                <li>
                  <Link href="/blog/filament-vrijdag-pla" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                    PLA
                  </Link>{" "}
                  voor indoor covers, lichte belasting en nette looks.
                </li>
                <li>
                  <Link href="/blog/filament-vrijdag-petg" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                    PETG
                  </Link>{" "}
                  voor functionele onderdelen, outdoor gebruik en hitte.
                </li>
                <li>
                  <Link href="/blog/filament-vrijdag-tpu" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                    TPU
                  </Link>{" "}
                  voor onderdelen die mogen buigen, dempers en verbindingselementen.
                </li>
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Gebruik wanddikte en ribdesign om elk materiaal zijn rol te geven: PLA voor uiterlijk, PETG voor structuur en TPU
                als flexibele insert.
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Heb je een case waar ABS, ASA of nylon relevanter lijkt? We focussen bewust op PLA, PETG en TPU omdat onze
                productie daarop geoptimaliseerd is en we zo kwaliteit kunnen garanderen. Geef het zeker aan tijdens de intake:
                dan bekijken we of een partner-run of hybride aanpak zinvol is en communiceren we eerlijk over planning en kost.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 id="walls-when" className="scroll-mt-28 text-2xl font-semibold text-slate-900">
                10. Wanneer X3DPrints inschakelen?
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                We helpen je graag een ontwerp audit-proof te maken:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                <li>Controle van wanddiktes en nozzle-multiples.</li>
                <li>Ribs herschikken of toevoegen voor torsiestijfheid.</li>
                <li>Materiaaladvies inclusief samples uit onze{" "}
                  <Link href="/materials" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                    materialenbibliotheek
                  </Link>
                  .
                </li>
                <li>Oriëntatie en slicing-notes zodat de print meteen klopt.</li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <ShimmerButton href="/contact?topic=maker-monday-walls">Plan een review</ShimmerButton>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Bekijk pricing & workflow
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section id="walls-sources" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 id="sources" className="text-xl font-semibold text-slate-900">Bronnen en referenties</h2>
              <p className="mt-2 text-sm text-slate-600">
                Meer context? Lees de{" "}
                <Link href={designGuideHref} className="font-semibold text-emerald-600 hover:text-emerald-700">
                  3D print ontwerp gids
                </Link>
                .
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {references.map((reference) => (
                  <li key={reference.href} className="rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3">
                    <cite className="not-italic">
                      <a
                        href={reference.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Ontwerp je een cover, bracket of demper?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Deel STL of STEP, vertel waar het onderdeel voor dient en we koppelen wanddikte, ribdesign en materiaaladvies
                  terug. Zo weet je vóór productie of het stuk PLA, PETG of TPU nodig heeft en wat de{" "}
                  <Link href="/pricing" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                    kostimpact
                  </Link>{" "}
                  wordt.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/contact?topic=maker-monday-walls">Start intake</ShimmerButton>
                <Link href="/3d-printen" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Bekijk knowledge hub
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <BlogFaq title={faq.title} items={faq.items} mainEntityOfPage={canonical} />


      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <BlogAuthorNote locale="nl" />


    </main>
  )
}






