import { useInfiniteQuery } from '@tanstack/vue-query'
import type { AxiosRequestConfig } from 'axios'
import { z } from 'zod'

import { httpClient } from '@/libs'
import type { QueryKey } from '@/models'

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
	queryKey: QueryKey[]
	responseSchema: T
	config?: AxiosRequestConfig
}

interface UsePaginatedQueryReturnType {
	data: ComputedRef<unknown>
	meta: ComputedRef<z.infer<typeof meta> | null>
	nextPage: () => Promise<void>
}

export function usePaginatedQuery<T extends z.ZodType>({
	url,
	responseSchema,
	queryKey,
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
		queryKey: [...queryKey, config?.params],
		initialPageParam: '1',
		getNextPageParam: (data) => {
			const { currentPage, lastPage } = data.meta

			if (currentPage === lastPage) {
				return null
			}

			return String(currentPage + 1)
		},
	})

	const nextPage = async (): Promise<void> => {
		if (isFetchingNextPage.value) {
			return
		}

		if (hasNextPage.value) {
			await fetchNextPage()
		}
	}

	return {
		data: computed<any>(() => data.value?.pages.flatMap((page) => page.data) ?? []),
		meta: computed<z.infer<typeof meta> | null>(() => {
			const pageLength = data.value?.pages.length ?? 1
			const index = pageLength - 1

			return data.value?.pages.flatMap((page) => page.meta)[index] ?? null
		}),
		nextPage,
	}
}
