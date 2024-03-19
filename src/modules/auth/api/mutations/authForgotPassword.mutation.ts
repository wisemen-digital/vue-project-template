import type { UseMutationReturnType } from '@/composables/mutation/mutation.composable.ts'
import { useMutation } from '@/composables/mutation/mutation.composable.ts'
import type { ForgotPasswordForm } from '@/models/auth/forgot-password/forgotPasswordForm.model.ts'
import { QueryKey } from '@/types/query/queryKey.type'

import { authService } from '../services/auth.service.ts'

export function useAuthForgotPasswordMutation(): UseMutationReturnType<ForgotPasswordForm, void> {
  return useMutation<ForgotPasswordForm, void>({
    queryFn: async ({ body }) => {
      await authService.forgotPassword(body)
    },
    queryKeysToInvalidate: [
      {
        key: QueryKey.CURRENT_USER,
      },
    ],
  })
}
