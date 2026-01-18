"use client"

import Link from "next/link"
import Image from "next/image"
import Container from "./Container"
import ThemeToggle from "./ThemeToggle"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import LanguageSwitcher from "./LanguageSwitcher"
import { useLocale } from "./LocaleProvider"
import { localizeHref } from "@/lib/i18n/paths"
import { cn } from "@/lib/utils"


const NAV = [
  { href: "/services", label: { nl: "Services", en: "Services" } },
  { href: "/materials", label: { nl: "Materialen", en: "Materials" } },
  { href: "/viewer", label: { nl: "3D Viewer", en: "3D Viewer" } },
  { href: "/portfolio", label: { nl: "Portfolio", en: "Portfolio" } },
  { href: "/about", label: { nl: "Over ons", en: "About" } },
  { href: "/pricing", label: { nl: "Prijzen", en: "Pricing" } },
  { href: "/3d-modellen-vinden", label: { nl: "3D modellen", en: "3D models" } },
]

export default function Header() {
  const { locale } = useLocale()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const overlayRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = original
      }
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const normalizedPath = pathname?.replace(/^\/en(?=\/|$)/, "") || "/"

  function isActive(href: string) {
    if (href === "/") return normalizedPath === "/"
    return normalizedPath === href || normalizedPath?.startsWith(href + "/")
  }

  const localizedHref = (href: string) => localizeHref(href, locale)

  const quoteLabel = locale === "en" ? "Request a quote" : "Offerte"

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 isolate overflow-visible transition-all duration-500",
        open ? "z-[1200]" : "z-[200]",
        scrolled
          ? "bg-white/80 shadow-[0_12px_34px_rgba(0,0,0,.08)] border-b border-slate-200/70 supports-[backdrop-filter]:backdrop-blur-2xl supports-[backdrop-filter]:backdrop-saturate-150 dark:border-[#161821] dark:bg-[#0B0F1A]/92 dark:shadow-[0_18px_36px_rgba(0,0,0,.55)]"
          : "bg-transparent border-b border-transparent shadow-none dark:before:opacity-0 dark:after:opacity-0",
        scrolled &&
          "dark:before:pointer-events-none dark:before:absolute dark:before:inset-0 dark:before:bg-[linear-gradient(90deg,rgba(0,230,255,0.12),transparent,rgba(215,38,61,0.12))] dark:before:opacity-70 dark:after:pointer-events-none dark:after:absolute dark:after:inset-x-0 dark:after:bottom-0 dark:after:h-px dark:after:bg-[radial-gradient(circle_at_10%_50%,rgba(0,230,255,0.4),transparent),radial-gradient(circle_at_90%_50%,rgba(215,38,61,0.35),transparent)]",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 overflow-hidden transition-opacity duration-500",
          scrolled ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="absolute -left-10 top-[-35%] h-48 w-48 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(0,230,255,0.32),transparent_55%)] blur-3xl opacity-80" />
        <div className="absolute right-[-18%] top-1/2 h-52 w-52 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_70%_40%,rgba(255,0,168,0.28),transparent_60%)] blur-3xl opacity-70" />
        <div className="absolute bottom-[-28%] left-1/4 h-28 w-64 rounded-full bg-[conic-gradient(from_120deg_at_50%_50%,rgba(255,255,255,0.35),rgba(0,230,255,0.12),rgba(255,0,168,0.14),rgba(255,255,255,0.35))] blur-2xl opacity-60" />
      </div>
      <Container
        className={cn(
          "relative flex items-center justify-between transition-all duration-500 dark:py-2",
          scrolled ? "h-14 py-1" : "h-16",
        )}
      >
        <div className="pointer-events-none absolute inset-x-0 -top-6 hidden h-3 bg-[radial-gradient(circle_at_50%_100%,rgba(0,230,255,0.35),transparent)] blur-lg md:block" />
        <div className="pointer-events-none absolute inset-0 -z-10 hidden bg-[linear-gradient(120deg,rgba(0,230,255,0.08),rgba(215,38,61,0.08))] opacity-50 md:block" />
        {/* Brand */}
        <Link href={localizedHref("/")} className="group inline-flex items-center gap-3">
          <Image
            src="/Logo.webp"
            alt="X3DPrints logo"
            width={58}
            height={58}
            priority
            className={cn(
              "object-contain drop-shadow-[0_0_14px_rgba(255,0,56,.35)] transition-all duration-500",
              scrolled ? "h-9 w-9 md:h-10 md:w-10" : "h-10 w-10 md:h-11 md:w-11",
            )}
          />
          <span
            className={cn(
              "font-semibold tracking-tight transition-all duration-500",
              scrolled ? "text-[14px]" : "text-[15px]",
              "text-slate-900 dark:text-slate-100",
            )}
          >
            X3DPrints
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-3 lg:flex lg:overflow-x-auto lg:overflow-y-visible lg:whitespace-nowrap lg:px-1 lg:-mx-1">
          {NAV.map((item) => {
            const active = isActive(item.href)
            const label = locale === "en" ? item.label.en : item.label.nl
            const href = localizedHref(item.href)
            return (
              <Link
                key={item.href}
                href={href}
                className={cn(
                  "group relative px-3 py-2 text-sm font-semibold transition hover:text-slate-900 dark:text-[#e7f5ff] dark:hover:text-white dark:tracking-[0.12em] dark:uppercase dark:bg-transparent dark:shadow-none md:text-[13px] lg:text-sm",
                  scrolled ? "text-slate-800" : "text-slate-700",
                )}
              >
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,230,255,0.55),transparent)] opacity-30" />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,0,168,0.55),transparent)] opacity-0 transition duration-200 group-hover:opacity-100" />
                <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_200%,rgba(0,230,255,0.12),transparent)] opacity-0 transition duration-200 group-hover:opacity-70" />
                <span className="relative drop-shadow-[0_0_12px_rgba(0,230,255,.4)] group-hover:drop-shadow-[0_0_16px_rgba(255,0,168,.5)]">
                  {label}
                </span>
                <AnimatePresence>
                  {active && (
                    <motion.span
                      layoutId="nav-active-underline"
                      className="absolute inset-x-1 -bottom-0.5 h-[2px] rounded-full bg-slate-900 dark:bg-[#FF00A8] dark:shadow-[0_0_14px_rgba(255,0,168,.8)]"
                      initial={{ opacity: 0, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 2 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>
              </Link>
            )
          })}
          <LanguageSwitcher className="ml-2" />
          <ThemeToggle className="ml-2" />
          <Link
            href={localizedHref("/contact")}
            className="ml-2 inline-flex items-center gap-2 rounded-xl border border-slate-200/70 bg-[linear-gradient(90deg,#6366f1,45%,#22d3ee)] px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(99,102,241,.35)] transition hover:brightness-110 dark:border-[#1f2336] dark:bg-[linear-gradient(90deg,#D7263D,45%,#7A00FF)] dark:shadow-[0_8px_24px_rgba(215,38,61,.4)] dark:ring-1 dark:ring-[#00E6FF]/40"
          >
            {quoteLabel}
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/60 bg-white/70 text-slate-900 shadow-sm backdrop-blur transition hover:border-slate-300 dark:border-[#1f2336] dark:bg-[#0B0F1A] dark:text-slate-100 lg:hidden"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        {/* Mobile sheet */}
        <AnimatePresence>
          {open && (
            <>
              {/* Click-catcher / backdrop */}
              <motion.button
                ref={overlayRef}
                aria-label="Sluit menu"
                className="fixed inset-0 z-[1210] bg-black/50 backdrop-blur-sm lg:hidden"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <motion.div
                className="fixed left-1/2 top-3 z-[1220] w-[94%] max-w-md -translate-x-1/2 overflow-hidden rounded-2xl border border-slate-200/70 bg-white/90 p-4 shadow-xl backdrop-blur lg:hidden dark:border-[#1f2336] dark:bg-[#0B0F1A]/95 dark:text-slate-100 max-h-[calc(100vh-1.5rem)] overflow-y-auto"
                role="dialog"
                aria-modal="true"
                initial={{ y: -16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
              >
                <div className="flex items-center justify-between px-1 py-1">
                  <div className="inline-flex items-center gap-3">
                    <Image
                      src="/Logo.webp"
                      alt="X3DPrints logo"
                      width={40}
                      height={40}
                      className="h-10 w-10 object-contain drop-shadow-[0_0_12px_rgba(255,0,56,.35)]"
                    />
                    <span className="text-sm font-semibold">X3DPrints</span>
                  </div>
                  <button
                    aria-label="Sluit"
                    onClick={() => setOpen(false)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/60 bg-white/70 dark:border-[#1f2336] dark:bg-[#0B0F1A]"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                <div className="mt-2 grid gap-1">
                  {NAV.map((item) => {
                    const active = isActive(item.href)
                    const label = locale === "en" ? item.label.en : item.label.nl
                    const href = localizedHref(item.href)
                    return (
                      <Link
                        key={item.href}
                        href={href}
                        onClick={() => setOpen(false)}
                        className={[
                          "rounded-xl px-3 py-2.5 text-base font-medium transition",
                          active
                            ? "bg-white text-slate-900 shadow-sm dark:bg-[#111525] dark:text-white"
                            : "text-slate-700 hover:bg-white hover:text-slate-900 dark:text-slate-200 dark:hover:bg-[#111525] dark:hover:text-white",
                        ].join(" ")}
                      >
                        {label}
                      </Link>
                    )
                  })}
                  <div className="mt-2">
                    <LanguageSwitcher className="w-full justify-between" />
                  </div>
                  <div className="mt-2">
                    <ThemeToggle className="w-full justify-between" />
                  </div>
                </div>

                <div className="mt-3 border-t border-slate-200/70 pt-3">
                  <Link
                    href={localizedHref("/contact")}
                    onClick={() => setOpen(false)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200/70 bg-[linear-gradient(90deg,#D7263D,45%,#7A00FF)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(215,38,61,.35)] transition hover:brightness-110 dark:border-[#1f2336]"
                  >
                    {locale === "en" ? "Request a quote" : "Offerte aanvragen"}
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Container>
    </header>
  )
}
