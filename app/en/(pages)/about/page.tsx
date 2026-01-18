import type { Metadata } from "next"
import AboutPage, { EN_METADATA } from "@/app/(pages)/about/page"

export const metadata: Metadata = EN_METADATA

type PageProps = { searchParams?: Promise<{ lang?: string } | undefined> }

export default function AboutPageEn(props: PageProps) {
  return <AboutPage {...props} locale="en" />
}
