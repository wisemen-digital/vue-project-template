import { z } from 'zod'

import type { AddressForm } from '@/models/address/addressForm.model.ts'

export const addressDtoSchema = z.object({
	street: z.string(),
	city: z.string(),
	zip: z.string(),
	country: z.string(),
})

export type AddressDto = z.infer<typeof addressDtoSchema>

export function mapAddressFormToAddressDto(addressForm: AddressForm): AddressDto {
	return {
		street: addressForm.street,
		city: addressForm.city,
		zip: addressForm.zip,
		country: addressForm.country,
	}
}
