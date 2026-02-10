import type { Metadata } from "next"
import Link from "next/link"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import ReadMoreLinks from "@/components/ReadMoreLinks"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import { buildArticleJsonLd, buildFaqPageSchema, buildHowToSchema } from "@/lib/seo"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"

const canonical = "https://www.x3dprints.be/blog/sterke-3d-print-materialen/"
const datePublished = "2026-02-08"
const dateModified = "2026-02-09"
const materialsHref =
  "/materials?utm_source=blog&utm_medium=cta&utm_campaign=sterke-3d-print-materialen#material-suggestion-tool"
const pricingHref = "/pricing?utm_source=blog&utm_medium=cta&utm_campaign=sterke-3d-print-materialen"
const viewerHref = "/viewer?utm_source=blog&utm_medium=cta&utm_campaign=sterke-3d-print-materialen"
const contactHref =
  "/contact?material=pla-tough&quote=Materiaaladvies%20voor%20functionele%203D%20prints"
const materialsGuideHref =
  "/blog/3d-print-materialen-gids?utm_source=blog&utm_medium=internal&utm_campaign=sterke-3d-print-materialen"

export const metadata: Metadata = {
  title: "Sterke 3D prints: materiaalkeuze voor gebruik | X3DPrints",
  description:
    "Functionele 3D print? Vergelijk PLA Tough+, PETG, TPU en PC op sterkte, hitte en flexibiliteit. Inclusief beslisregels, tabel en snelle CTA's.",
  alternates: { canonical },
  openGraph: {
    title: "Sterke 3D prints: materiaalkeuze voor gebruik",
    description:
      "Vergelijk PLA Tough+, PETG, TPU en PC voor functionele onderdelen met beslisregels en snelle CTA's.",
    url: canonical,
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "Sterke 3D print materialen" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sterke 3D prints: materiaalkeuze voor gebruik",
    description: "Materiaalkeuze voor functionele 3D onderdelen in één overzicht.",
    images: ["/Logo.webp"],
  },
}

const criteriaCards = [
  {
    title: "Belasting & impact",
    description:
      "Klemmen en brackets vragen stijfheid, terwijl bumpers en grips juist impact moeten opnemen.",
  },
  {
    title: "Temperatuur & omgeving",
    description:
      "Binnen vs buiten maakt verschil. Warmte, UV en vocht duwen je richting PETG of PC.",
  },
  {
    title: "Flexibiliteit",
    description:
      "Moet het onderdeel meegeven? Dan is TPU of een hybride ontwerp (PLA + TPU) logischer.",
  },
  {
    title: "Finish & maatvastheid",
    description:
      "Functioneel hoeft niet ruw te zijn: PLA Tough+ en PETG geven strakke details zonder nabewerking.",
  },
]

const matrixRows = [
  {
    material: "PLA Tough+",
    strength: "Hoog (stijf)",
    flex: "Middel (slagvast)",
    heat: "Laag-middel (binnen)",
    bestFor: "Klemmen, covers, technische prototypes",
    href: "/materials/pla-tough",
  },
  {
    material: "PETG",
    strength: "Hoog",
    flex: "Middel (licht flexibel)",
    heat: "Middel (outdoor)",
    bestFor: "Behuizingen, outdoor onderdelen, fixtures",
    href: "/materials/petg",
  },
  {
    material: "TPU",
    strength: "Laag (flexibel)",
    flex: "Hoog (demping)",
    heat: "Middel",
    bestFor: "Grips, bumpers, dempers",
    href: "/materials/tpu",
  },
  {
    material: "PC",
    strength: "Zeer hoog",
    flex: "Middel",
    heat: "Hoog (hitte/UV)",
    bestFor: "Machinecovers, brackets, high-temp use",
    href: "/materials/pc",
  },
]

const scenarios = [
  {
    title: "Mechanische klem of bracket",
    description:
      "Start met PLA Tough+ voor een stijve vorm. Voor buitengebruik schakel je door naar PETG of PC.",
  },
  {
    title: "Behuizing voor elektronica",
    description:
      "PETG is de veilige keuze voor impact en hitte. Bij hoge temperaturen of UV: PC.",
  },
  {
    title: "Flexibele demper of grip",
    description:
      "TPU is ideaal voor shock-absorptie. Combineer met een PLA cover voor vormvastheid.",
  },
]

const faqItems = [
  {
    q: "Is PLA Tough+ sterk genoeg voor functionele onderdelen?",
    a: "Voor indoor klemmen, covers en prototypes is PLA Tough+ meestal voldoende. Voor buitengebruik of hitte kies je PETG of PC.",
  },
  {
    q: "Wanneer kies je PETG boven PLA Tough+?",
    a: "PETG is beter bij UV, vocht of wanneer het onderdeel licht flexibel mag zijn. Het blijft langer maatvast in warmere omgevingen.",
  },
  {
    q: "Is TPU geschikt voor dragende onderdelen?",
    a: "TPU is vooral geschikt voor demping, grips en bescherming. Voor dragende delen combineer je TPU met een stijver materiaal.",
  },
  {
    q: "Wat is het voordeel van PC?",
    a: "PC kan hogere temperaturen aan en blijft stijf onder belasting, ideaal voor machinecovers of onderdelen dicht bij warmtebronnen.",
  },
]

const references = [
  {
    label: "Prusa material guide (PLA, PETG, TPU)",
    href: "https://help.prusa3d.com/filament-material-guide",
  },
  {
    label: "Ultimaker: Design for FFF 3D printing",
    href: "https://ultimaker.com/learn/design-for-fff-3d-printing/",
  },
  {
    label: "Bambu Studio documentation",
    href: "https://wiki.bambulab.com/en/software/bambu-studio",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "Sterke 3D prints: materiaalkeuze voor functionele onderdelen",
  description:
    "Vergelijk PLA Tough+, PETG, TPU en PC voor functionele onderdelen met beslisregels en scenario's.",
  datePublished,
  dateModified,
  image: "/Logo.webp",
  inLanguage: "nl-BE",
})

const faqJsonLd = buildFaqPageSchema({
  inLanguage: "nl-BE",
  mainEntityOfPage: canonical,
  items: faqItems.map((item) => ({ q: item.q, a: item.a })),
})

const howToJsonLd = buildHowToSchema({
  name: "Materiaal kiezen voor sterke 3D prints",
  description: "Kies snel het juiste 3D print materiaal op basis van belasting, omgeving en flexibiliteit.",
  inLanguage: "nl-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT4M",
  steps: [
    {
      name: "Bepaal de belasting",
      text: "Noteer of het onderdeel stijf moet zijn of juist impact moet opvangen.",
    },
    {
      name: "Check omgeving en temperatuur",
      text: "Binnen, buiten of nabij warmte? Dit bepaalt of PETG of PC nodig is.",
    },
    {
      name: "Kies materiaal met de matrix",
      url: materialsHref,
    },
    {
      name: "Vraag offerte of advies",
      url: contactHref,
    },
  ],
  toolNames: ["Material Suggestion Tool", "Pricing calculator"],
  supplyNames: ["STL of STEP bestand"],
})

export default function BlogStrongMaterialsPage() {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-16 sm:px-8 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_0%,rgba(34,197,94,.18),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.08]" />

      <article className="mx-auto max-w-5xl space-y-10">
        <header className="space-y-4">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link href="/blog" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Blog
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="font-medium text-slate-700">Sterke 3D print materialen</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">Materials guide</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Sterke 3D prints: materiaalkeuze voor functionele onderdelen
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Het korte antwoord: PLA Tough+ is het startpunt voor stijve functionele onderdelen, PETG is de veilige keuze
            voor outdoor en TPU is ideaal voor demping. Voor extreme hitte of UV kies je PC. Gebruik deze matrix om snel
            te beslissen en plan je offerte zonder gedoe.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
            Laatst bijgewerkt: 9 februari 2026
          </p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={materialsHref}
              event={{ action: "cta_click", category: "blog_strong_materials_top", label: "materials_tool" }}
            >
              Kies materiaal
            </ShimmerButton>
            <ShimmerButton
              href={pricingHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_strong_materials_top", label: "pricing" }}
            >
              Check pricing
            </ShimmerButton>
            <Link
              href={viewerHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              Upload je model
            </Link>
          </div>
        </header>

        <BlogContentOverview locale="nl" />

        <section id="materiaal-criteria" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Welke criteria bepalen sterkte?</h2>
            <p className="mt-2 text-sm text-slate-600">
              Gebruik deze vier checks om te bepalen welk materiaal je nodig hebt voor functionele 3D prints.
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {criteriaCards.map((card) => (
                <GlassCard key={card.title} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{card.description}</p>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="materiaal-matrix" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Vergelijkingstabel voor sterke prints</h2>
              <p className="mt-2 text-sm text-slate-600">
                Focus op sterkte, flexibiliteit en omgeving. Gebruik de materiaalpagina&apos;s voor details.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-[720px] text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200/70 text-slate-500">
                      <th className="py-2 pr-4 font-semibold">Materiaal</th>
                      <th className="py-2 pr-4 font-semibold">Sterkte</th>
                      <th className="py-2 pr-4 font-semibold">Flex</th>
                      <th className="py-2 pr-4 font-semibold">Hitte/UV</th>
                      <th className="py-2 pr-4 font-semibold">Beste voor</th>
                      <th className="py-2 pr-4 font-semibold">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matrixRows.map((row) => (
                      <tr key={row.material} className="border-b border-slate-200/70 last:border-0">
                        <td className="py-2 pr-4 font-medium text-slate-900">{row.material}</td>
                        <td className="py-2 pr-4">{row.strength}</td>
                        <td className="py-2 pr-4">{row.flex}</td>
                        <td className="py-2 pr-4">{row.heat}</td>
                        <td className="py-2 pr-4">{row.bestFor}</td>
                        <td className="py-2 pr-4">
                          <Link href={row.href} className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Bekijk
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Twijfel je? Gebruik de{" "}
                <Link href={materialsHref} className="font-semibold text-emerald-600 hover:text-emerald-700">
                  Material Suggestion Tool
                </Link>{" "}
                voor gericht advies.
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Meer context? Lees de{" "}
                <Link href={materialsGuideHref} className="font-semibold text-emerald-600 hover:text-emerald-700">
                  3D print materialen gids
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>
        </section>

        <section id="materiaal-scenarios" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Scenario&apos;s voor functionele onderdelen</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {scenarios.map((scenario) => (
                  <div key={scenario.title} className="rounded-2xl border border-slate-200/70 bg-white/80 p-4">
                    <h3 className="text-lg font-semibold text-slate-900">{scenario.title}</h3>
                    <p className="mt-2 text-sm text-slate-700">{scenario.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <ShimmerButton
                  href={viewerHref}
                  event={{ action: "cta_click", category: "blog_strong_materials_mid", label: "viewer" }}
                >
                  Upload bestand
                </ShimmerButton>
                <ShimmerButton
                  href={contactHref}
                  className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                  event={{ action: "cta_click", category: "blog_strong_materials_mid", label: "contact_prefill" }}
                >
                  Vraag materiaaladvies
                </ShimmerButton>
              </div>
            </GlassCard>
          </Reveal>
        </section>

        <section id="materiaal-faq" className="scroll-mt-28">
          <Faq title="FAQ over sterke 3D prints" items={faqItems} />
        </section>

        <section id="materiaal-sources" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 id="sources" className="text-2xl font-semibold text-slate-900">Bronnen en referenties</h2>
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
        </section>

        <section>
          <Reveal>
            <GlassCard className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Volgende stap</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Klaar om je materiaal te kiezen?</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Deel je toepassing en ontvang een duidelijke materiaalkeuze met prijsindicatie.
                </p>
              </div>
              <ShimmerButton
                href={contactHref}
                event={{ action: "cta_click", category: "blog_strong_materials_bottom", label: "contact_prefill" }}
              >
                Start advies
              </ShimmerButton>
            </GlassCard>
          </Reveal>
        </section>
      </article>

      <ReadMoreLinks pageType="materials" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <BlogAuthorNote locale="nl" />
    </main>
  )
}
