<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AppTablePage from '@/components/app/AppTablePage.vue'
import { useTypedRouter } from '@/composables/router/typedRouter.composable'
import { useTablePagination } from '@/composables/table-pagination/tablePagination.composable'
import type { UserIndexFilters } from '@/models/users/index/userIndexFilters.model'
import type { UserUuid } from '@/models/users/userUuid.model'
import { useUsersIndexQuery } from '@/modules/users/api/queries/usersIndex.query'

import UsersOverviewHeaderActions from '../components/UsersOverviewHeaderActions.vue'
import UsersOverviewTable from '../components/UsersOverviewTable.vue'

const { t } = useI18n()
const router = useTypedRouter()

const paginationOptions = useTablePagination<UserIndexFilters>({
  id: 'users',
})

const { data: paginatedUsers, isLoading: isLoadingUsers } = useUsersIndexQuery(paginationOptions.paginationOptions)

function onNavigateToUserDetail(userUuid: UserUuid): void {
  void router.push({
    name: 'users-detail',
    params: {
      userUuid,
    },
  })
}

function onSearch(search: null | string): void {
  paginationOptions.handleFilterChange({
    beer_name: search,
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
        :data="paginatedUsers"
        :is-loading="isLoadingUsers"
        :pagination="paginationOptions"
        @navigate-to-user-detail="onNavigateToUserDetail"
      />
    </template>
  </AppTablePage>
</template>
