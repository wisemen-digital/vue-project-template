import eslintVueConfig from '@wisemen/eslint-config-vue'

export default [...(await eslintVueConfig), {
  rules: {
    'perfectionist/sort-named-imports': 'off',
    'sort-imports': 'off',
    'style/spaced-comment': 'off',
  },
}]
