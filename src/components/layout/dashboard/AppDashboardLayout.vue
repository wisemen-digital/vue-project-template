<script setup lang="ts">
import { computed } from 'vue'

import AppDashboardLayoutFloating from '@/components/layout/dashboard/AppDashboardLayoutFloating.vue'
import AppSidebar from '@/components/layout/sidebar/AppSidebar.vue'
import type { AuthUser } from '@/models/auth-user/authUser.model'
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()

const authUser = computed<AuthUser | null>(() => authStore.authUser)

function onSignOut(): void {
  const logoutUrl = authStore.getLogoutUrl()

  window.location.replace(logoutUrl)
}
</script>

<template>
  <AppDashboardLayoutFloating v-if="authUser !== null">
    <template #sidebar>
      <AppSidebar
        :auth-user="authUser"
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
        @sign-out="onSignOut"
      />
    </template>
  </AppDashboardLayoutFloating>
</template>
