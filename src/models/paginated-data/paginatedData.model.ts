import type { PaginatedData } from '@wisemen/vue-core'
import { z } from 'zod'

export function paginatedDataSchema<T extends z.ZodType>(
  schema: z.ZodType,
): z.ZodType<PaginatedData<z.infer<T>>> {
  return z.object({
    data: schema.array(),
    meta: z.object({
      limit: z.number(),
      offset: z.number(),
      total: z.number(),
    }),
  })
}

export type PaginatedDtoData = z.infer<ReturnType<typeof paginatedDataSchema>>
