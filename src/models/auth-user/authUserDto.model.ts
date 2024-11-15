import { z } from 'zod'

<<<<<<< Updated upstream:src/models/auth-user/authUserDto.model.ts
export const authUserDtoSchema = z.object({
=======
export const currentUserDtoSchema = z.object({
>>>>>>> Stashed changes:src/models/auth/current-user/currentUserDto.model.ts
  uuid: z.string().uuid(),
  firstName: z.string(),
  lastName: z.string(),
  mail: z.string().email(),
})

export type AuthUserDto = z.infer<typeof authUserDtoSchema>
