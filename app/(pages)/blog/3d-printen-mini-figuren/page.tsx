import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"
import { buildArticleJsonLd } from "@/lib/seo"

const canonical = "https://www.x3dprints.be/blog/3d-printen-mini-figuren/"
const datePublished = "2024-06-10"
const dateModified = "2026-02-04"

export const metadata: Metadata = {
  title: "3D printen van miniaturen voor tabletop gaming | X3DPrints Blog",
  description:
    "Gids voor 3D printing van miniaturen en dice towers voor Dungeons & Dragons en Warhammer. Materialen, detailtips, supports, nabewerking en levering.",
  alternates: { canonical },
  openGraph: {
    title: "3D printen van miniaturen voor tabletop gaming",
    description:
      "Leer hoe je haarscherpe D&D en Warhammer miniâ€™s print: materiaalkeuze, detail, supports, primer, schilderen en veilige levering.",
  url: canonical,
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "3D geprinte miniaturen en dice tower" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printen van miniaturen voor tabletop gaming",
    description: "Van STL tot geprinte miniâ€™s: detail, supports, curing en schildertips voor D&D/Warhammer.",
    images: ["/images/og-home.jpg"],
  },
}

type Card = { title: string; body: string }

const highlights: Card[] = [
  {
    title: "Detail & schaal",
    body: "Miniâ€™s van 25-35 mm vragen strakke laaghoogtes (0,12-0,16 mm) en fijne nozzles. We plaatsen zichtzijde naar boven voor scherpe gezichten, wapenranden en ornamenten.",
  },
  {
    title: "Podiums & bases",
    body: "Integreren van bases (25/32/40 mm) bespaart lijmwerk. We voegen indien nodig pin-holes voor magneten of inserts toe zodat je minis stevig op terrain of movement trays klikken.",
  },
  {
    title: "Dice tower & props",
    body: "Wij printen ook dice towers en scenery. Stevige PETG of PLA Matte voor torens en terrain, TPU voor rubber feet of dempers zodat de toren stabiel blijft op tafel.",
  },
]

const materialTips: Card[] = [
  {
    title: "PLA Matte voor zicht",
    body: "Mat, strak en zonder glans. Perfect voor minis die je gaat primen en schilderen. Minder stringing bij kleine features en stabiele details.",
  },
  {
    title: "PLA Tough of PETG voor duurzaamheid",
    body: "Wil je minis die tegen vallen kunnen of scenery dat je vaak verplaatst? Kies PETG of een taaiere PLA-variant. Temperatuurbestendiger als de minis in een warme koffer zitten.",
  },
  {
    title: "TPU voor flexibele onderdelen",
    body: "Gebruik TPU voor rubber feet onder dice towers of voor dempers in transportcases. Beschermt verfwerk en voorkomt schuiven.",
  },
]

const prepList = [
  "Kies schaal (25/28/32/54 mm) en zorg dat het STL bestand geschaald is vÃ³Ã³r print.",
  "Noteer gewenste laaghoogte: 0,12 mm voor premium detail, 0,16 mm als balans tussen detail en kost.",
  "Geef aan welke zijde boven is (gezicht/ornamenten) om support-scars te vermijden.",
  "Voor speer/zwaard: check dikte >0,8 mm om breuk te vermijden; wij verstevigen indien nodig.",
  "Voeg bases samen of vraag pin-holes voor magneten (2x1 mm of 3x2 mm).",
  "Dice tower: deel in modules zodat de binnenhelling perfect glad blijft; wij lijmen of leveren los.",
]

const faq = [
  {
    q: "Welk materiaal is het beste voor tabletop minis?",
    a: "PLA Matte voor strak detail en een makkelijk te schuren oppervlak. PETG of PLA Tough als minis veel vallen of in warme tassen zitten. TPU voor rubber feet of dempers.",
  },
  {
    q: "Welke laaghoogte gebruiken jullie?",
    a: "Voor minis werken we meestal op 0,12-0,16 mm. Grotere props of terrain kunnen op 0,2 mm voor snellere doorlooptijd.",
  },
  {
    q: "Hoe worden supports gezet?",
    a: "We oriÃ«nteren minis zodat gezicht en details supportvrij blijven. Supports staan onder mantels, onderzijde van wapens en bases. Na verwijdering schuren we licht als je dat wil.",
  },
  {
    q: "Kan ik minis laten primen?",
    a: "Ja, we kunnen licht schuren en een grijze primerlaag zetten zodat je direct kunt schilderen.",
  },
  {
    q: "Hoe lever je minis veilig?",
    a: "Persoonlijke levering met elektrische wagen in zones rond Herzele/Gent/Antwerpen of stevig verpakt via pakketdienst. Breekbare onderdelen worden gescheiden ingepakt.",
  },
]

const articleJsonLd = buildArticleJsonLd({
  canonical,
  headline: "3D printen van miniaturen voor tabletop gaming",
  description:
    "Gids voor 3D printing van miniaturen en dice towers voor Dungeons & Dragons en Warhammer. Materialen, detailtips, supports, nabewerking en levering.",
  datePublished,
  dateModified,
})

export default function BlogMiniaturesPage() {
  return (
    <main className="relative overflow-clip">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-indigo-50" />
        <div className="absolute -top-32 -left-28 h-[26rem] w-[26rem] rounded-full bg-purple-200/30 blur-3xl sm:h-[32rem] sm:w-[32rem]" />
        <div className="absolute -bottom-32 -right-28 h-[28rem] w-[28rem] rounded-full bg-indigo-200/30 blur-3xl sm:h-[36rem] sm:w-[36rem]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px]" />
      </div>

      <section className="px-6 pb-12 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">Tabletop minis</p>
            <h1 className="mt-2 text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              3D printen van miniaturen voor Dungeons & Dragons en Warhammer
            </h1>
            <p className="mt-4 max-w-3xl text-pretty text-lg text-slate-700">
              Haarscherpe details, stevige bases en veilige levering. Zo printen we miniâ€™s, dice towers en scenery die
              direct klaar zijn om te primen, schilderen en te spelen aan je tafel.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ShimmerButton href="/contact">Upload je STL/STEP</ShimmerButton>
              <Link
                href="/pricing"
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                Bekijk prijzen
              </Link>
              <Link
                href="/segments/3d-printing-tabletop"
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                Segment tabletop minis
              </Link>
              <Link
                href="/portfolio"
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
              >
                Portfolio
              </Link>
            </div>
          </Reveal>

          <Reveal className="mt-8 grid gap-4 sm:grid-cols-3">
            {highlights.map((h) => (
              <GlassCard key={h.title} className="p-4">
                <div className="text-sm font-semibold text-slate-800">{h.title}</div>
                <p className="mt-2 text-sm text-slate-600">{h.body}</p>
              </GlassCard>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <Reveal>
            <GlassCard className="h-full p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Detailprinten zonder drama</h2>
              <p className="mt-3 text-sm text-slate-700">
                Miniaturen vragen balans tussen detail en stevigheid. Voor gezichten, capes en wapenranden kiezen we een
                fijne laaghoogte (0,12-0,16 mm) en plaatsen we supports alleen waar nodig. We richten het model zodat
                de zichtzijde supportvrij blijft. Dunne delen versterken we licht in de slicer zodat ze speelproof zijn.
              </p>
              <p className="mt-3 text-sm text-slate-700">
                Bases voegen we samen met het model of voorzien we van pin-holes voor magneten. Daardoor passen minis
                netjes op movement trays of terrain. Voor dice towers delen we de print in modules zodat de binnenhelling
                en vangbak glad blijven en dobbelstenen niet stuiteren op support scars.
              </p>
              <p className="mt-3 text-sm text-slate-700">
                Ontwerp/model is niet inbegrepen in de printkost. Lever een STL/STEP of vraag onze ontwerpservice aan â‚¬45/uur;
                wij optimaliseren voor printbaarheid en passen wanddiktes aan waar nodig.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {prepList.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.06}>
            <GlassCard className="h-full p-6">
              <h3 className="text-xl font-semibold tracking-tight text-slate-900">Voorbeelden</h3>
              <div className="mt-3 space-y-4">
                <div className="overflow-hidden rounded-2xl border border-white/50 bg-white/60 shadow">
                  <Image
                    src="/images/portfolio/dndMini.webp"
                    alt="3D geprinte DnD miniatuur in PLA Matte"
                    width={800}
                    height={600}
                    className="h-auto w-full object-cover"
                    sizes="(min-width: 1024px) 480px, 100vw"
                    priority
                  />
                  <div className="px-4 py-3 text-sm text-slate-700">
                    D&D mini in PLA Matte, 0,12 mm layerhoogte, licht geschuurd en primer-ready.
                  </div>
                </div>
                <div className="overflow-hidden rounded-2xl border border-white/50 bg-white/60 shadow">
                  <Image
                    src="/images/portfolio/diceTower.webp"
                    alt="3D geprinte dice tower in PETG met TPU pads"
                    width={800}
                    height={600}
                    className="h-auto w-full object-cover"
                    sizes="(min-width: 1024px) 480px, 100vw"
                  />
                  <div className="px-4 py-3 text-sm text-slate-700">
                    Dice tower in PETG met TPU-pads onderaan voor grip en demping.
                  </div>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal className="grid gap-4 sm:grid-cols-3">
            {materialTips.map((m) => (
              <GlassCard key={m.title} className="p-4">
                <div className="text-sm font-semibold text-slate-800">{m.title}</div>
                <p className="mt-2 text-sm text-slate-600">{m.body}</p>
              </GlassCard>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <Reveal>
            <GlassCard className="h-full p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Afwerking & schilderklaar</h2>
              <p className="mt-3 text-sm text-slate-700">
                Na het verwijderen van supports kunnen we licht schuren (korrel 400-600) en primen (grijs) zodat je
                meteen kan schilderen. Voor terrain of dice towers kunnen we naden verlijmen, kieren plamuren en de
                buitenzijde licht matteren voor betere verfhechting. Vermeld het in je aanvraag als je primer of
                montage wilt.
              </p>
              <p className="mt-3 text-sm text-slate-700">
                Verfadvies: primer-grijs voor minis, eventueel een zwarte preshade voor contrast. Gebruik dunne lagen om
                details scherp te houden. Bij PETG is een extra matte primer aan te raden voor maximale hechting.
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.05}>
            <GlassCard className="h-full p-6">
              <h3 className="text-xl font-semibold tracking-tight text-slate-900">Levering zonder schade</h3>
              <p className="mt-2 text-sm text-slate-700">
                Breekbare minis en scenery leveren we persoonlijk (elektrisch) in zones vanaf Herzele. We verpakken
                onderdelen gescheiden met schuim en kraftpapier. Verder dan 75 km? Dan schakelen we over op pakketdienst
                met dubbele doos en fragile-label.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>Zone 1 (tot 25 km): â‚¬15</li>
                <li>Zone 2 (25-50 km): â‚¬30</li>
                <li>Zone 3 (50-75 km): â‚¬45</li>
                <li>&gt; 75 km: maatwerk of pakketdienst</li>
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="p-6">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">FAQ: minis en dice towers</h2>
              <div className="mt-3 space-y-3">
                {faq.map((item) => (
                  <div key={item.q} className="rounded-xl border border-slate-200/70 bg-white/70 p-3">
                    <p className="text-sm font-semibold text-slate-800">{item.q}</p>
                    <p className="mt-1 text-sm text-slate-700">{item.a}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-700">
                Klaar om te printen? Stuur je bestand via{" "}
                <Link href="/contact" className="text-indigo-700 underline underline-offset-2">
                  contact
                </Link>{" "}
                met schaal, materiaal en leverzone. We antwoorden doorgaans binnen een werkdag.
              </p>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <BlogReadMore />

    </main>
  )
}





