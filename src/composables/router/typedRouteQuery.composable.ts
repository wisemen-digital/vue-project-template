import { computed, ComputedRef } from 'vue'
import { useRoute } from 'vue-router'

import type { Routes } from '@/routes/routes'

type UseTypedRouteQuery<T extends keyof Routes> = {
  [K in keyof (Routes[T] extends {
    queryParams: infer P
  }
    ? P
    : never)]: ComputedRef<string>
}

export function useTypedRouteQuery<T extends keyof Routes>(_routeName: T): UseTypedRouteQuery<T> {
  const route = useRoute()

  return Object.keys(route.query).reduce((acc, key) => {
    return {
      ...acc,
      [key]: computed<string>(() => route.params[key] as string),
    }
  }, {}) as UseTypedRouteQuery<T>
}
