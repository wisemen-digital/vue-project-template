import { z } from 'zod'

export const currentUserSchema = z.object({
	id: z.string().uuid(),
	firstName: z.string(),
	lastName: z.string(),
	fullName: z.string(),
	email: z.string().email(),
})

export type CurrentUser = z.infer<typeof currentUserSchema>
