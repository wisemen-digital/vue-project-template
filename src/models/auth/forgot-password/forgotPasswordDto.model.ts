import { z } from 'zod'

// POST /forgot-password
export const forgotPasswordDtoSchema = z.object({
  email: z.string(),
})

export type ForgotPasswordDto = z.infer<typeof forgotPasswordDtoSchema>
