<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppDashboardLayoutClassic from '@/components/layout/dashboard/AppDashboardLayoutClassic.vue'
import AppHeader from '@/components/layout/dashboard/AppHeader.vue'
import AppSidebar from '@/components/layout/sidebar/AppSidebar.vue'
import type { UserDetail } from '@/models/user/detail/userDetail.model'
import { useSettingsPreferences } from '@/modules/settings/composables/settingsPreferences.composable.ts'
import { useAuthStore } from '@/stores/auth.store'

const i18n = useI18n()

useSettingsPreferences()

const authStore = useAuthStore()

const authUser = computed<UserDetail | null>(() => authStore.authUser)

function onSignOut(): void {
  const logoutUrl = authStore.getLogoutUrl()

  window.location.replace(logoutUrl)
}
</script>

<template>
  <AppDashboardLayoutClassic v-if="authUser !== null">
    <template #header>
      <AppHeader />
    </template>
    <template #sidebar>
      <AppSidebar
        :user="authUser"
        :main-items="[
          {
            label: 'General',
            items: [
              {
                to: {
                  name: 'user-overview',
                },
                label: i18n.t('user.label.plural'),
                icon: 'barChartSquare',
              },
            ],
          },
        ]"
        variant="floating-sidebar"
        @sign-out="onSignOut"
      />
    </template>
  </AppDashboardLayoutClassic>
</template>
