import { z } from 'zod'

import { s3FileUuidSchema } from './s3FileUuid.model'

export const s3FileDtoSchema = z.object({
  uuid: s3FileUuidSchema,
  url: z.string().url(),
})

export type S3FileDto = z.infer<typeof s3FileDtoSchema>
