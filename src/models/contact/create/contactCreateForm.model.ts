import { z } from 'zod'

import { addressFormSchema } from '@/models/address/addressForm.model.ts'

export const contactCreateFormSchema = z.object({
  address: addressFormSchema,
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
})

export type ContactCreateForm = z.infer<typeof contactCreateFormSchema>
