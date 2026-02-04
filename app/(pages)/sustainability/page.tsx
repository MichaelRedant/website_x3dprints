import type { Metadata } from "next"
import Link from "next/link"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import Faq from "@/components/Faq"
import { SITE } from "@/lib/seo"

type Stat = { label: string; value: string; detail: string }
type PillarLink = { href: string; label: string; external?: boolean }
type Pillar = { title: string; copy: string; icon: "material" | "energy" | "loop"; links: PillarLink[] }

export const metadata: Metadata = {
  title: "FuturePrint Lab · Duurzaamheid & circulariteit | X3DPrints",
  description:
    "Duurzame 3D-printing vanuit Herzele. X3DPrints focust op slim ontwerp, efficiënte materiaalkeuzes en lokale levering voor ondernemers, scholen en verenigingen in Oost-Vlaanderen.",
  alternates: { canonical: "https://www.x3dprints.be/sustainability/", languages: { "nl-BE": "https://www.x3dprints.be/sustainability/", en: "https://www.x3dprints.be/en/sustainability/", "x-default": "https://www.x3dprints.be/sustainability/", }, },
  openGraph: {
    title: "Duurzame 3D-printing bij X3DPrints",
    description:
      "Ontdek hoe X3DPrints als lokale 3D-printstudio in Herzele inzet op efficiënte productie, lange levensduur en slimme materiaalkeuzes.",
    url: "https://www.x3dprints.be/sustainability",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "FuturePrint Lab · Duurzaamheid & circulariteit",
    description: "Lees hoe X3DPrints werkt aan praktische en bewuste 3D-printing voor kleine reeksen en prototypes.",
  },
}

const stats: Stat[] = [
  {
    label: "Lokale productie",
    value: "Herzele (BE)",
    detail:
      "Een maker, korte lijnen en directe communicatie. Ideaal voor kmo’s, scholen en verenigingen in Oost-Vlaanderen en de regio Gent/Aalst.",
  },
  {
    label: "On-demand printing",
    value: "Geen stock",
    detail: "We printen pas wanneer er een project is. Zo vermijd je overproductie, ongebruikte voorraad en onnodige kosten.",
  },
  {
    label: "Gerichte materiaalkeuze",
    value: "PLA · PETG · TPU",
    detail: "Per toepassing kiezen we het materiaal dat het langst meegaat en het doel van het onderdeel echt dient.",
  },
  {
    label: "Transparante aanpak",
    value: "1-op-1",
    detail: "Rechtstreeks contact met de persoon die je model bekijkt, optimaliseert en print.",
  },
]

const pillars: Pillar[] = [
  {
    title: "Slim ontwerp en minder verspilling",
    copy:
      "Elke print start bij het model. We kijken mee naar wanddikte, infill en oriëntatie zodat je minder materiaal nodig hebt en onderdelen langer meegaan. Zo wordt 3D-printing een doordachte oplossing in plaats van een gadget.",
    icon: "material",
    links: [
      { href: "/materials", label: "Bekijk materialen en richtlijnen" },
      { href: "/viewer", label: "Controleer je 3D-model in de viewer" },
    ],
  },
  {
    title: "Efficiënte productie in kleine reeksen",
    copy:
      "X3DPrints is geen massafabriek maar een compacte werkplek waar kleine reeksen en prototypes met zorg worden ingepland. Prints worden waar mogelijk per materiaal en kleur gebundeld om ombouwtijd en purgecycli te beperken.",
    icon: "energy",
    links: [
      { href: "/pricing", label: "Hoe wordt de prijs opgebouwd" },
      { href: "/segments/3d-printing-prototypes", label: "Meer over prototyping" },
    ],
  },
  {
    title: "Praktische en lokale logistiek",
    copy:
      "Afhalen kan op afspraak in Herzele. Voor regio Gent en omliggende gemeenten plannen we leveringen in combinatie met bestaande ritten. Verder maken we gebruik van compacte pakketdiensten.",
    icon: "loop",
    links: [
      { href: "/locaties", label: "Levering en regio’s" },
      { href: "/contact", label: "Bespreek een project" },
    ],
  },
]

const roadmap = [
  {
    title: "Design intake",
    detail:
      "Je stuurt je STL- of STEP-bestand door met een korte beschrijving van de toepassing. We bekijken samen wat belangrijk is: sterkte, zichtzijde, maatnauwkeurigheid of vooral look-and-feel.",
    evidence: "Resultaat: minder proefprints en een ontwerp dat past bij het echte gebruik.",
  },
  {
    title: "Productie",
    detail:
      "Printinstellingen worden afgestemd op je doel: van snelle proof-of-concepts tot zichtwerk voor events. Liever functioneel en betrouwbaar dan overbodig complex.",
    evidence: "Resultaat: realistische doorlooptijden en zo weinig mogelijk mislukte prints.",
  },
  {
    title: "Afwerking en verpakking",
    detail:
      "Supports worden verwijderd, scherpe randjes licht bijgewerkt en pakketten worden compact ingepakt met herbruikbaar of recycleerbaar materiaal.",
    evidence: "Resultaat: onderdelen die meteen bruikbaar zijn en geen dozen vol lucht.",
  },
  {
    title: "Langere levensduur",
    detail:
      "We denken mee over reserveonderdelen, modulair ontwerp en hoe je later eenvoudig kunt bijbestellen. Duurzaamheid betekent hier vooral: langer met hetzelfde onderdeel toekomen.",
    evidence: "Resultaat: minder wegwerp, meer hergebruik en eenvoudiger onderhoud.",
  },
]

const faqItems = [
  {
    q: "Hoe is 3D-printing bij X3DPrints duurzamer dan klassieke productie?",
    a:
      "Je maakt enkel wat je nodig hebt, in de aantallen die je echt gebruikt. Geen grote minimumafnames, matrijzen of stock. In combinatie met de juiste materiaalkeuze en lokale levering vermijd je onnodige productie en transport.",
  },
  {
    q: "Kan ik kiezen voor een duurzamere materiaaloptie?",
    a:
      "Ja. PLA is een goede keuze voor indoor, decoratieve of minder zwaar belaste toepassingen. Voor onderdelen die langer buiten staan of meer te verduren krijgen, stellen we meestal PETG of TPU voor. We bekijken per project wat het meest zinvol is.",
  },
  {
    q: "Wat gebeurt er met mislukte prints of teststukken?",
    a:
      "We proberen mislukte prints te vermijden door het model vooraf te controleren en instellingen juist te zetten. Reststukken worden gescheiden per materiaal bewaard en waar mogelijk hergebruikt voor testen, pasmodellen of R&D.",
  },
  {
    q: "Kunnen jullie helpen om mijn ontwerp efficiënter te maken?",
    a:
      "Zeker. We kijken graag mee naar wanddiktes, infill, holtes en verstevigingen. Vaak kan een ontwerp lichter, sneller te printen en toch stevig genoeg zijn. Dat bespaart materiaal, tijd en kostprijs.",
  },
  {
    q: "Werken jullie ook met scholen en verenigingen?",
    a:
      "Ja. We werken geregeld voor scholen, makerspaces en verenigingen met beperkte budgetten. Daarbij denken we extra mee over kost per stuk, haalbaarheid en hoe één ontwerp meerdere doelen kan dienen.",
  },
]

const pageUrl = `${SITE.url}/sustainability`

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",

  inLanguage: ["nl-BE", "en-BE"],
  headline: "FuturePrint Lab: duurzaamheid bij X3DPrints",
  description:
    "Overzicht van de praktische duurzaamheidsprincipes van X3DPrints: slim ontwerp, efficiënte materiaalkeuzes, lokale productie en kleine reeksen op maat.",
  author: { "@type": "Organization", name: "X3DPrints", url: SITE.url },
  publisher: {
    "@type": "Organization",
    name: "X3DPrints",
    logo: { "@type": "ImageObject", url: `${SITE.url}/og-x3dprints.jpg` },
  },
  datePublished: "2024-12-01",
  mainEntityOfPage: pageUrl,
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",

  inLanguage: ["nl-BE", "en-BE"],
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
}

function PillarIcon({ type }: { type: "material" | "energy" | "loop" }) {
  if (type === "material") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden className="h-12 w-12 text-emerald-500">
        <rect x="6" y="8" width="36" height="32" rx="8" fill="currentColor" opacity={0.15} />
        <path
          d="M14 20h20M14 28h12M28 28h6M14 36h8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  if (type === "energy") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden className="h-12 w-12 text-cyan-500">
        <circle cx="24" cy="24" r="18" fill="currentColor" opacity={0.15} />
        <path
          d="M26 10l-8 14h9l-3 14 12-18h-8l4-10h-6z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 48 48" aria-hidden className="h-12 w-12 text-violet-500">
      <circle cx="24" cy="24" r="18" fill="currentColor" opacity={0.15} />
      <path
        d="M15 24a9 9 0 0 0 18 0 9 9 0 0 0-9-9v9H15zM24 15a9 9 0 0 0-9 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function SustainabilityPage() {
  return (
    <main className="relative overflow-hidden px-4 pb-24 pt-16 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-100" />
        <div className="absolute -top-32 right-10 h-[28rem] w-[28rem] rounded-full bg-emerald-200/30 blur-[180px]" />
        <div className="absolute -bottom-32 left-0 h-[24rem] w-[24rem] rounded-full bg-cyan-200/30 blur-[160px]" />
      </div>

      <section className="mx-auto max-w-5xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">FuturePrint Lab</p>
        <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Duurzame 3D-printing in kleine, doordachte reeksen.
        </h1>
        <p className="mt-4 text-base text-slate-600 sm:text-lg">
          X3DPrints is een kleine 3D-printstudio in Herzele. Geen massaproductie, wel gerichte oplossingen met aandacht voor slim ontwerp,
          efficiënte materiaalkeuzes en lokale levering. Deze pagina bundelt hoe we daar in de praktijk mee omgaan.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <ShimmerButton href="/contact">Bespreek een project</ShimmerButton>
          <Link
            href="/materials"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
          >
            Ontdek materialen
          </Link>
        </div>
      </section>

      <section className="mx-auto mt-16 grid max-w-5xl gap-4 sm:grid-cols-2">
        {stats.map((stat) => (
          <GlassCard key={stat.label} className="p-6 text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{stat.value}</p>
            <p className="mt-1 text-sm text-slate-600">{stat.detail}</p>
          </GlassCard>
        ))}
      </section>

      <section className="mx-auto mt-16 max-w-5xl">
        <div className="grid gap-6 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <GlassCard key={pillar.title} className="flex h-full flex-col p-6">
              <PillarIcon type={pillar.icon} />
              <h2 className="mt-4 text-xl font-semibold text-slate-900">{pillar.title}</h2>
              <p className="mt-2 flex-1 text-sm text-slate-600">{pillar.copy}</p>
              <div className="mt-4 space-y-1 text-sm">
                {pillar.links.map((link) =>
                  link.external ? (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-800"
                    >
                      {link.label} <span aria-hidden>↗</span>
                    </a>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-800"
                    >
                      {link.label} <span aria-hidden>→</span>
                    </Link>
                  ),
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-5xl rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-lg">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Lifecycle</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Van idee tot onderdeel dat lang meegaat</h2>
            <p className="mt-3 text-sm text-slate-600">
              Duurzaamheid zit voor ons in praktische keuzes: minder proefprints, een doordachte materiaalkeuze en onderdelen die passen bij hun echte gebruik.
            </p>
            <ul className="mt-6 space-y-4 text-sm text-slate-700">
              {roadmap.map((item) => (
                <li key={item.title} className="rounded-2xl border border-slate-200/70 bg-white/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{item.title}</p>
                  <p className="mt-1">{item.detail}</p>
                  <p className="mt-2 text-xs text-slate-500">{item.evidence}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <GlassCard className="p-5">
              <h3 className="text-lg font-semibold text-slate-900">Praktische keuzes in de werkplaats</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>• Jobs worden waar mogelijk per materiaal en kleur gebundeld om ombouwtijd te beperken.</li>
                <li>• Printinstellingen worden afgestemd op doel en levensduur, niet enkel op snelheid.</li>
                <li>• Verpakking blijft bewust eenvoudig zodat je geen dozen vol lucht ontvangt.</li>
                <li>• We denken mee over reserveonderdelen zodat je niet bij elk defect opnieuw moet ontwerpen.</li>
              </ul>
            </GlassCard>
            <GlassCard className="p-5">
              <h3 className="text-lg font-semibold text-slate-900">Voor wie is dit interessant?</h3>
              <p className="mt-2 text-sm text-slate-600">
                Deze aanpak is ideaal voor wie geen eigen 3D-printerpark wil uitbouwen, maar wel snel en gericht wil testen of kleine reeksen nodig heeft:
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>• Kmo’s die een prototype, jig of custom onderdeel zoeken.</li>
                <li>• Scholen en opleidingen die tastbaar lesmateriaal willen zonder overschot.</li>
                <li>• Verenigingen en events die beperkte, maar impactvolle aantallen nodig hebben.</li>
              </ul>
            </GlassCard>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-5xl rounded-3xl bg-slate-900 p-8 text-white shadow-xl">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">Voorbeeldcase</p>
            <h2 className="mt-3 text-2xl font-semibold">Kleine reeks voor een lokaal event</h2>
            <p className="mt-3 text-sm text-slate-200">
              Denk aan badges voor een vereniging, kleine props voor een beursstand of een reeks testonderdelen voor een schoolproject.
              Vaak is het belangrijker dat alles tijdig en degelijk klaar is, dan dat er meteen duizenden stuks geproduceerd worden.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              <li>• Eerst één testprint om vorm, leesbaarheid en formaat te controleren.</li>
              <li>• Daarna een kleine reeks, afgestemd op het event of project (bv. 8, 20 of 50 stuks).</li>
              <li>• Materiaal- en kleurkeuze in overleg, zodat het past bij branding of thema.</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white/5 p-6">
            <p className="text-sm font-semibold text-emerald-300">Wat je mag verwachten</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-200">
              <li>• Eerlijke feedback of iets zinvol is om te 3D-printen, of beter op een andere manier opgelost wordt.</li>
              <li>• Transparante prijsopbouw met een duidelijk onderscheid tussen ontwerp, testprint en productiereeks.</li>
              <li>• Realistische planning: samen bekijken wanneer je het materiaal nodig hebt en hoe we dat haalbaar inplannen.</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/contact">Start je project</ShimmerButton>
              <Link
                href="/segments/3d-printing-marketing"
                className="inline-flex items-center gap-2 text-sm text-emerald-300 hover:text-white"
              >
                3D printing voor marketing en events <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-4xl">
        <Faq title="FAQ over duurzaamheid" items={faqItems} />
      </section>

      <section className="mx-auto mt-16 max-w-5xl rounded-3xl border border-slate-200 bg-white/80 p-8 text-center shadow-md">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Samen vooruit</p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">Heb je een idee dat impact maakt?</h2>
        <p className="mt-3 text-sm text-slate-600">
          We denken graag mee over circulaire businesscases, projecten met onderwijs of gewoon een serie onderdelen die langer moet meegaan.
          Laat iets weten en we plannen een gesprek in.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <ShimmerButton href="/contact">Plan een gesprek</ShimmerButton>
          <Link
            href="/blog/3d-printen-in-de-buurt"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm hover:-translate-y-0.5"
          >
            Lees: 3D printen in de buurt
          </Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  )
}
