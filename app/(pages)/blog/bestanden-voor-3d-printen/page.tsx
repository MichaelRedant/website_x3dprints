import type { Metadata } from "next"
import Link from "next/link"
import BlogReadMore from "@/components/BlogReadMore"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import { buildArticleJsonLd, buildFaqPageSchema, buildHowToSchema } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/blog/bestanden-voor-3d-printen/"
const enCanonical = "https://www.x3dprints.be/en/blog/bestanden-voor-3d-printen/"
const datePublished = "2024-08-01"
const dateModified = "2026-02-07"
const viewerHref = "/viewer?utm_source=blog&utm_medium=cta&utm_campaign=bestanden"
const contactHref = "/contact?material=pla-matte&quote=Bestandscheck%20voor%203D%20printen"
const pricingHref = "/pricing?utm_source=blog&utm_medium=cta&utm_campaign=bestanden"

export const metadata: Metadata = {
  title: "Welke bestanden heb je nodig voor 3D printen? | X3DPrints",
  description:
    "STL, STEP of native CAD? Deze gids toont hoe 3d stl, 3d modellen om te printen en 3d model printen workflows sneller verwerkbaar worden.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": canonical,
      "en-BE": enCanonical,
      "x-default": canonical,
    },
  },
  openGraph: {
    title: "Welke bestanden heb je nodig voor 3D printen?",
    description:
      "Praktische checklist voor export, meshcontrole en documentatie bij 3D printaanvragen.",
    url: canonical,
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "Bestanden voor 3D printen" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Welke bestanden heb je nodig voor 3D printen?",
    description: "Complete checklist om je 3D printaanvraag direct verwerkbaar te maken.",
    images: ["/Logo.webp"],
  },
}

const tocItems = [
  { id: "files-formats", label: "Welke formaten werken best?" },
  { id: "files-export", label: "Hoe exporteer je correct?" },
  { id: "files-docs", label: "Welke extra context helpt?" },
  { id: "files-faq", label: "FAQ over bestandsaanlevering" },
  { id: "files-sources", label: "Bronnen en referenties" },
]

const formatCards = [
  {
    format: "STL",
    description: "Sterke keuze voor finale productie wanneer geometrie al vastligt.",
    tips: ["Gebruik consistente units", "Controleer op gaten en non-manifold issues"],
  },
  {
    format: "STEP",
    description: "Handig wanneer nog designiteraties of tolerantiewijzigingen nodig zijn.",
    tips: ["Bewaar assemblystructuur", "Lever belangrijke maatvlakken mee"],
  },
  {
    format: "Native CAD plus PDF",
    description: "Beste route voor complexere projecten met functionele passing en revisies.",
    tips: ["Voeg maatnotities toe", "Duid revisienummer aan"],
  },
]

const exportChecklist = [
  "Controleer of de mesh waterdicht is en geen losse faces bevat.",
  "Gebruik duidelijke bestandsnamen met versie en eenheid.",
  "Bundel meerdere onderdelen in een zip met korte readme.",
  "Vermeld kritieke maten en tolerantie direct in je briefing.",
]

const contextTips = [
  "Voeg referentiebeelden toe voor orientatie en afwerking.",
  "Noteer materiaalvoorkeur of vraag advies via de material tool.",
  "Vermeld deadline en gewenste levermethode.",
  "Gebruik de viewer voor een snelle sanity-check voor verzending.",
]

const faqItems = [
  {
    q: "Kan ik enkel STL aanleveren voor een offerte?",
    a: "Ja. Voor veel projecten is STL voldoende als de geometrie al definitief is.",
  },
  {
    q: "Wanneer is STEP beter dan STL?",
    a: "STEP is beter zodra we nog maat- of passingaanpassingen moeten doen.",
  },
  {
    q: "Welke fouten vertragen de verwerking het meest?",
    a: "Onvolledige context, onduidelijke units en meshfouten zorgen meestal voor extra rondes.",
  },
]

const references = [
  {
    label: "Prusa material guide",
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
  headline: "Welke bestanden heb je nodig voor 3D printen?",
  description:
    "Gids voor 3d stl, STEP en bestandscheck zodat je aanvraag sneller naar productie en 3d model printen gaat.",
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
  name: "3D printbestanden klaarzetten in 4 stappen",
  description:
    "Bereid je STL of STEP correct voor met exportcheck, context en prefill aanvraag.",
  inLanguage: "nl-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT3M",
  steps: [
    {
      name: "Formaat kiezen",
      text: "Kies STL voor productie of STEP wanneer iteraties nodig zijn.",
    },
    {
      name: "Export en meshcontrole",
      text: "Controleer units, waterdichtheid en kritieke maatzones.",
    },
    {
      name: "Bestand valideren in viewer",
      url: viewerHref,
    },
    {
      name: "Aanvraag met context versturen",
      url: contactHref,
    },
  ],
  toolNames: ["X3DPrints 3D viewer", "Material Suggestion Tool"],
  supplyNames: ["STL of STEP bestand", "Projectbriefing"],
})

export default function FilesArticlePage() {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-16 sm:px-8 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(130%_60%_at_50%_0%,rgba(16,185,129,.16),transparent_72%)]"
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
              <li className="font-medium text-slate-700">Bestanden voor 3D printen</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">File guide</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Welke bestanden heb je nodig voor 3D printen?
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Een goede bestandsaanlevering voorkomt vertraging. Met de juiste export en context start je project veel sneller, zeker wanneer je met 3d stl of andere 3d modellen om te printen werkt.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
            Laatst bijgewerkt: 7 februari 2026
          </p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={viewerHref}
              event={{ action: "cta_click", category: "blog_files_top", label: "viewer" }}
            >
              Controleer in viewer
            </ShimmerButton>
            <ShimmerButton
              href={contactHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_files_top", label: "contact_prefill" }}
            >
              Vraag bestandscheck
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

        <section id="files-formats" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Welke formaten werken best?</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {formatCards.map((card) => (
                <GlassCard key={card.format} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{card.format}</h3>
                  <p className="mt-2 text-sm text-slate-700">{card.description}</p>
                  <ul className="mt-3 space-y-1 text-xs text-slate-500">
                    {card.tips.map((tip) => (
                      <li key={tip} className="flex items-start gap-2">
                        <span aria-hidden>-</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="files-export" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Hoe exporteer je correct?</h2>
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
                  event={{ action: "cta_click", category: "blog_files_mid", label: "viewer" }}
                >
                  Open viewer
                </ShimmerButton>
                <ShimmerButton
                  href={contactHref}
                  className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                  event={{ action: "cta_click", category: "blog_files_mid", label: "contact_prefill" }}
                >
                  Start aanvraag
                </ShimmerButton>
              </div>
            </GlassCard>
          </Reveal>
        </section>

        <section id="files-docs" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Welke extra context helpt?</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {contextTips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Combineer dit met{" "}
                <Link href="/services" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  service-info
                </Link>{" "}
                en{" "}
                <Link href="/materials#material-suggestion-tool" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  materiaaladvies
                </Link>{" "}
                voor snellere beslissing.
              </p>
            </GlassCard>
          </Reveal>
        </section>

        <section id="files-faq" className="scroll-mt-28">
          <Faq title="FAQ over bestanden voor 3D printen" items={faqItems} />
        </section>

        <section id="files-sources" className="scroll-mt-28">
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
