import eslintVueConfig from '@wisemen/eslint-config-vue'

export default [
  ...(await eslintVueConfig),
  {
    rules: {
      'ts/consistent-type-imports': 'off',
    },
  },
]
