import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/blog/3d-printen-winter-kerst-nieuwjaar"

export const metadata: Metadata = {
  title: "3D printen voor winter, Kerst en Nieuwjaar | X3DPrints Blog",
  description:
    "Sneeuwvlokken, ornamenten, tafelkaartjes en party props in Silk, Marble en Translucent PLA. Tips voor lichtobjecten, montage en levering. Ontwerpbestand niet inbegrepen.",
  alternates: { canonical },
  openGraph: {
    title: "3D printen voor winter, Kerst en Nieuwjaar",
    description:
      "Feestelijke decor met glans of lichtgloed. Materiaalkeuze, slicer-tips en leveropties voor eindejaar.",
    url: canonical,
    type: "article",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "3D geprinte kerstdecor" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printen voor winter, Kerst en Nieuwjaar",
    description: "Ornamenten, sneeuwvlokken en party props. Silk/Marble/Translucent PLA en leveringsopties.",
    images: ["/images/og-home.jpg"],
  },
}

const tips = [
  "Silk of Marble PLA voor glansrijke ornamenten en tafelstukjes; multicolor PLA voor speelse kerstballen.",
  "Translucent PLA voor lichtobjecten; wanddikte 1,6-2 mm voor zachte gloed.",
  "Layerhoogte 0,16-0,2 mm; zorg voor stevige hang-oogjes bij ornamenten.",
  "Ontwerp/model niet inbegrepen: lever STL/STEP of kies ontwerpservice aan €45/uur.",
]

const faqItems = [
  {
    q: "Kan ik gepersonaliseerde kerstballen laten maken?",
    a: "Ja. Lever een STL/STEP met naam of logo, of laat ons het model ontwerpen aan €45/uur. We printen in Silk of multicolor PLA voor een luxe of speelse look.",
  },
  {
    q: "Welke materialen gebruik ik voor lichtobjecten?",
    a: "Translucent PLA met wanddikte 1,6-2 mm voor zachte gloed. Kies PLA Silk/Marble voor opake decor. PETG voor outdoor gebruik.",
  },
  {
    q: "Hoe worden breekbare prints geleverd?",
    a: "We verpakken gescheiden met schuim en kraftpapier en leveren met EV in zones. Zone 1 €15, Zone 2 €30, Zone 3 €45, >75 km maatwerk of pakketdienst. Afhalen kan gratis.",
  },
  {
    q: "Is het 3D model inbegrepen?",
    a: "Nee. Je levert STL/STEP aan of laat ons ontwerpen aan €45/uur. We optimaliseren voor printbaarheid, wanddiktes en supports.",
  },
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "3D printen voor winter, Kerst & Nieuwjaar",
  description:
    "Sneeuwvlokken, ornamenten, tafelkaartjes en party props in Silk, Marble en Translucent PLA. Tips voor lichtobjecten en levering.",
  author: { "@type": "Organization", name: "X3DPrints", url: "https://www.x3dprints.be" },
  publisher: {
    "@type": "Organization",
    name: "X3DPrints",
    url: "https://www.x3dprints.be",
    logo: { "@type": "ImageObject", url: "https://www.x3dprints.be/Logo.webp" },
  },
  mainEntityOfPage: canonical,
  url: canonical,
  image: ["https://www.x3dprints.be/images/og-home.jpg"],
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
}

export default function BlogWinter() {
  return (
    <main className="relative overflow-clip">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50" />
      </div>

      <section className="px-6 pb-12 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">Seasonal</p>
            <h1 className="mt-2 text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              3D printen voor winter, Kerst & Nieuwjaar
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-lg text-slate-700">
              Ornamenten, sneeuwvlokken en party props in Silk, Marble en Translucent PLA. Ontwerpbestand niet inbegrepen; lever
              STL/STEP of kies ontwerpservice (€45/uur).
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/contact">Plan je kerstprints</ShimmerButton>
              <Link
                href="/segments/3d-printing-seasonal"
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                Naar seasonal segment
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Waarom nu bestellen?</h2>
              <p className="mt-3 text-sm text-slate-700">
                Kerst- en nieuwjaarsprints hebben vaak een strakke deadline voor familiefeesten, kantoorparty’s of retail
                etalages. Door tijdig te bestellen krijg je:
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>Snelle iteraties op formaat, bevestiging (oogjes/magneten) en materiaalkeuze.</li>
                <li>EV-levering in zones zodat breekbare ornamenten veilig toekomen.</li>
                <li>Optionele primer/schuurservice zodat je meteen kunt schilderen of monteren.</li>
              </ul>
              <p className="mt-3 text-sm text-slate-700">
                Denk aan gepersonaliseerde naamkaartjes, branded kerstballen, countdown props of translucent lantaarns met led
                strips. Voor kantoren printen we ook signage, gift tags, QR-cards en kleine give-aways.
              </p>
              <p className="mt-3 text-sm text-slate-700">
                Belangrijk: het 3D model is niet inbegrepen in de printprijs. Je levert STL/STEP aan, of we ontwerpen het model
                tegen €45/uur. Vermeld dat je kerst- of nieuwjaarsdeadline hebt; we plannen dan productie en levering in functie
                van je eventdatum.
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.06}>
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold tracking-tight text-slate-900">SEO & inspiratiehoek</h3>
              <p className="mt-2 text-sm text-slate-700">
                Zoek je “3D geprinte kerstballen”, “3D print kerst ornamenten”, “Silk PLA kerst decor”, “translucent kerst
                lantaarn” of “custom kerst cadeau”? Dit artikel bundelt de belangrijkste keuzes: Silk/Marble/Multicolor PLA voor
                luxe en kleur, Translucent PLA voor licht, PETG voor outdoor, TPU voor antislip feet.
              </p>
              <p className="mt-3 text-sm text-slate-700">
                Populaire opdrachten: sneeuwvlok sets, deur-trims, branded ornaments met logo, tafelkastjes, countdown props,
                gift card holders en QR-ornamenten (scan voor playlist of eventinfo). We stemmen wanddikte, infill en oriëntatie
                af op jouw gebruik: display-only, kids-safe of outdoor.
              </p>
              <p className="mt-3 text-sm text-slate-700">
                Leveropties: Zone 1 (tot 25 km) €15, Zone 2 €30, Zone 3 €45, &gt;75 km maatwerk of
                pakketdienst. Afhalen in Herzele is gratis. Voeg datum + leveroptie toe bij je aanvraag voor een strakke planning.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <ShimmerButton href="/contact">Start je kerstaanvraag</ShimmerButton>
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

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">FAQ kerst & nieuwjaar prints</h2>
              <div className="mt-3 space-y-3 text-sm text-slate-700">
                {faqItems.map((item) => (
                  <div key={item.q} className="rounded-xl border border-slate-200/70 bg-white/70 p-3">
                    <p className="font-semibold text-slate-800">{item.q}</p>
                    <p className="mt-1">{item.a}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-700">
                Niet gevonden wat je zocht? Stuur je vraag en model via{" "}
                <Link href="/contact" className="text-indigo-700 underline underline-offset-2">
                  contact
                </Link>{" "}
                met deadline en leveroptie.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Materialen & settings</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {tips.map((tip) => (
                  <li key={tip} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-700">
                Voor ornamenten: integreer oogjes of laat we ze meeprinten. Voor tafelkaartjes kies PLA Matte/Silk. Voor lichtobjecten
                gebruik Translucent en vermijd te dikke wanden om hotspots te voorkomen.
              </p>
              <p className="mt-3 text-sm text-slate-700">
                Levering: EV-zones of pakketdienst. Breekbare delen verpakken we gescheiden; grote decor kan in modules.
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.06}>
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold tracking-tight text-slate-900">Inspiratie</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>Sneeuwvlokken en stars in Translucent met led string.</li>
                <li>Kerstballen in Silk of multicolor PLA voor luxe of speels effect.</li>
                <li>Naamkaartjes en centerpiece decor in Silk/Marble PLA.</li>
                <li>Countdown/party props voor Nieuwjaar met TPU antislip feet.</li>
              </ul>
              <div className="mt-4 grid gap-3 rounded-2xl border border-white/60 bg-white/70 p-3">
                <p className="text-sm font-semibold text-slate-800">Voorbeelden</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="overflow-hidden rounded-xl border border-white/60 bg-white/80 shadow">
                    <Image src="/images/portfolio/xmasTree.jpg" alt="3D geprinte kerstboom ornamenten set" width={640} height={480} className="h-full w-full object-cover" sizes="(min-width: 1024px) 320px, 100vw" />
                  </div>
                  <div className="overflow-hidden rounded-xl border border-white/60 bg-white/80 shadow">
                    <Image src="/images/portfolio/XmasScene.webp" alt="3D geprinte winter scene decorstuk" width={640} height={480} className="h-full w-full object-cover" sizes="(min-width: 1024px) 320px, 100vw" />
                  </div>
                  <div className="overflow-hidden rounded-xl border border-white/60 bg-white/80 shadow">
                    <Image src="/images/portfolio/XmasBalls2.webp" alt="3D geprinte kerstballen set detail" width={640} height={480} className="h-full w-full object-cover" sizes="(min-width: 1024px) 320px, 100vw" />
                  </div>
                  <div className="overflow-hidden rounded-xl border border-white/60 bg-white/80 shadow">
                    <Image src="/images/portfolio/XmasBalls.webp" alt="3D geprinte kerstballen set overzicht" width={640} height={480} className="h-full w-full object-cover" sizes="(min-width: 1024px) 320px, 100vw" />
                  </div>
                  <div className="overflow-hidden rounded-xl border border-white/60 bg-white/80 shadow sm:col-span-2">
                    <Image src="/images/portfolio/XmasDoorTrim.webp" alt="3D geprinte kerst deurversiering op paneel" width={960} height={540} className="h-full w-full object-cover" sizes="(min-width: 1024px) 640px, 100vw" />
                  </div>
                </div>
                <p className="text-xs text-slate-600">Foto&apos;s tonen Silk en multicolor PLA kerstballen, translucent lichtobjecten en deur/boom decor.</p>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BlogReadMore />

    </main>
  )
}
