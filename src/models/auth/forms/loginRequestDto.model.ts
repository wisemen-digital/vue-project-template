import { z } from 'zod'

// POST /oauth/token
export const loginRequestDto = z.object({
	username: z.string(),
	password: z.string(),
})

export type LoginRequestDto = z.infer<typeof loginRequestDto>
