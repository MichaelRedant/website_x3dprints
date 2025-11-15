"use client"

import dynamic from "next/dynamic"

import type { ModelViewerProps } from "./ModelViewer"

const LazyModelViewer = dynamic(() => import("./ModelViewer"), {
  ssr: false,
  loading: () => (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="aspect-[4/3] w-full animate-pulse rounded-3xl bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-slate-900/80" />
      <div className="grid gap-4">
        <div className="h-32 rounded-3xl bg-white/40" />
        <div className="h-24 rounded-3xl bg-white/30" />
      </div>
    </div>
  ),
})

export default function ModelViewerClient(props: ModelViewerProps) {
  return <LazyModelViewer {...props} />
}
