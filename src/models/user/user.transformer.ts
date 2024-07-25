import { CalendarDateTransformer } from '@/models/date/calendarDate.transformer.ts'

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
      uuid: dto.uuid,
      birthDate: CalendarDateTransformer.fromDto(dto.birthDate),
      firstName: dto.firstName,
      fullName: `${dto.firstName} ${dto.lastName}`,
      lastName: dto.lastName,
    }
  }
}

export class UserDetailTransformer {
  static fromDto(dto: UserDto): User {
    return {
      uuid: dto.uuid,
      birthDate: CalendarDateTransformer.fromDto(dto.birthDate),
      firstName: dto.firstName,
      fullName: `${dto.firstName} ${dto.lastName}`,
      lastName: dto.lastName,
    }
  }
}

export class UserCreateTransformer {
  static toDto(form: UserCreateForm): UserCreateDto {
    return {
      birthDate: CalendarDateTransformer.toDto(form.birthDate),
      firstName: form.firstName,
      lastName: form.lastName,
    }
  }
}

export class UserUpdateTransformer {
  static toDto(form: UserUpdateForm): UserUpdateDto {
    return {
      firstName: form.firstName,
      lastName: form.lastName,
    }
  }

  static toForm(user: User): UserUpdateForm {
    return {
      birthDate: user.birthDate,
      firstName: user.firstName,
      lastName: user.lastName,
    }
  }
}
