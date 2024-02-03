import { z } from 'zod'

import { clientUuidSchema } from '@/models/clients/client.model.ts'

export const clientIndexSchema = z.object({
	uuid: clientUuidSchema,
	companyName: z.string(),
	companyCity: z.string(),
	contactPersonName: z.string(),
	contactPersonRole: z.string(),
	salesConsultant: z.string(),
	companyEmail: z.string(),
	website: z.string(),
})

export type ClientIndex = z.infer<typeof clientIndexSchema>
