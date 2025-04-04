import type { UserDetail } from '@/models/user/detail/userDetail.model'
import type { UserDetailDto } from '@/models/user/detail/userDetailDto.model'
import type { UserIndexPagination } from '@/models/user/index/userIndexPagination.model.ts'
import type { UserIndexPaginationDto } from '@/models/user/index/userIndexPaginationDto.model.ts'
import type { UserUuid } from '@/models/user/userUuid.model.ts'
import type { SettingRoleUuid } from '@/modules/setting/models/role/settingRoleUuid.model.ts'

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
      lastName: dto.lastName,
    }
  }
}

export class UserIndexPaginationTransformer {
  static toDto(pagination: UserIndexPagination): UserIndexPaginationDto {
    return {
      filter: { permissions: pagination.filter?.permissions },
      sort: pagination.sort,
    }
  }
}

export class UserTransformer {
  static fromDto(dto: UserDetailDto): UserDetail {
    return {
      uuid: dto.uuid as UserUuid,
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      permissions: dto.roles.flatMap((role) => role.permissions),
      roles: dto.roles.map((role) => ({
        uuid: role.uuid as SettingRoleUuid,
        name: role.name,
      })),
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
