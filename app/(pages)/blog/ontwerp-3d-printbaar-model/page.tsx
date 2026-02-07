import type { Metadata } from "next"
import Link from "next/link"
import BlogReadMore from "@/components/BlogReadMore"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import { buildArticleJsonLd, buildFaqPageSchema, buildHowToSchema } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/blog/ontwerp-3d-printbaar-model/"
const enCanonical = "https://www.x3dprints.be/en/blog/ontwerp-3d-printbaar-model/"
const datePublished = "2024-05-01"
const dateModified = "2026-02-07"
const viewerHref = "/viewer?utm_source=blog&utm_medium=cta&utm_campaign=ontwerp-printbaar"
const pricingHref = "/pricing?utm_source=blog&utm_medium=cta&utm_campaign=ontwerp-printbaar"
const contactHref = "/contact?material=pla-matte&quote=Design%20review%20voor%20printbaar%20model"

export const metadata: Metadata = {
  title: "Hoe ontwerp je een 3D printbaar model? | X3DPrints",
  description:
    "Checklist voor printbare modellen met wanddikte, tolerantie, orientatie en export zodat je sneller van CAD naar print gaat.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": canonical,
      "en-BE": enCanonical,
      "x-default": canonical,
    },
  },
  openGraph: {
    title: "Hoe ontwerp je een 3D printbaar model?",
    description:
      "Praktische ontwerpgids met richtlijnen voor wanddikte, snap-fits, tolerantie en bestandsaanlevering.",
    url: canonical,
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "Ontwerp een 3D printbaar model" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hoe ontwerp je een 3D printbaar model?",
    description: "Van CAD naar print met designregels die productie versnellen.",
    images: ["/Logo.webp"],
  },
}

const tocItems = [
  { id: "design-basics", label: "Welke ontwerpregels moet je eerst checken?" },
  { id: "design-export", label: "Hoe maak je je model printklaar?" },
  { id: "design-material", label: "Welke ontwerpkeuzes verschillen per materiaal?" },
  { id: "design-faq", label: "FAQ over printbaar ontwerpen" },
  { id: "design-sources", label: "Bronnen en referenties" },
]

const fundamentals = [
  {
    title: "Wanddikte en structurele sterkte",
    description:
      "Voor veel FDM toepassingen werkt 1.2 mm als startpunt. Voor zwaarder gebruik kan extra wanddikte nodig zijn.",
  },
  {
    title: "Tolerantie en passing",
    description:
      "Bepaal vroeg welke passing nodig is: los, vast of snap-fit. Zo voorkom je iteraties na de eerste print.",
  },
  {
    title: "Orientatie en krachten",
    description:
      "Leg kritieke oppervlakken slim in de printorientatie zodat zichtkwaliteit en sterkte in balans blijven.",
  },
  {
    title: "Overhang en support",
    description:
      "Beperk agressieve overhangs en ontwerp waar mogelijk met chamfers om supportvolume te verlagen.",
  },
]

const exportChecklist = [
  "Controleer mesh-integriteit en vermijd open surfaces.",
  "Gebruik consistente units en benoem versies duidelijk.",
  "Lever STL voor productie en STEP als revisies mogelijk zijn.",
  "Voeg kritieke maten of montagepunten toe in een korte notitie.",
]

const materialGuidance = [
  {
    material: "PLA",
    guidance: "Sterk voor visuele kwaliteit en scherpe details in indoor toepassingen.",
  },
  {
    material: "PETG",
    guidance: "Beter wanneer het onderdeel meer impact, warmte of vocht moet aankunnen.",
  },
  {
    material: "TPU",
    guidance: "Geschikt voor flexibele delen, maar vraagt egale wanddikte en aangepaste geometrie.",
  },
]

const faqItems = [
  {
    q: "Hoe vroeg moet ik aan printbaarheid denken in mijn ontwerp?",
    a: "Idealiter vanaf de eerste CAD-versie, zodat je minder correctierondes nodig hebt.",
  },
  {
    q: "Wat veroorzaakt meestal een herprint?",
    a: "Onvoldoende toleranties, zwakke wandzones of onduidelijke orientatiekeuze veroorzaken vaak extra iteraties.",
  },
  {
    q: "Kan ik een design review vragen voor productie start?",
    a: "Ja, met een korte review kunnen we printrisico's vroeg detecteren en oplossen.",
  },
]

const references = [
  {
    label: "All3DP FDM process explainer",
    href: "https://all3dp.com/2/fdm-3d-printing-explained/",
  },
  {
    label: "Prusa material guide",
    href: "https://help.prusa3d.com/article/material-guide_220",
  },
  {
    label: "Google Search docs: crawlable links",
    href: "https://developers.google.com/search/docs/crawling-indexing/links-crawlable",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "Hoe ontwerp je een 3D printbaar model?",
  description:
    "Praktische designgids voor wanddikte, tolerantie, orientatie en export voor 3D print.",
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
  name: "Printbaar model voorbereiden in 4 stappen",
  description:
    "Controleer designregels, exporteer correct en vraag een snelle review voor productie.",
  inLanguage: "nl-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT4M",
  steps: [
    {
      name: "Designregels controleren",
      text: "Check wanddikte, toleranties en orientatie voor je toepassing.",
    },
    {
      name: "Correct exporteren",
      text: "Lever STL of STEP plus korte context en kritieke maten.",
    },
    {
      name: "Model valideren in viewer",
      url: viewerHref,
    },
    {
      name: "Design review aanvragen",
      url: contactHref,
    },
  ],
  toolNames: ["X3DPrints 3D viewer", "Material Suggestion Tool"],
  supplyNames: ["STL of STEP bestand", "Design notes"],
})

export default function DesignArticlePage() {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-16 sm:px-8 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(130%_60%_at_50%_0%,rgba(45,212,191,.16),transparent_72%)]"
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
              <li className="font-medium text-slate-700">Ontwerp een 3D printbaar model</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-600">Design guide</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Hoe ontwerp je een 3D printbaar model?
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Goede printbaarheid start in je CAD-model. Met enkele kernregels vermijd je mislukte prints en onnodige iteraties.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
            Laatst bijgewerkt: 7 februari 2026
          </p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={viewerHref}
              event={{ action: "cta_click", category: "blog_design_top", label: "viewer" }}
            >
              Check je model
            </ShimmerButton>
            <ShimmerButton
              href={contactHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_design_top", label: "contact_prefill" }}
            >
              Vraag design review
            </ShimmerButton>
            <Link
              href={pricingHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              Bekijk prijsankers
            </Link>
          </div>
          <ContentTableOfContents title="Inhoud" items={tocItems} className="max-w-2xl" />
        </header>

        <section id="design-basics" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Welke ontwerpregels moet je eerst checken?</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {fundamentals.map((item) => (
                <GlassCard key={item.title} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{item.description}</p>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="design-export" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Hoe maak je je model printklaar?</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {exportChecklist.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <ShimmerButton
                  href={viewerHref}
                  event={{ action: "cta_click", category: "blog_design_mid", label: "viewer" }}
                >
                  Open viewer
                </ShimmerButton>
                <ShimmerButton
                  href={contactHref}
                  className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                  event={{ action: "cta_click", category: "blog_design_mid", label: "contact_prefill" }}
                >
                  Start review
                </ShimmerButton>
              </div>
            </GlassCard>
          </Reveal>
        </section>

        <section id="design-material" className="scroll-mt-28">
          <Reveal>
            <div className="grid gap-4 md:grid-cols-3">
              {materialGuidance.map((item) => (
                <GlassCard key={item.material} className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{item.material}</p>
                  <p className="mt-2 text-sm text-slate-700">{item.guidance}</p>
                </GlassCard>
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-600">
              Combineer dit met{" "}
              <Link href="/materials#material-suggestion-tool" className="font-semibold text-indigo-600 hover:text-indigo-500">
                materiaaladvies
              </Link>{" "}
              en{" "}
              <Link href="/services" className="font-semibold text-indigo-600 hover:text-indigo-500">
                services
              </Link>{" "}
              voor een productieklare intake.
            </p>
          </Reveal>
        </section>

        <section id="design-faq" className="scroll-mt-28">
          <Faq title="FAQ over printbaar ontwerpen" items={faqItems} />
        </section>

        <section id="design-sources" className="scroll-mt-28">
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
