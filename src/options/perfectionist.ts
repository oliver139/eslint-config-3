import type { Options } from '.'

export function perfectionistOptions(option: Options['perfectionist']): Options['perfectionist'] {
  if (option === false) return false

  const { overrides } = typeof option === 'object' ? option : {}

  return {
    overrides: {
      'perfectionist/sort-imports': ['error', {
        groups: [
          'type',
          [
            'type-parent',
            'type-sibling',
            'type-index',
          ],
          'builtin',
          'external',
          [
            'internal',
            'type-internal',
          ],
          [
            'parent',
            'sibling',
            'index',
          ],
          'side-effect',
          'ts-equals-import',
          'unknown',
        ],
        newlinesBetween: 'ignore',
        newlinesInside: 'ignore',
        order: 'asc',
        partitionByComment: true,
        partitionByNewLine: true,
        type: 'natural',
      }],
      ...overrides,
    },
  }
}
