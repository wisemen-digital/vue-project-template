import type { RouteLocationNormalized } from 'vue-router'

import type { RouteLocationTyped } from '@/plugins/router/router.plugin.ts'
import type { Routes } from '@/plugins/router/routes.ts'

type MaybePromise<T> = Promise<T> | T

export type RouteMiddleware = (
	to: RouteLocationNormalized,
	from: RouteLocationNormalized
) => MaybePromise<RouteLocationTyped<keyof Routes> | undefined>
