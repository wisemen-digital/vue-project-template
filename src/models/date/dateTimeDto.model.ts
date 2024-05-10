import { z } from 'zod'

export const dateTimeDtoSchema = z.string().datetime().brand('DateTimeDto')

export type DateTimeDto = z.infer<typeof dateTimeDtoSchema>
