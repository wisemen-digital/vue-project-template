<script setup lang="ts">
import { useTablePagination } from '@wisemen/vue-core'
import { useI18n } from 'vue-i18n'

import AppTablePage from '@/components/app/AppTablePage.vue'
import type { UserIndexFilters } from '@/models/users/index/userIndexFilters.model'
import { useUsersIndexQuery } from '@/modules/users/api/queries/usersIndex.query'

import UsersOverviewHeaderActions from '../components/UsersOverviewHeaderActions.vue'
import UsersOverviewTable from '../components/UsersOverviewTable.vue'

const { t } = useI18n()

const paginationOptions = useTablePagination<UserIndexFilters>({
  id: 'users',
})

const usersIndexQuery = useUsersIndexQuery(paginationOptions.paginationOptions)

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
        @search="onSearch"
      />
    </template>

    <template #default>
      <UsersOverviewTable
        :data="usersIndexQuery.data.value"
        :is-loading="usersIndexQuery.isLoading.value"
        :pagination="paginationOptions"
      />
    </template>
  </AppTablePage>
</template>
