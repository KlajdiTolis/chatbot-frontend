import type { ComponentPropsWithoutRef } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type TextPartProps = { text: string }

/**
 * The Markdown renderer does not process raw HTML, so any stray tag the model emits
 * (most often `<br>` inside a table cell) would otherwise show up literally. Strip the
 * common ones here as a safety net — the system prompt already tells the model to emit
 * Markdown only.
 */
function stripStrayHtml(text: string): string {
  return text
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/<\/?(?:b|i|u|em|strong|span|div|p|small|font)\b[^>]*>/gi, '')
}

/**
 * Renders an assistant text part as GitHub-Flavored Markdown so the bid answers come
 * through as real tables, lists, headings and links instead of raw `**` and `|`.
 * Typography comes from the `prose` wrapper in Thread.tsx; a few elements are overridden
 * here for behaviour (links open in a new tab, wide tables scroll).
 */
export function MarkdownText({ text }: TextPartProps) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: (props: ComponentPropsWithoutRef<'a'>) => (
          <a
            {...props}
            target="_blank"
            rel="noreferrer noopener"
            className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700"
          />
        ),
        table: (props: ComponentPropsWithoutRef<'table'>) => (
          <div className="my-2 w-full overflow-x-auto">
            <table {...props} className="w-full border-collapse text-left text-xs" />
          </div>
        ),
        th: (props: ComponentPropsWithoutRef<'th'>) => (
          <th
            {...props}
            className="border-b border-gray-300 bg-gray-50 px-2 py-1.5 font-semibold whitespace-nowrap"
          />
        ),
        td: (props: ComponentPropsWithoutRef<'td'>) => (
          <td {...props} className="border-b border-gray-200 px-2 py-1.5 align-top" />
        ),
      }}
    >
      {stripStrayHtml(text)}
    </Markdown>
  )
}
