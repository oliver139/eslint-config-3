import type { Options } from '.'

export function typescriptOptions(option: Options['typescript']): Options['typescript'] {
  const { overrides } = typeof option === 'object' ? option : {}
  return {
    overrides: {
      'ts/no-empty-function': 'warn',
      ...overrides,
    },
  }
}
