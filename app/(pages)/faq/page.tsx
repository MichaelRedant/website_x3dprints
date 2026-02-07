// app/(pages)/faq/page.tsx
import Link from "next/link"
import type { Metadata } from "next"

import Reveal from "@/components/Reveal"
import Faq from "@/components/Faq"
import GlassOrb from "@/components/GlassOrb"
import ShimmerButton from "@/components/ShimmerButton"
import GlassCard from "@/components/GlassCard"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import { servicesFaq } from "@/content/services-faq"
import { buildFaqPageSchema } from "@/lib/seo"

// --- SEO via Metadata API ---
export const revalidate = 86_400 // 24u cache
export const metadata: Metadata = {
  title: "Veelgestelde vragen 3D printen | X3DPrints",
  description:
    "FAQ over 3D printen, levertijden, materialen (PLA, PETG, TPU), nabehandeling en werkwijze. Met geo-info voor Herzele, Gent, Antwerpen en Oost-Vlaanderen.",
  alternates: {
    canonical: "https://www.x3dprints.be/faq/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/faq/",
      "en-BE": "https://www.x3dprints.be/en/faq/",
      "x-default": "https://www.x3dprints.be/faq/",
    },
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
  },
  openGraph: {
    title: "FAQ 3D printen | X3DPrints",
    description:
      "Alles over 3D printen: materialen, levertijden, prijzen, nabehandeling en workflow.",
    url: "https://www.x3dprints.be/faq",
    siteName: "X3DPrints",
    type: "website",
    locale: "nl_BE",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "FAQ 3D printen" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ 3D printen | X3DPrints",
    description:
      "Antwoorden op vragen over 3D printen, materialen en verzending. Kort en duidelijk.",
    images: ["/images/og-home.jpg"],
  },
  keywords: [
    "FAQ 3D printen",
    "3D print service Herzele",
    "3D printen Oost-Vlaanderen",
    "PLA PETG TPU levertijd",
    "rapid prototyping Gent",
    "3D printen Antwerpen",
    "AI proof content 3D printen",
  ],
}

export default function Page() {
  // Extra FAQ-items (bovenop servicesFaq)
  const extraFaq = [
    {
      q: "Werken jullie met particulieren?",
      a: "Ja. Particulieren, verenigingen, scholen en bedrijven kunnen terecht voor een stuk of kleine series. Start met een aanvraag via <a href=\"/contact\">/contact</a>.",
    },
    {
      q: "Waarom moet ik het aanvraagformulier invullen?",
      a: "We capteren materiaal, aantallen, afwerking en toepassing in een keer. Zo kunnen we snel een correcte offerte maken zonder heen-en-weer.",
    },
    {
      q: "Hoe verloopt een project van aanvraag tot levering?",
      a: "We controleren je STL/STEP, sturen een voorstel, doen indien nodig een testprint en plannen productie. Je krijgt updates tot levering of afhaling in Herzele.",
    },
    {
      q: "Helpen jullie bij het maken van een 3D-model?",
      a: "Ja. Op basis van schetsen, foto's of een referentiestuk maken we een printklaar 3D-model. Vraag dit aan via <a href=\"/contact\">/contact</a>.",
    },
    {
      q: "Waar vind ik 3D modellen om te laten printen?",
      a: "Bekijk de gids <a href=\"/3d-modellen-vinden\">3D modellen vinden</a> met links naar Printables, MakerWorld, Thingiverse, MyMiniFactory, Cults en Thangs en tips over schaal en printbaarheid.",
    },
    {
      q: "Kunnen jullie 3D-scannen?",
      a: "Nee, maar met duidelijke foto's, metingen of een fysiek voorbeeld kunnen we het model digitaliseren en voorbereiden op print.",
    },
    {
      q: "Wat is jullie gemiddelde reactietijd?",
      a: "Meestal binnen een werkdag. Is het dringend? Vermeld je deadline, dan bekijken we spoedopties voor levering in Vlaanderen.",
    },
    { q: "Wat betekent AM?", a: "AM staat voor Additive Manufacturing: onderdelen laag voor laag opbouwen vanuit een 3D-model." },
    { q: "Wat is FDM?", a: "FDM legt gesmolten filament laag per laag. Sterk en betaalbaar voor prototypes en functionele stukken." },
    { q: "Wat is SLA?", a: "SLA verhardt vloeibare hars met een UV-laser. Zeer hoge nauwkeurigheid en glad oppervlak." },
    {
      q: "Welke verzendopties bieden jullie?",
      a: "Afhalen op afspraak, lokale levering of verzending via Bpost. Spoedlevering kan in overleg. Geef je gemeente/district door bij <a href=\"/contact\">/contact</a>.",
    },
    {
      q: "Waar vind ik voorbeelden van projecten?",
      a: "Bekijk het overzicht op <a href=\"/portfolio\">/portfolio</a> met prototypes, minis en functionele onderdelen.",
    },
    {
      q: "Leveren jullie in Gent, Aalst of Antwerpen?",
      a: "Ja. Vanuit Herzele leveren we dagelijks in Oost-Vlaanderen, de Denderstreek en Antwerpen. Zie <a href=\"/locaties\">/locaties</a> voor de zones.",
    },
    {
      q: "Kan ik materialen vooraf zien?",
      a: "Op <a href=\"/materials\">/materials</a> vind je kleuren en richtlijnen. Op verzoek sturen we recente voorbeelden in PLA Matte, PETG of TPU.",
    },
    {
      q: "Hoe optimaliseren jullie prints voor sterkte?",
      a: "We kiezen laaghoogte, infill, orientatie en wanddikte volgens de belasting. PETG of TPU voor functionele stukken; PLA Matte voor esthetiek.",
    },
    {
      q: "Hebben jullie een STL/STEP viewer?",
      a: "Ja, via <a href=\"/viewer\">/viewer</a> kan je orientatie en schaal checken. Noteer je voorkeur in de aanvraag.",
    },
    {
      q: "Hoe verwerken jullie AI-gegenereerde modellen?",
      a: "We checken op manifold, wanddikte en overhang. Indien nodig corrigeren we het bestand zodat het foutloos print.",
    },
    {
      q: "Bieden jullie levering op locatie?",
      a: "Ja. Geef gemeente of district door en we plannen EV-levering, koerier of Bpost. Afhalen in Herzele/Gent kan ook.",
    },
    {
      q: "Wat is 3D printen precies?",
      a: "Een digitale productiemethode waarbij een object laag per laag wordt opgebouwd vanuit .STL of .STEP. We leggen het proces graag uit in de <a href=\"/blog\">blog</a>.",
    },
    {
      q: "Welke materialen bieden jullie aan?",
      a: "PLA, PETG en TPU zijn standaard. PLA is ideaal voor detail, PETG voor sterkte/hitte, TPU voor flexibiliteit. Details op <a href=\"/materials\">/materials</a>.",
    },
    {
      q: "Kan ik mijn eigen bestand aanleveren?",
      a: "Ja. Upload STL/STEP via <a href=\"/contact\">/contact</a> of gebruik de <a href=\"/viewer\">viewer</a> om te dubbelchecken.",
    },
    {
      q: "Hoe snel kunnen jullie leveren?",
      a: "Doorgaans 2-5 werkdagen afhankelijk van complexiteit en oplage. Spoed mogelijk op aanvraag via <a href=\"/contact\">/contact</a>.",
    },
    {
      q: "Wat kost een 3D print?",
      a: "Prijs = materiaal + printtijd + nabewerking. Gebruik de calculator op <a href=\"/pricing\">/pricing</a> voor een richtprijs, definitief na modelcheck.",
    },
    {
      q: "Kan ik meerdere stuks laten printen?",
      a: "Zeker. Vanaf een stuk tot kleine series. Grotere volumes krijgen staffelprijzen; vraag dit aan via <a href=\"/pricing\">/pricing</a> of <a href=\"/contact\">/contact</a>.",
    },
    {
      q: "Is 3D printen geschikt voor functionele onderdelen?",
      a: "Ja. PETG en TPU voor belastbare of flexibele delen. We stemmen orientatie en infill af op de krachten.",
    },
    {
      q: "Bieden jullie nabewerking aan?",
      a: "We verwijderen supports en ontbramen licht. Voor schuren, lak of montage werken we samen met partners; vermeld dit in je aanvraag.",
    },
    {
      q: "Welke sectoren gebruiken jullie prints?",
      a: "Startups, kmo's, onderwijs, makers, automotive, marketing en architectuur. Zie <a href=\"/segments\">/segments</a> voor segmentpagina's.",
    },
    {
      q: "Wat als mijn model fouten bevat?",
      a: "We detecteren en repareren kleine issues. Bij grotere problemen adviseren we de beste aanpak of CAD-correcties.",
    },
    {
      q: "Hoe groot kunnen jullie printen?",
      a: "Tot ca. 35 x 32 x 35 cm in een stuk. Groter kan door te splitsen en te monteren; dit stemmen we vooraf af.",
    },
    {
      q: "Kunnen jullie onderdelen namaken of vervangen?",
      a: "Ja, met een model, schets of fysiek voorbeeld. We helpen optimaliseren voor sterkte en passing.",
    },
    {
      q: "Is 3D printen duurzaam?",
      a: "FDM genereert weinig afval. PLA is biogebaseerd en recyclebaar. We adviseren dunner materiaal en slimme orientatie waar mogelijk.",
    },
    {
      q: "Hoe vraag ik een offerte aan?",
      a: "Upload je bestand via <a href=\"/contact\">/contact</a>. Je krijgt meestal binnen 24 uur een duidelijk voorstel.",
    },
    {
      q: "Printen jullie ook een enkel stuk?",
      a: "Ja, vanaf een stuk. We focussen zowel op proefprints als kleine series. Check prijzen op <a href=\"/pricing\">/pricing</a>.",
    },
    {
      q: "Hoe sterk zijn FDM prints?",
      a: "Sterkte hangt af van materiaal en orientatie. We adviseren ribben, wanddikte en infill afgestemd op de belasting.",
    },
    {
      q: "Kunnen jullie mijn ontwerp verbeteren?",
      a: "We voeren basisreparaties uit en geven tips voor een beter resultaat. Voor uitgebreid CAD-werk kunnen we partners inschakelen.",
    },
    {
      q: "Hoe lever ik mijn bestand goed aan?",
      a: "Gebruik STL of STEP, vermeld toepassing, sterkte en aantallen. Controleer het bestand in de <a href=\"/viewer\">viewer</a> en voeg notities toe.",
    },
  ] as const

  // Combine baseline FAQ + new entries while deduping identical questions (prevents duplicate keys in the accordion)
  const combinedFaq = [...servicesFaq, ...extraFaq]
  const seen = new Set<string>()
  const faq = combinedFaq.filter((item) => {
    const key = item.q.trim().toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
  const tocItems = [
    { id: "faq-main", label: "Veelgestelde vragen per onderwerp" },
    { id: "faq-help", label: "Wat als je nog vragen hebt?" },
    { id: "faq-sources", label: "Bronnen en referenties" },
  ]
  const references = [
    { label: "ISO/ASTM 52900 terminologie voor additive manufacturing", url: "https://www.astm.org/f2997-13r21.html" },
    { label: "Prusa materialenoverzicht (PLA, PETG, TPU)", url: "https://help.prusa3d.com/article/material-guide_220" },
    { label: "Autodesk uitleg over additive manufacturing", url: "https://www.autodesk.com/solutions/additive-manufacturing/what-is-additive-manufacturing" },
  ]
  const lastUpdatedLabel = "Laatst bijgewerkt: 6 februari 2026"

  // JSON-LD (FAQPage)
  const faqJsonLd = buildFaqPageSchema({
  inLanguage: "nl-BE",
  items: faq,
})

  return (
    <main className="relative overflow-clip">
      {/* Achtergrond in site-stijl */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-teal-50" />
        <div className="absolute -top-32 -left-28 h-[26rem] w-[26rem] rounded-full bg-cyan-200/30 blur-3xl sm:h-[32rem] sm:w-[32rem] md:h-[38rem] md:w-[38rem]" />
        <div className="absolute -bottom-32 -right-28 h-[28rem] w-[28rem] rounded-full bg-teal-200/30 blur-3xl sm:h-[36rem] sm:w-[36rem] md:h-[42rem] md:w-[42rem]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px]" />
      </div>

      {/* Hero / Titel */}
      <section className="relative px-6 pb-14 pt-16 sm:px-8 lg:px-12 lg:pb-16 lg:pt-20">
        <div className="absolute right-0 top-0 -z-10 hidden sm:block">
          <GlassOrb className="h-64 w-64 opacity-40" />
        </div>

        <div className="mx-auto max-w-5xl">
          <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-center">
            <div className="flex-1 text-left">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/60 px-3 py-1 text-xs font-semibold text-teal-700 shadow-sm backdrop-blur animate-[fadeIn_.6s_ease_out_both]">
                Up-to-date - Materials - Geo delivery
              </p>
              <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                Veelgestelde vragen over 3D printen
              </h1>
              <p className="mt-4 max-w-2xl text-pretty text-lg text-slate-700">
                Alle antwoorden op een plek: materialen, levertijden, geo-levering (Herzele - Gent - Antwerpen), viewer-checklist en nabewerking.
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <ShimmerButton href="/contact" aria-label="Stel je vraag of vraag een offerte aan">
                  Stel je vraag
                </ShimmerButton>
                <Link
                  href="/materials"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Materialen & richtlijnen
                </Link>
              </div>
              <ContentTableOfContents title="Inhoud" items={tocItems} className="mt-6 max-w-xl" />
            </div>

            <div className="flex-1">
              <div className="grid gap-3 sm:grid-cols-2">
                <GlassCard className="animate-[fadeInUp_.7s_ease_out_both]">
                  <div className="text-sm font-semibold text-slate-800">Snelle levering</div>
                  <p className="mt-1 text-sm text-slate-600">Meestal binnen enkele werkdagen in Vlaanderen.</p>
                </GlassCard>
                <GlassCard className="animate-[fadeInUp_.8s_ease_out_both]">
                  <div className="text-sm font-semibold text-slate-800">Materialen</div>
                  <p className="mt-1 text-sm text-slate-600">PLA Matte, PETG, TPU. Op aanvraag: ABS/ASA, Nylon.</p>
                </GlassCard>
                <GlassCard className="animate-[fadeInUp_.9s_ease_out_both]">
                  <div className="text-sm font-semibold text-slate-800">Viewer ready</div>
                  <p className="mt-1 text-sm text-slate-600">Check je STL/STEP in de viewer en noteer orientatie.</p>
                </GlassCard>
                <GlassCard className="animate-[fadeInUp_1s_ease_out_both]">
                  <div className="text-sm font-semibold text-slate-800">3D printen in Vlaanderen</div>
                  <p className="mt-1 text-sm text-slate-600">Van Antwerpen, Gent tot Geraardsbergen en Ronse!</p>
                </GlassCard>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ blok */}
      <section id="faq-main" className="scroll-mt-28 px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Veelgestelde vragen per onderwerp</h2>
            <p className="mt-2 max-w-3xl text-slate-600">
              Hieronder vind je praktische antwoorden over levering, materiaalkeuze, bestandsformaten en workflow.
            </p>
          </Reveal>
          <Reveal className="mb-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              Bambu enthousiast
            </span>
            <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
              PLA & PETG expert
            </span>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
              Levering mogelijk
            </span>
          </Reveal>

          <Reveal>
            <Faq city="Belgie" items={faq} />
          </Reveal>

          <section id="faq-help" className="scroll-mt-28">
            <Reveal className="mt-10 grid gap-4 sm:grid-cols-2">
              <GlassCard className="animate-[fadeInUp_.7s_ease_out_both]">
                <div className="text-sm font-semibold text-slate-800">Nog vragen?</div>
                <p className="mt-2 text-sm text-slate-600">
                  Geen antwoord gevonden? Stuur je bestand via{" "}
                  <Link href="/contact" className="text-teal-700 underline underline-offset-2">
                    contact
                  </Link>{" "}
                  met gewenste leverdatum en gemeente/district. We antwoorden meestal binnen een werkdag.
                </p>
              </GlassCard>
              <GlassCard className="animate-[fadeInUp_.8s_ease_out_both]">
                <div className="text-sm font-semibold text-slate-800">Check de viewer</div>
                <p className="mt-2 text-sm text-slate-600">
                  Upload je STL/STEP in de{" "}
                  <Link href="/viewer" className="text-teal-700 underline underline-offset-2">
                    viewer
                  </Link>{" "}
                  en noteer de gewenste orientatie. Tip: zichtzijde boven, kritieke maat in XY vlak.
                </p>
              </GlassCard>
            </Reveal>
          </section>
        </div>
      </section>

      <section id="faq-sources" className="scroll-mt-28 px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassCard>
              <h2 className="text-xl font-semibold text-slate-900">Bronnen en referenties</h2>
              <p className="mt-2 text-sm text-slate-600">
                Deze referenties gebruiken we voor terminologie en materiaaluitleg in deze FAQ.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {references.map((reference) => (
                  <li key={reference.url} className="rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3">
                    <cite className="not-italic">
                      <Link href={reference.url} target="_blank" rel="noreferrer" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        {reference.label}
                      </Link>
                    </cite>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* Structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  )
}


