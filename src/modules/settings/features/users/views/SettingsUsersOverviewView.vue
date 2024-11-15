<script setup lang="ts">
import {
  AppRouteTabs,
  type BreadcrumbItem,
  type RouteTabItem,
} from '@wisemen/vue-core'
import { computed } from 'vue'
import { RouterView } from 'vue-router'

import AppTablePage from '@/components/layout/AppTablePage.vue'
import { useI18n } from '@/composables/i18n/i18n.composable.ts'

const i18n = useI18n()

const breadCrumbs = computed<BreadcrumbItem[]>(() => ([
  {
    icon: 'settings',
    label: i18n.t('module.settings.title'),
    to: {
      name: 'settings-overview',
    },
    type: 'route',
  },
  {
    label: i18n.t('module.settings.users.title'),
    type: 'page',
  },
]))

const tabs = computed<RouteTabItem[]>(() => ([
  {
    label: i18n.t('module.users.overview_tab.title'),
    to: {
      name: 'settings-users-list',
    },
  },
  {
    label: i18n.t('module.users.roles_and_permissions_tab.title'),
    to: {
      name: 'settings-users-roles-and-permissions',
    },
  },
]))
</script>

<template>
  <AppTablePage
    :breadcrumbs="breadCrumbs"
    :title="i18n.t('module.settings.users.title')"
    :subtitle="i18n.t('module.settings.users.description')"
  >
    <template #tabs>
      <AppRouteTabs
        :items="tabs"
      />
    </template>
    <template #default>
      <RouterView />
    </template>
  </AppTablePage>
</template>
