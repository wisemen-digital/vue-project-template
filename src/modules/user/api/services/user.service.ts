import type {
  PaginatedData,
  PaginationOptions,
} from '@wisemen/vue-core-components'
import { PaginationParamsBuilder } from '@wisemen/vue-core-components'

import {
  setUserRolesV1,
  viewUsersV1,
  viewUserV1,
} from '@/client'
import type { UserDetail } from '@/models/user/detail/userDetail.model'
import type { UserIndex } from '@/models/user/index/userIndex.model'
import type { UserIndexPagination } from '@/models/user/index/userIndexPagination.model.ts'
import {
  UserIndexPaginationTransformer,
  UserIndexTransformer,
  UserTransformer,
} from '@/models/user/user.transformer'
import type { UserUuid } from '@/models/user/userUuid.model'
import type { SettingsRoleUuid } from '@/modules/settings/models/role/settingsRoleUuid.model.ts'

export class UserService {
  static async getAll(paginationOptions: PaginationOptions<UserIndexPagination>): Promise<PaginatedData<UserIndex>> {
    const query = new PaginationParamsBuilder(paginationOptions)
      .build(UserIndexPaginationTransformer.toDto)

    const response = await viewUsersV1({ query })

    return {
      data: response.data.items.map(UserIndexTransformer.fromDto),
      meta: response.data.meta,
    }
  }

  static async getByUuid(userUuid: UserUuid): Promise<UserDetail> {
    const response = await viewUserV1({ path: { uuid: userUuid } })

    return UserTransformer.fromDto(response.data)
  }

  static async updateRoles(userUuid: UserUuid, roleUuids: SettingsRoleUuid[]): Promise<void> {
    await setUserRolesV1({
      body: { roleUuids },
      path: { user: userUuid },
    })
  }
}
