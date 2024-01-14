import type { UseMutationReturnType } from '@/composables/core/useMutation.ts'
import { useMutation } from '@/composables/core/useMutation.ts'
import { oAuthClient } from '@/libs/oAuth.lib.ts'
import type { LoginRequestDto } from '@/models/auth/forms/loginRequestDto.model.ts'

export function useLogin(): UseMutationReturnType<LoginRequestDto, void> {
	return useMutation<LoginRequestDto, void>({
		queryFn: ({ body }) => {
			const { username, password } = body
			return oAuthClient.login(username, password)
		},
		queryKeysToInvalidate: [],
	})
}
