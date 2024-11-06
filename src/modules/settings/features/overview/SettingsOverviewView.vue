<script  lang="ts" setup="">
import { AppRouteTabs, type RouteTabItem } from '@wisemen/vue-core'
import { computed } from 'vue'
import { RouterView } from 'vue-router'

import AppPage from '@/components/layout/AppPage.vue'
import { useI18n } from '@/composables/i18n/i18n.composable.ts'

const i18n = useI18n()

const tabs = computed<RouteTabItem[]>(() => ([
  {
    label: i18n.t('module.settings.title'),
    to: {
      name: 'settings-users',
    },
  },
  {
    label: i18n.t('module.settings.roles_and_permissions_tab'),
    to: {
      name: 'settings-roles-and-permissions',
    },
  },
]))
</script>

<template>
  <AppPage
    :title="i18n.t('module.settings.title')"
    :subtitle="i18n.t('module.settings.description')"
  >
    <AppRouteTabs
      :items="tabs"
    />
    <RouterView />
  </AppPage>
</template>
