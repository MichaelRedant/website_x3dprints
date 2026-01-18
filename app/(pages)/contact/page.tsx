// app/(pages)/contact/page.tsx
import type { Metadata } from "next"
import { Suspense } from "react"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import GlassOrb from "@/components/GlassOrb"
import ContactForm from "@/components/ContactForm"
import { normalizeLocale } from "@/lib/i18n/locales"

const NL_METADATA: Metadata = {
  title: "Contact | X3DPrints",
  description:
    "Vraag een offerte aan voor 3D printen: prototypes of kleine series. Snel, duidelijk en zonder onzin. Regio Herzele/Gent.",
  alternates: {
    canonical: "https://www.x3dprints.be/contact",
    languages: {
      "nl-BE": "https://www.x3dprints.be/contact",
      en: "https://www.x3dprints.be/en/contact",
    },
  },
  openGraph: {
    title: "Contact | X3DPrints",
    description:
      "Vraag een offerte aan voor 3D printen in PLA, PETG of TPU. Korte lijnen, helder over prijs en levertijd.",
    url: "https://www.x3dprints.be/contact",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    locale: "nl_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

export const EN_METADATA: Metadata = {
  title: "Contact | X3DPrints Belgium",
  description:
    "Request a 3D printing quote: prototypes or small batches. Fast, clear and no fluff. Based in Herzele/Ghent region.",
  alternates: {
    canonical: "https://www.x3dprints.be/en/contact",
    languages: {
      "nl-BE": "https://www.x3dprints.be/contact",
      en: "https://www.x3dprints.be/en/contact",
    },
  },
  openGraph: {
    title: "Contact | X3DPrints Belgium",
    description:
      "Request a quote for PLA, PETG or TPU prints. Direct communication, clear on price and lead time.",
    url: "https://www.x3dprints.be/en/contact",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

export const metadata: Metadata = NL_METADATA

const NL_COPY = {
  heroTitle: "Offerte of vraag? Laat maar komen.",
  heroIntro: "STL link, korte context en gewenst materiaal volstaan. Je krijgt snel een heldere prijs en timing.",
  formHeading: "Contactformulier",
  formIntro: "Vul zo concreet mogelijk in. Voeg link(s) naar STL/STEP toe in het bericht.",
  formLoading: "Formulier wordt geladen...",
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
  ],
  jsonLdUrl: "https://www.x3dprints.be/contact",
  description: NL_METADATA.description ?? "",
}

const EN_COPY = {
  heroTitle: "Quote or question? Happy to help.",
  heroIntro: "A STL link, short context and preferred material are enough. You'll get a clear price and lead time quickly.",
  formHeading: "Contact form",
  formIntro: "Be as specific as you can. Add link(s) to STL/STEP in your message.",
  formLoading: "Loading form...",
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
  ],
  jsonLdUrl: "https://www.x3dprints.be/en/contact",
  description: EN_METADATA.description ?? "",
}

type PageProps = { searchParams?: Promise<{ lang?: string } | undefined>; locale?: string }

export default function ContactPage({ locale }: PageProps) {
  const normalizedLocale = normalizeLocale(locale)
  const isEn = normalizedLocale === "en"
  const copy = isEn ? EN_COPY : NL_COPY

  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    mainEntityOfPage: copy.jsonLdUrl,
    description: copy.description,
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  }

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
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
            <Reveal>
              <GlassCard className="p-6 sm:p-8">
                <h2 className="text-xl font-semibold text-slate-900">{copy.formHeading}</h2>
                <p className="mt-1 text-sm text-slate-600">{copy.formIntro}</p>
                <div className="mt-6">
                  <Suspense fallback={<div className="text-sm text-slate-500">{copy.formLoading}</div>}>
                    <ContactForm />
                  </Suspense>
                </div>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.08}>
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
            </Reveal>
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  )
}
