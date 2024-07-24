import { z } from 'zod'

export const timeSchema = z.string().regex(/^([01]?\d|2[0-3]):[0-5]\d$/).brand('Time')

export type Time = z.infer<typeof timeSchema>
