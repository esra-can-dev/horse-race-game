import pluginVue from 'eslint-plugin-vue';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintJs from '@eslint/js';

export default [
  {
    ignores: ['dist/', 'node_modules/', '.vscode/', './.prettierrc.cjs', './cypress.config.js'],
  },
  eslintJs.configs.recommended,
  {
    plugins: {
      vue: pluginVue,
    },
  },
  ...pluginVue.configs['flat/recommended'],
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  {
    files: ['**/*.{js,jsx,cjs,mjs,vue}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'no-unused-vars': 'warn',
    },
  },
];
