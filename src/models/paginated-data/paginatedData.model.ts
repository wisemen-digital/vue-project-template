import { z } from 'zod'

export function paginatedDataSchema<T extends z.ZodType>(
  schema: z.ZodType,
): z.ZodType<{
  items: z.infer<T>[]
  meta: {
    total: number
  }
}> {
  return z.object({
    items: schema.array(),
    meta: z.object({
      total: z.number(),
    }),
  })
}
