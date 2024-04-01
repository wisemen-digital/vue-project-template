import { z } from 'zod'

export const currencySchema = z.number().brand('currency')

export type Currency = z.infer<typeof currencySchema>
