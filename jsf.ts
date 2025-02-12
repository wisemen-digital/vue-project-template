import fs from 'node:fs/promises'
import path from 'node:path'

import { JSONSchemaFaker } from 'json-schema-faker'

import * as schemas from './src/client/schemas.gen'
import { LoggerUtil } from './src/utils/logger.util'

const outputFilePath = path.resolve('./src/client/generators.gen.ts')

function resolveRefs(schema: any, allSchemas: any): any {
  if (schema.$ref) {
    const refPath = schema.$ref.replace('#/components/schemas/', '')

    return resolveRefs(allSchemas[`${refPath}Schema`], allSchemas)
  }
  if (schema.properties) {
    for (const key in schema.properties) {
      schema.properties[key] = resolveRefs(schema.properties[key], allSchemas)
    }
  }
  if (schema.items) {
    schema.items = resolveRefs(schema.items, allSchemas)
  }
  if (schema.allOf) {
    schema.allOf = schema.allOf.map((item: any) => resolveRefs(item, allSchemas))
  }

  return schema
}

async function generateMockGenerators(): Promise<void> {
  try {
    if (!schemas) {
      LoggerUtil.logError('No schemas found in the HeyApi spec.')

      return
    }

    let outputContent = 'import { JSONSchemaFaker } from "json-schema-faker";\n'

    outputContent += 'import type * as types from "./types.gen";\n\n'

    for (const [
      schemaName,
      schema,
    ] of Object.entries(schemas)) {
      if (!schema || typeof schema !== 'object') {
        continue
      }

      JSONSchemaFaker.option({
        useDefaultValue: true,
        useExamplesValue: true,
      })

      const resolvedSchema = resolveRefs(schema, schemas)
      const formattedSchemaName = schemaName.replace(/Schema$/, '')
      const mockFunctionName = `${formattedSchemaName}Generator`
      const returnType = `types.${formattedSchemaName}`

      outputContent += `export function ${mockFunctionName}(): ${returnType} {
  return JSONSchemaFaker.generate(${JSON.stringify(resolvedSchema, null, 2)}) as ${returnType};
}

`
    }

    await fs.writeFile(outputFilePath, outputContent, 'utf-8')
    LoggerUtil.logInfo(`Mock generators written to ${outputFilePath}`)
  }
  catch (error) {
    LoggerUtil.logError('Error generating mock generators:', error)
  }
}

void generateMockGenerators()
