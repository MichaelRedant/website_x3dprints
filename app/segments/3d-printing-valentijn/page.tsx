import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import Faq from "@/components/Faq"
import { SITE, buildLocalBusinessSchema, buildServiceSchema, SchemaOfferInput } from "@/lib/seo"

export const metadata: Metadata = {
  title: "3D printing voor Valentijn cadeaus | X3DPrints",
  description:
    "Gepersonaliseerde Valentijn cadeaus, hartdecor en lichtobjecten in Silk, Matte en Translucent PLA. Ontwerpbestand niet inbegrepen; lever STL/STEP of kies ontwerpservice.",
  alternates: { canonical: "https://www.x3dprints.be/segments/3d-printing-valentijn" },
  openGraph: {
    title: "3D printing voor Valentijn cadeaus",
    description:
      "Hartvormige props, naamplaatjes en sfeerverlichting in Silk/Matte/Translucent PLA. Snelle planning vanuit Herzele.",
    url: "https://www.x3dprints.be/segments/3d-printing-valentijn",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

const steps = [
  {
    title: "1. Brief & bestand",
    copy: "Lever STL/STEP met tekst of logo, of kies ontwerpservice aan EUR 45/uur. Vermeld formaat en of het voor tafeldecor, giftbox of etalage is.",
  },
  {
    title: "2. Materiaal & afwerking",
    copy: "Silk/Marble PLA voor glans, Matte PLA voor zachte look, Translucent voor led-gloed. Optioneel primer/schuren zodat je direct kan schilderen.",
  },
  {
    title: "3. Levering",
    copy: "EV-levering per zone of pakketdienst. Breekbare stukken verpakken we gescheiden; afhalen in Herzele kan gratis.",
  },
]

const highlights = [
  "Naamplaatjes, ringenhouders, sleutel- of boeksteunen in hartthema",
  "Silk/Marble PLA voor luxe gifts, Translucent voor lichtobjecten",
  "CTA's naar contact met material prefill en suggestion tool",
  "Planning op maat van 14 februari zonder overpromise",
]

const faqItems = [
  {
    q: "Kunnen jullie ook ontwerpen?",
    a: "Ja. Het 3D model is niet inbegrepen in de printprijs. Lever STL/STEP of kies ontwerpservice aan EUR 45/uur. We optimaliseren wanddikte, tekst en supports.",
  },
  {
    q: "Welk materiaal kies ik voor een premium look?",
    a: "PLA Silk of Marble geeft een glansrijke afwerking; Matte PLA oogt zacht. Wil je licht doorlaten, kies Translucent met wand 1.6-2 mm en laat ruimte voor leds.",
  },
  {
    q: "Hoe snel kan ik iets laten printen?",
    a: "Vaak binnen enkele werkdagen, afhankelijk van oplage en afwerking. Vermeld je deadline rond 14 februari; we plannen realistisch zonder harde beloften.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a.replace(/<[^>]*>/g, "") },
  })),
}

const pageUrl = String(
  metadata.alternates?.canonical ?? `${SITE.url}/segments/3d-printing-valentijn`,
)
const pageDescription = metadata.description ?? SITE.description

const serviceOffers: SchemaOfferInput[] = [
  {
    serviceName: "Valentijn 3D printing",
    price: "EUR 5",
    description: "Gepersonaliseerde Valentijn decor en gifts in Silk, Matte of Translucent PLA.",
    url: pageUrl,
  },
]

const localBusinessJsonLd = buildLocalBusinessSchema({
  pageUrl,
  description: pageDescription,
  image: "/images/og-home.jpg",
  areaServed: "Gent & Vlaanderen",
  priceRange: "EUR 5 - EUR 49",
})

const serviceJsonLd = buildServiceSchema("Valentijn 3D printing", serviceOffers, pageUrl)

const gallery = [
  { src: "/images/portfolio/valentijn2.webp", alt: "3D geprint Valentijn duo decor" },
  { src: "/images/portfolio/valentijn3.webp", alt: "3D geprinte Valentijn hart decor" },
  { src: "/images/portfolio/big%20valentijn%20boy%20articulated.webp", alt: "3D geprint articulated Valentijn figuur" },
]

export default function ValentijnSegmentPage() {
  return (
    <main className="relative overflow-hidden px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-red-50" />
        <div className="absolute left-4 top-[-15%] h-[20rem] w-[20rem] rounded-full bg-rose-200/40 blur-[120px]" />
        <div className="absolute right-0 bottom-[-20%] h-[26rem] w-[26rem] rounded-full bg-amber-200/35 blur-[140px]" />
      </div>

      <header className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Segment</p>
        <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          3D printing voor Valentijn cadeaus
        </h1>
        <p className="mt-4 text-base text-slate-600">
          Hartvormige props, gepersonaliseerde gifts en sfeerverlichting in Silk, Matte of Translucent PLA. Ontwerp van het 3D model is niet inbegrepen; lever STL/STEP of kies ontwerpservice aan EUR 45/uur.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
          <ShimmerButton href="/contact?material=pla-silk-plus">Plan je Valentijn run</ShimmerButton>
          <Link
            href="/materials#material-suggestion-tool"
            className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm"
          >
            Material Suggestion Tool
          </Link>
          <Link
            href="/blog/3d-printen-valentijn"
            className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm"
          >
            Lees het Valentijn blog
          </Link>
          <Link
            href="/materials#material-suggestion-tool"
            className="hidden rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm md:inline-flex"
          >
            Vraag materiaaladvies
          </Link>
        </div>
      </header>

      <section className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-2">
        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Workflow</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            {steps.map((step) => (
              <div key={step.title} className="rounded-3xl border border-slate-200/70 bg-white/70 p-4">
                <p className="font-semibold text-slate-900">{step.title}</p>
                <p className="mt-1 text-xs text-slate-600">{step.copy}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Tip: vermeld of je leds of magneten wil integreren; we voorzien pin-holes zodat onderdelen veilig monteren.
          </p>
        </GlassCard>

        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Highlights</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-500" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            Inspiratie nodig? Bekijk tijdelijk een selectie op{" "}
            <Link
              href="https://www.printables.com"
              className="font-semibold text-rose-700 underline"
              target="_blank"
              rel="noreferrer"
            >
              Printables (extern)
            </Link>{" "}
            en voeg referenties toe in je aanvraag.
          </p>
        </GlassCard>
      </section>

      <section className="mx-auto mt-10 max-w-5xl">
        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Materiaalkeuze voor Valentijn</h2>
          <ol className="mt-4 space-y-2 text-sm text-slate-600">
            <li>1. Silk of Marble PLA voor luxe gifts (rood, goud, parel).</li>
            <li>2. Matte PLA voor zachte pastels en gravure-achtige tekst.</li>
            <li>3. Translucent PLA voor lantaarns en tafeldecor met led.</li>
            <li>4. TPU voor antislip feet onder trays of vazen.</li>
            <li>5. Leveropties: EV-zones of pakketdienst; afhalen in Herzele kan.</li>
          </ol>
          <p className="mt-4 text-xs text-slate-500">
            Voeg kleurenpalet of PMS-codes toe zodat we de juiste filamentblend kiezen.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link href="/pricing" className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm">
              Prijzen & leverzones
            </Link>
            <Link href="/contact?material=pla-silk-plus" className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm">
              Start je aanvraag
            </Link>
            <Link href="/materials#material-suggestion-tool" className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm">
              Material Suggestion Tool
            </Link>
          </div>
        </GlassCard>
      </section>

      <section className="mx-auto mt-10 max-w-5xl">
        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Voorbeelden</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {gallery.map((item, idx) => (
              <div
                key={item.src}
                className={`overflow-hidden rounded-xl border border-slate-200/70 bg-white/80 shadow ${idx === 0 ? "sm:col-span-2" : ""}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={idx === 0 ? 960 : 640}
                  height={idx === 0 ? 540 : 480}
                  className="h-full w-full object-cover"
                  sizes="(min-width: 1024px) 640px, 100vw"
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-600">
            Foto&apos;s van recente Valentijn prints; extra beelden volgen met nieuwe runs.
          </p>
        </GlassCard>
      </section>

      <section className="mx-auto mt-12 max-w-4xl">
        <Faq title="FAQ Valentijn 3D printing" items={faqItems} />
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </main>
  )
}
