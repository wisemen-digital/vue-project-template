import type { RouteLocationTyped } from '@/models/core/router/router.model'

import type { Routes } from './routes.model'

export type RouteMiddlewareReturnType = RouteLocationTyped<keyof Routes> | undefined
