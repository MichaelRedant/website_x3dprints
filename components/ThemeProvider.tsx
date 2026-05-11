"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type Theme = "light" | "dark"

type ThemeContextValue = {
  theme: Theme
  toggleTheme: () => void
  setTheme: (value: Theme) => void
  mounted: boolean
}

const STORAGE_KEY = "x3d-theme"

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

function applyTheme(next: Theme) {
  const root = document.documentElement
  root.classList.toggle("dark", next === "dark")
  root.dataset.theme = next
  localStorage.setItem(STORAGE_KEY, next)
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
    const initial = stored ?? (prefersDark ? "dark" : "light")
    setTheme(initial)
    applyTheme(initial)
    setMounted(true)

    const watcher = (event: MediaQueryListEvent) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        const next = event.matches ? "dark" : "light"
        setTheme(next)
        applyTheme(next)
      }
    }
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    media.addEventListener("change", watcher)
    return () => media.removeEventListener("change", watcher)
  }, [])

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark"
    setTheme(next)
    applyTheme(next)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeMode() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useThemeMode must be used within ThemeProvider")
  return ctx
}
