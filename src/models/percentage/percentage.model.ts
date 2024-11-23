import { z } from 'zod'

export const percentageSchema = z.number().min(0).max(100).brand('Percentage')

export type Percentage = z.infer<typeof percentageSchema>
