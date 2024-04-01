import { z } from 'zod'

export const dateSchema = z.string().brand('date')

export type Date = z.infer<typeof dateSchema>
