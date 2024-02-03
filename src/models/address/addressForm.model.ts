import { z } from 'zod'

import type { AddressDto } from '@/models/address/addressDto.model.ts'

export const addressFormSchema = z.object({
	street: z.string(),
	city: z.string(),
	zip: z.string(),
	country: z.string(),
})

export type AddressForm = z.infer<typeof addressFormSchema>

export function mapAddressDtoToAddressForm(addressDto: AddressDto): AddressForm {
	return {
		street: addressDto.street,
		city: addressDto.city,
		zip: addressDto.zip,
		country: addressDto.country,
	}
}
