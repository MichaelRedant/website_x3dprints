import type { Metadata } from "next"
import ContactPage from "@/app/(pages)/contact/page"
import { EN_METADATA } from "@/app/(pages)/contact/metadata.en"

export const metadata: Metadata = EN_METADATA

type PageProps = { searchParams?: Promise<{ lang?: string } | undefined> }

export default function ContactPageEn(props: PageProps) {
  return <ContactPage {...props} searchParams={Promise.resolve({ lang: "en" })} />
}

