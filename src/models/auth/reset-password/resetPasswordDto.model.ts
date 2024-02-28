import { z } from 'zod'

// POST /reset-password
const resetPasswordDtoSchema = z.object({
	token: z.string(),
	email: z.string(),
	password: z.string(),
	passwordConfirmation: z.string(),
})

export type ResetPasswordDto = z.infer<typeof resetPasswordDtoSchema>
