import type { RouteLocationNormalized } from 'vue-router'

import type { RouteLocationTyped } from '@/plugins/router/router.plugin'
import type { Routes } from '@/plugins/router/routes'

export type RouteMiddlewareParams = {
	to: RouteLocationNormalized
	from: RouteLocationNormalized
}

export type RouteMiddlewareReturnType = RouteLocationTyped<keyof Routes> | undefined
