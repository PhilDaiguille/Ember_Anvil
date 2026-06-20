import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import vitest from "@vitest/eslint-plugin";
import oxlint from "eslint-plugin-oxlint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [".agents/**", "node_modules/**", "dist/**", "scripts/**", "vite.config.js"],
  },
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
  pluginVue.configs["flat/essential"],
  // Globals et règles des tests Vitest
  {
    files: ["**/*.{test,spec}.{js,mjs,cjs}", "**/__tests__/**/*.{js,mjs,cjs}"],
    plugins: { vitest },
    languageOptions: { globals: { ...vitest.environments.env.globals } },
    rules: vitest.configs.recommended.rules,
  },
  // Doit rester en dernier : désactive les règles ESLint déjà couvertes par oxlint
  ...oxlint.configs["flat/recommended"],
]);
