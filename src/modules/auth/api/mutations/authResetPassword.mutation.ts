import type { UseMutationReturnType } from '@/composables/core/mutation/mutation.composable.ts'
import { useMutation } from '@/composables/core/mutation/mutation.composable.ts'
import type { ResetPasswordRequestDto } from '@/models/auth/forms/resetPasswordRequestDto.model.ts'

import { authService } from '../services/auth.service.ts'

export function useAuthResetPasswordMutation(): UseMutationReturnType<ResetPasswordRequestDto, void> {
	return useMutation<ResetPasswordRequestDto, void>({
		queryFn: async ({ body }) => {
			await authService.resetPassword(body)
		},
		queryKeysToInvalidate: [],
	})
}
