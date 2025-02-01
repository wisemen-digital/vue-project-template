import type { RoleUuid } from '@/models/setting-role/roleUuid.model.ts'
import type { UserIndexFilters } from '@/models/user/index/userIndexFilters.model'
import type { UserIndexFiltersDto } from '@/models/user/index/userIndexFiltersDto.model'
import type { UserUuid } from '@/models/user/userUuid.model.ts'

import type { UserCreateDto } from './create/userCreateDto.model'
import type { UserCreateForm } from './create/userCreateForm.model'
import type { UserDetail } from './detail/user.model'
import type { UserDetailDto } from './detail/userDto.model'
import type { UserIndex } from './index/userIndex.model'
import type { UserIndexDto } from './index/userIndexDto.model'
import type { UserUpdateDto } from './update/userUpdateDto.model'
import type { UserUpdateForm } from './update/userUpdateForm.model'

export class UserIndexTransformer {
  static fromDto(dto: UserIndexDto): UserIndex {
    return {
      uuid: dto.uuid as UserUuid,
      email: dto.email,
      firstName: dto.firstName,
      fullName: `${dto.firstName} ${dto.lastName}`,
      lastName: dto.lastName,
    }
  }
}

export class UserIndexFiltersTransformer {
  static toDto(filters?: UserIndexFilters): UserIndexFiltersDto {
    return {
      permissions: filters?.permissions,
    }
  }
}

export class UserTransformer {
  static fromDto(dto: UserDetailDto): UserDetail {
    return {
      uuid: dto.uuid as UserUuid,
      email: dto.email,
      firstName: dto.firstName,
      fullName: `${dto.firstName} ${dto.lastName}`,
      lastName: dto.lastName,
      roles: dto.roles.map((role) => ({
        uuid: role.uuid as RoleUuid,
        name: role.name,
      })),
    }
  }
}

export class UserCreateTransformer {
  static toDto(form: UserCreateForm): UserCreateDto {
    return {
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

  static toForm(user: UserDetail): UserUpdateForm {
    return {
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
    }
  }
}
