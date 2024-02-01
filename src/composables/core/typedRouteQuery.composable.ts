import { useRoute } from 'vue-router'

import type { Routes } from '@/models/core/routes.model.ts'

type UseTypedRouteQuery<T extends keyof Routes> = {
	[K in keyof (Routes[T] extends {
		queryParams: infer P
	}
		? P
		: never)]: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useTypedRouteQuery<T extends keyof Routes>(_routeName: T): UseTypedRouteQuery<T> {
	const route = useRoute()

	return route.query as UseTypedRouteQuery<T>
}
