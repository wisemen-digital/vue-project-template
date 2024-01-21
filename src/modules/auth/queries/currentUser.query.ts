import type { UseQueryResult } from '@/composables/core/useQuery.ts'
import { useQuery } from '@/composables/core/useQuery.ts'
import { httpClient } from '@/libs/http.lib.ts'
import type { CurrentUser } from '@/models/auth/currentUser.model.ts'
import { currentUserResponseDto } from '@/models/auth/currentUser.model.ts'
import { QueryKey } from '@/models/core/queryKey.model.ts'
import { mapCurrentUserResponseDtoToCurrentUser } from '@/transformers/auth.transformer.ts'

export function useCurrentUserQuery(): UseQueryResult<CurrentUser> {
	return useQuery<CurrentUser>({
		isEnabled: false,
		queryKey: [
			{
				key: QueryKey.CURRENT_USER,
			},
		],
		queryFn: async () => {
			const response = await httpClient.get({
				url: '/users/me',
				responseSchema: currentUserResponseDto,
			})
			return mapCurrentUserResponseDtoToCurrentUser(response)
		},
	})
}
