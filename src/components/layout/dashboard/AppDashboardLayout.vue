<script setup lang="ts">
import { computed } from 'vue'

import AppDashboardLayoutFloating from '@/components/layout/dashboard/AppDashboardLayoutFloating.vue'
import AppSidebar from '@/components/layout/sidebar/AppSidebar.vue'
import type { CurrentUser } from '@/models/auth/current-user/currentUser.model.ts'
import { useAuthStore } from '@/stores/auth.store.ts'

const authStore = useAuthStore()

const currentUser = computed<CurrentUser | null>(() => authStore.currentUser)
</script>

<template>
  <AppDashboardLayoutFloating v-if="currentUser !== null">
    <template #sidebar>
      <AppSidebar
        :logo="{
          alt: 'Logo',
          src: 'https://picsum.photos/id/1003/200/200',
        }"
        :main-items="[
          {
            label: 'General',
            items: [
              {
                to: {
                  name: 'user-overview',
                },
                label: 'Users',
                icon: 'barChartSquare02',
              },
            ],
          },
        ]"
        variant="floating-content"
      />
    </template>
  </AppDashboardLayoutFloating>
</template>
