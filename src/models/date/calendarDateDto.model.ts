import { z } from 'zod'

export const calendarDateDtoSchema = z.string().date().brand('CalendarDateDto')

export type CalendarDateDto = z.infer<typeof calendarDateDtoSchema>
