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

const canonical = "https://www.x3dprints.be/blog/3d-print-materialen-gids/"
const datePublished = "2026-02-09"
const dateModified = "2026-02-09"
const materialsHref =
  "/materials?utm_source=blog&utm_medium=cta&utm_campaign=materialen-gids#material-suggestion-tool"
const pricingHref = "/pricing?utm_source=blog&utm_medium=cta&utm_campaign=materialen-gids"
const contactHref =
  "/contact?material=pla-matte&quote=Materiaaladvies%20voor%20mijn%203D%20print"

export const metadata: Metadata = {
  title: "3D print materialen gids 2026: PLA, PETG & TPU | X3DPrints",
  description:
    "Volledige 3D print materialen gids: vergelijk PLA, PETG, TPU en PC met een matrix, tips per use case en directe links naar de materiaaltool.",
  alternates: { canonical },
  openGraph: {
    title: "3D print materialen gids 2026",
    description:
      "Matrix met materiaalkeuze, sterkte en hittebestendigheid plus snelle beslisregels voor jouw project.",
    url: canonical,
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "3D print materialen gids" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D print materialen gids 2026",
    description: "Materialenmatrix, use cases en beslisregels voor 3D prints.",
    images: ["/Logo.webp"],
  },
}

const decisionSteps = [
  {
    title: "Bepaal de functie",
    description:
      "Is het een zichtwerk-prop, functioneel onderdeel of flexibel component? Dat bepaalt de baseline.",
  },
  {
    title: "Check temperatuur & omgeving",
    description:
      "Outdoor, warmte of chemicaliën? PETG of PC kan nodig zijn. Binnen en decoratief blijft PLA vaak ideaal.",
  },
  {
    title: "Kies afwerking en look",
    description:
      "Silk, Marble of Matte voor premium look; standaard PLA voor snelle, betaalbare productie.",
  },
]

const materialRows = [
  {
    material: "PLA Matte",
    strength: "Stijf, strak zichtwerk",
    heat: "Tot ~55°C",
    bestFor: "Branding, interieur, prototypes",
  },
  {
    material: "PETG",
    strength: "Taai, chemisch resistent",
    heat: "Tot ~80°C",
    bestFor: "Functioneel, outdoor, behuizingen",
  },
  {
    material: "TPU 95A",
    strength: "Flexibel, schokabsorberend",
    heat: "Tot ~70°C",
    bestFor: "Grips, bumpers, dempers",
  },
  {
    material: "PC / PC FR",
    strength: "Stijf, hittebestendig",
    heat: "Tot ~110°C",
    bestFor: "High-temp en safety parts",
  },
]

const finishTips = [
  "PLA Matte levert een premium look zonder extra finishing.",
  "Silk en Marble zijn ideaal voor showpieces en awards.",
  "PETG en TPU vereisen vaak minder esthetische perfectie, maar winnen op duurzaamheid.",
  "Gebruik kleurstalen bij grotere oplages om merkconsistentie te bewaken.",
]

const segmentHighlights = [
  {
    title: "Marketing & events",
    description:
      "Zichtwerk in PLA Matte, Silk of Marble met consistente kleur en finish.",
    href: "/segments/3d-printing-marketing",
    label: "Bekijk marketing segment",
  },
  {
    title: "Prototypes & engineering",
    description:
      "PETG en PC voor functionele tests en hogere temperatuurbelasting.",
    href: "/segments/3d-printing-prototypes",
    label: "Bekijk prototype segment",
  },
  {
    title: "Tabletop & retail",
    description:
      "Detailwerk en duurzame props met PLA Matte, PETG of TPU.",
    href: "/segments/3d-printing-tabletop",
    label: "Bekijk tabletop segment",
  },
]

const faqItems = [
  {
    q: "Welke materialen houden jullie standaard op voorraad?",
    a: "PLA Matte, PETG en TPU zijn onze standaardbasis. Specials zoals Silk, Marble en PC plannen we in op aanvraag.",
  },
  {
    q: "Is PETG altijd beter dan PLA?",
    a: "Nee. PLA blijft het beste voor snel, strak zichtwerk. PETG kies je bij hogere hitte of impact.",
  },
  {
    q: "Kan ik één project in meerdere materialen combineren?",
    a: "Ja. Hybride prints (PLA shell + PETG kern of TPU inserts) geven vaak de beste mix van look en functionaliteit.",
  },
  {
    q: "Hoe snel kan ik materiaaladvies krijgen?",
    a: "Meestal binnen één werkdag na ontvangst van je toepassing en bestand.",
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
    label: "Bambu Lab material guide",
    href: "https://wiki.bambulab.com/en/filament",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "3D print materialen gids 2026",
  description:
    "Matrix en beslisregels voor PLA, PETG, TPU en PC met snelle materiaalkeuze per projecttype.",
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
  name: "Materiaalkeuze maken in 4 stappen",
  description: "Maak een snelle materiaalkeuze op basis van functie, omgeving en afwerking.",
  inLanguage: "nl-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT4M",
  steps: [
    {
      name: "Definieer de use case",
      text: "Noteer of het om zichtwerk, functioneel gebruik of flexibiliteit draait.",
    },
    {
      name: "Vergelijk materialen",
      url: materialsHref,
    },
    {
      name: "Check prijsimpact",
      url: pricingHref,
    },
    {
      name: "Vraag materiaaladvies",
      url: contactHref,
    },
  ],
  toolNames: ["Material Suggestion Tool", "Pricing calculator"],
  supplyNames: ["STL of STEP bestand"],
})

export default function BlogMaterialsGuidePage() {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-16 sm:px-8 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_0%,rgba(59,130,246,.18),transparent_70%)]"
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
              <li className="font-medium text-slate-700">3D print materialen gids</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">Materials pillar</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            3D print materialen gids: kies PLA, PETG of TPU met vertrouwen
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Kies je materiaal op basis van sterkte, temperatuur en finish: PLA voor strak zichtwerk, PETG voor functioneel
            gebruik en TPU voor flex. Deze gids geeft je een matrix, use cases en adviesflow.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
            Laatst bijgewerkt: 9 februari 2026
          </p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={materialsHref}
              event={{ action: "cta_click", category: "blog_materialen_gids_top", label: "materials_tool" }}
            >
              Start materiaaltool
            </ShimmerButton>
            <ShimmerButton
              href={pricingHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_materialen_gids_top", label: "pricing" }}
            >
              Bekijk prijsimpact
            </ShimmerButton>
            <Link
              href={contactHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              Vraag materiaaladvies
            </Link>
          </div>
        </header>

        <BlogContentOverview locale="nl" />

        <section id="materiaal-keuzes" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Materialen kiezen in 3 stappen</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {decisionSteps.map((step) => (
                <GlassCard key={step.title} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{step.description}</p>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="materiaal-matrix" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Materialenmatrix: wat kies je wanneer?</h2>
              <p className="mt-2 text-sm text-slate-600">
                Gebruik deze matrix als snelle shortlist. Specifieke blends bespreken we in de intake.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-[760px] text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200/70 text-slate-500">
                      <th className="py-2 pr-4 font-semibold">Materiaal</th>
                      <th className="py-2 pr-4 font-semibold">Sterkte & feel</th>
                      <th className="py-2 pr-4 font-semibold">Hitte/UV</th>
                      <th className="py-2 pr-4 font-semibold">Beste voor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materialRows.map((row) => (
                      <tr key={row.material} className="border-b border-slate-200/70 last:border-0">
                        <td className="py-2 pr-4 font-medium text-slate-900">{row.material}</td>
                        <td className="py-2 pr-4">{row.strength}</td>
                        <td className="py-2 pr-4">{row.heat}</td>
                        <td className="py-2 pr-4">{row.bestFor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Meer detail? Bekijk het{" "}
                <Link href="/materials" className="font-semibold text-emerald-600 hover:text-emerald-700">
                  materialenoverzicht
                </Link>{" "}
                of start de Material Suggestion Tool.
              </p>
            </GlassCard>
          </Reveal>
        </section>

        <section id="materiaal-finish" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Afwerking en look: zo maak je keuzes</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {finishTips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <ShimmerButton
                  href={materialsHref}
                  event={{ action: "cta_click", category: "blog_materialen_gids_mid", label: "materials_tool" }}
                >
                  Start materiaaltool
                </ShimmerButton>
                <ShimmerButton
                  href={contactHref}
                  className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                  event={{ action: "cta_click", category: "blog_materialen_gids_mid", label: "contact_prefill" }}
                >
                  Vraag advies
                </ShimmerButton>
              </div>
            </GlassCard>
          </Reveal>
        </section>

        <section id="materiaal-segmenten" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Materialen per segment</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {segmentHighlights.map((segment) => (
                <GlassCard key={segment.title} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{segment.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{segment.description}</p>
                  <Link
                    href={segment.href}
                    className="mt-3 inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    {segment.label}
                  </Link>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="materiaal-faq" className="scroll-mt-28">
          <Faq title="FAQ over 3D print materialen" items={faqItems} />
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
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Klaar om het juiste materiaal te kiezen?</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Deel je toepassing en deadline, dan geven we advies op maat met prijsimpact.
                </p>
              </div>
              <ShimmerButton
                href={contactHref}
                event={{ action: "cta_click", category: "blog_materialen_gids_bottom", label: "contact_prefill" }}
              >
                Start materiaaladvies
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
