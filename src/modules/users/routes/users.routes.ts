import type { UserUuid } from '@/models/users/userUuid.model'
import type { RouteRecordTyped } from '@/types/router/router.type'

export interface UsersRoutes {
	'users-overview': {
		path: '/users'
	}
	'users-detail': {
		path: '/users/:userUuid'
		params: {
			userUuid: UserUuid
		}
	}
	'users-create': {
		path: '/users/create'
	}
	'users-update': {
		path: '/users/:userUuid/update'
		params: {
			userUuid: UserUuid
		}
	}
}

export const usersRoutes: RouteRecordTyped[] = [
	{
		name: 'users-overview',
		path: '/users',
		component: () => import('../features/overview/views/UsersOverviewView.vue'),
	},
	{
		name: 'users-detail',
		path: '/users/:userUuid',
		component: () => import('../features/detail/views/UsersDetailViewDataProvider.vue'),
	},
	{
		name: 'users-create',
		path: '/users/create',
		component: () => import('../features/create/views/UsersCreateView.vue'),
	},
	{
		name: 'users-update',
		path: '/users/:userUuid/update',
		component: () => import('../features/update/views/UsersUpdateViewDataProvider.vue'),
	},
]
