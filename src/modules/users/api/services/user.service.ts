import type { ComputedRef } from 'vue'
import { z } from 'zod'

import { usePaginationOptionsToApiParams } from '@/composables/table-pagination/pagination.composable'
import type { PaginationOptions } from '@/composables/table-pagination/tablePagination.composable'
import { httpClient } from '@/libs/http.lib'
import type { UserCreateForm } from '@/models/users/create/userCreateForm.model'
import type { User } from '@/models/users/detail/user.model'
import type { UserIndex } from '@/models/users/index/userIndex.model'
import type { UserIndexFilters } from '@/models/users/index/userIndexFilters.model'
import type { UserUpdateForm } from '@/models/users/update/userUpdateForm.model'
import { transformUserDtoToUser, transformUserIndexDtoToUserIndex } from '@/models/users/user.transformer'
import type { UserUuid } from '@/models/users/userUuid.model'
import type { PaginatedData } from '@/types/pagination.type'

interface UserService {
  create: (form: UserCreateForm) => Promise<User>
  get: (userUuid: UserUuid) => Promise<User>
  getAll: (paginationOptions: ComputedRef<PaginationOptions<UserIndexFilters>>) => Promise<PaginatedData<UserIndex>>
  update: (userUuid: UserUuid, form: UserUpdateForm) => Promise<User>
}

export const userService: UserService = {
  // eslint-disable-next-line require-await -- This is a placeholder for the actual implementation
  create: async (form) => {
    // TODO: Implement

    return transformUserDtoToUser({
      firstName: form.firstName,
      lastName: form.lastName,
      uuid: '2203' as UserUuid,
    })
  },
  get: async (userUuid) => {
    const data = await httpClient.get({
      config: {
        baseURL: 'https://api.punkapi.com',
      },
      responseSchema: z
        .object({
          id: z.number(),
          name: z.string(),
        })
        .array(),
      url: `/v2/beers/${userUuid}`,
    })

    return transformUserDtoToUser({
      firstName: data[0].name,
      lastName: 'Doe',
      uuid: `${data[0].id}` as UserUuid,
    })
  },
  getAll: async (paginationOptions) => {
    const data = await httpClient.get({
      config: {
        baseURL: 'https://api.punkapi.com',
        params: usePaginationOptionsToApiParams(paginationOptions),
      },
      responseSchema: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
        }),
      ),
      url: '/v2/beers',
    })

    const testData = data.map(item => ({
      firstName: item.name,
      lastName: 'Doe',
      uuid: `${item.id}` as UserUuid,
    }))

    return {
      data: testData.map(transformUserIndexDtoToUserIndex),
      // total: data.total,
      total: 200,
    }
  },
  // eslint-disable-next-line require-await -- This is a placeholder for the actual implementation
  update: async (userUuid, form) => {
    return transformUserDtoToUser({
      firstName: form.firstName,
      lastName: form.lastName,
      uuid: userUuid,
    })
  },
}
