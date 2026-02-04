import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import GlassCard from "@/components/GlassCard"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/blog/3d-geprinte-platen-nasiam"

export const metadata: Metadata = {
  title: "NaSiam x X3DPrints: 3D-geprinte platen met QR | Blog",
  description:
    "Ontdek hoe we voor NaSiam, een Thaise massagepraktijk in Sint-Job-in-'t-Goor, twee herbruikbare platen met logo en QR maakten voor events en het salon. Materiaalkeuze, montage en lokale zichtbaarheid.",
  alternates: { canonical },
  openGraph: {
    title: "NaSiam x X3DPrints: 3D-geprinte platen met QR",
    description:
      "Case study: twee stevige, herbruikbare platen met logo en QR-code voor NaSiam, een salon voor Thaise massage in Sint-Job-in-'t-Goor nabij Antwerpen. Inclusief materiaalkeuzes en montageadvies.",
  url: canonical,
    images: [
      {
        url: "/images/3d-geprinte-platen.webp",
        width: 1200,
        height: 630,
        alt: "3D-geprinte platen met QR-code voor NaSiam",
      },
    ],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "NaSiam x X3DPrints: 3D-geprinte platen met QR",
    description:
      "Case: herbruikbare platen met QR-code voor massagesalon NaSiam in Sint-Job-in-'t-Goor, inzetbaar op events en in het salon.",
    images: ["/images/3d-geprinte-platen.webp"],
  },
}


const highlights = [
  "Twee platen met custom NaSiam-logo, één voor events en één voor in het salon.",
  "Ingebouwde QR-code die naar NaSiam.be leidt voor afspraken en info.",
  "Stevige PLA Matte basis met verzonken logo-inleg en goede leesbaarheid vanaf afstand.",
  "Afmetingen afgestemd op tafels en modulaire standen, makkelijk te verplaatsen.",
]

const buildSteps = [
  {
  title: "Briefing vanuit het salon",
  detail:
    "NaSiam wilde herbruikbare dragers die zowel in het salon (Brugstraat 19, 2960 Sint-Job) als op events konden staan. De vraag: hoe leiden we mensen op een rustige, niet-opdringerige manier naar de juiste info en online afspraken? Belangrijk waren een duidelijke QR naar de website, een warme uitstraling die bij Thaise massage past en een vlakke achterkant om de platen eenvoudig op standaard houders te plaatsen.",
},

  {
    title: "Materiaal- en kleurkeuze",
    detail:
      "We kozen PLA Matte voor de basis omdat het weinig reflectie heeft onder eventverlichting en toch stevig is. Het logo en QR werden in een contrasterende kleur geprint en verzonken, zodat de code niet slijt en makkelijk scanbaar blijft.",
  },
  {
    title: "Montage en afwerking",
    detail:
      "De platen kregen afgeronde hoeken en subtiele chamfers om comfortabel te hanteren. Op de achterkant voorzien we vlakke zones voor klittenband of 3M-tape zodat NaSiam ze kan bevestigen op balies, banners of modulaire panelen zonder extra tools.",
  },
]

const reuseIdeas = [
  "Gebruik dezelfde plaat als handzame CTA tijdens beurzen of wellness-events; de QR linkt rechtstreeks naar de online agenda.",
  "Zet de plate in het salon naast de balie of wachtruimte zodat bezoekers meteen kunnen scannen voor promo’s of cadeaubonnen.",
  "Combineer met het segment marketing & events voor extra props of awards die bij de huisstijl passen.",
  "Koppel de QR aan de Antwerpse landingspagina als je een campagne in de provincie draait, bijvoorbeeld vanuit Sint-Job richting Antwerpen.",
]

const faq = [
  {
    q: "Waarom PLA Matte voor deze platen?",
a: "PLA Matte geeft weinig schittering onder spotlights en is tegelijkertijd stijf genoeg voor herhaald gebruik. De textuur helpt de QR-code leesbaar te houden en voelt premium aan in een setting zoals het NaSiam massagesalon, waar rust en kwaliteit centraal staan.",
  },
  {
    q: "Hoe bevestig je de platen zonder beschadigingen?",
    a: "We hebben vlakke zones voorzien zodat je klittenband of verwijderbare 3M-tape kunt gebruiken. Zo blijft het oppervlak netjes en kun je de dragers snel wisselen tussen events en het salon.",
  },
  {
    q: "Kunnen we dezelfde aanpak gebruiken voor andere marketingprops?",
    a: "Zeker. Het marketingartikel over 3D printing voor events toont hoe we props, awards en QR-integraties schaalbaar maken. Je kunt ook vanuit het segment marketing & events vertrekken om extra ideeën te verzamelen.",
  },
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",

  inLanguage: ["nl-BE", "en-BE"],
  headline: "NaSiam x X3DPrints: 3D-geprinte platen met QR",
  description:
    "Case study over twee herbruikbare 3D-geprinte platen met logo en QR-code voor NaSiam in Sint-Job, inclusief materiaalkeuzes en montageadvies.",
  author: {
    "@type": "Person",
    name: "X3DPrints",
  },
  publisher: {
    "@type": "Organization",
    name: "X3DPrints",
    logo: {
      "@type": "ImageObject",
      url: "https://www.x3dprints.be/images/brand-logo.png",
    },
  },
  mainEntityOfPage: canonical,
  datePublished: "2025-01-15",
}

export default function NaSiamArticlePage() {
  return (
    <article className="relative overflow-hidden px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-rose-50" />
        <div className="absolute -left-10 top-[-10%] h-[22rem] w-[22rem] rounded-full bg-amber-200/50 blur-[140px]" />
        <div className="absolute -right-16 bottom-[-15%] h-[26rem] w-[26rem] rounded-full bg-rose-200/40 blur-[160px]" />
      </div>

      <header className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Blog</p>
        <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          NaSiam x X3DPrints: 3D-geprinte platen met QR-code
        </h1>
        <p className="mt-4 text-base text-slate-600">
  Voor massagesalon NaSiam in Sint-Job-in-&apos;t-Goor maakten we twee herbruikbare platen met hun logo en QR-code. 
  NaSiam is een kleinschalige, professionele praktijk voor Thaise massage waar welzijn en persoonlijke aandacht centraal staan. 
  De platen worden gebruikt in het salon aan Brugstraat 19 én op events, zodat bezoekers meteen naar{" "}
  <Link
    href="https://www.nasiam.be"
    target="_blank"
    rel="noopener noreferrer"
    className="font-semibold text-amber-700 underline underline-offset-4"
  >
    NaSiam.be
  </Link>{" "}
  kunnen doorklikken voor info en afspraken. In deze case lees je hoe we dat aanpakten en welke materialen het verschil maken.
</p>


        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
  <ShimmerButton href="/contact?material=PLA%20Matte">Vraag een gelijkaardig project aan</ShimmerButton>
  <Link
    href="/blog/3d-printing-marketing-events"
    className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm"
  >
    Lees marketing & events artikel
  </Link>
  <Link
    href="/segments/3d-printing-marketing"
    className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm"
  >
    Segment marketing & events
  </Link>
  <Link
    href="https://www.nasiam.be"
    target="_blank"
    rel="noopener noreferrer"
    className="rounded-full border border-amber-300/70 bg-white/90 px-4 py-2 font-semibold text-amber-800 shadow-sm hover:-translate-y-0.5 hover:bg-white transition"
  >
    Bezoek NaSiam.be
  </Link>
</div>

      </header>

      <Reveal className="mx-auto mt-12 max-w-5xl space-y-6">
        <GlassCard className="p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Waarom deze platen werken</h2>
              <p className="mt-3 text-sm text-slate-600">
  NaSiam wilde iets tastbaars dat dezelfde rust en warmte uitstraalt als hun Thaise massages. 
  Een bezoek aan het salon start altijd met een warm welkom en een gesprek over klachten en doelen; de communicatiedragers moesten diezelfde zorgvuldigheid tonen. 
  Met een ingewerkte QR-code, een matte afwerking en duidelijke branding krijgt de QR een hoge scanbaarheid in wisselende lichtomstandigheden, terwijl de platen licht genoeg blijven voor events en stevig genoeg zijn voor dagelijks gebruik in het salon.
</p>

              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow-lg">
              <Image
                src="/images/3d-geprinte-platen.webp"
                alt="3D-geprinte NaSiam platen met logo en QR-code"
                width={960}
                height={720}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Van briefing tot afgewerkte QR-plaat</h2>
          <div className="mt-4 space-y-3">
            {buildSteps.map((step, index) => (
              <div key={step.title} className="rounded-3xl border border-slate-200/70 bg-white/70 p-4 text-sm text-slate-600">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Stap {index + 1}: {step.title}</p>
                <p className="mt-1 text-slate-700">{step.detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Tip: combineer matte basismaterialen met contrasterende inlegkleuren voor optimale QR-contrast en langere levensduur.
          </p>
        </GlassCard>

        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Hoe NaSiam de platen inzet</h2>
          <p className="mt-3 text-sm text-slate-600">
  De dragers wisselen vlot tussen het salon en events. Bij wellnessbeurzen en lokale acties staat de QR centraal op de stand; 
  in Sint-Job krijgt hij een zichtbare maar rustige plek aan de balie, zodat bezoekers na hun massage of bij het maken van een nieuwe afspraak meteen kunnen scannen. 
  De QR linkt naar{" "}
  <Link
    href="https://www.nasiam.be"
    target="_blank"
    rel="noopener noreferrer"
    className="font-semibold text-amber-700 underline underline-offset-4"
  >
    NaSiam.be
  </Link>{" "}
  waar mensen meer lezen over de verschillende vormen van Thaise massage, therapeutische behandelingen en cadeaubonnen. 
  Door dezelfde QR te koppelen aan een campagne-URL kun je bovendien meten hoeveel scans uit de Antwerpse regio komen.
</p>

          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {reuseIdeas.map((idea) => (
              <li key={idea} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-500" aria-hidden />
                <span>{idea}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link
              href="/3d-printen-in-antwerpen"
              className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm"
            >
              Bekijk landing Antwerpen
            </Link>
            <Link
              href="/blog/3d-printing-marketing-events"
              className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm"
            >
              Marketing & events tips
            </Link>
          </div>
        </GlassCard>

                <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Over NaSiam: Thaise massage in Sint-Job-in-&apos;t-Goor</h2>
          <p className="mt-3 text-sm text-slate-600">
            NaSiam is een kleinschalige, professionele praktijk voor Thaise massage in Sint-Job-in-&#39;t-Goor, op korte afstand van Antwerpen. 
            In een rustige, schone omgeving neemt Nalita de tijd om te luisteren naar jouw klachten en doelen. 
            Elke sessie start met een korte intake, zodat druk, tempo en technieken afgestemd worden op wat jouw lichaam nodig heeft.
          </p>
          <p className="mt-3 text-sm text-slate-600">
            De focus ligt op welzijn: beter slapen, vrijer bewegen en structureel minder stress ervaren. 
            Afhankelijk van je noden kan een behandeling bestaan uit traditionele Thaise massage met strekkingen en drukpunten, 
            therapeutische Thaise massage met extra aandacht voor rug, nek en schouders, of een combinatie met deep tissue en aromatherapie als de spanning dieper zit.
          </p>
          <p className="mt-3 text-sm text-slate-600">
            Als massagepraktijk in Sint-Job helpt NaSiam zowel mensen uit de buurt als bezoekers uit de regio Antwerpen die bewust willen investeren in herstel en ontspanning. 
            De 3D-geprinte platen zorgen ervoor dat nieuwe en bestaande klanten op een rustige manier hun weg vinden naar meer info en het online afsprakenplatform.
          </p>
          <div className="mt-5">
            <Link
              href="https://www.nasiam.be"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-amber-300/70 bg-white/90 px-4 py-2 text-sm font-semibold text-amber-800 shadow-sm hover:-translate-y-0.5 hover:bg-white transition"
            >
              Ga naar NaSiam.be
            </Link>
          </div>
        </GlassCard>


        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Veelgestelde vragen</h2>
          <div className="mt-4 space-y-3">
            {faq.map((item) => (
              <div key={item.q} className="rounded-3xl border border-slate-200/70 bg-white/70 p-4 text-sm text-slate-600">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.q}</p>
                <p className="mt-1 text-slate-700">{item.a}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6 sm:p-8 text-center">
          <h2 className="text-xl font-semibold text-slate-900">Wil je ook zo’n herkenbare plaat?</h2>
          <p className="mt-3 text-sm text-slate-600">
            Laat je logo, QR-code of campagnevisual integreren in een stevige print die jaren meegaat. We stemmen formaat en afwerking af op je eventschema én de setting in je zaak.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
            <ShimmerButton href="/contact?material=PLA%20Matte">Plan een offertecall</ShimmerButton>
            <Link
              href="/portfolio"
              className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm"
            >
              Bekijk meer cases
            </Link>
            <Link
              href="/segments/3d-printing-marketing"
              className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm"
            >
              Marketing segment
            </Link>
          </div>
        </GlassCard>
      </Reveal>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <BlogReadMore />

    </article>
  )
}




