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

const canonical = "https://www.x3dprints.be/blog/hittebestendig-3d-print-materiaal/"
const datePublished = "2026-02-08"
const dateModified = "2026-02-09"
const materialsHref =
  "/materials?utm_source=blog&utm_medium=cta&utm_campaign=hittebestendig-materiaal#material-suggestion-tool"
const pricingHref = "/pricing?utm_source=blog&utm_medium=cta&utm_campaign=hittebestendig-materiaal"
const viewerHref = "/viewer?utm_source=blog&utm_medium=cta&utm_campaign=hittebestendig-materiaal"
const contactHref =
  "/contact?material=pc&quote=Hittebestendig%20materiaal%20voor%203D%20print"
const materialsGuideHref =
  "/blog/3d-print-materialen-gids?utm_source=blog&utm_medium=internal&utm_campaign=hittebestendig-materiaal"

export const metadata: Metadata = {
  title: "Hittebestendig 3D print materiaal: PETG vs PC | X3DPrints",
  description:
    "Welke 3D print materialen zijn hittebestendig? Vergelijk PLA Tough+, PETG, PC en PC FR met een matrix, scenario's en snelle CTA's.",
  alternates: { canonical },
  openGraph: {
    title: "Hittebestendig 3D print materiaal: PETG vs PC",
    description:
      "Vergelijk hittebestendige 3D print materialen met een matrix, scenario's en duidelijke CTA's.",
    url: canonical,
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "Hittebestendig 3D print materiaal" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hittebestendig 3D print materiaal: PETG vs PC",
    description: "Matrix en scenario's voor hittebestendige 3D prints.",
    images: ["/Logo.webp"],
  },
}

const criteriaCards = [
  {
    title: "Temperatuur van de omgeving",
    description:
      "Denk aan zon, motorwarmte of elektronica. Hoe hoger de temperatuur, hoe sneller je naar PETG of PC schuift.",
  },
  {
    title: "UV en buitengebruik",
    description:
      "UV en vocht versnellen vervorming. PETG en PC blijven het meest maatvast buiten.",
  },
  {
    title: "Mechanische belasting",
    description:
      "Sterke onderdelen met warmte vragen stijfheid. PC levert de hoogste marge voor hitte + impact.",
  },
  {
    title: "Kosten en printbaarheid",
    description:
      "PLA Tough+ is het goedkoopst, PETG blijft betaalbaar. PC vraagt meer setup maar loont bij hoge eisen.",
  },
]

const matrixRows = [
  {
    material: "PLA Tough+",
    heat: "± 60°C (indoor)",
    uv: "Beperkt",
    bestFor: "Prototypes, klemmen binnenshuis",
    href: "/materials/pla-tough",
  },
  {
    material: "PETG",
    heat: "± 80°C (outdoor)",
    uv: "Goed",
    bestFor: "Behuizingen, outdoor fixtures",
    href: "/materials/petg",
  },
  {
    material: "PC",
    heat: "± 110°C",
    uv: "Sterk",
    bestFor: "Machinecovers, brackets, hittezones",
    href: "/materials/pc",
  },
  {
    material: "PC FR",
    heat: "± 110°C + vlamvertraging",
    uv: "Sterk",
    bestFor: "Elektronica, veiligheidskritisch",
    href: "/materials/pc-fr",
  },
]

const scenarios = [
  {
    title: "Behuizing rond elektronica",
    description:
      "PETG is vaak voldoende voor normale elektronica. Bij hoge warmte kies je PC voor extra marge.",
  },
  {
    title: "Outdoor brackets in de zon",
    description:
      "Kies PETG of PC zodat UV en warmte het onderdeel niet vervormen.",
  },
  {
    title: "Veiligheidskritische onderdelen",
    description:
      "PC FR is de optie wanneer vlamvertraging of normering belangrijk is.",
  },
]

const faqItems = [
  {
    q: "Vanaf welke temperatuur is PLA niet meer geschikt?",
    a: "PLA en PLA Tough+ vervormen rond 60°C. Voor warmere toepassingen ga je naar PETG of PC.",
  },
  {
    q: "Is PETG hittebestendig genoeg voor buiten?",
    a: "Ja, PETG blijft stabiel bij zon en lichte warmte. Voor extreme hitte of motorzones is PC beter.",
  },
  {
    q: "Waarom PC boven PETG?",
    a: "PC kan hogere temperaturen aan en blijft stijf onder belasting, ideaal voor technische onderdelen.",
  },
  {
    q: "Wanneer kies ik PC FR?",
    a: "Bij onderdelen waar extra veiligheid of vlamvertraging vereist is, zoals elektronica of control panels.",
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
  headline: "Hittebestendig 3D print materiaal: PETG vs PC",
  description:
    "Vergelijk PLA Tough+, PETG, PC en PC FR voor hittebestendige 3D prints met een matrix en scenario's.",
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
  name: "Hittebestendig materiaal kiezen in 4 stappen",
  description: "Bepaal temperatuur, omgeving en belasting om het juiste 3D print materiaal te kiezen.",
  inLanguage: "nl-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT4M",
  steps: [
    {
      name: "Bepaal de temperatuurzone",
      text: "Check maximale omgevingstemperatuur en warmtebronnen.",
    },
    {
      name: "Beoordeel UV en gebruik",
      text: "Voor buitengebruik schuif je sneller naar PETG of PC.",
    },
    {
      name: "Vergelijk in de matrix",
      url: materialsHref,
    },
    {
      name: "Vraag advies of offerte",
      url: contactHref,
    },
  ],
  toolNames: ["Material Suggestion Tool", "Pricing calculator"],
  supplyNames: ["STL of STEP bestand"],
})

export default function BlogHittebestendigPage() {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-16 sm:px-8 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_0%,rgba(251,146,60,.18),transparent_70%)]"
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
              <li className="font-medium text-slate-700">Hittebestendig materiaal</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-500">Materials guide</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Hittebestendig 3D print materiaal: PETG vs PC
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Het korte antwoord: PLA Tough+ is geschikt tot ongeveer 60°C, PETG is de veilige keuze voor outdoor, en PC
            is de beste optie voor hoge hitte of technische toepassingen. Gebruik deze matrix om sneller te kiezen.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
            Laatst bijgewerkt: 9 februari 2026
          </p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={materialsHref}
              event={{ action: "cta_click", category: "blog_hitte_top", label: "materials_tool" }}
            >
              Kies materiaal
            </ShimmerButton>
            <ShimmerButton
              href={pricingHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_hitte_top", label: "pricing" }}
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

        <section id="hitte-criteria" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Welke criteria bepalen hittebestendigheid?</h2>
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

        <section id="hitte-matrix" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Materiaalvergelijking in één tabel</h2>
              <p className="mt-2 text-sm text-slate-600">
                Indicatieve temperaturen. We verfijnen deze waarden op basis van model en omgeving.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-[720px] text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200/70 text-slate-500">
                      <th className="py-2 pr-4 font-semibold">Materiaal</th>
                      <th className="py-2 pr-4 font-semibold">Hitte</th>
                      <th className="py-2 pr-4 font-semibold">UV</th>
                      <th className="py-2 pr-4 font-semibold">Beste voor</th>
                      <th className="py-2 pr-4 font-semibold">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matrixRows.map((row) => (
                      <tr key={row.material} className="border-b border-slate-200/70 last:border-0">
                        <td className="py-2 pr-4 font-medium text-slate-900">{row.material}</td>
                        <td className="py-2 pr-4">{row.heat}</td>
                        <td className="py-2 pr-4">{row.uv}</td>
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

        <section id="hitte-scenarios" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Scenario&apos;s met warmte en UV</h2>
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
                  href={contactHref}
                  event={{ action: "cta_click", category: "blog_hitte_mid", label: "contact_prefill" }}
                >
                  Vraag materiaaladvies
                </ShimmerButton>
                <ShimmerButton
                  href={viewerHref}
                  className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                  event={{ action: "cta_click", category: "blog_hitte_mid", label: "viewer" }}
                >
                  Upload bestand
                </ShimmerButton>
              </div>
            </GlassCard>
          </Reveal>
        </section>

        <section id="hitte-faq" className="scroll-mt-28">
          <Faq title="FAQ over hittebestendige 3D prints" items={faqItems} />
        </section>

        <section id="hitte-sources" className="scroll-mt-28">
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
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Klaar om hittebestendig te printen?</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Deel je toepassing en ontvang advies over materiaal en planning.
                </p>
              </div>
              <ShimmerButton
                href={contactHref}
                event={{ action: "cta_click", category: "blog_hitte_bottom", label: "contact_prefill" }}
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
