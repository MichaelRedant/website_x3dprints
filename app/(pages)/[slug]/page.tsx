// app/[slug]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { readFile } from "fs/promises";
import Link from "next/link";
import { join } from "path";
import Reveal from "@/components/Reveal"
import ShimmerButton from "@/components/ShimmerButton"
import Catchphrase from "@/components/Catchphrase"
import GlassOrb from "@/components/GlassOrb"
import GlassCard from "@/components/GlassCard"
import TiltImage from "@/components/TiltImage"
import { renderMarkdown } from "@/lib/markdown"
import {
  getAllLocationSlugs,
  getLocationBySlug,
  buildDefaultRelatedPhrases,
} from "@/lib/locations";
import { keywordSvgDataUri } from "@/lib/svg";
import CtaBlock from "@/components/CtaBlock";
import Faq from "@/components/Faq";
import type { ReactNode } from "react";

interface PageProps {
  params: { slug: string };
}

export const dynamicParams = false;
export const revalidate = 60 * 60 * 24; // 24u cache

export function generateStaticParams() {
  return getAllLocationSlugs().map((slug) => ({ slug }));
}

/** SEO: ongewijzigd gehouden */
export function generateMetadata({ params }: PageProps): Metadata {
  const loc = getLocationBySlug(params.slug);
  if (!loc) return {};

  const keyphrase = `3D printen in ${loc.city}`;
  const phrases = loc.relatedPhrases?.length
    ? loc.relatedPhrases
    : buildDefaultRelatedPhrases(loc.city);

  const description = `${keyphrase} door X3DPrints. Snelle, nauwkeurige 3D print service voor prototypes en kleine series in ${loc.city}. Materialen: PLA, PETG, ABS, ASA, TPU.`;
  const url = `https://www.x3dprints.be/${loc.slug}`;

  return {
    title: `${keyphrase} | X3DPrints`,
    description,
    keywords: [keyphrase, ...phrases].join(", "),
    alternates: { canonical: url },
    robots: { index: true, follow: true, "max-snippet": -1 },
    openGraph: {
      title: keyphrase,
      description,
      url,
      siteName: "X3DPrints",
      type: "website",
      locale: "nl_BE",
      images: [{ url: "/images/og-home.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: keyphrase,
      description,
      images: ["/images/og-home.jpg"],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const slug = params.slug.toLowerCase();
  const loc = getLocationBySlug(slug);
  if (!loc) notFound();

  const keyphrase = `3D printen in ${loc.city}`;
  const phrases = loc.relatedPhrases?.length
    ? loc.relatedPhrases
    : buildDefaultRelatedPhrases(loc.city);
  const svgSrc = keywordSvgDataUri(keyphrase);

  // Markdown-inhoud laden
  let contentHtml = "";
  try {
    const file = await readFile(
      join(process.cwd(), "content", "locations", `${loc.slug}.md`),
      "utf8",
    );
    contentHtml = await renderMarkdown(file); // <-- nieuwe renderer
  } catch {
    notFound();
  }

  // JSON-LD
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: keyphrase,
    areaServed: { "@type": "City", name: loc.city },
    provider: { "@type": "Organization", name: "X3DPrints", url: "https://www.x3dprints.be" },
    url: `https://www.x3dprints.be/${loc.slug}`,
    serviceType: "3D printing",
    keywords: [keyphrase, ...phrases],
  };

  const faqItems = [
    {
      q: `Welke materialen kan ik laten 3D printen in ${loc.city}?`,
      a: "We printen o.a. PLA, PETG, ABS/ASA en TPU. Op aanvraag ook technische materialen. We adviseren het juiste materiaal op basis van jouw toepassing.",
    },
    {
      q: `Wat is de levertijd voor 3D printen in ${loc.city}?`,
      a: "Meestal 2–5 werkdagen afhankelijk van complexiteit en oplage. Spoed mogelijk in overleg.",
    },
    {
      q: "Kan ik een prototype of kleine serie laten maken?",
      a: "Ja. We zijn gespecialiseerd in rapid prototyping en kleine reeksen, met opties voor nabehandeling en montage.",
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };

  // Kleine helper om snel consistente outline-icons te renderen
  const icon = (node: ReactNode) => (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="mx-auto mb-2 text-slate-700"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.6">
        {node}
      </g>
    </svg>
  );

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.x3dprints.be" },
      { "@type": "ListItem", position: 2, name: "Locaties", item: "https://www.x3dprints.be/locaties" },
      { "@type": "ListItem", position: 3, name: loc.city, item: `https://www.x3dprints.be/${loc.slug}` },
    ],
  };

  return (
    <main className="relative overflow-clip">
      {/* Achtergrond met orbs, responsief en subtiel */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-teal-50" />
        <div className="absolute -top-32 -left-28 h-[26rem] w-[26rem] rounded-full bg-cyan-200/30 blur-3xl sm:h-[32rem] sm:w-[32rem] md:h-[38rem] md:w-[38rem]" />
      <div className="absolute -bottom-32 -right-28 h-[28rem] w-[28rem] rounded-full bg-teal-200/30 blur-3xl sm:h-[36rem] sm:w-[36rem] md:h-[42rem] md:w-[42rem]" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:12px_12px]" />
      </div>

      {/* Tagline hero */}
      <section className="relative px-6 pb-24 pt-20 sm:px-8 lg:px-12 lg:pb-32 lg:pt-28">
        <div className="absolute right-0 top-0 -z-10 hidden sm:block">
          <GlassOrb className="h-72 w-72 opacity-40" />
        </div>
        <div className="mx-auto max-w-6xl">
          <Reveal className="max-w-3xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-slate-700 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Snel, precies en betaalbaar
            </span>
            <Catchphrase className="mt-4 block text-base font-medium text-indigo-600 sm:text-lg">
              Betaalbaar 3D printen
            </Catchphrase>
            <h1 className="mt-2 bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-balance text-4xl font-extrabold leading-tight tracking-tight text-transparent sm:text-5xl">
              Where design meets dimension.
            </h1>
            <p className="mt-2 text-balance text-lg font-medium text-slate-700">
              3D Prints die kloppen
            </p>
            <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-slate-600 sm:text-lg">
              X3DPrints is een compacte 3D-printstudio uit Herzele, onderdeel van Xinudesign. Ideaal voor prototypes en kleine series met strakke afwerking. PLA is onze standaard, maar we schakelen waar nodig over naar PETG, ABS/ASA, Nylon of PA-CF. Levertijd meestal 2–5 werkdagen, transparante offerte vooraf.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <ShimmerButton href="/contact">Offerte aanvragen</ShimmerButton>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition-transform hover:-translate-y-0.5 hover:bg-white/20"
              >
                Bekijk portfolio
              </Link>
            </div>
          </Reveal>
          <TiltImage src="/Logo.webp" alt="Logo X3DPrints" className="mx-auto mt-12 w-64" />
          <Reveal delay={0.15} className="mt-16 grid gap-6 sm:grid-cols-3">
            {[
              {
                k: "Tolerantie",
                v: "±0,2 mm",
                icon: icon(
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 12h16M4 16h16" />
                ),
              },
              {
                k: "Doorlooptijd",
                v: "2–5 werkdagen",
                icon: icon(
                  <>
                    <circle cx={12} cy={12} r={9} />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l2 2" />
                  </>
                ),
              },
              {
                k: "Bouwvolume",
                v: "Tot 25 × 25 × 25 cm",
                icon: icon(
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 16V8l-9-5-9 5v8l9 5 9-5ZM12 3v18M3 8l9 4 9-4"
                  />
                ),
              },
            ].map((item) => (
              <GlassCard key={item.k} className="p-5 text-center transition-transform hover:-translate-y-1">
                {item.icon}
                <div className="text-sm text-slate-500">{item.k}</div>
                <div className="mt-1 text-xl font-semibold text-slate-900">{item.v}</div>
              </GlassCard>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Centrale container met responsieve paddings en max breedte */}
      <section className="px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        <div className="mx-auto max-w-screen-md lg:max-w-screen-lg">
          {/* HERO: gecentreerd, glass card */}
          <header
            className="
              relative mx-auto rounded-3xl border border-white/30
              bg-white/40 p-6 sm:p-8 backdrop-blur-xl
              shadow-[0_10px_40px_rgba(0,0,0,0.08)]
              animate-[fadeInUp_.6s_ease_out_0s_both]
              text-center
            "
          >
            <h1
              className="
                font-extrabold tracking-tight
                text-[clamp(1.75rem,4vw,2.5rem)]
                bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700
                bg-clip-text text-transparent
              "
            >
              {keyphrase}
            </h1>

            <p className="mx-auto mt-3 max-w-prose text-pretty text-slate-600">
              Snelle, nauwkeurige 3D print service in {loc.city}. Perfect voor{" "}
              <strong>prototypes</strong> en <strong>kleine series</strong>. Persoonlijk advies, korte doorlooptijden.
            </p>

            <ul className="mx-auto mt-5 grid max-w-2xl gap-2 text-slate-700 sm:grid-cols-2">
              <li className="flex items-start justify-center gap-2 sm:justify-start">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-cyan-400" />
                Materialen: PLA, PETG, ABS/ASA, TPU
              </li>
              <li className="flex items-start justify-center gap-2 sm:justify-start">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-teal-400" />
                Maximale bouwvolumes & hoge resolutie
              </li>
              <li className="flex items-start justify-center gap-2 sm:justify-start">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-cyan-400" />
                Nabehandeling: schuren, primen, lakken
              </li>
              <li className="flex items-start justify-center gap-2 sm:justify-start">
  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-teal-400" />
  Snelle offerte:{" "}
  <Link
    href="/contact"
    className="underline decoration-cyan-500 underline-offset-4 hover:text-slate-900"
  >
    vraag aan
  </Link>
</li>

            </ul>

            {/* Shimmer CTA */}
            <div className="mt-6">
  <Link
    href="/contact"
    className="
      group relative inline-flex items-center gap-2 rounded-2xl px-5 py-3
      font-semibold text-slate-900
      ring-1 ring-slate-900/10 bg-white/60 backdrop-blur
      transition hover:bg-white/80 hover:shadow-lg
      before:absolute before:inset-0 before:-translate-x-full
      before:bg-[linear-gradient(110deg,transparent,rgba(255,255,255,.6),transparent)]
      before:transition-transform before:duration-700 group-hover:before:translate-x-full
    "
  >
    Offerte aanvragen
    <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-70">
      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </Link>
</div>


            {/* glans bovenrand */}
            <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </header>

          {/* CONTENT (MD) – glassy + centraal + animaties + tabel-scroll */}
<section className="relative mx-auto mt-12 max-w-3xl">
  <div
    className="
      rounded-3xl bg-white/45 p-6 sm:p-8 ring-1 ring-white/30 backdrop-blur-xl
      shadow-glass transition duration-500
      hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)]
      animate-[fadeIn_.6s_ease_out_.05s_both]
    "
  >
    {/* scroll wrapper zorgt dat tabellen zichtbaar blijven op mobiel */}
    <div className="table-wrap overflow-x-auto">
      <article
  className="prose prose-slate lg:prose-lg dark:prose-invert prose-x3d leading-relaxed mt-8 max-w-none"
  dangerouslySetInnerHTML={{ __html: contentHtml }}
/>
    </div>
  </div>

  {/* Soft glow randje bovenaan, purely decorative */}
  <div className="pointer-events-none absolute inset-x-0 -top-1 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
</section>

<CtaBlock city={loc.city} className="mt-14" />
<Faq city={loc.city} items={faqItems} className="mt-14" />

          {/* Keyword visual — gecentreerd panel */}
          <div
            className="
              mx-auto mt-8 max-w-3xl overflow-hidden rounded-3xl
              border border-white/30 bg-white/40 p-2 backdrop-blur-xl
              shadow-[0_10px_40px_rgba(0,0,0,0.06)]
              transition-shadow hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]
              animate-[fadeInUp_.6s_ease_out_.1s_both]
            "
          >
            <Image
              src={svgSrc}
              alt={keyphrase}
              width={1200}
              height={630}
              priority
              className="h-auto w-full rounded-2xl"
            />
          </div>

          {/* Interne links — gecentreerde pills (matcht Header.NAV) */}
<nav
  className="
    mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-3 text-sm
    animate-[fadeIn_.6s_ease_out_.15s_both]
  "
  aria-label="Verder lezen"
>
  <span className="font-medium text-slate-700">Verder lezen:</span>

  <Link
    href="/services"
    className="rounded-full border border-white/30 bg-white/60 px-4 py-2 text-slate-700 backdrop-blur transition hover:bg-white"
  >
    Services
  </Link>

  <Link
    href="/materials"
    className="rounded-full border border-white/30 bg-white/60 px-4 py-2 text-slate-700 backdrop-blur transition hover:bg-white"
  >
    Materialen & richtlijnen
  </Link>

  <Link
    href="/pricing"
    className="rounded-full border border-white/30 bg-white/60 px-4 py-2 text-slate-700 backdrop-blur transition hover:bg-white"
  >
    Prijzen
  </Link>

  <Link
    href="/portfolio"
    className="rounded-full border border-white/30 bg-white/60 px-4 py-2 text-slate-700 backdrop-blur transition hover:bg-white"
  >
    Portfolio
  </Link>

  <Link
    href="/contact"
    className="rounded-full border border-white/30 bg-white/60 px-4 py-2 text-slate-700 backdrop-blur transition hover:bg-white"
  >
    Contact
  </Link>
</nav>
          {/* JSON-LD */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        </div>
      </section>

      {/* Keyframes voor subtiele reveals, met reduced-motion respect */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes fadeInUp { from { opacity:.0; transform: translateY(8px) } to { opacity:1; transform: translateY(0) } }
          @keyframes fadeIn { from { opacity:.0 } to { opacity:1 } }
          @media (prefers-reduced-motion: reduce) {
            * { animation: none !important; transition: none !important }
          }
        `,
        }}
      />
    </main>
  );
}
