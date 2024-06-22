import type {
  RouteLocationNamedRaw,
  RouteRecordRaw,
} from 'vue-router'

import type { Routes } from '@/routes/routes'

import type { RouteMiddlewareReturnType } from './routeMiddleware.type.ts'

type MaybePromise<T> = Promise<T> | T

export type RouteLocationTyped<T extends keyof Routes> = {
  name: T
} &
RouteLocationNamedRaw & (Routes[T] extends { params: infer P }
  ? P extends undefined
    ? object
    : {
        params: {
          [K in keyof P]: P[K]
        }
      }
  : object)

export type RouteRecordTyped =
  | ({
    children: RouteRecordTyped[]
  } & Omit<RouteRecordRaw, 'children' | 'name'>)
  | {
    name: keyof Routes
    path: string
    redirect?: {
      name: keyof Routes
    } & RouteRecordRaw['redirect']
    children?: RouteRecordTyped[]
  }

declare module 'vue-router' {
  interface RouteMeta {
    /**
     * Route middleware
     */
    middleware?: ((
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
    ) => MaybePromise<RouteMiddlewareReturnType>)[]
  }
}
