import { z } from 'zod'

export const userIndexFiltersDtoSchema = z.object({
  name: z.string(),
})

export type UserIndexFiltersDto = z.infer<typeof userIndexFiltersDtoSchema>
