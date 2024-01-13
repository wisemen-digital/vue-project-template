import type {
	RouteLocationNamedRaw,
	RouteLocationNormalized,
	RouteLocationRaw,
	Router,
	RouteRecordNormalized,
	RouteRecordRaw,
} from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import type { RouteMiddleware } from '@/models/core/routeMiddleware.model.ts'
import { routes } from '@/routes'

import type { Routes } from './routes'

export type RouteLocationTyped<T extends keyof Routes> = RouteLocationNamedRaw &
	(Routes[T] extends { params: infer P }
		? P extends undefined
			? object
			: {
					params: P
			  }
		: object) & {
		name: T
	}

export type RouteRecordTyped =
	| {
			name: keyof Routes
			path: string
			redirect?: RouteRecordRaw['redirect'] & {
				name: keyof Routes
			}
			children?: RouteRecordTyped[]
	  }
	| (Omit<RouteRecordRaw, 'children' | 'name'> & {
			children: RouteRecordTyped[]
	  })

function setupRouteMiddlewareIncterceptor(router: Router): void {
	const hasMiddleware = (
		to: RouteRecordNormalized
	): to is RouteRecordNormalized & {
		meta: {
			middleware: RouteMiddleware[]
		}
	} => to.meta.middleware != null

	const handleRouteMiddlewares = async (
		to: RouteLocationNormalized,
		from: RouteLocationNormalized
	): Promise<RouteLocationRaw | undefined> => {
		const middlewares = to.matched.filter(hasMiddleware).flatMap(({ meta }) => meta.middleware)

		for (const middleware of middlewares) {
			const result = await middleware(to, from)

			if (result != null) {
				return result
			}
		}
	}

	router.beforeEach(handleRouteMiddlewares)
}

const router = createRouter({
	history: createWebHistory(),
	routes: routes as RouteRecordRaw[],
})

setupRouteMiddlewareIncterceptor(router)

export const routerPlugin = router
