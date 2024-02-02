import { z } from 'zod'

import { addressFormSchema } from '@/models/address/addressForm.model.ts'
import type { CustomerCreateForm } from '@/models/customers/customerCreateForm.model.ts'

export const customerCreateContactPersonDtoSchema = z.object({
	title: z.string(),
	firstName: z.string(),
	lastName: z.string(),
	function: z.string(),
	email: z.string().email(),
	phoneNumber: z.string(),
	isPrimary: z.boolean(),
})

export const customerCreateDtoSchema = z.object({
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
	contactPersons: z.array(customerCreateContactPersonDtoSchema),
	invoiceEmail: z.string().email(),
})

export type CustomerCreateDto = z.infer<typeof customerCreateDtoSchema>
export type CustomerCreateContactPersonDto = z.infer<typeof customerCreateContactPersonDtoSchema>

export function mapCustomerCreateFormToCustomerCreateDto(form: CustomerCreateForm): CustomerCreateDto {
	return {
		firstName: form.firstName,
		address: form.address,
		companyName: form.companyName,
		email: form.email,
		type: form.type,
		contactPersons: form.contactPersons,
		invoiceEmail: form.invoiceEmail,
		lastName: form.lastName,
		phoneNumber: form.phoneNumber,
		website: form.website,
		vatNumber: form.vatNumber,
		salesConsultant: form.salesConsultant,
	}
}
