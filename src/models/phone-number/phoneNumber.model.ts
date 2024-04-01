import { z } from 'zod'

export const phoneNumberSchema = z.string()

export type PhoneNumber = z.infer<typeof phoneNumberSchema>
