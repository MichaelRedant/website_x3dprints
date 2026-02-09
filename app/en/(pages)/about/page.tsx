import type { Metadata } from "next"
import AboutPage from "@/app/(pages)/about/page"
import { EN_METADATA } from "@/app/(pages)/about/metadata.en"

export const metadata: Metadata = EN_METADATA

type PageProps = { searchParams?: Promise<{ lang?: string } | undefined> }

export default function AboutPageEn(props: PageProps) {
  return <AboutPage {...props} searchParams={Promise.resolve({ lang: "en" })} />
}

