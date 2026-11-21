# Oliver's ESLint Config

[![npm](https://img.shields.io/npm/v/@oliver139/eslint-config?color=010101&style=for-the-badge)](https://npmjs.com/package/@oliver139/eslint-config)

My options of [@antfu/eslint-config](https://github.com/antfu/eslint-config).

The 3rd version of my eslint config preset, which uses overrides to customize instead, so to simplify each time updating it.

Tailwind linting is supported using [`eslint-plugin-better-tailwindcss`](https://github.com/schoero/eslint-plugin-better-tailwindcss)

## Install

```sh
npm install -D eslint @oliver139/eslint-config@8 @antfu/eslint-config
```

## Usage

### Normal

The named export `options` is deprecated and remains available for backward compatibility. To migrate, rename your import and calls from `options` to `antfuOptions`.

```ts
import antfu from '@antfu/eslint-config'
import { antfuOptions } from '@oliver139/eslint-config'

export default antfu(...antfuOptions({
  // Options from @antfu/eslint-config
}))
```

### TypeScript

Set `typescript: false` to disable the TypeScript preset. To configure it, pass Antfu's TypeScript options. Rules in `typescript.overrides` take precedence over this preset's defaults.

### Tailwind

Powered by [`eslint-plugin-better-tailwindcss`](https://github.com/schoero/eslint-plugin-better-tailwindcss)

```sh
npm install -D eslint @oliver139/eslint-config@8 @antfu/eslint-config eslint-plugin-better-tailwindcss
```

```ts
import antfu from '@antfu/eslint-config'
import { antfuOptions } from '@oliver139/eslint-config'

export default antfu(...antfuOptions({
  tailwind: {
    // File to be watched, below is the default value
    files: ['**/*.vue'],
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
npm install -D eslint @oliver139/eslint-config@8 @antfu/eslint-config
npx nuxi module add eslint
```

```ts
import antfu from '@antfu/eslint-config'
import { antfuOptions } from '@oliver139/eslint-config'
import nuxt from './.nuxt/eslint.config.mjs'

export default nuxt(antfu(...antfuOptions()))
```

## My Custom Options

To enable my custom options, append it to `antfu()`

```ts
import antfu from '@antfu/eslint-config'
import { antfuOptions, oli } from '@oliver139/eslint-config'
import nuxt from './.nuxt/eslint.config.mjs'

export default antfu(...antfuOptions()).append(oli({ /* My custom options */ }))
```

### `nuxt.preferAtAlias`

- default: `false`
- auto-fix: yes

Mainly for Nuxt project. It prefers relative paths to start with `@` instead of `~`.
