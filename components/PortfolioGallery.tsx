"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import Image from "next/image"
import { useMemo, useState } from "react"
import AutoCarousel from "@/components/AutoCarousel"
import type { Locale } from "@/lib/i18n/locales"

type PortfolioPhoto = {
  src: string
  alt: string
  info?: string
  width?: number
  height?: number
}

type Props = {
  items: PortfolioPhoto[]
  locale?: Locale
  newCount?: number
}

export default function PortfolioGallery({ items, locale = "nl", newCount = 0 }: Props) {
  const isEn = locale === "en"
  const prefersReducedMotion = useReducedMotion()
  const [isOpen, setIsOpen] = useState(false)

  const copy = isEn
    ? {
        open: (count: number) => `Open full photo gallery (${count} images)`,
        close: "Collapse photo gallery",
        eyebrow: "Complete gallery",
        title: "Open all project photos",
        body: "The carousel shows a fast preview. Open the full gallery when you want to browse every project image in one smooth grid.",
        loaded: (count: number) => `${count} lazy-loaded portfolio images`,
        newLabel: "New",
      }
    : {
        open: (count: number) => `Open volledige fotogalerij (${count} beelden)`,
        close: "Klap fotogalerij dicht",
        eyebrow: "Volledige galerij",
        title: "Bekijk alle projectfoto's",
        body: "De carousel toont een snelle preview. Open de volledige galerij als je alle projectbeelden in een vloeiende grid wil bekijken.",
        loaded: (count: number) => `${count} lazy-loaded portfolio beelden`,
        newLabel: "Nieuw",
      }

  const gridItems = useMemo(() => items.map((item, index) => ({ ...item, index })), [items])

  if (items.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      <AutoCarousel
        items={items}
        speed={14}
        visibleCount={4}
        newCount={newCount}
        itemClass="aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3]"
      />

      <div className="rounded-3xl border border-white/60 bg-white/72 p-4 shadow-[0_18px_48px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700">{copy.eyebrow}</p>
            <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">{copy.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{copy.body}</p>
          </div>
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="portfolio-full-gallery"
            onClick={() => setIsOpen((current) => !current)}
            className={[
              "inline-flex min-h-12 items-center justify-center rounded-2xl px-5 py-3 text-sm font-bold shadow-sm transition",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2",
              isOpen
                ? "border border-slate-200 bg-white text-slate-950 hover:-translate-y-0.5 hover:bg-slate-50"
                : "bg-slate-950 text-white hover:-translate-y-0.5 hover:bg-slate-800",
            ].join(" ")}
          >
            {isOpen ? copy.close : copy.open(items.length)}
            <span
              aria-hidden
              className={[
                "ml-2 inline-block transition-transform duration-300",
                isOpen ? "rotate-45" : "rotate-0",
              ].join(" ")}
            >
              +
            </span>
          </button>
        </div>

        <AnimatePresence initial={false}>
          {isOpen ? (
            <motion.div
              id="portfolio-full-gallery"
              key="portfolio-full-gallery"
              initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={prefersReducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-6 border-t border-slate-200/80 pt-6">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-800">{copy.loaded(items.length)}</p>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-semibold text-cyan-800 underline underline-offset-4 hover:text-cyan-950"
                  >
                    {copy.close}
                  </button>
                </div>
                <motion.div
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  initial={prefersReducedMotion ? false : "hidden"}
                  animate="show"
                  variants={{
                    hidden: {},
                    show: {
                      transition: {
                        staggerChildren: 0.012,
                      },
                    },
                  }}
                >
                  {gridItems.map((photo) => (
                    <motion.figure
                      key={`${photo.src}-${photo.index}`}
                      variants={{
                        hidden: { opacity: 0, y: 18, scale: 0.985 },
                        show: { opacity: 1, y: 0, scale: 1 },
                      }}
                      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                      className="group overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,0.14)]"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                        {newCount > 0 && photo.index < newCount ? (
                          <span className="absolute left-3 top-3 z-10 rounded-full bg-indigo-600 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-sm">
                            {copy.newLabel}
                          </span>
                        ) : null}
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          loading="lazy"
                          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, (max-width: 1280px) 30vw, 280px"
                          className="object-contain p-2 transition duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                      <figcaption className="border-t border-slate-100 bg-white px-4 py-3">
                        <p className="text-sm font-semibold leading-5 text-slate-950 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                          {photo.alt}
                        </p>
                        {photo.info ? (
                          <p className="mt-1 text-xs leading-5 text-slate-600 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                            {photo.info}
                          </p>
                        ) : null}
                      </figcaption>
                    </motion.figure>
                  ))}
                </motion.div>
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
                  >
                    {copy.close}
                  </button>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
}
