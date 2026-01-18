import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import GlassCard from "@/components/GlassCard"
import ShimmerButton from "@/components/ShimmerButton"
import Faq from "@/components/Faq"

export const metadata: Metadata = {
  title: "Valentine 3D prints on demand | X3DPrints",
  description:
    "Heart decor, nameplates and personalised gifts in Silk, Matte and Translucent PLA. Design file not included; send STL/STEP or choose our design service.",
  alternates: {
    canonical: "https://www.x3dprints.be/en/valentijn-3d-printen",
    languages: {
      "nl-BE": "https://www.x3dprints.be/valentijn-3d-printen",
      en: "https://www.x3dprints.be/en/valentijn-3d-printen",
    },
  },
  openGraph: {
    title: "Valentine 3D prints on demand",
    description:
      "Valentine gifts with gloss or glow. Silk/Matte/Translucent PLA, LED cut-outs and delivery options in Flanders.",
    url: "https://www.x3dprints.be/en/valentijn-3d-printen",
    images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    locale: "en_BE",
    siteName: "X3DPrints",
  },
  twitter: { card: "summary_large_image" },
}

const ideas = [
  "Heart-shaped nameplates, ring trays and keychains with text or logo.",
  "Light objects in Translucent PLA with space for fairy lights.",
  "Giftbox inserts, card clips and centrepieces in Silk or Marble PLA.",
  "Window props for retail/hospitality with magnets or glue points.",
]

const workflow = [
  "Send STL/STEP or choose design service (EUR 45/hour).",
  "Pick material: Silk/Marble for gloss, Matte for soft look, Translucent for light.",
  "Note finish (raw, lightly sanded, primed) and delivery option (EV zone or parcel).",
  "We plan together toward 14 February without overpromising.",
]

const faqItems = [
  {
    q: "Which materials work best for Valentine prints?",
    a: "Silk or Marble PLA for luxe gifts, Matte PLA for soft pastels, Translucent PLA for light objects. TPU for anti-slip feet under trays.",
  },
  {
    q: "Is design included?",
    a: "No. Send your STL/STEP or let us design at EUR 45/hour. We optimise wall thickness, text and supports.",
  },
  {
    q: "How about delivery?",
    a: "EV zones in Flanders (depending on distance) or parcel service. Pickup in Herzele is free. Fragile pieces are packed separately.",
  },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",

  inLanguage: "en-BE",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
}

export default function ValentinesLandingPage() {
  return (
    <main className="relative overflow-clip">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-amber-50" />
        <div className="absolute left-10 top-[-10%] h-[24rem] w-[24rem] rounded-full bg-rose-200/40 blur-[140px]" />
        <div className="absolute right-0 bottom-[-25%] h-[28rem] w-[28rem] rounded-full bg-amber-200/35 blur-[160px]" />
      </div>

      <section className="px-6 pb-16 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Seasonal</p>
          <h1 className="mt-3 text-balance text-4xl font-extrabold text-slate-900 sm:text-5xl">Valentine 3D prints on demand</h1>
          <p className="mt-4 max-w-3xl text-pretty text-lg text-slate-700">
            Heart decor, nameplates and personalised gifts in Silk, Matte and Translucent PLA. Design not included; send STL/STEP or choose design service at EUR 45/hour. Delivery via EV zones or parcel service.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ShimmerButton href="/contact?material=pla-silk-plus">Plan your Valentine print</ShimmerButton>
            <Link
              href="/segments/3d-printing-valentijn"
              className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
            >
              To Valentine segment
            </Link>
            <Link
              href="/materials#material-suggestion-tool"
              className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
            >
              Material Suggestion Tool
            </Link>
            <Link
              href="/blog/3d-printen-valentijn"
              className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur hover:bg-white/20"
            >
              Read the blog
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <GlassCard className="p-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Ideas for Valentine</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {ideas.map((idea) => (
                <li key={idea} className="flex gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-rose-500" aria-hidden />
                  <span>{idea}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-slate-700">
              Find inspiration on{" "}
              <Link
                href="https://www.printables.com"
                className="text-rose-700 underline"
                target="_blank"
                rel="noreferrer"
              >
                Printables (external)
              </Link>{" "}
              and share references; we will align material and finish.
            </p>
          </GlassCard>

          <GlassCard className="p-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Workflow toward 14 February</h2>
            <ol className="mt-3 space-y-2 text-sm text-slate-700">
              {workflow.map((step, idx) => (
                <li key={step} className="flex gap-2">
                  <span className="mt-1 text-rose-600">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <Link
                href="/pricing"
                className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
              >
                Pricing & delivery zones
              </Link>
              <Link
                href="/segments/3d-printing-seasonal"
                className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
              >
                To seasonal segment
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <GlassCard className="overflow-hidden rounded-3xl">
            <div className="grid gap-6 lg:grid-cols-[1.15fr,.85fr]">
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">Examples & materials</h2>
                <p className="mt-3 text-sm text-slate-600">
                  Browse the portfolio for statement pieces in Silk/Marble PLA or translucent lamps. We advise on thickness, inserts for LEDs/magnets and anti-slip feet in TPU.
                </p>
                <div className="mt-4 grid gap-3 text-sm">
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center gap-2 text-rose-700 underline underline-offset-4 hover:text-rose-600"
                  >
                    Portfolio (Valentine & decor) <span aria-hidden>-&gt;</span>
                  </Link>
                  <Link
                    href="/materials/pla-silk-plus"
                    className="inline-flex items-center gap-2 text-rose-700 underline underline-offset-4 hover:text-rose-600"
                  >
                    PLA Silk+ material page <span aria-hidden>-&gt;</span>
                  </Link>
                  <Link
                    href="/materials/pla-translucent"
                    className="inline-flex items-center gap-2 text-rose-700 underline underline-offset-4 hover:text-rose-600"
                  >
                    PLA Translucent material page <span aria-hidden>-&gt;</span>
                  </Link>
                </div>
              </div>
              <div className="relative min-h-[280px]">
                <Image
                  src="/images/portfolio/valentijn-articulated-1.webp"
                  alt="Valentine articulated figure in Silk PLA"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                />
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="px-6 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">FAQ for Valentine prints</h2>
            <Faq title="FAQ" items={faqItems} />
          </GlassCard>
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <GlassCard className="relative overflow-hidden rounded-3xl border border-white/30 bg-white/80 px-8 py-10 text-center shadow-xl backdrop-blur sm:text-left">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-200/20 via-amber-200/20 to-rose-100/20" aria-hidden />
            <div className="relative">
              <h2 className="text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Need personalised Valentine gifts?
              </h2>
              <p className="mt-3 max-w-3xl text-base text-slate-600">
                Send your STL/STEP, preferred finish and deadline. We share options in Silk, Marble, Matte or Translucent PLA with realistic delivery.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ShimmerButton href="/contact?material=pla-silk-plus">Request a quote</ShimmerButton>
                <Link
                  href="/blog/3d-printen-valentijn"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:-translate-y-0.5 hover:bg-white"
                >
                  Read Valentine ideas
                </Link>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </main>
  )
}

