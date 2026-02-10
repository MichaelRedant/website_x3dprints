import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: true,
      noimageindex: true,
      noarchive: true,
      nosnippet: true,
    },
  },
}

export default function ShopLayout({ children }: { children: ReactNode }) {
  return children
}
