import { z } from 'zod'

export const userCreateFormSchema = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
})

export type UserCreateForm = z.infer<typeof userCreateFormSchema>
