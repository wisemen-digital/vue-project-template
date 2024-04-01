import { z } from 'zod'

export const phoneNumberDtoSchema = z.object({
  dialCode: z.string(),
  number: z.string(),
})

export type PhoneNumberDto = z.infer<typeof phoneNumberDtoSchema>
