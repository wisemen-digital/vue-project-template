import { z } from 'zod'

export const calendarDateTimeSchema = z.date()

export type CalendarDateTime = z.infer<typeof calendarDateTimeSchema>
