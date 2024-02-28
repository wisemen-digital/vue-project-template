import type { UseQueryReturnType } from '@/composables/query/query.composable'
import { useQuery } from '@/composables/query/query.composable'
import type { User } from '@/models/users/detail/user.model'
import type { UserUuid } from '@/models/users/userUuid.model'
import { QueryKey } from '@/types/query/queryKey.type'

import { userService } from '../services/user.service'

export function useGetUsersDetailQuery(userUuid: UserUuid): UseQueryReturnType<User> {
	return useQuery<User>({
		queryKey: {
			key: QueryKey.USERS_DETAIL,
			params: {
				userUuid,
			},
		},
		queryFn: () => userService.get(userUuid),
	})
}
