import { z } from 'zod'

import type { UseMutationReturnType } from '@/composables/core'
import { useMutation } from '@/composables/core'
import { unauthorizedHttpClient } from '@/libs'
import type { ResetPasswordRequestDto } from '@/models'

export function useResetPassword(): UseMutationReturnType<
  ResetPasswordRequestDto,
  void
> {
  return useMutation<ResetPasswordRequestDto, void>({
    queryFn: ({ body }) => unauthorizedHttpClient.post({
      url: '/reset-password',
      body,
      responseSchema: z.any(),
    }),
    queryKeysToInvalidate: [],
  })
}
