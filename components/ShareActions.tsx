"use client"

import { useState } from "react"

type Props = {
  url: string
  title: string
  summary?: string
  layout?: "row" | "card"
}

const platforms = ["linkedin", "facebook", "x", "threads", "email", "copy"] as const
type Platform = (typeof platforms)[number]

function buildHref(platform: Exclude<Platform, "copy">, url: string, title: string, summary?: string) {
  const encodedUrl = encodeURIComponent(url)
  const encodedText = encodeURIComponent(summary || title)
  switch (platform) {
    case "linkedin":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    case "x":
      return `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`
    case "threads":
      return `https://www.threads.net/intent/post?text=${encodedText}%20${encodedUrl}`
    case "email":
      return `mailto:?subject=${encodeURIComponent(title)}&body=${encodedText}%0A%0A${encodedUrl}`
  }
}

export default function ShareActions({ url, title, summary, layout = "card" }: Props) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const baseClasses =
    "inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-xs font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"

  const icon = (platform: Platform) => {
    const common = "h-4 w-4 fill-current"
    switch (platform) {
      case "linkedin":
        return (
          <svg className={common} viewBox="0 0 24 24" aria-hidden>
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.48-2.24-1.67-2.24-.91 0-1.45.61-1.69 1.2-.09.21-.11.5-.11.8v5.81H9.86s.05-9.42 0-10.4h3.56v1.47c.47-.73 1.31-1.78 3.19-1.78 2.33 0 4.08 1.52 4.08 4.79v5.92ZM5.34 7.03a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.79 13.42H3.54v-10.4h3.59v10.4Z" />
          </svg>
        )
      case "facebook":
        return (
          <svg className={common} viewBox="0 0 24 24" aria-hidden>
            <path d="M13.34 20.45v-6.9h2.32l.35-2.69h-2.67V9.16c0-.78.22-1.31 1.34-1.31h1.43V5.45C15.79 5.4 14.96 5.3 14 5.3c-2.13 0-3.59 1.3-3.59 3.69v1.87H8v2.69h2.41v6.9h2.93Z" />
          </svg>
        )
      case "x":
        return (
          <svg className={common} viewBox="0 0 24 24" aria-hidden>
            <path d="M18.9 3.75h2.23l-4.88 5.57 5.73 7.93h-4.49l-3.52-4.62-4.03 4.62H2.7l5.21-5.96-5.46-6.54h4.58l3.01 4 3.86-4Z" />
          </svg>
        )
      case "threads":
        return (
          <svg className={common} viewBox="0 0 24 24" aria-hidden>
            <path d="M12.01 4.1c4.49 0 7.83 2.9 7.83 8.1 0 5.17-3.45 7.98-8.01 7.98-2.55 0-4.35-.9-5.36-1.76l1.38-1.93c.8.65 1.96 1.4 3.79 1.4 2.94 0 4.94-1.78 5-4.57-1.34 1.07-2.74 1.41-4.13 1.41-3.15 0-5.58-2-5.58-4.97 0-2.93 2.39-5.1 5.48-5.1 1.76 0 3.14.73 4.16 1.7-.32-2.24-1.89-3.26-4.56-3.26-1.38 0-2.61.27-3.76.75l-.71-2.04C8.35 4.45 10.02 4.1 12.01 4.1Zm-.08 5.21c-1.56 0-2.65 1-2.65 2.5 0 1.48 1.12 2.47 2.62 2.47 1.59 0 2.71-.93 2.71-2.45 0-1.55-1.16-2.52-2.68-2.52Z" />
          </svg>
        )
      case "email":
        return (
          <svg className={common} viewBox="0 0 24 24" aria-hidden>
            <path d="M3.75 5.5h16.5c.55 0 1 .45 1 1v11c0 .55-.45 1-1 1H3.75c-.55 0-1-.45-1-1v-11c0-.55.45-1 1-1Zm8.25 7.45 7.1-5.45H4.9l7.1 5.45Zm-6.73-4.2v7.75h13.46V8.75l-6.33 4.85a.99.99 0 0 1-1.2 0L5.27 8.75Z" />
          </svg>
        )
      case "copy":
        return (
          <svg className={common} viewBox="0 0 24 24" aria-hidden>
            <path d="M8.5 7h9.75c.69 0 1.25.56 1.25 1.25v9.5c0 .69-.56 1.25-1.25 1.25H8.5A1.25 1.25 0 0 1 7.25 17.75v-9.5C7.25 7.56 7.81 7 8.5 7Zm-2-3.5h9c.69 0 1.25.56 1.25 1.25V6h-1.5V4.75h-9v9H5.5v-8c0-.69.56-1.25 1.25-1.25Z" />
          </svg>
        )
    }
  }

  return (
    <div
      className={
        layout === "card"
          ? "flex flex-wrap gap-2 rounded-2xl border border-slate-100 bg-white/70 p-3"
          : "flex flex-wrap gap-2"
      }
    >
      {platforms.map((platform) => {
        if (platform === "copy") {
          return (
            <button key={platform} type="button" onClick={handleCopy} className={baseClasses}>
              {icon(platform)}
              <span className="sr-only">Link kopieren</span>
              {copied ? <span aria-live="polite" className="text-emerald-600">Gekopieerd</span> : null}
            </button>
          )
        }
        const href = buildHref(platform, url, title, summary)
        return (
          <a
            key={platform}
            href={href}
            target="_blank"
            rel="noreferrer"
            className={baseClasses}
            aria-label={`Deel op ${platform}`}
          >
            {icon(platform)}
            <span className="sr-only">
              Deel op {platform === "x" ? "X" : platform.charAt(0).toUpperCase() + platform.slice(1)}
            </span>
          </a>
        )
      })}
    </div>
  )
}
