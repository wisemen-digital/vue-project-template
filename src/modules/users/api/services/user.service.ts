import { type ComputedRef } from 'vue'
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
	getAll: (paginationOptions: ComputedRef<PaginationOptions<UserIndexFilters>>) => Promise<PaginatedData<UserIndex>>
	get: (userUuid: UserUuid) => Promise<User>
	create: (form: UserCreateForm) => Promise<User>
	update: (userUuid: UserUuid, form: UserUpdateForm) => Promise<User>
}

export const userService: UserService = {
	getAll: async (paginationOptions) => {
		const data = await httpClient.get({
			url: '/v2/beers',
			responseSchema: z.array(
				z.object({
					id: z.number(),
					name: z.string(),
				})
			),
			config: {
				baseURL: 'https://api.punkapi.com',
				params: usePaginationOptionsToApiParams(paginationOptions),
			},
		})

		const testData = data.map((item) => ({
			uuid: `${item.id}` as UserUuid,
			firstName: item.name,
			lastName: 'Doe',
		}))

		return {
			// total: data.total,
			total: 200,
			data: testData.map(transformUserIndexDtoToUserIndex),
		}
	},
	get: async (userUuid) => {
		const data = await httpClient.get({
			url: `/v2/beers/${userUuid}`,
			responseSchema: z
				.object({
					id: z.number(),
					name: z.string(),
				})
				.array(),
			config: {
				baseURL: 'https://api.punkapi.com',
			},
		})

		return transformUserDtoToUser({
			uuid: `${data[0].id}` as UserUuid,
			firstName: data[0].name,
			lastName: 'Doe',
		})
	},
	create: async (form) => {
		// TODO: Implement

		return transformUserDtoToUser({
			uuid: '2203' as UserUuid,
			firstName: form.firstName,
			lastName: form.lastName,
		})
	},
	update: async (userUuid, form) => {
		return transformUserDtoToUser({
			uuid: userUuid,
			firstName: form.firstName,
			lastName: form.lastName,
		})
	},
}
