import { z } from 'zod'

// POST /reset-password
const resetPasswordDtoSchema = z.object({
  email: z.string(),
  password: z.string(),
  passwordConfirmation: z.string(),
  token: z.string(),
})

export type ResetPasswordDto = z.infer<typeof resetPasswordDtoSchema>
