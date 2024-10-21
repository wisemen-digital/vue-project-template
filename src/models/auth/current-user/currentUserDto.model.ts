import { z } from 'zod'

export const authUserDtoSchema = z.object({
  uuid: z.string().uuid(),
  firstName: z.string(),
  lastName: z.string(),
  mail: z.string().email(),
})

export type AuthUserDto = z.infer<typeof authUserDtoSchema>
