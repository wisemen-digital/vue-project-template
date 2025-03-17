import type {
  PaginatedData,
  PaginationOptions,
} from '@wisemen/vue-core'
import { PaginationParamsBuilder } from '@wisemen/vue-core'

import {
  setUserRolesControllerUpdateUserV1,
  viewUserControllerViewUserV1,
  viewUsersControllerViewUserV1,
} from '@/client'
import type { UserDetail } from '@/models/user/detail/userDetail.model'
import type { UserIndex } from '@/models/user/index/userIndex.model'
import type { UserIndexFilters } from '@/models/user/index/userIndexFilters.model'
import {
  UserIndexFiltersTransformer,
  UserIndexTransformer,
  UserTransformer,
} from '@/models/user/user.transformer'
import type { UserUuid } from '@/models/user/userUuid.model'
import type { SettingRoleUuid } from '@/modules/setting/models/role/settingRoleUuid.model.ts'

export class UserService {
  static async getAll(paginationOptions: PaginationOptions<UserIndexFilters>): Promise<PaginatedData<UserIndex>> {
    const response = await viewUsersControllerViewUserV1({
      query: new PaginationParamsBuilder(paginationOptions).build(UserIndexFiltersTransformer.toDto),
    })

    return {
      data: response.data.items.map(UserIndexTransformer.fromDto),
      meta: response.data.meta,
    }
  }

  static async getByUuid(userUuid: UserUuid): Promise<UserDetail> {
    const response = await viewUserControllerViewUserV1({
      path: {
        uuid: userUuid,
      },
    })

    return UserTransformer.fromDto(response.data)
  }

  static async updateRoles(userUuid: UserUuid, roleUuids: SettingRoleUuid[]): Promise<void> {
    await setUserRolesControllerUpdateUserV1({
      body: {
        roleUuids,
      },
      path: {
        user: userUuid,
      },
    })
  }
}
