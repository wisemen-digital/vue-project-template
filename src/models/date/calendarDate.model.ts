import { z } from 'zod'

export const calendarDateSchema = z.date().brand('CalendarDate')

export type CalendarDate = z.infer<typeof calendarDateSchema>
