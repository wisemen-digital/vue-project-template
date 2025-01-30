import { z } from 'zod'

export const addressSchema = z.object({
  address: z.string(),
  city: z.string(),
  coords: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  postalCode: z.string(),
})

export type Address = z.infer<typeof addressSchema>
