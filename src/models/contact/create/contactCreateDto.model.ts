import { z } from 'zod'

export const contactCreateDtoSchema = z.object({
  isActive: z.boolean(),
  email: z.string().email().nullable(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  phone: z.string().nullable(),
})

export type ContactCreateDto = z.infer<typeof contactCreateDtoSchema>
