import { z } from 'zod'

export const calendarTimeSchema = z.string().regex(/^(0\d|1\d|2[0-3]):[0-5]\d$/).brand('CalendarTime')

export type CalendarTime = z.infer<typeof calendarTimeSchema>
