import type { Metadata } from "next"
import ModelPreviewAdmin from "@/components/ModelPreviewAdmin"

export const metadata: Metadata = {
  title: "Modelpreviews beheren | X3DPrints",
  description: "Beveiligd beheer voor tijdelijke X3DPrints-klantpreviews.",
  robots: { index: false, follow: false, noarchive: true, nocache: true },
  alternates: { canonical: "https://www.x3dprints.be/model-preview-admin/" },
}

export default function ModelPreviewAdminPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.12),_transparent_34%),linear-gradient(to_bottom,_#f8fafc,_#eef2f7)] px-4 py-10 dark:bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.12),_transparent_34%),linear-gradient(to_bottom,_#020617,_#0f172a)] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl"><ModelPreviewAdmin /></div>
    </main>
  )
}
