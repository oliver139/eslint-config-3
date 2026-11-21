# Working on this ESLint preset

`@oliver139/eslint-config` customizes `@antfu/eslint-config`. Consumers call `antfu(...antfuOptions(...))` and can append custom rules with `.append(oli(...))`. The repository's own `eslint.config.ts` imports the preset from source, so local lint runs exercise changes before packaging.

## Changing the preset

- Edit the matching module in `src/antfuOptions/` for JavaScript, TypeScript, Vue, stylistic rules, import sorting (`perfectionist.ts`), or Tailwind. Keep consumer rule overrides after preset defaults so consumers can replace individual rules.
- Use `src/antfuOptions/index.ts` for option types and assembly. Keep Antfu options first in the tuple returned by `antfuOptions()`, followed by optional Tailwind configurations and then caller-supplied configurations. The package entry point also exports `antfuOptions` under its original name, `options`, for backward compatibility.
- Implement custom ESLint rules in `src/oliRules/` and wire their options through `src/oliRules/index.ts`.
- For Tailwind changes, check both the v3 `tailwindConfig` and v4 `entryPoint` paths. The plugin setup and the file-scoped rules are separate entries. The rules default to Vue files.
- Update `README.md` when a change affects installation, a public option, or a documented default. Edit the source under `src/`. Running `pnpm build` generates the ESM bundle and type declarations in `dist/`.

## Checking changes

Use the Node.js and pnpm versions declared in `package.json`. Install dependencies with `pnpm install --frozen-lockfile`.

- Run `pnpm lint` to check the repository against its own preset.
- For TypeScript or public API changes, run `pnpm exec tsc --noEmit` and `pnpm build`.
- For rule changes, use `pnpm exec eslint --print-config src/index.ts` to inspect the effective TypeScript rules. Substitute a matching path such as `Example.vue` for Vue or Tailwind rules. Use `pnpm dev` to explore the configuration in ESLint Config Inspector.

## Cloudflare

When interacting with Cloudflare, use the `cf` CLI unless the project has a Wrangler configuration file.
