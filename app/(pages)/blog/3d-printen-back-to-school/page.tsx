import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import VideoGallery from "@/components/VideoGallery"
import { buildArticleJsonLd, buildFaqPageSchema } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/blog/3d-printen-back-to-school/"
const datePublished = "2025-07-15"
const dateModified = "2026-02-18"
const lastUpdatedLabel = "Laatst bijgewerkt: 18 februari 2026"

export const metadata: Metadata = {
  title: "Back to School 2026: 3D printen voor school | X3DPrints Blog",
  description:
    "3D printen voor Back to School 2026: pennenhouders, naamplaatjes, organizers en STEM-modellen in PLA, PETG en TPU. Inclusief materiaaladvies, checklist en FAQ.",
  alternates: { canonical },
  openGraph: {
    title: "Back to School 2026: 3D printen voor school",
    description:
      "Praktische gids voor educatieve en gepersonaliseerde schoolprints met duidelijke materiaal- en planningskeuzes.",
    url: canonical,
    type: "article",
    images: [{ url: "/images/og-home-nl.svg", width: 1200, height: 630, alt: "Back to School 3D prints" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Back to School 2026: 3D printen voor school",
    description:
      "Gids voor Back to School 3D prints met materiaalkeuze, checklist en leverplanning.",
    images: ["/images/og-home-nl.svg"],
  },
}

const materialRows = [
  { material: "PLA Matte", use: "Naamplaatjes en visuele organizers", note: "Leesbare tekst en nette afwerking" },
  { material: "PETG", use: "Robuuste schoolonderdelen en houders", note: "Sterker bij dagelijks gebruik" },
  { material: "TPU", use: "Antislip pads en flexibele clips", note: "Meer grip en schokdemping" },
]

const materialTips = [
  "PLA Matte is vaak de beste keuze voor duidelijke tekst en cleane afwerking.",
  "PETG is beter wanneer onderdelen intensief gebruikt of belast worden.",
  "Gebruik TPU waar grip of flex belangrijk is, zoals antislip contactvlakken.",
  "Houd tekstdiepte minimaal 0.6 mm voor betrouwbare leesbaarheid.",
  "Model niet inbegrepen in printprijs: STL/STEP aanleveren of ontwerpservice kiezen.",
]

const useCases = [
  {
    title: "Scholen en STEM",
    body: "Didactische modellen, klasgebruik en praktische hulpmiddelen op maat.",
  },
  {
    title: "Bureau-organisatie",
    body: "Naamlabels, pennenhouders en organizers voor leerlingen en leerkrachten.",
  },
  {
    title: "Kleine reeksen",
    body: "Batches met meerdere namen of klassen, consistent in kleur en afwerking.",
  },
]

const workflowSteps = [
  {
    title: "1. Briefing",
    body: "Je levert model of referentie met formaat, kleur en deadline.",
  },
  {
    title: "2. Technische check",
    body: "We valideren materiaalkeuze, leesbaarheid en mechanische belasting.",
  },
  {
    title: "3. Productie",
    body: "Printen, kwaliteitscontrole en optionele nabewerking.",
  },
  {
    title: "4. Levering",
    body: "Afhalen in Herzele of verzending volgens planning.",
  },
]

const checklist = [
  "Type project: naamplaat, organizer, STEM-model of accessoire.",
  "Materiaalkeuze: PLA, PETG of TPU op basis van gebruik.",
  "Personalisatie: namenlijst, logo of klascode duidelijk aanleveren.",
  "Afwerking: raw, licht geschuurd of geprimed.",
  "Deadline en levermethode expliciet doorgeven.",
]

const faqItems = [
  {
    q: "Welk materiaal raden jullie aan voor schoolgebruik?",
    a: "PLA Matte voor leesbare labels en visuele stukken, PETG voor robuust dagelijks gebruik, TPU voor antislip en flex.",
  },
  {
    q: "Kunnen jullie meerdere namen in één batch produceren?",
    a: "Ja. Lever een namenlijst of meerdere STL/STEP-bestanden; we batchen efficiënt en consistent.",
  },
  {
    q: "Is modelontwerp inbegrepen in de printprijs?",
    a: "Nee. Je levert STL/STEP aan of kiest ontwerpservice aan EUR 45/uur.",
  },
  {
    q: "Kunnen jullie ook educatieve STEM-modellen printen?",
    a: "Ja. Zowel visuele modellen als functionele onderdelen voor lescontext zijn mogelijk.",
  },
  {
    q: "Hoe plan ik best richting augustus-september?",
    a: "Start vroeg zodat materiaalkeuze, eventuele testprints en levering zonder piekdruk verlopen.",
  },
]

const references = [
  { label: "UltiMaker PLA material properties", href: "https://ultimaker.com/materials/pla/" },
  { label: "UltiMaker PETG material properties", href: "https://ultimaker.com/materials/s-series-petg/" },
  { label: "Prusa filament material guide", href: "https://help.prusa3d.com/filament-material-guide" },
  { label: "Autodesk STL export basics", href: "https://help.autodesk.com/view/fusion360/ENU/?guid=GUID-1B6AA02D-B8E5-4F54-ADC7-11C5B900E05F" },
]

const inspirationImages = [
  { src: "/images/portfolio/back2school%20(1).webp", alt: "Back to School set met pennenhouder en naamplaat" },
  { src: "/images/portfolio/back2school%20(2).webp", alt: "Gepersonaliseerde bureau organizer voor school" },
  { src: "/images/portfolio/back2school%20(3).webp", alt: "Back to School kit met labels en houder" },
]

const videos = [
  {
    id: "JRWyFUfqUlM",
    title: "Funko dude custom",
    description: "Gepersonaliseerd desk figuur als school- of bureaubuddy.",
  },
  {
    id: "yEN9ZY75pDg",
    title: "Potloodhouder op aanvraag",
    description: "Pennenhouder in PLA Matte op maat van gebruik.",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "Back to School 2026: 3D printen voor school",
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

export default function BlogBackToSchool() {
  return (
    <main className="relative overflow-clip">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-lime-50 via-white to-amber-50" />
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-lime-200/30 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-amber-200/30 blur-3xl" />
      </div>

      <section className="px-6 pb-10 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-700">Seasonal</p>
            <h1 className="mt-2 text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Back to School 2026: 3D printen voor school
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-lg text-slate-700">
              Wil je schoolmaterialen of educatieve modellen laten printen? Deze gids geeft je direct de juiste
              materiaalkeuze en planning voor augustus-september 2026, zonder last-minute verrassingen.
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/contact?quote=Back%20to%20School%202026">Plan schoolprints 2026</ShimmerButton>
              <Link
                href="/segments/3d-printing-back-to-school"
                className="rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:bg-white"
              >
                Naar Back to School segment
              </Link>
              <Link
                href="/materials#material-suggestion-tool"
                className="rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:bg-white"
              >
                Material suggestion tool
              </Link>
            </div>
            <nav aria-label="Snelle sectienavigatie" className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
              <Link href="#school-materialen" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                Materialen
              </Link>
              <Link href="#school-toepassingen" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                Toepassingen
              </Link>
              <Link href="#school-planning" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
                Planning
              </Link>
              <Link href="#school-faq" className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 hover:bg-white">
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

      <section id="school-materialen" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Materiaalkeuze voor schoolprints</h2>
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
                    <span className="mt-1 h-2 w-2 rounded-full bg-lime-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-700">
                Bij twijfel tussen visual-first en function-first kies je sneller via{" "}
                <Link href="/materials" className="font-semibold text-lime-700 underline underline-offset-2">
                  materialen en richtlijnen
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.06}>
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold tracking-tight text-slate-900">Bestanden en input</h3>
              <p className="mt-3 text-sm text-slate-700">
                STL of STEP is aanbevolen. Geef klasnamen, aantallen en kleurcodes in één briefing zodat batchproductie
                efficiënt en consistent kan verlopen.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>Bestandsformaten: STL en STEP.</li>
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
                  href="/contact?quote=STL%20schoolproject"
                  className="rounded-full border border-lime-200 bg-lime-50 px-4 py-2 text-sm font-semibold text-lime-800 transition hover:bg-lime-100"
                >
                  Stuur je bestand door
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="school-toepassingen" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Toepassingen voor Back to School</h2>
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

      <section id="school-planning" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Planning richting augustus en september</h2>
              <p className="mt-3 text-sm text-slate-700">
                Vroege intake voorkomt piekstress en laat ruimte voor technische controle op leesbaarheid, passing en materiaalfouten.
                Dat is cruciaal bij klas- of batchprojecten.
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
                <ShimmerButton href="/contact?quote=Back%20to%20School%20deadline">Vraag timing en offerte</ShimmerButton>
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

      <section id="school-video" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900">Video</h2>
                  <p className="text-sm text-slate-700">Desk buddies en organizers in praktijk (lichte embed).</p>
                </div>
                <Link
                  href="https://youtube.com/watch?v=JRWyFUfqUlM&list=PLx3dprints"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-lime-700 underline decoration-lime-200 underline-offset-2"
                >
                  Open YouTube
                </Link>
              </div>
              <div className="mt-4">
                <VideoGallery videos={videos} highlightIds={videos.map((video) => video.id)} />
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section id="school-faq" className="scroll-mt-28 px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">FAQ: Back to School 3D printen</h2>
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

      <section id="school-sources" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
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
                        className="font-semibold text-lime-700 transition hover:text-lime-600"
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
