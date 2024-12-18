import { z } from 'zod'

interface PaginatedDataDto<TSchema> {
  items: TSchema[]
  meta: {
    limit: number
    offset: number
    total: number
  }
}

export function paginatedDataSchema<T extends z.ZodType>(
  schema: z.ZodType,
): z.ZodType<PaginatedDataDto<z.infer<T>>> {
  return z.object({
    items: schema.array(),
    meta: z.object({
      limit: z.number(),
      offset: z.number(),
      total: z.number(),
    }),
  })
}

export type PaginatedDtoData = z.infer<ReturnType<typeof paginatedDataSchema>>
