import { z } from 'zod'

export const customerUuidSchema = z.string().uuid().brand('CustomerUuid')

export const customerSchema = z.object({
	uuid: customerUuidSchema,
	createdAt: z.date(),
	updatedAt: z.date(),
	email: z.string(),
	firstName: z.string(),
	lastName: z.string(),
	fullName: z.string(),
})

export type CustomerUuid = z.infer<typeof customerUuidSchema>
export type Customer = z.infer<typeof customerSchema>
