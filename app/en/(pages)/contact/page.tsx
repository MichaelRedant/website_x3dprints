import type { Metadata } from "next"
import ContactPage, { EN_METADATA } from "@/app/(pages)/contact/page"

export const metadata: Metadata = EN_METADATA

type PageProps = { searchParams?: Promise<{ lang?: string } | undefined> }

export default function ContactPageEn(props: PageProps) {
  return <ContactPage {...props} locale="en" />
}
