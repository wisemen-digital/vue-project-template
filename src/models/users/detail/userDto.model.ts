import { z } from 'zod'

import { userUuidSchema } from '../userUuid.model'

export const userDtoSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  uuid: userUuidSchema,
})

export type UserDto = z.infer<typeof userDtoSchema>
