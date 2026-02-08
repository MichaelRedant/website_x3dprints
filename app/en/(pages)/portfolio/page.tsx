import type { Metadata } from "next"
import PortfolioPage from "@/app/(pages)/portfolio/page"
import { EN_METADATA } from "@/app/(pages)/portfolio/metadata.en"

export const metadata: Metadata = EN_METADATA

type PageProps = { searchParams?: Promise<{ lang?: string } | undefined> }

export default function PortfolioPageEn(props: PageProps) {
  return <PortfolioPage {...props} locale="en" />
}
