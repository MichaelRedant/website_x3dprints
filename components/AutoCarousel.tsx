"use client"

import Image from "next/image"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

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
}: {
  items: Photo[]
  className?: string
  speed?: number
  /** Responsive aspect/hoogte-classes voor elk item */
  itemClass?: string
}) {
  const [active, setActive] = useState<Photo | null>(null)
  const [index, setIndex] = useState(0)
  const [previousIndex, setPreviousIndex] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const preloaded = useRef<Set<string>>(new Set())

  useEffect(() => setMounted(true), [])

  const goTo = useCallback(
    (direction: 1 | -1) => {
      if (items.length <= 1) return
      setIndex((current) => {
        const nextIndex = (current + direction + items.length) % items.length
        setPreviousIndex(current)
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

  const visibleIndices = useMemo(() => {
    const set = new Set<number>()
    set.add(index)
    if (previousIndex !== null) set.add(previousIndex)
    return Array.from(set)
  }, [index, previousIndex])

  const prev = () => goTo(-1 as const)
  const next = () => goTo(1 as const)

  if (items.length === 0) {
    return null
  }

  return (
    <section
      aria-label="Portfolio carrousel"
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
        <div className={`relative ${itemClass}`}>
          {visibleIndices.map((visibleIdx) => {
            const photo = items[visibleIdx]
            const isActive = visibleIdx === index
            return (
              <button
                key={`${photo.src}-${visibleIdx}`}
                onClick={() => setActive(photo)}
                aria-label={`Vergroot afbeelding: ${photo.alt}`}
                className={[
                  "absolute inset-0 w-full overflow-hidden rounded-2xl border border-white/30",
                  "bg-gradient-to-br from-white/85 via-white/70 to-slate-50/85",
                  "shadow-[0_18px_45px_rgba(15,23,42,0.14)] backdrop-blur",
                  "transition-opacity duration-700",
                  isActive ? "opacity-100" : "pointer-events-none opacity-0",
                ].join(" ")}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 90vw, (max-width: 1200px) 60vw, 720px"
                  className="object-contain"
                  priority={visibleIdx === 0}
                  loading={visibleIdx === 0 ? "eager" : "lazy"}
                />
                <span className="absolute bottom-4 left-4 rounded-md bg-white/85 px-3 py-1 text-[12px] font-medium text-slate-800 shadow-sm backdrop-blur">
                  {photo.alt}
                </span>
              </button>
            )
          })}
        </div>

        {items.length > 1 && (
          <>
            <button
              aria-label="Vorige afbeelding"
              onClick={prev}
              className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg bg-white/85 text-slate-900 shadow-sm backdrop-blur transition hover:bg-white"
            >
              <FaChevronLeft aria-hidden />
            </button>
            <button
              aria-label="Volgende afbeelding"
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
                    priority
                  />
                </div>

                <button
                  aria-label="Sluit afbeeldingsweergave"
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

