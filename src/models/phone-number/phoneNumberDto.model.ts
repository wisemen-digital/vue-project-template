import { z } from 'zod'

export const phoneNumberDtoSchema = z.string()

export type PhoneNumberDto = z.infer<typeof phoneNumberDtoSchema>
