import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  client: '@hey-api/client-axios',
  experimentalParser: true,
  input: 'https://vue-node.project-template.development.appwi.se/api/docs-json',
  output: {
    path: 'src/client',
  },
  plugins: [
    'zod',
    '@hey-api/sdk',
    {
      name: '@hey-api/typescript',
      enums: 'typescript',
    },
  ],
})
