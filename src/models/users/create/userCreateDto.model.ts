import { z } from 'zod'

export const userCreateDtoSchema = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
})

export type UserCreateDto = z.infer<typeof userCreateDtoSchema>
