import type { RouteLocationRaw } from 'vue-router'

type RouteMiddlewareReturnType = RouteLocationRaw | undefined

export type MiddlewareFn = (
  to: RouteLocationRaw,
  from: RouteLocationRaw,
) => Promise<RouteMiddlewareReturnType> | RouteMiddlewareReturnType

export type Middleware = Promise<RouteMiddlewareReturnType> | RouteMiddlewareReturnType
