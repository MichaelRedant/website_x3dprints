import type { Metadata } from "next"
import PortfolioPage, { EN_METADATA } from "@/app/(pages)/portfolio/page"

export const metadata: Metadata = EN_METADATA

export default function PortfolioPageEn() {
  return <PortfolioPage searchParams={{ lang: "en" }} />
}
