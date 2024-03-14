import { z } from 'zod'

export const forgotPasswordFormSchema = z.object({
  email: z.string().email(),
})

export type ForgotPasswordForm = z.infer<typeof forgotPasswordFormSchema>
