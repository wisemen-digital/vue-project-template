import { z } from 'zod'

export const phoneNumberFormFieldSchema = z.string().min(1)

export type PhoneNumberFormField = z.infer<typeof phoneNumberFormFieldSchema>
