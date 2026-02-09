import type { Metadata } from "next"
import Link from "next/link"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import ReadMoreLinks from "@/components/ReadMoreLinks"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import { buildArticleJsonLd, buildFaqPageSchema, buildHowToSchema } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/blog/3d-print-offerte-aanvragen/"
const datePublished = "2026-02-08"
const dateModified = "2026-02-08"
const pricingHref = "/pricing?utm_source=blog&utm_medium=cta&utm_campaign=offerte-checklist"
const materialsHref = "/materials?utm_source=blog&utm_medium=cta&utm_campaign=offerte-checklist#material-suggestion-tool"
const viewerHref = "/viewer?utm_source=blog&utm_medium=cta&utm_campaign=offerte-checklist"
const contactHref = "/contact?material=pla-matte&quote=Offerte%20aanvraag%20voor%20mijn%203D-print"

export const metadata: Metadata = {
  title: "3D print offerte aanvragen: snelle checklist | X3DPrints",
  description:
    "Vraag sneller een 3D print offerte met deze checklist: bestand, afmetingen, materiaal, aantallen en deadline, plus een prijsvoorbeeld en tips voor planning.",
  alternates: { canonical },
  openGraph: {
    title: "3D print offerte aanvragen: snelle checklist",
    description:
      "Checklist voor een snelle 3D print offerte met de juiste input, prijsopbouw en planningstips.",
    url: canonical,
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "3D print offerte aanvragen" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D print offerte aanvragen: snelle checklist",
    description: "Input checklist, prijsopbouw en planningstips voor snelle offertes.",
    images: ["/Logo.webp"],
  },
}

const tocItems = [
  { id: "offerte-input", label: "Welke info versnelt je offerte?" },
  { id: "offerte-voorbeeld", label: "Prijsopbouw met realistische kostblokken" },
  { id: "offerte-snelheid", label: "Tips om sneller te plannen" },
  { id: "offerte-faq", label: "FAQ over offerte en prijs" },
  { id: "offerte-sources", label: "Bronnen en referenties" },
]

const intakeCards = [
  {
    title: "Bestand + versie",
    description:
      "STL of STEP met duidelijke bestandsnaam. Zo kunnen we volume, supports en printtijd meteen inschatten.",
    link: { label: "Upload via 3D viewer", href: viewerHref },
  },
  {
    title: "Afmetingen + aantallen",
    description:
      "Afmetingen in mm en het gewenste aantal stuks bepalen batchplanning, schaalvoordelen en levertijd.",
    link: { label: "Bekijk pricing calculator", href: pricingHref },
  },
  {
    title: "Materiaal + toepassing",
    description:
      "PLA Matte voor zichtwerk, PETG voor outdoor en TPU voor flexibiliteit. Geen idee? We adviseren.",
    link: { label: "Material Suggestion Tool", href: materialsHref },
  },
  {
    title: "Deadline + levering",
    description:
      "Laat weten wanneer het klaar moet zijn en of je afhaalt in Herzele of verzending nodig hebt.",
    link: { label: "Vraag planning op maat", href: contactHref },
  },
]

const checklistRows = [
  {
    label: "Bestandstype",
    reason: "Bepaalt of we direct kunnen slicen of eerst moeten optimaliseren.",
    example: "STL/STEP + versie (v2.1)",
  },
  {
    label: "Afmetingen",
    reason: "Helpt bij het schatten van volume, printtijd en bedconfiguratie.",
    example: "120 x 80 x 40 mm",
  },
  {
    label: "Aantal stuks",
    reason: "Voor batchplanning, prijs per stuk en materiaalverbruik.",
    example: "1 prototype + 10 stuks",
  },
  {
    label: "Materiaal & kleur",
    reason: "Materiaal bepaalt kost, sterkte en nabewerking.",
    example: "PLA Matte zwart of PETG Solid",
  },
  {
    label: "Deadline & levering",
    reason: "Geeft prioriteit, planning en logistiek aan.",
    example: "Deadline 15 maart, afhalen Herzele",
  },
]

const pricingRows = [
  {
    label: "Modelanalyse",
    detail: "Slicer setup, supportstrategie en batchindeling.",
    range: "EUR 0-25",
  },
  {
    label: "Printtijd",
    detail: "Machine-uren op basis van laaghoogte, infill en support.",
    range: "EUR 5-45",
  },
  {
    label: "Materiaal",
    detail: "PLA, PETG of TPU met bijhorende spoolkost.",
    range: "EUR 3-20",
  },
  {
    label: "Nabewerking",
    detail: "Support removal, lichte cleaning en kwaliteitscheck.",
    range: "EUR 0-15",
  },
  {
    label: "Levering",
    detail: "Afhalen, verzending of levering op maat.",
    range: "EUR 0-12",
  },
]

const speedTips = [
  "Lever STEP als je nog wijzigingen verwacht; STL werkt voor finale productie.",
  "Noteer de deadline expliciet in je bericht, zo plannen we sneller in.",
  "Gebruik de Material Suggestion Tool als je twijfelt over PLA, PETG of TPU.",
  "Bundel onderdelen die samen moeten aankomen in één aanvraag.",
]

const faqItems = [
  {
    q: "Kan ik een offerte krijgen zonder definitief materiaal?",
    a: "Ja. Deel je toepassing en we adviseren een basismateriaal plus alternatief voor outdoor, hitte of flexibiliteit.",
  },
  {
    q: "Hoe snel krijg ik antwoord?",
    a: "Meestal binnen 1 werkdag na ontvangst van een STL/STEP en de kerninfo uit de checklist.",
  },
  {
    q: "Wat als mijn bestand fouten bevat?",
    a: "We signaleren issues zoals non-manifold edges of dunne wanden en stellen een correctie voor.",
  },
  {
    q: "Kunnen herhaalorders sneller geprijsd worden?",
    a: "Ja. Zodra we een referentieprofiel hebben, kunnen we vervolgorders sneller budgetteren en plannen.",
  },
]

const references = [
  {
    label: "PrusaSlicer G-code viewer: print time analysis",
    href: "https://help.prusa3d.com/article/g-code-viewer_78984",
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
  headline: "3D print offerte aanvragen: snelle checklist",
  description:
    "Checklist met intake-input, prijsopbouw en planningstips zodat je sneller een 3D print offerte ontvangt.",
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
  name: "3D print offerte aanvragen in 4 stappen",
  description:
    "Vraag snel een 3D print offerte aan door bestand, afmetingen, materiaal en deadline te delen.",
  inLanguage: "nl-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT4M",
  steps: [
    {
      name: "Upload je bestand",
      text: "Stuur STL of STEP met een duidelijke bestandsnaam en versie.",
      url: viewerHref,
    },
    {
      name: "Beschrijf afmetingen en aantallen",
      text: "Geef het formaat in mm en het gewenste aantal stuks door.",
    },
    {
      name: "Kies materiaal of vraag advies",
      url: materialsHref,
    },
    {
      name: "Bevestig deadline en levering",
      url: contactHref,
    },
  ],
  toolNames: ["X3DPrints 3D viewer", "Pricing calculator", "Material Suggestion Tool"],
  supplyNames: ["STL of STEP bestand", "Afmetingen en aantallen"],
})

export default function BlogOffertePage() {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-16 sm:px-8 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_0%,rgba(14,165,233,.18),transparent_70%)]"
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
              <li className="font-medium text-slate-700">Offerte aanvragen</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">Pricing guide</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            3D print offerte aanvragen: snelle checklist
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Het korte antwoord: een offerte gaat sneller als je bestand, afmetingen, materiaal, aantallen en deadline meteen meegeeft.
            Deze checklist toont wat we nodig hebben, hoe de prijs is opgebouwd en hoe je direct kunt plannen.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
            Laatst bijgewerkt: 8 februari 2026
          </p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={pricingHref}
              event={{ action: "cta_click", category: "blog_offerte_top", label: "pricing" }}
            >
              Open pricing calculator
            </ShimmerButton>
            <ShimmerButton
              href={materialsHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_offerte_top", label: "materials_tool" }}
            >
              Kies materiaal
            </ShimmerButton>
            <Link
              href={contactHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              Start offerte
            </Link>
          </div>
          <ContentTableOfContents title="Inhoud" items={tocItems} className="max-w-2xl" />
        </header>

        <section id="offerte-input" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Welke info versnelt je offerte?</h2>
            <p className="mt-2 text-sm text-slate-600">
              Hoe completer je intake, hoe sneller we een correcte prijsinschatting kunnen geven.
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {intakeCards.map((card) => (
                <GlassCard key={card.title} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{card.description}</p>
                  <Link
                    href={card.link.href}
                    className="mt-3 inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    {card.link.label}
                  </Link>
                </GlassCard>
              ))}
            </div>
            <GlassCard className="mt-6 p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-slate-900">Checklist: input vs impact</h3>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-[640px] text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200/70 text-slate-500">
                      <th className="py-2 pr-4 font-semibold">Input</th>
                      <th className="py-2 pr-4 font-semibold">Waarom we het nodig hebben</th>
                      <th className="py-2 pr-4 font-semibold">Voorbeeld</th>
                    </tr>
                  </thead>
                  <tbody>
                    {checklistRows.map((row) => (
                      <tr key={row.label} className="border-b border-slate-200/70 last:border-0">
                        <td className="py-2 pr-4 font-medium text-slate-900">{row.label}</td>
                        <td className="py-2 pr-4">{row.reason}</td>
                        <td className="py-2 pr-4">{row.example}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Tip: stuur ook een referentiefoto of schets mee als het om een functioneel onderdeel gaat.
              </p>
            </GlassCard>
          </Reveal>
        </section>

        <section id="offerte-voorbeeld" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Prijsopbouw met realistische kostblokken</h2>
              <p className="mt-2 text-sm text-slate-600">
                Richtprijzen helpen je budgetteren, maar de exacte prijs volgt na slicer-analyse van je bestand.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-[640px] text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200/70 text-slate-500">
                      <th className="py-2 pr-4 font-semibold">Kostblok</th>
                      <th className="py-2 pr-4 font-semibold">Wat je krijgt</th>
                      <th className="py-2 pr-4 font-semibold">Richtprijs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingRows.map((row) => (
                      <tr key={row.label} className="border-b border-slate-200/70 last:border-0">
                        <td className="py-2 pr-4 font-medium text-slate-900">{row.label}</td>
                        <td className="py-2 pr-4">{row.detail}</td>
                        <td className="py-2 pr-4 font-semibold text-slate-900">{row.range}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Voor actuele simulaties kan je altijd de{" "}
                <Link href="/pricing" className="font-semibold text-emerald-600 hover:text-emerald-700">
                  pricing calculator
                </Link>{" "}
                gebruiken.
              </p>
            </GlassCard>
          </Reveal>
        </section>

        <section id="offerte-snelheid" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Tips om sneller te plannen</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {speedTips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <ShimmerButton
                  href={viewerHref}
                  event={{ action: "cta_click", category: "blog_offerte_mid", label: "viewer" }}
                >
                  Upload bestand
                </ShimmerButton>
                <ShimmerButton
                  href={contactHref}
                  className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                  event={{ action: "cta_click", category: "blog_offerte_mid", label: "contact_prefill" }}
                >
                  Vraag offerte
                </ShimmerButton>
              </div>
            </GlassCard>
          </Reveal>
        </section>

        <section id="offerte-faq" className="scroll-mt-28">
          <Faq title="FAQ over 3D print offerte aanvragen" items={faqItems} />
        </section>

        <section id="offerte-sources" className="scroll-mt-28">
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

        <section>
          <Reveal>
            <GlassCard className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Volgende stap</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Klaar voor een snelle offerte?</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Deel je bestand en planning, dan ontvang je een duidelijke prijs met materiaaladvies.
                </p>
              </div>
              <ShimmerButton
                href={contactHref}
                event={{ action: "cta_click", category: "blog_offerte_bottom", label: "contact_prefill" }}
              >
                Start offerte
              </ShimmerButton>
            </GlassCard>
          </Reveal>
        </section>
      </article>

      <ReadMoreLinks pageType="pricing" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
    </main>
  )
}
