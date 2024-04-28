import { PaginationOptions } from '@wisemen/vue-core'

import { httpClient } from '@/libs/http.lib'
import { paginatedDataSchema } from '@/models/paginated-data/paginatedData.model'
import type { UserCreateForm } from '@/models/user/create/userCreateForm.model'
import type { User } from '@/models/user/detail/user.model'
import { userDtoSchema } from '@/models/user/detail/userDto.model'
import type { UserIndex } from '@/models/user/index/userIndex.model'
import { userIndexDtoSchema } from '@/models/user/index/userIndexDto.model'
import type { UserIndexFilters } from '@/models/user/index/userIndexFilters.model'
import type { UserUpdateForm } from '@/models/user/update/userUpdateForm.model'
import {
  UserDetailTransformer,
  UserFormTransformer,
  UserIndexTransformer,
} from '@/models/user/user.transformer'
import type { UserUuid } from '@/models/user/userUuid.model'
import type { PaginatedData } from '@/types/pagination.type'
import { PaginationParamsBuilder } from '@/utils/paginationParamsBuilder.util.ts'

export class UserService {
  static async create(form: UserCreateForm): Promise<User> {
    const data = await httpClient.post({
      body: UserFormTransformer.toCreateDto(form),
      responseSchema: userDtoSchema,
      url: '/users',
    })

    return UserDetailTransformer.fromDto(data)
  }

  static async getAll(paginationOptions: PaginationOptions<UserIndexFilters>): Promise<PaginatedData<UserIndex>> {
    const data = await httpClient.get({
      config: {
        params: new PaginationParamsBuilder<UserIndexFilters>(paginationOptions)
          .withFilter('search', paginationOptions.filters?.search)
          .build(),
      },
      responseSchema: paginatedDataSchema(userIndexDtoSchema),
      url: '/users',
    })

    return {
      data: data.items.map(UserIndexTransformer.fromDto),
      total: data.meta.total,
    }
  }

  static async getByUuid(userUuid: UserUuid): Promise<User> {
    const data = await httpClient.get({
      responseSchema: userDtoSchema,
      url: `/employees/${userUuid}`,
    })

    return UserDetailTransformer.fromDto(data)
  }

  static async update(userUuid: UserUuid, form: UserUpdateForm): Promise<User> {
    const data = await httpClient.post({
      body: {
        ...UserFormTransformer.toUpdateDto(form),
        language: 'nl',
      },
      responseSchema: userDtoSchema,
      url: `/employees/${userUuid}`,
    })

    return UserDetailTransformer.fromDto(data)
  }
}
