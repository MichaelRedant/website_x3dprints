import type { Metadata } from "next"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import BlogReadMore from "@/components/BlogReadMore"

const canonical = "https://www.x3dprints.be/en/blog/3d-printen-in-de-buurt"

export const metadata: Metadata = {
  title: "Local 3D printing near Ghent, Aalst and Dendermonde | X3DPrints",
  description:
    "Looking for a 3D printing service near Ghent, Aalst or Dendermonde? X3DPrints produces in Herzele with pickup, delivery and local examples.",
  alternates: {
    canonical,
    languages: {
      "nl-BE": "https://www.x3dprints.be/blog/3d-printen-in-de-buurt",
      en: canonical,
    },
  },
  openGraph: {
    title: "Local 3D printing near Ghent, Aalst and Dendermonde",
    description:
      "X3DPrints produces in Herzele and delivers in Ghent, Aalst and Dendermonde. See examples, logistics and how to get a fast quote.",
    url: canonical,
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630, alt: "Local 3D printing" }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: {
    card: "summary_large_image",
    title: "Local 3D printing",
    description: "Local 3D printing service for Ghent, Aalst and Dendermonde: examples, logistics and personal follow-up.",
    images: ["/images/og-home.jpg"],
  },
}

const cityCards = [
  {
    city: "Ghent",
    info: "Pickup is a 20-minute drive. Ideal for agencies, makers and schools. Personal delivery for larger projects is possible.",
    examples: "Retail displays for Ghent concept stores, parts for UGent student projects.",
  },
  {
    city: "Aalst",
    info: "Herzele sits right next to Aalst. Combine multiple parts and pick them up in one trip.",
    examples: "Industrial custom work, assembly tools for SMEs in Aalst and Ninove.",
  },
  {
    city: "Dendermonde",
    info: "Regular runs towards Dendermonde for agencies and events. Alternative: Bpost with track & trace within 24-48h.",
    examples: "Branding props, booth materials and prototypes for creative agencies.",
  },
]

const process = [
  "Upload STL/STEP plus short context via the viewer or email.",
  "Receive feedback on material, timing and price within one business day.",
  "Pick logistics: pickup in Herzele, Bpost, or personal delivery (Ghent/Aalst/Dendermonde).",
  "Pay by invoice or bank transfer; repeat orders move even faster.",
]

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Local 3D printing near Ghent, Aalst and Dendermonde",
  description:
    "Local guide for 3D printing in Ghent, Aalst and Dendermonde with logistics options and examples of delivered projects.",
  author: {
    "@type": "Organization",
    name: "X3DPrints",
    url: "https://www.x3dprints.be",
  },
  publisher: {
    "@type": "Organization",
    name: "X3DPrints",
    url: "https://www.x3dprints.be",
    logo: {
      "@type": "ImageObject",
      url: "https://www.x3dprints.be/Logo.webp",
    },
  },
  mainEntityOfPage: canonical,
  url: canonical,
  inLanguage: "en-BE",
}

export default function LocalArticleEnPage() {
  return (
    <main className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(150%_85%_at_50%_-15%,rgba(99,102,241,0.16),transparent_70%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid-slate-200/[0.07]" />

      <section className="px-6 pb-12 pt-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal className="stacked-content">
            <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
              <ol className="flex flex-wrap gap-2">
                <li>
                  <Link
                    href="/en/blog"
                    className="font-medium text-indigo-600 transition hover:text-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Blog
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="font-medium text-slate-700">Local 3D printing</li>
              </ol>
            </nav>
            <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Local 3D printing: Ghent, Aalst and Dendermonde
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              X3DPrints prints in Herzele (between Ghent and Aalst) and also delivers in Dendermonde. No factory floor - just one point of contact that
              follows your project personally.
            </p>
            <div className="stacked-actions mt-6 flex flex-wrap gap-3 justify-center sm:justify-start">
              <ShimmerButton href="/en/contact">Plan pickup or delivery</ShimmerButton>
              <Link
                href="/en/portfolio"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                View examples
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {cityCards.map((city) => (
            <Reveal key={city.city}>
              <GlassCard className="h-full border border-white/40 bg-white/80 p-6 shadow-lg backdrop-blur">
                <h2 className="text-xl font-semibold text-slate-900">{city.city}</h2>
                <p className="mt-2 text-sm text-slate-600">{city.info}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Examples</p>
                <p className="text-sm text-slate-600">{city.examples}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg backdrop-blur">
              <h2 className="text-2xl font-semibold text-slate-900">How we handle local projects</h2>
              <ol className="mt-4 space-y-3 text-sm text-slate-600">
                {process.map((step, index) => (
                  <li key={step} className="flex gap-3">
                    <span className="font-semibold text-slate-900">{index + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <GlassCard className="flex flex-col gap-6 border border-white/40 bg-white/85 p-6 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">Next step</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Need a pickup slot?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Share your timeline and we will reserve machine hours plus the pickup or delivery slot that suits you best.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <ShimmerButton href="/en/contact">Schedule pickup</ShimmerButton>
                <Link href="/en/3d-modellen-vinden" className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700">
                  No model yet? Find one here
                </Link>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <BlogReadMore />
    </main>
  )
}
