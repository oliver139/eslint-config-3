import type { OptionsVue } from '@antfu/eslint-config'

import type { Options } from '.'

export interface VueOptions extends OptionsVue {
  blockOrder?: string[] | 'tf' | 'templateFirst' | 'sf' | 'scriptFirst'
}

/**
 * 生成 vue 选项
 */
export function vueOptions(option: Options['vue']): Options['vue'] {
  if (option === false) {
    return false
  }

  const { blockOrder = ['template', 'script', 'style'], overrides, ...rest } = typeof option === 'object'
    ? option
    : {}
  let order = blockOrder
  if (typeof order === 'string') {
    order = order === 'sf' || order === 'scriptFirst'
      ? ['script', 'template', 'style']
      : ['template', 'script', 'style']
  }

  return {
    ...rest,
    overrides: {
      'vue/component-api-style': [
        'error',
        ['script-setup', 'composition'],
      ],
      'vue/block-order': [
        'error',
        {
          order,
        },
      ],
      'vue/brace-style': [
        'error',
        '1tbs',
        { allowSingleLine: false },
      ],
      'vue/html-button-has-type': 'error',
      'vue/max-attributes-per-line': [
        'warn',
        {
          multiline: 1,
          singleline: 4,
        },
      ],
      'vue/no-console': 'error',
      'vue/no-unused-refs': 'warn',
      'vue/no-unused-vars': 'warn',
      'vue/quote-props': ['error', 'as-needed'],
      'vue/singleline-html-element-content-newline': 'off',
      ...overrides,
    },
  }
}
