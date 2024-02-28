import { z } from 'zod'

import { userUuidSchema } from '../userUuid.model'

export const userDtoSchema = z.object({
	uuid: userUuidSchema,
	firstName: z.string(),
	lastName: z.string(),
})

export type UserDto = z.infer<typeof userDtoSchema>
