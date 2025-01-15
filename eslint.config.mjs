import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ['dist/', 'build/', 'node_modules/'] },
  {
    rules: {
      'no-unused-vars': 'warn', // For JS files
      '@typescript-eslint/no-unused-vars': ['warn', {
        'vars': 'all',
        'args': 'none'  // Ignore unused function arguments
      }]
    },
  },
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "script", globals: globals.browser } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];