import { z } from 'zod'

import { userUuidSchema } from '../userUuid.model'

export const userSchema = z.object({
	uuid: userUuidSchema,
	firstName: z.string(),
	lastName: z.string(),
	fullName: z.string(),
})

export type User = z.infer<typeof userSchema>
