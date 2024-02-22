import { z } from 'zod'

export const userIndexFiltersSchema = z.object({
	// eslint-disable-next-line camelcase
	beer_name: z.string(),
})

export type UserIndexFilters = z.infer<typeof userIndexFiltersSchema>
