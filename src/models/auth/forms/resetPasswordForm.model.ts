import { z } from 'zod'

export const resetPasswordFormSchema = z.object({
	password: z.string().min(8),
})

export type ResetPasswordForm = z.infer<typeof resetPasswordFormSchema>
