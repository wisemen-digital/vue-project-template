import { z } from 'zod'

// POST /oauth/token
export const loginDtoSchema = z.object({
	username: z.string(),
	password: z.string(),
})

export type LoginDto = z.infer<typeof loginDtoSchema>
