import type { User } from '@sentry/vue'

import { useMutation, type UseMutationReturnType } from '@/composables/mutation/mutation.composable'
import type { UserUpdateForm } from '@/models/users/update/userUpdateForm.model'
import type { UserUuid } from '@/models/users/userUuid.model'
import { QueryKey } from '@/types/query/queryKey.type'

import { userService } from '../services/user.service'

interface Params extends Record<string, string> {
	userUuid: UserUuid
}

export function useUserUpdateMutation(): UseMutationReturnType<UserUpdateForm, User, Params> {
	return useMutation<UserUpdateForm, User, Params>({
		queryFn: async ({ params, body }) => {
			return await userService.update(params.userUuid, body)
		},
		queryKeysToInvalidate: [
			{
				key: QueryKey.USERS,
				exact: false,
			},
			{
				key: QueryKey.USERS_DETAIL,
				exact: true,
				params: {
					userUuid: (user) => user.uuid,
				},
			},
		],
	})
}
