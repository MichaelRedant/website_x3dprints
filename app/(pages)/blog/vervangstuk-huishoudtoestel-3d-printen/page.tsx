import type { Metadata } from "next"
import Link from "next/link"
import Faq from "@/components/Faq"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"
import { buildArticleJsonLd, buildFaqPageSchema, buildHowToSchema } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/blog/vervangstuk-huishoudtoestel-3d-printen/"
const enCanonical = "https://www.x3dprints.be/en/blog/vervangstuk-huishoudtoestel-3d-printen/"
const datePublished = "2026-03-01"
const dateModified = "2026-03-01"
const lastUpdatedLabel = "Laatst bijgewerkt: 1 maart 2026"

const contactHref =
  "/contact?material=PETG&quote=Vervangstuk%20voor%20huishoudtoestel%20-%20ik%20wil%20een%20passend%20onderdeel"
const pricingHref =
  "/pricing?utm_source=blog&utm_medium=cta&utm_campaign=vervangstuk-huishoudtoestel-3d-printen"
const materialsHref = "/materials#material-suggestion-tool"
const viewerHref =
  "/viewer?utm_source=blog&utm_medium=internal&utm_campaign=vervangstuk-huishoudtoestel-3d-printen"
const servicesHref =
  "/services?utm_source=blog&utm_medium=internal&utm_campaign=vervangstuk-huishoudtoestel-3d-printen"

export const metadata: Metadata = {
  title: "Vervangstuk huishoudtoestel met 3D printen | X3DPrints",
  description:
    "Kapot huishoudtoestel? Deze gids toont wanneer een 3D geprint vervangstuk zinvol is, welke info je moet delen en hoe prijs en doorlooptijd worden ingeschat.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": canonical,
      "en-BE": enCanonical,
      "x-default": canonical,
    },
  },
  openGraph: {
    title: "Vervangstuk voor huishoudtoestel met 3D printen",
    description:
      "Praktische aanpak voor kapotte clips, beugels en covers: intake, materiaalkeuze en snelle prijsroute.",
    url: canonical,
    images: [{ url: "/images/og-blog-nl.svg", width: 1200, height: 630, alt: "Vervangstuk huishoudtoestel met 3D printen" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vervangstuk huishoudtoestel met 3D printen",
    description: "Van kapot onderdeel naar werkend vervangstuk met een heldere intakeflow.",
    images: ["/images/og-blog-nl.svg"],
  },
}

const fitCards = [
  {
    title: "Perfect voor clips, houders en kappen",
    body:
      "Mechanische hulpstukken van toestellen zijn vaak ideaal voor FDM: functioneel, beperkt formaat en snel te itereren.",
    href: "/blog/kapot-onderdeel-laten-printen",
    label: "Lees eerst de basisgids",
  },
  {
    title: "Minder geschikt voor food-contact en hoge hitte",
    body:
      "Voor onderdelen met continue hitte of strikte certificatie gelden extra voorwaarden en soms een ander productiepad.",
    href: "/blog/hittebestendig-3d-print-materiaal",
    label: "Lees hittebestendige materialen",
  },
  {
    title: "Sneller dan wachten op oude stock",
    body:
      "Bij oudere toestellen zijn onderdelen vaak uit productie. Een print op maat verkort de stilstand meestal sterk.",
    href: "/blog/3d-printen-op-bestelling",
    label: "Bekijk bestelworkflow",
  },
]

const infoChecklist = [
  "Foto van het kapotte onderdeel en waar het gemonteerd zit",
  "Afmetingen van kritieke zones: gaten, clips, schroefdraad, nokken",
  "Toestelcontext: vocht, trillingen, reiniging en temperatuur",
  "Aantal stuks en gewenste timing",
]

const materialRows = [
  {
    zone: "Droge binnenzone",
    material: "PLA Matte",
    why: "Snel en budgetvriendelijk",
    note: "Goed voor behuizing en lichte belasting",
  },
  {
    zone: "Vochtige of warmere zone",
    material: "PETG",
    why: "Betere weerstand tegen vocht en warmte",
    note: "Vaak baseline voor functionele vervangstukken",
  },
  {
    zone: "Flex of demping nodig",
    material: "TPU",
    why: "Buigzaam en schokdempend",
    note: "Voor zachte contactpunten, bumpers of klemdelen",
  },
]

const pricingRows = [
  { type: "Clip of knop", size: "~5x5x5 cm", price: "vanaf EUR 5", leadTime: "2-4 werkdagen" },
  { type: "Beugel of adapter", size: "~10x10x10 cm", price: "vanaf EUR 20", leadTime: "2-5 werkdagen" },
  { type: "Grotere cover", size: "~20x20x20 cm", price: "vanaf EUR 49", leadTime: "3-6 werkdagen" },
]

const errorList = [
  "Alleen een close-up foto sturen zonder context van montage of belasting.",
  "Geen rekening houden met warmtebron vlak bij het onderdeel.",
  "Te snel exact kopieren zonder kleine tolerantiecorrectie voor FDM.",
  "Prijs vergelijken zonder materiaal, laaghoogte en planning mee te nemen.",
]

const relatedGuides = [
  { label: "Juiste 3D print materiaal kiezen", href: "/blog/juiste-3d-print-materiaal" },
  { label: "3D print prijs per stuk", href: "/blog/3d-print-prijs-per-stuk" },
  { label: "Hoe lang duurt 3D printen?", href: "/blog/hoe-lang-duurt-3d-printen" },
  { label: "3D print offerte aanvragen", href: "/blog/3d-print-offerte-aanvragen" },
]

const faqItems = [
  {
    q: "Kan je een onderdeel printen als ik alleen een foto heb?",
    a: "Vaak wel voor een eerste intake. Extra maten van kritieke zones blijven nodig voor een betrouwbare fit.",
  },
  {
    q: "Is PETG altijd beter dan PLA voor huishoudtoestellen?",
    a: "Niet altijd. PLA kan prima zijn in droge, lage temperatuurzones. PETG wordt belangrijker bij vocht en warmte.",
  },
  {
    q: "Hoe snel krijg ik prijs en timing?",
    a: "Meestal binnen 24 uur met voldoende context of een STL/STEP bestand.",
  },
  {
    q: "Kan ik na testfit meteen meerdere stuks bestellen?",
    a: "Ja. Na bevestigde passing kunnen we dezelfde instellingen gebruiken voor een kleine serie.",
  },
]

const references = [
  { label: "Prusa filament material guide", href: "https://help.prusa3d.com/filament-material-guide" },
  { label: "iFixit repair guides", href: "https://www.ifixit.com/Guide" },
  { label: "Ultimaker design for FFF", href: "https://ultimaker.com/learn/design-for-fff-3d-printing/" },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "Vervangstuk huishoudtoestel met 3D printen",
  description:
    "Praktische gids voor vervangstukken bij huishoudtoestellen met intake, materiaalkeuze, prijsranges en doorlooptijd.",
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
  name: "Huishoudtoestel vervangstuk laten 3D printen",
  description: "Ga in vier stappen van kapot onderdeel naar een werkend vervangstuk met duidelijke intake.",
  inLanguage: "nl-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT4M",
  steps: [
    { name: "Stuur foto plus afmetingen", text: "Deel foto, afmetingen en toestelcontext voor een gerichte intake." },
    { name: "Controleer model of referentie", url: viewerHref },
    { name: "Kies materiaal en prijsroute", url: pricingHref },
    { name: "Vraag prefilled offerte", url: contactHref },
  ],
  toolNames: ["X3DPrints viewer", "Material Suggestion Tool", "X3DPrints pricing"],
  supplyNames: ["Foto of STL/STEP", "Afmetingen", "Toepassingscontext"],
})

export default function ApplianceSparePartPage() {
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
              <li className="font-medium text-slate-700">Vervangstuk huishoudtoestel</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">Praktische problemen</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Vervangstuk voor huishoudtoestel laten 3D printen
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Kort antwoord: vaak is dit een snelle en haalbare oplossing voor kapotte clips, beugels en kappen. Met goede intake kan je meestal snel door naar een werkende testfit.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={contactHref}
              event={{ action: "cta_click", category: "blog_appliance_spare_top", label: "contact_prefill" }}
            >
              Start vervangstuk intake
            </ShimmerButton>
            <ShimmerButton
              href={materialsHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_appliance_spare_top", label: "materials_tool" }}
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

        <section id="wanneer-slim" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Wanneer is dit slim?</h2>
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

        <section id="intake-checklist" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Welke info heb je nodig voor een goede intake?</h2>
            <GlassCard className="mt-4 p-6">
              <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
                {infoChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Meer context nodig? Bekijk ook{" "}
                <Link href="/blog/kapot-onderdeel-laten-printen" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  de basisgids voor kapotte onderdelen
                </Link>{" "}
                en{" "}
                <Link href="/blog/3d-print-offerte-aanvragen" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  de offertegids
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>
        </section>

        <section id="materiaal-keuze" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Materiaalkeuze per zone in je toestel</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200/70 bg-white/80">
              <table className="min-w-full text-left text-sm text-slate-700">
                <caption className="sr-only">Materiaalkeuze voor vervangstukken in huishoudtoestellen</caption>
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Zone</th>
                    <th className="px-4 py-3">Materiaal</th>
                    <th className="px-4 py-3">Waarom</th>
                    <th className="px-4 py-3">Opmerking</th>
                  </tr>
                </thead>
                <tbody>
                  {materialRows.map((row) => (
                    <tr key={row.zone} className="border-t border-slate-200/60">
                      <td className="px-4 py-3 font-semibold text-slate-900">{row.zone}</td>
                      <td className="px-4 py-3">{row.material}</td>
                      <td className="px-4 py-3">{row.why}</td>
                      <td className="px-4 py-3">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Voor de juiste materiaalkeuze per use-case:{" "}
              <Link href="/blog/juiste-3d-print-materiaal" className="font-semibold text-indigo-600 hover:text-indigo-500">
                lees de materiaalgids
              </Link>
              .
            </p>
          </Reveal>
        </section>

        <section id="kosten-en-doorlooptijd" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Kosten en doorlooptijd</h2>
            <p className="mt-2 text-slate-700">
              Richtwaarden voor planning. Exacte prijs volgt na analyse, net zoals in{" "}
              <Link href="/blog/3d-print-prijs-per-stuk" className="font-semibold text-indigo-600 hover:text-indigo-500">
                deze kostgids
              </Link>
              .
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200/70 bg-white/80">
              <table className="min-w-full text-left text-sm text-slate-700">
                <caption className="sr-only">Prijsrange voor vervangstukken van huishoudtoestellen</caption>
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

        <section id="fouten" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Fouten die tijd en geld kosten</h2>
            <GlassCard className="mt-4 p-6">
              <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
                {errorList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Doorlooptijd beter inschatten? Lees ook{" "}
                <Link href="/blog/hoe-lang-duurt-3d-printen" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  hoe lang 3D printen echt duurt
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>
        </section>

        <section id="faq-huishoudtoestel" className="scroll-mt-28">
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
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                Wil je een vervangstuk voor je toestel laten beoordelen?
              </h2>
              <p className="mt-2 text-slate-700">
                Deel foto of file, context en timing. Je krijgt snel een haalbaar materiaal- en prijsvoorstel.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <ShimmerButton
                  href={contactHref}
                  event={{ action: "cta_click", category: "blog_appliance_spare_bottom", label: "contact_prefill" }}
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
                {relatedGuides.map((guide, index) => (
                  <span key={guide.href}>
                    <Link href={guide.href} className="font-semibold text-indigo-600 hover:text-indigo-500">
                      {guide.label}
                    </Link>
                    {index < relatedGuides.length - 1 ? ", " : "."}
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
