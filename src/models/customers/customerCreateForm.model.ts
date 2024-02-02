import { z } from 'zod'

import { addressFormSchema } from '@/models/address/addressForm.model.ts'

export const customerCreateContactPersonFormSchema = z.object({
	title: z.string(),
	firstName: z.string(),
	lastName: z.string(),
	function: z.string(),
	email: z.string().email(),
	phoneNumber: z.string(),
	isPrimary: z.boolean(),
})

export const customerCreateFormSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	companyName: z.string(),
	email: z.string().email(),
	vatNumber: z.string(),
	type: z.enum(['individual', 'company']),
	phoneNumber: z.string(),
	salesConsultant: z.string(),
	website: z.string(),
	address: addressFormSchema,
	contactPersons: z.array(customerCreateContactPersonFormSchema),
	invoiceEmail: z.string().email(),
})

export type CustomerCreateForm = z.infer<typeof customerCreateFormSchema>
export type CustomerCreateContactPersonForm = z.infer<typeof customerCreateContactPersonFormSchema>
