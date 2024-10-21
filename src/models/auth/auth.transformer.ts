import type { AuthUser } from './current-user/currentUser.model'
import type { AuthUserDto } from './current-user/currentUserDto.model'

export class AuthTransformer {
  static toCurrentUser(dto: AuthUserDto): AuthUser {
    return {
      uuid: dto.uuid,
      email: dto.mail,
      firstName: dto.firstName,
      fullName: `${dto.firstName} ${dto.lastName}`,
      lastName: dto.lastName,
    }
  }
}
