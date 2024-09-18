import { z } from 'zod'

export const calendarDateTimeSchema = z.date().brand('CalendarDateTime')

export type CalendarDateTime = z.infer<typeof calendarDateTimeSchema>
