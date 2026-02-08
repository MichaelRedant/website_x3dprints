// components/ctablock.tsx
import Link from "next/link"
import { FaBolt, FaEnvelope, FaArrowRight, FaShieldAlt } from "react-icons/fa"
import GlassOrb from "./GlassOrb"
import { localizeHref } from "@/lib/i18n/paths"
type Props = {
  city?: string
  className?: string
  email?: string        // optioneel override
  locale?: "nl" | "en"
}

export default function CtaBlock({
  city = "jouw regio",
  className = "",
  email = "michael@xinudesign.be",
  locale = "nl",
}: Props) {
  const isEn = locale === "en"
  const contactHref = localizeHref("/contact", locale)
  const copy = isEn
    ? {
        kicker: "Fast & clear",
        title: `Quote for 3D printing in ${city}`,
        body: "Pick a material (PLA, PETG, TPU) and receive a clear price and planning within 24 hours. Ideal for prototypes and small to large batches.",
        benefits: [
          "Short lead time (we plan together, typically a few business days)",
          "Transparent pricing - no surprises",
          "Basic post-processing: support removal and light deburring",
          "Personal advice on material selection",
        ],
        primaryCta: "Request a quote",
        mailCta: "Email",
        trust: "Files are handled confidentially. We only use them to calculate your price.",
        subject: `Request 3D printing in ${city}`,
      }
    : {
        kicker: "Snel & duidelijk",
        title: `Offerte voor 3D printen in ${city}`,
        body: "Kies materiaal (PLA, PETG, TPU) en ontvang binnen 24 uur een heldere prijs en planning. Perfect voor prototypes en zowel kleine als grotere series.",
        benefits: [
          "Korte doorlooptijd (we plannen samen, doorgaans enkele werkdagen)",
          "Transparante prijzen - geen verrassingen",
          "Basis nabewerking: support verwijderen en licht ontbramen",
          "Persoonlijk advies bij materiaalkeuze",
        ],
        primaryCta: "Offerte aanvragen",
        mailCta: "Mailen",
        trust: "Bestanden worden vertrouwelijk behandeld. We gebruiken ze enkel om je prijs te berekenen.",
        subject: `Vraag 3D printen in ${city}`,
      }

  const mailHref = `mailto:${email}?subject=${encodeURIComponent(copy.subject)}`

  return (
    <section
      aria-labelledby="cta-title"
      className={[
        "relative mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl",
        "bg-white/55 ring-1 ring-white/30 backdrop-blur-xl shadow-glass",
        "dark:bg-slate-900/60 dark:ring-white/10",
        "isolate",
        className,
      ].join(" ")}
    >
      {/* Subtle gradient border glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-cyan-200/40 via-transparent to-teal-200/40 dark:from-cyan-400/10 dark:to-teal-400/10"
      />

      {/* Soft orbs in de achtergrond */}
      <div aria-hidden className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-200/40 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-teal-200/40 blur-3xl" />

      <div className="relative grid gap-6 p-6 sm:grid-cols-[1.15fr,0.85fr] sm:p-8">
        {/* Left: Copy */}
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-teal-700 dark:text-teal-300">
            <FaBolt aria-hidden className="shrink-0" />
            {copy.kicker}
          </p>

          <h2
            id="cta-title"
            className="mt-2 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent dark:from-white dark:via-slate-200 dark:to-slate-300"
          >
            {copy.title}
          </h2>

          <p className="mt-2 text-slate-700 dark:text-slate-300">{copy.body}</p>

          {/* Benefits */}
          <ul className="mt-4 grid gap-2 text-sm text-slate-700 dark:text-slate-300 sm:grid-cols-2">
            {copy.benefits.map((t, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-teal-500" />
                {t}
              </li>
            ))}
          </ul>

          {/* Actions (geen telefoonknop) */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={contactHref}
              className="has-shimmer inline-flex items-center gap-2 rounded-2xl bg-white/70 px-5 py-3 text-sm font-semibold text-slate-900 ring-1 ring-slate-900/10 backdrop-blur transition hover:bg-white/90 hover:shadow-lg"
            >
              {copy.primaryCta}
              <FaArrowRight aria-hidden />
            </Link>

            <a
              href={mailHref}
              className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm ring-1 ring-slate-200/70 hover:bg-white/60 dark:ring-white/10 dark:hover:bg-white/5"
            >
              <FaEnvelope aria-hidden />
              {copy.mailCta}
            </a>
          </div>

          {/* Trust */}
          <p className="mt-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <FaShieldAlt aria-hidden />
            {copy.trust}
          </p>
        </div>

        {/* Right: Visual - eigen GlassOrb (anders dan je keyword-SVG) */}
        <div className="relative hidden items-center justify-center overflow-hidden rounded-2xl ring-1 ring-white/30 sm:flex dark:ring-white/10">
          {/* subtiele paneelgradient */}
          
          {/* diepte: twee orbs, 1 grote soft, 1 scherpe vooraan */}
         
          <div className="relative z-10">
            {/* langzame draai voor premium feel; werkt zonder extra config via arbitrary animation */}
            <div className="animate-[spin_18s_linear_infinite]">
              <GlassOrb className="h-40 w-40 md:h-48 md:w-48" />
            </div>
          </div>
          {/* top highlight */}
          <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        </div>
      </div>
    </section>
  )
}

