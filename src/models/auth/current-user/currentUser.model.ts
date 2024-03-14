import { z } from 'zod'

export const currentUserSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  fullName: z.string(),
  lastName: z.string(),
  uuid: z.string().uuid(),
})

export type CurrentUser = z.infer<typeof currentUserSchema>
