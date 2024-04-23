<script setup lang="ts">
import { BreadcrumbItem, useTablePagination } from '@wisemen/vue-core'
import {
  computed,
  ref,
  watch,
} from 'vue'
import { useI18n } from 'vue-i18n'

import AppNewItemButton from '@/components/app/AppNewItemButton.vue'
import AppSearchInput from '@/components/app/AppSearchInput.vue'
import AppTablePage from '@/components/app/AppTablePage.vue'
import type { UserIndexFilters } from '@/models/user/index/userIndexFilters.model'
import { useUserIndexQuery } from '@/modules/user/api/queries/userIndex.query'

import UserOverviewTable from '../components/UserOverviewTable.vue'

const { t } = useI18n()

const breadcrumbs = computed<BreadcrumbItem[]>(() => [
  {
    label: t('shared.users'),
    type: 'page',
  },
  {
    label: t('shared.overview'),
    type: 'page',
  },
])

const paginationOptions = useTablePagination<UserIndexFilters>({
  id: 'users',
})

const search = ref<string>(paginationOptions.paginationOptions.value.filters?.search ?? '')

const userIndexQuery = useUserIndexQuery(paginationOptions.paginationOptions)

const isLoading = computed<boolean>(() => userIndexQuery.isLoading.value)

function onSearch(search: null | string): void {
  paginationOptions.handleFilterChange({
    search,
  })
}

function onClearFilters(): void {
  search.value = ''
}

watch(search, onSearch)
</script>

<template>
  <AppTablePage
    :title="t('shared.users')"
    :breadcrumbs="breadcrumbs"
  >
    <template #header-actions>
      <AppSearchInput
        v-model="search"
        :is-loading="isLoading"
      />

      <AppNewItemButton
        :to="{
          name: 'user-create',
        }"
        :label="t('users.overview.new_user')"
      />
    </template>

    <template #default>
      <UserOverviewTable
        :data="userIndexQuery.data.value"
        :is-loading="isLoading"
        :pagination="paginationOptions"
        @clear-filters="onClearFilters"
      />
    </template>
  </AppTablePage>
</template>
