import { ReactNode } from "react"
import { cn } from "@/lib/utils"

export default function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[90rem] px-4 sm:px-6 lg:px-10 xl:px-14",
        className,
      )}
    >
      {children}
    </div>
  )
}
