import { z } from 'zod'

export const resetPasswordFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  token: z.string(),
})

export type ResetPasswordForm = z.infer<typeof resetPasswordFormSchema>
