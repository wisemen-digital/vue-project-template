import { z } from 'zod'

// POST /oauth/token
export const loginDtoSchema = z.object({
  password: z.string(),
  username: z.string(),
})

export type LoginDto = z.infer<typeof loginDtoSchema>
