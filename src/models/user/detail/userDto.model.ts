import { z } from 'zod'

import { calendarDateDtoSchema } from '@/models/date/calendarDateDto.model'
import { userUuidSchema } from '@/models/user/userUuid.model'

export const userDtoSchema = z.object({
  uuid: userUuidSchema,
  birthDate: calendarDateDtoSchema,
  firstName: z.string(),
  lastName: z.string(),
})

export type UserDto = z.infer<typeof userDtoSchema>
