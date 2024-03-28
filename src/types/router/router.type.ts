import type { RouteLocationNamedRaw, RouteRecordRaw } from 'vue-router'

import type { Routes } from '@/routes/routes'

import type { RouteMiddlewareReturnType } from './routeMiddleware.type.ts'

type MaybePromise<T> = Promise<T> | T

export type RouteLocationTyped<T extends keyof Routes> = RouteLocationNamedRaw &
  (Routes[T] extends { params: infer P }
    ? P extends undefined
      ? object
      : {
          params: {
            [K in keyof P]: P[K]
          }
        }
    : object) & {
      name: T
    }

export type RouteRecordTyped =
  | {
    children?: RouteRecordTyped[]
    name: keyof Routes
    path: string
    redirect?: RouteRecordRaw['redirect'] & {
      name: keyof Routes
    }
  }
  | (Omit<RouteRecordRaw, 'children' | 'name'> & {
    children: RouteRecordTyped[]
  })

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
