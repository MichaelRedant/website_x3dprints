import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/blog/3d-printen-zomer"

export const metadata: Metadata = {
  title: "3D printen voor de zomer | X3DPrints Blog",
  description:
    "Outdoor decor, nautische props en terrasaccessoires. PETG voor zon/vocht, PLA Silk/Marble voor luxe tafeldecor, TPU voor grip. Ontwerpbestand niet inbegrepen; ontwerpservice beschikbaar.",
  alternates: { canonical },
  openGraph: {
    title: "3D printen voor de zomer",
    description: "Tuin- en stranddecor, nautische thema’s en custom holders. Materialen, slicer-tips, levering en ontwerpservice.",
    url: canonical,
    type: "article",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "3D geprinte zomer decor" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printen voor de zomer",
    description: "Outdoor props en terrastoppers in PETG/TPU of Silk PLA. Tips voor hitte, grip en levering.",
    images: ["/images/og-home.jpg"],
  },
}

const tips = [
  "Gebruik PETG voor outdoor decor: beter tegen zon en vocht. PLA Silk/Marble voor luxe tafeldecor binnen.",
  "Layerhoogte 0,2 mm voor grotere stukken; 0,16 mm voor sierlijke details. Wanddikte >1,6 mm voor items in de zon.",
  "TPU voor antislip feet onder trays of beach-gear. Combineer PLA of PETG bovenop voor stijve structuur.",
  "Ontwerp/model niet inbegrepen: lever STL/STEP of kies ontwerpservice aan €45/uur.",
  "Voor drinkware-holders: voorzie drainagegaten en afronden randen voor comfort.",
]

const checklist = [
  "Noteer of het buiten of binnen gebruikt wordt (zon/vocht).",
  "Materiaalkeuze: PETG voor outdoor, PLA Silk/Marble voor look, TPU voor grip/antislip.",
  "Afwerking: raw voor utiliteit, licht geschuurd of geprimed voor showpieces.",
  "Leveroptie: EV-zone of pakketdienst; afhalen kan. Voeg je deadline toe (festival, tuinfeest, strandtrip).",
]

const faqItems = [
  {
    q: "Welke materialen raden jullie aan voor buiten?",
    a: "PETG voor zon/vocht, eventueel met matte finish. PLA Silk/Marble is voor indoor of beschutte plekken. TPU voor antislip feet.",
  },
  {
    q: "Kan ik strand- of nautische props laten maken?",
    a: "Ja. Ankertjes, vuurtorens, schelpen of custom holders voor drinkware en gadgets. Lever STL/STEP of laat ontwerpen aan €45/uur.",
  },
  {
    q: "Hoe lever je breekbare stukken veilig?",
    a: "We verpakken gescheiden met schuim en leveren via EV-zones (Zone 1 €15, Zone 2 €30, Zone 3 €45) of pakketdienst. Afhalen in Herzele kan gratis.",
  },
  {
    q: "Is het 3D model inbegrepen?",
    a: "Nee. Ontwerpbestand is niet inbegrepen; je levert STL/STEP of kiest ontwerpservice aan €45/uur. We optimaliseren wanddiktes en supports.",
  },
  {
    q: "Hoe voorkom je vervorming in de zon?",
    a: "Kies PETG voor buiten, vermijd donkere PLA in volle zon en hou wanddikte >1,6 mm. Voor zwaardere items voorzien we bredere bases of TPU feet.",
  },
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",

  inLanguage: ["nl-BE", "en-BE"],
  headline: "3D printen voor de zomer",
  description:
    "Outdoor decor, nautische props en terrasaccessoires. PETG voor zon/vocht, PLA Silk/Marble voor luxe tafeldecor, TPU voor grip.",
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

  inLanguage: ["nl-BE", "en-BE"],
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
}

const inspirationImages = [
  { src: "/images/portfolio/Summer1.webp", alt: "3D geprinte zomer decor 1" },
  { src: "/images/portfolio/Summer2.webp", alt: "3D geprinte zomer decor 2" },
  { src: "/images/portfolio/Summer3.webp", alt: "3D geprinte zomer decor 3" },
  { src: "/images/portfolio/Summer4.webp", alt: "3D geprinte zomer decor 4" },
  { src: "/images/portfolio/Summer5.webp", alt: "3D geprinte zomer decor 5" },
  { src: "/images/portfolio/Summer6.webp", alt: "3D geprinte zomer decor 6" },
  { src: "/images/portfolio/Summer7.webp", alt: "3D geprinte zomer decor 7" },
]

export default function BlogSummer() {
  return (
    <main className="relative overflow-clip">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-amber-50" />
      </div>

      <section className="px-6 pb-12 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Seasonal</p>
            <h1 className="mt-2 text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              3D printen voor de zomer
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-lg text-slate-700">
              Terrasdecor, nautische thema’s en custom holders voor festivals of beach trips. Ontwerpbestand niet inbegrepen; lever
              STL/STEP of kies ontwerpservice (€45/uur). EV-levering voor breekbare stukken of pakketdienst indien verder weg.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/contact">Plan je zomerprints</ShimmerButton>
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

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Materialen & settings</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {tips.map((tip) => (
                  <li key={tip} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-sky-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-700">
                Denk aan drainage/openingen voor outdoor decor en kies PETG voor hittebestendigheid (auto/zon). TPU pads voorkomen
                schuiven op gladde tafels. Voor indoor luxe gebruik Silk/Marble PLA.
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
                Extra: TPU antislip feet toevoegen aan trays of caddies. Wil je brand/naam verwerken? Lever een STL/STEP met emboss of
                kies ontwerpservice.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
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
                Foto&apos;s tonen outdoor decor, nautische props, trays en caddies in PETG/PLA/TPU (Summer1-7).
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Waarom nu plannen?</h2>
              <p className="mt-3 text-sm text-slate-700">
                Zomerprints pieken rond juni-augustus voor tuinfeesten, festivals en vakanties. Vroeg boeken = meer speelruimte voor
                design tweaks (wanddikte, supports, splitsen) en zeker levermoment.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>Snelle iteraties op formaat, bevestigingen en materiaalkeuze.</li>
                <li>EV-levering voor breekbare decor of pakketdienst voor verder weg.</li>
                <li>Optioneel primer/schuren zodat je direct kan schilderen of afwerken.</li>
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
                Zoek je “3D geprinte zomer decor”, “3D print outdoor decor”, “PETG beach props”, “TPU antislip tray” of “nautische
                3D prints”? Hier vind je materiaalkeuze (PETG, PLA Silk/Marble, TPU), support- en wanddikte tips om snel te beslissen.
              </p>
              <p className="mt-3 text-sm text-slate-700">
                Populaire opdrachten: nautische sets (ankers, schelpen, vuurtorens), outdoor lantaarns, custom drinkware-houders,
                garden stakes en plant labels, trays met TPU feet. Wanddikte &gt;1,6 mm voor outdoor, 1,2-1,4 mm voor indoor decor.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <ShimmerButton href="/contact">Start je zomer-aanvraag</ShimmerButton>
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
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">FAQ zomer prints</h2>
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <BlogReadMore />

    </main>
  )
}
