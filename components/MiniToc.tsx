"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import type { TOCItem } from "@/lib/headings"
import Link from "next/link"
import { cn } from "@/lib/utils"

type Props = {
  items: TOCItem[]
  className?: string
  /** Onthoud UI-state per route; verander dit als je meerdere TOC's op 1 site hebt */
  storageKey?: string
  /** Start in ingeklapte staat */
  defaultCollapsed?: boolean
  /** Toon een dismiss-knop om de TOC volledig te verbergen */
  dismissible?: boolean
}

function safeLocalStorage() {
  try {
    if (typeof window === "undefined") return null
    return window.localStorage
  } catch {
    return null
  }
}

export default function MiniToc({
  items,
  className,
  storageKey = "mini-toc",
  defaultCollapsed = false,
  dismissible = true,
}: Props) {
  const escapeId = (id: string) => (typeof CSS !== "undefined" && CSS.escape ? CSS.escape(id) : id)
  const headings = useMemo(
    () =>
      items.map((i) => ({
        ...i,
        selector: `#${escapeId(i.id)}`,
      })),
    [items],
  )

  const [activeId, setActiveId] = useState<string | null>(null)
  const [collapsed, setCollapsed] = useState<boolean>(defaultCollapsed)
  const [dismissed, setDismissed] = useState<boolean>(false)
  const [hasMounted, setHasMounted] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    setHasMounted(true)
    const ls = safeLocalStorage()
    if (!ls) return
    try {
      const raw = ls.getItem(storageKey)
      if (raw) {
        const parsed = JSON.parse(raw) as { collapsed?: boolean; dismissed?: boolean }
        if (typeof parsed.collapsed === "boolean") setCollapsed(parsed.collapsed)
        if (typeof parsed.dismissed === "boolean") setDismissed(parsed.dismissed)
      }
    } catch {
      // ignore
    }
  }, [storageKey])

  useEffect(() => {
    if (!hasMounted) return
    const ls = safeLocalStorage()
    if (!ls) return
    try {
      ls.setItem(storageKey, JSON.stringify({ collapsed, dismissed }))
    } catch {
      // ignore
    }
  }, [collapsed, dismissed, storageKey, hasMounted])

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return
    if (!headings.length) return

    const options: IntersectionObserverInit = {
      rootMargin: "0px 0px -70% 0px",
      threshold: [0, 1.0],
    }

    const handler: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActiveId(entry.target.id)
      }
    }

    const obs = new IntersectionObserver(handler, options)
    observerRef.current = obs

    headings.forEach((h) => {
      const el = document.querySelector(h.selector)
      if (el) obs.observe(el)
    })

    return () => obs.disconnect()
  }, [headings])

  if (!headings.length) return null

  if (dismissed) {
    return (
      <button
        type="button"
        aria-label="Open inhoudsopgave"
        onClick={() => setDismissed(false)}
        className={cn(
          "fixed bottom-4 right-4 z-20 rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-sm font-semibold text-slate-700 shadow-md backdrop-blur transition hover:bg-white dark:border-slate-700 dark:bg-slate-950/95 dark:text-slate-100 dark:hover:bg-slate-900",
          "focus:outline-none focus:ring-2 focus:ring-cyan-500",
        )}
      >
        TOC
      </button>
    )
  }

  return (
    <nav
      aria-label="Inhoudsopgave"
      className={cn(
        "not-prose sticky top-4 z-10 mx-auto mb-6 max-w-3xl rounded-2xl border border-white/30 bg-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur dark:border-slate-700/70 dark:bg-slate-950/80 dark:shadow-[0_18px_40px_rgba(2,6,23,0.35)]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2 px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Op deze pagina</span>
          {activeId && (
            <span className="hidden truncate rounded-full border border-white/50 bg-white/70 px-2 py-0.5 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 sm:inline">
              #{activeId}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? "Inhoudsopgave uitklappen" : "Inhoudsopgave inklappen"}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/50 bg-white/70 text-slate-700 shadow-sm transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              className={cn("transition-transform", collapsed ? "-rotate-90" : "rotate-0")}
              aria-hidden="true"
            >
              <path
                d="M6 9l6 6 6-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {dismissible && (
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Inhoudsopgave sluiten"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/50 bg-white/70 text-slate-700 shadow-sm transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-rose-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden px-3 pb-3",
          collapsed ? "max-h-0 opacity-0 transition-all duration-200" : "max-h-[50vh] opacity-100 transition-all duration-300",
        )}
      >
        <div className="flex flex-wrap items-center gap-2">
          {headings.map((h) => {
            const isActive = activeId === h.id
            const pill = cn(
              "inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm transition",
              "border border-white/40 bg-white/60 text-slate-700 hover:bg-white dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800",
              isActive && "border-cyan-400 bg-white text-slate-900 shadow-sm dark:border-cyan-300 dark:bg-slate-800 dark:text-slate-50",
              h.level === 3 && "opacity-80",
            )
            return (
              <Link key={h.id} href={`#${h.id}`} className={pill}>
                {h.text}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
