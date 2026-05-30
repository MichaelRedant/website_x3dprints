"use client"

import { useState } from "react"
import { FaFacebookF, FaLinkedinIn, FaThreads, FaXTwitter } from "react-icons/fa6"
import { HiOutlineEnvelope, HiOutlineLink } from "react-icons/hi2"

type Props = {
  url: string
  title: string
  summary?: string
  layout?: "row" | "card"
  locale?: "nl" | "en"
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

export default function ShareActions({ url, title, summary, layout = "card", locale = "nl" }: Props) {
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

  const labels =
    locale === "en"
      ? {
          linkedin: "LinkedIn",
          facebook: "Facebook",
          x: "X",
          threads: "Threads",
          email: "Email",
          copy: "Copy link",
          copied: "Copied",
          shareOn: "Share on",
        }
      : {
          linkedin: "LinkedIn",
          facebook: "Facebook",
          x: "X",
          threads: "Threads",
          email: "E-mail",
          copy: "Kopieer link",
          copied: "Gekopieerd",
          shareOn: "Deel op",
        }

  const baseClasses =
    "inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/95 px-3 py-2 text-xs font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-600 dark:hover:bg-slate-800"

  const iconColorByPlatform: Record<Platform, string> = {
    linkedin: "text-[#0A66C2]",
    facebook: "text-[#1877F2]",
    x: "text-slate-900 dark:text-slate-100",
    threads: "text-slate-900 dark:text-slate-100",
    email: "text-emerald-600",
    copy: "text-slate-700",
  }

  const platformLabel = (platform: Platform) => labels[platform]

  const icon = (platform: Platform) => {
    const common = `h-4 w-4 ${iconColorByPlatform[platform]}`
    switch (platform) {
      case "linkedin":
        return <FaLinkedinIn className={common} aria-hidden />
      case "facebook":
        return <FaFacebookF className={common} aria-hidden />
      case "x":
        return <FaXTwitter className={common} aria-hidden />
      case "threads":
        return <FaThreads className={common} aria-hidden />
      case "email":
        return <HiOutlineEnvelope className={common} aria-hidden />
      case "copy":
        return <HiOutlineLink className={common} aria-hidden />
    }
  }

  return (
    <div
      className={
        layout === "card"
          ? "flex flex-wrap gap-2 rounded-2xl border border-slate-100 bg-white/70 p-3 dark:border-slate-700 dark:bg-slate-900/80"
          : "flex flex-wrap gap-2"
      }
    >
      {platforms.map((platform) => {
        if (platform === "copy") {
          return (
            <button key={platform} type="button" onClick={handleCopy} className={baseClasses}>
              {icon(platform)}
              <span className="hidden sm:inline">{labels.copy}</span>
              <span className="sr-only">{labels.copy}</span>
              {copied ? (
                <span aria-live="polite" className="text-emerald-600 dark:text-emerald-300">
                  {labels.copied}
                </span>
              ) : null}
            </button>
          )
        }
        const href = buildHref(platform, url, title, summary)
        return (
          <a
            key={platform}
            href={href}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className={baseClasses}
            aria-label={`${labels.shareOn} ${platformLabel(platform)}`}
          >
            {icon(platform)}
            <span className="hidden sm:inline">{platformLabel(platform)}</span>
            <span className="sr-only">{`${labels.shareOn} ${platformLabel(platform)}`}</span>
          </a>
        )
      })}
    </div>
  )
}
