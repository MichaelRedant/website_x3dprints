"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Box } from "lucide-react"
import { cn } from "@/lib/utils"

export default function PrivateModelPreviewShortcut({ mobile = false }: { mobile?: boolean }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const refresh = () => setVisible(window.localStorage.getItem("x3dprints-model-preview-shortcut") === "1")
    refresh()
    window.addEventListener("storage", refresh)
    window.addEventListener("x3dprints:model-preview-auth", refresh)
    return () => {
      window.removeEventListener("storage", refresh)
      window.removeEventListener("x3dprints:model-preview-auth", refresh)
    }
  }, [])

  if (!visible) return null

  return (
    <Link
      href="/model-preview-admin/"
      className={cn(
        "inline-flex items-center justify-center gap-2 font-bold text-cyan-700 transition hover:text-cyan-500 dark:text-cyan-300 dark:hover:text-cyan-200",
        mobile
          ? "w-full rounded-xl border border-cyan-200 bg-cyan-50 px-3 py-2.5 text-sm dark:border-cyan-500/30 dark:bg-cyan-500/10"
          : "rounded-lg border border-cyan-200/80 bg-cyan-50/80 px-2.5 py-2 text-xs dark:border-cyan-500/30 dark:bg-cyan-500/10",
      )}
      aria-label="Modelpreviews beheren"
    >
      <Box className="h-4 w-4" />
      <span>{mobile ? "Modelpreviews beheren" : "Previews"}</span>
    </Link>
  )
}
