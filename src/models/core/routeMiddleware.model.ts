import type { RouteLocationNormalized } from 'vue-router'

import type {
  RouteLocationTyped,
  Routes,
} from '@/plugins'

type MaybePromise<T> = Promise<T> | T

export type RouteMiddleware = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) => MaybePromise<RouteLocationTyped<keyof Routes> | undefined>
