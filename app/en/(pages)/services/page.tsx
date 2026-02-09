import type { Metadata } from "next"
import ServicesPage from "@/app/(pages)/services/page"
import { EN_METADATA } from "@/app/(pages)/services/metadata.en"

export const metadata: Metadata = EN_METADATA

type PageProps = { searchParams?: Promise<{ lang?: string } | undefined> }

export default function ServicesPageEn(props: PageProps) {
  return <ServicesPage {...props} searchParams={Promise.resolve({ lang: "en" })} />
}

