import type { UseQueryReturnType } from '@/composables/core/query/query.composable'
import { useQuery } from '@/composables/core/query/query.composable'
import type { CurrentUser } from '@/models/auth/currentUser.model.ts'
import { QueryKey } from '@/models/core/query/queryKey.model'

import { authService } from '../services/auth.service'

export function useAuthCurrentUserQuery(): UseQueryReturnType<CurrentUser> {
	return useQuery<CurrentUser>({
		isEnabled: false,
		queryKeys: [
			{
				key: QueryKey.CURRENT_USER,
			},
		],
		queryFn: authService.getCurrentUser,
	})
}
