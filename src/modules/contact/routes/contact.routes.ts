import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

export const contactRoutes = [
  {
    path: '/contacts',
    children: [
      {
        name: 'contact-overview',
        path: '',
        component: (): Component => import('@/modules/contact/features/overview/views/ContactOverviewView.vue'),
      },
      {
        name: 'contact-detail',
        props: true,
        path: ':contactUuid',
        component: (): Component => import('@/modules/contact/features/detail/views/ContactDetailViewDataProvider.vue'),
      },
      {
        name: 'contact-update',
        props: true,
        path: ':contactUuid/update',
        component: (): Component => import('@/modules/contact/features/update/views/ContactUpdateViewDataProvider.vue'),
      },
      {
        name: 'contact-create',
        path: 'create',
        component: (): Component => import('@/modules/contact/features/create/views/ContactCreateView.vue'),
      },
    ],
  },
] as const satisfies RouteRecordRaw[]
