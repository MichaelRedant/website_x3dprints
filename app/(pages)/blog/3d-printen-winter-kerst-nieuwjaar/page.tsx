import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import { buildArticleJsonLd, buildFaqPageSchema } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/blog/3d-printen-winter-kerst-nieuwjaar/"
const datePublished = "2024-11-15"
const dateModified = "2026-02-18"
const lastUpdatedLabel = "Laatst bijgewerkt: 18 februari 2026"

export const metadata: Metadata = {
  title: "3D printen voor winter, Kerst en Nieuwjaar 2026 | X3DPrints Blog",
  description:
    "3D printen voor winter 2026, Kerst en Nieuwjaar: decor, ornamenten en eventprops in PLA, PETG en TPU. Inclusief materiaalkeuze, checklist en FAQ.",
  alternates: { canonical },
  openGraph: {
    title: "3D printen voor winter, Kerst en Nieuwjaar 2026",
    description:
      "Praktische gids voor eindejaarsprints met materiaaladvies, technische tips en planning.",
    url: canonical,
    type: "article",
    images: [{ url: "/images/og-home-nl.svg", width: 1200, height: 630, alt: "3D geprinte kerstdecoratie" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printen voor winter, Kerst en Nieuwjaar 2026",
    description:
      "Gids voor winterse 3D prints met materiaalkeuze, checklist en planning richting eindejaar.",
    images: ["/images/og-home-nl.svg"],
  },
}

const materialRows = [
  { material: "PLA Silk/Marble/Matte", use: "Ornamenten, tafeldecor, naamtags", note: "Sterke look voor indoor presentatie" },
  { material: "Translucent PLA", use: "Lichtobjecten en lantaarns", note: "1.6-2 mm wanddikte voor diffuse gloed" },
  { material: "PETG", use: "Outdoor of warmere zones", note: "Beter bestand tegen vocht en hogere temperatuur" },
  { material: "TPU", use: "Antislip of flexdetails", note: "Handig voor stabiele opstelling" },
]

const materialTips = [
  "Gebruik Silk of Marble PLA voor premium eindejaarslook.",
  "Translucent PLA werkt goed voor lichtdecor met kleine leds.",
  "Voor buiten- of deuropstellingen is PETG meestal veiliger.",
  "Gebruik TPU voor antislip voeten onder displays of decorstukken.",
  "Model niet inbegrepen in printprijs: STL/STEP aanleveren of ontwerpservice kiezen.",
]

const useCases = [
  {
    title: "Retail en etalage",
    body: "Kerstdisplay, branded ornamenten en seizoenssignage voor winkelpresentatie.",
  },
  {
    title: "Bedrijfsevents",
    body: "Tafeldecor, naamkaarten, giveaways en props voor eindejaarsactiviteiten.",
  },
  {
    title: "Particuliere decoratie",
    body: "Kerstornamenten, lichtobjecten en gepersonaliseerde cadeaustukken.",
  },
]

const workflowSteps = [
  {
    title: "1. Intake",
    body: "Je levert model of referentie met formaat, kleur en deadline.",
  },
  {
    title: "2. Technische check",
    body: "We valideren materiaal, wanddikte en montage voor je toepassing.",
  },
  {
    title: "3. Productie",
    body: "Printen, kwaliteitscontrole en optionele afwerking.",
  },
  {
    title: "4. Oplevering",
    body: "Afhalen of verzending in beschermde verpakking.",
  },
]

const checklist = [
  "Type project: ornament, tafeldecor, display of eventprop.",
  "Indoor/outdoor context en verwachte belasting delen.",
  "Materiaalkeuze op basis van look en omstandigheden.",
  "Bevestiging en montagepunten vooraf definiÃ«ren.",
  "Deadline en leverwijze duidelijk aangeven.",
]

const faqItems = [
  {
    q: "Welk materiaal gebruik ik voor kerstornamenten binnen?",
    a: "PLA Silk, Marble of Matte is vaak ideaal voor indoor ornamenten met sterke visuele afwerking.",
  },
  {
    q: "Kan ik lichtgevende kerstdecor laten printen?",
    a: "Ja. Translucent PLA met aangepaste wanddikte is geschikt voor zachte lichtspreiding.",
  },
  {
    q: "Kunnen jullie Korte reeksen voor bedrijfsevents leveren?",
    a: "Ja. Kleine en middelgrote reeksen voor events en retailcampagnes zijn mogelijk.",
  },
  {
    q: "Is modelontwerp inbegrepen?",
    a: "Nee. Je levert STL/STEP aan of kiest ontwerpservice aan EUR 45/uur.",
  },
  {
    q: "Hoe plan ik veilig richting eindejaarspiek?",
    a: "Start vroeg zodat materiaalkeuze, testprint en levering niet in conflict komen met piekweken.",
  },
]

const references = [
  { label: "UltiMaker PLA material properties", href: "https://ultimaker.com/materials/pla/" },
  { label: "UltiMaker PETG material properties", href: "https://ultimaker.com/materials/s-series-petg/" },
  { label: "Prusa filament material guide", href: "https://help.prusa3d.com/filament-material-guide" },
  { label: "Autodesk STL export basics", href: "https://help.autodesk.com/view/fusion360/ENU/?guid=GUID-1B6AA02D-B8E5-4F54-ADC7-11C5B900E05F" },
]

const inspirationImages = [
  { src: "/images/portfolio/XmasBalls.webp", alt: "3D geprinte kerstdecor set 1" },
  { src: "/images/portfolio/XmasBalls2.webp", alt: "3D geprinte kerstdecor set 2" },
  { src: "/images/portfolio/XmasDoorTrim.webp", alt: "3D geprinte kerstdecor set 3" },
  { src: "/images/portfolio/XmasScene.webp", alt: "3D geprinte kerstdecor set 4" },
  { src: "/images/portfolio/xmasTree.jpg", alt: "3D geprinte kerstdecor set 5" },
  { src: "/images/portfolio/IMG-20241106-WA0000.jpg", alt: "3D geprinte kerstdecor set 6" },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "3D printen voor winter, Kerst en Nieuwjaar 2026",
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

export default function BlogWinter() {
  return (
    <main className="relative overflow-clip">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50" />
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-indigo-200/30 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-slate-200/30 blur-3xl" />
      </div>

      <section className="px-6 pb-10 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">Seasonal</p>
            <h1 className="mt-2 text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              3D printen voor winter, Kerst en Nieuwjaar 2026
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-lg text-slate-700">
              Wil je decor, ornamenten of eventprops voor het eindejaar laten printen? Deze gids geeft je meteen de juiste
              materiaalkeuze en planning zodat je zonder deadline-stress levert richting Kerst en Nieuwjaar.
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/contact?quote=Kerstproject%202026">Plan je eindejaarsprints 2026</ShimmerButton>
              <Link
                href="/segments/3d-printing-seasonal"
                className="rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:bg-white"
              >
                Naar seasonal segment
              </Link>
              <Link
                href="/materials#material-suggestion-tool"
                className="rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:bg-white"
              >
                Material suggestion tool
              </Link>
            </div>
            <nav aria-label="Snelle sectienavigatie" className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
              <Link href="#winter-materialen" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                Materialen
              </Link>
              <Link href="#winter-toepassingen" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                Toepassingen
              </Link>
              <Link href="#winter-planning" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                Planning
              </Link>
              <Link href="#winter-faq" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
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

      <section id="winter-materialen" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Materiaalkeuze voor eindejaarsprints</h2>
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
                    <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-700">
                Gebruik{" "}
                <Link href="/materials" className="font-semibold text-indigo-700 underline underline-offset-2">
                  materialen en richtlijnen
                </Link>{" "}
                om snel te kiezen tussen visuele en functionele eisen.
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.06}>
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold tracking-tight text-slate-900">Bestanden en voorbereiding</h3>
              <p className="mt-3 text-sm text-slate-700">
                STL of STEP is aanbevolen. Vermeld context zoals binnen/buiten gebruik, bevestiging en eventuele lichtintegratie.
                Zo kunnen we technisch correct voorbereiden zonder extra iteraties.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>Bestanden: STL en STEP.</li>
                <li>Ontwerpservice mogelijk: EUR 45/uur.</li>
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
                  href="/contact?quote=STL%20kerstdecor"
                  className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-800 transition hover:bg-indigo-100"
                >
                  Stuur je bestand door
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="winter-toepassingen" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Toepassingen voor winter en eindejaar</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {useCases.map((item) => (
                  <article key={item.title} className="rounded-2xl border border-slate-200/70 bg-white/80 p-4">
                    <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-700">{item.body}</p>
                  </article>
                ))}
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {inspirationImages.map((img, idx) => (
                  <div
                    key={img.src}
                    className={`overflow-hidden rounded-xl border border-white/70 bg-white/80 shadow-sm ${idx === inspirationImages.length - 1 ? "sm:col-span-2" : ""}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={idx === inspirationImages.length - 1 ? 960 : 640}
                      height={idx === inspirationImages.length - 1 ? 540 : 480}
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

      <section id="winter-planning" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Planning richting eindejaarspiek</h2>
              <p className="mt-3 text-sm text-slate-700">
                Eindejaarsprojecten hebben korte deadlines en hoge volumes. Door vroeg te starten vermijd je bottlenecks en
                blijft er ruimte voor technische optimalisatie of testprints.
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
                <ShimmerButton href="/contact?quote=Kerst%20deadline">Vraag timing en offerte</ShimmerButton>
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

      <section id="winter-faq" className="scroll-mt-28 px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">FAQ: 3D printen voor winter en eindejaar</h2>
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

      <section id="winter-sources" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
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
                        className="font-semibold text-indigo-700 transition hover:text-indigo-600"
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
