import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  input: 'https://vue-node.project-template.development.appwi.se/api/docs-json',
  output: 'src/client',
  plugins: [
    'zod',
    {
      name: '@hey-api/client-fetch',
      throwOnError: true,
    },
    {
      name: '@hey-api/sdk',
      validator: true,
    },
    {
      name: '@hey-api/typescript',
      enums: 'typescript',
    },
    {
      name: '@hey-api/schemas',
      type: 'form',
    },
  ],
})
