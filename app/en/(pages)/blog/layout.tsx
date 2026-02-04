import type { ReactNode } from "react"
import BlogLayout from "@/app/(pages)/blog/layout"

export default function EnBlogLayout({ children }: { children: ReactNode }) {
  return <BlogLayout>{children}</BlogLayout>
}
