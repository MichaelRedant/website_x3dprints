import { cn } from "@/lib/utils"

interface MarkdownProps {
  html: string
  className?: string
}

export default function Markdown({ html, className }: MarkdownProps) {
  return (
    <article
      className={cn(
        "prose prose-slate lg:prose-lg dark:prose-invert prose-x3d leading-relaxed",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
