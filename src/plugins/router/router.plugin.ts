import type {
  RouteRecordRaw,
} from 'vue-router'
import {
  createRouter,
  createWebHistory,
} from 'vue-router'

import { useRouterMiddleware } from '@/composables/router/routerMiddleware.composable'
import { useRouterViewTransition } from '@/composables/router/routerViewTransition.composable'
import { routes } from '@/routes/routes.ts'

const router = createRouter({
  history: createWebHistory(),
  routes: routes as RouteRecordRaw[],
})

useRouterMiddleware(router)
useRouterViewTransition(router)

export const routerPlugin = router
