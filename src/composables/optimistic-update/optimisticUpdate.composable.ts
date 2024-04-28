import { useQueryClient } from '@tanstack/vue-query'

import { QueryKeys, QueryKeyToInvalidate } from '@/types/query/queryKey.type'
import { generateQueryKey } from '@/utils/queryKey.util'

/*
const userDetailOptimisticUpdate = useOptimisticUpdate<User, QueryKey.USER_DETAIL>({
  exact: true,
  key: QueryKey.USER_DETAIL,
  params: {
    userUuid: user => user.uuid,
  },
})

userDetailOptimisticUpdate.update(user)
userDetailOptimisticUpdate.rollback()
*/
export function useOptimisticUpdate<TResData, TQueryKey extends keyof QueryKeys>(
  queryKeyToInvalidate: QueryKeyToInvalidate<TQueryKey, TResData>,
) {
  const queryClient = useQueryClient()
  let previousState: TResData | null = null

  async function update(data: TResData): Promise<void> {
    const queryKey = generateQueryKey(queryKeyToInvalidate, data)

    // Cancel outgoing request to make sure we don't override the cache
    await queryClient.cancelQueries({
      exact: 'exact' in queryKeyToInvalidate && queryKeyToInvalidate.exact,
      queryKey,
    })

    previousState = queryClient.getQueryData(queryKey) ?? null
    queryClient.setQueryData(queryKey, data)
  }

  function rollback(): void {
    if (previousState === null) {
      throw new Error('No previous state to revert to')
    }

    const queryKey = generateQueryKey(queryKeyToInvalidate, previousState)
    queryClient.setQueryData(queryKey, previousState)
  }

  return {
    rollback,
    update,
  }
}
