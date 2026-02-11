import type { Metadata } from "next"
import type { ReactNode } from "react"
import { SHOP_INDEXABLE } from "@/content/shop-products"

const SHOP_ROBOTS: Metadata["robots"] = SHOP_INDEXABLE
  ? { index: true, follow: true }
  : {
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
    }

export const metadata: Metadata = {
  robots: SHOP_ROBOTS,
}

export default function ShopLayout({ children }: { children: ReactNode }) {
  return children
}
