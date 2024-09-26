import { z } from 'zod'

export const calendarTimeDtoSchema = z.string().regex(/^(0\d|1\d|2[0-3]):[0-5]\d$/).brand('CalendarTimeDto')

export type CalendarTimeDto = z.infer<typeof calendarTimeDtoSchema>
