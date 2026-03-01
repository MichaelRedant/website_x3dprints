import type { Metadata } from "next"
import Link from "next/link"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"
import { buildArticleJsonLd, buildFaqPageSchema, buildHowToSchema } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/blog/ikea-onderdelen-3d-printen/"
const enCanonical = "https://www.x3dprints.be/en/blog/ikea-onderdelen-3d-printen/"
const datePublished = "2026-03-01"
const dateModified = "2026-03-01"
const lastUpdatedLabel = "Laatst bijgewerkt: 1 maart 2026"

const contactHref =
  "/contact?material=PETG&quote=IKEA%20onderdeel%20laten%203D%20printen%20-%20ik%20wil%20een%20passende%20oplossing"
const pricingHref = "/pricing?utm_source=blog&utm_medium=cta&utm_campaign=ikea-onderdelen-3d-printen"
const materialsHref = "/materials#material-suggestion-tool"
const viewerHref = "/viewer?utm_source=blog&utm_medium=internal&utm_campaign=ikea-onderdelen-3d-printen"
const servicesHref = "/services?utm_source=blog&utm_medium=internal&utm_campaign=ikea-onderdelen-3d-printen"

export const metadata: Metadata = {
  title: "IKEA onderdelen 3D printen: praktische gids | X3DPrints",
  description:
    "IKEA onderdeel stuk of kwijt? Deze gids toont wanneer 3D printen zinvol is, welke info je nodig hebt en hoe materiaal, prijs en timing worden gekozen.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": canonical,
      "en-BE": enCanonical,
      "x-default": canonical,
    },
  },
  openGraph: {
    title: "IKEA onderdelen laten 3D printen",
    description:
      "Praktische workflow voor kapotte of ontbrekende IKEA onderdelen met intake, materiaaladvies en prijsroute.",
    url: canonical,
    images: [{ url: "/images/og-blog-nl.svg", width: 1200, height: 630, alt: "IKEA onderdelen 3D printen" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "IKEA onderdelen laten 3D printen",
    description: "Praktische gids met checklist, materiaalmatrix en snelle offerteflow.",
    images: ["/images/og-blog-nl.svg"],
  },
}

const fitCards = [
  {
    title: "Clips, tussenstukken en kleine houders",
    body:
      "Voor kleine functionele delen is FDM vaak een snelle route, zeker als originele onderdelen moeilijk leverbaar zijn.",
    href: "/blog/kapot-onderdeel-laten-printen",
    label: "Lees basisgids kapotte onderdelen",
  },
  {
    title: "Iteratief naar betere passing",
    body:
      "Je kan snel een testfit printen en nadien toleranties aanscherpen voor de definitieve versie.",
    href: "/blog/3d-print-ontwerp-checklist",
    label: "Lees ontwerp checklist",
  },
  {
    title: "Geschikt voor enkelstuks en kleine reeksen",
    body:
      "Voor een beperkt aantal vervangonderdelen is printen vaak efficienter dan alternatieve sourcing.",
    href: "/blog/3d-printen-op-bestelling",
    label: "Bekijk bestelworkflow",
  },
]

const intakeChecklist = [
  "Foto van het onderdeel en montagepositie in het meubel",
  "Afmetingen van kritieke zones (gaten, kliks, lengte, dikte)",
  "Belasting en gebruik: statisch, trekkracht, vibratie of veelvuldig demonteren",
  "Gewenste kleur, aantal stuks en timing",
]

const materialRows = [
  {
    useCase: "Basis bevestiging indoor",
    material: "PLA Matte",
    reason: "Snel en kostefficiënt",
    note: "Goed voor lage belasting en snelle testfits",
  },
  {
    useCase: "Hogere belasting of warmere omgeving",
    material: "PETG",
    reason: "Sterker in hitte en mechanische belasting",
    note: "Vaak beste default voor functionele IKEA parts",
  },
  {
    useCase: "Flexibele klem of demping",
    material: "TPU",
    reason: "Buigzaam en schokabsorberend",
    note: "Voor specifieke zachte pasvormen",
  },
]

const pricingRows = [
  { type: "Clip / connector", size: "~5x5x5 cm", price: "vanaf EUR 5", leadTime: "2-4 werkdagen" },
  { type: "Beugel / houder", size: "~10x10x10 cm", price: "vanaf EUR 20", leadTime: "2-5 werkdagen" },
  { type: "Groter custom stuk", size: "~20x20x20 cm", price: "vanaf EUR 49", leadTime: "3-6 werkdagen" },
]

const relatedLinks = [
  { label: "Vervangstuk huishoudtoestel 3D printen", href: "/blog/vervangstuk-huishoudtoestel-3d-printen" },
  { label: "Juiste 3D print materiaal kiezen", href: "/blog/juiste-3d-print-materiaal" },
  { label: "3D print prijs per stuk", href: "/blog/3d-print-prijs-per-stuk" },
  { label: "Tool organizers 3D printen", href: "/blog/tool-organizers-3d-printen" },
]

const faqItems = [
  {
    q: "Kunnen jullie een IKEA onderdeel printen zonder origineel bestand?",
    a: "Vaak wel. Met foto's en basisafmetingen kunnen we meestal een eerste modelvoorstel of fit-check traject opstarten.",
  },
  {
    q: "Is PETG altijd beter dan PLA voor IKEA onderdelen?",
    a: "Niet altijd. PLA is prima voor lichtere indoor toepassingen. PETG is meestal beter bij hogere belasting of warmte.",
  },
  {
    q: "Hoe snel weet ik de prijs?",
    a: "Doorgaans binnen 24 uur met voldoende context. STL/STEP versnelt de inschatting.",
  },
  {
    q: "Kan ik eerst een testfit doen voor ik meerdere stuks bestel?",
    a: "Ja. Dat is vaak de slimste route om passing en montage eerst te valideren.",
  },
]

const references = [
  { label: "IKEA spare parts service", href: "https://www.ikea.com/be/nl/customer-service/spare-parts/" },
  { label: "Prusa filament material guide", href: "https://help.prusa3d.com/filament-material-guide" },
  { label: "Ultimaker design for FFF", href: "https://ultimaker.com/learn/design-for-fff-3d-printing/" },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "IKEA onderdelen 3D printen: praktische gids",
  description:
    "Praktische gids voor IKEA vervangonderdelen met intake, materiaalkeuze, prijsranges en testfit workflow.",
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
  name: "IKEA onderdeel laten 3D printen",
  description: "Ga in vier stappen van kapot of ontbrekend onderdeel naar een bruikbare vervangprint.",
  inLanguage: "nl-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT4M",
  steps: [
    { name: "Stuur foto en maten", text: "Deel foto, maten en montagecontext van je onderdeel." },
    { name: "Check model of referentie", url: viewerHref },
    { name: "Kies materiaal en prijsroute", url: pricingHref },
    { name: "Vraag prefilled offerte", url: contactHref },
  ],
  toolNames: ["X3DPrints viewer", "Material Suggestion Tool", "X3DPrints pricing"],
  supplyNames: ["Foto of STL/STEP", "Afmetingen", "Gebruiksscenario"],
})

export default function IkeaPartsGuidePage() {
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
              <li className="font-medium text-slate-700">IKEA onderdelen 3D printen</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">Home practicals</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            IKEA onderdelen 3D printen: praktische aanpak
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Kort antwoord: vaak haalbaar voor clips, houders en kleine verbindingsstukken. Met goede intake kan je snel naar een testfit en daarna naar een stabiel vervangonderdeel.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={contactHref}
              event={{ action: "cta_click", category: "blog_ikea_top", label: "contact_prefill" }}
            >
              Start IKEA intake
            </ShimmerButton>
            <ShimmerButton
              href={materialsHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_ikea_top", label: "materials_tool" }}
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

        <section id="wanneer-ikea-onderdelen-printen" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Wanneer loont dit voor IKEA onderdelen?</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {fitCards.map((card) => (
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

        <section id="welke-info-aanleveren" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Welke info moet je aanleveren?</h2>
            <GlassCard className="mt-4 p-6">
              <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
                {intakeChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Zonder file? Start met foto + maten. Met STL/STEP gaat de flow nog sneller via de{" "}
                <Link href={viewerHref} className="font-semibold text-indigo-600 hover:text-indigo-500">
                  viewer
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>
        </section>

        <section id="materiaalmatrix-ikea" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Materiaalmatrix voor IKEA vervangstukken</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200/70 bg-white/80">
              <table className="min-w-full text-left text-sm text-slate-700">
                <caption className="sr-only">Materiaalkeuze voor IKEA onderdelen</caption>
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Use-case</th>
                    <th className="px-4 py-3">Materiaal</th>
                    <th className="px-4 py-3">Waarom</th>
                    <th className="px-4 py-3">Opmerking</th>
                  </tr>
                </thead>
                <tbody>
                  {materialRows.map((row) => (
                    <tr key={row.useCase} className="border-t border-slate-200/60">
                      <td className="px-4 py-3 font-semibold text-slate-900">{row.useCase}</td>
                      <td className="px-4 py-3">{row.material}</td>
                      <td className="px-4 py-3">{row.reason}</td>
                      <td className="px-4 py-3">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        <section id="kosten-en-timing" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Kosten en timing in 1 snapshot</h2>
            <p className="mt-2 text-slate-700">
              Richtwaarden voor planning. Exacte prijs volgt na intake en filecheck, gelijkaardig met{" "}
              <Link href="/blog/hoeveel-kost-3d-printen" className="font-semibold text-indigo-600 hover:text-indigo-500">
                deze kostgids
              </Link>
              .
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200/70 bg-white/80">
              <table className="min-w-full text-left text-sm text-slate-700">
                <caption className="sr-only">Prijsrange voor IKEA vervangonderdelen</caption>
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

        <section id="faq-ikea-onderdelen" className="scroll-mt-28">
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
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Wil je je IKEA onderdeel laten inschatten?</h2>
              <p className="mt-2 text-slate-700">
                Deel foto of file en context. Je krijgt snel een haalbare materiaal- en prijsroute.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <ShimmerButton
                  href={contactHref}
                  event={{ action: "cta_click", category: "blog_ikea_bottom", label: "contact_prefill" }}
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
