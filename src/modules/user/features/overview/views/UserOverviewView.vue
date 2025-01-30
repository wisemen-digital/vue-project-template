<script setup lang="ts">
import { usePagination } from '@wisemen/vue-core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppErrorState from '@/components/app/error-state/AppErrorState.vue'
import AppTablePage from '@/components/layout/AppTablePage.vue'
import type { UserIndexFilters } from '@/models/user/index/userIndexFilters.model'
import { useUserIndexQuery } from '@/modules/user/api/queries/userIndex.query'
import UserOverviewTable from '@/modules/user/features/overview/components/UserOverviewTable.vue'

const { t } = useI18n()

const pagination = usePagination<UserIndexFilters>({
  isRouteQueryEnabled: true,
  key: 'users',
})

const userIndexQuery = useUserIndexQuery(pagination.paginationOptions)

const isLoading = computed<boolean>(() => userIndexQuery.isLoading.value)
const error = computed<unknown>(() => userIndexQuery.error.value)
</script>

<template>
  <AppTablePage :title="t('user.label.plural')">
    <template #default>
      {{ error }}
      <div
        v-if="error !== null"
        class="flex size-full flex-1 items-center justify-center"
      >
        <AppErrorState :error="null" />
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
