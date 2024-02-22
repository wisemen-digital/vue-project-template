import { z } from 'zod'

import { userUuidSchema } from '../userUuid.model'

export const userIndexSchema = z.object({
	uuid: userUuidSchema,
	firstName: z.string(),
	lastName: z.string(),
	fullName: z.string(),
})

export type UserIndex = z.infer<typeof userIndexSchema>
