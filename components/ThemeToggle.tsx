"use client"

import { motion } from "framer-motion"
import { useThemeMode } from "./ThemeProvider"
import { cn } from "@/lib/utils"

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme, mounted } = useThemeMode()
  const isDark = theme === "dark"

  return (
    <button
      type="button"
      aria-label={isDark ? "Schakel naar dagthema" : "Schakel naar nacht thema"}
      onClick={toggleTheme}
      className={cn(
        "group relative inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400",
        isDark
          ? "border border-[#161821] bg-gradient-to-r from-[#0B0F1A] via-[#0B0F1A] to-[#0F1324] text-[#7dd0ff] shadow-[0_0_16px_rgba(0,230,255,.28)] hover:border-[#00E6FF] hover:shadow-[0_0_26px_rgba(0,230,255,.36)]"
          : "border border-slate-200 bg-white/85 text-slate-700 shadow-sm hover:border-slate-300 hover:bg-white",
        className,
      )}
    >
      <span className={cn("flex items-center gap-1 text-[10px]", isDark ? "text-[#9DB2D7]" : "text-slate-500")}>
        {isDark ? <MoonIcon /> : <SunIcon />}
        {isDark ? "Nacht" : "Dag"}
      </span>
      <div
        className={cn(
          "relative h-7 w-12 overflow-hidden rounded-full border",
          isDark
            ? "border-[#1f2336] bg-[#06060A] shadow-[inset_0_0_0_1px_rgba(0,230,255,.25)]"
            : "border-slate-200 bg-slate-50 shadow-[inset_0_0_0_1px_rgba(100,116,139,.12)]",
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-0 opacity-60",
            isDark
              ? "bg-[radial-gradient(circle_at_30%_30%,rgba(0,230,255,.15),transparent)]"
              : "bg-[radial-gradient(circle_at_20%_30%,rgba(99,102,241,.12),transparent)]",
          )}
        />
        {mounted && (
          <motion.span
            layout
            initial={false}
            animate={{ x: isDark ? 22 : 0 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            className={cn(
              "absolute inset-y-0 m-1 flex w-4 items-center justify-center rounded-md",
              isDark
                ? "bg-gradient-to-br from-[#11172A] to-[#0B0F1A] shadow-[0_0_12px_rgba(0,230,255,.5)]"
                : "bg-white shadow-[0_4px_8px_rgba(0,0,0,.08)]",
            )}
          >
            <motion.span
              layout
              className={cn("h-4 w-4 rounded-full text-[10px]", isDark ? "text-[#00E6FF]" : "text-amber-500")}
            >
              {isDark ? <MoonIcon /> : <SunIcon />}
            </motion.span>
          </motion.span>
        )}
        {!mounted && (
          <span className="absolute inset-y-0 left-1 m-1 w-4 rounded-md bg-white shadow-[0_4px_8px_rgba(0,0,0,.08)]" />
        )}
      </div>
      <span className={cn("text-[10px]", isDark ? "text-[#FF00A8] drop-shadow-[0_0_8px_rgba(255,0,168,.55)]" : "text-slate-500")}>
        {isDark ? "Dark" : "Light"}
      </span>
    </button>
  )
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M3 12h2M19 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <path d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79Z" />
    </svg>
  )
}
