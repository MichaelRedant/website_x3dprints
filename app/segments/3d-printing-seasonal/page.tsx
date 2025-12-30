import type { Metadata } from "next"
import Link from "next/link"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import Faq from "@/components/Faq"
import { SITE, buildLocalBusinessSchema, buildServiceSchema, SchemaOfferInput } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Seasonal 3D designs | X3DPrints",
  description:
    "Vier elk seizoen met 3D geprinte decor, props en gifts: herfst & Halloween, lente & Pasen, zomer decor, winter & kerst/nieuwjaar. Ontwerpbestand niet inbegrepen; aanleveren of ontwerpservice.",
  alternates: { canonical: "https://www.x3dprints.be/segments/3d-printing-seasonal" },
  openGraph: {
    title: "Seasonal 3D designs",
    description:
      "Herfst/Halloween, lente/Pasen, zomer en winter/kerst decor. PLA Matte, Silk, Marble en PETG. Leveringszones en ontwerpservice beschikbaar.",
    url: "https://www.x3dprints.be/segments/3d-printing-seasonal",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

const themes = [
  {
    title: "Back to School",
    copy: "Pennenhouders, naamplaatjes, organizers en STEM-modellen voor augustus-september. Matte PLA of PETG met antislip TPU.",
    link: "/blog/3d-printen-back-to-school",
  },
  {
    title: "Vaderdag & Moederdag",
    copy: "Gepersonaliseerde sleutelhangers, desk items en naamcadeaus. Silk/Matte PLA of PETG met antislipvoetjes.",
    link: "/blog/3d-printen-vaderdag-moederdag",
  },
  {
    title: "Valentijn",
    copy: "Hartdecor, naamplaatjes en gifts met Silk/Matte/Translucent PLA. Optioneel leds en magneten.",
    link: "/blog/3d-printen-valentijn",
  },
  {
    title: "Herfst & Halloween",
    copy: "Pumpkins, haunted house props, tafelstukjes in PLA Silk/Marble. Led-vensters in Translucent voor kaars- of fairy light glow.",
    link: "/blog/3d-printen-herfst-halloween",
  },
  {
    title: "Lente & Pasen",
    copy: "Eierschalen, konijnen, bloemdecor en paastak-ornamenten. Pastel PLA en translucent accenten.",
    link: "/blog/3d-printen-lente-pasen",
  },
  {
    title: "Zomer",
    copy: "Tuin- en terrasdecor, nautische thema’s, custom drinkware-houders. PETG voor outdoor gebruik, TPU voor antislip.",
    link: "/blog/3d-printen-zomer",
  },
  {
    title: "Winter, Kerst & Nieuwjaar",
    copy: "Sneeuwvlokken, ornamenten, tafelkaartjes en party props. Marble/Silk PLA voor luxe glans, Translucent voor lichtobjecten.",
    link: "/blog/3d-printen-winter-kerst-nieuwjaar",
  },
]

const materials = [
  "PLA Matte: strak detail voor table decor en ornamenten.",
  "PLA Silk/Marble: glans of steenlook voor feestelijke accenten.",
  "PLA Translucent: sfeerverlichting, lantaarns en vensters.",
  "PETG: outdoor decor dat zon en vocht beter verdraagt.",
  "TPU: antislip feet en bumpers voor delicate props.",
]

const logistics = [
  "EV-levering: Zone 1 (tot 25 km) €15, Zone 2 €30, Zone 3 €45. Verder dan 75 km = maatwerk of pakketdienst.",
  "Breekbare decorstukken worden gescheiden verpakt met schuim en kraftpapier.",
  "Afhalen in Herzele op afspraak is gratis.",
]

const faqItems = [
  {
    q: "Wanneer plan ik best mijn seizoensdecor in?",
    a: "Idealiter minstens twee weken voor het event zodat we materiaalbeslissingen en nabewerking kunnen plannen. Spoed? Geef je deadline door, dan kijken we wat haalbaar is.",
  },
  {
    q: "Leveren jullie props gemonteerd of als modules?",
    a: "Grote decorstukken leveren we modulair met pin-holes of magneetgaten. Vermeld of je wenst dat we verlijmen of dat je dat zelf doet op locatie.",
  },
  {
    q: "Welke materialen zijn geschikt voor buitengebruik?",
    a: "Voor buiten kiezen we meestal <strong>PETG</strong> of <strong>TPU</strong>. Binnen decor en lichtobjecten werken goed in PLA Silk, Marble of Translucent.",
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
  metadata.alternates?.canonical ?? `${SITE.url}/segments/3d-printing-seasonal`,
)
const pageDescription = metadata.description ?? SITE.description

const serviceOffers: SchemaOfferInput[] = [
  {
    serviceName: "Seasonal 3D designs",
    price: "EUR 5",
    description: "Seizoensdecor en props in PLA, Marble en PETG.",
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

const serviceJsonLd = buildServiceSchema("Seasonal 3D designs", serviceOffers, pageUrl)

function getSeasonCta(date: Date) {
  const MS_IN_DAY = 86_400_000
  const isWithinWindow = (target: Date, daysBefore: number, daysAfter: number) => {
    const diff = target.getTime() - date.getTime()
    return diff <= daysAfter * MS_IN_DAY && diff >= -daysBefore * MS_IN_DAY
  }
  const getNthWeekday = (month: number, weekday: number, n: number) => {
    const first = new Date(Date.UTC(date.getUTCFullYear(), month - 1, 1))
    const offset = (weekday - first.getUTCDay() + 7) % 7
    const day = 1 + offset + 7 * (n - 1)
    return new Date(Date.UTC(date.getUTCFullYear(), month - 1, day))
  }

  const month = date.getUTCMonth() + 1 // 1-12
  const day = date.getUTCDate()
  const after = (m: number, d: number) => month > m || (month === m && day >= d)
  const before = (m: number, d: number) => month < m || (month === m && day <= d)

  const mothersDay = getNthWeekday(5, 0, 2)
  const fathersDay = getNthWeekday(6, 0, 2)
  const isValentijnWindow = (month === 1 && day >= 15) || (month === 2 && day <= 16)
  const isParentsWindow = isWithinWindow(mothersDay, 21, 1) || isWithinWindow(fathersDay, 21, 1)
  const isBackToSchoolWindow = month === 8 || month === 9
  if (isValentijnWindow) {
    return { label: "Valentijn cadeaus", href: "/valentijn-3d-printen" }
  }
  if (isParentsWindow) {
    return { label: "Vaderdag & Moederdag", href: "/blog/3d-printen-vaderdag-moederdag" }
  }
  if (isBackToSchoolWindow) {
    return { label: "Back to School", href: "/blog/3d-printen-back-to-school" }
  }
  if (after(11, 11) || before(2, 10)) {
    return { label: "Winter, Kerst & Nieuwjaar", href: "/blog/3d-printen-winter-kerst-nieuwjaar" }
  }
  if (after(2, 11) && before(5, 10)) {
    return { label: "Lente & Pasen", href: "/blog/3d-printen-lente-pasen" }
  }
  if (after(5, 11) && before(9, 10)) {
    return { label: "Zomer decor", href: "/blog/3d-printen-zomer" }
  }
  return { label: "Herfst & Halloween", href: "/blog/3d-printen-herfst-halloween" }
}

export default function SeasonalSegmentPage() {
  const seasonCta = getSeasonCta(new Date())
  return (
    <main className="relative overflow-hidden px-4 pb-28 pt-12 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-sky-50" />
        <div className="absolute -top-28 left-10 h-[24rem] w-[24rem] rounded-full bg-amber-200/40 blur-[120px]" />
        <div className="absolute -bottom-32 right-16 h-[26rem] w-[26rem] rounded-full bg-blue-200/35 blur-[140px]" />
      </div>

      <header className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Segment</p>
        <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Seasonal 3D designs
        </h1>
        <p className="mt-4 text-base text-slate-600">
          Vier elk seizoen met 3D geprinte decor, props en gifts. Ontwerp van het 3D model is niet inbegrepen; lever STL/STEP
          of kies onze ontwerpservice aan €45/uur. Lever klaar om te schilderen, te verlichten of meteen te gebruiken.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
          <ShimmerButton href="/contact?material=pla-silk-plus">Plan je seizoen</ShimmerButton>
          <Link
            href={seasonCta.href}
            className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm"
          >
            {seasonCta.label} blog
          </Link>
          <Link
            href="/portfolio"
            className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm"
          >
            Bekijk voorbeelden
          </Link>
          <Link
            href="/materials#material-suggestion-tool"
            className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm"
          >
            Material Suggestion Tool
          </Link>
        </div>
      </header>

      <section className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-2">
        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Seizoensthema’s</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            {themes.map((theme) => (
              <div key={theme.title} className="rounded-3xl border border-slate-200/70 bg-white/70 p-4">
                <p className="font-semibold text-slate-900">{theme.title}</p>
                <p className="mt-1 text-xs text-slate-600">{theme.copy}</p>
                <Link href={theme.link} className="mt-2 inline-block text-xs font-semibold text-indigo-700 underline">
                  Lees het blog
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Tip: denk aan modulair ontwerp (losse delen) voor grote decorstukken en voorzie pin-holes voor magneten of led-kabels.
          </p>
        </GlassCard>

        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Materialen & finishes</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {materials.map((m) => (
              <li key={m} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden />
                <span>{m}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            Afwerking? We kunnen licht schuren en primeren (grijs) zodat je direct kunt schilderen. Silk/Marble hebben al een
            feestelijke look zonder primer.
          </p>
        </GlassCard>
      </section>

      <section className="mx-auto mt-10 max-w-5xl">
        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Workflow & ontwerp</h2>
          <ol className="mt-4 space-y-2 text-sm text-slate-600">
            <li>1. Lever STL/STEP of kies ontwerpservice (3D model niet inbegrepen in printprijs; €45/uur voor design).</li>
            <li>2. Noteer seizoen + deadline: herfst/Halloween, lente/Pasen, zomer of winter/kerst/NY.</li>
            <li>3. Kies materiaal en gewenste finish (raw, geschuurd, geprimed).</li>
            <li>4. We controleren wanddiktes en overhang, splitsen grote decor in modules en optimaliseren supports.</li>
            <li>5. Levering/afhalen: kies EV-zones, pakketdienst of afhalen in Herzele.</li>
          </ol>
          <p className="mt-4 text-xs text-slate-500">
            Voeg referentiefoto’s of kleurenpalet toe zodat we de juiste filamentblend kiezen (Silk, Marble, Translucent, Matte).
          </p>
        </GlassCard>
      </section>

      <section className="mx-auto mt-10 max-w-5xl">
        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Levering & veiligheid</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {logistics.map((d) => (
              <li key={d} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden />
                <span>{d}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            Fragiele decorstukken verpakken we gescheiden met schuim. Grote stukken kunnen gelijmd of als modules geleverd worden.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link href="/pricing" className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm">
              Prijzen & leverzones
            </Link>
            <Link href="/contact?material=pla-silk-plus" className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm">
              Start je aanvraag
            </Link>
          </div>
        </GlassCard>
      </section>

      <section className="mx-auto mt-12 max-w-4xl">
        <Faq title="FAQ Seasonal 3D designs" items={faqItems} />
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
