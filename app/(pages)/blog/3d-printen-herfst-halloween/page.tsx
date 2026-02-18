import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import { buildArticleJsonLd, buildFaqPageSchema } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/blog/3d-printen-herfst-halloween/"
const datePublished = "2024-10-01"
const dateModified = "2026-02-18"
const lastUpdatedLabel = "Laatst bijgewerkt: 18 februari 2026"

export const metadata: Metadata = {
  title: "3D printen voor herfst en Halloween 2026 | X3DPrints Blog",
  description:
    "3D printen voor herfst en Halloween 2026: decorstukken, props en display-items in PLA, PETG en TPU. Inclusief materiaaladvies, checklist en FAQ.",
  alternates: { canonical },
  openGraph: {
    title: "3D printen voor herfst en Halloween 2026",
    description:
      "Praktische gids voor Halloween en herfstprints met duidelijke materiaalkeuze en planning.",
    url: canonical,
    type: "article",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "3D geprinte Halloween decoratie" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printen voor herfst en Halloween 2026",
    description:
      "Gids voor Halloween 3D prints met materiaalkeuze, technische tips en planningschecklist.",
    images: ["/images/og-home.jpg"],
  },
}

const materialRows = [
  { material: "PLA Matte/Silk", use: "Indoor decor, props en tafelelementen", note: "Kleursterk en strak voor visueel werk" },
  { material: "PETG", use: "Outdoor decor en intensiever gebruik", note: "Beter bestand tegen vocht en temperatuurschommelingen" },
  { material: "TPU", use: "Flexibele details en antislip contactpunten", note: "Nuttig voor grip en impactzones" },
]

const materialTips = [
  "Voor buitenopstellingen in herfstweer is PETG vaak beter dan PLA.",
  "Voor indoor Halloween decor werkt PLA Matte/Silk uitstekend qua look.",
  "Gebruik TPU waar wrijving of flexibiliteit belangrijk is.",
  "Controleer bevestiging en gewicht bij hangende decorstukken.",
  "Model niet inbegrepen in printprijs: lever STL/STEP of kies ontwerpservice.",
]

const useCases = [
  {
    title: "Retail en horeca",
    body: "Etalageprops, tafeldecor en seizoensgebonden signalisatie voor herfstcampagnes.",
  },
  {
    title: "Events en attracties",
    body: "Themed decor, custom props en functionele houders voor tijdelijke opstellingen.",
  },
  {
    title: "Particuliere decoratie",
    body: "Pompoen- en spooky decor, naamitems en unieke gepersonaliseerde elementen.",
  },
]

const workflowSteps = [
  {
    title: "1. Intake",
    body: "Je deelt model of referentie met formaat, kleur en deadline.",
  },
  {
    title: "2. Technische check",
    body: "We controleren wanddikte, bevestiging en materiaalfit voor binnen of buiten.",
  },
  {
    title: "3. Productie",
    body: "Printen, kwaliteitscontrole en optionele nabewerking.",
  },
  {
    title: "4. Levering",
    body: "Afhalen of beschermde verzending volgens timing.",
  },
]

const checklist = [
  "Gebruik: decor, display, eventprop of functioneel onderdeel.",
  "Binnen- of buitenopstelling vermelden.",
  "Materiaal kiezen op basis van vocht, stootbelasting en zichtwerk.",
  "Bevestiging, draagpunten en montage vooraf bepalen.",
  "Deadline en leverwijze expliciet meegeven.",
]

const faqItems = [
  {
    q: "Welk materiaal is best voor Halloween decor buiten?",
    a: "Voor buitengebruik is PETG meestal de beste keuze door betere weerstand tegen vocht en temperatuur.",
  },
  {
    q: "Kunnen jullie ook kleine eventreeksen printen?",
    a: "Ja. Kleine en middelgrote batches voor events en activaties zijn mogelijk.",
  },
  {
    q: "Is modelontwerp inbegrepen?",
    a: "Nee. Je levert STL/STEP aan of kiest ontwerpservice aan EUR 45/uur.",
  },
  {
    q: "Welke details moet ik meesturen voor snelle offerte?",
    a: "Formaat, kleur, toepassing, binnen/buiten gebruik, gewenste aantallen en deadline.",
  },
  {
    q: "Kunnen breekbare decorstukken veilig verzonden worden?",
    a: "Ja. We voorzien beschermde verpakking en adviseren waar modulair ontwerp transport veiliger maakt.",
  },
]

const references = [
  { label: "UltiMaker PLA material properties", href: "https://ultimaker.com/materials/pla/" },
  { label: "UltiMaker PETG material properties", href: "https://ultimaker.com/materials/s-series-petg/" },
  { label: "Prusa filament material guide", href: "https://help.prusa3d.com/filament-material-guide" },
  { label: "Autodesk STL export basics", href: "https://help.autodesk.com/view/fusion360/ENU/?guid=GUID-1B6AA02D-B8E5-4F54-ADC7-11C5B900E05F" },
]

const inspirationImages = [
  { src: "/images/portfolio/halloween1.webp", alt: "3D geprinte Halloween decor set 1" },
  { src: "/images/portfolio/Halloween2.webp", alt: "3D geprinte Halloween decor set 2" },
  { src: "/images/portfolio/Halloween3.webp", alt: "3D geprinte Halloween decor set 3" },
  { src: "/images/portfolio/Halloween4.webp", alt: "3D geprinte Halloween decor set 4" },
  { src: "/images/portfolio/Halloween5.webp", alt: "3D geprinte Halloween decor set 5" },
  { src: "/images/portfolio/Halloween6.webp", alt: "3D geprinte Halloween decor set 6" },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "3D printen voor herfst en Halloween 2026",
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

export default function BlogAutumnHalloween() {
  return (
    <main className="relative overflow-clip">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-50" />
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-orange-200/30 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-amber-200/30 blur-3xl" />
      </div>

      <section className="px-6 pb-10 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-700">Seasonal</p>
            <h1 className="mt-2 text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              3D printen voor herfst en Halloween 2026
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-lg text-slate-700">
              Wil je Halloween props of herfstdecor snel laten maken met 3D printen? Deze gids geeft je meteen de juiste
              materiaalkeuze, technische richtlijnen en planning voor betrouwbare uitvoering.
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/contact?quote=Halloween%20project%202026">Plan je Halloweenprints 2026</ShimmerButton>
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
              <Link href="#herfst-materialen" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                Materialen
              </Link>
              <Link href="#herfst-toepassingen" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                Toepassingen
              </Link>
              <Link href="#herfst-planning" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                Planning
              </Link>
              <Link href="#herfst-faq" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
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

      <section id="herfst-materialen" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Materiaalkeuze voor Halloween prints</h2>
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
                    <span className="mt-1 h-2 w-2 rounded-full bg-orange-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-700">
                Combineer seizoenslook met technische betrouwbaarheid via{" "}
                <Link href="/materials" className="font-semibold text-orange-700 underline underline-offset-2">
                  materialen en richtlijnen
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.06}>
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold tracking-tight text-slate-900">Bestanden en technische input</h3>
              <p className="mt-3 text-sm text-slate-700">
                STL of STEP is aanbevolen. Stuur ook context mee: binnen of buiten, montagewijze en gewenste impactbestendigheid.
                Dat versnelt correcte materiaal- en ontwerpkeuze.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>Bestanden: STL en STEP.</li>
                <li>Ontwerpservice: EUR 45/uur indien nodig.</li>
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
                  href="/contact?quote=STL%20halloween"
                  className="rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-800 transition hover:bg-orange-100"
                >
                  Stuur je bestand door
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="herfst-toepassingen" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Toepassingen voor herfst en Halloween</h2>
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

      <section id="herfst-planning" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Planning richting seizoenspiek</h2>
              <p className="mt-3 text-sm text-slate-700">
                Herfstcampagnes en Halloween deadlines vallen vaak samen. Vroege intake geeft ruimte voor technische checks,
                testprints en betrouwbare levering zonder last-minute fouten.
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
                <ShimmerButton href="/contact?quote=Halloween%20deadline">Vraag timing en offerte</ShimmerButton>
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

      <section id="herfst-faq" className="scroll-mt-28 px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">FAQ: 3D printen voor herfst en Halloween</h2>
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

      <section id="herfst-sources" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
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
                        className="font-semibold text-orange-700 transition hover:text-orange-600"
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
