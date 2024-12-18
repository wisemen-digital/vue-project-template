import type {
  Middleware,
  MiddlewareFn,
} from '@/types/routeMiddleware.type'

/**
 * A simple wrapper for middleware functions so that you don't have to worry about the types
 * when implementing them.
 * @param middlewareFn The middleware function to wrap.
 * @returns The middleware function.
 */
export class MiddlewareUtil {
  static createMiddleware(middlewareFn: MiddlewareFn): () => Middleware {
    return middlewareFn as () => Middleware
  }
}
