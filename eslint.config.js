import eslintVueConfig from '@wisemen/eslint-config-vue'

export default [
  ...(await eslintVueConfig),
  {
    ignores: [
      'dist',
      'node_modules',
    ],
  },
]
