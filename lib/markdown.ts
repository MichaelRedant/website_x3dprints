// lib/markdown.ts
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import remarkSmartypants from "remark-smartypants"
import remarkRehype from "remark-rehype"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeExternalLinks from "rehype-external-links"
import rehypeStringify from "rehype-stringify"

export async function renderMarkdown(md: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm) // tabellen, checklists
    .use(remarkSmartypants, { dashes: "oldschool" })
    .use(remarkRehype, { allowDangerousHtml: false })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "wrap",
      properties: {
        className: ["no-underline", "hover:underline", "decoration-cyan-500", "underline-offset-4"],
      },
    })
    .use(rehypeExternalLinks, { rel: ["nofollow","noopener","noreferrer"], target: "_blank" })
    .use(rehypeStringify)
    .process(md)

  return String(file)
}
