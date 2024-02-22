import type { User } from '@sentry/vue'

import { useMutation, type UseMutationReturnType } from '@/composables/mutation/mutation.composable'
import type { UserCreateForm } from '@/models/users/create/userCreateForm.model'
import { QueryKey } from '@/types/query/queryKey.type'

import { userService } from '../services/user.service'

export function useUserCreateMutation(): UseMutationReturnType<UserCreateForm, User> {
	return useMutation<UserCreateForm, User>({
		queryFn: async ({ body }: { body: UserCreateForm }) => {
			return await userService.create(body)
		},
		queryKeysToInvalidate: [
			{
				key: QueryKey.USERS,
				exact: false,
			},
		],
	})
}
