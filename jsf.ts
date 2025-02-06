import fs from 'node:fs/promises'
import path from 'node:path'

import { JSONSchemaFaker } from 'json-schema-faker'

import * as schemas from './src/client/schemas.gen'
import { LoggerUtil } from './src/utils/logger.util'

const outputFilePath = path.resolve('./src/client/generators.gen.ts')

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

      const formattedSchemaName = schemaName.replace(/Schema$/, '')

      const mockFunctionName = `${formattedSchemaName}Generator`
      const returnType = `types.${formattedSchemaName}`

      outputContent += `export function ${mockFunctionName}(): ${returnType} {
  return JSONSchemaFaker.generate(${JSON.stringify(schema, null, 2)}) as ${returnType};
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
