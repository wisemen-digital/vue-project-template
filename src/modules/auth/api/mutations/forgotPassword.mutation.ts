import type { UseMutationReturnType } from '@/composables/core/mutation.composable'
import { useMutation } from '@/composables/core/mutation.composable'
import type { ForgotPasswordRequestDto } from '@/models/auth/forms/forgotPasswordRequestDto.model.ts'

import { authService } from '../services/auth.service'

export function useForgotPasswordMutation(): UseMutationReturnType<ForgotPasswordRequestDto, void> {
	return useMutation<ForgotPasswordRequestDto, void>({
		queryFn: async ({ body }) => {
			await authService.forgotPassword(body)
		},
		queryKeysToInvalidate: [],
	})
}
