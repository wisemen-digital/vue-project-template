import { z } from 'zod'

import { addressFormSchema } from '@/models/address/addressForm.model.ts'

export const contactUpdateFormSchema = z.object({
  isActive: z.boolean(),
  address: addressFormSchema,
  email: z.string().email().nullable(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  phone: z.string().nullable(),
})

export type ContactUpdateForm = z.infer<typeof contactUpdateFormSchema>
