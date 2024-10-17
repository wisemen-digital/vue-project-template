<script setup lang="ts">
import { AppIcon } from '@wisemen/vue-core'

import AppDashboardLayoutFloating from '@/components/layout/dashboard/AppDashboardLayoutFloating.vue'
import AppSidebar from '@/components/layout/sidebar/AppSidebar.vue'
</script>

<template>
  <AppDashboardLayoutFloating>
    <template #sidebar>
      <AppSidebar
        :logo="{
          alt: 'Logo',
          src: 'https://picsum.photos/id/1003/200/200',
        }"
        :main-items="[
          {
            label: 'Header',
            items: [
              {
                to: {
                  name: 'user-overview',
                },
                label: 'Users',
                icon: 'barChartSquare02',
              },
              {
                to: '/test',
                label: 'Orders',
                icon: 'barChartSquare02',
              },
              {
                to: '/test-1',
                label: 'Shipments',
                icon: 'barChartSquare02',
                hasAlertDot: true,
              },
            ],
          },
          {
            label: 'Header',
            items: [
              {
                to: '/test-2',
                label: 'Orders',
                icon: 'barChartSquare02',
              },
              {
                to: '/test-3',
                label: 'Shipments',
                icon: 'barChartSquare02',
              },
            ],
          },
        ]"
        :user="{
          email: 'wouter.laermans@appwise.be',
          fullName: 'Wouter Laermans',
          profilePicture: {
            alt: 'Profile picture',
            src: 'https://picsum.photos/id/1003/200/200',
          },
        }"
        variant="floating-content"
      >
        <template #item-right="{ item }">
          <AppIcon
            v-if="item.to === '/test'"
            icon="alertCircle"
          />
        </template>
      </AppSidebar>
    </template>
  </AppDashboardLayoutFloating>
</template>
