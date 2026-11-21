import assert from 'node:assert/strict'
import { test } from 'node:test'
import antfu from '@antfu/eslint-config'
import { antfuOptions, oli } from '@oliver139/eslint-config'
import { ESLint, Linter } from 'eslint'

const ruleId = 'oli/nuxt-prefer-at-alias'
const enabled = oli({
  nuxt: { preferAtAlias: true },
})

test('fixes module paths through the Antfu config, preserving quotes and path suffixes', async () => {
  const config = await antfu(...antfuOptions({ gitignore: false, vue: true })).append(enabled)
  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: config,
    fix: message => message.ruleId === ruleId,
  })
  const cases: [filename: string, input: string, expected: string][] = [
    ['app.ts', 'import type { T } from "~/types"', 'import type { T } from "@/types"'],
    ['app.ts', 'export { x } from "~~/shared/x"', 'export { x } from "@@/shared/x"'],
    ['app.ts', 'export * from "~/data"', 'export * from "@/data"'],
    ['app.ts', 'type T = import("~~/types").T', 'type T = import("@@/types").T'],
    ['app.ts', 'import loader = require("~/loader")', 'import loader = require("@/loader")'],
    ['app.js', 'import("~/assets/file?raw")', 'import("@/assets/file?raw")'],
    // eslint-disable-next-line no-template-curly-in-string -- The interpolation belongs to the linted module.
    ['app.js', 'import(`~~/locales/${name}.js`)', 'import(`@@/locales/${name}.js`)'],
    ['app.cjs', String.raw`require('~/it\'s-valid')`, String.raw`require('@/it\'s-valid')`],
    ['App.vue', '<script setup>import "~/init"</script>', '<script setup>import "@/init"</script>'],
  ]
  for (const [filename, input, expected] of cases) {
    const [result] = await eslint.lintText(input, { filePath: filename })
    assert.equal(result.output, expected, input)
    assert.ok(result.messages.every(m => !m.fatal && m.ruleId !== ruleId), input)
  }
})

test('applies the rule only when preferAtAlias is enabled', () => {
  const linter = new Linter()
  const input = 'import "~/init"'
  const filename = 'index.js'
  assert.deepEqual(linter.verify(input, enabled, { filename }).map(m => m.ruleId), [ruleId])
  for (const options of [
    undefined,
    {},
    { nuxt: {} },
    {
      nuxt: { preferAtAlias: false },
    },
  ]) {
    assert.deepEqual(linter.verify(input, oli(options), { filename }), [])
  }
})

test('ignores ordinary strings, other paths, and locally defined require functions', () => {
  const input = [
    'import "@/source"',
    'import "@@/root"',
    'import "./local"',
    'import "../parent"',
    'import "pkg/~/nested"',
    'import "~~~/example"',
    'const home = "~/Downloads"',
    'const config = { css: ["~/assets/main.css"] }',
    'function load(require) { return require("~~/text") }',
  ].join('\n')
  const config: Linter.Config[] = [
    ...enabled,
    {
      languageOptions: {
        globals: { require: 'readonly' },
      },
    },
  ]
  assert.deepEqual(new Linter().verify(input, config, {
    filename: 'index.js',
  }), [])
})
