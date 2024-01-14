import { computed } from 'vue'

import type { UseQueryReturnType } from '@/composables/core/useQuery.ts'
import { useQuery } from '@/composables/core/useQuery.ts'
import { httpClient } from '@/libs/http.lib.ts'
import type { CurrentUser, CurrentUserResponseDto } from '@/models/auth/currentUser.model.ts'
import { currentUserResponseDto } from '@/models/auth/currentUser.model.ts'
import { QueryKey } from '@/models/core/queryKey.model.ts'
import { mapCurrentUserResponseDtoToCurrentUser } from '@/transformers/auth.transformer.ts'

export function useGetCurrentUser(): UseQueryReturnType<CurrentUser> {
	const { data, suspense, ...rest } = useQuery<CurrentUserResponseDto>({
		isEnabled: false,
		queryKey: [
			{
				key: QueryKey.CURRENT_USER,
			},
		],
		queryFn: () => {
			return httpClient.get({
				url: '/users/me',
				responseSchema: currentUserResponseDto,
			})
		},
	})

	return {
		...rest,
		suspense,
		data: computed<CurrentUser | null>(() => {
			if (data.value === null) {
				return null
			}

			return mapCurrentUserResponseDtoToCurrentUser(data.value)
		}),
	}
}
