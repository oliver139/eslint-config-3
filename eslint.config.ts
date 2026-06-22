import antfu from '@antfu/eslint-config'

import { options } from './src'

export default antfu(...options({
  pnpm: {
    yaml: false,
  },
  tailwind: {
    entryPoint: 'app/assets/css/main.css',
  },
}))
