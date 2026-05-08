import type { Options } from '.'

/**
 * 生成 vue 选项
 */
export function vueOptions(option: Options['vue']): Options['vue'] {
  if (option === false) {
    return false
  }

  const { overrides, ...rest } = typeof option === 'object' ? option : {}
  return {
    ...rest,
    overrides: {
      'vue/component-api-style': ['error', ['script-setup', 'composition']],
      'vue/block-order': ['error', {
        order: ['template', 'script', 'style'],
      }],
      'vue/brace-style': ['error', '1tbs', { allowSingleLine: false }],
      'vue/html-button-has-type': 'error',
      'vue/max-attributes-per-line': ['warn', {
        multiline: 1,
        singleline: 4,
      }],
      'vue/no-console': 'error',
      'vue/no-unused-refs': 'warn',
      'vue/no-unused-vars': 'warn',
      'vue/quote-props': ['error', 'as-needed'],
      'vue/singleline-html-element-content-newline': 'off',
      ...overrides,
    },
  }
}
