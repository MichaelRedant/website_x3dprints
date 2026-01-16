"use client"

import Reveal from "@/components/Reveal"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useMemo, useRef, useState } from "react"
import { useLocale } from "./LocaleProvider"

type Video = { id: string; title: string; description: string }

type Props = {
  videos: Video[]
  highlightIds: string[]
}

type VideoCopy = {
  loadVideo: (title: string) => string
  previewAlt: (title: string) => string
  newLabel: string
  watchOnYoutube: string
  loadMore: string
}

function LiteVideo({ videoId, title, copy }: { videoId: string; title: string; copy: VideoCopy }) {
  const [shouldLoad, setShouldLoad] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (shouldLoad) return
    const node = containerRef.current
    if (!node || typeof window === "undefined") return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true)
            observer.disconnect()
          }
        })
      },
      { rootMargin: "200px" },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [shouldLoad])

  return (
    <div ref={containerRef} className="relative aspect-video w-full">
      {shouldLoad ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&playsinline=1`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setShouldLoad(true)}
          className="group relative block h-full w-full"
          aria-label={copy.loadVideo(title)}
        >
          <Image
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt={copy.previewAlt(title)}
            fill
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 560px"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" aria-hidden />
          <span className="absolute inset-0 grid place-items-center">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-lg font-semibold text-slate-900 shadow-lg transition group-hover:scale-105">
              ▶
            </span>
          </span>
        </button>
      )}
    </div>
  )
}

export default function VideoGallery({ videos, highlightIds }: Props) {
  const { locale } = useLocale()
  const copy: VideoCopy =
    locale === "en"
      ? {
          loadVideo: (title) => `Load video ${title}`,
          previewAlt: (title) => `Preview image for ${title}`,
          newLabel: "New",
          watchOnYoutube: "Watch on YouTube",
          loadMore: "Load more videos",
        }
      : {
          loadVideo: (title) => `Laad video ${title}`,
          previewAlt: (title) => `Voorbeeldbeeld bij ${title}`,
          newLabel: "Nieuw",
          watchOnYoutube: "Bekijk op YouTube",
          loadMore: "Meer videos laden",
        }
  const [visible, setVisible] = useState(10)
  const highlightSet = useMemo(() => new Set(highlightIds), [highlightIds])
  const hasMore = visible < videos.length

  return (
    <>
      <div className="grid gap-10 md:grid-cols-2">
        {videos.slice(0, visible).map((video, index) => (
          <Reveal key={video.id} delay={0.1 + index * 0.03} className="h-full">
            <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/40 bg-white/70 p-4 shadow-lg backdrop-blur transition-transform hover:-translate-y-1 hover:shadow-xl">
              <div className="relative overflow-hidden rounded-2xl border border-slate-200/60">
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-slate-900/0 via-slate-900/0 to-slate-900/10 opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden
                />
                <LiteVideo videoId={video.id} title={video.title} copy={copy} />
                {highlightSet.has(video.id) && (
                  <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                    {copy.newLabel}
                  </span>
                )}
              </div>
              <div className="mt-4 flex flex-1 flex-col">
                <h3 className="text-lg font-semibold text-slate-900">{video.title}</h3>
                <p className="mt-2 flex-1 text-sm text-slate-600">{video.description}</p>
                <Link
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
                >
                  {copy.watchOnYoutube}
                  <span aria-hidden>-&gt;</span>
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            className="rounded-full border border-slate-300 px-6 py-2 text-sm font-semibold text-slate-900 shadow transition hover:-translate-y-px hover:bg-white"
            onClick={() => setVisible((prev) => Math.min(videos.length, prev + 10))}
          >
            {copy.loadMore}
          </button>
        </div>
      )}
    </>
  )
}
