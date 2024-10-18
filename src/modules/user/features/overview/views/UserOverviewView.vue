<script setup lang="ts">
import { usePagination } from '@wisemen/vue-core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppSearchInputField from '@/components/app/AppSearchInputField.vue'
import AppNewItemButton from '@/components/app/button/AppNewItemButton.vue'
import AppTablePage from '@/components/layout/AppTablePage.vue'
import { TEST_ID } from '@/constants/testId.constant.ts'
import type { UserIndexFilters } from '@/models/user/index/userIndexFilters.model'
import { useUserIndexQuery } from '@/modules/user/api/queries/userIndex.query'
import UserOverviewTable from '@/modules/user/features/overview/components/UserOverviewTable.vue'

const { t } = useI18n()

const pagination = usePagination<UserIndexFilters>({
  id: 'users',
})

const search = computed<string>({
  get: () => pagination.paginationOptions.value.filters?.name ?? '',
  set: (value) => {
    pagination.handleFilterChange({
      name: value,
    })
  },
})

const userIndexQuery = useUserIndexQuery(pagination.paginationOptions)

const isLoading = computed<boolean>(() => userIndexQuery.isLoading.value)
</script>

<template>
  <AppTablePage :title="t('shared.users')">
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
        :label="t('users.overview.new_user')"
      />
    </template>

    <template #default>
      <UserOverviewTable
        :data="userIndexQuery.data.value"
        :is-loading="isLoading"
        :pagination="pagination"
        :error="userIndexQuery.error.value"
      />
    </template>
  </AppTablePage>
</template>
