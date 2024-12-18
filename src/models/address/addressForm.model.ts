import { z } from 'zod'

export const addressFormSchema = z.object({
  bus: z.string(),
  city: z.string(),
  coordinates: z.object({
    lat: z.number().nullable(),
    lng: z.number().nullable(),
  }),
  country: z.string(),
  postalCode: z.string(),
  street: z.string(),
  streetNumber: z.string(),
})

export type AddressForm = z.infer<typeof addressFormSchema>
