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

const canonical = "https://www.x3dprints.be/blog/3d-print-assemblage-gids/"
const datePublished = "2026-02-08"
const dateModified = "2026-02-09"
const materialsHref =
  "/materials?utm_source=blog&utm_medium=cta&utm_campaign=assemblage-gids#material-suggestion-tool"
const viewerHref = "/viewer?utm_source=blog&utm_medium=cta&utm_campaign=assemblage-gids"
const pricingHref = "/pricing?utm_source=blog&utm_medium=cta&utm_campaign=assemblage-gids"
const contactHref =
  "/contact?material=pla-tough&quote=Assemblageadvies%20voor%20mijn%203D%20print"
const designGuideHref =
  "/blog/3d-print-ontwerp-gids?utm_source=blog&utm_medium=internal&utm_campaign=assemblage-gids"

export const metadata: Metadata = {
  title: "3D print assemblage gids: paspennen en inserts | X3DPrints",
  description:
    "Assemblage gids voor 3D prints: paspennen, schroefverbindingen en inserts met richtwaarden en een tabel voor speling per materiaal.",
  alternates: { canonical },
  openGraph: {
    title: "3D print assemblage gids: paspennen en inserts",
    description:
      "Praktische assemblage gids met paspennen, inserts, tolerantie en een tabel met richtwaarden per materiaal.",
    url: canonical,
    images: [{ url: "/Logo.webp", width: 1200, height: 630, alt: "3D print assemblage gids" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D print assemblage gids: paspennen en inserts",
    description: "Assemblage tips en richtwaarden voor printbare onderdelen.",
    images: ["/Logo.webp"],
  },
}

const checklistItems = [
  {
    title: "Split op logische vlakken",
    description:
      "Kies een deling die verborgen zit en vermijd zichtvlakken met duidelijke naden.",
  },
  {
    title: "Gebruik paspennen of sleuven",
    description:
      "Paspennen zorgen voor herhaalbare uitlijning, vooral bij series of meerdere onderdelen.",
  },
  {
    title: "Voorzie speling",
    description:
      "Geef ruimte voor materiaalexpansie en printvariatie zodat onderdelen niet vastlopen.",
  },
  {
    title: "Plan bevestiging vooraf",
    description:
      "Schroeven en inserts vragen extra ruimte. Lijm werkt enkel bij lage belastingen.",
  },
]

const guidelineRows = [
  {
    label: "Paspennen diameter",
    plaPetg: "4-6 mm",
    tpu: "6-8 mm",
    reason: "Stijve pennen blijven beter uitgelijnd; TPU vraagt meer massa.",
  },
  {
    label: "Pen-gat speling",
    plaPetg: "0,2-0,3 mm",
    tpu: "0,4-0,6 mm",
    reason: "Voorkomt vastzitten en zorgt voor montagegemak.",
  },
  {
    label: "Schroefgat compensatie",
    plaPetg: "+0,2-0,3 mm",
    tpu: "+0,4-0,6 mm",
    reason: "Zorgt dat bouten en inserts soepel passen.",
  },
  {
    label: "Inserts pocket diepte",
    plaPetg: "1-1,5 mm extra",
    tpu: "1,5-2 mm extra",
    reason: "Extra ruimte voorkomt uitpuilen bij heat-set.",
  },
]

const fastenerCards = [
  {
    title: "Schroeven & inserts",
    description:
      "Gebruik heat-set inserts voor herhaalbare montage. Kies PETG of PLA Tough+ voor stevige schroefzones.",
  },
  {
    title: "Klikverbindingen",
    description:
      "Snapfits werken goed bij PLA Tough+ of PETG. Voor flexzones voeg je TPU inlays toe.",
  },
  {
    title: "Lijm of tape",
    description:
      "Alleen geschikt voor lichte belastingen of tijdelijke fixtures. Test altijd een sample.",
  },
]

const faqItems = [
  {
    q: "Wat is de veiligste manier om onderdelen uit te lijnen?",
    a: "Paspennen of sleuven geven de meest consistente uitlijning, zeker bij series.",
  },
  {
    q: "Wanneer kies ik heat-set inserts?",
    a: "Bij onderdelen die vaker gemonteerd moeten worden of meer koppel moeten verdragen.",
  },
  {
    q: "Kan ik PLA voor assemblages gebruiken?",
    a: "Ja, maar kies PLA Tough+ voor extra slagvastheid. Voor outdoor toepassingen is PETG veiliger.",
  },
  {
    q: "Hoeveel speling is nodig bij pen-gat?",
    a: "Voor PLA/PETG 0,2-0,3 mm, voor TPU 0,4-0,6 mm afhankelijk van schaal.",
  },
]

const references = [
  {
    label: "Ultimaker: Design for FFF 3D printing",
    href: "https://ultimaker.com/learn/design-for-fff-3d-printing/",
  },
  {
    label: "Prusa material guide (PLA, PETG, TPU)",
    href: "https://help.prusa3d.com/filament-material-guide",
  },
  {
    label: "Bambu Studio documentation",
    href: "https://wiki.bambulab.com/en/software/bambu-studio",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "3D print assemblage gids: paspennen en inserts",
  description:
    "Assemblage gids met paspennen, speling en bevestiging voor 3D prints inclusief richtwaarden.",
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
  name: "Assemblage plannen in 4 stappen",
  description: "Plan paspennen, speling en bevestiging om je 3D print onderdelen strak te monteren.",
  inLanguage: "nl-BE",
  mainEntityOfPage: canonical,
  totalTime: "PT4M",
  steps: [
    {
      name: "Bepaal de deling",
      text: "Split het model op logische vlakken en plan waar de naad komt.",
    },
    {
      name: "Voeg paspennen en speling toe",
      text: "Gebruik paspennen of sleuven en voeg de juiste speling toe per materiaal.",
    },
    {
      name: "Kies bevestiging",
      text: "Beslis tussen inserts, schroeven of lijm afhankelijk van belasting.",
    },
    {
      name: "Laat je ontwerp controleren",
      url: contactHref,
    },
  ],
  toolNames: ["X3DPrints 3D viewer", "Material Suggestion Tool"],
  supplyNames: ["STL of STEP bestand"],
})

export default function BlogAssemblageGidsPage() {
  return (
    <main className="relative overflow-hidden px-6 pb-24 pt-16 sm:px-8 lg:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_60%_at_50%_0%,rgba(45,212,191,.18),transparent_70%)]"
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
              <li className="font-medium text-slate-700">Assemblage gids</li>
            </ol>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-600">Assemblage</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            3D print assemblage gids: paspennen en inserts
          </h1>
          <p className="max-w-3xl text-lg text-slate-700">
            Het korte antwoord: een goede assemblage start met slimme deling, paspennen en voldoende speling. Voeg
            inserts toe waar je herhaalbaar wil monteren en kies het materiaal dat de belasting aankan.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
            Laatst bijgewerkt: 9 februari 2026
          </p>
          <div className="flex flex-wrap gap-3">
            <ShimmerButton
              href={viewerHref}
              event={{ action: "cta_click", category: "blog_assemblage_top", label: "viewer" }}
            >
              Upload je model
            </ShimmerButton>
            <ShimmerButton
              href={materialsHref}
              className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
              event={{ action: "cta_click", category: "blog_assemblage_top", label: "materials_tool" }}
            >
              Kies materiaal
            </ShimmerButton>
            <Link
              href={pricingHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-300 hover:bg-slate-50"
            >
              Check pricing
            </Link>
          </div>
        </header>

        <BlogContentOverview locale="nl" />

        <section id="assemblage-checklist" className="scroll-mt-28">
          <Reveal>
            <h2 className="text-2xl font-semibold text-slate-900">Checklist voor stevige assemblages</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {checklistItems.map((item) => (
                <GlassCard key={item.title} className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-700">{item.description}</p>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="assemblage-tabel" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Richtwaarden voor paspennen en speling</h2>
              <p className="mt-2 text-sm text-slate-600">
                Startwaarden voor FDM prints. We fine-tunen op basis van schaal, materiaal en printerinstellingen.
              </p>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-[720px] text-left text-sm text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200/70 text-slate-500">
                      <th className="py-2 pr-4 font-semibold">Check</th>
                      <th className="py-2 pr-4 font-semibold">PLA/PETG</th>
                      <th className="py-2 pr-4 font-semibold">TPU</th>
                      <th className="py-2 pr-4 font-semibold">Waarom</th>
                    </tr>
                  </thead>
                  <tbody>
                    {guidelineRows.map((row) => (
                      <tr key={row.label} className="border-b border-slate-200/70 last:border-0">
                        <td className="py-2 pr-4 font-medium text-slate-900">{row.label}</td>
                        <td className="py-2 pr-4">{row.plaPetg}</td>
                        <td className="py-2 pr-4">{row.tpu}</td>
                        <td className="py-2 pr-4">{row.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Voor exacte waarden gebruiken we je STL/STEP en de{" "}
                <Link href={viewerHref} className="font-semibold text-emerald-600 hover:text-emerald-700">
                  viewer
                </Link>{" "}
                om kritieke zones te controleren.
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Meer context? Lees de{" "}
                <Link href={designGuideHref} className="font-semibold text-emerald-600 hover:text-emerald-700">
                  3D print ontwerp gids
                </Link>
                .
              </p>
            </GlassCard>
          </Reveal>
        </section>

        <section id="assemblage-fasteners" className="scroll-mt-28">
          <Reveal>
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Bevestiging: schroeven, inserts of lijm?</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {fastenerCards.map((card) => (
                  <div key={card.title} className="rounded-2xl border border-slate-200/70 bg-white/80 p-4">
                    <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                    <p className="mt-2 text-sm text-slate-700">{card.description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <ShimmerButton
                  href={contactHref}
                  event={{ action: "cta_click", category: "blog_assemblage_mid", label: "contact_prefill" }}
                >
                  Vraag assemblageadvies
                </ShimmerButton>
                <ShimmerButton
                  href={materialsHref}
                  className="bg-slate-900 shadow-[0_10px_30px_rgba(15,23,42,.28)]"
                  event={{ action: "cta_click", category: "blog_assemblage_mid", label: "materials_tool" }}
                >
                  Kies materiaal
                </ShimmerButton>
              </div>
            </GlassCard>
          </Reveal>
        </section>

        <section id="assemblage-faq" className="scroll-mt-28">
          <Faq title="FAQ over 3D print assemblage" items={faqItems} />
        </section>

        <section id="assemblage-sources" className="scroll-mt-28">
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
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Klaar om je assemblage te testen?</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Stuur je bestand en ontvang advies over paspennen, speling en bevestiging.
                </p>
              </div>
              <ShimmerButton
                href={contactHref}
                event={{ action: "cta_click", category: "blog_assemblage_bottom", label: "contact_prefill" }}
              >
                Start advies
              </ShimmerButton>
            </GlassCard>
          </Reveal>
        </section>
      </article>

      <ReadMoreLinks pageType="services" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <BlogAuthorNote locale="nl" />
    </main>
  )
}
