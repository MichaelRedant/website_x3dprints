import type { ReactNode } from "react"
import BlogShareFooter from "@/components/BlogShareFooter"
import BlogInlineCta from "@/components/BlogInlineCta"

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <BlogInlineCta variant="bottom" />
      <BlogShareFooter />
    </>
  )
}
