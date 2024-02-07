import { mapAddressFormToAddressDto } from '@/models/address/addressDto.model'
import type { ClientCreateDto } from '@/models/clients/clientCreateDto.model'
import type { ClientCreateForm } from '@/models/clients/clientCreateForm.model'
import { mapContactPersonFormToDto } from '@/models/contact-person/contactPersonDto.model'

export function mapClientCreateFormToClientCreateDto(form: ClientCreateForm): ClientCreateDto {
	return {
		companyName: form.companyInformation.name,
		type: form.companyInformation.type,
		address: mapAddressFormToAddressDto(form.companyInformation.address),
		email: form.companyInformation.email,
		contactPersons: form.contactPersons.map(mapContactPersonFormToDto),
		invoiceEmail: '?',
		phoneNumber: form.companyInformation.phoneNumber,
		website: form.companyInformation.website,
		vatNumber: form.companyInformation.vatNumber,
		salesConsultantUuid: form.companyInformation.salesConsultant.uuid,
	}
}
