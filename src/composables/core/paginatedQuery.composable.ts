import { useInfiniteQuery } from '@tanstack/vue-query'
import type { AxiosRequestConfig } from 'axios'
import type { ComputedRef, MaybeRefOrGetter } from 'vue'
import { computed } from 'vue'
import { z } from 'zod'

import { httpClient } from '@/libs/http.lib'
import type { QueryKeys } from '@/models/core/queryKey.model'

export const meta = z.object({
	currentPage: z.number(),
	lastPage: z.number(),
	total: z.number(),
	perPage: z.number(),
})

export const links = z.object({
	prev: z.string().url().nullable(),
	next: z.string().url().nullable(),
})

export type Meta = z.infer<typeof meta>

export type Links = z.infer<typeof links>

interface UsePaginatedQueryOptions<T extends z.ZodType> {
	url: string
	responseSchema: T
	config?: AxiosRequestConfig
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

interface UsePaginatedQueryReturnType {
	data: ComputedRef<unknown>
	meta: ComputedRef<z.infer<typeof meta> | null>
	nextPage: () => Promise<void>
}

export function usePaginatedQuery<T extends z.ZodType>({
	url,
	responseSchema,
	queryKeys,
	config,
}: UsePaginatedQueryOptions<T>): UsePaginatedQueryReturnType {
	const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
		queryFn: () =>
			httpClient.get({
				url,
				config,
				responseSchema: z.object({
					data: responseSchema.array(),
					meta,
					links,
				}),
			}),
		queryKey: [
			...queryKeys.map((key) => {
				if (typeof key === 'object' && 'params' in key) {
					return [key.key, ...Object.values(key.params)]
				}

				return key.key
			}),
			config?.params,
		],
		initialPageParam: '1',
		getNextPageParam: (data) => {
			const { currentPage, lastPage } = data.meta

			if (currentPage === lastPage) {
				return null
			}

			return String(currentPage + 1)
		},
	})

	async function nextPage(): Promise<void> {
		if (isFetchingNextPage.value) {
			return
		}

		if (hasNextPage.value) {
			await fetchNextPage()
		}
	}

	return {
		data: computed<unknown>(() => data.value?.pages.flatMap((page) => page.data) ?? []),
		meta: computed<z.infer<typeof meta> | null>(() => {
			const pageLength = data.value?.pages.length ?? 1
			const index = pageLength - 1

			return data.value?.pages.flatMap((page) => page.meta)[index] ?? null
		}),
		nextPage,
	}
}
