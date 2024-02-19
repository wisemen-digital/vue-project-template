import { z } from 'zod'

// GET /users/me
export const currentUserDto = z.object({
	id: z.string().uuid(),
	firstName: z.string(),
	lastName: z.string(),
	email: z.string().email(),
})

export const currentUser = z.object({
	id: z.string().uuid(),
	firstName: z.string(),
	lastName: z.string(),
	fullName: z.string(),
	email: z.string().email(),
})

export type CurrentUserDto = z.infer<typeof currentUserDto>
export type CurrentUser = z.infer<typeof currentUser>
