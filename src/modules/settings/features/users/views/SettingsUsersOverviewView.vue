<script setup lang="ts">
import {
  AppRouteTabs,
  type BreadcrumbItem,
  type RouteTabItem,
  usePagination,
} from '@wisemen/vue-core'
import { computed } from 'vue'
import { RouterView } from 'vue-router'

import { useUserIndexQuery } from '@/api/queries/userIndex.query.ts'
import AppSearchInputField from '@/components/app/AppSearchInputField.vue'
import AppNewItemButton from '@/components/app/button/AppNewItemButton.vue'
import AppPage from '@/components/layout/AppPage.vue'
import { useI18n } from '@/composables/i18n/i18n.composable.ts'
import { TEST_ID } from '@/constants/testId.constant.ts'
import type { UserIndexFilters } from '@/models/user/index/userIndexFilters.model.ts'

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

const pagination = usePagination<UserIndexFilters>({
  isRouteQueryEnabled: true,
  key: 'users',
})

const search = computed<string>({
  get: () => pagination.paginationOptions.value.search ?? '',
  set: (value) => {
    pagination.handleSearchChange(value)
  },
})

const userIndexQuery = useUserIndexQuery(pagination.paginationOptions)

const isLoading = computed<boolean>(() => userIndexQuery.isLoading.value)

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
  <AppPage
    :breadcrumbs="breadCrumbs"
    :title="i18n.t('module.user.title')"
    :subtitle="i18n.t('module.user.description')"
  >
    <template #header-actions>
      <AppSearchInputField
        v-model="search"
        :is-loading="isLoading"
      />

      <AppNewItemButton
        :to="{
          name: 'user-create',
        }"
        :data-test-id="TEST_ID.USERS.OVERVIEW.CREATE_BUTTON"
        :label="i18n.t('module.user.create.title')"
      />
    </template>
    <AppRouteTabs
      :items="tabs"
    />
    <RouterView />
  </AppPage>
</template>
