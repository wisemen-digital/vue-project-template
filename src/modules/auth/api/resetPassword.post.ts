import { z } from 'zod'

import type { UseMutationReturnType } from '@/composables/core/useMutation.ts'
import { useMutation } from '@/composables/core/useMutation.ts'
import { unauthorizedHttpClient } from '@/libs/http.lib.ts'
import type { ResetPasswordRequestDto } from '@/models/auth/forms'

export function useResetPassword(): UseMutationReturnType<ResetPasswordRequestDto, void> {
	return useMutation<ResetPasswordRequestDto, void>({
		queryFn: ({ body }) =>
			unauthorizedHttpClient.post({
				url: '/reset-password',
				body,
				responseSchema: z.any(),
			}),
		queryKeysToInvalidate: [],
	})
}
