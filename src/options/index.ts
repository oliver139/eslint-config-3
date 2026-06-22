import type antfu from '@antfu/eslint-config'

import type { TailwindOptions } from './tailwind'
import { javascriptOptions } from './javascript'
import { perfectionistOptions } from './perfectionist'
import { stylisticOptions } from './stylistic'
import { tailwindOptions } from './tailwind'
import { typescriptOptions } from './typescript'
import { vueOptions } from './vue'

export type AntfuFirstPara = Parameters<typeof antfu>[0]
export type Options = NonNullable<AntfuFirstPara> & { tailwind?: false | TailwindOptions }
export type UserConfig = Parameters<typeof antfu>[1]

export function options(options: Options = {}, ...userConfigs: UserConfig[]): [Options, ...UserConfig[]] {
  const {
    javascript,
    typescript,
    vue,
    stylistic,
    perfectionist,
    ...rest
  } = options

  const tailwind = options.tailwind ? tailwindOptions(options.tailwind) : []

  const result: AntfuFirstPara = {
    javascript: javascriptOptions(javascript),
    typescript: typescriptOptions(typescript),
    vue: vueOptions(vue),
    stylistic: stylisticOptions(stylistic),
    perfectionist: perfectionistOptions(perfectionist),
    pnpm: {
      yaml: false,
    },
    ...rest,
  }

  return [
    result,
    ...tailwind,
    ...userConfigs,
  ]
}
