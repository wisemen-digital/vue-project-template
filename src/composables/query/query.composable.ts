import { useQuery as useTanstackQuery } from '@tanstack/vue-query'
import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import { computed, toValue } from 'vue'

import type { QueryKeys } from '@/types/query/queryKey.type'

interface UseQueryOptions<TResData> {
  /**
   * Whether query should be enabled
   */
  isEnabled?: MaybeRefOrGetter<boolean>
  /**
   * Function that will be called when query is executed
   * @returns Promise with response data
   */
  queryFn: () => Promise<TResData>
  /*
   * Query keys to invalidate after query is successful
   */
  queryKey: {
    [K in keyof QueryKeys]: QueryKeys[K] extends void
      ? {
          key: K
        }
      : {
          key: K
          params: MaybeRefOrGetter<QueryKeys[K]>
        }
  }[keyof QueryKeys]
  /**
   * The time in milliseconds after which the query will be considered stale
   * After this time, the query will be refetched automatically in the background when it is rendered or accessed
   * @default 0
   */
  staleTime?: number
}

export interface UseQueryReturnType<TResData> {
  /**
   * Response data
   */
  data: ComputedRef<TResData | null>
  /**
   * Error object, if in error state
   */
  error: ComputedRef<unknown>
  /**
   * Whether query is in error state
   */
  isError: ComputedRef<boolean>
  /**
   * Whether query is loading
   */
  isLoading: ComputedRef<boolean>
  /**
   * Whether query is in success state
   */
  isSuccess: ComputedRef<boolean>
  /**
   * Function to refetch the query
   */
  refetch: () => Promise<void>
  /**
   * Promise that will resolve when query is successful
   */
  suspense: () => Promise<void>
}

export function useQuery<TResData>({
  isEnabled,
  queryFn,
  queryKey,
  staleTime = 0,
}: UseQueryOptions<TResData>): UseQueryReturnType<TResData> {
  const {
    data,
    error,
    isError,
    isLoading,
    isSuccess,
    refetch,
    suspense,
  } = useTanstackQuery({
    enabled: isEnabled,
    placeholderData: data => data,
    queryFn,
    queryKey: computed<string[]>(() => getQueryKey()),
    staleTime,
  })

  function getQueryKey(): string[] {
    if (typeof queryKey === 'object' && 'params' in queryKey) {
      return [
        queryKey.key,
        ...Object.values(toValue(queryKey.params)),
      ]
    }

    return [
      queryKey.key,
    ]
  }

  async function susp(): Promise<void> {
    await suspense()
  }

  async function reftch(): Promise<void> {
    await refetch()
  }

  return {
    data: computed<TResData | null>(() => data.value ?? null),
    error: computed<unknown>(() => error.value),
    isError: computed<boolean>(() => isError.value),
    isLoading: computed<boolean>(() => isLoading.value),
    isSuccess: computed<boolean>(() => isSuccess.value),
    refetch: reftch,
    suspense: susp,
  }
}
