<script setup lang="ts">
import { computed } from 'vue'

import AppDashboardLayoutFloating from '@/components/layout/dashboard/AppDashboardLayoutFloating.vue'
import AppSidebar from '@/components/layout/sidebar/AppSidebar.vue'
import { useI18n } from '@/composables/i18n/i18n.composable'
import type { AuthUser } from '@/models/auth-user/authUser.model'
import { useAuthStore } from '@/stores/auth.store'

const { t } = useI18n()
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
                label: t('user.label.plural'),
                icon: 'barChartSquare',
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
