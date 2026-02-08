import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import Faq from "@/components/Faq"
import { buildFaqPageSchema } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Valentijn 3D prints op maat | X3DPrints",
  description:
    "Hartdecor, naamplaatjes en gepersonaliseerde cadeaus in Silk, Matte en Translucent PLA. Ontwerpbestand niet inbegrepen; lever STL/STEP of kies ontwerpservice.",
  alternates: { canonical: "https://www.x3dprints.be/valentijn-3d-printen/", languages: { "nl-BE": "https://www.x3dprints.be/valentijn-3d-printen/", "en-BE": "https://www.x3dprints.be/en/valentijn-3d-printen/", "x-default": "https://www.x3dprints.be/valentijn-3d-printen/", }, },
  openGraph: {
    title: "Valentijn 3D prints op maat",
    description:
      "Valentijn gifts met glans of lichtgloed. Silk/Matte/Translucent PLA, led-uitsparingen en leveropties in Vlaanderen.",
    url: "https://www.x3dprints.be/valentijn-3d-printen/",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

const ideas = [
  "Hartvormige naamplaatjes, ring trays en sleutelhangers met tekst of logo.",
  "Lichtobjecten met Translucent PLA en ruimte voor fairy lights.",
  "Giftbox inserts, kaartclips en tafelstukjes in Silk of Marble PLA.",
  "Etalage props voor retail/ horeca met magneten of lijmpunten.",
]

const workflow = [
  "Lever STL/STEP of kies ontwerpservice (EUR 45/uur).",
  "Kies materiaal: Silk/Marble voor glans, Matte voor zachte look, Translucent voor licht.",
  "Noteer afwerking (raw, licht geschuurd, geprimed) en leveroptie (EV-zone of pakketdienst).",
  "We plannen samen richting 14 februari zonder onrealistische beloftes.",
]

const faqItems = [
  {
    q: "Welke materialen werken het best voor Valentijn?",
    a: "Silk of Marble PLA voor luxe gifts, Matte PLA voor zachte pastels, Translucent PLA voor lichtobjecten. TPU voor antislip feet onder trays.",
  },
  {
    q: "Is het ontwerp inbegrepen?",
    a: "Nee. Lever je STL/STEP of laat ons ontwerpen aan EUR 45/uur. We optimaliseren wanddikte, tekst en supports.",
  },
  {
    q: "Hoe zit het met levering?",
    a: "EV-zones in Vlaanderen (afhankelijk van afstand) of pakketdienst. Afhalen in Herzele kan gratis. Breekbare stukken verpakken we gescheiden.",
  },
]

const faqJsonLd = buildFaqPageSchema({
  inLanguage: "nl-BE",
  items: faqItems,
})

export default function ValentijnLandingPage() {
  return (
    <main className="relative overflow-clip">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-amber-50" />
        <div className="absolute left-10 top-[-10%] h-[24rem] w-[24rem] rounded-full bg-rose-200/40 blur-[140px]" />
        <div className="absolute right-0 bottom-[-25%] h-[28rem] w-[28rem] rounded-full bg-amber-200/35 blur-[160px]" />
      </div>

      <section className="px-6 pb-16 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Seasonal</p>
          <h1 className="mt-3 text-balance text-4xl font-extrabold text-slate-900 sm:text-5xl">Valentijn 3D prints op maat</h1>
          <p className="mt-4 max-w-3xl text-pretty text-lg text-slate-700">
            Hartdecor, naamplaatjes en gepersonaliseerde cadeaus in Silk, Matte en Translucent PLA. Ontwerp niet inbegrepen; lever STL/STEP of kies ontwerpservice aan EUR 45/uur. Levering via EV-zones of pakketdienst.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ShimmerButton href="/contact?material=pla-silk">Plan je Valentijnprint</ShimmerButton>
            <Link
              href="/segments/3d-printing-valentijn"
              className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
            >
              Naar Valentijn segment
            </Link>
            <Link
              href="/materials#material-suggestion-tool"
              className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
            >
              Material Suggestion Tool
            </Link>
            <Link
              href="/blog/3d-printen-valentijn"
              className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
            >
              Lees het blog
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <GlassCard className="p-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Ideeën voor Valentijn</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {ideas.map((idea) => (
                <li key={idea} className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-rose-500" aria-hidden />
                  <span>{idea}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-slate-700">
              Zoek inspiratie op{" "}
              <Link
                href="https://www.printables.com"
                className="text-rose-700 underline"
                target="_blank"
                rel="noreferrer"
              >
                Printables (extern)
              </Link>{" "}
              en stuur referenties mee; we stemmen materiaal en finish af.
            </p>
          </GlassCard>

          <GlassCard className="p-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Workflow richting 14 februari</h2>
            <ol className="mt-3 space-y-2 text-sm text-slate-700">
              {workflow.map((step, idx) => (
                <li key={step} className="flex gap-2">
                  <span className="mt-1 text-rose-600">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <Link
                href="/pricing"
                className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
              >
                Prijzen & leverzones
              </Link>
              <Link
                href="/segments/3d-printing-seasonal"
                className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
              >
                Naar seasonal segment
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <GlassCard className="p-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Materialen & finishes</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">Silk & Marble PLA</p>
                <p>Glansrijke prints voor premium gifts. Denk aan rood, goud of parel voor tafeldecor en naamplaatjes.</p>
                <p className="font-semibold text-slate-900">Matte PLA</p>
                <p>Zachte pastels voor een subtiele look. Combineer met gegraveerde tekst of inlay.</p>
              </div>
              <div className="space-y-2 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">Translucent PLA</p>
                <p>Voor lantaarns en lichtobjecten. Wand 1.6-2 mm voor een diffuse gloed; laat ventilatie voor leds.</p>
                <p className="font-semibold text-slate-900">TPU & PETG</p>
                <p>TPU voor antislip feet, PETG voor outdoor props. Combineer met PLA covers voor hybride sets.</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-700">
              Voeg PMS/HEX-codes of kleurreferenties toe zodat we de juiste filamentblend kiezen. Afwerking kan raw, licht geschuurd of geprimed zodat je direct kan schilderen.
            </p>
            <div className="mt-4 grid gap-3 rounded-2xl border border-white/60 bg-white/80 p-3 sm:grid-cols-[1fr,0.9fr]">
              <div>
                <p className="text-sm font-semibold text-slate-900">Plaatsvervangende visual</p>
                <p className="text-sm text-slate-700">We vervangen deze foto zodra de Valentijn shoot klaar is.</p>
              </div>
              <div className="overflow-hidden rounded-xl border border-white/60 bg-white">
                <Image
                  src="/images/portfolio/big%20valentijn%20boy%20articulated.webp"
                  alt="3D geprinte articulated Valentijn figuur"
                  width={640}
                  height={480}
                  className="h-full w-full object-cover"
                  sizes="(min-width: 1024px) 320px, 100vw"
                  priority
                />
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Faq title="FAQ Valentijn 3D prints" items={faqItems} />
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  )
}


