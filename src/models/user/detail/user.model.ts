import { z } from 'zod'

import { userUuidSchema } from '@/models/user/userUuid.model'

export const userSchema = z.object({
  uuid: userUuidSchema,
  firstName: z.string(),
  fullName: z.string(),
  lastName: z.string(),
})

export type User = z.infer<typeof userSchema>
