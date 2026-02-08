import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import { buildArticleJsonLd } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/blog/use-case-dinsdag-retail-displays/"
const publishedDate = "2025-12-02T08:00:00+01:00"
const dateModified = "2026-02-08"

export const metadata: Metadata = {
  title: "Use Case Dinsdag #2: 3D printen voor retail displays en etalages",
  description:
    "Retail props die onder spots blijven staan vragen andere materialen dan een bureaugadget. Ontdek wanneer PLA, PETG of TPU werken en hoe je ze ontwerpt.",
  alternates: { canonical },
  openGraph: {
    title: "Use Case Dinsdag #2: Retail displays 3D printen",
    description:
      "Toepassing-gebaseerde gids over signage, merchandising props en etalagebouw. Inclusief materiaalkeuze, ontwerpregels en kostoptimalisatie.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: [
      "3D printen retail displays",
      "PLA matte displays",
      "PETG retail",
      "merchandising props",
      "Use Case Dinsdag",
    ],
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "3D geprinte retail displays en etalages" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Use Case Dinsdag: Retail displays 3D printen",
    description:
      "Welke filamenten kies je voor winkelprops? Deze gids bundelt materiaalkeuze, ontwerpregels en realistische toepassingen.",
    images: ["/images/og-home.jpg"],
  },
}

const heroStats = [
  { label: "Beste allrounder", value: "PETG Matte", detail: "Hittebestendig en kleurecht" },
  { label: "Premium look", value: "PLA Silk/Marble", detail: "Indoor, lage last" },
  { label: "Flex & grip", value: "TPU 95A", detail: "Anti-ratel en soft-touch" },
]

const materialTable = [
  { material: "PLA Matte", pros: "Strakke kleuren, snel printbaar", cons: "Verzacht onder spots, enkel decor" },
  { material: "PETG Solid/Matte", pros: "Taai, hittebestendig, translucent mogelijk", cons: "Stringing vraagt slicing zorg" },
  {
    material: "PLA Silk/Marble/Wood",
    pros: "Luxe textures zonder hoge kost",
    cons: "Binnen gebruik, geen draaglast",
  },
  { material: "TPU", pros: "Grip en demping", cons: "Minder scherpe details" },
]

const useCases = [
  { title: "Product stands en houders", filament: "PETG Solid of PETG Matte", reason: "Stabiel, hittebestendig" },
  { title: "Letters en 3D logo's", filament: "PLA Matte of PLA Marble", reason: "Visueel top, geen krachten" },
  { title: "Lichtgevende displays", filament: "PETG Translucent", reason: "Diffuus licht zonder breken" },
  { title: "Hooks en modulair wandelementen", filament: "PETG of PETG CF", reason: "Kan last dragen" },
  { title: "Cosplay props/mannequins", filament: "PLA Silk, Marble, Matte", reason: "Textures en kleuren scoren" },
]

const designChecklist = [
  {
    title: "Wanddiktes",
    detail: "PLA Matte 1.6-2.0 mm, PETG 2.4-2.8 mm, Silk shells 1.6 mm min. Zie Maker Monday #2.",
  },
  {
    title: "Toleranties",
    detail: "PLA +0.15 mm, PETG +0.25 mm, TPU +0.40 mm voor klikdelen. Zie Maker Monday #3.",
  },
  {
    title: "Bevestiging",
    detail: "Verborgen nokken, sleuven of inserts. Vermijd zichtbare schroeven. Zie Maker Monday #5.",
  },
  {
    title: "Temperatuur",
    detail: "Brede bases en chamfers tegen warping. Zie Maker Monday #6.",
  },
  {
    title: "Kleurconsistentie",
    detail: "Kies filamentkleur i.p.v. lak. PLA Matte is het meest voorspelbaar, Silk toont slicerfouten.",
  },
]

const costTips = [
  "Print shell-only (2 perimeters, 0 infill) met interne ribs voor holle props.",
  "Kies filamentkleur i.p.v. lakwerk om arbeid en schade tijdens transport te vermijden. Zie Finishing Friday.",
  "Combineer materialen: PETG structuur + PLA Marble frontpanelen voor luxe look zonder CF budget.",
  "Batch prints per kleur om spoolwissels te beperken en consistentie te behouden.",
]

const mistakes = [
  "PLA onder spots gebruiken waardoor props binnen een week krom staan.",
  "Te dunne wanden waardoor ventilatie of bezoekersvibraties prints laten trillen.",
  "Geen tolerantie voorzien zodat letters of kappen niet mooi aansluiten.",
  "Gigantische props in een stuk vervoeren i.p.v. segmenteren met alignment pins.",
]

const lastUpdatedLabel = "Laatst bijgewerkt: 8 februari 2026"

const tocItems = [
  { id: "retail-materials", label: "Materialen onder spots" },
  { id: "retail-matrix", label: "Materiaalvergelijking" },
  { id: "retail-use-cases", label: "Use-cases" },
  { id: "retail-design", label: "Ontwerpregels" },
  { id: "retail-cost", label: "Kosten en fouten" },
  { id: "retail-when", label: "Wanneer X3DPrints helpt" },
  { id: "retail-sources", label: "Bronnen en referenties" },
]

const references = [
  { label: "Ultimaker: Design for FFF 3D printing", href: "https://ultimaker.com/learn/design-for-fff-3d-printing/" },
  { label: "Prusa: Material guide (PLA, PETG, TPU)", href: "https://help.prusa3d.com/filament-material-guide" },
  { label: "ISO/ASTM 52900: Additive manufacturing terminology", href: "https://www.astm.org/standards/isoastm52900" },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "Use Case Dinsdag #2: 3D printen voor retail displays en etalages",
  description: metadata.description ?? "",
  datePublished: publishedDate,
  dateModified,
  image: "https://www.x3dprints.be/images/og-home.jpg",
})

function SectionDivider() {
  return (
    <div className="mx-auto my-12 flex w-full max-w-4xl items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-500">
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-indigo-300/0 via-indigo-300/60 to-indigo-300/0" />
      <span>Use Case Dinsdag</span>
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-indigo-300/0 via-indigo-300/60 to-indigo-300/0" />
    </div>
  )
}

export default function UseCaseDinsdagRetailDisplaysPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(180%_90%_at_50%_-20%,rgba(59,130,246,0.14),transparent_75%)]"
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
                <li className="font-medium text-slate-700">Use Case Dinsdag</li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-900">Retail displays</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Use Case Dinsdag #2</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              3D printen voor retail displays en etalages: sterke, esthetische en lichtbestendige props.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Etalages zijn theater. Alles moet consistent zijn, wekenlang mooi blijven onder spots en toch betaalbaar blijven. 3D
              printing levert snelheid en maatwerk, maar alleen als je de juiste materialen en ontwerpregels hanteert.
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <ContentTableOfContents title="Inhoud" items={tocItems} className="max-w-2xl" />
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/contact?topic=use-case-retail">Vraag retail-advies</ShimmerButton>
              <Link
                href="/materials"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Materialenoverzicht
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Pricing & lead times
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">Gepubliceerd op 2 december 2025 - Use Case Dinsdag.</p>
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

      <section id="retail-materials" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">1. PLA onder spotlights = risico</h2>
              <p className="mt-2 text-sm text-slate-600">
                PLA Matte oogt premium, maar halogeen- of high-CRI LED spots warmen sneller op dan klanten beseffen. Boven 55-60
                degC wordt PLA rubberachtig, verliest vlakheid en verkleurt. Gebruik PLA uitsluitend voor props zonder directe
                spot of warmte.
              </p>
              <Link
                href="/blog/filament-vrijdag-pla"
                className="mt-3 inline-flex items-center text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
              >
                Lees PLA materiaalblog
                <span aria-hidden className="ml-2">-&gt;</span>
              </Link>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">2. PETG: de retail werkpaard</h2>
              <p className="mt-2 text-sm text-slate-600">
                PETG is hitteresistent, taai en kleurecht. Het vangt transport en handling beter op dan PLA en is beschikbaar als
                Solid, Matte en Translucent.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                <li>Signage displays en letterprofielen</li>
                <li>Product shelves, houders en stands</li>
                <li>Winkelwand accessoires die items dragen</li>
                <li>Etalage props onder spots of in vitrines</li>
              </ul>
              <Link
                href="/blog/filament-vrijdag-petg"
                className="mt-3 inline-flex items-center text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
              >
                Lees PETG materiaalblog
                <span aria-hidden className="ml-2">-&gt;</span>
              </Link>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="retail-matrix" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">3. PLA Silk, Marble, Wood en TPU</h2>
              <p className="mt-2 text-sm text-slate-600">
                Speciale PLA blends geven luxe textures zonder dure spuitgietmallen. TPU biedt grip en anti-ratel functionaliteit.
                Gebruik ze slim:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                <li>
                  <Link href="/blog/filament-vrijdag-pla-silk-plus" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                    PLA Silk
                  </Link>{" "}
                  voor luxe props, kerstetalages en gift displays.
                </li>
                <li>
                  <Link href="/blog/filament-vrijdag-pla-marble" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                    PLA Marble
                  </Link>{" "}
                  voor steenachtige look in juweliers of interior corners.
                </li>
                <li>
                  <Link href="/blog/filament-vrijdag-pla-wood" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                    PLA Wood
                  </Link>{" "}
                  voor warme, natuurlijke merchandising.
                </li>
                <li>
                  <Link href="/blog/filament-vrijdag-tpu" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                    TPU
                  </Link>{" "}
                  voor non-slip voeten, dempers en zachte klemzones.
                </li>
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Let erop dat deze PLA varianten geen draaglast krijgen en uit directe spotlicht blijven.
              </p>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">4. Materiaalvergelijking</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-slate-500">
                      <th className="py-2 pr-4">Materiaal</th>
                      <th className="py-2 pr-4">Pluspunten</th>
                      <th className="py-2 pr-4">Beperkingen</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {materialTable.map((row) => (
                      <tr key={row.material}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{row.material}</td>
                        <td className="py-3 pr-4">{row.pros}</td>
                        <td className="py-3 pr-4">{row.cons}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="retail-use-cases" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          {useCases.map((item) => (
            <Reveal key={item.title}>
              <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
                <h2 className="text-2xl font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-2 text-sm text-slate-600">
                  <span className="font-semibold">Beste keuze:</span> {item.filament}
                </p>
                <p className="mt-1 text-sm text-slate-600">{item.reason}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="retail-design" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">5. Ontwerpregels voor retail prints</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {designChecklist.map((item) => (
                  <li key={item.title} className="rounded-2xl border border-slate-100 bg-white/70 p-3">
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-1">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="retail-cost" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">6. Kosten onder controle houden</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                {costTips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
              <Link
                href="/blog/finishing-friday-schuren-primen-lakken"
                className="mt-3 inline-flex items-center text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
              >
                Lees Finishing Friday
                <span aria-hidden className="ml-2">-&gt;</span>
              </Link>
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">7. Veelgemaakte fouten</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                {mistakes.map((mistake) => (
                  <li key={mistake}>{mistake}</li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="retail-when" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">8. Wanneer X3DPrints inschakelen?</h2>
              <p className="mt-2 text-sm text-slate-600">
                Schakel ons in wanneer je prototypes wilt omzetten naar finale displaystukken, speciale textures wilt combineren of
                lastdragende houders nodig hebt. Typische scenario&apos;s:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                <li>Snelle iteraties voor seizoenscampagnes of pop-up stores.</li>
                <li>Matching van merk Pantones met PLA Matte of PETG.</li>
                <li>Combinaties van PETG structuur en PLA Marble front.</li>
                <li>TPU anti-ratel elementen voor bewegende onderdelen.</li>
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Wij leveren PLA Matte/Marble/Wood/Silk, PETG Solid/Matte/Translucent en TPU 95A. Pricing vind je via{" "}
                <Link href="/pricing" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                  pricing
                </Link>{" "}
                en het volledige overzicht via{" "}
                <Link href="/materials" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                  materials
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="retail-sources" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
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
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Retail props printen zonder stress?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Deel je STL of STEP, vermeld materiaal en spotcondities en we koppelen terug met ontwerpadvies, planning en kost.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/contact?topic=use-case-retail">Start intake</ShimmerButton>
                <Link href="/viewer" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Upload via viewer
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








