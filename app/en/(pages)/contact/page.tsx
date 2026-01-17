import type { Metadata } from "next"
import ContactPage, { EN_METADATA } from "@/app/(pages)/contact/page"

export const metadata: Metadata = EN_METADATA

export default function ContactPageEn(props: { searchParams?: { lang?: string } }) {
  return <ContactPage {...props} searchParams={{ ...props.searchParams, lang: "en" }} />
}
