import { z } from 'zod'

import type { UseMutationReturnType } from '@/composables/core'
import { useMutation } from '@/composables/core'
import { unauthorizedHttpClient } from '@/libs'
import type { ForgotPasswordRequestDto } from '@/models'

export function useForgotPassword(): UseMutationReturnType<
  ForgotPasswordRequestDto,
  void
> {
  return useMutation<ForgotPasswordRequestDto, void>({
    queryFn: ({ body }) => unauthorizedHttpClient.post({
      url: '/forgot-password',
      body,
      responseSchema: z.any(),
    }),
    queryKeysToInvalidate: [],
  })
}
