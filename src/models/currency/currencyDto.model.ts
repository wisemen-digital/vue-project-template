import { z } from 'zod'

export const currencyDtoSchema = z.number().brand('CurrencyDto')

export type CurrencyDto = z.infer<typeof currencyDtoSchema>
