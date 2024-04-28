/* eslint-disable simple-import-sort/imports */
import { useQueryClient, useMutation as useTanstackMutation } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'

import type { QueryKeyToInvalidate, QueryKeysToInvalidate } from '@/types/query/queryKey.type'
import { generateQueryKey } from '@/utils/queryKey.util'
import { logInfo } from '@/utils/logger.util'

type RequestParams<TReqData, TParams> = TReqData extends Record<string, never>
  ? TParams extends Record<string, never>
    ? void
    : { params: TParams }
  : TParams extends Record<string, never>
    ? { body: TReqData }
    : { body: TReqData, params: TParams }

interface UseMutationOptions<TReqData, TResData, TParams> {
  /**
   * Function that will be called when mutation is executed
   * @param options - Request options
   * @param options.body - Request body
   * @param options.params - Request params, if any
   * @returns Promise with response data
   */
  queryFn: (options: RequestParams<TReqData, TParams>) => Promise<TResData>

  queryKeysToInvalidate: QueryKeysToInvalidate<TResData>
}

export interface UseMutationReturnType<
  TReqData,
  TResData,
  TParams extends Record<string, string> = Record<string, never>,
> {
  /**
   * Response data
   */
  data: ComputedRef<TResData extends unknown[] ? TResData[] : TResData | null>

  /**
   * Execute mutation
   * @param params - Request params
   * @param params.body - Request body
   * @param params.params - Request params, if any
   * @returns Promise with response data
   */
  execute: (params: RequestParams<TReqData, TParams>) => Promise<TResData>

  /**
   * Whether mutation is loading
   */
  isLoading: ComputedRef<boolean>
}

export function useMutation<
  TReqData = Record<string, never>,
  TResData = Record<string, never>,
  TParams extends Record<string, string> = Record<string, never>,
>({
  queryFn,
  queryKeysToInvalidate,
}: UseMutationOptions<TReqData, TResData, TParams>): UseMutationReturnType<TReqData, TResData, TParams> {
  const queryClient = useQueryClient()

  const {
    data,
    isPending,
    mutateAsync,
  } = useTanstackMutation<
    TResData,
    AxiosError<unknown>,
    RequestParams<TReqData, TParams>
  >({
    mutationFn: queryFn,
    onSuccess: async (responseData) => {
      await Promise.all(
        queryKeysToInvalidate.map(async (queryKey) => {
          const generatedKey = generateQueryKey(
            queryKey as QueryKeyToInvalidate<typeof queryKey.key, typeof responseData>,
            responseData,
          )

          logInfo(`[CACHE] Invalidating \`${generatedKey}\``)

          await queryClient.invalidateQueries({
            exact: 'exact' in queryKey && queryKey.exact,
            queryKey: generatedKey,
          })

          return queryClient.invalidateQueries()
        }),
      )
    },
  })

  async function execute(params: RequestParams<TReqData, TParams>): Promise<TResData> {
    return await mutateAsync(params)
  }

  return {
    data: computed<TResData extends unknown[] ? TResData[] : TResData | null>(() => data.value),
    execute,
    isLoading: computed<boolean>(() => isPending.value),
  }
}
