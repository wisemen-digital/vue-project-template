import { z } from 'zod'

export const dateTimeSchema = z.string().datetime().brand('dateTime')

export type DateTime = z.infer<typeof dateTimeSchema>
