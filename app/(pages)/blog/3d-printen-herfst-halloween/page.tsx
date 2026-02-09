import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"
import { buildArticleJsonLd, buildFaqPageSchema } from "@/lib/seo"
import BlogAuthorNote from "@/components/BlogAuthorNote"
import BlogContentOverview from "@/components/BlogContentOverview"

const canonical = "https://www.x3dprints.be/blog/3d-printen-herfst-halloween/"
const datePublished = "2024-10-01"
const dateModified = "2026-02-09"

export const metadata: Metadata = {
  title: "3D printen voor herfst & Halloween 2026 | X3DPrints Blog",
  description:
    "Pumpkins, haunted props en sfeerlantaarns voor herfst & Halloween 2026 in Silk, Marble en Translucent PLA. Tips voor supports, lichtdiffusie, levering en ontwerpservice (model niet inbegrepen).",
  alternates: { canonical },
  openGraph: {
    title: "3D printen voor herfst & Halloween 2026",
    description:
      "Maak pumpkins en spooky props voor Halloween 2026 in Silk/Marble/Translucent PLA. Materialen, slicer-tips, leverzones en ontwerpservice.",
  url: canonical,
    type: "article",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "3D geprinte Halloween decor" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printen voor herfst & Halloween 2026",
    description: "Pumpkins, haunted props en lanterns voor Halloween 2026. Kies Silk/Marble/Translucent PLA en plan levering op tijd.",
    images: ["/images/og-home.jpg"],
  },
}

const tips = [
  "Gebruik PLA Silk of Marble voor pumpkins en statues; Translucent voor lantaarns met leds of fairy lights.",
  "Layerhoogte 0,16-0,2 mm; houd wanddikte >1,2 mm voor stevige decor die je kunt ophangen of neerzetten.",
  "Oriënteer zichtzijden omhoog en laat onderkant vlak voor stabiele plaatsing.",
  "Integreer kabelgaten of magneten voor led-strips of battery packs en zorg voor ventilatie bij warmere leds.",
  "Ontwerp/model niet inbegrepen: lever STL/STEP of kies ontwerpservice aan €45/uur.",
]

const checklist = [
  "Formaat + of het hol moet (voor leds/batterijen).",
  "Materiaalkeuze: Silk/Marble voor look, Translucent voor licht, PETG voor outdoor.",
  "Afwerking: raw, licht geschuurd of geprimed. Vraag primer voor schilderwerk.",
  "Leveroptie: EV-zones of pakketdienst; afhalen kan. Voeg deadline toe.",
]

const materialRows = [
  { material: "PLA Silk/Marble", use: "Pumpkins, statues, decor", note: "Glans of steenlook, indoor" },
  { material: "Translucent PLA", use: "Lantaarns en lichtobjecten", note: "Wanddikte 1,6-2 mm voor glow" },
  { material: "PETG", use: "Outdoor decor", note: "Beter tegen UV en vocht" },
]

const lastUpdatedLabel = "Laatst bijgewerkt: 9 februari 2026"

const references = [
  { label: "UltiMaker PLA material properties", href: "https://ultimaker.com/materials/pla/" },
  { label: "UltiMaker PETG material properties", href: "https://ultimaker.com/materials/s-series-petg/" },
  { label: "Autodesk: STL file format", href: "https://help.autodesk.com/view/fusion360/ENU/?guid=GUID-1B6AA02D-B8E5-4F54-ADC7-11C5B900E05F" },
]

const faqItems = [
  {
    q: "Kunnen jullie pumpkins hol printen?",
    a: "Ja. We houden 2-3 perimeter lagen, aangepaste infill en openingsgaten voor leds/batterijen. Lever STL/STEP of laat ons ontwerpen aan €45/uur.",
  },
  {
    q: "Wat is het beste materiaal voor spooky props?",
    a: "Silk/Marble PLA voor glansrijke pumpkins en statues. Translucent PLA voor lantaarns. PETG voor outdoor gebruik.",
  },
  {
    q: "Hoe lever je breekbare decor veilig?",
    a: "Gescheiden verpakt met schuim; EV-levering in zones (Zone 1 €15, Zone 2 €30, Zone 3 €45) of pakketdienst. Afhalen kan gratis.",
  },
  {
    q: "Is het 3D model inbegrepen?",
    a: "Nee. Het ontwerpbestand is niet inbegrepen in de printprijs. Lever STL/STEP of kies ontwerpservice aan €45/uur; we optimaliseren wanddiktes en supports.",
  },
  {
    q: "Kun je primeren of schilderklaar leveren?",
    a: "Ja, licht schuren en grijze primer zijn mogelijk. Vermeld het in je aanvraag.",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "3D printen voor herfst & Halloween 2026",
  description:
    "Pumpkins, haunted props en sfeerlantaarns voor herfst & Halloween 2026 in Silk, Marble en Translucent PLA. Tips voor supports, lichtdiffusie en levering.",
  datePublished,
  dateModified,
  image: "https://www.x3dprints.be/images/og-home.jpg",
})

const faqJsonLd = buildFaqPageSchema({
  inLanguage: "nl-BE",
  items: faqItems,
})

const inspirationImages = [
  { src: "/images/portfolio/halloween1.webp", alt: "3D geprinte Halloween decor set 1" },
  { src: "/images/portfolio/Halloween2.webp", alt: "3D geprinte Halloween decor set 2" },
  { src: "/images/portfolio/Halloween3.webp", alt: "3D geprinte Halloween decor set 3" },
  { src: "/images/portfolio/Halloween4.webp", alt: "3D geprinte Halloween decor set 4" },
  { src: "/images/portfolio/Halloween5.webp", alt: "3D geprinte Halloween decor set 5" },
  { src: "/images/portfolio/Halloween6.webp", alt: "3D geprinte Halloween decor set 6" },
]

export default function BlogAutumnHalloween() {
  return (
    <main className="relative overflow-clip">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-orange-50" />
      </div>

      <section className="px-6 pb-12 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-700">Seasonal</p>
            <h1 className="mt-2 text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              3D printen voor herfst & Halloween 2026
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-lg text-slate-700">
              Pumpkins, haunted props en sfeerlantaarns voor herfst & Halloween 2026 in Silk, Marble en Translucent PLA. Ontwerpbestand niet inbegrepen; lever
              STL/STEP of kies ontwerpservice (€45/uur). EV-levering voor breekbare onderdelen of pakketdienst als je verder zit.
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">{lastUpdatedLabel}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/contact">Plan je Halloween print 2026</ShimmerButton>
              <Link
                href="/segments/3d-printing-seasonal"
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                Naar seasonal segment
              </Link>
              <Link
                href="/materials#material-suggestion-tool"
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                Material Suggestion Tool
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section id="herfst-materials" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Materialen & settings</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-left text-sm text-slate-700">
                  <thead>
                    <tr className="text-xs uppercase tracking-wide text-slate-500">
                      <th className="py-2 pr-4">Materiaal</th>
                      <th className="py-2 pr-4">Gebruik</th>
                      <th className="py-2 pr-4">Notities</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {materialRows.map((row) => (
                      <tr key={row.material}>
                        <td className="py-3 pr-4 font-semibold text-slate-900">{row.material}</td>
                        <td className="py-3 pr-4">{row.use}</td>
                        <td className="py-3 pr-4">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {tips.map((tip) => (
                  <li key={tip} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-orange-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-700">
                Silk/Marble geven een luxe glans aan pumpkins en statues; Translucent is ideaal voor lantaarns. Voor outdoor decor
                is PETG beter tegen zon/vocht. Houd wanddikte 1,6-2 mm bij lichtobjecten om hotspots te vermijden.
              </p>
              <p className="mt-3 text-sm text-slate-700">
                Levering: EV-zones of pakketdienst. Breekbare delen verpakken we gescheiden; grote decor kan in modules zodat de
                binnenkant glad blijft.
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.06}>
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold tracking-tight text-slate-900">Checklist</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {checklist.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-slate-700">
                Extra: voeg oogjes of magneten toe aan hangers; vraag pin-holes voor leds of kabels. Geef aan of je primer/schuren
                wenst voor schilderwerk.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section id="herfst-examples" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Voorbeelden</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {inspirationImages.map((img, idx) => (
                  <div
                    key={img.src}
                    className={`overflow-hidden rounded-xl border border-white/60 bg-white/80 shadow ${idx === inspirationImages.length - 1 ? "sm:col-span-2" : ""}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={idx === inspirationImages.length - 1 ? 960 : 640}
                      height={idx === inspirationImages.length - 1 ? 540 : 480}
                      className="h-full w-full object-cover"
                      sizes="(min-width: 1024px) 320px, 100vw"
                      priority={idx === 0}
                    />
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-600">
                Foto&apos;s tonen Silk/Marble pumpkins, Translucent lantaarns en diverse Halloween props (Halloween1-6).
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section id="herfst-why" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Waarom nu plannen?</h2>
              <p className="mt-3 text-sm text-slate-700">
                Halloween valt jaarlijks eind oktober. Door tijdig te boeken kunnen we het ontwerp optimaliseren (wanddikte, supports,
                splitsing) en leveringsslots plannen voor events, winkels of kantoorversiering.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>Snelle iteraties op formaat, bevestigingen en materiaalkeuze.</li>
                <li>EV-levering voor breekbare decor of pakketdienst voor verder weg.</li>
                <li>Optioneel primer/schuren zodat je direct kan schilderen.</li>
              </ul>
              <p className="mt-3 text-sm text-slate-700">
                Herinnering: het 3D model is niet inbegrepen in de printprijs. Lever STL/STEP of laat ons ontwerpen aan €45/uur.
                Vermeld je eventdatum en leveroptie bij de aanvraag.
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.06}>
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold tracking-tight text-slate-900">SEO inspiratiehoek</h3>
              <p className="mt-2 text-sm text-slate-700">
                Zoek je “3D geprinte Halloween decor”, “3D print pumpkin”, “translucent lantaarn”, “Silk PLA spooky props” of
                “custom Halloween gift”? Hier vind je materiaalkeuze (Silk/Marble/Translucent, PETG, TPU) en support-tips om snel
                te beslissen.
              </p>
              <p className="mt-3 text-sm text-slate-700">
                Populaire opdrachten: pumpkins, skulls, haunted house props, QR-ornamenten (link naar playlist of eventinfo),
                lantaarns met fairy lights en deur/raam trims. Wanddikte &gt;1,2 mm voor hangers, 1,6-2 mm voor lantaarns; TPU feet
                voor antislip.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <ShimmerButton href="/contact">Start je Halloween aanvraag</ShimmerButton>
                <Link
                  href="/segments/3d-printing-seasonal"
                  className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Seasonal segment
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section id="herfst-faq" className="scroll-mt-28 px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">FAQ Halloween prints</h2>
              <div className="mt-3 space-y-3 text-sm text-slate-700">
                {faqItems.map((item) => (
                  <div key={item.q} className="rounded-xl border border-slate-200/70 bg-white/70 p-3">
                    <p className="font-semibold text-slate-800">{item.q}</p>
                    <p className="mt-1">{item.a}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-700">
                Nog vragen? Stuur je model en deadline via{" "}
                <Link href="/contact" className="text-indigo-700 underline underline-offset-2">
                  contact
                </Link>{" "}
                met leveroptie (EV-zone of pakketdienst).
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <BlogContentOverview locale="nl" />

      <section id="herfst-sources" className="scroll-mt-28 px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 id="sources" className="text-2xl font-bold tracking-tight text-slate-900">Bronnen en referenties</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {references.map((reference) => (
                  <li key={reference.href} className="rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3">
                    <cite className="not-italic">
                      <a
                        href={reference.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-indigo-600 transition hover:text-indigo-500"
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BlogAuthorNote locale="nl" />

      <BlogReadMore />

    </main>
  )
}











