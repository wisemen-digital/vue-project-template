import { z } from 'zod'

export const timeDtoSchema = z.string().regex(/^\d{2}:\d{2}$/).brand('TimeDto')

export type TimeDto = z.infer<typeof timeDtoSchema>
