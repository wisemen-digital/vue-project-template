import { z } from 'zod'

import { addressFormSchema } from '@/models/address/addressForm.model.ts'

export const contactCreateFormSchema = z.object({
  address: addressFormSchema.nullable(),
  email: z.string().email().nullable(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  phone: z.string().nullable(),
})

export type ContactCreateForm = z.infer<typeof contactCreateFormSchema>
