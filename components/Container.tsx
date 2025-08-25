import { ReactNode } from "react"

export default function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`container-px max-w-6xl mx-auto ${className}`}>{children}</div>
}
