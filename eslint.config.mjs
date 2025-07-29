// @ts-check

import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import { dirname } from "path";
import tseslint from "typescript-eslint";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default tseslint.config(
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
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  eslintConfigPrettier,
);
