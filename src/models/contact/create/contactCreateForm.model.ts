import { z } from 'zod'

export const contactCreateFormSchema = z.object({
  email: z.string().email().nullable(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  phone: z.string().nullable(),
})

export type ContactCreateForm = z.infer<typeof contactCreateFormSchema>
