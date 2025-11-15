"use client"

import Link from "next/link"
import Image from "next/image"
import Container from "./Container"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"


const NAV = [
  { href: "/services", label: "Services" },
  { href: "/materials", label: "Materialen" },
  { href: "/viewer", label: "3D Viewer" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "Over ons" },
  { href: "/pricing", label: "Prijzen" },
  { href: "/contact", label: "Contact" },
]

export default function Header() {
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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  function isActive(href: string) {
    if (href === "/") return pathname === "/"
    return pathname === href || pathname?.startsWith(href + "/")
  }

  return (
    <header
      className={[
        "sticky top-0 z-50 transition-all",
        "supports-[backdrop-filter]:bg-white/60",
        "supports-[backdrop-filter]:backdrop-blur",
        "border-b",
        scrolled ? "bg-white/80 shadow-[0_10px_30px_rgba(0,0,0,.05)]" : "bg-white/40",
      ].join(" ")}
    >
      <Container className="flex h-16 items-center justify-between">
        {/* Brand */}
        <Link href="/" className="group inline-flex items-center gap-3">
  <Image
    src="/Logo.webp"
    alt="X3DPrints"
    width={58}
    height={58}
    priority
    className="h-10 w-10 md:h-11 md:w-11 object-contain"
  />
  <span className="text-md font-semibold tracking-tight text-slate-900">X3DPrints</span>
</Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-white/70 hover:text-slate-900"
              >
                {item.label}
                <AnimatePresence>
                  {active && (
                    <motion.span
                      layoutId="nav-active-underline"
                      className="absolute inset-x-2 -bottom-0.5 h-[2px] rounded-full bg-slate-900"
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
          <Link
            href="/contact"
            className="ml-2 inline-flex items-center gap-2 rounded-xl border border-slate-200/70 bg-[linear-gradient(90deg,#6366f1,45%,#22d3ee)] px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(99,102,241,.35)] transition hover:brightness-110"
          >
            Offerte
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/60 bg-white/70 text-slate-900 shadow-sm backdrop-blur md:hidden"
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
                className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm md:hidden"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <motion.div
                className="fixed left-1/2 top-2 z-[70] w-[94%] max-w-md -translate-x-1/2 overflow-hidden rounded-2xl border border-slate-200/70 bg-white/80 p-4 shadow-xl backdrop-blur md:hidden"
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
    alt="X3DPrints"
    width={40}
    height={40}
    className="h-10 w-10 object-contain"
  />
  <span className="text-sm font-semibold">X3DPrints</span>
</div>
                  <button
                    aria-label="Sluit"
                    onClick={() => setOpen(false)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/60 bg-white/70"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                <div className="mt-2 grid gap-1">
                  {NAV.map((item) => {
                    const active = isActive(item.href)
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={[
                          "rounded-xl px-3 py-2.5 text-base font-medium transition",
                          active
                            ? "bg-white text-slate-900 shadow-sm"
                            : "text-slate-700 hover:bg-white hover:text-slate-900",
                        ].join(" ")}
                      >
                        {item.label}
                      </Link>
                    )
                  })}
                </div>

                <div className="mt-3 border-t border-slate-200/70 pt-3">
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200/70 bg-[linear-gradient(90deg,#6366f1,45%,#22d3ee)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(99,102,241,.35)] transition hover:brightness-110"
                  >
                    Offerte aanvragen
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
