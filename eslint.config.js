import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default antfu(
  {
    ignores: [],
    typescript: {
      "parserOptions": {
        "parser": "@typescript-eslint/parser",
        "project": "./tsconfig.json",
        "extraFileExtensions": [".vue"]
      },
    },
    overrides: {
      typescript: {
        'ts/explicit-function-return-type': 'error',
        'ts/strict-boolean-expressions': 'error',
      },
      vue: {
        'vue/no-extra-parens': 'off',
        'vue/custom-event-name-casing': [
          'error',
          'camelCase',
          {
            ignores: [
              '/^[a-z]+(?:-[a-z]+)*:[a-z]+(?:-[a-z]+)*$/u',
            ],
          },
        ],
      },
    },
  },
  ...compat.config({
    extends: [
      'plugin:tailwindcss/recommended',
    ],
    plugins: [
      'putout',
      'simple-import-sort',
      'eslint-plugin-require-explicit-generics',
    ],
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'import/order': 'off',
      'sort-imports': 'off',

      'unused-imports/no-unused-imports': 'error',

      'tailwindcss/migration-from-tailwind-2': 'off',
      'putout/add-newlines-between-types-in-union': 'error',
      'putout/add-newlines-between-specifiers': 'error',
      'putout/add-newline-before-return': 'error',
      'putout/add-newline-before-function-call': 'error',
      'putout/add-newline-after-function-call': 'error',

      'putout/array-element-newline': 'error',
      'putout/single-property-destructuring': 'error',
      'putout/multiple-properties-destructuring': 'error',
      'putout/long-properties-destructuring': 'error',
      'putout/align-spaces': 'error',
      // 'putout/keyword-spacing': 'error',

      'putout/newline-function-call-arguments': 'error',
      'putout/function-declaration-paren-newline': 'error',
      'putout/remove-newline-after-default-import': 'error',
      'putout/remove-newline-from-empty-object': 'error',
      'putout/remove-empty-newline-before-first-specifier': 'error',
      'putout/remove-empty-newline-after-last-specifier': 'error',
      'putout/remove-empty-newline-after-last-element': 'error',
      // 'putout/remove-empty-newline-after-import': 'error',
      'putout/remove-empty-specifiers': 'error',
      'putout/objects-braces-inside-array': 'error',
      'putout/object-property-newline': 'error',
      'putout/tape-add-newline-between-tests': 'error',
      'putout/tape-add-newline-before-assertion': 'error',
      'putout/tape-remove-newline-before-t-end': 'error',

      'vue/max-attributes-per-line': ['error', {
        singleline: {
          max: 1,
        },
        multiline: {
          max: 1,
        },
      }],
      'require-explicit-generics/require-explicit-generics': [
        'error',
        ['computed', 'ref', 'reactive', 'defineEmits'],
      ],
      'vue/attributes-order': [
        'error',
        {
          order: [
            'DEFINITION', // is
            'LIST_RENDERING', // v-for
            'CONDITIONALS', // v-if, v-else-if, v-else, v-show, v-cloak
            'RENDER_MODIFIERS', // v-pre, v-once
            'GLOBAL', // id
            'UNIQUE', // ref, key,
            'SLOT', // slot
            'TWO_WAY_BINDING', // v-model
            'ATTR_DYNAMIC', // v-bind, :foo="bar"
            'ATTR_STATIC', // prop="foo"
            'ATTR_SHORTHAND_BOOL', // boolean props e.g. is-active
            'EVENTS', // @click="foo"
            'CONTENT', // v-html, v-text,
          ],
          alphabetical: false,
        },
      ],
    },
    overrides: [{
      files: [
        '*.vue',
      ],
      parser: 'vue-eslint-parser',
    }],
  }),
)
