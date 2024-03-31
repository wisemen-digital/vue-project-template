<script setup lang="ts">
import { useTablePagination } from '@wisemen/vue-core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppTablePage from '@/components/app/AppTablePage.vue'
import type { UserIndexFilters } from '@/models/user/index/userIndexFilters.model'
import { useUserIndexQuery } from '@/modules/user/api/queries/userIndex.query'

import UsersOverviewHeaderActions from '../components/UserOverviewHeaderActions.vue'
import UsersOverviewTable from '../components/UserOverviewTable.vue'

const { t } = useI18n()

const paginationOptions = useTablePagination<UserIndexFilters>({
  id: 'users',
})

const userIndexQuery = useUserIndexQuery(paginationOptions.paginationOptions)

const isLoading = computed<boolean>(() => userIndexQuery.isLoading.value)

function onSearch(search: null | string): void {
  paginationOptions.handleFilterChange({
    search,
  })
}
</script>

<template>
  <AppTablePage :title="t('shared.users')">
    <template #header-actions>
      <UsersOverviewHeaderActions
        :pagination="paginationOptions"
        :is-loading="isLoading"
        @search="onSearch"
      />
    </template>

    <template #default>
      <UsersOverviewTable
        :data="userIndexQuery.data.value"
        :is-loading="userIndexQuery.isLoading.value"
        :pagination="paginationOptions"
      />
    </template>
  </AppTablePage>
</template>
