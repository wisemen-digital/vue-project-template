import { z } from 'zod'

import { addressDtoSchema } from '@/models/address/addressDto.model.ts'
import { contactPersonDtoSchema } from '@/models/contact-person/contactPersonDto.model.ts'

export const clientCreateDtoSchema = z.object({
	companyName: z.string(),
	email: z.string().email(),
	vatNumber: z.string(),
	type: z.enum(['b2b', 'b2g']),
	phoneNumber: z.string(),
	salesConsultantUuid: z.string(),
	website: z.string(),
	address: addressDtoSchema,
	contactPersons: z.array(contactPersonDtoSchema),
	invoiceEmail: z.string().email(),
})

export type ClientCreateDto = z.infer<typeof clientCreateDtoSchema>
