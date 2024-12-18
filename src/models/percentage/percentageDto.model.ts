import { z } from 'zod'

export const percentageDtoSchema = z.number().min(0).max(1).brand('PercentageDto')

export type PercentageDto = z.infer<typeof percentageDtoSchema>
