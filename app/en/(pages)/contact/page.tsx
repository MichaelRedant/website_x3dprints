import type { Metadata } from "next"
import ContactPage from "@/app/(pages)/contact/page"
import { EN_METADATA } from "@/app/(pages)/contact/metadata.en"

export const metadata: Metadata = EN_METADATA

const ContactPageWithLocale = ContactPage as unknown as (props: { localeOverride: "en" }) => ReturnType<typeof ContactPage>

export default function ContactPageEn() {
  return <ContactPageWithLocale localeOverride="en" />
}

