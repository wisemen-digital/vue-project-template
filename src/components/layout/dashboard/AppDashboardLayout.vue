<script setup lang="ts">
import { computed } from 'vue'

import AppDashboardLayoutClassic from '@/components/layout/dashboard/AppDashboardLayoutClassic.vue'
import AppSidebar from '@/components/layout/sidebar/AppSidebar.vue'
import type { AuthUser } from '@/models/auth-user/authUser.model'
import { useAuthStore } from '@/stores/auth.store.ts'

const authStore = useAuthStore()

const authUser = computed<AuthUser | null>(() => authStore.authUser)
</script>

<template>
  <AppDashboardLayoutClassic v-if="authUser !== null">
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
        variant="fixed-sidebar"
      />
    </template>
  </AppDashboardLayoutClassic>
</template>
