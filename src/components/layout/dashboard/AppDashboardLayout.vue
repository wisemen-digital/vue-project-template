<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppDashboardLayoutFloating from '@/components/layout/dashboard/AppDashboardLayoutFloating.vue'
import AppHeader from '@/components/layout/header/AppHeader.vue'
import AppHeader from '@/components/layout/dashboard/AppHeader.vue'
import AppSidebar from '@/components/layout/sidebar/AppSidebar.vue'
import type { UserDetail } from '@/models/user/detail/userDetail.model'
import { useSettingsPreferences } from '@/modules/settings/composables/settingsPreferences.composable.ts'
import { useAuthStore } from '@/stores/auth.store'
import type { NavigationGroup } from '@/types/navigationItem.type.ts'

const i18n = useI18n()

useSettingsPreferences()

const authStore = useAuthStore()

const authUser = computed<UserDetail | null>(() => authStore.authUser)

function onSignOut(): void {
  const logoutUrl = authStore.getLogoutUrl()

  window.location.replace(logoutUrl)
}

const mainItems = computed<NavigationGroup[]>(() => [
  {
    items: [
      {
        icon: 'barChartSquare',
        label: i18n.t('user.label.plural'),
        to: { name: 'user-overview' },
      },
    ],
    label: 'General',
  },
])
</script>

<template>
  <AppDashboardLayoutFloating v-if="authUser !== null">
    <template #header>
      <AppHeader />
    </template>
    <template #sidebar>
      <AppSidebar
        :user="authUser"
        :main-items="mainItems"
        variant="floating-content"
      />
    </template>

    <template #header>
      <AppHeader
        :user="authUser"
        @sign-out="onSignOut"
      />
    </template>
  </AppDashboardLayoutFloating>
</template>
