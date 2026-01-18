import type { Metadata } from "next"
import ServicesPage, { EN_METADATA } from "@/app/(pages)/services/page"

export const metadata: Metadata = EN_METADATA

type PageProps = { searchParams?: Promise<{ lang?: string } | undefined> }

export default function ServicesPageEn(props: PageProps) {
  return <ServicesPage {...props} locale="en" />
}
