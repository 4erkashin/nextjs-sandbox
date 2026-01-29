### Notes

#### Eslint

ESLint is shipped by Vercel in a mature, flat-config–native form.\
As of November 10, 2025, there is no need to manually tweak the default configuration.\
`FlatCompat` is no longer required.

Docs: https://nextjs.org/docs/app/api-reference/config/eslint

Perfectionist: https://github.com/azat-io/eslint-plugin-perfectionist?tab=readme-ov-file#flat-config-eslintconfigjs-1

#### Prettier

Docs: https://prettier.io/docs/install

Eslint config: https://github.com/prettier/eslint-config-prettier?tab=readme-ov-file#installation

Tailwind plugin: https://github.com/tailwindlabs/prettier-plugin-tailwindcss

#### Updates

if `pnpm outdated` lists nextjs\
`pnpx @next/codemod@latest upgrade latest`

### TODO

- dependabot or renovate

### Misc

- ai sdk
  - `touch .env.local`
  - AI_GATEWAY_API_KEY=xxxxxxxxx
