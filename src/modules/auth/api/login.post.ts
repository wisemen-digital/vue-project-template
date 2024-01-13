import type { UseMutationReturnType } from '@/composables/core'
import { useMutation } from '@/composables/core'
import { oAuthClient } from '@/libs/oAuth.lib'
import type { LoginRequestDto } from '@/models'

export function useLogin(): UseMutationReturnType<LoginRequestDto, void> {
	return useMutation<LoginRequestDto, void>({
		queryFn: ({ body }) => {
			const { username, password } = body
			return oAuthClient.login(username, password)
		},
		queryKeysToInvalidate: [],
	})
}
