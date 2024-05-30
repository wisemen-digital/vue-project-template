import { z } from 'zod'

export const currencySchema = z.number().brand('Currency')

export type Currency = z.infer<typeof currencySchema>
