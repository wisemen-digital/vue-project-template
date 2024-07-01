import { z } from 'zod'

export const calendarDateDtoSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).brand('DateDto')

export type CalendarDateDto = z.infer<typeof calendarDateDtoSchema>
