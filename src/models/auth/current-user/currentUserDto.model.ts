import { z } from 'zod'

// GET /users/me
export const currentUserDtoSchema = z.object({
  uuid: z.string().uuid(),
  firstName: z.string(),
  lastName: z.string(),
  mail: z.string().email(),
})

export type CurrentUserDto = z.infer<typeof currentUserDtoSchema>
