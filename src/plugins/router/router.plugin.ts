import type {
  RouteRecordRaw,
} from 'vue-router'
import {
  createRouter,
  createWebHistory,
} from 'vue-router'

import { useRouterMiddleware } from '@/composables/router/routerMiddleware.composable'
<<<<<<< Updated upstream
=======
import { useRouterViewTransition } from '@/composables/router/routerViewTransition.composable'
>>>>>>> Stashed changes
import { routes } from '@/routes/routes.ts'

const router = createRouter({
  history: createWebHistory(),
  routes: routes as RouteRecordRaw[],
})

useRouterMiddleware(router)
<<<<<<< Updated upstream
=======
useRouterViewTransition(router)
>>>>>>> Stashed changes

export const routerPlugin = router
