import type { AuthUserDto } from '@/models/auth-user/authUserDto.model'

import type { AuthUser } from './authUser.model'

export class AuthUserTransformer {
  static fromDto(dto: AuthUserDto): AuthUser {
    return {
      uuid: dto.uuid,
      email: dto.mail,
      firstName: dto.firstName,
      fullName: `${dto.firstName} ${dto.lastName}`,
      lastName: dto.lastName,
    }
  }
}
