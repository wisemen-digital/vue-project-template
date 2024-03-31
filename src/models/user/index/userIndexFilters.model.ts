import { z } from 'zod'

export const userIndexFiltersSchema = z.object({
  search: z.string(),
})

export type UserIndexFilters = z.infer<typeof userIndexFiltersSchema>
