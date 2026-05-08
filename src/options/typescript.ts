import type { TypedFlatConfigItem } from '@antfu/eslint-config'
import type { Options } from '.'

export function typescriptOptions(option: Options['typescript'], perfectionistOverrides?: TypedFlatConfigItem): Options['typescript'] {
  const { overrides } = typeof option === 'object' ? option : {}
  return {
    overrides: {
      'ts/no-empty-function': 'warn',
      ...overrides,
      ...perfectionistOverrides?.rules,
    },
  }
}
