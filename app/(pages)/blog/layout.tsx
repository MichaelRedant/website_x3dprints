import type { ReactNode } from "react"
import BlogShareFooter from "@/components/BlogShareFooter"

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <BlogShareFooter />
    </>
  )
}
