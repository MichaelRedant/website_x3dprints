import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import { buildArticleJsonLd } from "@/lib/seo"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"
import BlogFaq from "@/components/BlogFaq"
import { BLOG_FAQ } from "@/content/blog-faq"

const canonical = "https://www.x3dprints.be/blog/3d-printen-voor-beginners/"
const utm = "?utm_source=blog&utm_medium=cta&utm_campaign=3d-printen-voor-beginners"
const contactHref = `/contact${utm}`
const toolHref = `/materials${utm}#material-suggestion-tool`
const pricingHref = `/pricing${utm}`
const viewerHref = `/viewer${utm}`
const datePublished = "2024-08-20"
const dateModified = "2026-02-09"
const faq = BLOG_FAQ["3d-printen-voor-beginners"]
const designGuideHref =
  "/blog/3d-print-ontwerp-gids?utm_source=blog&utm_medium=internal&utm_campaign=3d-printen-voor-beginners"

export const metadata: Metadata = {
  title: "3D printen voor beginners | X3DPrints",
  description:
    "Startgids voor 3D print beginners: materialen kiezen, bestanden voorbereiden, typische fouten vermijden en hoe X3DPrints begeleiding aanbiedt.",
  alternates: { canonical },
  openGraph: {
    title: "3D printen voor beginners",
    description:
      "Leer stap voor stap hoe je jouw eerste 3D print laat maken: materiaal, files, voorbeelden en begeleiding vanuit Herzele.",
    url: canonical,
    images: [{ url: "/images/portfolio/20241024_081839-1.jpg", width: 1200, height: 630, alt: "3D printen voor beginners" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printen voor beginners",
    description:
      "Een praktische gids voor iedereen die net begint met 3D printen. Inclusief tips, fouten die je vermijdt en opleidingsmogelijkheden.",
    images: ["/images/portfolio/20241024_081839-1.jpg"],
  },
}

const beginnerSteps = [
  "Bepaal het doel: prototype, decoratie, functioneel onderdeel of merchandising. Doel dicteert materiaal en afwerking.",
  "Kies materiaal: PLA voor design, PETG voor functionaliteit, TPU voor flexibiliteit. Bekijk de materialenpagina voor alle opties.",
  "Verzamel bestanden: STL voor productie, STEP als je nog wijzigingen verwacht. Voeg referentiefoto’s of schetsen toe.",
  "Vraag een offerte met context (aantal stuks, deadline, afwerking) en we begeleiden je door elke stap.",
]

const pitfalls = [
  "Te dunne wanden (minder dan 1.2 mm) breken makkelijk. Voeg ribs of fillets toe.",
  "Te strakke passtukken. Voorzie 0.2-0.3 mm speling voor PLA/PETG.",
  "Geen orientatie-opmerking. Laat weten welke zijde zichtbaar is zodat we support slim plaatsen.",
  "Vergeten afwerking. Geef aan of je ruw, geschuurd of gelakt wil; dat beïnvloedt de prijs en planning.",
]

const lastUpdatedLabel = "Laatst bijgewerkt: 9 februari 2026"

const checklistRows = [
  { step: "Doel bepalen", focus: "Prototype, decor of functioneel bepaalt materiaal en afwerking." },
  { step: "Materiaal kiezen", focus: "PLA voor design, PETG voor functionaliteit, TPU voor flexibiliteit." },
  { step: "Bestanden verzamelen", focus: "STL voor productie, STEP als je nog wijzigingen verwacht." },
  { step: "Offerte aanvragen", focus: "Aantal, deadline en afwerking versnellen de planning." },
]

const references = [
  { label: "Autodesk: STL file format", href: "https://help.autodesk.com/cloudhelp/2014/ENU/Alias/files/GUID-8ABFA3B8-204B-44E0-A50B-BA4C1C3F9BE8.htm" },
  { label: "Autodesk: What is a STEP file?", href: "https://www.autodesk.com/solutions/what-is-a-step-file" },
  { label: "Ultimaker: Design for FFF 3D printing", href: "https://ultimaker.com/learn/design-for-fff-3d-printing/" },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "3D printen voor beginners",
  description:
    "Gids voor beginners met stappenplan, materiaalkeuze en veelgemaakte fouten. Inclusief tips voor begeleiding en opleiding.",
  datePublished,
  dateModified,
  image: "/images/portfolio/20241024_081839-1.jpg",
  inLanguage: "nl-BE",
})

export default function BeginnersArticlePage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(150%_85%_at_50%_-15%,rgba(52,211,153,0.18),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.07]" />

      <section className="px-6 pb-12 pt-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal className="stacked-content">
            <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
              <ol className="flex flex-wrap gap-2">
                <li>
                  <Link
                    href="/blog"
                    className="font-medium text-indigo-600 transition hover:text-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Blog
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-700">3D printen voor beginners</li>
              </ol>
            </nav>
            <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Starten met 3D printen? Zo pak je het aan.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Of je nu student, marketeer of maker bent: met een goed bestand en duidelijke context krijg je snel een professioneel resultaat.
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="stacked-actions mt-6 flex flex-wrap gap-3 justify-center sm:justify-start">
              <ShimmerButton href={viewerHref} event={{ action: "cta_click", category: "blog_top", label: "viewer_beginners" }}>
                Upload je eerste model
              </ShimmerButton>
              <Link
                href={contactHref}
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Vraag begeleiding
              </Link>
              <Link
                href={pricingHref}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm hover:-translate-y-0.5 hover:bg-emerald-100"
              >
                Bekijk pricing
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section id="beginners-steps" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Stappenplan voor beginners</h2>
              <ol className="mt-4 space-y-3 text-sm text-slate-600">
                {beginnerSteps.map((step, index) => (
                  <li key={step} className="flex gap-3">
                    <span className="font-semibold text-slate-900">{index + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section id="beginners-checklist" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="overflow-x-auto border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Checklist per stap</h2>
              <table className="mt-5 min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                <thead>
                  <tr className="text-xs uppercase tracking-wide text-slate-500">
                    <th className="py-2 pr-4">Stap</th>
                    <th className="py-2 pr-4">Wat je nodig hebt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {checklistRows.map((row) => (
                    <tr key={row.step}>
                      <td className="py-3 pr-4 font-medium text-slate-900">{row.step}</td>
                      <td className="py-3 pr-4">{row.focus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 text-sm text-slate-600">
                Meer detail nodig? Lees de{" "}
                <Link href={designGuideHref} className="font-semibold text-emerald-600 hover:text-emerald-700">
                  3D print ontwerp gids
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section id="beginners-blocks" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {[
            {
              title: "Beginnersmateriaal",
              body: "PLA Matte geeft direct strakke resultaten en is beschikbaar in veel kleuren. PETG en TPU gebruik je later voor functionaliteit.",
              link: { href: "/materials", label: "Materialen bekijken" },
            },
            {
              title: "Bestanden en viewer",
              body: "Upload STL/STEP via de viewer, zelfs vanaf je smartphone. Voeg notities toe zodat we weten wat belangrijk is.",
              link: { href: "/viewer", label: "Ga naar viewer" },
            },
            {
              title: "Opleiding / coaching",
              body: "We geven korte 1-op-1 uitleg tijdens je project: instellingen, nabewerking, onderhoud. Handig voor wie zelf wil investeren in hardware.",
              link: { href: "/contact", label: "Vraag coaching" },
            },
          ].map((item) => (
            <Reveal key={item.title}>
              <GlassCard className="h-full border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{item.body}</p>
                <Link
                  href={item.link.href}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
                >
                  {item.link.label}
                  <span aria-hidden>-&gt;</span>
                </Link>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section id="beginners-pitfalls" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">Veelgemaakte fouten</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {pitfalls.map((pitfall) => (
                  <li key={pitfall} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" aria-hidden />
                    <span>{pitfall}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section id="beginners-sources" className="scroll-mt-28 px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 id="sources" className="text-xl font-semibold text-slate-900">Bronnen en referenties</h2>
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
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <GlassCard className="flex flex-col gap-6 border border-white/40 bg-white/85 p-6 text-center shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:text-left">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Volgende stap</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Samen je eerste print aanpakken?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  We controleren je bestand, adviseren materiaal en delen handige tips zodat je project meteen goed zit.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href={contactHref}>Vraag advies</ShimmerButton>
                <Link href={`/pricing${utm}`} className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Bekijk tarieven
                </Link>
                <Link
                  href={toolHref}
                  className="text-sm font-semibold text-slate-700 transition hover:text-slate-900"
                >
                  Materialen kiezen
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <BlogFaq title={faq.title} items={faq.items} mainEntityOfPage={canonical} />


      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <BlogAuthorNote locale="nl" />


    </main>
  )
}






