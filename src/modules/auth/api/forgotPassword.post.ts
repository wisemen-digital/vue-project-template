import { z } from 'zod'

import type { UseMutationReturnType } from '@/composables/core/mutation.composable'
import { useMutation } from '@/composables/core/mutation.composable'
import { unauthorizedHttpClient } from '@/libs/http.lib.ts'
import type { ForgotPasswordRequestDto } from '@/models/auth/forms/forgotPasswordRequestDto.model.ts'

function forgotPassword(body: ForgotPasswordRequestDto): Promise<void> {
	return unauthorizedHttpClient.post({
		url: '/forgot-password',
		body,
		responseSchema: z.any(),
	})
}

export function useForgotPassword(): UseMutationReturnType<ForgotPasswordRequestDto, void> {
	return useMutation<ForgotPasswordRequestDto, void>({
		queryFn: ({ body }) => forgotPassword(body),
		queryKeysToInvalidate: [],
	})
}
