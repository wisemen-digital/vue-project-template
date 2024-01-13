import { z } from 'zod'

export const forgotPasswordForm = z.object({
  email: z.string().email(),
})

export type ForgotPasswordForm = z.infer<typeof forgotPasswordForm>
