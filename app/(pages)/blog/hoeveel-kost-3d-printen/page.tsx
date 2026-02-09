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

const canonical = "https://www.x3dprints.be/blog/hoeveel-kost-3d-printen/"
const datePublished = "2024-10-01"
const dateModified = "2026-02-08"
const pricingHref = "/pricing?utm_source=blog&utm_medium=cta&utm_campaign=hoeveel-kost-3d-printen"
const materialsHref = "/materials?utm_source=blog&utm_medium=cta&utm_campaign=hoeveel-kost-3d-printen#material-suggestion-tool"
const contactHref =
  "/contact?material=pla-matte&quote=Kostprijsanalyse%20voor%20mijn%203D-printproject"

export const metadata: Metadata = {
  title: "3D print prijs: hoeveel kost 3D printen in 2026? | X3DPrints",
  description:
    "Wat kost 3D printen in 2026? Deze gids vertaalt kosten 3d printen naar een realistische 3d printen prijs en prijs 3d printen per projecttype, met directe offertestappen.",
  alternates: { canonical },
  openGraph: {
    title: "3D print prijs in 2026: wat kost 3D printen?",
    description:
      "Praktische kostengids met voorbeelden, prijsfactoren en directe links naar pricing, materialen en offerte voor snelle prijsinschatting.",
    url: canonical,
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "Hoeveel kost 3D printen?" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D print prijs in 2026",
    description: "Kostengids met concrete kostenfactoren en praktische beslisregels.",
    images: ["/Logo.webp"],
  },
}

const costFactors = [
  {
    title: "Materiaal",
    description:
      "PLA Matte is meestal de goedkoopste en snelste route. PETG, TPU of specials verhogen de kost door duurdere spoelen en trager printen.",
    link: { href: "/materials", label: "Bekijk materialen" },
  },
  {
    title: "Printtijd",
    description:
      "Meer uren betekent hogere machinekost. Kleine laaghoogte, veel supports en hoge infill maken een print duidelijk duurder.",
    link: { href: "/pricing", label: "Open pricing calculator" },
  },
  {
    title: "Modelcomplexiteit",
    description:
      "Complexe geometrie vraagt extra voorbereidingswerk en vaak extra supports. Dat zie je terug in zowel tijd als verbruik.",
    link: { href: "/viewer", label: "Controleer je model in de viewer" },
  },
  {
    title: "Levering en planning",
    description:
      "Afhalen in Herzele is het meest kostefficiente scenario. Verzending of spoedplanning kan de eindprijs verhogen.",
    link: { href: "/contact", label: "Vraag planning op maat" },
  },
]

const exampleRows = [
  {
    label: "Small",
    size: "ongeveer 5x5x5 cm",
    material: "PLA Matte",
    printTime: "ongeveer 2 uur",
    price: "vanaf EUR 5",
  },
  {
    label: "Medium",
    size: "ongeveer 10x10x10 cm",
    material: "PLA Matte of PETG",
    printTime: "ongeveer 6 uur",
    price: "vanaf EUR 20",
  },
  {
    label: "Large",
    size: "ongeveer 20x20x20 cm",
    material: "PLA Matte of PETG",
    printTime: "ongeveer 15 uur",
    price: "vanaf EUR 49",
  },
]

const optimizationTips = [
  "Verminder overhangs zodat minder supports nodig zijn.",
  "Gebruik enkel hoge resolutie op zichtvlakken die het nodig hebben.",
  "Bundel meerdere onderdelen in een batch voor betere machineplanning.",
  "Kies eerst een baseline materiaal (PLA Matte) en schaal later op.",
]

const faqItems = [
  {
    q: "Hoe snel krijg ik een exacte offerte?",
    a: "Meestal binnen 1 werkdag na ontvangst van STL of STEP, met advies over materiaal en planning.",
  },
  {
    q: "Waarom kan hetzelfde model bij andere partijen anders geprijsd zijn?",
    a: "Prijs hangt af van machinepark, kwaliteitsinstellingen, supportstrategie en servicegraad rond QA en communicatie.",
  },
  {
    q: "Kan ik eerst een ruwe kost zien zonder perfect model?",
    a: "Ja. Met afmetingen, toepassing en gewenst materiaal geven we een gerichte voorinschatting.",
  },
  {
    q: "Wanneer loont PETG of TPU ondanks hogere kost?",
    a: "Bij outdoor gebruik, hogere temperatuurbelasting of wanneer flexibiliteit een must is.",
  },
  {
    q: "Hoe kan ik mijn prijs het snelst verlagen?",
    a: "Optimaliseer modelgeometrie, vermijd overmatige supports en combineer onderdelen in een efficiente batch.",
  },
]

const references = [
  {
    label: "Prusa material guide (PLA, PETG, TPU)",
    href: "https://help.prusa3d.com/filament-material-guide",
  },
  {
    label: "PrusaSlicer: G-code viewer (print time)",
    href: "https://help.prusa3d.com/article/g-code-viewer_78984",
  },
  {
    label: "Ultimaker: Design for FFF 3D printing",
    href: "https://ultimaker.com/learn/design-for-fff-3d-printing/",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "3D print prijs in 2026: hoeveel kost 3D printen?",
  description:
    "Praktische kostengids over materiaal, printtijd, complexiteit en logistiek met concrete prijsvoorbeelden.",
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
  name: "3D print kost berekenen in 4 stappen",
  description:
    "Bepaal snel je prijsrange door materiaal, printtijd, complexiteit en leveroptie systematisch te checken.",
  inLanguage: "nl-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT3M",
  steps: [
    {
      name: "Kies basismateriaal",
      text: "Start met PLA Matte en bepaal of PETG of TPU echt nodig is voor je toepassing.",
    },
    {
      name: "Schat printtijd",
      text: "Controleer volume, laaghoogte en supportbehoefte via slicer of viewer.",
    },
    {
      name: "Vergelijk prijsankers",
      url: "/pricing?utm_source=blog&utm_medium=howto&utm_campaign=hoeveel-kost-3d-printen",
    },
    {
      name: "Vraag offerte met context",
      url: contactHref,
    },
  ],
  toolNames: ["X3DPrints pricing calculator", "Material Suggestion Tool"],
  supplyNames: ["STL of STEP bestand"],
})

export default function BlogCostPage() {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-16 sm:px-8 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_0%,rgba(16,185,129,.18),transparent_70%)]"
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
              <li className="font-medium text-slate-700">Hoeveel kost 3D printen?</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">Pricing guide</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            3D print prijs in 2026: hoeveel kost 3D printen?
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Het korte antwoord: kosten 3D printen starten vanaf EUR 5 voor eenvoudige stukken, maar de echte prijs hangt af van materiaal, printtijd, modelcomplexiteit en levering.
            Gebruik deze gids als referentie voor je 3d printen prijs en vergelijk prijs 3d printen per formaat.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
            Laatst bijgewerkt: 8 februari 2026
          </p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={pricingHref}
              event={{ action: "cta_click", category: "blog_cost_top", label: "pricing" }}
            >
              Open pricing calculator
            </ShimmerButton>
            <ShimmerButton
              href={materialsHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_cost_top", label: "materials_tool" }}
            >
              Kies materiaal
            </ShimmerButton>
            <Link
              href={contactHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              Vraag offerte met prefill
            </Link>
          </div>
        </header>

      <BlogContentOverview locale="nl" />

        <section id="kost-factors" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Welke factoren bepalen de prijs?</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {costFactors.map((factor) => (
                <GlassCard key={factor.title} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{factor.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{factor.description}</p>
                  <Link href={factor.link.href} className="mt-3 inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                    {factor.link.label}
                  </Link>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="kost-voorbeeld" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Wat zijn realistische richtprijzen?</h2>
              <p className="mt-2 text-sm text-slate-600">
                Deze ranges zijn startpunten. Exacte prijs volgt na slicer-analyse van je bestand.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-[640px] text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200/70 text-slate-500">
                      <th className="py-2 pr-4 font-semibold">Categorie</th>
                      <th className="py-2 pr-4 font-semibold">Formaat</th>
                      <th className="py-2 pr-4 font-semibold">Materiaal</th>
                      <th className="py-2 pr-4 font-semibold">Printtijd</th>
                      <th className="py-2 pr-4 font-semibold">Prijsrange</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exampleRows.map((row) => (
                      <tr key={row.label} className="border-b border-slate-200/70 last:border-0">
                        <td className="py-2 pr-4 font-medium text-slate-900">{row.label}</td>
                        <td className="py-2 pr-4">{row.size}</td>
                        <td className="py-2 pr-4">{row.material}</td>
                        <td className="py-2 pr-4">{row.printTime}</td>
                        <td className="py-2 pr-4 font-semibold text-slate-900">{row.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Tip: gebruik altijd de <Link href="/pricing" className="font-semibold text-emerald-600 hover:text-emerald-700">pricing calculator</Link> voor actuele simulaties.
              </p>
            </GlassCard>
          </Reveal>
        </section>

        <section id="kost-optimaliseer" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Hoe hou je de kost onder controle?</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {optimizationTips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-3">
                <ShimmerButton
                  href={pricingHref}
                  event={{ action: "cta_click", category: "blog_cost_mid", label: "pricing" }}
                >
                  Simuleer je kost
                </ShimmerButton>
                <ShimmerButton
                  href={contactHref}
                  className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                  event={{ action: "cta_click", category: "blog_cost_mid", label: "contact_prefill" }}
                >
                  Vraag exacte offerte
                </ShimmerButton>
              </div>
            </GlassCard>
          </Reveal>
        </section>

        <section id="kost-faq" className="scroll-mt-28">
          <Faq title="FAQ over 3D print prijs" items={faqItems} />
        </section>

        <section id="kost-sources" className="scroll-mt-28">
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
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Klaar om je kost exact te weten?</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Stuur je bestand met context door en ontvang een prijs op maat met materiaaladvies.
                </p>
              </div>
              <ShimmerButton
                href={contactHref}
                event={{ action: "cta_click", category: "blog_cost_bottom", label: "contact_prefill" }}
              >
                Start offerte
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

