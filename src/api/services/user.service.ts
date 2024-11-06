import type {
  PaginatedData,
  PaginationOptions,
} from '@wisemen/vue-core'

import { httpClient } from '@/libs/http.lib.ts'
import { paginatedDataSchema } from '@/models/paginated-data/paginatedData.model.ts'
import type { UserCreateForm } from '@/models/user/create/userCreateForm.model.ts'
import type { User } from '@/models/user/detail/user.model.ts'
import { userDtoSchema } from '@/models/user/detail/userDto.model.ts'
import type { UserIndex } from '@/models/user/index/userIndex.model.ts'
import { userIndexDtoSchema } from '@/models/user/index/userIndexDto.model.ts'
import type { UserIndexFilters } from '@/models/user/index/userIndexFilters.model.ts'
import type { UserUpdateForm } from '@/models/user/update/userUpdateForm.model.ts'
import {
  UserCreateTransformer,
  UserIndexTransformer,
  UserTransformer,
  UserUpdateTransformer,
} from '@/models/user/user.transformer.ts'
import type { UserUuid } from '@/models/user/userUuid.model.ts'
import { PaginationDtoBuilder } from '@/utils/paginationDtoBuilder.util.ts'

export class UserService {
  static async create(form: UserCreateForm): Promise<User> {
    const data = await httpClient.post({
      body: UserCreateTransformer.toDto(form),
      responseSchema: userDtoSchema,
      url: '/users',
    })

    return UserTransformer.fromDto(data)
  }

  static async getAll(paginationOptions: PaginationOptions<UserIndexFilters>): Promise<PaginatedData<UserIndex>> {
    const data = await httpClient.get({
      config: {
        params: new PaginationDtoBuilder<UserIndexFilters>(paginationOptions).build(),
      },
      responseSchema: paginatedDataSchema(userIndexDtoSchema),
      url: '/users',
    })

    return {
      data: data.items.map(UserIndexTransformer.fromDto),
      meta: {
        limit: data.meta.limit,
        offset: data.meta.offset,
        total: data.meta.total,
      },
    }
  }

  static async getByUuid(userUuid: UserUuid): Promise<User> {
    const data = await httpClient.get({
      responseSchema: userDtoSchema,
      url: `/users/${userUuid}`,
    })

    return UserTransformer.fromDto(data)
  }

  static async update(userUuid: UserUuid, form: UserUpdateForm): Promise<User> {
    const data = await httpClient.post({
      body: UserUpdateTransformer.toDto(form),
      responseSchema: userDtoSchema,
      url: `/users/${userUuid}`,
    })

    return UserTransformer.fromDto(data)
  }
}
