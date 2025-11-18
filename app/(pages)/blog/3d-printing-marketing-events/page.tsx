import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"

const canonical = "https://www.x3dprints.be/blog/3d-printing-marketing-events"

export const metadata: Metadata = {
  title: "3D printing voor marketing & events | X3DPrints Blog",
  description:
    "Ontdek hoe 3D printing campagnes versterkt: props, awards en merch met korte lijnen. Inclusief planningstips, materiaaladvies en KPI-ideeën.",
  alternates: { canonical },
  openGraph: {
    title: "3D printing voor marketing & events",
    description:
      "Handleiding voor marketeers om 3D printing strategisch in te zetten: van briefing tot logistiek en metingen.",
    url: canonical,
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "3D printing marketing props" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "3D printing voor marketing & events",
    description: "Plan eye-catching props en awards met een lokale 3D print partner. Tips voor timing, materialen en ROI.",
    images: ["/images/og-home.jpg"],
  },
}

const personaHighlights = [
  {
    title: "Brand & campaign managers",
    copy: "Snel kleine runs voor activaties of roadshows. Denk aan awards, photobooth props en samples die klanten meenemen.",
  },
  {
    title: "Event bureaus",
    copy: "Lichte, modulaire displays die je per locatie kunt aanpassen. 3D printing laat je tot vlak voor de show itereren.",
  },
  {
    title: "Retail & trade marketing",
    copy: "POS-materialen met magnetische inserts, producthouders en custom labels die perfect in het schap passen.",
  },
]

const planningSteps = [
  {
    title: "Briefing & doel",
    detail:
      "Omschrijf het campagnedoel, gewenste look & feel en KPI’s (organisatie, shares, leads). Voeg renders of brand guidelines toe.",
  },
  {
    title: "Materialen & prototypes",
    detail:
      "Test PLA Silk+ voor hoogglans of PLA Marble voor stone-look. Voor lichtdoorlatende props is PLA Translucent perfect voor LED’s.",
  },
  {
    title: "Productie & logistiek",
    detail:
      "Plan een buffer van enkele werkdagen voor iteraties. Combineer leveringen met lokale afhaling in Herzele of verzekerd transport.",
  },
]

const kpiIdeas = [
  "Traceerbare QR codes of NFC tags in props om campagneconversie te meten.",
  "Giveaways nummeren zodat winnaars zich registreren en leads opleveren.",
  "Use cases filmen voor social media: behind the scenes scoort hoog in engagement.",
]

const ctaLinks = [
  { label: "Materialen voor eye-catchers", href: "/materials#material-suggestion-tool" },
  { label: "Segment: marketing & events", href: "/segments/3d-printing-marketing" },
  { label: "Portfolio inspiratie", href: "/portfolio" },
]

const faq = [
  {
    q: "Welke materialen vallen het meest op tijdens events?",
    a: "PLA Silk+ geeft een metallic glans, PLA Marble voelt premium aan en PLA Translucent laat LED-licht diffuus door. We stemmen kleur, textuur en infill af op jouw briefing.",
  },
  {
    q: "Hoe snel kan X3DPrints leveren?",
    a: "Omdat X3DPrints een éénmansstudio is plannen we realistisch: standaard enkele werkdagen, met prioriteit mogelijk als de agenda het toelaat. We communiceren transparant zodat je campagneplanning klopt.",
  },
  {
    q: "Kunnen jullie mee nadenken over montage of interactie?",
    a: "Zeker. Denk aan magnetische inserts, draadgaten, verborgen LED-kanalen of integratie met NFC tags. We maken testprints zodat alles meteen past.",
  },
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "3D printing voor marketing & events",
  description:
    "Strategische gids voor marketeers en event teams die 3D printing willen inzetten voor props, awards en merchandising.",
  author: {
    "@type": "Person",
    name: "X3DPrints",
  },
  publisher: {
    "@type": "Organization",
    name: "X3DPrints",
    logo: {
      "@type": "ImageObject",
      url: "https://www.x3dprints.be/images/brand-logo.png",
    },
  },
  mainEntityOfPage: canonical,
  datePublished: "2025-11-18",
}

export default function MarketingArticlePage() {
  return (
    <article className="relative overflow-hidden px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-amber-50" />
        <div className="absolute left-0 top-[-15%] h-[22rem] w-[22rem] rounded-full bg-amber-200/40 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-5%] h-[28rem] w-[28rem] rounded-full bg-rose-200/40 blur-[140px]" />
      </div>

      <header className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Blog</p>
        <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          3D printing voor marketing & events
        </h1>
        <p className="mt-4 text-base text-slate-600">
          Eye-catching props en awards laten campagnes spreken. We delen hoe je van briefing tot logistiek het meeste haalt uit een lokale 3D print studio.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
          <ShimmerButton href="/contact?material=PLA%20Silk%2B">Vraag offerte of advies</ShimmerButton>
          <Link
            href="/segments/3d-printing-marketing"
            className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm"
          >
            Segment marketing & events
          </Link>
        </div>
      </header>

      <Reveal className="mx-auto mt-12 max-w-5xl space-y-6">
        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Wanneer 3D printing het verschil maakt</h2>
          <p className="mt-3 text-sm text-slate-600">
            Campagnes en events hebben formaat-, kleur- en deadline-eisen waar traditionele productie niet op inspeelt. 3D printing geeft je de vrijheid om snel te itereren, iets tastbaars te tonen en toch binnen budget te blijven.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {personaHighlights.map((persona) => (
              <div key={persona.title} className="rounded-3xl border border-white/40 bg-white/70 p-4 text-sm text-slate-600">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{persona.title}</p>
                <p className="mt-2 text-slate-700">{persona.copy}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Planning in drie stappen</h2>
          <div className="mt-4 space-y-3">
            {planningSteps.map((step, index) => (
              <div key={step.title} className="rounded-3xl border border-slate-200/70 bg-white/70 p-4 text-sm text-slate-600">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Stap {index + 1}: {step.title}
                </p>
                <p className="mt-1 text-slate-700">{step.detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Tip: plan een korte videocall zodra de campagne groen licht krijgt zodat we meteen materiaalstalen kunnen klaarleggen.
          </p>
        </GlassCard>

        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Meet wat werkt</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {kpiIdeas.map((idea) => (
              <li key={idea} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden />
                <span>{idea}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-slate-600">
            Combineer tastbare props met een digitale journey. Bijvoorbeeld: een award met NFC die bezoekers naar je calculator of portfolio leidt zodat ze meteen converteren.
          </p>
        </GlassCard>

        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Veelgestelde vragen</h2>
          <div className="mt-4 space-y-4">
            {faq.map((item) => (
              <div key={item.q} className="rounded-3xl border border-slate-200/70 bg-white/70 p-4">
                <p className="text-sm font-semibold text-slate-900">{item.q}</p>
                <p className="mt-2 text-sm text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Handige links</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {ctaLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-3xl border border-slate-200/80 bg-white/70 px-4 py-3 text-sm font-semibold text-indigo-600 transition hover:-translate-y-0.5 hover:bg-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Nog geen idee welk materiaal je nodig hebt? Gebruik de Material Suggestion Tool of plan een call zodat we samen een voorstel doen.
          </p>
        </GlassCard>
      </Reveal>

      <section className="mx-auto mt-12 max-w-4xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Volgende stap</p>
        <h2 className="mt-3 text-balance text-3xl font-bold text-slate-900">Klaar om je props te laten printen?</h2>
        <p className="mt-3 text-sm text-slate-600">
          Dien je briefing in via de contactpagina of upload een STL in de 3D viewer. Je ontvangt een transparante planning die past bij je activatie.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
          <ShimmerButton href="/contact?material=PLA%20Silk%2B">Plan een gesprek</ShimmerButton>
          <Link
            href="/viewer"
            className="rounded-full border border-slate-300/70 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm"
          >
            Upload een STL
          </Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    </article>
  )
}

