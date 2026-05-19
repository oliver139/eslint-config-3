import type { Options } from '.'

export function stylisticOptions(option: Options['stylistic']): Options['stylistic'] {
  if (option === false) {
    return false
  }

  const _option = typeof option === 'object' ? option : {}
  return {
    braceStyle: '1tbs',
    ..._option,
    overrides: {
      'antfu/curly': 'off',
      'antfu/if-newline': 'off',
      curly: ['error', 'multi-line', 'consistent'],
      'style/member-delimiter-style': ['error', {
        multiline: {
          delimiter: 'none',
          requireLast: false,
        },
        multilineDetection: 'brackets',
        overrides: {
          interface: {
            multiline: {
              delimiter: 'none',
              requireLast: false,
            },
          },
        },
        singleline: {
          delimiter: 'comma',
        },
      }],
      'style/quote-props': ['error', 'as-needed'],
      ..._option.overrides,
    },
  }
}
