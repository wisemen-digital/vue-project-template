import { z } from 'zod'

export const forgotPasswordRequestDto = z.object({
  email: z.string(),
})

export type ForgotPasswordRequestDto = z.infer<typeof forgotPasswordRequestDto>
