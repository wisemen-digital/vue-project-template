import type { UseMutationReturnType } from '@wisemen/vue-core-query'
import { useMutation } from '@wisemen/vue-core-query'

import type { ForgotPasswordForm } from '@/models/auth/forgot-password/forgotPasswordForm.model.ts'
import { AuthService } from '@/modules/auth/api/services/auth.service.ts'

export function useAuthForgotPasswordMutation(): UseMutationReturnType<ForgotPasswordForm, void> {
  return useMutation<ForgotPasswordForm, void>({
    queryFn: async ({ body }) => {
      await AuthService.forgotPassword(body)
    },
    queryKeysToInvalidate: {},
  })
}
