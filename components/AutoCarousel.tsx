"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
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
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (items.length <= 1) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length)
    }, speed * 1000)
    return () => clearInterval(id)
  }, [items.length, speed])

  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length)
  const next = () => setIndex((i) => (i + 1) % items.length)

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
          {items.map((p, i) => (
            <button
              key={p.src}
              onClick={() => setActive(p)}
              aria-label={`Vergroot afbeelding: ${p.alt}`}
              className={[
                "absolute inset-0 w-full overflow-hidden rounded-2xl border border-white/30",
                "bg-gradient-to-br from-white/85 via-white/70 to-slate-50/85",
                "shadow-[0_18px_45px_rgba(15,23,42,0.14)] backdrop-blur",
                "transition-opacity duration-700",
                i === index ? "opacity-100" : "pointer-events-none opacity-0",
              ].join(" ")}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 60vw, 720px"
                className="object-contain"
                priority={i === index}
              />
              <span className="absolute bottom-4 left-4 rounded-md bg-white/85 px-3 py-1 text-[12px] font-medium text-slate-800 shadow-sm backdrop-blur">
                {p.alt}
              </span>
            </button>
          ))}
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

      {mounted && active &&
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

            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function(){
                    const onKey = (e) => { if (e.key === 'Escape') window.__closeX3D?.() }
                    window.__closeX3D = () => {
                      document.querySelector('[data-x3d-close]')?.click?.()
                    }
                    window.addEventListener('keydown', onKey, { once: true })
                  })()
                `,
              }}
            />
            <button data-x3d-close onClick={() => setActive(null)} className="hidden" />
          </div>,
          document.body
        )
      }

      <style
        // eslint-disable-next-line react/no-danger
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

