import { useMutation as useTanstackMutation, useQueryClient } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'

import type { QueryKeys } from '@/types/query/queryKey.type'

type RequestParams<TReqData, TParams> = TReqData extends Record<string, never>
	? TParams extends Record<string, never>
		? void
		: { params: TParams }
	: TParams extends Record<string, never>
	? { body: TReqData }
	: { body: TReqData; params: TParams }

type QueryKeyWithParams<K extends keyof QueryKeys, TResData> = {
	key: K
	params: {
		[P in keyof QueryKeys[K]]: QueryKeys[K][P] | ((params: TResData) => QueryKeys[K][P])
	}
	exact: true
}

type QueryKeyExactType<K extends keyof QueryKeys> = {
	key: K
	exact: false
}

type QueryKeyToInvalidate<K extends keyof QueryKeys, TResData> = QueryKeyExactType<K> | QueryKeyWithParams<K, TResData>

interface UseMutationOptions<TReqData, TResData, TParams> {
	/**
	 * Function that will be called when mutation is executed
	 * @param options - Request options
	 * @param options.body - Request body
	 * @param options.params - Request params, if any
	 * @returns Promise with response data
	 */
	queryFn: (options: RequestParams<TReqData, TParams>) => Promise<TResData>

	queryKeysToInvalidate: {
		[K in keyof QueryKeys]: QueryKeys[K] extends void
			? {
					key: K
			  }
			: QueryKeyToInvalidate<K, TResData>
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
	data: ComputedRef<TResData extends unknown[] ? TResData[] : TResData | null>

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

	const { data, isPending, mutateAsync } = useTanstackMutation<
		TResData,
		AxiosError<unknown>,
		RequestParams<TReqData, TParams>
	>({
		mutationFn: queryFn,
		onSuccess: async (responseData) => {
			await Promise.all(
				queryKeysToInvalidate.map((queryKey) => {
					// Query key as just a string
					if ('key' in queryKey && !('params' in queryKey)) {
						// eslint-disable-next-line no-console
						console.log(`[CACHE] Invalidating \`${queryKey.key}\``)

						return queryClient.invalidateQueries({
							queryKey: [queryKey.key],
							refetchType: 'active',
						})
					}

					// Query key with params
					if ('key' in queryKey && 'params' in queryKey) {
						const params = Object.values(queryKey.params).map((param) => {
							if (typeof param === 'function') {
								return param(responseData)
							}

							return param
						})

						const queryKeyArray = [queryKey.key, ...Object.values(params)]

						// eslint-disable-next-line no-console
						console.log(`[CACHE] Invalidating \`${queryKeyArray}\``)

						return queryClient.invalidateQueries({
							queryKey: queryKeyArray,
							exact: true,
						})
					}

					return queryClient.invalidateQueries()
				})
			)
		},
	})

	async function execute(params: RequestParams<TReqData, TParams>): Promise<TResData> {
		return await mutateAsync(params)
	}

	return {
		data: computed<TResData extends unknown[] ? TResData[] : TResData | null>(() => data.value),
		isLoading: computed<boolean>(() => isPending.value),
		execute,
	}
}
