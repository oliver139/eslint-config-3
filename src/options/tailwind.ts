// https://github.com/schoero/eslint-plugin-better-tailwindcss

import type { Linter } from 'eslint'
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss'

export type TailwindRules
  = 'enforce-consistent-line-wrapping'
    | 'enforce-consistent-class-order'
    | 'enforce-consistent-variant-order'
    | 'enforce-consistent-variable-syntax'
    | 'enforce-consistent-important-position'
    | 'enforce-shorthand-classes'
    | 'enforce-logical-properties'
    | 'enforce-canonical-classes'
    | 'no-duplicate-classes'
    | 'no-deprecated-classes'
    | 'no-unnecessary-whitespace'
    | 'no-unknown-classes'
    | 'no-conflicting-classes'
    | 'no-restricted-classes'

interface BaseOptions {
  files?: Linter.Config['files']
  overrides?: Partial<Record<TailwindRules, Linter.RuleEntry>>
  [extraKeys: string]: any
}
interface TailwindOptionsV3 extends BaseOptions {
  tailwindConfig: string
  entryPoint?: never
}
interface TailwindOptionsV4 extends BaseOptions {
  entryPoint: string
  tailwindConfig?: never
}
export type TailwindOptions = TailwindOptionsV3 | TailwindOptionsV4

function isTailwindOptionsV3(option: object): option is TailwindOptionsV3 {
  return (option as TailwindOptionsV3).tailwindConfig !== undefined
}
function isTailwindOptionsV4(option: object): option is TailwindOptionsV4 {
  return (option as TailwindOptionsV4).entryPoint !== undefined
}

export function tailwindOptions(option: TailwindOptions | false): Linter.Config[] {
  if (option === false) return []

  const _option = typeof option === 'object' ? option : {}
  const { files, overrides, ...settings } = typeof option === 'object' ? option : {}

  return [
    {
      name: 'oli/tailwindcss/setup',
      plugins: eslintPluginBetterTailwindcss.configs.recommended.plugins,
      settings: {
        'better-tailwindcss': {
          ...settings,
        },
      },
    },
    {
      name: 'oli/tailwindcss/rules',
      files: files ?? ['**/*.vue', '**/*.html'],
      rules: {
        'better-tailwindcss/enforce-consistent-line-wrapping': [
          'warn',
          {
            printWidth: 0,
            classesPerLine: 5,
            // group: 'emptyLine',
            preferSingleLine: true,
          },
        ],
        'better-tailwindcss/enforce-logical-properties': 'off',
        'better-tailwindcss/no-unknown-classes': 'off',
        'better-tailwindcss/no-restricted-classes': 'off',

        'better-tailwindcss/enforce-consistent-class-order': 'warn',
        'better-tailwindcss/enforce-consistent-variant-order': 'warn',
        'better-tailwindcss/no-duplicate-classes': 'warn',
        'better-tailwindcss/no-unnecessary-whitespace': 'warn',

        'better-tailwindcss/no-conflicting-classes': 'error',

        ...isTailwindOptionsV3(_option)
          ? {
              'better-tailwindcss/no-deprecated-classes': 'off',
              'better-tailwindcss/enforce-consistent-variable-syntax': 'warn',
              'better-tailwindcss/enforce-consistent-important-position': ['warn', { position: 'legacy' }],
              'better-tailwindcss/enforce-shorthand-classes': 'warn',
              'better-tailwindcss/enforce-canonical-classes': 'off',
            }
          : {},

        ...isTailwindOptionsV4(_option)
          ? {
              'better-tailwindcss/no-deprecated-classes': 'warn',
              'better-tailwindcss/enforce-consistent-variable-syntax': 'off',
              'better-tailwindcss/enforce-consistent-important-position': 'off',
              'better-tailwindcss/enforce-shorthand-classes': 'off',
              'better-tailwindcss/enforce-canonical-classes': 'warn',
            }
          : {},

        ...overrides,
      },
    },
  ]
}
