import type { Metadata } from "next"
import HomePage, { EN_METADATA } from "@/app/(home)/page"

export const metadata: Metadata = EN_METADATA

type PageProps = { searchParams?: Promise<{ lang?: string } | undefined> }

export default function HomePageEn(props: PageProps) {
  return <HomePage {...props} locale="en" />
}
