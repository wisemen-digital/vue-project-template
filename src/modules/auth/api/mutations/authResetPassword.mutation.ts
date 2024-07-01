import type { UseMutationReturnType } from '@wisemen/vue-core-query'
import { useMutation } from '@wisemen/vue-core-query'

import type { ResetPasswordForm } from '@/models/auth/reset-password/resetPasswordForm.model.ts'
import { AuthService } from '@/modules/auth/api/services/auth.service.ts'

export function useAuthResetPasswordMutation(): UseMutationReturnType<ResetPasswordForm, void> {
  return useMutation<ResetPasswordForm, void>({
    queryFn: async ({ body }) => {
      await AuthService.resetPassword(body)
    },
    queryKeysToInvalidate: {},
  })
}
