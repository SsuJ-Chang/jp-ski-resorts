import { createMarkdownProcessor } from '@astrojs/markdown-remark'

type MarkdownNode = {
  type: string
  value?: string
  children?: MarkdownNode[]
}

const preserveSoftLineBreaks = () => {
  const transform = (node: MarkdownNode) => {
    if (!node.children) {
      return
    }

    node.children = node.children.flatMap((child) => {
      if (child.type === 'text' && child.value?.includes('\n')) {
        return child.value.split('\n').flatMap((segment, index, segments) => {
          const nodes: MarkdownNode[] = []

          if (segment.length > 0) {
            nodes.push({ type: 'text', value: segment })
          }

          if (index < segments.length - 1) {
            nodes.push({ type: 'break' })
          }

          return nodes
        })
      }

      transform(child)
      return [child]
    })
  }

  return (tree: MarkdownNode) => transform(tree)
}

const markdownProcessorPromise = createMarkdownProcessor({
  syntaxHighlight: false,
  remarkPlugins: [preserveSoftLineBreaks],
})

const normalizeTwoSpaceNestedLists = (markdown: string) =>
  markdown.replace(/^ {2}(?=(?:[-*+]|\d+[.)])\s)/gm, '    ')

const escapeRawHtml = (markdown: string) => markdown.replace(/</g, '&lt;').replace(/>/g, '&gt;')

export const renderMarkdownFragment = async (markdown: string) => {
  const processor = await markdownProcessorPromise
  const normalizedMarkdown = normalizeTwoSpaceNestedLists(markdown)
  const { code } = await processor.render(escapeRawHtml(normalizedMarkdown))

  return code
}
