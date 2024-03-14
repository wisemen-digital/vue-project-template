import { useRoute } from 'vue-router'

import type { Routes } from '@/routes/routes'

type UseTypedRouteQuery<T extends keyof Routes> = {
  [K in keyof (Routes[T] extends {
    queryParams: infer P
  }
    ? P
    : never)]: string
}

export function useTypedRouteQuery<T extends keyof Routes>(_routeName: T): UseTypedRouteQuery<T> {
  const route = useRoute()

  return route.query as UseTypedRouteQuery<T>
}
