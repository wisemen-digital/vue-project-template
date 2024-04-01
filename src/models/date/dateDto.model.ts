import { z } from 'zod'

export const dateDtoSchema = z.string().brand('dateDto')

export type DateDto = z.infer<typeof dateDtoSchema>
