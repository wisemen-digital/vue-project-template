import { z } from 'zod'

export const addressDtoSchema = z.object({
  address: z.string(),
  city: z.string(),
  coordinates: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  postcode: z.string(),
})

export type AddressDto = z.infer<typeof addressDtoSchema>
