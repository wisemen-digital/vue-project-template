import type { Routes } from '@/routes/routes'
import type { RouteLocationTyped } from '@/types/router/router.type'

export type RouteMiddlewareReturnType = RouteLocationTyped<keyof Routes> | undefined
