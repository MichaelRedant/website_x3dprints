// /components/Markdown.tsx
import { cn } from "@/lib/utils"
import { renderMarkdown } from "@/lib/markdown"

interface MarkdownProps {
  source: string
  className?: string
}

/**
 * Server Component die markdown rendert naar gesanitize HTML
 * en in een typografisch "prose" blok toont.
 */
export default async function Markdown({ source, className }: MarkdownProps) {
  const html = await renderMarkdown(source)

  return (
    <div className="overflow-x-auto">
      <article
        className={cn(
          // zorg dat tailwind-typography plugin actief is
          "prose prose-slate lg:prose-lg dark:prose-invert prose-x3d leading-relaxed",
          // styling voor tabellen/code (optioneel via CSS plugin)
          "[&_.table-wrapper]:-mx-4 [&_.table-wrapper]:overflow-x-auto [&_.table-wrapper_table]:min-w-full",
          className,
        )}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
