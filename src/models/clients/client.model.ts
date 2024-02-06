import { z } from 'zod'

export const clientUuidSchema = z.string().uuid().brand('ClientUuid')

export const clientSchema = z.object({
	uuid: clientUuidSchema,
	createdAt: z.date(),
	updatedAt: z.date(),
	email: z.string(),
	firstName: z.string(),
	lastName: z.string(),
	fullName: z.string(),
})

export const clientTypeSchema = z.enum(['b2b', 'b2g'])

export type ClientUuid = z.infer<typeof clientUuidSchema>
export type Client = z.infer<typeof clientSchema>
export type ClientType = z.infer<typeof clientTypeSchema>
