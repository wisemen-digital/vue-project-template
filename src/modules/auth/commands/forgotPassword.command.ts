import { z } from 'zod'

import type { UseCommandResult } from '@/composables/core/useCommand.ts'
import { useCommand } from '@/composables/core/useCommand.ts'
import { unauthorizedHttpClient } from '@/libs/http.lib.ts'
import type { ForgotPasswordRequestDto } from '@/models/auth/forms/forgotPasswordRequestDto.model.ts'
import { mapForgotPasswordFormToForgotPasswordRequestDto } from '@/transformers/auth.transformer.ts'

export function useForgotPasswordCommand(): UseCommandResult<ForgotPasswordRequestDto, void> {
	return useCommand<ForgotPasswordRequestDto, void>({
		queryFn: ({ body }) =>
			unauthorizedHttpClient.post({
				url: '/forgot-password',
				body: mapForgotPasswordFormToForgotPasswordRequestDto(body),
				responseSchema: z.any(),
			}),
		queryKeysToInvalidate: [],
	})
}
