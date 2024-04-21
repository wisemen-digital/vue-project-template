import { computed, ComputedRef } from 'vue'
import { useRoute } from 'vue-router'

import type { Routes } from '@/routes/routes'

export type UseTypedRouteParamsReturnType<T extends keyof Routes> = Routes[T] extends {
  params: infer P
}
  ? {
      [K in keyof P]: ComputedRef<P[K]>
    }
  : never

export function useTypedRouteParams<T extends keyof Routes>(_routeName: T): UseTypedRouteParamsReturnType<T> {
  const route = useRoute()

  return Object.keys(route.params).reduce((acc, key) => {
    return {
      ...acc,
      [key]: computed<unknown>(() => route.params[key]),
    }
  }, {}) as UseTypedRouteParamsReturnType<T>
}
