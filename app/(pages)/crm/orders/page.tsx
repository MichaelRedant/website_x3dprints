"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function CrmOrdersRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/crm?view=orders")
  }, [router])

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      <p className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
        Orders hub laden...
      </p>
    </main>
  )
}
