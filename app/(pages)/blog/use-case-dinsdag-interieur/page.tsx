import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"

const canonical = "https://www.x3dprints.be/blog/use-case-dinsdag-interieur"
const publishedDate = "2026-01-06T08:00:00+01:00"

export const metadata: Metadata = {
  title: "Use Case Dinsdag #7: 3D printen voor interieurdesign & decor",
  description:
    "Laat PLA Matte, Marble, Wood en Metal unieke interieuraccenten maken. Deze gids toont materialen, warmtegedrag, designprincipes en use cases.",
  alternates: { canonical },
  openGraph: {
    title: "Use Case Dinsdag #7: Interieurdesign 3D prints",
    description:
      "Voor interieurarchitecten en makers: hoe je sculpturen, wandpanelen en decor in kleine oplage produceert met PLA en PETG.",
    url: canonical,
    type: "article",
    publishedTime: publishedDate,
    authors: ["https://www.x3dprints.be"],
    tags: [
      "3D printen interieurdesign",
      "PLA Marble interieur",
      "PLA Wood decor",
      "Use Case Dinsdag",
    ],
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "3D geprint interieurdecor" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Use Case Dinsdag: Interieurdesign & decor",
    description:
      "Alles over PLA Matte, Marble, Wood en PETG voor sculpturen, wandpanelen en retail props in kleine oplage.",
    images: ["/images/og-home.jpg"],
  },
}

const heroStats = [
  { label: "Favoriete textuur", value: "PLA Marble", detail: "Steenlook zonder gewicht" },
  { label: "Warmteproof", value: "PETG", detail: "Lampen & ophangpunten" },
  { label: "Serie-omvang", value: "1-200 stuks", detail: "Perfect voor decorcollecties" },
]

const differencePoints = [
  {
    title: "Custom decor in kleine oplage",
    detail: "Vazen, sculpturen, wandpanelen of centerpieces. FDM levert 1 tot 50 stuks zonder mallen of dure tooling.",
  },
  {
    title: "Organische vormen en patronen",
    detail: "Parametrische figuren en zachte curves zijn goedkoper te printen dan te frezen of te gieten.",
  },
  {
    title: "Lichtgewicht en veilig",
    detail: "PLA geprint decor is ideaal voor wanden of displays die niet zwaar mogen zijn maar er wel luxe uitzien.",
  },
  {
    title: "Snelle mock-ups",
    detail: "Binnen uren staat er een schaalmodel op tafel voor klanten of leveranciers.",
  },
]

const materials = [
  {
    name: "PLA Matte",
    detail: "Minimalistisch, zacht in foto en video, enorm kleurvast. Ideaal voor premium objects.",
    link: { label: "Lees PLA Matte blog", href: "/blog/filament-vrijdag-pla" },
  },
  {
    name: "PLA Marble",
    detail: "Steenachtige look zonder gewicht. Perfect voor sculpturen, bustes en architecturale modellen.",
    link: { label: "Lees PLA Marble blog", href: "/blog/filament-vrijdag-pla-marble" },
  },
  {
    name: "PLA Wood",
    detail: "Warme houtachtige textuur, ideaal voor lampenkappen, kozijnaccenten en interieurdecor.",
    link: { label: "Lees PLA Wood blog", href: "/blog/filament-vrijdag-pla-wood" },
  },
  {
    name: "PLA Metal",
    detail: "Industrieel uitzicht zonder metaalprijs. Werkt goed voor moderne, minimalistische stukken.",
    link: { label: "Lees PLA Metal blog", href: "/blog/filament-vrijdag-pla-metal" },
  },
  {
    name: "PETG",
    detail: "Gebruik wanneer onderdelen warmte of druk moeten verdragen (lampen, montageclips, plantenhouders).",
    link: { label: "Lees PETG blog", href: "/blog/filament-vrijdag-petg" },
  },
]

const warmthPoints = [
  { location: "Spotlights", temp: "45-55 degC", advice: "Gebruik PLA op afstand, PETG vlakbij spots of als kern." },
  { location: "Radiatoren / convectors", temp: "40-50 degC", advice: "PETG voor montages, PLA voor covers op afstand." },
  {
    location: "Vitrines met LED strips",
    temp: "Tot 60 degC",
    advice: "PLA Marble blijft mooi maar gebruik PETG voor houders binnen de vitrine.",
  },
  {
    location: "Zuidgerichte kamers",
    temp: "Schommelingen + UV",
    advice: "PLA is prima als het niet in direct zonlicht staat; PETG voor raamkader-gebonden decor.",
  },
]

const designWorkflow = [
  "Seam placement: we oriAnteren sculpturen zodat naden op onzichtbare achterzijdes vallen.",
  "Holle structuren: 2.0-2.4 mm wanden met 5-10 procent infill houden objecten licht en stabiel.",
  "Segmentatie: XL vazen en panelen worden gesplitst met dovetails en alignment pins voor onzichtbare assemblage.",
  "Wanddiktes: PLA Matte 1.6-2 mm, PLA Marble/Wood 2.0-2.4 mm voor transportbestendigheid.",
  "Kleurconsistentie: prints komen uit dezelfde batch filament om series visueel identiek te houden.",
]

const interiorExamples = [
  { title: "Wanddecor en 3D panel accents", detail: "Parametrische patronen, signature walls, modulaire panel sets." },
  { title: "Centerpieces en sculpturale objecten", detail: "PLA Marble voor galerie-look, PLA Silk+ voor glossy luxe." },
  { title: "Lampenkappen en diffusers", detail: "PLA voor diffusers, PETG voor onderdelen dichtbij lampwarmte." },
  { title: "Schaalmodellen voor architecten", detail: "Vlotte iteraties voor residentiAle of retailpresentaties." },
  { title: "Retail props voor seizoenscampagnes", detail: "Visueel sterke decorstukken zonder massaproductiebudget." },
]

const limitations = [
  "Niet voor load-bearing meubels of massieve vloerelementen.",
  "Geen gigantische monolieten zonder segmentatie.",
  "Geen automotive-gloss afwerking zonder Finishing Friday traject.",
  "Geen langdurige buiteninstallaties met extreme UV-hitte (dan kies je andere technologie).",
]

const costDrivers = [
  { title: "Printtijd", detail: "Complexe organische vormen vergen meer machine-uren." },
  { title: "Materiaaltype", detail: "Special blends (Marble, Wood, Metal) printen iets trager dan PLA Matte." },
  { title: "Aantal iteraties", detail: "Prototypes tellen als investering: elke revisie perfectioneert het eindresultaat." },
  { title: "Segmentatie en montage", detail: "Dovetails, inserts en lijmvlakken vragen extra engineering maar verlagen transportkosten." },
]

const whenToUse = [
  {
    title: "Kies 3D printen wanneer je",
    bullets: [
      "Snel prototypes wil tonen aan klanten.",
      "Sculpturale vormen zoekt zonder dure mal.",
      "Lichtgewicht objecten nodig hebt voor veiligheid.",
      "Unieke texturen wil zonder lakwerk (Marble, Wood, Metal).",
      "Meerdere varianten wilt testen in de ontwerpfase.",
    ],
  },
  {
    title: "Laat 3D printen links liggen wanneer je",
    bullets: [
      "IndustriAle sterkte of massieve panelen nodig hebt.",
      "Objecten direct onder hittebronnen wilt plaatsen.",
      "Automotive paint verwacht zonder finishing budget.",
    ],
  },
]

const ctaLinks = [
  { label: "Materialenbibliotheek", href: "/materials" },
  { label: "PLA Matte gids", href: "/blog/filament-vrijdag-pla" },
  { label: "PLA Marble gids", href: "/blog/filament-vrijdag-pla-marble" },
  { label: "PLA Wood gids", href: "/blog/filament-vrijdag-pla-wood" },
  { label: "PLA Metal gids", href: "/blog/filament-vrijdag-pla-metal" },
  { label: "Pricing & offerte", href: "/pricing" },
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Use Case Dinsdag #7: 3D printen voor interieurdesign en decor",
  description:
    "Gids voor PLA Matte, Marble, Wood, Metal en PETG in interieurprojecten. Inclusief warmtegedrag, designprincipes en kosten.",
  datePublished: publishedDate,
  dateModified: publishedDate,
  author: {
    "@type": "Organization",
    name: "X3DPrints",
    url: "https://www.x3dprints.be",
  },
  publisher: {
    "@type": "Organization",
    name: "X3DPrints",
    url: "https://www.x3dprints.be",
    logo: {
      "@type": "ImageObject",
      url: "https://www.x3dprints.be/images/og-home.jpg",
    },
  },
  mainEntityOfPage: canonical,
  url: canonical,
  image: "https://www.x3dprints.be/images/og-home.jpg",
}

function SectionDivider() {
  return (
    <div className="mx-auto my-12 flex w-full max-w-4xl items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-500">
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-indigo-300/0 via-indigo-300/60 to-indigo-300/0" />
      <span>Use Case Dinsdag</span>
      <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-indigo-300/0 via-indigo-300/60 to-indigo-300/0" />
    </div>
  )
}

export default function UseCaseDinsdagInterieurPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(180%_90%_at_50%_-20%,rgba(59,130,246,0.14),transparent_75%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.08]" />

      <section className="px-6 pb-12 pt-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal className="stacked-content">
            <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
              <ol className="flex flex-wrap gap-2">
                <li>
                  <Link
                    href="/blog"
                    className="font-medium text-indigo-600 transition hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Blog
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-700">Use Case Dinsdag</li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-900">Interieur & decor</li>
              </ol>
            </nav>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Use Case Dinsdag #7</p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              3D printen voor interieurdesign en decor: unieke vormen zonder klassieke beperkingen.
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Interieurdesigners willen flexibiliteit, custom shapes, lichtgewicht materialen en snelle iteraties. FDM geeft hen
              die toolbox in kleine oplage, met steenlook, houttextuur of matte luxe zonder traditionele productiekost.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/contactetopic=use-case-interieur">Vraag interieur-advies</ShimmerButton>
              <Link
                href="/segments/3d-printing-marketing"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Segment marketing & decor
              </Link>
              <Link
                href="/materials"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                Materialenoverzicht
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">Gepubliceerd op 6 januari 2026 - Use Case Dinsdag.</p>
          </Reveal>
          <div className="mt-10 grid gap-4 rounded-3xl border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{stat.label}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-600">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          {differencePoints.map((point) => (
            <Reveal key={point.title}>
              <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
                <h2 className="text-2xl font-semibold text-slate-900">{point.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{point.detail}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">2. Materialen voor interieurprojecten</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {materials.map((material) => (
                  <div key={material.name} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <p className="text-sm font-semibold text-slate-900">{material.name}</p>
                    <p className="mt-2 text-sm text-slate-600">{material.detail}</p>
                    <Link
                      href={material.link.href}
                      className="mt-3 inline-flex items-center text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
                    >
                      {material.link.label}
                      <span aria-hidden className="ml-2">-&gt;</span>
                    </Link>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">3. Warmtegedrag in interieurs</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {warmthPoints.map((point) => (
                  <div key={point.location} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <p className="text-sm font-semibold text-slate-900">{point.location}</p>
                    <p className="mt-2 text-sm text-slate-600">
                      Temperatuur: <span className="font-semibold">{point.temp}</span>
                    </p>
                    <p className="text-sm text-slate-600">{point.advice}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Zie{" "}
                <Link
                  href="https://wiki.bambulab.com/en/materials"
                  className="font-semibold text-indigo-600 transition hover:text-indigo-500"
                >
                  Bambu Lab materiaalgedrag
                </Link>{" "}
                voor temperatuurreferenties.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">4. Studio workflow voor interieurprints</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {designWorkflow.map((item) => (
                  <li key={item} className="rounded-2xl border border-slate-100 bg-white/70 p-3">
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          {interiorExamples.map((example) => (
            <Reveal key={example.title}>
              <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
                <h2 className="text-2xl font-semibold text-slate-900">{example.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{example.detail}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">5. Wat 3D printen niet vervangt</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                {limitations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-600">
                Lees{" "}
                <Link
                  href="/blog/finishing-friday-schuren-primen-lakken"
                  className="font-semibold text-indigo-600 transition hover:text-indigo-500"
                >
                  Finishing Friday
                </Link>{" "}
                voor lak- en finishinginformatie.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">6. Kost en doorlooptijd</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {costDrivers.map((driver) => (
                  <div key={driver.title} className="rounded-2xl border border-slate-100 bg-white/70 p-4">
                    <p className="text-sm font-semibold text-slate-900">{driver.title}</p>
                    <p className="mt-2 text-sm text-slate-600">{driver.detail}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Raadpleeg{" "}
                <Link href="/pricing" className="font-semibold text-indigo-600 transition hover:text-indigo-500">
                  pricing
                </Link>{" "}
                voor interieurseries en prototypes.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
          {whenToUse.map((block) => (
            <Reveal key={block.title}>
              <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
                <h2 className="text-2xl font-semibold text-slate-900">{block.title}</h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
                  {block.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">7. Conclusie: toolbox voor interieurdesign</h2>
              <p className="text-sm text-slate-600">
                PLA Matte, Marble, Wood en Metal vormen een materiaalbibliotheek die klassieke interieurbouw aanvult. Combineer ze
                met PETG voor warme zones en gebruik prototypes als overlegtool met klanten en leveranciers.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <GlassCard className="flex flex-col gap-6 border border-white/40 bg-white/85 p-6 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Volgende stap</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">
                  Wil je een sculptuur, wandobject of decoratief design laten printen?
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Upload STL/STEP of vraag advies. We stemmen materiaal, textuur en planning af op jouw project of collectie.
                </p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-indigo-600">
                  {ctaLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="transition hover:text-indigo-500">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/contact?topic=use-case-interieur">Start intake</ShimmerButton>
                <Link href="/viewer" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  Upload via viewer
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    </main>
  )
}

