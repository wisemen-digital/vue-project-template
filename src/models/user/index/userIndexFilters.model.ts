import { z } from 'zod'

export const userIndexFiltersSchema = z.object({
  name: z.string(),
})

export type UserIndexFilters = z.infer<typeof userIndexFiltersSchema>
