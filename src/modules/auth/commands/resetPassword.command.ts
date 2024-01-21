import { z } from 'zod'

import type { UseCommandResult } from '@/composables/core/useCommand.ts'
import { useCommand } from '@/composables/core/useCommand.ts'
import { unauthorizedHttpClient } from '@/libs/http.lib.ts'
import type { ResetPasswordRequestDto } from '@/models/auth/forms/resetPasswordRequestDto.model.ts'

export function useResetPasswordCommand(): UseCommandResult<ResetPasswordRequestDto, void> {
	return useCommand<ResetPasswordRequestDto, void>({
		queryFn: (options) =>
			unauthorizedHttpClient.post({
				url: '/reset-password',
				body: options.body,
				responseSchema: z.any(),
			}),
		queryKeysToInvalidate: [],
	})
}
