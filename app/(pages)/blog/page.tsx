import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"

export const metadata: Metadata = {
  title: "3D print blog & kennisbank | X3DPrints",
  description:
    "Strategische 3D print artikels over kostprijs, materiaalkeuze, Bambu X1C instellingen en ontwerpbest practices. Inclusief links naar calculator en materiaaloverzicht.",
  alternates: { canonical: "https://www.x3dprints.be/blog" },
  openGraph: {
    title: "3D print blog & kennisbank | X3DPrints",
    description:
      "Leer hoe je 3D print projecten plant: kostenraming, PLA vs PETG, Bambu X1C instellingen en designrichtlijnen. Rechtstreekse links naar prijscalculator en materialen.",
    url: "https://www.x3dprints.be/blog",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "3D print blog X3DPrints" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D print blog & kennisbank | X3DPrints",
    description: "Strategische content over 3D print kosten, materiaalkeuze, Bambu X1C instellingen en ontwerpaanpak.",
    images: ["/images/og-home.jpg"],
  },
}

type Topic = {
  id: string
  title: string
  summary: string
  highlights: string[]
  links: { label: string; href: string }[]
  intent: "informational" | "transactional" | "how-to"
}

const topics: Topic[] = [
  {
    id: "hoeveel-kost-3d-printen",
    title: "Hoeveel kost 3D printen?",
    summary:
      "Kosten worden bepaald door printtijd, materiaalprijs per kilogram, gewenste afwerking en eventuele ontwerpuren. In het uitgebreide blogartikel lichten we elk kostblok toe inclusief formules en voorbeelden.",
    highlights: [
      "Basistarieven starten vanaf het PLA Matte referentieprofiel; specials zoals Silk, Marble of TPU hebben een opslag van 20-30%.",
      "Printtijd hangt af van laaghoogte en vulling. Fijne lagen (0.12 mm) zien er top uit, maar hebben 15-25% meer machine-uren.",
      "Logistiek (Bpost, afhalen of persoonlijke levering) telt mee in de eindfactuur. Binnen regio Herzele/Gent kan afhalen gratis.",
    ],
    links: [
      { label: "Lees volledig artikel", href: "/blog/hoeveel-kost-3d-printen" },
      { label: "Bekijk prijzen & calculator", href: "/pricing" },
      { label: "Vraag een offerte", href: "/contact" },
    ],
    intent: "transactional",
  },
  {
    id: "pla-vs-petg",
    title: "PLA vs PETG: welke moet je kiezen?",
    summary:
      "PLA is ideaal voor designmodellen en snelle prototyping, terwijl PETG beter tegen warmte, uv en impact kan. Vergelijk de materiaalkaarten en kies de blend die past bij jouw toepassing.",
    highlights: [
      "PLA Matte en PLA Tough+ leveren een premium look zonder veel nabewerking. Perfect voor interieur, branding en gingebruik binnenshuis.",
      "PETG blijft dimensioneel stabiel tot ongeveer 80 C en is chemisch resistenter. Kies dit voor buitengebruik, mechanische onderdelen en vloeistofcontact.",
      "Moet het flexibel zijn? TPU (shore 95A) biedt schokabsorptie voor bumpers of grips. Combineer evt. met PLA behuizing voor hybride onderdelen.",
    ],
    links: [
      { label: "Lees volledig artikel", href: "/blog/pla-vs-petg" },
      { label: "Materialen vergelijken", href: "/materials" },
      { label: "Bekijk PETG voorbeeldproject", href: "/materials/petg" },
    ],
    intent: "informational",
  },
  {
    id: "bambu-printer-instellingen",
    title: "Beste instellingen voor jouw Bambu printer",
    summary:
      "Bambu printers leveren snel en consistent resultaat, maar vragen nog steeds materiaal-specifieke tuning. In het uitgebreide artikel delen we onze studio presets voor PLA, PETG en TPU plus tips voor flow en kalibratie.",
    highlights: [
      "PLA presets: 215 C nozzle, 60 C bed, 0.16-0.24 mm layerhoogte met fans op 70-100% voor scherpe randen en minimale stringing.",
      "PETG presets: 240 C nozzle, 80 C bed, ventilator tot 40% en iets lagere retract zodat lagen stevig hechten zonder blobs.",
      "TPU presets: 235 C nozzle, 45 C bed, 30 mm/s max snelheid, beperkte retract en droger filament voor betrouwbare AMS-run.",
    ],
    links: [
      { label: "Lees volledig artikel", href: "/blog/beste-instellingen-bambu-printer" },
      { label: "Meer over productieaanpak", href: "/services" },
      { label: "Vraag tips voor jouw print", href: "/contact" },
    ],
    intent: "how-to",
  },
  {
    id: "3d-printing-marketing-events",
    title: "3D printing voor marketing & events",
    summary:
      "Props, awards en merchandising die aansluiten bij je campagnekalender. Leer hoe je een briefing opzet, materialen kiest en KPI’s koppelt aan tastbare activaties.",
    highlights: [
      "Silk, Marble en Translucent PLA zorgen voor premium looks die klaar zijn voor fotoshoots.",
      "Korte feedbackloops omdat je rechtstreeks met de printer in Herzele schakelt.",
      "Integreer QR/NFC in props om leads of engagement te meten tijdens events.",
    ],
    links: [
      { label: "Lees volledig artikel", href: "/blog/3d-printing-marketing-events" },
      { label: "Segment marketing & events", href: "/segments/3d-printing-marketing" },
      { label: "Vraag props of giveaways aan", href: "/contact?material=PLA%20Silk%2B" },
    ],
    intent: "transactional",
  },
  {
    id: "ontwerp-3d-printbaar-model",
    title: "Hoe ontwerp je een 3D printbaar model?",
    summary:
      "Een printbaar ontwerp combineert consistente wanddiktes, correcte tolerantie en slimme oriëntatie. In het lange artikel tonen we exact hoe we STL/STEP voorbereiden voor productie in PLA, PETG en TPU.",
    highlights: [
      "Minimale wanddikte: 1.2 mm voor PLA/PETG, 2 mm voor TPU. Voeg ribs of fillets toe om krachten te spreiden.",
      "Beperk overhang > 55 graden of voorzie ondersteuningsvlakken. Maak holtes toegankelijk zodat support makkelijk loskomt.",
      "Lever STEP of native CAD wanneer je nog wijzigingen verwacht; STL is prima voor finale productie. Voeg maatvoering of tolerantie-notes toe in het bericht.",
    ],
    links: [
      { label: "Lees volledig artikel", href: "/blog/ontwerp-3d-printbaar-model" },
      { label: "Upload bestanden via viewer", href: "/viewer" },
      { label: "Ontwerpservice aanvragen", href: "/contact" },
    ],
    intent: "informational",
  },
  {
    id: "hoe-lang-duurt-3d-printen",
    title: "Hoe lang duurt 3D printen?",
    summary:
      "Doorlooptijd hangt af van de complexiteit, materiaal en finishing. In het artikel leggen we uit hoe we jobs inplannen en hoe jij sneller in de queue komt zonder harde garanties.",
    highlights: [
      "Machine-uren variëren van minder dan een uur tot meer dan een dag per onderdeel. We adviseren hoe je geometrie optimaliseert.",
      "Door onderdelen te groeperen per materiaal verkort je de wachtrij en hoef je minder vaak van spool te wisselen.",
      "Afhalen, Bpost of persoonlijke levering: we stemmen logistiek af op jouw deadline zodat het geheel blijft kloppen.",
    ],
    links: [
      { label: "Lees volledig artikel", href: "/blog/hoe-lang-duurt-3d-printen" },
      { label: "Plan levering", href: "/contact" },
      { label: "Bekijk prijzen & doorlooptijden", href: "/pricing" },
    ],
    intent: "informational",
  },
  {
    id: "bestanden-voor-3d-printen",
    title: "Welke bestanden heb je nodig voor 3D printen?",
    summary:
      "STL, STEP en native CAD spelen elk een rol. We leggen uit welk formaat je wanneer gebruikt, welke resolutie nodig is en hoe je metadata toevoegt voor snelle offertes.",
    highlights: [
      "Voor productie: STL met 0.01-0.05 mm resolutie. Voor revisies: STEP of native CAD zodat we maten kunnen aanpassen.",
      "Voeg meetreferenties, tolerantie-notes en foto's toe in dezelfde map of viewer upload.",
      "Controleer meshes op non-manifold edges en gedupliceerde vlakken voordat je uploadt.",
    ],
    links: [
      { label: "Lees volledig artikel", href: "/blog/bestanden-voor-3d-printen" },
      { label: "Upload via viewer", href: "/viewer" },
      { label: "Vraag ontwerpreview", href: "/contact" },
    ],
    intent: "how-to",
  },
  {
    id: "3d-printen-in-de-buurt",
    title: "3D printen in de buurt (Gent, Aalst, Dendermonde)",
    summary:
      "X3DPrints levert vanuit Herzele voor Gent, Aalst en Dendermonde. Lees hoe we lokale projecten aanpakken, wat de logistieke opties zijn en welke voorbeelden we al maakten.",
    highlights: [
      "Korte lijnen: rechtstreeks contact met de maker en afhalen op afspraak in Herzele (tussen Gent en Aalst).",
      "Persoonlijke levering in Dendermonde, Aalst of Gent bespreekbaar; anders verzenden via Bpost met track & trace.",
      "Voorbeelden: winkelmateriaal, prototypes en personalisatie voor events; bekijk de portfolio voor inspiratie.",
    ],
    links: [
      { label: "Lees volledig artikel", href: "/blog/3d-printen-in-de-buurt" },
      { label: "Bekijk portfolio", href: "/portfolio" },
      { label: "Plan afhaling of levering", href: "/contact" },
    ],
    intent: "informational",
  },
  {
    id: "3d-printen-voor-beginners",
    title: "3D printen voor beginners",
    summary:
      "Nieuwe gebruiker? Deze gids legt uit welke materialen je kiest, hoe je bestanden voorbereidt en wat een opleiding of workshop kan omvatten.",
    highlights: [
      "PLA Matte is het startpunt: makkelijk te printen, beschikbaar in veel kleuren en ideaal voor proof-of-concepts.",
      "Gebruik de viewer om STL/STEP te uploaden en laat ons meekijken naar wanddiktes en oriëntatie.",
      "Zoek je opleiding? We bieden korte kennisoverdracht tijdens je project: instellingen, tips en valkuilen.",
    ],
    links: [
      { label: "Lees volledig artikel", href: "/blog/3d-printen-voor-beginners" },
      { label: "Upload je eerste model", href: "/viewer" },
      { label: "Vraag begeleiding", href: "/contact" },
    ],
    intent: "how-to",
  },
  {
    id: "3d-printen-op-bestelling",
    title: "3D printen op bestelling: zo werkt het",
    summary:
      "Van aanvraag tot levering: dit artikel beschrijft het bestelproces bij X3DPrints, inclusief prijsinschatting, voorbeelden en follow-up.",
    highlights: [
      "Stap 1: stuur STL/STEP + context, ontvang binnen één werkdag feedback en prijsinschatting.",
      "Stap 2: productie en kwaliteitscheck; we delen foto’s of korte video’s als je updates wil.",
      "Stap 3: verzending of afhaling met factuur en herhaalopties voor toekomstige bestellingen.",
    ],
    links: [
      { label: "Lees volledig artikel", href: "/blog/3d-printen-op-bestelling" },
      { label: "Check pricing & calculator", href: "/pricing" },
      { label: "Bestelling starten", href: "/contact" },
    ],
    intent: "transactional",
  },
]

const extraResources = [
  {
    title: "Materialenbibliotheek",
    description: "Deep-dive per filament inclusief voorraadstatus, FAQ en JSON-LD schema's.",
    href: "/materials",
  },
  {
    title: "Prijzen & calculator",
    description: "Indicatieve tarieven met prijsinschatting en uitleg over layerhoogtes, infill en logistiek.",
    href: "/pricing",
  },
  {
    title: "FAQ & support",
    description: "Antwoorden over levertijd, bestandsformaten, nabewerking en verzending.",
    href: "/faq",
  },
]

const articleListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "X3DPrints blog onderwerpen",
  itemListElement: topics.map((topic, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Article",
      headline: topic.title,
      description: topic.summary,
      url:
        topic.id === "hoeveel-kost-3d-printen"
          ? "https://www.x3dprints.be/blog/hoeveel-kost-3d-printen"
          : topic.id === "pla-vs-petg"
            ? "https://www.x3dprints.be/blog/pla-vs-petg"
            : topic.id === "bambu-printer-instellingen"
              ? "https://www.x3dprints.be/blog/beste-instellingen-bambu-printer"
              : topic.id === "ontwerp-3d-printbaar-model"
                ? "https://www.x3dprints.be/blog/ontwerp-3d-printbaar-model"
                : topic.id === "hoe-lang-duurt-3d-printen"
                  ? "https://www.x3dprints.be/blog/hoe-lang-duurt-3d-printen"
                  : topic.id === "bestanden-voor-3d-printen"
                    ? "https://www.x3dprints.be/blog/bestanden-voor-3d-printen"
                    : topic.id === "3d-printen-in-de-buurt"
                      ? "https://www.x3dprints.be/blog/3d-printen-in-de-buurt"
                      : topic.id === "3d-printen-voor-beginners"
                        ? "https://www.x3dprints.be/blog/3d-printen-voor-beginners"
                        : topic.id === "3d-printen-op-bestelling"
                          ? "https://www.x3dprints.be/blog/3d-printen-op-bestelling"
                          : `https://www.x3dprints.be/blog#${topic.id}`,
    },
  })),
}

export default function BlogPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(140%_80%_at_50%_-10%,rgba(59,130,246,0.18),transparent_65%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.08]" />

      <section className="px-6 pb-14 pt-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal className="stacked-content">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Blog & kennisbank</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Content met zoekintentie voor makers, marketeers en engineers.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Geen random blogposts, maar antwoorden op vragen die we dagelijks krijgen. Gebruik de inzichten voor je
              volgende project en klik door naar de calculator, materialen of viewer om meteen verder te werken.
            </p>
            <div className="stacked-actions mt-6 flex flex-wrap gap-3 justify-center sm:justify-start">
              <ShimmerButton href="/pricing">Start met prijsinschatting</ShimmerButton>
              <Link
                href="/materials"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Materialen bekijken
              </Link>
              <Link
                href="/blog/hoeveel-kost-3d-printen"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Lees: Hoeveel kost 3D printen?
              </Link>
              <Link
                href="/materials#material-suggestion-tool"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Material Suggestion Tool
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl space-y-10">
          {topics.map((topic, index) => (
            <Reveal key={topic.id} delay={index * 0.04}>
              <article id={topic.id} className="scroll-mt-24">
                <GlassCard className="overflow-hidden border border-white/40 bg-white/75 p-6 shadow-lg backdrop-blur">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    <span>{topic.intent === "transactional" ? "Pricing" : topic.intent === "how-to" ? "How-to" : "Guides"}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
                    <span>SEO intent: {topic.intent}</span>
                  </div>
                  <h2 className="mt-3 text-2xl font-semibold text-slate-900">{topic.title}</h2>
                  <p className="mt-2 text-base text-slate-700">{topic.summary}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600">
                    {topic.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {topic.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </GlassCard>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="grid gap-6 md:grid-cols-3">
              {extraResources.map((resource) => (
                <GlassCard key={resource.href} className="h-full p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{resource.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{resource.description}</p>
                  <Link
                    href={resource.href}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
                  >
                    Naar {resource.title}
                    <span aria-hidden>-&gt;</span>
                  </Link>
                </GlassCard>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="flex flex-col gap-6 border border-white/40 bg-white/80 p-8 text-center shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:text-left">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Volgende stap</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">
                  Klaar om jouw concept om te zetten naar een 3D print?
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Upload je modellen, vermeld materiaalvoorkeur en laat de calculator een eerste indicatie geven. We sturen binnen 1 werkdag feedback.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/contact">Plan een gesprek</ShimmerButton>
                <Link
                  href="/viewer"
                  className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
                >
                  STL/STEP uploaden
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleListJsonLd) }}
      />
    </main>
  )
}
