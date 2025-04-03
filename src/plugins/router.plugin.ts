import type { RouteRecordRaw } from 'vue-router'
import {
  createRouter,
  createWebHistory,
} from 'vue-router'

import { useRouterMiddleware } from '@/composables/router/routerMiddleware.composable.ts'
import { routes } from '@/routes/routes.ts'

const router = createRouter({
  history: createWebHistory(),
  routes: routes as RouteRecordRaw[],
})

useRouterMiddleware(router)

export const routerPlugin = router
