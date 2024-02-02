import { z } from 'zod'

import { customerUuidSchema } from '@/models/customers/customer.model.ts'

export const customerIndexSchema = z.object({
	uuid: customerUuidSchema,
	companyName: z.string(),
	companyCity: z.string(),
	contactPersonName: z.string(),
	contactPersonRole: z.string(),
	salesConsultant: z.string(),
	companyEmail: z.string(),
	website: z.string(),
})

export type CustomerIndex = z.infer<typeof customerIndexSchema>
