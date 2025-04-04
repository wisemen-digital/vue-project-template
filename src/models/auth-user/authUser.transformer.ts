import type { ZitadelUser } from '@wisemen/vue-core-auth'

import type { AuthUser } from '@/models/auth-user/authUser.model'

export class AuthUserTransformer {
  static fromDto(dto: ZitadelUser): AuthUser {
    return {
      uuid: dto.sub,
      email: dto.email,
      firstName: dto.given_name,
      fullName: dto.name,
      lastName: dto.family_name,
    }
  }
}
