import type { UseQueryReturnType } from '@/composables/query/query.composable'
import { useQuery } from '@/composables/query/query.composable'
import type { CurrentUser } from '@/models/auth/current-user/currentUser.model'
import { QueryKey } from '@/types/query/queryKey.type'

import { authService } from '../services/auth.service'

export function useAuthCurrentUserQuery(): UseQueryReturnType<CurrentUser> {
	return useQuery<CurrentUser>({
		isEnabled: false,
		queryKey: {
			key: QueryKey.CURRENT_USER,
		},
		queryFn: authService.getCurrentUser,
	})
}
