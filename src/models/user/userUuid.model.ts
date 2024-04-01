import { z } from 'zod'

export const userUuidSchema = z.string().uuid().brand('userUuid')

export type UserUuid = z.infer<typeof userUuidSchema>
