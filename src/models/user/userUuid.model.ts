import { z } from 'zod'

export const userUuidSchema = z.string().uuid().brand('UserUuid')

export type UserUuid = z.infer<typeof userUuidSchema>
