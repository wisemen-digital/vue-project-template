import type {
  RouteLocationNormalized,
  RouteLocationRaw,
  Router,
  RouteRecordNormalized,
} from 'vue-router'

import type { RouteMiddlewareReturnType } from '@/types/router/routeMiddleware.type'

export function useRouterMiddleware(router: Router): void {
  function hasMiddleware(to: RouteRecordNormalized): to is {
    meta: {
      middleware: ((
        to: RouteLocationNormalized,
        from: RouteLocationNormalized,
      ) => RouteMiddlewareReturnType)[]
    }
  } & RouteRecordNormalized {
    return to.meta.middleware != null
  }

  async function handleRouteMiddlewares(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
  ): Promise<RouteLocationRaw | undefined> {
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
