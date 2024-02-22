import { useQuery as useTanstackQuery } from '@tanstack/vue-query'
import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import { computed } from 'vue'

import type { QueryKeys } from '@/types/query/queryKey.type'

interface UseQueryOptions<TResData> {
	/**
	 * Whether query should be enabled
	 */
	isEnabled?: MaybeRefOrGetter<boolean>
	/**
	 * The time in milliseconds after which the query will be considered stale
	 * After this time, the query will be refetched automatically in the background when it is rendered or accessed
	 * @default 0
	 */
	staleTime?: number
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
	queryKey,
	staleTime = 0,
}: UseQueryOptions<TResData>): UseQueryReturnType<TResData> {
	const { data, error, isLoading, isError, isSuccess, suspense, refetch } = useTanstackQuery({
		queryFn,
		staleTime,
		queryKey: getQueryKey(),
		enabled: isEnabled,
		placeholderData: (data) => data,
	})

	function getQueryKey(): string[] {
		if (typeof queryKey === 'object' && 'params' in queryKey) {
			return [queryKey.key, queryKey.params as unknown as string]
		}

		return [queryKey.key]
	}

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
