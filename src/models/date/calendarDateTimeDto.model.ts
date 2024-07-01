import { z } from 'zod'

export const calendarDateTimeDtoSchema = z.string().datetime().brand('CalendarDateTimeDto')

export type CalendarDateTimeDto = z.infer<typeof calendarDateTimeDtoSchema>
