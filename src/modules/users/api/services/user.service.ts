import { PaginationOptions } from '@wisemen/vue-core'
import type { ComputedRef } from 'vue'

import { httpClient } from '@/libs/http.lib'
import { paginatedDataSchema } from '@/models/paginated-data/paginatedData.model'
import type { UserCreateForm } from '@/models/users/create/userCreateForm.model'
import type { User } from '@/models/users/detail/user.model'
import { userDtoSchema } from '@/models/users/detail/userDto.model'
import type { UserIndex } from '@/models/users/index/userIndex.model'
import type { UserIndexFilters } from '@/models/users/index/userIndexFilters.model'
import type { UserUpdateForm } from '@/models/users/update/userUpdateForm.model'
import {
  transformUserCreateFormToUserCreateDto,
  transformUserDtoToUser,
  transformUserIndexDtoToUserIndex,
  transformUserUpdateFormToUserUpdateDto,
} from '@/models/users/user.transformer'
import type { UserUuid } from '@/models/users/userUuid.model'
import type { PaginatedData } from '@/types/pagination.type'

interface UserService {
  create: (form: UserCreateForm) => Promise<User>
  getAll: (paginationOptions: ComputedRef<PaginationOptions<UserIndexFilters>>) => Promise<PaginatedData<UserIndex>>
  getByUuid: (userUuid: UserUuid) => Promise<User>
  update: (userUuid: UserUuid, form: UserUpdateForm) => Promise<User>
}

export const userService: UserService = {
  create: async (form) => {
    const formData = new FormData()

    const dto = transformUserCreateFormToUserCreateDto(form)

    Object.entries(dto).forEach(([
      key,
      value,
    ]) => {
      formData.append(key, value)
    })

    const data = await httpClient.post({
      body: formData,
      config: {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
      responseSchema: userDtoSchema,
      url: '/users',
    })

    return transformUserDtoToUser(data)
  },
  // TODO: Implement pagination builder
  getAll: async (_paginationOptions) => {
    const data = await httpClient.get({
      config: {
        // params: usePaginationOptionsToApiParams(paginationOptions),
      },
      responseSchema: paginatedDataSchema(userDtoSchema),
      url: '/users',
    })

    return {
      data: data.items.map(transformUserIndexDtoToUserIndex),
      total: data.meta.total,
    }
  },
  getByUuid: async (userUuid) => {
    const data = await httpClient.get({
      responseSchema: userDtoSchema,
      url: `/users/${userUuid}`,
    })

    return transformUserDtoToUser(data)
  },
  update: async (userUuid, form) => {
    const formData = new FormData()

    const dto = transformUserUpdateFormToUserUpdateDto(form)

    Object.entries(dto).forEach(([
      key,
      value,
    ]) => {
      formData.append(key, value)
    })

    const data = await httpClient.post({
      body: formData,
      config: {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
      responseSchema: userDtoSchema,
      url: `/users/${userUuid}`,
    })

    return transformUserDtoToUser(data)
  },
}
