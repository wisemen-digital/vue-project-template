import eslintVueConfig from '@wisemen/eslint-config-vue'
import playwright from 'eslint-plugin-playwright'

export default [
  ...(await eslintVueConfig),
  {
    ignores: [
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
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: 'tests',
      },
    },
    rules: {
      '@intlify/vue-i18n/key-format-style': [
        'error',
        'snake_case',
        {
          splitByDots: true,
        },
      ],
      // Add or override rules here
    },
  },
]
