import type { Metadata } from "next"
import type { ReactNode } from "react"
import ThemeProvider from "@/components/ThemeProvider"

export const metadata: Metadata = {
  title: "X3D Bibliotheek",
  description: "Lokale werkruimte voor 3D-bestanden, projecten en printlogs.",
  robots: { index: false, follow: false, nocache: true },
}

export default function BibliotheekLayout({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>
}
