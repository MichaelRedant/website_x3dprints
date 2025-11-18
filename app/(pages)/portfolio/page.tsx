import type { Metadata } from "next"
import Link from "next/link"
import AutoCarousel from "@/components/AutoCarousel"
import GlassCard from "@/components/GlassCard"
import GlassOrb from "@/components/GlassOrb"
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import { readdirSync } from "node:fs"
import path from "node:path"

export const metadata: Metadata = {
  title: "3D print portfolio & case studies | X3DPrints",
  description:
    "Bekijk real-life 3D print projecten: functionele onderdelen, merchandising en gifts geproduceerd in Herzele (Gent).",
  alternates: { canonical: "https://www.x3dprints.be/portfolio" },
  openGraph: {
    title: "3D print portfolio & case studies | X3DPrints",
    description:
      "Fotoreeksen en timelapses van maatwerk 3D prints: prototypes, merchandising en gepersonaliseerde cadeaus uit het atelier in Herzele.",
    url: "https://www.x3dprints.be/portfolio",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "X3DPrints portfolio" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D print portfolio & case studies | X3DPrints",
    description:
      "Functionele prototypes, merchandising en gifts: ontdek hoe X3DPrints projecten oplevert voor mkb, events en designers.",
    images: ["/images/og-home.jpg"],
  },
}

const portfolioDir = path.join(process.cwd(), "public/images/portfolio")
const portfolioUrl = "https://www.x3dprints.be/portfolio"

const toTitleCase = (value: string) =>
  value
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")

const photos = readdirSync(portfolioDir)
  .filter((f) => /\.(?:png|jpe?g|webp)$/i.test(f))
  .sort((a, b) => a.localeCompare(b))
  .map((file, index) => {
    const baseLabel = file
      .replace(/\.[^.]+$/, "")
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
    const cleaned = baseLabel
      .replace(/^(afbeelding|image|img|foto)\s*/i, "")
      .replace(/^\d+$/, "")
      .trim()
    const label = toTitleCase(cleaned || `maatwerk print ${index + 1}`)
    const alt = `${label} 3D print`
    const info = `Portfolio beeld ${index + 1}: ${label} geproduceerd door X3DPrints in Herzele.`
    return {
      src: `/images/portfolio/${encodeURIComponent(file)}`,
      alt,
      info,
    }
  })

const stats = [
  { label: "Projecten per jaar", value: "50+ cases" },
  { label: "Materialen", value: "PLA / PETG / TPU / specials" },
  { label: "Bouwvolume", value: "Tot 256 x 256 x 256 mm" },
  { label: "Doorlooptijd", value: "Enkele werkdagen (samen ingepland)" },
]

const focusAreas = [
  {
    title: "Functioneel maatwerk",
    description:
      "Houders, adapters en productietools die dagelijks gebruik doorstaan en naadloos aansluiten op bestaande onderdelen.",
  },
  {
    title: "Gepersonaliseerde items",
    description: "Bedrijfs- en eventgifts, awards en interieurstukken met naam, logo of custom lettering.",
  },
  {
    title: "Seriewerk & prototypes",
    description: "Van het eerste teststuk tot short-run productie met gecontroleerde toleranties en kleurafspraak.",
  },
]

const videos = [
  {
    id: "pEVjhj8Esmo",
    title: "Articulated octopus voor Octopus.be",
    description: "Flexibele octopus voor Octopus.be, direct uit de printer beweegbaar.",
  },
  {
    id: "B-DnVHPTVJE",
    title: "Oorring houder voor Choice Juwelen",
    description: "Eigen ontwerp van een 3D-geprinte houder voor oorbellen.",
  },
  {
    id: "O9MYk5Mgytc",
    title: "Tesla kofferhaak in PETG",
    description: "Stevige haak voor in de Tesla-koffer, geprint in PETG.",
  },
  {
    id: "rRcWkRGwbTo",
    title: "Gepersonaliseerde grafstekker",
    description: "Custom 3D-geprinte grafstekker ontworpen voor een kinderherdenking.",
  },
  {
    id: "o9zBbvayF-4",
    title: "Cartoon figure met naam display",
    description: "Cartoon-personage met gepersonaliseerd naamdisplay uit de 3D-printer.",
  },
  { id: "tVDwEw3Od-8", title: "3D geprinte fleshouder", description: "Praktische fleshouder, laag per laag opgebouwd in PLA." },
  { id: "-CWmBhP_OO0", title: "Wireless mesh houder", description: "Compacte houder voor een draadloze mesh-node met strakke passtukken." },
  { id: "KlYc5fyDMLU", title: "Baby cadeau letter", description: "Persoonlijk kraamcadeau in de vorm van een initiaal." },
  { id: "EomHXEwzXMY", title: "Articulated octopus", description: "Flexibele octopus die direct uit de printer beweegt." },
  { id: "IHAq-qheqpY", title: "Transparante kerstboom", description: "Heldere kerstboom als feestelijke decoratie." },
  { id: "o2TNLro97X4", title: "TPU Samsung S24 Ultra case", description: "Schokbestendige smartphonehoes geprint in TPU." },
  { id: "IMxoScXrRPw", title: "Pray sculpture", description: "Meditatieve sculptuur met fijne details." },
  { id: "RmoQwgCUOcY", title: "Articulated kerstboom", description: "Speelse kerstboom met scharnierende takken." },
  { id: "5R9mFNdQEew", title: "Gehaakte kom", description: "3D-geprinte basis voor een gehaakte kom." },
  { id: "2SWpnls132g", title: "Meditatie sculpture", description: "Rustgevende figuur voor een stille meditatiehoek." },
  { id: "DPUI88Nj9QU", title: "Gepersonaliseerde winkelkar coins", description: "Bedrukte winkelwagenmuntjes als bedrijfsgadget." },
  { id: "B0nTIBoHho0", title: "Baby boy gift", description: "Cadeau voor een pasgeboren jongen, op maat geprint." },
  { id: "0SQdnzZa034", title: "Gehaakte ballonhond", description: "Skelet voor een gehaakte ballonhond." },
  { id: "QtUTEn1gaRw", title: "Zombie hand &lsquo;Thing&rsquo;", description: "Halloweenprop geïnspireerd op &lsquo;Thing&rsquo; uit Wednesday." },
  { id: "ek525KTB6rM", title: "QR code met standaard", description: "Staande QR-code voor promoties of menukaarten." },
  { id: "4aZpwYity2w", title: "Zen sculpture", description: "Minimalistische sculptuur voor een rustige sfeer." },
  { id: "Bo0jpv9hnyg", title: "Fidget studs", description: "Klikbare fidget-studs als speels bureauaccessoire." },
  { id: "vOviHFKnqU0", title: "Articulated pompoen", description: "Scharnierende pompoen voor Halloween." },
]

const newVideoIds = new Set([
  "pEVjhj8Esmo",
  "B-DnVHPTVJE",
  "O9MYk5Mgytc",
  "rRcWkRGwbTo",
  "o9zBbvayF-4",
])

const organizationSchema = {
  "@type": "Organization",
  name: "X3DPrints",
  url: "https://www.x3dprints.be",
  logo: {
    "@type": "ImageObject",
    url: "https://www.x3dprints.be/Logo.webp",
  },
}

const imageObjects = photos.map((p, index) => {
  const absoluteUrl = `https://www.x3dprints.be${p.src}`
  return {
    "@type": "ImageObject",
    "@id": `${portfolioUrl}#image-${index + 1}`,
    contentUrl: absoluteUrl,
    url: absoluteUrl,
    caption: p.alt,
    description: p.info,
    inLanguage: "nl-BE",
    creditText: "X3DPrints",
    creator: organizationSchema,
    copyrightHolder: organizationSchema,
    representativeOfPage: index === 0,
  }
})

const imageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "X3DPrints portfolio fotogalerij",
  description: "Fotoreeks van maatwerk 3D prints, merchandising en prototypes geproduceerd in Herzele.",
  url: portfolioUrl,
  publisher: organizationSchema,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: imageObjects.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item,
    })),
  },
}

const videoJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "X3DPrints portfolio",
  publisher: organizationSchema,
  hasPart: videos.map((v) => ({
    "@type": "VideoObject",
    name: v.title,
    description: v.description,
    thumbnailUrl: `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`,
    embedUrl: `https://www.youtube.com/watch?v=${v.id}`,
  })),
}

export default function Page() {
  return (
    <main className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(56,189,248,0.25),transparent_60%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.12]" />

      <section className="relative px-6 pb-24 pt-20 sm:px-8 lg:px-12">
        <div className="absolute -left-16 top-12 -z-10 hidden md:block">
          <GlassOrb className="h-72 w-72 opacity-35" />
        </div>
        <div className="absolute -right-12 -bottom-20 -z-10 hidden lg:block">
          <GlassOrb className="h-80 w-80 opacity-25" />
        </div>
        <div className="mx-auto max-w-6xl">
          <div className="grid items-start gap-12 lg:grid-cols-[1.2fr_.8fr]">
            <Reveal className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/60 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Portfolio & reviews
              </span>
              <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                3D print portfolio met functionele onderdelen en branded gifts.
              </h1>
              <p className="mt-4 text-pretty text-lg text-slate-700">
                Van articulated octopus tot custom winkelmateriaal: elk project combineert functionele eisen met een strakke afwerking.
                Bekijk hoe we prototypes, seriewerk en gepersonaliseerde cadeaus afleveren vanuit het atelier in Herzele (regio Gent).
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ShimmerButton href="/contact">Offerte aanvragen</ShimmerButton>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/60 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition-transform hover:-translate-y-0.5 hover:bg-white"
                >
                  Bekijk diensten
                </Link>
                <Link
                  href="/materials"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/50 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition-transform hover:-translate-y-0.5 hover:bg-white"
                >
                  Materialen & richtlijnen
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/50 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Prijsindicaties
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.15} className="grid gap-4">
              <GlassCard className="overflow-hidden border border-white/50 bg-white/70 p-6 shadow-lg backdrop-blur">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Nieuw in de kijker</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Vijf recente projecten die de veelzijdigheid van 3D-printing tonen.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {videos.slice(0, 5).map((video) => (
                    <li key={video.id} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" aria-hidden />
                      <span>{video.title}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
              <GlassCard className="border border-white/50 bg-white/70 p-6 shadow-lg backdrop-blur">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Waar we op focussen</h2>
                <div className="mt-4 grid gap-3">
                  {focusAreas.map((item) => (
                    <div key={item.title}>
                      <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                      <p className="text-sm text-slate-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <GlassCard
                key={stat.label}
                className="border border-white/50 bg-white/70 px-6 py-5 text-center shadow-md backdrop-blur transition-transform hover:-translate-y-1"
              >
                <div className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">{stat.label}</div>
                <div className="mt-2 text-2xl font-semibold text-slate-900">{stat.value}</div>
              </GlassCard>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Welke projecten zie je in deze 3D print portfolio?
            </h2>
            <p className="text-base text-slate-600">
              De galerij bundelt maatwerk voor mkb, retail en agencies: merchandising, interieurstukken, technische prototypes en TPU beschermers.
              Elk project wordt geprint in huis zodat kwaliteit, kleurmatch en levertijd controleerbaar blijven.
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
              <li>
                <Link className="font-semibold text-slate-900 underline decoration-slate-300 hover:decoration-slate-600" href="/services">
                  Services
                </Link>{" "}
                voor serieproductie, nabewerking en montage.
              </li>
              <li>
                <Link className="font-semibold text-slate-900 underline decoration-slate-300 hover:decoration-slate-600" href="/materials">
                  Materialen
                </Link>{" "}
                zoals PLA Tough, PETG en TPU om juiste eigenschappen te kiezen.
              </li>
              <li>
                <Link className="font-semibold text-slate-900 underline decoration-slate-300 hover:decoration-slate-600" href="/blog">
                  Blog & kennisbank
                </Link>{" "}
                met artikels over kostprijs, materiaalkeuze en Bambu X1C instellingen.
              </li>
              <li>
                <Link className="font-semibold text-slate-900 underline decoration-slate-300 hover:decoration-slate-600" href="/pricing">
                  Prijsindicaties
                </Link>{" "}
                voor richtprijzen per materiaal en volume.
              </li>
              <li>
                Klaar om te starten? Ga meteen naar{" "}
                <Link className="font-semibold text-slate-900 underline decoration-slate-300 hover:decoration-slate-600" href="/contact">
                  het contactformulier
                </Link>{" "}
                en vermeld het project dat je in deze portfolio zag.
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Fotogalerij van 3D prints</h2>
            <p className="mt-2 text-slate-600">
              Scroll door productshots, prototypes en decorstukken. Klik door voor een vergrote weergave met context zodat elke foto scanbaar blijft voor klanten én zoekmachines.
            </p>
          </Reveal>
          <Reveal delay={0.12} className="mt-8">
            <AutoCarousel items={photos} speed={18} />
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Reveal className="max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Timelapse video&rsquo;s van 3D print projecten</h2>
            <p className="mt-2 text-slate-600">
              Kijk mee hoe onderdelen laag per laag worden opgebouwd. Alle video&rsquo;s zijn geprint, gefilmd en nabewerkt in de studio van X3DPrints.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            {videos.map((video, index) => (
              <Reveal
                key={video.id}
                delay={0.1 + index * 0.03}
                className="h-full"
              >
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/40 bg-white/70 p-4 shadow-lg backdrop-blur transition-transform hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative overflow-hidden rounded-2xl border border-slate-200/60">
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-slate-900/0 via-slate-900/0 to-slate-900/10 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0`}
                      title={video.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="aspect-video w-full"
                    />
                    {newVideoIds.has(video.id) && (
                      <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                        Nieuw
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex flex-1 flex-col">
                    <h3 className="text-lg font-semibold text-slate-900">{video.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-slate-600">{video.description}</p>
                    <a
                      href={`https://www.youtube.com/watch?v=${video.id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
                    >
                      Bekijk op YouTube
                      <span aria-hidden>→</span>
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/70 px-8 py-10 text-center shadow-xl backdrop-blur">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-cyan-400/10 to-sky-400/10" aria-hidden />
              <div className="relative">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Klaar voor het volgende project?</p>
                <h2 className="mt-4 text-2xl font-semibold text-slate-900 sm:text-3xl">
                  Laat ons mee nadenken over materiaal, afwerking en planning.
                </h2>
                <p className="mt-3 text-base text-slate-600">
                  Deel je ontwerpbestanden en ontvang binnen één werkdag een vrijblijvende offerte met advies.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <ShimmerButton href="/contact">Vraag een offerte aan</ShimmerButton>
                  <Link
                    href="/faq"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/60 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition-transform hover:-translate-y-0.5 hover:bg-white"
                  >
                    Veelgestelde vragen
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(imageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }} />
    </main>
  )
}
