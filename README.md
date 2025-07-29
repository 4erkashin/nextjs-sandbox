- `git init`

- `pnpm add -D eslint-plugin-react-hooks @next/eslint-plugin-next`
- until https://github.com/vercel/next.js/issues/78813 not resolved

- eslint ignores

```js
{
  // Global ignores for all configs (Flat Config treats a lone `ignores` object as global)
  ignores: [
    "**/node_modules/**", // install tree (already auto‑ignored, but explicit for clarity)
    "**/.pnpm/**", // pnpm store symlinks
    "**/.git/**",
    "**/.next/**", // Next.js build output
    "**/.turbo/**", // Turbopack cache
    "**/dist/**", // optional build outputs
    "**/out/**",
    "**/public/**", // static assets
  ],
},
```

- ts-eslint https://typescript-eslint.io/getting-started
- simple import sort https://github.com/lydell/eslint-plugin-simple-import-sort?tab=readme-ov-file#installation

- prettier https://prettier.io/docs/install
- eslint config prettier https://github.com/prettier/eslint-config-prettier?tab=readme-ov-file#installation
- prettier plugin tailwind https://github.com/tailwindlabs/prettier-plugin-tailwindcss

- if `pnpm outdated` lists nextjs
- `pnpx @next/codemod@latest upgrade latest`
