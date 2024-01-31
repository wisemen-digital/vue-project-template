import { z } from 'zod'

// POST /forgot-password
export const forgotPasswordRequestDto = z.object({
	email: z.string(),
})

export type ForgotPasswordRequestDto = z.infer<typeof forgotPasswordRequestDto>
