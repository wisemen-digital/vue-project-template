import type {
  RouteLocationNormalized,
  RouteLocationRaw,
  Router,
  RouteRecordNormalized,
  RouteRecordRaw,
} from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import { routes } from '@/routes/routes'
import type { RouteMiddlewareReturnType } from '@/types/router/routeMiddleware.type'

function setupRouteMiddlewareInterceptor(router: Router): void {
  function hasMiddleware(to: RouteRecordNormalized): to is RouteRecordNormalized & {
    meta: {
      middleware: ((to: RouteLocationNormalized, from: RouteLocationNormalized) => RouteMiddlewareReturnType)[]
    }
  } {
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

const router = createRouter({
  history: createWebHistory(),
  routes: routes as RouteRecordRaw[],
})

setupRouteMiddlewareInterceptor(router)

export const routerPlugin = router
