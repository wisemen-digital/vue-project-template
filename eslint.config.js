import eslintVueConfig from '@wisemen/eslint-config-vue'

export default [
  ...(await eslintVueConfig),
  {
    rules: {
      'function-paren-newline': [
        'error',
        'multiline-arguments',
      ],
      'putout/function-declaration-paren-newline': 'off',
    },
  },
]
