import { z } from 'zod'

import { calendarDateDtoSchema } from '@/models/date/calendarDateDto.model.ts'
import { userUuidSchema } from '@/models/user/userUuid.model'

export const userIndexDtoSchema = z.object({
  uuid: userUuidSchema,
  birthDate: calendarDateDtoSchema,
  firstName: z.string(),
  lastName: z.string(),
})

export type UserIndexDto = z.infer<typeof userIndexDtoSchema>
