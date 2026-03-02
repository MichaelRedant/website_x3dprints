// app/(pages)/contact/page.tsx
import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { Clock3, MapPin, Target } from "lucide-react"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import GlassOrb from "@/components/GlassOrb"
import ContactForm from "@/components/ContactForm"
import HeroTrustBar, { type HeroTrustItem } from "@/components/HeroTrustBar"
import LeadTimeStatus from "@/components/LeadTimeStatus"
import QuickContactActions from "@/components/QuickContactActions"
import ContentTableOfContents from "@/components/ContentTableOfContents"
import ReadMoreLinks from "@/components/ReadMoreLinks"
import { localizeHref } from "@/lib/i18n/paths"
import { buildFaqPageSchema } from "@/lib/seo"

const NL_METADATA: Metadata = {
  title: "Contact voor 3D printen in Belgie voor bedrijven en particulieren | X3DPrints",
  description:
    "Vraag een offerte aan voor 3D printen in Belgie voor bedrijven en particulieren: onderdelen, organizers, prototypes, etalage-items en maatwerk. Snelle reactie met duidelijke prijs en timing.",
  alternates: {
    canonical: "https://www.x3dprints.be/contact/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/contact/",
      "en-BE": "https://www.x3dprints.be/en/contact/",
      "x-default": "https://www.x3dprints.be/contact/",
    },
  },
  openGraph: {
    title: "Contact voor 3D printen in Belgie | X3DPrints",
    description:
      "Vraag een offerte aan voor onderdelen, organizers, prototypes en maatwerk in PLA, PETG of TPU. Lokale service met heldere prijs en levertijd.",
    url: "https://www.x3dprints.be/contact/",
    images: [{ url: "/images/og-contact-nl.svg", width: 1200, height: 630, alt: "Contact X3DPrints" }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact X3DPrints | 3D print offerte in Belgie",
    description: "Offerte voor bedrijven en particulieren: onderdelen, organizers, prototypes en maatwerk met duidelijke prijs en planning.",
    images: ["/images/og-contact-nl.svg"],
  },
}

const EN_METADATA: Metadata = {
  title: "Contact for custom 3D printing in Belgium | X3DPrints",
  description:
    "Request a 3D printing quote in Belgium for businesses and individuals: parts, organizers, prototypes, retail items and custom pieces. Fast response and clear pricing.",
  alternates: {
    canonical: "https://www.x3dprints.be/en/contact/",
    languages: {
      "nl-BE": "https://www.x3dprints.be/contact/",
      "en-BE": "https://www.x3dprints.be/en/contact/",
      "x-default": "https://www.x3dprints.be/contact/",
    },
  },
  openGraph: {
    title: "Contact for custom 3D printing in Belgium | X3DPrints",
    description:
      "Request a quote for parts, organizers, prototypes and custom pieces in PLA, PETG or TPU. Direct communication with clear pricing and lead time.",
    url: "https://www.x3dprints.be/en/contact/",
    images: [{ url: "/images/og-contact-en.svg", width: 1200, height: 630, alt: "Contact X3DPrints" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact X3DPrints | 3D printing quote in Belgium",
    description: "Quotes for businesses and individuals with clear pricing and lead-time follow-up.",
    images: ["/images/og-contact-en.svg"],
  },
}

export const metadata: Metadata = NL_METADATA

const NL_COPY = {
  heroTitle: "Offerte of vraag over 3D printen in Belgie?",
  heroIntro:
    "STL-link, korte context en gewenst materiaal volstaan. Van onderdelen en organizers tot prototypes, etalage-items en persoonlijke stukken: je krijgt snel een heldere prijs en timing, meestal binnen 24 uur.",
  formHeading: "Contactformulier",
  formIntro: "Vul zo concreet mogelijk in. Voeg link(s) naar STL/STEP toe in het bericht.",
  formLoading: "Formulier wordt geladen...",
  quickStartTitle: "Snelle start (met prefill)",
  quickStartIntro: "Kies je meest voorkomende scenario. We vullen materiaal en prijscontext meteen voor je in.",
  directHeading: "Direct",
  emailLabel: "E-mail",
  regionLabel: "Regio",
  regionValue: "Herzele - leveringen in groot Gent/Aalst mogelijk",
  filesLabel: "Bestanden",
  filesValue: "STL, STEP. Voeg de link, tolerantie of afwerking toe in je beschrijving.",
  helpfulHeading: "Handig om te vermelden",
  helpfulItems: [
    "Toepassing en omgeving (binnen/buiten, warmte/UV)",
    "Gewenst materiaal (PLA, PETG, TPU, etc.) en kleur",
    "Afwerking: rauw, geschuurd, geprimed, gelakt",
    "Aantal stuks en gewenste leverdatum",
  ],
  faq: [
    {
      q: "Hoe snel krijg ik antwoord?",
      a: "Meestal binnen 24 uur. Voeg STL/STEP en gewenste timing toe voor een gericht voorstel.",
    },
    {
      q: "Welke bestanden kan ik doorsturen?",
      a: "STL en STEP zijn ideaal. Vermeld kritieke maten, toepassing en gewenst materiaal.",
    },
    {
      q: "Kunnen jullie materiaal adviseren?",
      a: "Ja. Geef door waarvoor het onderdeel dient; we matchen PLA, PETG of TPU en delen advies in de reply.",
    },
    {
      q: "Kan ik al aanvragen zonder perfect bestand?",
      a: "Ja. Deel wat je al hebt (link, foto of korte beschrijving). We helpen je met de volgende stap richting een printbaar model.",
    },
  ],
  jsonLdUrl: "https://www.x3dprints.be/contact/",
  description: NL_METADATA.description ?? "",
}

const EN_COPY = {
  heroTitle: "Quote or question for custom 3D printing?",
  heroIntro: "A STL link, short context and preferred material are enough. From parts and organizers to prototypes, retail items and personalized pieces, you'll get a clear price and lead time quickly, usually within 24 hours.",
  formHeading: "Contact form",
  formIntro: "Be as specific as you can. Add link(s) to STL/STEP in your message.",
  formLoading: "Loading form...",
  quickStartTitle: "Quick start (prefilled)",
  quickStartIntro: "Pick your common scenario and we prefill material and pricing context right away.",
  directHeading: "Direct",
  emailLabel: "Email",
  regionLabel: "Region",
  regionValue: "Herzele – deliveries in Greater Ghent/Aalst possible",
  filesLabel: "Files",
  filesValue: "STL, STEP. Add the link, tolerance or finish in your description.",
  helpfulHeading: "Useful to mention",
  helpfulItems: [
    "Application and environment (indoor/outdoor, heat/UV)",
    "Preferred material (PLA, PETG, TPU, etc.) and colour",
    "Finish: raw, sanded, primed, painted",
    "Quantity and desired delivery date",
  ],
  faq: [
    {
      q: "How fast do I get a reply?",
      a: "Usually within 24 hours. Add STL/STEP and desired timing for a targeted proposal.",
    },
    {
      q: "Which files can I send?",
      a: "STL and STEP are ideal. Mention critical dimensions, use case and desired material.",
    },
    {
      q: "Can you advise on material?",
      a: "Yes. Tell us what the part is for; we match PLA, PETG or TPU and share advice in the reply.",
    },
    {
      q: "Can I request a quote without a perfect file yet?",
      a: "Yes. Share what you have (link, photo or short brief). We guide the next step towards a printable model.",
    },
  ],
  jsonLdUrl: "https://www.x3dprints.be/en/contact/",
  description: EN_METADATA.description ?? "",
}

const resolveLocaleOverride = (props: unknown): "nl" | "en" => {
  if (typeof props !== "object" || props === null) {
    return "nl"
  }
  const localeOverride = (props as { localeOverride?: unknown }).localeOverride
  return localeOverride === "en" ? "en" : "nl"
}

export default function ContactPage(props: unknown) {
  const normalizedLocale = resolveLocaleOverride(props)
  const isEn = normalizedLocale === "en"
  const copy = isEn ? EN_COPY : NL_COPY
  const localize = (href: string) => localizeHref(href, normalizedLocale)
  const tocItems = isEn
    ? [
        { id: "contact-quick", label: "What is the fastest way to start?" },
        { id: "contact-form", label: "How to request a quote?" },
        { id: "contact-direct", label: "How can you contact us directly?" },
        { id: "contact-faq", label: "FAQ before you submit" },
        { id: "contact-sources", label: "Sources and references" },
      ]
    : [
        { id: "contact-quick", label: "Wat is de snelste manier om te starten?" },
        { id: "contact-form", label: "Hoe vraag je een offerte aan?" },
        { id: "contact-direct", label: "Hoe contacteer je ons direct?" },
        { id: "contact-faq", label: "FAQ voor je verzendt" },
        { id: "contact-sources", label: "Bronnen en referenties" },
      ]
  const references = isEn
    ? [
        { label: "Google structured data docs", url: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data" },
        { label: "Prusa material guide (PLA, PETG, TPU)", url: "https://help.prusa3d.com/filament-material-guide" },
        { label: "ISO/ASTM additive manufacturing terminology", url: "https://www.astm.org/f2997-13r21.html" },
      ]
    : [
        { label: "Google documentatie over structured data", url: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data" },
        { label: "Prusa materiaalgids (PLA, PETG, TPU)", url: "https://help.prusa3d.com/filament-material-guide" },
      { label: "ISO/ASTM terminologie voor additive manufacturing", url: "https://www.astm.org/f2997-13r21.html" },
    ]
  const lastUpdatedLabel = isEn ? "Last updated: February 6, 2026" : "Laatst bijgewerkt: 6 februari 2026"
  const readMoreCopy = isEn
    ? {
        title: "Continue planning your 3D print project",
        intro: "Jump to services, materials or pricing before you submit your quote.",
      }
    : {
        title: "Verder plannen voor je 3D print project",
        intro: "Ga door naar services, materialen of pricing voor je je offerte verstuurt.",
      }
  const heroTrustFacts: HeroTrustItem[] = isEn
    ? [
        { icon: MapPin, label: "Local studio & region", value: "Herzele, Ghent and all of Belgium" },
        { icon: Clock3, label: "Response speed", value: "First answer usually within 24 hours" },
        { icon: Target, label: "Use-case focus", value: "Quotes for parts, organizers, prototypes and custom pieces" },
      ]
    : [
        { icon: MapPin, label: "Lokale studio & regio", value: "Herzele, Gent en heel Belgie" },
        { icon: Clock3, label: "Reactiesnelheid", value: "Eerste antwoord meestal binnen 24 uur" },
        { icon: Target, label: "Use-case focus", value: "Offertes voor onderdelen, organizers, prototypes en maatwerk" },
      ]

  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    mainEntityOfPage: copy.jsonLdUrl,
    description: copy.description,
  }

  const faqJsonLd = buildFaqPageSchema({
    inLanguage: isEn ? "en-BE" : "nl-BE",
    mainEntityOfPage: copy.jsonLdUrl,
    items: copy.faq,
  })

  const quickStartItems = isEn
    ? [
        {
          title: "Prototype in PLA",
          description: "Fast baseline quote for a first prototype or fit check.",
          href: localize(`/contact?material=pla-matte&quote=${encodeURIComponent("Prototype request with PLA Matte baseline")}`),
        },
        {
          title: "Marketing prop",
          description: "Short-run visual props with Silk/Marble style options.",
          href: localize(`/contact?material=pla-silk&quote=${encodeURIComponent("Marketing prop run with visual finish focus")}`),
        },
        {
          title: "Outdoor/functional part",
          description: "PETG-first route for stronger use in real conditions.",
          href: localize(`/contact?material=petg&quote=${encodeURIComponent("Functional part request with PETG baseline")}`),
        },
      ]
    : [
        {
          title: "Prototype in PLA",
          description: "Snelle basisofferte voor een eerste prototype of fit check.",
          href: localize(`/contact?material=pla-matte&quote=${encodeURIComponent("Prototype aanvraag met PLA Matte basis")}`),
        },
        {
          title: "Marketing prop",
          description: "Kleine en grotere oplage visuele props met Silk/Marble afwerking.",
          href: localize(`/contact?material=pla-silk&quote=${encodeURIComponent("Marketing prop aanvraag met focus op visuele afwerking")}`),
        },
        {
          title: "Outdoor/functioneel onderdeel",
          description: "PETG-startpunt voor sterkere inzet in echte omstandigheden.",
          href: localize(`/contact?material=petg&quote=${encodeURIComponent("Functioneel onderdeel met PETG als basis")}`),
        },
      ]

  return (
    <main className="relative">
      {/* decor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(99,102,241,.18),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.07]" />

      <section className="relative px-6 pb-24 pt-20 sm:px-8 lg:px-12 lg:pb-32 lg:pt-28">
        <div className="absolute right-6 top-8 -z-10 hidden sm:block">
          <GlassOrb className="h-60 w-60 opacity-40" />
        </div>

        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-8 max-w-2xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              {copy.heroTitle}
            </h1>
            <p className="mt-3 text-lg text-slate-600">{copy.heroIntro}</p>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-slate-500">{lastUpdatedLabel}</p>
            <LeadTimeStatus locale={normalizedLocale} className="mt-6 max-w-2xl" />
            <HeroTrustBar items={heroTrustFacts} className="mt-6" />
            <QuickContactActions
              locale={normalizedLocale}
              trackingCategory="contact_hero"
              showQuote={false}
              className="mt-6"
            />
            <ContentTableOfContents
              title={isEn ? "Contents" : "Inhoud"}
              items={tocItems}
              className="mt-6"
            />
          </Reveal>

          <div id="contact-quick" className="scroll-mt-28 mb-8">
            <Reveal>
              <GlassCard className="p-6 sm:p-8">
                <h2 className="text-xl font-semibold text-slate-900">{copy.quickStartTitle}</h2>
                <p className="mt-2 text-sm text-slate-600">{copy.quickStartIntro}</p>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  {quickStartItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="rounded-xl border border-slate-200/70 bg-white/80 p-4 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
                    >
                      <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                      <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                    </Link>
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
            <Reveal>
              <div id="contact-form" className="scroll-mt-28">
                <GlassCard className="p-6 sm:p-8">
                  <h2 className="text-xl font-semibold text-slate-900">{copy.formHeading}</h2>
                  <p className="mt-1 text-sm text-slate-600">{copy.formIntro}</p>
                  <div className="mt-6">
                    <Suspense fallback={<div className="text-sm text-slate-500">{copy.formLoading}</div>}>
                      <ContactForm />
                    </Suspense>
                  </div>
                </GlassCard>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div id="contact-direct" className="scroll-mt-28">
                <GlassCard className="p-6 sm:p-8">
                  <h2 className="text-xl font-semibold text-slate-900">{copy.directHeading}</h2>
                  <div className="mt-3 space-y-3 text-sm text-slate-700">
                    <p>
                      <span className="block text-slate-500">{copy.emailLabel}</span>
                      <a className="font-medium underline decoration-slate-300 hover:decoration-slate-600" href="mailto:michael@xinudesign.be">
                        michael@xinudesign.be
                      </a>
                    </p>
                    <p>
                      <span className="block text-slate-500">{copy.regionLabel}</span>
                      {copy.regionValue}
                    </p>
                    <p>
                      <span className="block text-slate-500">{copy.filesLabel}</span>
                      {copy.filesValue}
                    </p>
                    <div className="pt-2">
                      <h3 className="text-sm font-semibold text-slate-900">{copy.helpfulHeading}</h3>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
                        {copy.helpfulItems.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </Reveal>
          </div>

          <div id="contact-faq" className="scroll-mt-28 mt-8">
            <Reveal>
              <GlassCard className="p-6 sm:p-8">
                <h2 className="text-xl font-semibold text-slate-900">{isEn ? "FAQ before you submit" : "FAQ voor je verzendt"}</h2>
                <div className="mt-4 space-y-3 text-sm text-slate-700">
                  {copy.faq.map((item) => (
                    <div key={item.q} className="rounded-xl border border-slate-200/70 bg-white/80 p-4">
                      <p className="text-base font-semibold text-slate-900">{item.q}</p>
                      <p className="mt-1 text-slate-700">{item.a}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          </div>

          <ReadMoreLinks
            pageType="contact"
            title={readMoreCopy.title}
            intro={readMoreCopy.intro}
          />

          <div id="contact-sources" className="scroll-mt-28 mt-8">
            <Reveal>
              <GlassCard className="p-6 sm:p-8">
                <h2 className="text-xl font-semibold text-slate-900">{isEn ? "Sources and references" : "Bronnen en referenties"}</h2>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {references.map((reference) => (
                    <li key={reference.url} className="rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3">
                      <cite className="not-italic">
                        <Link href={reference.url} target="_blank" rel="noreferrer" className="font-semibold text-indigo-600 hover:text-indigo-500">
                          {reference.label}
                        </Link>
                      </cite>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  )
}


