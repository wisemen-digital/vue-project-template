import { z } from 'zod'

export const dateDtoSchema = z.string().brand('DateDto')

export type DateDto = z.infer<typeof dateDtoSchema>
