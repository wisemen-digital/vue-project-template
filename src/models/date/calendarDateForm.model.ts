import { z } from 'zod'

export const calendarDateFormSchema = z.string().brand('CalendarDateForm')

export type CalendarDateForm = z.infer<typeof calendarDateFormSchema>
