import type { RouteLocationNamedRaw, RouteRecordRaw } from 'vue-router'

import type { RouteMiddlewareReturnType } from './routeMiddleware.model'
import type { Routes } from './routes.model'

type MaybePromise<T> = Promise<T> | T

export type RouteLocationTyped<T extends keyof Routes> = RouteLocationNamedRaw &
	(Routes[T] extends { params: infer P }
		? P extends undefined
			? object
			: {
					params: P
			  }
		: object) & {
		name: T
	}

export type RouteRecordTyped =
	| {
			name: keyof Routes
			path: string
			redirect?: RouteRecordRaw['redirect'] & {
				name: keyof Routes
			}
			children?: RouteRecordTyped[]
	  }
	| (Omit<RouteRecordRaw, 'children' | 'name'> & {
			children: RouteRecordTyped[]
	  })

declare module 'vue-router' {
	interface RouteMeta {
		/**
		 * Route middleware
		 */
		middleware?: ((
			to: RouteLocationNormalized,
			from: RouteLocationNormalized
		) => MaybePromise<RouteMiddlewareReturnType>)[]
	}
}
