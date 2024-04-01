import { z } from 'zod'

import { userUuidSchema } from '../userUuid.model'

export const userIndexDtoSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  uuid: userUuidSchema,
})

export type UserIndexDto = z.infer<typeof userIndexDtoSchema>
