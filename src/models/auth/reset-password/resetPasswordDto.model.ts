import { z } from 'zod'

// POST /reset-password
export const resetPasswordDtoSchema = z.object({
  password: z.string(),
  secret: z.string(),
  token: z.string(),
})

export type ResetPasswordDto = z.infer<typeof resetPasswordDtoSchema>
