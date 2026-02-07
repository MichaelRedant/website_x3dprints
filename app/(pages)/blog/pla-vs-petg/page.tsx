import type { Metadata } from "next"
import Link from "next/link"
import BlogReadMore from "@/components/BlogReadMore"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import { buildArticleJsonLd, buildFaqPageSchema, buildHowToSchema } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/blog/pla-vs-petg/"
const enCanonical = "https://www.x3dprints.be/en/blog/pla-vs-petg/"
const datePublished = "2024-08-25"
const dateModified = "2026-02-07"
const contactHref = "/contact?material=pla-matte&quote=Advies%20PLA%20vs%20PETG%20voor%20mijn%20project"
const materialsHref = "/materials#material-suggestion-tool"
const pricingHref = "/pricing?utm_source=blog&utm_medium=cta&utm_campaign=pla-vs-petg"

export const metadata: Metadata = {
  title: "PLA vs PETG: welk materiaal kies je? | X3DPrints",
  description:
    "Vergelijk PLA en PETG op afwerking, sterkte, hittebestendigheid en kost zodat je sneller het juiste materiaal kiest.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": canonical,
      "en-BE": enCanonical,
      "x-default": canonical,
    },
  },
  openGraph: {
    title: "PLA vs PETG: welk materiaal kies je?",
    description:
      "Praktische vergelijking met gebruiksscenario's, materiaalmatrix en snelle beslisregels.",
    url: canonical,
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "PLA vs PETG vergelijking" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "PLA vs PETG: welk materiaal kies je?",
    description: "Materialengids met duidelijke keuzehulp voor jouw 3D print.",
    images: ["/Logo.webp"],
  },
}

const tocItems = [
  { id: "material-difference", label: "Wat is het verschil tussen PLA en PETG?" },
  { id: "material-matrix", label: "Welke matrix helpt bij snelle keuze?" },
  { id: "material-use-cases", label: "Wanneer kies je welk materiaal?" },
  { id: "material-faq", label: "FAQ over PLA en PETG" },
  { id: "material-sources", label: "Bronnen en referenties" },
]

const compareCards = [
  {
    title: "Look en afwerking",
    pla: "PLA heeft veel varianten zoals matte, silk en marble. Sterk voor visuele toepassingen.",
    petg: "PETG heeft meestal een gladdere glans en is handig wanneer uiterlijk en robuustheid samen moeten.",
  },
  {
    title: "Temperatuur en omgeving",
    pla: "PLA is prima voor indoor gebruik zonder hoge hittebelasting.",
    petg: "PETG presteert beter bij warmte, vocht en meer intensief gebruik.",
  },
  {
    title: "Mechanische belasting",
    pla: "PLA is stijver en vaak makkelijker voor strakke prototypes.",
    petg: "PETG is taaier en beter voor clips, houders en functionele onderdelen.",
  },
]

const comparisonRows = [
  { property: "Detail en visuele kwaliteit", pla: "Zeer sterk", petg: "Goed" },
  { property: "Slagvastheid", pla: "Gemiddeld", petg: "Hoog" },
  { property: "Hittebestendigheid", pla: "Lager", petg: "Hoger" },
  { property: "Outdoor geschiktheid", pla: "Beperkt", petg: "Sterker" },
  { property: "Printgemak", pla: "Zeer toegankelijk", petg: "Iets meer tuning nodig" },
  { property: "Kost", pla: "Baseline", petg: "Meestal hoger" },
]

const useCases = {
  pla: [
    "Visuele prototypes en presentatiemodellen",
    "Decoratieve onderdelen met hoge detailfocus",
    "Indoor onderdelen met beperkte mechanische stress",
  ],
  petg: [
    "Functionele onderdelen met hogere belasting",
    "Onderdelen voor warmere of vochtigere omgeving",
    "Clips, klemmen en brackets met langere levensduur",
  ],
}

const faqItems = [
  {
    q: "Kan ik PLA en PETG combineren in 1 project?",
    a: "Ja, dat kan. Vaak is PLA geschikt voor zichtdelen en PETG voor functionele delen.",
  },
  {
    q: "Wanneer is PETG de meerprijs waard?",
    a: "Voor onderdelen met warmte, impact of intensief gebruik geeft PETG meestal meer betrouwbaarheid.",
  },
  {
    q: "Hoe kies ik snel tussen deze materialen?",
    a: "Start met functie, belasting en omgeving. Gebruik daarna de material tool en vraag advies op je exacte model.",
  },
]

const references = [
  {
    label: "Prusa material guide (PLA, PETG, TPU)",
    href: "https://help.prusa3d.com/article/material-guide_220",
  },
  {
    label: "All3DP FDM process explainer",
    href: "https://all3dp.com/2/fdm-3d-printing-explained/",
  },
  {
    label: "Google Search docs: crawlable links",
    href: "https://developers.google.com/search/docs/crawling-indexing/links-crawlable",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "PLA vs PETG: welk materiaal kies je?",
  description:
    "Praktische vergelijking van PLA en PETG voor esthetiek, sterkte, hitte en kost.",
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
  name: "PLA vs PETG kiezen in 4 stappen",
  description:
    "Bepaal snel of PLA of PETG beter past via toepassing, omgeving, budget en materiaalsimulatie.",
  inLanguage: "nl-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT3M",
  steps: [
    {
      name: "Gebruikssituatie bepalen",
      text: "Check of je focus op uiterlijk, sterkte of hittebestendigheid ligt.",
    },
    {
      name: "Materiaalmatrix doorlopen",
      text: "Vergelijk PLA en PETG op detail, belasting en omgeving.",
    },
    {
      name: "Prijsimpact bekijken",
      url: pricingHref,
    },
    {
      name: "Advies met prefill aanvragen",
      url: contactHref,
    },
  ],
  toolNames: ["Material Suggestion Tool"],
  supplyNames: ["STL of STEP bestand"],
})

export default function BlogPlaVsPetgPage() {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-16 sm:px-8 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(130%_60%_at_50%_0%,rgba(99,102,241,.16),transparent_72%)]"
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
              <li className="font-medium text-slate-700">PLA vs PETG</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600">Material guide</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            PLA vs PETG: welk materiaal kies je?
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Kort samengevat: PLA wint op snelle visuele output, PETG op functionele robuustheid. De juiste keuze hangt af van je use-case.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
            Laatst bijgewerkt: 7 februari 2026
          </p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={materialsHref}
              event={{ action: "cta_click", category: "blog_pla_petg_top", label: "materials" }}
            >
              Material Suggestion Tool
            </ShimmerButton>
            <ShimmerButton
              href={contactHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_pla_petg_top", label: "contact_prefill" }}
            >
              Vraag materiaaladvies
            </ShimmerButton>
            <Link
              href={pricingHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              Bekijk prijsimpact
            </Link>
          </div>
          <ContentTableOfContents title="Inhoud" items={tocItems} className="max-w-2xl" />
        </header>

        <section id="material-difference" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Wat is het verschil tussen PLA en PETG?</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {compareCards.map((card) => (
                <GlassCard key={card.title} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                  <div className="mt-3 space-y-2 text-sm text-slate-700">
                    <p>
                      <span className="font-semibold text-slate-900">PLA:</span> {card.pla}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-900">PETG:</span> {card.petg}
                    </p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="material-matrix" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Welke matrix helpt bij snelle keuze?</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-[620px] text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200/70 text-slate-500">
                      <th className="py-2 pr-4 font-semibold">Eigenschap</th>
                      <th className="py-2 pr-4 font-semibold">PLA</th>
                      <th className="py-2 pr-4 font-semibold">PETG</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row) => (
                      <tr key={row.property} className="border-b border-slate-200/70 last:border-0">
                        <td className="py-2 pr-4 font-medium text-slate-900">{row.property}</td>
                        <td className="py-2 pr-4">{row.pla}</td>
                        <td className="py-2 pr-4">{row.petg}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </Reveal>
        </section>

        <section id="material-use-cases" className="scroll-mt-28">
          <Reveal>
            <div className="grid gap-4 md:grid-cols-2">
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold text-slate-900">Wanneer kies je PLA?</h2>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {useCases.pla.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
              <GlassCard className="p-6">
                <h2 className="text-xl font-semibold text-slate-900">Wanneer kies je PETG?</h2>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {useCases.petg.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <ShimmerButton
                href={materialsHref}
                event={{ action: "cta_click", category: "blog_pla_petg_mid", label: "materials" }}
              >
                Gebruik material tool
              </ShimmerButton>
              <ShimmerButton
                href={contactHref}
                className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                event={{ action: "cta_click", category: "blog_pla_petg_mid", label: "contact_prefill" }}
              >
                Bespreek je model
              </ShimmerButton>
            </div>
          </Reveal>
        </section>

        <section id="material-faq" className="scroll-mt-28">
          <Faq title="FAQ over PLA en PETG" items={faqItems} />
        </section>

        <section id="material-sources" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Bronnen en referenties</h2>
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
      </article>

      <BlogReadMore />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
    </main>
  )
}
