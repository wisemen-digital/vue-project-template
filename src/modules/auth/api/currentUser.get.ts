import type { UseQueryReturnType } from '@/composables/core'
import { useQuery } from '@/composables/core'
import { httpClient } from '@/libs'
import type {
  CurrentUser,
  CurrentUserResponseDto,
} from '@/models'
import {
  currentUserResponseDto,
  QueryKey,
} from '@/models'
import { mapCurrentUserResponseDtoToCurrentUser } from '@/transformers'

export function useGetCurrentUser(): UseQueryReturnType<CurrentUser> {
  const {
    data,
    suspense,
    ...rest
  } = useQuery<CurrentUserResponseDto>({
    isEnabled: false,
    queryKey: [{
      key: QueryKey.CURRENT_USER,
    }],
    queryFn: () => {
      return httpClient.get({
        url: '/users/me',
        responseSchema: currentUserResponseDto,
      })
    },
  })

  return {
    ...rest,
    suspense,
    data: computed<CurrentUser | null>(() => {
      if (data.value === null)
        return null

      return mapCurrentUserResponseDtoToCurrentUser(data.value)
    }),
  }
}
