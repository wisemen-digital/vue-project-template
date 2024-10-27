import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  client: '@hey-api/client-axios',
  input: 'https://vue-node.project-template.development.appwi.se/api/docs-json',
  output: {
    path: 'src/client',
  },
  schemas: {
    export: false,
  },
  types: {
    enums: 'typescript',
  },
})
