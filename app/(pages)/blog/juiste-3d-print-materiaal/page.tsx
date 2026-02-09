import type { Metadata } from "next"
import Link from "next/link"
import BlogReadMore from "@/components/BlogReadMore"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import { buildArticleJsonLd, buildFaqPageSchema, buildHowToSchema } from "@/lib/seo"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"

const canonical = "https://www.x3dprints.be/blog/juiste-3d-print-materiaal/"
const datePublished = "2024-09-10"
const dateModified = "2026-02-08"
const toolHref = "/materials?utm_source=blog&utm_medium=cta&utm_campaign=juiste-3d-print-materiaal#material-suggestion-tool"
const pricingHref = "/pricing?utm_source=blog&utm_medium=cta&utm_campaign=juiste-3d-print-materiaal"
const contactHref = "/contact?material=petg&quote=Materiaaladvies%20voor%20mijn%203D-printproject"

export const metadata: Metadata = {
  title: "Hoe kies je het juiste 3D print materiaal? | X3DPrints",
  description:
    "Praktische beslisgids voor 3d print materiaal: vergelijk 3d print materialen zoals PLA, PETG en TPU op basis van gebruik, temperatuur en budget.",
  alternates: { canonical },
  openGraph: {
    title: "Juiste 3D print materiaal kiezen",
    description:
      "Gebruik deze gids om snel te beslissen tussen PLA, PETG en TPU, met directe links naar materialen, pricing en contact.",
    url: canonical,
    type: "article",
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "Juiste 3D print materiaal kiezen" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Juiste 3D print materiaal kiezen",
    description: "Stap voor stap beslissen tussen PLA, PETG en TPU.",
    images: ["/Logo.webp"],
  },
}

const decisionFlow = [
  {
    title: "Gebruiksomgeving",
    description:
      "Indoor visuele onderdelen starten vaak met PLA Matte. Outdoor of vochtige omgeving vraagt meestal PETG.",
  },
  {
    title: "Temperatuur en belasting",
    description:
      "Bij hogere hitte, UV of mechanische stress kies je sneller PETG. TPU gebruik je bij flex en impactdemping.",
  },
  {
    title: "Afwerking en uitstraling",
    description:
      "Voor strakke zichtdelen werkt PLA Matte of Silk goed. Voor technische parts primeert sterkte boven look.",
  },
  {
    title: "Budget en lead time",
    description:
      "PLA is vaak het snelst en kostefficentst. PETG en TPU kunnen trager printen en dus een hogere kost geven.",
  },
]

const materialMatrix = [
  {
    material: "PLA Matte",
    bestFor: "Prototypes, visuele modellen, indoor gebruik",
    avoidWhen: "hoge hitte of langdurig outdoor gebruik",
    cta: { href: "/materials/pla-matte", label: "Bekijk PLA Matte" },
  },
  {
    material: "PETG",
    bestFor: "Functionele onderdelen, warmte, outdoor toepassingen",
    avoidWhen: "ultra matte esthetiek belangrijker is dan prestaties",
    cta: { href: "/materials/petg", label: "Bekijk PETG" },
  },
  {
    material: "TPU",
    bestFor: "Flexibele clips, grips, dempers, beschermdelen",
    avoidWhen: "stijfheid en strakke maatvastheid vereist zijn",
    cta: { href: "/materials/tpu", label: "Bekijk TPU" },
  },
]

const scenarios = [
  {
    title: "Auto interieur clip",
    advice: "Start met PETG voor hittebestendigheid en betere slagvastheid dan standaard PLA.",
    links: [
      { href: "/blog/pla-vs-petg", label: "Lees PLA vs PETG" },
      { href: "/contact?material=petg", label: "Vraag PETG advies" },
    ],
  },
  {
    title: "Retail display",
    advice: "Combineer PLA Matte voor basisstructuur met Silk of Marble accenten voor merkimpact.",
    links: [
      { href: "/materials", label: "Open materialenbibliotheek" },
      { href: "/pricing", label: "Bekijk prijsimpact" },
    ],
  },
  {
    title: "Flexibele kabelhouder",
    advice: "Kies TPU als het onderdeel moet plooien en terugveren zonder breuk.",
    links: [
      { href: "/blog/use-cases-tpu", label: "Bekijk TPU use cases" },
      { href: "/materials#material-suggestion-tool", label: "Start Material Suggestion Tool" },
    ],
  },
]

const faqItems = [
  {
    q: "Wat is het veiligste startmateriaal als ik twijfel?",
    a: "Voor veel indoor projecten is PLA Matte de beste baseline. Daarna kan je opschalen naar PETG of TPU.",
  },
  {
    q: "Wanneer is PETG bijna altijd de juiste keuze?",
    a: "Bij outdoor gebruik, hogere temperatuur en onderdelen die dagelijks mechanisch belast worden.",
  },
  {
    q: "Wanneer kies ik TPU in plaats van PETG?",
    a: "Als flexibiliteit, grip of impactdemping belangrijker is dan stijfheid.",
  },
  {
    q: "Kan ik meerdere materialen combineren in een traject?",
    a: "Ja. Veel trajecten starten met PLA voor validatie en schakelen daarna over naar PETG of TPU voor eindgebruik.",
  },
  {
    q: "Hoe weet ik of mijn materiaalkeuze betaalbaar blijft?",
    a: "Gebruik de pricing calculator met verschillende materialen en vraag daarna een offerte met context.",
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
    label: "ISO/ASTM 52900: Additive manufacturing terminology",
    href: "https://www.astm.org/standards/isoastm52900",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "Hoe kies je het juiste 3D print materiaal?",
  description:
    "Beslisgids voor PLA, PETG en TPU met matrix, scenario's en directe links naar materiaaladvies en pricing.",
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
  name: "Juiste 3D print materiaal kiezen in 4 stappen",
  description:
    "Kies snel het juiste filament door omgeving, belasting, afwerking en budget systematisch te evalueren.",
  inLanguage: "nl-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT3M",
  steps: [
    {
      name: "Bepaal gebruiksomgeving",
      text: "Beslis eerst indoor of outdoor en noteer hitte, UV en vochtbelasting.",
    },
    {
      name: "Kies baseline materiaal",
      text: "Start met PLA Matte, PETG of TPU afhankelijk van stijfheid versus flexibiliteit.",
    },
    {
      name: "Controleer prijsimpact",
      url: pricingHref,
    },
    {
      name: "Vraag materiaaladvies met prefill",
      url: contactHref,
    },
  ],
  toolNames: ["Material Suggestion Tool"],
  supplyNames: ["STL of STEP bestand"],
})

export default function RightMaterialGuidePage() {
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
              <li className="font-medium text-slate-700">Juiste 3D print materiaal</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">Material guide</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Hoe kies je het juiste 3D print materiaal?
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Begin met de toepassing, niet met de kleur: zo kies je sneller tussen PLA, PETG en TPU zonder dure herprints.
            Deze gids helpt je 3d print materialen vergelijken en het juiste materiaal voor 3d printen kiezen per use-case.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
            Laatst bijgewerkt: 8 februari 2026
          </p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={toolHref}
              event={{ action: "cta_click", category: "blog_material_top", label: "tool" }}
            >
              Start materiaaladvies
            </ShimmerButton>
            <ShimmerButton
              href={pricingHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_material_top", label: "pricing" }}
            >
              Bekijk prijsimpact
            </ShimmerButton>
            <Link
              href={contactHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              Vraag advies met prefill
            </Link>
          </div>
        </header>

      <BlogContentOverview locale="nl" />

        <section id="materiaal-flow" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Welke vragen beslissen je materiaal?</h2>
              <ol className="mt-4 space-y-3 text-sm text-slate-700">
                {decisionFlow.map((step, index) => (
                  <li key={step.title} className="rounded-2xl border border-slate-200/70 bg-white/80 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Stap {index + 1}</p>
                    <h3 className="mt-1 text-base font-semibold text-slate-900">{step.title}</h3>
                    <p className="mt-1">{step.description}</p>
                  </li>
                ))}
              </ol>
            </GlassCard>
          </Reveal>
        </section>

        <section id="materiaal-matrix" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Welke material match past bij jouw doel?</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-[680px] text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200/70 text-slate-500">
                      <th className="py-2 pr-4 font-semibold">Materiaal</th>
                      <th className="py-2 pr-4 font-semibold">Best voor</th>
                      <th className="py-2 pr-4 font-semibold">Minder geschikt bij</th>
                      <th className="py-2 pr-4 font-semibold">Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materialMatrix.map((row) => (
                      <tr key={row.material} className="border-b border-slate-200/70 last:border-0">
                        <td className="py-2 pr-4 font-medium text-slate-900">{row.material}</td>
                        <td className="py-2 pr-4">{row.bestFor}</td>
                        <td className="py-2 pr-4">{row.avoidWhen}</td>
                        <td className="py-2 pr-4">
                          <Link href={row.cta.href} className="font-semibold text-indigo-600 hover:text-indigo-500">
                            {row.cta.label}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </Reveal>
        </section>

        <section id="materiaal-scenarios" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Wat zijn veelvoorkomende scenario&apos;s?</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {scenarios.map((scenario) => (
                <GlassCard key={scenario.title} className="p-6">
                  <h3 className="text-base font-semibold text-slate-900">{scenario.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{scenario.advice}</p>
                  <div className="mt-3 flex flex-col gap-2">
                    {scenario.links.map((link) => (
                      <Link key={`${scenario.title}-${link.href}`} href={link.href} className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="materiaal-faq" className="scroll-mt-28">
          <Faq title="FAQ over materiaalkeuze" items={faqItems} />
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
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Twijfel je tussen twee materialen?</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Deel je toepassing en bestand, dan krijg je een primaire keuze en backupoptie met prijsimpact.
                </p>
              </div>
              <ShimmerButton
                href={contactHref}
                event={{ action: "cta_click", category: "blog_material_bottom", label: "contact_prefill" }}
              >
                Vraag materiaaladvies
              </ShimmerButton>
            </GlassCard>
          </Reveal>
        </section>
      </article>

      <BlogAuthorNote locale="nl" />


      <BlogReadMore />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
    </main>
  )
}
