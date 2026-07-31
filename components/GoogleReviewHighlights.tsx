"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { useCallback, useEffect, useMemo, useState, type FocusEvent } from "react"
import {
  FaChevronLeft,
  FaChevronRight,
  FaGoogle,
  FaPause,
  FaPlay,
  FaQuoteLeft,
} from "react-icons/fa"

import { localizeHref } from "@/lib/i18n/paths"
import type { Locale } from "@/lib/i18n/locales"
import {
  GOOGLE_REVIEW_ENTRIES,
  GOOGLE_REVIEW_SUMMARY,
  getReviewIndexFromSeed,
  type GoogleReviewEntry,
} from "@/content/google-reviews"

type GoogleReviewHighlightsProps = {
  locale: Locale
  variant?: "full" | "compact"
  city?: string
  seed?: string
}

const AUTOPLAY_MS = 7500

function stars(value: number) {
  return "★".repeat(Math.max(1, Math.min(5, Math.round(value))))
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

function ReviewIdentity({
  review,
  locale,
  dark = false,
  interactive = true,
}: {
  review: GoogleReviewEntry
  locale: Locale
  dark?: boolean
  interactive?: boolean
}) {
  const profileLabel = locale === "en" ? `View ${review.author}'s Google profile` : `Bekijk het Google-profiel van ${review.author}`
  const meta = locale === "en" ? "Public Google review" : "Publieke Google-review"
  const nameClass = dark
    ? "text-white decoration-white/30 hover:text-emerald-200"
    : "text-slate-900 decoration-slate-300 hover:text-emerald-700 dark:text-white dark:decoration-slate-600 dark:hover:text-emerald-300"

  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden
        className={dark
          ? "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-sm font-bold text-white shadow-lg"
          : "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-sm font-bold text-emerald-700 shadow-sm dark:border-emerald-300/25 dark:bg-emerald-400/10 dark:text-emerald-200"}
      >
        {initials(review.author)}
      </span>
      <span className="min-w-0">
        {review.sourceUrl && interactive ? (
          <Link
            href={review.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            prefetch={false}
            aria-label={profileLabel}
            className={`block w-fit font-semibold underline underline-offset-4 transition ${nameClass}`}
          >
            {review.author}
          </Link>
        ) : (
          <span className={dark ? "block font-semibold text-white" : "block font-semibold text-slate-900 dark:text-white"}>
            {review.author}
          </span>
        )}
        <span className={dark ? "mt-0.5 block text-xs text-slate-300" : "mt-0.5 block text-xs text-slate-500 dark:text-slate-400"}>
          {meta} · {review.relativeDate[locale]}
        </span>
      </span>
    </div>
  )
}

export default function GoogleReviewHighlights({
  locale,
  variant = "full",
  city,
  seed,
}: GoogleReviewHighlightsProps) {
  const isEn = locale === "en"
  const prefersReducedMotion = useReducedMotion()
  const localized = (href: string) => localizeHref(href, locale)
  const initialIndex = useMemo(
    () => getReviewIndexFromSeed(seed ?? city ?? "", GOOGLE_REVIEW_ENTRIES.length),
    [city, seed],
  )
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const [userPaused, setUserPaused] = useState(false)
  const [interactionPaused, setInteractionPaused] = useState(false)
  const canAutoplay = GOOGLE_REVIEW_ENTRIES.length > 1 && !prefersReducedMotion && !userPaused && !interactionPaused
  const activeReview = GOOGLE_REVIEW_ENTRIES[activeIndex]

  const copy = isEn
    ? {
        kicker: "Google reviews",
        title: "What clients say about X3DPrints",
        titleLocal: city ? `What clients in and around ${city} say` : "What local clients say",
        intro: "Real client feedback from real projects, presented one story at a time.",
        ratingLabel: "Average rating",
        basedOn: (count: number) => `Based on ${count} Google reviews`,
        view: "View all Google reviews",
        leave: "Leave a review",
        portfolio: "View portfolio work",
        compactIntro: "A quick trust signal from a real project:",
        carouselLabel: "Customer review carousel",
        previous: "Previous review",
        next: "Next review",
        pause: "Pause automatic rotation",
        play: "Resume automatic rotation",
        reduced: "Automatic rotation is off because reduced motion is enabled.",
        position: (current: number, total: number) => `Review ${current} of ${total}`,
      }
    : {
        kicker: "Google reviews",
        title: "Wat klanten zeggen over X3DPrints",
        titleLocal: city ? `Wat klanten in en rond ${city} zeggen` : "Wat lokale klanten zeggen",
        intro: "Echte klantenfeedback uit echte projecten, telkens één verhaal centraal.",
        ratingLabel: "Gemiddelde score",
        basedOn: (count: number) => `Gebaseerd op ${count} Google reviews`,
        view: "Bekijk alle Google reviews",
        leave: "Laat een review achter",
        portfolio: "Bekijk portfolio",
        compactIntro: "Een snel vertrouwenssignaal uit een echt project:",
        carouselLabel: "Carrousel met klantenreviews",
        previous: "Vorige review",
        next: "Volgende review",
        pause: "Pauzeer automatisch afspelen",
        play: "Hervat automatisch afspelen",
        reduced: "Automatisch afspelen staat uit omdat verminderde beweging is ingeschakeld.",
        position: (current: number, total: number) => `Review ${current} van ${total}`,
      }

  useEffect(() => {
    setActiveIndex(initialIndex)
  }, [initialIndex])

  const move = useCallback((step: 1 | -1) => {
    setActiveIndex((current) => (current + step + GOOGLE_REVIEW_ENTRIES.length) % GOOGLE_REVIEW_ENTRIES.length)
  }, [])

  useEffect(() => {
    if (!canAutoplay) return
    const timer = window.setTimeout(() => move(1), AUTOPLAY_MS)
    return () => window.clearTimeout(timer)
  }, [activeIndex, canAutoplay, move])

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setInteractionPaused(false)
    }
  }

  if (!activeReview) return null

  const sliderInteractionProps = {
    onMouseEnter: () => setInteractionPaused(true),
    onMouseLeave: () => setInteractionPaused(false),
    onFocusCapture: () => setInteractionPaused(true),
    onBlurCapture: handleBlur,
  }

  const controls = (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => move(-1)}
        aria-label={copy.previous}
        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-950 bg-slate-950 text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/20"
      >
        <FaChevronLeft aria-hidden className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        onClick={() => move(1)}
        aria-label={copy.next}
        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-950 bg-slate-950 text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/20"
      >
        <FaChevronRight aria-hidden className="h-3.5 w-3.5" />
      </button>
      {!prefersReducedMotion ? (
        <button
          type="button"
          onClick={() => setUserPaused((paused) => !paused)}
          aria-label={userPaused ? copy.play : copy.pause}
          aria-pressed={userPaused}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-950 bg-slate-950 text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 dark:border-white/15 dark:bg-white/10 dark:hover:bg-white/20"
        >
          {userPaused ? <FaPlay aria-hidden className="h-3.5 w-3.5" /> : <FaPause aria-hidden className="h-3.5 w-3.5" />}
        </button>
      ) : null}
    </div>
  )

  if (variant === "compact") {
    return (
        <div {...sliderInteractionProps}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-300">{copy.kicker}</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-50">{copy.titleLocal}</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{copy.compactIntro}</p>
            </div>
            <div className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700 dark:border-amber-300/30 dark:bg-amber-400/10 dark:text-amber-200">
              <span aria-hidden>{stars(GOOGLE_REVIEW_SUMMARY.ratingValue)}</span>
              <span className="sr-only">{GOOGLE_REVIEW_SUMMARY.ratingValue} / 5</span>
            </div>
          </div>

          <section
            aria-label={copy.carouselLabel}
            aria-roledescription="carousel"
            className="relative mt-5"
          >
            <div className="relative flex min-h-[330px] flex-col overflow-hidden rounded-3xl bg-slate-950 p-5 text-white shadow-[0_22px_55px_rgba(15,23,42,0.2)] sm:min-h-[285px]">
              <div aria-hidden className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-emerald-400/20 blur-3xl" />
              <div className="relative flex items-center justify-between gap-4">
                <FaQuoteLeft aria-hidden className="h-6 w-6 text-emerald-300" />
                <span className="text-xs font-semibold tracking-[0.18em] text-slate-300">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(GOOGLE_REVIEW_ENTRIES.length).padStart(2, "0")}
                </span>
              </div>
              <div className="relative mt-4 min-h-[210px] flex-1 overflow-hidden" aria-live={canAutoplay ? "off" : "polite"} aria-atomic="true">
                {GOOGLE_REVIEW_ENTRIES.map((review, reviewIndex) => {
                  const rawOffset = (reviewIndex - activeIndex + GOOGLE_REVIEW_ENTRIES.length) % GOOGLE_REVIEW_ENTRIES.length
                  const offset = rawOffset > GOOGLE_REVIEW_ENTRIES.length / 2 ? rawOffset - GOOGLE_REVIEW_ENTRIES.length : rawOffset
                  const active = offset === 0
                  const positionClass = active
                    ? "translate-x-0 opacity-100"
                    : offset < 0
                      ? "-translate-x-[110%] opacity-0"
                      : "translate-x-[110%] opacity-0"

                  return (
                    <blockquote
                      key={review.id}
                      aria-hidden={!active}
                      className={`absolute inset-0 flex flex-col justify-between gap-6 transition-[transform,opacity] ease-out ${prefersReducedMotion ? "duration-0" : "duration-500"} ${positionClass}`}
                    >
                      <p className="text-base leading-7 text-slate-100">&ldquo;{review.quote[locale]}&rdquo;</p>
                      <ReviewIdentity review={review} locale={locale} dark interactive={active} />
                    </blockquote>
                  )
                })}
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between gap-4">
              {controls}
              <span className="text-xs text-slate-500 dark:text-slate-400">{copy.position(activeIndex + 1, GOOGLE_REVIEW_ENTRIES.length)}</span>
            </div>
            <div aria-hidden className="mt-4 h-1 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
              <motion.div
                key={`${activeReview.id}-${canAutoplay}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: canAutoplay ? 1 : 0 }}
                transition={{ duration: canAutoplay ? AUTOPLAY_MS / 1000 : 0, ease: "linear" }}
                className="h-full origin-left rounded-full bg-emerald-400"
              />
            </div>
          </section>

          {prefersReducedMotion ? <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{copy.reduced}</p> : null}
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={GOOGLE_REVIEW_SUMMARY.viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              prefetch={false}
              className="inline-flex items-center rounded-xl border border-slate-200/80 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              {copy.view}
            </Link>
            <Link
              href={localized("/portfolio")}
              className="inline-flex items-center rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm transition hover:bg-emerald-100 dark:border-emerald-300/30 dark:bg-emerald-400/10 dark:text-emerald-200 dark:hover:bg-emerald-400/15"
            >
              {copy.portfolio}
            </Link>
          </div>
        </div>
    )
  }

  return (
    <div>
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-300">{copy.kicker}</p>
            <h2 className="mt-2 text-balance text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">{copy.title}</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 sm:text-base">{copy.intro}</p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-amber-200/70 bg-amber-50/80 px-4 py-3 dark:border-amber-300/30 dark:bg-amber-400/10">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#4285f4] shadow-sm dark:bg-slate-900">
              <FaGoogle aria-hidden className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-xs font-semibold text-amber-700 dark:text-amber-200">{copy.ratingLabel}</span>
              <span className="mt-0.5 block font-bold text-amber-800 dark:text-amber-100">
                <span aria-hidden>{stars(GOOGLE_REVIEW_SUMMARY.ratingValue)}</span> {GOOGLE_REVIEW_SUMMARY.ratingValue.toFixed(1)}/5
              </span>
              <span className="block text-xs text-amber-700 dark:text-amber-200">{copy.basedOn(GOOGLE_REVIEW_SUMMARY.reviewCount)}</span>
            </span>
          </div>
        </div>

        <section
          aria-label={copy.carouselLabel}
          aria-roledescription="carousel"
          className="relative mt-7 overflow-hidden py-7 sm:py-10"
          {...sliderInteractionProps}
        >
          <div className="relative h-[510px] md:h-[540px]" aria-live={canAutoplay ? "off" : "polite"} aria-atomic="true">
            {GOOGLE_REVIEW_ENTRIES.map((review, reviewIndex) => {
              const rawOffset = (reviewIndex - activeIndex + GOOGLE_REVIEW_ENTRIES.length) % GOOGLE_REVIEW_ENTRIES.length
              const offset = rawOffset > GOOGLE_REVIEW_ENTRIES.length / 2 ? rawOffset - GOOGLE_REVIEW_ENTRIES.length : rawOffset
              const active = offset === 0
              const visible = Math.abs(offset) <= 1
              const positionClass = active
                ? "left-0 h-[500px] w-full z-20 opacity-100 md:left-[31%] md:h-[500px] md:w-[38%]"
                : offset === -1
                  ? "-left-[108%] h-[450px] w-full z-10 opacity-0 md:left-[1%] md:h-[320px] md:w-[27%] md:opacity-100"
                  : offset === 1
                    ? "left-[108%] h-[450px] w-full z-10 opacity-0 md:left-[72%] md:h-[320px] md:w-[27%] md:opacity-100"
                    : offset < 0
                      ? "-left-[125%] h-[320px] w-[27%] z-0 opacity-0"
                      : "left-[125%] h-[320px] w-[27%] z-0 opacity-0"
              const cardClass = active
                ? "border-slate-200/80 bg-white p-5 shadow-[0_30px_70px_rgba(15,23,42,0.18)] dark:border-slate-700 dark:bg-slate-900 sm:p-8"
                : "border-slate-200/80 bg-white/90 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.12)] dark:border-slate-700 dark:bg-slate-900/90"

              return (
                <article
                  key={review.id}
                  aria-hidden={!visible}
                  aria-current={active ? "true" : undefined}
                  className={`absolute top-1/2 flex -translate-y-1/2 flex-col overflow-hidden rounded-2xl border transition-[left,width,height,opacity,box-shadow] ease-out ${prefersReducedMotion ? "duration-0" : "duration-500"} ${visible ? "pointer-events-auto" : "pointer-events-none"} ${positionClass} ${cardClass}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <ReviewIdentity review={review} locale={locale} interactive={visible} />
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-50 text-[#4285f4] shadow-sm dark:bg-slate-800">
                      <FaGoogle aria-hidden className="h-4 w-4" />
                    </span>
                  </div>
                  <div className={active ? "mt-6 flex items-center justify-between gap-4" : "mt-5"}>
                    <span aria-hidden className="text-sm tracking-[0.08em] text-amber-500">{stars(GOOGLE_REVIEW_SUMMARY.ratingValue)}</span>
                    {active ? (
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                        {String(activeIndex + 1).padStart(2, "0")} / {String(GOOGLE_REVIEW_ENTRIES.length).padStart(2, "0")}
                      </span>
                    ) : null}
                  </div>
                  <blockquote className={active ? "my-auto py-6" : "mt-5"}>
                    {active ? <FaQuoteLeft aria-hidden className="mb-5 h-6 w-6 text-emerald-500" /> : null}
                    <p className={active
                      ? "text-balance text-lg font-semibold leading-8 text-slate-900 dark:text-slate-50 sm:text-xl sm:leading-9"
                      : "line-clamp-7 text-base font-medium leading-7 text-slate-700 dark:text-slate-200"}
                    >
                      &ldquo;{review.quote[locale]}&rdquo;
                    </p>
                  </blockquote>
                  {active ? (
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{copy.position(activeIndex + 1, GOOGLE_REVIEW_ENTRIES.length)}</p>
                  ) : null}
                </article>
              )
            })}
          </div>

          <div className="relative mt-7 flex flex-col items-center gap-4">
            {controls}
            <div aria-hidden className="h-1 w-40 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
              <motion.div
                key={`${activeReview.id}-${canAutoplay}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: canAutoplay ? 1 : 0 }}
                transition={{ duration: canAutoplay ? AUTOPLAY_MS / 1000 : 0, ease: "linear" }}
                className="h-full origin-left rounded-full bg-emerald-500"
              />
            </div>
            {prefersReducedMotion ? <p className="max-w-md text-center text-xs text-slate-500 dark:text-slate-400">{copy.reduced}</p> : null}
          </div>
        </section>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={GOOGLE_REVIEW_SUMMARY.viewUrl}
            target="_blank"
            rel="noopener noreferrer"
            prefetch={false}
            className="inline-flex items-center rounded-xl border border-slate-200/80 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            {copy.view}
          </Link>
          <Link
            href={GOOGLE_REVIEW_SUMMARY.leaveUrl}
            target="_blank"
            rel="noopener noreferrer"
            prefetch={false}
            className="inline-flex items-center rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-100 dark:border-emerald-300/30 dark:bg-emerald-400/10 dark:text-emerald-200 dark:hover:bg-emerald-400/15"
          >
            {copy.leave}
          </Link>
          <Link
            href={localized("/portfolio")}
            className="inline-flex items-center rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-3 text-sm font-semibold text-indigo-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-100 dark:border-indigo-300/30 dark:bg-indigo-400/10 dark:text-indigo-200 dark:hover:bg-indigo-400/15"
          >
            {copy.portfolio}
          </Link>
        </div>
    </div>
  )
}
