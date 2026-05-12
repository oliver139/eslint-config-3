import type { Options } from '.'

export function perfectionistOptions(option: Options['perfectionist']): Options['perfectionist'] {
  const { overrides } = typeof option === 'object' ? option : {}

  return {
    overrides: {
      'perfectionist/sort-imports': ['error', {
        groups: [
          'type-import',
          ['type-parent', 'type-sibling', 'type-index', 'type-internal'],

          'value-builtin',
          'value-external',
          'value-internal',
          ['value-parent', 'value-sibling', 'value-index'],
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
        ...overrides,
      }],
    },
  }
}
