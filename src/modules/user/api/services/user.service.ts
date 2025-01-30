import type {
  PaginatedData,
  PaginationOptions,
} from '@wisemen/vue-core'

import {
  setUserRolesControllerUpdateUserV1,
  viewMeControllerViewMeV1,
  viewUserControllerViewUserV1,
  viewUsersControllerViewUserV1,
} from '@/client'
import type { RoleUuid } from '@/models/setting-role/roleUuid.model.ts'
import type { UserDetail } from '@/models/user/detail/user.model'
import type { UserIndex } from '@/models/user/index/userIndex.model'
import type { UserIndexFilters } from '@/models/user/index/userIndexFilters.model'
import {
  UserIndexFiltersTransformer,
  UserIndexTransformer,
  UserTransformer,
} from '@/models/user/user.transformer'
import type { UserUuid } from '@/models/user/userUuid.model'
import { PaginationDtoBuilder } from '@/utils/paginationDtoBuilder.util'

export class UserService {
  static async getAll(paginationOptions: PaginationOptions<UserIndexFilters>): Promise<PaginatedData<UserIndex>> {
    const response = await viewUsersControllerViewUserV1({
      query: new PaginationDtoBuilder(paginationOptions).build(UserIndexFiltersTransformer.toDto),
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

  static async getMe(): Promise<UserDetail> {
    const response = await viewMeControllerViewMeV1()

    return UserTransformer.fromDto(response.data)
  }

  static async updateRoles(userUuid: UserUuid, roleUuids: RoleUuid[]): Promise<void> {
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
