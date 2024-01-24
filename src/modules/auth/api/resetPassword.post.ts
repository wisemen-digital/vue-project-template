import { z } from 'zod'

import type { UseMutationReturnType } from '@/composables/core/mutation.composable'
import { useMutation } from '@/composables/core/mutation.composable'
import { unauthorizedHttpClient } from '@/libs/http.lib.ts'
import type { ResetPasswordRequestDto } from '@/models/auth/forms/resetPasswordRequestDto.model.ts'

function resetPassword(body: ResetPasswordRequestDto): Promise<void> {
	return unauthorizedHttpClient.post({
		url: '/reset-password',
		body,
		responseSchema: z.any(),
	})
}

export function useResetPassword(): UseMutationReturnType<ResetPasswordRequestDto, void> {
	return useMutation<ResetPasswordRequestDto, void>({
		queryFn: ({ body }) => resetPassword(body),
		queryKeysToInvalidate: [],
	})
}
