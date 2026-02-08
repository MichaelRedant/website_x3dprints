import type { Metadata } from "next"
import BlogPage from "@/app/(pages)/blog/BlogPage"

import { EN_METADATA } from "@/app/(pages)/blog/metadata.en"

export const metadata: Metadata = EN_METADATA

export default function BlogPageEn() {
  return <BlogPage locale="en" />
}

