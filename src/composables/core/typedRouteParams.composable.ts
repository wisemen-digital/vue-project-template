import { useRoute } from 'vue-router'

import type { Routes } from '@/models/core/routes.model.ts'

type UseTypedRouteParamsReturnType<T extends keyof Routes> = {
	[K in keyof (Routes[T] extends {
		params: infer P
	}
		? P
		: never)]: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useTypedRouteParams<T extends keyof Routes>(_routeName: T): UseTypedRouteParamsReturnType<T> {
	const route = useRoute()

	return route.params as UseTypedRouteParamsReturnType<T>
}
