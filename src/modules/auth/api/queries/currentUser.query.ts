import type { UseQueryReturnType } from '@/composables/core/query.composable'
import { useQuery } from '@/composables/core/query.composable'
import { httpClient } from '@/libs/http.lib.ts'
import type { CurrentUser } from '@/models/auth/currentUser.model.ts'
import { currentUserResponseDto } from '@/models/auth/currentUser.model.ts'
import { QueryKey } from '@/models/core/queryKey.model.ts'
import { mapCurrentUserResponseDtoToCurrentUser } from '@/transformers/auth.transformer.ts'

async function getCurrentUser(): Promise<CurrentUser> {
	const data = await httpClient.get({
		url: '/users/me',
		responseSchema: currentUserResponseDto,
	})

	return mapCurrentUserResponseDtoToCurrentUser(data)
}

export function useGetCurrentUserQuery(): UseQueryReturnType<CurrentUser> {
	return useQuery<CurrentUser>({
		isEnabled: false,
		queryKeys: [
			{
				key: QueryKey.CURRENT_USER,
			},
		],
		queryFn: getCurrentUser,
	})
}
