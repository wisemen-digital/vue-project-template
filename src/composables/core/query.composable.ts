import { useQuery as useTanstackQuery } from '@tanstack/vue-query'
import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import { computed } from 'vue'

import type { QueryKeys } from '@/types/core/query/queryKey.model.ts'

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
	queryKeys: {
		[K in keyof QueryKeys]: QueryKeys[K] extends void
			? {
					key: K
			  }
			: {
					key: K
					params: MaybeRefOrGetter<QueryKeys[K]>
			  }
	}[keyof QueryKeys][]
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
	 * Whether query is loading
	 */
	isLoading: ComputedRef<boolean>
	/**
	 * Whether query is in error state
	 */
	isError: ComputedRef<boolean>
	/**
	 * Whether query is in success state
	 */
	isSuccess: ComputedRef<boolean>
	/**
	 * Promise that will resolve when query is successful
	 */
	suspense: () => Promise<void>
	/**
	 * Function to refetch the query
	 */
	refetch: () => Promise<void>
}

export function useQuery<TResData>({
	queryFn,
	isEnabled,
	queryKeys,
}: UseQueryOptions<TResData>): UseQueryReturnType<TResData> {
	const { data, error, isLoading, isError, isSuccess, suspense, refetch } = useTanstackQuery({
		queryFn,
		enabled: isEnabled,
		queryKey: queryKeys.map((key) => {
			if (typeof key === 'object' && 'params' in key) {
				return [key.key, ...Object.values(key.params)]
			}

			return key.key
		}),
	})

	async function susp(): Promise<void> {
		await suspense()
	}

	async function reftch(): Promise<void> {
		await refetch()
	}

	return {
		suspense: susp,
		refetch: reftch,
		data: computed<TResData | null>(() => data.value ?? null),
		error: computed<unknown>(() => error.value),
		isLoading: computed<boolean>(() => isLoading.value),
		isError: computed<boolean>(() => isError.value),
		isSuccess: computed<boolean>(() => isSuccess.value),
	}
}
