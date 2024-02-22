import { z } from 'zod'

export const userUpdateFormSchema = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
})

export type UserUpdateForm = z.infer<typeof userUpdateFormSchema>
