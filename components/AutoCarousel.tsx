"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import Image from "next/image"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { useLocale } from "./LocaleProvider"

type Photo = {
  src: string
  alt: string
  info?: string
  width?: number
  height?: number
}

export default function AutoCarousel({
  items,
  className = "",
  speed = 5,
  itemClass = "aspect-[4/3] sm:aspect-[3/2] lg:aspect-[16/10]",
  visibleCount = 3,
  newCount = 0,
  premium = false,
}: {
  items: Photo[]
  className?: string
  speed?: number
  /** Responsive aspect/hoogte-classes voor elk item */
  itemClass?: string
  /** Aantal zichtbare kaarten in de strip */
  visibleCount?: number
  /** Markeer eerste N items als nieuw */
  newCount?: number
  /** Gebruik extra motion en top progress-animatie */
  premium?: boolean
}) {
  const { locale } = useLocale()
  const prefersReducedMotion = useReducedMotion()
  const copy = locale === "en"
    ? {
        ariaLabel: "Portfolio carousel",
        zoomLabel: (alt: string) => `Enlarge image: ${alt}`,
        newLabel: "New",
        prevLabel: "Previous image",
        nextLabel: "Next image",
        closeLabel: "Close image viewer",
        positionLabel: (current: number, total: number) => `${current} / ${total}`,
        jumpLabel: (target: number, total: number) => `Jump to image ${target} of ${total}`,
      }
    : {
        ariaLabel: "Portfolio carrousel",
        zoomLabel: (alt: string) => `Vergroot afbeelding: ${alt}`,
        newLabel: "Nieuw",
        prevLabel: "Vorige afbeelding",
        nextLabel: "Volgende afbeelding",
        closeLabel: "Sluit afbeeldingsweergave",
        positionLabel: (current: number, total: number) => `${current} / ${total}`,
        jumpLabel: (target: number, total: number) => `Ga naar afbeelding ${target} van ${total}`,
      }
  const [active, setActive] = useState<Photo | null>(null)
  const [index, setIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const preloaded = useRef<Set<string>>(new Set())

  useEffect(() => setMounted(true), [])

  const goTo = useCallback(
    (direction: 1 | -1) => {
      if (items.length <= 1) return
      setIndex((current) => {
        const nextIndex = (current + direction + items.length) % items.length
        return nextIndex
      })
    },
    [items.length],
  )

  useEffect(() => {
    if (items.length <= 1) return
    if (active) return
    const id = setInterval(() => goTo(1), speed * 1000)
    return () => clearInterval(id)
  }, [active, items.length, speed, goTo])

  useEffect(() => {
    if (items.length === 0) return
    const next = items[(index + 1) % items.length]
    if (!next || preloaded.current.has(next.src) || typeof window === "undefined") return
    const img = new window.Image()
    img.src = next.src
    preloaded.current.add(next.src)
  }, [index, items])

  useEffect(() => {
    if (!active) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [active])

  const visibleItems = useMemo(
    () =>
      Array.from({ length: Math.min(visibleCount, items.length) }, (_, i) => {
        const itemIndex = (index + i) % items.length
        return {
          photo: items[itemIndex],
          itemIndex,
          slotIndex: i,
        }
      }),
    [index, items, visibleCount],
  )
  const currentPosition = index + 1
  const navPoints = useMemo(() => {
    const pointCount = Math.min(items.length, 8)

    if (pointCount <= 1) {
      return [0]
    }

    return Array.from({ length: pointCount }, (_, dotIndex) =>
      Math.round((dotIndex * (items.length - 1)) / (pointCount - 1)),
    )
  }, [items.length])
  const activeNavIndex = useMemo(
    () =>
      navPoints.reduce((closestPointIndex, pointIndex, pointPosition) => {
        const currentDistance = Math.abs(pointIndex - index)
        const bestDistance = Math.abs(navPoints[closestPointIndex] - index)
        return currentDistance < bestDistance ? pointPosition : closestPointIndex
      }, 0),
    [index, navPoints],
  )

  const colsClass =
    visibleCount >= 4 ? "lg:grid-cols-4" : visibleCount === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
  const smColsClass = visibleCount >= 2 ? "sm:grid-cols-2" : "sm:grid-cols-1"

  const prev = () => goTo(-1 as const)
  const next = () => goTo(1 as const)
  const goToIndex = (targetIndex: number) => setIndex(targetIndex)

  if (items.length === 0) {
    return null
  }

  return (
    <section
      aria-label={copy.ariaLabel}
      className={[
        "group relative overflow-hidden rounded-3xl ring-1 ring-white/30 bg-white/55 backdrop-blur-xl shadow-glass",
        premium ? "border border-indigo-100/40 shadow-[0_22px_65px_rgba(30,41,59,0.18)]" : "",
        className,
      ].join(" ")}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-200/30 via-transparent to-teal-200/30"
      />
      {premium ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/70 via-indigo-50/35 to-transparent"
        />
      ) : null}

      <div className="relative overflow-hidden rounded-[1.7rem] border border-white/55 bg-white/55 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] sm:p-4">
        {items.length > 1 ? (
          <div className="relative z-10 mb-4 flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm">
              <span className="inline-flex h-2 w-2 rounded-full bg-indigo-500" aria-hidden />
              {copy.positionLabel(currentPosition, items.length)}
            </div>
            <div className="flex items-center gap-2">
              <button
                aria-label={copy.prevLabel}
                onClick={prev}
                type="button"
                className={[
                  "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/80",
                  "bg-white/85 text-slate-900 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/70",
                ].join(" ")}
              >
                <FaChevronLeft aria-hidden />
              </button>
              <button
                aria-label={copy.nextLabel}
                onClick={next}
                type="button"
                className={[
                  "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/80",
                  "bg-white/85 text-slate-900 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/70",
                ].join(" ")}
              >
                <FaChevronRight aria-hidden />
              </button>
            </div>
          </div>
        ) : null}

        <div className="relative w-full overflow-hidden rounded-[1.35rem]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-16 bg-gradient-to-r from-white/75 to-transparent sm:block"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-16 bg-gradient-to-l from-white/75 to-transparent sm:block"
          />
          {premium && items.length > 1 ? (
            <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1 overflow-hidden bg-white/40">
              <motion.div
                key={`progress-${index}`}
                className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-emerald-400"
                initial={prefersReducedMotion ? { x: "0%" } : { x: "-100%" }}
                animate={{ x: "0%" }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: speed, ease: "linear" }}
              />
            </div>
          ) : null}

          <AnimatePresence initial={false} mode={prefersReducedMotion ? "sync" : "wait"}>
            <motion.div
              key={`carousel-frame-${index}-${visibleCount}`}
              className={`grid grid-cols-1 ${smColsClass} ${colsClass} gap-3 sm:gap-4`}
              initial={prefersReducedMotion ? false : premium ? { opacity: 0, y: 20 } : { opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 1 } : premium ? { opacity: 0, y: -16 } : { opacity: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              {visibleItems.map(({ photo, itemIndex, slotIndex }) => (
                <motion.button
                  key={`${photo.src}-${itemIndex}`}
                  type="button"
                  onClick={() => setActive(photo)}
                  aria-label={copy.zoomLabel(photo.alt)}
                  className={[
                    "group relative flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-slate-200/70",
                    "bg-white/92 shadow-[0_14px_36px_rgba(15,23,42,0.10)] backdrop-blur",
                    "transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(15,23,42,0.16)]",
                    premium ? "hover:-translate-y-1.5" : "",
                  ].join(" ")}
                  initial={prefersReducedMotion ? false : premium ? { opacity: 0, y: 28, scale: 0.985 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : {
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1],
                          delay: premium ? slotIndex * 0.05 : 0,
                        }
                  }
                >
                  {newCount > 0 && itemIndex < newCount && (
                    <span className="absolute left-3 top-3 z-10 inline-flex items-center rounded-full bg-indigo-600/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-sm ring-1 ring-white/40">
                      {copy.newLabel}
                    </span>
                  )}
                  <div className={`relative w-full overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.85),rgba(241,245,249,0.92))] ${itemClass}`}>
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 768px) 90vw, (max-width: 1200px) 60vw, 720px"
                      className="object-contain transition duration-300 group-hover:scale-[1.01]"
                      loading="lazy"
                    />
                  </div>
                  <div className="border-t border-slate-100/90 bg-white/92 px-4 pb-4 pt-3 text-left">
                    <p className="overflow-hidden text-sm font-semibold leading-5 text-slate-900 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                      {photo.alt}
                    </p>
                    {photo.info ? (
                      <p className="mt-1 text-xs text-slate-600 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                        {photo.info}
                      </p>
                    ) : null}
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {items.length > 1 ? (
          <div className="mt-4 flex items-center justify-center gap-2">
            {navPoints.map((targetIndex, dotIndex) => (
              <button
                key={`carousel-dot-${targetIndex}`}
                type="button"
                aria-label={copy.jumpLabel(targetIndex + 1, items.length)}
                aria-pressed={activeNavIndex === dotIndex}
                onClick={() => goToIndex(targetIndex)}
                className={[
                  "h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/70",
                  activeNavIndex === dotIndex
                    ? "w-8 bg-indigo-600 shadow-sm"
                    : "w-2.5 bg-slate-300/85 hover:bg-slate-400/90",
                ].join(" ")}
              />
            ))}
          </div>
        ) : null}

      </div>

      {mounted &&
        active &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[999] grid place-items-center bg-black/45 backdrop-blur-sm animate-[fadeIn_.2s_ease-out_both]"
            onClick={() => setActive(null)}
          >
            <div
              className="
                relative mx-4 w-full max-w-5xl overflow-hidden rounded-3xl border border-white/20
                bg-white/85 p-3 shadow-2xl backdrop-blur-xl
                animate-[popIn_.18s_ease-out_both]
              "
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full overflow-hidden rounded-xl">
                <div className="relative mx-auto h-[72vh] max-h-[900px] w-full">
                  <Image
                    src={active.src}
                    alt={active.alt}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    loading="lazy"
                  />
                </div>

                <button
                  aria-label={copy.closeLabel}
                  onClick={() => setActive(null)}
                  className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/85 text-slate-900 shadow-sm backdrop-blur transition hover:bg-white"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <div className="mt-3 px-1 pb-1">
                <h3 className="text-base font-semibold text-slate-900">{active.alt}</h3>
                {active.info && <p className="mt-1 text-sm text-slate-700">{active.info}</p>}
              </div>
            </div>
          </div>,
          document.body,
        )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes fadeIn {
            from { opacity:0 } to { opacity:1 }
          }
          @keyframes popIn {
            from { opacity:0; transform: scale(.985) translateY(6px) }
            to   { opacity:1; transform: scale(1) translateY(0) }
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-[fadeIn_.2s_ease-out_both],
            .animate-[popIn_.18s_ease-out_both] { animation: none !important }
          }
        `,
        }}
      />
    </section>
  )
}

