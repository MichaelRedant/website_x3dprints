import type { Metadata } from "next"
import HomePage from "@/app/(home)/page"
import { EN_METADATA } from "@/app/(home)/metadata.en"

export const metadata: Metadata = EN_METADATA

const HomePageWithLocale = HomePage as unknown as (props: { localeOverride: "en" }) => ReturnType<typeof HomePage>

export default function HomePageEn() {
  return <HomePageWithLocale localeOverride="en" />
}
