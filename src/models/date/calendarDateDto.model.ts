import { z } from 'zod'

export const calendarDateDtoSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).brand('CalendarDateDto')

export type CalendarDateDto = z.infer<typeof calendarDateDtoSchema>
