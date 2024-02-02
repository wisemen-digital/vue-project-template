import type { RouteRecordTyped } from '@/types/core/router/router.model.ts'

export const customersRoutes: RouteRecordTyped[] = [
	{
		path: 'customers',
		children: [
			{
				path: '',
				name: 'customers-overview',
				component: async () => import('@/modules/customers/features/overview/views/CustomersOverviewView.vue'),
			},
			{
				path: 'create',
				name: 'customers-create',
				component: async () => import('@/modules/customers/features/create/views/CustomersCreateView.vue'),
			},
		],
	},
]
