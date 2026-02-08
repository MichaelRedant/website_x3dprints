import type { Metadata } from "next"
import BlogPage from "@/app/(pages)/blog/page"
import { EN_METADATA } from "@/app/(pages)/blog/metadata.en"

export const metadata: Metadata = EN_METADATA

type PageProps = { searchParams?: Promise<{ lang?: string } | undefined> }

export default function BlogPageEn(props: PageProps) {
  return <BlogPage {...props} locale="en" />
}
