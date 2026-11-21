import antfu from '@antfu/eslint-config'

import { antfuOptions, oli } from './src'

export default antfu(...antfuOptions({
  pnpm: {
    yaml: false,
  },
  tailwind: {
    entryPoint: 'app/assets/css/main.css',
  },
  test: {
    overrides: { 'test/no-import-node-test': 'off' },
  },
})).append(oli({
  nuxt: {
    preferAtAlias: true,
  },
}))
