import type { S3File } from './s3File.model'
import type { S3FileDto } from './s3FileDto.model'
import type { S3FileUuid } from './s3FileUuid.model'

export class S3FileTransformer {
  static fromDto(dto: S3FileDto): S3File {
    return {
      uuid: dto.uuid,
      url: dto.url,
    }
  }

  static fromNullableDto(dto: S3FileDto | null): S3File | null {
    if (dto === null) {
      return null
    }

    return S3FileTransformer.fromDto(dto)
  }

  static toDto(s3File: S3File): S3FileUuid {
    return s3File.uuid
  }

  static toNullableDto(s3File: S3File | null): S3FileUuid | null {
    if (s3File === null) {
      return null
    }

    return S3FileTransformer.toDto(s3File)
  }
}
