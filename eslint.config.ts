import antfu from '@antfu/eslint-config'

import { antfuOptions } from './src'

export default antfu(...antfuOptions({
  pnpm: {
    yaml: false,
  },
  tailwind: {
    entryPoint: 'app/assets/css/main.css',
  },
}))
