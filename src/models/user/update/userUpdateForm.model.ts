import { z } from 'zod'

import { calendarDateSchema } from '@/models/date/calendarDate.model.ts'

export const userUpdateFormSchema = z.object({
  birthDate: calendarDateSchema,
  firstName: z.string().min(1),
  lastName: z.string().min(1),
})

export type UserUpdateForm = z.infer<typeof userUpdateFormSchema>
