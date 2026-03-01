import type { Metadata } from "next"
import Link from "next/link"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"
import { buildArticleJsonLd, buildFaqPageSchema, buildHowToSchema } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/blog/kabelmanagement-3d-printen/"
const enCanonical = "https://www.x3dprints.be/en/blog/kabelmanagement-3d-printen/"
const datePublished = "2026-03-01"
const dateModified = "2026-03-01"
const lastUpdatedLabel = "Laatst bijgewerkt: 1 maart 2026"

const contactHref =
  "/contact?material=TPU&quote=Kabelmanagement%20met%203D%20printen%20-%20ik%20wil%20een%20praktische%20setup"
const pricingHref = "/pricing?utm_source=blog&utm_medium=cta&utm_campaign=kabelmanagement-3d-printen"
const materialsHref = "/materials#material-suggestion-tool"
const servicesHref = "/services?utm_source=blog&utm_medium=internal&utm_campaign=kabelmanagement-3d-printen"
const viewerHref = "/viewer?utm_source=blog&utm_medium=internal&utm_campaign=kabelmanagement-3d-printen"

export const metadata: Metadata = {
  title: "Kabelmanagement met 3D printen: praktische gids | X3DPrints",
  description:
    "Kabels netjes wegwerken met 3D printen? Deze gids toont materiaalkeuze, ontwerpregels, prijsranges en intake voor clips, houders en doorvoeren.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": canonical,
      "en-BE": enCanonical,
      "x-default": canonical,
    },
  },
  openGraph: {
    title: "Kabelmanagement met 3D printen",
    description:
      "Praktische workflow voor kabelclips, doorvoeren en houders met heldere intake, materiaaladvies en prijsroute.",
    url: canonical,
    images: [{ url: "/images/og-blog-nl.svg", width: 1200, height: 630, alt: "Kabelmanagement met 3D printen" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kabelmanagement met 3D printen",
    description: "Praktische gids met tabellen, FAQ en snelle CTA-flow.",
    images: ["/images/og-blog-nl.svg"],
  },
}

const useCards = [
  {
    title: "Werkplaats en bureau",
    body:
      "Kabelclips, kanaalhouders en montageplaatjes houden je setup overzichtelijk en sneller onderhoudbaar.",
    href: "/blog/tool-organizers-3d-printen",
    label: "Lees tool organizers gids",
  },
  {
    title: "Events en retail installaties",
    body:
      "Voor tijdelijke opstellingen zijn modulaire clips en doorvoeren handig, zeker met snelle iteraties.",
    href: "/blog/use-case-dinsdag-events",
    label: "Lees use-case events",
  },
  {
    title: "Technische projecten",
    body:
      "Voor sensorbeugels en kabelgeleiders is een mix van PETG en TPU vaak de meest praktische route.",
    href: "/blog/juiste-3d-print-materiaal",
    label: "Lees materiaalgids",
  },
]

const designRules = [
  {
    part: "Kabelclip (stijf)",
    material: "PETG",
    rule: "Voorzie afgeronde binnenradius en lichte speling",
    note: "Geschikt voor vaste routing",
  },
  {
    part: "Kabelclip (flex)",
    material: "TPU",
    rule: "Gebruik bredere klemzone en lagere drukpunten",
    note: "Beter voor veelvuldig klikken",
  },
  {
    part: "Doorvoer / sleeve",
    material: "TPU",
    rule: "Voeg geleidelijke taper toe voor montage",
    note: "Goed tegen trilling en schuren",
  },
  {
    part: "Montagebeugel",
    material: "PETG",
    rule: "Ribs + voldoende wanddikte rond schroefgaten",
    note: "Stabieler bij trekkracht",
  },
]

const pricingRows = [
  { type: "Kleine kabelclip", size: "~5x5x5 cm", price: "vanaf EUR 5", leadTime: "2-4 werkdagen" },
  { type: "Kabelhouder / doorvoer", size: "~10x10x10 cm", price: "vanaf EUR 20", leadTime: "2-5 werkdagen" },
  { type: "Custom montagebeugel", size: "~20x20x20 cm", price: "vanaf EUR 49", leadTime: "3-6 werkdagen" },
]

const intakeChecklist = [
  "Diameter en aantal kabels per route",
  "Montagecontext: muur, frame, paneel of meubel",
  "Belasting: trilling, trek, temperatuur en vocht",
  "Wens voor vaste of demonteerbare bevestiging",
]

const relatedLinks = [
  { label: "Use-cases TPU", href: "/blog/use-cases-tpu" },
  { label: "Maker Monday snapfit parts", href: "/blog/maker-monday-snapfit-parts" },
  { label: "3D print offerte aanvragen", href: "/blog/3d-print-offerte-aanvragen" },
  { label: "3D print prijs per stuk", href: "/blog/3d-print-prijs-per-stuk" },
]

const faqItems = [
  {
    q: "Wanneer kies ik TPU voor kabelmanagement?",
    a: "Als je flexibele clips, demping of regelmatig los/vastklikken nodig hebt, is TPU meestal de beste keuze.",
  },
  {
    q: "Is PLA bruikbaar voor kabelclips?",
    a: "Ja, voor lichte indoor toepassingen. Bij hogere belasting of warmte is PETG vaak robuuster.",
  },
  {
    q: "Kan ik starten zonder STL of STEP?",
    a: "Ja. Met kabeldiameter, foto en montagecontext kunnen we al een eerste voorstel maken.",
  },
  {
    q: "Hoe snel krijg ik prijs en planning?",
    a: "Meestal binnen 24 uur met voldoende context of een bestand.",
  },
]

const references = [
  { label: "Prusa filament material guide", href: "https://help.prusa3d.com/filament-material-guide" },
  { label: "Ultimaker design for FFF", href: "https://ultimaker.com/learn/design-for-fff-3d-printing/" },
  { label: "Cable management basics (IEC)", href: "https://www.iec.ch/homepage" },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "Kabelmanagement met 3D printen: praktische gids",
  description:
    "Praktische gids voor 3D geprint kabelmanagement met materiaalkeuze, ontwerpregels, prijsranges en intake.",
  datePublished,
  dateModified,
  image: "/images/og-blog-nl.svg",
  inLanguage: "nl-BE",
})

const faqJsonLd = buildFaqPageSchema({
  inLanguage: "nl-BE",
  mainEntityOfPage: canonical,
  items: faqItems.map((item) => ({ q: item.q, a: item.a })),
})

const howToJsonLd = buildHowToSchema({
  name: "Kabelmanagement laten 3D printen",
  description: "Ga in vier stappen van kabelchaos naar een stabiele en onderhoudbare setup.",
  inLanguage: "nl-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT4M",
  steps: [
    { name: "Breng kabelroutes in kaart", text: "Noteer kabeldiameter, lengte en montagecontext." },
    { name: "Kies cliptype en materiaal", url: materialsHref },
    { name: "Controleer model of referentie", url: viewerHref },
    { name: "Vraag prefilled offerte", url: contactHref },
  ],
  toolNames: ["X3DPrints viewer", "Material Suggestion Tool", "X3DPrints pricing"],
  supplyNames: ["Foto of STL/STEP", "Kabeldiameter", "Montagecontext"],
})

export default function CableManagementGuidePage() {
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
              <li className="font-medium text-slate-700">Kabelmanagement 3D printen</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">Home practicals</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Kabelmanagement met 3D printen: praktische gids
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Kort antwoord: ja, 3D printen is ideaal voor kabelclips, doorvoeren en houders op maat. Met de juiste materiaalkeuze en intake vermijd je loskomende of brekende bevestiging.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={contactHref}
              event={{ action: "cta_click", category: "blog_cable_top", label: "contact_prefill" }}
            >
              Start kabelmanagement intake
            </ShimmerButton>
            <ShimmerButton
              href={materialsHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_cable_top", label: "materials_tool" }}
            >
              Kies materiaal
            </ShimmerButton>
            <Link
              href={pricingHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              Bekijk prijsrange
            </Link>
          </div>
        </header>

        <BlogContentOverview locale="nl" />

        <section id="waarom-kabelmanagement-printen" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Wanneer loont 3D geprint kabelmanagement?</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {useCards.map((card) => (
                <GlassCard key={card.title} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{card.body}</p>
                  <Link href={card.href} className="mt-3 inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                    {card.label}
                  </Link>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="ontwerpregels-kabelmanagement" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Ontwerpregels per type onderdeel</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200/70 bg-white/80">
              <table className="min-w-full text-left text-sm text-slate-700">
                <caption className="sr-only">Ontwerpregels voor 3D geprint kabelmanagement</caption>
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Onderdeel</th>
                    <th className="px-4 py-3">Materiaal</th>
                    <th className="px-4 py-3">Regel</th>
                    <th className="px-4 py-3">Opmerking</th>
                  </tr>
                </thead>
                <tbody>
                  {designRules.map((row) => (
                    <tr key={row.part} className="border-t border-slate-200/60">
                      <td className="px-4 py-3 font-semibold text-slate-900">{row.part}</td>
                      <td className="px-4 py-3">{row.material}</td>
                      <td className="px-4 py-3">{row.rule}</td>
                      <td className="px-4 py-3">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        <section id="intake-kabelmanagement" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Welke info heb je nodig voor intake?</h2>
            <GlassCard className="mt-4 p-6">
              <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
                {intakeChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Heb je al files? Controleer ze eerst in de{" "}
                <Link href={viewerHref} className="font-semibold text-indigo-600 hover:text-indigo-500">
                  viewer
                </Link>{" "}
                voor snellere intake.
              </p>
            </GlassCard>
          </Reveal>
        </section>

        <section id="kosten-kabelmanagement" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Kosten en timing</h2>
            <p className="mt-2 text-slate-700">
              Richtwaarden voor planning. Exacte prijs hangt af van aantallen, materiaal en montagecontext.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200/70 bg-white/80">
              <table className="min-w-full text-left text-sm text-slate-700">
                <caption className="sr-only">Prijsrange voor 3D geprint kabelmanagement</caption>
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Formaat</th>
                    <th className="px-4 py-3">Richtprijs</th>
                    <th className="px-4 py-3">Doorlooptijd</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingRows.map((row) => (
                    <tr key={row.type} className="border-t border-slate-200/60">
                      <td className="px-4 py-3 font-semibold text-slate-900">{row.type}</td>
                      <td className="px-4 py-3">{row.size}</td>
                      <td className="px-4 py-3">{row.price}</td>
                      <td className="px-4 py-3">{row.leadTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        <section id="faq-kabelmanagement" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">FAQ</h2>
            <div className="mt-4">
              <Faq items={faqItems} />
            </div>
          </Reveal>
        </section>

        <section id="sources" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Bronnen en referenties</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {references.map((reference) => (
                <li key={reference.href} className="rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3">
                  <cite className="not-italic">
                    <Link href={reference.href} target="_blank" rel="noreferrer" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      {reference.label}
                    </Link>
                  </cite>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">Volgende stap</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Wil je je kabelmanagement setup laten bekijken?</h2>
              <p className="mt-2 text-slate-700">
                Deel kabeldiameter, montagecontext en doel. Je krijgt snel een voorstel voor materiaal, prijs en timing.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <ShimmerButton
                  href={contactHref}
                  event={{ action: "cta_click", category: "blog_cable_bottom", label: "contact_prefill" }}
                >
                  Start intake
                </ShimmerButton>
                <Link
                  href={servicesHref}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
                >
                  Bekijk serviceflow
                </Link>
              </div>
              <div className="mt-4 text-sm text-slate-600">
                Verder lezen:{" "}
                {relatedLinks.map((item, index) => (
                  <span key={item.href}>
                    <Link href={item.href} className="font-semibold text-indigo-600 hover:text-indigo-500">
                      {item.label}
                    </Link>
                    {index < relatedLinks.length - 1 ? ", " : "."}
                  </span>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </section>
      </article>

      <BlogAuthorNote locale="nl" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
    </main>
  )
}
