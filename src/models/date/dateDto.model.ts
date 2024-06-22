import { z } from 'zod'

export const dateDtoSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).brand('DateDto')

export type DateDto = z.infer<typeof dateDtoSchema>
