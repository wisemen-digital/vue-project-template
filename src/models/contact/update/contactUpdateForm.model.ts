import { z } from 'zod'

export const contactUpdateFormSchema = z.object({
  isActive: z.boolean(),
  email: z.string().email().nullable(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  phone: z.string().nullable(),
})

export type ContactUpdateForm = z.infer<typeof contactUpdateFormSchema>
