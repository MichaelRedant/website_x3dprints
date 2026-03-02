import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import { buildArticleJsonLd, buildFaqPageSchema } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/blog/3d-printen-vaderdag-moederdag/"
const datePublished = "2025-03-15"
const dateModified = "2026-02-18"
const lastUpdatedLabel = "Laatst bijgewerkt: 18 februari 2026"

export const metadata: Metadata = {
  title: "3D printen voor Vaderdag en Moederdag 2026 | X3DPrints Blog",
  description:
    "3D printen voor Vaderdag en Moederdag 2026: gepersonaliseerde cadeaus, sleutelhangers en desk items in PLA, PETG en TPU. Inclusief materiaaladvies, checklist en FAQ.",
  alternates: { canonical },
  openGraph: {
    title: "3D printen voor Vaderdag en Moederdag 2026",
    description:
      "Praktische gids voor gepersonaliseerde gifts met duidelijke materiaalkeuze en planning richting mei en juni.",
    url: canonical,
    type: "article",
    images: [{ url: "/images/og-home-nl.svg", width: 1200, height: 630, alt: "3D geprinte Vaderdag en Moederdag cadeaus" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printen voor Vaderdag en Moederdag 2026",
    description:
      "Gids voor 3D geprinte cadeaus met materiaalkeuze, checklist en planning voor mei-juni 2026.",
    images: ["/images/og-home-nl.svg"],
  },
}

const materialRows = [
  { material: "PLA Silk/Matte", use: "Naamcadeaus, decoratieve gifts", note: "Sterke visuele afwerking voor indoor gebruik" },
  { material: "PETG", use: "Sleutelhangers, robuuste desk items", note: "Beter bestand tegen dagelijks gebruik" },
  { material: "TPU", use: "Antislip pads en flexibele details", note: "Extra grip en schokabsorptie" },
]

const materialTips = [
  "Voor glansrijke gifts kies je Silk PLA, voor subtiele look Matte PLA.",
  "Voor sleutelhangers of items met intensiever gebruik is PETG meestal beter.",
  "Gebruik TPU voor antislip contactpunten op bureaus of gladde oppervlakken.",
  "Houd tekstdiepte minimaal 0.6 mm voor leesbare namen en initialen.",
  "Model is niet inbegrepen in printprijs: STL/STEP aanleveren of ontwerpservice kiezen.",
]

const useCases = [
  {
    title: "B2B gifts",
    body: "Gepersonaliseerde relatiegeschenken en kleine branded reeksen voor teams of klanten.",
  },
  {
    title: "Persoonlijke cadeaus",
    body: "Naamcadeaus, sleutelhangers en bureau-items op maat voor ouders.",
  },
  {
    title: "Korte reeksen",
    body: "Consistente batches in dezelfde kleur en afwerking voor grotere aantallen.",
  },
]

const workflowSteps = [
  {
    title: "1. Briefing",
    body: "Je bezorgt model of referentie met formaat, kleur en deadline.",
  },
  {
    title: "2. Technische check",
    body: "We controleren tekstleesbaarheid, wanddikte en materiaalfit.",
  },
  {
    title: "3. Productie",
    body: "Printen, kwaliteitscontrole en optioneel lichte nabewerking.",
  },
  {
    title: "4. Levering",
    body: "Afhalen in Herzele of beschermde verzending op timing.",
  },
]

const checklist = [
  "Type item: sleutelhanger, naamplaat, desk item of decor.",
  "Materiaal: PLA voor look, PETG voor sterkte, TPU voor grip.",
  "Personalisatie: naam, initialen, logo en positie.",
  "Gewenste afwerking: raw, licht geschuurd of geprimed.",
  "Deadline en levervoorkeur duidelijk meegeven.",
]

const faqItems = [
  {
    q: "Kunnen jullie meerdere namen in een batch printen?",
    a: "Ja. Lever een lijst of aparte STL/STEP-bestanden. We batchen per kleur voor consistente output.",
  },
  {
    q: "Welk materiaal is het best voor sleutelhangers?",
    a: "PETG is meestal de beste keuze voor dagelijks gebruik door hogere slijtvastheid.",
  },
  {
    q: "Is ontwerp inbegrepen in de printprijs?",
    a: "Nee. Je levert STL/STEP aan of kiest ontwerpservice aan EUR 45/uur.",
  },
  {
    q: "Kunnen jullie ook kleine B2B reeksen maken?",
    a: "Ja. Kleine en middelgrote series voor relatiegeschenken of events zijn mogelijk.",
  },
  {
    q: "Hoe plan ik best richting mei-juni 2026?",
    a: "Start vroeg zodat technische check, testprint en levering zonder tijdsdruk gebeuren.",
  },
]

const references = [
  { label: "UltiMaker PLA material properties", href: "https://ultimaker.com/materials/pla/" },
  { label: "UltiMaker PETG material properties", href: "https://ultimaker.com/materials/s-series-petg/" },
  { label: "Prusa filament material guide", href: "https://help.prusa3d.com/filament-material-guide" },
  { label: "Autodesk STL export basics", href: "https://help.autodesk.com/view/fusion360/ENU/?guid=GUID-1B6AA02D-B8E5-4F54-ADC7-11C5B900E05F" },
]

const inspirationImages = [
  { src: "/images/portfolio/vaderdag.webp", alt: "3D geprinte Vaderdag sleutelhangers" },
  { src: "/images/portfolio/vaderdag2.webp", alt: "3D geprinte Vaderdag desk items" },
  { src: "/images/portfolio/vaderdag3.webp", alt: "3D geprint gepersonaliseerd Vaderdag cadeau" },
  { src: "/images/portfolio/moederdag.webp", alt: "3D geprint Moederdag cadeau in Silk PLA" },
  { src: "/images/portfolio/moederdag2.webp", alt: "3D geprinte Moederdag organizer set" },
  { src: "/images/portfolio/moederdag3.webp", alt: "3D geprint Moederdag naamcadeau" },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "3D printen voor Vaderdag en Moederdag 2026",
  description: metadata.description ?? "",
  datePublished,
  dateModified,
  image: "https://www.x3dprints.be/images/og-home-nl.svg",
  inLanguage: "nl-BE",
})

const faqJsonLd = buildFaqPageSchema({
  inLanguage: "nl-BE",
  items: faqItems,
})

export default function BlogParentsDay() {
  return (
    <main className="relative overflow-clip">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-amber-50" />
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-rose-200/30 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-amber-200/30 blur-3xl" />
      </div>

      <section className="px-6 pb-10 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-700">Seasonal</p>
            <h1 className="mt-2 text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              3D printen voor Vaderdag en Moederdag 2026
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-lg text-slate-700">
              Wil je gepersonaliseerde cadeaus laten printen voor Vaderdag of Moederdag? Deze gids geeft je direct de juiste
              materiaalkeuze en planning voor betrouwbare levering richting mei en juni 2026.
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/contact?quote=Vaderdag%20Moederdag%202026">Plan je gift run 2026</ShimmerButton>
              <Link
                href="/segments/3d-printing-vaderdag-moederdag"
                className="rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:bg-white"
              >
                Naar het segment
              </Link>
              <Link
                href="/materials#material-suggestion-tool"
                className="rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:bg-white"
              >
                Material suggestion tool
              </Link>
            </div>
            <nav aria-label="Snelle sectienavigatie" className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
              <Link href="#ouders-materialen" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                Materialen
              </Link>
              <Link href="#ouders-toepassingen" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                Toepassingen
              </Link>
              <Link href="#ouders-planning" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                Planning
              </Link>
              <Link href="#ouders-faq" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                FAQ
              </Link>
              <Link href="#sources" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                Bronnen
              </Link>
            </nav>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section id="ouders-materialen" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Materiaalkeuze voor cadeauprints</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-slate-500">
                      <th className="py-2 pr-4">Materiaal</th>
                      <th className="py-2 pr-4">Gebruik</th>
                      <th className="py-2 pr-4">Notities</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {materialRows.map((row) => (
                      <tr key={row.material}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{row.material}</td>
                        <td className="py-3 pr-4">{row.use}</td>
                        <td className="py-3 pr-4">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {materialTips.map((tip) => (
                  <li key={tip} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-rose-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-700">
                Voor een snelle keuze tussen visual-first en function-first materialen gebruik je{" "}
                <Link href="/materials" className="font-semibold text-rose-700 underline underline-offset-2">
                  materialen en richtlijnen
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.06}>
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold tracking-tight text-slate-900">Input en bestanden</h3>
              <p className="mt-3 text-sm text-slate-700">
                STL of STEP is aanbevolen. Geef ook aantallen, kleur en personalisatie door zodat we direct kunnen plannen
                met minimale revisies.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>Bestanden: STL en STEP.</li>
                <li>Ontwerpservice optioneel: EUR 45/uur.</li>
                <li>Model niet inbegrepen in print-only prijs.</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/3d-modellen-vinden"
                  className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white"
                >
                  Waar vind je modellen?
                </Link>
                <Link
                  href="/contact?quote=STL%20cadeau"
                  className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-800 transition hover:bg-rose-100"
                >
                  Stuur je bestand door
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="ouders-toepassingen" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Toepassingen voor persoonlijke en B2B gifts</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {useCases.map((item) => (
                  <article key={item.title} className="rounded-2xl border border-slate-200/70 bg-white/80 p-4">
                    <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-700">{item.body}</p>
                  </article>
                ))}
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {inspirationImages.map((img, idx) => (
                  <div
                    key={img.src}
                    className={`overflow-hidden rounded-xl border border-white/70 bg-white/80 shadow-sm ${idx === 0 ? "sm:col-span-2" : ""}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={idx === 0 ? 960 : 640}
                      height={idx === 0 ? 540 : 480}
                      className="h-full w-full object-cover"
                      sizes="(min-width: 1024px) 320px, 100vw"
                      priority={idx === 0}
                    />
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="ouders-planning" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Planning richting mei en juni</h2>
              <p className="mt-3 text-sm text-slate-700">
                Vroege intake vermindert last-minute risico op personalisatieprojecten en laat ruimte voor technische check of
                proefprint wanneer dat nodig is.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {workflowSteps.map((step) => (
                  <div key={step.title} className="rounded-2xl border border-slate-200/70 bg-white/80 p-4">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-900">{step.title}</h3>
                    <p className="mt-2 text-sm text-slate-700">{step.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <ShimmerButton href="/contact?quote=Vaderdag%20Moederdag%20deadline">Vraag timing en offerte</ShimmerButton>
                <Link
                  href="/pricing"
                  className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white"
                >
                  Bekijk prijzen
                </Link>
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.06}>
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold tracking-tight text-slate-900">Aanvraagchecklist</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {checklist.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="ouders-faq" className="scroll-mt-28 px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">FAQ: 3D printen voor Vaderdag en Moederdag</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                {faqItems.map((item) => (
                  <article key={item.q} className="rounded-xl border border-slate-200/70 bg-white/70 p-4">
                    <h3 className="font-semibold text-slate-800">{item.q}</h3>
                    <p className="mt-1">{item.a}</p>
                  </article>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="ouders-sources" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 id="sources" className="text-2xl font-bold tracking-tight text-slate-900">
                Bronnen en referenties
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {references.map((reference) => (
                  <li key={reference.href} className="rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3">
                    <cite className="not-italic">
                      <a
                        href={reference.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-rose-700 transition hover:text-rose-600"
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BlogAuthorNote locale="nl" />
    </main>
  )
}
