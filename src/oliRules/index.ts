import type { Linter } from 'eslint'

import { nuxtPreferAtAlias } from './nuxt'

export interface OliOptions {
  nuxt?: {
    preferAtAlias?: boolean
  }
}

const plugin = {
  meta: { name: '@oliver139/eslint-config' },
  rules: { 'nuxt-prefer-at-alias': nuxtPreferAtAlias },
}

export function oli(options: OliOptions = {}): Linter.Config[] {
  if (!options.nuxt?.preferAtAlias) return []

  return [
    {
      name: 'oli/nuxt',
      files: ['**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts,vue}'],
      plugins: { oli: plugin },
      rules: { 'oli/nuxt-prefer-at-alias': 'warn' },
    },
  ]
}
