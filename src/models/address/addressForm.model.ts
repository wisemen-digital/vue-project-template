import { z } from 'zod'

export const addressFormSchema = z.object({
	street: z.string(),
	city: z.string(),
	zip: z.string(),
	country: z.string(),
})

export type AddressForm = z.infer<typeof addressFormSchema>
