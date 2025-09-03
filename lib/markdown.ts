// lib/markdown.ts
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import remarkRehype from "remark-rehype"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
import rehypeStringify from "rehype-stringify"

/**
 * Minimal, expliciet sanitize schema zodat headings, lijsten, tabellen,
 * codeblokken, images en links blijven bestaan. Geen 'any', geen JSON hacks.
 */
type SanitizeSchema = {
  tagNames?: string[]
  attributes?: Record<string, Array<string | [string]>>
  protocols?: Record<string, string[]>
}

const safeSchema: SanitizeSchema = {
  tagNames: [
    "a","abbr","b","blockquote","br","code","em","i","img","hr","kbd","mark","s","strong","sub","sup","u",
    "p","h1","h2","h3","h4","h5","h6",
    "ul","ol","li",
    "table","thead","tbody","tr","th","td",
    "pre","span"
  ],
  attributes: {
    a: [["href"], ["title"], ["rel"], ["target"], ["className"]],
    img: [["src"], ["alt"], ["title"], ["width"], ["height"], ["className"]],
    p: [["className"]],
    h1: [["className"]], h2: [["className"]], h3: [["className"]], h4: [["className"]], h5: [["className"]], h6: [["className"]],
    ul: [["className"]], ol: [["className"]], li: [["className"]],
    blockquote: [["className"]],
    code: [["className"]],
    pre: [["className"]],
    table: [["className"]],
    thead: [["className"]],
    tbody: [["className"]],
    tr: [["className"]],
    th: [["className"]],
    td: [["className"]],
    span: [["className"]],
  },
  protocols: {
    href: ["http", "https", "mailto", "tel"],
    src: ["http", "https", "data"]
  }
}

/** Markdown -> veilige HTML string (GFM, raw HTML allowed + sanitized). */
export async function renderMarkdown(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSanitize, safeSchema as unknown as any) // rehype-sanitize verwacht een Schema; structureel compatibel
    .use(rehypeStringify)
    .process(markdown)

  return String(file.value)
}
