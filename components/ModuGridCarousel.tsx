"use client"

import Image from "next/image"
import { useId, useRef } from "react"

type CarouselImage = { src: string; alt: string }

const IMAGES: CarouselImage[] = [
  { src: "/images/organizers/modugrid/ModuGrid1.jpg", alt: "Gridfinity lade overzicht" },
  { src: "/images/organizers/modugrid/ModuGrid2.jpg", alt: "Gridfinity lade met schroeven en bits" },
  { src: "/images/organizers/modugrid/ModuGrid3.webp", alt: "Gridfinity lade met bits en schroeven" },
  { src: "/images/organizers/modugrid/ModuGrid4.webp", alt: "Gridfinity bakjes voor bureau tools" },
  { src: "/images/organizers/modugrid/ModuGrid5.webp", alt: "Gridfinity detail met labels" },
  { src: "/images/organizers/modugrid/ModuGrid6.webp", alt: "Gridfinity insert met antislip" },
  { src: "/images/organizers/modugrid/ModuGrid7.webp", alt: "Gridfinity lade tijdens gebruik" },
  { src: "/images/organizers/modugrid/ModuGrid8.webp", alt: "Gridfinity custom vak voor multimeter" },
  { src: "/images/organizers/modugrid/ModuGrid9.webp", alt: "Gridfinity baseplate met gemengde bakjes" },
  { src: "/images/organizers/modugrid/ModuGrid10.webp", alt: "Gridfinity hobby setup voor verf en miniaturen" },
  { src: "/images/organizers/modugrid/ModuGrid11.webp", alt: "Gridfinity lade met tools en labels" },
]

export default function ModuGridCarousel() {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const carouselId = useId()

  const scroll = (delta: number) => {
    const el = scrollRef.current
    if (el) el.scrollBy({ left: delta, behavior: "smooth" })
  }

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Gridfinity in beeld</h2>
      <p className="text-slate-700 dark:text-slate-200">Lades, bureaus en koffers met één systeem. Eigen foto’s, geen renders.</p>
      <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm ring-1 ring-white/70 dark:border-slate-800 dark:bg-[#0B0F1A]">
        <div className="flex items-center justify-between px-3 py-2 text-slate-700 dark:text-slate-200">
          <span className="text-sm font-semibold">Blader door de voorbeelden</span>
          <div className="flex gap-2">
            <button
              type="button"
              className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-600 active:translate-y-0 dark:border-slate-700 dark:bg-[#0f162c] dark:text-slate-100"
              onClick={() => scroll(-900)}
              aria-label="Vorige foto's"
              aria-controls={carouselId}
            >
              <span className="i-lucide-arrow-left" aria-hidden />
            </button>
            <button
              type="button"
              className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-600 active:translate-y-0 dark:border-slate-700 dark:bg-[#0f162c] dark:text-slate-100"
              onClick={() => scroll(900)}
              aria-label="Volgende foto's"
              aria-controls={carouselId}
            >
              <span className="i-lucide-arrow-right" aria-hidden />
            </button>
          </div>
        </div>
        <div
          id={carouselId}
          ref={scrollRef}
          className="flex snap-x snap-mandatory overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700"
        >
          {IMAGES.map((img, i) => (
            <div
              key={img.src}
              className="w-full max-w-[340px] flex-shrink-0 snap-start md:max-w-[420px] lg:max-w-[33%] border-l border-slate-100 last:border-r dark:border-slate-800"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={900}
                height={700}
                className="h-full w-full object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={i < 2}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
