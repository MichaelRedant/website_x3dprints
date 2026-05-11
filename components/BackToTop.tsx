"use client"

import { useCallback, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const SHOW_AFTER = 320

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-4 right-4 z-[70] inline-flex items-center gap-2 rounded-2xl border border-white/60 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-[0_12px_30px_rgba(15,23,42,0.16)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-white sm:bottom-6 sm:right-6 sm:px-4 sm:py-2 sm:text-sm",
            "dark:border-slate-700/80 dark:bg-slate-950/98 dark:text-slate-100 dark:shadow-[0_20px_60px_rgba(2,6,23,0.55)] dark:hover:bg-slate-900",
          )}
          aria-label="Terug naar boven"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl border border-slate-200/70 bg-slate-100 text-base text-slate-900 shadow-inner dark:border-slate-700/80 dark:bg-slate-900 dark:text-slate-50 sm:h-8 sm:w-8">
            ↑
          </span>
          Naar boven
        </motion.button>
      )}
    </AnimatePresence>
  )
}
