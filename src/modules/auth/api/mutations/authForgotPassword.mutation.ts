import type { UseMutationReturnType } from '@/composables/core/mutation.composable.ts'
import { useMutation } from '@/composables/core/mutation.composable.ts'
import type { ForgotPasswordRequestDto } from '@/models/auth/forms/forgotPasswordRequestDto.model.ts'

import { authService } from '../services/auth.service.ts'

export function useAuthForgotPasswordMutation(): UseMutationReturnType<ForgotPasswordRequestDto, void> {
	return useMutation<ForgotPasswordRequestDto, void>({
		queryFn: async ({ body }) => {
			await authService.forgotPassword(body)
		},
		queryKeysToInvalidate: [],
	})
}
