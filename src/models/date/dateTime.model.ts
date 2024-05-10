import { z } from 'zod'

export const dateTimeSchema = z.string().datetime().brand('DateTime')

export type DateTime = z.infer<typeof dateTimeSchema>
