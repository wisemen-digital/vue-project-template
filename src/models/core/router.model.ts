import type { RouteMiddlewareReturnType } from './routeMiddleware.model'

type MaybePromise<T> = Promise<T> | T

declare module 'vue-router' {
	interface RouteMeta {
		/**
		 * Route middleware
		 */
		middleware?: ((
			to: RouteLocationNormalized,
			from: RouteLocationNormalized
		) => MaybePromise<RouteMiddlewareReturnType>)[]
	}
}
