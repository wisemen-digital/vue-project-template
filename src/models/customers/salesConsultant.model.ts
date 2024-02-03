import { z } from 'zod'

export const salesConsultantSchema = z.object({
	uuid: z.string().uuid().brand('SalesConsultantUuid'),
	firstName: z.string(),
	lastName: z.string(),
	fullName: z.string(),
	email: z.string(),
	phoneNumber: z.string(),
})

export type SalesConsultant = z.infer<typeof salesConsultantSchema>
