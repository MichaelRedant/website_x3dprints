import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import VideoGallery from "@/components/VideoGallery"

const canonical = "https://www.x3dprints.be/blog/3d-printen-back-to-school"

export const metadata: Metadata = {
  title: "Back to School: 3D printen voor school | X3DPrints Blog",
  description:
    "Pennenhouders, naamplaatjes, bureau organizers en STEM-modellen. Educatief 3D printen in PLA/PETG met snelle levering voor augustus–september.",
  alternates: { canonical },
  openGraph: {
    title: "Back to School: 3D printen voor school",
    description:
      "Educatief 3D printen: gepersonaliseerde schoolmaterialen, pennenhouders en STEM-modellen in PLA/PETG. Materiaal- en leveringtips.",
    url: canonical,
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "Back to School 3D printen" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Back to School: 3D printen voor school",
    description: "Gepersonaliseerde schoolmaterialen en STEM-modellen. PLA/PETG, matte kleuren en snelle planning.",
    images: ["/images/og-home.jpg"],
  },
}

const tips = [
  "PLA Matte voor cleane tekst en veilige randjes; PETG voor sterkere organizers.",
  "Gebruik afgeronde hoeken en min. 0,6 mm tekstdiepte voor leesbaarheid.",
  "Integreer antislipvoetjes in TPU of maak pockets voor rubber pads.",
  "Layerhoogte 0,16-0,24 mm voor een nette look zonder overdreven printtijd.",
  "Vraag klas/naam varianten in één keer; we batchen voor consistente kleur en finish.",
]

const checklist = [
  "Toepassing: pennenhouder, naamplaatje, bureau organizer of STEM-model.",
  "Materiaal: PLA Matte (look), PETG (sterk), TPU (grip). Kleur? Geef HEX/RGB of schoolkleur.",
  "Afwerking: raw of licht geschuurd; primer optioneel als je wil schilderen.",
  "Deadline: augustus–september (back-to-school) + leveroptie (EV-zone of pakketdienst).",
  "Bestand: STL/STEP. Ontwerp nodig? Ontwerpservice EUR 45/uur.",
]

const faqItems = [
  {
    q: "Welke materialen raden jullie aan voor schoolmateriaal?",
    a: "PLA Matte voor cleane tekst en zachte feel, PETG voor sterkere organizers. TPU voor antislip pads of clips. Alles zonder scherpe hoeken.",
  },
  {
    q: "Kunnen we meerdere namen in één batch laten maken?",
    a: "Ja. Lever een lijst of pas STL/STEP per naam aan; wij batchen de prints zodat kleur en finish consistent zijn.",
  },
  {
    q: "Hoe snel kunnen we leveren rond augustus–september?",
    a: "Meestal binnen enkele werkdagen. Meld je deadline; we plannen realistisch zonder vaste beloftes.",
  },
  {
    q: "Is het 3D model inbegrepen?",
    a: "Nee. Lever STL/STEP of kies ontwerpservice (EUR 45/uur). We controleren wanddiktes, afrondingen en leesbaarheid.",
  },
]

const inspirationImages = [
  { src: "/images/portfolio/back2school%20(1).webp", alt: "Back to School set met pennenhouder en naamplaatje" },
  { src: "/images/portfolio/back2school%20(2).webp", alt: "Gepersonaliseerde bureau organizer voor school" },
  { src: "/images/portfolio/back2school%20(3).webp", alt: "Back to School kit met label en houder" },
]

const videos = [
  {
    id: "JRWyFUfqUlM",
    title: "Funko dude custom",
    description: "Gepersonaliseerd desk figuur dat ook als bureau buddy werkt.",
  },
  {
    id: "yEN9ZY75pDg",
    title: "Potloodhouder op aanvraag",
    description: "Op maat gemaakte pennenhouder in PLA Matte.",
  },
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Back to School: 3D printen voor school",
  description: metadata.description,
  author: { "@type": "Organization", name: "X3DPrints" },
  publisher: {
    "@type": "Organization",
    name: "X3DPrints",
    logo: { "@type": "ImageObject", url: "https://www.x3dprints.be/images/og-home.jpg" },
  },
  datePublished: "2025-07-15",
  image: "https://www.x3dprints.be/images/og-home.jpg",
  mainEntityOfPage: canonical,
  keywords: [
    "3D printen voor school",
    "educatief 3D printen",
    "gepersonaliseerde schoolmaterialen",
    "pennenhouders 3D print",
    "naamplaatjes 3D print",
  ],
}

export default function BlogBackToSchool() {
  return (
    <main className="relative overflow-clip">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-lime-50 via-white to-amber-50" />
      </div>

      <section className="px-6 pb-12 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-700">Seasonal</p>
            <h1 className="mt-2 text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Back to School 3D printen
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-lg text-slate-700">
              Pennenhouders, naamplaatjes, bureau organizers en educatieve STEM-modellen. Ontwerpbestand niet inbegrepen; lever STL/STEP of kies ontwerpservice (EUR 45/uur). Snelle planning voor augustus–september.
            </p>
            <p className="mt-3 max-w-3xl text-pretty text-base text-slate-700">
              Koppel je briefing aan interne resources: bekijk{" "}
              <Link href="/segments/3d-printing-back-to-school" className="font-semibold text-lime-700 underline">
                het Back to School segment
              </Link>{" "}
              voor workflow en materialen, of spring direct naar{" "}
              <Link href="/materials#material-suggestion-tool" className="font-semibold text-lime-700 underline">
                Material Suggestion Tool
              </Link>{" "}
              voor een materiaaladvies. Extern kan je inspiratie zoeken op{" "}
              <Link href="https://www.printables.com" target="_blank" rel="noreferrer" className="font-semibold text-lime-700 underline">
                Printables
              </Link>{" "}
              en referenties meesturen.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/contact?material=pla-matte">Plan schoolprints</ShimmerButton>
              <Link
                href="/segments/3d-printing-back-to-school"
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                Naar Back to School segment
              </Link>
              <Link
                href="/pricing"
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                Bekijk prijzen
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
                    <span className="mt-1 h-2 w-2 rounded-full bg-lime-500" aria-hidden />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-700">
                PLA Matte is ideaal voor leesbare tekst en veilige randen. Voor robuustere organizers gebruik je PETG. TPU pads zorgen voor grip op bureaus.
              </p>
              <p className="mt-3 text-sm text-slate-700">
                Levering: EV-zones of pakketdienst. Breekbare delen verpakken we gescheiden; geef aantallen en klasgroepen door zodat we efficiënt kunnen batchen.
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
                SEO keyphrases: 3D printen voor school, educatief 3D printen, gepersonaliseerde schoolmaterialen. Gebruik ze in je briefing voor consistente copy en zoekintentie.
              </p>
              <p className="mt-3 text-sm text-slate-700">
                Intern linken? Voeg doorverwijzingen toe naar{" "}
                <Link href="/services" className="text-lime-700 underline">
                  services
                </Link>{" "}
                en{" "}
                <Link href="/pricing" className="text-lime-700 underline">
                  pricing
                </Link>{" "}
                zodat lezers direct kunnen beslissen. Extern kan je bronnen als{" "}
                <Link href="https://ultimaker.com/learn" target="_blank" rel="noreferrer" className="text-lime-700 underline">
                  Ultimaker Learn
                </Link>{" "}
                of{" "}
                <Link href="https://www.prusa3d.com/academy" target="_blank" rel="noreferrer" className="text-lime-700 underline">
                  Prusa Academy
                </Link>{" "}
                vermelden als context voor educatief 3D printen.
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
                Foto&apos;s als inspiratie voor gepersonaliseerde schoolmaterialen; lever je STL/STEP of vraag ontwerpservice.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900">Video</h2>
                  <p className="text-sm text-slate-700">Bekijk desk gadgets en organizers in actie (lite embed).</p>
                </div>
                <Link
                  href="https://youtube.com/watch?v=JRWyFUfqUlM&list=PLx3dprints"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-lime-700 underline decoration-lime-200 underline-offset-2"
                >
                  Open YouTube
                </Link>
              </div>
              <div className="mt-4">
                <VideoGallery videos={videos} highlightIds={videos.map((v) => v.id)} />
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">FAQ Back to School</h2>
              <div className="mt-3 space-y-3 text-sm text-slate-700">
                {faqItems.map((item) => (
                  <div key={item.q} className="rounded-xl border border-slate-200/70 bg-white/70 p-3">
                    <p className="font-semibold text-slate-800">{item.q}</p>
                    <p className="mt-1">{item.a}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-700">
                Niet gevonden wat je zoekt? Stuur je vraag en model via{" "}
                <Link href="/contact" className="text-lime-700 underline underline-offset-2">
                  contact
                </Link>{" "}
                met deadline en leveroptie.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    </main>
  )
}
