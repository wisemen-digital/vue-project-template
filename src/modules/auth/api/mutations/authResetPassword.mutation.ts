import type { UseMutationReturnType } from '@/composables/mutation/mutation.composable.ts'
import { useMutation } from '@/composables/mutation/mutation.composable.ts'
import type { ResetPasswordForm } from '@/models/auth/reset-password/resetPasswordForm.model.ts'

import { AuthService } from '../services/auth.service.ts'

export function useAuthResetPasswordMutation(): UseMutationReturnType<ResetPasswordForm, void> {
  return useMutation<ResetPasswordForm, void>({
    queryFn: async ({ body }) => {
      await AuthService.resetPassword(body)
    },
    queryKeysToInvalidate: [],
  })
}
