import { useRoute } from 'vue-router'

import type { Routes } from '@/routes/routes'

export type UseTypedRouteParamsReturnType<T extends keyof Routes> = Routes[T] extends {
  params: infer P
}
  ? P
  : never

export function useTypedRouteParams<T extends keyof Routes>(_routeName: T): UseTypedRouteParamsReturnType<T> {
  const route = useRoute()

  return route.params as UseTypedRouteParamsReturnType<T>
}
