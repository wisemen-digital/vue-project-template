import { z } from 'zod'

export const currencyDtoSchema = z.number().brand('currencyDto')

export type CurrencyDto = z.infer<typeof currencyDtoSchema>
