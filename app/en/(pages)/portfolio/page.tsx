import type { Metadata } from "next"
import PortfolioPage, { EN_METADATA } from "@/app/(pages)/portfolio/page"

export const metadata: Metadata = EN_METADATA

type PageProps = { searchParams?: Promise<{ lang?: string } | undefined> }

export default function PortfolioPageEn(props: PageProps) {
  return <PortfolioPage {...props} locale="en" />
}
