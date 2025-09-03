import { cn } from "@/lib/utils"
import { renderMarkdown } from "@/lib/markdown"

interface MarkdownProps {
  source: string
  className?: string
}

export default async function Markdown({ source, className }: MarkdownProps) {
  const html = await renderMarkdown(source)
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
