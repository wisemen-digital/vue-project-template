import { z } from 'zod'

import { addressFormSchema } from '@/models/address/addressForm.model.ts'
import { clientTypeSchema } from '@/models/clients/client.model.ts'
import { salesConsultantSchema } from '@/models/clients/salesConsultant.model.ts'
import { contactPersonFormSchema } from '@/models/contact-person/contactPersonForm.model.ts'

export const clientCreateFormSchema = z.object({
	companyInformation: z.object({
		name: z.string(),
		email: z.string().email(),
		vatNumber: z.string(),
		salesConsultant: salesConsultantSchema,
		address: addressFormSchema,
		website: z.string(),
		phoneNumber: z.string(),
		type: clientTypeSchema,
	}),
	contactPersons: z.array(contactPersonFormSchema),
	billingInformation: z.object({
		email: z.string().email(),
	}),
})

export type ClientCreateForm = z.infer<typeof clientCreateFormSchema>
