<script setup lang="ts">
import {
  AppRouteTabs,
  type RouteTabItem,
  usePagination,
} from '@wisemen/vue-core'
import { computed } from 'vue'

import { useUserIndexQuery } from '@/api/queries/userIndex.query'
import AppSearchInputField from '@/components/app/AppSearchInputField.vue'
import AppNewItemButton from '@/components/app/button/AppNewItemButton.vue'
import AppPage from '@/components/layout/AppPage.vue'
import { useI18n } from '@/composables/i18n/i18n.composable'
import { TEST_ID } from '@/constants/testId.constant.ts'
import type { UserIndexFilters } from '@/models/user/index/userIndexFilters.model'

const i18n = useI18n()

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
      name: 'user-list',
    },
  },
  {
    label: i18n.t('module.users.roles_and_permissions_tab.title'),
    to: {
      name: 'user-roles-and-permissions',
    },
  },
]))
</script>

<template>
  <AppPage
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
