import { z } from 'zod'

export const contactUuidSchema = z.string().uuid().brand('ContactUuid')

export type ContactUuid = z.infer<typeof contactUuidSchema>
