import type { Metadata } from "next"
import BlogPage, { EN_METADATA } from "@/app/(pages)/blog/page"

export const metadata: Metadata = EN_METADATA

export default function BlogPageEn() {
  return <BlogPage searchParams={{ lang: "en" }} />
}
