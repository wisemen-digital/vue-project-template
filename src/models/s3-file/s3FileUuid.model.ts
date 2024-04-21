import { z } from 'zod'

export const s3FileUuidSchema = z.string().uuid().brand('s3FileUuid')

export type S3FileUuid = z.infer<typeof s3FileUuidSchema>
