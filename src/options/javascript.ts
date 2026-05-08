import type { Options } from '.'
import type { Severity } from '@/types'

export function javascriptOptions(option: Options['javascript'], noUnsedVars: Severity = 'warn'): Options['javascript'] {
  const { overrides } = typeof option === 'object' ? option : {}
  return {
    overrides: {
      'antfu/no-top-level-await': 'warn',
      'max-nested-callbacks': ['warn', { max: 4 }],
      'no-alert': 'off',
      'no-console': 'off',
      'no-useless-return': 'warn',
      'no-unused-vars': noUnsedVars,
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          vars: 'all',
          varsIgnorePattern: '^props$|^_',
        },
      ],
      ...overrides,
    },
  }
}
