import { z } from 'zod'

import { userUuidSchema } from '../userUuid.model'

export const userSchema = z.object({
  firstName: z.string(),
  fullName: z.string(),
  lastName: z.string(),
  uuid: userUuidSchema,
})

export type User = z.infer<typeof userSchema>
