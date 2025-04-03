<script setup lang="ts">
import {
  useDocumentTitle,
  usePagination,
} from '@wisemen/vue-core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppErrorState from '@/components/app/error-state/AppErrorState.vue'
import AppPaginationSearchField from '@/components/app/search/AppPaginationSearchField.vue'
import AppTablePage from '@/components/layout/AppTablePage.vue'
import type { UserIndexPagination } from '@/models/user/index/userIndexPagination.model.ts'
import { useUserIndexQuery } from '@/modules/user/api/queries/userIndex.query'
import UserOverviewTable from '@/modules/user/features/overview/components/UserOverviewTable.vue'

const i18n = useI18n()

const documentTitle = useDocumentTitle()

documentTitle.set(i18n.t('module.user.title'))

const pagination = usePagination<UserIndexPagination>({
  isRouteQueryEnabled: true,
  key: 'users',
})

const userIndexQuery = useUserIndexQuery(pagination.paginationOptions)

const isLoading = computed<boolean>(() => userIndexQuery.isLoading.value)
const error = computed<unknown>(() => userIndexQuery.error.value)
</script>

<template>
  <AppTablePage :title="i18n.t('user.label.plural')">
    <template #default>
      <div
        v-if="error !== null"
        class="flex size-full flex-1 items-center justify-center"
      >
        <AppErrorState :error="error" />
      </div>

      <div
        v-else
        class="gap-lg flex flex-1 flex-col"
      >
        <AppPaginationSearchField
          :is-loading="userIndexQuery.isLoading.value"
          :pagination="pagination"
        />

        <UserOverviewTable
          :data="userIndexQuery.data.value"
          :is-loading="isLoading"
          :pagination="pagination"
          :error="userIndexQuery.error.value"
        />
      </div>
    </template>
  </AppTablePage>
</template>
