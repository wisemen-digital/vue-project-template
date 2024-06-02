import { z } from 'zod'

export const currentUserSchema = z.object({
  uuid: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string(),
  fullName: z.string(),
  lastName: z.string(),
})

export type CurrentUser = z.infer<typeof currentUserSchema>
