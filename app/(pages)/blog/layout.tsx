import type { ReactNode } from "react"
import BlogShareFooter from "@/components/BlogShareFooter"
import BlogInlineCta from "@/components/BlogInlineCta"
import BlogReadMore from "@/components/BlogReadMore"

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <BlogReadMore />
      <BlogInlineCta variant="bottom" />
      <BlogShareFooter />
    </>
  )
}
