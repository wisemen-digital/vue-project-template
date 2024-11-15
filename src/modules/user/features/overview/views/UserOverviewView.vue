<script setup lang="ts">
import { usePagination } from '@wisemen/vue-core'
import { computed } from 'vue'

import AppSearchInputField from '@/components/app/AppSearchInputField.vue'
import AppNewItemButton from '@/components/app/button/AppNewItemButton.vue'
import AppErrorState from '@/components/app/error-state/AppErrorState.vue'
import AppTablePage from '@/components/layout/AppTablePage.vue'
import { useI18n } from '@/composables/i18n/i18n.composable'
import { TEST_ID } from '@/constants/testId.constant.ts'
import type { UserIndexFilters } from '@/models/user/index/userIndexFilters.model'
import { useUserIndexQuery } from '@/modules/user/api/queries/userIndex.query'
import UserOverviewTable from '@/modules/user/features/overview/components/UserOverviewTable.vue'

const { t } = useI18n()

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
const error = computed<unknown>(() => userIndexQuery.error.value)
</script>

<template>
<<<<<<< Updated upstream
  <AppTablePage :title="t('user.label.plural')">
=======
  <AppTablePage :title="t('shared.users')">
>>>>>>> Stashed changes
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
        :label="t('module.user.create.title')"
      />
    </template>

    <template #default>
      <div
        v-if="error !== null"
        class="flex size-full flex-1 items-center justify-center"
      >
        <AppErrorState :error="error" />
      </div>

      <UserOverviewTable
        v-else
        :data="userIndexQuery.data.value"
        :is-loading="isLoading"
        :pagination="pagination"
        :error="userIndexQuery.error.value"
      />
    </template>
  </AppTablePage>
</template>
