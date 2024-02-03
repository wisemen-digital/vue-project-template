import { z } from 'zod'

import { addressDtoSchema, mapAddressFormToAddressDto } from '@/models/address/addressDto.model.ts'
import type { ClientCreateForm } from '@/models/clients/clientCreateForm.model.ts'
import { contactPersonDtoSchema, mapContactPersonFormToDto } from '@/models/contact-person/contactPersonDto.model.ts'

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

export function mapClientCreateFormToClientCreateDto(form: ClientCreateForm): ClientCreateDto {
	return {
		companyName: form.companyInformation.name,
		type: form.companyInformation.type,
		address: mapAddressFormToAddressDto(form.companyInformation.address),
		email: form.companyInformation.email,
		contactPersons: form.contactPersons.map(mapContactPersonFormToDto),
		invoiceEmail: form.invoiceInformation.email,
		phoneNumber: form.companyInformation.phoneNumber,
		website: form.companyInformation.website,
		vatNumber: form.companyInformation.vatNumber,
		salesConsultantUuid: form.companyInformation.salesConsultant.uuid,
	}
}
