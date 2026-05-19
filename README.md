# Oliver's ESLint Config

[![npm](https://img.shields.io/npm/v/@oliver139/eslint-config?color=010101&style=for-the-badge)](https://npmjs.com/package/@oliver139/eslint-config)

My options of [@antfu/eslint-config](https://github.com/antfu/eslint-config).

The 3rd version of my eslint config preset, which uses overrides to customize instead, so to simplify each time updating it.

Tailwind linting is supported using [`eslint-plugin-better-tailwindcss`](https://github.com/schoero/eslint-plugin-better-tailwindcss)

## Install

```sh
npm install -D eslint @oliver139/eslint-config@7 @antfu/eslint-config
```

## Usage

### Normal

```ts
import antfu from '@antfu/eslint-config'
import { options } from '@oliver139/eslint-config'

export default antfu(...options({
  // Options from @antfu/eslint-config
}))
```

### Tailwind

Powered by [`eslint-plugin-better-tailwindcss`](https://github.com/schoero/eslint-plugin-better-tailwindcss)

```sh
npm install -D eslint @oliver139/eslint-config@7 @antfu/eslint-config eslint-plugin-better-tailwindcss
```

```ts
import antfu from '@antfu/eslint-config'
import { options } from '@oliver139/eslint-config'

export default antfu(...options({
  tailwind: {
    // File to be watched, below is the default value
    files: ['**/*.vue', '**/*.html'],
    // To overrides rules:
    overrides: {
      'better-tailwindcss/enforce-logical-properties': 'error',
    },
    // tailwindcss 4: the path to the entry file of the css based tailwind config (eg: `src/global.css`)
    entryPoint: 'src/global.css',
    // tailwindcss 3: the path to the tailwind config file (eg: `tailwind.config.js`)
    tailwindConfig: 'tailwind.config.js',

    // ...other settings (https://github.com/schoero/eslint-plugin-better-tailwindcss/blob/main/docs/settings/settings.md)
  },
}))
```

### Nuxt

Powered by [Nuxt ESLint module](https://eslint.nuxt.com/packages/module)

```sh
npm install -D eslint @oliver139/eslint-config@7 @antfu/eslint-config
npx nuxi module add eslint
```

```ts
import antfu from '@antfu/eslint-config'
import { options } from '@oliver139/eslint-config'
import nuxt from './.nuxt/eslint.config.mjs'

export default nuxt(antfu(...options()))
```
