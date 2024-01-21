import type { UseCommandResult } from '@/composables/core/useCommand.ts'
import { useCommand } from '@/composables/core/useCommand.ts'
import { oAuthClient } from '@/libs/oAuth.lib.ts'
import type { LoginRequestDto } from '@/models/auth/forms/loginRequestDto.model.ts'

export function useLoginCommand(): UseCommandResult<LoginRequestDto, void> {
	return useCommand<LoginRequestDto, void>({
		queryFn: ({ body }) => {
			return oAuthClient.login(body.username, body.password)
		},
		queryKeysToInvalidate: [],
	})
}
