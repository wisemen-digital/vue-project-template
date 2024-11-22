<script setup lang="ts">
import { usePagination } from '@wisemen/vue-core'
import { computed } from 'vue'

import { useUserIndexQuery } from '@/api/queries/userIndex.query.ts'
import AppSearchInputField from '@/components/app/AppSearchInputField.vue'
import AppNewItemButton from '@/components/app/button/AppNewItemButton.vue'
import AppTablePage from '@/components/layout/AppTablePage.vue'
import { useI18n } from '@/composables/i18n/i18n.composable.ts'
import { TEST_ID } from '@/constants/testId.constant.ts'
import type { UserIndexFilters } from '@/models/user/index/userIndexFilters.model.ts'
import SettingsUsersOverviewTable from '@/modules/settings/features/users/components/SettingsUsersOverviewTable.vue'

const i18n = useI18n()

const pagination = usePagination<UserIndexFilters>({
  isRouteQueryEnabled: true,
  key: 'users',
})

const userIndexQuery = useUserIndexQuery(pagination.paginationOptions)

const isLoading = computed<boolean>(() => userIndexQuery.isLoading.value)
</script>

<template>
  <AppTablePage
    :title="i18n.t('module.user.title')"
    :subtitle="i18n.t('module.user.description')"
  >
    <template #header-actions>
      <AppSearchInputField
        :is-loading="isLoading"
        :pagination="pagination"
      />

      <AppNewItemButton
        :to="{
          name: 'user-create',
        }"
        :data-test-id="TEST_ID.USERS.OVERVIEW.CREATE_BUTTON"
        :label="i18n.t('module.user.create.title')"
      />
    </template>
    <template #default>
      <SettingsUsersOverviewTable
        :is-loading="userIndexQuery.isLoading.value"
        :pagination="pagination"
        :data="userIndexQuery.data.value"
      />
    </template>
  </AppTablePage>
</template>
