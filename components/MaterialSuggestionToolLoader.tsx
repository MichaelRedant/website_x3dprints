"use client"

import { Suspense, lazy } from "react"

const LazyMaterialSuggestionTool = lazy(() => import("./MaterialSuggestionTool"))

function ToolSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]" aria-hidden>
      <div className="h-full rounded-3xl border border-white/50 bg-white/70 p-6 shadow-inner backdrop-blur">
        <div className="h-4 w-24 rounded-full bg-slate-200" />
        <div className="mt-4 h-6 w-2/3 rounded-full bg-slate-200" />
        <div className="mt-6 space-y-3">
          <div className="h-10 rounded-2xl bg-slate-100" />
          <div className="h-10 rounded-2xl bg-slate-100" />
          <div className="h-10 rounded-2xl bg-slate-100" />
        </div>
      </div>
      <div className="grid gap-4">
        <div className="h-48 rounded-3xl border border-white/50 bg-white/70 shadow-inner backdrop-blur" />
        <div className="h-48 rounded-3xl border border-white/50 bg-white/70 shadow-inner backdrop-blur" />
      </div>
    </div>
  )
}

export default function MaterialSuggestionToolLoader() {
  return (
    <Suspense fallback={<ToolSkeleton />}>
      <LazyMaterialSuggestionTool />
    </Suspense>
  )
}
