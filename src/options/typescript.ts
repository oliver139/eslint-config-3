import type { Options } from '.'

export function typescriptOptions(option: Options['typescript']): Options['typescript'] {
  if (option === false) return false

  const { overrides, ...rest } = typeof option === 'object'
    ? option
    : {}
  return {
    ...rest,
    overrides: {
      'ts/no-empty-function': 'warn',
      ...overrides,
    },
  }
}
