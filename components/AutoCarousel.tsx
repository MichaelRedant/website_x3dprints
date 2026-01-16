"use client"

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
}) {
  const { locale } = useLocale()
  const copy = locale === "en"
    ? {
        ariaLabel: "Portfolio carousel",
        zoomLabel: (alt: string) => `Enlarge image: ${alt}`,
        newLabel: "New",
        prevLabel: "Previous image",
        nextLabel: "Next image",
        closeLabel: "Close image viewer",
      }
    : {
        ariaLabel: "Portfolio carrousel",
        zoomLabel: (alt: string) => `Vergroot afbeelding: ${alt}`,
        newLabel: "Nieuw",
        prevLabel: "Vorige afbeelding",
        nextLabel: "Volgende afbeelding",
        closeLabel: "Sluit afbeeldingsweergave",
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
    const id = setInterval(() => goTo(1), speed * 1000)
    return () => clearInterval(id)
  }, [items.length, speed, goTo])

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
    () => Array.from({ length: Math.min(visibleCount, items.length) }, (_, i) => items[(index + i) % items.length]),
    [index, items, visibleCount],
  )

  const colsClass =
    visibleCount >= 4 ? "lg:grid-cols-4" : visibleCount === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
  const smColsClass = visibleCount >= 2 ? "sm:grid-cols-2" : "sm:grid-cols-1"

  const prev = () => goTo(-1 as const)
  const next = () => goTo(1 as const)

  if (items.length === 0) {
    return null
  }

  return (
    <section
      aria-label={copy.ariaLabel}
      className={[
        "group relative overflow-hidden rounded-3xl ring-1 ring-white/30 bg-white/55 backdrop-blur-xl shadow-glass",
        className,
      ].join(" ")}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-200/30 via-transparent to-teal-200/30"
      />

      <div className="relative w-full overflow-hidden">
        <div
          className={`grid grid-cols-1 ${smColsClass} ${colsClass} gap-4 transition-transform duration-500`}
          style={{ transform: `translateX(${0}px)` }}
        >
          {visibleItems.map((photo, idx) => (
            <button
              key={`${photo.src}-${idx}`}
              onClick={() => setActive(photo)}
              aria-label={copy.zoomLabel(photo.alt)}
              className={[
                "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/50",
                "bg-white/95 shadow-[0_18px_45px_rgba(15,23,42,0.12)] backdrop-blur",
                "transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(15,23,42,0.18)]",
              ].join(" ")}
            >
              {newCount > 0 && idx < newCount && (
                <span className="absolute left-3 top-3 z-10 inline-flex items-center rounded-full bg-indigo-600/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-sm ring-1 ring-white/40">
                  {copy.newLabel}
                </span>
              )}
              <div className={`relative w-full ${itemClass}`}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 90vw, (max-width: 1200px) 60vw, 720px"
                  className="object-contain transition duration-300 group-hover:scale-[1.01]"
                  loading="lazy"
                />
              </div>
              <div className="mt-2 px-3 pb-3 text-center">
                <span className="inline-block rounded-md bg-white/85 px-3 py-1 text-[12px] font-medium text-slate-800 shadow-sm">
                  {photo.alt}
                </span>
              </div>
            </button>
          ))}
        </div>

        {items.length > 1 && (
          <>
            <button
              aria-label={copy.prevLabel}
              onClick={prev}
              className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg bg-white/85 text-slate-900 shadow-sm backdrop-blur transition hover:bg-white"
            >
              <FaChevronLeft aria-hidden />
            </button>
            <button
              aria-label={copy.nextLabel}
              onClick={next}
              className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg bg-white/85 text-slate-900 shadow-sm backdrop-blur transition hover:bg-white"
            >
              <FaChevronRight aria-hidden />
            </button>
          </>
        )}
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

