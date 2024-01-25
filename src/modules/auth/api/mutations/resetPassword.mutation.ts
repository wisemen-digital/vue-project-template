import type { UseMutationReturnType } from '@/composables/core/mutation.composable'
import { useMutation } from '@/composables/core/mutation.composable'
import type { ResetPasswordRequestDto } from '@/models/auth/forms/resetPasswordRequestDto.model.ts'

import { authService } from '../services/auth.service'

export function useResetPasswordMutation(): UseMutationReturnType<ResetPasswordRequestDto, void> {
	return useMutation<ResetPasswordRequestDto, void>({
		queryFn: ({ body }) => authService.resetPassword(body),
		queryKeysToInvalidate: [],
	})
}
