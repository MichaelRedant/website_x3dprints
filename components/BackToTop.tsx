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
            "dark:border-[#00E6FF]/40 dark:bg-[radial-gradient(circle_at_20%_20%,rgba(0,230,255,0.18),transparent),linear-gradient(120deg,#0F1324,#0B0F1A)] dark:text-white dark:shadow-[0_20px_60px_rgba(0,0,0,0.65),0_0_0_1px_rgba(0,230,255,0.15)]",
          )}
          aria-label="Terug naar boven"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/90 to-cyan-400/90 text-base text-white shadow-inner dark:from-[#FF00A8] dark:to-[#00E6FF] sm:h-8 sm:w-8">
            ↑
          </span>
          Naar boven
        </motion.button>
      )}
    </AnimatePresence>
  )
}
