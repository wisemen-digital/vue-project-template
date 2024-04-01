import { z } from 'zod'

export const dateTimeDtoSchema = z.string().datetime().brand('dateTimeDto')

export type DateTimeDto = z.infer<typeof dateTimeDtoSchema>
