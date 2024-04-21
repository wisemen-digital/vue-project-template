import { z } from 'zod'

import { s3FileUuidSchema } from './s3FileUuid.model'

export const s3FileDtoSchema = z.object({
  url: z.string().url(),
  uuid: s3FileUuidSchema,
})

export type S3FileDto = z.infer<typeof s3FileDtoSchema>
