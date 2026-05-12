import antfu from '@antfu/eslint-config'

import { options } from './src'

export default antfu(...options({
  tailwind: {
    entryPoint: 'app/assets/css/main.css',
  },
}))
