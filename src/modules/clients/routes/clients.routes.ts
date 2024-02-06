import type { RouteRecordTyped } from '@/types/core/router/router.model.ts'

export const clientsRoutes: RouteRecordTyped[] = [
	{
		path: 'clients',
		children: [
			{
				path: '',
				name: 'clients-overview',
				component: async () => import('@/modules/clients/features/overview/views/ClientsOverviewView.vue'),
			},
			{
				path: 'create',
				name: 'clients-create',
				component: async () => import('@/modules/clients/features/create/views/ClientsCreateView.vue'),
			},
		],
	},
]
