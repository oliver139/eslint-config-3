import type { Rule } from 'eslint'

export const nuxtPreferAtAlias: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: { description: 'Prefer @/ and @@/ for relative paths in nuxt project.' },
    fixable: 'code',
    schema: [],
    messages: { preferAtAlias: 'Use "{{preferred}}/" instead of "{{alias}}/" for this Nuxt path.' },
  },
  create(context) {
    const { sourceCode } = context

    function checkPath(node: Rule.Node) {
      if (node.type !== 'Literal' && node.type !== 'TemplateLiteral') return
      const text = sourceCode.getText(node)
      const alias = /^['"`](~{1,2})\//.exec(text)?.[1]
      if (!alias) return

      const preferred = '@'.repeat(alias.length)
      const start = sourceCode.getRange(node)[0] + 1
      context.report({
        node,
        messageId: 'preferAtAlias',
        data: { alias, preferred },
        fix: fixer => fixer.replaceTextRange([start, start + alias.length], preferred),
      })
    }

    return {
      'ImportDeclaration > .source': checkPath,
      'ExportNamedDeclaration > .source': checkPath,
      'ExportAllDeclaration > .source': checkPath,
      'ImportExpression > .source': checkPath,
      'TSImportType > .source': checkPath,
      'TSExternalModuleReference > .expression': checkPath,
      CallExpression(node) {
        const { callee, arguments: [path] } = node
        if (callee.type !== 'Identifier' || callee.name !== 'require' || !path) return
        if (sourceCode.isGlobalReference(callee)) checkPath(path as Rule.Node)
      },
    }
  },
}
