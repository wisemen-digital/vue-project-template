import { z } from 'zod'

import { userUuidSchema } from '@/models/user/userUuid.model'

export const userIndexSchema = z.object({
  uuid: userUuidSchema,
  firstName: z.string(),
  fullName: z.string(),
  lastName: z.string(),
})

export type UserIndex = z.infer<typeof userIndexSchema>
