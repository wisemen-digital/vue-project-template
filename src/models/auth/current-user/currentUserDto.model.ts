import { z } from 'zod'

// GET /users/me
export const currentUserDtoSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  uuid: z.string().uuid(),
})

export type CurrentUserDto = z.infer<typeof currentUserDtoSchema>
