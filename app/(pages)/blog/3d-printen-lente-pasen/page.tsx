import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import { buildArticleJsonLd, buildFaqPageSchema } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/blog/3d-printen-lente-pasen/"
const datePublished = "2024-03-15"
const dateModified = "2026-02-18"
const lastUpdatedLabel = "Laatst bijgewerkt: 18 februari 2026"

export const metadata: Metadata = {
  title: "3D printen voor lente en Pasen 2026 | X3DPrints Blog",
  description:
    "3D printen voor lente en Pasen 2026: paashangers, eieren, tafeldecor en lichtobjecten in PLA, Translucent of PETG. Inclusief checklist, materiaalkeuze en FAQ.",
  alternates: { canonical },
  openGraph: {
    title: "3D printen voor lente en Pasen 2026",
    description:
      "Praktische gids voor paashangers, eieren, tafeldecor en lichtobjecten met de juiste materiaalkeuze, afwerking en planning.",
    url: canonical,
    type: "article",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "3D geprinte lente en paasdecor" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printen voor lente en Pasen 2026",
    description:
      "Praktische gids voor 3D geprinte paasdecoratie met materiaalkeuze, checklist en leverplanning.",
    images: ["/images/og-home.jpg"],
  },
}

const materialRows = [
  { material: "PLA Matte/Silk", use: "Paashangers, eieren, tafeldecor", note: "Nette visuele finish voor indoor" },
  { material: "Translucent PLA", use: "Lichtobjecten en lantaarns", note: "Wanddikte 1.6-2 mm voor zachte gloed" },
  { material: "PETG", use: "Outdoor decor en vochtige omgeving", note: "Beter tegen UV en vocht dan PLA" },
]

const materialTips = [
  "Gebruik layerhoogte 0.16-0.20 mm voor scherpe details op ornamenten en naamtags.",
  "Houd wanddikte boven 1.2 mm voor hangers die met lint of haakjes gebruikt worden.",
  "Voor lichtobjecten werkt Translucent PLA het best met dunne, gelijkmatige wanden.",
  "Ontwerpbestand is niet inbegrepen: lever STL/STEP aan of kies ontwerpservice aan EUR 45/uur.",
  "Voor buitengebruik in lenteweer kies je beter PETG dan standaard PLA.",
]

const useCases = [
  {
    title: "Retail en etalage",
    body: "Seizoensdecor, paasprops en QR-houders voor winkels, boetieks en horeca.",
  },
  {
    title: "Events en tafeldecor",
    body: "Naamplaatjes, centerpieces en branding-elementen voor brunches en bedrijfsevents.",
  },
  {
    title: "Particulier maatwerk",
    body: "Paashangers, gepersonaliseerde eieren en cadeau-items in pastel of translucent look.",
  },
]

const workflowSteps = [
  {
    title: "1. Input",
    body: "Je stuurt STL/STEP of een duidelijke referentie met formaat, kleur en deadline.",
  },
  {
    title: "2. Technische check",
    body: "We beoordelen wanddikte, supports, bevestiging en materiaalkeuze per toepassing.",
  },
  {
    title: "3. Productie",
    body: "We printen, controleren passing en doen indien nodig lichte nabewerking.",
  },
  {
    title: "4. Levering",
    body: "Afhalen in Herzele of verzending met beschermde verpakking voor breekbare onderdelen.",
  },
]

const checklist = [
  "Gebruik: hanger, tafelstuk, display of lichtobject.",
  "Materiaalkeuze: PLA Matte/Silk, Translucent PLA of PETG.",
  "Bevestiging: lint, haak, magneet of voetje.",
  "Afwerking: raw, licht geschuurd of geprimed.",
  "Deadline en leveroptie vermelden in je aanvraag.",
]

const faqItems = [
  {
    q: "Kunnen jullie gepersonaliseerde paasdecor printen met naam of logo?",
    a: "Ja. Lever een STL/STEP aan of laat het ontwerp uitwerken via ontwerpservice aan EUR 45/uur.",
  },
  {
    q: "Welk materiaal is het best voor lichtgevende paasdecoratie?",
    a: "Translucent PLA met wanddikte rond 1.6-2 mm geeft de beste lichtspreiding voor kleine led-opstellingen.",
  },
  {
    q: "Kan 3D geprinte paasdecoratie ook buiten gebruikt worden?",
    a: "Voor buiten raden we PETG aan omdat het beter bestand is tegen vocht en zon dan standaard PLA.",
  },
  {
    q: "Is het 3D model inbegrepen in de printprijs?",
    a: "Nee. Je levert zelf STL/STEP aan, of je kiest aanvullende ontwerpservice.",
  },
  {
    q: "Hoe snel kunnen jullie leveren voor Pasen 2026?",
    a: "Dat hangt af van oplage en afwerking. Met vroege aanvraag kunnen we productie en levering stabiel inplannen.",
  },
]

const references = [
  { label: "UltiMaker PLA material properties", href: "https://ultimaker.com/materials/pla/" },
  { label: "UltiMaker PETG material properties", href: "https://ultimaker.com/materials/s-series-petg/" },
  { label: "Prusa filament material guide", href: "https://help.prusa3d.com/filament-material-guide" },
  { label: "Autodesk STL export basics", href: "https://help.autodesk.com/view/fusion360/ENU/?guid=GUID-1B6AA02D-B8E5-4F54-ADC7-11C5B900E05F" },
]

const inspirationImages = [
  { src: "/images/portfolio/easter1.webp", alt: "3D geprinte paasdecor set met eieren en hangers" },
  { src: "/images/portfolio/Easter2.webp", alt: "3D geprinte paashangers in pastelkleuren" },
  { src: "/images/portfolio/Easter3.webp", alt: "3D geprinte paasornamenten voor tafeldecoratie" },
  { src: "/images/portfolio/Easter4.webp", alt: "3D geprinte translucent paaslantaarn" },
  { src: "/images/portfolio/Easter5.webp", alt: "3D geprinte combinatie van paasdecor en seizoensdisplay" },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "3D printen voor lente en Pasen 2026",
  description: metadata.description ?? "",
  datePublished,
  dateModified,
  image: "https://www.x3dprints.be/images/og-home.jpg",
  inLanguage: "nl-BE",
})

const faqJsonLd = buildFaqPageSchema({
  inLanguage: "nl-BE",
  items: faqItems,
})

export default function BlogSpringEaster() {
  return (
    <main className="relative overflow-clip">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-amber-50" />
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-amber-200/30 blur-3xl" />
      </div>

      <section className="px-6 pb-10 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Seasonal</p>
            <h1 className="mt-2 text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              3D printen voor lente en Pasen 2026
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-lg text-slate-700">
              Wil je paasdecoratie laten maken met 3D printen? In deze gids krijg je direct de juiste materiaalkeuze,
              technische richtlijnen en planning voor paashangers, eieren, tafeldecor en lichtobjecten. Zo beslis je
              sneller en voorkom je misprints vlak voor Pasen.
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/contact?quote=Paasdecor%202026">Plan je paasprints 2026</ShimmerButton>
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
              <Link href="#lente-materialen" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                Materialen
              </Link>
              <Link href="#lente-toepassingen" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                Toepassingen
              </Link>
              <Link href="#lente-planning" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                Planning
              </Link>
              <Link href="#lente-faq" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
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

      <section id="lente-materialen" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Materiaalkeuze voor lente- en paasprints</h2>
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
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-700">
                Meer vergelijkingen vind je op de{" "}
                <Link href="/materials" className="font-semibold text-emerald-700 underline underline-offset-2">
                  materialenpagina
                </Link>
                . Twijfel je tussen PLA en PETG, dan helpt de material suggestion tool op basis van toepassing en omgeving.
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.06}>
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold tracking-tight text-slate-900">Design en aanlevering</h3>
              <p className="mt-3 text-sm text-slate-700">
                Voor 3D printen van paasdecoratie werkt STL of STEP het best. Voeg steeds afmetingen, gewenste kleur en
                montagewijze toe. Zo kunnen we supports, oriëntatie en wanddiktes technisch correct zetten.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>Bestandsformaten: STL of STEP.</li>
                <li>Ontwerpservice: EUR 45/uur (optioneel).</li>
                <li>Model niet inbegrepen in printprijs.</li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/3d-modellen-vinden"
                  className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white"
                >
                  Waar vind je 3D modellen?
                </Link>
                <Link
                  href="/contact?quote=STL%20voor%20paasdecor"
                  className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100"
                >
                  Stuur je bestand door
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="lente-toepassingen" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Toepassingen voor bedrijven en particulieren</h2>
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

      <section id="lente-planning" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Planning en doorlooptijd richting Pasen</h2>
              <p className="mt-3 text-sm text-slate-700">
                Voor paasprojecten ontstaan pieken in maart en april. Vroege intake voorkomt bottlenecks en geeft ruimte
                voor een extra testprint. Zo krijg je voorspelbare timing zonder last-minute druk.
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
                <ShimmerButton href="/contact?quote=Paasproject%20met%20deadline">Vraag timing en offerte</ShimmerButton>
                <Link
                  href="/pricing"
                  className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white"
                >
                  Bekijk prijzen en opties
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

      <section id="lente-faq" className="scroll-mt-28 px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">FAQ: 3D printen voor lente en Pasen</h2>
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

      <section id="lente-sources" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
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
                        className="font-semibold text-indigo-600 transition hover:text-indigo-500"
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
