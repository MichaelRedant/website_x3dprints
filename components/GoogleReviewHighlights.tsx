import Link from "next/link"
import GlassCard from "@/components/GlassCard"
import { localizeHref } from "@/lib/i18n/paths"
import type { Locale } from "@/lib/i18n/locales"
import {
  GOOGLE_REVIEW_ENTRIES,
  GOOGLE_REVIEW_SUMMARY,
  getReviewIndexFromSeed,
} from "@/content/google-reviews"

type GoogleReviewHighlightsProps = {
  locale: Locale
  variant?: "full" | "compact"
  city?: string
  seed?: string
}

function stars(value: number) {
  return "*".repeat(Math.max(1, Math.min(5, Math.round(value))))
}

export default function GoogleReviewHighlights({
  locale,
  variant = "full",
  city,
  seed,
}: GoogleReviewHighlightsProps) {
  const isEn = locale === "en"
  const localized = (href: string) => localizeHref(href, locale)
  const copy = isEn
    ? {
        kicker: "Google reviews",
        title: "What clients say about X3DPrints",
        titleLocal: city ? `What clients in and around ${city} say` : "What local clients say",
        intro:
          "Real client feedback helps decision quality and trust. These are public Google reviews from actual projects.",
        ratingLabel: "Average rating",
        basedOn: (count: number) => `Based on ${count} Google reviews`,
        view: "View Google reviews",
        leave: "Leave a review",
        portfolio: "View portfolio work",
        compactIntro: "Quick trust signal for this local page:",
      }
    : {
        kicker: "Google reviews",
        title: "Wat klanten zeggen over X3DPrints",
        titleLocal: city ? `Wat klanten in en rond ${city} zeggen` : "Wat lokale klanten zeggen",
        intro:
          "Echte klantenfeedback verhoogt vertrouwen en helpt sneller beslissen. Dit zijn publieke Google reviews uit echte projecten.",
        ratingLabel: "Gemiddelde score",
        basedOn: (count: number) => `Gebaseerd op ${count} Google reviews`,
        view: "Bekijk Google reviews",
        leave: "Laat een review achter",
        portfolio: "Bekijk portfolio",
        compactIntro: "Snel vertrouwenssignaal voor deze lokale pagina:",
      }

  const selectedIndex = getReviewIndexFromSeed(seed ?? city ?? "", GOOGLE_REVIEW_ENTRIES.length)
  const selectedReview = GOOGLE_REVIEW_ENTRIES[selectedIndex]

  if (variant === "compact" && selectedReview) {
    return (
      <GlassCard className="border border-emerald-100/80 bg-white/90 p-6 shadow-lg">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">{copy.kicker}</p>
        <h2 className="mt-2 text-xl font-semibold text-slate-900">{copy.titleLocal}</h2>
        <p className="mt-2 text-sm text-slate-600">{copy.compactIntro}</p>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
          <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 font-semibold text-amber-700">
            {stars(GOOGLE_REVIEW_SUMMARY.ratingValue)} {GOOGLE_REVIEW_SUMMARY.ratingValue.toFixed(1)}/5
          </span>
          <span className="text-slate-600">{copy.basedOn(GOOGLE_REVIEW_SUMMARY.reviewCount)}</span>
        </div>
        <blockquote className="mt-4 rounded-2xl border border-slate-200/80 bg-white/85 p-4">
          <p className="text-sm leading-6 text-slate-700">
            &ldquo;{selectedReview.quote[locale]}&rdquo;
          </p>
          <footer className="mt-3 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">{selectedReview.author}</span>
            {" · "}
            {selectedReview.relativeDate[locale]}
          </footer>
        </blockquote>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={GOOGLE_REVIEW_SUMMARY.viewUrl}
            target="_blank"
            rel="noopener noreferrer"
            prefetch={false}
            className="inline-flex items-center rounded-xl border border-slate-200/80 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
          >
            {copy.view}
          </Link>
          <Link
            href={localized("/portfolio")}
            className="inline-flex items-center rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm transition hover:bg-emerald-100"
          >
            {copy.portfolio}
          </Link>
        </div>
      </GlassCard>
    )
  }

  return (
    <GlassCard className="border border-white/40 bg-white/85 p-6 shadow-lg ring-1 ring-white/60 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">{copy.kicker}</p>
          <h2 className="mt-2 text-balance text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{copy.title}</h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">{copy.intro}</p>
        </div>
        <div className="rounded-2xl border border-amber-200/70 bg-amber-50/80 px-4 py-3 text-sm">
          <p className="font-semibold text-amber-700">{copy.ratingLabel}</p>
          <p className="mt-1 text-lg font-bold text-amber-800">
            {stars(GOOGLE_REVIEW_SUMMARY.ratingValue)} {GOOGLE_REVIEW_SUMMARY.ratingValue.toFixed(1)}/5
          </p>
          <p className="text-xs text-amber-700">{copy.basedOn(GOOGLE_REVIEW_SUMMARY.reviewCount)}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {GOOGLE_REVIEW_ENTRIES.map((review) => (
          <article key={review.id} className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm">
            <p className="text-sm leading-6 text-slate-700">
              &ldquo;{review.quote[locale]}&rdquo;
            </p>
            <footer className="mt-3 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">{review.author}</span>
              {" · "}
              {review.relativeDate[locale]}
            </footer>
          </article>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={GOOGLE_REVIEW_SUMMARY.viewUrl}
          target="_blank"
          rel="noopener noreferrer"
          prefetch={false}
          className="inline-flex items-center rounded-xl border border-slate-200/80 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
        >
          {copy.view}
        </Link>
        <Link
          href={GOOGLE_REVIEW_SUMMARY.leaveUrl}
          target="_blank"
          rel="noopener noreferrer"
          prefetch={false}
          className="inline-flex items-center rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-700 shadow-sm transition hover:bg-emerald-100"
        >
          {copy.leave}
        </Link>
        <Link
          href={localized("/portfolio")}
          className="inline-flex items-center rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-3 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-indigo-100"
        >
          {copy.portfolio}
        </Link>
      </div>
    </GlassCard>
  )
}
