import { z } from 'zod'

import { calendarDateDtoSchema } from '@/models/date/calendarDateDto.model'

export const userCreateDtoSchema = z.object({
  birthDate: calendarDateDtoSchema,
  firstName: z.string().min(1),
  lastName: z.string().min(1),
})

export type UserCreateDto = z.infer<typeof userCreateDtoSchema>
