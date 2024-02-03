import { z } from 'zod'

import { customerTypeSchema } from '@/models/customers/customer.model.ts'

export const customerCreateContactPersonFormSchema = z.object({
	title: z.string(),
	firstName: z.string(),
	lastName: z.string(),
	personFunction: z.string(),
	email: z.string().email(),
	phoneNumber: z.string(),
	isPrimary: z.boolean(),
})

export const customerCreateFormSchema = z.object({
	companyInformation: z.object({
		name: z.string(),
		email: z.string().email(),
		vatNumber: z.string(),
		salesConsultantUuid: z.string(),
		address: z.string(),
		website: z.string(),
		phoneNumber: z.string(),
		type: customerTypeSchema,
	}),
	contactPersons: z.array(customerCreateContactPersonFormSchema),
	invoiceInformation: z.object({
		email: z.string().email(),
	}),
})

export type CustomerCreateForm = z.infer<typeof customerCreateFormSchema>
export type CustomerCreateContactPersonForm = z.infer<typeof customerCreateContactPersonFormSchema>
