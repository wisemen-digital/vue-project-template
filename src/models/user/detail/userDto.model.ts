import { z } from 'zod'

import { calendarDateDtoSchema } from '@/models/date/calendarDateDto.model'
import { timeDtoSchema } from '@/models/time/timeDto.model.ts'
import { userUuidSchema } from '@/models/user/userUuid.model'

export const userDtoSchema = z.object({
  uuid: userUuidSchema,
  birthDate: calendarDateDtoSchema,
  firstName: z.string(),
  lastName: z.string(),
  workingHours: z.object({
    end: timeDtoSchema,
    start: timeDtoSchema,
  }),
})

export type UserDto = z.infer<typeof userDtoSchema>
