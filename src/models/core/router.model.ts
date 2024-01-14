import type { RouteMiddlewareParams, RouteMiddlewareReturnType } from './routeMiddleware.model'

type MaybePromise<T> = Promise<T> | T

declare module 'vue-router' {
	interface RouteMeta {
		/**
		 * Route middleware
		 */
		middleware?: ((params: RouteMiddlewareParams) => MaybePromise<RouteMiddlewareReturnType>)[]
	}
}
