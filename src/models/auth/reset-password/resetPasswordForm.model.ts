import { z } from 'zod'

export const resetPasswordFormSchema = z.object({
	password: z.string().min(8),
	token: z.string(),
	email: z.string().email(),
})

export type ResetPasswordForm = z.infer<typeof resetPasswordFormSchema>
