import { z } from 'zod'

export const userUpdateDtoSchema = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
})

export type UserUpdateDto = z.infer<typeof userUpdateDtoSchema>
