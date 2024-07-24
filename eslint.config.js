import eslintVueConfig from '@wisemen/eslint-config-vue'
import playwright from 'eslint-plugin-playwright'

export default [
  ...(await eslintVueConfig),
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
  },
]
