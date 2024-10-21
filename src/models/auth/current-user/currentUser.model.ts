import { z } from 'zod'

export const authUserSchema = z.object({
  uuid: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string(),
  fullName: z.string(),
  lastName: z.string(),
})

export type AuthUser = z.infer<typeof authUserSchema>
