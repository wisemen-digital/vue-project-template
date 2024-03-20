import type { Routes } from '@/routes/routes'

import type { RouteLocationTyped } from './router/router.type'

export interface Breadcrumb {
  label: string
  to?: RouteLocationTyped<keyof Routes>
}
