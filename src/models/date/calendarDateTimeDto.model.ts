import { z } from 'zod'

export const calendarDateTimeDtoSchema = z.string().datetime()

export type CalendarDateTimeDto = z.infer<typeof calendarDateTimeDtoSchema>
