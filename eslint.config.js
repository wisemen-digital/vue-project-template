import eslintVueConfig from '@wisemen/eslint-config-vue'
import playwright from 'eslint-plugin-playwright'

export default [
  ...(await eslintVueConfig),
  {
    ignores: [
      'public/mockServiceWorker.js',
      'src/client',
      'tests/.auth',
      'src/locales',
    ],
  },
  {
    ...playwright.configs['flat/recommended'],
    files: [
      'tests/**',
    ],
    languageOptions: { parserOptions: { tsconfigRootDir: 'tests' } },
    rules: {
      '@intlify/vue-i18n/key-format-style': [
        'error',
        'snake_case',
        { splitByDots: true },
      ],
      '@intlify/vue-i18n/no-dynamic-keys': 'off',
      '@intlify/vue-i18n/no-raw-text': 'off',
    },
  },
]
