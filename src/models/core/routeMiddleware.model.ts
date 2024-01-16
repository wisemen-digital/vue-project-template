import type { RouteLocationTyped } from '@/plugins/router/router.plugin'
import type { Routes } from '@/plugins/router/routes'

export type RouteMiddlewareReturnType = RouteLocationTyped<keyof Routes> | undefined
