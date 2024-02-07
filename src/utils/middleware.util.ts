import type { RouteMiddlewareReturnType } from '@/models/core/router/routeMiddleware.model'

type MiddlewareFn = () => Promise<RouteMiddlewareReturnType> | RouteMiddlewareReturnType
type Middleware = Promise<RouteMiddlewareReturnType> | RouteMiddlewareReturnType

/**
 * A simple wrapper for middleware functions so that you don't have to worry about the types
 * when implementing them.
 * @param middlewareFn The middleware function to wrap.
 * @returns The middleware function.
 */
export function createMiddleware(middlewareFn: MiddlewareFn): () => Middleware {
	return middlewareFn
}
