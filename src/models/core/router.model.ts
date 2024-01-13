import type { RouteMiddleware } from './routeMiddleware.model'

declare module 'vue-router' {
  interface RouteMeta {
    /**
     * Route middleware
     */
    middleware?: RouteMiddleware[]
  }
}
