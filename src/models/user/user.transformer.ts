import type { UserCreateDto } from './create/userCreateDto.model'
import type { UserCreateForm } from './create/userCreateForm.model'
import type { User } from './detail/user.model'
import type { UserDto } from './detail/userDto.model'
import type { UserIndex } from './index/userIndex.model'
import type { UserIndexDto } from './index/userIndexDto.model'
import type { UserUpdateDto } from './update/userUpdateDto.model'
import type { UserUpdateForm } from './update/userUpdateForm.model'

export class UserIndexTransformer {
  static fromDto(dto: UserIndexDto): UserIndex {
    return {
      firstName: dto.firstName,
      fullName: `${dto.firstName} ${dto.lastName}`,
      lastName: dto.lastName,
      uuid: dto.uuid,
    }
  }
}

export class UserDetailTransformer {
  static fromDto(dto: UserDto): User {
    return {
      firstName: dto.firstName,
      fullName: `${dto.firstName} ${dto.lastName}`,
      lastName: dto.lastName,
      uuid: dto.uuid,
    }
  }
}

export class UserFormTransformer {
  static toCreateDto(form: UserCreateForm): UserCreateDto {
    return {
      firstName: form.firstName,
      lastName: form.lastName,
    }
  }

  static toUpdateDto(form: UserUpdateForm): UserUpdateDto {
    return {
      firstName: form.firstName,
      lastName: form.lastName,
    }
  }

  static toUpdateForm(user: User): UserUpdateForm {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
    }
  }
}
