import { z } from 'zod'

// GET /users/me
export const currentUserDtoSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  mail: z.string().email(),
  uuid: z.string().uuid(),
})

export type CurrentUserDto = z.infer<typeof currentUserDtoSchema>
