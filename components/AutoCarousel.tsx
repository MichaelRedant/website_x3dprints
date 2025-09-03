"use client"

import Image from "next/image"
import { useMemo, useState, useEffect } from "react"
import { createPortal } from "react-dom"

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
  speed = 30, // seconden per volledige loop
  // grotere hoogte out-of-the-box
  itemClass = "h-[360px] sm:h-[420px] lg:h-[500px]",
}: {
  items: Photo[]
  className?: string
  speed?: number
  /** Responsive hoogte-classes voor elk item */
  itemClass?: string
}) {
  const [active, setActive] = useState<Photo | null>(null)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Dubbele lijst voor naadloze loop
  const loop = useMemo(() => [...items, ...items], [items])

  return (
    <section
      aria-label="Portfolio carrousel"
      className={[
        "group relative overflow-hidden rounded-3xl ring-1 ring-white/30 bg-white/55 backdrop-blur-xl shadow-glass",
        className,
      ].join(" ")}
    >
      {/* zachte gradient-glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-200/30 via-transparent to-teal-200/30" />

      {/* Track */}
      <div
        className={`
          relative flex gap-4 p-4
          [animation:marquee_linear_infinite]
          group-hover:[animation-play-state:paused]
        `}
        style={{ animationDuration: `${speed}s` }}
      >
        {loop.map((p, i) => (
          <button
            key={`${p.src}-${i}`}
            onClick={() => setActive(p)}
            aria-label={`Vergroot afbeelding: ${p.alt}`}
            className={[
              // grotere hoogte + vaste aspect
              "relative isolate z-0 aspect-[4/3] min-w-[260px] w-[72vw] max-w-[680px]",
              "overflow-hidden rounded-2xl border border-white/30 bg-white/60",
              "shadow-[0_10px_40px_rgba(0,0,0,0.06)] backdrop-blur",
              "transition-transform duration-300 hover:-translate-y-0.5",
              itemClass,
            ].join(" ")}
          >
            {/* Shine on hover */}
            <span
              aria-hidden
              className="
                pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(115deg,transparent,rgba(255,255,255,.55),transparent)]
                transition-transform duration-700 group-hover:translate-x-full
              "
            />
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 680px"
              className="object-cover"
              priority={i < 2}
            />
            <span className="absolute bottom-2 left-2 rounded-md bg-white/75 px-2 py-1 text-[12px] font-medium text-slate-800 backdrop-blur">
              {p.alt}
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox via portal zodat niets wordt afgeknipt */}
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
                {/* hoge view: neem viewport-hoogte, respecteer video-aspect */}
                <div className="relative mx-auto h-[72vh] max-h-[900px] w-full">
                  <Image
                    src={active.src}
                    alt={active.alt}
                    fill
                    sizes="100vw"
                    className="object-contain" // geen crop in modal
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

            {/* Close via ESC */}
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
            {/* Hidden click target for ESC helper */}
            <button data-x3d-close onClick={() => setActive(null)} className="hidden" />
          </div>,
          document.body
        )
      }

      {/* keyframes + motion-reduce */}
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes marquee {
            from { transform: translateX(0) }
            to   { transform: translateX(-50%) }
          }
          @keyframes fadeIn {
            from { opacity:0 } to { opacity:1 }
          }
          @keyframes popIn {
            from { opacity:0; transform: scale(.985) translateY(6px) }
            to   { opacity:1; transform: scale(1) translateY(0) }
          }
          .group [style*="animation"] { animation-timing-function: linear }
          @media (prefers-reduced-motion: reduce) {
            .group [style*="animation"] { animation: none !important }
          }
        `,
        }}
      />
    </section>
  )
}
