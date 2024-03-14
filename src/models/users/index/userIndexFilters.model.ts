import { z } from 'zod'

export const userIndexFiltersSchema = z.object({
  beer_name: z.string(),
})

export type UserIndexFilters = z.infer<typeof userIndexFiltersSchema>
