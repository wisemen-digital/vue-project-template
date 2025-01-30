import eslintVueConfig from '@wisemen/eslint-config-vue'
import playwright from 'eslint-plugin-playwright'

export default [
  ...(await eslintVueConfig),
  {
    ignores: [
      'src/client',
      'tests/.auth',
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
      // Add or override rules here
    },
  },
]
