import {
  useMutation as useTanstackMutation,
  useQueryClient,
} from '@tanstack/vue-query'
import type { AxiosError } from 'axios'

import type { QueryKeys } from '@/models'

type RequestParams<TReqData, TParams> = TReqData extends Record<string, never>
  ? (TParams extends Record<string, never> ? void : { params: TParams })
  : (TParams extends Record<string, never> ? { body: TReqData } : { body: TReqData, params: TParams })

interface UseMutationOptions<
  TReqData,
  TResData,
  TParams,
> {
  /**
   * Function that will be called when mutation is executed
   * @param options - Request options
   * @param options.body - Request body
   * @param options.params - Request params, if any
   * @returns Promise with response data
   */
  queryFn: (options: RequestParams<TReqData, TParams>) => Promise<TResData>

  queryKeysToInvalidate: {
    [K in keyof QueryKeys]: QueryKeys[K] extends void ? {
      key: K
    } : {
      key: K
      params: QueryKeys[K]
    }
  }[keyof QueryKeys][]
}

export interface UseMutationReturnType<
  TReqData,
  TResData,
  TParams extends Record<string, string> = Record<string, never>,
> {
  /**
   * Response data
   */
  data: ComputedRef<
    TResData extends Array<any>
      ? TResData[]
      : TResData | null
  >

  /**
   * Whether mutation is loading
   */
  isLoading: ComputedRef<boolean>

  /**
   * Execute mutation
   * @param params - Request params
   * @param params.body - Request body
   * @param params.params - Request params, if any
   * @returns Promise with response data
   */
  execute: (params: RequestParams<TReqData, TParams>) => Promise<TResData>
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
  } = useTanstackMutation<TResData, AxiosError<unknown>, RequestParams<TReqData, TParams>>({
    mutationFn: queryFn,
    onSuccess: async () => {
      await Promise.all(queryKeysToInvalidate.map((key) => {
        return queryClient.invalidateQueries({
          queryKey: typeof key === 'object' && 'params' in key
            ? [key.key, ...Object.values(key.params)]
            : [key],
          exact: true,
          refetchType: 'active',
        })
      }))
    },
  })

  const execute = async (params: RequestParams<TReqData, TParams>): Promise<TResData> => mutateAsync(params)

  return {
    data: computed<
      TResData extends Array<any>
        ? TResData[]
        : TResData | null
    >(() => data.value),
    isLoading: computed<boolean>(() => isPending.value),
    execute,
  }
}
