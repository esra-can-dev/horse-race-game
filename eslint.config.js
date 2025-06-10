// eslint.config.js
import pluginVue from 'eslint-plugin-vue';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintJs from '@eslint/js';

export default [
  // Genel ignores
  {
    ignores: [
      'dist/',
      'node_modules/',
      '.vscode/',
      './.prettierrc.cjs',
      './cypress.config.js',
      './tailwind.config.js',
    ],
  },
  // ESLint'in önerilen temel kuralları
  eslintJs.configs.recommended,

  // --- Vue'ye Özel Yapılandırma ---
  // 1. Adım: Vue eklentisini ESLint'e tanıtıyoruz
  {
    plugins: {
      vue: pluginVue,
    },
  },
  // 2. Adım: Vue eklentisinin önerilen kurallarını kullanıyoruz
  ...pluginVue.configs['flat/recommended'],

  // --- Prettier Entegrasyonu ---
  // Prettier ile çakışan ESLint kurallarını kapatır
  eslintConfigPrettier,
  // Prettier kurallarını ESLint hataları olarak gösterir
  eslintPluginPrettierRecommended,

  // --- Projeye Özel Kurallar ve Dil Seçenekleri ---
  {
    files: ['**/*.{js,jsx,cjs,mjs,vue}'],
    languageOptions: {
      // <-- BURASI DEĞİŞTİRİLDİ!
      parserOptions: {
        // <-- BURAYA TAŞINDI!
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
