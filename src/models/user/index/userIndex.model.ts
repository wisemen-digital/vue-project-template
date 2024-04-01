import { z } from 'zod'

import { userUuidSchema } from '../userUuid.model'

export const userIndexSchema = z.object({
  firstName: z.string(),
  fullName: z.string(),
  lastName: z.string(),
  uuid: userUuidSchema,
})

export type UserIndex = z.infer<typeof userIndexSchema>
