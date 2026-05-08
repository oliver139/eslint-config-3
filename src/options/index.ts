import type antfu from '@antfu/eslint-config'

import { javascriptOptions } from './javascript'
import { perfectionistOptions } from './perfectionist'
import { stylisticOptions } from './stylistic'
import { typescriptOptions } from './typescript'
import { vueOptions } from './vue'

export type Options = NonNullable<Parameters<typeof antfu>[0]>
export type UserConfig = Parameters<typeof antfu>[1]

export function options(options: Options = {}, ...userConfigs: UserConfig[]): [Options, ...UserConfig[]] {
  const { javascript, typescript, pnpm, vue, stylistic, ...rest } = options

  const result: Parameters<typeof antfu>[0] = {
    javascript: javascriptOptions(javascript),
    typescript: typescriptOptions(typescript, perfectionistOptions()),
    vue: vueOptions(vue),
    stylistic: stylisticOptions(stylistic),
    ...rest,
  }

  return [result, ...userConfigs]
}
